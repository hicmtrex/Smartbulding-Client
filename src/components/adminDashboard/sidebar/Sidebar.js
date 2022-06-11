import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import UserManagement from '../userManagement/UserManagement';
import Post from '../postManagement/Post';
import CategoryManagement from '../categoryManagement/CategoryManagement';
import { Navbar, Container, Button, Image, Nav } from 'react-bootstrap';
import { HiUsers } from 'react-icons/hi';

const Sidebar = () => {
  const [adminMenu, setAdminMenu] = useState(1);

  return (
    <>
      <div className='d-flex flex-column flex-lg-row bg-surface-secondary h-screen'>
        <Navbar
          expand='lg'
          style={{ backgroundColor: 'rgba(22, 34, 57, 0.95)' }}
          variant='dark'
          className=' show navbar-vertical  px-0 py-3  border-bottom border-bottom-lg-0 '
          id='navbarVertical'
        >
          <Container fluid>
            <Button
              className='navbar-toggler ms-n2'
              data-bs-toggle='collapse'
              data-bs-target='#sidebarCollapse'
              aria-controls='sidebarCollapse'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon' />
            </Button>
            <Link
              className='navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0 d-flex align-items-center'
              to='/'
            >
              <span className='logo text-white'>
                <Image src='icon-web-01.png' className='avatar' />
              </span>
            </Link>

            <div className='collapse navbar-collapse' id='sidebarCollapse'>
              <ul className='navbar-nav'>
                <li className='nav-item '>
                  <Link
                    className='nav-link p-5'
                    to='#'
                    onClick={() => setAdminMenu(1)}
                  >
                    <HiUsers className='me-2' size={'1.5rem'} /> Users
                    Management
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link
                    className='nav-link p-5'
                    to='#'
                    onClick={() => setAdminMenu(2)}
                  >
                    <HiUsers className='me-2' size={'1.5rem'} /> Posts
                    Management
                  </Link>
                </li>
                <li className='nav-item '>
                  <Link
                    className='nav-link p-5'
                    to='#'
                    onClick={() => setAdminMenu(3)}
                  >
                    <HiUsers className='me-2' size={'1.5rem'} /> Category
                    Management
                  </Link>
                </li>
              </ul>
              <hr className='navbar-divider my-5 opacity-20' />
              <div className='' />
              {/* <ul className='navbar-nav'>
                <li className='nav-item'>
                  <Link to={`/profile/`}>
                    <Nav.Link>
                      <i className='bi bi-person-square' /> Mon Compte
                    </Nav.Link>
                  </Link>
                </li>
                <li className='nav-item'>
                  <Nav.Link>
                    <i className='bi bi-box-arrow-left' /> Se déconnecte
                  </Nav.Link>
                </li>
              </ul> */}
            </div>
          </Container>
        </Navbar>
        {adminMenu === 1 && <UserManagement />}
        {adminMenu === 2 && <Post />}
        {adminMenu === 3 && <CategoryManagement />}
      </div>
    </>
  );
};

export default Sidebar;
