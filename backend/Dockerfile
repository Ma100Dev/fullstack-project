FROM node:16

WORKDIR /usr/src/app

ARG MONGODB_URI

ENV MONGODB_URI=$MONGODB_URI

ARG JWT_SECRET

ENV JWT_SECRET=$JWT_SECRET

COPY --chown=node:node . .

RUN npm install -g npm@8.15.0 && npm remove yarn -g && npm install -g yarn@1.22.19 --force && yarn install

USER node

CMD yarn start