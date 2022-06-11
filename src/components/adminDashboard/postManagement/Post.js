import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPosts } from '../../../redux/actions/postAction';
import { Card, Container, Image, Table } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import './Spam.css';


const Post = () => {
  const { auth, homePosts, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const deleteHandler = (u) => {
    dispatch(deletePost(u, auth, socket));
  };

  useEffect(() => {
    dispatch(getPosts(auth.token));
  }, [dispatch, auth.token]);

  return (
    <Container className='my-3 w-screen'>
      <Card className='shadow border-0 mb-2 '>
        <Card.Header className='card-header d-flex bg-red-600   justify-content-between'>
          <h5 className='mb-0 text-white'>Liste des Posts </h5>
          <h6 className=''></h6>
        </Card.Header>
        <Table responsive hover className='table-nowrap'>
          <thead className='thead-light'>
            <tr>
              <th scope='col'>
                <span>Image</span>
              </th>
              <th scope='col'>
                <span>Username</span>
              </th>
              <th scope='col'>
                <span>category</span>
              </th>
              <th scope='col'>
                <span>content</span>
              </th>
              <th scope='col'>
                <span>links</span>
              </th>
              <th scope='col'>
                <FaTrash size={'1.2rem'} />
              </th>
            </tr>
          </thead>
          <tbody>
            {homePosts.posts.map((post) => (
              <tr key={post?._id}>
                <td>
                  <Image
                    className='avatar'
                    roundedCircle
                    src={post.images[0].url}
                  />
                </td>
                <td>{post.user.username}</td>
                <td>{post.category}</td>
                <td>{post.content.substring(0, 50)}</td>
                <td>{post.likes.length}</td>
                <td>
                  <FaTrash
                    onClick={() => deleteHandler(post)}
                    color='red'
                    size={'1.2rem'}
                    className=' cursor-pointer'
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

export default Post;
