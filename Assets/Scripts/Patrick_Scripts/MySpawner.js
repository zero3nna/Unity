#pragma strict

//presenting the Enemys, maybe we could choose more specific names ??? :P
var enemyObject:GameObject;
var enemyObject2:GameObject; //IMPORTANT!!! create a new enemy prefab an drag it over the inspector (note to my self)

//holds a number
var enemy_select:int;

function spawnEnemy(){

	//which enemy is spawned, depends on this random number
	enemy_select = Random.Range(0, 1);
	
	if(enemy_select == 0){
		Instantiate(enemyObject, this.transform.position, this.transform.rotation);
	}else if(enemy_select == 1){
		Instantiate(enemyObject2, this.transform.position, this.transform.rotation);
	}

}