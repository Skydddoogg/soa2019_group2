FROM node:10.15.3-alpine
WORKDIR /src
COPY . .
RUN npm install
EXPOSE 3004

CMD [ "npm", "run", "start" ]