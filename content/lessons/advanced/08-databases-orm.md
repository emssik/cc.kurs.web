---
title: "Databases i ORM z Claude Code"
description: "Praca z bazami danych: projektowanie schematów, migrations, queries i optymalizacja z pomocą Claude Code"
duration: 30
difficulty: advanced
tags: [database, orm, sql, prisma, typeorm, migrations]
---

# Databases i ORM z Claude Code

## Wprowadzenie

Bazy danych są sercem większości aplikacji. Claude Code może znacząco przyspieszyć pracę z bazami - od projektowania schematów, przez tworzenie migrations i queries, po debugowanie problemów z performance i optymalizację zapytań.

## Dlaczego to ważne?

Praca z bazami danych wymaga:
- **Projektowania schematów** - normalizacja, relacje, indexy
- **Migrations management** - wersjonowanie zmian w schemacie
- **Query optimization** - EXPLAIN, indexes, N+1 problems
- **ORM knowledge** - Prisma, TypeORM, Sequelize, SQLAlchemy
- **Security** - SQL injection, prepared statements

Claude Code pomaga na każdym z tych poziomów.

## Część 1: MCP Integration z bazami danych

### Setup PostgreSQL MCP Server

```bash
npm install -g @modelcontextprotocol/server-postgres
```

```json
{
  "mcpServers": {
    "postgres": {
      "command": "mcp-server-postgres",
      "args": [],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${DATABASE_URL}"
      }
    }
  }
}
```

Po konfiguracji:

```
user: Pokaż mi wszystkie tabele w bazie
assistant: [Używa mcp__postgres__list_tables]

user: Opisz schemat tabeli users
assistant: [Używa mcp__postgres__describe_table]

          Table: users
          Columns:
          - id: integer (primary key)
          - email: varchar(255) (unique, not null)
          - name: varchar(100)
          - created_at: timestamp (default now())
          - updated_at: timestamp
```

## Część 2: Projektowanie schematów

### Scenariusz 1: E-commerce database

```
user: Zaprojektuj schemat bazy dla e-commerce z users, products, orders, order_items
assistant: [Tworzy ERD i SQL:]
```

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    category_id INTEGER REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_price ON products(price);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at);

-- Order Items table (junction table)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price_at_time DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    parent_id INTEGER REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_parent ON categories(parent_id);
```

**Claude Code automatycznie:**
- Dodaje proper foreign keys z ON DELETE CASCADE
- Tworzy indexes dla często używanych kolumn
- Używa odpowiednich typów danych
- Dodaje timestamps dla auditingu
- Implementuje normalizację

### Scenariusz 2: Prisma Schema

```
user: Stwórz Prisma schema dla tego samego e-commerce
assistant:
```

```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  passwordHash String   @map("password_hash")
  firstName    String?  @map("first_name")
  lastName     String?  @map("last_name")
  orders       Order[]
  createdAt    DateTime @default(now()) @map("created_at")
  updatedAt    DateTime @updatedAt @map("updated_at")

  @@index([email])
  @@map("users")
}

model Category {
  id        Int        @id @default(autoincrement())
  name      String     @unique
  parentId  Int?       @map("parent_id")
  parent    Category?  @relation("CategoryTree", fields: [parentId], references: [id])
  children  Category[] @relation("CategoryTree")
  products  Product[]
  createdAt DateTime   @default(now()) @map("created_at")

  @@index([parentId])
  @@map("categories")
}

model Product {
  id            Int         @id @default(autoincrement())
  name          String
  description   String?
  price         Decimal     @db.Decimal(10, 2)
  stockQuantity Int         @default(0) @map("stock_quantity")
  categoryId    Int?        @map("category_id")
  category      Category?   @relation(fields: [categoryId], references: [id])
  orderItems    OrderItem[]
  createdAt     DateTime    @default(now()) @map("created_at")
  updatedAt     DateTime    @updatedAt @map("updated_at")

  @@index([categoryId])
  @@index([price])
  @@map("products")
}

model Order {
  id          Int         @id @default(autoincrement())
  userId      Int         @map("user_id")
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  status      String      @default("pending")
  totalAmount Decimal     @map("total_amount") @db.Decimal(10, 2)
  items       OrderItem[]
  createdAt   DateTime    @default(now()) @map("created_at")
  updatedAt   DateTime    @updatedAt @map("updated_at")

  @@index([userId])
  @@index([status])
  @@index([createdAt])
  @@map("orders")
}

