import React from 'react';
import useInput from '../hooks/useInput';

function Home() {
  const [name, onChangNameHandler] = useInput();
  const [password, onChangePasswordHandler] = useInput();

  return (
    <>
      <input type="text" value={name} onChange={onChangNameHandler}></input>
      <input type="text" value={password} onChange={onChangePasswordHandler}></input>
      <div>Home</div>
    </>
  );
}

export default Home;
