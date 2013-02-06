#pragma strict

var startBtn = TextureGUI();
var levelToLoadOnStart:String;

var highscoreBtn = TextureGUI();
var levelToLoadOnHigh:String;
var infoBtn = TextureGUI();
var endBtn = TextureGUI();

var titleGUI = TextureGUI(); 

var background = TextureGUI();

private var point = Vector2();
point.x = 720;
point.y = 300;
startBtn.offset = Vector2(point.x+0,point.y+228);
highscoreBtn.offset = Vector2(point.x+24,point.y+286);
infoBtn.offset = Vector2(point.x+285,point.y+227);
endBtn.offset = Vector2(point.x+285,point.y+286);
titleGUI.offset = Vector2(point.x+1,point.y+0);



function Start () {
	useGUILayout = false;

	NotificationCenter.DefaultCenter().AddObserver(this, "Highscore");
	NotificationCenter.DefaultCenter().AddObserver(this, "EndGame");
	NotificationCenter.DefaultCenter().AddObserver(this, "StartGame");
}

var noGuiStyle : GUIStyle;


var healthObj:Health;
var gameState:GameState;


private var GUIalpha:float = 1;

//function Info() {
	//GUIalpha = 0.3;
//}

//var isInfo:boolean;

//function UnInfo() {
	//GUIalpha = 1;
	//isInfo = false;
//}



function Update () {
	//topRight.updateLocation();
	//health.changeTexture(healthObj.currentHealth());
	//timer.setTime(gameState.GetTimerPercent());
	startBtn.offset = Vector2(point.x+0,point.y+228);
	highscoreBtn.offset = Vector2(point.x+24,point.y+286);
	infoBtn.offset = Vector2(point.x+285,point.y+227);
	endBtn.offset = Vector2(point.x+285,point.y+286);
	titleGUI.offset = Vector2(point.x+1,point.y+0);
}




function OnGUI() {
		GUI.color.a = GUIalpha;
		//background//
		if (background.texture) {
		GUI.DrawTexture(Rect(background.offset.x,background.offset.y,
						Screen.width,Screen.height),
						background.texture,ScaleMode.StretchToFill,true);
		}
		
		//info//
		if (GUI.Button(Rect(infoBtn.offset.x,
					infoBtn.offset.y,
					infoBtn.texture.width,
					infoBtn.texture.height),
					infoBtn.texture,noGuiStyle)) 
		{
			//if (!isInfo) {
				//isInfo = true;
				NotificationCenter.DefaultCenter().PostNotification(this,"Info");
			//}
		}
		
		//highscore//
		if (GUI.Button(Rect(highscoreBtn.offset.x,
					highscoreBtn.offset.y,
					highscoreBtn.texture.width,
					highscoreBtn.texture.height),
					highscoreBtn.texture,noGuiStyle)) 
		{
		Application.LoadLevel(levelToLoadOnHigh);					
		}
		
		//highscore//
		if (GUI.Button(Rect(startBtn.offset.x,
					startBtn.offset.y,
					startBtn.texture.width,
					startBtn.texture.height),
					startBtn.texture,noGuiStyle)) 
		{
		Application.LoadLevel(levelToLoadOnStart);					
		}
		
		//highscore//
		if (GUI.Button(Rect(endBtn.offset.x,
					endBtn.offset.y,
					endBtn.texture.width,
					endBtn.texture.height),
					endBtn.texture,noGuiStyle)) 
		{
		Application.Quit();					
		}
		
		// draw the title//
		GUI.Box(Rect(titleGUI.offset.x,
					titleGUI.offset.y,
					titleGUI.texture.width,
					titleGUI.texture.height),
					titleGUI.texture,noGuiStyle);		

}