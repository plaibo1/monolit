"use client"

import { useState, useEffect, useCallback, useRef } from "react"

type SpeechRecognitionResult = {
  transcript: string
  isFinal: boolean
}

type UseSpeechRecognitionReturn = {
  isListening: boolean
  isSupported: boolean
  transcript: string
  startListening: () => void
  stopListening: () => void
  resetTranscript: () => void
  error: string | null
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if browser supports Speech Recognition API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      setIsSupported(false)
      setError("Your browser doesn't support speech recognition")
      return
    }

    setIsSupported(true)

    // Initialize speech recognition
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "ru-RU" // Russian language, можно изменить на другой язык

    recognition.onresult = (event: any) => {
      let finalTranscript = ""
      let interimTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece + " "
        } else {
          interimTranscript += transcriptPiece
        }
      }

      setTranscript((prev) => prev + finalTranscript + interimTranscript)
    }

    recognition.onerror = (event: any) => {
      console.error("[v0] Speech recognition error:", event.error)
      setError(`Speech recognition error: ${event.error}`)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = useCallback(() => {
    if (!recognitionRef.current || !isSupported) {
      return
    }

    setError(null)
    setTranscript("")

    try {
      recognitionRef.current.start()
      setIsListening(true)
    } catch (err: any) {
      console.error("[v0] Error starting speech recognition:", err)
      setError("Failed to start speech recognition")
    }
  }, [isSupported])

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) {
      return
    }

    try {
      recognitionRef.current.stop()
      setIsListening(false)
    } catch (err: any) {
      console.error("[v0] Error stopping speech recognition:", err)
    }
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript("")
  }, [])

  return {
    isListening,
    isSupported,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    error,
  }
}
