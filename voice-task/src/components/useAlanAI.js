
import { useEffect, useRef } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const useAlanAI = (commandsHandler) => {
  const alanBtnInstance = useRef(null);

  useEffect(() => {
    if (!alanBtnInstance.current) {
      alanBtnInstance.current = alanBtn({
        key: '49a174cd60746660adfdd18d4181fdc92e956eca572e1d8b807a3e2338fdd0dc/stage', // Replace with your Alan AI key
        onCommand: commandsHandler,
      });
    }

    return () => {
      alanBtnInstance.current.deactivate();
    };
  }, [commandsHandler]);

  return alanBtnInstance.current;
};

export default useAlanAI;
