import { ItemTypes } from "@/editor/Layout/item-types";
import { useDrag } from "react-dnd";

interface ComponentItemProps {
  name: string;
  description: string;
  onDragEnd?: (item: {
    name: string;
    description: string;
    props: Record<string, any>;
    parentId: number;
  }) => void;
}

export default function ComponentItem(
  props: ComponentItemProps
): React.ReactElement {
  const { name, description, onDragEnd } = props;
  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: name,
      end: (_, monitor) => {
        const dropResult: any = monitor.getDropResult();
        if (!dropResult) return;
        if (onDragEnd) {
          onDragEnd({
            name,
            description,
            props:
              name === ItemTypes.BUTTON
                ? { children: "按钮", ...dropResult }
                : { ...dropResult },
            parentId: Number(dropResult.id || 0),
          });
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    };
  });


  const opacity = isDragging ? 0.5 : 1;
  return (
    <div
      className="w-[100px] h-[100px] border-dashed border text-center leading-[100px]"
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      style={{ opacity }}
    >
      {description}
    </div>
  );
}
