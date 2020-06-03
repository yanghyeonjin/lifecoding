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
    this.state = {
      subject: { title: "WEB", sub: "World Wide Web!" },
      contents: [
        { id: 1, title: "HTML", desc: 'HTML is for information' },
        { id: 2, title: "CSS", desc: 'CSS is for design' },
        { id: 3, title: "JavaScript", desc: 'JavaScript is for interactive' }
      ]
    }
  }

  render() {
    return (
      <div className="App" >
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}></Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    )
  }
}

// npm install -g serve (간단한 웹서버)
// serve -s build (실행)
export default App;
