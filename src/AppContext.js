import { useState, createContext } from "react";
import useAppReducer from "./useAppReducer";

const AppContext = createContext();

const initialState = [{ name: 'Home', hasChild: false, _id: 'home', index: 1, parentId: ''}];

const useAppState = () => {
  const [breadCrumbs, setBreadCrumbs] = useState(initialState);
  const lastCrumb = breadCrumbs.slice(-1)[0];
  const filesReducer = useAppReducer();
  const [currentDir, setCurrentDir] = useState('home');

  const setIncreaseCrumbs = (crumbs) => {
    const newCrumbs = [...breadCrumbs, ...crumbs];
    newCrumbs[0].hasChild = !!newCrumbs.length;
    setBreadCrumbs([...newCrumbs]);
  }

  const setDecreaseCrumbs = (newCrumbs) => {
    if (newCrumbs.length) {
      newCrumbs[0].hasChild = !newCrumbs.length <= 1;
      setBreadCrumbs([...newCrumbs]);
    }
  }

  const resetCrumbs = () => {
    setBreadCrumbs(initialState);
  }

  const jumpCrumbs = (crumbId, currentIndex) => {
    const newCrumbs = breadCrumbs.reduce((prevVal, currVal, index) => {
      if ((currVal._id !== crumbId && index < currentIndex) || currVal._id === crumbId) {
        return [...prevVal, { ...currVal, index }]
      }

      return prevVal;
      
    }, []);
    setBreadCrumbs(newCrumbs);
  }

  return {
    filesReducer,
    breadCrumbs,
    lastCrumb,
    setIncreaseCrumbs,
    setDecreaseCrumbs,
    resetCrumbs,
    jumpCrumbs,
    currentDir,
    setCurrentDir,
  }
}

export {
  AppContext,
  useAppState,
};