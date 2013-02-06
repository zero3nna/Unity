#pragma strict
var healthBottle = SwitchGUI();

var maxHealth : int = 9;
var currentHealth : int = 4;

var background = TextureGUI();
var pptSign = TextureGUI();

var noGuiStyle : GUIStyle;

background.offset = Vector2(0,5);
healthBottle.offset = Vector2(100,17);
pptSign.offset = Vector2(400,28);


function Start () {

}

function Update () {

}

function OnGUI()
{
	GUI.Box(Rect(background.offset.x,
			background.offset.y,
			background.texture.width,
			background.texture.height),
			background.texture,noGuiStyle);
			
	GUI.Box(Rect(healthBottle.offset.x,
			healthBottle.offset.y,
			healthBottle.texture.width,
			healthBottle.texture.height),
			healthBottle.texture,noGuiStyle);
			
	GUI.Box(Rect(pptSign.offset.x,
			pptSign.offset.y,
			pptSign.texture.width,
			pptSign.texture.height),
			pptSign.texture,noGuiStyle);
			
	GUI.Label(Rect(pptSign.offset.x-60,pptSign.offset.y,50,38),(currentHealth * 0.3).ToString("F1"),noGuiStyle);
}