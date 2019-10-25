FROM node:alpine AS builder

WORKDIR /timetracker

COPY . .

RUN npm install && \
    npm run build

FROM nginx:alpine

COPY --from=builder /timetracker/dist/* /usr/share/nginx/html/