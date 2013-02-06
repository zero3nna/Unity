#pragma strict

function Start () {
	if(!(PlayerPrefs.GetInt("Init"))){
		PlayerPrefs.SetInt("Init",1);
		
		PlayerPrefs.SetString("HPLayerName0","Name0");
		PlayerPrefs.SetInt("HPLayerValue0",0);
		PlayerPrefs.SetString("HPLayerName1","Name1");
		PlayerPrefs.SetInt("HPLayerValue1",0);
		PlayerPrefs.SetString("HPLayerName2","Name2");
		PlayerPrefs.SetInt("HPLayerValue2",0);
		PlayerPrefs.SetString("HPLayerName3","Name3");
		PlayerPrefs.SetInt("HPLayerValue3",0);
		PlayerPrefs.SetString("HPLayerName4","Name4");
		PlayerPrefs.SetInt("HPLayerValue4",0);
		PlayerPrefs.SetString("HPLayerName5","Name5");
		PlayerPrefs.SetInt("HPLayerValue5",0);
		PlayerPrefs.SetString("HPLayerName6","Name6");
		PlayerPrefs.SetInt("HPLayerValue6",0);
		PlayerPrefs.SetString("HPLayerName7","Name7");
		PlayerPrefs.SetInt("HPLayerValue7",0);
		PlayerPrefs.SetString("HPLayerName8","Name8");
		PlayerPrefs.SetInt("HPLayerValue8",0);
		
		PlayerPrefs.SetInt("isGaming",0);
		PlayerPrefs.SetInt("currentKillCount",0);
	}
	if(!(PlayerPrefs.GetInt("CurrentKillCount"))){
		PlayerPrefs.SetInt("CurrentKillCount",20);
	}else{
	Debug.Log(PlayerPrefs.GetInt("CurrentKillCount"));
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