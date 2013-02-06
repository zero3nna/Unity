#pragma strict

var board = TextureGUI();
var health = SwitchGUI();
var healthCount:float = 9;

var promIcon = TextureGUI();

board.offset = Vector2(0,0);
health.offset = Vector2(100,13);
promIcon.offset = Vector2(400,31);






var noGuiStyle : GUIStyle;

var gameState:GameState;
//var healthObj:health;

var isPaused : boolean = false;


function Start () {

	NotificationCenter.DefaultCenter().AddObserver(this, "Info");
	//NotificationCenter.DefaultCenter().AddObserver(this, "Uninfo");
	NotificationCenter.DefaultCenter().AddObserver(this, "Pause");
	NotificationCenter.DefaultCenter().AddObserver(this, "Unpause");

	
}

function Pause(){
	isPaused = true;
}

function UnPause() {
	isPaused = false;
}

function Update () {

	//health.changeTexture(healthObj.currentHealth());
}

function OnGUI() {
/*
	var e : Event = Event.current;
	if(e.isKey && Input.anyKeyDown && e.keyCode.ToString() != "None"){
		print(e.keyCode.ToString());
		if(e.keyCode.ToString().CompareTo("P") && !isPaused){
		 NotificationCenter.DefaultCenter().PostNotification(this, "Pause");
		 print("drin");
		}
	
	}*/


		GUI.Box(Rect(board.offset.x,
					board.offset.y,
					board.texture.width,
					board.texture.height),
					board.texture,noGuiStyle);
		
		GUI.Box(Rect(health.offset.x,
					health.offset.y,
					health.texture.width,
					health.texture.height),
					health.texture,noGuiStyle);
					
		GUI.Label(Rect(health.offset.x+health.texture.width,
					health.offset.y+50,100,20),(healthCount * 0.3).ToString("F1"),noGuiStyle);
					
		GUI.Box(Rect(promIcon.offset.x,
					promIcon.offset.y,
					promIcon.texture.width,
					promIcon.texture.height),
					promIcon.texture,noGuiStyle);
}