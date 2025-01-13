# Use the official Node.js image as a base
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code and build the production version
COPY . .
RUN npm run build

# Use a minimal Node.js runtime for the production image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Set the command to start the Next.js app
CMD ["npm", "run", "start"]
