#pragma strict

function Start () {
	if(!(PlayerPrefs.GetInt("Init"))){
		PlayerPrefs.SetInt("Init",1);
		Debug.Log("in INIT Pref");
		
		PlayerPrefs.SetString("HPlayerName0","Name0");
		PlayerPrefs.SetInt("HPlayerValue0",0);
		PlayerPrefs.SetString("HPlayerName1","Name1");
		PlayerPrefs.SetInt("HPlayerValue1",0);
		PlayerPrefs.SetString("HPlayerName2","Name2");
		PlayerPrefs.SetInt("HPlayerValue2",0);
		PlayerPrefs.SetString("HPlayerName3","Name3");
		PlayerPrefs.SetInt("HPlayerValue3",0);
		PlayerPrefs.SetString("HPlayerName4","Name4");
		PlayerPrefs.SetInt("HPlayerValue4",0);
		PlayerPrefs.SetString("HPlayerName5","Name5");
		PlayerPrefs.SetInt("HPlayerValue5",0);
		PlayerPrefs.SetString("HPlayerName6","Name6");
		PlayerPrefs.SetInt("HPlayerValue6",0);
		PlayerPrefs.SetString("HPlayerName7","Name7");
		PlayerPrefs.SetInt("HPlayerValue7",0);
		PlayerPrefs.SetString("HPlayerName8","Name8");
		PlayerPrefs.SetInt("HPlayerValue8",0);
		
		PlayerPrefs.SetInt("isGaming",0);
		PlayerPrefs.SetInt("currentKillCount",0);
		
		PlayerPrefs.SetInt("AmmoCount",0);
		PlayerPrefs.SetInt("AmmoPackCount",0);
		PlayerPrefs.SetInt("ActiveWeapon",0);
		
		PlayerPrefs.SetInt("HealthPoints",0);
	}
	
	NotificationCenter.DefaultCenter().AddObserver(this, "GameOver");
	NotificationCenter.DefaultCenter().AddObserver(this, "ResetAll");
}
function GameOver(){
	
}
function ResetAll(){
	PlayerPrefs.DeleteAll();
}


function Update () {

}