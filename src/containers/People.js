import React, { useState, useEffect ,useCallback} from 'react';
import PersonList from '../components/PeopleInfo/PersonList';
import PersonForm from '../containers/PersonForm/PersonForm';
import Search from '../components/PeopleInfo/Search';
import Pagination from '../components/Pagination/Pagination';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';
import axios from '../axios-orders';

const People = (props) => {

  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [personPerPage] = useState(3);
  let userId =(localStorage.getItem('userId'));
  let token =(localStorage.getItem('token'));
   
  
  const addPersonHandler =  (person) => {

    axios.post('/persons.json?auth=' + props.token, person)
      .then(res => {
        setPerson(prevPers => [...prevPers, { userId:props.userId, id: res.data.name, ...person }])
      })   

  }

  const onRemoveItem = (personId) => {

    axios.delete('persons/' + personId + '.json')

    setPerson(prevIng =>
      prevIng.filter(person => person.id !== personId))
  }


 const filterPersonsHandler = useCallback((filtredPerson) =>{
   setPerson(filtredPerson)
 },[]) 

  const paginate = (personNumber) => {
    setCurrentPage(personNumber)
  }

  const indexOfLastperson = currentPage * personPerPage;
  const indexOfFirstPreson = indexOfLastperson - personPerPage;
  const currentPersons = person.slice(indexOfFirstPreson, indexOfLastperson);


  return (
    <div className="App">
      <Toolbar isAuthenticated={props.isAuthenticated} 
        userEmail={props.userEmail}
      />
      <PersonForm onAddPerson={addPersonHandler} userId={props.userId} />

      <section>
        <Search onFilter={filterPersonsHandler} />
        <PersonList loading={loading} person={currentPersons}
          onRemoveItem={onRemoveItem}
        />
        <Pagination personPerPage={personPerPage}
          totalPerson={person.length}
          paginate={paginate}
          currentPage={currentPage}
        />

      </section>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    isAuthenticated: state.auth.token !== null,
    userEmail : state.auth.email
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     onAddPerson: (personData) =>
//       dispatch(actions.addPerson(personData))

//     // onFetchPerson: () =>
//     // dispatch(actions.fetchPerson())  
//   };
// };

export default connect(mapStateToProps)(People)
