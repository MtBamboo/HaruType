
class TargetWord {
	constructor(len,word,latin)
	{
		this.len = len;
		this.word = word;
		this.latin = latin;
	}

	get getLen()
	{
		return this.len;
	}

	get getWord()
	{
		return this.word;
	}

	get getLatin()
	{
		return this.latin;
	}
}

let TargetWords = [new TargetWord(3,"あいう",["a","i","u"]), new TargetWord(2,"えお",["e","o"])];


