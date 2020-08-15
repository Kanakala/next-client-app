/**
 * Create User Mutation
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import gql from 'graphql-tag';

const CREATE_USER = gql`
  mutation createTopic($input: TopicInput!) {
    createTopic(topicInput: $input) {
      _id
      name
      description
    }
  }
`;

export default CREATE_USER;
