import React from 'react';
import LeftSide from '../../components/message/LeftSide';
import { Container } from 'react-bootstrap';
const Message = () => {
  return (
    <Container className='py-3'>
      <div className='message d-flex'>
        <div className='col-md-4 border-right px-0'>
          <LeftSide />
        </div>

        <div className='col-md-8 px-0 right_mess'>
          <div
            className='d-flex justify-content-center 
                align-items-center flex-column h-100'
          >
            <i
              className='fab fa-facebook-messenger text-primary'
              style={{ fontSize: '5rem' }}
            />
            <h4>Messenger</h4>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Message;
