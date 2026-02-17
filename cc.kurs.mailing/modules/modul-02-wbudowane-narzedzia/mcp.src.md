Oto szczegółowe szablony obu lekcji wraz z wyselekcjonowaną listą źródeł, które pomogą Ci wypełnić je treścią. Plan został opracowany tak, aby w pierwszej części zbudować solidne fundamenty teoretyczne i świadomość zagrożeń, a w drugiej przejść do zaawansowanej konfiguracji i optymalizacji w środowisku Claude Code.

---

### LEKCJA 1: Architektura, Fundamenty i Bezpieczeństwo MCP
**Cel:** Uczestnik rozumie, czym jest MCP, jak działa „pod maską” oraz jakie ryzyka niesie za sobą podłączanie zewnętrznych narzędzi do LLM.

#### Moduł 1: Czym jest Model Context Protocol?
*   **Definicja i analogia:** MCP jako „port USB-C dla aplikacji AI”. Rozwiązanie problemu $N \times M$ (wielu klientów x wiele narzędzi).
*   **Różnice kluczowe:**
    *   **MCP vs RAG:** RAG służy do czytania (pobierania wiedzy), MCP do działania (narzędzia) i pobierania żywych danych (zasoby).
    *   **MCP vs Function Calling:** MCP to ustandaryzowany protokół zarządzania połączeniem, function calling to tylko mechanizm wykonawczy.

#### Moduł 2: Architektura Protokółu
*   **Komponenty:**
    *   **Host:** Aplikacja AI (np. Claude Code, Cursor) – „budynek restauracji”.
    *   **Client:** Konektor wewnątrz Hosta – „kelner”.
    *   **Server:** Dostawca narzędzi – „kuchnia”.
*   **Prymitywy (Co serwer daje modelowi?):**
    *   **Resources (Zasoby):** Dane pasywne (np. logi, pliki), które model czyta jak tekst.
    *   **Tools (Narzędzia):** Funkcje wykonywalne (np. `git commit`, `query_db`).
    *   **Prompts (Szablony):** Gotowe instrukcje dla modelu.
*   **Transport:** Różnica między `stdio` (lokalne procesy, szybkie) a `HTTP/SSE` (zdalne serwery).

#### Moduł 3: Bezpieczeństwo (Kluczowy element)
*   **Zasada Zero Trust:** Dlaczego nie wolno ufać serwerom MCP bez weryfikacji.
*   **Wektory ataku:**
    *   **Prompt Injection:** Atakujący ukrywa instrukcje w danych (np. w pliku README lub zgłoszeniu GitHub), które przejmuje agenta.
    *   **Tool Poisoning:** Złośliwe opisy narzędzi, które manipulują modelem (np. ukryte instrukcje w metadanych narzędzia).
    *   **Cross-Repository Data Theft:** Scenariusz, w którym agent czyta publiczne repozytorium (zainfekowane), a następnie kradnie dane z prywatnego repozytorium używając tego samego tokena.
*   **Mitygacja:** Sandbox (Docker), zasada najniższych przywilejów (Least Privilege), autoryzacja OAuth zamiast kluczy w plikach.

---

### LEKCJA 2: Implementacja w Claude Code i Optymalizacja
**Cel:** Uczestnik potrafi skonfigurować MCP w Claude Code, zarządzać uprawnieniami (Scopes) i dbać o „higienę” okna kontekstowego.

#### Moduł 1: Konfiguracja i Zarządzanie w Claude Code
*   **Instalacja serwerów:**
    *   Metoda CLI: `claude mcp add` (szybka, ale mniej precyzyjna).
    *   Metoda ręczna (JSON): Edycja plików konfiguracyjnych (lepsza kontrola, łatwe kopiowanie).
*   **Hierarchia Zakresów (Scopes) – Gdzie co zapisać?**:
    *   **Managed:** Wymuszane przez organizację/IT (nie nadpiszesz tego).
    *   **Local (`.claude/settings.local.json`):** Tylko dla Ciebie, ignorowane przez Gita (dobre do testów).
    *   **Project (`.mcp.json`):** Udostępniane zespołowi w repozytorium (dobre dla narzędzi specyficznych dla projektu).
    *   **User (`~/.claude.json`):** Twoje globalne narzędzia dostępne w każdym projekcie.

