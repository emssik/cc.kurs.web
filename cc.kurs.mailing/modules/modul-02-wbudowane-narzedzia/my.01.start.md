Zanim zagłębimy się w Slash Commands, Agenty i Skille, musisz zrozumieć jak to wszystko działa. Jak to się dzieje, że możesz edytować pliki, wyszukiwać w sieci czy uruchamiać skrypty?

Tym zajmiemy się w tym (niezbyt długim) module.

Żeby dobrze pracować z nowoczesnymi narzędziami, musisz zrozumieć proste działanie matematyczne.

Model + Prompt + Context + Tools = Oczekiwany (lub nie) wynik.

Każdy z tych elementów jest bardzo ważny. Każdy z nich może sprawić, że dostaniesz zupełnie inny wynik niż oczekiwałeś.

To jest kurs Claude Code.

Zatem modele mamy z góry narzucone.

Możesz używać Haiku (najsłabszy do najprostszych prac, choć przez pewien czas pracował u mnie jako model do kodowania, ponieważ jego najnowsza wersja jest całkiem sensowna), Sonnet, model pośrodku, oraz Opus, najmocniejszy i najdroższy. Rewelacyjny zarówno do tworzenia projektów, planowania, analizy jak i do kodowania.

💡 **Uwaga:** Dostępność modelu Opus może zależeć od Twojego typu subskrypcji Claude Code.

Dobieraj modele mądrze - różnią się kosztami.

Prompt. To jest coś całkowicie po TWOJEJ stronie.

Czasy się zmieniły. Nowoczesne modele nie wymagają drobiazgowego prowadzenia za rączkę. Wystarczy im krótki opis oczekiwań - jeśli dostarczysz odpowiedni kontekst (o tym za moment), zrobią dokładnie to czego potrzebujesz.

Jednak. Z biegiem czasu nauczysz, się, że czasami warto w tym miejscu spędzić wiecej czasu. I zwłaszcza przy skomplikowanych tematach, dokładnie wytłumaczyć modelowi o co chodzi, podać przykłady, konkretne zasady pracy itp.

Z biegiem czasu, nauczysz się też (do czego gorąco namawiam), że gdy masz do rozwiązania większy problem, najpierw przedyskutuj go z modelem.

Jedno polecenie w stylu "zrób to", nie rozwiąże problemu.

Wytłumacz modelowi problem, zapytaj go czy wszystko rozumie, czy wie co ma zrobić, niech Ci to wytłumaczy, krok po kroku, jakie jest jego rozumienie i jaki jest jego plan na rozwiązanie.

Potem możesz z nim dogadywać szczegóły.

Później warto, poprosić model o streszczenie całej rozmowy, o wyciągnięcie najważniejszych wniosków i zapisanie ich do pliku.

Później czyścisz kontekst, ładujesz zapisany plik i powtarzasz scenariusz.

Tak długo, aż jesteś pewny / pewna, że to co masz, to kwintesencja twojego problemu i doskonała recepta na jego rozwiązanie.

Wtedy...

Wtedy przechodzimy do tematu kontekstu.

Bo.. Kontekst is the king... ;)

Model (odpowiedni) musi wiedzieć co chcesz zrobić (prompt) ale musi też wiedzieć, na czym ma działąć oraz skad ma brać dodatkowe informacje (kontekst).

I tutaj pojawia się ogromna różnica, między sposobem pracy osoby początkującej, osoby, która po prostu chce zrobić coś prostego i mieć z głowy, a np. zawodowym programistą, który POTRAFI pracować z AI.

Osoba początkująca, może uznać, że model wszystko sam sobie znajdzie i przy małych projektach może mieć rację. Jednak im projekt większy tym staje się to dla modelu trudniejsze.

Do tego, jeśli wymagasz, żeby model pracował np. z bibliotekami, których nie zna, to co prawda model potrafi sobie część rzeczy wyszukać w sieci, jednak. Jeśli podepniesz mu odpowiedni FRAGMENT dokumentacji jako element kontekstu, wszystko zadziała lepiej (wyższej jakości odpowiedź, do tego szybciej i taniej).

A profesjonalny programista, który doskonale zna kod nad którym pracuje może wskazać nie tylko konkretne pliki, ale wręcz nazwać klasy i metody, które model ma utworzyć / poprawić / przetestować.

Pisząc prompt, warto też pamiętać, o czym już wspominałem, żeby był tak bardzo jednoznaczny jak to tylko możliwe. A przy okazji, pamiętać, że model to nie idiota.

Zamiast pisać, "odczytaj mi plik z katalogu..." Albo "To jak to bedzie gotowe, zaktualizuj informacje xxx w pliku yyy". Albo "I to wszystko zapisz do nowo utworzonego pliku zzz", wystarczy:

```
READ @customer-feedback/ @sales-data.csv @support-tickets.json
Przeanalizuj wszystkie trzy źródła i znajdź wspólny mianownik. Szukam wzorców: które funkcje produktu wywołują najwięcej problemów, a które generują pozytywne komentarze? Sprawdź, czy problemy z feedbacku korelują z ticketami z supportu i czy wpływają na sprzedaż. Wyciągnij 5 najważniejszych wniosków z konkretnymi liczbami i zaproponuj 3 realne kroki do wdrożenia w najbliższym sprincie.
```

