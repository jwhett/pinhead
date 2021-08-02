FROM node
COPY . /pinhead
WORKDIR /pinhead
RUN npm install
CMD [ "npm", "run", "bot" ]