FROM public.ecr.aws/docker/library/node:16-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

RUN npm run build

RUN npm prune --production

FROM public.ecr.aws/docker/library/node:16-alpine AS production

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist .
COPY --from=builder /app/node_modules ./node_modules

CMD node main