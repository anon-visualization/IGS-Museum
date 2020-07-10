// High Res or Low Res Images: lowImages/ or images/
var imageFileName = "images/";

// Object Arrays
var mapConversation = [],
	mapMovement = [],
	mapTalk = [],
	mapCuration = [],
	mapZoomMovement = [],
	mapZoomTalk = [],
	mapZoomCuration = [];

// Array Lengths
var individualLength = 15,
	conversationLength = 106;

// Base Images
var baseGrid, baseGrid_2, baseGrid_3, grayScale, allConversationBoxes, grid_Walkway, grid_Bluegrass, grid_Rotunda, plan_Walkway, plan_Bluegrass, plan_Rotunda, gridZoom, conversationBoxes_00, conversationBoxes_01, conversationBoxes_02, conversationBoxes_03, conversationBoxes_10, conversationBoxes_11, conversationBoxes_12, conversationBoxes_13, conversationBoxes_20, conversationBoxes_21, conversationBoxes_22, grayScale_00, grayScale_01, grayScale_02, grayScale_03, grayScale_10, grayScale_11, grayScale_12, grayScale_13, grayScale_20, grayScale_21, grayScale_22, walkwayImage, bluegrassImage, rotundaImage;

// Modes: Movement, Talk, Curation
var movement = true,
	talk = false,
	curation = false;

// ********* GUI *********
// Buttons
var conversationButtonSize = 7,
	conversationButtonSizeZoom = 14,
	conversationButtonGap = 7,
	conversationButtonGapZoom = 14,
	zoomButtonSize = 50,
	zoomExitButtonSize = 100,
	mapButtonSize = 9;

// toggle buttons
var locked = false,
	zoomView = true,
	grayScaleToggle = true,
	showing = false;

var conversationAudioNumber = -1; // Constant for preventing auido repeating

// mode Button positions
var yPosMapButton, xPosMapMovementButton, xPosMapTalkButton, xPosMapCurationButton, xPosMapCurationButtonEnd, mapButtonHeight, widthMapMovementButton, widthMapTalkButton, widthMapCurationButton, mapButtonSizeHeight;

// individualDisplay button positions
var individualButtonGap, individualButtonSize, individualButtonY, individualButtonX, xPosBluegrass, xPosGayle, xPosBusiness, xPosMom;

//conversationDisplay button positions
var conversationButtonY, conversationButtonX, yPosWalkway, yPosBluegrass, yPosRotunda, xPosButtonBluegrass, xPosButtonGayle, xPosButtonBusiness, xPosButtonMom;

// space, family, zoom button positions
var displaySpace, displayFamily, zoomX1, zoomX2, zoomX3, zoomX4, zoomX5, zoomExitY, zoomFamilyY, zoomSpaceX, zoomFamilyX1, zoomFamilyX2, zoomFamilyX3, zoomFamilyX4, zoomSpaceY1, zoomSpaceY2, zoomSpaceY3;

// reset key buttons
var yPosReset, yPosReset, resetWidth, resetHeight, conversationKeyWidth;

// timeline variables
var timelineStart, timelineEnd, timelineStartWalkway, timelineStartBluegrass, timelineStartRotunda;

// animation variables and buttons
var reveal = 0,
	fillColor = 255,
	showSpace = false,
	animate = true,
	fullScreenTransition = false;

// Classes
function Conversation(convo, box, boxZoom, audio) {
	this.conversationText = convo;
	this.conversationBox = box;
	this.conversationBoxZoom = boxZoom;
	this.conversationAudio = audio;
}

function movementPath(movement, view) {
	this.movement = movement;
	this.show = view;
}

// Primary class to control GUI using movement
function movementZoom(walkway, bluegrass, rotunda, selectWalkway, selectBluegrass, selectRotunda) {
	this.movementWalkway = walkway;
	this.movementBluegrass = bluegrass;
	this.movementRotunda = rotunda;
	this.selectWalkway = selectWalkway;
	this.selectBluegrass = selectBluegrass;
	this.selectRotunda = selectRotunda;
}

function talkCurationZoom(walkway, bluegrass, rotunda) {
	this.movementWalkway = walkway;
	this.movementBluegrass = bluegrass;
	this.movementRotunda = rotunda;
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(20);
	positionButtons();
	loadBaseImages();
	loadDataZoom();
	loadDataConversation();
	loadDataSmallMultiple();
	zoomSelect(4); // use to highlight Bluegrass Family to start program
	familySelect(5, 8); // removes Bluegrass Family paths to start program
}

// sets drawing canvas, organizes drawing in 2 views (zoom or not zoom), sets animation
function draw() {
	var drawingSurface;
	background(255);
	locked = false; // resets locked
	image(baseGrid, 0, 0, width, height);
	drawIndividualDisplayButtons();
	if (zoomView) {
		drawingSurface = new DrawZoom();
		drawingSurface.draw();
		fill(125);
		textSize(18);
		text("Space (s), Video (v), Animation (a)", width / 30, height / 1.075);
	} else if (!zoomView) {
		drawingSurface = new DrawSmallMultiple();
		drawingSurface.draw();
	}
	setUpAnimation();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
    positionButtons();
}