#### Moduł 2: Optymalizacja – Problem „MCP Tax”
*   **Koszt kontekstu:** Każde podłączone narzędzie zjada tokeny (nawet 500 tokenów na narzędzie).
*   **Skutki przeładowania:** Większe opóźnienia (latency), „zapominanie” instrukcji przez model, wyższe koszty API.
*   **Strategie:**
    *   Sprawdzanie zużycia komendą `/context`.
    *   Selektywne włączanie serwerów w `/config` (nie trzymaj włączonych 20 serwerów na raz!).
    *   Używanie serwerów agregujących (np. `mcp-omnisearch`) zamiast wielu małych.

#### Moduł 3: Debugowanie i Praktyka
*   **Narzędzia:**
    *   Komenda `/mcp` w Claude Code do sprawdzania statusu połączeń.
    *   Flaga `--mcp-debug` do podglądu logów komunikacji.
    *   MCP Inspector (uwaga: używać tylko najnowszej wersji ze względu na łatane luki bezpieczeństwa).
*   **Przykład praktyczny:** Konfiguracja serwera `filesystem` (bezpieczny dostęp do plików) lub `github`.

---

### 🔗 Lista Linków Źródłowych (Do Tworzenia Materiałów)

#### Do Lekcji 1 (Teoria & Bezpieczeństwo):
1.  **Architektura i definicje:**
    *   *Oficjalna specyfikacja MCP:* – fundamenty wiedzy o prymitywach i transporcie.
    *   *Porównanie MCP vs RAG vs Function Calling:* – świetne do wyjaśnienia, dlaczego MCP to coś więcej niż "wtyczka".
2.  **Raporty o bezpieczeństwie (Krytyczne case studies):**
    *   *Atak na GitHub (Data Heist):* – opis jak malicious issue może zmusić agenta do kradzieży danych z prywatnego repo.
    *   *Ryzyka Prompt Injection i Tool Poisoning:* – analiza Checkmarx i Elastic Security Labs.
    *   *CVE-2025-6514 (RCE w mcp-remote):* – dlaczego OAuth jest trudny i niebezpieczny.

#### Do Lekcji 2 (Praktyka Claude Code & Optymalizacja):
1.  **Konfiguracja Claude Code:**
    *   *Dokumentacja ustawień i Scopes:* – oficjalne źródło o hierarchii plików JSON.
    *   *Poradnik instalacji (CLI vs JSON):* – dlaczego edycja pliku JSON jest lepsza niż kreator ("The Better Way").
    *   *Lista polecanych serwerów:* – co warto zainstalować (Docker, GitHub, Postgres).
2.  **Optymalizacja i Context Tax:**
    *   *Analiza kosztów kontekstu:* – artykuł "The Hidden Cost of MCPs", kluczowy do zrozumienia, dlaczego model "głupieje" przy zbyt wielu narzędziach.
    *   *Redukcja tokenów (Dynamic Toolsets):* – zaawansowane techniki redukcji zużycia tokenów o 90%.
3.  **Debugowanie:**
    *   *Logi i debugowanie:* – jak czytać logi MCP w przypadku błędów.



Oto kompletna lista bezpośrednich linków do materiałów źródłowych, zorganizowana według naszego planu dwóch lekcji. Są to adresy URL, które możesz skopiować i udostępnić uczestnikom lub wykorzystać do własnego researchu.

### 📚 LEKCJA 1: Teoria, Architektura i Bezpieczeństwo

**1. Oficjalna dokumentacja i definicje**
*   **Oficjalna specyfikacja MCP:**
    `https://modelcontextprotocol.io/specification/2025-11-25`
    *To "biblia" protokołu – definicje techniczne warstw i prymitywów.*
*   **Przegląd architektury (Architecture Overview):**
    `https://modelcontextprotocol.io/docs/learn/architecture`
    *Diagramy i wyjaśnienie ról Host-Klient-Serwer.*
