var ChoiseOmron=false;
var ChoiseModbus=false;
var StatusModbus = false, OldStatusModbus = false
var StatusMobile = [];
var OldStatusMobile = [];
var Command;
var Command_Start = 520;
var Command_Length = 50;
var Message = [], OldMessage = [];
var Message_Start = 570;
var Message_Length = 100;

var WordStartElement = 0;
var LengthOfWordElement = 110;//Dat so luong element

var Element1 = [];
var OldElement1 = [];
var WordStartElement1 = 0;
var LengthOfWordElement1 = 100;

var Element2 = [];
var OldElement2 = [];
var WordStartElement2 = WordStartElement1 + LengthOfWordElement1;
var LengthOfWordElement2 = 100;

var Element3 = [];
var OldElement3 = [];
var WordStartElement3 = WordStartElement2 + LengthOfWordElement2;
var LengthOfWordElement3 = 100;

var Element4 = [];
var OldElement4 = [];
var WordStartElement4 = WordStartElement3 + LengthOfWordElement3;
var LengthOfWordElement4 = 100;
//////////////////////////////////////////////////////////////////
var BitDisplay = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1];
var OldBitDisplay = [];
var OldBitDisplayWeb = [];
var WordStartBitDisplay = WordStartElement + LengthOfWordElement;
var LengthOfWordBitDisplay = 5;

var BitAdjust = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var OldBitAdjust = [];
var OldBitAdjustWeb = [];
var WordStartBitAdjust = WordStartBitDisplay + LengthOfWordBitDisplay;
var LengthOfWordBitAdjust = 5;

var WordDisplay = [11, 22, 2, 3, 4, 5, 6, 7, 8, 9];
var OldWordDisplay = [];
var OldWordDisplayWeb = [];
var WordStartWordDisplay = WordStartBitAdjust + LengthOfWordBitAdjust;
var LengthOfWordWordDisplay = 100;//max 125

var WordAdjust = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
var OldWordAdjust = [];
var OldWordAdjustWeb = [];
var WordStartWordAdjust = WordStartWordDisplay + LengthOfWordWordDisplay;
var LengthOfWordWordAdjust = 100;//max 125

// var WordAdjust2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
// var OldWordAdjust2 = [];
// var OldWordAdjustWeb2 = [];
// var WordStartWordAdjust2 = WordStartWordAdjust1 + LengthOfWordWordAdjust1;
// var LengthOfWordWordAdjust2 = 100;//max 125

var DWordDisplay = [1,2,3,4,5,6,7,8,9,0,3];
var OldDWordDisplay = [];
var OldDWordDisplayWeb = [];
var WordStartDWordDisplay = WordStartWordAdjust + LengthOfWordWordAdjust;
var LengthOfWordDWordDisplay = 25;//max 50

var DWordAdjust = [1,2,3,4,5,6,7,8,9];
var OldDWordAdjust = [];
var OldDWordAdjustWeb = [];
var WordStartDWordAdjust = WordStartDWordDisplay + LengthOfWordDWordDisplay * 2;
var LengthOfWordDWordAdjust = 25;//max 50

var IndexSocketInputSignal = 2;
var IndexSocketBitDisplay = 3;
var IndexSocketBitAdjust = 4;
var IndexSocketWordDisplay = 5;
var IndexSocketWordAdjust = 6;
var IndexSocketDWordDisplay = 7;
var IndexSocketDWordAdjust = 8;

var CheckBitDisplay = "";
var CheckBitAdjust = "";
var CheckWordDisplay = "";
var CheckWordAdjust = "";
var CheckDWordDisplay = "";
var CheckDWordAdjust = "";

var oldResultImage;

var resultPanel;
var resultpoint;
var resultpointPickPlace;
var resultlabel;
var resultline;
var resultimage;
var resultBitDisplay;
var resultBitAdjust;
var resultWordDisplay;
var resultWordAdjust;
var resultDWordDisplay;
var resultDWordAdjust;

var refreshDataPanel;
var refreshDataPoint;
var refreshDataPointPickPlace;
var refreshDataImage;
var refreshDataLine;
var refreshDataLabel;
var refreshDataBitAdjust, haveChangeBitAdjust;
var refreshDataBitDisplay, haveChangeBitDisplay;
var refreshDataWordAdjust, haveChangeWordAdjust;
var refreshDataWordDisplay, haveChangeWordDisplay;
var refreshDataDWordAdjust, haveChangeDWordAdjust;
var refreshDataDWordDisplay, haveChangeDWordDisplay;

var WordStartElement = 0;
var LengthOfWordElement = 1000;

TypeCobot = 1;
//////////////////////////////////////////////////////////////////
var WordDisplayCobotStart = 9000;
var LengthOfWordDisplayCobot = 20;//max 125
var WordAdjustCobotStart = WordDisplayCobotStart+LengthOfWordDisplayCobot;
var LengthOfWordAdjustCobot = 20;//max 125

var BitDisplayOMRON = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var OldBitDisplayOMRON = [];
var OldBitDisplayWebOMRON = [];
var WordStartBitDisplayOMRON = 110;
var LengthOfWordBitDisplayOMRON = 5;

var BitAdjustOMRON = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var OldBitAdjustOMRON = [];
var OldBitAdjustWebOMRON = [];
var WordStartBitAdjustOMRON = WordStartBitDisplayOMRON + LengthOfWordBitDisplayOMRON;
var LengthOfWordBitAdjustOMRON = 5;

