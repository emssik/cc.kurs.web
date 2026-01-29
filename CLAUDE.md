# Projekt: Kurs Claude Code

Kurs Claude Code - od podstaw do eksperta. Kompleksowy program nauczania dla białych kołnierzyków (nie tylko programistów).

## Struktura projektu

**Lekcje:** `/cc.kurs.mailing/modules/`
- Moduł 01 (Podstawy): `/cc.kurs.mailing/modules/modul-01-podstawy/`

**Kluczowe pliki:**
- Indeks tematów (co już omówiono): `/cc.kurs.mailing/modules/index.md`
- Agenda kursu: `/cc.kurs.mailing/agenda.v2.md`
- Walidator lekcji: `/.claude/commands/lesson.check.md`

## Tworzenie nowych lekcji

### Przed napisaniem lekcji
1. Sprawdź `index.md` - unikaj powtarzania tematów oznaczonych jako 📕 (wyczerpane)
2. Zapoznaj się z agendą v2 - trzymaj się planu modułów

### Zasady stylistyczne (z lesson.check.md)

**Ton:**
- Zwracaj się w drugiej osobie ("nauczysz się", "zrobisz", "możesz")
- Unikaj form bezosobowych ("można", "należy", "powinno się")

**Język:**
- Prosty i zrozumiały dla osób bez background'u technicznego
- Krótkie zdania, logiczna struktura
- Terminy techniczne wyjaśniaj przy pierwszym użyciu

**Słowniczek:**
- Każda lekcja powinna zawierać słowniczek trudniejszych terminów
- Wyjaśniaj: API, CLI, token, workspace, rate limit, CI/CD, REPL, itp.

**Format (email-friendly):**
- Unikaj tabel markdown z 4+ kolumnami (źle wyglądają w mailach)
- Zamiast tabel używaj nagłówków z listami

**Przykłady:**
- Różnorodne grupy odbiorców: programiści, marketerzy, PM, pisarze, analitycy, HR
- Praktyczne, rozwiązujące realne problemy
- Działające i aktualne technicznie

**Linki do dokumentacji:**
- Zawsze z `/en/`: `https://code.claude.com/docs/en/[ścieżka]`

### Sprawdzanie jakości lekcji
Użyj `/lesson.check [ścieżka-do-lekcji]` aby zwalidować lekcję przed publikacją.

## Legenda głębokości omówienia (z index.md)

- 📌 **Wzmianka** - temat wspomniany pobieżnie
- 📘 **Podstawy** - wyjaśnione co to jest i do czego służy
- 📗 **Rozwinięcie** - z przykładami i praktycznymi wskazówkami
- 📕 **Wyczerpany** - kompleksowo, nie powtarzać

## Moduły kursu (z agendy v2)

1. PODSTAWY (lekcje 00-09 ukończone)
2. WBUDOWANE NARZĘDZIA (TOOLS)
3. BEZPIECZEŃSTWO I UPRAWNIENIA
4. SLASH COMMANDS
5. INTEGRACJE IDE
6. SUBAGENTS
7. HOOKS
8. MCP SERVERS
9. AGENT SKILLS
10. PLUGINS & MARKETPLACE
11. KONFIGURACJA ZAAWANSOWANA
12. ROZSZERZANIE CLAUDE CODE
13. CLAUDE API
14. BEST PRACTICES
15. ADVANCED PATTERNS
16. CASE STUDIES
17. ENTERPRISE & SCALE
