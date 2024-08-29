FROM postgres:13-alpine

RUN apk add --no-cache musl-locales musl-locales-lang

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=root
ENV POSTGRES_DB=AUTH
ENV POSTGRES_MAX_CONNECTIONS=5
ENV POSTGRES_AUTH_METHOD=md5 

EXPOSE 5432

CMD ["postgres"]