/**
 * Topic List Page
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import React, { useState, useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import { TopicList } from '../../src/components/List';
import { GET_TOPICS } from '../../src/graphql/query/topic';
import {
  FilterTopicProps,
  SearchResultObj,
} from '../../src/interfaces/interface';
import { DEFAULT_PAGE_SIZE } from '../../src/config';
import { withAuthSync } from '../../src/utils/auth';
import Header from '../../src/components/Header';

const Topics = (props: FilterTopicProps) => {
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
    };
  }, []);
  const { loading, error, data, pageNum } = props;
  let message = 'Topics';
  if (loading || isLoading) message = 'Loading...';
  if (error) message = `Error! ${error}`;
  if (!data || (data && data.rows.length <= 0)) message = 'No Topics';
  const pagginationHandler = page => {
    const currentPath = props.router.pathname;
    const currentQuery = { ...props.router.query };
    currentQuery.pageNum = page.selected + 1;

    props.router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };
  return (
    <>
      <Header isLogin={true} />
      {props.isAdmin === 'true' && (
        <a
          style={{ padding: '6rem 6rem 0 0' }}
          href={'/topics/create'}
          className="addText">
          Add Topic
        </a>
      )}
      <div className="container">
        <h1 className="heading">{message}</h1>
        {data && data.rows.length > 0 && (
          <>
            <div className="listContainer">
              <TopicList data={data.rows} isLogin={true} />
            </div>
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              activeClassName={'active'}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              initialPage={pageNum - 1}
              pageCount={Math.ceil(data.totalCount / DEFAULT_PAGE_SIZE)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={pagginationHandler}
            />
          </>
        )}
        <style jsx>
          {`
            .container {
              height: 100%;
              min-height: 100vh;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-flow: column wrap;
            }
            .button-success {
              background: #f18686;
              font-family: serif;
              font-size: 3rem;
              -moz-border-radius: 10px;
              -webkit-border-radius: 10px;
              border: 0px solid #000000;
              box-shadow: 0 20px 30px -16px rgba(9, 9, 16, 0.2);
              transition: transform 0.2s;
            }
            .button-success:hover {
              transform: scale(1.1);
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
              padding: 2rem 0 3rem;
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
            .pagination {
              display: flex;
              list-style: none;
              height: 40px;
              border: 1px solid black;
              border-radius: 5px;
              width: fit-content;
              align-items: center;
              padding: 0;
              margin-top: 40px;
            }
            .pagination li a {
              display: flex;
              align-items: center;
              height: 100%;
              padding: 0 10px;
              cursor: pointer;
            }
            .pagination li a:hover {
              text-decoration: underline;
            }
            .pagination li.active a {
              font-weight: bold;
              text-decoration: underline;
              pointer-events: none;
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

Topics.getInitialProps = async ctx => {
  try {
    const pageNum = parseInt(_.get(ctx, 'query.pageNum', 1));
    const pageSize = DEFAULT_PAGE_SIZE;
    const { data, loading } = await ctx.apolloClient.query({
      query: GET_TOPICS,
      variables: {
        query: {
          filter: {},
          sortBy: {},
          pageNum,
          pageSize,
        },
        articleQuery: {
          filter: {},
          sortBy: {},
          pageNum,
          pageSize,
        },
      },
    });
    return {
      data: _.get(data, 'filterTopics', new SearchResultObj()),
      loading,
      pageNum,
    };
  } catch (error) {
    return {
      error: 'Failed to fetch',
    };
  }
};

export default withAuthSync(withRouter(Topics));
