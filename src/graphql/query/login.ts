/**
 * Login user query
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import gql from 'graphql-tag';

const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      expiresIn
      accessToken
      roles {
        name
        enabled
      }
    }
  }
`;

export default LOGIN_USER;
