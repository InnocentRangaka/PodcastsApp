import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import supabase from '../supabase/client';
import { setIsLoggedIn } from '../utils/reducers/podcastsReducer';
import { Link, useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  width: 80vw;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  padding: 5rem;
`;
const LoginForm = styled.form`
  margin-top: 2rem;
`;
export const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
`;
export const FormInput = styled.input`
  min-width: 100%;
  height: 2rem;
  background-color: #333;
  color: white;
  border: 1px solid gray;
  border-radius: 0.25rem;
  padding: 1.2rem 0.7rem;
`;
export const FormLabel = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
`;
const Login = () => {
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const { userDataDB, hasAccount, isLoggedIn } = useSelector(
    (state) => state.podcastsReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkIfSignedup = (e) => {
    e.preventDefault();
    userDataDB.map((user) => {
      if (user.userName === userName && user.userPassword === userPassword) {
        navigate('/');
        dispatch(setIsLoggedIn(true));
      } else {
        setIsError(true);
      }
    });
  };
  return (
    <LoginContainer>
      <h1>Log in to the Wave</h1>
      <LoginForm onSubmit={checkIfSignedup}>
        <FormFieldContainer>
          <FormLabel htmlFor="userName">Username</FormLabel>

          <FormInput
            type="text"
            name="userName"
            placeholder="Username"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </FormFieldContainer>
        <FormFieldContainer>
          <FormLabel htmlFor="userPassword">Password</FormLabel>

          <FormInput
            type="password"
            name="userPassword"
            placeholder="Password"
            required
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </FormFieldContainer>
        {isError && (
          <p>
            There is no Wave account that matches details. Please
            <Link to="/signup">sign up</Link> .
          </p>
        )}
        <button>Log In</button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
