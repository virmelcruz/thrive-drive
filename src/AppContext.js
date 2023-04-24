import { useState, createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";

const AppContext = createContext();

const initialState = [{ name: 'Home', hasChild: false, id: 'home', index: 1, }];

const useAppState = () => {
  const [breadCrumbs, setBreadCrumbs] = useState(initialState);

  const setIncreaseCrumbs = (crumbs) => {
    const newCrumbs = [...breadCrumbs, ...crumbs];
    newCrumbs[0].hasChild = !!newCrumbs.length;
    setBreadCrumbs([...newCrumbs]);
  }

  const setDecreaseCrumbs = (newCrumbs) => {
    newCrumbs[0].hasChild = !newCrumbs.length <= 1;
    console.log('newCrumbs', newCrumbs)
    setBreadCrumbs([...newCrumbs]);
  }

  const resetCrumbs = () => {
    setBreadCrumbs(initialState);
  }

  const jumpCrumbs = (crumbId, currentIndex) => {
    const newCrumbs = breadCrumbs.reduce((prevVal, currVal, index) => {
      if ((currVal.id !== crumbId && index < currentIndex) || currVal.id === crumbId) {
        return [...prevVal, { ...currVal, index }]
      }

      return prevVal;
      
    }, []);
    console.log('jump crumbs', newCrumbs);
    setBreadCrumbs(newCrumbs);
  }

  return {
    breadCrumbs,
    setIncreaseCrumbs,
    setDecreaseCrumbs,
    resetCrumbs,
    jumpCrumbs,
  }
}

export {
  AppContext,
  useAppState,
};