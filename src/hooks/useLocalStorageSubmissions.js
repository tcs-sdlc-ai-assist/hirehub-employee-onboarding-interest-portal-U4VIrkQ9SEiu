import { useState, useCallback } from 'react';
import {
  getSubmissions,
  addSubmission,
  updateSubmission,
  deleteSubmission,
  resetSubmissions,
} from '../utils/storageUtils';

export function useLocalStorageSubmissions() {
  const [submissions, setSubmissions] = useState(() => getSubmissions());

  const refresh = useCallback(() => {
    setSubmissions(getSubmissions());
  }, []);

  const add = useCallback((submission) => {
    const newSubmission = addSubmission(submission);
    setSubmissions(getSubmissions());
    return newSubmission;
  }, []);

  const update = useCallback((id, updates) => {
    const updated = updateSubmission(id, updates);
    setSubmissions(getSubmissions());
    return updated;
  }, []);

  const remove = useCallback((id) => {
    const deleted = deleteSubmission(id);
    setSubmissions(getSubmissions());
    return deleted;
  }, []);

  const reset = useCallback(() => {
    resetSubmissions();
    setSubmissions([]);
  }, []);

  return {
    submissions,
    addSubmission: add,
    updateSubmission: update,
    deleteSubmission: remove,
    resetSubmissions: reset,
    refreshSubmissions: refresh,
  };
}