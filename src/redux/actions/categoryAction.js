import { GLOBALTYPES } from './globalTypes';
import { postDataAPI, getDataAPI, deleteDataAPI } from '../../utils/fetchData';

export const CATEGORY_TYPES = {
  CREATE_CATEGORY: 'CREATE_CATEGORY',
  LOADING_CATEGORY: 'LOADING_CATEGORY',
  GET_CATEGORIES: 'GET_CATEGORIES',
  GET_CATEGORY: 'GET_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
};

export const createCategory =
  ({ name, auth, socket }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      const res = await postDataAPI('category', { name }, auth.token);

      dispatch({
        type: CATEGORY_TYPES.CREATE_CATEGORY,
        payload: { ...res.data.newCategory, user: auth.user },
      });

      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getCategories = (token) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_TYPES.LOADING_CATEGORY, payload: true });
    const res = await getDataAPI('category', token);

    dispatch({
      type: CATEGORY_TYPES.GET_CATEGORIES,
      payload: { ...res.data, page: 2 },
    });

    dispatch({ type: CATEGORY_TYPES.LOADING_CATEGORY, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getCategory =
  ({ detailCategory, id, auth }) =>
  async (dispatch) => {
    if (detailCategory.every((category) => category._id !== id)) {
      try {
        const res = await getDataAPI(`category/${id}`, auth.token);
        dispatch({
          type: CATEGORY_TYPES.GET_CATEGORY,
          payload: res.data.category,
        });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,

          payload: { error: err.response?.msg },
        });
      }
    }
  };
export const deleteCategory = (category, auth) => async (dispatch) => {
  try {
    await deleteDataAPI(`category/${category._id}`, auth.token);
    dispatch({ type: CATEGORY_TYPES.DELETE_CATEGORY, payload: category });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response?.msg },
    });
  }
};
