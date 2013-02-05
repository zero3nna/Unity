#pragma strict

var pauseGUI = TextureGUI();
var backBtn = TextureGUI();
var infoBtn = TextureGUI();
var goOnBtn = TextureGUI();
var background = TextureGUI();

var noGuiStyle : GUIStyle;

var gameState:GameState;

function Start () {
	NotificationCenter.DefaultCenter().AddObserver(this, "Info");
	NotificationCenter.DefaultCenter().AddObserver(this, "UnInfo");
	NotificationCenter.DefaultCenter().AddObserver(this, "Pause");
	NotificationCenter.DefaultCenter().AddObserver(this, "UnPause");
	
//	if (!gameState) {
//		gameState = GameObject.FindWithTag("GameController").GetComponent(GameState);
//	}
}

function Update () {

}

private var point = Vector2();
point.x = Screen.width/2 - pauseGUI.texture.width/2;
point.y = Screen.height/2 - pauseGUI.texture.height/2;

backBtn.offset = Vector2(point.x+8,point.y+48);
infoBtn.offset = Vector2(point.x+171,point.y+63);
goOnBtn.offset = Vector2(point.x+9,point.y-3);
pauseGUI.offset = Vector2(point.x,point.y);

var activated : boolean = false;
function Info() {
	activated = true;
}

function UnInfo() {
	activated = false;
}

function OnGUI() {
		if (activated) {
		if (background.texture) {
		GUI.DrawTexture(Rect(background.offset.x,background.offset.y,
						Screen.width,Screen.height),
						background.texture,ScaleMode.StretchToFill,true);
		}

		GUI.Box(Rect(pauseGUI.offset.x,
					pauseGUI.offset.y,
					pauseGUI.texture.width,
					pauseGUI.texture.height),
					pauseGUI.texture,noGuiStyle);
					
		if (GUI.Button(Rect(goOnBtn.offset.x,
					goOnBtn.offset.y,
					goOnBtn.texture.width,
					goOnBtn.texture.height),
					goOnBtn.texture,noGuiStyle)) 
		{
					NotificationCenter.DefaultCenter().PostNotification(this,"UnPause");
		}
		if (GUI.Button(Rect(infoBtn.offset.x,
					infoBtn.offset.y,
					infoBtn.texture.width,
					infoBtn.texture.height),
					infoBtn.texture,noGuiStyle)) 
		{
					NotificationCenter.DefaultCenter().PostNotification(this,"UnPause");
		}
		if (GUI.Button(Rect(backBtn.offset.x,
					backBtn.offset.y,
					backBtn.texture.width,
					backBtn.texture.height),
					backBtn.texture,noGuiStyle)) 
		{
					Application.LoadLevel("mainmenu");
		}
	}
}

function RunCommand(menu:String) {
	switch(menu) {
		case "mainMenu":
			gameState.SaveStats();
			Application.LoadLevel("mainmenu");
			activated = false;
			break;
			
		case "startOver":
			// start level over from here
			NotificationCenter.DefaultCenter().PostNotification(this,"Unpause");
			NotificationCenter.DefaultCenter().PostNotification(this,"Reset");
			activated = false;
			break;
		default:
			//do nothing, return
			Debug.Log(this.name + ": no valid menu chosen");
			break;
	}
	
}

