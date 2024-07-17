FROM nginx:1.19-alpine


COPY https/server.crt /etc/nginx/ssl/cert.pem
COPY https/key.pem /etc/nginx/ssl/key.pem

COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]