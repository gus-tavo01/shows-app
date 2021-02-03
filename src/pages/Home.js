import React, { Fragment } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export default function Home(props) {
  const { url } = useRouteMatch();
  return <Fragment>
    <h2>Hello home page</h2>
  </Fragment>;
}