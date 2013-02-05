var graphic = TextureGUI(); //(28,23);
var GUIColor:Color;

function OnGUI() {
	GUI.color = GUIColor;
	if (graphic.texture) {
		GUI.DrawTexture(Rect(graphic.offset.x,graphic.offset.y,
						Screen.width,Screen.height),
						graphic.texture,ScaleMode.StretchToFill,true);
	}
}

function AlphaUp(change:float) {
	GUIColor.a += change;
}

function setStartColor(color:Color) {
	GUIColor = color;
}


function setDelay(delay:float) {
	if (GUIColor.a > .5) {
		GUIColor.a += delay;
	} else {
		GUIColor.a -= delay;
	}
}

function AlphaDown(change:float) {
	GUIColor.a -= change;
}