var WordDisplayOMRON = [11, 22, 2, 3, 4, 5, 6, 7, 8, 9];
var OldWordDisplayOMRON = [];
var OldWordDisplayWebOMRON = [];
var WordStartWordDisplayOMRON = WordStartBitAdjustOMRON + LengthOfWordBitAdjustOMRON;
var LengthOfWordWordDisplayOMRON = 100;//max 125

var WordAdjustOMRON = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5];
var OldWordAdjustOMRON = [];
var OldWordAdjustWebOMRON = [];
var WordStartWordAdjustOMRON = WordStartWordDisplayOMRON + LengthOfWordWordDisplayOMRON;
var LengthOfWordWordAdjustOMRON = 200;//max 125

var DWordDisplayOMRON = [];
var OldDWordDisplayOMRON = [];
var OldDWordDisplayWebOMRON = [];
var WordStartDWordDisplayOMRON = WordStartWordAdjustOMRON + LengthOfWordWordAdjustOMRON;
var LengthOfWordDWordDisplayOMRON = 25;//max 50

var DWordAdjustOMRON = [];
var OldDWordAdjustOMRON = [];
var OldDWordAdjustWebOMRON = [];
var WordStartDWordAdjustOMRON = WordStartDWordDisplayOMRON + LengthOfWordDWordDisplayOMRON * 2;
var LengthOfWordDWordAdjustOMRON = 25;//max 50
module.exports = {
    ChoiseModbus,ChoiseOmron,
    WordDisplayCobotStart,LengthOfWordDisplayCobot,WordAdjustCobotStart,LengthOfWordAdjustCobot,
    StatusModbus, OldStatusModbus, StatusMobile, OldStatusMobile,
    Command, Command_Start, Command_Length,
    Message, OldMessage, Message_Start, Message_Length,
    TypeCobot,
    Element1, OldElement1, WordStartElement1, LengthOfWordElement1,
    Element2, OldElement2, WordStartElement2, LengthOfWordElement2,
    Element3, OldElement3, WordStartElement3, LengthOfWordElement3,
    Element4, OldElement4, WordStartElement4, LengthOfWordElement4,
    BitDisplay, OldBitDisplay, OldBitDisplayWeb, WordStartBitDisplay, LengthOfWordBitDisplay,
    BitAdjust, OldBitAdjust, OldBitAdjustWeb, WordStartBitAdjust, LengthOfWordBitAdjust,
    WordDisplay, OldWordDisplay, OldWordDisplayWeb, WordStartWordDisplay, LengthOfWordWordDisplay,
    WordAdjust, OldWordAdjust, OldWordAdjustWeb, WordStartWordAdjust, LengthOfWordWordAdjust,
    // WordAdjust2, OldWordAdjust2, OldWordAdjustWeb2, WordStartWordAdjust2, LengthOfWordWordAdjust2,
    DWordDisplay, OldDWordDisplay, OldDWordDisplayWeb, WordStartDWordDisplay, LengthOfWordDWordDisplay,
    DWordAdjust, OldDWordAdjust, OldDWordAdjustWeb, WordStartDWordAdjust, LengthOfWordDWordAdjust,
    IndexSocketInputSignal, IndexSocketBitAdjust, IndexSocketBitDisplay, IndexSocketWordDisplay, IndexSocketWordAdjust, IndexSocketDWordDisplay, IndexSocketDWordAdjust,
    CheckBitDisplay, CheckBitAdjust, CheckWordDisplay, CheckWordAdjust, CheckDWordDisplay, CheckDWordAdjust,
    oldResultImage, resultpointPickPlace, refreshDataPointPickPlace,
    resultPanel, resultpoint, resultlabel, resultline, resultimage, resultBitAdjust, resultBitDisplay, resultWordAdjust, resultWordDisplay, resultDWordAdjust, resultDWordDisplay,
    refreshDataPanel, refreshDataPoint, refreshDataImage, refreshDataLine, refreshDataLabel,
    refreshDataBitAdjust, haveChangeBitAdjust,
    refreshDataBitDisplay, haveChangeBitDisplay,
    refreshDataWordAdjust, haveChangeWordAdjust,
    refreshDataWordDisplay, haveChangeWordDisplay,
    refreshDataDWordAdjust, haveChangeDWordAdjust,
    refreshDataDWordDisplay, haveChangeDWordDisplay,

    BitDisplayOMRON, OldBitDisplayOMRON, OldBitDisplayWebOMRON, WordStartBitDisplayOMRON, LengthOfWordBitDisplayOMRON,
    BitAdjustOMRON, OldBitAdjustOMRON, OldBitAdjustWebOMRON, WordStartBitAdjustOMRON, LengthOfWordBitAdjustOMRON,
    WordDisplayOMRON, OldWordDisplayOMRON, OldWordDisplayWebOMRON, WordStartWordDisplayOMRON, LengthOfWordWordDisplayOMRON,
    WordAdjustOMRON, OldWordAdjustOMRON, OldWordAdjustWebOMRON, WordStartWordAdjustOMRON, LengthOfWordWordAdjustOMRON,
    DWordDisplayOMRON, OldDWordDisplayOMRON, OldDWordDisplayWebOMRON, WordStartDWordDisplayOMRON, LengthOfWordDWordDisplayOMRON,
    DWordAdjustOMRON, OldDWordAdjustOMRON, OldDWordAdjustWebOMRON, WordStartDWordAdjustOMRON, LengthOfWordDWordAdjustOMRON,
}