Oto szkielet dwóch lekcji wprowadzających w temat subagentów w ekosystemie Claude Code, opracowany na podstawie dostarczonych źródeł.
v1.

---

### **Lekcja 1: Fundamenty Autonomii – Wprowadzenie do Subagentów**

**Cel lekcji:** Zrozumienie, czym są subagenci, jak rozwiązują problem "zaśmiecania" pamięci modelu i jak stworzyć pierwszego prostego agenta do zadań nieprogramistycznych.

#### **1. Teoria: Problem "Context Pollution" (Zanieczyszczenia Kontekstu)**
*   **Wyzwanie:** W standardowej pracy z AI, im dłuższa rozmowa, tym więcej "śmieci" (starych plików, nieudanych prób, dyskusji) trafia do okna kontekstowego. Powoduje to, że model staje się "głupszy", zapomina o początkowych ustaleniach i zużywa więcej tokenów.
*   **Rozwiązanie:** Subagenci to wyspecjalizowane instancje Claude'a, które mają **własne, odizolowane okno kontekstowe**. Główny Claude (Main Agent) działa jak "Kierownik Projektu", delegując zadania do specjalistów, a otrzymuje z powrotem tylko gotowy wynik, a nie cały proces myślowy.

#### **2. Infrastruktura: Jak to działa w Claude Code?**
*   **Lokalizacja:** Subagenci to po prostu pliki Markdown (`.md`) z nagłówkiem YAML.
    *   `~/.claude/agents/` – agenci globalni (dostępni w każdym projekcie).
    *   `.claude/agents/` – agenci specyficzni dla danego projektu.
*   **Budowa pliku agenta:**
    *   `name`: Unikalna nazwa.
    *   `description`: **Kluczowy element** – to na jego podstawie Claude decyduje, czy użyć danego agenta do zadania.
    *   `tools`: Uprawnienia (np. tylko czytanie plików, bez możliwości edycji).
    *   `system prompt`: Instrukcja, jak agent ma się zachowywać.

#### **3. Przykład Praktyczny (Nieprogramistyczny): "Agent Analizy Faktur"**
Zamiast kodowania, tworzymy agenta dla działu księgowości.
*   **Scenariusz:** Mamy folder z 50 plikami PDF (faktury). Chcemy wyciągnąć z nich daty i kwoty.
*   **Konfiguracja Agenta (`invoice-processor.md`):**
    *   *Rola:* Specjalista ds. przetwarzania faktur.
    *   *Narzędzia:* Tylko `Read`, `Glob` (blokujemy `Edit/Write` dla bezpieczeństwa).
    *   *Zadanie:* "Przeanalizuj dokument, wyodrębnij NIP, datę i kwotę brutto. Zwróć wynik w formacie JSON".
*   **Przebieg:**
    1. Użytkownik wydaje polecenie: "Przeanalizuj faktury z folderu `/invoices`".
    2. Główny Claude uruchamia subagenta `invoice-processor`.
    3. Subagent "czyta" pliki w swoim osobnym kontekście.
    4. Główny Claude otrzymuje czystą tabelę wyników, nie "widząc" treści wszystkich 50 plików, co oszczędza jego pamięć.

#### **4. Przykład Praktyczny (Prosty Techniczny): "Code Reviewer"**
*   **Cel:** Sprawdzenie kodu pod kątem bezpieczeństwa bez wprowadzania zmian.
*   **Konfiguracja:** Agent z uprawnieniami tylko do odczytu (`Read`), który ma w instrukcji listę zasad OWASP Top 10.
*   **Zaleta:** Główny wątek rozmowy nie jest zaśmiecany treścią setek linii kodu, który jest tylko sprawdzany.

---

### **Lekcja 2: Architektura Zespołów AI – Podejście PRO i Orchestracja**

**Cel lekcji:** Nauka tworzenia złożonych łańcuchów pracy (workflows), wykorzystanie subagentów do zadań równoległych oraz zrozumienie ograniczeń tej technologii.

#### **1. Zaawansowana Strategia: Spec-Driven Development (SDD)**
*   **Koncepcja:** Zamiast kazać AI "napisać kod", stosujemy podejście inżynierskie.
*   **Workflow "Spec Kitty" / "Orkiestrator":**
    1. **Agent Badacz (Researcher):** Bada dokumentację lub istniejący kod.
    2. **Agent Architekt:** Na podstawie badań tworzy plik ze specyfikacją (`SPEC.md`). To jest "źródło prawdy".
    3. **Agent Wykonawca (Implementer):** Pisze kod na podstawie `SPEC.md`.
    4. **Agent Tester (QA):** Uruchamia testy.
