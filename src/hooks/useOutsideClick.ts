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

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [func, isOpen, ref]);
}
