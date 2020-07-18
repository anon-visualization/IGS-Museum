    function loadBlankDataArrays() {
        var noData = -1;
        var path = new movementPath(noData, false);
        // load individual length arrays
        for (var i = 0; i < 15; i++) {
            mapMovement.push(path);
            mapTalk.push(noData);
            mapCuration.push(noData);
            mapZoomMovement.push(noData);
            mapZoomTalk.push(noData);
            mapZoomCuration.push(noData);
        }
        // load conversation length array
        for (var i = 0; i < 106; i++) {
            mapConversation.push(noData);

        }
    }

    function loadDataSmallMultiple(i) {
        var path;
        var block;
        var curPath;
        var curPathZoom;
        path = new movementPath(loadImage(imageFileName + i + "_movement.png"), true);
        // mapMovement[i].movement = loadImage(imageFileName + i + "_movement.png"); // replace noData with image

        mapMovement[i] = path;

        block = loadImage(imageFileName + i + "_talk.png");
        mapTalk[i] = block;

        if (i == 2 || i == 3 || i == 4 || i == 12) { // for people who did not curate push integer
            mapCuration[i] = 1;
            mapZoomCuration[i] = 1;
        } else {
            if (i == 0 || i == 5) { // no walkway curation
                curPathZoom = new movementZoom(1, loadImage(imageFileName + i + "_bluegrassCuration.png"), loadImage(imageFileName + i + "_rotundaCuration.png"));
            } else if (i == 1) { // only rotunda curation
                curPathZoom = new movementZoom(1, 1, loadImage(imageFileName + i + "_rotundaCuration.png"));
            } else if (i == 7) { // no bluegrass curation
                curPathZoom = new movementZoom(loadImage(imageFileName + i + "_walkwayCuration.png"), 1, loadImage(imageFileName + i + "_rotundaCuration.png"));
            } else if (i == 8 || i == 14) { // only bluegrass curation
                curPathZoom = new movementZoom(1, loadImage(imageFileName + i + "_bluegrassCuration.png"), 1);
            } else if (i == 6 || i == 11 || i == 13) { // no rotunda curation
                curPathZoom = new movementZoom(loadImage(imageFileName + i + "_walkwayCuration.png"), loadImage(imageFileName + i + "_bluegrassCuration.png"), 1);
            } else if (i == 9 || i == 10) { // show all
                curPathZoom = new movementZoom(loadImage(imageFileName + i + "_walkwayCuration.png"), loadImage(imageFileName + i + "_bluegrassCuration.png"), loadImage(imageFileName + i + "_rotundaCuration.png"));
            }

            curPath = loadImage(imageFileName + i + "_curation.png");
            mapCuration[i] = curPath;
            mapZoomCuration[i] = curPathZoom;
        }
    }

    function loadDataZoom(i) {
        var pathZoom;
        var blockZoom;
        // for BG mom and Swift family there is no rotunda image 
        if (i == 3 || i > 10) {
            pathZoom = new movementZoom(loadImage(imageFileName + i + "_walkway.png"), loadImage(imageFileName + i + "_bluegrass.png"), 1, false, false, false);
            blockZoom = new movementZoom(loadImage(imageFileName + i + "_walkwayTalk.png"), loadImage(imageFileName + i + "_bluegrassTalk.png"), 1);
        } else {
            pathZoom = new movementZoom(loadImage(imageFileName + i + "_walkway.png"), loadImage(imageFileName + i + "_bluegrass.png"), loadImage(imageFileName + i + "_rotunda.png"), false, false, false);
            blockZoom = new movementZoom(loadImage(imageFileName + i + "_walkwayTalk.png"), loadImage(imageFileName + i + "_bluegrassTalk.png"), loadImage(imageFileName + i + "_rotundaTalk.png"));
        }
        mapZoomMovement[i] = pathZoom;
        mapZoomTalk[i] = blockZoom;
    }

    function loadDataConversation(i) {
        var conversation = new Conversation(loadStrings(imageFileName + i + "_conversation.txt"), loadImage(imageFileName + i + "_conversationBox.png"), loadImage(imageFileName + i + "_conversationBoxZoom.png"), loadSound("audio/" + i + "_conversationAudio.mp3"));
        mapConversation[i] = conversation;
    }


    function loadBaseImages() {
        baseGrid = loadImage(imageFileName + "baseGrid.png");
        baseGrid_2 = loadImage(imageFileName + "baseGrid_2.png");
        baseGrid_3 = loadImage(imageFileName + "baseGrid_3.png");
        grid_Walkway = loadImage(imageFileName + "grid_Walkway.png");
        grid_Bluegrass = loadImage(imageFileName + "grid_Bluegrass.png");
        grid_Rotunda = loadImage(imageFileName + "grid_Rotunda.png");
        gridZoom = loadImage(imageFileName + "gridZoom.png");
        plan_Walkway = loadImage(imageFileName + "plan_Walkway.png");
        plan_Bluegrass = loadImage(imageFileName + "plan_Bluegrass.png");
        plan_Rotunda = loadImage(imageFileName + "plan_Rotunda.png");
        grayScale = loadImage(imageFileName + "grayScale.png");
        allConversationBoxes = loadImage(imageFileName + "allConversationBoxes.png");
        conversationBoxes_00 = loadImage(imageFileName + "conversationBoxes_00.png");
        conversationBoxes_01 = loadImage(imageFileName + "conversationBoxes_01.png");
        conversationBoxes_02 = loadImage(imageFileName + "conversationBoxes_02.png");
        conversationBoxes_03 = loadImage(imageFileName + "conversationBoxes_03.png");
        conversationBoxes_10 = loadImage(imageFileName + "conversationBoxes_10.png");
        conversationBoxes_11 = loadImage(imageFileName + "conversationBoxes_11.png");
        conversationBoxes_12 = loadImage(imageFileName + "conversationBoxes_12.png");
        conversationBoxes_13 = loadImage(imageFileName + "conversationBoxes_13.png");
        conversationBoxes_20 = loadImage(imageFileName + "conversationBoxes_20.png");
        conversationBoxes_21 = loadImage(imageFileName + "conversationBoxes_21.png");
        conversationBoxes_22 = loadImage(imageFileName + "conversationBoxes_22.png");
        grayScale_00 = loadImage(imageFileName + "grayScale_00.png");
        grayScale_01 = loadImage(imageFileName + "grayScale_01.png");
        grayScale_02 = loadImage(imageFileName + "grayScale_02.png");
        grayScale_03 = loadImage(imageFileName + "grayScale_03.png");
        grayScale_10 = loadImage(imageFileName + "grayScale_10.png");
        grayScale_11 = loadImage(imageFileName + "grayScale_11.png");
        grayScale_12 = loadImage(imageFileName + "grayScale_12.png");
        grayScale_13 = loadImage(imageFileName + "grayScale_13.png");
        grayScale_20 = loadImage(imageFileName + "grayScale_20.png");
        grayScale_21 = loadImage(imageFileName + "grayScale_21.png");
        grayScale_22 = loadImage(imageFileName + "grayScale_22.png");
        welcomeScreen = loadImage(imageFileName + "welcomeScreen.png");
    }

    function positionButtons() {
        // y position for individual Buttons
        individualButtonY = height / 9.05;
        individualButtonGap = width / 30; // controls individual button line lengths
        individualButtonSize = width / 45;
        // y position for family buttons
        zoomFamilyY = height / 12.75;
        // x position for space buttons
        zoomSpaceX = width / 110;
        // x y positions for mode buttons
        yPosMapButton = height / 70;
        xPosMapMovementButton = width / 1.37;
        mapButtonHeight = height / 35;
        xPosMapTalkButton = width / 1.255;
        xPosMapCurationButton = width / 1.132;
        xPosMapCurationButtonEnd = width / 1.01;
        widthMapMovementButton = xPosMapTalkButton - xPosMapMovementButton;
        widthMapTalkButton = xPosMapCurationButton - xPosMapTalkButton;
        widthMapCurationButton = xPosMapCurationButtonEnd - xPosMapCurationButton;
        mapButtonSizeHeight = yPosMapButton + mapButtonHeight;

        // x y positions for reset
        yPosReset = height / 2.625;
        xPosReset = width / 35;
        resetWidth = width / 40;
        resetHeight = height / 75;
        conversationKeyWidth = width / 15;

        //x y positions for conversation buttons
        yPosWalkway = height / 2.5;
        yPosBluegrass = height / 1.56;
        yPosRotunda = height / 1.075;
        xPosButtonBluegrass = width / 6.2;
        xPosButtonGayle = width / 2.475;
        xPosButtonBusiness = width / 1.58;
        xPosButtonMom = width / 1.19;

        // x positions for individual display buttons
        xPosBluegrass = width / 15;
        xPosGayle = width / 3.15;
        xPosBusiness = width / 1.68;
        xPosMom = width / 1.24;
        // zoom Buttons
        zoomX1 = width / 6.83;
        zoomX2 = width / 2.615;
        zoomX3 = width / 1.595;
        zoomX4 = width / 1.145;
        zoomX5 = width / 2;
        zoomExitY = height / 6;
        // x/y positions for family and space buttons
        zoomFamilyX1 = width / 11.4;
        zoomFamilyX2 = width / 3.34;
        zoomFamilyX3 = width / 1.735;
        zoomFamilyX4 = width / 1.24;
        zoomSpaceY1 = height / 3;
        zoomSpaceY2 = height / 1.59;
        zoomSpaceY3 = height / 1.1;

        // timeline scaling
        timelineStartWalkway = width / 2.45;
        timelineStartBluegrass = width / 2.83;
        timelineStartRotunda = width / 1.81;
    }
