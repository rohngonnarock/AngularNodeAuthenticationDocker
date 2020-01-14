FROM node:12.2.0

WORKDIR /usr/src/app

COPY package.json .
RUN npm install
RUN npm install -g @angular/cli

COPY . .

# generate build
# RUN ng build --output-path=dist

# add app

# base image
# FROM nginx:1.16.1-alpine

# # copy artifact build from the 'build environment'
# COPY /usr/src/app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
# CMD ["nginx", "-g", "daemon off;"]

# docker build . -t ngapp
# docker run --rm -it -p 8080:80 ngapp