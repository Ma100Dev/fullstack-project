FROM node:16 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN rm -rf node_modules && yarn install --immutable --immutable-cache --check-cache --prod

ENV DISABLE_ESLINT_PLUGIN=true

RUN yarn run build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html