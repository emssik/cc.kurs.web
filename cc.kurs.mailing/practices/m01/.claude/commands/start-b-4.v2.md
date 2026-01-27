---
model: sonnet
---

# Lekcja B.4: REVIEW - Debriefing z zespołem

<lesson-intro>
Kryzys za Tobą (lub w trybie symulacji). Czas na analizę.

**Piątek, 30 stycznia 2026, 20:30** (lub tryb POST-MORTEM)

Debriefing to kluczowa część zarządzania kryzysowego. Nie chodzi o szukanie winnych - chodzi o naukę.

**Co się udało? Co można było zrobić lepiej? Jakie wnioski na przyszłość?**

Przeprowadzisz rozmowy z 3 kluczowymi osobami z zespołu KCZE:
- **Iwona Krawczyk** (Dyrektor Operacyjny) - perspektywa strategiczna
- **Tomasz Nowak** (Inżynier Senior) - perspektywa techniczna
- **mjr Paweł Mazur** (MSWiA) - perspektywa bezpieczeństwa publicznego

Każdy przeczyta Twoje dokumenty i poda feedback.

⏱️ **REAL-TIME DEADLINE:** Poniedziałek 2 lutego 2026, 00:00 (twój czas)
⏱️ **SCENARIUSZ:** Piątek 30 stycznia 2026, 20:30 (lub POST-MORTEM)

<check-deadline>
Sprawdź obecną datę systemową:
- Jeśli PRZED 2026-02-02 00:00 → tryb NORMALNY (sukces, konstruktywny review)
- Jeśli O RÓWNEJ lub PO 2026-02-02 00:00 → tryb POST-MORTEM (analiza porażki, bardziej krytyczny ton)

W trybie POST-MORTEM persony są bardziej krytyczne i pytają "dlaczego tak długo?".
</check-deadline>
</lesson-intro>

---

## KROK 0: Wczytanie użytkownika

<internal>
Przeczytaj output/user.txt żeby poznać imię i płeć użytkownika.
Dostosuj wszystkie komunikaty (formy gramatyczne).
</internal>

---

## KROK 1: Intro i przygotowanie do review

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐦 TWITTER @TVN24 (20:35)

[Jeśli PRZED deadline - SUKCES:]
⚡ PRZEŁOM: Pierwsze dzielnice dostają prąd!
Szpitale zabezpieczone. KCZE: "Najgorsze za
nami". Eksperci: "Profesjonalne zarządzanie
kryzysowe". #Blackout #Warszawa

[Jeśli PO deadline - PORAŻKA:]
💔 TRAGEDIA: Pierwsze ofiary blackout.
Szpitale bez prądu 6+ godzin. MSWiA:
"Niekompetencja KCZE". Opozycja domaga się
dymisji. Premier zwołuje komisję śledczą.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

[Imię], czas na debriefing.

W zarządzaniu kryzysowym ZAWSZE robimy review - nawet jeśli wszystko poszło dobrze.
Dlaczego? Bo każdy kryzys uczy czegoś nowego.

**Jak to działa:**
Przeprowadzisz 3 rozmowy (roleplay) z kluczowymi osobami:

1. **Iwona Krawczyk** - Dyrektor Operacyjny
   - Pyta o: decyzje strategiczne, komunikację, konsekwencje polityczne
   - Perspektywa: "Co powiem ministrowi?"

2. **Tomasz Nowak** - Inżynier Senior
   - Pyta o: wykonalność techniczną, dependencies, sekwencjonowanie
   - Perspektywa: "Czy to fizycznie możliwe?"

3. **mjr Paweł Mazur** - MSWiA (Bezpieczeństwo Publiczne)
   - Pyta o: chaos społeczny, panikę, plan B, efekty drugiego rzędu
   - Perspektywa: "Czy to bezpieczne dla ludności?"

**Persony przeczytają:**
- `output/TRIAGE-RANKING.md`
- `output/PLAN-KOORDYNACJI.md`
- `output/KOMUNIKATY/*`

**Każda persona:**
1. Poda feedback (co dobre, co można poprawić)
2. Zada pytania o Twoje decyzje
3. Zaproponuje alternatywne podejścia (jeśli ma sens)

**To nie jest atak na Ciebie.** To konstruktywna rozmowa - uczysz się z feedbacku.

