import * as React from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  wrapperId: string;
}

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

export const ReactPortal = ({ children, wrapperId = 'react-portal-wrapper' }: PortalProps) => {
  const [wrapperElement, setWrapperElement] = React.useState<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    let element = document.getElementById(wrapperId);
    let systemCreated = false;
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      if (systemCreated && element!.parentNode) {
        element!.parentNode.removeChild(element!);
      }
    };
  }, [wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};
