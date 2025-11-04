import type { Component } from "@/@types";



export function getComponent(id: number, components: Component[]): Component | null {
    let component: Component | null = null;

    for (let i = 0; i < components.length; i++) { 
        if (components[i].id === id) {
            component = components[i];
            return component;
        } else {
            if (components[i].children) {
                component = getComponent(id, components[i].children || []);
            }
        }
    }
  
    return component;
}