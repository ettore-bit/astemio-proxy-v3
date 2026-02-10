FROM node:20-alpine
WORKDIR /app
RUN npm init -y && npm install express
RUN echo 'const express = require("express"); const app = express(); app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); next(); }); app.get("/", (req, res) => res.send("Proxy Stremio OK - " + new Date())); app.listen(8080, "0.0.0.0"); console.log("Proxy on 8080");' > server.js
EXPOSE 8080
CMD ["node", "server.js"]
