import api from './api';

export async function uploadFile(file) {
  // TODO: connect to real API — POST /api/questionnaires/upload
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/api/questionnaires/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}

export async function submitPortalUrl(url) {
  // TODO: connect to real API — POST /api/questionnaires/portal
  const response = await api.post('/api/questionnaires/portal', { url });
  return response.data;
}
