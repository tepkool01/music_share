FROM node:16-alpine3.12
WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH

# Install required packages
COPY package.json /app/package.json
RUN yarn install

# Copy application components
COPY . .

# Inter-container communication, but still useful to see here for reference
EXPOSE 8080

# Run the application
CMD ["yarn", "run", "serve"]

