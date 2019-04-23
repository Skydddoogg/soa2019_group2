FROM node:10.15.3-stretch-slim
WORKDIR /src
COPY . .
RUN npm ci
EXPOSE 3006

CMD [ "npm", "run", "start" ]