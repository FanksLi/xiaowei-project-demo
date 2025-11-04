
export interface Component {
    id: number;
    // 组件唯一标识
    
    // 组件名称
    name: string;
    // 组件属性
    props: any;
    // 子组件
    children?: Component[];
    // 父组件id
    parentId?: number;
}

export type ItemType = "Button" | "Space";