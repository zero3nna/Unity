#pragma strict


private var gui : GUIText;
private var speed : float = .05;
private var text = "out";
private var crawling : boolean = false;

var levelName : String;
var maxHeight : float = 4.5;

function makeHeadline(title : String){
	return makeHeadline(title, false);
}

function makeHeadline(title : String, upper : boolean){
	var titleLength = title.Length;
	var border = "";
	var headline = "\n\n";
	var i = 0;
	for(i = 0; i < titleLength; i++){
		border += "--";
	}
	
	if(upper)headline += border + "\n";
	headline += title + "\n";
	headline += border + "\n\n";
	
	return headline;
}

function Start () {
	crawling = true;
	gui = GetComponent(GUIText);
	gui.text = "";
	gui.text += makeHeadline("The Lost Mine - Multimedia Produktion", true);
	gui.text += "\t2012 - 2013\n";
	gui.text += makeHeadline("Autoren");
	gui.text += "\tSebastian Kruse\n";
	gui.text += "\tClemens Geßmann\n";
	gui.text += "\tFlorian Carstens\n";
	gui.text += "\tNorman Schwenzer\n";
	
	gui.text += makeHeadline("Concept and Design");
	gui.text += "\tVictoria Slider\n";
	gui.text += "\tMartin Popp\n";
	gui.text += "\tRonny Dyscher\n";
	gui.text += "\tLars Görlitzer\n";
	
	gui.text += makeHeadline("GUI");
	gui.text += "\tMatthias Krüger\n";
	gui.text += "\tMartin Lehmann\n";
	gui.text += "\tSteve Maahs\n";
	
	gui.text += makeHeadline("Player, Weapons, Monster");
	gui.text += "\tCindy Pissarek\n";
	gui.text += "\tHauke Hamann\n";
	gui.text += "\tSira Häusler\n";
	gui.text += "\tSteven Gräwe\n";
	
	gui.text += makeHeadline("Environment Modeling");
	gui.text += "\tHeiko Ruhm\n";
	gui.text += "\tKatja Müller\n";
	gui.text += "\tDennis Piepiorra\n";
	gui.text += "\tJulia Schreier\n";
	
	gui.text += makeHeadline("Scripting");
	gui.text += "\tChristian Schulz\n";
	gui.text += "\tPatrick Pohlmann\n";
	gui.text += "\tChristian Wieden\n";
	gui.text += "\tRudolf Schneider\n";
	
	gui.text += makeHeadline("Rigging, Animation");
	gui.text += "\tHolger Kassin\n";
	gui.text += "\tMelanie Duhn\n";
	gui.text += "\tDaniel Claus\n";
	
	gui.text += makeHeadline("Sound FX");
	gui.text += "\tTom Noack\n";
	gui.text += "\tMarvin Schulz\n";
	gui.text += "\tMatthias Westphal\n";
	
	gui.text += makeHeadline("Betreuer");
	gui.text += "\tEberhard Hasche\n";
	gui.text += "\tJulia Fischer\n";
	gui.text += "\tStefan Lange\n";
	gui.text += "\tAlexander Urban\n";
	gui.text += "\tPatrick Ingwer\n";
	gui.text += "\tRalph Schön\n";
	
	gui.text += "\n\n\n\t\"Story in a game is like a story in a porn movie. It's expected to be there, but it's not that important.\"\n - John D. Carmack\n\n";
	
	StepDisplay(67, makeHeadline("Game Over", true));
}

function StepDisplay(timeout : int, text : String){
	yield WaitForSeconds(timeout);
	gui.text += text;
}

function OnGUI(){
	
    var e : Event = Event.current;
    if (e.isKey && Input.anyKeyDown && e.keyCode.ToString()!="None") {
       Application.LoadLevel(levelName);
    }
}

function Update ()
{
	if(crawling){
		transform.Translate(Vector3.up * Time.deltaTime * speed);
	}
	if(transform.position.y > maxHeight){
		crawling = false;
	}
    /*if (!crawling)
        return;
    transform.Translate(Vector3.up * Time.deltaTime * speed);
    if (gameObject.transform.position.y > .8)
    {
        crawling = false;
    }*/
}