#pragma strict

var audioAmbient1 : AudioSource;
var audioAmbient2 : AudioSource;

function Start () {
	audioAmbient1.Play();
	audioAmbient2.Play();

}

function Update () {
	if(Input.GetKeyDown("o")){
	Debug.Log("o");
	}
	if(Input.GetMouseButton(0)){
		Debug.Log("mouse:button(0)");
		NotificationCenter.DefaultCenter().PostNotification(this, "Fire");
	}
	if(Input.GetAxis("Mouse ScrollWheel")){
		var wheelDir = Input.GetAxis("Mouse ScrollWheel");
		if(wheelDir < 0){
			NotificationCenter.DefaultCenter().PostNotification(this, "SwapWeapon", -1);
		}else{
			NotificationCenter.DefaultCenter().PostNotification(this, "SwapWeapon", 1);
		}
		Debug.Log("MOUSE WHEEL");
	}
}