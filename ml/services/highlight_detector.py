import librosa
import numpy as np


def detect_highlights(audio_path):
    y, sr = librosa.load(
        audio_path,
        sr=None
    )

    rms = librosa.feature.rms(
        y=y
    )[0]

    threshold = np.mean(rms) + np.std(rms)

    highlights = []

    for i, energy in enumerate(rms):

        if energy > threshold:

            start_time = (
                i * 512
            ) / sr

            highlights.append(
                {
                    "time": round(
                        start_time,
                        2
                    ),
                    "energy": round(
                        float(energy),
                        4
                    )
                }
            )

    return highlights
