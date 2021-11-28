


var rainbowCounter = 1;
var rainbowGeneratorCounter = 0;
var essenceCounter = [0,0,0,0,0,0,0];
var generatorCounter = [0,0,0,0,0,0,0];
var factoryCounter = [0,0,0,0,0,0,0];
var allGeneratorCounter = 0;
var rainbowFactoryCounter = 0;

// 0,releaseボタン非表示
// 1,releaseボタン表示済み
// 2,解放済み
var essenceScene = [2,1,0,0,0,0,0];
// 0,releaseボタン非表示
// 1,releaseボタン表示済み
// 2,解放済み
var generatorScene = [1,0,0,0,0,0,0];
// 0,releaseボタン非表示
// 1,releaseボタン表示済み
// 2,解放済み
var factoryScene = [1,0,0,0,0,0,0];

const colorIndex =
["red",
 "orange",
 "yellow",
 "green",
 "blue",
 "indigo",
 "purple"];


/*　OnClickイベント系*/
// 各エッセンス作成
// 単純増加のみ
function singleEssenceMakeButtonClick(index)
{
	essenceCounter[index]++;
}

// 各ジェネレータ作成
// エッセンスの個数がコストを上回っていれば購入
function singleGeneratorMakeButtonClick(index)
{
	if(essenceCounter[index] >= 10)
	{
		essenceCounter[index] -= 10;
		generatorCounter[index]++;
	}
}

// 全ジェネレータ作成
// 虹の個数が正の数であれば購入
function allGeneratorMakeButtonClick()
{
	if(rainbowCounter)
	{
		rainbowCounter--;
		allGeneratorCounter++;
	}
}

// 各ジェネレータ作成
// エッセンスの個数がコストを上回っていれば購入
function singleFactoryMakeButtonClick(index)
{
	if(generatorCounter[index] >= 10)
	{
		generatorCounter[index] -= 10;
		factoryCounter[index]++;
	}
}

// 全ジェネレータ作成
// 虹の個数が正の数であれば購入
function allFactoryMakeButtonClick()
{
	if(rainbowCounter >= 10)
	{
		rainbowCounter-=10;
		rainbowFactoryCounter++;
	}
}


// 虹購入
// 全部のエッセンスが存在するか確認して購入する
function singleRainbowMakeButtonClick(count) {
	var value = count;
	for(var index=0; index < 7; index++)
	{
		if(essenceCounter[index] < count && value > essenceCounter[index])
		{
			value = essenceCounter[index];
		}
	}

	rainbowCounter += value;
	for(var index=0; index < 7; index++)
	{
		essenceCounter[index] -= value;
	}
}

function releaseNextEssenceButtonClick(index)
{
	if(index && essenceCounter[index - 1] >= 10)
	{
		essenceCounter[index - 1] -= 10;
		document.getElementById(colorIndex[index] + "EssenceBox").hidden = false;
		document.getElementById(colorIndex[index] + "EReleaseButtonBox").hidden = true;
		essenceScene[index] = 2;
		essenceCounter[index]++;
	}
}

function releaseNextGeneratorButtonClick(index)
{
	if(essenceCounter[index] >= 10)
	{
		essenceCounter[index] -= 10;
		document.getElementById(colorIndex[index] + "GeneratorBox").hidden = false;
		document.getElementById(colorIndex[index] + "GReleaseButtonBox").hidden = true;
		generatorScene[index] = 2;
		generatorCounter[index]++;
	}
}

function releaseNextFactoryButtonClick(index)
{
	if(generatorCounter[index] >= 10)
	{
		generatorCounter[index] -= 10;
		document.getElementById(colorIndex[index] + "FactoryBox").hidden = false;
		document.getElementById(colorIndex[index] + "FReleaseButtonBox").hidden = true;
		factoryScene[index] = 2;
		factoryCounter[index]++;
	}
}

