#pragma strict

private var blockadeTrigger : BoxCollider;
var blockade : GameObject;

function Start () {
	blockadeTrigger = GetComponent(BoxCollider);
}

function Update () {
}

function OnTriggerEnter (other : Collider) {
	var playerObj = GameObject.FindWithTag("Player");
	if(other.tag == "Player"){
		blockadeTrigger.isTrigger = false;
		blockade.active = true;
	}
}