import React from 'react';
import Router from "./components/Router";
import {Provider} from 'react-redux';
import './App.css';
import routes from "./pages";
import layout from '../src/components/Layout'
import store from './store'

function App() {

    return (
        <Provider store={store}>
            <div className="App">
                <Router
                    routes={routes}
                    layout={layout}
                >

                </Router>
            </div>
        </Provider>
    );
}

export default App;
