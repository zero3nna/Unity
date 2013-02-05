var graphic = TextureGUI();
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
	//if (graphic.texture){
		GUI.color = GUIColor;
		GUI.Box(Rect(graphic.offset.x+startPoint.offset.x,
			graphic.offset.y+startPoint.offset.y,
			graphic.texture.width,graphic.texture.height),
			graphic.texture,noGuiStyle);
		/*GUI.Box(Rect(graphic.offset.x+startPoint.offset.x,
			graphic.offset.y+startPoint.offset.y,
			graphic.texture.width,graphic.texture.height)
			,graphic.texture,noGuiStyle);*/
	//}
}