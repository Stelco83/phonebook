import React from 'react';
import classes from './Toolbar.module.css';
import { NavLink } from 'react-router-dom';
import Logo from '../../Logo/Logo';


const Toolbar = (props) => {

    let welcome =  <NavLink to='/auth' >Authenticate</NavLink>;

    if (props.isAuthenticated){
       welcome =
      (<React.Fragment>
          Hello {props.userEmail}  <NavLink to='/logout' >Logout</NavLink>
      </React.Fragment>  )
    }

    return(    
    
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <ul>
               {welcome}
            </ul>

        </nav>

    </header>)

            };

export default Toolbar;