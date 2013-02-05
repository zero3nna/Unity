#pragma strict

var backBtn = TextureGUI();
var levelToLoadOnBack:String;
var highscoreTexture = TextureGUI();
var background = TextureGUI(); 


var noGuiStyle : GUIStyle;

var point = Vector2();
point.x = 850;
point.y = 120;
backBtn.offset = Vector2(point.x+135,point.y+441);
highscoreTexture.offset = Vector2(point.x,point.y);

function Start () {
	useGUILayout = false;

}

function Update () {
	backBtn.offset = Vector2(point.x+135,point.y+441);
	highscoreTexture.offset = Vector2(point.x,point.y);
}

function OnGUI(){
	// background //
	if (background.texture) {
		GUI.DrawTexture(Rect(background.offset.x,background.offset.y,
						Screen.width,Screen.height),
						background.texture,ScaleMode.StretchToFill,true);
		}
		
	// draw the title//
	GUI.Box(Rect(highscoreTexture.offset.x,
					highscoreTexture.offset.y,
					highscoreTexture.texture.width,
					highscoreTexture.texture.height),
					highscoreTexture.texture,noGuiStyle);
					
	if (GUI.Button(Rect(backBtn.offset.x,
					backBtn.offset.y,
					backBtn.texture.width,
					backBtn.texture.height),
					backBtn.texture,noGuiStyle)) 
	{
	Application.LoadLevel(levelToLoadOnBack);					
	}
	}
