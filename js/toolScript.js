
		
		 $(document).ready(function () {
			
			ReadXML();
			//popupInit();
			//$("#draggable5").css("top", "80px");
			//$(".dragImage").css("top", "660px");
			$("#btnFindProjectorWrap").click(function() {
			  $("#resultMainWrapper").empty();
			  
			  throwRatioTempMax = throwRatioArray[0].firstChild.nodeValue;
			  throwRatioTempMin = throwRatioMinArray[0].firstChild.nodeValue;

			  
			  // first check if user enter any distance value and screen size value
			  
			  // get the user input distance inch and feet
			  distanceFeet = parseInt(document.getElementById("distanceEnteredFeet").value, 10);
			  distanceInch = parseInt(document.getElementById("distanceEnteredInch").value, 10);
			  
	
			 // validate form inputs
			 if( document.getElementById("distanceEnteredFeet").value == "" && document.getElementById("distanceEnteredInch").value == "", document.getElementById("imageSizeEntered").value == "")
			 {
				 alert("Please Fill All Required Field");
			 }
			 if (document.getElementById("distanceEnteredFeet").value == ""){
				 distanceFeet = 0;
			 }
			 if (document.getElementById("imageSizeEntered").value == ""){
				 distanceInch = 0;
			 }


			  //calculate total distance
			  totalDistance = distanceFeet * 12 + distanceInch;
	
			  //get the screensize
			  screenSizeInch = parseInt(document.getElementById("imageSizeEntered").value,10);
			 
	
			  // get throwratio by calculation
			  throwRatioInSearch = totalDistance / screenSizeInch;
			  
			  throwRatioInSearch = Math.round(throwRatioInSearch*100)/100;
			
			//alert(throwRatioInSearch)
			//alert(throwRatioArray.length)
			var projectorResultArray = [];
			var j=0;
			var count=0;
			
			// grab index and put them in an array

			for(i=0; i<throwRatioArray.length; i++)
			{
				//alert("j="+j)
					if (throwRatioInSearch <= throwRatioArray[i].innerHTML && throwRatioInSearch > throwRatioMinArray[i].innerHTML)
					{
							projectorResultArray[j] = i;								
							count++;
						//	alert("j="+j)
						//	alert("i="+i)
						//	alert(projectorResultArray[j])
						//	alert(count)
							j++;
							
					}
			}
			//alert(count)
			
			if(count == 0 || throwRatioinSearch.value == ""){
				var noResultFoundHTML = "<h3>The data you entered doesn't match any projectors</h3>"
				$("#resultMainWrapper").html(noResultFoundHTML); 
			}
			
			var tempIndex;

			$("#resultMainWrapper").append('<ul>');
			
			for(i=0; i<count; i++)
			{
				tempIndex = projectorResultArray[i];
				$("#resultMainWrapper").append('<li><div id="projectorImageHolder"><img src="'+projectorImagePathArray[tempIndex].firstChild.nodeValue+'" /></div><div id="resultDescriptionText"><div class="pBrandTitle">Brand:&nbsp;</div><div class="pBrand">'+projectorBrandArray[tempIndex].firstChild.nodeValue+'</div><div class="pModelTitle">Model:&nbsp;</div><div class="pModel">'+projectorModelArray[tempIndex].firstChild.nodeValue+'</div><div style="clear:both;height:5px;"></div><div class="divider"></div><div class="pResolutionTitle">Resolution:&nbsp;</div><div class="pResolution">'+projectorResolutionArray[tempIndex].firstChild.nodeValue+'</div><div style="clear:both;"></div><div class="pCBTitle">Color Brightness:&nbsp;</div><div class="pCB">'+projectorCBArray[tempIndex].firstChild.nodeValue+'</div><div style="clear:both;"></div><div class="pWBTitle">White Brightness:&nbsp;</div><div class="pWB">'+projectorWBArray[tempIndex].firstChild.nodeValue+'</div><div style="clear:both;"></div><div class="learnmore"><a href="'+projectorLearnmoreArray[tempIndex].firstChild.nodeValue+'" target="_blank"><img src="projectorToolImages/plearnmore.png" border="0" width="150" height="37" alt="Learn More"></a></div></div></li>');
	
			}
			$("#resultMainWrapper").append('</ul>');
			
			  
			});
			
			
		
		
	
			

 });
