#pragma strict

var audioOpen : AudioSource;
var audioDrink : AudioSource;

function Start () {

}

function Update () {
	transform.Rotate(Vector3(0,1,0));
}

function OnTriggerEnter (other : Collider) {
	if(other.tag == "Player"){
		//Player entered
		var healthScript : Health;
		healthScript = other.GetComponent(Health);
		if(healthScript){
			healthScript.Heal();
		}
		this.gameObject.GetComponent(MeshRenderer).enabled = false;
		
		audioOpen.Play();
		yield WaitForSeconds(audioOpen.clip.length);
		audioDrink.Play();
		yield WaitForSeconds(audioDrink.clip.length);
		
		Destroy(this.gameObject);
	}
    Debug.Log(other.tag);
}