import { create } from 'zustand'
import { type Component } from '@/@types';
import { getComponent } from '@/utils';
import { ItemTypes } from '@/editor/Layout/item-types';

interface Store {
    components: Component[];
    currentComponentId: number | null;
    currentComponent: Component | null;
    mode: 'edit' | 'preview';
    setMode: (mode: 'edit' | 'preview') => void;
    addComponent: (element: Component, parentId?: number) => void;
    setCurrentComponent: (id: number | null) => void;
    updateAttributes: (id: number, attributes: Record<string, any>) => void;
    updateEventConfig: (id: number, eventName: string, eventConfig: Record<string, any>) => void;
}


export const useStore = create<Store>(
    (set) => ({
        components: [
            {
                id: 1,
                name: ItemTypes.PAGE,
                props: {
                },
                children: [
                ],
            }
        ],
        currentComponentId: null,
        currentComponent: null,
        mode: 'edit',
        setMode: (mode: 'edit' | 'preview') => {
            set((state) => ({
                ...state,
                mode,
            }))
        },
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
                if (component) {
                    state.currentComponent = component;
                    state.currentComponentId = id;
                }
                return { ...state };
            }),
        updateAttributes: (id: number, attributes: Record<string, any>) => {
            set((state) => {
                const component = getComponent(id, state.components);
                if (component) {
                    component.props = { ...component.props, ...attributes };
                }
                return { ...state, components: [...state.components] };
            })
        },
        updateEventConfig: (id: number, eventName: string, eventConfig: Record<string, any> = {}) => {
            set((state) => {
                const component = getComponent(id, state.components);
                if (component) {
                    component.props[eventName] = { ...component.props[eventName], ...eventConfig};
                }
                return { ...state, components: [...state.components] };
            })
        }
    })
)