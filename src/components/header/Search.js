import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import UserCard from '../UserCard';
import LoadIcon from '../../images/loading.gif';
import { Form } from 'react-bootstrap';
const Search = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch('');
    setUsers([]);
  };

  return (
    <Form
      className='search_form d-flex align-items-center '
      onSubmit={handleSearch}
    >
      <Form.Control
        type='search'
        placeholder='Search'
        className='me-2 bg-gray-100'
        aria-label='Search'
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ''))
        }
      />{' '}
      <span className='material-icons'>search</span>
      <div
        className='close_search'
        onClick={handleClose}
        style={{ opacity: users.length === 0 ? 0 : 1 }}
      >
        &times;
      </div>
      <button type='submit' style={{ display: 'none' }}>
        Search
      </button>
      {load && <img className='loading' src={LoadIcon} alt='loading' />}
      <div className='users'>
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border='border'
              handleClose={handleClose}
            />
          ))}
      </div>
    </Form>
  );
};

export default Search;
