// server.js
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  console.log(`Received ${method} request for ${url}`);

  // Home page
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Welcome to the Home Page");
  }

  // Show form
  if (url === "/contact" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });

    return res.end(`
            <form method="POST" action="/contact">
                <input type="text" name="name" placeholder="Your name" />
                <button type="submit">Submit</button>
            </form>
        `);
  }

  // Handle form submission
  if (url === "/contact" && method === "POST") {
    let body = "";

    // Receive data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // Finished receiving data
    req.on("end", () => {
      // body looks like: name=John
      const parsedData = new URLSearchParams(body);

      const name = parsedData.get("name");

      // Write name into submissions.txt
      // fs.appendFile('submissions.txt', name + '\n', err => {

      //     if (err) {
      //         res.writeHead(500, { 'Content-Type': 'text/plain' });
      //         return res.end('Error saving submission');
      //     }

      //     res.writeHead(200, { 'Content-Type': 'text/plain' });
      //     res.end('Form submitted successfully');
      // });

      // BONUS 1: Validate empty name
      if (!name || name.trim() === "") {
        res.writeHead(400, { "Content-Type": "text/html" });

        return res.end(`
                    <h1>Error</h1>
                    <p>Name cannot be empty.</p>
                    <a href="/contact">Go Back</a>
                `);
      }
      // Create new submission object
      const newSubmission = {
        name: name.trim(),
        submittedAt: new Date().toISOString(),
      };

      // Read existing JSON file
      fs.readFile("submissions.json", "utf8", (err, data) => {
        let submissions = [];

        // If file exists and has data
        if (!err && data) {
          try {
            submissions = JSON.parse(data);
          } catch (parseError) {
            submissions = [];
          }
        }

        // Add new submission
        submissions.push(newSubmission);

        // Save updated JSON
        fs.writeFile(
          "submissions.json",
          JSON.stringify(submissions, null, 2),
          (writeErr) => {
            if (writeErr) {
              res.writeHead(500, {
                "Content-Type": "text/html",
              });

              return res.end(`
                                <h1>Server Error</h1>
                                <p>Could not save submission.</p>
                            `);
            }

            // BONUS 2: Confirmation HTML page
            res.writeHead(200, {
              "Content-Type": "text/html",
            });

            res.end(`
                            <h1>Submission Successful</h1>

                            <p>Thank you, <strong>${name}</strong>!</p>

                            <a href="/contact">
                                Submit Another Response
                            </a>
                        `);
          },
        );
      });
    });

    return;
  }

  // 404
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
