# Stage 1: Build static assets
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production server with Node.js & Sharp
FROM node:20-alpine

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=80
ENV DATA_DIR=/app/data

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy built frontend assets and server code
COPY --from=builder /app/dist ./dist
COPY server ./server
COPY public ./public

# Ensure persistent data directory exists
RUN mkdir -p /app/data/uploads

# Expose HTTP port for Coolify Traefik
EXPOSE 80

CMD ["node", "server/index.js"]