var projectorBrandArray; 
var projectorModelArray;
var projectorResolutionArray;
var projectorCBArray;
var projectorWBArray

var typeArray;
var projectorLearnmoreArray;
var projectorImagePathArray;
var projectorTotal;
var learnmoreLink;
var screensize;
var projectorSize;
/*var formula1Array;
var formula2Array;
var formula1;
var formula2;*/
var throwRatioArray;
var throwRatioMinArray;

var throwRatio;
var throwRatioMin;
var throwRatioInSearch;

var totalDistance;
var distanceFeet;
var distanceInch;

var screenSizeInch;
var screenWidthInch;
var screenHeightInch;
var screenWidthFeet;
var screenHeightFeet;

function ReadXML(){
	//alert(markersArray.length);
	
	
	
      // Read the data from example.xml
      downloadUrl("xml/projectorTool.xml", function(doc) {
        var xmlDoc = xmlParse(doc);
		projectorBrandArray = xmlDoc.getElementsByTagName("brand");
		projectorModelArray = xmlDoc.getElementsByTagName("model");
		projectorResolutionArray = xmlDoc.getElementsByTagName("resolution");
		projectorCBArray = xmlDoc.getElementsByTagName("colorbrightness");
		projectorWBArray = xmlDoc.getElementsByTagName("whitebrightness");
		projectorLearnmoreArray = xmlDoc.getElementsByTagName("learnmore");
		projectorImagePathArray = xmlDoc.getElementsByTagName("projectorImagePath");
		
		typeArray = xmlDoc.getElementsByTagName("type");
		
		throwRatioArray = xmlDoc.getElementsByTagName("throwratio");
		throwRatioMinArray = xmlDoc.getElementsByTagName("throwratioMin");
		projectorTotal=projectorModelArray.length;
		
		//first load 
		throwRatio = throwRatioArray[0].firstChild.nodeValue;
		throwRatioMin = throwRatioMinArray[0].firstChild.nodeValue;

		var inchDistance=Math.round(((8 *12) + 9)*throwRatio);
		//alert(inchDistance);
		convertInchtoFeetDistance(inchDistance);
        
          // distance = screen width * throwradio

        


		$(".distanceTextBox").text(distanceFeet+"'" +" " + distanceInch +'"');
		$("#distanceBoxBottom .textbox").text(distanceFeet+"'" +" " + distanceInch +'"');
		//initial the width and height of screen
		$(".widthText").text("8'" +" " + '9"');
		$(".heightText").text("4'" +" " + '11"');
		//alert(projectorNameArray[0].firstChild.nodeValue);
		//$("#projectorImageHolder").css("background-image" , 'url(' +projectorImagePathArray[0].firstChild.nodeValue+')');
		
		  $("#projectorImageHolder").html($("<img>").attr("src", projectorImagePathArray[0].firstChild.nodeValue));
		  $('#projectorImageHolder img').width(200);
		  $('#projectorImageHolder img').height("auto");
       // alert(dealerLong[70].firstChild.nodeValue);
	   
	  // populateDropdown();
	   
		  $("#resultMainWrapper #resultDescriptionText .pBrand").text(projectorBrandArray[0].firstChild.nodeValue);
		  $("#resultMainWrapper #resultDescriptionText .pModel").text(projectorModelArray[0].firstChild.nodeValue);
		  $("#resultMainWrapper #resultDescriptionText .pResolution").text(projectorResolutionArray[0].firstChild.nodeValue);
		  $("#resultMainWrapper #resultDescriptionText .pCB").text(projectorCBArray[0].firstChild.nodeValue);
		  $("#resultMainWrapper #resultDescriptionText .pWB").text(projectorWBArray[0].firstChild.nodeValue);
        	//alert(typeArray[0].firstChild.nodeValue);
		
        // put the assembled side_bar_html contents into the side_bar div
        //document.getElementById("side_bar").innerHTML = side_bar_html;
      });
	  
	 
	 
}


function convertInchtoFeetDistance(inch)
{
	distanceFeet = Math.floor(inch/12);
	distanceInch = inch%12;
	
}

function calculateHeight(inch) 
{
	screenHeightFeet = Math.floor((Math.sqrt((screensize * screensize)/4.160))/12);
	screenHeightInch = Math.round((Math.sqrt((screensize * screensize)/4.160))%12);
	calculateWidth();
	
}

