#pragma strict

private var blockadeTrigger : BoxCollider;
private var bossScript : Boss;
var audioBoss : AudioSource;

var blockade : GameObject;
var boss : GameObject;
var triggerObject : GameObject;

function Start () {
	blockadeTrigger = GetComponent(BoxCollider);
	bossScript = boss.GetComponent(Boss);
}

function Update () {
}

function OnTriggerEnter (other : Collider) {
	var playerObj = GameObject.FindWithTag("Player");
	if(other.tag == "Player"){
		triggerObject.active = false;
		blockadeTrigger.isTrigger = false;
		blockadeTrigger.active = false;
		audioBoss.Play();
		bossScript.setActive(true);
		blockade.active = true;
	}
}