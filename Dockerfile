# Use a Node.js image as the base
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json to the container
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Run the app
CMD ["npm", "start"]
