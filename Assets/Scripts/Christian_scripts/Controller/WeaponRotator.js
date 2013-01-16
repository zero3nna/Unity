#pragma strict
var weaponRotator:GameObject;
var objTransform: Transform;

function Start () {
	if(!weaponRotator){
		weaponRotator = GameObject.Find("WeaponHolder");
	}
	objTransform = GetComponent(Transform);
}

function Update () {
	//weaponRotator.transform.rotation = objTransform.rotation.eulerAngles;
	//weaponRotator.transform.Rotate(Vector3.zero);
	weaponRotator.transform.LookAt(objTransform.rotation.eulerAngles);
	//weaponRotator.transform.Rotate(objTransform.rotation.eulerAngles);
	//weaponRotator.transform.R
	//weaponRotator.transform.LookAt(objTransform.forward);
	Debug.Log(weaponRotator.transform.rotation);
}