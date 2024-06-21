import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import {
  setUserData,
  resetUserDataForm,
  setHasAccount,
  setUserDataFromDB,
} from '../utils/reducers/podcastsReducer';

import supabase from '../supabase/client';
import { useDispatch, useSelector } from 'react-redux';

const SignupPage = styled.section`
  background-color: #fff;
  min-width: 100vw;
  min-height: 100vh;
  padding: 5rem 2rem;
`;

const SignupContainer = styled.div`
  width: 80vw;
  margin: 0 auto;
  text-align: center;
  color: #000;
`;
const SignupForm = styled.form`
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

  border: 1px solid gray;
  border-radius: 0.25rem;
  padding: 1.2rem 0.7rem;
`;
export const FormLabel = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
`;

const NameParagraph = styled.p`
  font-size: 0.7rem;
`;

const Signup = () => {
  const [isError, setIsError] = useState(false);

  const { userData, userDataDB, hasAccount } = useSelector(
    (state) => state.podcastsReducer
  );
  const { userEmail, userName, userPassword } = userData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    console.log('running createUser');
    const { data, error } = await supabase
      .from('user_login_data')
      .insert([{ userName, userEmail, userPassword }])
      .select();
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      navigate('/login');
    }

    //reset the form field
    dispatch(
      resetUserDataForm({ userName: '', userEmail: '', userPassword: '' })
    );

    //update the posts UI -> display the new post in the posts
    // fetchLoginData();
  };
  return (
    <SignupPage>
      <SignupContainer>
        <h1>Sign up for free to start listening</h1>

        <SignupForm onSubmit={createUser}>
          <FormFieldContainer>
            <FormLabel htmlFor="userName">What should we call you?</FormLabel>
            <FormInput
              type="text"
              name="userName"
              id="userName"
              placeholder="Enter a profile name."
              value={userName}
              onChange={(e) =>
                dispatch(
                  setUserData({ value: e.target.value, name: e.target.name })
                )
              }
              required
            />
            <NameParagraph>This appears on your profile.</NameParagraph>
          </FormFieldContainer>
          <FormFieldContainer>
            <FormLabel htmlFor="userEmail">What's your email?</FormLabel>
            <FormInput
              type="email"
              name="userEmail"
              id="userEmail"
              placeholder="Enter you email."
              value={userEmail}
              onChange={(e) =>
                dispatch(
                  setUserData({ value: e.target.value, name: e.target.name })
                )
              }
              required
            />
          </FormFieldContainer>
          <FormFieldContainer>
            <FormLabel htmlFor="userPassword">Create a password</FormLabel>
            <FormInput
              type="password"
              name="userPassword"
              id="userPassword"
              placeholder="Create a password."
              value={userPassword}
              onChange={(e) =>
                dispatch(
                  setUserData({ value: e.target.value, name: e.target.name })
                )
              }
              required
            />
          </FormFieldContainer>

          <button>Sign up</button>
        </SignupForm>
        {isError && <p>You already have an account with us. Please log in</p>}
        <p>
          Have an account? <Link to="/login">Log in</Link>
        </p>
      </SignupContainer>
    </SignupPage>
  );
};

export default Signup;
