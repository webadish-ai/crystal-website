"""
Fix mojibake across all TSX/TS/Astro/CSS source files.

Mojibake = UTF-8 bytes misread as Windows-1252, then re-saved as UTF-8.
To fix: for each run of mojibake chars, encode back to Latin-1 bytes,
then decode as UTF-8 to recover the original character.

We patch known sequences using their original UTF-8 byte values so this
script itself contains no ambiguous mojibake literals.
"""

import os, glob

def make_pair(original_bytes: bytes):
    """Given the original UTF-8 bytes, return (mojibake_str, correct_str)."""
    # Decode original bytes as UTF-8 -> get correct char(s)
    correct = original_bytes.decode('utf-8')
    # Re-encode each byte as Windows-1252 char to get the mojibake string
    mojibake = original_bytes.decode('cp1252')
    return mojibake, correct

# (original UTF-8 bytes of the intended character)
PAIRS = [
    make_pair(b'\xc2\xb0'),   # °  degree sign
    make_pair(b'\xc2\xb7'),   # ·  middle dot
    make_pair(b'\xc2\xb3'),   # ³  superscript 3
    make_pair(b'\xc2\xae'),   # ®  registered trademark
    make_pair(b'\xe2\x88\x92'),  # −  minus sign U+2212
    make_pair(b'\xe2\x80\x93'),  # –  en dash U+2013
    make_pair(b'\xe2\x80\x94'),  # —  em dash U+2014
    make_pair(b'\xe2\x86\x92'),  # →  right arrow U+2192
    make_pair(b'\xc3\x97'),      # ×  multiplication sign U+00D7
    make_pair(b'\xe2\x94\x80'),  # ─  box drawing horizontal U+2500
]

base = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'src')

fixed_files = []
for pat in ['**/*.tsx', '**/*.ts', '**/*.astro', '**/*.css']:
    for fp in glob.glob(os.path.join(base, pat), recursive=True):
        try:
            with open(fp, 'r', encoding='utf-8') as f:
                original = f.read()
        except Exception:
            continue
        content = original
        for mojibake, correct in PAIRS:
            content = content.replace(mojibake, correct)
        if content != original:
            with open(fp, 'w', encoding='utf-8') as f:
                f.write(content)
            fixed_files.append(os.path.relpath(fp, os.path.join(base, '..')))

if fixed_files:
    print(f'Fixed {len(fixed_files)} files:')
    for f in fixed_files:
        print(f'  {f}')
else:
    print('No mojibake found.')
