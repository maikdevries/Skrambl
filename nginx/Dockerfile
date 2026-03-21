FROM node:alpine AS builder
WORKDIR /app

RUN npm install typescript

COPY src/client/ .
RUN npx tsc -p ./ts/tsconfig.json

# ---

FROM nginxinc/nginx-unprivileged:alpine-slim

COPY --from=builder /app/ /usr/share/nginx/static/

# [NOTE] CMD is image default
