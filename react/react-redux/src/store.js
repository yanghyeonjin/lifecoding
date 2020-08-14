import { createStore } from 'redux';

export default createStore(function (state, action) {
    if (state === undefined) {
        // 최초의 실행
        return { number: 0 };
    }

    if (action.type === 'INCREMENT') {
        // 값을 증가시킴
        return { ...state, number: state.number + action.size };
    }
}, window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__());
