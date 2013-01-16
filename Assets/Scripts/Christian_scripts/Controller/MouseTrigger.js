#pragma strict

function Start () {

}

function Update () {
	if(Input.GetMouseButton(0)){
		Debug.Log("mouse:button(0)");
		NotificationCenter.DefaultCenter().PostNotification(this, "Fire");
	}
}