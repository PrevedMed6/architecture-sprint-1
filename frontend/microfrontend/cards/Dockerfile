FROM node:18-slim
WORKDIR /app
COPY cards/ .                       
COPY user_context/ ./user_context  

RUN npm install
RUN npm run build

EXPOSE 3002
CMD ["npm", "start"]