*   **MCP vs RAG vs Function Calling (Mikaeels Blog):**
    `https://www.mikaeels.com/blog/mcp-vs-rag-vs-function-calling`
    *Klarowne wyjaśnienie różnic, dlaczego MCP to coś więcej niż RAG.*
*   **Przewodnik inżyniera: RAG vs MCP (DigitalOcean):**
    `https://www.digitalocean.com/community/tutorials/engineers-guide-rag-vs-mcp-llms`
    *Techniczne porównanie, kiedy stosować którą technologię.*

**2. Raporty o bezpieczeństwie (Krytyczne dla świadomości)**
*   **Checkmarx: 11 Emerging AI Security Risks with MCP:**
    `https://checkmarx.com/zero-post/11-emerging-ai-security-risks-with-mcp-model-context-protocol/`
    *Kompletna taksonomia zagrożeń: Prompt Injection, Tool Poisoning, etc.*
*   **Elastic Security Labs: Attack Vectors and Defense:**
    `https://www.elastic.co/security-labs/mcp-tools-attack-defense-recommendations`
    *Analiza wektorów ataku i rekomendacje obronne (np. sandboxing).*
*   **Docker Blog: The GitHub Prompt Injection Data Heist:**
    `https://www.docker.com/blog/mcp-horror-stories-github-prompt-injection/`
    *Studium przypadku ataku na repozytoria GitHub przez MCP.*
*   **JFrog: Prompt Hijacking Vulnerability (CVE-2025-6515):**
    `https://jfrog.com/blog/mcp-prompt-hijacking-vulnerability/`
    *Techniczna analiza konkretnej podatności w ekosystemie.*

---

### 🛠️ LEKCJA 2: Konfiguracja Claude Code i Optymalizacja

**1. Konfiguracja i Zarządzanie**
*   **Oficjalna dokumentacja ustawień Claude Code:**
    `https://code.claude.com/docs/en/settings`
    *Hierarchia plików konfiguracyjnych (Managed/User/Project).*
*   **Poradnik Scotta Spence’a: "Configuring MCP Tools - The Better Way":**
    `https://scottspence.com/posts/configuring-mcp-tools-in-claude-code`
    *Dlaczego warto edytować pliki JSON ręcznie zamiast używać kreatora CLI.*
*   **Integracja Claude Code (Clockwise Guide):**
    `https://www.getclockwise.com/blog/claude-code-mcp-tools-integration`
    *Praktyczny przewodnik po komendach i scope'ach.*

**2. Optymalizacja ("MCP Tax" i Tokeny)**
*   **Analiza: The Hidden Cost of MCPs:**
    `https://selfservicebi.co.uk/analytics%20edge/improve%20the%20experience/2025/11/23/the-hidden-cost-of-mcps-and-custom-instructions-on-your-context-window.html`
    *Kluczowy artykuł o tym, jak narzędzia "zjadają" 50% okna kontekstowego.*
*   **Anthropic: Code execution with MCP:**
    `https://www.anthropic.com/engineering/code-execution-with-mcp`
    *Dlaczego lepiej pozwolić modelowi pisać kod niż wywoływać 100 narzędzi po kolei.*
*   **Speakeasy: Reducing MCP token usage by 100x:**
    `https://www.speakeasy.com/blog/how-we-reduced-token-usage-by-100x-dynamic-toolsets-v2`
    *Zaawansowane techniki dynamicznego ładowania narzędzi.*

**3. Katalogi i listy serwerów**
*   **Lista najlepszych serwerów na 2026 (Builder.io):**
    `https://www.builder.io/blog/best-mcp-servers-2026`
    *Przegląd najciekawszych gotowych narzędzi (Postgres, Stripe, Sentry).*
*   **Oficjalne repozytorium serwerów:**
    `https://github.com/model-context-protocol/servers`
    *(Link do GitHub wspomniany w źródłach jako miejsce startowe).*
*   **Katalogi społeczności:**
    `https://mcp.so` oraz `https://smithery.ai`
    *Wyszukiwarki gotowych serwerów MCP.*