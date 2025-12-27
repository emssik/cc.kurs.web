Oto znacznie rozbudowana agenda **Modułu 1: Wprowadzenie i Fundamenty**, wzbogacona o praktyczne przykłady, "pro-tipy" oraz unikalne pomysły wyciągnięte z doświadczeń ekspertów i dokumentacji.

Celem tego modułu jest nie tylko instalacja, ale **zbudowanie mentalnego modelu** pracy z agentem oraz konfiguracja środowiska tak, aby od pierwszego dnia pracować wydajnie i bezpiecznie.

---

### **MODUŁ 1: Fundamenty i Konfiguracja Środowiska (Rozszerzona Agenda)**

#### **1.1. Czym naprawdę jest Claude Code? (Zmiana myślenia)**
*   **Koncepcja:** To nie jest kolejny czat w IDE (jak Copilot) ani tylko "nakładka na API". To **autonomiczny agent terminalowy**, który działa jak "bardzo szybki stażysta z doskonałą pamięcią".
*   **Kluczowa różnica:** Działa bezpośrednio w powłoce (shell), co oznacza, że może wykonywać komendy systemowe, zarządzać git-em i edytować pliki bezpośrednio na dysku, a nie tylko podpowiadać kod w edytorze.
*   **Analiza:** Dlaczego Claude Code jest określany jako "uniwersalny interfejs do komputera" – od zarządzania plikami po czyszczenie dysku i obsługę multimediów (np. ffmpeg).

#### **1.2. Instalacja i Pierwsze Kroki (Beyond Basics)**
*   **Metody instalacji:**
    *   **Zalecana (Native):** `curl -fsSL https://claude.ai/install.sh | bash` (MacOS/Linux) – stabilniejsza, nie wymaga Node.js,.
    *   **NPM:** `npm install -g @anthropic-ai/claude-code` – pozwala na łatwiejsze zarządzanie wersjami, ale wymaga Node.js 18+,.
    *   **Windows:** Specyfika instalacji przez PowerShell (`irm ... | iex`) i pułapki związane z `npm` w systemie Windows.
*   **Rozwiązywanie problemów (Troubleshooting):**
    *   Użycie komendy `/doctor` do diagnozowania problemów z instalacją i połączeniem,.
    *   Naprawa problemów ze ścieżkami (PATH) w Windows i WSL,.
*   **Pro-Tip (Aliasy):** Skonfiguruj w `.zshrc` lub `.bashrc` aliasy, np. `alias c='claude'` lub `alias q='cd ~/Projects'`, aby przyspieszyć uruchamianie.

#### **1.3. Uwierzytelnianie i Modele Rozliczeń**
*   **Dwa światy:**
    *   **Konto Claude.ai (Pro/Team):** Stała opłata, limity wiadomości. Dobre na start i do przewidywalnych kosztów.
    *   **Claude Console (API):** Płatność za tokeny ("Pay-as-you-go"). Niezbędne do intensywnej pracy, integracji CI/CD i unikania kolejek w godzinach szczytu.
*   **Zarządzanie sesją:** Komendy `/login` i `/logout` do przełączania się między kontem prywatnym a firmowym.
*   **Ciekawy pomysł:** Ustawienie zmiennej środowiskowej `ANTHROPIC_API_KEY` w pliku `.env` lub profilu powłoki, aby uniknąć interaktywnego logowania (przydatne w skryptach).

#### **1.4. Interfejs REPL i "Jakość Życia" w Terminalu**
*   **Skróty klawiszowe (Mastery):**
    *   `Esc`: Przerwanie generowania (gdy agent "popłynie").
    *   `Esc` (x2): Szybki powrót do edycji ostatniego promptu (tzw. tryb korekty),.
    *   `Ctrl+R`: Przeszukiwanie historii komend (jak w bashu).
    *   `Ctrl+G`: Otwarcie promptu w zewnętrznym edytorze (np. Vim/VS Code) dla długich poleceń.
*   **Naprawa terminala:** Użycie `/terminal-setup` (lub konfiguracja VS Code), aby naprawić obsługę `Shift+Enter` (nowa linia) zamiast wysyłania wiadomości,.
*   **Personalizacja (Status Line):** Konfiguracja dolnego paska statusu, aby pokazywał zużycie tokenów, koszt sesji ($), aktualny branch gita i stan "brudnego" repozytorium.
    *   *Przykład:* Skrypt bash wyświetlający pasek postępu zużycia kontekstu (np. `█░░░░ 12%`),.

