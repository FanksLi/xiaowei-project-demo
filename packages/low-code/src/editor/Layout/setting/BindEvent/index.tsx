import { useStore } from "@/store";
import { eventMaps } from "@/utils";
import { Collapse, Input, Select } from "antd";


export default function BindEvent() {
  const { currentComponent, updateEventConfig } = useStore();

  const componentName = currentComponent?.name;
  const eventList = (componentName && eventMaps[componentName]) || [];

  function handleChange(eventName: string, type: string, value: string) {
    const config = { ...currentComponent?.props?.eventConfig };
    if (type === "action") {
      // 绑定事件类型
      config.type = value;
    } else if (type === "status") {
      // 绑定事件状态
      config.status = value;
    } else if (type === "content") {
      // 绑定事件内容
      config.content = value;
    }
    updateEventConfig(currentComponent?.id || 0, eventName, config);
  }
  return (
    <div className="py-5">
      {eventList.map((setting: any) => {
        return (
          <Collapse key={setting.value}>
            <Collapse.Panel header={setting.label} key={setting.value}>
              <div className="pb-4">
                <div className="pb-2">动作：</div>
                <div>
                  <Select
                    className="w-full"
                    // defaultValue="showMessage"
                    onChange={(value) =>
                      handleChange(setting.value, "action", value)
                    }
                    value={currentComponent?.props?.[setting.value]?.type}
                    options={[
                      {
                        label: "显示提示",
                        value: "showMessage",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="pb-4">
                <div className="pb-2">状态：</div>
                <div>
                  <Select
                    className="w-full"
                    onChange={(value: string) =>
                      handleChange(setting.value, "status", value)
                    }
                    value={currentComponent?.props?.[setting.value]?.status}
                    options={[
                      {
                        label: "成功",
                        value: "success",
                      },
                      {
                        label: "失败",
                        value: "error",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="pb-4">
                <div className="pb-2">内容：</div>
                <div>
                  <Input
                    type="text"
                    value={currentComponent?.props?.[setting.value]?.content}
                    onChange={(e: any) =>
                      handleChange(setting.value, "content", e.target.value)
                    }
                  />
                </div>
              </div>
            </Collapse.Panel>
          </Collapse>
        );
      })}
    </div>
  );
}
