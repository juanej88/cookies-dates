import { useEffect } from 'react'

const useConsoleLog = (varName) => { // custom hook
  useEffect(() => {
    console.log(varName)
  }, [varName]);
};

export default useConsoleLog;