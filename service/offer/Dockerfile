FROM node:10.15.3-alpine
WORKDIR /src
COPY . .
RUN npm ci
EXPOSE 3005

CMD [ "npm", "run", "start" ]