```
UPDATE @onboarding.md
Dodaj nową sekcję "Praca z AI w naszym zespole" między rozdziałem o narzędziach a procesach. Opisz trzy scenariusze: code review z Claude Code (dla devów), pisanie dokumentacji technicznej (dla wszystkich) i automatyzacja raportów (dla PM-ów). Do każdego scenariusza dodaj praktyczny przykład z naszego projektu - sprawdź @.claude/commands/ żeby zobaczyć jakie mamy custom commands i odwołaj się do nich. Zachowaj obecny ton dokumentu (przyjazny dla juniorów, bez żargonu) i dodaj na końcu sekcję FAQ z 3-4 najczęstszymi pytaniami które możesz wywnioskować z kontekstu zespołu.
```

```
CREATE @migration-plan-postgres.md
Musimy przejść z MySQL na PostgreSQL w ciągu 6 tygodni. Stwórz szczegółowy plan migracji na podstawie @database/schema.sql i @src/models/. Uwzględnij: mapowanie typów danych (zwłaszcza JSON i ENUM), zmiany w queryach (składnia PostgreSQL), wpływ na istniejące indeksy, oraz strategię migracji bez downtime (blue-green deployment). Dodaj timeline z kamieniami milowymi, ryzyka z planem mitygacji, oraz checklist dla każdego etapu. Na końcu zaproponuj skrypt testowy który zweryfikuje czy migracja przebiegła poprawnie. Format: markdown z TOC, sekcje powinny być gotowe do prezentacji dla CTO.
```

## Od autopilota do precyzyjnego sterowania - kiedy TY kierujesz narzędziami

Większość osób traktuje narzędzia jak czarną skrzynkę. Piszesz "przeczytaj plik", model wywołuje Read. Piszesz "znajdź funkcję validateUser", model wywołuje Grep. Wszystko działa automatycznie, po co zawracać sobie głowę szczegółami?

I wiesz co? Na początku to podejście jest absolutnie w porządku. Model świetnie radzi sobie z automatycznym doborem narzędzi i ich parametrów.

Ale jest moment, kiedy to się zmienia.

Moment, kiedy zdajesz sobie sprawę, że znajomość narzędzi i ich parametrów to nie jest "techniczny szczegół dla geeków". To jest **power-user skill**, który daje Ci pełną kontrolę nad tym, co Claude Code robi.

### Dwa poziomy pracy z narzędziami

**Poziom 1: Autopilot (większość użytkowników)**

Piszesz:
```
Znajdź wszystkie miejsca gdzie używamy starego API
```

Model sam:
- Wybiera narzędzie Grep
- Ustala pattern
- Decyduje o parametrach
- Zwraca wyniki

Działa świetnie... do momentu, aż natrafiasz na problem.

**Poziom 2: Precyzyjne sterowanie (power users)**

Piszesz:
```
Użyj Grep z parametrem multiline: true, żeby znaleźć wszystkie bloki konfiguracyjne API, które rozciągają się na wiele linii. Szukam pattern: 'api\\.config\\s*\\{[\\s\\S]*?endpoint.*old-api'
```

Teraz TY kierujesz:
- Jakie narzędzie (Grep)
- Z jakimi parametrami (multiline: true)
- Dokładny pattern (regex wieloliniowy)
- Co ma znaleźć (bloki konfiguracyjne)

Widzisz różnicę? W pierwszym przypadku **ufasz** modelowi. W drugim **sterujesz** modelem.

I nie chodzi o to, że model jest głupi. Chodzi o to, że **TY wiesz lepiej** czego potrzebujesz w konkretnej sytuacji.

### Pięć sytuacji z życia - kiedy TY przejmujesz stery

Zamiast teoretyzować, zobaczmy to na konkretnych przykładach. Pięć różnych osób, pięć różnych problemów, pięć razy precyzyjne sterowanie narzędziami.

#### 💼 Sytuacja 1: Backend Developer - migracja bazy z timeout

**Kim jest:** Kasia, senior backend developer
**Problem:** Uruchamia migrację 2M rekordów do nowej struktury tabel. Skrypt działa 7 minut, ale Claude Code przerywa po 3 minutach (domyślny timeout).

**Co robią inni:** Dzielą migrację na mniejsze części, tracą czas.

**Co robi Kasia (power user):**

```
Użyj Bash z timeout: 600000 (10 minut), żeby uruchomić pełną migrację:
npm run migrate:production -- --batch-size=5000 --table=users

Podczas działania, monitoruj output i daj mi znać jeśli zobaczysz błędy związane z foreign keys lub duplicate entries.
```

**Dlaczego to działa:**
- `timeout: 600000` = 10 minut (zamiast domyślnych 3)
- Konkretna komenda z parametrami
- Jasna instrukcja co monitorować

**Wynik:** Migracja przechodzi za pierwszym razem, bez dzielenia na części. Kasia oszczędza 2 godziny pracy.

---

#### 💼 Sytuacja 2: Marketing Manager - wieloliniowe szablony emaili

**Kim jest:** Marcin, marketing manager
**Problem:** W repozytorium z szablonami emaili (50+ plików) szuka wszystkich miejsc, gdzie używany jest stary footer. Footer to 15 linii HTML-a, standardowy Grep nie znajdzie.

**Co robią inni:** Ręcznie otwierają każdy plik, szukają wzrokiem. Lub proszą dewelopera o pomoc.

**Co robi Marcin (power user):**

