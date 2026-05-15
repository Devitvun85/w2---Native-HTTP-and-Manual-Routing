// server.js
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`
            <html>
                <head><title>Home</title></head>
                <body>
                    <h1>Welcome to the Home Page</h1>
                    <p>This is a simple Node.js server.</p>
                </body>
            </html>
        `);
    }
    // Implement more routes here
    else if (url === '/about' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`
            <html>
                <head><title>About</title></head>
                <body>
                    <h1>About us:</h1>
                    <p>At CADT we love node.js</p>
                </body>
            </html>
        `);
    }
    else if (url === '/contact-us' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`
            <html>
                <head><title>Contact</title></head>
                <body>
                    <h1>Contact us:</h1>
                    <p>You can reach us via Email: 4s9lK@example.com</p>
                </body>
            </html>
        `);
    }
    else if (url === '/products' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`
            <html>
                <head><title>Products</title></head>
                <body>
                    <h1>Our Products</h1>
                    <p>Buy one get one free!</p>
                </body>
            </html>
        `);
    }
    else if (url === '/projects' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(`
            <html>
                <head><title>Projects</title></head>
                <body>
                    <h1>Our Projects</h1>
                    <p>Here are out awesome projects !</p>
                </body>
            </html>
        `);
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
