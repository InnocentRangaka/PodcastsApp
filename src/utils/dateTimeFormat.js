// src/utils/dateUtils.js
export const formatDateTime = (isoString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };
  