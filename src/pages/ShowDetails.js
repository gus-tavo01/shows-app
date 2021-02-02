import React from "react";
import { useParams } from 'react-router-dom';

export default function ShowDetails (props) {
  const { id } = useParams();
  return <div>
    <h2>Show details</h2>
    <p>id: { id }</p>
    <p>show name: { props.name }</p>
    <p>description: {props.description}</p>
  </div>;
}