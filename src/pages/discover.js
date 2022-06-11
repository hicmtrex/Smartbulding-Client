import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDiscoverPosts } from '../redux/actions/discoverAction';
import { getCategories } from '../redux/actions/categoryAction';
import LoadIcon from '../images/loading.gif';
import PostThumb from '../components/PostThumb';
import { getDataAPI } from '../utils/fetchData';
import LoadMoreBtn from '../components/LoadMoreBtn';
import { Container, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Discover = () => {
  const { auth, discover, posts, homeCategories, homePosts } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    dispatch(getCategories(auth.token));
  }, [dispatch, auth.token]);

  const getPosts = async (cat) => {
    setLoad(true);

    dispatch(getDiscoverPosts(auth.token, cat));
    setLoad(false);
  };

  return (
    <Container>
      <div id='topnavbar'>
        <div className='topnav '>
          <div className='d-flex px-1 '>
            <Link onClick={() => getPosts()} to='#'>
              All Categories
            </Link>
            {homeCategories.categories.map((category) => (
              <Link onClick={() => getPosts(category.name)} key={category._id}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {homeCategories.categories.category === discover.posts.category && (
        <>
          {discover.loading ? (
            <img
              src={LoadIcon}
              alt='loading'
              className='d-block mx-auto my-4'
            />
          ) : (
            <PostThumb posts={discover.posts} result={discover.result} />
          )}

          {load && (
            <img src={LoadIcon} alt='loading' className='d-block mx-auto' />
          )}

          {!discover.loading && (
            <LoadMoreBtn
              result={discover.result}
              page={discover.page}
              load={load}
              handleLoadMore={''}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default Discover;
