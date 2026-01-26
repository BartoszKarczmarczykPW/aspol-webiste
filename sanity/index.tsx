import { createRoot } from 'react-dom/client'
import { StudioProvider, StudioLayout } from 'sanity'
import config from './sanity.config'

const rootElement = document.getElementById('sanity')
const root = createRoot(rootElement!)

root.render(
    <StudioProvider config={config}>
        <StudioLayout />
    </StudioProvider>
)
