FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN yarn install

USER node

CMD yarn start