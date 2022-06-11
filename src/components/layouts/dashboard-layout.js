import React, { Fragment } from 'react';
import Sidebar from '../adminDashboard/sidebar/Sidebar';
import { Container } from 'react-bootstrap';
import Header from '../header/Header';

const DashboardLayout = ({ children }) => {
  return (
    <Fragment>
      <div className='d-flex flex-column flex-lg-row bg-surface-secondary'>
        <Sidebar />
        <div style={{ minHeight: '100vh' }} className=' flex-grow-1 '>
          <main className=' bg-surface-secondary'>
            <Container fluid>{children}</Container>
          </main>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
