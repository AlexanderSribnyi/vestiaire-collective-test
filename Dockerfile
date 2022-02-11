FROM node:16.13.0-alpine

COPY . .
RUN yarn install
RUN yarn build
Run yarn start

CMD ["sh"]