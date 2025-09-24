import { useEffect } from 'react';

type Ref = { current: HTMLElement | null };
/**calls handler for mousedown outside element */

export default function useOutsideClick(ref: Ref, handler: () => void) {
    useEffect(() => {
        function onDocMouse(e: MouseEvent) {
            if (!ref.current) return;
            if (e.target instanceof Node && !ref.current.contains(e.target)) {
                handler();
            }
        }
        document.addEventListener('mousedown', onDocMouse);
        return () => document.removeEventListener('mousedown', onDocMouse);
    }, [ref, handler]);
}