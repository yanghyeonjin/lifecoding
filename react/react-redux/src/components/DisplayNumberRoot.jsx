import React, { Component } from 'react';

import DisplayNumberContainer from '../containers/DisplayNumberContainer';

class DisplayNumberRoot extends Component {
    render() {
        return (
            <div>
                <h1>Display Number Root</h1>
                <DisplayNumberContainer unit="kg"></DisplayNumberContainer>
            </div>
        );
    }
}

export default DisplayNumberRoot;