```
Użyj Grep z parametrami:
- pattern: '<footer class="legacy"[\\s\\S]*?</footer>'
- multiline: true
- glob: "*.html"
- path: templates/emails/
- output_mode: "files_with_matches"

Szukam wszystkich plików, które zawierają stary footer (wieloliniowy blok HTML). Pokaż mi tylko nazwy plików, bez treści.
```

**Dlaczego to działa:**
- `multiline: true` - pozwala szukać wzorców rozciągniętych na wiele linii
- `glob: "*.html"` - filtruje tylko pliki HTML
- `output_mode: "files_with_matches"` - zwraca tylko nazwy (szybciej, czytelniej)
- Pattern `[\\s\\S]*?` - dopasowuje wszystko między tagami (włącznie z nowymi liniami)

**Wynik:** Marcin dostaje listę 12 plików do aktualizacji w 10 sekund. Bez pomocy developera.

---

#### 💼 Sytuacja 3: Data Analyst - paginacja dużych plików

**Kim jest:** Ania, data analyst
**Problem:** Musi przeanalizować logi z 120k linii. Szuka błędów w ostatnich 10k linii. Model nie może przeczytać całego pliku (token limit exceeded).

**Co robią inni:** Proszą model "przeczytaj końcówkę pliku", model próbuje zgadnąć ile to jest "końcówka", czasem trafia, czasem nie.

**Co robi Ania (power user):**

```
Użyj Read z parametrami:
- file_path: /logs/production-2026-01-30.log
- offset: 110000
- limit: 10000

Przeczytaj ostatnie 10k linii (od linii 110000 do końca). Szukam błędów związanych z timeout lub connection refused. Pokaż mi statystyki: ile błędów każdego typu i o której godzinie występowały najczęściej.
```

**Dlaczego to działa:**
- `offset: 110000` - zaczyna czytanie od linii 110k (pomija pierwsze 110k linii)
- `limit: 10000` - czyta dokładnie 10k linii (nie więcej, nie mniej)
- Jasne instrukcje co szukać w przeczytanych danych

**Bonus - paginacja ręczna:**

Jeśli Ania musi przejrzeć cały plik, robi to w częściach:

```
1. Read offset: 0, limit: 30000 (pierwsze 30k)
2. Read offset: 30000, limit: 30000 (kolejne 30k)
3. Read offset: 60000, limit: 30000 (kolejne 30k)
4. Read offset: 90000, limit: 30000 (ostatnie 30k)
```

**Wynik:** Ania analizuje gigantyczne logi bez token limit errors. Ma pełną kontrolę nad tym, które fragmenty czyta.

---

#### 💼 Sytuacja 4: Project Manager - przeszukiwanie z kontrolowanym outputem

**Kim jest:** Tomek, project manager
**Problem:** W repozytorium 200+ plików TypeScript szuka wszystkich miejsc gdzie używamy biblioteki `lodash`. Chce zobaczyć pierwsze 20 wystąpień, żeby ocenić skalę zależności.

**Co robią inni:** Proszą model "znajdź lodash", dostają albo wszystkie wyniki (200+ linii, przytłaczające), albo model sam decyduje ile pokazać (niespójne).

**Co robi Tomek (power user):**

```
Użyj Grep z parametrami:
- pattern: "import.*from ['\"]lodash"
- type: "ts"
- output_mode: "content"
- head_limit: 20
- -n: true

Pokaż mi pierwsze 20 miejsc gdzie importujemy lodash (z numerami linii). To wystarczy żeby ocenić skalę problemu.
```

**Dlaczego to działa:**
- `type: "ts"` - tylko pliki TypeScript (szybsze niż szukanie wszędzie)
- `output_mode: "content"` - pokazuje konkretne linie kodu (nie tylko nazwy plików)
- `head_limit: 20` - ogranicza output do 20 wyników (nie 200+)
- `-n: true` - pokazuje numery linii (łatwiej nawigować)

**Bonus - liczenie wystąpień:**

Jeśli Tomek chce wiedzieć "ile łącznie?", zmienia tylko jeden parametr:

```
output_mode: "count" (zamiast "content")
```

Dostaje: "53 matches in 28 files" - bez zbędnych detali.

**Wynik:** Tomek ma kontrolę nad tym ile informacji dostaje. Może zacząć od przeglądu (20 przykładów), potem policzyć całość (count), na końcu zobaczyć wszystko (bez head_limit).

---

#### 💼 Sytuacja 5: Technical Writer - precyzyjne pobieranie dokumentacji

**Kim jest:** Magda, technical writer
**Problem:** Pisze instrukcję użycia nowego API. Musi wyciągnąć ze strony dokumentacji TYLKO listę endpointów z ich parametrami, bez tutoriali, przykładów, FAQów (których jest tam mnóstwo).

**Co robią inni:** Proszą model "pobierz dokumentację API", dostają całą stronę (20 sekcji, 100+ linii), muszą ręcznie wyłuskiwać co potrzebują.

**Co robi Magda (power user):**

```
Użyj WebFetch z parametrami:
- url: https://api.example.com/docs
- prompt: "Wyciągnij TYLKO listę endpointów API (URL + HTTP method) wraz z ich wymaganymi parametrami. Ignoruj tutoriale, przykłady kodu, FAQ i opisy use case'ów. Format: dla każdego endpointu podaj: URL, method, required params, optional params."

Potrzebuję czystej listy do tabeli w dokumentacji, bez zbędnego kontekstu.
```

