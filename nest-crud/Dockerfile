# syntax=docker/dockerfile:1
FROM node:19-alpine AS builder

# Set the Container's current work directory
WORKDIR /app

# Copy the local codebase to the container
COPY package*.json ./
COPY prisma ./prisma/
COPY . .

# Install dependencies
RUN npm install
RUN yarn install

# Build nest
RUN npm run build

FROM node:19-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

WORKDIR /app

# Expose Container's port, usually the same port of the web application
EXPOSE 3000

# Run Command
CMD ["npm", "run", "start"]