---
title: "Performance Optimization"
description: "Identyfikacja bottlenecków i optymalizacja performance aplikacji z Claude Code"
duration: 30
difficulty: advanced
tags: [performance, optimization, profiling, caching, scalability]
---

# Performance Optimization z Claude Code

## Wprowadzenie

Performance to kluczowy element user experience. Claude Code może pomóc zidentyfikować bottlenecki, zasugerować optymalizacje i zaimplementować caching, lazy loading i inne techniki.

## Metodologia optymalizacji

### 1. Measure (Zmierz)
### 2. Identify (Zidentyfikuj bottleneck)
### 3. Optimize (Optymalizuj)
### 4. Verify (Zweryfikuj improvement)

**Złota zasada**: Zawsze mierz PRZED i PO optymalizacji!

## Backend Performance

### Database Query Optimization

```
user: Ten endpoint jest wolny, zoptymalizuj
```

**Problem: N+1 Query**

```typescript
// ❌ SLOW - N+1 queries
async function getUsers() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    user.posts = await prisma.post.findMany({
      where: { userId: user.id },
    });
  }
  return users;
}

// ✅ OPTIMIZED - Single query with JOIN
async function getUsers() {
  return await prisma.user.findMany({
    include: {
      posts: {
        select: { id: true, title: true, createdAt: true },
      },
    },
  });
}

// Performance: 1000ms → 50ms (20x faster!)
```

### Caching Strategy

```typescript
import { Redis } from 'ioredis';
const redis = new Redis();

async function getUser(id: number): Promise<User> {
  // Check cache first
  const cached = await redis.get(`user:${id}`);
  if (cached) {
    return JSON.parse(cached);
  }

  // Cache miss - fetch from database
  const user = await prisma.user.findUnique({ where: { id } });

  // Store in cache (TTL: 1 hour)
  await redis.setex(`user:${id}`, 3600, JSON.stringify(user));

  return user;
}
```

### Pagination

```typescript
// ❌ BAD - Loading all records
async function getPosts() {
  return await prisma.post.findMany(); // 10,000 records!
}

// ✅ GOOD - Cursor-based pagination
async function getPosts(cursor?: number, limit = 20) {
  return await prisma.post.findMany({
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
  });
}
```

### Background Jobs

```typescript
// ❌ SLOW - Blocking operation
app.post('/users', async (req, res) => {
  const user = await createUser(req.body);
  await sendWelcomeEmail(user.email); // ← Blocks response!
  res.json(user);
});

// ✅ FAST - Background job
import { Queue } from 'bullmq';
const emailQueue = new Queue('emails');

app.post('/users', async (req, res) => {
  const user = await createUser(req.body);
  await emailQueue.add('welcome', { email: user.email }); // ← Non-blocking
  res.json(user);
});

// Performance: 2000ms → 100ms
```

## Frontend Performance

### Code Splitting

```tsx
// ❌ SLOW - Import wszystkiego upfront
import AdminPanel from './AdminPanel';
import Dashboard from './Dashboard';

// ✅ FAST - Lazy load tylko gdy potrzeba
const AdminPanel = lazy(() => import('./AdminPanel'));
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Suspense>
  );
}
```

### Memoization

```tsx
// ❌ SLOW - Recalculates on every render
function ExpensiveComponent({ data }) {
  const processed = processData(data); // Expensive!
  return <div>{processed}</div>;
}

// ✅ FAST - Memoized
import { useMemo } from 'react';

function ExpensiveComponent({ data }) {
  const processed = useMemo(() => processData(data), [data]);
  return <div>{processed}</div>;
}
```

### Virtual Scrolling

```tsx
// ❌ SLOW - Rendering 10,000 items
function UserList({ users }) {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// ✅ FAST - Virtual scrolling (tylko visible items)
import { FixedSizeList } from 'react-window';

function UserList({ users }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={users.length}
      itemSize={80}
      width="100%"
    >
      {({ index, style }) => (
        <UserCard style={style} user={users[index]} />
      )}
    </FixedSizeList>
  );
}
```

### Image Optimization

```tsx
// ❌ SLOW - Large images
<img src="/photo.jpg" /> {/* 5MB! */}

// ✅ FAST - Optimized
<picture>
  <source srcSet="/photo.webp" type="image/webp" />
  <source srcSet="/photo.jpg" type="image/jpeg" />
  <img
    src="/photo.jpg"
    loading="lazy"
    width="800"
    height="600"
    alt="Photo"
  />
</picture>
```

## Profiling Tools

### Node.js Profiling

```bash
# CPU profiling
node --prof app.js
node --prof-process isolate-*.log > profile.txt

# Heap profiling
node --inspect app.js
# Open chrome://inspect
```

```
user: Profile ten endpoint i znajdź bottleneck
assistant: [Używa clinic.js lub 0x]
```

### Frontend Profiling

```javascript
// Performance API
performance.mark('start-fetch');
await fetchData();
performance.mark('end-fetch');
performance.measure('fetch-data', 'start-fetch', 'end-fetch');

const measure = performance.getEntriesByName('fetch-data')[0];
console.log(`Fetch took ${measure.duration}ms`);
```

## Zadanie praktyczne

```
user: Zoptymalizuj ten slow endpoint
```

1. **Measure**: Dodaj timing
2. **Profile**: Znajdź bottleneck
3. **Optimize**: Apply techniques
4. **Verify**: Compare before/after

## Dodatkowe materiały

- [Web.dev Performance](https://web.dev/performance/)
- [Node.js Performance Best Practices](https://nodejs.org/en/docs/guides/simple-profiling/)

---

**Czas trwania**: ~30 minut
