// React 사용할 때 필수로 작성해야 함.
import React, { Component } from 'react';

// Table of Component
// 목차
class TOC extends Component {
    render() {
        var lists = [];
        var data = this.props.data;
        var i = 0;

        while (i < data.length) {
            // 여러 개를 자동적으로 생성할 때에는, key 속성을 넣어주어야 한다. (유니크한 값으로)
            lists.push(<li key={data[i].id}><a href={"/content/" + data[i].id}>{data[i].title}</a></li>);
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