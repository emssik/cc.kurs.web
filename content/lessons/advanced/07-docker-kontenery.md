---
title: "Docker i kontenery z Claude Code"
description: "Tworzenie, zarządzanie i optymalizacja kontenerów Docker przy pomocy Claude Code"
duration: 30
difficulty: advanced
tags: [docker, containers, devops, infrastructure]
---

# Docker i kontenery z Claude Code

## Wprowadzenie

Docker jest de facto standardem konteneryzacji aplikacji. Claude Code może znacząco przyspieszyć pracę z Dockerem - od tworzenia Dockerfile, przez debugowanie problemów, po optymalizację obrazów i orkiestrację kontenerów.

## Dlaczego to ważne?

Praca z Dockerem wymaga znajomości:
- **Dockerfile syntax** - wielowarstwowe buildy, caching
- **Multi-stage builds** - optymalizacja rozmiaru obrazów
- **Networking** - łączenie kontenerów
- **Volumes** - persystencja danych
- **Security** - bezpieczne obrazy

Claude Code pomaga na każdym etapie, od prostych Dockerfile po złożone docker-compose setups.

## Część 1: Tworzenie Dockerfile

### Scenariusz 1: Node.js aplikacja

```
user: Stwórz Dockerfile dla mojej Node.js aplikacji
assistant: [Analizuje package.json, następnie tworzy:]
```

```dockerfile
# Multi-stage build dla optymalizacji
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --omit=dev

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js || exit 1

# Start application
CMD ["node", "dist/index.js"]
```

**Claude Code automatycznie dodaje:**
- Multi-stage build (zmniejsza rozmiar o 60-70%)
- Proper layer ordering (cache optimization)
- Non-root user (security)
- Health check
- Alpine base (mniejszy obraz)

### Scenariusz 2: Python FastAPI

```
user: Dockerfile dla Python FastAPI z Poetry
assistant:
```

```dockerfile
FROM python:3.11-slim AS builder

# Install poetry
RUN pip install poetry==1.7.1

WORKDIR /app

# Copy dependency definitions
COPY pyproject.toml poetry.lock ./

# Configure poetry to not create virtual env (we're in container)
RUN poetry config virtualenvs.create false

# Install dependencies
RUN poetry install --no-dev --no-interaction --no-ansi

# Copy application
COPY . .

# Production stage
FROM python:3.11-slim

WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=builder /app /app

# Create non-root user
RUN useradd -m -u 1001 appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

# Use uvicorn for production
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Scenariusz 3: Full-stack (React + Node.js)

```dockerfile
# Stage 1: Build React frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Node.js backend
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ ./
RUN npm run build

# Stage 3: Production
FROM node:20-alpine
WORKDIR /app

# Copy backend
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/node_modules ./node_modules
COPY --from=backend-builder /app/backend/package*.json ./

# Copy frontend build (serve as static)
COPY --from=frontend-builder /app/frontend/build ./public

EXPOSE 3000
CMD ["node", "dist/server.js"]
```

## Część 2: Docker Compose

### Podstawowy setup: App + Database

```
user: Stwórz docker-compose.yml dla Node.js app z PostgreSQL i Redis
assistant:
```

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    container_name: myapp
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@postgres:5432/mydb
      - REDIS_URL=redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    volumes:
      - ./logs:/app/logs
    networks:
      - app-network

  postgres:
    image: postgres:16-alpine
    container_name: myapp-postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    container_name: myapp-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5
    networks:
      - app-network

  # Optional: pgAdmin for database management
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: myapp-pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@example.com
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - postgres
    networks:
      - app-network

volumes:
  postgres-data:
  redis-data:

networks:
  app-network:
    driver: bridge
```

### Development setup z hot reload

```yaml
version: '3.8'

services:
  app-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: myapp-dev
    ports:
      - "3000:3000"
      - "9229:9229"  # Node.js debugger
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://user:password@postgres:5432/mydb_dev
    volumes:
      - .:/app
      - /app/node_modules  # Prevent overwriting node_modules
    command: npm run dev
    depends_on:
      - postgres
    networks:
      - app-network

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres-dev-data:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  postgres-dev-data:

networks:
  app-network:
```

## Część 3: Debugging z Claude Code

### Problem 1: Kontener nie startuje

```
user: Mój kontener myapp ciągle się restartuje, napraw
assistant: [Workflow:]
```

```bash
# 1. Sprawdź logi
docker logs myapp --tail 100

# 2. Sprawdź status
docker ps -a | grep myapp

# 3. Inspect kontener
docker inspect myapp

# 4. Sprawdź resources
docker stats myapp
```

