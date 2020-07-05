import React, { useState, useEffect, useRef } from 'react';
import axios from '../../axios-orders';
import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const [searchInput, setSearchInput] = useState('');
  let userId = (localStorage.getItem('userId'));
  let token = (localStorage.getItem('token'));
  const inputRef = useRef();
  const { onFilter } = props;


  useEffect(() => {
    const timer = setTimeout(() => {

      if (searchInput === inputRef.current.value) {

        const queryParams =
          searchInput.length === 0 ? '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
            : `?auth=${token}"&orderBy="firstName"&equalTo="${searchInput}"`;
        axios.get('/persons.json' + queryParams)
          .then(res => {
            const lodadedPerson = [];
            for (const key in res.data) {
              if (res.data[key].userId === userId) {
                lodadedPerson.push({
                  id: key,
                  firstName: res.data[key].firstName,
                  lastName: res.data[key].lastName,
                  phoneNumber: res.data[key].phoneNumber,
                  prsId :res.data[key].prsId,
                  file : res.data[key].personFile
                })
              }

            }
            onFilter(lodadedPerson)
          })
      }

    }, 1000)
    return ()=> {
      clearTimeout(timer);
    }

  }, [searchInput, onFilter, token, userId]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Name</label>
          <input type="text"
            ref={inputRef}
            value={searchInput}
            onChange={(e) => { setSearchInput(e.target.value) }}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
