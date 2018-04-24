import React, { Component } from 'react';
import FirstPage from './Components/FirstPage';
import { Provider } from 'react-redux';
import store from './Redux/Store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <FirstPage />
      </Provider>
    );
  }
}

export default App;
