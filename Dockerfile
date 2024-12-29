# Step 1: Use Node.js as the base image
FROM node:18

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire application code
COPY . .

# Step 6: Expose Angular's default dev server port
EXPOSE 4200

# Step 7: Start the Angular app
CMD ["npm", "start"]
