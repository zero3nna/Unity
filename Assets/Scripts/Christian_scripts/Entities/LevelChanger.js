#pragma strict
var levelName : String;

function Start () {

}

function Update () {

}

function OnTriggerEnter (other : Collider) {
	if(other.tag == "Player"){
		//Player entered
		Application.LoadLevel(levelName);
	}
    Debug.Log(other.tag);
}