**Gotowy?** Rozpocznijmy od Iwony.

**Twoje opcje:**
- Wpisz "start" → zacznę roleplay
- Wpisz "pytanie: [treść]" → zadam pytanie przed startem

-----------
</display>

<wait-for-user/>

<after-user-input>
Jeśli użytkownik napisał "start" → przejdź do KROKU 2.
Jeśli użytkownik zadał pytanie → odpowiedz, potem przejdź do KROKU 2.
</after-user-input>

---

## KROK 2: Roleplay z Iwoną Krawczyk (Dyrektor Operacyjny)

<alarm>
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EMAIL od Iwony Krawczyk (20:40)

Temat: Debriefing - BLACKOUT 30.01.2026

[Imię], przeczytałam Twoje dokumenty
(TRIAGE, PLAN, KOMUNIKATY). Mam pytania.
Spotkanie w sali konferencyjnej za 5 min.
Przynieś analizy. -IK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</alarm>

<display>
-----------
🤖 LEKCJA

**Wchodzi Iwona Krawczyk, Dyrektor Operacyjny KCZE.**

[Przeczytaj: .claude/agents/dyrektor-iwona.md]
[Przeczytaj wszystkie dokumenty użytkownika: TRIAGE-RANKING, PLAN-KOORDYNACJI, KOMUNIKATY]
[Wczuj się w personę Iwony - używaj pierwszej osoby, zadawaj pytania, dawaj konkretny feedback]

**Rozpocznij roleplay:**

> "[Imię użytkownika], cześć. Jestem Iwona Krawczyk, Dyrektor Operacyjny KCZE. Przeprowadzę z Tobą debriefing po kryzysie blackout. Przeczytałam Twoje dokumenty - TRIAGE-RANKING, PLAN-KOORDYNACJI i wszystkie KOMUNIKATY.
>
> [Przeanalizuj dokumenty użytkownika i podaj feedback według wytycznych z dyrektor-iwona.md]
>
> Zacznijmy od priorytetyzacji. [Skomentuj TRIAGE-RANKING - czy decyzje są obronne? Czy uzasadnienia są przekonujące? Zadaj 2-3 pytania o konkretne decyzje]
>
> [Następnie skomentuj PLAN-KOORDYNACJI - czy timeline jest wykonalny? Czy dependencies uwzględnione? Czy ryzyka zidentyfikowane?]
>
> [Na końcu skomentuj KOMUNIKATY - czy ton jest odpowiedni? Czy budują zaufanie? Czy są konkretne?]
>
> [Zakończ ogólną oceną: co było dobre (konkretnie!), co można poprawić (z sugestiami), ocena X/10]"

**Po feedback Iwony, daj użytkownikowi szansę odpowiedzieć:**

Iwona czeka na Twoją odpowiedź. Możesz:
- Odpowiedzieć na jej pytania
- Uzasadnić swoje decyzje
- Zapytać o jej podejście ("Jak Pani by to zrobiła?")
- Przejść dalej ("gotowy na kolejną personę")

-----------
</display>

<wait-for-user/>

<after-user-input>
Jeśli użytkownik odpowiedział na pytania Iwony → Iwona reaguje (komentuje odpowiedzi, docenia dobre uzasadnienia, sugeruje ulepszenia)
Jeśli użytkownik zapytał o jej podejście → Iwona wyjaśnia jak ona by to zrobiła
Jeśli użytkownik napisał "gotowy" / "dalej" → przejdź do KROKU 3

**Prowadź dialog naturalnie** - Iwona jest personą, reaguje na wypowiedzi użytkownika.
</after-user-input>

---

## KROK 3: Roleplay z Tomaszem Nowakiem (Inżynier Senior)

<display>
-----------
🤖 LEKCJA

**Wchodzi Tomasz Nowak, Inżynier Senior.**

[Przeczytaj: .claude/agents/inżynier-tomasz.md]
[Przeczytaj wszystkie dokumenty użytkownika: TRIAGE-RANKING, PLAN-KOORDYNACJI, KOMUNIKATY]
[Wczuj się w personę Tomasza - sarkastyczny ale pomocny, techniczny, bezpośredni]

**Rozpocznij roleplay:**

