import api from './api';

export async function approveQuestion(questionId) {
  // TODO: connect to real API — PATCH /api/questions/:id/approve
  const response = await api.patch(`/api/questions/${questionId}/approve`);
  return response.data;
}

export async function rejectQuestion(questionId) {
  // TODO: connect to real API — PATCH /api/questions/:id/reject
  const response = await api.patch(`/api/questions/${questionId}/reject`);
  return response.data;
}

export async function assignQuestion(questionId, assigneeId) {
  // TODO: connect to real API — PATCH /api/questions/:id/assign
  const response = await api.patch(`/api/questions/${questionId}/assign`, { assigneeId });
  return response.data;
}
