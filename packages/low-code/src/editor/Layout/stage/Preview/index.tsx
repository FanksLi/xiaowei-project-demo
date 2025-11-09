import type { Component } from "@/@types";
import { useStore } from "@/store";
import { renderComponents, eventMaps } from "@/utils";
import { message } from "antd";

export default function Preview() {
  const { components } = useStore();
  const [messageApi, contextHolder] = message.useMessage();
  function handleEvent(component: Component) {
    const { name = "" } = component || {};
    const eventConfig = eventMaps[name || ""];
    const props: any = {};
    eventConfig?.forEach((item: any) => {
      const { value: eventName } = item || {};
      const { type, status, content } = component.props[eventName] || {};
      if (type === "showMessage") {
        if (status === "success") {
          props[eventName] = () => {
            messageApi.success(content);
          };
        } else if (status === "error") {
          props[eventName] = () => {
            messageApi.error(content);
          };
        }
      }
    });
    return props;
  }
  return (
    <div className="h-full w-full">
      {renderComponents(components, { handleEvent })}
      {contextHolder}
    </div>
  );
}
