// authorReducer.js
const initialState = {
    authors: [], // Corrected the property name from 'author' to 'authors'
    error: null,
  };
  
  const authorReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'FETCH_AUTHORS_SUCCESS': 
      return {
        ...state,
        authors: action.payload,
        error: null,
      };
      case 'FETCH_AUTHOR_FAILURE':
      return {
        ...state,
        error: action.error,
      };
      case 'ADD_AUTHOR':
        return {
          ...state,
          authors: [...state.authors, action.payload],
        };
      case 'UPDATE_AUTHOR':
        return {
          ...state,
          authors: state.authors.map((author) =>
            author.id === action.payload.id ? action.payload : author
          ),
        };
      case 'DELETE_AUTHOR':
        return {
          ...state,
          authors: state.authors.filter((author) => author.id !== action.payload),
        };
        case 'DELETE_AUTHOR_FAILURE':
      return {
        ...state,
        error: action.error,
      };
      default:
        return state;
    }
  };
  
  export default authorReducer;