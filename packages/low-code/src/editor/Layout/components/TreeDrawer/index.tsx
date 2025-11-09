import type { Component } from "@/@types";
import { useStore } from "@/store";
import { Drawer, Tree } from "antd";
import { useMemo, type Key } from "react";

interface Props {
  className?: string;
  open: boolean;
  handleOpen: (v: boolean) => void;
}
export default function TreeDrawer(props: Props) {
  const { className, open, handleOpen } = props;
  const { components, currentComponentId, setCurrentComponent } = useStore();

  const data = useMemo(() => {
    function getTreeData(components: Component[]): any[] {
      return components.map((item: Component) => {
        return {
          title: item.name,
          key: item.id,
          children: item.children ? getTreeData(item.children) : [],
        };
      });
    }
    return getTreeData(components);
  }, [components]);

  function handleSelect(selectedKeys: Key[],) { 
    setCurrentComponent(selectedKeys[0] as number);
  }

  return (
    <Drawer
      title="组件树"
      placement="left"
      width={500}
      open={open}
      className={className}
      onClose={() => handleOpen(false)}
    >
      <Tree treeData={data} showLine 
        onSelect={handleSelect}
        selectedKeys={currentComponentId ? [currentComponentId] : []}
        defaultExpandedKeys={currentComponentId ? [currentComponentId] : []}
      />
    </Drawer>
  );
}
