import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactPortal } from './ReactPortal/ReactPortal';
import cn from 'classnames';

import s from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  handleClose: () => void;
  classNames?: {
    root?: string;
    content?: string;
  };
}

export const Modal = ({ children, isOpen, handleClose, classNames = {} }: ModalProps) => {
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    const bodyElement = document.getElementsByTagName('body')[0];

    if (isOpen) {
      bodyElement.setAttribute('style', 'overflow: hidden');
    }

    if (!isOpen) {
      bodyElement.setAttribute('style', '');
    }

    return () => bodyElement.setAttribute('style', '');
  }, [isOpen]);

  React.useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition in={isOpen} timeout={200} unmountOnExit nodeRef={nodeRef}>
        <div className={s.overlay} onClick={handleClose}>
          <div className={cn(s.root, classNames.root)} ref={nodeRef}>
            <div className={cn(s.content, classNames.content)}>{children}</div>
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
};
