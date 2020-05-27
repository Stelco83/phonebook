import React from 'react';
import './PersonList.css';

const PersonList = props => {
  if (props.loading) {
    return <h2 style={{textAlign: "center"}}>Loading...</h2>
  }

  return (
    <section className="person-list">
      <h2>Loaded People</h2>
      <ul className='list-group mb-4'>
        {props.person.map(ig => (
          <li key={ig.id} className='list-group-item' >
            <p>{ig.firstName} {ig.lastName} </p>
            <p>{ig.phoneNumber}</p>
            <p className="del" onClick={props.onRemoveItem.bind(this, ig.id)}>X</p>
          </li>
        ))}
      </ul>


    </section>
  );
};

export default PersonList;
