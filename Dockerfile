FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Étape 2 : Serveur Nginx
FROM nginx:alpine
COPY --from=build /app/dist/my-angular-website /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
