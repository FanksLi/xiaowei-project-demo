import type { Component } from "@/@types";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../item-types";
import { useStore } from "@/store";
import { Space } from "@/editor/components";
import { Mask, HoverMask } from "@/editor/common";

interface Props {
  className?: string;
}
const componentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
};

export default function Stage(props: Props): React.ReactElement {
  const { className } = props;
  const { components, currentComponentId, setCurrentComponent } = useStore();
  const maskRef: any = useRef(null);
  const [hoverId, setHoverId] = useState<number | null>(null);
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
  function renderComponents(
    components: Component[] | undefined
  ): React.ReactNode {
    if (!components) return null;
    return components.map((item: Component) => {
      return React.createElement(
        componentMap[item.name],
        {
          ...item.props,
          key: item.id,
          "data-component-id": item.id,
          id: item.id,
        },
        item.props.children || renderComponents(item.children)
      );
    });
  }
  useEffect(() => {
    maskRef.current?.updatePosition?.();
  }, [components]);

  useEffect(() => {
    const container = document.querySelector(".stage");
    container?.addEventListener("click", hanldeClick, true);
    return () => {
      container?.removeEventListener("click", hanldeClick, true);
    };
  }, [currentComponentId]);
  useEffect(() => {
    const container = document.querySelector(".stage");

    // 添加鼠标移入事件
    container?.addEventListener("mouseover", handleMouseOver, true);
    container?.addEventListener("mouseout", handleMouseout);
    return () => {
      container?.removeEventListener("mouseover", handleMouseOver, true);
      container?.removeEventListener("mouseout", handleMouseout);
    };
  }, [currentComponentId]);
  function getComponentId(paths: any[]): number | null {
    for (let i = 0; i < paths.length; i++) {
      const ele = paths[i];
      if (ele.getAttribute) {
        if (ele.getAttribute("data-component-id")) {
          const componentId = ele.getAttribute("data-component-id");
          return Number(componentId);
        }
      }
    }
    return null;
  }

  function handleMouseOver(e: any) {
    const paths = e.composedPath();

    const id = getComponentId(paths);
    if (currentComponentId === null || id !== currentComponentId) {
      setHoverId(id);
    } else {
      setHoverId(null);
    }
  }

  function handleMouseout(e: any) {
    const paths = e.composedPath();
    for (let i = 0; i < paths.length; i++) {
      const ele = paths[i];
      if (ele.getAttribute) {
        if (ele.getAttribute("data-component-id")) {
          return;
        }
      }
    }
    setHoverId(null);
  }

  function hanldeClick(e: any) {
    const paths = e.composedPath();
    const id = getComponentId(paths);
    console.log("🚀 ~ handleClick ~ id:", id, paths);
    if (id !== null) {
      setCurrentComponent(id);
    } else {
      setCurrentComponent(null);
    }
  }
  console.log('hoverId', hoverId);
  return (
    <div
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      className={`stage relative ${className}`}
    >
      {renderComponents(components)}
      <Mask
        componentId={currentComponentId}
        containerClassName="stage"
        targetClassName="mask-container"
        ref={maskRef}
      />
      {hoverId ? (
        <HoverMask
          hoverId={hoverId}
          containerClassName="stage"
          targetClassName="mask-container"
        />
      ) : null}
      <div className="mask-container"></div>
    </div>
  );
}
