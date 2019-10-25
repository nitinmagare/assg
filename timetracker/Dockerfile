FROM node:alpine AS builder

WORKDIR /timetracker

COPY . .

RUN npm install && \
    npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /timetracker/dist/* /usr/share/nginx/html/
