import { useStore } from "@/store";
import { Button, Space } from "antd";

interface Props {
  className?: string;
  handleOpen: (v: boolean) => void;
  open: boolean;
  openVariable?: () => void;
}

export default function Header(props: Props): React.ReactElement {
  const { className, handleOpen, open, openVariable } = props;
  const { mode, setMode } = useStore();

  function handleClick(type: string) {
    if (type === "preview") {
        setMode('preview');
    } else {
        setMode('edit');
    }
  }
  return (
    <div className={`${className} flex items-center justify-between px-10`}>
      <div>LowCode</div>
      <Space>
        {mode === "edit" ? (
          <Space>
            <Button onClick={() => handleClick('preview')}>预览</Button>
            <Button onClick={() => handleOpen(!open)}>层级树</Button>
            <Button onClick={openVariable}>添加变量</Button>
          </Space>
        ) : (
          <div>
            <Button onClick={() => handleClick('edit')}>编辑</Button>
          </div>
        )}
      </Space>
    </div>
  );
}
