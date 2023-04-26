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
  isPostPatchLoading: true,
  postError: null,
  fileInfo: {},
  isDeleteLoading: true,
};

const GET_ACTIONS = {
  CALL_API: 'get-call-api',
  SUCCESS: 'get-success',
  ERROR: 'get-error',
};

const POST_PATCH_ACTIONS = {
  CALL_API: 'post-patch-call-api',
  SUCCESS: 'post-patch-success',
  ERROR: 'post-patch-error',
};

const DELETE_ACTIONS = {
  CALL_API: 'delete-call-api',
  SUCCESS: 'delete-success',
  ERROR: 'delete-error',
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

  const createUpdateFiles = (file, method = 'post') => {
    dispatch({ type: POST_PATCH_ACTIONS.CALL_API });
    const postAPIFiles = async () => {
      const apiUrl = method === 'post' ? '/files' : `/files/${file._id}`;
      axios.defaults.baseURL = 'http://localhost:3001/v1'
      let response = await axios({ method, url: apiUrl, data: file });
      if (response.status === 201) {
          dispatch({ type: POST_PATCH_ACTIONS.SUCCESS, data: response.data });
          return;
      }
      dispatch({ type: POST_PATCH_ACTIONS.ERROR, error: response.error });
    };

    postAPIFiles();
  };

  const deleteFile = (fileId = '') => {
    if (fileId !== 'home' || fileId !== '') {
      dispatch({ type: DELETE_ACTIONS.CALL_API });
      const deleteAPIFiles = async () => {
          axios.defaults.baseURL = 'http://localhost:3001/v1';
          let response = await axios.delete(`/files/${fileId}`);
          if (response.status === 200) {
              dispatch({ type: DELETE_ACTIONS.SUCCESS, data: { fileId } });
              return;
          }
          dispatch({ type: DELETE_ACTIONS.ERROR, error: response.error });
      };

      deleteAPIFiles();
    }
  };

  return {
    ...state,
    getFiles,
    createUpdateFiles, 
    deleteFile,
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
    case POST_PATCH_ACTIONS.CALL_API: {
      return {
        ...state,
        isPostPatchLoading: true,
      };
    }
    case POST_PATCH_ACTIONS.SUCCESS: {
      const newResults = [
        action.data,
        ...state.results,
      ];
      return {
        ...state,
        results: newResults,
        isPostPatchLoading: false,
      };
    }
    case POST_PATCH_ACTIONS.ERROR: {
      return {
        ...state,
        isPostPatchLoading: false,
        error: action.error,
      };
    }
    case DELETE_ACTIONS.CALL_API: {
      return {
        ...state,
        isDeleteLoading: true,
      };
    }
    case DELETE_ACTIONS.SUCCESS: {
      return {
        ...state,
        isDeleteLoading: false,
      };
    }
    case DELETE_ACTIONS.ERROR: {
      return {
        ...state,
        isDeleteLoading: false,
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