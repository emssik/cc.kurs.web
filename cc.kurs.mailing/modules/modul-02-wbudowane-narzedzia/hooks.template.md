Oto szczegółowy szkielet dwóch lekcji wprowadzających do tematu **Claude Code Hooks**. Został on opracowany na podstawie dostarczonych źródeł, kładąc nacisk na przejście od podstawowych automatyzacji do zaawansowanych mechanizmów kontroli i bezpieczeństwa.

---

### **Lekcja 1: Od Probabilistyki do Determinizmu – Wprowadzenie do Claude Code Hooks**

**Cel lekcji:** Zrozumienie, czym są hooki, dlaczego są niezbędne w pracy z modelem AI, oraz wdrożenie pierwszych prostych automatyzacji (w tym przykładów nieprogramistycznych).

#### **1. Teoria: Czym są Hooki w ekosystemie Claude Code?**
*   **Problem:** Modele językowe (LLM) są probabilistyczne – mogą, ale nie muszą wykonać Twojego polecenia (np. "zawsze sformatuj kod" lub "zawsze daj znać, gdy skończysz").
*   **Rozwiązanie:** Hooki to deterministyczna warstwa kontrolna. Są to skrypty powłoki (shell scripts), które uruchamiają się **zawsze** przy określonych zdarzeniach w cyklu życia Claude Code, niezależnie od "woli" AI.
*   **Architektura:** Hook składa się z trzech elementów:
    1.  **Zdarzenie (Event):** Kiedy ma zadziałać (np. `PostToolUse` – po wykonaniu zadania, `Notification` – gdy Claude czegoś chce).
    2.  **Dopasowanie (Matcher):** Filtr określający, dla jakich narzędzi hook ma działać (np. tylko dla edycji plików).
    3.  **Akcja (Action):** Konkretna komenda systemowa do wykonania.

#### **2. Konfiguracja i środowisko**
*   **Lokalizacja:** Omówienie pliku `settings.json`.
    *   Globalne: `~/.claude/settings.json` (dla użytkownika).
    *   Projektowe: `.claude/settings.json` (dla zespołu/repozytorium).
*   **Bezpieczeństwo (Wstęp):** Hooki działają z uprawnieniami użytkownika – ostrzeżenie przed wklejaniem niesprawdzonych skryptów.

#### **3. Praktyczne przykłady (Poziom podstawowy)**

*   **Przykład A: "Nie czekaj przed ekranem" (Zastosowanie ogólne/biurowe)**
    *   *Cel:* Otrzymanie systemowego powiadomienia (dymek/dźwięk), gdy Claude skończy długie zadanie i oczekuje na decyzję człowieka.
    *   *Mechanizm:* Wykorzystanie zdarzenia `Notification`.
    *   *Kod:* Użycie systemowych komend jak `osascript` (macOS) lub `notify-send` (Linux) do wyświetlenia komunikatu "Claude czeka na Twoją decyzję".
    *   *Wartość:* Eliminuje konieczność ciągłego patrzenia w terminal ("blinking cursor").

*   **Przykład B: "Czystość przede wszystkim" (Zastosowanie programistyczne)**
    *   *Cel:* Automatyczne formatowanie kodu po każdej edycji dokonanej przez AI.
    *   *Mechanizm:* Zdarzenie `PostToolUse` z matcherem `Edit|Write`.
    *   *Kod:* Uruchomienie `prettier` lub `black` na pliku, który właśnie został zmodyfikowany przez Claude'a.
    *   *Wartość:* AI nie musi pamiętać o stylu kodowania; system wymusza go automatycznie.

#### **4. Podsumowanie Lekcji 1**
*   **Mocne strony:** Automatyzacja powtarzalnych czynności, pewność wykonania.
*   **Słabe strony:** Wymaga podstawowej wiedzy o terminalu/skryptach, brak interfejsu graficznego (wszystko w JSON).

---

### **Lekcja 2: Strażnik Systemu – Zaawansowane Bezpieczeństwo i Kontekst**

**Cel lekcji:** Wykorzystanie hooków jako "bramki bezpieczeństwa" (security gate), zarządzanie kontekstem projektu oraz tworzenie nietypowych integracji.

#### **1. Teoria: Komunikacja Input/Output i Kody Wyjścia**
*   **Przepływ danych:** Claude przekazuje do hooka dane w formacie JSON przez `stdin` (np. jaki plik chce edytować, jaką komendę chce wykonać). Skrypt hooka musi te dane sparsować (np. używając `jq` lub Pythona).
*   **Decyzyjność (Exit Codes):**
    *   `Exit 0`: Pozwól Claude'owi działać.
    *   `Exit 2`: **ZABLOKUJ** działanie. To krytyczny mechanizm bezpieczeństwa. Treść błędu (stderr) jest zwracana do AI, aby zrozumiało, dlaczego mu odmówiono.

#### **2. Praktyczne przykłady (Poziom PRO)**

