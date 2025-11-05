import { useStore } from "@/store";
import { ItemTypes } from "@/editor/Layout/item-types";
import { Form, Select, Input } from "antd";
import { useEffect } from "react";

interface Props {
  className?: string;
}

const attributeMap = {
  [ItemTypes.BUTTON]: [
    {
      name: "type",
      label: "按钮类型",
      type: "select",
      defaultValue: "primary",
      options: [
        {
          label: "普通按钮",
          value: "primary",
        },
        {
          label: "默认按钮",
          value: "default",
        },
      ],
    },
    {
      name: "text",
      label: "按钮文本",
      type: "input",
    },
  ],
  [ItemTypes.SPACE]: [
    {
      name: "size",
      label: "间距大小",
      type: "select",
      defaultValue: "middle",
      options: [
        {
          label: "小",
          value: "small",
        },
        {
          label: "中",
          value: "middle",
        },
        {
          label: "大",
          value: "large",
        },
      ],
    },
    {
        name: 'align',
        label: '对齐方式',
        type: 'select',
        defaultValue: 'start',
        options: [
            {
                label: '左对齐',
                value: 'start',
            },
            {
                label: '居中对齐',
                value: 'center',
            },
            {
                label: '右对齐',
                value: 'end',
            },
            {
                label: '基线线对齐',
                value: 'baseline',
            },
        ],
    }
  ],
  [ItemTypes.PAGE]: [
    {
      name: "title",
      label: "页面标题",
      type: "input",
    },
  ],
};

const Option = Select.Option;
const { useForm } = Form;
export default function Attribute(props: Props): React.ReactElement {
  const { className } = props;
  const { currentComponent, updateAttributes } = useStore();
  console.log("🚀 ~ Attribute ~ currentComponent:", currentComponent);
  const [form] = useForm();

  useEffect(() => {
    if (!currentComponent) return;
    form.setFieldsValue(currentComponent?.props);
  }, [currentComponent?.id]);
  function renderItem(item: any) {
    switch (item.type) {
      case "input":
        return <Input />;
      case "select":
        return (
          <Select>
            {item.options.map((option: any) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
    }
  }

  function handleChange(values: any) {
    console.log("🚀 ~ handleChange ~ value:", values);
    if(!currentComponent || currentComponent.id === null) return;
    updateAttributes(currentComponent.id, values);
  }
  return (
    <div className={`${className} py-10 px-4`}>
      <Form form={form} onValuesChange={handleChange}>
        {currentComponent?.name &&
          attributeMap[currentComponent.name].map((item) => (
            <Form.Item label={item.label} key={item.name} name={item.name}>
              {renderItem(item)}
            </Form.Item>
          ))}
      </Form>
    </div>
  );
}
