import { ItemTypes } from "@/editor/Layout/item-types";
import { useDrop } from "react-dnd";

interface Props {
  id: number;
  children?: React.ReactNode;
}

export default function Page(props: Props): React.ReactElement {
  const { id = 0, children, ...rest } = props;
  const [{ canDrop }, drop] = useDrop({
    accept: [ItemTypes.BUTTON, ItemTypes.SPACE],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      return {
        id,
      };
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      className="p-6 h-full page box-border"
      style={{ border: canDrop ? "1px dashed #ccc" : "" }}
      ref={drop as unknown as React.Ref<HTMLDivElement>}
      {...rest}
    >
      {children}
    </div>
  );
}
