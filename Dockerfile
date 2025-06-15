# Use official Node.js 18 Alpine image
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies first (cache layer)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source files
COPY . .

# Build frontend
RUN npm run build --prefix frontend

# Expose port 3000
EXPOSE 3000

# Start backend server
CMD ["node", "backend/server.js"]
