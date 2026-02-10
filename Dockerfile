# Dockerfile per Stremio Proxy
FROM node:18-alpine
WORKDIR /app

# Copia file e installa dipendenze
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copia il codice
COPY server.js ./

# Esponi porta e avvia
EXPOSE 8080
USER node
CMD ["node", "server.js"]
