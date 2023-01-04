FROM node:18.12.1-buster-slim
WORKDIR /app
COPY . ./

# Use pnpm for faster package installation
RUN npm i -g install pnpm

# Install packages
RUN pnpm install

COPY . .

# Setting the environment variable NODE_ENV to production.
ENV NODE_ENV=production

# Build Script
RUN pnpm run build

# Expose port 5000
EXPOSE 5000

# Running the start script in the package.json file.
CMD ["pnpm", "start"]