function calculateWidth()
{
	screenWidthFeet = Math.floor(((16 *Math.sqrt((screensize * screensize)/4.160))/9)/12);
	screenWidthInch = Math.round(((16 *Math.sqrt((screensize * screensize)/4.160))/9)%12);
	
	
}

function createXmlHttpRequest() {
 try {
   if (typeof ActiveXObject != 'undefined') {
     return new ActiveXObject('Microsoft.XMLHTTP');
   } else if (window["XMLHttpRequest"]) {
     return new XMLHttpRequest();
   }
 } catch (e) {
   changeStatus(e);
 }
 return null;
};

/**
* This functions wraps XMLHttpRequest open/send function.
* It lets you specify a URL and will call the callback if
* it gets a status code of 200.
* @param {String} url The URL to retrieve
* @param {Function} callback The function to call once retrieved.
*/
function downloadUrl(url, callback) {
 var status = -1;
 var request = createXmlHttpRequest();
 if (!request) {
   return false;
 }

 request.onreadystatechange = function() {
   if (request.readyState == 4) {
     try {
       status = request.status;
     } catch (e) {
       // Usually indicates request timed out in FF.
     }
     if ((status == 200) || (status == 0)) {
       callback(request.responseText, request.status);
       request.onreadystatechange = function() {};
     }
   }
 }
 request.open('GET', url, true);
 try {
   request.send(null);
 } catch (e) {
   changeStatus(e);
 }
};

/**
 * Parses the given XML string and returns the parsed document in a
 * DOM data structure. This function will return an empty DOM node if
 * XML parsing is not supported in this browser.
 * @param {string} str XML string.
 * @return {Element|Document} DOM.
 */
function xmlParse(str) {
  if (typeof ActiveXObject != 'undefined' && typeof GetObject != 'undefined') {
    var doc = new ActiveXObject('Microsoft.XMLDOM');
    doc.loadXML(str);
    return doc;
  }

  if (typeof DOMParser != 'undefined') {
    return (new DOMParser()).parseFromString(str, 'text/xml');
  }

  return createElement('div', null);
}

/**
 * Appends a JavaScript file to the page.
 * @param {string} url
 */
function downloadScript(url) {
  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
}


