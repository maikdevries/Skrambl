FROM denoland/deno:alpine AS builder
WORKDIR /app

COPY deno.json .
RUN deno install

COPY app.ts .
COPY src/common/ ./src/common/
COPY src/server/ ./src/server/
RUN deno cache app.ts

# ---

FROM denoland/deno:distroless
WORKDIR /app

# [NOTE] Installed modules
COPY --from=builder ${DENO_DIR} ${DENO_DIR}

COPY --from=builder /app .
CMD ["run", "-EN", "app.ts"]
