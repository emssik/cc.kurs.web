# NOTATKI Z POSIEDZENIA KRYZYSOWEGO

**Data:** 30 stycznia 2026
**Godzina:** 18:04-18:35 (31 minut)
**Miejsce:** Sala Operacyjna KCZE, ul. Krucza 46, Warszawa
**Prowadzący:** Iwona Krawczyk (Dyrektor Operacyjny)

**Uczestnicy:**
- Iwona Krawczyk (Dyrektor Operacyjny KCZE)
- Tomasz Nowak (Inżynier Senior)
- mjr Paweł Mazur (MSWiA, przedstawiciel)
- kpt. Anna Kowalska (ABW, łącznik)
- dr Marek Lewandowski (Dyrektor Medyczny, reprezentacja szpitali)
- **[Ty - nowy koordynator operacyjny]**

---

## 18:04 - Iwona Krawczyk otwiera posiedzenie

> "Dobry wieczór. Sytuacja jest poważna. 17:55 - cyberatak na 3 elektrownie. 2.1M ludzi bez prądu. 47 szpitali na generatorach - paliwo do ~22:00. Mamy ~3.5 godziny żeby uratować sytuację.
>
> Tomasz - raport techniczny. Szybko."

---

## 18:05 - Tomasz Nowak (raport techniczny)

> "47 podstacji transformatorowych wyłączone. Z tego:
> - 18 sprawnych (restart 15-30 min)
> - 23 uszkodzone (naprawa 45-240 min)
> - 6 z ryzykiem (logika-bomba lub sabotaż)
>
> Mamy 12 ekip. No, 11 - EKIPA-10 nie odpowiada od 17:30.
>
> Dependencies: PS-02 i PS-23 zależą od PS-01. PS-09 zależy od PS-08. PS-27 (CSK!) zależy od PS-08.
>
> **Problem nr 1:** PS-08 (Praga Północ) ma logikę-bombę. 50/50 czy zadziała czy się spali. PS-08 zasila 3 szpitale CRITICAL + PS-27 która zasila CSK (31 pacjentów na ECMO).
>
> **Problem nr 2:** PS-15 wymaga 240 minut naprawy. To prawie 4 godziny. Nie zdążymy w pierwszej fali."

*Iwona Krawczyk:* "Rozumiem. Następne."

---

## 18:08 - dr Marek Lewandowski (raport medyczny)

> "47 szpitali bez głównego zasilania. Generatory rezerwowe działają, ale paliwo starczy 2.5-4h zależnie od szpitala.
>
> **CRITICAL (życie i śmierć w <3h):**
> - Szpital Dziecięcy: 2 noworodki <1000g na respiratorach NICU. Paliwo do 20:50. Bez prądu - śmierć w 10 minut.
> - Szpital Kardiologiczny (CSK): 6 pacjentów na ECMO. Bez prądu - śmierć w 3 minuty. Paliwo do 20:45.
> - Szpital Wojewódzki: 67 pacjentów OIOM na respiratorach. Paliwo do 20:45.
>
> **HIGH (stabilni ale krytyczni w 3-5h):** 15 szpitali
>
> **MEDIUM/LOW:** Reszta - stabilni pacjenci.
>
> Proszę - ratujcie CRITICAL najpierw. Proszę."

*Iwona Krawczyk:* "Zrobimy co w naszej mocy. Następne."

---

## 18:12 - kpt. Anna Kowalska (ABW, raport o hakerach)

> "Grupa DarkGrid. Znani nam. Blackout Ukraina 2024, Estonia 2023. Sponsorowani przez państwo - prawdopodobnie Rosja.
>
> O 18:05 dostaliśmy komunikat z żądaniami:
> - 50M USD Bitcoin
> - Uwolnienie 3 osadzonych hakerów
> - Oficjalne przeprosiny za politykę antyrosyjską
> - Deadline: 48h (niedziela 18:00)
>
> Ostrzeżenie: zostawili 'prezenty' w niektórych podstacjach. PS-08 potwierdzona logika-bomba. PS-03 i PS-26 podejrzane.
>
> **Rekomendacja ABW:** Nie spełniać żądań. To tylko zachęci do kolejnych ataków. Skupcie się na przywróceniu zasilania."

*Iwona Krawczyk:* "Rozumiem. Minister MSWiA?"

---

## 18:15 - mjr Paweł Mazur (MSWiA, bezpieczeństwo publiczne)

