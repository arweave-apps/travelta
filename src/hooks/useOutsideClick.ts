import { useEffect } from 'react';

export default function useOutsideClick(
  ref: React.RefObject<HTMLDivElement>,
  func: () => void,
  isOpen: boolean
): void {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!isOpen) {
        return;
      }

      if (
        isOpen &&
        e.target instanceof Node &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        func();
      }
    };

    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [func, isOpen, ref]);
}
