import { useQuestionnairesContext } from '../context/QuestionnaireContext';

export function useQuestionnaires() {
  const { state, dispatch } = useQuestionnairesContext();
  return {
    questionnaires: state.questionnaires,
    loading: state.loading,
    error: state.error,
    dispatch,
  };
}
