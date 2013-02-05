#pragma strict

var playerTransformation:Transform;
var wp_controller:WPController;
var closestWP:GameObject;
var playerLocation = new List.<Transform>();
var randomSphere:Vector3;

private var spawnTime:float;

function Start () {

	randomSphere = Random.insideUnitSphere * 2;
	curState = EnemyState.start;
	spawnTime = Time.time;
	//this.transform.position.y = -0.3; //this was only necessary for the tutorial, but here we dont have this y-Position
	playerTransformation = GameObject.FindGameObjectWithTag("Player").transform;
	wp_controller = GameObject.FindGameObjectWithTag("wp_controller").GetComponent(WPController);
	closestWP = wp_controller.findClosestWP(this.transform);
	playerLocation = closestWP.GetComponent(WP).getPlayerLocation();
	WaitAndUpdate();

}

var smoothTime:float = 1;
var maxSpeed:float = 4;
//var deltaTime
private var velocity = Vector3.zero;
var maxRotationSpeed:float = 10;
var distanceToWP:float = 5;

//enemy states: Run, attack, follow, idle,
enum EnemyState{run, attack, follow, idle, start, sawPlayer, gameOver}
var curState:EnemyState;
var startSpeed:float = 2.0;
var startDuration:float = 0.5;
var isStateChangeEnabled:boolean = true;
private var hasAttackPlayed:boolean = false;

function Update () {

	//checking if the state needs to change (transitions)
	
	if(isStateChangeEnabled){
	
		checkStateChange();
	
	}
	
	//run commands depending on the curState
	
	switch(curState){
	
		case EnemyState.run:
			//Debug.Log("Inside run state!");
			maxSpeed = 12;
			animation.Play("attackMia");
			MoveRotate(closestWP.transform.position + randomSphere);
			break;
			
		case EnemyState.attack:
			maxSpeed = 25;
			if(!hasAttackPlayed){
			
				animation.Play("attackMia");
				hasAttackPlayed = true;
				
			}
			
			MoveRotate(playerTransformation.position);
			
			//Debug.Log("Inside attack state!");
			break;
			
		case EnemyState.follow:
			//Debug.Log("Inside follow state!");
			MoveRotate(playerTransformation.position);
			break;
			
		case EnemyState.idle:
			animation.Play("attackMia");
			//Debug.Log("Inside idle state!");
			break;
			
		case EnemyState.start:
			//Debug.Log("Inside run state!"); //Move forward
			transform.Translate(Vector3.forward * Time.deltaTime * startSpeed);
			
			//after 2 seconds change to run
			if(spawnTime + startDuration < Time.time){
			
				curState = EnemyState.run;
			
			}
			
			break;
			
		case EnemyState.sawPlayer:
			maxSpeed = 14;
			animation.Play("attackMia");
			//Debug.Log("Inside sawPlayer state!");
			MoveRotate(playerTransformation.position);
			break;
			
		case EnemyState.gameOver:
			animation.Play("attackMia");
			//Debug.Log("Inside gameOver state!");
			break;
	
	}

}

var sawPlayerDistance:float = 8;
var attackDistance:float = 4;
var hitDistance:float = 1;

function Die(){

	//Debug.Log("Hello");
	
	Destroy(transform.root.gameObject);

}

function checkStateChange(){

	if(curState != EnemyState.start){

		if(playerLocation.Count > 1){
	
			curState = EnemyState.run;
	
		}else{
	
			//test if we ware close enough to the player and decides if he can heading to the palyer
			var distanceToPlayer  = Vector3.Distance(transform.position, playerTransformation.position);
		
			if(distanceToPlayer < sawPlayerDistance){
			
				if(distanceToPlayer < attackDistance)
				{
				
					//Debug.Log("Hit Distance: " + distanceToPlayer);
				
					if(distanceToPlayer < hitDistance)
					{
					
						//Debug.Log("Notifys:");
						NotificationCenter.DefaultCenter().PostNotification(this,"EnemyDead");
						Die();
					
					}else{
					
						curState = EnemyState.attack;
					
					}
				
				}else{
		
					curState = EnemyState.sawPlayer;
					
				}
		
			}
	
		}
		
	}

}

function WaitAndUpdate(){

	while(true){
	
		randomSphere = Random.insideUnitSphere * 2;
	
		UpdateWP();	
		yield WaitForSeconds(0.5);
	
	}

}

function UpdateWP(){

	/*
	Instead of using:
	var distanceEnemyWP = Vector3.Distance(transform.position, closestWP.transform.position);
	We use
	var distanceEnemyWP = Vector3.Distance(transform.position, Vector3(closestWP.transform.position.x,transform.position.y, closestWP.transform.z))
	Here we ware using in the second argument and there the second argument (2.2) transform.position.y, we are saying, that we are only considering
	the the x,z Plane, because we are calculate the distance and ignoring the y Axes by simply setting the closesWP y pos equals to the enemy y pos
	*/
	
	var distanceEnemyWP = Vector3.Distance(transform.position, closestWP.transform.position);
	
	//Debug.Log("DistanceEnemyWP: " + distanceEnemyWP);

	if((distanceEnemyWP < distanceToWP) && (playerLocation.Count > 1)){
	
		//Debug.Log("And I say: Hello!");
	
		closestWP = playerLocation[playerLocation.Count - 2].gameObject;
	
	}
	
	playerLocation = closestWP.GetComponent(WP).getPlayerLocation();

}

function MoveRotate(targetPos:Vector3){
	Debug.Log("MOVEROTATE");
	var myPosition:Vector3 = transform.position;
	targetPos = Vector3(targetPos.x,myPosition.y,targetPos.z);
	
	//Enemy Movement
	//this.transform.position = Vector3.SmoothDamp(this.transform.position, targetPos, velocity, smoothTime, maxSpeed);
	this.transform.position = Vector3.SmoothDamp(myPosition, targetPos, velocity, smoothTime, maxSpeed);
	
	//var relativePosition = closeWPPosition - transform.position;
	var toRotation:Quaternion;
	if(targetPos - myPosition != Vector3.zero){
	
		toRotation = Quaternion.LookRotation(targetPos - myPosition);
		transform.rotation = Quaternion.RotateTowards(transform.rotation, toRotation, maxRotationSpeed);

		//this.transform.position = closestWP.transform.position;
	}
	
	var hit : RaycastHit;
	if(Physics.Raycast(transform.position, -Vector3.up, hit, 8)){
		hit.point.y += .15;
		transform.position = hit.point;
	}

}