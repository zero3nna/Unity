#pragma strict

//boss model from http://thefree3dmodels.com/stuff/characters/creeper_minecraft/14-1-0-2865

enum BossState{attack, idle, gameOver, sawPlayer, start, retreat}

private var shaderFrozen : Shader;
private var shaderNormal : Shader;

var audioPlayerHit : AudioSource;
var audioAttack : AudioSource;

var playerTransformation:Transform;
var lastPlayerPosition : Transform;
var rootTransform : Transform;

var frozen : boolean = false;
var Health : int = 100;
var perCrowbarHit = 33;
var perNailgunHit = 0;

var rootPosition : Vector3;

private var curState:BossState;

private var velocity = Vector3.zero;

private var spawnTime:float = 0;
var smoothTime:float = 1;
var maxSpeed:float = 4;
var currentSpeed : float = 0;
var maxRotationSpeed:float = 10;

//enemy states: attack, idle,
var startSpeed:float = 2.0;
var startDuration:float = 0.5;
var sawPlayerDistance:float = 90;
var attackDistance:float = 15;
var hitDistance:float = 1;

var isStateChangeEnabled:boolean = false;
private var hasAttackPlayed:boolean = false;

function OnTriggerStay (other : Collider) {
	Debug.Log("triggerStay");
	if(other.tag == "Player"){
		//if(!audioPlayerHit.isPlaying){
		audioAttack.Stop();
		audioPlayerHit.Play();
		//}
		Debug.Log("triggerStay");
	}else if(other.tag == "BossDestroyable"){
			Destroy(other.gameObject);
	}
	curState = BossState.retreat;
}

function OnTriggerEnter (other : Collider) {
	Debug.Log("triggerEnter");
	if(other.tag == "Player"){
		curState = BossState.retreat;
	}
}

function OnParticleCollision(other : GameObject){
	//Debug.Log("other " + other);
	if(other.tag == "Freezer"){
		frozen = true;
		renderer.material.shader = shaderFrozen;
	}
}

function ApplyDamage(payload : Array){
	if(payload){
		var type : int = payload[1];
		Debug.Log("APPLY DAMAGE");
		if(frozen){
			switch(type){
				case 0:
					Debug.Log("Nailgun");
					break;
				case 1:
					Debug.Log("Crowbar");
					break;
			}
			Debug.Log("BABY DONT HURT ME");
		}else{
			if(type == 2){
				renderer.material.shader = shaderFrozen;
				frozen = true;
			}else{
				Debug.Log("DONT HURT ME, NO MORE");
			}
		}
	}
}

function Start () {
	curState = BossState.start;
	
	shaderFrozen = Shader.Find("Particles/Additive (Soft)");
	shaderNormal = Shader.Find("Diffuse");
	
	spawnTime = Time.time;
	playerTransformation = GameObject.FindGameObjectWithTag("Player").transform;
	rootPosition = transform.position;
}


function setActive(active : boolean) {
	if(active){
		curState = BossState.idle;
	}else{
		curState = BossState.start;
	}
}

function Update () {
	if(frozen){
		return;
	}
	//checking if the state needs to change (transitions)
	
	if(isStateChangeEnabled){
		checkStateChange();
	}
	
	//run commands depending on the curState
	
	switch(curState){
			
		case BossState.retreat:
			currentSpeed = maxSpeed;
			
			var distanceToRoot = Vector3.Distance(rootPosition, transform.position);
			if(distanceToRoot < 3){				
				currentSpeed = 0;
				curState = BossState.idle;
			}
			MoveRotate(rootPosition, false);
			transform.position += transform.forward * currentSpeed * Time.deltaTime;
			break;
		case BossState.attack:
			maxSpeed = 25;
			if(!hasAttackPlayed){
			
				//animation.Play("attackMia");
				hasAttackPlayed = true;
			}
			
			MoveRotate(playerTransformation.position);
			break;
			
		case BossState.idle:
			//animation.Play("attackMia");
			//Debug.Log("Inside idle state!");
			break;
			
		case BossState.sawPlayer:
			maxSpeed = 14;
			//animation.Play("attackMia");
			//Debug.Log("Inside sawPlayer state!");
			MoveRotate(playerTransformation.position);
			break;
			
		case BossState.gameOver:
			//animation.Play("attackMia");
			//Debug.Log("Inside gameOver state!");
			break;
	
	}

}

function Die(){
	Destroy(transform.root.gameObject);
}

function checkStateChange(){

	if(curState != BossState.start){
			//test if we ware close enough to the player and decides if he can heading to the palyer
			var distanceToPlayer  = Vector3.Distance(transform.position, playerTransformation.position);
			var distanceToRoot = Vector3.Distance(rootPosition, transform.position);
			
			//Debug.Log("distanceToPlayer = " + distanceToPlayer);
			//Debug.Log("distanceToRoot = " + distanceToRoot);
			//Debug.Log("sawPlayerDistance = " + sawPlayerDistance);
			Debug.Log("curState = " + curState);
			//Debug.Log("curSpeed = " + currentSpeed);
			
			if(curState != BossState.retreat){
				if(distanceToPlayer < sawPlayerDistance){
					if(distanceToPlayer < attackDistance)
					{
						if(curState != BossState.attack){
							currentSpeed = 0.5;
							curState = BossState.attack;
							if(!audioAttack.isPlaying){
								audioAttack.Play();
							}
						}
						//Debug.Log("Hit Distance: " + distanceToPlayer);
						if(distanceToPlayer < hitDistance)
						{
							curState = BossState.retreat;
							//Debug.Log("Notifys:");
							//NotificationCenter.DefaultCenter().PostNotification(this,"EnemyDead");
							//Die();
						}else{
							curState = BossState.attack;
						}
					}else{
						curState = BossState.sawPlayer;
					}
					if(curState == BossState.attack){
						if(distanceToRoot > attackDistance){
							Debug.Log("moving backwards");
							//größer als angriffsradius, muss zurück
							currentSpeed = 0;
							curState = BossState.retreat;
						}else{
							Debug.Log("moving forwards, currentSpeed = " + currentSpeed);
							//im angriffsradius, lauf weiter
							if(currentSpeed < maxSpeed){
								currentSpeed *= 1.5;
							}
							transform.position += transform.forward * currentSpeed * Time.deltaTime;
						}
					}
				}
			}
	}

}

function MoveRotate(targetPos:Vector3, zeroCheck:boolean){
	//Debug.Log("MOVEROTATE");
	var myPosition:Vector3 = transform.position;
	//in the turoial we rednered the y Position meaningless targetPos = Vector3(targetPos.x,myPosition.y,targetPos.z); by taking only the Enemy.y Position
	//targetPos = Vector3(targetPos.x,myPosition.y,targetPos.z);
	
	//Enemy Movement
	//this.transform.position = Vector3.SmoothDamp(this.transform.position, targetPos, velocity, smoothTime, maxSpeed);
	//this.transform.position = Vector3.SmoothDamp(myPosition, targetPos, velocity, smoothTime, maxSpeed);
	
	//var relativePosition = closeWPPosition - transform.position;
	//var toRotation:Quaternion;
	if(!zeroCheck || targetPos - myPosition != Vector3.zero){
		
		transform.LookAt(targetPos);
	
		//toRotation = Quaternion.LookRotation(targetPos - myPosition);
		//transform.rotation = Quaternion.RotateTowards(transform.rotation, toRotation, maxRotationSpeed);
		//transform.rotation.z = 0;
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

function MoveRotate(targetPos:Vector3){
	MoveRotate(targetPos, true);
}