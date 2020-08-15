/**
 * Main Page
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import React from 'react';
import Link from 'next/link';
import Footer from '../src/components/Footer';
import Login from '../src/components/Login';

const Home: React.SFC = () => {
  return (
    <div className="mainContainer">
      <Link href={'/public/topics'} as={'/public/topics'}>
        <h1 className="publicTopicHeading">Topics</h1>
      </Link>
      <div className="container">
        <h1 className="heading">Welcome</h1>
        <Login />
      </div>
      <Footer />
      <style jsx>
        {`
          .mainContainer {
            height: 100%;
            min-height: 100vh;
            width: 100%;
          }
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: row wrap;
            padding: 8rem 0rem !important;
          }
          .heading {
            color: white;
            text-align: center;
            font-size: 5rem;
            padding: 2rem;
          }
          .publicTopicHeading {
            color: white;
            position: relative;
            font-size: 5rem;
            padding: 2rem 0 2rem 50rem;
            -moz-border-radius: 14px 0px 14px 1px;
            -webkit-border-radius: 14px 0px 14px 1px;
            border: 0px solid #000000;
            box-shadow: 0 20px 30px -16px rgba(9, 9, 16, 0.2);
            transition: transform 0.2s;
            cursor: pointer;
          }
          .publicTopicHeading:hover {
            transform: scale(1.1);
          }
          @media only screen and (max-width: 740px) {
            .container {
              padding: 3rem 0rem !important;
            }
          }
        `}
      </style>
      <style jsx global>
        {`
          h1,
          h2 {
            margin: 0;
            font-family: Candara;
          }
          body {
            margin: 0;
            padding: 0;
            height: 100%;
            min-height: 100vh;
            font-family: Candara;
            background: #355c7d;
            background: -webkit-linear-gradient(
              to right,
              #c06c84,
              #6c5b7b,
              #355c7d
            );
            background: linear-gradient(to right, #c06c84, #6c5b7b, #355c7d);
          }
        `}
      </style>
    </div>
  );
};

export default Home;
