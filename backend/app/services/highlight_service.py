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

    threshold = (
        np.mean(rms)
        + np.std(rms)
    )

    highlights = []

    for i, energy in enumerate(rms):

        if energy > threshold:

            timestamp = (
                i * 512
            ) / sr

            highlights.append(
                round(
                    timestamp,
                    2
                )
            )

    return highlights[:10]