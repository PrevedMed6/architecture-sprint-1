FROM node:18-slim

WORKDIR /app
COPY ui_controls/ .                       

RUN npm install
RUN npm run build

EXPOSE 3004
CMD ["npm", "start"]