import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
// import { useStore } from "@/store";
// import { getComponent } from "@/utils";
// import type { Component } from "@/@types";
// import { Dropdown, Space } from "antd";

interface Props {
  className?: string;
  hoverId: number | null;
  containerClassName: string;
  targetClassName: string;
}

interface Postion {
  left: number;
  top: number;
  width: number;
  height: number;
  toolLeft: number;
  toolTop: number;
}
export default function HoverMask(props: Props): React.ReactElement | null {
  const { className, hoverId, targetClassName } = props;
//   const { components, setCurrentComponent } = useStore();

  const hoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Postion>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    toolLeft: 0,
    toolTop: 0,
  });
  // console.log("🚀 ~ HoverMask ~ position:", position)

  useEffect(() => {
    handleUpdatePosition();
  }, [hoverId]);

  function handleUpdatePosition() {
    if (!hoverId) {
      return;
    }
    const node = document.querySelector(
      `[data-component-id="${hoverId}"]`
    ) as HTMLElement;
    const { left, top, width, height } = node.getBoundingClientRect();
    const toolTop = 0;
    const toolLeft = width;
    setPosition({
      left,
      top,
      width,
      height,
      toolLeft,
      toolTop,
    });
  }

//   const currentComponent: Component | null = useMemo(() => {
//     if (!hoverId) return null;
//     return getComponent(hoverId, components);
//   }, [hoverId]);

//   const parentComponents: Component[] = useMemo(() => {
//     if (!hoverId) return [];
//     const compoents = [];
//     let component: Component | null = getComponent(hoverId, components);

//     while (component?.parentId) {
//       component = getComponent(component.parentId, components);
//       if (component) compoents.push(component);
//     }
//     return compoents;
//   }, [hoverId]);
//   console.log("🚀 ~ HoverMask ~ currentComponent:", parentComponents);

  return createPortal(
    <div
      className={`${className} border-dashed border border-[rgb(66, 133, 244)] fixed pointer-events-none z-10`}
      ref={hoverRef}
      style={{
        left: position.left,
        top: position.top,
        width: position.width,
        height: position.height,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
       
    </div>,
    document.querySelector(`.${targetClassName}`) || document.body
  );
}
