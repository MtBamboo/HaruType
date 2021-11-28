

function cUpdate() {
  //描画コンテキストの取得
  var canvas = document.getElementById('calendar');
  if (canvas.getContext) {
    var context = canvas.getContext('2d');
    context.textAlign = "center";
    context.textBaseline = "middle";

    for(var i=0;i<5;i++)
    {
      for(var j=0;j<5;j++)
      {
        context.fillStyle = "green";
        context.fillRect(100*i + 5, 100*j + 5, 90, 90);
        context.fillStyle = "blue";
        context.fillText(i+','+j, 100*i + 50, 100*j + 50);
      }
    }
  }
}