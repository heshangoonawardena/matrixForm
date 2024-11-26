# Use official Node.js image from the Docker Hub
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache during build
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Generate Prisma client if you're using Prisma
RUN npx prisma generate

# Build the Next.js app for production
RUN npm run build

# Expose port 3000 for the app to be accessible
EXPOSE 3000

# Define the command to run the app when the container starts
CMD ["npm", "run", "start"]
