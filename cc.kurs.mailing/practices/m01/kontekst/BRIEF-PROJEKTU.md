# BRIEF PROJEKTU: KCZE / BLACKOUT

## Cel operacyjny
Przywrócić zasilanie do kluczowych obiektów (szpitale + infrastruktura krytyczna)
przed wyczerpaniem paliwa w generatorach szpitalnych.

## Zakres kryzysu
- 47 podstacji transformatorowych
- 47 szpitali (8 CRITICAL)
- 12 ekip technicznych
- 23 generatory mobilne
- 15,000 L paliwa w 3 depotach

## Ograniczenia
- Czas do krytycznego progu: 2h30-3h50 (zależnie od szpitala)
- Część podstacji ma zależności ("dependent_na")
- Ryzyko sabotażu (PS-08 potwierdzona logika-bomba)
- Transport w warunkach chaosu (+10-20 min do standardowych czasów)

## Najważniejsze pliki robocze
- `chaos/podstacje/raporty-podstacji.csv` (statusy, czasy napraw, ryzyka)
- `chaos/szpitale/zgłoszenia-szpitali.json` (priorytety i paliwo)
- `chaos/podstacje/mapa-infrastruktury.html` (schemat sektorów)
- `chaos/ekipy/` i `chaos/ekipy/paliwo-lokalizacje.txt` (logistyka)

## Sukces = 3 kryteria
1. Stabilne zasilanie dla TOP 10 szpitali CRITICAL
2. Maksymalna liczba ludzi z przywróconym prądem w 1. fali
3. Minimalizacja ryzykownych restartów bez backupu
