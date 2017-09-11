//圆盘颜色
var discColor = ["#9a0098","#0300ff","#009800","#ffff01","#ff9500","#fe0000"];

//圆盘的构造函数
function Disc(num,canvas){
  //fig从上到下为6-1
  this.fig = +num;
  this.width = 0;
  this.height = 0;
  this.x = 0;
  this.y = 0;
  this.color = discColor[num-1];
  this.init(canvas);
}
//圆盘的初始化,主要针对w,h,x,y
Disc.prototype.init = function(canvas){
  var w = canvas.width,
      h = canvas.height,
      ctx = canvas.getContext("2d");
  ctx.fillStyle = this.color;
  switch(this.fig){
    case 6:
      this.x = w * 0.19;
      this.y = h * 0.73;
      this.width = w * 0.08;
      this.height = h * 0.04;
      ctx.fillRect(w * 0.19, h * 0.73, w * 0.08, h * 0.04);
      break;
    case 5:
      this.x = w * 0.17;
      this.y = h * 0.77;
      this.width = w * 0.12;
      this.height = h * 0.04;
      ctx.fillRect(w * 0.17, h * 0.77, w * 0.12, h * 0.04);
      break;
    case 4:
      this.x = w * 0.15;
      this.y = h * 0.81;
      this.width = w * 0.16;
      this.height = h * 0.04;
      ctx.fillRect(w * 0.15, h * 0.81, w * 0.16, h * 0.04);
      break;
    case 3:
      this.x = w * 0.13;
      this.y = h * 0.85;
      this.width = w * 0.2;
      this.height = h * 0.04;
      ctx.fillRect(w * 0.13, h * 0.85, w * 0.2, h * 0.04);
      break;
    case 2:
      this.x = w * 0.11;
      this.y = h * 0.89;
      this.width = w * 0.24;
      this.height = h * 0.04;
      ctx.fillRect(w * 0.11, h * 0.89, w * 0.24, h * 0.04);
      break;
    case 1:
      this.x = w * 0.09;
      this.y = h * 0.93;
      this.width = w * 0.28;
      this.height = h * 0.04;
      ctx.fillRect(w * 0.09, h * 0.93, w * 0.28, h * 0.04);
      break;
  }
};
//从左到中
Disc.prototype.ltm = function(canvas){
  var _this = this,
      animateDirection = "ltm";
  animateUp(_this,canvas,animateDirection);
};
//从中到左
Disc.prototype.mtl = function(){
  var _this = this,
      animateDirection = "mtl";
  animateUp(_this,canvas,animateDirection);
};
//从中到右
Disc.prototype.mtr = function(){
  var _this = this,
      animateDirection = "mtr";
  animateUp(_this,canvas,animateDirection);
};
//从右到中
Disc.prototype.rtm = function(){
  var _this = this,
      animateDirection = "rtm";
  animateUp(_this,canvas,animateDirection);
};
//向上移动的动画
var timeUp;
function animateUp(item,canvas,animateDirection){
  var h = item.y;
  if(h > canvas.height*0.3){
    item.y -= 15;
    drawDiscs(canvas);
    timeUp = setTimeout(function(){
      animateUp(item,canvas,animateDirection);
    },20);
  }else{
    if(animateDirection === "ltm" || animateDirection === "mtr"){
      clearTimeout(timeUp);
      timeUp = undefined;
      animateRight(item,canvas,animateDirection);
    }else{
      clearTimeout(timeUp);
      timeUp = undefined;
      animateLeft(item,canvas,animateDirection);
    }
  }
}
//向左移动的动画
var timeLeft;
//记录移动位置
var startX;
function animateLeft(item,canvas,animateDirection) {
  var w = item.x;
  if(!timeLeft){
    startX = item.x;
  }
  if(w > (startX-canvas.width*0.28)){
    item.x -= 12;
    drawDiscs(canvas);
    timeLeft = setTimeout(function(){
      animateLeft(item,canvas,animateDirection);
    },20);
  }else{
    clearTimeout(timeLeft);
    timeLeft = undefined;
    animateDown(item,canvas,animateDirection);
  }
}
//向右移动的动画
var timeRight;
function animateRight(item,canvas,animateDirection){
  var w = item.x;
  if(!timeRight){
    startX = item.x;
  }
  if(w < (startX+canvas.width*0.28)){
    item.x += 12;
    drawDiscs(canvas);
    timeRight = setTimeout(function(){
      animateRight(item,canvas,animateDirection);
    },20);
  }else{
    clearTimeout(timeRight);
    timeRight = undefined;
    animateDown(item,canvas,animateDirection);
  }
}
//向下移动的动画
var timeDown;
var discsnum;
function animateDown(item,canvas,animateDirection){
  if(!timeDown){
    //判断是取哪一个柱，以此来决定向下移动多少距离
    var direction = animateDirection.slice(animateDirection.indexOf("t")+1);
    discsnum = discs[direction+"Column"].length-2;
  }
  var h = item.y;
  if(h < (canvas.height*0.93-canvas.height*discsnum*0.04)){
    item.y += 5;
    drawDiscs(canvas);
    timeDown = setTimeout(function(){
      animateDown(item,canvas,animateDirection);
    },8);
  }else{
    clearTimeout(timeDown);
    timeDown = undefined;
  }
}
//绘制在柱上的圆盘
function drawDiscs(canvas){
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawColumn(ctx, canvas.width, canvas.height);
  //绘制左柱上的圆盘
  //用window.减少向上寻找变量discs的时间
  discs.lColumn.forEach(function(val,ind,arr){
    if(arr[ind].x){
      var _this = arr[ind];
      ctx.fillStyle = _this.color;
      ctx.fillRect(_this.x,_this.y,_this.width,_this.height);
    }
  });
  //绘制中间柱上的圆盘
  discs.mColumn.forEach(function(val,ind,arr){
    if(arr[ind].x){
      var _this = arr[ind];
      ctx.fillStyle = _this.color;
      ctx.fillRect(_this.x,_this.y,_this.width,_this.height);
    }
  });
  //绘制右柱上的圆盘
  discs.rColumn.forEach(function(val,ind,arr){
    if(arr[ind].x){
      var _this = arr[ind];
      ctx.fillStyle = _this.color;
      ctx.fillRect(_this.x,_this.y,_this.width,_this.height);
    }
  });
}
