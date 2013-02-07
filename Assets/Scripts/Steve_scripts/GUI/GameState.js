#pragma strict

//import PreviewLabs.PlayerPrefs;
var playerControl:GameObject;

var currentKillCount:int = 0;
var healthPoints:int = 0;
var ammoCount:int = 0;
var ammoPackCount:int = 0;
var activeWeapon:int = 0;

var renderOverlay:DisplayTextureFullScreen;
var transitionDelay:float = 0;

function Awake() {
	DontDestroyOnLoad (this);
	renderOverlay = GetComponent(DisplayTextureFullScreen);
//	renderOverlay.setDelay(transitionDelay);
}

function Reset() {
	displayRender = true;
	isGameOver = true;
	yield WaitForSeconds(1);
	NotificationCenter.DefaultCenter().PostNotification(this, "WonRound");
	currentKillCount = 0;
//	NextLevel();
}

function Start() {
	NotificationCenter.DefaultCenter().AddObserver(this, "ChangeLevel");
	NotificationCenter.DefaultCenter().AddObserver(this, "LoadStats");
	NotificationCenter.DefaultCenter().AddObserver(this, "Reset");
	
	NotificationCenter.DefaultCenter().AddObserver(this, "EnemyKilled");
	NotificationCenter.DefaultCenter().AddObserver(this, "PlayerDead");
	
	NotificationCenter.DefaultCenter().AddObserver(this, "Pause");
	NotificationCenter.DefaultCenter().AddObserver(this, "Unpause");
	NotificationCenter.DefaultCenter().AddObserver(this, "Info");
	NotificationCenter.DefaultCenter().AddObserver(this, "Uninfo");
	
	// check to make sure everything is set
	if (!playerControl) {
		playerControl = GameObject.Find("Player");
	}

	displayRender = false;
	
	yield WaitForSeconds(2);
	NotificationCenter.DefaultCenter().PostNotification(this, "FadeOut");
}

//----------------------------------------------------------

//Pauseblock//
var isPaused:boolean = false;

function Pause() {
	isPaused = true;
}

function Unpause() {
	isPaused = false;
}
//Infoblock
var isInfo:boolean = false;

function Info() {
	isInfo = true;
}

function Uninfo() {
	isInfo = false;
}

//----------------------------------------------------------

function EnemyKilled () {
	currentKillCount += 1;
	currentKillCount = Mathf.Clamp(currentKillCount,0,999999);
//	PreviewLabs.PlayerPrefs.SetInt("thisRoundEnemy",enemyKills);
//	PreviewLabs.PlayerPrefs.SetInt("thisTotalEnemy",totalEnemyKills);		
}

function PlayerDead (notification: Notification) {
	GameOver();
	isGameOver = true;
	}

function GetEnemyScoreRound() {
	return currentKillCount;
}

var isGameOver:boolean = false;
var displayRender:boolean = false;

private var sentStartUnpause:boolean = false;

function Update () {

//	if (renderOverlay.GUIColor.a > 0 && !displayRender) {
//		renderOverlay.AlphaDown(Time.deltaTime);
//	} else if (renderOverlay.GUIColor.a < 1 && displayRender) {
//		renderOverlay.AlphaUp(Time.deltaTime);
//	}
	
//	if (!sentStartUnpause && renderOverlay.GUIColor.a < .3) {
//		NotificationCenter.DefaultCenter().PostNotification(this,"Unpause");
//		sentStartUnpause = true;
//	}

}

function WonRound() {
	displayRender = true;
	isGameOver = true;
//	NextLevel();
}
/*
function NextLevel() {
	yield WaitForSeconds(1);
	SpawnPlayer();
	SaveStats();
	enemyKills = 0;
	maxTimer = origTimer * roundsWon;
	timer = maxTimer;
	isGameOver = false;
	displayRender = false;
	NotificationCenter.DefaultCenter().PostNotification(this, "Unpause");
}*/

function GameOver() {
	if (!isGameOver) {
		NotificationCenter.DefaultCenter().PostNotification(this, "GameOver");
		SaveStats();
		isGameOver = true;
	}
	yield WaitForSeconds(2);
	displayRender = true;
	yield WaitForSeconds(1);
	// wait for death to play, something else?
	
	Application.LoadLevel("highscore");
}
function ChangeLevel(notification : Notification)
{
	var input : int = notification.data;
	if(input == 0){
		SaveStats();
	}else if(input == 1){
	
	}
}

function SaveStats()
{
	PlayerPrefs.SetInt("AmmoCount",ammoCount);
	PlayerPrefs.SetInt("AmmoPackCount",ammoPackCount);
	PlayerPrefs.SetInt("currentKillCount",currentKillCount);
	PlayerPrefs.SetInt("ActiveWeapon",activeWeapon);
	PlayerPrefs.SetInt("HealthPoints",healthPoints);
}
function LoadStats()
{
	ammoCount = PlayerPrefs.GetInt("AmmoCount");
	NotificationCenter.DefaultCenter().AddObserver(this, "SetBullets",ammoCount);
	ammoPackCount = PlayerPrefs.GetInt("AmmoPackCount");
	NotificationCenter.DefaultCenter().AddObserver(this, "SetClips",ammoPackCount);
	currentKillCount = PlayerPrefs.GetInt("currentKillCount");
	NotificationCenter.DefaultCenter().PostNotification(this, "SetEnemyKilled", currentKillCount);
	activeWeapon = PlayerPrefs.GetInt("ActiveWeapon");
	if(activeWeapon == 1){
		NotificationCenter.DefaultCenter().PostNotification(this, "SwapWeapon", 1);
	}
	healthPoints = PlayerPrefs.GetInt("HealthPoints");
	if(healthPoints < 9){
		for( var i:int = 9 ; i > healthPoints ; i-- ){
			NotificationCenter.DefaultCenter().PostNotification(this, "PlayerHit", 1);
		}
	}
}