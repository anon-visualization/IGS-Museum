function mousePressed() {
    if (welcome) {
        welcome = false;
        if (intro) { // only runs once
            individualDisplay(0);
            individualDisplay(4);
            intro = false;
        }
    }
    overIndividualButton();
    overMapButton();
    if (zoomView) {
        overIntroButtons();
        overZoomFamilyButton();
        overZoomSpaceButton();
        overZoomExitButton();
    } else if (!zoomView) {
        reset();
        overZoomButton();
    }
}

function overIntroButtons() {
    textSize(18);
    var a = textWidth("Animation on/off  ");
    var b = textWidth("  About  ");
    var introButtonTop = introMsgButtonYPos - mapButtonSizeHeight;
    var introButtonBottom = introMsgButtonYPos + mapButtonSizeHeight

    if (overRect(introMsgButtonXPos, introButtonTop, introMsgButtonXPos + a, introButtonBottom)) {
        animate = !animate;
        reveal = 0;
    } else if (overRect(introMsgButtonXPos + a, introButtonTop, introMsgButtonXPos + a + b, introButtonBottom)) welcome = !welcome;
}

function resetTransition() {
    fillColor = 255;
    reveal = 0;
}

// individualDisplayButtons
function overIndividualButton() {
    var individualButtonSpacing, i;
    for (i = 0; i < individualLength; i++) {
        if (i == 0 || i == 5 || i == 9 || i == 11) {
            findFamily(i);
            individualButtonSpacing = 0; // reset button spacing
        }

        if (overRect(individualButtonX + individualButtonSpacing, individualButtonY - individualButtonSize, individualButtonX + individualButtonSpacing + individualButtonSize, individualButtonY)) {
            individualDisplay(i);
            reveal = 0; // can't be resetTransition, just reset reveal boolean
        }
        individualButtonSpacing += individualButtonGap;
    }
}

// 11 zoom buttons for movement
function overZoomButton() {
    var i, zoomX, zoomY;
    for (i = 0; i < 11; i++) {
        if (i < 4) zoomY = yPosWalkway;
        else if (i < 8) zoomY = yPosBluegrass;
        else zoomY = yPosRotunda;
        if (i == 0 || i == 4 || i == 8) zoomX = zoomX1;
        else if (i == 1 || i == 5 || i == 9) zoomX = zoomX2;
        else if (i == 2 || i == 6 || i == 10) zoomX = zoomX3;
        else if (i == 3 || i == 7) zoomX = zoomX4;
        if (dist(mouseX, mouseY, zoomX, zoomY) < zoomButtonSize) {
            zoomView = true;
            zoomSelect(i);
            resetTransition();
        }
    }
}

// reset && show/hide grayScale paths in talk mode. Can MAKE THIS BETTER. Added + 1 so can't toggle both simultaneously for now.
function reset() {
    if (overRect(xPosReset, yPosReset, xPosReset + resetWidth, yPosReset + resetHeight)) {
        familyHighlight(0, 14);
    } else if (talk == true && overRect(xPosReset, yPosReset + resetHeight + 1, xPosReset + conversationKeyWidth, yPosReset + 2 * resetHeight)) {
        grayScaleToggle = !grayScaleToggle;
    }
}


function overZoomExitButton() {
    if (dist(mouseX, mouseY, zoomX5, zoomExitY) < zoomExitButtonSize / 2) {
        zoomView = false;
        familyHighlight(0, 14);
    }
}

// if (zoom) buttons for jumping between families
function overZoomFamilyButton() {
    if (dist(mouseX, mouseY, zoomFamilyX1, zoomFamilyY) < mapButtonSize) {
        displayFamily = 0;
        familyHighlight(0, 4);
    } else if (dist(mouseX, mouseY, zoomFamilyX2, zoomFamilyY) < mapButtonSize) {
        displayFamily = 1;
        familyHighlight(5, 8);
    } else if (dist(mouseX, mouseY, zoomFamilyX3, zoomFamilyY) < mapButtonSize) {
        ;
        displayFamily = 2;
        familyHighlight(9, 10);
    } else if (dist(mouseX, mouseY, zoomFamilyX4, zoomFamilyY) < mapButtonSize) {
        displayFamily = 3;
        familyHighlight(11, 14);
    }
}

// if (zoom) buttons for jumping between spaces
function overZoomSpaceButton() {
    if (dist(mouseX, mouseY, zoomSpaceX, zoomSpaceY1) < mapButtonSize) spaceSelect(0);
    else if (dist(mouseX, mouseY, zoomSpaceX, zoomSpaceY2) < mapButtonSize) spaceSelect(1);
    else if (dist(mouseX, mouseY, zoomSpaceX, zoomSpaceY3) < mapButtonSize) spaceSelect(2);
}

// 3 main modes
function overMapButton() {
    if (overRect(xPosMapMovementButton, yPosMapButton, xPosMapTalkButton, mapButtonSizeHeight)) {
        movement = true;
        talk = false;
        curation = false;
        resetTransition();
    } else if (overRect(xPosMapTalkButton, yPosMapButton, xPosMapCurationButton, mapButtonSizeHeight)) {
        movement = false;
        talk = true;
        curation = false;
        resetTransition();
    } else if (overRect(xPosMapCurationButton, yPosMapButton, xPosMapCurationButtonEnd, mapButtonSizeHeight)) {
        movement = false;
        talk = false;
        curation = true;
        resetTransition();
    }
}

function overRect(x, y, sizeWidth, sizeHeight) {
    if (mouseX >= x && mouseX <= sizeWidth &&
        mouseY >= y && mouseY <= sizeHeight) {
        return true;
    } else {
        return false;
    }
}

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

// toggles all indexes on or off
function individualDisplay(number) {
    if (mapMovement[number].movement !== -1 && mapMovement[number] !== undefined && mapMovement[number] !== null) { // if data has been loaded
        if (mapMovement[number].show == true) mapMovement[number].show = false;
        else if (mapMovement[number].show == false) mapMovement[number].show = true;
    } else {
        loadDataZoom(number);
        loadDataSmallMultiple(number);
        spaceSelect(displaySpace); // Necessary for proper dynamic loading
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
