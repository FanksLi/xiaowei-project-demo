import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  className?: string;
  targetClassName: string;
  containerClassName?: string;
  componentId: number | null;
}

interface Postion {
  left: number;
  top: number;
  width: number;
  height: number;
}
 function Mask(props: Props, ref: any): React.ReactElement | null {
  const { className, componentId, targetClassName } = props;
  const maskRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Postion>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  useImperativeHandle(ref, () => {
    return {
      updatePosition: handleUpdatePosition,
    };
  });
  useEffect(() => {
    handleUpdatePosition();
  }, [componentId]);

  function handleUpdatePosition() {
    if (!componentId) return;
    const node = document.querySelector(
      `[data-component-id="${componentId}"]`
    ) as HTMLElement;
    const { left, top, width, height } = node.getBoundingClientRect();
    setPosition({
      left,
      top,
      width,
      height,
    });
  }

  if(componentId === null) return null;

  const maskClassName = `${className} fixed border-1 border-solid border-[#7b7b7b] z-[999] background-transparent pointer-events-none`;
  return createPortal(
    <div className={maskClassName} ref={maskRef} style={position}></div>,
    document.querySelector(`.${targetClassName}`) || document.body
  );
}
export default forwardRef(Mask);
