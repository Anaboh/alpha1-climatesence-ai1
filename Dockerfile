FROM node:18-alpine
WORKDIR /app
RUN npm init -y
RUN npm install express
COPY server.js .
EXPOSE 3000
CMD ["node", "server.js"]

#FROM node:18-alpine
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#RUN npm run build
#EXPOSE 3000
#CMD ["npm", "start"]

