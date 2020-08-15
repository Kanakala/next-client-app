/**
 * Create Topic
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import React from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import Footer from '../../src/components/Footer';
import { Mutation } from '@apollo/react-components';
import CREATE_TOPIC from '../../src/graphql/mutation/topic';
import { withAuthSync } from '../../src/utils/auth';
import Header from '../../src/components/Header';
import { setTokenInRequest } from '../../src/configureClient';

interface CreateState {
  [key: string]: any;
  name: string;
  description: string;
}

class TopicCreate extends React.PureComponent<any, CreateState> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (createTopic, event, token) => {
    try {
      setTokenInRequest(token);
      event.preventDefault();
      const { state } = this;
      await createTopic({
        variables: {
          input: { ...state },
        },
      });
      toast.success('Topic Created');
      Router.push('/topics');
    } catch (error) {
      toast.error('Check your connection');
    }
  };
  render() {
    const { state } = this;
    return (
      <>
        <Header isLogin={true} />
        <div className="container">
          <h1 className="heading">Create Toic</h1>
          <Mutation mutation={CREATE_TOPIC}>
            {createTopic => (
              <form
                onSubmit={event =>
                  this.handleSubmit(createTopic, event, this.props.token)
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
            )}
          </Mutation>
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
    );
  }
}

export default withAuthSync(TopicCreate, true);
