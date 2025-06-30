# my-storybook-app

A project for testing out storybook and chromatic with a React Router v7 app.

📚 [View Storybook](https://master--6861c92d8f64e82f420817c9.chromatic.com)

🔗 [View Chromatic Library](https://www.chromatic.com/library?appId=6861c92d8f64e82f420817c9&branch=master)


## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Start the development server with HMR:

```bash
pnpm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
pnpm run build
```

## Deployment

### Fly.io Deployment (Recommended)

Deploy to Fly.io with their CLI:

```bash
# Install Fly.io CLI
curl -L https://fly.io/install.sh | sh

# Authenticate (sign up if needed)
fly auth login

# Deploy your app
fly launch

# For subsequent deployments
fly deploy
```

Your app will be available at `https://your-app-name.fly.dev`

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `pnpm run build`

```
├── package.json
├── pnpm-lock.yaml
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```
