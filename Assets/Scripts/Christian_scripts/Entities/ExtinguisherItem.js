#pragma strict

private var weaponComponent: GameObject;
private var playerObj: GameObject;
private var swap : WeaponSwap;

function Start () {
	playerObj = GameObject.FindWithTag("Player");
	weaponComponent = playerObj.Find("WeaponHolder");
	swap = weaponComponent.GetComponent(WeaponSwap);
}

function Update () {
	transform.Rotate(Vector3(0,1,0));
}

function OnTriggerEnter (other : Collider) {
	if(other.tag == "Player"){
		//Player entered
		Debug.Log(playerObj);
		Debug.Log("player triggered");
		swap.acquired[2] = 1;
		Destroy(this.gameObject);
		//.GetComponent(Extinguisher).acquired = true;
	}
    Debug.Log(other.tag);
}