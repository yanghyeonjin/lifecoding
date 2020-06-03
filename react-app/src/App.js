import React, { Component } from 'react';
import './App.css';

// 파일 import
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

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

    // UI 변경과 관련없는 데이터들은 state에 저장 안해도 된다.
    // 불필요한 렌더링은 되지 않도록.
    this.lastContentId = 3;

    this.state = {
      mode: "read",
      selectedContentId: 2,
      subject: { title: "WEB", sub: "World Wide Web!" },
      welcome: { title: "Welcome", desc: "Hello, React!!" },
      contents: [
        { id: 1, title: "HTML", desc: 'HTML is for information' },
        { id: 2, title: "CSS", desc: 'CSS is for design' },
        { id: 3, title: "JavaScript", desc: 'JavaScript is for interactive' }
      ]
    }
  }

  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];

      if (data.id === this.state.selectedContentId) {
        return data;
      }
      i = i + 1;
    }
  }

  getContent() {
    var _title, _desc, _article = null;

    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        // add content to this.state.contents

        // 새로운 목차 추가
        this.lastContentId = this.lastContentId + 1;

        // push는 원래 배열을 변경한다.
        // concat을 이용하여 원래 배열은 유지하고 새로운 배열을 리턴받는 방법을 사용.

        // * state를 변경할 때에는, push와 같은 original 데이터를 변경하는 방법을 쓰지 말자.
        // * 그러면 Component 클래스 쪽에서 shouldComponentUpdate 함수를 사용할 때, 변경이 있는 경우에만 render함수를 호출하도록 제어할 수 있다. (큰 규모의 서비스에서 불필요한 렌더링은 성능의 문제의 원인이 될 수 있다.)

        // this.state.contents.push({ id: this.lastContentId, title: _title, desc: _desc })
        // var _contents = this.state.contents.concat({ id: this.lastContentId, title: _title, desc: _desc });

        var newContents = Array.from(this.state.contents); // 똑같은 배열 복제
        newContents.push({ id: this.lastContentId, title: _title, desc: _desc })

        // react에게 state가 변경되었음을 알림.
        this.setState({
          // contents: _contents
          contents: newContents,
          mode: 'read',
          selectedContentId: this.lastContentId // 새로운 내용 추가 후, 상세보기로 전환
        });

      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function (_id, _title, _desc) {
        var _contents = Array.from(this.state.contents);

        var i = 0;
        while (i < _contents.length) {
          if (_contents[i].id === _id) {
            _contents[i] = { id: _id, title: _title, desc: _desc };
            break;
          }
          i = i + 1;
        }

        // react에게 state가 변경되었음을 알림.
        this.setState({
          contents: _contents,
          mode: 'read' // 수정하고 나서 바로 상세보기로 바꾸기
        });

      }.bind(this)}></UpdateContent>
    }

    return _article
  }

  // render 함수: 어떤 HTML을 그릴것인지 결정하는 함수
  render() {
    // render안에서의 this는 render함수를 가진 컴포넌트다.
    // console.log('App render', this);

    return (
      <div className="App" >
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            // 아래 코드에서 this는 App Component가 아니라 함수를 가리키는 것 같다.
            // 함수가 끝난 직후 bind 넣어주자. 그러면 this가 가리키는게 App Component가 된다.
            // 그리고 아래처럼 코드를 작성해도 state의 값이 바뀌지 않는다. react의 문법대로 해야한다.

            // this.state.mode = 'welcome';

            // state를 변경할 때
            this.setState({
              mode: 'welcome'
            })
          }.bind(this)}></Subject>
        <TOC
          data={this.state.contents}
          onChangePage={function (id) {

            this.setState({
              mode: 'read',
              selectedContentId: Number(id)
            })
          }.bind(this)}></TOC>
        <Control
          onChangeMode={function (_mode) {
            this.setState({
              mode: _mode
            })
          }.bind(this)}></Control>
        {this.getContent()}
      </div>
    )
  }
}

// npm install -g serve (간단한 웹서버)
// serve -s build (실행)
export default App;
