---
title: "Monitoring i Logging"
description: "Observability: monitoring, logging, tracing i alerting w production"
duration: 25
difficulty: advanced
tags: [monitoring, logging, observability, alerting]
---

# Monitoring i Logging z Claude Code

## Wprowadzenie

"If you can't measure it, you can't improve it." Claude Code pomaga zaimplementować comprehensive monitoring i logging.

## Trzy filary Observability

### 1. Metrics (Metryki)

```typescript
// Prometheus metrics
import { Counter, Histogram } from 'prom-client';

const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route'],
});

app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestsTotal.inc({
      method: req.method,
      route: req.route?.path,
      status: res.statusCode,
    });
    httpRequestDuration.observe(
      { method: req.method, route: req.route?.path },
      duration
    );
  });

  next();
});
```

### 2. Logs (Logi)

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Structured logging
logger.info('User created', {
  userId: user.id,
  email: user.email,
  timestamp: new Date(),
  requestId: req.id,
});

logger.error('Database connection failed', {
  error: err.message,
  stack: err.stack,
  context: { operation: 'user-creation' },
});
```

### 3. Traces (Śledzenie)

```typescript
import { trace, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('myapp');

async function createOrder(data) {
  const span = tracer.startSpan('createOrder');

  try {
    span.setAttribute('user.id', data.userId);
    span.setAttribute('order.items', data.items.length);

    const order = await saveOrder(data);
    span.setStatus({ code: SpanStatusCode.OK });
    return order;
  } catch (error) {
    span.setStatus({
      code: SpanStatusCode.ERROR,
      message: error.message,
    });
    throw error;
  } finally {
    span.end();
  }
}
```

## Monitoring Stack

### Setup Prometheus + Grafana

```
user: Setup monitoring dla Node.js app
assistant:
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'

  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - '9090:9090'

  grafana:
    image: grafana/grafana
    ports:
      - '3001:3000'
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'myapp'
    static_configs:
      - targets: ['app:3000']
```

## Alerting

```yaml
# alerts.yml
groups:
  - name: application
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        annotations:
          summary: 'High error rate detected'

      - alert: HighLatency
        expr: histogram_quantile(0.95, http_request_duration_seconds) > 1
        for: 5m
        annotations:
          summary: 'P95 latency > 1s'
```

## Error Tracking

```typescript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

app.use(Sentry.Handlers.errorHandler());

// Capture context
Sentry.setUser({ id: user.id, email: user.email });
Sentry.setTag('feature', 'checkout');
Sentry.captureException(error);
```

## Health Checks

```typescript
app.get('/health', async (req, res) => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    externalAPI: await checkExternalAPI(),
  };

  const allHealthy = Object.values(checks).every((check) => check.healthy);

  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'healthy' : 'unhealthy',
    checks,
    timestamp: new Date(),
  });
});
```

## Dodatkowe materiały

- [Prometheus Documentation](https://prometheus.io/docs/)
- [OpenTelemetry](https://opentelemetry.io/)
- [The Twelve-Factor App: Logs](https://12factor.net/logs)

---

**Czas trwania**: ~25 minut
