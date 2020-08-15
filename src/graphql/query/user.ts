/**
 * Get all users query
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import gql from 'graphql-tag';

const GET_USERS = gql`
  {
    users {
      name
      _id
      email
    }
  }
`;

export default GET_USERS;
