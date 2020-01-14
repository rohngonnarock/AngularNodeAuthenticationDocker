FROM node:12.2.0    

WORKDIR /usr/src/app1

COPY package.json .

RUN npm install    

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]