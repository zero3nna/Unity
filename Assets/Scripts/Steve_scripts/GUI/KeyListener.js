#pragma strict

var gamestate : GameState;


function Start ()
{
		
		//NotificationCenter.DefaultCenter().AddObserver(this, "Pause");
		//NotificationCenter.DefaultCenter().AddObserver(this, "Uninfo");
		if (!gamestate) 
		{
			gamestate = GameObject.FindGameObjectWithTag("GameState").GetComponent("GameState");
		}
}

function Update ()
{
	Debug.Log("Tick");
	if(Input.GetKeyDown("p") && !gamestate.isPaused){
	print("p");
	NotificationCenter.DefaultCenter().PostNotification(this, "Pause");
	}else if(Input.GetKeyDown("p") && gamestate.isPaused){
	print("p");
	NotificationCenter.DefaultCenter().PostNotification(this, "Unpause");
	}else if(Input.GetKeyDown("i") && !gamestate.isInfo){
	print("i");
	NotificationCenter.DefaultCenter().PostNotification(this, "Info");
	}else if(Input.GetKeyDown("i") && gamestate.isInfo){
	print("i");
	NotificationCenter.DefaultCenter().PostNotification(this, "Uninfo");
	}
	
	
	/*if(e.isKey && Input.anyKeyDown && e.keyCode.ToString() != "None"){
		print(e.keyCode.ToString());
		if(e.keyCode.ToString().CompareTo("P")){
		 NotificationCenter.DefaultCenter().PostNotification(this, "Pause");
		 print("drin");
		}
	
	}
	/*	if(Input.GetMouseButton(0)){
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
	}*/

}
/*function OnGUI() {
		Debug.Log("Tick");
	/*var e : Event = Event.current;
	if(e.isKey && Input.anyKeyDown && e.keyCode.ToString() != "None"){
		print(e.keyCode.ToString());
		if(e.keyCode.ToString().CompareTo("P")){
		 NotificationCenter.DefaultCenter().PostNotification(this, "Pause");
		 print("drin");
		}
	
	}
}*/