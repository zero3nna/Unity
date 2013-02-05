#pragma strict

var infoGUI = TextureGUI();
var backBtn = TextureGUI();
var background = TextureGUI();

var noGuiStyle : GUIStyle;

var gameState:GameState;

function Start () {
	NotificationCenter.DefaultCenter().AddObserver(this, "Info");
	NotificationCenter.DefaultCenter().AddObserver(this, "UnInfo");
//	if (!gameState) {
//		gameState = GameObject.FindWithTag("GameController").GetComponent(GameState);
//	}
}

function Update () {

}

var point = Vector2();
point.x = Screen.width/2 - infoGUI.texture.width/2;
point.y = Screen.height/2 - infoGUI.texture.height/2;

backBtn.offset = Vector2(point.x+24,point.y+460);
infoGUI.offset = Vector2(point.x,point.y);

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

		GUI.Box(Rect(infoGUI.offset.x,
					infoGUI.offset.y,
					infoGUI.texture.width,
					infoGUI.texture.height),
					infoGUI.texture,noGuiStyle);
					
		if (GUI.Button(Rect(backBtn.offset.x,
					backBtn.offset.y,
					backBtn.texture.width,
					backBtn.texture.height),
					backBtn.texture,noGuiStyle)) 
		{
					NotificationCenter.DefaultCenter().PostNotification(this,"UnInfo");
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

