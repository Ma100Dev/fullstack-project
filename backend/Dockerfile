FROM node:19

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI

ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

ENV NODE_ENV=production

COPY --chown=node:node . .

RUN rm -rf node_modules && yarn install --immutable --immutable-cache --check-cache --prod

RUN chown -R node:node /usr/src/app

USER node

CMD yarn start