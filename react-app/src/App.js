import React, { Component } from 'react';
import './App.css';

// 파일 import
import TOC from './components/TOC'
import Content from './components/Content';
import Subject from './components/Subject'

// Component (커스텀 태그)를 만드는 코드
// React가 갖고 있는 Component를 상속해서 새로운 클래스를 정의
// render라는 method를 가지고 있다.
// like template
class App extends Component {
  // Component가 실행될 때, 제일 먼저 실행된다.
  // 초기화를 담당
  constructor(props) {
    super(props);

    // props나 state가 변경되면, 해당 props/state를 가진 컴포넌트의 render함수가 다시 호출된다.
    // 하위에 있는 컴포넌트들의 render함수도 다시 호출됨.
    // 페이지 다시 그려짐.
    this.state = {
      mode: "read",
      subject: { title: "WEB", sub: "World Wide Web!" },
      welcome: { title: "Welcome", desc: "Hello, React!!" },
      contents: [
        { id: 1, title: "HTML", desc: 'HTML is for information' },
        { id: 2, title: "CSS", desc: 'CSS is for design' },
        { id: 3, title: "JavaScript", desc: 'JavaScript is for interactive' }
      ]
    }
  }

  // render 함수: 어떤 HTML을 그릴것인지 결정하는 함수
  render() {
    var _title, _desc = null;

    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }

    return (
      <div className="App" >
        {/* <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}></Subject> */}
        <header>
          <h1><a href="/" onClick={function (e) {
            // a 태그의 기본적인 동작방법을 막는다.
            e.preventDefault();

            // 아래 코드에서 this는 App Component가 아니라 함수를 가리키는 것 같다.
            // 함수가 끝난 직후 bind 넣어주자. 그러면 this가 가리키는게 App Component가 된다.
            // 그리고 아래처럼 코드를 작성해도 state의 값이 바뀌지 않는다. react의 문법대로 해야한다.

            // this.state.mode = 'welcome';

            this.setState({
              mode: 'welcome'
            })
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    )
  }
}

// npm install -g serve (간단한 웹서버)
// serve -s build (실행)
export default App;
