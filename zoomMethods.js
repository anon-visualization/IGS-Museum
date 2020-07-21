function DrawZoom() {

    // draws open buttons, and fills selected ones with displaySpace & displayFamily, then draws base images (grid or plan) for zoom then sends to drawMovementZoom, drawtalkZoom or drawCurationZoom();
    this.draw = function () {
        noFill(); // reset fill & strokes 
        stroke(125);
        strokeWeight(2);
        ellipse(zoomSpaceX, zoomSpaceY1, mapButtonSize, mapButtonSize);
        ellipse(zoomSpaceX, zoomSpaceY2, mapButtonSize, mapButtonSize);
        ellipse(zoomSpaceX, zoomSpaceY3, mapButtonSize, mapButtonSize);
        ellipse(zoomFamilyX1, zoomFamilyY, mapButtonSize, mapButtonSize);
        ellipse(zoomFamilyX2, zoomFamilyY, mapButtonSize, mapButtonSize);
        ellipse(zoomFamilyX3, zoomFamilyY, mapButtonSize, mapButtonSize);
        ellipse(zoomFamilyX4, zoomFamilyY, mapButtonSize, mapButtonSize);
        fill(125);

        //displaySpace and displayFamily set what space and family buttons are filled vs. empty
        if (displaySpace == 0) {
            if (talk) image(plan_Walkway, 0, 0, width, height);
            else image(grid_Walkway, 0, 0, width, height);
            ellipse(zoomSpaceX, zoomSpaceY1, mapButtonSize, mapButtonSize);
        } else if (displaySpace == 1) {
            if (talk) image(plan_Bluegrass, 0, 0, width, height);
            else image(grid_Bluegrass, 0, 0, width, height);
            ellipse(zoomSpaceX, zoomSpaceY2, mapButtonSize, mapButtonSize);
        } else if (displaySpace == 2) {
            if (talk) image(plan_Rotunda, 0, 0, width, height);
            else image(grid_Rotunda, 0, 0, width, height);
            ellipse(zoomSpaceX, zoomSpaceY3, mapButtonSize, mapButtonSize);
        }

        if (displayFamily == 0) {
            ellipse(zoomFamilyX1, zoomFamilyY, mapButtonSize, mapButtonSize);
        } else if (displayFamily == 1) {
            ellipse(zoomFamilyX2, zoomFamilyY, mapButtonSize, mapButtonSize);
        } else if (displayFamily == 2) {
            ellipse(zoomFamilyX3, zoomFamilyY, mapButtonSize, mapButtonSize);
        } else if (displayFamily == 3) {
            ellipse(zoomFamilyX4, zoomFamilyY, mapButtonSize, mapButtonSize);
        }
        noFill();
        strokeWeight(1); // reset weight to draw map Button
        if (movement) drawMovementZoom();
        else if (talk) {
            drawTalkZoom();
            conversationHighlight(); // don't draw convo when video is showing
            if (!locked) drawConversationZoom();
        } else if (curation) drawCurationZoom();
    }

    // sets x and y for zoom conversation buttons and calls display function for conversation region of 105 conversation buttons
    function conversationHighlight() {
        if (displaySpace == 0) {
            conversationButtonX = width / 2.4;
            conversationButtonY = height / 1.09;
            if (displayFamily == 0) conversationDisplayZoom(0, 9);
            else if (displayFamily == 1) conversationDisplayZoom(39, 57);
            else if (displayFamily == 2) conversationDisplayZoom(72, 82);
            else if (displayFamily == 3) conversationDisplayZoom(86, 89);
        } else if (displaySpace == 1) {
            conversationButtonX = width / 2.8;
            conversationButtonY = height / 1.15;
            if (displayFamily == 0) conversationDisplayZoom(10, 29);
            else if (displayFamily == 1) conversationDisplayZoom(58, 66);
            else if (displayFamily == 2) conversationDisplayZoom(83, 84);
            else if (displayFamily == 3) conversationDisplayZoom(90, 105);
        } else if (displaySpace == 2) {
            conversationButtonX = width / 1.8;
            conversationButtonY = height / 1.12;
            if (displayFamily == 0) conversationDisplayZoom(30, 38);
            else if (displayFamily == 1) conversationDisplayZoom(67, 71);
            else if (displayFamily == 2) conversationDisplayZoom(85, 85);
        }
    }

    // draw zoom Movement paths
    function drawMovementZoom() {
        var i;
        rect(xPosMapMovementButton, yPosMapButton, widthMapMovementButton, mapButtonHeight);
        for (i = 0; i < individualLength; i++) {
            if (mapMovement[i].show) { // CHANGED
                if (mapZoomMovement[i].selectWalkway) {
                    image(mapZoomMovement[i].movementWalkway, 0, 0, width, height);
                } else if (mapZoomMovement[i].selectBluegrass) {
                    image(mapZoomMovement[i].movementBluegrass, 0, 0, width, height);
                } else if (mapZoomMovement[i].selectRotunda == true && i !== 3 && i < 11) {
                    image(mapZoomMovement[i].movementRotunda, 0, 0, width, height);
                }
            }
        }
    }

    // draws talkBlocks
    function drawTalkZoom() {
        var i;
        if (displaySpace == 0) {
            if (displayFamily == 0) image(grayScale_00, 0, 0, width, height);
            else if (displayFamily == 1) image(grayScale_01, 0, 0, width, height);
            else if (displayFamily == 2) image(grayScale_02, 0, 0, width, height);
            else if (displayFamily == 3) image(grayScale_03, 0, 0, width, height);
        } else if (displaySpace == 1) {
            if (displayFamily == 0) image(grayScale_10, 0, 0, width, height);
            else if (displayFamily == 1) image(grayScale_11, 0, 0, width, height);
            else if (displayFamily == 2) image(grayScale_12, 0, 0, width, height);
            else if (displayFamily == 3) image(grayScale_13, 0, 0, width, height);
        } else if (displaySpace == 2) {
            if (displayFamily == 0) image(grayScale_20, 0, 0, width, height);
            else if (displayFamily == 1) image(grayScale_21, 0, 0, width, height);
            else if (displayFamily == 2) image(grayScale_22, 0, 0, width, height);
        }
        rect(xPosMapTalkButton, yPosMapButton, widthMapTalkButton, mapButtonHeight);
        for (i = 0; i < individualLength; i++) {
            if (mapMovement[i].show) { // CHANGED
                if (mapZoomMovement[i].selectWalkway) {
                    image(mapZoomTalk[i].movementWalkway, 0, 0, width, height);
                } else if (mapZoomMovement[i].selectBluegrass) {
                    image(mapZoomTalk[i].movementBluegrass, 0, 0, width, height);
                } else if (mapZoomMovement[i].selectRotunda == true && i !== 3 && i < 11) {
                    image(mapZoomTalk[i].movementRotunda, 0, 0, width, height);
                }
            }
        }
    }

    // draws conversation boxes for selected space and family in zoom mode. Uses displaySpace and displayFamily variables
    function drawConversationZoom() {
        if (displaySpace == 0) {
            if (displayFamily == 0) image(conversationBoxes_00, 0, 0, width, height);
            else if (displayFamily == 1) image(conversationBoxes_01, 0, 0, width, height);
            else if (displayFamily == 2) image(conversationBoxes_02, 0, 0, width, height);
            else if (displayFamily == 3) image(conversationBoxes_03, 0, 0, width, height);
        } else if (displaySpace == 1) {
            if (displayFamily == 0) image(conversationBoxes_10, 0, 0, width, height);
            else if (displayFamily == 1) image(conversationBoxes_11, 0, 0, width, height);
            else if (displayFamily == 2) image(conversationBoxes_12, 0, 0, width, height);
            else if (displayFamily == 3) image(conversationBoxes_13, 0, 0, width, height);
        } else if (displaySpace == 2) {
            if (displayFamily == 0) image(conversationBoxes_20, 0, 0, width, height);
            else if (displayFamily == 1) image(conversationBoxes_21, 0, 0, width, height);
            else if (displayFamily == 2) image(conversationBoxes_22, 0, 0, width, height);
        }
    }

    // draws curation paths
    function drawCurationZoom() {
        var i;
        rect(xPosMapCurationButton, yPosMapButton, widthMapCurationButton, mapButtonHeight);
        for (i = 0; i < individualLength; i++) {
            if (i == 2 || i == 3 || i == 4 || i == 12) {
                continue;
            } else if (mapMovement[i].show) { // CHANGED
                // !i indicates spaces where there is no curation
                if (mapZoomMovement[i].selectWalkway == true) {
                    if (i !== 0 && i !== 1 && i !== 8 && i !== 14 && i !== 5) image(mapZoomCuration[i].movementWalkway, 0, 0, width, height);
                } else if (mapZoomMovement[i].selectBluegrass == true) {
                    if (i !== 1 && i !== 7) image(mapZoomCuration[i].movementBluegrass, 0, 0, width, height);
                } else if (mapZoomMovement[i].selectRotunda == true) {
                    if (i !== 8 && i !== 14 && i !== 6 && i !== 11 && i !== 13) image(mapZoomCuration[i].movementRotunda, 0, 0, width, height);
                }
            }
        }
    }

    // draws buttons for zoom conversation region
    function conversationDisplayZoom(start, end) {
        var conversationButtonSpacing, distance, i;
        // Draws buttons, checks to see if mouse is in one and then drawsConversation
        stroke(0);
        strokeWeight(.5);
        noFill();
        for (i = start; i <= end; i++) {
            if (i == start) conversationButtonSpacing = 0;
            distance = dist(mouseX, mouseY, conversationButtonX + conversationButtonSpacing, conversationButtonY);

            //Either load data or play conversation
            if ((distance < conversationButtonSizeZoom / 2)) {
                if (mapConversation[i] !== -1 && mapConversation[i] !== undefined && mapConversation[i] !== null) { // if data has been loaded
                    locked = true;
                    image(mapConversation[i].conversationBoxZoom, 0, 0, width, height); // Different than !zoom display
                    if (i == conversationAudioNumber) {
                        // prevents repeating audio if already playing or sets conversationAudioNumber to play audio
                    } else {
                        if (mapConversation[i].conversationAudio.isLoaded()) {
                            mapConversation[i].conversationAudio.play();
                            conversationAudioNumber = i;
                        }
                    }
                    drawIndividualConversationText(i);
                    fill(0);
                    ellipse(conversationButtonX + conversationButtonSpacing, conversationButtonY, conversationButtonSizeZoom, conversationButtonSizeZoom);
                    conversationButtonSpacing += conversationButtonGapZoom;
                    noFill();

                } else {
                    loadDataConversation(i);
                }
            } else {
                ellipse(conversationButtonX + conversationButtonSpacing, conversationButtonY, conversationButtonSizeZoom, conversationButtonSizeZoom);
                conversationButtonSpacing += conversationButtonGapZoom;
            }
        }
        fill(0);
        noStroke();
        textSize(18);
        text("   Hover over buttons to read & listen to conversation", conversationButtonX + conversationButtonSpacing, conversationButtonY + conversationButtonSizeZoom / 2); // draw convo msg
    }

    // draws text when called (e.g. mouse is over conversationButton)
    function drawIndividualConversationText(lines) {
        var textLength, i, textBoxTop, textXPos, talkBubbleLine;
        var textBoxWidth = 600; // sets text box width
        var textLeading = 23; // sets spacing for conversation text
        var textSpacing = 5; // sets spacing for conversation box
        textSize(17);
        textLength = mapConversation[lines].conversationText.length;

        textXpos = mouseX;
        textBoxTop = mouseY - textLength * textLeading - 50;
        talkBubbleLine = textBoxTop - textLeading + textLength * textLeading + textSpacing;

        fill(255, 180);
        rect(mouseX - textSpacing, textBoxTop - textLeading, textBoxWidth, textLength * textLeading + textSpacing);

        line(mouseX - textSpacing, mouseY, mouseX + 25, talkBubbleLine);
        line(mouseX - textSpacing, mouseY, mouseX + 75, talkBubbleLine);
        stroke(255);
        strokeWeight(2);
        line(mouseX + 26, talkBubbleLine, mouseX + 73, talkBubbleLine);
        stroke(0);
        strokeWeight(.5);
        fill(0);
        for (i = 0; i < textLength; i++) text(mapConversation[lines].conversationText[i], mouseX, (i * textLeading) + textBoxTop);
    }
}
