# Base image
FROM node:16.13.0-alpine

# Create app directory
WORKDIR /root

RUN yarn install

# Bundle app source
COPY . .

RUN yarn build
Run yarn start

CMD ["sh", "start.sh"]