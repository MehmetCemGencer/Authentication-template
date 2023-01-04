FROM node:18-alpine
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm ci; \
        else npm install --only=production; \
        fi
COPY . .
EXPOSE 8000
CMD ["npm", "start"]