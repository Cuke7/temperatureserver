const express = require("express");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/my_api_url/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/my_api_url/fullchain.pem'),
}, app);

app.get("/", (req, res) => {
    try {
        var data = fs.readFileSync("temperature.txt", "utf8");
        let lines = data.split("\n");

        lines.shift();
        // console.log(lines);
        let temperatureInfo = [];
        let timeInfo = [];
        for (const line of lines) {
            temperatureInfo.push(line.split(",")[2].replace("\r", ""));
            timeInfo.push({ day: line.split(",")[0], time: line.split(",")[1] });
        }
        // console.log(temperature);
        res.json({ timeInfo, temperatureInfo });
    } catch (e) {
        console.log("Error:", e.stack);
        res.json(null);
    }
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});