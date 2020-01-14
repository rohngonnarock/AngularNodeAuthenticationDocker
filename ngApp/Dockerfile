FROM node:12.2.0 as build-step

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install
COPY . .
RUN npm run build --prod


FROM nginx:1.16.1-alpine as prod-step
COPY --from=build-step /usr/src/app/dist/ngApp /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build . -t ngapp
# docker run --rm -it -p 8080:80 ngapp