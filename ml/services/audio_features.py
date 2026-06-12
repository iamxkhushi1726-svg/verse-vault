import librosa
import numpy as np


def extract_features(audio_path):
    y, sr = librosa.load(
        audio_path,
        sr=None
    )

    mfcc = librosa.feature.mfcc(
        y=y,
        sr=sr,
        n_mfcc=13
    )

    chroma = librosa.feature.chroma_stft(
        y=y,
        sr=sr
    )

    spectral_centroid = (
        librosa.feature.spectral_centroid(
            y=y,
            sr=sr
        )
    )

    tempo, beats = librosa.beat.beat_track(
        y=y,
        sr=sr
    )

    tempo = np.asarray(tempo).item()

    return {
        "mfcc_mean": float(
            np.mean(mfcc)
        ),
        "chroma_mean": float(
            np.mean(chroma)
        ),
        "spectral_mean": float(
            np.mean(spectral_centroid)
        ),
        "tempo": tempo
    }