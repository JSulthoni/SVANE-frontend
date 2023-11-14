import { useEffect } from "react";

const useClickOutside = (ref, handler) => {
    useEffect(() => {
        let lastClickTime = 0;
        const DOUBLE_CLICK_DELAY = 300;

        const listener = (event) => {
            const el = ref.current
            const currentTime = new Date().getTime()
            if (el && !el.contains(event.target)) {
                if (currentTime - lastClickTime <= DOUBLE_CLICK_DELAY) {
                    handler(event)
                }
                lastClickTime = currentTime
            }
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchend', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchend', listener);
        }
    }, [ref, handler])
};

export default useClickOutside;

