import { useEffect } from 'react';

export default function useOutsideClick(
  ref:
    | React.RefObject<HTMLDivElement>
    | React.MutableRefObject<HTMLDivElement[]>,
  handler: () => void,
  isActive: boolean
): void {
  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (Array.isArray(ref.current)) {
        const isContainsNode = ref.current.every(
          (node) => node && !node.contains(target)
        );

        if (isContainsNode) {
          handler();
        }
      } else if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, [handler, isActive, ref]);
}