model OrderItem {
  id          Int      @id @default(autoincrement())
  orderId     Int      @map("order_id")
  order       Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId   Int      @map("product_id")
  product     Product  @relation(fields: [productId], references: [id])
  quantity    Int
  priceAtTime Decimal  @map("price_at_time") @db.Decimal(10, 2)
  createdAt   DateTime @default(now()) @map("created_at")

  @@index([orderId])
  @@index([productId])
  @@map("order_items")
}
```

## Część 3: Migrations

### TypeORM Migrations

```
user: Stwórz TypeORM migration do dodania kolumny 'phone' do users
assistant:
```

```typescript
// migrations/1234567890-AddPhoneToUsers.ts
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPhoneToUsers1234567890 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "phone",
                type: "varchar",
                length: "20",
                isNullable: true,
            })
        );

        // Add index for phone lookups
        await queryRunner.query(
            `CREATE INDEX "IDX_users_phone" ON "users" ("phone")`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_users_phone"`);
        await queryRunner.dropColumn("users", "phone");
    }
}
```

### Prisma Migrations

```
user: Dodaj pole 'verified' do User w Prisma
assistant: [Edytuje schema.prisma i generuje migration]
```

```prisma
model User {
  // ... existing fields
  verified  Boolean @default(false)
  // ...
}
```

```bash
# Claude Code może automatycznie uruchomić:
npx prisma migrate dev --name add_user_verified
npx prisma generate
```

### Bezpieczne migrations dla production

```
user: Jak bezpiecznie zmienić typ kolumny w production bez downtime?
assistant: [Wyjaśnia multi-step migration:]
```

```sql
-- Step 1: Add new column
ALTER TABLE products ADD COLUMN price_new DECIMAL(12, 2);

-- Step 2: Copy data (in application code, gradually)
UPDATE products SET price_new = price WHERE price_new IS NULL LIMIT 1000;

-- Step 3: Update application to use new column

-- Step 4: After verification, drop old column
ALTER TABLE products DROP COLUMN price;
ALTER TABLE products RENAME COLUMN price_new TO price;
```

## Część 4: Query Optimization

### Problem N+1

```
user: Mój endpoint /users jest wolny, zoptymalizuj
assistant: [Analizuje kod:]
```

```typescript
// ❌ N+1 Problem
async function getUsers() {
  const users = await prisma.user.findMany();

  // N queries (one per user)
  for (const user of users) {
    user.orders = await prisma.order.findMany({
      where: { userId: user.id }
    });
  }
  return users;
}

// ✅ FIXED with eager loading
async function getUsers() {
  return await prisma.user.findMany({
    include: {
      orders: true  // Single query with JOIN
    }
  });
}

// ✅ Alternative: Specific fields only
async function getUsers() {
  return await prisma.user.findMany({
    include: {
      orders: {
        select: {
          id: true,
          totalAmount: true,
          status: true
        }
      }
    }
  });
}
```

### Missing Indexes

```
user: Query SELECT * FROM orders WHERE user_id = ? AND status = ? jest wolne
assistant: [Analizuje i dodaje index:]
```

```sql
-- Check existing indexes
SELECT * FROM pg_indexes WHERE tablename = 'orders';

-- Add composite index
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Verify with EXPLAIN
EXPLAIN ANALYZE
SELECT * FROM orders
WHERE user_id = 123 AND status = 'pending';
```

### Query Analysis

```
user: Przeanalizuj performance tego query
assistant: [Używa EXPLAIN ANALYZE:]
```

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT
  u.id,
  u.email,
  COUNT(o.id) as order_count,
  SUM(o.total_amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.email
ORDER BY total_spent DESC
LIMIT 100;
```

Claude Code analizuje output i sugeruje:
- Dodanie indexes
- Zmianę query structure
- Partitioning jeśli tabela jest duża
- Materialized views dla złożonych agregacji

## Część 5: Zaawansowane techniki

### 1. Database Transactions

```typescript
// Prisma transaction
async function createOrder(userId: number, items: OrderItem[]) {
  return await prisma.$transaction(async (tx) => {
    // Create order
    const order = await tx.order.create({
      data: {
        userId,
        status: 'pending',
        totalAmount: 0
      }
    });

    // Create order items and calculate total
    let total = 0;
    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId }
      });

      if (!product || product.stockQuantity < item.quantity) {
        throw new Error(`Insufficient stock for product ${item.productId}`);
      }

      // Decrease stock
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stockQuantity: {
            decrement: item.quantity
          }
        }
      });

      // Create order item
      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          priceAtTime: product.price
        }
      });

      total += product.price.toNumber() * item.quantity;
    }

    // Update order total
    return await tx.order.update({
      where: { id: order.id },
      data: { totalAmount: total }
    });
  });
}
```

### 2. Raw SQL gdy potrzeba

```typescript
// Complex query not easily expressible in ORM
const results = await prisma.$queryRaw`
  WITH monthly_sales AS (
    SELECT
      DATE_TRUNC('month', created_at) as month,
      SUM(total_amount) as total
    FROM orders
    WHERE status = 'completed'
    GROUP BY month
  )
  SELECT
    month,
    total,
    LAG(total) OVER (ORDER BY month) as prev_month,
    ROUND(((total - LAG(total) OVER (ORDER BY month)) /
           LAG(total) OVER (ORDER BY month) * 100), 2) as growth_percent
  FROM monthly_sales
  ORDER BY month DESC
  LIMIT 12;
`;
```

### 3. Soft Deletes

```prisma
model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  deletedAt DateTime? @map("deleted_at")

  @@index([deletedAt])
  @@map("users")
}
```

