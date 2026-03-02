// const EventEmitter = require("events");
// const http = require("http");
// const myEmitter = new EventEmitter();

// myEmitter.on("newSale", () => {
//   console.log("There is a new sale.");
// });

// myEmitter.on("newSale", () => {
//   console.log("name: jonas");
// });
// myEmitter.on("newSale", (stock) => {
//   console.log(`this much stock is left: ${stock}`);
// });
// myEmitter.emit("newSale", 10);

// //                                !server!
// const server = http.createServer();
// server.on("request", (req, res) => {
//   console.log("request received!");
//   console.log(req.url);
//   res.end("request received!");
// });

// server.on("request", (req, res) => {
//   console.log("another request received!");
// });

// server.on("close", () => {
//   console.log("server closed");
// });
// server.listen(9000, "127.0.0.1", () => {
//   console.log("waiting for a request.....");
// });
