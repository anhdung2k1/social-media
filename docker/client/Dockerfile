# Fetching the lastest node image on apline linux
FROM node:19.1.0

ARG COMMIT
ARG APP_VERSION
ARG BUILD_TIME

LABEL \
    ck.app.commit=$COMMIT \
    ck.app.version=$APP_VERSION \
    ck.image.title="Social Client ReactJS" \
    ck.image.created="$BUILD_TIME"

WORKDIR /app/client
COPY --chmod=0755 --chown=0:0 client/ /app/client/
RUN npm install --force
COPY . .
CMD ["npm", "start"]