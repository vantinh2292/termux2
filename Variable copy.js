var refreshDataElement = false;
var refreshDataBitAdjust = false;
var refreshDataBitDisplay = false;
var refreshDataWordAdjust = false;
var refreshDataWordDisplay = false;
var refreshDataDWordAdjust = false;
var refreshDataDWordDisplay = false;
var refreshDataImage = false;
var refreshDataLabel = false;
var refreshDataLine = false;
var refreshDataPoint = false;
var refreshDataPointPickPlace = false;
var refreshDataPanel = false;
var refreshDataTextField = false;
var refreshDataTextFieldInput = false;
var refreshDataPosCobot = false;
var refreshDataBitDisplayImageLibrary = false;
var refreshDataElementImageLibrary = false;

var haveChangeElement = false;
var haveChangeBitAdjust = false;
var haveChangeBitDisplay = false;
var haveChangeWordAdjust = false;
var haveChangeWordDisplay = false;
var haveChangeDWordAdjust = false;
var haveChangeDWordDisplay = false;
var haveChangeTextField = false;
var haveChangeTextFieldInput = false;

//////////////////////////////////////////////////////////////////MODBUS
var Element = [];
var OldElement = [];
var BitDisplay = [];
var OldBitDisplay = [];
var BitAdjust = [];
var OldBitAdjust = [];
var WordDisplay = [];
var OldWordDisplay = [];
var WordAdjust = [];
var OldWordAdjust = [];
var DWordDisplay = [];
var OldDWordDisplay = [];
var DWordAdjust = [];
var OldDWordAdjust = [];
var TextField = [];
var OldTextField = [];
var TextFieldInput = [];
var OldTextFieldInput = [];
var WritePosCobot=[];

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

var resultBitDisplay=[];
var resultBitAdjust=[];
var resultWordDisplay=[];
var resultWordAdjust=[];
var resultDWordDisplay=[];
var resultDWordAdjust=[];
var resultPanel=[];
var resultlabel=[];
var resultline=[];
var resultElement=[];
var resultTextField=[];
var resultTextFieldInput=[];
var resultcustomeroperator;
var refreshdata;
var CustomerOperator;
var resultPosCobot=[]
var resultImage=[]
var resultBitDisplayImageLibrary=[]
var resultElementImageLibrary=[]

//////////////////////////////////////////////////////////////////OMRON
//0-299     ELEMENT
var ElementOmron=[];
var WordStartElementOmron=0;
var LengthOfElementOmron=100;
//300-309   BITDISPLAY
var BitDisplayOMRON = [];
var WordStartBitDisplayOMRON = 300;
var LengthOfWordBitDisplayOMRON = 10;
//310-319   BITADJUST
var BitAdjustOMRON = [];
var WordStartBitAdjustOMRON = WordStartBitDisplayOMRON + LengthOfWordBitDisplayOMRON;
var LengthOfWordBitAdjustOMRON = 10;
//320-519   WORDDISPLAY
var WordDisplayOMRON = [];
var WordStartWordDisplayOMRON = WordStartBitAdjustOMRON + LengthOfWordBitAdjustOMRON;
var LengthOfWordWordDisplayOMRON = 200;//max 125
//520-719   WORDADJUST
var WordAdjustOMRON = [];
var WordStartWordAdjustOMRON = WordStartWordDisplayOMRON + LengthOfWordWordDisplayOMRON;
var LengthOfWordWordAdjustOMRON = 200;//max 125
//720-769   DWORDDISPLAY
var DWordDisplayOMRON = [];
var WordStartDWordDisplayOMRON = WordStartWordAdjustOMRON + LengthOfWordWordAdjustOMRON;
var LengthOfWordDWordDisplayOMRON = 25;//max 50
//770-819   DWORDADJUST
var DWordAdjustOMRON = [];
var WordStartDWordAdjustOMRON = WordStartDWordDisplayOMRON + LengthOfWordDWordDisplayOMRON * 2;
var LengthOfWordDWordAdjustOMRON = 25;//max 50
//////////////////////////////////////////////////////////////////MITSUBISHI
//0-99
var ElementMitsubishi = [];
//100-109
var BitDisplayMitsubishi = [];
//110-119
var BitAdjustMitsubishi = [];
//120-319
var WordDisplayMitsubishi = [];
//320-519
var WordAdjustMitsubishi = [];
//520-619
var DWordDisplayMitsubishi = [];
//620-719
var DWordAdjustMitsubishi = [];

module.exports = {
    WritePosCobot,resultImage,refreshDataBitDisplayImageLibrary,resultBitDisplayImageLibrary,refreshDataElementImageLibrary,resultElementImageLibrary,
    refreshDataElement,refreshDataBitAdjust, refreshDataBitDisplay, refreshDataWordAdjust, refreshDataWordDisplay, refreshDataDWordAdjust, refreshDataDWordDisplay,
    refreshDataImage, refreshDataLabel, refreshDataLine, refreshDataPoint, refreshDataPointPickPlace, refreshDataPanel,refreshDataTextField,refreshDataTextFieldInput,

    haveChangeElement,haveChangeBitAdjust, haveChangeBitDisplay, haveChangeWordAdjust, haveChangeWordDisplay, haveChangeDWordAdjust, haveChangeDWordDisplay,haveChangeTextField,haveChangeTextFieldInput,

    Element,OldElement,ElementOmron,WordStartElementOmron,LengthOfElementOmron,
    BitDisplay, BitAdjust, WordDisplay, WordAdjust, DWordDisplay, DWordAdjust,
    OldBitDisplay, OldBitAdjust, OldWordDisplay, OldWordAdjust, OldDWordDisplay, OldDWordAdjust,
    TextField,OldTextField,TextFieldInput,OldTextFieldInput,

    IndexSocketInputSignal, IndexSocketBitAdjust, IndexSocketBitDisplay, IndexSocketWordDisplay, IndexSocketWordAdjust, IndexSocketDWordDisplay, IndexSocketDWordAdjust,
    CheckBitDisplay, CheckBitAdjust, CheckWordDisplay, CheckWordAdjust, CheckDWordDisplay, CheckDWordAdjust,
    resultlabel, resultline, resultElement, resultBitDisplay,resultBitAdjust,resultWordDisplay,resultWordAdjust,resultDWordDisplay,resultDWordAdjust,resultPanel,
    resultTextField,resultTextFieldInput,
    resultcustomeroperator, refreshdata, CustomerOperator,

    BitDisplayOMRON, WordStartBitDisplayOMRON, LengthOfWordBitDisplayOMRON,
    BitAdjustOMRON, WordStartBitAdjustOMRON, LengthOfWordBitAdjustOMRON,
    WordDisplayOMRON, WordStartWordDisplayOMRON, LengthOfWordWordDisplayOMRON,
    WordAdjustOMRON, WordStartWordAdjustOMRON, LengthOfWordWordAdjustOMRON,
    DWordDisplayOMRON, WordStartDWordDisplayOMRON, LengthOfWordDWordDisplayOMRON,
    DWordAdjustOMRON, WordStartDWordAdjustOMRON, LengthOfWordDWordAdjustOMRON,

    ElementMitsubishi, BitDisplayMitsubishi, BitAdjustMitsubishi, WordDisplayMitsubishi, WordAdjustMitsubishi, DWordDisplayMitsubishi, DWordAdjustMitsubishi,
    refreshDataPosCobot,resultPosCobot,
}