#pragma strict

var ammo = TextureGUI();
var ammoPack = TextureGUI();
var location = Location();

var ammoCount : int = 17;
var ammoPackCount : int = 2;

private var minAmmoPack : int = 0;
private var macAmmoPack : int = 3;
private var minAmmo : int = 0;
private var maxAmmo : int = 30;

var noGuiStyle : GUIStyle;

ammo.offset = Vector2(Screen.width-60,60);
ammoPack.offset = Vector2(Screen.width-60,15);

function Start ()
{
	//ammo.setAnchor();
	NotificationCenter.DefaultCenter().AddObserver(this, "SwapWeapon");
}

function Update () {
	location.updateLocation();
}

function OnGUI()
{
	GUI.Box(Rect(ammoPack.offset.x,
			ammoPack.offset.y,
			ammoPack.texture.width,
			ammoPack.texture.height),
			ammoPack.texture,noGuiStyle);
	GUI.Label(Rect(ammoPack.offset.x-50,ammoPack.offset.y+4,50,36),ammoPackCount.ToString("D2"),noGuiStyle);	
			
	GUI.Box(Rect(ammo.offset.x,
			ammo.offset.y,
			ammo.texture.width,
			ammo.texture.height),
			ammo.texture,noGuiStyle);
	GUI.Label(Rect(ammo.offset.x-50,ammo.offset.y+4,50,36),ammoCount.ToString("D2"),noGuiStyle);
}

function swapWeapon() 
{
	//ammo.nextTexture();
}

function UpdateAmmo (input : int)
{
	if (input <= 0){
		ammoCount = 0;
	} else if (input >= 30){
		ammoCount = 30;
	}else{
		ammoCount = input;
	}
}

function UpdateAmmoPack (input : int)
{
	if (input <= 0){
		ammoPackCount = 0;
	} else if (input >= 3){
		ammoPackCount = 3;
	}else{
		ammoPackCount = input;
	}
}