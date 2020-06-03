import React, { Component } from 'react';

class UpdateContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.data.title,
            desc: this.props.data.desc
        }

        this.inputFormHandler = this.inputFormHandler.bind(this)
    }

    inputFormHandler(e) {
        // 한 글자씩 바뀌는 것을 바로바로 셋팅
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <article>
                <h2>Update</h2>
                <form action="/create_process" method="POST" onSubmit={function (e) {
                    e.preventDefault();

                    this.props.onSubmit(e.target.title.value, e.target.desc.value)
                }.bind(this)}>
                    {/* 
                    value에 default 값을 셋팅
                    1. this.props 사용 -> X (props는 readonly)
                    2. 해당 컴포넌트에 state를 만들고, state를 사용. 단, onChange 이벤트 필수로 추가 */}
                    <p>
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={this.state.title}
                            onChange={this.inputFormHandler} />
                    </p>
                    <p>
                        <textarea
                            name="desc"
                            placeholder="description"
                            value={this.state.desc}
                            onChange={this.inputFormHandler}></textarea>
                    </p>
                    <p>
                        <input type="submit" />
                    </p>
                </form>
            </article>
        );
    }
}

export default UpdateContent;