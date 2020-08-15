/**
 * Update user mutation
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import gql from 'graphql-tag';

const UPDATE_USER = gql`
  mutation updateUser($updateUser: UpdateUser) {
    updateUser(updateUser: $updateUser) {
      _id
      name
      email
    }
  }
`;

export default UPDATE_USER;
