var levelToLoad:String;
var graphic = TextureGUI(); //(28,23);
var startPoint = Location();
var GUIColor:Color = Color.white;
var noGuiStyle : GUIStyle;

function Start() {
	graphic.setAnchor();
}

function Update() {
	if (graphic.texture){
		startPoint.updateLocation();
	}
}

function OnGUI() {
	GUI.color = GUIColor;
	if (GUI.Button(Rect(graphic.offset.x+startPoint.offset.x,graphic.offset.y+startPoint.offset.y,graphic.texture.width,graphic.texture.height),graphic.texture,noGuiStyle)) {
		Application.LoadLevel(levelToLoad);					
	}			
}