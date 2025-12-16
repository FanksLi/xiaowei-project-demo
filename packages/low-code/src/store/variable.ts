import { create } from "zustand";

interface Variable {
    name: string;
    type: string;
    defaultValue: string;
    remark: string;
    id: string;
}

interface Actions {
    updateVariable: (variables: Variable[]) => void;
}


export default create<{ variables: Variable[], actions: Actions }>((set) => { 
    return {
        variables: [] as Variable[],
        actions: {
         
            updateVariable: (variables: Variable[]) => {
                set(() => ({
                    variables: [...variables],
                }));
            },
           
        },
    };
});