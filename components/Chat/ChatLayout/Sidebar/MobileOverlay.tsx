"use client";

type MobileOverlayProps = {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

export function MobileOverlay({
  isCollapsed,
  onToggleCollapse,
}: MobileOverlayProps) {
  if (isCollapsed) return null;

  return (
    <div
      className="fixed inset-0 bg-black/5 z-30 md:hidden backdrop-blur-xs transition-opacity"
      onClick={onToggleCollapse}
    />
  );
}
