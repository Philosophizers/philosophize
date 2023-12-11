FROM node:18-alpine3.17 as build

COPY /react-app /react_app

WORKDIR /react_app

RUN npm install && CI=false && npmn run build

FROM python:3.9.18-alpine3.17

RUN apk add build
RUN apk add postgresql-dev gcc python-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG REACT_APP_BASEURL
ARG SECRET_KEY

WORKDIR /var/www

COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .

COPY --from=build /react_app /var/www/react-app

RUN flask db upgrade
RUN flask seed all

CMD gunicorn app:app


# NODE_OPTIONS=--openssl-legacy-provider npm install --prefix react-app && NODE_OPTIONS=--openssl-legacy-provider npm run build --prefix react-app && pip install -r requirements.txt && pip install psycopg2 && flask db upgrade && flask seed all