
/* 定数 */
const TIME_MAX = 60;

/* 関数 */
// 初期化
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
    prepareToGame(0);
    updateGameScene(0);
    updateScore(0);
/*
  // URLにシード値を持たせて同じタイピング内容で遊べるように検討しようとした名残
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
*/
  }
});

// ゲーム開始準備
var wholeArray; // タイピング文字列
function prepareToGame(kind)
{
  wholeArray = "";
  var targetArray;
  $("#target").empty();
  switch(kind)
  {
    case 0:
      targetArray = TargetEWords;
      break;
    default:
      break;
  }

  for(var i = (targetArray.length - 1 ); 0 < i ; i--)
  {
    var r = Math.floor(Math.random() * (i + 1));

    var tmp = targetArray[i];
    targetArray[i] = targetArray[r];
    targetArray[r] = tmp;
  }

  wholeArray += targetArray[0];
  for(var i=1; i < 50; i++)
  {
    wholeArray+=(" " + targetArray[i]);
  }

  for(var i=0; i < wholeArray.length; i++)
  {
    $("#target").append("<font color='silver' style='font-family=monospace, serif;'>"+wholeArray.charAt(i)+"</font>");
  }
  updateColor(targetIndex,"blue",true);
}

// シーン切り替え
var Scenes = 
{
  title : 0,
  menu : 1,
  game : 2
};

// ゲームシーンの更新
var gameScene;
function updateGameScene(scene)
{
  gameScene = scene;
  $("#titleBox").css('display', scene == Scenes.title ? 'block' : 'none');
  $("#menuBox").css('display', scene == Scenes.menu ? 'block' : 'none');
  $("#gameBox").css('display', scene == Scenes.game ? 'block' : 'none');
}

// 入力判定
var targetIndex = 0;
var missCount = 0;
$(window).keydown(function(event)
{
  var inp = event.key;

  if(gameScene == Scenes.title)
  {
    // メニュー画面作ろうととしたけど英単語モードだけになったのでカット
    //updateGameScene(Scenes.menu);
    updateGameScene(Scenes.game);
  }
  else if(gameScene == Scenes.menu)
  {
    updateGameScene(2);
  }
  else if(gameScene == Scenes.game)
  {
    if(endFlag)
    {
      if(inp == "Enter")
      {
        // 復帰処理
        restartGame();
      }
      return;
    }
    else if(inp == "Shift")
    {
      // 大文字対応、Shiftキー押下時は何もしない
    }
    else if(inp == wholeArray.charAt(targetIndex))
    {
      startGame();
      updateColor(targetIndex,"gray");
      targetIndex++;
      if(targetIndex == wholeArray.length)
      {
        // 全ターゲット入力
        $("#gameBox").append("<div align='center'>おめでとうございます！</div>");
      }
      else {
        updateColor(targetIndex,"blue", true);
      }
    }
    else {
      missCount++;
      updateColor(targetIndex,"red", true);
    }
  }
});

// フォント更新
function updateColor(index,color,ub)
{
  var letter = $("font").eq(index);
  letter.css("color", color);

  if(ub)
  {
    letter.css("textDecoration","underline");
  }else{
    letter.css("textDecoration","none");
  }
}

// ゲーム開始
var gameFlag = false;
var endFlag = false;
var time=0;
var timer;
function startGame()
{
  if(gameFlag)
  {
    return;
  }
  gameFlag = true;
  time = 0;
  timer = setInterval(updateScore,1000,1);
}

// ゲーム終了
function endGame()
{
  endFlag = true;
  clearInterval(timer);
  $("#resultBox").css('visibility','visible');
}

// ゲーム再開
function restartGame()
{
  gameFlag = false;
  endFlag = false;
  time = 0;
  targetIndex = 0;
  missCount = 0;
  $("#resultBox").css('visibility','hidden');
  prepareToGame(0);
  updateScore(0);
}

// スコア更新
function updateScore(val)
{
  time += val;
  var score = time == 0 ? 0 : Math.round(targetIndex * 60 / time);
  $("#score").html("制限時間60秒　　経過時間:" + time + "　　入力文字数:" + targetIndex + "　　入力速度:" + score + "/分");
  $("#miss").html("ミスタイプ:" + missCount);

  if(time >= TIME_MAX)
  {
    endGame();
  }
}

// ツイートボタン
function tweetBtn()
{
  var url = "https://mtbamboo.github.io/HaruType/index.html";
  var text = "HaruTypeで1分に"+targetIndex+"文字入力を達成しました!";
  if(targetIndex >= 150)
  {
    text += "すごい🥳";
  }

  window.open().location.href = ("https://twitter.com/share?url=" + url + "&text=" + text + "&count=none&lang=ja");
}