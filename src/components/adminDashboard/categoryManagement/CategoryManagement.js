import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadMoreBtn from '../../LoadMoreBtn';
import { getDataAPI } from '../../../utils/fetchData';
import CategoryCard from '../../CategoryCard';
import {
  createCategory,
  getCategories,
} from '../../../redux/actions/categoryAction';
import { CATEGORY_TYPES } from './../../../redux/actions/categoryAction';
import { deleteCategory } from '../../../redux/actions/categoryAction';
import { Button, Card, Container, Form, Table } from 'react-bootstrap';
import { FaTrash, FaUserCog } from 'react-icons/fa';
const CategoryManagement = () => {
  const { auth, homeCategories, category, theme, socket } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const history = useHistory();
  const [load, setLoad] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory({ name, auth, socket }));

    setName('');
  };
  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `category?limit=${homeCategories.page * 9}`,
      auth.token
    );
    dispatch({
      type: CATEGORY_TYPES.GET_CATEGORIES,
      payload: { ...res.data, page: homeCategories.page + 1 },
    });

    setLoad(false);
  };

  useEffect(() => {
    dispatch(getCategories(auth.token));
  }, [dispatch, auth.token]);

  const handleDeleteCategory = (cat) => {
    if (window.confirm('Are you sure want to delete this category?')) {
      dispatch(deleteCategory(cat, auth));
      return history.push('/adminDashboard');
    }
  };
  return (
    <Container className='my-3 w-screen'>
      <Card className='shadow border-0 mb-2 '>
        <Card.Header className='card-header d-flex bg-red-600 justify-content-between'>
          <h5 className='mb-0 text-white'>Liste des Categories </h5>
          <h6 className=''>
            <form onSubmit={handleSubmit} className='d-flex align-items-center'>
              <Form.Control
                size='sm'
                className='rounded-0'
                type='text'
                name='name'
                value={name}
                placeholder='create category'
                required
                onChange={(e) => setName(e.target.value)}
              />

              <Button size='sm' type='submit' className='rounded-0'>
                Post
              </Button>
            </form>
          </h6>
        </Card.Header>
        <Table responsive hover className='table-nowrap'>
          <thead className='thead-light'>
            <tr>
              <th scope='col'>
                <span>Nom</span>
              </th>
              <th scope='col'>
                <span>Date</span>
              </th>

              <th scope='col'>
                <FaTrash size={'1.2rem'} />
              </th>
            </tr>
          </thead>
          <tbody>
            {homeCategories.categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{new Date(category.createdAt).toLocaleDateString('en')}</td>
                <td>
                  <FaTrash
                    color='red'
                    size={'1.2rem'}
                    className=' cursor-pointer'
                    onClick={() => handleDeleteCategory(category)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default CategoryManagement;
