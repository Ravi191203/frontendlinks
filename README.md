## Running with Docker

You can run this project as a production-ready static site using Docker and Docker Compose. The provided `Dockerfile` builds the React app with Node.js (version 22.13.1) and serves the optimized build using Nginx in a minimal Alpine container.

### Requirements
- Docker
- Docker Compose

### Build and Run

In the project directory, run:

```
docker compose up --build
```

This will:
- Build the React app using Node.js 22.13.1 (as specified in the Dockerfile)
- Serve the static build with Nginx
- Expose the app on [http://localhost](http://localhost)

### Ports
- The app is available on port **80** (as mapped in `docker-compose.yml`)

### Environment Variables
- No environment variables are required by default. If you need to add any, you can uncomment the `env_file` line in `docker-compose.yml` and provide a `.env` file.

### Notes
- No persistent volumes or external dependencies are required for this setup.
- The container runs as a non-root user for improved security.

For development, you can continue to use the standard npm scripts as described above. The Docker setup is intended for production builds.