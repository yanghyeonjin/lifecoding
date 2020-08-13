// React 사용할 때 필수로 작성해야 함.
import React, { Component } from 'react';

// Table of Component
// 목차
class TOC extends Component {
    // shouldComponentUpdate 다음에 render 실행된다.
    // return true면 render 호출 / false면 render 호출 안 됨

    // newProps: props가 바뀌었을 때, 그 값
    // newState: state가 바뀌었을 때, 그 값
    shouldComponentUpdate(newProps, newState) {
        if (this.props.data === newProps.data) {
            return false;
        }
        return true;
    }

    render() {
        var lists = [];
        var data = this.props.data;
        var i = 0;

        while (i < data.length) {
            // 여러 개를 자동적으로 생성할 때에는, key 속성을 넣어주어야 한다. (유니크한 값으로)
            lists.push(
                // 방법 1: bind에 파라미터로 전달 > function의 인자로 사용가능
                <li key={data[i].id}>
                    <a
                        href={"/content/" + data[i].id}
                        onClick={function (id, e) {
                            e.preventDefault();

                            this.props.onChangePage(id);
                        }.bind(this, data[i].id)}>{data[i].title}</a>
                </li>

                // 방법 2: data 속성 사용
                // <li key={data[i].id}>
                //     <a
                //         href={"/content/" + data[i].id}
                //         data-id={data[i].id}
                //         onClick={function (e) {
                //             e.preventDefault();

                //             this.props.onChangePage(e.target.dataset.id);
                //         }.bind(this)}>{data[i].title}</a>
                // </li>
            );
            i = i + 1;
        }

        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

// TOC라는 클래스를 외부에서 사용할 수 있도록
export default TOC;