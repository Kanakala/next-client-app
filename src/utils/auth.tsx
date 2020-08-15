/**
 * Auth Middlerware Component
 * @author Sumanth Kanakala <kanakala.sumanth@gmail.com>
 */

import * as React from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import { setTokenInRequest } from '../configureClient';

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component';

export const auth = (ctx, isAdminCompn = false) => {
  const { token, isAdmin } = nextCookie(ctx);

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return;
  }

  if (!token) {
    Router.push('/');
  }

  if (isAdminCompn === true && (!isAdmin || isAdmin !== 'true')) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return;
  }

  return { token, isAdmin };
};

export const withAuthSync = (WrappedComponent, isAdminCompn = false) =>
  class extends React.Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const { token, isAdmin } = auth(ctx, isAdminCompn);
      await setTokenInRequest(token);
      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      return { ...componentProps, token, isAdmin };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
