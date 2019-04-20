FROM node:10
WORKDIR /src
COPY . .
RUN npm ci
EXPOSE 3003

CMD [ "npm", "run", "start" ]