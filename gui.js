// Animation control
function keyPressed() {
    if (zoomView) {
        if (key == 'A' || key == 'a') {
            animate = !animate;
            reveal = 0;
        } else if (key == 'S' || key == 's') {
            showSpace = !showSpace;
            fullScreenTransition = true;
            resetTransition();
        }
    }
}

function mousePressed() {
    overIndividualButton();
    overMapButton();
    if (zoomView) {
        overZoomFamilyButton();
        overZoomSpaceButton();
        overZoomExitButton();
    } else if (!zoomView) {
        reset();
        overZoomButton();
    }
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
