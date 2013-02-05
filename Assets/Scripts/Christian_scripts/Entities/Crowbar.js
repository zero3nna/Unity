var range = 2.0; 								//This is just a default value to give us a range that our weapon can shoot
var fireRate = .2; 							//This is another default value that we can change directly in the editor to change the rate of fire
var force = 10.0;								//This variable gives us the ability to adjust how much force our weapon has when it shoots something
var damage = 10.0;								//This allows us to apply damage to enemies if they have hit points that must reach 0 before they actually die
private var hitParticles : ParticleEmitter;		//We need some visual feedback that our bullets are hitting something
var muzzleFlash : Renderer;						//We also need to see if it's actually firing, plus it looks cool
var reloadSound : AudioClip;
var freezes = false;
var acquired = false;

private var nextFireTime = 0.0; 				//This is going to regulate our fire rate to use actual time instead of how fast the computer runs
private var m_LastFrameShot = -1;				//This also helps regulate the fire rate

//private var rifleAmmoGUI : DrawAmmo;


function Start ()								//Start functions run any code as the level starts but does not continue to update
{
	NotificationCenter.DefaultCenter().AddObserver(this, "Fire");
	NotificationCenter.DefaultCenter().AddObserver(this, "Reload");
	
	
	//Get the particle system attached to the AssaultRifleGO
	hitParticles = GetComponentInChildren(ParticleEmitter);
	//Keeps particles from emitting all the time
	if(hitParticles)
	{
	
		Debug.Log("Crowbar:Start[hitParticles]");
		hitParticles.emit = false;
	}
}

function LateUpdate()							//LateUpdate functions updates every frame as long as the behaviour is enabled
{
	
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
//Can we fire? This function is going to check
function Fire ()
{
	Debug.Log("Crowbar:Fire");
	
	//If there is more than one bullet between the last and this frame, reset the nextFireTime
	//This help regulate the fire rate to actual time
	if(Time.time - fireRate > nextFireTime)
		{
		nextFireTime = Time.time - Time.deltaTime;
		}
	
	//Keep firing until we have used up the fire time
	while(nextFireTime < Time.time)
	{
		Debug.Log("Crowbar:Fire[while fire]");
		FireOneShot();
		nextFireTime += fireRate;
	}
}

var layerMask : LayerMask;


//This function tells our weapon how to shoot
function FireOneShot()
{
	Debug.Log("Crowbar:FireOneShot");
	//We need to cast a ray out in front of the player
	var direction = transform.TransformDirection(Vector3.forward);
	var cam : Transform = Camera.main.transform;
	var hit : RaycastHit;
	Debug.Log("Crowbar:FireOneShot[checkRaycast]" + cam.position + " " + cam.forward + " " + hit + " " + range + " " + layerMask);
	//Check to see if we hit anything
	if(Physics.Raycast(cam.position, cam.forward, hit, range, layerMask))
	{
		Debug.Log("Crowbar:FireOneShot[Raycast]");
	
		//Apply force to the rigid body we hit
		if(hit.rigidbody)
		{
			hit.rigidbody.AddForceAtPosition(force * direction, hit.point);
		}
		//Spawn particles at the point we hit the surface
		if(hitParticles)
			{
				var newParticles = Instantiate(hitParticles, hit.point, Quaternion.FromToRotation(Vector3.up, hit.normal));
				hitParticles.transform.position = hit.point;
				hitParticles.transform.rotation = Quaternion.FromToRotation(Vector3.up, hit.normal);
				hitParticles.Emit();
				newParticles.GetComponent(ParticleAnimator).autodestruct = true;
			}

		//Send damage message to the hit object
		hit.collider.SendMessageUpwards("ApplyDamage", damage, SendMessageOptions.DontRequireReceiver);
	}else{
		Debug.Log("Crowbar:FireOneShot[!Raycast]");
	}
		
	//We need to tell the LateUpdate function that we shot and that it can enable the muzzle flash and audio
	m_LastFrameShot = Time.frameCount;
	enabled = true;
	
}

function isFreezing(){
	return false;
}
