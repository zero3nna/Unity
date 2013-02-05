#pragma strict

var e : Event;

function Start () {
		NotificationCenter.DefaultCenter().AddObserver(this, "Pause");
}

function Update ()
{
	
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
function OnGUI() {
	var e : Event = Event.current;
	if(e.isKey && Input.anyKeyDown && e.keyCode.ToString() != "None"){
		print(e.keyCode.ToString());
		if(e.keyCode.ToString().CompareTo("P")){
		 NotificationCenter.DefaultCenter().PostNotification(this, "Pause");
		 print("drin");
		}
	
	}
}