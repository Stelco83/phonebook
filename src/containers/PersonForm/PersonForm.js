import React, { useState } from 'react';
import Card from '../../components/UI/Card';
import './PersonForm.css';
import { checkEmptyInput } from '../../shared/validation';
import  firebase from '../../firebase';
import { connect } from 'react-redux';


const PersonForm = React.memo(props => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [enteredPhoneNumber, setEnteredAmount] = useState('');
  const [enteredFile, setEnteredFile] = useState(null);
  const [downloadURL, setUrl] = useState(null);


  var currentdate = new Date();
  var datetimeAsID = currentdate.getDate() + "." +
    (currentdate.getMonth() + 1) + "." + currentdate.getFullYear() +
    "@" + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" +
    currentdate.getSeconds();


  const submitHandler = event => {
    event.preventDefault();

    props.onAddPerson({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: enteredPhoneNumber,
      personFile: enteredFile,
      userId: props.userId,
      prsId: datetimeAsID,
      imageUrl : downloadURL
    })

    setFirstName('');
    setLastName('');
    setEnteredAmount('');
    
  };

  
  
  const fileUploadHandler = (event) =>{
    event.preventDefault();
    if(enteredFile !== null && props.isAuthenticated){
      


   
    let filename = enteredFile.name;
    var storageRef = firebase.storage().ref('/personImages/'+ filename);
    var uploadTask = storageRef.put(enteredFile);



    // Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');

}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    setUrl(prevUrl => downloadURL)
    console.log('File available at', downloadURL);
  });
});
    }
      
  }

  let checkValidation = checkEmptyInput(firstName);
  let checkValidatioPhone = checkEmptyInput(enteredPhoneNumber);


  let inpValueValue = [];
  for (const key in checkValidation) {
    inpValueValue.push(checkValidation[key]);
  }

  let inpValuePhone = [];
  for (const key in checkValidatioPhone) {
    inpValuePhone.push(checkValidatioPhone[key]);
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
          <div className="form-control">
            <label htmlFor="file">File</label>
            <input type="file" id="file"
              onChange={(event) => {
                setEnteredFile(event.target.files[0])
              }}

            />
          </div>
          <button
              className="buttonForForm"
              onClick={fileUploadHandler}>Upload</button>

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


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(PersonForm);
