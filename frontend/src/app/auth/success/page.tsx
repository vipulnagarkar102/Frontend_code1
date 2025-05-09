'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import AuthSuccessPage from './AuthSuccessPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthSuccessPage />
    </Suspense>
  );
}
