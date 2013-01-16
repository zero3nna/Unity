var gun1 : GameObject;
var gun2 : GameObject;
var gun3 : GameObject;
var current = new Array(0,0,0);


function Start ()
{
		NotificationCenter.DefaultCenter().AddObserver(this, "SwapWeapon");
		
		gun1.SetActiveRecursively(true);
		gun2.SetActiveRecursively(false);
		gun3.SetActiveRecursively(false);
}

function Maximize(scale){
	if(gun1.active){
		gun1.transform.localScale = Vector3(scale,scale,scale + 1);
	}else if(gun2.active){
		gun2.transform.localScale = Vector3(scale,scale,scale + 1);
	}else{
		gun3.transform.localScale = Vector3(scale,scale,scale + 1);
	}
}

function SwapWeapon(notification : Notification)
{
	var dir = notification.data;
	Debug.Log(notification.data);
	if (gun1.active == true) 
	{
		current = new Array(1,0,0);
		current = shiftDir(current, dir);
	}
	else if (gun2.active == true) 
	{
		current = new Array(0,1,0);
		current = shiftDir(current, dir);
	} 
	else 
	{
		current = new Array(0,0,1);
		current = shiftDir(current, dir);
	}
	gun1.SetActiveRecursively(current[0]);
	gun2.SetActiveRecursively(current[1]);
	gun3.SetActiveRecursively(current[2]);
	
	NotificationCenter.DefaultCenter().PostNotification(this, "ActiveWeapon");
}

function shiftDir(arr, dir){
	Debug.Log("before shift " + arr);
	var carry;
	if(dir < 0){
		//links
		carry = arr.Shift();
		arr.Push(carry);
	}else{
		//rechts
		carry = arr.Pop();
		arr.Unshift(carry);
	}
	Debug.Log("shifted " + arr);
	return arr;
}