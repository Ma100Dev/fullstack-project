FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ARG MONGODB_URI

ENV MONGODB_URI=$MONGODB_URI

ARG JWT_SECRET

ENV JWT_SECRET=$JWT_SECRET

COPY --chown=node:node . .

COPY package.json /usr/src/app/

RUN yarn install

COPY . /usr/src/app

USER node

CMD yarn start