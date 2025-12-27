MODUŁ 1: Wprowadzenie i Fundamenty (Poziom Początkujący)
Ten moduł ma na celu poprawne skonfigurowanie środowiska i zrozumienie, czym Claude Code różni się od innych asystentów AI.
1. Instalacja i Konfiguracja Środowiska
• Zagadnienie: Metody instalacji (npm, brew, curl) i różnice między nimi. Logowanie i autoryzacja (Console vs Claude.ai).
• Przykład praktyczny: Instalacja narzędzia w terminalu za pomocą npm install -g @anthropic-ai/claude-code i przejście procesu autoryzacji OAuth.
• Zagadnienie: Podstawowe komendy CLI (/help, /doctor, /version, /login, /logout).
• Przykład praktyczny: Użycie /doctor do zdiagnozowania problemów z instalacją lub połączeniem.
2. Pierwsze Kroki w REPL (Interactive Mode)
• Zagadnienie: Interakcja z terminalem, nawigacja i podstawowe skróty klawiszowe (Esc, Ctrl+C).
• Przykład praktyczny: Uruchomienie Claude Code w katalogu projektu i zadanie pytania "Wyjaśnij strukturę tego projektu".
3. Zarządzanie Uprawnieniami (Bezpieczeństwo)
• Zagadnienie: Model uprawnień Claude Code (Read, Edit, Bash). Dlaczego narzędzie pyta o zgodę? Flaga --dangerously-skip-permissions (tryb "YOLO") i kiedy (nie) warto jej używać.
• Przykład praktyczny: Uruchomienie sesji z claude --dangerously-skip-permissions tylko w bezpiecznym środowisku (np. kontener Docker) do szybkiego refaktoringu.

--------------------------------------------------------------------------------
MODUŁ 2: Efektywna Praca z Kontekstem (Poziom Średniozaawansowany)
Kluczem do sukcesu z Claude Code jest zarządzanie tym, co model "widzi" i "pamięta".
4. Plik CLAUDE.md - Pamięć Projektu
• Zagadnienie: Tworzenie i struktura pliku CLAUDE.md. Co tam umieszczać: komendy budowania, style kodowania, struktura projektu. Hierarchia plików (~/.claude/CLAUDE.md vs ./CLAUDE.md).
• Przykład praktyczny: Użycie komendy /init do wygenerowania wstępnego pliku, a następnie dodanie reguły: "Używaj wyłącznie React Hooks i Tailwind CSS",.
5. Zarządzanie Tokenami i Kontekstem
• Zagadnienie: Problem "zaśmiecania" kontekstu. Komendy /compact i /clear. Różnica między nimi a wpływ na koszty i jakość odpowiedzi.
• Przykład praktyczny: Po zakończeniu implementacji jednej funkcjonalności, użycie /compact z instrukcją "Podsumuj zmiany w module autoryzacji", aby zwolnić pamięć przed kolejnym zadaniem.
6. Precyzyjne Odwoływanie się do Plików
• Zagadnienie: Używanie składni @ do dodawania plików i katalogów do kontekstu. Unikanie wczytywania całego repozytorium.
• Przykład praktyczny: Zamiast "Napraw błąd w logowaniu", wpisanie: "Napraw błąd walidacji w pliku @src/auth/login.ts".

--------------------------------------------------------------------------------
MODUŁ 3: Workflow Programisty (Poziom Zaawansowany)
Przejście od prostych pytań do realizacji złożonych zadań inżynierskich.
7. Tryb Planowania (Plan Mode)
• Zagadnienie: Przełączanie trybów (Shift+Tab). Fazy: Eksploracja -> Planowanie -> Wykonanie. Dlaczego planowanie oszczędza tokeny i redukuje błędy.
• Przykład praktyczny: Przełączenie w tryb Plan Mode i poproszenie o "Plan migracji bazy danych z SQLite do PostgreSQL". Zatwierdzenie planu przed napisaniem jakiegokolwiek kodu,.
8. Test-Driven Development (TDD) z AI
• Zagadnienie: Workflow: Najpierw testy (Red), potem kod (Green). Zmuszanie Claude do napisania testów przed implementacją.
• Przykład praktyczny: Prompt: "Napisz testy jednostkowe dla funkcji calculateTax w Jest, które obecnie nie przechodzą. Nie implementuj funkcji". Następnie: "Zaimplementuj funkcję, aby testy przeszły",.
9. Integracja z Git i GitHub
• Zagadnienie: Wykorzystanie Claude do operacji na repozytorium: tworzenie commitów, rozwiązywanie konfliktów, tworzenie PR.
• Przykład praktyczny: Użycie komendy claude commit (lub customowego prompta), aby wygenerować sformatowaną wiadomość commitu na podstawie git diff,.
10. Tryb "Extended Thinking" (Rozszerzone Myślenie)
• Zagadnienie: Użycie słowa kluczowego ultrathink (i innych wariantów) do wymuszenia głębszej analizy przed odpowiedzią.
• Przykład praktyczny: Prompt: "Ultrathink: Przeanalizuj potencjalne wycieki pamięci w tym komponencie React useEffect",.

