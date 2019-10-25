FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm build --prod

FROM nginx:alpine
COPY --from=node /app/dist/timetracker /user/share/nginx/html