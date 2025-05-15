# Use the specific Node.js version (adjust the tag if needed)
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./


RUN npm install 

# Copy app source
COPY . .

# Expose port (adjust if your app uses a different port)
EXPOSE 8000

# Start the app
CMD ["npm", "start"]