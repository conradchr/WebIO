//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//
//
//
//	deditec_webrequest.js
//	project: WEB-I/O
//
//
//	(c) DEDITEC GmbH, 2009-2014
//	web: http://www.deditec.de/
//	mail: vertrieb@deditec.de
//
//
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************

var DT_STRING_EMPTY = "!$%&/()=?";

var error_option = {
	ignore:	1,				// ignoriert
	stop_interval: 2,		// stoppt laufendes interval + alert mit fehler + fehler print bei status (eigentlich nur auf io-seiten)
	only_alert: 3			// bringt nur ein alert mit dem fehler
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

var webrequest_option = {
	none: 0,				// resettet session_time
	is_background: 1		// resettet NICHT session_time
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

var server_id = {
	param_server: 1,
	ro_eth_fw: 2,
	ro_eth_mon: 3,
	usr_mgr: 4,
	bc_srv: 5,
	sms_srv: 6,
	exec_srv: 9,
	ro_eth_m2m: 100
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

var webrequest_send;
var webrequest_get;
var webrequest_get_multiple;
var webrequest_send_multiple;

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

(function() {

	var requestHandler = function (callback, data, err_option) {
	
		var isError = false;
		var showDataErrorMsg = false;
		var msg;
		
		////alert(data);
		if (typeof data == "undefined") 
		{
			// ERROR
			//callback("", "ajax");
			msg = "Ajax request failed!";
			isError = true;
		}
		if (!(/^(OK|ERROR)(\n|$)/i.test(data)))
		{
			// ERROR
			//callback(data, "malformed response");
			msg = "Ajax request ok.\nReceived malformed response!";
			isError = true;
		}
		if (/^ERROR(\n|$)/i.test(data)) 
		{
			// ERROR
			//callback(data.replace(/^ERROR(\n|$)/i, ""), "error");
			showDataErrorMsg = true;
			isError = true;
		}
		if (/^OK(\n|$)/i.test(data)) {
			// OK
			callback(data.replace(/^OK(\n|$)/i, ""));
			
			if (err_option == this.error_option.stop_interval)
			{
				$("#modul_status").html("OK");
			}
			
			/*
			if (data.length == "OK".length)
			{
				// das war ein schreibbefehl
				alert("Parameter(s) has been saved succesfully");
			}*/
			
			return;
		}
		
		// error handling
		if (isError == true)
		{
			switch(err_option)
			{
				case this.error_option.ignore:				
					//alert("ignore");
					break;
					
				case this.error_option.stop_interval:
					//alert("stop_interval");
					if (showDataErrorMsg)
						alert(data);
					else
						alert(msg);
					clearInterval(timer);
					$("#modul_status").html(data);
					break;
					
				case this.error_option.only_alert:
					if (showDataErrorMsg)
						alert(data);
					else
						alert(msg);
					break;
					
				default: 
					//alert("err_handler: default");
					break;
			}
		}
	};
	
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------

	var request = function (rw_type, val_srvid, val_cmd, send_data, val_par4, val_par5, err_option, val_callback) {
		
		//	=====================================================================
		//				 	|	 par get	|	 par set	|	 par get multi  |
		//	=====================================================================
		//  rw_type	        |	   "R"		|	   "W"		|		 "M"		|
		//	val_cmd[64]	    |	  param		|	  param		|  		 ""			|
		//  send_data[8192]	|	  false		| 	new data	| 		param		|
		//	par4	  		|		0		|		0		|		  0	    	|
		//	par5	  		|		0		|		0		|		  0 		|
		//	=====================================================================
		//  todo: in interne doku kopieren
		
		//alert("cb: "+callback);
		var data = {
			rw: rw_type,
			username: "foo",
			userpwdid: "bar",
			srvid: val_srvid,
			cmd: val_cmd,
			par4: val_par4,
			par5: val_par5,
			job: (new Date()).getTime()
		};
		
		//alert("rw: "+rw_type+" srvid: "+val_srvid+" cmd: "+val_cmd+" send: "+send_data+" par4: "+val_par4+" par5: "+val_par5);
		
		if (send_data !== false) {
			data.val = send_data;
		}

		$.ajax ({
			url: "/cgi-bin/webrequest",
			type: "GET",
			mimeType: "text/plain",
			timeout: "5000",
			data: data,
			success: function (val_callback) {
				return function (data) {
					requestHandler(val_callback, data, err_option);
				}
			}(val_callback),
			error: function (val_callback) {
				return function (data) {
					requestHandler(val_callback, data, err_option);
				}
			}(val_callback)
		})		
	};

	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------

	var webrequest_send_callback = function (data, error) {
		if (typeof error != "undefined") {
			alert("webrequest_send failed with error message:\n" + error);
			// ajax failed
			return;
		}
		// ajax succeeded
	};

	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------

	webrequest_send = function (server_id, cmd, data, webrequest_option, err_option, callback) {
		switch (webrequest_option)
		{
			case this.webrequest_option.none:			rw_type="W0";		break;
			/*
			case this.webrequest_option.is_background:	rw_type="WB";		break;
			default: alert("webrequest_send");			rw_type="";			break;
			*/
			default: rw_type="WB";		break;
		}
		request (rw_type, server_id, cmd, data, 0, 0, err_option, (typeof callback == "undefined") ? webrequest_send_callback : callback);
	};

	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------

	webrequest_get = function (server_id, cmd, webrequest_option, err_option, callback) {
		switch (webrequest_option)
		{
			case this.webrequest_option.none:			rw_type="R0";		break;
			/*
			case this.webrequest_option.is_background:	rw_type="RB";		break;
			default: alert("webrequest_get -> unknown 'webrequest_option'");			rw_type="";			break;
			*/
			default: rw_type="RB";		break;
		}
		request (rw_type, server_id, cmd, false, 0, 0, err_option, (typeof callback == "undefined") ? webrequest_send_callback : callback);
	};
	
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	
	webrequest_get_multiple = function (server_id, data, webrequest_option, err_option, callback) {
		switch (webrequest_option)
		{
			case this.webrequest_option.none:			rw_type="M0";		break;
			/*
			case this.webrequest_option.is_background:	rw_type="MB";		break;
			default: alert("webrequest_get_multiple");	rw_type="";			break;
			*/
			default: rw_type="MB";		break;
		}
		request (rw_type, server_id, "", data, 0, 0, err_option, callback);
	};

	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	
	webrequest_send_multiple = function (server_id, data, webrequest_option, err_option, callback) {
		switch (webrequest_option)
		{
			case this.webrequest_option.none:			rw_type="N0";		break;
			/*
			case this.webrequest_option.is_background:	rw_type="NB";		break;
			default: alert("webrequest_send_multiple");	rw_type="";			break;
			*/
			default:	rw_type="NB";		break;
		}
		request (rw_type, server_id, "", data, 0, 0, err_option, callback);
	};
	
})();

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function webrequest_get_and_put_to_field_multiple(server_int, key_and_element_string, webrequest_option, err_option, callback_function, reverse_return_bool)
{
	var textArray = new Array;
	var keyArray = new Array;
	var sendData = "";
	var i = 0;
	var j = 0;
	var element;
	
	textArray = CutTextToArray(key_and_element_string, ";");
	
	for(i = 0; i < textArray.length; i+=2)
	{
		sendData += textArray[i]+";";
	}
	
	// remove last semicolon
	sendData = sendData.substring(0, sendData.length - 1);

	var callback = function (data, error) {
		keyArray = CutTextToArray(data, "#@~#");
		
		for(i = 0; i < textArray.length; i+=2)
		{
			textArray[i] = keyArray[j];
			j++;
		}
		
		iserror = false;
		if (typeof error != "undefined") 
		{
			var message = error == "ajax" ? "ajax" : data;
			iserror = true;
			return;
		}
		
		if (iserror)
		{
			alert("Error while Webrequest!");	
			return;
		}
			
		for(j = 0; j < textArray.length; j+=2)
		{
			if (reverse_return_bool == true)
			{
				textArray[j] = textArray[j].split("").reverse().join("");	// string umdrehen
				textArray[j] = parseInt(textArray[j], 16);					// hex 2 int
			}

			element = get_element(textArray[j+1]);
			data = textArray[j];
			
			set_data_to_element(element, data);
		}
		
		if(typeof callback_function === "function")
		{
			callback_function();
		}
	};

	webrequest_get_multiple(server_int, sendData, webrequest_option, err_option, callback);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function webrequest_send_from_field_multiple(server_int, key_and_element_string, webrequest_option, err_option, callback_function)
{	
	var textArray = new Array;
	var i = 0;
	var element;
	
	textArray = CutTextToArray(key_and_element_string, ";");
	key_and_element_string = "";
	
	for (i=0; i!=textArray.length; i+=2)
	{
		// an der stelle i+1 steht die id des feldes.. diese id wird hier mit dem wert (value, index, ...) ausgetauscht
		element = get_element(textArray[i+1]);
		textArray[i+1] = get_data_from_element(element);
		
		// string wieder zusammensetzen in der form (key, wert)
		key_and_element_string += textArray[i] + ";" + textArray[i+1] + ";";
	}
	
	// remove last semicolon
	key_and_element_string = key_and_element_string.substring(0, key_and_element_string.length - 1);
	
	
	var callback = function (data, error) {	
		iserror = false;
		if (typeof error != "undefined") 
		{
			var message = error == "ajax" ? "ajax" : data;
			iserror = true;
			return;
		}
		
		if (iserror)
		{
			alert("Error while Webrequest!");	
			return;
		}
		
		if(typeof callback_function === "function")
		{
			callback_function();
		}		
	};

	webrequest_send_multiple(server_int, key_and_element_string, webrequest_option, err_option, callback);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// todo - in entsprechende library einpflegen

function CutTextToArray(textzeile, trennzeichen)
{
	var textArray = textzeile.toString().split(trennzeichen);
	
	if(textArray[textArray.length-1] === "")
	{
		textArray = textArray.slice(0, -1);	 	// cut last array item if empty
	}
	
	return textArray;
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function webrequest_to_field(server_int, key_string, element_id, webrequest_option, err_option, callback_function, reverse_return_bool)
{
	var callback = function (data, error) {
		iserror = false;
		if (typeof error != "undefined") 
		{
			var message = error == "ajax" ? "ajax" : data;
			iserror = true;
			return;
		}
		
		if (iserror)
		{
			alert("Error while Webrequest!");	
			return;
		}

		if (reverse_return_bool == true)
		{
			data = data.split("").reverse().join("");	// string umdrehen
			data = parseInt(data, 16);					// hex 2 int
		}
		
		element = get_element(element_id);
		set_data_to_element(element, data);
		
		if (typeof(callback_function) == "function")
		{
			callback_function();
		}
	};
	
	webrequest_get(server_int, key_string, webrequest_option, err_option, callback);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function webrequest_from_field(server_int, key_string, element_id, webrequest_option, err_option, callback_function)
{
	
	var element = get_element(element_id);
	var data = get_data_from_element(element);
	
	var callback = function (data, error) {
		iserror = false;
		if (typeof error != "undefined") 
		{
			var message = error == "ajax" ? "ajax" : data;
			iserror = true;
			return;
		}
		
		if (iserror == true)
		{
			alert("ERROR");
		}
		
		if (typeof(callback_function) == "function")
		{
			callback_function();
		}
	};
	
	webrequest_send(server_int, key_string, String(data), webrequest_option, err_option, callback);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function get_data_from_element(element)
{
	var data = 0;
	
	if (element.length == 0)
	{
		// element does not exist
		return 0;
	}
	
	if ((element.is("input") == true) || (element.is("textarea") == true))
	{
		if ((element.attr("type") == "checkbox") || (element.attr("type") == "radio"))
		{
			(element.is(":checked") == true) ? data = 1 : data = 0;
		}
		else
		{
			data = element.val();
		}
	}
	else if (element.is("select") == true)
	{
		data = element.prop("selectedIndex");
	}
	else if (element.is("label") == true)
	{
		data = element.html();
	}
	else
	{
		alert("get_data_to_element: element= " + element.attr('id') + " type= " + typeof(element) + " -> type undefined");
	}
	
	// achtung das muss mit '===' gemacht, damit der typ mit überprüft wird.
	// sonst wird 0 = "" gewertet
	if (data === "") 
	{
		//alert("get_data_from_element data = " + data);
		data = DT_STRING_EMPTY;
	}
	
	return data;
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function set_data_to_element(element, data)
{	
	if (element.length == 0)
	{
		// element does not exist
		return;
	}
	
	if (data === DT_STRING_EMPTY)
	{
		//alert("set_data_to_element");
		data = "";
	}

	if ((element.is("input") == true) || (element.is("textarea") == true))
	{
		if ((element.attr("type") == "checkbox") || (element.attr("type") == "radio"))
		{
			((data == 1) || (data == '1')) ? element.prop("checked", true) : element.prop("checked", false);
		}
		else
		{
			element.val(data);
		}
	}
	else if (element.is("select") == true)
	{
		element.prop("selectedIndex", data);
	}
	else if ((element.is("label") == true) || (element.is("div") == true))
	{
		element.html(data);
	}
	else
	{
		alert("set_data_to_element: element= " + element.prop('id') + " type= " + typeof(element) + " -> type undefined");
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function get_element(id)
{
	//alert(id);

	if (id instanceof jQuery)
	{
		return id;
	}
	else if (typeof(id) == "object")
	{
		// macht document.getElementById("bla") zu $("#bla")
		return $(id);
	}
	else if ((typeof id == 'string') || (id instanceof String))
	{
		// macht "bla" zu $("#bla")
		return $("#"+id);
	}
	else
	{
		alert("get_element: id= " + id + " -> type undefined");
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
