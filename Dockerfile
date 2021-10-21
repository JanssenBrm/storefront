FROM node:14.17-alpine AS build

WORKDIR /builddir
COPY package*.json ./
RUN npm install --no-optional --no-audit
RUN npm rebuild node-sass
COPY . .
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=build /builddir/build /usr/share/nginx/storefront
COPY nginx/public.conf /etc/nginx/conf.d/default.conf
