---
title: "Deployment Strategies"
description: "Bezpieczne strategie wdrażania aplikacji: blue-green, canary, rolling deployments"
duration: 25
difficulty: advanced
tags: [deployment, devops, production, ci-cd]
---

# Deployment Strategies z Claude Code

## Wprowadzenie

Deployment to krytyczny moment - Claude Code pomaga wybrać odpowiednią strategię i zautomatyzować proces wdrożenia.

## Strategie Deployment

### 1. Rolling Deployment

Stopniowa zamiana starych instancji nowymi.

```yaml
# Kubernetes Rolling Update
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 10
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 2 # Max 12 pods during update
      maxUnavailable: 1 # Min 9 pods available
  template:
    spec:
      containers:
        - name: app
          image: myapp:v2
```

### 2. Blue-Green Deployment

Dwa identyczne środowiska, przełączanie traffic.

```
user: Setup blue-green deployment na AWS
assistant:
```

```yaml
# Blue environment (current production)
service_blue:
  image: myapp:v1
  target_group: blue-tg

# Green environment (new version)
service_green:
  image: myapp:v2
  target_group: green-tg

# Switch traffic
load_balancer:
  target: green-tg # ← One-time switch
```

### 3. Canary Deployment

Stopniowe przekierowywanie traffic do nowej wersji.

```yaml
# Nginx canary routing
upstream backend {
  server v1.myapp.com weight=90; # 90% traffic
  server v2.myapp.com weight=10; # 10% traffic (canary)
}
```

### 4. Feature Flags

```typescript
if (featureFlags.isEnabled('new-checkout', user)) {
  return <NewCheckout />;
} else {
  return <OldCheckout />;
}
```

## CI/CD Pipeline

```
user: Setup pełny deployment pipeline
```

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: docker build -t myapp:${{ github.sha }} .
      - run: docker push myapp:${{ github.sha }}

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: kubectl set image deployment/myapp myapp=myapp:${{ github.sha }}
      - run: kubectl rollout status deployment/myapp

  smoke-test:
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - run: curl -f https://staging.myapp.com/health

  deploy-production:
    needs: smoke-test
    environment: production
    runs-on: ubuntu-latest
    steps:
      - run: kubectl set image deployment/myapp myapp=myapp:${{ github.sha }}
```

## Rollback Strategy

```bash
# Kubernetes rollback
kubectl rollout undo deployment/myapp

# Docker rollback
docker service update --rollback myapp

# Git rollback
git revert HEAD
git push
```

## Dodatkowe materiały

- [Kubernetes Deployment Strategies](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Martin Fowler - Blue Green Deployment](https://martinfowler.com/bliki/BlueGreenDeployment.html)

---

**Czas trwania**: ~25 minut
