# Use Node.js base image
FROM node:16-alpine

# Create a directory to store the app
WORKDIR /usr/src/app

# Copy server.js and package.json to the container
COPY server.js package.json ./

# Install dependencies
RUN npm install

# Copy contents from the 'public' directory to the container
COPY public/ ./public/

# Expose port 3000 for the Node.js app
EXPOSE 3000

# Command to start the server
CMD ["node", "server.js"]