Claude Code analizuje output i identyfikuje problem:

**Typowe problemy:**

1. **Port already in use**
```bash
Error: listen EADDRINUSE: address already in use :::3000
```
Fix: Zmień port w docker-compose.yml lub zabij proces

2. **Out of memory**
```bash
OOMKilled
```
Fix: Zwiększ limits w docker-compose:
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          memory: 2G
```

3. **Permission denied**
```bash
EACCES: permission denied
```
Fix: Sprawdź USER w Dockerfile i ownership volumes

### Problem 2: Wolny build

```
user: Docker build trwa wieczność, zoptymalizuj
assistant: [Analizuje Dockerfile i sugeruje:]
```

**Optymalizacje:**

1. **Lepsza kolejność COPY** (cache layers)
```dockerfile
# ❌ ZŁE - każda zmiana kodu invaliduje cache
COPY . .
RUN npm install

# ✅ DOBRE - instalacja dependencies tylko gdy się zmienią
COPY package*.json ./
RUN npm install
COPY . .
```

2. **BuildKit cache mounts**
```dockerfile
# syntax=docker/dockerfile:1.4
FROM node:20-alpine

RUN --mount=type=cache,target=/root/.npm \
    npm install
```

3. **Multi-stage builds** (pokazane wcześniej)

4. **Docker Buildx** z cache
```bash
docker buildx build \
  --cache-from type=registry,ref=myapp:cache \
  --cache-to type=registry,ref=myapp:cache \
  -t myapp:latest .
```

### Problem 3: Kontener nie może połączyć się z bazą

```
user: App nie może połączyć się z PostgreSQL w dockerze
assistant: [Debuguje:]
```

```bash
# 1. Sprawdź czy postgres działa
docker ps | grep postgres

# 2. Sprawdź network
docker network inspect app-network

# 3. Test połączenia z app container
docker exec -it myapp sh
ping postgres
nc -zv postgres 5432

# 4. Sprawdź logi postgres
docker logs myapp-postgres
```

**Typowe fixes:**

```yaml
# Fix 1: Dodaj healthcheck i depends_on
services:
  app:
    depends_on:
      postgres:
        condition: service_healthy

# Fix 2: Użyj service name jako host
environment:
  - DATABASE_URL=postgresql://user:pass@postgres:5432/db
  # NOT localhost! Service name!

# Fix 3: Sprawdź czy są w tej samej sieci
networks:
  - app-network  # <-- Oba serwisy muszą mieć
```

## Część 4: Security Best Practices

```
user: Jak zabezpieczyć moje Docker images?
assistant: [Implementuje best practices:]
```

### 1. Non-root user

```dockerfile
# Create user
RUN addgroup -g 1001 -S appuser && \
    adduser -S appuser -u 1001

# Set ownership
RUN chown -R appuser:appuser /app

# Switch to user
USER appuser
```

### 2. Minimal base images

```dockerfile
# ❌ ZŁE - duży, więcej attack surface
FROM ubuntu:latest

# ✅ DOBRE - minimalny
FROM node:20-alpine

# ✅ JESZCZE LEPSZE - distroless (Google)
FROM gcr.io/distroless/nodejs20-debian11
```

### 3. Scan for vulnerabilities

```bash
# Trivy
docker run aquasec/trivy image myapp:latest

# Docker Scout (built-in)
docker scout cves myapp:latest

# Snyk
snyk container test myapp:latest
```

Claude Code może automatycznie dodać scanning do CI/CD:

```yaml
# GitHub Actions
- name: Run Trivy scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: 'myapp:latest'
    format: 'sarif'
    output: 'trivy-results.sarif'
```

### 4. Secrets management

```dockerfile
# ❌ NIGDY nie hardcode secrets
ENV API_KEY=secret123

# ✅ Użyj build arguments (only for build time)
ARG BUILD_SECRET
RUN do_something_with $BUILD_SECRET

# ✅ Runtime secrets przez environment lub Docker secrets
```

```yaml
# docker-compose.yml z secrets
services:
  app:
    environment:
      - API_KEY_FILE=/run/secrets/api_key
    secrets:
      - api_key

secrets:
  api_key:
    file: ./secrets/api_key.txt
```

## Część 5: Zaawansowane techniki

### 1. Layer caching optimization

```
user: Mój Docker build jest nadal wolny mimo multi-stage
assistant: [Dodaje BuildKit optimizations:]
```

```dockerfile
# syntax=docker/dockerfile:1.4