```typescript
// Custom Prisma middleware for soft deletes
prisma.$use(async (params, next) => {
  if (params.model === 'User') {
    if (params.action === 'delete') {
      // Change action to update
      params.action = 'update';
      params.args['data'] = { deletedAt: new Date() };
    }
    if (params.action === 'findMany' || params.action === 'findFirst') {
      // Add filter to exclude soft deleted
      params.args.where = {
        ...params.args.where,
        deletedAt: null
      };
    }
  }
  return next(params);
});
```

### 4. Connection Pooling

```typescript
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")

  // Connection pool configuration
  relationMode = "prisma"

  // Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?pool_timeout=10&connection_limit=50
}
```

```typescript
// Alternative: pgBouncer setup
// DATABASE_URL="postgresql://user:pass@localhost:6432/mydb?pgbouncer=true"
```

## Część 6: Security

### SQL Injection Prevention

```typescript
// ❌ VULNERABLE - SQL Injection
async function getUserByEmail(email: string) {
  return await prisma.$queryRawUnsafe(
    `SELECT * FROM users WHERE email = '${email}'`
  );
}

// ✅ SAFE - Parameterized query
async function getUserByEmail(email: string) {
  return await prisma.$queryRaw`
    SELECT * FROM users WHERE email = ${email}
  `;
}

// ✅ BEST - Use ORM methods
async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email }
  });
}
```

### Row-Level Security (PostgreSQL)

```sql
-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: users can only see their own orders
CREATE POLICY user_orders_policy ON orders
  FOR SELECT
  USING (user_id = current_setting('app.user_id')::integer);

-- Policy: users can only create their own orders
CREATE POLICY user_create_orders_policy ON orders
  FOR INSERT
  WITH CHECK (user_id = current_setting('app.user_id')::integer);
```

```typescript
// Set user context in application
await prisma.$executeRaw`
  SELECT set_config('app.user_id', ${userId.toString()}, true)
`;
```

## Zadanie praktyczne

**Cel**: Zaprojektuj i zaimplementuj database dla blogging platform

### Część 1: Schema Design (10 min)

```
user: Zaprojektuj schemat bazy dla blogging platform z:
     - Users (authors i readers)
     - Posts (tytuł, treść, slug, published)
     - Comments (zagnieżdżone)
     - Tags
     - Categories
```

Claude Code stworzy Prisma schema lub SQL DDL.

### Część 2: Migrations (5 min)

```
user: Stwórz migration do dodania:
     - view_count do Posts
     - featured (boolean) do Posts
     - Index dla published + created_at
```

### Część 3: Queries (10 min)

Zaimplementuj:

1. **Pobierz top 10 postów** (według view_count)
2. **Wyszukaj posty** (full-text search w tytule i treści)
3. **Pobierz użytkowników** z ilością ich postów i komentarzy

```
user: Napisz query do pobrania top 10 najpopularniejszych postów z tagami
assistant: [Implementuje optimized query]
```

### Część 4: Optimization (5 min)

```
user: Zoptymalizuj performance tych queries używając EXPLAIN ANALYZE
assistant: [Analizuje i dodaje indexy]
```

### Jak Claude Code może Ci pomóc?

```
user: Debuguj dlaczego ten query jest wolny
user: Jak zaimplementować full-text search w PostgreSQL?
user: Stwórz migration do zmiany relacji many-to-many
user: Jak bezpiecznie scale database z 1M do 10M rekordów?
```

## Best Practices Checklist

- [ ] **Indexes** - dla foreign keys i często queryowanych kolumn
- [ ] **Transactions** - dla operacji multi-step
- [ ] **Parameterized queries** - zapobieganie SQL injection
- [ ] **Connection pooling** - efektywne wykorzystanie połączeń
- [ ] **Migrations** - wersjonowanie schemy
- [ ] **Soft deletes** - gdy potrzeba auditing
- [ ] **Timestamps** - created_at, updated_at
- [ ] **EXPLAIN ANALYZE** - optymalizacja queries
- [ ] **N+1 prevention** - eager loading
- [ ] **Schema validation** - enforce constraints
- [ ] **Backup strategy** - regularne backupy
- [ ] **Monitoring** - slow query logs

## Podsumowanie

Databases z Claude Code to productivity boost:
- **Schema design** - normalized, optimized
- **Migrations** - safe, versioned
- **Query optimization** - EXPLAIN analysis i fixes
- **Security** - SQL injection prevention
- **Debugging** - identyfikacja performance bottlenecks

Kluczowe umiejętności:
1. Database schema design i normalizacja
2. ORM usage (Prisma/TypeORM)
3. Migration management
4. Query optimization
5. Security best practices

## Dodatkowe materiały

### Oficjalna dokumentacja
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Performance
- [Use The Index, Luke](https://use-the-index-luke.com/) - SQL indexing
- [PostgreSQL Performance Tuning](https://wiki.postgresql.org/wiki/Performance_Optimization)

### Security
- [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [PostgreSQL Row Level Security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)

### Tools
- [pgAdmin](https://www.pgadmin.org/) - PostgreSQL GUI
- [DBeaver](https://dbeaver.io/) - Universal database tool
- [pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html) - Query monitoring

---

**Czas trwania**: ~30 minut
**Poziom**: Zaawansowany
**Wymagania**: SQL basics, ORM experience, PostgreSQL
