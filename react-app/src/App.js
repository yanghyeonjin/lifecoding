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
  render() {
    return (
      <div className="App" >
        <Subject title="WEB" sub="world wide web!"></Subject>
        <TOC></TOC>
        <Content title="HTML" desc="HTML is HyperText Markup Language."></Content>
      </div>
    )
  }
}

// npm install -g serve (간단한 웹서버)
// serve -s build (실행)
export default App;
