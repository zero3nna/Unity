#pragma strict
var offset : Vector2;
var hsElementsName : Array = Array(9);
var hsElementsValue : Array = Array(9);
var distance : int;


var noGuiStyle : GUIStyle;

offset = Vector2(Screen.width-340,232);
distance  = 32;

function Start ()
{
	for( var i:int = 0 ; i < 9 ; i++ ){
		hsElementsName[i] = (PlayerPrefs.GetString("HPlayerName"+i));
		hsElementsValue[i] = (PlayerPrefs.GetInt("HPlayerValue"+i));
	}
	Debug.Log(hsElementsName.length);
}

function Update () {

}

function OnGUI()
{
	for( var i:int = 0 ; i < 9 ; i++ ){
		Debug.Log(PlayerPrefs.GetString("HPlayerName"+i));
		GUI.Label(Rect(offset.x,offset.y+distance*i,200,20), hsElementsName[i].ToString(),noGuiStyle);
		GUI.Label(Rect(offset.x+200,offset.y+distance*i,200,20), hsElementsValue[i].ToString(),noGuiStyle);
	}
}