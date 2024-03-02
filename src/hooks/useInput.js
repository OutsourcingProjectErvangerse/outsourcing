import { useState } from 'react';

const useInput = (initialValue = {}) => {
  const [formState, setFormState] = useState(initialValue);

  const onChangeHandler = (e) => {
    //name: key (여래개의 input 값을 구분)
    const { name, value } = e.target;
    //[name]: value는 객체에 동적으로 속성을 추가하는 방법
    //이전 상태의 다른 속성들은 그대로 유지되고, name 속성의 값은 value로 업데이트
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const formReset = () => {
    // 초기값을 사용하여 상태를 초기화한다.
    setFormState(initialValue);
  };

  return { formState, setFormState, onChangeHandler, formReset };
};

export default useInput;