*   **Dlaczego to jest PRO?** Ponieważ każdy etap jest oddzielony. Jeśli Agent Wykonawca popełni błąd, nie "zatruwa" to pamięci Agenta Architekta.

#### **2. Przykład Marketingowy: Wielokanałowa Kampania**
Pokazanie, że subagenci to potężne narzędzie dla agencji reklamowych.
*   **Struktura Zespołu:**
    *   **Strateg (Opus 4.6):** Analizuje markę i tworzy plan (drogi model, głębokie myślenie).
    *   **Analityk Konkurencji (Sonnet):** Przegląda strony konkurencji i wyciąga cenniki.
    *   **Generator Treści (Haiku):** Szybko tworzy 50 wariantów postów na Twittera (tani model).
*   **Dynamiczny Dobór Modeli:** W wersji PRO konfigurujemy subagentów tak, by używali różnych modeli (Haiku do prostych zadań, Opus do strategii), co obniża koszty o 70%.

#### **3. Integracja z MCP (Model Context Protocol)**
*   Subagenci mogą korzystać z zewnętrznych narzędzi (MCP), np. łączyć się z bazą danych SQL, Slackiem czy Google Drive, ale robią to w swoim izolowanym oknie.
*   **Przykład:** Agent "Support" łączy się przez MCP z systemem ticketowym (Zendesk), pobiera zgłoszenie, analizuje je i proponuje odpowiedź głównemu Claude'owi.

#### **4. Zastosowanie, Mocne i Słabe Strony (Podsumowanie)**

| Cecha | Opis i Wnioski |
| :--- | :--- |
| **Zastosowanie w Infrastrukturze** | Subagenci są teraz natywną częścią Claude Code. Działają jako warstwa zarządzająca nad narzędziem `Task`. Pozwalają na tworzenie **trwałych konfiguracji** (pliki w repozytorium), które można udostępniać w zespole (np. "Nasz firmowy Security Agent"). |
| **Mocne Strony** | 1. **Higiena Kontekstu:** Główny wątek pozostaje czysty, co pozwala na wielogodzinną pracę bez degradacji inteligencji modelu.<br>2. **Specjalizacja:** Możesz mieć agenta, który jest ekspertem tylko od jednej biblioteki lub regulacji prawnej.<br>3. **Równoległość:** Możliwość uruchomienia kilku agentów badawczych jednocześnie (np. "Sprawdź 3 różne biblioteki i porównaj je"). |
| **Słabe Strony** | 1. **Koszty i Tokeny:** Każde wywołanie subagenta to osobna sesja z nowym kontekstem. Przy złej konfiguracji może to drastycznie zwiększyć zużycie tokenów.<br>2. **Brak "Plan Mode":** Obecnie subagenci nie obsługują trybu planowania (Thinking Mode) w taki sam sposób jak główny agent, co utrudnia debugowanie ich procesów myślowych w czasie rzeczywistym.<br>3. **Opóźnienia:** Uruchomienie agenta i wczytanie jego instrukcji zajmuje czas. Nie nadają się do zadań wymagających natychmiastowej reakcji (poniżej sekundy). |

**Zadanie domowe dla PRO:** Stworzenie pliku `CLAUDE.md`, który definiuje zespół 3 agentów (Analityk, Pisarz, Korektor) i uruchomienie ich jedną komendą do stworzenia raportu z podanego pliku PDF.

v2.

Oto szkielet dwóch lekcji wprowadzających w temat subagentów w ekosystemie Claude Code, oparty na dostarczonych materiałach źródłowych.

---

### Lekcja 1: Fundamenty i "Czysty Kontekst" – Wprowadzenie do Subagentów

**Cel lekcji:** Zrozumienie, czym są subagenty, dlaczego powstały i jak stworzyć prostego asystenta do konkretnego zadania, aby uniknąć "zanieczyszczenia kontekstu".

