#pragma strict

var moveSounds : AudioClip[];
var output : AudioSource;

private var step:int;
private var motor : CharacterMotor;

function Start () {
	motor = GetComponent(CharacterMotor);
	step = 0;
}

function Update () {
	if(motor.IsGrounded()){
		if(Input.GetAxis("Horizontal") || Input.GetAxis("Vertical")){
			if(!output.isPlaying){
				step += 1;
				step = step % 2;
				output.clip = moveSounds[step];
				//output.clip = moveSounds[Random.Range(0, moveSounds.length)];
				output.Play();
			}
		}else{
			output.Stop();
		}		
	}
}