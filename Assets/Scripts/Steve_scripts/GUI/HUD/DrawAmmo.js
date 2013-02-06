#pragma strict

var ammo = SwitchGUI();
var ammoPack = SwitchGUI();
var location = Location();

var weapon = SwitchGUI();
var weaponCross = SwitchGUI();

var ammoCount : int = 17;
var ammoPackCount : int = 2;

var background = TextureGUI();

private var minAmmoPack : int = 0;
private var macAmmoPack : int = 3;
private var minAmmo : int = 0;
private var maxAmmo : int = 30;

var noGuiStyle : GUIStyle;

ammo.offset = Vector2(Screen.width-60,60);
ammoPack.offset = Vector2(Screen.width-60,15);
weapon.offset = Vector2(Screen.width-300,10);
weaponCross.offset = Vector2(Screen.width/2-weaponCross.texture.width/2,Screen.height/2-weaponCross.texture.height/2);
background.offset = Vector2(Screen.width-background.texture.width,0);

function Start ()
{
	//ammo.setAnchor();
	NotificationCenter.DefaultCenter().AddObserver(this, "SwapWeapon");
	NotificationCenter.DefaultCenter().AddObserver(this, "ActiveWeapon");
	NotificationCenter.DefaultCenter().AddObserver(this, "Pause");
}

function Update () {
	location.updateLocation();
}

function OnGUI()
{
	GUI.Box(Rect(background.offset.x,
			background.offset.y,
			background.texture.width,
			background.texture.height),
			background.texture,noGuiStyle);
			
			
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

function swapWeapon() 
{
	//ammo.nextTexture();
}
function ActiveWeapon(notification : Notification){
	var current : Array = notification.data;
	Debug.Log(notification);
	if(current[0] == 1){
		weapon.changeTexture(0);
		weaponCross.changeTexture(0);
		ammo.changeTexture(0);
		ammoPack.changeTexture(0);
	}else if(current[1] == 1){
		weapon.changeTexture(1);
		weaponCross.changeTexture(1);
		ammo.changeTexture(1);
		ammoPack.changeTexture(1);
	}else if(current[2] == 1){
		weapon.changeTexture(2);
		weaponCross.changeTexture(2);
		ammo.changeTexture(1);
		ammoPack.changeTexture(1);
	}
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

function Pause(){
	GUI.color.a = 123;
}