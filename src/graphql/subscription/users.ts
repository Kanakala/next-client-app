/**
 * New user added subscription
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import gql from 'graphql-tag';

const USER_ADDED = gql`
  subscription {
    userAdded {
      name
      _id
      email
    }
  }
`;

export default USER_ADDED;
