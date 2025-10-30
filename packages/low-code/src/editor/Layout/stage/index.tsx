import type { Component } from "@/@types";
import React from "react";
import { Button } from "antd";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../item-types";
import { useStore } from "@/store";
import { Space } from "@/editor/components";
interface Props {
  className?: string;
}
const componentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
};


export default function Stage(props: Props): React.ReactElement {
  const { className } = props;
  const { components } = useStore();
   console.log("🚀 ~ Stage ~ components:", components)
   const [, drop] = useDrop({
    accept: [ItemTypes.BUTTON, ItemTypes.SPACE],
    drop: (_, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        return { 
            id: 0,
         };
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
   });
  function renderComponents(components: Component[] | undefined): React.ReactNode {
    if (!components) return null;
    return components.map((item: Component) => {
      return React.createElement(
        componentMap[item.name],
        { ...item.props, key: item.id, id: item.id,  },
        item.props.children || renderComponents(item.children)
      );
    });
  }
  return <div ref={drop as unknown as React.Ref<HTMLDivElement>} className={className}>{renderComponents(components)}</div>;
}
