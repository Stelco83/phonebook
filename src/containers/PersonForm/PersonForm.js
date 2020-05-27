import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import './PersonForm.css';
import { checkEmptyInput } from '../../shared/validation';

const PersonForm = React.memo(props => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [enteredPhoneNumber, setEnteredAmount] = useState('');
  

  const submitHandler = event => {
    event.preventDefault();

    props.onAddPerson({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: enteredPhoneNumber,
      userId : props.userId
    })

    setFirstName('');
    setLastName('');
    setEnteredAmount('');
   
  };



let  checkValidation = checkEmptyInput(firstName);
let  checkValidatioPhone = checkEmptyInput(enteredPhoneNumber);


let inpValueValue=[];
for (const key in checkValidation) { 
  inpValueValue.push(checkValidation[key])  ;    
}

let inpValuePhone=[];
for (const key in checkValidatioPhone) { 
  inpValuePhone.push(checkValidatioPhone[key])  ;    
}

  

  return (
    <section className="person-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="fisrtName"
              value={inpValueValue[0]}
              onChange={(event) => {
                setFirstName(event.target.value)
              }}

              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value)
              }}
            
            />
          </div>

          <div className="form-control">
            <label htmlFor="phone">Phone</label>
            <input type="string" id="phone"
              value={inpValuePhone[0]}
              onChange={(event) => {
                setEnteredAmount(event.target.value)
              }}
              required
              />
          </div>
          <div className="person-form__actions">
            <button
            className="buttonForForm"
              type="submit">Add Person</button>
          </div>
        </form>
      </Card>
    </section>
  );
});



export default PersonForm;
