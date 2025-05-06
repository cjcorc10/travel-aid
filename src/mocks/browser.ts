// https://mswjs.io/docs/integrations/browser
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

// Simple, foolproof worker initialization
// const startWorker = async () => {
//     await worker.start({
//       serviceWorker: {
//         url: '/mockServiceWorker.js', // Always use root-relative path
//         options: {
//           scope: '/' // Control the entire origin
//         }
//       },
//       onUnhandledRequest: 'bypass' // Let non-mocked requests pass through
//     });
//   };
  
//   // Start in all environments
//   if (typeof window !== 'undefined') {
//     startWorker().catch(console.error);
//   }