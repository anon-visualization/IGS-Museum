function drawIndividualDisplayButtons() {
    var individualButtonSpacing, i;
    strokeWeight(2);
    for (i = 0; i < individualLength; i++) {
        if (i == 0 || i == 5 || i == 9 || i == 11) {
            individualButtonSpacing = 0; // reset button spacing   
            findFamily(i); // loop through family set individualButtonX
        }
        if (i == 0 || i == 9 || i == 12) stroke(242, 101, 34); // orange
        else if (i == 1 || i == 5 || i == 11) stroke(255, 222, 23); // yellow
        else if (i == 2 || i == 7 || i == 13) stroke(0, 161, 75); // green
        else if (i == 3 || i == 6 || i == 10 || i == 14) stroke(127, 63, 152); // purple
        else if (i == 4 || i == 8) stroke(33, 64, 154); // blue

        if (mapMovement[i].show == false) stroke(200); // open button  
        line(individualButtonX + individualButtonSpacing, individualButtonY, individualButtonX + individualButtonSpacing + individualButtonSize, individualButtonY);
        individualButtonSpacing += individualButtonGap;
    }
}

// for zooming in on movement paths--selects family and space
function zoomSelect(select) {
    if (select < 4) {
        spaceSelect(0);
        if (select == 0) {
            familySelect(0, 4);
            displayFamily = 0;
        } else if (select == 1) {
            familySelect(5, 8);
            displayFamily = 1;
        } else if (select == 2) {
            familySelect(9, 10);
            displayFamily = 2;
        } else if (select == 3) {
            familySelect(11, 14);
            displayFamily = 3;
        }
    } else if (select < 8) {
        spaceSelect(1);
        if (select == 4) {
            displayFamily = 0;
            familySelect(0, 4);
        } else if (select == 5) {
            displayFamily = 1;
            familySelect(5, 8);
        } else if (select == 6) {
            displayFamily = 2;
            familySelect(9, 10);
        } else if (select == 7) {
            displayFamily = 3;
            familySelect(11, 14);
        }
    } else {
        spaceSelect(2);
        if (select == 8) {
            displayFamily = 0;
            familySelect(0, 4);
        } else if (select == 9) {
            displayFamily = 1;
            familySelect(5, 8);
        } else if (select == 10) {
            displayFamily = 2;
            familySelect(9, 10);
        } else if (select == 11) {
            displayFamily = 3;
            familySelect(11, 14);
        }
    }
}

// toggles showMovement off for non-selected family range
function familySelect(start, end) {
    var i;
    for (i = 0; i < individualLength; i++) {
        // this says if i is not within region and it is showing already, hide it
        if ((i < start || i > end) && mapMovement[i].show == true) individualDisplay(i);
    }
}

function familyHighlight(start, end) {
    var i;
    resetTransition();
    for (i = 0; i < individualLength; i++) {
        // if i is in family and is not showing then show it
        if ((i >= start && i <= end) && mapMovement[i].show == false) individualDisplay(i);
        // if i is not in region and is showing then hide it
        else if ((i < start || i > end) && mapMovement[i].show == true) individualDisplay(i);
    }
}


// selects space that is true, makes others false, and applies it to group
function spaceSelect(space) {
    var i;
    displaySpace = space;
    resetTransition();
    for (i = 0; i < individualLength; i++) {
        if (displaySpace == 0) {
            mapZoomMovement[i].selectWalkway = true;
            mapZoomMovement[i].selectBluegrass = false;
            mapZoomMovement[i].selectRotunda = false;
        } else if (displaySpace == 1) {
            mapZoomMovement[i].selectWalkway = false;
            mapZoomMovement[i].selectBluegrass = true;
            mapZoomMovement[i].selectRotunda = false;
        } else if (displaySpace == 2) {
            mapZoomMovement[i].selectWalkway = false;
            mapZoomMovement[i].selectBluegrass = false;
            mapZoomMovement[i].selectRotunda = true;

        }
    }
}



// individual display--if movement.show == false ** no data int - 1...load data all for that number, change no data int

// toggles all indexes on or off
function individualDisplay(number) {
    if (mapMovement[number].movement !== -1) { // if data has been loaded
        if (mapMovement[number].show == true) mapMovement[number].show = false;
        else if (mapMovement[number].show == false) mapMovement[number].show = true;
    } else {
        loadDataZoom(number);
        loadDataSmallMultiple(number);
    }
}

