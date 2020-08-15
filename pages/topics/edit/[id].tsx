/**
 * Create Topic
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import React from 'react';
import _ from 'lodash';
import Router, { withRouter } from 'next/router';
import { toast } from 'react-toastify';
import { ApolloConsumer } from 'react-apollo';
import Footer from '../../../src/components/Footer';
import { UPDATE_TOPIC } from '../../../src/graphql/mutation/topic';
import { withAuthSync } from '../../../src/utils/auth';
import Header from '../../../src/components/Header';
import { setTokenInRequest } from '../../../src/configureClient';
import SimpleReactFileUpload from '../../../src/components/ImageUpload';
import { HTTP_SERVER } from '../../../src/config';

interface UpdateState {
  [key: string]: any;
  _id: string;
  name: string;
  description: string;
}

class UpdateTopic extends React.PureComponent<any, UpdateState> {
  constructor(props) {
    const { topic: topicString } = _.get(props, 'router.query');
    let topic = {};
    try {
      topic = JSON.parse(topicString);
    } catch (err) {
      console.log(`err: ${err}`);
    }
    const { _id, name, description } = topic;
    super(props);
    this.state = {
      _id,
      name,
      description,
    };
  }

  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event, token, client) => {
    try {
      setTokenInRequest(token);
      event.preventDefault();
      const { state } = this;
      await client.mutate({
        mutation: UPDATE_TOPIC,
        variables: {
          input: { ...state },
        },
        context: {
          headers: {
            authorization: token || 'asd',
          },
        },
      });
      toast.success('Topic Updated');
      Router.push(`/topics/${state._id}`);
    } catch (error) {
      toast.error('Check your connection');
    }
  };
  render() {
    const { state } = this;
    return (
      <ApolloConsumer>
        {client => (
          <>
            <Header isLogin={true} />

            <div className="container">
              <h1 className="heading">Update Topic</h1>
              <SimpleReactFileUpload
                style={{ position: 'absolute', padding: '7rem 0 0 60rem' }}
                url={`${HTTP_SERVER}/topic/upload?id=${state._id}`}
                token={this.props.token}
              />

              <form
                onSubmit={event =>
                  this.handleSubmit(event, this.props.token, client)
                }
                className="create-form">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={state.name}
                  onChange={this.handleChange}
                  className="create-input-box"
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={state.description}
                  onChange={this.handleChange}
                  className="create-input-box"
                />
                <input type="submit" value="Submit" className="create-button" />
              </form>
              <Footer />
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
                  .heading {
                    color: white;
                    text-align: center;
                    font-size: 5rem;
                    padding: 5rem 0rem;
                  }
                  form {
                    display: flex;
                    flex-flow: column wrap;
                    justify-content: center;
                    align-items: center;
                  }
                  .create-input-box {
                    background-color: white;
                    border-radius: 14px 0px 14px 1px;
                    -moz-border-radius: 14px 0px 14px 1px;
                    -webkit-border-radius: 14px 0px 14px 1px;
                    border: 0px solid #000000;
                    box-shadow: 0 20px 30px -16px rgba(9, 9, 16, 0.2);
                    border: 0;
                    width: 15rem;
                    padding: 0.5rem;
                    height: 2rem;
                    margin-bottom: 2rem;
                    font-family: Candara;
                  }
                  .create-button {
                    background-color: white;
                    border-radius: 14px 0px 14px 1px;
                    -moz-border-radius: 14px 0px 14px 1px;
                    -webkit-border-radius: 14px 0px 14px 1px;
                    border: 0px solid #000000;
                    box-shadow: 0 20px 30px -16px rgba(9, 9, 16, 0.2);
                    width: 15rem;
                    font-size: 0.9rem;
                    padding: 0.5rem;
                    height: 3rem;
                    margin: 2rem;
                    font-family: Candara;
                    transition: transform 0.2s;
                    cursor: pointer;
                  }
                  .create-button:hover {
                    transform: scale(1.1);
                    background: #355c7d;
                    background: -webkit-linear-gradient(
                      to right,
                      #c06c84,
                      #6c5b7b,
                      #355c7d
                    );
                    background: linear-gradient(
                      to right,
                      #c06c84,
                      #6c5b7b,
                      #355c7d
                    );
                    color: white;
                  }
                  input:focus {
                    outline: none;
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
                    background: linear-gradient(
                      to right,
                      #c06c84,
                      #6c5b7b,
                      #355c7d
                    );
                  }
                `}
              </style>
            </div>
          </>
        )}
      </ApolloConsumer>
    );
  }
}

export default withAuthSync(withRouter(UpdateTopic), true);
