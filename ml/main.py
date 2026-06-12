from services.audio_features import (
    extract_features
)

from services.highlight_detector import (
    detect_highlights
)

audio_file = "sample.mp3"

features = extract_features(
    audio_file
)

print("\nFEATURES")
print(features)

highlights = detect_highlights(
    audio_file
)

print("\nHIGHLIGHTS")

for h in highlights[:20]:
    print(h)