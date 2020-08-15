/**
 * Login user query
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import gql from 'graphql-tag';

export const GET_TOPICS_PUBLICLY = gql`
  query filterTopicsPublicly(
    $query: TopicQueryInput!
    $articleQuery: ArticleQueryInput!
  ) {
    filterTopicsPublicly(query: $query) {
      rows: results {
        ... on Topic {
          _id
          name
          description
          imageUrl
          createdAt
          updatedAt
          publicArticles(query: $articleQuery) {
            totalCount
          }
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_TOPIC_PUBLICLY = gql`
  query getPublicTopic($id: String!, $articleQuery: ArticleQueryInput!) {
    getPublicTopic(_id: $id) {
      _id
      name
      description
      imageUrl
      publicArticles(query: $articleQuery) {
        rows: results {
          ... on Article {
            _id
            title
            content
            isFeatured
            imageUrl
            createdAt
            updatedAt
          }
        }
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;
