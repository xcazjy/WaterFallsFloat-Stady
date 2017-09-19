
$(window).on('load',function(){
  waterfall();
  var dataInt={"data":[{"src":'IMG_9298.JPG'},{"src":'IMG_3042.JPG'},{"src":'IMG_2865.JPG'}]}
  $(window).on('scroll',function(){
    if (checkScrollSlide) {
      $.each(dataInt.data,function(key, value){
        var oBox=$('<div>').addClass('box').appendTo($('#main'));
        var oPic=$('<div>').addClass('pic').appendTo($(oBox));
        $('<img>').attr('src','images/'+$(value).attr('src')).appendTo($(oPic));
       // jQuery的两大优点：支持连缀，隐式迭代
      })
      waterfall(); 
    }
  })
});

function waterfall(){
  var $boxs=$('#main>div');
  var w=$boxs.eq(0).outerWidth(); // width()只获得定义的他的宽度，outerWidth()获得的值时包含border、padding值在内的值
  var cols=Math.floor($(window).width()/w);
  $('#main').width(w*cols).css('margin','0 auto'); // 不用写px
  var arrH=[];
  $boxs.each(function(index, value){
    var h=$boxs.eq(index).outerHeight();
    if (index<cols) {
      arrH[index]=h;
    }else{
      var minH=Math.min.apply(null,arrH);
      var minHIndex=$.inArray(minH,arrH); // jquery判断值在数组内的索引用$.inArray();
      $(value).css({
        'position':'absolute',
        'top':minH+'px',
        'left':minHIndex*w+'px'
      })// DOM对象转换成jquery对象就用$()才能用jquery方法
      arrH[minHIndex]+=$boxs.eq(index).outerHeight();
    }
  });
} 

function checkScrollSlide(){
  var $lastBox=$('#main>div').last();
  var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
  var scrollTop=$(window).scrollTop();
  var documentH=$(window).height();
  return(lastBoxDis<scrollTop+documentH)?true:false;
}