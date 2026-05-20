const ACCEPTED_TYPES = {
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
};

const MAX_SIZE_MB = 50;

export function isAcceptedFileType(file) {
  return Object.keys(ACCEPTED_TYPES).includes(file.type);
}

export function isAcceptedFileSize(file) {
  return file.size <= MAX_SIZE_MB * 1024 * 1024;
}

export function validateFile(file) {
  if (!isAcceptedFileType(file)) {
    return `File type not supported. Accepted: PDF, DOCX, XLSX.`;
  }
  if (!isAcceptedFileSize(file)) {
    return `File exceeds ${MAX_SIZE_MB}MB limit.`;
  }
  return null;
}

export const ACCEPTED_MIME_TYPES = Object.keys(ACCEPTED_TYPES).join(',');
