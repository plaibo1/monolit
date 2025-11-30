import { ActionButtons as ActionButtonsComponent } from "../../ActionButtons";
import type { ActionButton } from "@/types/chat";

type MessageActionsProps = {
  actions?: ActionButton[];
  onActionClick: (query: string) => void;
  onActionHold?: (query: string) => void;
};

export function MessageActions({
  actions,
  onActionClick,
  onActionHold,
}: MessageActionsProps) {
  if (!actions || actions.length === 0) return null;

  return (
    <ActionButtonsComponent
      actions={actions}
      onActionClick={onActionClick}
      onActionHold={onActionHold}
    />
  );
}
