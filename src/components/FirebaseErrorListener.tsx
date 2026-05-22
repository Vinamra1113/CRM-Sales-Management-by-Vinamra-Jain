'use client';

import React, { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export const FirebaseErrorListener: React.FC = () => {
  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      // Throwing an unhandled exception will trigger the Next.js development overlay
      // providing the agent with the necessary context to fix security rules.
      throw error;
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.removeListener('permission-error', handlePermissionError);
    };
  }, []);

  return null;
};
