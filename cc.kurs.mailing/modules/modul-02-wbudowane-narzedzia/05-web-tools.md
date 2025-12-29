# Mail #05: WebFetch i WebSearch - Internet w Twoim Terminalu

## Przypomnienie z poprzedniej lekcji

W poprzedniej lekcji poznaliśmy dwa najpotężniejsze narzędzia do przeszukiwania kodu - **Glob** i **Grep**. Glob to Twoje narzędzie do znajdowania plików po wzorcach nazw (np. `**/*.config.js`), a Grep to master wyszukiwania zawartości w plikach za pomocą regex. Nauczyliśmy się używać trzech trybów wyjścia Grep: `files_with_matches` (tylko nazwy plików), `content` (pokazuje dopasowania) i `count` (liczba wystąpień). Kluczowa lekcja: najpierw szukaj szeroko (`files` lub `count`), potem wąsko (`content`) - to oszczędza tokeny i pieniądze.

Pamiętasz również, że Glob sortuje wyniki po dacie modyfikacji, co pomaga Claude zrozumieć, nad czym ostatnio pracowaliśmy.

## 2 pytania do poprzedniej lekcji

1. **Jaka jest różnica między Glob a Grep?** Które narzędzie użyjesz, aby znaleźć wszystkie pliki TypeScript w projekcie?
2. **Dlaczego powinieneś najpierw użyć trybu `count` lub `files_with_matches`** zamiast od razu pobierać `content`?

<details>
<summary>Odpowiedzi</summary>

1. Glob wyszukuje pliki po **nazwach/wzorcach** (np. `**/*.ts`), a Grep szuka **zawartości w plikach** (regex w kodzie). Do znalezienia plików TypeScript użyjesz Glob.
2. Bo `count` i `files_with_matches` zwracają minimalne dane, pozwalając ocenić skalę zmian. Dopiero potem pobierasz `content` dla konkretnych plików - oszczędzasz tokeny i koszt API.

</details>

---

## TLDR (Too Long, Didn't Read)

Claude Code ma bezpośredni dostęp do internetu przez dwa narzędzia:
- **WebFetch** - pobiera konkretne strony WWW i analizuje ich zawartość (dokumentacje, API docs, artykuły)
- **WebSearch** - wyszukuje informacje w internecie jak Google/Bing (breaking changes, błędy, trendy)

Kluczowe zasady:
- WebFetch ma **15-minutowy cache** - świetne dla dokumentacji, złe dla danych zmieniających się co chwilę
- WebSearch **MUSI** zawsze zwracać źródła (Sources) - buduje zaufanie
- Jeśli masz **MCP** (np. do GitHuba), używaj go zamiast WebFetch - dane są bardziej strukturalne

---

## Mem z Twittera

Znasz to uczucie, gdy googlasz błąd i jedyna odpowiedź na StackOverflow to "nevermind, I fixed it" bez wyjaśnienia?