/* ゲーム部分 */
// ゲーム更新関数
function update()
{
	// オート加算

	// エッセンス,ジェネレータのカウンタ反映
	var plusCount = 0;
	for(index = 0; index < 7; index++)
	{
		generatorCounter[index] += factoryCounter[index] / 40 + rainbowFactoryCounter / 20;
		var gRate = generatorCounter[index] / 40 + allGeneratorCounter / 20;
		essenceCounter[index] += gRate;

		// ジェネレーターのレート
		document.getElementById(colorIndex[index] + "FacRateText").innerHTML = "" + (factoryCounter[index]/2).toFixed(2) + "/sec";		
		// ジェネレーターのレート
		document.getElementById(colorIndex[index] + "GeneRateText").innerHTML = "" + (generatorCounter[index]/2).toFixed(2) + "/sec";		
		
		document.getElementById(colorIndex[index] + "EssenceCounter").innerHTML = "" + essenceCounter[index].toFixed(2);
		// 虹ボタンの可否に使用
		if(essenceCounter[index] >= 1)
		{
			plusCount++;
		}

		// ジェネレーターの数値反映
		document.getElementById(colorIndex[index] + "GeneratorCounter").innerHTML = "" + generatorCounter[index].toFixed(2);
		// ファクトリーの数値反映
		document.getElementById(colorIndex[index] + "FactoryCounter").innerHTML = "" + factoryCounter[index].toFixed(2);

		// 表示非表示更新
		// essence
		switch(essenceScene[index])
		{
		case 0:
			if(essenceCounter[index - 1] >= 10)
			{
				document.getElementById(colorIndex[index] + "EReleaseButtonBox").hidden = false;
				essenceScene[index] = 1;
			}
			break;
		case 1:
			document.getElementById(colorIndex[index] + "EReleaseButton").disabled = (essenceCounter[index - 1] < 10);
			break;
		default:
			break;
		}
		
		// generator
		switch(generatorScene[index])
		{
		case 0:
			if(essenceCounter[index] >= 10)
			{
				document.getElementById(colorIndex[index] + "GReleaseButtonBox").hidden = false;
				generatorScene[index] = 1;
			}
			break;
		case 1:
			document.getElementById(colorIndex[index] + "GReleaseButton").disabled = (essenceCounter[index] < 10);
			break;
		default:
			document.getElementById(colorIndex[index] + "GeneratorButton").disabled = (essenceCounter[index] < 10);
			break;
		}

		// factory
		switch(factoryScene[index])
		{
		case 0:
			if(generatorCounter[index] >= 10)
			{
				document.getElementById(colorIndex[index] + "FReleaseButtonBox").hidden = false;
				factoryScene[index] = 1;
			}
			break;
		case 1:
			document.getElementById(colorIndex[index] + "FReleaseButton").disabled = (generatorCounter[index] < 10);
			break;
		default:
			document.getElementById(colorIndex[index] + "FactoryButton").disabled = (generatorCounter[index] < 10);
			break;
		}

	}

	// 虹購入ボタンの可否更新
	document.getElementById("rainbowMakeButton").disabled = (plusCount != 7);

	rainbowCounter += rainbowFactoryCounter/20;
	// 虹のカウンタ反映
	document.getElementById("rainbowCounter").innerHTML = "" + rainbowCounter.toFixed(2);
	// AllGeneratorの可否
	document.getElementById("allGeneratorButton").disabled = !rainbowCounter;
	// AllFactoryの可否
	document.getElementById("allFactoryButton").disabled = (rainbowCounter < 10);

	
	// AllGeneratorの数値反映
	document.getElementById("allGeneratorCounter").innerHTML = "" + allGeneratorCounter.toFixed(2);
	document.getElementById("allGeneRateText").innerHTML = "" + allGeneratorCounter.toFixed(2) + "/sec";
	// Allfactoryの数値反映
	document.getElementById("allFactoryCounter").innerHTML = "" + rainbowFactoryCounter.toFixed(2);
	document.getElementById("allFacRateText").innerHTML = "" + rainbowFactoryCounter.toFixed(2) + "/sec";

}

// ゲームスタート関数
function startApp()
{
	//TODO データ読み込み
	
	//更新開始(setIntervalはID指定で止めない限り永遠に間隔を守って繰り返されるので、)
	setInterval(update,50);
}