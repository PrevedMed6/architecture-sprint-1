FROM node:18-slim

WORKDIR /app
COPY users/ .                       
COPY user_context/ ./user_context  

RUN npm install
RUN npm run build

EXPOSE 3001
CMD ["npm", "start"]