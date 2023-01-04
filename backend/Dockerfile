FROM node:18-alpine
WORKDIR /app
COPY . ./
RUN npm install
COPY . .

ENV NODE_ENV=production

RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]