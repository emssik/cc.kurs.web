#!/usr/bin/env python3
"""Check for missing file references in m01 scenario content."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Where to scan for references
SCAN_PATHS = [
    ROOT / "README.md",
    ROOT / "kontekst",
    ROOT / ".claude" / "commands",
]

# Simple patterns for refs
AT_REF_RE = re.compile(r"@([\\w./-]+)")
CODE_REF_RE = re.compile(r"`([^`]+)`")

# Known prefixes for in-project paths
KNOWN_PREFIXES = (
    "chaos/",
    "kontekst/",
    "output/",
    "szablony/",
    ".claude/",
    "scripts/",
)

# File extensions we care about
KNOWN_EXTS = (
    ".md",
    ".txt",
    ".json",
    ".csv",
    ".html",
)

TRAILING_PUNCT = ").,;:>" 
LEADING_PUNCT = "(<" 


def iter_files() -> list[Path]:
    files: list[Path] = []
    for base in SCAN_PATHS:
        if base.is_dir():
            files.extend(sorted(p for p in base.rglob("*") if p.is_file()))
        elif base.is_file():
            files.append(base)
    return files


def clean_ref(ref: str) -> str:
    ref = ref.strip()
    while ref and ref[-1] in TRAILING_PUNCT:
        ref = ref[:-1]
    while ref and ref[0] in LEADING_PUNCT:
        ref = ref[1:]
    return ref


def is_probable_path(ref: str) -> bool:
    if not ref:
        return False
    if ref.startswith("/start-"):
        return False
    if "*" in ref:
        return False
    if ref.startswith("http://") or ref.startswith("https://"):
        return False
    if ref.startswith("kcze.gov.pl/"):
        return False
    if ref.startswith(KNOWN_PREFIXES):
        return True
    if any(ref.endswith(ext) for ext in KNOWN_EXTS):
        return True
    return False


def main() -> int:
    missing: list[str] = []
    output_missing: list[str] = []
    checked: set[str] = set()

    for path in iter_files():
        text = path.read_text(errors="ignore")
        refs = []
        refs.extend(AT_REF_RE.findall(text))
        refs.extend(CODE_REF_RE.findall(text))
        for raw in refs:
            ref = clean_ref(raw)
            if not is_probable_path(ref):
                continue
            if ref in checked:
                continue
            checked.add(ref)
            full = ROOT / ref
            if ref.startswith("output/"):
                if not full.exists():
                    output_missing.append(ref)
                continue
            if not full.exists():
                missing.append(ref)

    if missing:
        print("Missing required files:")
        for ref in sorted(missing):
            print(f"- {ref}")

    if output_missing:
        print("Missing output files (expected to be created by user):")
        for ref in sorted(output_missing):
            print(f"- {ref}")

    if not missing:
        print("OK: no missing required files detected.")

    return 1 if missing else 0


if __name__ == "__main__":
    raise SystemExit(main())