> "Pani Dyrektor, mjr Paweł Mazur. MSWiA gotowe do wsparcia.
>
> **Obawy:**
> - Chaos społeczny: ludzie w panice, -15°C, ciemno. Ryzyko plundrowania, bloków dróg.
> - Media: jeśli zdobędą info o żądaniach hakerów → masowa panika.
> - Bezpieczeństwo ekip KCZE: ludzie sfrustrowani, mogą atakować ekipy terenowe.
>
> **Wsparcie MSWiA:**
> - Policja: patrole w dzielnicach bez prądu, eskorty dla ekip KCZE
> - Komunikacja: koordynacja komunikatów (unikać paniki)
> - Ewentualnie wojsko: wsparcie logistyczne (transporty, paliwo)
>
> Czekam na dyspozycje."

*Iwona Krawczyk:* "Dziękuję. Policja potrzebna - eskorty dla ekip do kluczowych podstacji. Szczegóły ustalicie z [Twoje imię]."

---

## 18:20 - Iwona Krawczyk (przydzielenie zadań)

> "[Twoje imię], od teraz jesteś koordynatorem operacyjnym tego kryzysu. To Twoja odpowiedzialność.
>
> **Zadania:**
> 1. Przeanalizuj chaos w folderze `chaos/` - podstacje, szpitale, ekipy, zasoby.
> 2. Zdecyduj KTO dostanie prąd PIERWSZY. Triage. Ranking TOP 10 podstacji.
> 3. Skoordynuj zasoby: 12 ekip, 23 generatory, 15k L paliwa. Routing, timeline.
> 4. Przygotuj komunikaty: media, ludność, minister, ekipy terenowe.
> 5. Raportuj do mnie co 30 minut.
>
> **Deadline:** Generatory w szpitalach muszą mieć paliwo PRZED 22:00. To 3h 25min od teraz.
>
> Tomasz - wspiera technicznie.
> mjr Mazur - koordynacja z policją.
> dr Lewandowski - kontakt ze szpitalami.
>
> Pytania?"

*[Tu była Twoja odpowiedź - brak w notatce]*

---

## 18:25 - Tomasz Nowak (dodatkowe uwagi techniczne)

> "Jeszcze jedno - PS-08. Jeśli próbujecie restart i się spali - 3 szpitale tracą zasilanie NATYCHMIAST. Plus PS-27 która zasila CSK.
>
> Rekomendacja: generatory mobilne do 3 szpitali NAJPIERW. Potem próba restart PS-08. Jeśli spłonie - szpitale mają backup.
>
> I jeszcze - spawanie w -15°C trwa 2x dłużej. Metal kruchy. Uwzględnijcie to w timeline."

*Iwona Krawczyk:* "Dobrze. [Twoje imię], to uwzględnij."

---

## 18:30 - dr Lewandowski (apel)

> "Proszę... te noworodki w Szpitalu Dziecięcym. Nie przeżyją 10 minut bez respiratorów. Każda minuta się liczy.
>
> I pacjenci na ECMO w CSK - 3 minuty. To wszystko."

*Cisza przez 5 sekund*

*Iwona Krawczyk:* "Zrobimy wszystko co w naszej mocy. Obiecuję."

---

## 18:32 - Iwona Krawczyk (zamknięcie)

> "OK. Mamy plan.
>
> [Twoje imię] - zacznij od razu. Folder `chaos/` - tam wszystko. Przeanalizuj, zdecyduj, działaj.
>
> Tomasz, mjr Mazur, dr Lewandowski - wspieracie.
>
> Raport za 30 minut. O 19:00 chcę wiedzieć:
> - TOP 10 podstacji (ranking)
> - Plan koordynacji (ekipy, generatory, timeline)
> - Komunikaty (media, SMS)
>
> Idziemy. Czas leci."

---

## 18:35 - KONIEC POSIEDZENIA

**Akcja:** Wszyscy wychodzą. Ty zostajesz z laptopem i folderem `chaos/`.

**Twoje myśli:**
- 3h 25min do końca paliwa w szpitalach
- 2 noworodki, 6 pacjentów na ECMO, 67 na respiratorach
- 47 podstacji, 11 ekip, 23 generatory
- PS-08 (logika-bomba) zasila CSK (ECMO)
- Każda decyzja ma konsekwencje

**Zaczynasz.**

---

*Koniec notatki*

---

**ZAŁĄCZNIKI:**
- Raport techniczny Tomasz Nowak: `chaos/podstacje/raporty-podstacji.csv`
- Raport medyczny dr Lewandowski: `chaos/szpitale/zgłoszenia-szpitali.json`
- Komunikat DarkGrid: `chaos/hakerzy/komunikat-hakerzy.txt`
- Lokalizacje ekip: `chaos/ekipy/lokalizacje-ekip.txt`
- Generatory: `chaos/ekipy/sprzet-dostepny.md`
