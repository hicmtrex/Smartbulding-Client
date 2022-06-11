import { CATEGORY_TYPES } from '../actions/categoryAction'
import {  DeleteData } from '../actions/globalTypes'

const initialState = {
    loading: false,
    categories: [],
    result: 0,
    page: 2
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type){
        case CATEGORY_TYPES.CREATE_CATEGORY:
            return {
                ...state,
                categories: [action.payload, ...state.categories]
            };
        case CATEGORY_TYPES.LOADING_CATEGORY:
            return {
                ...state,
                loading: action.payload
            };
        case CATEGORY_TYPES.GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload.categories,
                result: action.payload.result,
                page: action.payload.page
            };
            case CATEGORY_TYPES.GET_CATEGORY: 
            return [
                ...state,
                 action.payload
            ]
        case CATEGORY_TYPES.DELETE_CATEGORY:
            return {
                ...state,
                categories: DeleteData(state.categories,action.payload._id)
            };
        default:
            return state;
    }
}

export default categoryReducer