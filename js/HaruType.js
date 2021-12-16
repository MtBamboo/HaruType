
/* 変数 */
var targetIndex = 0;
var targetArray = ["a","b","c","d","e","f","g","h","i","j"];
const targetNum = 10;

/* 関数 */
$(document).ready(function(){
  const ua = navigator.userAgent;
  if (ua.indexOf('iPhone') > -1 || (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)) {
    // スマートフォン
    alert('ごめんなさい、スマートフォンは未対応です＞＜');
    $("#state").text("スマートフォンは未対応です＞＜");
  } else if (ua.indexOf('iPad') > -1 || ua.indexOf('Android') > -1) {
    // タブレット
    alert('ごめんなさい、タブレットは未対応です＞＜');
    $("#state").text("タブレットは未対応です＞＜");
  } else {
    // PC
    prepareToGame();

    var urlPrm = new Object;
    var urlSearch = location.search.substring(1).split('&');

    for(i=0;urlSearch[i];i++) {
      var kv = urlSearch[i].split('=');
      urlPrm[kv[0]]=kv[1];
    }

    if(urlPrm.seed)
    {
      $("#seedBox").append("<font color='green'>seed:"+urlPrm.seed+"</font>");
    }

    var single = TargetWords[0];
    var str = "target:"+single.getWord+":"+single.getLen+":"+single.getLatin[0];
    $("#seedBox").append("<font color='blue'>target:"+str+"</font>");
  }
});

$(window).keydown(function(event){
  var inp = event.key;
  if(inp == targetArray[targetIndex])
  {
    updateColor(targetIndex,"gray");
    $("#collect").append(targetArray[targetIndex]);
    targetIndex++;
    if(targetIndex == targetNum)
    {
      $("#gameArea").append("<div align='center'>おめでとうございます！</div>");
    }
    else {
      updateColor(targetIndex,"blue");
    }
  }
  else {
    updateColor(targetIndex,"red");
  }
});

function prepareToGame()
{
  for(var i=0; i< 10; i++)
  {
    $("#target").append("<font color='silver'>"+targetArray[i]+"</font>");
  }
  updateColor(targetIndex,"blue");      
}

function updateColor(index,color)
{
  $("font").eq(index).css("color", color);
}
