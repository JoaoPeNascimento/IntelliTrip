import { useEffect, useState } from "react";
import clsx from "clsx";

interface LoadingSpinnerProps {
  visible: boolean;
  onFadeComplete?: () => void;
}

export default function LoadingSpinner({
  visible,
  onFadeComplete,
}: LoadingSpinnerProps) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!visible) {
      const timeout = setTimeout(() => {
        setShouldRender(false);
        if (onFadeComplete) onFadeComplete();
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      setShouldRender(true);
    }
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 bg-white flex items-center justify-center z-50 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
