const STORAGE_KEY = 'hirehub_submissions';

function generateId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
}

export function getSubmissions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data === null) {
      return [];
    }
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      console.warn('Corrupted localStorage: expected array, reset to empty');
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    return parsed;
  } catch (e) {
    console.warn('Corrupted localStorage, reset to empty:', e);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
}

function saveSubmissions(submissions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

function isDuplicateEmail(submissions, email, excludeId = null) {
  const normalizedEmail = email.toLowerCase().trim();
  return submissions.some(
    (s) => s.email.toLowerCase().trim() === normalizedEmail && s.id !== excludeId
  );
}

export function addSubmission(submission) {
  const submissions = getSubmissions();

  if (isDuplicateEmail(submissions, submission.email)) {
    throw new Error('A submission with this email already exists');
  }

  const newSubmission = {
    ...submission,
    id: generateId(),
    submittedOn: new Date().toISOString(),
  };

  submissions.push(newSubmission);
  saveSubmissions(submissions);

  return newSubmission;
}

export function updateSubmission(id, updates) {
  const submissions = getSubmissions();
  const index = submissions.findIndex((s) => s.id === id);

  if (index === -1) {
    throw new Error('Submission not found');
  }

  if (updates.email && updates.email !== submissions[index].email) {
    if (isDuplicateEmail(submissions, updates.email, id)) {
      throw new Error('A submission with this email already exists');
    }
  }

  submissions[index] = { ...submissions[index], ...updates };
  saveSubmissions(submissions);

  return submissions[index];
}

export function deleteSubmission(id) {
  const submissions = getSubmissions();
  const index = submissions.findIndex((s) => s.id === id);

  if (index === -1) {
    throw new Error('Submission not found');
  }

  const deleted = submissions.splice(index, 1)[0];
  saveSubmissions(submissions);

  return deleted;
}

export function resetSubmissions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}