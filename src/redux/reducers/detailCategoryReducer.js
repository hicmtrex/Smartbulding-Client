import { CATEGORY_TYPES } from '../actions/categoryAction'


const detailCategoryReducer = (state = [], action) => {
    switch (action.type){
        case CATEGORY_TYPES.GET_CATEGORY: 
            return [...state, action.payload]
    
        default:
            return state;
    }
}


export default detailCategoryReducer