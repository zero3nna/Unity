#pragma strict

var playerTransformation:Transform;
var playerLocation = new List.<Transform>();
var randomSphere:Vector3;

private var spawnTime:float;

function Start () {
	curState = BossState.idle;
	spawnTime = Time.time;
	playerTransformation = GameObject.FindGameObjectWithTag("Player").transform;

}

var smoothTime:float = 1;
var maxSpeed:float = 4;
private var velocity = Vector3.zero;
var maxRotationSpeed:float = 10;

//enemy states: attack, idle,
enum BossState{attack, idle, gameOver, sawPlayer, start}
var curState:BossState;
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
			
		case BossState.attack:
			maxSpeed = 25;
			if(!hasAttackPlayed){
			
				animation.Play("attackMia");
				hasAttackPlayed = true;
			}
			
			MoveRotate(playerTransformation.position);
			break;
			
		case BossState.idle:
			animation.Play("attackMia");
			//Debug.Log("Inside idle state!");
			break;
			
		case BossState.sawPlayer:
			maxSpeed = 14;
			animation.Play("attackMia");
			//Debug.Log("Inside sawPlayer state!");
			MoveRotate(playerTransformation.position);
			break;
			
		case BossState.gameOver:
			animation.Play("attackMia");
			//Debug.Log("Inside gameOver state!");
			break;
	
	}

}

var sawPlayerDistance:float = 8;
var attackDistance:float = 4;
var hitDistance:float = 1;

function Die(){
	Destroy(transform.root.gameObject);
}

function checkStateChange(){

	if(curState != BossState.start){

		if(playerLocation.Count > 1){
	
			curState = BossState.idle;
	
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
					
						curState = BossState.attack;
					
					}
				
				}else{
		
					curState = BossState.sawPlayer;
					
				}
		
			}
	
		}
		
	}

}

function MoveRotate(targetPos:Vector3){
	//Debug.Log("MOVEROTATE");
	var myPosition:Vector3 = transform.position;
	//in the turoial we rednered the y Position meaningless targetPos = Vector3(targetPos.x,myPosition.y,targetPos.z); by taking only the Enemy.y Position
	//targetPos = Vector3(targetPos.x,myPosition.y,targetPos.z);
	
	//Enemy Movement
	//this.transform.position = Vector3.SmoothDamp(this.transform.position, targetPos, velocity, smoothTime, maxSpeed);
	//this.transform.position = Vector3.SmoothDamp(myPosition, targetPos, velocity, smoothTime, maxSpeed);
	
	//var relativePosition = closeWPPosition - transform.position;
	var toRotation:Quaternion;
	if(targetPos - myPosition != Vector3.zero){
	
		toRotation = Quaternion.LookRotation(targetPos - myPosition);
		transform.rotation = Quaternion.RotateTowards(transform.rotation, toRotation, maxRotationSpeed);

		//this.transform.position = closestWP.transform.position;
	}
	
	/*
	var hit : RaycastHit;
	if(Physics.Raycast(transform.position, -Vector3.up, hit, 8)){
		hit.point.y += .15;
		transform.position = hit.point;
	}
	*/

}