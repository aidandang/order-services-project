import React from 'react';

// dependencies
import * as Yup from "yup";
// customs and utils
import { useForm } from '../custom-hooks/use-form';
// components
import SignInForm from './sign-in-form.component';
// firebase
import { auth } from '../../firebase/firebase.utils';

// set form schema
const formSchema = Yup.object().shape({
  email: Yup
    .string()
    .email("This must be a valid email address.")
    .required("Please provide your email."),
  password: Yup
    .string()
    .required("Please provide your password.")
});
// set form state
const formState = {
  email: "",
  password: ""
};

const SignIn = () => {
  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const formSubmit = async e => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  }

  return <>
    <SignInForm 
      formData={formData} 
      formSubmit={formSubmit} 
      errors={errors} 
      onInputChange={onInputChange} 
      buttonDisabled={buttonDisabled}
    />
  </>
}

export default SignIn;