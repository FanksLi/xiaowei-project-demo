import { create } from 'zustand'
import { type Component } from '@/@types';
import { getComponent } from '@/utils';

interface Store {
    components: Component[];
    currentComponentId: number | null;
    currentComponent: Component | null;
    addComponent: (element: Component, parentId?: number) => void;
    setCurrentComponent: (id: number | null) => void;
}


export const useStore = create<Store>(
    (set) => ({
        components: [],
        currentComponentId: null,
        currentComponent: null,
        addComponent: (element: Component, parentId?: number) =>
            set((state) => {
                function updateChildren(components: Component[], pareentId: number) {

                    components.forEach((item: Component) => {
                        if (!item.children) {
                            item.children = [];
                        }

                        if (item.id === pareentId) {
                            item.children?.push({
                                ...element,
                                parentId,
                            });
                        } else {
                            updateChildren(item.children, pareentId);
                        }
                    });
                    return components;
                }
                if (parentId) {
                    const components = updateChildren(state.components, parentId);
                    state.components = components;
                } else {
                    state.components.push(element);
                }
                return { ...state, components: [...state.components] };
            }),
        setCurrentComponent: (id: number | null) =>
            set((state) => {
                if (id === null) {
                    state.currentComponent = null;
                    state.currentComponentId = null;
                    return { ...state };
                }
                const component = getComponent(id, state.components);
                if(component) {
                    state.currentComponent = component;
                    state.currentComponentId = id;
                }
                return { ...state };
            }),
    })
)