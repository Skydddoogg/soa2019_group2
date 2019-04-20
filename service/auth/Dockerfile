FROM node:10.15.3-alpine
WORKDIR /src
COPY . .
RUN npm ci
EXPOSE 3003

CMD [ "npm", "run", "start" ]