#### 1. Teoria: Problem "Monolitycznego" Agenta
*   **Wyzwanie:** Tradycyjna rozmowa z AI (jeden długi czat) prowadzi do "context pollution" (zanieczyszczenia kontekstu). Kiedy w jednym wątku mieszasz kodowanie, pisanie dokumentacji i analizę błędów, model traci wątek, a zużycie tokenów rośnie.
*   **Rozwiązanie:** Subagenty to "wirtualny zespół ekspertów". Główny Claude (Main Agent) działa jak Kierownik Projektu, który deleguje zadania do specjalistów (Subagentów).
*   **Kluczowa cecha:** Każdy subagent ma własne, odizolowane "okno kontekstowe" (pamięć). Kiedy kończy zadanie, zwraca tylko wynik, a jego "brudnopis" znika, nie zaśmiecając głównej rozmowy.

#### 2. Infrastruktura: Jak to wygląda w Claude Code?
*   Subagent to po prostu plik Markdown (`.md`) z nagłówkiem YAML.
*   **Lokalizacja:** Pliki te umieszczamy w folderze `.claude/agents/` (dla konkretnego projektu) lub `~/.claude/agents/` (globalnie dla użytkownika).
*   **Mechanika:** Claude Code automatycznie skanuje te foldery. Gdy poprosisz o wykonanie zadania, Claude sprawdza opisy (description) w plikach i decyduje, którego agenta "zatrudnić".

#### 3. Przykład Praktyczny 1 (Nie-programistyczny): "Researcher Marketingowy"
*   **Scenariusz:** Agencja marketingowa musi przeanalizować 5 stron konkurencji. Ręcznie zajmuje to 10 godzin.
*   **Konfiguracja Subagenta (`competitor-analyst.md`):**
    *   *Rola:* Specjalista od analizy konkurencji.
    *   *Narzędzia:* Tylko `Read` (czytanie plików/stron) i `WebSearch` (jeśli dostępne przez MCP). Brak uprawnień do edycji plików.
    *   *Zadanie:* "Przeanalizuj cenniki i pozycjonowanie. Zwróć tabelę porównawczą."
*   **Wynik:** Subagent przetwarza dane w swoim oknie, a do głównego czatu trafia tylko czysta tabela. Oszczędność czasu: 75%.

#### 4. Przykład Praktyczny 2 (Prosty techniczny): "Audytor Bezpieczeństwa"
*   **Scenariusz:** Sprawdzenie pliku pod kątem wycieku danych (np. klucze API).
*   **Konfiguracja:** Subagent z instrukcją "Szukaj haseł i kluczy w kodzie. Nie naprawiaj, tylko raportuj".
*   **Zastosowanie:** Zamiast wklejać kod do głównego czatu, wydajesz polecenie: "Sprawdź ten plik pod kątem bezpieczeństwa".

---

### Lekcja 2: Architektura Autonomii – Podejście "Pro" i Orkiestracja

**Cel lekcji:** Nauczenie się tworzenia złożonych przepływów pracy (workflows), gdzie agenty współpracują ze sobą lub działają równolegle, oraz zrozumienie technicznych aspektów zarządzania nimi.

#### 1. Zaawansowana Koncepcja: Spec-Driven Development (SDD)
*   W podejściu profesjonalnym nie rzucamy się od razu do pracy. Stosujemy proces: **Research -> Specyfikacja -> Implementacja**.
*   **Krok 1 (Subagent Research):** Uruchamiamy 5 subagentów równolegle, aby każdy zbadał inny aspekt problemu (np. jeden bada dokumentację API, drugi strukturę bazy danych).
*   **Krok 2 (Specyfikacja):** Główny Claude na podstawie raportów tworzy dokument specyfikacji (`spec.md`).
*   **Krok 3 (Implementacja):** Zadania z listy są delegowane do subagentów wykonawczych (np. `backend-dev`, `frontend-dev`), którzy pracują na osobnych gałęziach (Git worktrees).

#### 2. Przykład "Pro" (Biznesowy): Automatyzacja Przetwarzania Dokumentów
*   Zamiast jednego agenta "do wszystkiego", budujemy rurociąg (pipeline):
    1.  **Klasyfikator:** Otwiera plik, decyduje czy to faktura czy umowa -> przekazuje dalej.
    2.  **Ekstraktor:** Wyciąga dane (kwoty, daty).
    3.  **Walidator:** Sprawdza poprawność matematyczną (czy sumy się zgadzają).
    4.  **Archiwista:** Zapisuje wynik w odpowiednim folderze.
*   **Zaleta:** Jeśli Walidator znajdzie błąd, nie wpływa to na proces Klasyfikatora. Każdy etap jest odizolowany i łatwy do poprawienia.

