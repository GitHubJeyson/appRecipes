
FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build
