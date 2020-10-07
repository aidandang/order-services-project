import { useState, useEffect } from 'react';
import * as Yup from 'yup';

export const useForm = (initialValues, initialErrors, schema) => {
  // set state for form inputs and errors
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onInputChange = e => {
    e.persist();

    let value = null;
    const key = e.target.name;

    // if checkbox set value to be checked otherwise set value to input value
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    handleChanges(key, value)
  }

  // handle function to set values to a formState
  const handleChanges = (key, value) => {
    validateChange(key, value);
    setValues(prevState => ({
      ...prevState, [key]: value
    }))
  };

  // validate an input
  const validateChange = (key, value) => {
    Yup
      .reach(schema, key)
      .validate(value)
      .then(valid => {
        setErrors(prevState => ({ 
          ...prevState, [key]: "" 
        })) 
      })
      .catch(err => {
        setErrors(prevState => ({ 
          ...prevState, [key]: err.errors[0] 
        })) 
      })
  }

  useEffect(() => {
    schema.isValid(values)
      .then(valid => {
        setButtonDisabled(!valid);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return [values, errors, onInputChange, buttonDisabled, setValues];
};