# syntax=docker/dockerfile:1
FROM node:19-alpine

# Set the Container's current work directory
WORKDIR /app

# Copy the local codebase to the container
COPY . .

# Install dependencies
RUN npm install
RUN yarn install

# Expose Container's port, usually the same port of the web application
EXPOSE 3000

# Run Command
CMD ["npm", "run", "start"]