window.onload = function() {
  var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext("2d");
  canvas.style.width = document.getElementsByClassName('gameShow')[0].offsetWidth;
  canvas.style.height = document.getElementsByClassName('gameShow')[0].offsetHeight;
  canvas.width = parseInt(document.getElementsByClassName('gameShow')[0].offsetWidth)*2;
  canvas.height = parseInt(document.getElementsByClassName('gameShow')[0].offsetHeight)*2;
  var w = canvas.width,
      h = canvas.height;
  drawColumn(ctx, w, h);
};
window.onresize =function(){
  var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext("2d");
  canvas.style.width = document.getElementsByClassName('gameShow')[0].offsetWidth;
  canvas.style.height = document.getElementsByClassName('gameShow')[0].offsetHeight;
  canvas.width = parseInt(document.getElementsByClassName('gameShow')[0].offsetWidth)*2;
  canvas.height = parseInt(document.getElementsByClassName('gameShow')[0].offsetHeight)*2;
  drawColumn(ctx, canvas.width, canvas.height);
};

//验证输入框
document.getElementsByClassName('setDiscNum')[0].getElementsByTagName('input')[0].onblur = function() {
  testIpt(this);
};
//预计走步数
var expectStep = [0,2,8,26,80,242,449];
//用户所走步数
var countStep = 0;
//点击开始游戏也要先验证输入是否合法
document.getElementsByClassName('setDiscNum')[0].getElementsByTagName('button')[0].onclick = function() {
  //通过验证，开始初始化canvas
  var ipt = document.getElementsByClassName('setDiscNum')[0].getElementsByTagName('input')[0];

  if (testIpt(ipt)) {
    var canvas = document.getElementById('canvas');
    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
    drawColumn(canvas.getContext("2d"), canvas.width, canvas.height);
    countStep = 0;
    discs = new Discs(ipt.value);
    document.getElementsByClassName('rulesRight')[0].getElementsByTagName('h4')[0].getElementsByTagName('span')[0].innerHTML = expectStep[+ipt.value];
    document.getElementsByClassName('rulesRight')[0].getElementsByTagName('h4')[1].getElementsByTagName('span')[0].innerHTML = countStep;
  }
};
//从左到中
document.getElementById("ltm").onclick = function(){
  var info = document.getElementsByClassName('infoPrompt')[0];
  info.innerHTML = "";
  discs.ltm();
};
//从中到左
document.getElementById("mtl").onclick = function(){
  var info = document.getElementsByClassName('infoPrompt')[0];
  info.innerHTML = "";
  discs.mtl();
};
//从中到右
document.getElementById("mtr").onclick = function(){
  var info = document.getElementsByClassName('infoPrompt')[0];
  info.innerHTML = "";
  discs.mtr();
};
//从右到中
document.getElementById("rtm").onclick = function(){
  var info = document.getElementsByClassName('infoPrompt')[0];
  info.innerHTML = "";
  discs.rtm();
};
//验证输入框的函数
function testIpt(ipt) {
  var val = ipt.value.trim(),
    info = document.getElementsByClassName('infoPrompt')[0];
  if (/\d/.test(val)) {
    if(+val>0){
      if (+val <= 6) {
        info.style.color = "#617e9e";
        info.innerHTML = "开始游戏吧~(●’◡’●)ﾉ";
        return true;
      } else {
        info.style.color = "red";
        info.innerHTML = "输入一个不大于6的数字嘛Ծ‸Ծ";
        return false;
      }
    }else{
      info.style.color = "red";
      info.innerHTML = "要不输入1试试 (,,•́ . •̀,,)";
      return false;
    }
  } else {
    info.style.color = "red";
    info.innerHTML = "要不输入一个数字试试 (..•˘_˘•..)";
    return false;
  }
}
//画汉诺塔游戏柱子
function drawColumn(ctx, w, h) {
  ctx.fillStyle = "#f4a460";
  //底部
  ctx.fillRect(w * 0.06, h * 0.97, w * 0.9, h * 0.03);
  //三个柱
  ctx.fillRect(w * 0.22, h * 0.5, w * 0.02, h * 0.5);
  ctx.fillRect(w * 0.5, h * 0.5, w * 0.02, h * 0.5);
  ctx.fillRect(w * 0.78, h * 0.5, w * 0.02, h * 0.5);
}
