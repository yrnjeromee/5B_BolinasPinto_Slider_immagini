const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const multer  = require('multer');
const database = require("./database");
const PORT = 5500;
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, "files"));
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
database.createTable();
const upload = multer({ storage: storage}).single('file');
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/files", express.static(path.join(__dirname, "files")));
app.post('/upload', multer({storage: storage}).single('file'), async(req, res) => {
    await database.insert("./files/" + req.file.originalname);
    res.json({result: "ok"});
});
app.delete("/todo/:id", async (req, res) => {
    await database.delete(req.params.id);
    res.json({result: "Ok"});  
 });
 const server = http.createServer(app);
 server.listen(PORT, () => console.log(`Server in esecuzione su http://localhost:${PORT}`));