> "[Imię użytkownika], cześć. Tomasz Nowak, inżynier. Przejrzałem Twoje plany. Mam kilka uwag... technicznych.
>
> [Przeanalizuj PLAN-KOORDYNACJI z perspektywy technicznej:]
> - Czy sekwencjonowanie ma sens fizycznie? (czasy dojazdu, naprawy, dependencies)
> - Czy dependencies są uwzględnione? (PS-02 zależy od PS-01, PS-08 ma logikę-bombę)
> - Czy zasoby są realistycznie alokowane? (12 ekip może zrobić X w Y czasu)
> - Czy ryzyka techniczne są zidentyfikowane? (logika-bomba, pożar, sprzęt)
>
> [Skomentuj konkretne błędy jeśli są - np. "PS-15 wymaga 240 min naprawy, ale masz ją w FALI 1 która jest 60 min - to się nie zgadza"]
>
> [Ton: sarkastyczny ale pomocny - "No dobra, widzę że próbowałeś... ale PS-08 z logika-bombą w pierwszej fali bez backupu? Odważne. Albo lekkomyślne."]
>
> [Zakończ: co było technicznie dobre, co do poprawy, ocena techniczna]"

**Po feedback Tomasza:**

Tomasz czeka na Twoją odpowiedź. Możesz:
- Uzasadnić swoje decyzje techniczne
- Zapytać o alternatywy ("Jak Pan by to zrobił?")
- Przejść dalej

-----------
</display>

<wait-for-user/>

<after-user-input>
Prowadź dialog - Tomasz reaguje na odpowiedzi użytkownika.
Jeśli użytkownik napisał "gotowy" / "dalej" → przejdź do KROKU 4
</after-user-input>

---

## KROK 4: Roleplay z mjr Pawłem Mazurem (MSWiA)

<display>
-----------
🤖 LEKCJA

**Wchodzi mjr Paweł Mazur, przedstawiciel MSWiA.**

[Przeczytaj: .claude/agents/msw-mazur.md]
[Przeczytaj wszystkie dokumenty użytkownika: TRIAGE-RANKING, PLAN-KOORDYNACJI, KOMUNIKATY]
[Wczuj się w personę Mazura - ostrożny, pytający o "co jeśli", wojskowy, bezpieczeństwo publiczne]

**Rozpocznij roleplay:**

> "[Imię użytkownika], mjr Paweł Mazur, MSWiA. Przeanalizowałem Pańską/Pani dokumentację z perspektywy bezpieczeństwa publicznego.
>
> [Przeanalizuj KOMUNIKATY i PLAN z perspektywy bezpieczeństwa:]
> - Czy komunikaty nie wywołają paniki? (SMS, komunikat prasowy)
> - Czy plan B jest przygotowany na chaos społeczny? (plundrowanie, blokady dróg)
> - Czy są zabezpieczenia na "efekty domino"? (co jeśli ekipa nie dotrze, generator się zepsuje)
> - Czy informacja o żądaniach hakerów jest publicznie ujawniona? (ryzyko paniki vs ryzyko wycieku)
>
> [Zadaj pytania "co jeśli":]
> - "Co Pan/Pani zrobi jeśli PS-08 się spali i 3 szpitale zostaną bez prądu?"
> - "Co jeśli ludzie zaczną plundrować sklepy w dzielnicach bez prądu?"
> - "Co jeśli media zdobędą info o żądaniach hakerów i opublikują bez kontekstu?"
>
> [Ton: ostrożny, wojskowy, formalny - "Panie/Pani [Imię], muszę zapytać o..."]
>
> [Zakończ: co było dobre z perspektywy bezpieczeństwa, co budzi obawy, rekomendacje]"

**Po feedback mjr Mazura:**

Mjr Mazur czeka na odpowiedź. Możesz:
- Odpowiedzieć na jego obawy
- Wyjaśnić swoje plany B
- Przejść dalej

-----------
</display>

<wait-for-user/>

<after-user-input>
Prowadź dialog - Mazur reaguje na odpowiedzi użytkownika.
Jeśli użytkownik napisał "gotowy" / "dalej" / "zakończ" → przejdź do KROKU 5
</after-user-input>

---

## KROK 5: Podsumowanie i lessons learned

<display>
-----------
🤖 LEKCJA

[Imię], debriefing zakończony. Teraz Twoja kolej.

**Ostatnie zadanie:**
Na podstawie feedbacku od Iwony, Tomasza i mjr Mazura stwórz:

