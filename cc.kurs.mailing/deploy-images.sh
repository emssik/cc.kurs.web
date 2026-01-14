#!/bin/bash

# Skrypt do deployowania obrazków na Netlify
# Projekt: papaya-daifuku-3dd558

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
IMAGES_DIR="$SCRIPT_DIR/images"
SITE_ID="d5cad031-5df5-441a-a8ad-30dcc5759bb2"

echo "🖼️  Deploy obrazków na Netlify"
echo "================================"
echo ""

# Sprawdź czy katalog images istnieje
if [ ! -d "$IMAGES_DIR" ]; then
    echo "❌ Błąd: Katalog $IMAGES_DIR nie istnieje"
    exit 1
fi

# Sprawdź czy są jakieś pliki w katalogu
if [ -z "$(ls -A $IMAGES_DIR)" ]; then
    echo "❌ Błąd: Katalog images jest pusty"
    exit 1
fi

# Wyświetl listę plików do uploadu
echo "📋 Pliki do wrzucenia:"
ls -lh "$IMAGES_DIR" | grep -v "^d" | awk '{print "   - " $9 " (" $5 ")"}'
echo ""

# Zapytaj o potwierdzenie
read -p "Czy chcesz wrzucić te pliki na Netlify? (t/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[TtYy]$ ]]; then
    echo "Anulowano."
    exit 0
fi

echo ""
echo "🚀 Deployowanie na Netlify..."
echo ""

# Utwórz tymczasowy katalog poza projektem (żeby uniknąć znalezienia netlify.toml)
TEMP_DIR=$(mktemp -d)

# Skopiuj pliki do katalogu tymczasowego
cp -R "$IMAGES_DIR"/* "$TEMP_DIR/"

# Przejdź do katalogu tymczasowego i wykonaj deploy
cd "$TEMP_DIR"

# Deploy do Netlify (production)
netlify deploy \
    --dir="." \
    --site="$SITE_ID" \
    --prod

# Usuń katalog tymczasowy
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Deploy zakończony!"
echo "🌐 Twoje obrazki są dostępne pod: https://images.danielroziecki.com/"
