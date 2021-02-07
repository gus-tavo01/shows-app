import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function useSectionLoader(props) {
  const [isloading, setIsLoading] = useState(false);
  const loadingSpinner = isloading ? <CircularProgress size={80} /> : null;
  return [loadingSpinner, () => setIsLoading(true), () => setIsLoading(false)];
}