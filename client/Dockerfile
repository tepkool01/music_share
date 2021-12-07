FROM node:12.2.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Install required packages
COPY package.json /app/package.json
RUN yarn install

# Copy application components
COPY . .

#EXPOSE 8080
#USER node

# Run the application
CMD ["yarn", "run", "serve"]

