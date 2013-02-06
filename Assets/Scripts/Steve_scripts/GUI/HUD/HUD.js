#pragma strict

var board = TextureGUI();
var health = SwitchGUI();
var healthCount:float = 9;

var promIcon = TextureGUI();

var kill = TextureGUI();
var killCount:int = 0;

var weapon = SwitchGUI();
var weaponCross = SwitchGUI();

var rightBackground = TextureGUI();

board.offset = Vector2(0,0);
health.offset = Vector2(100,13);
promIcon.offset = Vector2(400,31);
rightBackground.offset = Vector2(Screen.width - rightBackground.texture.width,0);
weapon.offset = Vector2(Screen.width - (rightBackground.texture.width + 80),10);
weaponCross.offset = Vector2(Screen.width/2,Screen.height/2);
kill.offset = Vector2(Screen.width/2+20,5);




var noGuiStyle : GUIStyle;

var gameState:GameState;
//var healthObj:health;

var isPaused : boolean = false;


function Start () {

	NotificationCenter.DefaultCenter().AddObserver(this, "Info");
	//NotificationCenter.DefaultCenter().AddObserver(this, "Uninfo");
	NotificationCenter.DefaultCenter().AddObserver(this, "Pause");
	NotificationCenter.DefaultCenter().AddObserver(this, "Unpause");
	NotificationCenter.DefaultCenter().AddObserver(this, "EnemyKilled");
	NotificationCenter.DefaultCenter().AddObserver(this, "ActivWeapon");
	
}

function Pause(){
	isPaused = true;
}

function UnPause() {
	isPaused = false;
}

function EnemyKilled() {
	killCount++;
}

function Update () {

	//health.changeTexture(healthObj.currentHealth());
}
function ActiveWeapon(notification : Notification){
	var current = notification.data;
	if(current[0] == 1){
		weapon.changeTexture(0);
	}else if(current[1] == 1){
		weapon.changeTexture(1);
	}else if(current[2] == 1){
		weapon.changeTexture(2);
	}
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
					

		GUI.Box(Rect(kill.offset.x,
					kill.offset.y,
					kill.texture.width,
					kill.texture.height),
					kill.texture,noGuiStyle);
		GUI.Label(Rect(kill.offset.x-40,
					kill.offset.y+60,40,40),killCount.ToString("D4"),noGuiStyle);
					
		GUI.Box(Rect(rightBackground.offset.x,
					rightBackground.offset.y,
					rightBackground.texture.width,
					rightBackground.texture.height),
					rightBackground.texture,noGuiStyle);
					
		GUI.Box(Rect(weapon.offset.x,
					weapon.offset.y,
					weapon.texture.width,
					weapon.texture.height),
					weapon.texture,noGuiStyle);
					
		GUI.Box(Rect(weaponCross.offset.x,
					weaponCross.offset.y,
					weaponCross.texture.width,
					weaponCross.texture.height),
					weaponCross.texture,noGuiStyle);					
}