export const CATEGORY_LOAD = "CATEGORY_LOAD";

export function categoryLoad(categories){
    return {
        type: CATEGORY_LOAD,
        categories
    }
}