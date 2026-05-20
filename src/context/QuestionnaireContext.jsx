import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getQuestionnaires } from '../services/questionnaireService';

const initialState = {
  questionnaires: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, questionnaires: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_QUESTIONNAIRE':
      return { ...state, questionnaires: [action.payload, ...state.questionnaires] };
    case 'UPDATE_QUESTION': {
      const updated = state.questionnaires.map((q) => {
        if (!q.questions) return q;
        return {
          ...q,
          questions: q.questions.map((qs) =>
            qs.id === action.payload.id ? { ...qs, ...action.payload } : qs
          ),
        };
      });
      return { ...state, questionnaires: updated };
    }
    default:
      return state;
  }
}

const QuestionnaireContext = createContext(null);

export function QuestionnaireProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    getQuestionnaires()
      .then((data) => dispatch({ type: 'FETCH_SUCCESS', payload: data }))
      .catch((err) => dispatch({ type: 'FETCH_ERROR', payload: err.message }));
  }, []);

  return (
    <QuestionnaireContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnairesContext() {
  const ctx = useContext(QuestionnaireContext);
  if (!ctx) throw new Error('useQuestionnairesContext must be used within QuestionnaireProvider');
  return ctx;
}
