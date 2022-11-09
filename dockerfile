FROM node
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps && npm run build
EXPOSE 3000
CMD npm run start
