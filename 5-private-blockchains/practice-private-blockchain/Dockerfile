FROM node:8.12-alpine

COPY . /practice-private-blockchain
WORKDIR /practice-private-blockchain
RUN apk update && \
    apk add python && \
    apk add make && \
    apk add gcc && \
    apk add g++
RUN npm install
