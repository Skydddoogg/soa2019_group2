FROM node:10.15.3-stretch-slim
WORKDIR /src
COPY . .
RUN npm ci
EXPOSE 3002

CMD [ "npm", "run", "start" ]