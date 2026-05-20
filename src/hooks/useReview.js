import { useState } from 'react';
import { approveQuestion, rejectQuestion, assignQuestion } from '../services/reviewService';
import { useQuestionnairesContext } from '../context/QuestionnaireContext';

export function useReview() {
  const { dispatch } = useQuestionnairesContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function approve(questionId) {
    setLoading(true);
    setError(null);
    try {
      await approveQuestion(questionId);
      dispatch({ type: 'UPDATE_QUESTION', payload: { id: questionId, status: 'approved' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function reject(questionId) {
    setLoading(true);
    setError(null);
    try {
      await rejectQuestion(questionId);
      dispatch({ type: 'UPDATE_QUESTION', payload: { id: questionId, status: 'rejected' } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function assign(questionId, assigneeId) {
    setLoading(true);
    setError(null);
    try {
      await assignQuestion(questionId, assigneeId);
      dispatch({ type: 'UPDATE_QUESTION', payload: { id: questionId, assigneeId } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { approve, reject, assign, loading, error };
}
