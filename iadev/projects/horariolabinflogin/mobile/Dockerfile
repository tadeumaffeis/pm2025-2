FROM node:18-alpine

WORKDIR /app

RUN npm install -g @expo/cli

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 19006 19001 19002

CMD ["expo", "start", "--tunnel"]