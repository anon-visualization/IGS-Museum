function DrawSmallMultiple() {

    this.draw = function () {
        noFill(); // reset fill & strokes 
        stroke(125);
        strokeWeight(1);
        image(gridZoom, 0, 0, width, height); // draw additional base image
        if (movement) drawMovement();
        else if (talk) {
            drawTalk();
            conversationDisplay();
            if (!locked) image(allConversationBoxes, 0, 0, width, height);
        } else if (curation) drawCuration();
    }

    // loop through conversation array and draw buttons and draw text if mouse is over button
    function conversationDisplay() {
        var conversationButtonSpacing, j, distance;
        stroke(0);
        strokeWeight(.25);
        noFill();
        for (j = 0; j < conversationLength; j++) {
            if (j == 0 || j == 10 || j == 30 || j == 39 || j == 58 || j == 67 || j == 72 || j == 83 || j == 85 || j == 86 || j == 90) {
                conversationButtonSpacing = 0;
                findSpace(j);
            }
            distance = dist(mouseX, mouseY, conversationButtonX + conversationButtonSpacing, conversationButtonY);
            if ((distance < conversationButtonSize / 2)) {
                if (mapConversation[j] !== -1 && mapConversation[j] !== undefined && mapConversation[j] !== null) { // if data has been loaded
                    locked = true; // sets locked to true to only show one conversatio box back in draw
                    image(mapConversation[j].conversationBox, 0, 0, width, height);
                    // same as function zoom TEMP
                    if (j == conversationAudioNumber);
                    else {
                        if (mapConversation[j].conversationAudio.isLoaded()) {
                            mapConversation[j].conversationAudio.play();
                            conversationAudioNumber = j;
                        }
                    }
                    drawText(j);
                    fill(0);
                    ellipse(conversationButtonX + conversationButtonSpacing, conversationButtonY, conversationButtonSize, conversationButtonSize);
                    conversationButtonSpacing += conversationButtonGap;
                    noFill();
                } else {
                    loadDataConversation(j);
                }
            } else {
                ellipse(conversationButtonX + conversationButtonSpacing, conversationButtonY, conversationButtonSize, conversationButtonSize);
                conversationButtonSpacing += conversationButtonGap;
            }
        }
    }

    // draws movement paths with underlaying base images and filled ellipse for movement button
    function drawMovement() {
        var i;
        image(baseGrid_2, 0, 0, width, height);
        image(baseGrid_3, 0, 0, width, height);
        rect(xPosMapMovementButton, yPosMapButton, widthMapMovementButton, mapButtonHeight);
        for (i = 0; i < individualLength; i++) {
            if (mapMovement[i].show) {
                image(mapMovement[i].movement, 0, 0, width, height);
            }
        }
    }

    function drawTalk() {
        var i;
        image(baseGrid_2, 0, 0, width, height);
        rect(xPosMapTalkButton, yPosMapButton, widthMapTalkButton, mapButtonHeight);
        if (grayScaleToggle) image(grayScale, 0, 0, width, height);
        for (i = 0; i < individualLength; i++) {
            if (mapMovement[i].show) { // CHANGED
                image(mapTalk[i], 0, 0, width, height);
            }
        }
    }

    function drawCuration() {
        var i;
        rect(xPosMapCurationButton, yPosMapButton, widthMapCurationButton, mapButtonHeight);
        image(baseGrid_2, 0, 0, width, height);
        image(baseGrid_3, 0, 0, width, height);
        for (i = 0; i < individualLength; i++) {
            if (i == 2 || i == 3 || i == 4 || i == 12) {
                continue;
            } else if (mapMovement[i].show) { // CHANGED
                image(mapCuration[i], 0, 0, width, height);
            }
        }
    }

    // draws text when called (e.g. mouse is over conversationButton)
    function drawText(lines) {
        var textLength, i, textBoxTop, textXPos;
        var textBoxWidth = 400; // sets text box width
        var textLeading = 15; // sets spacing for conversation text
        var textSpacing = 5; // sets spacing for conversation box
        textSize(12);
        textLength = mapConversation[lines].conversationText.length;

        textXpos = mouseX;
        textBoxTop = mouseY - textLength * textLeading;

        fill(255, 180);
        rect(mouseX - textBoxWidth / 2 - textSpacing, textBoxTop - textLeading, textBoxWidth, textLength * textLeading + textSpacing);
        fill(0);
        for (i = 0; i < textLength; i++) text(mapConversation[lines].conversationText[i], mouseX - textBoxWidth / 2, (i * textLeading) + textBoxTop);
    }
}
