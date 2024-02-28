import { useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');

  const handler = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  const defaultValue = (value) => {
    setValue(value);
  };

  return [value, handler, reset, defaultValue];
};

export default useInput;
