#pragma strict

var spawns:GameObject[];
var playerTransform:Transform;

var activeEnemys:int = 0;
var maxEnemys:int = 5;
var minDistanceToPlayer:int = 20;
var maxDistanceToPlayer:int = 70;

function Start () {

	spawns = GameObject.FindGameObjectsWithTag("mySpawn");
	playerTransform = GameObject.FindGameObjectWithTag("Player").transform;
	NotificationCenter.DefaultCenter().AddObserver(this,"EnemyDead");

}

function EnemyDead(){

	activeEnemys--;

}

var randomSP:int;
function SpawnRandomEnemy(){
	
	//a random WP is marked with a Number, the wps.Length is the maximum of WPs we have and will be castet automatically in to an integer
	randomSP= Random.Range(0, spawns.Length-1);
	
	var playerDistance = Vector3.Distance(playerTransform.position,spawns[randomSP].transform.position);
	
	if(playerDistance > minDistanceToPlayer && playerDistance < maxDistanceToPlayer)
	{
	
		spawns[randomSP].GetComponent(MySpawner).spawnEnemy();
		
	}else{
	
		//SpawnRandomEnemy();
	
	}

}

function Update () {

	if(activeEnemys < maxEnemys)
	{
	
		SpawnRandomEnemy();
		activeEnemys++;
	
	}
	

}