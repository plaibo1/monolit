export const DEBUG_EVENT_KEY = "toggle-chat-debugger";

export const dispatchChatDebuggerEvent = () => {
  const event = new CustomEvent(DEBUG_EVENT_KEY);
  window.dispatchEvent(event);
};

export const isKonamiCodeString = (code: string) => {
  return code.toLowerCase() === "up up down down left right left right b a";
};

export const isHesoyamCodeString = (code: string) => {
  return code.toLowerCase() === "hesoyam";
};
