var startHealth:int = 9;
var maxHealth:int;
var destroyOnDeath:boolean = false;
var onHitDie:boolean = false;
var regenerate:boolean = true;
private var lastHit:float = 0;
var regenStall:float = 1;
var regenRate:float = 1;
private var regenHealth:float;
var dead:boolean = false;
var painSounds : AudioClip[];
var die : AudioClip;

function Start() {
	maxHealth = startHealth;
	regenHealth = startHealth;
	NotificationCenter.DefaultCenter().AddObserver(this, "PlayerHit");
	NotificationCenter.DefaultCenter().AddObserver(this, "GameOver");
	NotificationCenter.DefaultCenter().AddObserver(this, "WonRound");
	NotificationCenter.DefaultCenter().AddObserver(this, "Pause");
	NotificationCenter.DefaultCenter().AddObserver(this, "Unpause");
}

function StartGame() {
	dead = false;
	startHealth = maxHealth;
	regenHealth = maxHealth;
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

function PlayerHit(notification: Notification) {
	if(onHitDie) {
		Dies();
	}
	var damage:int = notification.data;
	audio.clip = painSounds[Random.Range(0, painSounds.length)];
	audio.Play();
	startHealth -= damage;
	startHealth = Mathf.Clamp(startHealth,0,maxHealth);
	regenHealth = startHealth;
	lastHit = Time.time;
}

function Heal(){
	startHealth += 1;
	startHealth = Mathf.Clamp(startHealth,0,maxHealth);
	regenHealth = startHealth;
	lastHit = Time.time;
}

function Update() {
	if (!isPaused) {
		if (startHealth == 0)
		{
			startHealth = -1;
			Dies();
		}
		if (regenerate && (lastHit + regenStall) < Time.time && !dead) {
			regenHealth += regenRate * Time.deltaTime;
			startHealth = regenHealth;
			startHealth = Mathf.Clamp(startHealth,0,maxHealth);		
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