#### **1.4a. Referencje do Plików i Katalogów (@-syntax) – Klucz do Efektywnej Pracy**
*   **Podstawowa składnia (@file):** Używanie prefiksu `@` do automatycznego dołączania zawartości plików do kontekstu rozmowy.
    *   **Przykład:** `> Wyjaśnij co robi @src/auth.js` – Claude automatycznie odczyta plik i wyjaśni jego działanie.
    *   **Zaleta:** Nie musisz ręcznie kopiować i wklejać kodu – Claude sam go przeczyta i zindeksuje.
*   **Zakresy linii (@file#L10-20):** Precyzyjne wskazanie konkretnych linii kodu do analizy.
    *   **Przykład:** `> Zrefaktoruj @src/components/Header.tsx#L45-89` – Claude skupi się tylko na wskazanych liniach.
    *   **Use case:** Świetne do code review konkretnych funkcji lub bloków logiki bez zaśmiecania kontekstu całym plikiem.
    *   **Pro-Tip:** Możesz łączyć wiele zakresów: `@file.js#L10-20 @file.js#L100-120`.
*   **Referencje do katalogów (@dir/):** Dołączanie całych folderów do kontekstu (ostrożnie z rozmiarem!).
    *   **Przykład:** `> Przeanalizuj strukturę @src/components/` – Claude pobierze listę plików i może zaproponować refaktoryzację.
    *   **Ostrzeżenie:** Katalogi z dużą ilością plików mogą szybko zużyć limit tokenów. Używaj selektywnie.
    *   **Strategia:** Zamiast `@src/` użyj bardziej precyzyjnych ścieżek jak `@src/components/` lub `@src/utils/`.
*   **Wielokrotne referencje:** Możesz łączyć wiele plików i katalogów w jednym prompcie.
    *   **Przykład:** `> Porównaj @src/auth.ts z @src/middleware/jwt.ts i zaproponuj ujednolicenie` – Claude zobaczy oba pliki.
    *   **Advanced:** `> Zrefaktoruj @src/api/ używając wzorców z @docs/architecture.md`.
*   **Autocomplete (Szybszy workflow):**
    *   Po wpisaniu `@` Claude automatycznie podpowiada dostępne pliki z bieżącego katalogu.
    *   Użyj `Tab` do autouzupełniania ścieżek (jak w terminalu).
*   **Sztuczki i ograniczenia:**
    *   **Binarne pliki:** Claude może odczytywać obrazy (PNG, JPG) i PDF-y – możesz napisać `@screenshot.png` i zapytać "Co widzisz na tym ekranie?".
    *   **Limit rozmiaru:** Bardzo duże pliki (>100KB) mogą być automatycznie pomijane lub obcinane. Używaj zakresów linii dla dużych plików.
    *   **Relatywne ścieżki:** `@` działa z ścieżkami względnymi do aktualnego katalogu roboczego. Możesz użyć `@../` do wyjścia poziom wyżej.

#### **1.5. Pierwsze Spotkanie z Bezpieczeństwem (Wprowadzenie)**
*   **Zasada działania:** Claude domyślnie **pyta o zgodę** na każdą akcję, która może modyfikować system:
    *   **Read** – czytanie plików (bezpieczne)
    *   **Edit/Write** – modyfikacja/tworzenie plików (wymaga potwierdzenia)
    *   **Bash** – wykonywanie komend w terminalu (potencjalnie niebezpieczne!)
*   **Sandbox Mode:** Claude Code działa domyślnie w trybie sandbox, co oznacza **izolację do katalogu projektu**. Nie może automatycznie czytać `~/.ssh/`, `/etc/` ani innych wrażliwych lokacji bez wyraźnej zgody.
*   **Responses na pytania o uprawnienia:**
    *   `y` – tak, zezwól na tę operację
    *   `n` – nie, odrzuć
    *   `s` – pokaż szczegóły (co dokładnie ma być wykonane)
    *   `a` – zawsze zezwalaj (dla często używanych bezpiecznych operacji)
*   **To dopiero wierzchołek góry lodowej!** Pełny system uprawnień, konfiguracja sandbox, allow/deny lists, ochrona wrażliwych plików i best practices bezpieczeństwa będą szczegółowo omówione w **Module 2: Bezpieczeństwo i Uprawnienia**.

#### **1.6. Pamięć Projektu: `CLAUDE.md` i Hierarchia Kontekstu**
*   **Hierarchia plików:**
    *   `~/.claude/CLAUDE.md`: Globalne preferencje użytkownika (np. "Zawsze używaj TypeScript", "Nie używaj emoji w commitach"),.
    *   `./CLAUDE.md`: Instrukcje specyficzne dla projektu (architektura, komendy budowania).
    *   `./CLAUDE.local.md`: Prywatne notatki ignorowane przez Gita (np. lokalne ścieżki, klucze testowe),.
*   **Komenda `/init`:** Automatyczne generowanie szkieletu `CLAUDE.md` na podstawie analizy repozytorium,.
*   **Sztuczka z `#`:** Wpisanie `#` na początku promptu pozwala szybko dodać nową regułę do pamięci ("Zapamiętaj, że używamy biblioteki X w wersji Y"),.
*   **Dobra praktyka:** Traktuj `CLAUDE.md` jak dokument onboardingowy dla nowego junior developera – musi zawierać komendy build/test i strukturę folderów.

#### **1.7. Podstawowe Narzędzia i Komendy (Slash Commands)**
*   **Zarządzanie kontekstem (Klucz do oszczędności):**
    *   `/clear`: Czyści historię, resetuje kontekst (tani restart).
    *   `/compact`: Podsumowuje rozmowę, zwalnia miejsce w oknie kontekstowym, ale zachowuje kluczowe ustalenia,.
    *   **Strategia:** "Checkpoint Pattern" – pracuj 30-60 min, zrób `/compact` (lub zapisz podsumowanie do pliku), a potem `/clear`.
*   **Monitorowanie:** `/cost` i `/usage` – sprawdzanie ile kosztowała dana sesja i ile tokenów pozostało,.
*   **Inne przydatne:** `/help` (pomoc), `/version` (sprawdzenie wersji).

#### **1.8. Tryby Pracy (Shift+Tab) i Rozszerzone Myślenie**
*   **Przełączanie trybów:** Użycie `Shift+Tab` do cyklicznego przełączania: Ask -> Auto-Edit -> Plan Mode.
*   **Plan Mode (Tryb Planowania):**
    *   Claude nie pisze kodu, lecz tworzy plan działania. Idealne do złożonych zadań, aby uniknąć "halucynowania" rozwiązań.
    *   *Tip:* Używaj tego trybu do eksploracji ("Zbadaj strukturę projektu i zaproponuj plan migracji").
*   **Thinking Mode (`ultrathink`):**
    *   Jak wymusić głębsze rozumowanie za pomocą słowa kluczowego `ultrathink` (uwaga: słowa `think hard` mogą już nie działać w nowszych wersjach),.
    *   Kiedy używać: Architektura, debugowanie trudnych błędów, analiza bezpieczeństwa.

#### **1.9. "Supermoce" na start (Ciekawe pomysły)**
*   **Voice Coding:** Użycie narzędzi typu SuperWhisper do dyktowania promptów – działa szybciej niż pisanie i Claude świetnie radzi sobie z transkrypcją mowy potocznej.
*   **Obsługa obrazów:** Wklejanie zrzutów ekranu (UI, błędy) bezpośrednio do terminala (`Ctrl+V` lub drag&drop) – Claude widzi co się dzieje,.
*   **Praca z dokumentacją:** Wklejanie linków do dokumentacji lub całych plików PDF, aby Claude nauczył się nowych bibliotek w locie.

---

### **Podsumowanie Modułu 1**

Ten moduł daje solidne **fundamenty** do pracy z Claude Code:
*   **Mentalny model** – rozumiesz czym Claude Code jest i czym różni się od chatbotów w IDE
*   **Setup środowiska** – masz zainstalowane narzędzie, skonfigurowany terminal i aliasy
*   **Efektywny workflow** – znasz składnię `@`, slash commands, zarządzanie kontekstem
*   **Podstawy bezpieczeństwa** – wiesz że Claude pyta o uprawnienia i działa w sandboxie

**Następny krok:** Moduł 2 zagłębi się w **Bezpieczeństwo i Uprawnienia**, ucząc jak bezpiecznie konfigurować Claude Code, chronić wrażliwe pliki i mądrze zarządzać trybami uprawnień.