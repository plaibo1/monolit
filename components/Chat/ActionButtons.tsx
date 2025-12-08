"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
  const startPositionRef = useRef<{ x: number; y: number } | null>(null);

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
    (action: ActionButton, e: React.PointerEvent) => {
      setHoldingButton(action.id);
      setProgress(0);
      startTimeRef.current = Date.now();
      startPositionRef.current = { x: e.clientX, y: e.clientY };

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
    (action: ActionButton, e: React.PointerEvent) => {
      if (holdingButton === action.id) {
        clearTimers();

        // Проверяем, было ли движение (свайп)
        const SWIPE_THRESHOLD = 10; // пикселей
        let isSwipe = false;

        if (startPositionRef.current) {
          const deltaX = Math.abs(e.clientX - startPositionRef.current.x);
          const deltaY = Math.abs(e.clientY - startPositionRef.current.y);
          isSwipe = deltaX > SWIPE_THRESHOLD || deltaY > SWIPE_THRESHOLD;
        }

        // Если прогресс меньше 10% И не было свайпа - считаем быстрым кликом и вставляем текст
        // Если больше 10% - пользователь начал холд и передумал, ничего не делаем
        // Если был свайп - тоже ничего не делаем
        if (progress < 10 && !isSwipe) {
          onActionClick(action.query);
        }

        setHoldingButton(null);
        setProgress(0);
        startPositionRef.current = null;
      }
    },
    [holdingButton, progress, onActionClick, clearTimers]
  );

  const handlePointerLeave = useCallback(() => {
    clearTimers();
    setHoldingButton(null);
    setProgress(0);
    startPositionRef.current = null;
  }, [clearTimers]);

  if (actions.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3 mb-12 w-full">
      {actions.map((action) => {
        const isHolding = holdingButton === action.id;

        return (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onPointerDown={(e) => handlePointerDown(action, e)}
            onPointerUp={(e) => handlePointerUp(action, e)}
            onPointerLeave={handlePointerLeave}
            className={cn(
              `text-xs h-auto py-2 px-3 gap-2 relative touch-none select-none transition-all duration-200 overflow-hidden`,
              `max-w-full sm:max-w-[calc(50%-0.25rem)] md:max-w-fit`,
              `shrink grow-0 basis-auto`
            )}
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
                  "absolute inset-0 dark:bg-zinc-800 bg-zinc-200/50 transition-all ease-linear"
                }
                style={{
                  width: `${isHolding && progress > 5 ? progress : 0}%`,
                  transition: "none",
                }}
              />
            )}

            {/* Контент кнопки */}
            <Sparkles className="w-3 h-3 relative z-10 shrink-0" />

            <span className="z-10 truncate">
              {action.label.startsWith("💡")
                ? action.label.replace("💡", "")
                : action.label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
