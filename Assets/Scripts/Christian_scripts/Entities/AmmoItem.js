#pragma strict
var playerObj:GameObject;

var audioUsed : AudioSource;


function Start () {

}

function Update () {
	transform.Rotate(Vector3(0,1,0));
}

function OnTriggerEnter (other : Collider) {
	playerObj = GameObject.FindWithTag("Player");
	if(other.tag == "Player"){
		//Player entered
		Debug.Log("ammoitem");
		var ammoScript : AssaultRifle;
		ammoScript = playerObj.GetComponentInChildren(AssaultRifle);
		if(ammoScript){
			Debug.Log("hat die assaultrifle gefunden");
			ammoScript.Rearm();
		}
		
		this.gameObject.GetComponent(MeshRenderer).enabled = false;
		
		audioUsed.Play();
		yield WaitForSeconds(audioUsed.clip.length);
		
		Destroy(this.gameObject);
	}
    Debug.Log(other.tag);
}