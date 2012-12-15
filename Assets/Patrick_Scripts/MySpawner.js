#pragma strict

var enemyObject:GameObject;

function spawnEnemy(){

	Instantiate(enemyObject, this.transform.position, this.transform.rotation);

}