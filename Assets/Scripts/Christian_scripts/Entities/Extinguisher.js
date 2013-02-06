var shotCount : int = 8;			//Amount of pellets in a shotgun shell
private var shotSpread : float;

var range = 100.0;
var fireRate = 0.01;
var force = 10.0;
var damage = 0;
var bulletsPerClip = 15;
var clips = 20;
var reloadTime = 0;
var freezes = true;
var easter = false;
var acquired = false;

var audioShot : AudioSource;

private var emitterPos : GameObject;
private var easterEmitter = new Array();
private var mainCam : GameObject;
private var hitParticles : ParticleEmitter;
var reloadSound : AudioClip;

private var bulletsLeft : int = 0;
private var nextFireTime = 0.0;
private var m_LastFrameShot = -1;

private var reloading = false;

//private var shotgunAmmoGUI : DrawAmmo;

function enableEaster(){
	easter = true;
}

function Start ()
{

	NotificationCenter.DefaultCenter().AddObserver(this, "Fire");
	NotificationCenter.DefaultCenter().AddObserver(this, "Reload");
	
	emitterPos = GameObject.Find("Sparks");
		easterEmitter.Push(GameObject.Find("HascheSparkle").GetComponent(ParticleEmitter));
		easterEmitter.Push(GameObject.Find("UrbanSparkle").GetComponent(ParticleEmitter));
		easterEmitter.Push(GameObject.Find("IngwerSparkle").GetComponent(ParticleEmitter));
		easterEmitter.Push(GameObject.Find("LangeSparkle").GetComponent(ParticleEmitter));
	for(var i=0; i < easterEmitter.length; i++){
		easterEmitter[i].emit = false;
	}
	mainCam = GameObject.FindWithTag("MainCamera");
	
		hitParticles = emitterPos.GetComponent(ParticleEmitter);

		// We don't want to emit particles all the time, only when we hit something.
		if (hitParticles)
		hitParticles.emit = false;
		bulletsLeft = bulletsPerClip;
		
		// Check if we have an ammo GUI set, if not, find it!
		/*if (!shotgunAmmoGUI) 
		{
			shotgunAmmoGUI = GameObject.Find("Ammo").GetComponent(DrawAmmo);
		}*/
}

function LateUpdate()
{
	UpdateGUI();
}


function Fire()
{
	// If there is more than one bullet between the last and this frame
	// Reset the nextFireTime
	if (Time.time - fireRate > nextFireTime)
	{
		nextFireTime = Time.time - Time.deltaTime;
	}

	// Keep firing until we used up the fire time
	while( nextFireTime < Time.time && bulletsLeft != 0)
	{
		for (var i=0; i<shotCount; i++)
		{
			FireOneBullet();
			nextFireTime += fireRate;
		}
	}
	// Register that we shot this frame so that the LateUpdate function enabled the muzzleflash renderer
	m_LastFrameShot = Time.frameCount;
	enabled = true;
}


var layerMask : LayerMask;
function FireOneBullet () 
{  
	audioShot.Play();	
	
  	var hits : RaycastHit[];
	var direction = SprayDirection();
	
  	hits = Physics.RaycastAll(transform.position, direction, range,layerMask);
	System.Array.Sort(hits, Comparison);  
		
	// Place the particle system for spawing out of place where we hit the surface!
			// And spawn a couple of particles
			if (hitParticles) {	
				//emitterPos.transform.
				var newParticles;
				if(!easter){
					newParticles = Instantiate(hitParticles, emitterPos.transform.position, emitterPos.transform.rotation);
					newParticles.Emit();
					newParticles.GetComponent(ParticleAnimator).autodestruct = true;
				}else{
					for(var j=0; j < easterEmitter.length; j++){
						var emitter = easterEmitter[j];
						newParticles = Instantiate(emitter, emitterPos.transform.position, emitterPos.transform.rotation);
						newParticles.Emit();
						newParticles.GetComponent(ParticleAnimator).autodestruct = true;
					}
				}
			}
//	 Did we hit anything?
	for (var i=0;i<hits.length;i++)
		{
			 var hit : RaycastHit = hits[i];
			 
			// Apply a force to the rigidbody we hit
			if (hit.rigidbody)
				hit.rigidbody.AddForceAtPosition(force * direction, hit.point);

			// Send a damage message to the hit object			
			hit.collider.SendMessageUpwards("ApplyDamage", damage, SendMessageOptions.DontRequireReceiver);
		}
}

function Comparison(x : RaycastHit, y : RaycastHit) : int 
{ 
   var xDistance = x.distance; 
   var yDistance = y.distance; 
   return xDistance - yDistance; 
}
function SprayDirection() 
{
	var vx = (1 - 2 * Random.value) * .05;
	var vy = (1 - 2 * Random.value) * .05;
	var vz = 1.0;
	return mainCam.transform.TransformDirection(Vector3(vx,vy,vz));

}
function isFreezing(){
	return freezes;
}
function Reload () 
{
	// Wait for reload time first - then add more bullets!
	if(bulletsLeft >= 0)
	{
			audio.PlayOneShot(reloadSound);
			yield WaitForSeconds(reloadTime);
	}
	// We have a clip left reload
	if (clips > 0)
	{	
		//clips--;   //-------uncomment if you want limited ammo
		bulletsLeft = bulletsPerClip;
		UpdateGUI();
	}	
}

function UpdateGUI ()
{
	if (this) {
		//shotgunAmmoGUI.UpdateAmmo(bulletsLeft);
	}
}

			