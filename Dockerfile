FROM node:18-alpine

ENV NODE_ENV production

##
# Prepare system dependencies
##

RUN apk add --no-cache bash ca-certificates && \
    adduser -h /home/app -u 101 -D app

##
# Build app
##

USER root
WORKDIR /app
COPY --chown=101:101 package.json yarn.lock /app/
# FIXME: Replace development with production
RUN mkdir /yarncache && \
    NODE_ENV=development yarn install --development --network-concurrency 1 --cache-folder /yarncache --frozen-lockfile && \
    yarn cache clean && \
    rm -rf /yarncache && \
    rm -rf /root/.npm && \
    chown 101:101 -R /app

COPY --chown=101:101 . /app/
RUN yarn run build && \
    chown 101:101 -R /app && \
    chmod +x /app/bin/*.sh

##
# Prepare for execution
##

USER 101
ENV PORT=3000

ARG SENTRY_RELEASE=none
ENV SENTRY_RELEASE $SENTRY_RELEASE

EXPOSE 3000/tcp
HEALTHCHECK --interval=30s CMD ["/app/bin/readiness.sh"]

CMD ["/app/node_modules/.bin/next", "start"]
