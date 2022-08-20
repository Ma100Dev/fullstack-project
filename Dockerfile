FROM nginx:1.20.1

ARG PORT

ENV PORT=$PORT

RUN touch /etc/nginx/nginx.conf

COPY ./nginx.conf /etc/nginx/nginx.conf

RUN sed -i "s/listen 80/listen ${PORT}/" /etc/nginx/nginx.conf