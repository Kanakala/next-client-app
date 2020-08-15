export interface User {
  name: string;
  _id: string;
  email: string;
}

export interface ArticleType {
  title: string;
  _id: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
}

interface TopicType {
  name: string;
  _id: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  articles: SearchResult;
  publicArticles: SearchResult;
}

export class Topic implements TopicType {}

export class Article implements ArticleType {}

interface SearchResult {
  rows: [TopicType | ArticleType];
  totalCount: number;
  pageInfo: PageInfo;
}

export class SearchResultObj implements SearchResult {}

interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface FilterTopicProps {
  loading: boolean;
  data: SearchResult;
  error: string;
}

export interface TopicProps {
  loading: boolean;
  data: TopicType;
  error: string;
}
