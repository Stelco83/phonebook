import React, { useState, useEffect, Fragment } from 'react';
import axios from '../../axios-orders';
import { useParams } from 'react-router';


const Details = (props) => {
    const { id } = useParams();
    let userId = (localStorage.getItem('userId'));
    let token = (localStorage.getItem('token'));
    const [person, setPerson] = useState([]);


    useEffect(() => {
        const queryParams =
            '?auth=' + token + '&orderBy="prsId"&equalTo="' + id + '"';

        // + '&orderBy="prsId"&equalTo="' + id + '"'
        const lodadedPerson = [];

        axios.get('/persons.json' + queryParams)
            .then(res => {

                for (const key in res.data) {
                    if (res.data[key].userId === userId) {
                        lodadedPerson.push({
                            id: key,
                            firstName: res.data[key].firstName,
                            lastName: res.data[key].lastName,
                            phoneNumber: res.data[key].phoneNumber,
                            imageUrl : res.data[key].imageUrl
                        })
                    }

                }
                setPerson(lodadedPerson)
            })
    }, [id,token,userId]);

    return (
        <section className="person-list">
            <h2>Person detail info</h2>
            {person.map(ig => (
                <Fragment key={ig.id}>
                    <h3 >Name: {ig.firstName} {ig.lastName}</h3>
                    <h1> Phone: {ig.phoneNumber}</h1>
                    Image:   <img width="100" height="100" src={ig.imageUrl} alt=""/>  
                </Fragment>

            ))}
        </section>
    );


};

export default Details;