FROM node:8.12-alpine

COPY . /private-blockchain-project
WORKDIR /private-blockchain-project
RUN apk update && \
    apk add python && \
    apk add make && \
    apk add gcc && \
    apk add g++
RUN npm install
