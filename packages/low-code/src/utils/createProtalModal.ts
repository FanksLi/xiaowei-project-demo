import { useState } from 'react';
import { createPortal } from 'react-dom';

export default function useProtalModal(children: React.ReactNode) {
    const modalRoot: HTMLElement | null = document.getElementById('modals');
    const [visible, setVisible] = useState(false);

    function open() {
        setVisible(true);
    }
    function hide() {
        setVisible(false);
    }
    if(visible) {
        return createPortal(children, modalRoot!);
    }

    return {
        open,
        hide,
    }
}