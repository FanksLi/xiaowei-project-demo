import { create } from 'zustand'
import { type Component } from '@/@types';

interface Store {
    components: Component[];
    addComponent: (element: Component, parentId?: number) => void;
}

export const useStore = create<Store>(
    (set) => ({
        components: [],
        addComponent: (element: Component, parentId?: number) =>
            set((state) => {
                function updateChildren(components: Component[], pareentId: number) {

                    components.forEach((item: Component) => {
                        if (!item.children) {
                            item.children = [];
                        }

                        if (item.id === pareentId) {

                            item.children?.push(element);
                        } else {
                            updateChildren(item.children, pareentId);
                        }
                    });
                    return components;
                }
                if (parentId) {
                    const components = updateChildren(state.components, parentId);
                    state.components = components;
                    return state;
                } else {
                    state.components.push(element);
                    return { ...state };
                }
            })
    })
)