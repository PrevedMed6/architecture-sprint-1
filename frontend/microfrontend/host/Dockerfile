FROM node:18-slim
WORKDIR /app
COPY host/ .                       
COPY user_context/ ./user_context  

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]