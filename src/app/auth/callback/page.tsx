import { Suspense } from 'react';
import CallbackComponent from './CallbackComponent';

export default function CallbackPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CallbackComponent />
    </Suspense>
  );
}
