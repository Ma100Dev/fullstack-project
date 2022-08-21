FROM nginx:1.20.1

COPY default.conf.template /etc/nginx/conf.d/default.conf.template

COPY nginx.conf /etc/nginx/nginx.conf

RUN sed -i "s/listen 80/listen ${PORT}/" /etc/nginx/nginx.conf

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'