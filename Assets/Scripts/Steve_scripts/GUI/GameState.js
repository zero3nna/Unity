#pragma strict

//import PreviewLabs.PlayerPrefs;
var playerControl:GameObject;

var enemyKills:int = 0;
var totalEnemyKills:int = 0;

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
	totalEnemyKills = 0;
//	NextLevel();
}

function Start() {
	NotificationCenter.DefaultCenter().AddObserver(this, "EnemyKilled");
	NotificationCenter.DefaultCenter().AddObserver(this, "PlayerDead");
	NotificationCenter.DefaultCenter().AddObserver(this, "Pause");
	NotificationCenter.DefaultCenter().AddObserver(this, "Unpause");
	NotificationCenter.DefaultCenter().AddObserver(this, "Reset");
	
	// check to make sure everything is set
	if (!playerControl) {
		playerControl = GameObject.Find("Player");
	}

	displayRender = false;
}

//----------------------------------------------------------

//Pauseblock//
var isPaused:boolean;

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

function UnInfo() {
	isInfo = false;
}

//----------------------------------------------------------

function EnemyKilled () {
	enemyKills += 1;
	enemyKills = Mathf.Clamp(enemyKills,0,999999);
	totalEnemyKills += 1;
	totalEnemyKills = Mathf.Clamp(totalEnemyKills,0,999999);
//	PreviewLabs.PlayerPrefs.SetInt("thisRoundEnemy",enemyKills);
//	PreviewLabs.PlayerPrefs.SetInt("thisTotalEnemy",totalEnemyKills);		
}

function PlayerDead (notification: Notification) {
	GameOver();
	isGameOver = true;
	}

function GetEnemyScoreRound() {
	return enemyKills;
}

function GetEnemyScoreTotal() {
	return totalEnemyKills;
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

function SaveStats() {
//	PreviewLabs.PlayerPrefs.SetFloat("thisTimer",timer);
//	PreviewLabs.PlayerPrefs.SetFloat("thisRounds",roundsWon);
//	PreviewLabs.PlayerPrefs.SetFloat("thisRoundEnemy",enemyKills);
//	PreviewLabs.PlayerPrefs.SetFloat("thisTotalEnemy",totalEnemyKills);
}