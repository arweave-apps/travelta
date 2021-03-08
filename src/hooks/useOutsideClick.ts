import { useEffect } from 'react';

export default function useOutsideClick(
  ref: React.RefObject<HTMLDivElement>,
  func: () => void,
  isOpen: boolean
): void {
  useEffect(() => {
    function clickOutsideHandler(e: MouseEvent) {
      if (
        isOpen &&
        e.target instanceof Node &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        func();
      }
    }

    document.addEventListener('click', clickOutsideHandler);

    return () => {
      document.removeEventListener('click', clickOutsideHandler);
    };
  }, [func, isOpen, ref]);
}
