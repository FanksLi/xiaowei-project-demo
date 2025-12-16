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
  options?: Options,
  type: string = 'editor'
): React.ReactNode {
  if (!components) return null;



  return components.map((item: Component) => {
    if (type === 'editor') {
      return renderEditorComponent(item, options, type);
    } else {
      return renderPreviewComponent(item, options, type);
    }
  });
}

function renderPreviewComponent(item: Component, options?: Options, type?: string) {
  const newProps: any = {};
  const { handleEvent } = options || {};

  Object.keys(item.props).forEach((key) => {
    if (typeof item.props[key] === "object") {
      if (item.props[key].type === "variable") {
        newProps[key] = item.props[key].value;
      } else if (item.props[key].type === "static") {
        newProps[key] = item.props[key].value;
      } else {
        newProps[key] = item.props[key];
      }
    } else {
      newProps[key] = item.props[key];
    }
  });
  return React.createElement(
    componentMap[item.name],
    {
      ...newProps,
      key: item.id,
      "data-component-id": item.id,
      id: item.id,
      ...handleEvent?.(item)
    },
    item.props.children || renderComponents(item.children, options, type)
  );
}

function renderEditorComponent(item: Component, options?: Options, type?: string) {
  if (!item) return null;
  const { handleEvent } = options || {};

  const newProps: any = {};
  Object.keys(item.props).forEach((key) => {
    if (typeof item.props[key] === "object") {
      if (item.props[key].type === "variable") {
        newProps[key] = `$\{${item.props[key].key}}`;
      } else if (item.props[key].type === "static") {
        newProps[key] = item.props[key].value;
      } else {
        newProps[key] = item.props[key];
      }
    } else {
      newProps[key] = item.props[key];
    }
  });
  return React.createElement(
    componentMap[item.name],
    {
      ...newProps,
      key: item.id,
      "data-component-id": item.id,
      id: item.id,
      ...handleEvent?.(item)
    },
    item.props.children || renderComponents(item.children, options, type)
  );
}






export const eventMaps: { [key: string]: any } = {
  [ItemTypes.BUTTON]: [{ label: "点击", value: "onClick" }],
};