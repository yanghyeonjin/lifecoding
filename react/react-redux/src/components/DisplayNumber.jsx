import React, { Component } from 'react';
import store from '../store';

class DisplayNumber extends Component {
    // 내부적으로 사용하는 state
    state = {
        number: store.getState().number,
    };

    constructor(props) {
        super(props);

        // store의 state가 바뀌었을 때 실행될 함수를 넘겨준다. (액션이 실행되었을 때 실행)
        store.subscribe(
            function () {
                this.setState({ number: store.getState().number });
            }.bind(this)
        );
    }
    render() {
        return (
            <div>
                <h1>Display Number</h1>
                <input type="text" value={this.state.number} readOnly />
            </div>
        );
    }
}

export default DisplayNumber;
