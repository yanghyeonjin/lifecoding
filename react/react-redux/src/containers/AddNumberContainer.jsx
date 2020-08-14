import AddNumber from '../components/AddNumber'; // 감쌀 컴포넌트 가져오기
import { connect } from 'react-redux';

export default connect()(AddNumber);

/*
import React, { Component } from 'react';

import store from '../store';

export default class extends Component {
    render() {
        return (
            <AddNumber
                onClick={function (size) {
                    store.dispatch({
                        type: 'INCREMENT',
                        size,
                    });
                }}
            ></AddNumber>
        );
    }
}
*/
