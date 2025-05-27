# NestJS Template

NestJS template with TypeScript & PostgreSQL.

## Tech Stack

- **Framework**: NestJS v11
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT + Passport
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Code Quality**: ESLint + Prettier

## Prerequisites

- Node.js (v22 or higher)
- Yarn package manager
- PostgreSQL
- Docker (optional)

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
yarn install

# Copy environment file
cp .env.example .env

# Update environment variables
# Edit .env file with your configuration
```

## GitHub Workflows

Automated CI/CD pipelines for code quality and security:

### Lint Workflow
- Runs on push to `master` and PRs
- ESLint code analysis
- Node.js v22 with yarn caching

### Dependency Check
- Weekly security audit
- Outdated packages detection
- Automatic issue creation for vulnerabilities
- Manual trigger available in Actions tab

## Available Commands

### Development

```bash
# Start development server with hot-reload
yarn dev

# Start development server in debug mode
yarn start:debug

# Format code using Prettier
yarn format

# Lint code using ESLint
yarn lint
```

### Database

```bash
# Generate new migration
yarn migration:generate <migration-name>

# Run pending migrations
yarn migration:run

# Revert last migration
yarn migration:revert
```

### Testing

```bash
# Run unit tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:cov

# Run tests in debug mode
yarn test:debug

# Run e2e tests
yarn test:e2e
```

### Production

```bash
# Build the application
yarn build

# Start production server
yarn start:prod
```

## Project Structure

```
src/
├── db/              # Database migrations and seeds
├── users/           # Users module (example)
├── app.module.ts    # Root application module
├── main.ts         # Application entry point
└── typeorm.config.ts # TypeORM configuration
```

## API Documentation

Swagger documentation is available at `http://localhost:3000/api` in development mode.

## Environment Variables

Required environment variables:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=template

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1h
```

## Docker Support

```bash
# Start services using Docker Compose
docker-compose up -d

# Stop services
docker-compose down
```
