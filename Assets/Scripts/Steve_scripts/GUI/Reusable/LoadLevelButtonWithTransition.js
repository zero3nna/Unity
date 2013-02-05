var levelToLoad:String;
var graphic = TextureGUI(); //(28,23);
var startPoint = Location();
var GUIColor:Color = Color.white;

var fullScreen = TextureGUI();
var fullScreenGUIColor:Color = Color(0,0,0,0);

var noGuiStyle : GUIStyle;

function Start() {
	graphic.setAnchor();
}

var isClicked:boolean = false;

function Update() {
	if (graphic.texture){
		startPoint.updateLocation();
	}
	
	if (isClicked) {
		fullScreenGUIColor += Color(Time.deltaTime,Time.deltaTime,Time.deltaTime,Time.deltaTime);
	}
}

function OnGUI() {
	GUI.color = GUIColor;
	if (GUI.Button(Rect(graphic.offset.x+startPoint.offset.x,
				graphic.offset.y+startPoint.offset.y,
				graphic.texture.width,
				graphic.texture.height),
				graphic.texture,noGuiStyle))
	{
		isClicked = true;
		WaitAndLoad();
	}
	
	GUI.color = fullScreenGUIColor;
	GUI.DrawTexture(Rect(fullScreen.offset.x,fullScreen.offset.y,
					Screen.width,Screen.height),
					fullScreen.texture,ScaleMode.StretchToFill,true);	
}

function WaitAndLoad() {
	yield WaitForSeconds(1);
	Application.LoadLevel(levelToLoad);
}