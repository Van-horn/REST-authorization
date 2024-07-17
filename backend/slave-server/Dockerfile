FROM node

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY /build .

CMD ["node","index.js"]

