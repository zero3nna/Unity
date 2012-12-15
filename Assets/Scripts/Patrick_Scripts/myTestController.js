#pragma strict

var firstUpdate:boolean = true;
var spawn:GameObject;

//This Object searches for a WP it is closest to
function Update () {

	if(firstUpdate){
	
		spawn.GetComponent(MySpawner).spawnEnemy();
		firstUpdate = false;
	
	}

}