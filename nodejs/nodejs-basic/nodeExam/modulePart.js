var object = {
    v: "v",
    f: function() {
        console.log(this.v);
    }
};

// object라는 객체를 이 모듈 바깥에서 사용할 수 있도록 하겠다.
module.exports = object;
