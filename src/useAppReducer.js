import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const initialState = {
  results: [],
  page: 1,
  totalPages: 0,
  totalResutls: 0,
  loading: true,
  error: null,
};

const ACTIONS = {
  CALL_API: 'call-api',
  SUCCESS: 'success',
  ERROR: 'error',
};

const useAppReducer = (folderId = 'home') => {
  const [state, dispatch] = useReducer(filesReducer, initialState)
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: ACTIONS.CALL_API });
    const getFiles = async () => {
        axios.defaults.baseURL = 'http://localhost:3001/v1'
        let response = await axios.get(`/files?parentId=${folderId}`);
        if (response.status === 200) {
            dispatch({ type: ACTIONS.SUCCESS, data: response.data });
            return;
        }
        dispatch({ type: ACTIONS.ERROR, error: response.error });
    };

    getFiles();
  }, [location]);

  return {
    ...state
  }

}

const filesReducer = (state, action) => {
  switch (action.type) {
      case ACTIONS.CALL_API: {
          return {
              ...state,
              loading: true,
          };
      }
      case ACTIONS.SUCCESS: {
          return {
              ...state,
              loading: false,
              ...action.data,
          };
      }
      case ACTIONS.ERROR: {
          return {
              ...state,
              loading: false,
              error: action.error,
          };
      }
  }
};

export default useAppReducer;