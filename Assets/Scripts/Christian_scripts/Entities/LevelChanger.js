#pragma strict
var levelName : String;

function Start () {

}

function Update () {

}

function OnTriggerEnter (other : Collider) {
	if(other.tag == "Player"){
		//Player entered
		
		NotificationCenter.DefaultCenter().PostNotification(this, "ChangeLevel",0);
		Application.LoadLevel(levelName);
	}
    Debug.Log(other.tag);
}