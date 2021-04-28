import { useEffect } from 'react';

export default function useOutsideClick(
  ref: React.RefObject<HTMLDivElement> | React.RefObject<HTMLDivElement>[],
  handler: () => void,
  isActive: boolean
): void {
  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (Array.isArray(ref)) {
        const isConatainsNode = ref.every(
          (node) => node.current && !node.current.contains(target)
        );

        if (isConatainsNode) {
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