**Dlaczego to działa:**
- `url` - wskazuje konkretną stronę do pobrania
- `prompt` - precyzyjnie definiuje CO wyciągnąć i CO zignorować
- Jasna instrukcja formatu outputu (URL, method, params)
- Model wie że ma filtrować treść (nie zwracać wszystkiego)

**Rezultat:** Zamiast 20 sekcji dokumentacji, Magda dostaje czystą listę 12 endpointów z parametrami - gotową do skopiowania do instrukcji.

**Bonus - wybór modelu:**

Dla prostych stron (tylko tekst, brak JS), Magda może zaoszczędzić:

```
Użyj Task z subagent_type: general-purpose, model: haiku, żeby pobrać i wyciągnąć z prostej strony dokumentacji tylko tabelę API endpointów
```

Haiku (tańszy i szybszy) świetnie radzi sobie z ekstrakcją strukturalnych danych. Sonnet zostawia do analizy złożonych treści.

**Wynik:** Magda wie kiedy użyć WebFetch z precyzyjnym promptem (zamiast "pobierz wszystko"), oraz kiedy wybrać tańszy model dla prostych zadań. Oszczędza czas i pieniądze.

---

#### 💼 Sytuacja 6: Content Writer - analiza trendów w artykułach

**Kim jest:** Monika, content writer dla bloga technologicznego
**Problem:** Musi przeanalizować 200+ opublikowanych artykułów, aby znaleźć najczęstsze tematy i sprawdzić które generują najwięcej zaangażowania. Pliki markdown są rozrzucone w różnych katalogach.

**Co robią inni:** Ręcznie przeglądają każdy plik, notują tematy w Excelu. Albo proszą model "przejrzyj wszystkie artykuły" - dostają błąd przekroczenia limitu tokenów.

**Co robi Monika (power user):**

```
Użyj Glob z parametrami:
- pattern: "**/*.md"
- path: ./content/blog/

Znajdź wszystkie artykuły. Następnie użyj Grep z:
- pattern: "^# "
- output_mode: "content"
- head_limit: 200
- path: ./content/blog/

Pokaż mi wszystkie tytuły artykułów (linie zaczynające się od "# ").
Na podstawie tytułów zidentyfikuj 5 najczęstszych tematów i policz ile artykułów przypada na każdy temat.
```

**Dlaczego to działa:**
- `Glob "**/*.md"` - znajduje wszystkie pliki markdown rekursywnie
- `pattern: "^# "` - znajduje tylko linie nagłówków pierwszego poziomu (tytuły)
- `output_mode: "content"` - pokazuje treść (tytuły), nie tylko ścieżki plików
- `head_limit: 200` - wystarczy do zobaczenia wszystkich tytułów bez przeciążenia kontekstu

**Wynik:** Monika w 30 sekund dostaje listę 200 tytułów i analizę trendów: "AI" - 45 artykułów, "DevOps" - 32, "React" - 28, "Cloud" - 24, "Testing" - 18. Wie co pisać dalej, co działa, a co trzeba rozwinąć.

---

#### 💼 Sytuacja 7: HR Recruiter - screening CV w dużej puli

**Kim jest:** Paweł, HR w startupie technologicznym
**Problem:** Otrzymał 300 CV w formatach TXT i MD do roli Senior Python Developer. Szuka kandydatów z doświadczeniem w Python + Django + PostgreSQL. Ręczne przeglądanie zajęłoby cały dzień.

**Co robią inni:** Otwierają każde CV, szukają wzrokiem technologii. Lub proszą model "znajdź najlepszych kandydatów" - dostają ogólnikowe podsumowanie bez konkretnych nazwisk.

**Co robi Paweł (power user):**

```
Krok 1 - Znajdź CV z Python i Django:

Użyj Grep z parametrami:
- pattern: "Python.*Django|Django.*Python"
- glob: "*.{txt,md}"
- path: ./cv/
- output_mode: "files_with_matches"
- -i: true

Krok 2 - Z tych plików znajdź te z PostgreSQL:

Użyj Grep z parametrami:
- pattern: "PostgreSQL|Postgres"
- path: [lista plików z kroku 1]
- output_mode: "files_with_matches"
- -i: true

Pokaż mi tylko nazwy plików kandydatów, którzy mają wszystkie 3 technologie.
```

**Dlaczego to działa:**
- `pattern: "Python.*Django|Django.*Python"` - znajduje Python i Django w dowolnej kolejności
- `-i: true` - ignoruje wielkość liter (PYTHON, python, Python)
- `glob: "*.{txt,md}"` - ogranicza do plików tekstowych
- `output_mode: "files_with_matches"` - zwraca tylko nazwy (szybko, czytelnie)
- Dwuetapowe filtrowanie - najpierw Python+Django, potem PostgreSQL

**Wynik:** Paweł zawęża pulę z 300 do 23 kandydatów w 2 minuty. Teraz może czytać tylko te CV szczegółowo. Zaoszczędził 6 godzin pracy.

---

#### 💼 Sytuacja 8: Nauczyciel - sprawdzanie prac domowych

**Kim jest:** Anna, nauczycielka programowania w bootcampie
**Problem:** 40 uczniów wysłało rozwiązania zadania (pliki Python). Musi sprawdzić, którzy użyli wymaganej funkcji `calculate_average()` i którzy mają testy jednostkowe. Ręczne otwieranie 40 plików to godzina pracy.

