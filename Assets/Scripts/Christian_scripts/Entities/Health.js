var startHealth:int = 5;
var maxHealth:int = 9;
var destroyOnDeath:boolean = false;
var onHitDie:boolean = false;
private var lastHit:float = 0;
var dead:boolean = false;
var painSounds : AudioClip[];
var die : AudioClip;

function Start() {
	maxHealth = 9;
	NotificationCenter.DefaultCenter().AddObserver(this, "SetHealth");
	NotificationCenter.DefaultCenter().AddObserver(this, "PlayerHit");
	NotificationCenter.DefaultCenter().AddObserver(this, "GameOver");
	NotificationCenter.DefaultCenter().AddObserver(this, "WonRound");
	NotificationCenter.DefaultCenter().AddObserver(this, "Pause");
	NotificationCenter.DefaultCenter().AddObserver(this, "Unpause");
	NotificationCenter.DefaultCenter().AddObserver(this, "Heal");
}

function StartGame() {
	dead = false;
	//startHealth = maxHealth;
}

var isPaused:boolean = false;

function Pause() {
	isPaused = true;
}

function Unpause() {
	isPaused = false;
}

function WonRound() {
	StartGame();
	Pause();
}

function GameOver() {
	Pause();
}

function currentHealth() {
	return startHealth;
}

function SetHealth(notification:Notification)
{
	startHealth = notification.data;
}

function PlayerHit(notification: Notification) {
	if(onHitDie) {
		Dies();
	}
	var damage:int = notification.data;
	//audio.clip = painSounds[Random.Range(0, painSounds.length)];
	//audio.Play();
	startHealth -= damage;
	//startHealth = Mathf.Clamp(startHealth,0,maxHealth);
	NotificationCenter.DefaultCenter().PostNotification(this, "UpdateHealth", startHealth);
}

function Heal(){
	startHealth = maxHealth;
	//startHealth = Mathf.Clamp(startHealth,0,maxHealth);
	NotificationCenter.DefaultCenter().PostNotification(this, "UpdateHealth", startHealth);
}

function Update() {
	if (!isPaused) {
		if (startHealth == 0)
		{
			startHealth = -1;
			Dies();
		}
	}
}

function Dies() {
	audio.PlayOneShot(die);
	dead = true;
	NotificationCenter.DefaultCenter().PostNotification(this, "PlayerDead");
	if (destroyOnDeath) {
		Destroy(this.gameObject);
	}
}