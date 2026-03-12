# Use a lightweight version of Node as the base operating system
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /backend

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies inside the container
RUN npm install

# Copy the rest of your application code
COPY . .

# Generate the Prisma Client (Required before building)
RUN npm run generate

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port your Express app runs on
EXPOSE 4000

# The command to start your compiled server
CMD ["npm", "start"]