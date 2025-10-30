---
title: "Tworzenie własnych MCP servers"
description: "Krok po kroku: jak stworzyć własny MCP server od podstaw"
duration: 30
difficulty: advanced
tags: [mcp, development, typescript, custom-servers]
---

# Tworzenie własnych MCP servers

## Wprowadzenie

Gotowe serwery MCP są świetne, ale prawdziwa moc tkwi w możliwości tworzenia własnych serwerów dostosowanych do specyficznych potrzeb. W tej lekcji nauczysz się tworzyć custom MCP server od podstaw, krok po kroku.

## Dlaczego tworzyć własne serwery?

Własny MCP server warto stworzyć, gdy:
- **Potrzebujesz integracji**, której nikt jeszcze nie zrobił
- **Masz wewnętrzne API** firmowe, które chcesz udostępnić Claude Code
- **Chcesz kontrolować** dokładnie jak Claude Code łączy się z Twoimi systemami
- **Potrzebujesz customowej logiki** niedostępnej w gotowych serwerach
- **Chcesz podzielić się** swoim rozwiązaniem ze społecznością

## Architektura MCP Server

MCP server składa się z kilku kluczowych elementów:

```
┌─────────────────────────────────┐
│   Claude Code (Client)          │
└────────────┬────────────────────┘
             │ MCP Protocol
             │ (JSON-RPC)
┌────────────▼────────────────────┐
│   MCP Server                    │
│   ┌─────────────────────────┐   │
│   │ 1. Transport Layer      │   │  ← Komunikacja (stdio/HTTP)
│   ├─────────────────────────┤   │
│   │ 2. Protocol Handler     │   │  ← Obsługa MCP messages
│   ├─────────────────────────┤   │
│   │ 3. Tools Registry       │   │  ← Definicje dostępnych tools
│   ├─────────────────────────┤   │
│   │ 4. Business Logic       │   │  ← Twoja logika
│   └─────────────────────────┘   │
└────────────┬────────────────────┘
             │
             ▼
      External System (API, DB, etc.)
```

## Przykład: Tworzenie Weather MCP Server

Stworzymy serwer, który pozwala Claude Code pobierać dane pogodowe.

### Krok 1: Setup projektu

```bash
# Utwórz nowy projekt
mkdir mcp-server-weather
cd mcp-server-weather

# Inicjalizacja npm
npm init -y

# Instalacja zależności
npm install @modelcontextprotocol/sdk
npm install --save-dev typescript @types/node

# Inicjalizacja TypeScript
npx tsc --init
```

### Krok 2: Konfiguracja TypeScript