function populateDropdown()
{
	//variable to set indented sub label
	
	var homeLabel = 0;
	var epsonLabel = 0;
	var lgLabel = 0;
	var mirroirLabel = 0;
	var OptomaLabel = 0;
	var VivitekLabel = 0;
	
	var epsonLabelH = 0;
	var lgLabelH = 0;
	var mirroirLabelH = 0;
	var OptomaLabelH = 0;
	var VivitekLabelH = 0;
	
	var dropDownhtml ="<select id='toolDropdown' onchange='dropDownChange(this);'><option value='-1'>SELECT</option><optgroup style='text-indent:10px;margin-top:10px;font-style:normal;' label='Business'></optgroup>";
	
	
	for (i=0;i<projectorModelArray.length;i++){
		
		//for business
		if(typeArray[i].firstChild.nodeValue == "Business")
		{
			
			//for epson
			if(projectorBrandArray[i].firstChild.nodeValue == "Epson" && epsonLabel == 0)
			{
				
				epsonLabel=1;
				dropDownhtml +="<optgroup style='text-indent:20px;margin-top:10px;font-style:normal;' label='Epson'></optgroup><option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
				
				
				
			}
			else if(projectorBrandArray[i].firstChild.nodeValue == "Epson" && epsonLabel == 1)
				{
					
					dropDownhtml +=" <option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
					
				}
				
			
				//for lg
			if(projectorBrandArray[i].firstChild.nodeValue == "LG" && lgLabel == 0)
				{
					lgLabel=1;
					dropDownhtml +=" <optgroup style='text-indent:20px;margin-top:10px;font-style:normal;' label='LG'></optgroup><option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
				
					
				}
			else if(projectorBrandArray[i].firstChild.nodeValue == "LG" && lgLabel == 1)
				{
					dropDownhtml +=" <option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
					
				}
			
				// for mirroir
				if(projectorBrandArray[i].firstChild.nodeValue == "Miroir" && mirroirLabel == 0)
				{
					mirroirLabel=1;
					dropDownhtml +=" <optgroup style='text-indent:20px;margin-top:10px;font-style:normal;' label='Miroir'></optgroup><option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
					
					
				}
			else if(projectorBrandArray[i].firstChild.nodeValue == "Miroir" && mirroirLabel == 1)
				{
					dropDownhtml +=" <option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
					
				}
			
				// for Optoma
				if(projectorBrandArray[i].firstChild.nodeValue == "Optoma" && OptomaLabel == 0)
				{
					OptomaLabel=1;
					dropDownhtml +=" <optgroup style='text-indent:20px;margin-top:10px;font-style:normal;' label='Optoma'></optgroup><option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
				
				}
			else if(projectorBrandArray[i].firstChild.nodeValue == "Optoma" && OptomaLabel == 1)
				{
					dropDownhtml +=" <option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
					
				}
			
				// for Vivitek
				if(projectorBrandArray[i].firstChild.nodeValue == "Vivitek" && VivitekLabel == 0)
				{
					VivitekLabel=1;
					dropDownhtml +=" <optgroup style='text-indent:20px;margin-top:10px;font-style:normal;' label='Vivitek'></optgroup><option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
					
				}
			else if(projectorBrandArray[i].firstChild.nodeValue == "Vivitek" && VivitekLabel == 1)
				{
					dropDownhtml +=" <option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
					
				}
			
		}
		//end for business
		
		//for home
		if(typeArray[i].firstChild.nodeValue == "Home")
		{
			
			
			if (homeLabel==0)
			{
				homeLabel =1;
				dropDownhtml +=" <optgroup style='text-indent:10px;margin-top:10px;font-style:normal;' label='Home Entertainment'></optgroup>";
				
			}
			//for epson
			if(projectorBrandArray[i].firstChild.nodeValue == "Epson" && epsonLabelH == 0)
			{
				
				epsonLabelH=1;
				dropDownhtml +=" <optgroup style='text-indent:20px;margin-top:10px;font-style:normal;' label='Epson'></optgroup><option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
				
			}
			else if(projectorBrandArray[i].firstChild.nodeValue == "Epson" && epsonLabelH == 1)
				{
					
					dropDownhtml +=" <option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
					
				}
			
				//for lg
				if(projectorBrandArray[i].firstChild.nodeValue == "LG" && lgLabelH == 0)
				{
					
					
					lgLabelH=1;
					dropDownhtml +=" <optgroup style='text-indent:20px;margin-top:10px;font-style:normal;' label='LG'></optgroup><option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
					
				}
			else if(projectorBrandArray[i].firstChild.nodeValue == "LG" && lgLabelH == 1)
				{
					
					dropDownhtml +=" <option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
				}
			
				// for mirroir
				if(projectorBrandArray[i].firstChild.nodeValue == "Miroir" && mirroirLabelH == 0)
				{
					
					mirroirLabelH=1;
					dropDownhtml +=" <optgroup style='text-indent:20px;margin-top:10px;font-style:normal;' label='Miroir'></optgroup><option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
				
				}
			else if(projectorBrandArray[i].firstChild.nodeValue == "Miroir" && mirroirLabelH == 1)
				{
					
					dropDownhtml +=" <option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
				}
			
				// for Optoma
				if(projectorBrandArray[i].firstChild.nodeValue == "Optoma" && OptomaLabelH == 0)
				{
					
					OptomaLabelH=1;
					dropDownhtml +=" <optgroup style='text-indent:20px;margin-top:10px;font-style:normal;' label='Optoma'></optgroup><option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
					
				}
			else if(projectorBrandArray[i].firstChild.nodeValue == "Optoma" && OptomaLabelH == 1)
				{
					
					dropDownhtml +=" <option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
					
				}
			
				// for Vivitek
				if(projectorBrandArray[i].firstChild.nodeValue == "Vivitek" && VivitekLabelH == 0)
				{
					
					VivitekLabelH=1;
					dropDownhtml +=" <optgroup style='text-indent:20px;margin-top:10px;font-style:normal;' label='Vivitek'></optgroup><option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
					//alert(dropDownhtml);
				}
			else if(projectorBrandArray[i].firstChild.nodeValue == "Vivitek" && VivitekLabelH == 1)
				{
					
					dropDownhtml +=" <option value='"+i+"'>"+projectorModelArray[i].firstChild.nodeValue+"</option>";
					
				}
			
		}
		//end for HOME
  		
	}
		
	 
	 dropDownhtml +=" </select>";	
		
	 $("#toolDropdownWrapper").html(dropDownhtml);
	  /*
	   $("#toolDropdownWrapper").html(" <select id='toolDropdown' onchange='dropDownChange(this);'><optgroup style='text-indent:10px' label='Home Theater'><optgroup label='Home Theater'><option value='A+K-AstroBeam_S135-projection-calculator.htm'> AstroBeam S135 * </option></optgroup></optgroup></select> ");
	   */
	  $("input, textarea, select, button").uniform();
	   
}

