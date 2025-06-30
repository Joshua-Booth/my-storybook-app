FROM node:20-alpine AS development-dependencies-env

# Install pnpm
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install

FROM node:20-alpine AS production-dependencies-env

# Install pnpm
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install --prod --frozen-lockfile

FROM node:20-alpine AS build-env

# Install pnpm
RUN npm install -g pnpm

COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN pnpm run build

FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app

# Set default port (can be overridden with environment variable)
ENV PORT=3000
EXPOSE $PORT

CMD ["pnpm", "run", "start"]