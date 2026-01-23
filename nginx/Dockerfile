FROM node:alpine AS builder

WORKDIR /app

RUN npm install typescript

COPY src/client/ .
RUN npx tsc -p ./ts/tsconfig.json

FROM nginx:alpine
COPY --from=builder /app/ /usr/share/nginx/static/

# CMD is image default
