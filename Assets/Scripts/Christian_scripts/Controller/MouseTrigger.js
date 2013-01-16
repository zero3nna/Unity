#pragma strict

function Start () {

}

function Update () {
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