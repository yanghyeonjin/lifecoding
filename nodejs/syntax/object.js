// 배열
var members = ["egoing", "k8805", "hoya", "hyeonjin"];
console.log(members[1]);

var i = 0;
while (i < members.length) {
    console.log(`array loop - ${members[i]}`);
    i = i + 1;
}

// 객체
var roles = {
    programmer: "egoing",
    designer: "k8805",
    manager: "hoya",
    me: "hyeonjin"
};
console.log(roles.designer);
console.log(roles["me"]);

for (var name in roles) {
    console.log(`object loop - ${name}`);
    console.log(`object loop - ${roles[name]}`);
}
