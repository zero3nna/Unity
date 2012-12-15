#pragma strict

import System.Collections.Generic;

var neighbors:Collider[];
var mask:LayerMask = 1 << 8;
var sphereDistance:int = 5;
var neighborhs_to_be_found = 3;
private var breakWhile:int = 1;

//every Gameobject has a Transform 
//Playerlocation is more a List of Waypoints (Path) to get to the Player
var playerLocation = new List.<Transform>();

//returns the PlayerLocation
function getPlayerLocation(){

	return new List.<Transform>(playerLocation);

}

function initializeData(){

	//reset the list
	playerLocation.Clear();
	setData(playerLocation);

}

//this function finds the shortest way
function setData(newList:List.<Transform>){

	if(playerLocation.Count == 0 || (newList[0] != playerLocation[0]) || (newList.Count < playerLocation.Count)){
		playerLocation = newList;
		playerLocation.Add(transform);
		sendData();
	}

}

//send data to neighbors
function sendData(){

	for(var neighbor in neighbors){
	
	/*
		if(this.name == "A-O"){
	
			Debug.Log("A-O searching its nieghbor " + neighbor.name + ".");
	
		}
	*/
		
		if(!playerLocation.Contains(neighbor.transform)){
	
			//access the Waypoint Script WP, we need to get the Component
			
			neighbor.gameObject.GetComponent(WP).setData(new List.<Transform>(playerLocation));
				
		}
	
	}
		
}

//The Waypoints searching all thiere neighbors
function Awake() {

	if(this.name == "A"){
	
		while((neighbors.Length < neighborhs_to_be_found) && (breakWhile < 10)){
	
		neighbors = Physics.OverlapSphere(transform.position, sphereDistance, mask);
		sphereDistance+=5;
		breakWhile++;
		}
		
	}else{
	
		while((neighbors.Length < neighborhs_to_be_found) && (breakWhile < 10)){
	
		neighbors = Physics.OverlapSphere(transform.position, sphereDistance, mask);
		sphereDistance+=5;
		breakWhile++;
		
		}
	
	}

}

function Update () {

	

}