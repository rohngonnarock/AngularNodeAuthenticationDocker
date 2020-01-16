FROM node:12.14.1 as builder 

WORKDIR /usr/src/app1

COPY package.json ./
RUN npm install    
COPY . .
RUN npm run build


FROM node:12.14.1
WORKDIR /usr/src/app2
COPY --from=builder /usr/src/app1/dist/ /usr/src/app2/
RUN dir /usr/src/app2/
EXPOSE 80
CMD [ "node", "server.js" ]