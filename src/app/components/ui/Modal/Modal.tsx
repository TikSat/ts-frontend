import { CSSTransition } from 'react-transition-group';
import { ReactPortal } from './ReactPortal/ReactPortal';
import cn from 'classnames';
import { Icon } from '@app/components/ui/Icon';
import { Button } from '@app/components/ui/Button';
import { Fragment, ReactNode, useEffect, useRef } from 'react';
import { useActions } from '@app/hooks/useActions';
import s from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  openButton?: ReactNode;
  title?: string;
  isOpen?: boolean;
  classNames?: {
    root?: string;
    content?: string;
  };
}

export const Modal = ({ isOpen = false, classNames = {}, title, children }: ModalProps) => {
  const nodeRef = useRef(null);
  const { setModal } = useActions();

  useEffect(() => {
    isOpen && document.getElementsByTagName('main')[0].classList.add(s.overlay);
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? setModal(null) : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
      document.getElementsByTagName('main')[0].classList.remove(s.overlay);
    };
  }, [isOpen]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        out={!isOpen}
        timeout={500}
        unmountOnExit
        nodeRef={nodeRef}
        classNames={{
          enter: s['modal-enter'],
          enterActive: s['modal-enter-active'],
          exit: s['modal-exit'],
          exitActive: s['modal-exit-active'],
        }}
      >
        <Fragment>
          <div className={cn(s.root, s.modal)} ref={nodeRef}>
            <div className={s.header}>
              <div className={s.holder}>
                <h2>{title}</h2>
                <Button
                  theme={'silent'}
                  size={'initial'}
                  onClick={() => {
                    setModal(null);
                  }}
                >
                  <Icon name={'close'} size={'xs'}></Icon>
                </Button>
              </div>
            </div>
            <hr />
            <div className={cn(s.content, classNames.content)}>{children}</div>
          </div>
        </Fragment>
      </CSSTransition>
    </ReactPortal>
  );
};
