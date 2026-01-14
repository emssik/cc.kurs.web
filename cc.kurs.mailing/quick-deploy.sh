#!/bin/bash

# Szybki deploy obrazków bez potwierdzenia
# Użyj: ./quick-deploy.sh

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
IMAGES_DIR="$SCRIPT_DIR/images"
SITE_ID="d5cad031-5df5-441a-a8ad-30dcc5759bb2"

# Utwórz tymczasowy katalog poza projektem (żeby uniknąć znalezienia netlify.toml)
TEMP_DIR=$(mktemp -d)

echo "🚀 Deployowanie obrazków na Netlify..."

# Skopiuj pliki do katalogu tymczasowego
cp -R "$IMAGES_DIR"/* "$TEMP_DIR/"

# Przejdź do katalogu tymczasowego i wykonaj deploy
cd "$TEMP_DIR"

netlify deploy \
    --dir="." \
    --site="$SITE_ID" \
    --prod

# Usuń katalog tymczasowy
rm -rf "$TEMP_DIR"

echo "✅ Gotowe! https://images.danielroziecki.com/"
