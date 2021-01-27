FROM node:lts-alpine
MAINTAINER Zimichev Dmitri

RUN mkdir -p /var/task/

WORKDIR /var/task

COPY package.json package-lock.json /var/task/
RUN npm ci --production

COPY entrypoint.sh index.js /var/task/

ENTRYPOINT ["/var/task/entrypoint.sh"]