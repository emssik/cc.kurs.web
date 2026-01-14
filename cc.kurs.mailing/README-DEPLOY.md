# Deploy obrazków na Netlify

Prosty system do wrzucania obrazków na Netlify dla projektu `d5cad031-5df5-441a-a8ad-30dcc5759bb2`.

## Pierwsze uruchomienie

Jeśli jeszcze nie jesteś zalogowany do Netlify CLI, wykonaj:

```bash
netlify login
```

To otworzy przeglądarkę i pozwoli Ci zalogować się do Netlify.

## Użycie

### Opcja 1: Z potwierdzeniem (zalecane)

```bash
./deploy-images.sh
```

Skrypt:
- Pokaże listę plików do wrzucenia
- Zapyta o potwierdzenie
- Wykona deploy na production

### Opcja 2: Szybki deploy (bez potwierdzenia)

```bash
./quick-deploy.sh
```

Natychmiast wrzuca wszystkie obrazki z katalogu `images/` na Netlify.

## Workflow

1. Dodaj nowe obrazki do katalogu `images/`
2. Uruchom `./deploy-images.sh` lub `./quick-deploy.sh`
3. Poczekaj na zakończenie deployu
4. Twoje obrazki są dostępne pod: `https://images.danielroziecki.com/nazwa-obrazka.jpg`

## Przykładowe URLe

Dla pliku `images/001.we.become.png`, URL będzie:
```
https://images.danielroziecki.com/001.we.become.png
```

## Draft deploy (testowy)

Jeśli chcesz najpierw przetestować deploy, możesz użyć draft deploy:

```bash
netlify deploy --dir=./images --site=d5cad031-5df5-441a-a8ad-30dcc5759bb2
```

To da Ci tymczasowy URL do sprawdzenia przed wrzuceniem na production.

## Przydatne komendy

```bash
# Status Netlify
netlify status

# Lista deploy'ów
netlify deploys:list

# Otwórz dashboard w przeglądarce
netlify open
```

## Troubleshooting

### "Could not find site"

Jeśli dostaniesz błąd o braku dostępu do site, upewnij się że:
1. Jesteś zalogowany: `netlify login`
2. Masz dostęp do projektu `d5cad031-5df5-441a-a8ad-30dcc5759bb2` na swoim koncie Netlify

### Autoryzacja tokenu

Jeśli będziesz potrzebować access token, możesz go znaleźć w:
Netlify Dashboard → User Settings → Applications → Personal access tokens
