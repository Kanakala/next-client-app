/**
 * Topic Mutations
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import gql from 'graphql-tag';

const CREATE_TOPIC = gql`
  mutation createTopic($input: TopicInput!) {
    createTopic(topicInput: $input) {
      _id
      name
      description
    }
  }
`;

export const UPDATE_TOPIC = gql`
  mutation updateTopic($input: UpdateTopicDto!) {
    updateTopic(topicInput: $input) {
      _id
      name
      description
    }
  }
`;

export default CREATE_TOPIC;
