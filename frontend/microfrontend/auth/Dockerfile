FROM node:18-slim

WORKDIR /app
COPY auth/ .                       

RUN npm install
RUN npm run build

EXPOSE 3003
CMD ["npm", "start"]