export function MessageSkeleton() {
  return (
    <div className="space-y-3 py-1 min-w-full sm:min-w-[450px] md:min-w-[600px] max-w-full">
      {/* Wave animation with dots */}
      <div className="flex items-center gap-1.5 mb-4">
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
      </div>

      {/* Animated gradient bars with varying lengths */}
      <div className="space-y-2.5">
        <div className="h-3.5 bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 rounded-md w-[85%] animate-shimmer bg-[length:200%_100%]"></div>
        <div className="h-3.5 bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 rounded-md w-full animate-shimmer bg-[length:200%_100%] [animation-delay:0.2s]"></div>
        <div className="h-3.5 bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 rounded-md w-[70%] animate-shimmer bg-[length:200%_100%] [animation-delay:0.4s]"></div>
        <div className="h-3.5 bg-gradient-to-r from-muted-foreground/10 via-muted-foreground/20 to-muted-foreground/10 rounded-md w-[90%] animate-shimmer bg-[length:200%_100%] [animation-delay:0.6s]"></div>
      </div>

      {/* Pulsing indicator */}
      <div className="flex items-center gap-2 mt-4 animate-pulse">
        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full"></div>
        <span className="text-xs text-muted-foreground/60">AI is thinking</span>
      </div>
    </div>
  );
}
