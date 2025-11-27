export const LiquidGlassIframe = ({
  children,
  className = "",
  glassReflection,
}: {
  children: React.ReactNode;
  className?: string;
  glassReflection?: boolean;
}) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <style>{`
        @keyframes liquidMove {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(10%, 10%) rotate(5deg);
          }
          50% {
            transform: translate(-5%, 15%) rotate(-3deg);
          }
          75% {
            transform: translate(-10%, 5%) rotate(3deg);
          }
        }

        .liquid-glass-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px 0 rgba(31, 38, 135, 0.37),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
            inset 0 -1px 0 0 rgba(255, 255, 255, 0.1);
          padding: 5px;
          overflow: hidden;
        }

        .liquid-glass-wrapper::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle at 30% 50%,
            rgba(255, 255, 255, 0.2) 0%,
            transparent 50%
          );
          animation: liquidMove 8s ease-in-out infinite;
          pointer-events: none;
        }

        .liquid-glass-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          border-radius: 24px;
          pointer-events: none;
        }

        .iframe-container {
          position: relative;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            inset 0 2px 10px rgba(0, 0, 0, 0.1),
            0 4px 15px rgba(0, 0, 0, 0.2);
          z-index: 1;
        }

        .iframe-container iframe {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 16px;
        }

        .glass-reflection {
          position: absolute;
          top: 8px;
          left: 8px;
          right: 8px;
          height: 150px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 100%
          );
          border-radius: 16px 16px 0 0;
          pointer-events: none;
          z-index: 2;
        }
      `}</style>

      <div className="liquid-glass-wrapper">
        {glassReflection && <div className="glass-reflection"></div>}
        <div className="iframe-container">{children}</div>
      </div>
    </div>
  );
};
