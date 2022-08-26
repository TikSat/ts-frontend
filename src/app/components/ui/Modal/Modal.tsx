import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { ReactPortal } from './ReactPortal/ReactPortal';
import cn from 'classnames';

import s from './Modal.module.css';
import { Icon } from '@app/components/ui/Icon';
import { Button } from '@app/components/ui/Button';

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  handleClose: () => void;
  title?: string;
  classNames?: {
    root?: string;
    content?: string;
  };
}

export const Modal = ({ children, isOpen, handleClose, classNames = {}, title }: ModalProps) => {
  const nodeRef = React.useRef(null);

  React.useEffect(() => {
    const bodyElement = document.getElementsByTagName('body')[0];

    if (isOpen) {
      bodyElement.setAttribute('style', 'overflow: overlay');
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
      <CSSTransition in={isOpen} out={!isOpen} timeout={100} unmountOnExit nodeRef={nodeRef}>
        <React.Fragment>
          <div className={cn(s.root, classNames.root)} ref={nodeRef}>
            <div className={s.header}>
              <div className={s.holder}>
                <h2>{title}</h2>
                <Button theme={'silent'} size={'initial'} onClick={handleClose}>
                  <Icon name={'close'} size={'xs'}></Icon>
                </Button>
              </div>
            </div>
            <hr />
            <div className={cn(s.content, classNames.content)}>{children}</div>
          </div>
          <div className={s.overlay} onClick={handleClose}></div>
        </React.Fragment>
      </CSSTransition>
    </ReactPortal>
  );
};
