# Subagenty w Claude Code – Szkielet lekcji

Scalony szkic dwóch lekcji wprowadzających w temat subagentów w ekosystemie Claude Code.

---

## Lekcja 1: Fundamenty Autonomii i "Czysty Kontekst"

**Cel lekcji:** Zrozumienie, czym są subagenty, jak rozwiązują problem "zanieczyszczenia kontekstu" i jak stworzyć pierwszego prostego agenta do zadań zarówno programistycznych, jak i nieprogramistycznych.

### 1. Teoria: Problem "Context Pollution" (Zanieczyszczenia Kontekstu)

**Wyzwanie:**
- W standardowej pracy z AI (jeden długi czat), im dłuższa rozmowa, tym więcej "śmieci" (starych plików, nieudanych prób, dyskusji) trafia do okna kontekstowego
- Model staje się "głupszy", zapomina o początkowych ustaleniach i zużywa coraz więcej tokenów
- Mieszanie różnych zadań (kodowanie, pisanie dokumentacji, analiza błędów) w jednym wątku prowadzi do "monolitycznego chaosu"

**Rozwiązanie:**
- Subagenty to wyspecjalizowane instancje Claude'a, które mają **własne, odizolowane okno kontekstowe**
- Główny Claude (Main Agent) działa jak "Kierownik Projektu", delegując zadania do specjalistów z wirtualnego zespołu ekspertów
- Otrzymuje z powrotem tylko gotowy wynik, a nie cały proces myślowy – "brudnopis" subagenta znika, nie zaśmiecając głównej rozmowy

**Kluczowa analogia:** To jak różnica między freelancerem (wszystko sam) a firmą z zespołem specjalistów (każdy robi swoją część).

### 2. Infrastruktura: Jak to działa w Claude Code?

**Lokalizacja i budowa:**
- Subagenci to po prostu pliki Markdown (`.md`) z nagłówkiem YAML
- Umieszczamy je w:
  - `~/.claude/agents/` – agenci globalni (dostępni w każdym projekcie)
  - `.claude/agents/` – agenci specyficzni dla danego projektu (możesz je wrzucić do repozytorium!)

**Mechanika:**
- Claude Code automatycznie skanuje te foldery
- Gdy wydasz polecenie, Claude sprawdza opisy (`description`) w plikach i decyduje, którego agenta "zatrudnić"

**Budowa pliku agenta:**
- `name`: Unikalna nazwa agenta
- `description`: **Najważniejszy element** – to na jego podstawie Claude decyduje, czy użyć danego agenta do zadania
- `tools`: Uprawnienia (np. tylko czytanie plików, bez możliwości edycji)
- `system prompt`: Instrukcja definiująca rolę i zachowanie agenta

### 3. Przykład Praktyczny 1 (Nieprogramistyczny): "Agent Analizy Faktur"

**Scenariusz:**
- Masz folder z 50 plikami PDF (faktury)
- Chcesz wyciągnąć z nich daty, kwoty i numery NIP
- Ręczne przetwarzanie zajmuje 8 godzin

**Konfiguracja Agenta (`invoice-processor.md`):**
- *Rola:* Specjalista ds. przetwarzania faktur
- *Narzędzia:* Tylko `Read`, `Glob` (blokujemy `Edit/Write` dla bezpieczeństwa)
- *Zadanie:* "Przeanalizuj dokument, wyodrębnij NIP, datę i kwotę brutto. Zwróć wynik w formacie JSON"

**Przebieg:**
1. Użytkownik wydaje polecenie: "Przeanalizuj faktury z folderu `/invoices`"
2. Główny Claude uruchamia subagenta `invoice-processor`
3. Subagent "czyta" pliki w swoim osobnym kontekście (nie zaśmieca głównego czatu)
4. Główny Claude otrzymuje czystą tabelę wyników, nie "widząc" treści wszystkich 50 plików

**Wynik:** Oszczędność czasu 75%, oszczędność tokenów ~80%, główny kontekst pozostaje czysty.

