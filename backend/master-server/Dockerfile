FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY tsconfig.json ./
COPY ./src ./src

RUN npm run build

RUN rm -rf /app/src
RUN rm /app/tsconfig.json

RUN npm prune --production

CMD ["node","build/index.js"]