**Co robią inni:** Otwierają każdy plik, szukają funkcji i testów. Lub proszą model "sprawdź prace" - dostają chaotyczne podsumowanie bez konkretów.

**Co robi Anna (power user):**

```
Krok 1 - Sprawdź kto zdefiniował wymaganą funkcję:

Użyj Grep z parametrami:
- pattern: "def calculate_average\\("
- glob: "*/homework.py"
- output_mode: "count"

Ile osób zdefiniowało funkcję calculate_average()?

Krok 2 - Sprawdź kto napisał testy:

Użyj Grep z parametrami:
- pattern: "def test_|import unittest|import pytest"
- glob: "*/test_*.py"
- output_mode: "files_with_matches"

Pokaż mi listę uczniów (nazwy katalogów), którzy napisali testy
(mają pliki test_*.py z importem unittest lub pytest).

Krok 3 - Znajdź kto NIE ma testów:

Porównaj listę wszystkich uczniów (40 katalogów) z listą z Kroku 2.
Pokaż mi kto nie ma testów - to oni potrzebują feedback.
```

**Dlaczego to działa:**
- `pattern: "def calculate_average\\("` - precyzyjnie znajduje definicję funkcji
- `glob: "*/homework.py"` - szuka w podkatalogach uczniów
- `output_mode: "count"` - daje szybką statystykę (38/40 ma funkcję)
- `glob: "*/test_*.py"` - standardowa konwencja nazewnictwa testów
- Trzyetapowe workflow - funkcja → testy → brakujące

**Wynik:** Anna w 5 minut wie, że 38/40 ma funkcję (świetnie!), ale tylko 12/40 ma testy (problem!). Ma listę 28 osób które potrzebują feedback o testach. Zaoszczędziła 55 minut, może skupić się na jakościowym feedbacku zamiast mechanicznego sprawdzania.

---

### Jak jawnie prosić o konkretne narzędzie

Widzisz wzorzec? Jest prosta formuła:

```
Użyj [NARZĘDZIE] z parametrami:
- parametr1: wartość1
- parametr2: wartość2

[Wyjaśnij DLACZEGO i CO ma zrobić]
```

Albo krócej, w jednej linii:

```
Użyj [NARZĘDZIE] z [parametr: wartość], żeby [cel]
```

**Przykład 1 (lista parametrów):**
```
Użyj Read z parametrami:
- file_path: logs/error.log
- offset: 5000
- limit: 1000

Przeczytaj fragment logów od linii 5000 do 6000, szukam błędów związanych z payment gateway.
```

**Przykład 2 (jednoliniówka):**
```
Użyj Bash z timeout: 300000, żeby uruchomić testy E2E: npm run test:e2e
```

**Przykład 3 (złożone parametry):**
```
Użyj Grep z multiline: true, pattern: 'function\\s+\\w+\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?return', żeby znaleźć wszystkie funkcje które mają return statement w ciele.
```

**Co się dzieje pod maską:**

Kiedy napiszesz "Użyj Read z offset: 1000", model:
1. Rozpoznaje że chcesz **jawnie** wywołać narzędzie Read
2. Wie że ma użyć parametru `offset: 1000`
3. Nie musi zgadywać, nie musi eksperymentować
4. Robi dokładnie to, czego chcesz

To jak różnica między "jedź do centrum" (autopilot wybiera trasę) a "jedź przez most Poniatowskiego i Aleję Jerozolimskie" (ty kierujesz trasą).

### 🎯 Pro-tip: Kombinuj narzędzia jak LEGO

Najfajniejsze jest to, że możesz **łączyć** narzędzia w sekwencje. Każde narzędzie robi jedną rzecz dobrze, ale razem dają znacznie więcej możliwości.

**Pattern 1: Grep → Read → Edit (refactoring)**

```
1. Użyj Grep żeby znaleźć wszystkie pliki używające starej funkcji `fetchUser`
2. Użyj Read żeby przeczytać każdy z tych plików
3. Użyj Edit żeby zamienić `fetchUser` na `getUserData` w każdym miejscu
```

**Pattern 2: WebFetch → Bash → Write (dokumentacja)**

```
1. Użyj WebFetch na https://api.example.com/docs żeby pobrać dokumentację endpointów
2. Użyj Bash: curl https://api.example.com/health żeby sprawdzić aktualny status API
3. Użyj Write żeby zapisać consolidated docs do API-REFERENCE.md
```

**Pattern 3: Glob → Grep → Task (analiza)**

```
1. Użyj Glob "**/*.test.ts" żeby znaleźć wszystkie pliki z testami
2. Użyj Grep pattern: "describe\\(" żeby policzyć ile mamy test suites (output_mode: count)
3. Użyj Task z subagent Explore żeby znaleźć testy które nie mają asercji (potencjalne bugi)
```

Każde narzędzie to element LEGO. Znając ich możliwości (parametry, output modes, timeouty), budujesz złożone workflow z prostych klocków.

### 📚 Case Study: Julia i logi z Black Friday

**Persona:** Julia, data analyst w e-commerce
**Sytuacja:** Musi przeanalizować logi błędów z Black Friday (plik 120k linii, 25 MB)
**Problem:** Model nie może przeczytać całego pliku → token limit exceeded