### 4. Przykład Praktyczny 2 (Marketingowy): "Researcher Konkurencji"

**Scenariusz:**
- Agencja marketingowa musi przeanalizować 5 stron konkurencji
- Ręcznie zajmuje to 10 godzin pracy analityka

**Konfiguracja Subagenta (`competitor-analyst.md`):**
- *Rola:* Specjalista od analizy konkurencji
- *Narzędzia:* Tylko `Read` (czytanie plików/stron) i `WebSearch` (jeśli dostępne przez MCP). Brak uprawnień do edycji
- *Zadanie:* "Przeanalizuj cenniki i pozycjonowanie. Zwróć tabelę porównawczą"

**Wynik:**
- Subagent przetwarza dane w swoim oknie
- Do głównego czatu trafia tylko czysta tabela porównawcza
- Oszczędność czasu: 75%

### 5. Przykład Praktyczny 3 (Techniczny): "Code Reviewer / Audytor Bezpieczeństwa"

**Cel:** Sprawdzenie kodu pod kątem bezpieczeństwa bez wprowadzania zmian

**Konfiguracja:**
- Agent z uprawnieniami tylko do odczytu (`Read`)
- Instrukcja zawiera listę zasad OWASP Top 10
- Zadanie: "Szukaj haseł i kluczy w kodzie. Nie naprawiaj, tylko raportuj"

**Zaleta:**
- Główny wątek rozmowy nie jest zaśmiecany treścią setek linii kodu
- Zamiast wklejać kod do głównego czatu, wydajesz polecenie: "Sprawdź ten plik pod kątem bezpieczeństwa"
- Otrzymujesz raport z zagrożeniami, nie zanieczyszczając kontekstu

---

## Lekcja 2: Architektura Zespołów AI – Podejście PRO i Orkiestracja

**Cel lekcji:** Nauczenie się tworzenia złożonych łańcuchów pracy (workflows), wykorzystania subagentów do zadań równoległych, orkiestracji zespołów oraz zrozumienia ograniczeń tej technologii.

### 1. Zaawansowana Strategia: Spec-Driven Development (SDD)

**Koncepcja:**
- Zamiast kazać AI "napisać kod", stosujemy podejście inżynierskie
- Profesjonalny proces: **Research → Specyfikacja → Implementacja → QA**

**Workflow "Spec Kitty" / "Orkiestrator":**

1. **Agent Badacz (Researcher):**
   - Bada dokumentację lub istniejący kod
   - Możesz uruchomić 5 subagentów równolegle, aby każdy zbadał inny aspekt (np. jeden bada API, drugi strukturę bazy danych)

2. **Agent Architekt:**
   - Na podstawie raportów badawczych tworzy plik ze specyfikacją (`SPEC.md`)
   - To jest "źródło prawdy" dla całego projektu

3. **Agent Wykonawca (Implementer):**
   - Pisze kod **na podstawie** `SPEC.md`
   - Może pracować na osobnej gałęzi (Git worktree)

4. **Agent Tester (QA):**
   - Uruchamia testy
   - Raportuje wyniki bez zaśmiecania kontekstu głównego

**Dlaczego to jest PRO?**
- Każdy etap jest oddzielony i odizolowany
- Jeśli Agent Wykonawca popełni błąd, nie "zatruwa" to pamięci Agenta Architekta
- Specyfikacja pozostaje czystym źródłem prawdy

### 2. Przykład Marketingowy: Wielokanałowa Kampania

**Scenariusz:** Agencja reklamowa tworzy kampanię dla klienta

**Struktura Zespołu:**

1. **Strateg (Opus 4.6):**
   - Analizuje markę klienta i tworzy plan strategiczny
   - Drogi model, ale głębokie myślenie

2. **Analityk Konkurencji (Sonnet):**
   - Przegląda strony konkurencji
   - Wyciąga cenniki i USP
   - Zbalansowane koszty i jakość

