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
		
		//through the closes WP to the Player we init all other WP to hold its own WP list to the player
		closestToPlayer.GetComponent(WP).initializeData();
	
		//only commence this function every two seconds
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
	
	//get a random WP: 0, wps.Length-1 for the array access
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
	
	//find the closest by using a sphere and search only on the specified layer (mask)
	closeWPs = Physics.OverlapSphere(inPosition, 10, mask);

	//as long as there is the count less then 3, search more (but only so long as breakwhile allows it)
	while((closeWPs.Length < 3) && (breakWhile < 10)){
	
		closeWPs = Physics.OverlapSphere(inPosition, sphereDistance, mask);
		
		if(closeWPs.Length > 0){
		
			//only the frist element found is returned (would it not suffice to search only 1 wp?)
			return closeWPs[0].gameObject;
		
		}
		
		sphereDistance+=10;
		breakWhile++;
		
	}

}