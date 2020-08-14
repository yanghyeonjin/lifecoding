import React, { Component } from 'react';

class DisplayNumber extends Component {
    render() {
        return (
            <div>
                <h1>Display Number</h1>
                <input type="text" value={this.props.number} readOnly />

                {/* react-redux connect를 사용하였을 때, 중간에서 감싸고 있는 container로 전달하지 않아도 알아서 props를 가져다준다. */}
                {this.props.unit}
            </div>
        );
    }
}

export default DisplayNumber;
