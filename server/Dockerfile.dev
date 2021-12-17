FROM node:16-alpine3.12
WORKDIR /app

# Install required packages
COPY package.json /app/package.json
RUN yarn install

# Copy application components
COPY src/ /app/src/

# Inter-container communication, but still useful to see here for reference
EXPOSE 5000

# Run the application
CMD ["yarn", "run", "serve"]

