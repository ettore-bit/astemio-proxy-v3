// Stremio Proxy - Versione Semplice e Funzionante
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware essenziali
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// ======================
// 1. MANIFEST (OBBLIGATORIO)
// ======================
const manifest = {
    "id": "community.astemio.proxy",
    "version": "1.0.0",
    "name": "Astemio Proxy V3",
    "description": "Proxy personalizzato per Stremio su Koyeb",
    "resources": ["stream"],
    "types": ["movie", "series"],
    "catalogs": [],
    "idPrefixes": ["tt", "kodi:", "yt:"]
};

app.get('/manifest.json', (req, res) => {
    console.log('📄 Manifest request from:', req.ip);
    res.json(manifest);
});

// ======================
// 2. HANDLER STREAM
// ======================
app.get('/stream/:type/:id/:extra?.json', (req, res) => {
    const { type, id } = req.params;
    console.log(`🎬 Stream request - Type: ${type}, ID: ${id}`);
    
    // ESEMPIO: Rispondi con uno stream di prova
    const response = {
        streams: [
            {
                "name": "Example Stream (720p)",
                "title": "Prova Astemio Proxy",
                "url": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                "behaviorHints": {
                    "notWebReady": true,
                    "bingeGroup": `astemio-${id}`
                }
            }
        ]
    };
    
    res.json(response);
});

// ======================
// 3. HEALTH CHECK
// ======================
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        service: 'Stremio Proxy',
        version: manifest.version,
        endpoints: {
            manifest: '/manifest.json',
            stream: '/stream/:type/:id/:extra?.json',
            health: '/health'
        }
    });
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// ======================
// 4. AVVIO SERVER
// ======================
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
🚀 Astemio Proxy V3
📍 Porta: ${PORT}
📄 Manifest: http://localhost:${PORT}/manifest.json
🌐 Aggiungi in Stremio: http://localhost:${PORT}/manifest.json
`);
});

module.exports = app;