// sets individualButtonX for use in drawing individualDisplay Buttons and mouseOver
function findFamily(family) {
    if (family == 0) individualButtonX = xPosBluegrass;
    else if (family == 5) individualButtonX = xPosGayle;
    else if (family == 9) individualButtonX = xPosBusiness;
    else if (family == 11) individualButtonX = xPosMom;
}

// sets conversationButton X and Y for use in drawing conversation Buttons and mouseOver
function findSpace(space) {
    if (space == 0 || space == 10 || space == 30) {
        conversationButtonX = xPosButtonBluegrass;
        if (space == 0) conversationButtonY = yPosWalkway;
        else if (space == 10) conversationButtonY = yPosBluegrass;
        else if (space == 30) conversationButtonY = yPosRotunda;
    } else if (space == 39 || space == 58 || space == 67) {
        conversationButtonX = xPosButtonGayle;
        if (space == 39) conversationButtonY = yPosWalkway;
        else if (space == 58) conversationButtonY = yPosBluegrass;
        else if (space == 67) conversationButtonY = yPosRotunda;
    } else if (space == 72 || space == 83 || space == 85) {
        conversationButtonX = xPosButtonBusiness;
        if (space == 72) conversationButtonY = yPosWalkway;
        else if (space == 83) conversationButtonY = yPosBluegrass;
        else if (space == 85) conversationButtonY = yPosRotunda;
    } else if (space == 86 || space == 90) {
        conversationButtonX = xPosButtonMom;
        if (space == 86) conversationButtonY = yPosWalkway;
        else if (space == 90) conversationButtonY = yPosBluegrass;
    }
}

function setUpAnimation() {
    // animate and in zoom and reveal control transitionReveal
    if (animate && zoomView && reveal < width) transitionReveal(); // sends to transitionReveal

    // if showSpace is true then show fullScreen image of space
    if (showSpace) { // draws full screen space image
        if (displaySpace == 0) image(walkwayImage, 0, 0, width, height);
        else if (displaySpace == 1) image(bluegrassImage, 0, 0, width, height);
        else if (displaySpace == 2) image(rotundaImage, 0, 0, width, height);
    }

    //fillColor controls transition call
    if (fillColor > 0) transition();
}

// activated by fillColor/uses it to draw rect with opacity and then the correct floor plan image based on selected space and zoomView
function transition() {
    var xPos, yPos; // sets correct size for drawing rectangle fade on screen if shoing full space image
    if (!fullScreenTransition) {
        xPos = 50;
        yPos = 110;
    } else {
        xPos = 0;
        yPos = 0;
        fullScreenTransition = false;
    }
    noStroke();
    fill(255, fillColor);
    rect(xPos, yPos, width, height); // draws rect to fade set
    fillColor -= 25; // set to transitionVariable
    if (zoomView) {
        if (displaySpace == 0) {
            if (talk) image(plan_Walkway, 0, 0, width, height);
            else image(grid_Walkway, 0, 0, width, height);
        } else if (displaySpace == 1) {
            if (talk) image(plan_Bluegrass, 0, 0, width, height);
            else image(grid_Bluegrass, 0, 0, width, height);
        } else if (displaySpace == 2) {
            if (talk) image(plan_Rotunda, 0, 0, width, height);
            else image(grid_Rotunda, 0, 0, width, height);
        }
    } else if (!zoomView) {
        image(baseGrid_2, 0, 0, width, height);
        if (!talk) image(baseGrid_3, 0, 0, width, height);
    }
}

function transitionReveal() {
    var timelineStart;
    noStroke();
    fill(255);
    if (displaySpace == 0) timelineStart = timelineStartWalkway;
    else if (displaySpace == 1) timelineStart = timelineStartBluegrass;
    else if (displaySpace == 2) timelineStart = timelineStartRotunda;

    rect(timelineStart + reveal, 135, width, height);

    reveal += 4;

    if (displaySpace == 0) {
        if (talk) image(plan_Walkway, 0, 0, width, height);
        else image(grid_Walkway, 0, 0, width, height);
    } else if (displaySpace == 1) {
        if (talk) image(plan_Bluegrass, 0, 0, width, height);
        else image(grid_Bluegrass, 0, 0, width, height);
    } else if (displaySpace == 2) {
        if (talk) image(plan_Rotunda, 0, 0, width, height);
        else image(grid_Rotunda, 0, 0, width, height);
    }
}