**Próba 1 (początkujący):**
```
Przeczytaj plik logs/black-friday-errors.log i pokaż mi wszystkie błędy związane z payment
```
**Rezultat:** Error - "File too large to read entirely"

**Próba 2 (początkujący z podpowiedzią modelu):**
```
Przeczytaj ostatnią część pliku logs/black-friday-errors.log
```
**Rezultat:** Model zgaduje "ostatnia część" = 10k linii, ale błędy są w liniach 80k-90k

**Próba 3 (Julia jako power user):**

Julia wie że:
- Plik ma 120k linii
- Błędy payment zaczęły się około 15:00 (środek pliku, około linia 60k)
- Chce przejrzeć zakres 50k-80k (30k linii)

Pisze:
```
Strategia analizy dużego pliku logów (120k linii):

1. Użyj Read z offset: 50000, limit: 10000
   Przeczytaj linie 50k-60k, znajdź pierwszą payment error, zapisz timestamp

2. Użyj Read z offset: 60000, limit: 10000
   Przeczytaj linie 60k-70k, kontynuuj analizę

3. Użyj Read z offset: 70000, limit: 10000
   Przeczytaj linie 70k-80k, sprawdź kiedy błędy przestały występować

Dla każdego fragmentu:
- Policz ile błędów payment (error code 402, 500, 503)
- Wyciągnij timestamp pierwszego i ostatniego błędu
- Znajdź najczęstszy error message

Na końcu daj mi:
- Całkowita liczba payment errors w zakresie 50k-80k
- Przedział czasowy (od-do)
- Top 3 error messages
- Sugestie co mogło pójść nie tak
```

**Rezultat:**
- Fragment 1 (50k-60k): 47 błędów, 14:52-15:18, głównie 503 Service Unavailable
- Fragment 2 (60k-70k): 203 błędy, 15:18-15:45, głównie 402 Payment Failed + 503
- Fragment 3 (70k-80k): 89 błędów, 15:45-16:12, głównie 402, potem spadek

**Insight:** Peak błędów między 15:18-15:45, payment gateway nie wytrzymał ruchu. Julia ma konkretne dane (timestamp, error codes, liczby) do raportu dla CTO.

**Czas wykonania:** 3 minuty (zamiast "nie da się" lub "poproś dewelopera o SQL query")

Julia wiedziała o parametrach `offset` i `limit`. Zamiast walczyć z token limitem, podzieliła pracę na wykonalne fragmenty. Model wykonał dokładnie to, czego chciała, w sposób, który chciała.

### ✅ Zadanie dla Ciebie

Czas sprawdzić czy naprawdę rozumiesz tę lekcję. Wybierz jeden poziom trudności i spróbuj:

**Poziom 1: Starter**

Masz plik `team-feedback.md` z 5000 linii komentarzy od zespołu. Chcesz przeczytać tylko komentarze z ostatniego miesiąca (linie 4500-5000).

Napisz prompt z jawnym użyciem narzędzia Read i odpowiednimi parametrami.

**Poziom 2: Intermediate**

W projekcie (50+ plików JS) szukasz wszystkich funkcji które używają `setTimeout`. Funkcje są wieloliniowe, standardowy Grep nie wystarczy.

Napisz prompt używając Grep z odpowiednimi parametrami (multiline, pattern, output_mode).

**Poziom 3: Advanced**

Masz API endpoint który czasami zwraca błąd 500. Chcesz:
1. Pobrać dokumentację endpointu (WebFetch)
2. Sprawdzić ostatnie logi błędów (Read z offset dla dużego pliku)
3. Napisać test reprodukujący problem (Write)

Zaprojektuj sekwencję narzędzi (jak w sekcji LEGO patterns) z konkretnymi parametrami.

---

**Bonus:** Podziel się swoim rozwiązaniem na LinkedIn/Twitter z hasztagiem #ClaudeCodePowerUser - chętnie zobaczę jak sobie poradzisz!

---

### 📚 Słowniczek

- **Pattern (wzorzec)** - wyrażenie regularne (regex) opisujące co chcesz znaleźć w tekście. Przykład: `api\\.config` znajdzie tekst "api.config", a `function\\s+\\w+` znajdzie słowo "function" + spacja + dowolna nazwa funkcji.

- **API (Application Programming Interface)** - zestaw endpointów (adresów URL) pozwalający aplikacjom komunikować się ze sobą. Przykład: API płatności pozwala Twojej aplikacji wysłać żądanie "wykonaj płatność" do systemu bankowego.

- **Endpoint** - konkretny adres URL w API, który odpowiada za określoną funkcję. Przykład: `https://api.example.com/users` to endpoint zwracający listę użytkowników.

- **Kernel (jądro)** - środowisko wykonawcze w Jupyter Notebook, które pamięta zmienne i funkcje między kolejnymi wywołaniami kodu. Jak "sesja" w Pythonie - raz zdefiniowana zmienna istnieje do restartu kernela.

- **Timeout** - maksymalny czas (w milisekundach) jaki narzędzie ma na wykonanie operacji, zanim zostanie przerwane. Domyślnie: 180000ms (3 minuty) dla Bash.

- **Multiline** - parametr Grep pozwalający szukać wzorców rozciągniętych na wiele linii (np. całe funkcje, bloki kodu). Bez tego, Grep szuka tylko w obrębie pojedynczej linii.

