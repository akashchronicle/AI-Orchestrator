FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache wget

COPY package.json .
COPY process.js .

RUN npm install

EXPOSE 3000

CMD ["node", "process.js"] 