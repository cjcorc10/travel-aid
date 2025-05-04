// https://mswjs.io/docs/integrations/browser
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

worker.start({
    serviceWorker: {
        url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
        options: {
            scope: '/'
        }
    },
})