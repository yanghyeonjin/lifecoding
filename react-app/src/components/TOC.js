// React 사용할 때 필수로 작성해야 함.
import React, { Component } from 'react';

// Table of Component
// 목차
class TOC extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><a href="1.html">HTML</a></li>
                    <li><a href="2.html">CSS</a></li>
                    <li><a href="3.html">JavaScript</a></li>
                </ul>
            </nav>
        );
    }
}

// TOC라는 클래스를 외부에서 사용할 수 있도록
export default TOC;