FROM node:16

WORKDIR /usr/src/app

ARG MONGODB_URI

ENV MONGODB_URI=$MONGODB_URI

ARG JWT_SECRET

ENV JWT_SECRET=$JWT_SECRET

COPY --chown=node:node . .

RUN yarn install

USER node

CMD yarn start