Edytuj `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Krok 3: Struktura plików

```
mcp-server-weather/
├── src/
│   ├── index.ts           # Entry point
│   ├── server.ts          # MCP Server logic
│   └── weather-api.ts     # Weather API client
├── package.json
├── tsconfig.json
└── README.md
```

### Krok 4: Implementacja Weather API Client

Stwórz `src/weather-api.ts`:

```typescript
// Prosta implementacja klienta dla Open-Meteo API (darmowe, bez klucza API)
export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export class WeatherAPIClient {
  private baseURL = 'https://api.open-meteo.com/v1';

  async getCurrentWeather(coords: Coordinates): Promise<WeatherData> {
    const { latitude, longitude } = coords;
    const url = `${this.baseURL}/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      return {
        temperature: data.current_weather.temperature,
        humidity: data.current_weather.relative_humidity_2m || 0,
        windSpeed: data.current_weather.windspeed,
        description: this.weatherCodeToDescription(data.current_weather.weathercode)
      };
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }

  async getForecast(coords: Coordinates, days: number = 7): Promise<any> {
    const { latitude, longitude } = coords;
    const url = `${this.baseURL}/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&forecast_days=${days}`;

    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch forecast: ${error.message}`);
    }
  }

  private weatherCodeToDescription(code: number): string {
    const descriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow fall',
      95: 'Thunderstorm'
    };
    return descriptions[code] || 'Unknown';
  }
}
```

### Krok 5: Implementacja MCP Server

Stwórz `src/server.ts`:

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool
} from '@modelcontextprotocol/sdk/types.js';
import { WeatherAPIClient, Coordinates } from './weather-api.js';

export class WeatherMCPServer {
  private server: Server;
  private weatherClient: WeatherAPIClient;

  constructor() {
    this.server = new Server(
      {
        name: 'weather-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.weatherClient = new WeatherAPIClient();
    this.setupHandlers();
  }

  private setupHandlers(): void {
    // Handler dla listowania dostępnych tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.getTools(),
      };
    });

    // Handler dla wywoływania tools
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'get_current_weather':
          return await this.handleGetCurrentWeather(args);
        case 'get_forecast':
          return await this.handleGetForecast(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private getTools(): Tool[] {
    return [
      {
        name: 'get_current_weather',
        description: 'Get current weather for a location',
        inputSchema: {
          type: 'object',
          properties: {
            latitude: {
              type: 'number',
              description: 'Latitude of the location',
            },
            longitude: {
              type: 'number',
              description: 'Longitude of the location',
            },
          },
          required: ['latitude', 'longitude'],
        },
      },
      {
        name: 'get_forecast',
        description: 'Get weather forecast for a location',
        inputSchema: {
          type: 'object',
          properties: {
            latitude: {
              type: 'number',
              description: 'Latitude of the location',
            },
            longitude: {
              type: 'number',
              description: 'Longitude of the location',
            },
            days: {
              type: 'number',
              description: 'Number of days for forecast (1-16)',
              default: 7,
            },
          },
          required: ['latitude', 'longitude'],
        },
      },
    ];
  }

  private async handleGetCurrentWeather(args: any) {
    const coords: Coordinates = {
      latitude: args.latitude,
      longitude: args.longitude,
    };

    try {
      const weather = await this.weatherClient.getCurrentWeather(coords);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(weather, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  private async handleGetForecast(args: any) {
    const coords: Coordinates = {
      latitude: args.latitude,
      longitude: args.longitude,
    };
    const days = args.days || 7;

    try {
      const forecast = await this.weatherClient.getForecast(coords, days);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(forecast, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Weather MCP Server running on stdio');
  }
}
```

### Krok 6: Entry Point

Stwórz `src/index.ts`:

```typescript
import { WeatherMCPServer } from './server.js';

async function main() {
  const server = new WeatherMCPServer();
  await server.run();
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
```

### Krok 7: Build i package.json scripts

Zaktualizuj `package.json`:

```json
{
  "name": "mcp-server-weather",
  "version": "1.0.0",
  "description": "MCP server for weather data",
  "main": "dist/index.js",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsc && node dist/index.js",
    "watch": "tsc --watch"
  },
  "bin": {
    "mcp-server-weather": "./dist/index.js"
  },
  "keywords": ["mcp", "weather", "claude-code"],
  "author": "Your Name",
  "license": "MIT"
}
```

### Krok 8: Build

```bash
npm run build
```

### Krok 9: Konfiguracja w Claude Code

Dodaj do `mcp_settings.json`:

```json
{
  "mcpServers": {
    "weather": {
      "command": "node",
      "args": ["/path/to/mcp-server-weather/dist/index.js"],
      "env": {}
    }
  }
}
```

### Krok 10: Test

Zrestartuj Claude Code i przetestuj:

```
user: Jaka jest pogoda w Warszawie? (52.2297°N, 21.0122°E)
assistant: [Używa mcp__weather__get_current_weather z parametrami]

user: Pokaż prognozę na najbliższe 5 dni
assistant: [Używa mcp__weather__get_forecast]
```

## Najlepsze praktyki

### 1. Walidacja inputów

Zawsze waliduj parametry:

```typescript
private validateCoordinates(lat: number, lon: number): void {
  if (lat < -90 || lat > 90) {
    throw new Error('Latitude must be between -90 and 90');
  }
  if (lon < -180 || lon > 180) {
    throw new Error('Longitude must be between -180 and 180');
  }
}
```

### 2. Error handling

Obsługuj błędy gracefully:

```typescript
try {
  const result = await riskyOperation();
  return { content: [{ type: 'text', text: result }] };
} catch (error) {
  return {
    content: [{ type: 'text', text: `Error: ${error.message}` }],
    isError: true
  };
}
```

### 3. Logging

Używaj stderr dla logów (stdout jest zarezerwowany dla MCP):

```typescript
console.error('[Weather Server] Fetching weather data...');
console.error('[Weather Server] Request completed');
```

### 4. Rate limiting

Implementuj throttling dla zewnętrznych API:

```typescript
private async rateLimitedFetch(url: string): Promise<Response> {
  await this.waitForRateLimit();
  return fetch(url);
}
```

### 5. Caching

Dodaj cache dla częstych zapytań:

```typescript
private cache = new Map<string, { data: any; timestamp: number }>();

private getCached(key: string, maxAge: number = 300000): any | null {
  const cached = this.cache.get(key);
  if (cached && Date.now() - cached.timestamp < maxAge) {
    return cached.data;
  }
  return null;
}
```

## Publikacja serwera

### Opcja 1: npm package

```bash
# Przygotowanie do publikacji
npm login
npm publish

# Użycie przez innych
npm install -g mcp-server-weather
```

### Opcja 2: GitHub repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/mcp-server-weather
git push -u origin main
```

### Opcja 3: Udostępnienie społeczności

Dodaj swój serwer do:
- [MCP Servers Registry](https://github.com/modelcontextprotocol/servers)
- [Awesome MCP](https://github.com/awesome-lists/awesome-mcp)

## Kiedy NIE tworzyć własnego serwera?

❌ **Nie twórz, gdy:**
- Istnieje już dobry gotowy serwer
- Potrzebujesz czegoś jednorazowo (użyj WebFetch)
- Nie masz czasu na maintenance
- API jest zbyt proste (może WebFetch wystarczy?)

## Zadanie praktyczne

**Cel**: Stwórz prosty custom MCP server

### Wariant A: "Quote of the Day" Server (łatwiejszy)

Stwórz serwer, który:
1. Pobiera losowy cytat z API (np. https://api.quotable.io)
2. Dodaje tool `get_random_quote`
3. Opcjonalnie: filtrowanie po autorze lub temacie

### Wariant B: "Local Notes" Server (średni)

Stwórz serwer, który:
1. Zarządza notatkami w lokalnym pliku JSON
2. Tools: `create_note`, `list_notes`, `search_notes`, `delete_note`
3. Używa file system do persystencji

### Wariant C: "Team Status" Server (trudniejszy)

Stwórz serwer, który:
1. Łączy się z kilkoma API (GitHub + Slack)
2. Agreguje status zespołu (otwarte PR, wiadomości Slack)
3. Tool: `get_team_status`
4. Wymaga obsługi wielu połączeń i error handling

### Kroki dla każdego wariantu:

1. Setup projektu (npm, TypeScript)
2. Implementacja logiki biznesowej
3. Stworzenie MCP server
4. Konfiguracja w Claude Code
5. Testowanie
6. Dokumentacja w README.md

### Jak Claude Code może Ci pomóc?

```
user: Pomóż mi zdebugować błąd w moim MCP server
user: Jak mogę dodać caching do mojego MCP server?
user: Zoptymalizuj kod mojego weather server
user: Napisz testy jednostkowe dla mojego serwera
```

## Podsumowanie

Stworzyliśmy od podstaw funkcjonalny MCP server z:
- Integracją z zewnętrznym API
- Dwoma narzędziami (tools)
- Error handlingiem
- Proper TypeScript setup
- Gotową konfiguracją dla Claude Code

Kluczowe umiejętności:
1. Struktura projektu MCP server
2. Implementacja handlers dla tools
3. Integracja z zewnętrznymi API
4. Best practices (walidacja, error handling, logging)
5. Deployment i publikacja

## Dodatkowe materiały

### Dokumentacja
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)
- [MCP Protocol Specification](https://spec.modelcontextprotocol.io/)
- [TypeScript for MCP Servers](https://modelcontextprotocol.io/docs/typescript)

### Przykładowe projekty
- [Official MCP Servers](https://github.com/modelcontextprotocol/servers) - kod źródłowy oficjalnych serwerów
- [Community MCP Servers](https://github.com/topics/mcp-server) - przykłady od społeczności

### Tools i libraries
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector) - debugowanie serwerów
- [MCP Test Harness](https://github.com/modelcontextprotocol/test-harness) - testowanie

### Artykuły i tutoriale
- [Building Production-Ready MCP Servers](https://blog.anthropic.com/production-mcp)
- [MCP Server Design Patterns](https://dev.to/mcp-patterns)

---

**Czas trwania**: ~30 minut
**Poziom**: Zaawansowany
**Wymagania**: TypeScript, Node.js, znajomość API, ukończone lekcje 01-03
