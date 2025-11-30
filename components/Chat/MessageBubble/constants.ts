export const COPY_TIMEOUT = 2000;

export const ANIMATION_CLASSES =
  "animate-in fade-in slide-in-from-bottom-2 duration-300";

export const BASE_BUBBLE_CLASSES = "px-4 py-3 rounded-2xl";

export const BUBBLE_VARIANTS = {
  user: "bg-primary text-primary-foreground",
  unknown:
    "bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900",
  error: "bg-destructive/10 text-destructive border border-destructive/20",
  agent: "text-foreground",
} as const;
