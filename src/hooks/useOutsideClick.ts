import { useEffect } from 'react';

export default function useOutsideClick(
  ref: React.RefObject<HTMLDivElement>,
  handler: () => void,
  isActive: boolean
): void {
  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (!ref.current?.contains(target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClick, { capture: true });

    return () => {
      document.removeEventListener('mousedown', handleClick, { capture: true });
    };
  }, [handler, isActive, ref]);
}
