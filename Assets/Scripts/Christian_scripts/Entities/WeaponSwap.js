var assaultRifle : GameObject;
var crowbar : GameObject;
var extinguisher : GameObject;

var current = new Array(0,0,0);
var acquired : int[] = new int[3];

var audioSwap : AudioSource;

private var assaultComponent : AssaultRifle;
private var crowbarComponent : Crowbar;
private var extinguisherComponent : Extinguisher;

function Start ()
{
		NotificationCenter.DefaultCenter().AddObserver(this, "SwapWeapon");
		
		assaultRifle.SetActiveRecursively(true);
		crowbar.SetActiveRecursively(false);
		extinguisher.SetActiveRecursively(false);
		
		assaultComponent = assaultRifle.GetComponent(AssaultRifle);
		crowbarComponent = null;
		acquired = [1,1,0];
		extinguisherComponent = extinguisher.GetComponent(Extinguisher);
}

function countWeapons(){
	var count = 0;
	for(var i = 0; i < acquired.length; i++){
		if(acquired[i] == 1){
			count++;
		}
	}
	return count;
}

function ArrayAnd(arr1:Array, arr2:Array){
	var arr3 : int[] = new int[arr1.length];
	
	if(arr1.length == arr2.length){
		//beide gleich lang
		for(var i= 0; i < arr1.length; i++){
			arr3[i] = (arr1[i] == 1 && arr2[i] == 1) ? 1 : 0;
		}
	}
	
	return arr3;
}

function SwapWeapon(notification : Notification)
{
	if(this.countWeapons() > 0){
		if(this.countWeapons() > 1){	
			audioSwap.Play();
		}
		var dir = notification.data;
		Debug.Log(notification.data);
		if (assaultRifle.active == true) 
		{
			current = new Array(1,0,0);
			current = shiftDir(current, dir);
		}
		else if (crowbar.active == true) 
		{
			current = new Array(0,1,0);
			current = shiftDir(current, dir);
		} 
		else if(extinguisher.active == true)
		{
			current = new Array(0,0,1);
			current = shiftDir(current, dir);
		}
		
		
		Debug.Log("has " + acquired[0] + ":"+acquired[1] + ":"+acquired[2]);
		
		var index = 0;		
		var acquiredCheckArray = this.ArrayAnd(acquired, current);
		
		Debug.Log("and " + acquiredCheckArray[0] + ":"+acquiredCheckArray[1] + ":"+acquiredCheckArray[2]);
		
		while(ArrayUtility.IndexOf(acquiredCheckArray, 1) == -1 && index < current.length){
			Debug.Log("Shuffling weiter");
			index++;
			current = shiftDir(current, dir);
			acquiredCheckArray = this.ArrayAnd(acquired, current);
		}
		
		assaultRifle.SetActiveRecursively(current[0]);
		crowbar.SetActiveRecursively(current[1]);
		extinguisher.SetActiveRecursively(current[2]);
	
		NotificationCenter.DefaultCenter().PostNotification(this, "ActiveWeapon", current);
	}
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