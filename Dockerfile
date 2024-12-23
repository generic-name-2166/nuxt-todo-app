FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build


FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.output .

EXPOSE 3000

ENTRYPOINT [ "node", "server/index.mjs" ]