function dropDownChange(elem) {
	//alert(projectorTotal);
	if(elem.value != -1){
	for (var i=0; i< projectorTotal; i++){
		
		if(i== Number(elem.value))
		{
			
			$("#projectorDescriptionMainWrapper #projectorDescriptionText .pBrand").text(projectorBrandArray[i].firstChild.nodeValue);
			$("#projectorDescriptionMainWrapper #projectorDescriptionText .pModel").text(projectorModelArray[i].firstChild.nodeValue);
			$("#projectorDescriptionMainWrapper #projectorDescriptionText .pResolution").text( projectorResolutionArray[i].firstChild.nodeValue);
			$("#projectorDescriptionMainWrapper #projectorDescriptionText .pCB").text(projectorCBArray[i].firstChild.nodeValue);
			$("#projectorDescriptionMainWrapper #projectorDescriptionText .pWB").text(projectorWBArray[i].firstChild.nodeValue);
			var tempProjectorType = typeArray[i].firstChild.nodeValue;
			if(tempProjectorType == "Business"){
				$("#homeEntertainmentBanner").css("display","none");
				$("#genericBanner").css("display","none");
				$("#businessBanner").css("display","block");
			}
			else if(tempProjectorType == "Home"){
				$("#homeEntertainmentBanner").css("display","block");
				$("#genericBanner").css("display","none");
				$("#businessBanner").css("display","none");
			}
			else{
				$("#genericBanner").css("display","block");
				$("#homeEntertainmentBanner").css("display","none");
				$("#businessBanner").css("display","none");
			}
		
				
				
				
				
			
			
			
			
			
			
			
			  learnmoreLink=projectorLearnmoreArray[i].firstChild.nodeValue;
		
			  throwRatio=throwRatioArray[i].firstChild.nodeValue;
			  if(screenWidthFeet == undefined)
			  {
				 screenWidthFeet = 8;
				 screenWidthInch = 9;
			  }
			  var inchDistance=Math.round(((screenWidthFeet *12) + screenWidthInch)*throwRatio);
			  convertInchtoFeetDistance(inchDistance);
			  $(".distanceTextBox").text(distanceFeet+"'" +" " + distanceInch +'"');
			  $("#distanceBoxBottom .textbox").text(distanceFeet+"'" +" " + distanceInch +'"');
			  
			  //formula1=formula1Array[i].firstChild.nodeValue;
			 // formula2=formula2Array[i].firstChild.nodeValue;
			 // $("#projectorImageHolder").css("background-image" , 'url(' +projectorImagePathArray[i].firstChild.nodeValue+')');
			  $("#projectorImageHolder").html($("<img>").attr("src", projectorImagePathArray[i].firstChild.nodeValue));
			  $('#projectorImageHolder img').width(200);
			  $('#projectorImageHolder img').height("auto");
			  
			  i= projectorTotal;
          /*  $("#pLearnmore").click(function (event) {
				alert('test');
                event.preventDefault();
				$(window).attr("location", projectorLearnmoreArray[i].firstChild.nodeValue);
			//window.location = projectorLearnmoreArray[i].firstChild.nodeValue;
		});*/
		  $("#pLearnmore").click(function() {
			  
			  window.location = learnmoreLink;
  				
			});
		}
	}
	}
}

function callOneLCD()
{
	$(".onelcd").fadeIn(500);
	$(".onelcd").css("top", (($( "#screenBox").height()/2) - (36)));
	$("#sizeBox #sizeBoxtimes").text("1");
}

function callFourLCD()
{
	$(".fourlcd").fadeIn(500);
	$(".fourlcd").css("top", (($( "#screenBox").height()/2) - (72)));
	$("#sizeBox #sizeBoxtimes").text("4");
}

function callSixLCD()
{
	$(".sixlcd").fadeIn(500);
	$(".sixlcd").css("top", (($( "#screenBox").height()/2) - (70)));
	$("#sizeBox #sizeBoxtimes").text("6");
}

