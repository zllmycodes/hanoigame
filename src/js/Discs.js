//用于保存生成的圆盘对象s
var discs;
//汉诺塔游戏的构造函数
function Discs(num){
  this.num = num < 6?num:6; //保证传入的num值为小于等于6的数，若大于则赋值为6
  this.lColumn = [];
  this.mColumn = [];
  this.rColumn = [];
  this.init();
}
//圆盘初始化
Discs.prototype.init = function(){
  //初始化圆盘
  var n = this.num;
  while(n>0){
    this.lColumn.push(new Disc(n,document.getElementById('canvas')));
    n--;
  }
  //初始化有一个最底层的元素0，方便数组进行比较
  this.lColumn.push({"fig":-1});
  this.mColumn.push({"fig":-1});
  this.rColumn.push({"fig":-1});
};
//从左移动到中
Discs.prototype.ltm= function(){
  var lnum = this.lColumn.shift(),
      mnum = this.mColumn.shift();
  if(lnum.fig > mnum.fig){
    this.mColumn.unshift(mnum);
    this.mColumn.unshift(lnum);
    countStep++;
    document.getElementsByClassName('rulesRight')[0].getElementsByTagName('h4')[1].getElementsByTagName('span')[0].innerHTML = countStep;
    lnum.ltm(document.getElementById('canvas'));
  }else{
    this.mColumn.unshift(mnum);
    this.lColumn.unshift(lnum);
    var info = document.getElementsByClassName('infoPrompt')[0];
    if(lnum.fig === -1){
      info.style.color = "red";
      info.innerHTML = "圆柱上没有圆盘啦눈_눈";
    }else{
      info.style.color = "red";
      info.innerHTML = "每次移动的圆盘不能放在比它更小的圆盘上哦( ´◔ ‸◔`)";
    }
  }
};
//从中移动到左
Discs.prototype.mtl= function(){
  var lnum = this.lColumn.shift(),
      mnum = this.mColumn.shift();
  if(lnum.fig < mnum.fig){
    this.lColumn.unshift(lnum);
    this.lColumn.unshift(mnum);
    countStep++;
    document.getElementsByClassName('rulesRight')[0].getElementsByTagName('h4')[1].getElementsByTagName('span')[0].innerHTML = countStep;
    mnum.mtl(document.getElementById('canvas'));
  }else{
    this.mColumn.unshift(mnum);
    this.lColumn.unshift(lnum);
    var info = document.getElementsByClassName('infoPrompt')[0];
    if(mnum.fig === -1){
      info.style.color = "red";
      info.innerHTML = "圆柱上没有圆盘啦눈_눈";
    }else{
      info.style.color = "red";
      info.innerHTML = "每次移动的圆盘不能放在比它更小的圆盘上哦( ´◔ ‸◔`)";
    }
  }
};
//从中移动到右
Discs.prototype.mtr= function(){
  var rnum = this.rColumn.shift(),
      mnum = this.mColumn.shift();
  if(rnum.fig < mnum.fig){
    this.rColumn.unshift(rnum);
    this.rColumn.unshift(mnum);
    countStep++;
    document.getElementsByClassName('rulesRight')[0].getElementsByTagName('h4')[1].getElementsByTagName('span')[0].innerHTML = countStep;
    mnum.mtr(document.getElementById('canvas'));
  }else{
    this.mColumn.unshift(mnum);
    this.rColumn.unshift(rnum);
    var info = document.getElementsByClassName('infoPrompt')[0];
    if(mnum.fig === -1){
      info.style.color = "red";
      info.innerHTML = "圆柱上没有圆盘啦눈_눈";
    }else{
      info.style.color = "red";
      info.innerHTML = "每次移动的圆盘不能放在比它更小的圆盘上哦( ´◔ ‸◔`)";
    }
  }
  //最后一步一定是由中间到右边
  gameDone();
};
//从右移动到中
Discs.prototype.rtm= function(){
  var rnum = this.rColumn.shift(),
      mnum = this.mColumn.shift();
  if(rnum.fig > mnum.fig){
    this.mColumn.unshift(mnum);
    this.mColumn.unshift(rnum);
    countStep++;
    document.getElementsByClassName('rulesRight')[0].getElementsByTagName('h4')[1].getElementsByTagName('span')[0].innerHTML = countStep;
    rnum.rtm(document.getElementById('canvas'));
  }else{
    this.mColumn.unshift(mnum);
    this.rColumn.unshift(rnum);
    var info = document.getElementsByClassName('infoPrompt')[0];
    if(rnum.fig === -1){
      info.style.color = "red";
      info.innerHTML = "圆柱上没有圆盘啦눈_눈";
    }else{
      info.style.color = "red";
      info.innerHTML = "每次移动的圆盘不能放在比它更小的圆盘上哦( ´◔ ‸◔`)";
    }
  }
};
//游戏完成
function gameDone(){
  if(document.getElementsByClassName('rulesRight')[0].getElementsByTagName('h4')[0].getElementsByTagName('span')[0].innerHTML === countStep.toString()){
    setTimeout(function(){
      var r = confirm("恭喜你完成游戏！不如继续了解【汉诺塔】");
      if(r){
        window.open("https://baike.baidu.com/item/%E6%B1%89%E8%AF%BA%E5%A1%94/3468295?fr=aladdin","_self");
      }
      var info = document.getElementsByClassName('infoPrompt')[0];
      info.color = "green";
      info.innerHTML = "恭喜你完成游戏ヽ( ^∀^)ﾉ";
    },1700);
  }
}