- **Offset** - numer linii od której narzędzie Read zaczyna czytanie pliku. Przykład: offset 1000 = pomiń pierwsze 1000 linii, zacznij od 1001.

- **Limit** - maksymalna liczba linii którą narzędzie Read przeczyta (licząc od offset). Przykład: offset 1000 + limit 500 = przeczytaj linie 1001-1500.

- **Head_limit** - parametr Grep ograniczający liczbę zwróconych wyników (jak Unix `head`). Przydatny gdy chcesz zobaczyć pierwsze N wystąpień, nie wszystkie.

- **Output_mode** - parametr Grep określający format outputu:
  - `content` = pokaż matching linie kodu
  - `files_with_matches` = pokaż tylko nazwy plików (default)
  - `count` = pokaż tylko liczbę wystąpień

- **Context lines (-A, -B, -C)** - parametry Grep pokazujące linie kontekstu wokół znalezionego dopasowania:
  - `-A 3` = 3 linie **After** (po)
  - `-B 3` = 3 linie **Before** (przed)
  - `-C 3` = 3 linie context (przed i po)

- **Glob pattern** - wzorzec dopasowania nazw plików (np. `*.js`, `**/*.test.ts`). Używany w Grep i Glob do filtrowania które pliki przeszukiwać.

- **Token limit** - maksymalna liczba tokenów (w przybliżeniu: fragmentów słów) którą model może przetworzyć w jednym requestcie. Duże pliki mogą przekroczyć limit.

---

## Narzędzia Claude Code (Tools)

To właśnie narzędzia pozwalają Claude Code edytować pliki, szukać kodu i uruchamiać skrypty. Większość użytkowników ignoruje narzędzia - traktuje je jak czarną skrzynkę.

Jednak, jeśli poznasz je bliżej, zobaczysz jakie dokładnie mają możliwości. Co potrafią, a z czym mają problem. Dopiero wtedy wykorzystasz pełnię możliwości Claude Code.

No dobrze, to jakie narzędzia są dostępne w CC?

💡 **Pro-tip:** W każdej chwili możesz poprosić Claude Code: "list tools" lub "pokaż mi listę dostępnych narzędzi". Model wyświetli Ci aktualną listę wszystkich narzędzi które ma do dyspozycji w danej sesji - wraz z ich opisami i parametrami. Tak możesz sprawdzić co jest dostępne w Twojej wersji CC lub przypomnieć sobie parametry konkretnego narzędzia.

Opis najważniejszych narzędzi - co robią, kiedy i jak ich używać:

## Narzędzia do pracy z plikami

💡 **Od wersji 2.1.21:** Claude preferuje narzędzia Read, Edit, Write zamiast ich odpowiedników bash (cat, sed, awk). Używaj Read zamiast `cat`, Edit zamiast `sed`. To zapewnia lepszą integrację z Claude Code i bardziej przewidywalne wyniki.

### Read
Odczytuje zawartość plików z dysku.

**Parametry:**
- `file_path` (wymagany) - ścieżka do pliku
- `offset` (opcjonalny) - od której linii zacząć czytanie
- `limit` (opcjonalny) - ile linii przeczytać

Obsługuje tekst, obrazy, PDF-y i notebooki Jupyter.

### Write
Tworzy nowy plik lub nadpisuje istniejący.

**Parametry:**
- `file_path` (wymagany) - ścieżka do pliku
- `content` (wymagany) - zawartość do zapisania

Zawsze wymaga wcześniejszego użycia Read, jeśli plik istnieje.

### Edit
Wykonuje dokładne zamiany tekstowe w plikach.

**Parametry:**
- `file_path` (wymagany) - ścieżka do pliku
- `old_string` (wymagany) - tekst do znalezienia
- `new_string` (wymagany) - tekst zastępujący
- `replace_all` (opcjonalny) - czy zamienić wszystkie wystąpienia (domyślnie false)

Wymaga wcześniejszego użycia Read.

### NotebookEdit
Edytuje komórki w notebookach Jupyter (.ipynb).

**Parametry:**
- `notebook_path` (wymagany) - ścieżka do notebooka
- `new_source` (wymagany) - nowa zawartość komórki
- `cell_id` (opcjonalny) - ID komórki do edycji
- `cell_type` (opcjonalny) - typ komórki (code/markdown)
- `edit_mode` (opcjonalny) - tryb edycji (replace/insert/delete)

## Narzędzia do wyszukiwania

### Glob
Szybkie wyszukiwanie plików po wzorcach (jak `*.js` czy `src/**/*.tsx`).

**Parametry:**
- `pattern` (wymagany) - wzorzec glob
- `path` (opcjonalny) - katalog do przeszukania

Zwraca ścieżki posortowane po dacie modyfikacji.

### Grep
Wyszukiwanie tekstu w zawartości plików (ripgrep).

**Parametry:**
- `pattern` (wymagany) - wyrażenie regularne
- `path` (opcjonalny) - gdzie szukać
- `output_mode` (opcjonalny) - co zwrócić: "content" (linie), "files_with_matches" (ścieżki), "count" (liczniki)
- `glob` (opcjonalny) - filtr plików (np. "*.js")
- `type` (opcjonalny) - typ plików (js, py, rust, etc.)
- `-i` (opcjonalny) - ignoruj wielkość liter
- `-A`, `-B`, `-C` (opcjonalne) - linie kontekstu (po/przed/wokół)
- `multiline` (opcjonalny) - wzorce wieloliniowe
- `head_limit` (opcjonalny) - ogranicz wyniki
- `offset` (opcjonalny) - pomiń pierwsze N wyników

