import React from 'react';

function useValidation() {
  const [value, setValue] = React.useState('');
  const [inputError, setInputError] = React.useState('');
  const [inputValid, setInputValid] = React.useState(false);

  const handleChange = (evt) => {
    setValue(evt.target.value);

    if (!evt.target.validity.valid) {
      setInputValid(false);
      setInputError(evt.target.validationMessage);
    } else {
      setInputValid(true);
      setInputError('');
    }
  };

  return {
    value,
    setValue,
    handleChange,
    inputError,
    setInputError,
    inputValid,
    setInputValid,
  };
}

export default useValidation;
