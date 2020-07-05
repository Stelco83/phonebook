import React from 'react';
import './PersonList.css';
import { NavLink } from 'react-router-dom';

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
            <NavLink    
            onClick={props.onCheckDetails.bind(this, ig.prsId)}         
            to={`/details/${ig.prsId}`}>{ig.firstName} {ig.lastName}</NavLink>
            <p>{ig.phoneNumber}</p>
            <p className="del" onClick={props.onRemoveItem.bind(this, ig.id)}>X</p>
          </li>
        ))}
      </ul>


    </section>
  );
};

export default PersonList;
