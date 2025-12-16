import { Modal, Form, Input, Select, Space, Button, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import useVariable from "@/store/variable";
import { useEffect } from "react";

interface Props {
  open: boolean;
  className?: string;
  onClose?: () => void;
  onOk?: () => void;
}

const { useForm } = Form;
const { Option } = Select;
const { useMessage } = message;

export default function VariableModalContent(props: Props) {
  const { open, className, onClose } = props;
  const [form] = useForm();
  const { variables, actions } = useVariable();
  const [messageApi, contextHolder] = useMessage();

  useEffect(() => {
    form.setFieldsValue({
      variables,
    });
  }, [variables]);
  function handleOk() {
    form.submit();
  }
  function handleClose() {
    onClose?.();
  }

  function onFinish(values: any) {
    console.log(values);
    actions.updateVariable(values.variables);
    messageApi.success("保存成功");
  }

  return (
    <Modal
      title="添加变量"
      open={open}
      onCancel={handleClose}
      onOk={handleOk}
      className={className}
      width={700}
    >
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        style={{ maxWidth: '100%', margin: "0 auto", marginTop: 20 }}
        autoComplete="off"
        form={form}
      >
        <Form.List name="variables">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8, justifyContent: "space-between" }}
                  align="baseline"
                >
                  {/* 隐藏的id字段 */}
                  <Form.Item {...restField} name={[name, "id"]} noStyle>
                    <Input type="hidden" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[{ required: true, message: "变量名不能为空" }]}
                  >
                    <Input placeholder="变量名" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "type"]}
                    rules={[{ required: true, message: "变量类型不能为空" }]}
                    style={{ width: 100 }}
                  >
                    <Select placeholder="类型">
                      <Option value="string">string</Option>
                      <Option value="number">number</Option>
                      <Option value="boolean">boolean</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "defaultValue"]}>
                    <Input placeholder="默认值" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "remark"]}>
                    <Input placeholder="备注" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
      {contextHolder}
    </Modal>
  );
}