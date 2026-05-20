import api from './api';

export async function triggerAutofill(questionnaireId) {
  // TODO: connect to real API — POST /api/questionnaires/:id/autofill
  const response = await api.post(`/api/questionnaires/${questionnaireId}/autofill`);
  return response.data;
}

export async function pollAutofillStatus(questionnaireId) {
  // TODO: connect to real API — GET /api/questionnaires/:id
  const response = await api.get(`/api/questionnaires/${questionnaireId}`);
  return response.data;
}
