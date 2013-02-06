#pragma strict

var skull : TextureGUI = TextureGUI();

var killCounter : int = 0;

var noGuiStyle : GUIStyle;

skull.offset = Vector2(Screen.width/2+100,10);

function Start () 
{
	NotificationCenter.DefaultCenter().AddObserver(this, "EnemyKilled");
	NotificationCenter.DefaultCenter().AddObserver(this, "Reset");
}

function Update () {

}

function EnemyKilled()
{
	killCounter++;
}

function Reset()
{
	killCounter = 0;
}

function OnGUI()
{
	GUI.Box(Rect(skull.offset.x,
			skull.offset.y,
			skull.texture.width,
			skull.texture.height),
			skull.texture,noGuiStyle);
	GUI.Label(Rect(skull.offset.x-150,skull.offset.y+10,150,50),killCounter.ToString("D4"),noGuiStyle);	
}

