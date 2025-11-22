"use client"

import { useState, useCallback } from "react"
import type { ExecutionStep } from "@/types/chat"

export function useChatSteps() {
  const [steps, setSteps] = useState<Map<string, ExecutionStep>>(new Map())
  const [stepOrder, setStepOrder] = useState<string[]>([])

  const addStep = useCallback((step: ExecutionStep) => {
    setSteps((prev) => {
      const newMap = new Map(prev)
      newMap.set(step.id, step)
      return newMap
    })
    setStepOrder((prev) => [...prev, step.id])
  }, [])

  const updateStep = useCallback((id: string, updates: Partial<ExecutionStep>) => {
    setSteps((prev) => {
      const newMap = new Map(prev)
      const existing = newMap.get(id)
      if (existing) {
        newMap.set(id, { ...existing, ...updates })
      }
      return newMap
    })
  }, [])

  const clearSteps = useCallback(() => {
    setSteps(new Map())
    setStepOrder([])
  }, [])

  const getOrderedSteps = useCallback((): ExecutionStep[] => {
    return stepOrder.map((id) => steps.get(id)).filter(Boolean) as ExecutionStep[]
  }, [steps, stepOrder])

  return {
    steps,
    stepOrder,
    addStep,
    updateStep,
    clearSteps,
    getOrderedSteps,
  }
}
