FROM node:10.15.3-alpine
WORKDIR /src
COPY . .
RUN apk update && apk add bash
RUN npm ci
EXPOSE 3000

CMD [ "npm", "run", "start" ]