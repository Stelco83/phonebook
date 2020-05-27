import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import { checkValidity } from '../../shared/validation';
import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

const Auth = (props) => {

    const [isSignup, setIsSignup] = useState(true);
    const [controls, setControls] = useState({

        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Add E-mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Add Passwrod'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }

    })

    const { authRedirectPath, onSetAuthRedirectPath } = props;
    useEffect(() => {
        if (authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [authRedirectPath, onSetAuthRedirectPath]);

    const inputChanedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value,
                    controls[controlName].validation),
                touched: true
            }
        };
        setControls(updatedControls)
    }

    const formElemestArray = [];

    for (let key in controls) {
        formElemestArray.push({
            id: key,
            config: controls[key]
        })

    };



    let form = formElemestArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            valueType={formElement.id}
            changed={(event) => inputChanedHandler(event, formElement.id)}
        />


    ))

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);

    }


    let errorMessage = null;

    if (props.error) {
        errorMessage = <p>{props.error.message}</p>;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value
            , controls.password.value,
            isSignup
        )
    }


    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />;
    }
    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>Submit</Button>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType='Danger'>Go to {isSignup ? 'sign' : 'login'}</Button>

        </div>
    );
};


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) =>
            dispatch(actions.auth(email, password, isSignup)),

        onSetAuthRedirectPath: () =>
            dispatch(actions.setAuthRederectPath('/'))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);