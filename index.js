const http = require("http");
const url = require("url");
const fs = require("fs");
const port = 8080;
const hostname = "127.0.0.1"

// Read the content of the "404.html" file synchronously and store it in the "page404" variable
const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
    if (err) throw err;
    return data;
});

const server = http.createServer((req, res) => {
    // Parse the requested URL
    const parsedUrl = url.parse(req.url, true);
    let filename = "";
    if (parsedUrl.pathname === "/") {
        filename = "./index.html";
    } else {
        console.log(parsedUrl)
        filename = `.${parsedUrl.pathname}.html`;
    }

    fs.readFile(filename, (err, data) => {
        // If an error occurs while reading the file, send a 404 status code and write the content of "page404" to the response
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write(page404);
            return res.end();
        } else {
        // If the file is successfully read, send a 200 status code and write the file content to the response
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            return res.end();
        }
    });
})

// Start the server and log the server URL
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});