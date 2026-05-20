import { useState, useEffect, useRef } from 'react';
import { triggerAutofill, pollAutofillStatus } from '../services/ragService';

const POLL_INTERVAL = parseInt(process.env.REACT_APP_RAG_POLLING_INTERVAL_MS || '3000', 10);

export function useAutoFill(questionnaireId) {
  const [status, setStatus] = useState('idle'); // idle | running | complete | error
  const [error, setError] = useState(null);
  const pollRef = useRef(null);

  async function startAutofill() {
    setStatus('running');
    setError(null);
    try {
      await triggerAutofill(questionnaireId);
      pollRef.current = setInterval(async () => {
        try {
          const data = await pollAutofillStatus(questionnaireId);
          if (data.autofillComplete) {
            clearInterval(pollRef.current);
            setStatus('complete');
          }
        } catch (err) {
          clearInterval(pollRef.current);
          setStatus('error');
          setError(err.message);
        }
      }, POLL_INTERVAL);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  return { status, error, startAutofill };
}
