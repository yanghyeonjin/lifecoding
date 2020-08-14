import AddNumber from '../components/AddNumber'; // 감쌀 컴포넌트 가져오기
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
    return {
        onClick: function (size) {
            dispatch({
                type: 'INCREMENT',
                size,
            });
        },
    };
}

export default connect(null, mapDispatchToProps)(AddNumber);

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
