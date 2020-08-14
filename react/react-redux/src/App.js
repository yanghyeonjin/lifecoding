import React from 'react';
import './App.css';

import AddNumberRoot from './components/AddNumberRoot';
import DisplayNumberRoot from './components/DisplayNumberRoot';
import { Component } from 'react';

class App extends Component {
    state = {
        number: 0,
    };
    render() {
        return (
            <div className="App">
                <h1>Root</h1>
                <AddNumberRoot></AddNumberRoot>
                <DisplayNumberRoot></DisplayNumberRoot>
            </div>
        );
    }
}

export default App;