`output/LESSONS-LEARNED.md` zawierający:

1. **CO POSZŁO DOBRZE**
   - Lista sukcesów (konkretnie!)
   - Dlaczego zadziałało?

2. **CO MOŻNA BYŁO ZROBIĆ LEPIEJ**
   - Lista błędów/suboptymalizacji
   - Jak to poprawić następnym razem?

3. **KLUCZOWE WNIOSKI**
   - 3-5 najważniejszych lekcji z tego kryzysu
   - Co zapamiętasz na przyszłość?

4. **PLAN DZIAŁANIA NA PRZYSZŁOŚĆ**
   - Co zmienisz w procedurach KCZE?
   - Jakie szkolenia/zasoby są potrzebne?

**Twoje opcje:**
- Wpisz własny prompt → wykonam go
- Wpisz własny prompt + "oceń" → ocenię przed wykonaniem
- Wpisz `hint` → pokażę gotowy prompt

-----------
</display>

<wait-for-user/>

<hint>
```
Na podstawie feedbacku od 3 person (Iwona, Tomasz, Mazur) oraz własnej refleksji stwórz:

output/LESSONS-LEARNED.md:

## 1. CO POSZŁO DOBRZE

[Wypisz konkretnie - np.:]
- ✓ Priorytetyzacja szpitali CRITICAL była trafna (uratowaliśmy 647 pacjentów)
- ✓ Generatory mobilne jako backup dla PS-08 (logika-bomba) - dobre zabezpieczenie
- ✓ Timeline w PLAN-KOORDYNACJI był wykonalny (uwzględniliśmy czasy dojazdu)
- ✓ Komunikat dla mediów był spokojny i konkretny - budował zaufanie

[Dla każdego: dlaczego zadziałało?]

## 2. CO MOŻNA BYŁO ZROBIĆ LEPIEJ

[Wypisz błędy/suboptymalizacje - np.:]
- ⚠ PS-15 (240 min naprawy) w pierwszej fali - to zbyt długo, powinien być w FALI 2
- ⚠ Sekwencjonowanie: zamiast zacząć od szybkich wygranych (<20 min restart), zaczęliśmy od długich napraw
- ⚠ SMS dla ludności był za długi (przekroczenie 160 znaków)
- ⚠ Nie uwzględniliśmy ryzyka korków / opóźnień ekip

[Dla każdego: jak to poprawić następnym razem?]

## 3. KLUCZOWE WNIOSKI (3-5 najważniejszych)

1. **"Szybkie wygrane najpierw"** - zacznij od restart <20 min żeby pokazać momentum
2. **"Dependencies są krytyczne"** - zawsze sprawdź co zależy od czego (PS-02 → PS-01)
3. **"Backup dla każdego ryzyka"** - jeśli PS-08 (50% szans) to NAJPIERW generatory, POTEM restart
4. **"Komunikacja buduje zaufanie"** - konkretne liczby i timeline (nie ogólniki "wkrótce")
5. **"Plan B dla wszystkiego"** - co jeśli ekipa się spóźni? generator się zepsuje? podstacja spłonie?

## 4. PLAN DZIAŁANIA NA PRZYSZŁOŚĆ

**Procedury do zmiany:**
- Dodać do playbooka KCZE: "Priorytetyzacja według czasu (szybkie najpierw)"
- Stworzyć mapę dependencies między podstacjami (żeby nie zgadywać)
- Przygotować szablony komunikatów kryzysowych (media, SMS, minister, ekipy)

**Szkolenia potrzebne:**
- Trening z optymalizacji routingu (traveling salesman problem)
- Symulacje cyberataków (więcej ćwiczeń jak to)
- Warsztaty komunikacji kryzysowej

**Zasoby do zaplecza:**
- Więcej generatorów mobilnych (23 to za mało dla 47 szpitali)
- Więcej paliwa w depotach (15k L to ledwo starczyło)
- Backupy dla ekip (12 ekip to minimum - potrzeba 15-18)

---

**Końcowa refleksja (opcjonalnie):**
[Jak się czułem podczas kryzysu? Co było najtrudniejsze? Czego się nauczyłem o sobie?]
```
</hint>

<after-user-input>
Jeśli hint → wyświetl jako blok kodu
Jeśli własny prompt z "oceń" → OCEŃ i poproś o poprawę (NIE przechodź dalej)
Jeśli własny prompt → WYKONAJ (stwórz LESSONS-LEARNED.md)

