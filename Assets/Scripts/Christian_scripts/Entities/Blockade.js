#pragma strict

private var blockadeTrigger : BoxCollider;
private var bossScript : Boss;

var blockade : GameObject;
var boss : GameObject;

function Start () {
	blockadeTrigger = GetComponent(BoxCollider);
	bossScript = boss.GetComponent(Boss);
}

function Update () {
}

function OnTriggerEnter (other : Collider) {
	var playerObj = GameObject.FindWithTag("Player");
	if(other.tag == "Player"){
		blockadeTrigger.isTrigger = false;
		blockadeTrigger.active = false;
		bossScript.setActive(true);
		blockade.active = true;
	}
}