3. **Generator Treści (Haiku):**
   - Szybko tworzy 50 wariantów postów na Twittera
   - Tani model do prostych zadań

**Dynamiczny Dobór Modeli:**
- W wersji PRO konfigurujemy subagentów z różnymi modelami
- Haiku do prostych zadań, Opus do strategii
- **Obniżenie kosztów o 70%** przy zachowaniu jakości kluczowych analiz

### 3. Przykład Biznesowy: Automatyzacja Przetwarzania Dokumentów

**Zamiast jednego agenta "do wszystkiego", budujemy rurociąg (pipeline):**

1. **Klasyfikator:**
   - Otwiera plik
   - Decyduje czy to faktura czy umowa
   - Przekazuje dalej odpowiedniemu agentowi

2. **Ekstraktor:**
   - Wyciąga dane (kwoty, daty, strony umowy)
   - Specjalizacja w parsowaniu struktur

3. **Walidator:**
   - Sprawdza poprawność matematyczną (czy sumy się zgadzają)
   - Wykrywa anomalie

4. **Archiwista:**
   - Zapisuje wynik w odpowiednim folderze
   - Nazywa pliki według konwencji

**Zaleta:**
- Jeśli Walidator znajdzie błąd, nie wpływa to na proces Klasyfikatora
- Każdy etap jest odizolowany i łatwy do poprawienia
- Możesz wymienić jeden "element łańcucha" nie ruszając reszty

### 4. Integracja z MCP (Model Context Protocol)

**Koncepcja:**
- Subagenci mogą korzystać z zewnętrznych narzędzi (MCP)
- Łączą się z bazami danych SQL, Slackiem, Google Drive itp.
- Wszystko w swoim izolowanym oknie kontekstowym

**Przykład: Agent "Support"**
- Łączy się przez MCP z systemem ticketowym (Zendesk)
- Pobiera zgłoszenie klienta
- Analizuje historię konwersacji
- Proponuje odpowiedź głównemu Claude'owi
- Główny Claude nie "widzi" całej historii ticketów – tylko gotową propozycję odpowiedzi

### 5. Zarządzanie Uprawnieniami i Bezpieczeństwo

**Permission Hygiene (Higiena uprawnień):**
- Profesjonalne podejście wymaga ograniczania narzędzi
- Agent "Planujący" nie powinien mieć `Write` ani `Bash` – ma tylko myśleć i czytać
- Agent "Security Auditor" tylko czyta, nigdy nie edytuje
- Agent "Implementer" może pisać, ale tylko w określonych folderach

**Hooks (Haki):**
- Możesz skonfigurować skrypty uruchamiane po zakończeniu pracy subagenta
- Np. automatyczne uruchomienie lintera po edycji pliku przez agenta
- Lub automatyczne testy po wdrożeniu zmian

### 6. Mocne i Słabe Strony Subagentów (Podsumowanie)

| Cecha | Opis i Wnioski |
| :--- | :--- |
| **Zastosowanie w Infrastrukturze** | Subagenci są natywną częścią Claude Code. Działają jako warstwa zarządzająca nad narzędziem `Task`. Pozwalają na tworzenie **trwałych konfiguracji** (pliki w repozytorium), które można udostępniać w zespole (np. "Nasz firmowy Security Agent"). |
| **Mocne Strony** | 1. **Higiena Kontekstu:** Główny wątek pozostaje czysty, co pozwala na wielogodzinną pracę bez degradacji inteligencji modelu<br>2. **Specjalizacja:** Możesz mieć agenta-eksperta tylko od jednej biblioteki lub regulacji prawnej<br>3. **Równoległość:** Możliwość uruchomienia kilku agentów badawczych jednocześnie (np. "Sprawdź 3 różne biblioteki i porównaj je")<br>4. **Bezpieczeństwo:** Ograniczenie uprawnień do minimum niezbędnego |
| **Słabe Strony** | 1. **Koszty i Tokeny:** Każde wywołanie subagenta to osobna sesja z nowym kontekstem. Przy złej konfiguracji może drastycznie zwiększyć zużycie tokenów<br>2. **Brak "wspólnej pamięci":** Subagent startuje z "czystą kartą" (chyba że przekażesz mu kontekst lub użyjesz wznawiania sesji)<br>3. **Brak "Plan Mode":** Obecnie subagenci nie obsługują trybu planowania (Thinking Mode) w taki sam sposób jak główny agent. Utrudnia to debugowanie ich procesów myślowych w czasie rzeczywistym<br>4. **Opóźnienia:** Uruchomienie agenta i wczytanie jego instrukcji zajmuje czas. Nie nadają się do zadań wymagających natychmiastowej reakcji (poniżej sekundy) |

