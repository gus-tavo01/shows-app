import React, { Fragment } from 'react';

export default function Home(props) {
  return <Fragment>
    <h2>Home page</h2>
    <br />
    <p>Tecnologias usadas para desarrollar esta app.</p>

    <ul>
      <li>React</li>
      <li>Redux</li>
      <li>Material ui</li>
      <li>Axios</li>
      <li>Jest</li>
    </ul>
    <p>Usar el menu de la aplicacion para navegar.</p>
  </Fragment>;
}