function callNineLCD()
{
	$(".ninelcd").fadeIn(500);
	$(".ninelcd").css("top", (($( "#screenBox").height()/2) - (134.5)));
	$("#sizeBox #sizeBoxtimes").text("9");
}

function popupInit(){
	$("#popUp1 .popUpCircle").mouseenter(function(){
		
		$(" #popUp1 .popUpContent").css("display", "block");
		$(" #popUp1 .popUpCircleOn").css("display", "block");
		$(" #popUp1 .popUpCircle").css("display", "none");
		
		
		});
	
	$("#popUp1 .popUpCircleOn").mouseleave(function(){
		
		$(" #popUp1 .popUpContent").css("display", "none");
		
		$(" #popUp1 .popUpCircle").css("display", "block");
		$(" #popUp1 .popUpCircleOn").css("display", "none");
		});	
	$("#popUp2 .popUpCircle").mouseenter(function(){
		
		$(" #popUp2 .popUpContent").css("display", "block");
		$(" #popUp2 .popUpCircleOn").css("display", "block");
		$(" #popUp2 .popUpCircle").css("display", "none");
		
		});
	
	$("#popUp2 .popUpCircleOn").mouseleave(function(){
		
		$(" #popUp2 .popUpContent").css("display", "none");
		
		$(" #popUp2 .popUpCircle").css("display", "block");
		$(" #popUp2 .popUpCircleOn").css("display", "none");
		});		
		
	/*$("#popUp3 .popUpCircle").mouseenter(function(){
		
		$(" #popUp3 .popUpContent").css("display", "block");
		$(" #popUp3 .popUpCircleOn").css("display", "block");
		$(" #popUp3 .popUpCircle").css("display", "none");
		
		});
	
	$("#popUp3 .popUpCircleOn").mouseleave(function(){
		
		$(" #popUp3 .popUpContent").css("display", "none");
		$(" #popUp3 .popUpCircle").css("display", "block");
		$(" #popUp3 .popUpCircleOn").css("display", "none");
		
		});			*/
		
		 $("#popUp3 .popUpCircle").mouseenter(function(){
			$(" #popUp3 .popUpContent").css("display", "block");
			$(" #popUp3 .popUpCircleOn").css("display", "block");
			$(" #popUp3 .popUpCircle").css("display", "none");
    }).mouseleave(function(){
     // $(" #popUp3 .popUpContent").css("display", "none");
		//$(" #popUp3 .popUpCircle").css("display", "block");
		//$(" #popUp3 .popUpCircleOn").css("display", "none");
    });

	$("#popUp3 .popUpCircleOn").mouseenter(function(){
			
    }).mouseleave(function(){
     $(" #popUp3 .popUpContent").css("display", "none");
		$(" #popUp3 .popUpCircle").css("display", "block");
		$(" #popUp3 .popUpCircleOn").css("display", "none");
    });
	$("#RollOverDiv").mouseenter(function(){
			closeAllPopUp();
    });
	
	//pop 4
	$("#popUp4 .popUpCircle").mouseenter(function(){
		
		$(" #popUp4 .popUpContent").css("display", "block");
		$(" #popUp4 .popUpCircleOn").css("display", "block");
		$(" #popUp4 .popUpCircle").css("display", "none");
		
		
		});
	
	$("#popUp4 .popUpCircleOn").mouseleave(function(){
		
		$(" #popUp4 .popUpContent").css("display", "none");
		
		$(" #popUp4 .popUpCircle").css("display", "block");
		$(" #popUp4 .popUpCircleOn").css("display", "none");
		});	
}

function closeAllPopUp()
{
	$(" #popUp1 .popUpContent").css("display", "none");
		
		$(" #popUp1 .popUpCircle").css("display", "block");
		$(" #popUp1 .popUpCircleOn").css("display", "none");
		
    $(" #popUp2 .popUpContent").css("display", "none");
		
		$(" #popUp2 .popUpCircle").css("display", "block");
		$(" #popUp2 .popUpCircleOn").css("display", "none");	
 	$(" #popUp3 .popUpContent").css("display", "none");
		
		$(" #popUp3 .popUpCircle").css("display", "block");
		$(" #popUp3 .popUpCircleOn").css("display", "none");	
	$(" #popUp4 .popUpContent").css("display", "none");
		
		$(" #popUp4 .popUpCircle").css("display", "block");
		$(" #popUp4 .popUpCircleOn").css("display", "none");	
}