FROM node:12.18.3-alpine

WORKDIR /app

COPY . .

RUN npm install --global pnpm@5 && \
  pnpm install --prod

EXPOSE 3000

ENTRYPOINT [ "pnpm", "start" ]