## Narzędzia do wykonywania kodu

### Bash
Wykonuje polecenia w terminalu (bash/zsh).

**Parametry:**
- `command` (wymagany) - polecenie do wykonania
- `description` (opcjonalny) - opis co robi polecenie
- `timeout` (opcjonalny) - limit czasu w ms (domyślnie 180000, max 600000)
- `run_in_background` (opcjonalny) - uruchom w tle
- `dangerouslyDisableSandbox` (opcjonalny) - wyłącz sandbox (tylko gdy konieczne)

💡 **Uwaga o timeout:** Domyślny timeout dla Bash to 3 minuty (180000ms). Dla hooków (od wersji 2.1.3) timeout wynosi 10 minut (600000ms).

Katalog roboczy się utrzymuje, ale stan shell'a nie.

### mcp__ide__executeCode
Wykonuje kod Python w kernelu Jupyter (tylko dla notebooków).

**Parametry:**
- `code` (wymagany) - kod do wykonania

Stan kernela utrzymuje się między wywołaniami.

## Narzędzia sieciowe

### WebFetch
Pobiera i analizuje treść z URL.

**Parametry:**
- `url` (wymagany) - adres URL
- `prompt` (wymagany) - co chcesz wyciągnąć z treści

HTML jest konwertowane na markdown. Cache 15 minut.

### WebSearch
Wyszukuje w internecie (tylko USA).

**Parametry:**
- `query` (wymagany) - zapytanie
- `allowed_domains` (opcjonalny) - lista dozwolonych domen
- `blocked_domains` (opcjonalny) - lista blokowanych domen

## Narzędzia do zarządzania zadaniami

### Task
Uruchamia wyspecjalizowane subagenty.

**Parametry:**
- `subagent_type` (wymagany) - typ agenta: Bash, general-purpose, Explore, Plan, claude-code-guide
- `prompt` (wymagany) - zadanie dla agenta
- `description` (wymagany) - krótki opis (3-5 słów)
- `model` (opcjonalny) - model (sonnet/opus/haiku)
- `resume` (opcjonalny) - ID agenta do wznowienia
- `run_in_background` (opcjonalny) - uruchom w tle

### TaskCreate
Tworzy nowe zadanie na liście TODO.

**Parametry:**
- `subject` (wymagany) - tytuł zadania
- `description` (wymagany) - szczegółowy opis
- `activeForm` (opcjonalny) - forma ciągła (np. "Running tests")
- `metadata` (opcjonalny) - dodatkowe metadane

### TaskUpdate
Aktualizuje istniejące zadanie.

**Parametry:**
- `taskId` (wymagany) - ID zadania
- `status` (opcjonalny) - status: pending/in_progress/completed/deleted
- `subject` (opcjonalny) - nowy tytuł
- `description` (opcjonalny) - nowy opis
- `activeForm` (opcjonalny) - nowa forma ciągła
- `owner` (opcjonalny) - właściciel
- `addBlocks` (opcjonalny) - zadania które to blokuje
- `addBlockedBy` (opcjonalny) - zadania które blokują to
- `metadata` (opcjonalny) - metadane do scalenia

### TaskList
Wyświetla listę wszystkich zadań.

**Parametry:** brak

### TaskGet
Pobiera szczegóły zadania.

**Parametry:**
- `taskId` (wymagany) - ID zadania

### TaskOutput
Pobiera output z zadania w tle.

**Parametry:**
- `task_id` (wymagany) - ID zadania
- `block` (opcjonalny) - czekać na zakończenie (domyślnie true)
- `timeout` (opcjonalny) - max czas oczekiwania w ms

### TaskStop
Zatrzymuje zadanie w tle.

**Parametry:**
- `task_id` (wymagany) - ID zadania do zatrzymania

## Narzędzia do interakcji z użytkownikiem

### AskUserQuestion
Zadaje pytania użytkownikowi (1-4 pytania).

**Parametry:**
- `questions` (wymagany) - lista pytań, każde z:
  - `question` - treść pytania
  - `header` - krótka etykieta (max 12 znaków)
  - `options` - 2-4 opcje z `label` i `description`
  - `multiSelect` - czy można wybrać wiele (domyślnie false)
- `metadata` (opcjonalny) - metadane dla trackingu

## Narzędzia trybu planowania

### EnterPlanMode
Przechodzi w tryb planowania implementacji.

**Parametry:** brak

### ExitPlanMode
Wychodzi z trybu planowania i czeka na zatwierdzenie.

**Parametry:**
- `allowedPrompts` (opcjonalny) - lista uprawnień potrzebnych do implementacji
- `pushToRemote` (opcjonalny) - czy wysłać plan do sesji zdalnej

## Inne narzędzia

### Skill
Wykonuje skilla (slash command).

**Parametry:**
- `skill` (wymagany) - nazwa skilla (np. "commit", "review-pr")
- `args` (opcjonalny) - argumenty dla skilla

### mcp__ide__getDiagnostics
Pobiera diagnostykę z VS Code (błędy, warningi).

**Parametry:**
- `uri` (opcjonalny) - URI pliku (jeśli nie podano, zwraca dla wszystkich)

