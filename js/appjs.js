window.onload=function(){
  waterfall('main','box');
  var dataInt={"data":[{"src":'IMG_9298.JPG'},{"src":'IMG_3042.JPG'},{"src":'IMG_2865.JPG'}]}
  window.onscroll=function(){
    var oParent=document.getElementById('main');
    if (checkScrollSlide) {
      //将数据块渲染到当前页面的尾部
      for (var i = 0; i < dataInt.data.length; i++) {
        var oBox=document.createElement('div');
        oBox.className='box';
        oParent.appendChild(oBox);
        var oPic=document.createElement('div');
        oPic.className='pic';
        oBox.appendChild(oPic);
        var oImg=document.createElement('img');
        oImg.src='images/'+dataInt.data[i].src;
        oPic.appendChild(oImg);
      } 
      waterfall('main','box');
    }
  }
}

function waterfall(parent, box){
  //将main下的所有class为box的元素取出来
  var oParent=document.getElementById(parent);
  var oBoxs=getByClass(oParent,box);
  //计算整个页面显示的列数（页面宽／box的宽）
  var oBoxW=oBoxs[0].offsetWidth;
  var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
  console.log(cols);
  //设置main的宽度并剧中
  oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto;';
  var hArr=[]; //存放每一列高度的数组
  for (var i = 0; i < oBoxs.length; i++) {
    if (i<cols) {
      hArr.push(oBoxs[i].offsetHeight);
    }else{
      var minH=Math.min.apply(null,hArr);//min方法没有办法比较数组，所以我要用apply来改变this指向
      var index=getMinhIndex(hArr,minH);
      oBoxs[i].style.position='absolute';
      oBoxs[i].style.top=minH+'px';
      // oBoxs[i].style.left=index*oBoxW+'px';
      oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
      hArr[index]+=oBoxs[i].offsetHeight;
    }
  }
  console.log(hArr);
}

function getByClass(parent, className){
  var boxArr=new Array(), //用来储存获取到的所有class为box的元素，当然也可以写别的类
      oElements=parent.getElementsByTagName('*');
  for (var i = 0; i < oElements.length; i++) {
    if (oElements[i].className==className) {
      boxArr.push(oElements[i]);
    }
  }
  return boxArr;
}

function getMinhIndex(arr, val){
  for(var i in arr){
    if (arr[i]==val) {
      return i;
    }
  }
}
//检测是否具备了滚动条加载数据块的条件
function checkScrollSlide(){
  var oParent=document.getElementById('main');
  var oBoxs=getByClass(oParent,'box');//找到所有的盒子，通过索引找到最后一个盒子
  var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
  var scollTop=document.documentElement.scrollTop || document.body.scrollTop;//包含混杂模式和标准模式，浏览器兼容问题就都写上
  var height=document.body.clientHeight || document.documentElement.clientHeight;//也有混杂模式
  return (lastBoxH<scrollTop+height)?true:false;
}