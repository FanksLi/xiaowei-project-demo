import { Modal, Table } from "antd";
import useVariable from "@/store/variable";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (value: any) => void;
  onOk: () => void;
}

export default function VariableModal(props: Props) {
  const { open, onClose, onOk, onSelect } = props;
  const { variables } = useVariable();
  const columns = [
    {
      title: "变量名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "默认值",
      dataIndex: "defaultValue",
      key: "defaultValue",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark",
    },
  ];

  return (
    <Modal title="变量管理" open={open} onOk={onOk} onCancel={onClose} width="60%" okText="确定" cancelText="取消">
      <Table dataSource={variables} columns={columns} rowSelection={{ onSelect, type: "radio" }} />
    </Modal>
  );
}
