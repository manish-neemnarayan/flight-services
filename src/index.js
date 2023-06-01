const express = require("express");
const {ServerConfig, Logger} = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, function serverListenCB(_req, _res) {
    console.log("Server is listening on Port : " + ServerConfig.PORT);
    Logger.info("Successfully started the Server", {message : "message : world"});
});