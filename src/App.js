import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore.js';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <div className="App">
            <Main />
          </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
