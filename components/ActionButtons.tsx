"use client";

import { Button } from "@/components/ui/button";
import type { ActionButton } from "@/types/chat";
import { Sparkles } from "lucide-react";
import { useCallback, useRef, useState } from "react";

type ActionButtonsProps = {
  actions: ActionButton[];
  onActionClick: (query: string) => void;
  onActionHold?: (query: string) => void;
  holdDuration?: number; // в миллисекундах, по умолчанию 1500
};

export function ActionButtons({
  actions,
  onActionClick,
  onActionHold,
  holdDuration = 1500,
}: ActionButtonsProps) {
  const [holdingButton, setHoldingButton] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const clearTimers = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const handlePointerDown = useCallback(
    (action: ActionButton) => {
      setHoldingButton(action.id);
      setProgress(0);
      startTimeRef.current = Date.now();

      // Обновляем прогресс каждые 16ms (~60fps)
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min((elapsed / holdDuration) * 100, 100);
        setProgress(newProgress);
      }, 16);

      // Таймер для автоотправки
      holdTimerRef.current = setTimeout(() => {
        clearTimers();
        setHoldingButton(null);
        setProgress(0);

        // Вызываем onActionHold если передан, иначе onActionClick
        if (onActionHold) {
          onActionHold(action.query);
        } else {
          onActionClick(action.query);
        }
      }, holdDuration);
    },
    [holdDuration, onActionClick, onActionHold, clearTimers]
  );

  const handlePointerUp = useCallback(
    (action: ActionButton) => {
      if (holdingButton === action.id) {
        clearTimers();

        // Если прогресс меньше 10% - считаем быстрым кликом и вставляем текст
        // Если больше 10% - пользователь начал холд и передумал, ничего не делаем
        if (progress < 10) {
          onActionClick(action.query);
        }

        setHoldingButton(null);
        setProgress(0);
      }
    },
    [holdingButton, progress, onActionClick, clearTimers]
  );

  const handlePointerLeave = useCallback(() => {
    clearTimers();
    setHoldingButton(null);
    setProgress(0);
  }, [clearTimers]);

  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {actions.map((action) => {
        const isHolding = holdingButton === action.id;

        return (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onPointerDown={() => handlePointerDown(action)}
            onPointerUp={() => handlePointerUp(action)}
            onPointerLeave={handlePointerLeave}
            className={`text-xs h-auto py-2 px-3 gap-2 active:scale-95 relative overflow-hidden touch-none select-none transition-all duration-200 ${
              isHolding && progress > 5 ? "pr-4" : ""
            }`}
            title={action.tooltip}
            style={{
              // Предотвращаем выделение текста при длительном нажатии
              userSelect: "none",
              WebkitUserSelect: "none",
              touchAction: "none",
            }}
          >
            {/* Прогресс-бар на фоне */}
            {isHolding && (
              <div
                className={
                  "absolute inset-0 transition-all bg-amber-100 dark:bg-blue-500"
                }
                style={{
                  width: `${isHolding && progress > 5 ? progress : 0}%`,
                  transition: "none",
                }}
              />
            )}

            {/* Контент кнопки */}
            <Sparkles className="w-3 h-3 relative z-10" />
            <span className="relative z-10">{action.label}</span>

            {/* Круговой индикатор холда - справа от текста */}
            <div
              className={`relative z-10 ml-1 shrink-0 transition-all duration-200 ease-in-out ${
                isHolding && progress > 5 ? "opacity-100 w-4" : "opacity-0 w-0"
              }`}
              style={{
                minWidth: isHolding && progress > 5 ? "1rem" : "0",
                transition:
                  "opacity 200ms ease-in-out, width 200ms ease-in-out, min-width 200ms ease-in-out",
              }}
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                style={{ display: "block" }}
              >
                {/* Обводка прогресса - зеленеющая, толстая */}
                <circle
                  cx="12"
                  cy="12"
                  r="8"
                  fill="none"
                  stroke={`hsl(${120 * (progress / 100)}, 70%, 45%)`}
                  strokeWidth="8"
                  strokeDasharray={`${(progress / 100) * 50.27} 50.27`}
                  strokeLinecap="round"
                  transform="rotate(-90 12 12)"
                  style={{ transition: "none" }}
                />
              </svg>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
