/**
 * Footer Component
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import React from 'react';
import Link from 'next/link';
import { destroyToken } from '../configureClient';

const Header: React.SFC<any> = props => {
  const handleLogout = async () => {
    await destroyToken();
  };
  return (
    <header className="header">
      <div className="header-text-container">
        {(props.isLogin === true && (
          <>
            <Link href={'/topics'} as={'/topics'}>
              <a href={'/topics'} className="homeText">
                Home
              </a>
            </Link>
            <Link href={'/'} as={'/'}>
              <a href={'/'} onClick={() => handleLogout()} className="logout">
                Logout
              </a>
            </Link>
          </>
        )) || (
          <>
            <Link href={'/public/topics'} as={'/public/topics'}>
              <a href={'/public/topics'} className="homeText">
                Home
              </a>
            </Link>
            <Link href={'/'} as={'/'}>
              <a href={'/'} className="logout">
                Login
              </a>
            </Link>
          </>
        )}
      </div>
      <style jsx>
        {`
          .header {
            color: rgba(255, 255, 255, 0.5);
            margin-top: auto !important;
          }
          .header-text-container {
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.5;
            text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.5);
            color: rgba(255, 255, 255, 0.5);
          }
          a {
            text-decoration: none;
            color: white;
          }
          .homeText {
            float: left;
            text-shadow: 0 0.5rem 0.4rem rgba(0, 0, 0, 0.5);
            font-size: 4rem;
            padding: 2rem 0 0 7rem;
            position: absolute;
            cursor: pointer;
          }
          .homeText:hover {
            transform: scale(1.1);
          }
          .logout {
            float: right;
            text-shadow: 0 0.5rem 0.4rem rgba(0, 0, 0, 0.5);
            font-size: 2rem;
            padding: 2rem 7rem 0 0;
            position: relative;
            cursor: pointer;
          }
          .logout:hover {
            transform: scale(1.1);
          }
        `}
      </style>
    </header>
  );
};

export default Header;
