import { ItemTypes } from "@/editor/Layout/item-types";
import { Space as AntdSpace, type SpaceProps } from "antd";
import { useDrop } from "react-dnd";




export default function Space(props: SpaceProps): React.ReactElement { 
    const { id, children, size = 'middle', ...rest } = props;
    console.log("🚀 ~ Space ~ rest:", rest)
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
          isOver: monitor.isOver(),
        }),
    });
    if(children && children instanceof Array && children.length === 0 || !children) {
        return (
            <AntdSpace size={size} className="p-4" style={{border: canDrop ? '1px dashed #ccc' : ''}} ref={drop as unknown as React.Ref<HTMLDivElement>} {...rest} >
               --暂无内容--
            </AntdSpace>
        );
    }

    return (
        <AntdSpace size={size} className="p-4" style={{border: canDrop ? '1px dashed #ccc' : ''}} ref={drop as unknown as React.Ref<HTMLDivElement>} {...rest}>
            {children}
        </AntdSpace>
    );

}