var postfixList = ["163.com", "gmail.com", "126.com", "qq.com", "263.net"];
var login = document.querySelector("#login");
var inputs = {
  mailBox: document.querySelector("#mail"),
  password: document.querySelector("#password"),
};
var ulList = document.querySelector("#login .hint");
var lis = document.querySelectorAll("#login .hint li");
var activeIndex = 0;
// ulList.style.display = "none";
// 1 当键盘 enter 按下 提交
// 2 当输入时，实时读取输入内容，并生成对应的lis，并渲染
// 3 当按下上下键时，切换 选择类名 并刷新内容
inputs.mailBox.addEventListener("input", function () {
  activeIndex = 0;
  creatLis(this.value, postfixList);
  lis = document.querySelectorAll("#login .hint li");
  bindClick();
});
bindKeypress();

login.onsubmit = function () {
  console.log(inputs.mailBox.value + " " + inputs.password.value);
  if (inputs.mailBox.value == "" || inputs.password.value == "") {
    return false;
  }
};

function creatLis(content, arr) {
  ulList.innerHTML = "";
  if (content.trim() != "") {
    //如果字符串不全空格或空
    var index = 0;
    var atIndex = content.indexOf("@");

    if (atIndex >= 0) {
      //有@则判断，无@直接跳过
      var tail = content.slice(atIndex + 1);
      var tailLength = tail.length;
      for (var i = 0; i < arr.length; i++) {
        var front = arr[i].slice(0, tailLength);
        content = content.slice(0, atIndex);
        // console.log(tail + " " + front + " " + tailLength);
        // console.log(tail == front);
        // console.log(content);
        if (tail == front) {
          var li = document.createElement("li"); //生成li标签
          if (index == 0) {
            li.className = "lis-select"; //默认给第一个li选中类名
          }
          index++;
          li.innerHTML = content + "@" + arr[i]; //写入li内容
          ulList.appendChild(li); //添加li
        }
      }
    } else {
      //没有@
      for (var i = 0; i < arr.length; i++) {
        var li = document.createElement("li"); //生成li标签
        if (index == 0) {
          li.className = "lis-select"; //默认给第一个li选中类名
        }
        index++;
        li.innerHTML = content + "@" + arr[i]; //写入li内容
        ulList.appendChild(li); //添加li
      }
    }
  }
}

function bindClick() {
  for (var i = 0; i < lis.length; i++) {
    lis[i].addEventListener("click", function () {
      inputs.mailBox.value = this.innerHTML;
      ulList.innerHTML = "";
      inputs.password.focus();
    });
  }
}

function bindKeypress() {
  inputs.mailBox.addEventListener("keydown", function (event) {
    // console.log(event.keyCode);
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 37) {
      //左
      if (activeIndex > 0) {
        lis[activeIndex].className = "";
        activeIndex -= 1;
        lis[activeIndex].className = "lis-select";
      }
    }
    if (e && e.keyCode == 39) {
      // 右
      if (activeIndex < lis.length - 1) {
        lis[activeIndex].className = "";
        activeIndex += 1;
        lis[activeIndex].className = "lis-select";
      }
    }
    if (e && e.keyCode == 38) {
      // 上
      if (activeIndex > 0) {
        lis[activeIndex].className = "";
        activeIndex -= 1;
        lis[activeIndex].className = "lis-select";
      }
    }
    if (e && e.keyCode == 40) {
      // 下
      if (activeIndex < lis.length - 1) {
        lis[activeIndex].className = "";
        activeIndex += 1;
        lis[activeIndex].className = "lis-select";
      }
    }
    if (e && e.keyCode == 13) {
      // 确认
      // console.log(lis);
      this.value = lis[activeIndex].innerHTML;
      ulList.innerHTML = "";
      inputs.password.focus();
    }
  });
}
