import React from 'react';
import '../main/Main.css';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from '../../UserCard';
import LoadIcon from '../../../images/loading.gif';
import { deleteUser } from '../../../redux/actions/profileAction';
import { Button, Card, Container, Form, Image, Table } from 'react-bootstrap';
import { FaTrash, FaUserCog } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const UserManagement = () => {
  const { auth, user, suggestions, socket } = useSelector((state) => state);
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteUser = (u) => {
    dispatch(deleteUser(u, auth, socket));
    setRefresh((prev) => (prev = !prev));
  };

  const getUsersList = async () => {
    try {
      const res = await axios.get('/api/users', {
        headers: {
          Authorization: `${auth.token}`,
        },
      });

      if (res.data) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUsersList();
  }, [refresh]);

  return (
    <Container className='my-3 w-screen'>
      <Card className='shadow border-0 mb-2 '>
        <Card.Header className='card-header d-flex bg-red-600  justify-content-between'>
          <h5 className='mb-0 text-white'>Liste des Users </h5>
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
                <span>email</span>
              </th>
              <th scope='col'>
                <span>Gender</span>
              </th>

              <th scope='col'>
                <span>createdAt</span>
              </th>
              <th scope='col'>
                <FaTrash size={'1.2rem'} />
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  <Image className='avatar' roundedCircle src={u.avatar} />
                </td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.gender}</td>
                <td>{new Date(u.createdAt).toLocaleDateString('en')}</td>
                <td>
                  <FaTrash
                    onClick={() => handleDeleteUser(u)}
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

    // <div className=''>
    //   <div className='main__container'>
    //     <div className='mt-3 '>
    //       <div className=' justify-content-between align-items-center my-2'>
    //         {suggestions.loading ? (
    //           <img
    //             src={LoadIcon}
    //             alt='loading'
    //             className='d-block mx-auto my-4'
    //           />
    //         ) : (
    //           <div className='user  '>
    //             {suggestions.users.map((user) => (
    //               <UserCard key={user._id} user={user}>
    //                 {
    //                   <div className='dropdown-item' onClick={handleDeleteUser}>
    //                     <span className='material-icons'>delete_outline</span>
    //                   </div>
    //                 }
    //               </UserCard>
    //             ))}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default UserManagement;
