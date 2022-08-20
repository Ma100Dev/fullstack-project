FROM nginx:1.20.1

ARG PORT

ENV PORT=$PORT

RUN touch /etc/nginx/nginx.conf
RUN echo "events { } http { server { listen ${PORT}; location / { proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection 'upgrade'; proxy_pass http://app:80; } location /api/ { proxy_http_version 1.1; proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection 'upgrade'; proxy_pass http://backend:3001/; } } }" > /etc/nginx/nginx.conf