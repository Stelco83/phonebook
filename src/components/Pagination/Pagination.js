import React from 'react';


const Pagination = ({ personPerPage, totalPerson, paginate, currentPage }) => {
    const pageNumbers = [];


    for (let i = 1; i <= Math.ceil(totalPerson / personPerPage); i++) {
        pageNumbers.push(i);
    }
        
    return (
        <nav>
            <ul className='pagination justify-content-center'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item' >
                        <div onClick={() => paginate(number)} 
                        tabIndex={number}
                         className='page-link list'>
                            {number}
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;

