FROM node:20-alpine
WORKDIR /app

# Crea server.js completo inline
RUN echo "const express = require('express'); const app = express(); app.use((req, res, next) => { res.header('Access-Control-Allow-Origin', '*'); next(); }); app.get('/manifest.json', (req, res) => res.json({ id: 'community.proxy', version: '1.0.0', name: 'Proxy', description: 'Stremio Proxy', resources: ['stream'], types: ['movie', 'series'] })); app.get('/stream/:type/:id/:extra?.json', (req, res) => res.json({ streams: [{ title: 'Test', url: 'http://example.com/video.mp4' }] })); app.get('/', (req, res) => res.send('Proxy OK')); app.listen(8080, '0.0.0.0'); console.log('Proxy ready');" > server.js

RUN npm init -y && npm install express

EXPOSE 8080
CMD ["node", "server.js"]
