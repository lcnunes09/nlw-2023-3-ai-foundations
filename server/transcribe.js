import { pipeline } from '@xenova/transformers'

import { transcriptionExample } from './utils/transcription.js'

export async function transcribe(audio) {
    try {
        console.log('Transcribing started...')
        const transcribe = await pipeline(
            "automatic-speech-recognition", 
            "Xenova/whisper-small"
        )

        const transcription = await transcribe(audio, {
            chunk_length_s: 30,
            stride_length_s: 5,
            task: "transcribe",
        })

        console.log('Transcribing finished.')

        return transcription?.text.replace("[Music]", "")
    } catch (error) {
        throw new Error(error)
    }
}