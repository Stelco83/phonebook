import React, { useState ,useCallback} from 'react';
import PersonList from '../components/PeopleInfo/PersonList';
import PersonForm from '../containers/PersonForm/PersonForm';
import Search from '../components/PeopleInfo/Search';
import Pagination from '../components/Pagination/Pagination';
import Toolbar from '../components/Navigation/Toolbar/Toolbar';
import { connect } from 'react-redux';
import axios from '../axios-orders';

const People = (props) => {

  const [person, setPerson] = useState([]);
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [personPerPage] = useState(3);
  const [personId, setPersonId] = useState('');

  


  const addPersonHandler =  (person) => {
    axios.post('/persons.json?auth=' + props.token, person)
      .then(res => {
        setPerson(prevPers => [...prevPers,
           { userId:props.userId, id: res.data.name, ...person }])                     
      })   
  }
 
  const onRemoveItem = (personId) => {
    axios.delete('persons/' + personId + '.json')
    setPerson(prevIng =>
      prevIng.filter(person => person.id !== personId))
  }

  const onCheckDetails = (prsnId) => {
    setPersonId(prevPersonId => prsnId)
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
      <PersonForm onAddPerson={addPersonHandler} userId={props.userId}
      person={personId}
      />

      <section>
        <Search onFilter={filterPersonsHandler} />
        <PersonList loading={loading} person={currentPersons}
          onRemoveItem={onRemoveItem} onCheckDetails={onCheckDetails}
      
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
