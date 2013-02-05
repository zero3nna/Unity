#pragma strict

private var konamiCode = ["UpArrow", "UpArrow", "DownArrow", "DownArrow", "LeftArrow", "RightArrow", "LeftArrow", "RightArrow", "B", "A", "Return"];
private var currentPos : int = 0;
private var inKonami : boolean = false;
private var health : Health;
private var swap : WeaponSwap;
private var cam : Transform;
private var extinguisher : Extinguisher;

function OnGUI () {
    var e : Event = Event.current;
    if (e.isKey && Input.anyKeyDown && !inKonami && e.keyCode.ToString()!="None") {
       konamiFunction (e.keyCode);
    }
}

function Start(){
	//health = GetComponent(Health);
	//swap = GameObject.Find("Weapons").GetComponent(WeaponSwap);
	//cam = GameObject.Find("Camera").GetComponent(Transform);
	var obj : GameObject = GameObject.Find("Extinguisher");
	if(obj != null){
		extinguisher = obj.GetComponent(Extinguisher);
	}else{
		Debug.Log("not found");
	}
	Debug.Log(extinguisher);
}

function LateUpdate () {
    if (inKonami && extinguisher) {
       //health.Heal();
       extinguisher.enableEaster();
       
    }
}

function konamiFunction (incomingKey) {
	Debug.Log(incomingKey);
    var incomingKeyString = incomingKey.ToString();
    if(incomingKeyString==konamiCode[currentPos]) {
       print("Unlocked part "+(currentPos+1)+"/"+konamiCode.length+" with "+incomingKeyString);
       currentPos++;

       if((currentPos+1)>konamiCode.length){
         print("You master Konami.");
         inKonami=true;
         currentPos=0;
       }
    } else {
       print("You fail Konami at position "+(currentPos+1)+", find the ninja in you.");
       currentPos=0;
    }

}