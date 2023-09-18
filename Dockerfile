FROM node:alpine

WORKDIR /clothes_shop

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "start"]