import { useReducer } from 'react';
import axios from 'axios';

const initialState = {
  parentId: '',
  results: [],
  page: 1,
  totalPages: 0,
  totalResutls: 0,
  isGetloading: true,
  getError: null,
  isPostloading: true,
  postError: null,
};

const GET_ACTIONS = {
  CALL_API: 'get-call-api',
  SUCCESS: 'get-success',
  ERROR: 'get-error',
};

const POST_ACTIONS = {
  CALL_API: 'post-call-api',
  SUCCESS: 'post-success',
  ERROR: 'post-error',
};

const useAppReducer = () => {
  const [state, dispatch] = useReducer(filesReducer, initialState)

  const getFiles = (folderId = 'home') => {
    dispatch({ type: GET_ACTIONS.CALL_API });
    const getAPIFiles = async () => {
        axios.defaults.baseURL = 'http://localhost:3001/v1'
        let response = await axios.get(`/files?parentId=${folderId}&limit=1000&sortBy=updatedAt:desc`);
        if (response.status === 200) {
            dispatch({ type: GET_ACTIONS.SUCCESS, data: response.data });
            return;
        }
        dispatch({ type: GET_ACTIONS.ERROR, error: response.error });
    };

    getAPIFiles();
  };

  const createFiles = (file) => {
    dispatch({ type: POST_ACTIONS.CALL_API });
    const postAPIFiles = async () => {
        axios.defaults.baseURL = 'http://localhost:3001/v1'
        let response = await axios.post(`/files`, file);
        if (response.status === 201) {
            dispatch({ type: POST_ACTIONS.SUCCESS, data: response.data });
            return;
        }
        dispatch({ type: POST_ACTIONS.ERROR, error: response.error });
    };

    postAPIFiles();
  };

  return {
    ...state,
    getFiles,
    createFiles, 
  }

}

const filesReducer = (state, action) => {
  switch (action.type) {
    case GET_ACTIONS.CALL_API: {
      return {
        ...state,
        isGetloading: true,
      };
    }
    case GET_ACTIONS.SUCCESS: {
      return {
        ...state,
        isGetloading: false,
        ...action.data,
      };
    }
    case GET_ACTIONS.ERROR: {
      return {
        ...state,
        isGetloading: false,
        getError: action.error,
      };
    }
    case POST_ACTIONS.CALL_API: {
      return {
        ...state,
        isPostloading: true,
      };
    }
    case POST_ACTIONS.SUCCESS: {
      const newResults = [
        action.data,
        ...state.results,
      ];
      return {
        ...state,
        results: newResults,
        isPostloading: false,
      };
    }
    case POST_ACTIONS.ERROR: {
      return {
        ...state,
        isPostloading: false,
        error: action.error,
      };
    }
  }
};

export default useAppReducer;

export {
  initialState,
  filesReducer,
}