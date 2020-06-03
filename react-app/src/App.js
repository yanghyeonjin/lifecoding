import React, { Component } from 'react';
import './App.css';

// Component (커스텀 태그)를 만드는 코드
// React가 갖고 있는 Component를 상속해서 새로운 클래스를 정의
// render라는 method를 가지고 있다.
// like template
class App extends Component {
  render() {
    return (
      <div className="App" >
        <Subject></Subject>
      </div>
    )
  }
}

// 클래스 이름은 대문자로 시작
// Component를 만들 때에는 return안에 하나의 최상위 태그만 있어야 한다.
// 아래의 경우에는 header 태그만 존재해야 한다. (sibling 태그 있으면 안 됨.)

// 유사 자바스크립트 (자바스크립트 아님)
// JSX로 작성하는 중
// JSX로 작성하면 create-react-app이 js로 컨버팅 해줌.
class Subject extends Component {
  render() {
    return (
      <header>
        <h1>WEB</h1>
        world wide web!
      </header>
    );
  }
}

// npm install -g serve (간단한 웹서버)
// serve -s build (실행)
export default App;
