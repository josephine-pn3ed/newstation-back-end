FROM node:slim

WORKDIR /newstation-back-end

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5000

EXPOSE 5000

CMD [ "npm", "start" ]