FROM node:8.1.2

ARG http_proxy
ARG https_proxy

ENV http_proxy ${http_proxy}
ENV https_proxy ${https_proxy}

# Create app directory
RUN mkdir -p /opt/iot-rest-api-server
WORKDIR /opt/iot-rest-api-server

# Install IoTivity build dependencies
RUN apt-get update
RUN apt-get install -y \
    libboost-dev libboost-program-options-dev libboost-thread-dev \
    uuid-dev libexpat1-dev libglib2.0-dev libsqlite3-dev \
    libcurl4-gnutls-dev scons

COPY package.json /opt/iot-rest-api-server
RUN npm --production install

# Unset proxy
ENV http_proxy ""
ENV https_proxy ""

# Bundle app source
COPY . /opt/iot-rest-api-server

EXPOSE 8000

CMD ["npm", "start"]
