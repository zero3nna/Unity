#pragma strict

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
		Destroy(this.gameObject);
	}
    Debug.Log(other.tag);
}