--------------------------------------------------------------------------------
MODUŁ 4: Rozszerzanie Możliwości (Narzędzia Eksperckie)
Wyjście poza standardowe możliwości CLI dzięki zewnętrznym narzędziom i skryptom.
11. Model Context Protocol (MCP)
• Zagadnienie: Czym są serwery MCP. Instalacja i konfiguracja serwerów (np. GitHub, Postgres, Google Drive). Użycie komendy /mcp.
• Przykład praktyczny: Konfiguracja serwera MCP dla PostgreSQL i wydanie polecenia: "Znajdź użytkowników w bazie danych, którzy nie logowali się od 30 dni",.
12. Niestandardowe Komendy (Slash Commands)
• Zagadnienie: Tworzenie własnych komend (pliki .md w folderze .claude/commands). Użycie zmiennej $ARGUMENTS.
• Przykład praktyczny: Stworzenie pliku .claude/commands/bug-report.md, który automatycznie generuje szablon zgłoszenia błędu na podstawie podanego pliku z logami,.
13. Agent Skills (Umiejętności Agenta)
• Zagadnienie: Definiowanie "umiejętności" (Skills), które Claude może autonomicznie wywoływać. Struktura pliku SKILL.md. Różnica między Skill a Slash Command.
• Przykład praktyczny: Stworzenie Skilla pdf-processing, który zawiera instrukcje i skrypty Python do ekstrakcji tekstu z PDF, pozwalając Claude na automatyczne użycie tego narzędzia, gdy użytkownik wspomni o plikach PDF,.

--------------------------------------------------------------------------------
MODUŁ 5: Automatyzacja i Architektura Agentów (Poziom Master)
Tworzenie systemów, które działają "same" i naprawiają własne błędy.
14. Sub-agents (Pod-agenci)
• Zagadnienie: Delegowanie zadań do specjalistycznych agentów (np. "QA Agent", "Security Agent") w celu uniknięcia "zaśmiecania" kontekstu głównego. Konfiguracja przez /agents.
• Przykład praktyczny: Zdefiniowanie agenta "Code Reviewer" z instrukcją systemową skupioną wyłącznie na bezpieczeństwie i wydajności, a następnie delegowanie mu zadania sprawdzenia wygenerowanego kodu,.
15. Hooks (Haki systemowe)
• Zagadnienie: Uruchamianie skryptów w reakcji na zdarzenia (np. PostToolUse, UserPromptSubmit). Deterministyczna kontrola nad AI.
• Przykład praktyczny: Skonfigurowanie hooka PostToolUse, który automatycznie uruchamia prettier lub linter po każdej edycji pliku przez Claude, naprawiając błędy formatowania zanim użytkownik je zobaczy,.
16. Praca Równoległa (Git Worktrees)
• Zagadnienie: Użycie git worktree do uruchamiania wielu instancji Claude Code pracujących nad różnymi funkcjonalnościami w tym samym repozytorium jednocześnie.
• Przykład praktyczny: Stworzenie osobnego worktree dla refaktoringu backendu i uruchomienie tam instancji Claude w trybie auto-approve, podczas gdy w głównym oknie pracujemy z innym Claude nad frontendem,.
17. Integracja z CI/CD i tryb Headless
• Zagadnienie: Używanie Claude w potokach CI/CD (GitHub Actions) w trybie headless (-p).
• Przykład praktyczny: Skonfigurowanie GitHub Action, która używa Claude Code do automatycznego review każdego PR i sugerowania etykiet (labels) lub prostych poprawek,.
MODUŁ 6: Optymalizacja i Koszty
18. Analiza i Optymalizacja Kosztów
• Zagadnienie: Jak działają tokeny wejściowe/wyjściowe. Komenda /cost. Strategie oszczędzania (unikanie dużych plików w kontekście, czyszczenie historii).
• Przykład praktyczny: Sprawdzenie kosztu sesji komendą /cost i porównanie zużycia tokenów przy pracy z całym repozytorium vs pracy z wyselekcjonowanymi plikami,.
Ten program przeprowadza użytkownika od "jak to uruchomić" do "jak zbudować autonomiczny system programistyczny", wykorzystując pełny potencjał narzędzi takich jak Hooks, MCP i Sub-agents, które są unikalne dla ekosystemu Claude Code.