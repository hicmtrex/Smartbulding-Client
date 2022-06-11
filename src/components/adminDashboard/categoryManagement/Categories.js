import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CategoryCard from '../../CategoryCard';
import { useHistory } from 'react-router-dom';
import { getDataAPI } from '../../../utils/fetchData';
import { CATEGORY_TYPES } from './../../../redux/actions/categoryAction';
import { deleteCategory } from '../../../redux/actions/categoryAction';
import LoadMoreBtn from '../../LoadMoreBtn';

const Categories = ({}) => {
  const { homeCategories, category, auth, theme, socket } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `categories?limit=${homeCategories.page * 9}`,
      auth.token
    );
    dispatch({
      type: CATEGORY_TYPES.GET_CATEGORIES,
      payload: { ...res.data, page: homeCategories.page + 1 },
    });

    setLoad(false);
  };
  const handleDeleteCategory = () => {
    if (window.confirm('Are you sure want to delete this category?')) {
      dispatch(deleteCategory({ category, auth, socket }));
      return history.push('/adminDashboard');
    }
  };
  return (
    <div className='col'>
      {homeCategories.categories.map((category) => (
        <Fragment>
          <div className='row'>
            <CategoryCard category={category} theme={theme} />
            <button
              key={category._id}
              onClick={handleDeleteCategory}
              className='btn btn-outline-info'
            >
              Delete
            </button>
          </div>
        </Fragment>
      ))}

      <LoadMoreBtn
        result={homeCategories.result}
        page={homeCategories.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Categories;
