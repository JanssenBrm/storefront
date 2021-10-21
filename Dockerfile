FROM node:14.16-alpine AS build

ARG ENV=dev
ARG SSH_PRIVATE_KEY

WORKDIR /build
COPY . /build
RUN apk update
RUN npm install --no-optional
RUN npm run build

FROM nginx:1.20.0-alpine
COPY --from=build /build /usr/share/nginx/storefront
COPY nginx/public.conf /etc/nginx/conf.d/default.conf
