.PHONY: help install dev build test test-watch test-cov test-e2e lint format docker-up docker-down docker-reset docker-logs docker-logs-postgres docker-logs-redis migrate-gen migrate-run migrate-revert clean clean-all setup start-prod

# Variables
NODE_ENV ?= development

help:
	@echo "Available commands:"
	@echo "  make install              - Install dependencies"
	@echo "  make dev                  - Start development server"
	@echo "  make build                - Build the project"
	@echo "  make start-prod           - Start production server"
	@echo "  make test                 - Run tests once"
	@echo "  make test-watch           - Run tests in watch mode"
	@echo "  make test-cov             - Run tests with coverage"
	@echo "  make test-e2e             - Run e2e tests"
	@echo "  make lint                 - Run ESLint and fix issues"
	@echo "  make format               - Format code with Prettier"
	@echo "  make docker-up            - Start Docker services"
	@echo "  make docker-down          - Stop Docker services"
	@echo "  make docker-reset         - Reset Docker services (clean volumes)"
	@echo "  make docker-logs          - Show all Docker logs"
	@echo "  make docker-logs-postgres - Show PostgreSQL logs"
	@echo "  make docker-logs-redis    - Show Redis logs"
	@echo "  make migrate-gen          - Generate a new database migration"
	@echo "  make migrate-run          - Run pending migrations"
	@echo "  make migrate-revert       - Revert last migration"
	@echo "  make clean                - Remove node_modules and dist"
	@echo "  make clean-all            - Remove node_modules, dist, and Docker volumes"
	@echo "  make setup                - Initial setup (install + docker-up)"

install:
	yarn install

dev: docker-up
	yarn dev

build:
	yarn build

start-prod:
	NODE_ENV=production node dist/main

test:
	yarn test

test-watch:
	yarn test:watch

test-cov:
	yarn test:cov

test-e2e:
	yarn test:e2e

lint:
	yarn lint

format:
	yarn format

docker-up:
	docker-compose up -d
	@echo "✓ Services started (PostgreSQL, Redis)"

docker-down:
	docker-compose down
	@echo "✓ Services stopped"

docker-reset: docker-down
	docker-compose down -v
	docker-compose up -d
	@echo "✓ Services reset with fresh volumes"

docker-logs:
	docker-compose logs -f

docker-logs-postgres:
	docker-compose logs -f postgres

docker-logs-redis:
	docker-compose logs -f redis

migrate-gen:
	@read -p "Enter migration name: " name; \
	yarn migration:generate $$name

migrate-run:
	yarn migration:run

migrate-revert:
	yarn migration:revert

clean:
	rm -rf node_modules dist

clean-all: clean
	docker-compose down -v
	@echo "✓ Cleaned node_modules, dist, and Docker volumes"

setup: install docker-up
	@echo "✓ Setup complete! Run 'make dev' to start"

.DEFAULT_GOAL := help
