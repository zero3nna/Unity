#pragma strict

function Start () {

}

function Update () {
	NotificationCenter.DefaultCenter().AddObserver(this, "Pause");

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