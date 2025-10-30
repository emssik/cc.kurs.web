---
title: "Security Best Practices"
description: "Zabezpieczanie aplikacji: authentication, authorization, input validation, secrets management"
duration: 30
difficulty: advanced
tags: [security, authentication, authorization, owasp]
---

# Security Best Practices z Claude Code

## Wprowadzenie

Security to nie opcja, to konieczność. Claude Code pomaga implementować security best practices zgodne z OWASP Top 10.

## OWASP Top 10 (2021)

### 1. Broken Access Control

```typescript
// ❌ VULNERABLE - No authorization check
app.delete('/users/:id', async (req, res) => {
  await deleteUser(req.params.id);
  res.json({ success: true });
});

// ✅ SECURE - Authorization check
app.delete('/users/:id', authenticateUser, async (req, res) => {
  if (req.user.id !== parseInt(req.params.id) && !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  await deleteUser(req.params.id);
  res.json({ success: true });
});
```

### 2. Cryptographic Failures

```typescript
// ❌ VULNERABLE - Storing plain passwords
await db.user.create({
  email: user.email,
  password: user.password, // Plain text!
});

// ✅ SECURE - Hashing passwords
import bcrypt from 'bcrypt';

const hashedPassword = await bcrypt.hash(user.password, 10);
await db.user.create({
  email: user.email,
  passwordHash: hashedPassword,
});

// Verification
const isValid = await bcrypt.compare(inputPassword, user.passwordHash);
```

### 3. Injection

```typescript
// ❌ VULNERABLE - SQL Injection
const query = `SELECT * FROM users WHERE email = '${req.body.email}'`;
await db.query(query);

// ✅ SECURE - Parameterized query
const user = await prisma.user.findUnique({
  where: { email: req.body.email },
});
```

### 4. Insecure Design

**Use security headers:**

```typescript
import helmet from 'helmet';
app.use(helmet());

// Custom headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  next();
});
```

### 5. Security Misconfiguration

```typescript
// ❌ VULNERABLE - Debug mode in production
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler({ debug: true }));
}

// ✅ SECURE - Different configs per environment
const config = {
  development: { debug: true, logLevel: 'debug' },
  production: { debug: false, logLevel: 'error' },
}[process.env.NODE_ENV];
```

### 6. Vulnerable Components

```bash
# Regular security audits
npm audit
npm audit fix

# Automated checks in CI
npm audit --audit-level=moderate
```

### 7. Authentication Failures

```typescript
import jwt from 'jsonwebtoken';

// Generate JWT
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// Verify JWT
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Rate limiting
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts',
});

app.post('/login', loginLimiter, loginHandler);
```

### 8. Software and Data Integrity

```typescript
// Verify file uploads
import fileType from 'file-type';

app.post('/upload', async (req, res) => {
  const buffer = req.file.buffer;
  const type = await fileType.fromBuffer(buffer);

  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!type || !allowedTypes.includes(type.mime)) {
    return res.status(400).json({ error: 'Invalid file type' });
  }

  // Process file...
});
```

### 9. Security Logging Failures

```typescript
// Log security events
logger.warn('Failed login attempt', {
  email: req.body.email,
  ip: req.ip,
  timestamp: new Date(),
});

logger.error('Unauthorized access attempt', {
  userId: req.user.id,
  resource: req.path,
  method: req.method,
});
```

### 10. Server-Side Request Forgery (SSRF)

```typescript
// ❌ VULNERABLE - User-controlled URL
app.post('/fetch', async (req, res) => {
  const data = await fetch(req.body.url); // Danger!
  res.json(data);
});

// ✅ SECURE - Whitelist allowed domains
const ALLOWED_DOMAINS = ['api.example.com', 'cdn.example.com'];

app.post('/fetch', async (req, res) => {
  const url = new URL(req.body.url);

  if (!ALLOWED_DOMAINS.includes(url.hostname)) {
    return res.status(400).json({ error: 'Invalid domain' });
  }

  const data = await fetch(req.body.url);
  res.json(data);
});
```

## Input Validation

```typescript
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  age: z.number().int().min(18).max(120),
});

app.post('/register', async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body);
    // Process validated data...
  } catch (error) {
    return res.status(400).json({ errors: error.errors });
  }
});
```

## Secrets Management

```typescript
// ❌ NEVER commit secrets
const API_KEY = 'sk_live_123456789';

// ✅ Use environment variables
const API_KEY = process.env.API_KEY;

// ✅ Use secret managers (AWS Secrets Manager, Vault)
import { SecretsManager } from 'aws-sdk';

const secrets = new SecretsManager();
const { SecretString } = await secrets
  .getSecretValue({ SecretId: 'myapp/api-key' })
  .promise();
const API_KEY = JSON.parse(SecretString).apiKey;
```

## CORS Configuration

```typescript
import cors from 'cors';

// ❌ VULNERABLE - Allow all origins
app.use(cors({ origin: '*' }));

// ✅ SECURE - Whitelist specific origins
app.use(
  cors({
    origin: ['https://myapp.com', 'https://app.myapp.com'],
    credentials: true,
    maxAge: 86400,
  })
);
```

## Content Security Policy

```typescript
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.example.com'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'api.example.com'],
      fontSrc: ["'self'", 'fonts.gstatic.com'],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
```

## Security Checklist

- [ ] **Authentication** - JWT/OAuth2, MFA
- [ ] **Authorization** - Role-based access control
- [ ] **Input Validation** - Zod/Joi schemas
- [ ] **Password Hashing** - bcrypt, argon2
- [ ] **SQL Injection** - Parameterized queries
- [ ] **XSS Prevention** - Content Security Policy
- [ ] **CSRF Protection** - CSRF tokens
- [ ] **Security Headers** - Helmet.js
- [ ] **HTTPS Only** - Force SSL/TLS
- [ ] **Rate Limiting** - Prevent brute force
- [ ] **Secrets Management** - Never commit secrets
- [ ] **Dependency Audits** - npm audit, Snyk
- [ ] **Error Handling** - No sensitive info in errors
- [ ] **Logging** - Security events logged
- [ ] **CORS** - Whitelist origins

## Dodatkowe materiały

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Security Headers](https://securityheaders.com/)
- [Snyk](https://snyk.io/) - Dependency scanning

---

**Czas trwania**: ~30 minut
