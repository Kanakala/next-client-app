/**
 * Card Component
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import React from 'react';
import Link from 'next/link';
import _ from 'lodash';
import { User, Topic, Article } from '../interfaces/interface';

interface CardProps {
  title: string;
  href: string;
}

interface UserCardProps {
  user: User;
  img: string;
}

interface TopicCardProps {
  topic: Topic;
  cardType: 'SINGLE' | 'MULTIPLE';
  isLogin: boolean;
}

interface ArticleCardProps {
  article: Article;
}

const Card: React.SFC<CardProps> = props => {
  return (
    <Link href={props.href}>
      <div className="card">
        <h2>{props.title}</h2>
        <style jsx>
          {`
            .card {
              display: flex;
              height: 5rem;
              width: 20rem;
              justify-content: center;
              padding: 2rem;
              align-self: stretch;
              align-items: center;
              background-color: white;
              margin: 2rem;
              border-radius: 14px 0px 14px 1px;
              -moz-border-radius: 14px 0px 14px 1px;
              -webkit-border-radius: 14px 0px 14px 1px;
              border: 0px solid #000000;
              box-shadow: 0 20px 30px -16px rgba(9, 9, 16, 0.2);
              transition: transform 0.2s;
              cursor: pointer;
            }
            .card:hover {
              transform: scale(1.1);
            }
            h2 {
              font-size: 2rem;
            }
          `}
        </style>
      </div>
    </Link>
  );
};

export const UserCard: React.SFC<UserCardProps> = props => {
  return (
    <div key={props.user._id} className="listCard">
      <img src={props.img} alt="user" height="90" />
      <div className="userCardDetails">
        <h2>{props.user.name}</h2>
        <h2>{props.user.email}</h2>
      </div>
      <style jsx>
        {`
          .listCard {
            display: flex;
            flex-flow: wrap row;
            justify-content: space-between;
            padding: 2rem;
            -webkit-align-self: stretch;
            align-self: stretch;
            align-items: center;
            background-color: white;
            margin: 2rem;
            width: 20rem;
            border-radius: 14px 0px 14px 1px;
            -moz-border-radius: 14px 0px 14px 1px;
            -webkit-border-radius: 14px 0px 14px 1px;
            border: 0px solid #000000;
            box-shadow: 0 20px 30px -16px rgba(9, 9, 16, 0.2);
            transition: transform 0.2s;
          }
          .userCardDetails {
            display: flex;
            flex-flow: wrap column;
            justify-content: space-between;
            align-items: flex-end;
            height: 3rem;
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
    </div>
  );
};

export const TopicCard: React.SFC<TopicCardProps> = props => {
  const image = _.get(props, 'topic.imageUrl', '');
  const imageUrl = image || 'user.png';
  const srcValue = {
    src: `http://localhost:5758/${imageUrl}`,
  };
  return (
    <Link
      href={
        props.isLogin === true
          ? `/topics/${props.topic._id}`
          : `/public/topics/${props.topic._id}`
      }
      as={
        props.isLogin === true
          ? `/topics/${props.topic._id}`
          : `/public/topics/${props.topic._id}`
      }>
      <div
        key={props.topic._id}
        className={props.cardType === 'MULTIPLE' ? 'listCard' : 'singleCard'}>
        {(props.cardType === 'MULTIPLE' && (
          <img {...srcValue} alt="new" height="90" />
        )) || <img {...srcValue} alt="new" height="90" />}
        {props.cardType === 'SINGLE' && (
          <h2 style={{ fontSize: '2rem' }}>{props.topic.name}</h2>
        )}
        <div className="topicCardDetails">
          {props.cardType === 'MULTIPLE' && <h2>{props.topic.name}</h2>}
          <h2>{props.topic.description}</h2>
          <h2>
            Articles:{' '}
            {props.isLogin === true
              ? _.get(props, 'topic.articles.totalCount', null)
              : _.get(props, 'topic.publicArticles.totalCount', null)}
          </h2>
        </div>
        <style jsx>
          {`
            .singleCard {
              display: flex;
              flex-flow: wrap row;
              justify-content: space-between;
              padding: 2rem;
              align-items: center;
              background-color: white;
              margin: 2rem;
              width: 30rem;
              border-radius: 14px 0px 14px 1px;
              -moz-border-radius: 14px 0px 14px 1px;
              -webkit-border-radius: 14px 0px 14px 1px;
              border: 0px solid #000000;
              box-shadow: 0 20px 30px -16px rgba(9, 9, 16, 0.2);
              transition: transform 0.2s;
            }
            .listCard {
              display: flex;
              flex-flow: wrap row;
              justify-content: space-between;
              padding: 2rem;
              -webkit-align-self: stretch;
              align-self: stretch;
              align-items: center;
              background-color: white;
              margin: 2rem;
              width: 20rem;
              border-radius: 14px 0px 14px 1px;
              -moz-border-radius: 14px 0px 14px 1px;
              -webkit-border-radius: 14px 0px 14px 1px;
              border: 0px solid #000000;
              box-shadow: 0 20px 30px -16px rgba(9, 9, 16, 0.2);
              transition: transform 0.2s;
              cursor: pointer;
            }
            .listCard:hover {
              transform: scale(1.1);
            }
            .topicCardDetails {
              display: flex;
              flex-flow: wrap column;
              justify-content: space-between;
              align-items: flex-end;
              height: 4rem;
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
      </div>
    </Link>
  );
};

export const ArticleCard: React.SFC<ArticleCardProps> = props => {
  return (
    <Link
      href={`/articles/${props.article._id}`}
      as={`/articles/${props.article._id}`}>
      <div
        key={props.article._id}
        className={props.cardType === 'MULTIPLE' ? 'listCard' : 'singleCard'}>
        <img src="http://localhost:5758/user.png" alt="new" height="90" />
        <div className="articleCardDetails">
          <h2>{props.article.title}</h2>
          <h2>{props.article.content}</h2>
        </div>
        <style jsx>
          {`
            .singleCard {
              display: flex;
              flex-flow: wrap row;
              justify-content: space-between;
              padding: 2rem;
              align-items: center;
              background-color: white;
              margin: 2rem;
              width: 20rem;
              border-radius: 14px 0px 14px 1px;
              -moz-border-radius: 14px 0px 14px 1px;
              -webkit-border-radius: 14px 0px 14px 1px;
              border: 0px solid #000000;
              box-shadow: 0 20px 30px -16px rgba(9, 9, 16, 0.2);
              transition: transform 0.2s;
            }
            .listCard {
              display: flex;
              flex-flow: wrap row;
              justify-content: space-between;
              padding: 2rem;
              -webkit-align-self: stretch;
              align-self: stretch;
              align-items: center;
              background-color: white;
              margin: 2rem;
              width: 20rem;
              border-radius: 14px 0px 14px 1px;
              -moz-border-radius: 14px 0px 14px 1px;
              -webkit-border-radius: 14px 0px 14px 1px;
              border: 0px solid #000000;
              box-shadow: 0 20px 30px -16px rgba(9, 9, 16, 0.2);
              transition: transform 0.2s;
              cursor: pointer;
            }
            .listCard:hover {
              transform: scale(1.1);
            }
            .articleCardDetails {
              display: flex;
              flex-flow: wrap column;
              justify-content: space-between;
              align-items: flex-end;
              height: 4rem;
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
      </div>
    </Link>
  );
};

export default Card;
