// import { ItemTypes } from "@/editor/Layout/item-types";
import { Button as AntButton, type ButtonProps } from "antd";
// import { useDrop } from "react-dnd";


interface AntuttonProps extends ButtonProps { 
    text: string;
}

export default function Button(props: AntuttonProps): React.ReactElement { 
    const { id, children, text, ...rest } = props;
    // const [{ canDrop }, drop] = useDrop({
    //     accept: [ItemTypes.BUTTON, ItemTypes.SPACE],
    //     drop: (_, monitor) => { 
    //         const didDrop = monitor.didDrop();
    //         if (didDrop) { 
    //             return; 
    //         }
    //         return { 
    //             id,
    //          };
    //     },
    //     collect: (monitor) => ({
    //       canDrop: monitor.canDrop(),
    //       isOver: monitor.isOver(),
    //     }),
    // });
  
    return (
        <AntButton id={id} {...rest}>
            {text || children}
        </AntButton>
    );

}