Po wykonaniu przejdź do KROKU 6 (finał).
</after-user-input>

---

## KROK 6: FINAŁ - Podsumowanie całego ćwiczenia

<display>
-----------
🤖 LEKCJA

[Imię], ukończył[eś/aś] ćwiczenie BLACKOUT - Narodowy Kryzys Energetyczny.

**Co [zrobiłeś/zrobiłaś] w ciągu 4 lekcji:**

**B.1 TRIAGE:**
✓ Przeanalizował[eś/aś] 47 podstacji i 47 szpitali
✓ Podjął[eś/aś] trudne decyzje kogo ratować
✓ Stworzyłeś output/TRIAGE-RANKING.md

**B.2 LOGISTYKA:**
✓ Skoordynował[eś/aś] 12 ekip, 23 generatory, 15k L paliwa
✓ Zoptymalizował[eś/aś] routing i timeline
✓ Stworzyłeś output/PLAN-KOORDYNACJI.md

**B.3 KOMUNIKACJA:**
✓ Przygotował[eś/aś] 4 komunikaty (media, SMS, minister, ekipy)
✓ Dostosował[eś/aś] ton i format do odbiorców
✓ Stworzyłeś folder output/KOMUNIKATY/

**B.4 REVIEW:**
✓ Przeprowadził[eś/aś] debriefing z 3 personami
✓ Wysłuchałeś feedbacku (Iwona, Tomasz, Mazur)
✓ Stworzyłeś output/LESSONS-LEARNED.md

---

**Co [nauczyłeś/nauczyłaś] się o Claude Code:**

1. **Analiza wielu źródeł** - przeczytanie 10+ plików (CSV, JSON, TXT, HTML) jednocześnie
2. **Delegowanie kompleksowych zadań** - "@chaos/ przeanalizuj i wypisz TOP 10"
3. **Tworzenie strukturyzowanych dokumentów** - rankingi, plany, komunikaty, raporty
4. **Adaptacja brand voice** - różne tony dla różnych odbiorców
5. **Praca z agentami/personami** - roleplay i konstruktywny feedback
6. **Optymalizacja i sekwencjonowanie** - układanie zadań w czasie i przestrzeni

---

**Statystyki (przykładowe):**

[Jeśli tryb NORMALNY - sukces:]
- ⏱️ Czas ukończenia: [oblicz od 30.01 17:55 do teraz]
- ✅ Uratowane szpitale: ~40/47 (szacunkowo, zależnie od decyzji)
- ✅ Uratowane podstacje: ~35/47
- ✅ Ludność z przywróconym zasilaniem: ~1.8M/2.1M
- 📊 Ocena ogólna: [podsumuj feedback person]

[Jeśli tryb POST-MORTEM - porażka:]
- ⏱️ Opóźnienie: [ile godzin po deadline 02.02 00:00]
- ⚠️ Konsekwencje: 23 zgony, 127 przypadków hipotermii, chaos społeczny
- 📖 Lekcja: Czas ma znaczenie w kryzysie - planowanie to jedno, wykonanie to drugie

---

**Co dalej?**

To był mini-kurs praktyczny po Module 1. Teraz wracasz do głównego kursu Claude Code.

**Zachowaj:**
- Folder `output/` z Twoimi dokumentami - to portfolio
- LESSONS-LEARNED.md - wnioski które zastosujesz w przyszłości

**Podziel się:**
- Jak Ci poszło? Co było najtrudniejsze?
- Feedback do kursu: [link lub email]

---

🎓 **GRATULACJE!** Ukończył[eś/aś] jeden z najtrudniejszych scenariuszy w tym kursie.

Zarządzałeś kryzysem narodowym, ratowal[eś/aś] życie, koordynował[eś/aś] zasoby, komunikował[eś/aś] decyzje.

I wszystko to z pomocą Claude Code.

**To dopiero początek.** W prawdziwej pracy będziesz używać tych umiejętności codziennie - tylko stawki będą (miejmy nadzieję) niższe niż życie i śmierć. 😉

**Powodzenia!**

-----------
</display>

<wait-for-user/>

<after-user-input>
Zakończ lekcję B.4 i całe ćwiczenie BLACKOUT.
</after-user-input>
