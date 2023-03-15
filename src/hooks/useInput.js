import React from 'react';

const useInput = () => {
  const [value, setValue] = React.useState();
  const [isFocus, setIsFocus] = React.useState();
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onBlur = (e) => {
    setIsFocus(true);
  };

  return {
    onChange,
    onBlur,
    value,
  };
};

export default useInput;
