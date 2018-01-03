import { CATEGORY_LOAD } from '../../actions/category';

export default function category(state = { categories: [] }, action) {

    const { categories } = action;

    switch (action.type) {
        case CATEGORY_LOAD: {
            return {
                categories
            }
        }
        default: {
            return state;
        }
    }
}