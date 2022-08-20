FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN yarn install --frozen-lockfile

USER node

CMD yarn start