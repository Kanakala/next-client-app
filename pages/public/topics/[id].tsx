import React from 'react';
import _ from 'lodash';
import { Topic, TopicProps } from '../../../src/interfaces/interface';
import { GET_TOPIC_PUBLICLY } from '../../../src/graphql/query/topic';
import { TopicCard } from '../../../src/components/Card';
import { ArticleList } from '../../../src/components/List';
import { DEFAULT_PAGE_SIZE } from '../../../src/config';
import Header from '../../../src/components/Header';

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
      <Header isLogin={false} />
      <div className="container">
        {message && <h1 className="heading">{message}</h1>}
        {!message && topic && (
          <>
            <TopicCard
              key={topic._id}
              topic={topic}
              cardType="SINGLE"
              isLogin={false}
            />
            <div className="listContainer">
              <ArticleList data={_.get(topic, 'publicArticles.rows', [])} />
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
      query: GET_TOPIC_PUBLICLY,
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
      data: _.get(data, 'getPublicTopic', new Topic()),
      loading,
    };
  } catch (error) {
    return {
      error: 'Failed to fetch',
    };
  }
};

export default TopicDetail;