**["The worst type of StackOverflow answer is 'nevermind I fixed it' with no explanation. It's like finding a treasure map that ends with 'dig here... actually don't bother, already found it.'"](https://twitter.com/ThePracticalDev/status/687672086152753152)**

Z Claude Code i WebSearch ten problem znika - Claude przeszukuje wiele źródeł, analizuje je i podaje konkretne rozwiązanie. Nawet jeśli autor "nevermind" nie podzielił się wiedzą.

---

## Treść lekcji: Internet w zasięgu promptu

### WebFetch - Twój osobisty scraper dokumentacji

#### Czym jest WebFetch i kiedy go używać?

WebFetch to narzędzie, które pozwala Claude pobrać dowolną stronę WWW, przekonwertować HTML do markdown i przeanalizować zawartość. To jak wysłanie Claude'a do biblioteki po konkretną książkę.

**Typowe przypadki użycia:**

1. **Pobieranie świeżej dokumentacji**
   ```
   > Check documentation at https://ui.shadcn.com/docs and explain how to use the Button component
   ```
   Claude pobierze docs, przeanalizuje i wyjaśni Ci API komponentu - nawet jeśli biblioteka wyszła wczoraj i nie ma jej w jego wiedzy treningowej.

2. **Analiza konkurencji**
   ```
   > Fetch the homepage of https://competitor.com and analyze their pricing strategy
   ```
   Przydatne dla biznesów - zrozumienie oferty konkurencji bez ręcznego czytania.

3. **Weryfikacja API endpoints**
   ```
   > Fetch https://api.example.com/v2/docs and tell me what changed compared to v1
   ```
   Szybkie sprawdzenie breaking changes w nowym API.

#### Cache i redirects - co musisz wiedzieć

**15-minutowy cache to blessing i curse:**

✅ **Zalety:**
- Szybsze odpowiedzi przy powtarzalnym dostępie
- Mniejsze koszty (nie fetche'ujesz za każdym razem)
- Mniejsze obciążenie zewnętrznych serwerów

❌ **Ograniczenia:**
- Jeśli testujesz endpoint API, który zmienia dane co sekundę, zobaczysz stare dane przez 15 minut
- Live updates (np. wyniki sportowe) mogą być nieaktualne

**Pro-Tip:** Jeśli pracujesz z danymi real-time, poinformuj Claude'a:
```
> Fetch https://api.stocks.com/price/AAPL - but note this is cached for 15min, so check timestamp
```

**Redirects:**
Gdy strona przekierowuje na inną domenę, WebFetch Cię poinformuje. Musisz wtedy wywołać WebFetch ponownie z nowym URL. To mechanizm bezpieczeństwa - Claude nie podąża ślepo za przekierowaniami na potencjalnie niebezpieczne domeny.

### WebSearch - Google/Bing w terminalu

#### Kiedy używać WebSearch zamiast WebFetch?

**WebFetch** = znasz konkretny URL
**WebSearch** = szukasz informacji, nie wiesz gdzie

**Typowe przypadki użycia:**

1. **Rozwiązywanie błędów z nowych wersji frameworków**
   ```
   > Search for 'React Router v7 breaking changes'
   ```
   Claude dostaje wyniki z Google/Binga, analizuje je i podaje Ci konkretne informacje o zmianach API.

2. **Śledzenie trendów rynkowych**
   ```
   > Search for 'best e-commerce platforms 2025' and summarize top 3 options
   ```
   Przydatne dla właścicieli firm - research bez marnowania godzin na przeglądanie dziesiątek artykułów.

3. **Weryfikacja najlepszych praktyk**
   ```
   > Search for 'PostgreSQL connection pooling best practices 2025'
   ```
   Upewnij się, że Twoja implementacja jest zgodna z aktualnymi standardami.

#### Domain filtering - jakość ponad ilość

WebSearch może zwrócić setki wyników, ale 90% to spam SEO i clickbait. Dlatego zawsze filtruj domeny:

```
allowed_domains: ["stackoverflow.com", "github.com", "react.dev", "developer.mozilla.org"]
```

**Przykład praktyczny:**
```
> Search for 'Next.js 15 app router best practices' but only from official docs and GitHub issues
```

Claude użyje `allowed_domains: ["nextjs.org", "github.com"]` i przefiltruje śmieci.

**Alternatywnie - blokuj spamowe domeny:**
```
blocked_domains: ["w3schools.com", "geeksforgeeks.com"]  # kontrowersyjne, ale niektórzy wolą inne źródła
```

#### KRYTYCZNE: Zawsze Sources!

**To najważniejsza zasada WebSearch.**

Claude **MUSI** podać linki do źródeł, z których korzystał. Dlaczego?

1. **Zaufanie** - możesz zweryfikować informacje
2. **Odpowiedzialność** - wiesz, skąd pochodzi wiedza
3. **Eksploracja** - możesz zagłębić się w temat samodzielnie

**Przykład dobrej odpowiedzi:**
```
Claude: "React Router v7 wprowadza kilka breaking changes:
1. Usunięto useHistory() - teraz używaj useNavigate()
2. Route element zamiast component prop
3. ...

Sources:
- https://github.com/remix-run/react-router/releases/v7.0.0
- https://reactrouter.com/en/main/upgrading/v6
```

**Źle - bez linków:**
```
Claude: "React Router v7 ma kilka zmian, m.in. useNavigate zamiast useHistory"
```

Jeśli Claude nie podał źródeł, zapytaj wprost:
```
> What are your sources for this information?
```

### MCP jako alternatywa dla WebFetch

**MCP (Model Context Protocol)** to protokół, który pozwala Claude łączyć się z zewnętrznymi systemami w sposób strukturalny.

**Kiedy używać MCP zamiast WebFetch?**

✅ **MCP jest lepsze dla:**
- GitHub (issues, PRs, commits) - API zwraca strukturalne dane
- Jira (tasks, boards) - łatwiejsza analiza tasków
- Slack (wiadomości, kanały) - przeszukiwanie historii
- Bazy danych (SQL queries) - bezpośredni dostęp

❌ **WebFetch jest lepsze dla:**
- Publicznych dokumentacji (shadcn/ui, Tailwind)
- Blogów technicznych i artykułów
- Stron konkurencji (research)
- Jednorazowych sprawdzeń (nie masz MCP do tej usługi)

**Przykład:**

Zamiast:
```
> Fetch https://github.com/facebook/react/issues/12345 and summarize the discussion
```

Lepiej (jeśli masz MCP):
```
> Use GitHub MCP to fetch issue #12345 from facebook/react and summarize
```

MCP zwróci strukturalne dane (tytuł, komentarze, statusy), a nie surowy HTML.

---

## Przykłady biznesowe - nie tylko dla developerów

### 1. Research konkurencji (dla właścicieli firm)

```
> Use WebFetch to analyze pricing pages of:
- https://competitor1.com/pricing
- https://competitor2.com/pricing
- https://competitor3.com/pricing

Compare their tiers, features, and create a table showing gaps in our offering.
```

Claude pobierze strony, wyciągnie ceny i feature'y, porówna i zasugeruje, gdzie Twój produkt może się wyróżnić.

### 2. Monitoring trendów rynkowych (dla marketerów)

```
> Search for 'e-commerce checkout optimization 2025' and summarize top 5 trends.
Filter to: shopify.com, bigcommerce.com, stripe.com
```

Zamiast czytać 20 artykułów, dostajesz destylat wiedzy z najlepszych źródeł.

### 3. Pobieranie danych produktów (dla e-commerce)

```
> Fetch product details from https://shop.com/product/xyz123
Extract: name, price, specs, reviews count
Save to products.json
```

Automatyzacja research'u produktów konkurencji bez ręcznego kopiowania.

### 4. Analiza dokumentacji prawnej (dla freelancerów)

```
> Fetch https://gdpr.eu/article-13-personal-data-collected/
and explain what I need to include in my SaaS privacy policy
```

Szybkie zrozumienie wymogów prawnych bez czytania dziesiątek stron jargonu.

---

## Podsumowanie

Kluczowe wnioski z dzisiejszej lekcji:

1. **WebFetch = konkretny URL** - pobieranie dokumentacji, stron, API docs. Ma 15-minutowy cache.
2. **WebSearch = wyszukiwanie wiedzy** - rozwiązywanie błędów, trendy, best practices. MUSI zwracać Sources.
3. **Domain filtering oszczędza czas** - `allowed_domains` filtruje spam SEO i clickbait.
4. **MCP > WebFetch dla strukturalnych danych** - jeśli masz MCP do GitHub/Jira/Slack, używaj go zamiast scrapować strony.

---

## 3 pytania kontrolne

1. **Jaka jest różnica między WebFetch a WebSearch?** Kiedy użyjesz jednego, a kiedy drugiego?

2. **Dlaczego WebFetch ma 15-minutowy cache?** Jakie to ma konsekwencje dla real-time data?

3. **Dlaczego Claude MUSI podawać Sources przy WebSearch?** Podaj 2 powody.

<details>
<summary>Odpowiedzi</summary>

1. WebFetch pobiera **konkretny URL** (znasz adres), WebSearch **wyszukuje informacje** (nie wiesz gdzie szukać). Fetch = dokumentacja shadcn, Search = "React Router breaking changes".

2. Cache przyspiesza odpowiedzi i zmniejsza koszty, ale oznacza, że dane mogą być nieaktualne do 15 minut. Złe dla live data (giełda, API zmieniające się co sekundę).

3. Sources budują **zaufanie** (możesz zweryfikować) i **odpowiedzialność** (wiesz skąd wiedza). Plus możesz samodzielnie zagłębić się w temat.

</details>

---

## 2-3 zadania praktyczne

### Zadanie 1: Research dokumentacji

Wybierz bibliotekę/framework, którego jeszcze nie znasz (np. shadcn/ui, Astro, Qwik). Użyj WebFetch, aby pobrać dokumentację i poproś Claude'a o wygenerowanie prostego przykładu użycia.

```
> Fetch documentation from https://[library].com/docs/getting-started
and create a minimal working example in my project
```

**Cel:** Zrozumienie, jak szybko możesz wejść w nową technologię bez czytania dziesiątek stron docs.

### Zadanie 2: Rozwiązywanie błędu przez WebSearch

Weź błąd, który ostatnio Cię zablokował (albo symuluj: "useNavigate is not a function in React Router v7"). Użyj WebSearch z domain filtering:

```
> Search for '[twój błąd]' but only from stackoverflow.com and github.com
Provide solution with code examples and Sources
```

**Cel:** Nauczenie się filtrowania wyników dla wyższej jakości odpowiedzi.

### Zadanie 3: Porównanie konkurencji (biznes)

Jeśli prowadzisz biznes lub pracujesz w startupie, zrób research 3 konkurentów:

```
> Fetch pricing pages of:
- https://competitor1.com/pricing
- https://competitor2.com/pricing
- https://competitor3.com/pricing

Create a comparison table: features, pricing tiers, unique selling points.
Suggest where we can differentiate.
```

**Cel:** Zrozumienie, jak WebFetch może zaoszczędzić godziny manual research.

---

## Linki do zasobów

1. **[Anthropic WebFetch Documentation](https://docs.anthropic.com/en/docs/build-with-claude/web-fetch)** - Oficjalna dokumentacja WebFetch (EN)

2. **[Using Claude for Market Research](https://www.anthropic.com/news/claude-for-business)** - Case studies wykorzystania WebSearch do research rynku (EN)

3. **[Model Context Protocol (MCP) Guide](https://modelcontextprotocol.io/)** - Jak podłączyć Claude do GitHub, Slack, baz danych (EN)

4. **[StackOverflow: Best practices for web scraping](https://stackoverflow.com/questions/tagged/web-scraping)** - Etyczne i techniczne aspekty scrapowania

5. **[GDPR Article 13 - Personal Data](https://gdpr.eu/article-13-personal-data-collected/)** - Przykład użycia WebFetch do analizy dokumentacji prawnej

---

**Do zobaczenia w następnym mailu!**

W kolejnej lekcji poznamy **NotebookEdit** i **Task** - czyli jak Claude edytuje Jupyter notebooks i deleguje pracę do wyspecjalizowanych subagentów. Odkryjemy, jak budować "zespół agentów" zamiast polegać na jednym.

Jeśli masz pytania lub chcesz podzielić się swoimi doświadczeniami z WebFetch/WebSearch - śmiało odpisz na tego maila!

Powodzenia!

---

**P.S.** Następnym razem, gdy spędzisz 30 minut czytając dokumentację nowej biblioteki, pomyśl: "Claude mógłby to przeczytać w 10 sekund i podać mi gotowy przykład". WebFetch to nie lenistwo - to efektywność.