*   **Przykład A: "Tarcza Bezpieczeństwa" – Blokowanie rm i sudo**
    *   *Cel:* Uniemożliwienie Claude'owi wykonania destrukcyjnych komend lub użycia uprawnień administratora.
    *   *Mechanizm:* Zdarzenie `PreToolUse` (przed użyciem narzędzia) z matcherem `Bash`.
    *   *Logika:* Skrypt Pythona lub Basha analizuje JSON z komendą. Jeśli wykryje ciąg `rm -rf`, `sudo` lub próbę edycji pliku `.env`, zwraca `exit 2` i komunikat "Operacja zablokowana przez politykę bezpieczeństwa".
    *   *Dlaczego to ważne?* Pozwala bezpieczniej korzystać z trybu `yolo` (automatycznego akceptowania zmian) w mniej krytycznych obszarach, mając "twardą" blokadę na operacje ryzykowne.

*   **Przykład B: "Pamięć Absolutna" – Wstrzykiwanie Kontekstu**
    *   *Cel:* Claude po restarcie sesji nie pamięta ustaleń z poprzedniego dnia lub statusu zadań w Jirze.
    *   *Mechanizm:* Zdarzenie `SessionStart`.
    *   *Nietypowe zastosowanie:* Hook uruchamia skrypt, który pobiera listę otwartych ticketów z Jiry lub ostatnie 5 commitów z Gita i "wstrzykuje" je do kontekstu rozmowy na samym początku. Dzięki temu AI od razu "wie", nad czym pracujemy, bez ręcznego tłumaczenia.

*   **Przykład C: "Audytor" – Nietypowe zastosowanie (Logging)**
    *   *Cel:* Stworzenie pełnego logu wszystkich promptów i odpowiedzi do celów compliance lub analizy kosztów.
    *   *Mechanizm:* Zdarzenie `UserPromptSubmit` lub `PostToolUse`.
    *   *Akcja:* Zapisywanie każdego zapytania i wykonanej akcji do zewnętrznej bazy danych (np. SQLite) lub pliku CSV, co pozwala na audyt pracy AI w firmie.

#### **3. Hooki w infrastrukturze Claude Code – Podsumowanie**
*   **Zastosowanie:** Hooki nie służą do "dodawania inteligencji" modelowi, ale do **osadzania go w realiach systemowych**. Są mostem między rozmową a systemem operacyjnym. W 2026 roku stanowią standard dla profesjonalnych wdrożeń ("Vibe Coding" vs. Engineering).
*   **Mocne strony (Poziom Pro):** Możliwość tworzenia "guardrails" (barier ochronnych) nie do obejścia przez prompt injection, integracja z CI/CD.
*   **Słabe strony (Poziom Pro):** Źle napisany hook (np. z błędem w pętli) może zablokować pracę agenta (`Stop hook runs forever`). Zwiększają też czas oczekiwania na odpowiedź, jeśli skrypty są powolne.

---

### **Linki i Źródła**

Poniżej znajdują się linki do materiałów źródłowych, które posłużyły do opracowania tego szkieletu:

1.  **[Claude Code Hooks Documentation (Anthropic)](https://code.claude.com/docs/en/hooks)** – Oficjalna dokumentacja techniczna opisująca wszystkie zdarzenia, formaty JSON oraz kody wyjścia. Niezbędna baza wiedzy.
2.  **[A Better Practices Guide to Using Claude Code (Kyle Stratis)](https://kylestratis.com/posts/a-better-practices-guide-to-using-claude-code/)** – Praktyczny przewodnik omawiający mentalność "PM-a" przy pracy z Claude Code oraz rolę hooków w profesjonalnym workflow.
3.  **[A complete guide to hooks in Claude Code (eesel AI)](https://www.eesel.ai/blog/hooks-in-claude-code)** – Przystępny artykuł tłumaczący koncepcję hooków, ich zastosowanie do formatowania i testowania oraz ograniczenia dla osób nietechnicznych.
4.  **[Automate Your AI Workflows with Claude Code Hooks (GitButler)](https://blog.gitbutler.com/automate-your-ai-workflows-with-claude-code-hooks)** – Świetny przykład wykorzystania hooków do integracji z systemem kontroli wersji i tworzenia powiadomień desktopowych na macOS.
5.  **[Claude Code's Most Underrated Feature: Hooks (Reddit Thread)](https://www.reddit.com/r/ClaudeAI/comments/1qm05qr/claude_codes_most_underrated_feature_hooks_wrote/)** – Dyskusja społeczności zawierająca wiele kreatywnych przykładów (np. blokowanie `rm -rf`, ochrona sekretów) i gotowe skrypty.
6.  **[Claude Code Hook Development Skill (GitHub)](https://gist.github.com/alexfazio/653c5164d726987569ee8229a19f451f)** – Repozytorium z gotowymi wzorcami hooków, w tym przykłady zaawansowanej walidacji i migracji ze prostych skryptów do prompt-based hooks.