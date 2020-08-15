/**
 * List Component
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import React from 'react';
import { UserCard, TopicCard, ArticleCard } from './Card';
import { User, Topic, Article } from '../interfaces/interface';

interface ListProps {
  data: [User | Topic];
  img: string;
}

export const UserList: React.SFC<ListProps> = props => {
  return (
    <>
      {props.data.map((user: User) => (
        <UserCard key={user._id} user={user} img={props.img} />
      ))}
      <style jsx>
        {`
          .List:hover {
            transform: scale(1.1);
          }
          h2 {
            font-size: 1rem;
            text-align: right;
          }
          img {
            margin-right: 2rem;
          }
        `}
      </style>
    </>
  );
};

export const TopicList: React.SFC<ListProps> = props => {
  return (
    <>
      {props.data.map((topic: Topic) => (
        <TopicCard
          key={topic._id}
          topic={topic}
          cardType="MULTIPLE"
          isLogin={props.isLogin}
        />
      ))}
      <style jsx>
        {`
          .List:hover {
            transform: scale(1.1);
          }
          h2 {
            font-size: 1rem;
            text-align: right;
          }
          img {
            margin-right: 2rem;
          }
        `}
      </style>
    </>
  );
};

export const ArticleList: React.SFC<ListProps> = props => {
  return (
    <>
      {props.data.map((article: Article) => (
        <ArticleCard key={article._id} article={article} cardType="MULTIPLE" />
      ))}
      <style jsx>
        {`
          .List:hover {
            transform: scale(1.1);
          }
          h2 {
            font-size: 1rem;
            text-align: right;
          }
          img {
            margin-right: 2rem;
          }
        `}
      </style>
    </>
  );
};
