import { useEffect } from "react";

const useValidate = ({ inputValue, setValueMsg, str, min, max }) => {
  useEffect(() => {
    const validateValue = () => {
      if (
        inputValue.length !== 0 &&
        (inputValue.length < min || inputValue.length > max)
      )
        setValueMsg(`${str} ${min}~${max}글자여야 합니다.`);
      else setValueMsg("");
    };
    validateValue();
  }, [inputValue]);
};

export default useValidate;
