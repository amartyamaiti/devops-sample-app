FROM node:16-alpine
RUN npm install -g @angular/cli

WORKDIR /devops-ang-app
COPY ./ ./
RUN npm install
EXPOSE 4200
CMD ng serve --host 0.0.0.0 --port 4200
