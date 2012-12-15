#pragma strict

var wps:GameObject[];
var playerTransform:Transform;

function Start () {

	//now we ware setting up the player
	playerTransform = GameObject.FindGameObjectWithTag("Player").transform;
	wps = GameObject.FindGameObjectsWithTag("wp");
	WaitAndUpdate();
}

//find the closets WP to thne player and initialize it
var closestToPlayer:GameObject;
function WaitAndUpdate(){

	while(true){
	
		//find the closest WP to the player by passing him as an argument
		closestToPlayer = findClosestWP(playerTransform);
	
		closestToPlayer.GetComponent(WP).initializeData();
	
		yield WaitForSeconds(2);
	
	}
	

}

function Update () {
	//WaitAndUpdate();

}

//to store the WP as a
var randomWP:int;

//returns a random WP- Object
function getRandomWP(){
	
	//a random WP is makred with a Number, the wps.Length is the maximum of WPs we have and will be castet automatically in to an integer
	randomWP= Random.Range(0, wps.Length-1);
	return wps[randomWP];

}

var mask:LayerMask = 1 << 8;


//this function find the closest WP from the Object, that is passed as an argument (inTransform)
function findClosestWP(inTransform:Transform){

	var sphereDistance:int = 10;
	var breakWhile:int = 1;
	var closeWPs:Collider[];
	var inPosition = inTransform.position;
	
	closeWPs = Physics.OverlapSphere(inPosition, 10, mask);

	while((closeWPs.Length < 3) && (breakWhile < 10)){
	
		closeWPs = Physics.OverlapSphere(inPosition, sphereDistance, mask);
		
		if(closeWPs.Length > 0){
		
			return closeWPs[0].gameObject;
		
		}
		
		sphereDistance+=10;
		breakWhile++;
		
	}

}