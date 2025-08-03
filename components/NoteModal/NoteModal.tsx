'use client'; // <-- Ця директива обов'язкова для клієнтських компонентів

import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './NoteModal.module.css';

interface NoteModalProps {
  children: ReactNode;
  onClose: () => void;
}

const NoteModal = ({ children, onClose }: NoteModalProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isMounted) {
    return null;
  }

  const modalRoot = document.getElementById('modal-root')!;

  if (!modalRoot) {
    console.error("The 'modal-root' element was not found in the DOM.");
    return null;
  }

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default NoteModal;