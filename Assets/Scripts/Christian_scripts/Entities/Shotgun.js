var shotCount : int = 8;			//Amount of pellets in a shotgun shell
private var shotSpread : float;

var range = 100.0;
var fireRate = 1;
var force = 10.0;
var damage = 0;
var bulletsPerClip = 15;
var clips = 20;
var reloadTime = 0;
var freezes = true;

private var mainCam : GameObject;
private var hitParticles : ParticleEmitter;
var muzzleFlash : Renderer;
var reloadSound : AudioClip;

private var bulletsLeft : int = 0;
private var nextFireTime = 0.0;
private var m_LastFrameShot = -1;

private var reloading = false;

//private var shotgunAmmoGUI : DrawAmmo;

function Start ()
{

	NotificationCenter.DefaultCenter().AddObserver(this, "Fire");
	NotificationCenter.DefaultCenter().AddObserver(this, "Reload");
	
	mainCam = GameObject.FindWithTag("MainCamera");
	
		hitParticles = GetComponentInChildren(ParticleEmitter);

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
	
	if(muzzleFlash)
	{
		//We shot this frame so enable the muzzle flash
		if(m_LastFrameShot == Time.frameCount)
		{
			//Enable our muzzle flash and animate it to rotate
			muzzleFlash.transform.localRotation = Quaternion.AngleAxis(Random.Range(0, 359), Vector3.forward);
			muzzleFlash.enabled = true;
			
			//Play sound
			if(audio)
			{
				if(!audio.isPlaying)
				{
					audio.Play();
					audio.loop = true;
				}
			}
		}
		
		//We need to disable the muzzle flash
		else
		{
			muzzleFlash.enabled = false;
			enabled = false;
			
			//Stop sound
			if(audio)
			{
				audio.loop = false;
			}
		}
	}
}


function Fire()
{
	if (bulletsLeft == 0)
	{
		return;
	}

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
			
			bulletsLeft--;	
	}
	// Register that we shot this frame so that the LateUpdate function enabled the muzzleflash renderer
	m_LastFrameShot = Time.frameCount;
	enabled = true;

	// Reload gun in reload Time
	if (bulletsLeft == 0)
	{
		Reload();
	}
}


var layerMask : LayerMask;
function FireOneBullet () 
{  
	
	
  	var hits : RaycastHit[];
	var direction = SprayDirection();
	
  	hits = Physics.RaycastAll(transform.position, direction, range,layerMask);
	System.Array.Sort(hits, Comparison);  
		
//	 Did we hit anything?
	for (var i=0;i<hits.length;i++)
		{
			 var hit : RaycastHit = hits[i];
			 
			// Apply a force to the rigidbody we hit
			if (hit.rigidbody)
				hit.rigidbody.AddForceAtPosition(force * direction, hit.point);
		
			// Place the particle system for spawing out of place where we hit the surface!
			// And spawn a couple of particles
			if (hitParticles) {	
				var newParticles = Instantiate(hitParticles, hit.point, Quaternion.FromToRotation(Vector3.up, hit.normal));
				newParticles.Emit();
				newParticles.GetComponent(ParticleAnimator).autodestruct = true;
			}
		

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

			