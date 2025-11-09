import type { Component } from "@/@types";
import React from "react";
import { Space, Button, Page } from "@/editor/components";
import { ItemTypes } from "@/editor/Layout/item-types";

const componentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
  Page,
};

export function getComponent(id: number, components: Component[]): Component | null {
  let component: Component | null = null;

  for (let i = 0; i < components.length; i++) {
    if (components[i].id === id) {
      component = components[i];
      return component;
    } else {
      if (components[i].children) {
        component = getComponent(id, components[i].children || []);
      }
    }
  }

  return component;
}

interface Options {
  [key: string]: any;
}
export function renderComponents(
  components: Component[] | undefined,
  options?: Options
): React.ReactNode {
  if (!components) return null;
  const { handleEvent } = options || {};
  return components.map((item: Component) => {
    return React.createElement(
      componentMap[item.name],
      {
        ...item.props,
        key: item.id,
        "data-component-id": item.id,
        id: item.id,
        ...handleEvent?.(item)
      },
      item.props.children || renderComponents(item.children, options)
    );
  });
}


export const eventMaps: { [key: string]: any } = {
  [ItemTypes.BUTTON]: [{ label: "点击", value: "onClick" }],
};