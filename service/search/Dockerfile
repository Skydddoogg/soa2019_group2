FROM node:8.11.1-alpine
WORKDIR /opt/app
COPY package.json package-lock.json* ./
RUN npm cache clean --force && npm install
COPY . /opt/app
EXPOSE 3000

CMD [ "npm", "run", "start" ]