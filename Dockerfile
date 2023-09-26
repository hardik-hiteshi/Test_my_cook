FROM node:dubnium

RUN mkdir -p /app
WORKDIR /app

RUN apt-get update && apt-get install -y vim graphicsmagick optipng jpegoptim libvips-dev && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
COPY . /app
# Sharp always requires reinstallation when build is not run in linux
RUN rm -rf node_modules/sharp; npm install sharp; npm install --force canvas; npm rebuild
RUN cd /app/public; rm -rf ./images; ln -s /data/images images

EXPOSE 8080
CMD [ "npm", "start" ]
