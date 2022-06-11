import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Search from './Search';

const Header = () => {
  return (
    <div className='header'>
      <nav className='navbar navbar-expand-lg navbar-light bg-white px-0 py-3 shadow'>
        <div className='container-xl'>
          {/* Logo */}
          <a className='navbar-brand' href='#'>
            <Link to='/' className='logo'>
              <div
                className='navbar-brand '
                onClick={() => window.scrollTo({ top: 0 })}
              >
                <h2>
                  {' '}
                  <em>
                    {' '}
                    <span className='text-danger'>Smart</span> Building
                  </em>
                </h2>
              </div>
            </Link>
          </a>
          {/* Navbar toggle */}
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarCollapse'
            aria-controls='navbarCollapse'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          {/* Collapse */}
          <div className='collapse navbar-collapse' id='navbarCollapse'>
            {/* Nav */}
            <div className='navbar-nav mx-lg-auto'>
              {' '}
              <Search />{' '}
            </div>
            {/* Right navigation */}
            <div className='navbar-nav ms-lg-4'>
              <Menu />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