FROM node:20-alpine AS builder

# Cache mount dla npm
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Cache mount dla build output
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build
```

### 2. Docker in Docker (DinD) dla CI/CD

```yaml
# GitLab CI with DinD
build:
  image: docker:latest
  services:
    - docker:dind
  variables:
    DOCKER_HOST: tcp://docker:2375
    DOCKER_TLS_CERTDIR: ""
  script:
    - docker build -t myapp:latest .
    - docker push myapp:latest
```

### 3. Healthchecks i graceful shutdown

```dockerfile
# Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node healthcheck.js || exit 1
```

```javascript
// healthcheck.js
const http = require('http');

const options = {
  host: 'localhost',
  port: 3000,
  path: '/health',
  timeout: 2000
};

const request = http.request(options, (res) => {
  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', () => process.exit(1));
request.end();
```

```javascript
// Graceful shutdown in app
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await closeDatabase();
  server.close(() => {
    console.log('HTTP server closed');
  });
});
```

## Zadanie praktyczne

**Cel**: Dockerize własną aplikację

### Część 1: Basic Dockerfile (10 min)

```
user: Stwórz Dockerfile dla mojego [typ projektu]
assistant: [Generuje optimized Dockerfile]
```

Zbuduj i uruchom:
```bash
docker build -t myapp:v1 .
docker run -p 3000:3000 myapp:v1
```

### Część 2: Docker Compose (10 min)

```
user: Dodaj docker-compose.yml z bazą danych
assistant: [Generuje compose file]
```

Uruchom stack:
```bash
docker-compose up -d
docker-compose logs -f app
```

### Część 3: Optimization (5 min)

```
user: Zoptymalizuj rozmiar mojego obrazu
assistant: [Implementuje:]
          - Multi-stage builds
          - Alpine base
          - .dockerignore
```

Porównaj:
```bash
docker images | grep myapp
```

### Część 4: Security scan (5 min)

```bash
# Scan your image
docker run aquasec/trivy image myapp:v1
```

```
user: Napraw znalezione vulnerabilities
assistant: [Aktualizuje base image, dependencies]
```

### Jak Claude Code może Ci pomóc?

```
user: Debuguj dlaczego mój kontener się crashuje
user: Jak mogę zmniejszyć rozmiar obrazu z 2GB do <500MB?
user: Dodaj monitoring i logging do mojego docker-compose
user: Stwórz production-ready setup z nginx jako reverse proxy
```

## Best Practices Checklist

- [ ] **Multi-stage builds** - zmniejsz rozmiar obrazu
- [ ] **Layer caching** - optymalizuj kolejność COPY/RUN
- [ ] **Non-root user** - security first
- [ ] **Alpine base** - tam gdzie możliwe
- [ ] **.dockerignore** - exclude niepotrzebne pliki
- [ ] **Health checks** - monitoring health
- [ ] **Graceful shutdown** - handle SIGTERM
- [ ] **Scan vulnerabilities** - Trivy/Snyk w CI/CD
- [ ] **Secrets management** - nie commituj secrets
- [ ] **Resource limits** - memory/CPU limits
- [ ] **Logging** - stdout/stderr dla Docker logs
- [ ] **Restart policy** - unless-stopped/always

## Podsumowanie

Docker z Claude Code to powerful combination:
- **Szybkie tworzenie** - optimized Dockerfile w sekundach
- **Łatwe debugowanie** - AI analizuje logi i sugeruje fixes
- **Best practices** - automatycznie added
- **Security** - vulnerability scanning i fixes

Kluczowe umiejętności:
1. Multi-stage Dockerfile optimization
2. Docker Compose orchestration
3. Debugging container issues
4. Security hardening
5. CI/CD integration

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

### Security
- [Trivy](https://github.com/aquasecurity/trivy) - vulnerability scanner
- [Docker Bench Security](https://github.com/docker/docker-bench-security)
- [Snyk Container](https://snyk.io/product/container-vulnerability-management/)

### Narzędzia
- [Dive](https://github.com/wagoodman/dive) - analyze image layers
- [Hadolint](https://github.com/hadolint/hadolint) - Dockerfile linter
- [docker-slim](https://github.com/docker-slim/docker-slim) - minify images

### Artykuły
- [Docker Security Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [Optimizing Docker Images](https://docs.docker.com/build/building/best-practices/)

---

**Czas trwania**: ~30 minut
**Poziom**: Zaawansowany
**Wymagania**: Docker installed, podstawy konteneryzacji
