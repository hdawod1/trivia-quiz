
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles.css'
import { Provider } from 'react-redux'
import store from './store/index.ts'
import AnswerProvider from './features/answer/AnswerProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AnswerProvider>
      <App />
    </AnswerProvider>
  </Provider>
)
