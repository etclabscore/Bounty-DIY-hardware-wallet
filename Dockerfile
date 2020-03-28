FROM kyma/docker-nginx

COPY default.nginx /etc/nginx/sites-enabled/default

CMD 'nginx'