#### 3. Zarządzanie Uprawnieniami i Bezpieczeństwo
*   **Permission Hygiene (Higiena uprawnień):** Profesjonalne podejście wymaga ograniczania narzędzi. Agent "Planujący" nie powinien mieć narzędzia `Write` ani `Bash` – ma tylko myśleć i czytać.
*   **Hooks (Haki):** Można skonfigurować skrypty, które uruchamiają się, gdy subagent kończy pracę (np. automatyczne uruchomienie lintera po edycji pliku przez agenta).

#### 4. Mocne i Słabe Strony Subagentów (Podsumowanie Techniczne)

| Cecha | Opis |
| :--- | :--- |
| **Mocne Strony** | **Izolacja kontekstu:** Główny czat pozostaje czysty i "inteligentny" przez dłuższy czas.<br>**Specjalizacja:** Można wymusić konkretne zachowania (role) i zestawy narzędzi.<br>**Równoległość:** Możliwość uruchomienia wielu agentów do zadań badawczych jednocześnie. |
| **Słabe Strony** | **Brak "wspólnej pamięci":** Subagent startuje z "czystą kartą" (chyba że przekażemy mu kontekst lub użyjemy wznawiania sesji).<br>**Koszty i czas:** Uruchomienie wielu agentów zużywa więcej tokenów API i może trwać dłużej niż jedna szybka odpowiedź.<br>**Brak "Plan Mode":** Subagenty zazwyczaj wykonują zadania od razu, bez tworzenia planu krok po kroku widocznego dla użytkownika (w przeciwieństwie do głównego agenta). |

---

### Jawna lista linków z opisem

1.  **Claude Code overview - Claude Code Docs**
    *   Oficjalna dokumentacja i przegląd możliwości Claude Code.
    *   [Link do źródła](https://code.claude.com/docs/en/overview)

2.  **AI - Claude Code and Sub Agents - Zone of Development**
    *   Szczegółowy przewodnik Damiano Abballe o instalacji i tworzeniu aplikacji ToDo przy użyciu zespołu 5 subagentów (Architekt, Frontend, Backend, QA).
    *   [Link do źródła](https://www.zoneofdevelopment.com/2026/01/21/ai-claude-code-and-sub-agents/)

3.  **Best practices for Claude Code subagents - PubNub**
    *   Artykuł omawiający najlepsze praktyki, w tym "higienę uprawnień", używanie hooków oraz strukturę plików agentów.
    *   [Link do źródła](https://www.pubnub.com/blog/best-practices-for-claude-code-sub-agents/)

4.  **Building Document Processing Systems with Claude Subagents - Marat's Notes**
    *   Opis architektury do przetwarzania dokumentów (faktury, umowy) z wykorzystaniem łańcucha wyspecjalizowanych subagentów.
    *   [Link do źródła](https://marat.ca/claude-subagents-document-processing/)

5.  **Claude Code Subagents for Digital Marketing: Complete 2025 Guide**
    *   Przewodnik po zastosowaniu subagentów w marketingu: audyty SEO, analiza konkurencji i planowanie treści.
    *   [Link do źródła](https://www.digitalapplied.com/blog/claude-code-subagents-digital-marketing-guide)

6.  **Create custom subagents - Claude Code Docs**
    *   Oficjalna dokumentacja techniczna dotycząca tworzenia własnych subagentów, struktury plików YAML i konfiguracji.
    *   [Link do źródła](https://code.claude.com/docs/en/sub-agents)

7.  **Spec-Driven Development with Claude Code in Action | alexop.dev**
    *   Studium przypadku pokazujące zaawansowany workflow: Research -> Specyfikacja -> Implementacja z użyciem równoległych subagentów.
    *   [Link do źródła](https://alexop.dev/posts/spec-driven-development-claude-code-in-action/)

8.  **Claude SubAgent Power: Building Your AI Engineering Team**
    *   Artykuł Toniego Maxxa opisujący architekturę "Inżynierskiego Zespołu AI" i rozwiązanie problemu "kryzysu kontekstu".
    *   [Link do źródła](https://blog.stackademic.com/claude-subagent-power-building-your-ai-engineering-team-for-enterprise-scale-projects-4dd0a3f91b2a)

9.  **Task Tool vs. Subagents: How Agents Work in Claude Code**
    *   Wyjaśnienie różnic technicznych między prostym narzędziem `Task` a pełnoprawnymi `Subagentami`.
    *   [Link do źródła](https://www.ibuildwith.ai/blog/task-tool-vs-subagents-how-agents-work-in-claude-code/)