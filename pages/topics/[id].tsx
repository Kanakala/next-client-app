import React from 'react';
import Link from 'next/link';
import _ from 'lodash';
import { Topic, TopicProps } from '../../src/interfaces/interface';
import { GET_TOPIC } from '../../src/graphql/query/topic';
import { TopicCard } from '../../src/components/Card';
import { ArticleList } from '../../src/components/List';
import { withAuthSync } from '../../src/utils/auth';
import { DEFAULT_PAGE_SIZE } from '../../src/config';
import Header from '../../src/components/Header';

const TopicDetail = (props: TopicProps) => {
  const { loading, error, data: topic } = props;

  let message;
  if (loading) message = 'Loading...';
  if (error) message = `Error! ${error}`;
  if (!topic) message = 'No Topic Found';
  if (error) {
    return <div>Error...</div>;
  }

  return (
    <>
      <Header isLogin={true} />
      {props.isAdmin === 'true' && (
        <Link
          href={{
            pathname: `/topics/edit/${topic._id}`,
            query: {
              topic: JSON.stringify({
                name: topic.name,
                description: topic.description,
                _id: topic._id,
              }),
            },
          }}>
          <span
            style={{ padding: '6rem 6rem 0 0' }}
            href={`/topics/edit/${topic._id}`}
            className="addText">
            Edit Topic
          </span>
        </Link>
      )}
      <div className="container">
        {message && <h1 className="heading">{message}</h1>}
        {!message && topic && (
          <>
            <TopicCard
              key={topic._id}
              topic={topic}
              cardType="SINGLE"
              isLogin={true}
            />
            <div className="listContainer">
              <ArticleList data={_.get(topic, 'articles.rows', [])} />
            </div>
          </>
        )}
        <style jsx>
          {`
            .container {
              height: 100%;
              min-height: 50vh;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-flow: column wrap;
            }
            .listContainer {
              display: flex;
              flex-flow: wrap row;
              justify-content: space-evenly;
              align-items: center;
            }
            .heading {
              color: white;
              text-align: center;
              font-size: 5rem;
              padding: 0rem 0 5rem;
            }
          `}
        </style>
        <style jsx global>
          {`
            h1,
            h2 {
              margin: 0;
              font-family: Candara;
            }
            body {
              margin: 0;
              padding: 0;
              height: 100%;
              min-height: 100vh;
              font-family: Candara;
              background: #355c7d;
              background: -webkit-linear-gradient(
                to right,
                #c06c84,
                #6c5b7b,
                #355c7d
              );
              background: linear-gradient(to right, #c06c84, #6c5b7b, #355c7d);
            }
            .addText {
              float: right;
              text-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
              font-size: 2rem;
              cursor: pointer;
              color: #d7d7f3;
            }
            .addText:hover {
              transform: scale(1.1);
            }
          `}
        </style>
      </div>
    </>
  );
};

TopicDetail.getInitialProps = async ctx => {
  try {
    const { id } = ctx.query;
    const pageSize = DEFAULT_PAGE_SIZE;
    const pageNum = parseInt(_.get(ctx, 'query.articlePageNum', 1));
    const { data, loading } = await ctx.apolloClient.query({
      query: GET_TOPIC,
      variables: {
        id,
        articleQuery: {
          pageNum,
          pageSize,
          sortBy: {
            createdAt: 'DESC',
          },
        },
      },
    });
    return {
      data: _.get(data, 'getTopic', new Topic()),
      loading,
    };
  } catch (error) {
    return {
      error: 'Failed to fetch',
    };
  }
};

export default withAuthSync(TopicDetail);
