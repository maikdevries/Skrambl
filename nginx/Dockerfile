FROM node:alpine AS builder

WORKDIR /app

COPY src/client/ .
RUN npx -p typescript tsc -p ./ts/tsconfig.json

FROM nginx:alpine
COPY --from=builder /app/ /usr/share/nginx/static/

# CMD is image default