### 7. Zadanie domowe dla PRO

Stworzenie pliku `CLAUDE.md`, który definiuje zespół 3 agentów:
- **Analityk:** Bada plik PDF i wyciąga kluczowe dane
- **Pisarz:** Tworzy raport na podstawie danych od Analityka
- **Korektor:** Sprawdza spójność i poprawność językową

Uruchomienie ich jedną komendą do stworzenia raportu z podanego pliku PDF.

---

## Źródła i dalsze materiały

### Oficjalna dokumentacja

1. **Claude Code overview - Claude Code Docs**
   - Oficjalna dokumentacja i przegląd możliwości Claude Code
   - [Link](https://code.claude.com/docs/en/overview)

2. **Create custom subagents - Claude Code Docs**
   - Oficjalna dokumentacja techniczna: tworzenie własnych subagentów, struktura plików YAML i konfiguracja
   - [Link](https://code.claude.com/docs/en/sub-agents)

### Tutoriale i praktyczne przykłady

3. **AI - Claude Code and Sub Agents - Zone of Development**
   - Szczegółowy przewodnik Damiano Abballe: instalacja i tworzenie aplikacji ToDo przy użyciu zespołu 5 subagentów (Architekt, Frontend, Backend, QA)
   - [Link](https://www.zoneofdevelopment.com/2026/01/21/ai-claude-code-and-sub-agents/)

4. **Best practices for Claude Code subagents - PubNub**
   - Najlepsze praktyki: "higiena uprawnień", używanie hooków oraz struktura plików agentów
   - [Link](https://www.pubnub.com/blog/best-practices-for-claude-code-sub-agents/)

5. **Building Document Processing Systems with Claude Subagents - Marat's Notes**
   - Architektura do przetwarzania dokumentów (faktury, umowy) z wykorzystaniem łańcucha wyspecjalizowanych subagentów
   - [Link](https://marat.ca/claude-subagents-document-processing/)

6. **Spec-Driven Development with Claude Code in Action | alexop.dev**
   - Studium przypadku: zaawansowany workflow Research → Specyfikacja → Implementacja z użyciem równoległych subagentów
   - [Link](https://alexop.dev/posts/spec-driven-development-claude-code-in-action/)

### Zastosowania branżowe

7. **Claude Code Subagents for Digital Marketing: Complete 2025 Guide**
   - Przewodnik po zastosowaniu subagentów w marketingu: audyty SEO, analiza konkurencji i planowanie treści
   - [Link](https://www.digitalapplied.com/blog/claude-code-subagents-digital-marketing-guide)

8. **Claude SubAgent Power: Building Your AI Engineering Team**
   - Artykuł Toniego Maxxa: architektura "Inżynierskiego Zespołu AI" i rozwiązanie problemu "kryzysu kontekstu"
   - [Link](https://blog.stackademic.com/claude-subagent-power-building-your-ai-engineering-team-for-enterprise-scale-projects-4dd0a3f91b2a)

### Techniczne porównania

9. **Task Tool vs. Subagents: How Agents Work in Claude Code**
   - Wyjaśnienie różnic technicznych między prostym narzędziem `Task` a pełnoprawnymi `Subagentami`
   - [Link](https://www.ibuildwith.ai/blog/task-tool-vs-subagents-how-agents-work-in-claude-code/)
