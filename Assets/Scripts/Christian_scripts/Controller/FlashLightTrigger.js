#pragma strict

var flashlight : GameObject;
private var myLight : Light;

function Start () {
	myLight = flashlight.GetComponent("Light");
}

function Update () {
	if(Input.GetKeyDown("f")){
		myLight.enabled = !myLight.enabled;
	}
}