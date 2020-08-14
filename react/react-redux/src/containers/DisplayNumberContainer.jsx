import DisplayNumber from '../components/DisplayNumber';
import { connect } from 'react-redux';

// 리덕스의 state를 리액트의 props로...
// 아래 함수는 다음과 같다.
// 1. 리덕스의 state를 가져온다.
// 2. 리덕스의 state가 변경되었을 때 함수가 다시 호출된다. (UI 업데이트)
// 3. 하위 컴포넌트에게 props로 값을 전달해준다.
//      - 전달하려는 property 값을 일치시켜야 한다.
function mapReduxStateToReactProps(state) {
    return {
        number: state.number,
    };
}
function mapReduxDispatchToReactProps() {
    return {};
}

export default connect(
    mapReduxStateToReactProps,
    mapReduxDispatchToReactProps
)(DisplayNumber);

/*
import React, { Component } from 'react';
import store from '../store';

export default class extends Component {
    // 내부적으로 사용하는 state
    state = {
        number: store.getState().number,
    };

    componentDidMount() {
        // store의 state가 바뀌었을 때 실행될 함수를 넘겨준다. (액션이 실행되었을 때 실행)
        store.subscribe(
            function () {
                this.setState({ number: store.getState().number });
            }.bind(this)
        );
    }

    render() {
        return <DisplayNumber number={this.state.number}></DisplayNumber>;
    }
}
*/
