FROM node:9-alpine

ENV USER node
ENV HOME /home/$USER
WORKDIR $HOME

COPY src src
COPY .babelrc .babelrc
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY webpack.config.js webpack.config.js

RUN "yarn"
RUN "node_modules/.bin/webpack"

CMD ["node_modules/.bin/babel-node", "src/express-server"]

EXPOSE 3000
