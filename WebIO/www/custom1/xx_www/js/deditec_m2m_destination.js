//*****************************************************************
//*****************************************************************
//*****************************************************************
//*****************************************************************
// destination

// global variables
var g_selectbox_destination;
var g_int_innerHTML = 1;
var g_int_value = 2;
var g_int_dest_count = 5;
var g_int_destination_current;
var test_com_intervall_handle;

var key_and_element_string = "";

function onLoad()
{
	// global_int_webrequest_counter = 1; // fixed
	g_selectbox_destination = document.getElementById("m2m_source_select_dest"); // get reference of type selectbox
	g_int_destination_current =  0;
	
	webrequests_start();
}

function webrequests_start()
{
	disable_html_elements();

	

	// get dest config and save them in the hidden fields
	for(var i = 0; i < g_int_dest_count; i++)
	{
		key_and_element_string += "m2m_dest"+(i)+"_name;m2m_dest"+(i)+"_hidden_name;";
		key_and_element_string += "m2m_dest"+(i)+"_ip_addr;m2m_dest"+(i)+"_hidden_ip_addr;"; 
		key_and_element_string += "m2m_dest"+(i)+"_port;m2m_dest"+(i)+"_hidden_port;";
		key_and_element_string += "m2m_dest"+(i)+"_timeout;m2m_dest"+(i)+"_hidden_timeout;";	
	}
	
	// send webrequest
	webrequest_get_and_put_to_field_multiple(server_id.param_server, key_and_element_string, webrequest_option.none, error_option.only_alert, configure_form);
}

// called from webrequest.js
function configure_form() 
{
	fill_m2m_source_select_dest();
	g_selectbox_destination.selectedIndex = g_int_destination_current;
	change_destination_id();
	
	enable_html_elements();
}

function fill_m2m_source_select_dest() 
{
	var string_dest_name;
	var string_dest_ip;
	
	// remove all options
	g_selectbox_destination.options.length = 0;
	
	// add options
	for (var i = 0; i < g_int_dest_count; i++)
	{
		string_dest_name = document.getElementById("m2m_dest"+(i)+"_hidden_name").value;
		string_dest_ip   = document.getElementById("m2m_dest"+(i)+"_hidden_ip_addr").value;
		g_selectbox_destination.options[g_selectbox_destination.options.length] = new Option(string_dest_name+" ("+string_dest_ip+")", i);
	}
}

function change_destination_id()
{
	g_int_destination_current = g_selectbox_destination.selectedIndex;
	fill_m2m_dest();
}

function fill_m2m_dest() 
{
	var string_dest_name;
	var string_dest_ip;
	var string_dest_port;
	var string_dest_timeout;

	string_dest_name 	= document.getElementById("m2m_dest"+(g_int_destination_current)+"_hidden_name").value;
	string_dest_ip   	= document.getElementById("m2m_dest"+(g_int_destination_current)+"_hidden_ip_addr").value;
	string_dest_port 	= document.getElementById("m2m_dest"+(g_int_destination_current)+"_hidden_port").value;
	string_dest_timeout = document.getElementById("m2m_dest"+(g_int_destination_current)+"_hidden_timeout").value;

	document.getElementById("m2m_destX_name").value = string_dest_name;
	document.getElementById("m2m_destX_ip_addr").value = string_dest_ip;
	document.getElementById("m2m_destX_port").value = string_dest_port;
	document.getElementById("m2m_destX_timeout").value = string_dest_timeout;
}

// called from update button
function save_settings_to_cfg()
{
	if(check_ip_valid_v4(document.getElementById("m2m_destX_ip_addr").value))
	{
		// check if port is a valid number
		var tempValue = parseInt(document.getElementById("m2m_destX_port").value);
		if (Math.floor(tempValue) != tempValue) 
		{
			alert("Error: Port value must be a number");
			return;
		}
		
		// check timeout is a valid number
		tempValue = parseInt(document.getElementById("m2m_destX_timeout").value);
		if (Math.floor(tempValue) != tempValue) 
		{
			alert("Error: Timeout value must be a number");
			return;
		}
		
		// moves values from textfield to hidden and write them to deditec.cfg
		document.getElementById("m2m_dest"+(g_int_destination_current)+"_hidden_name").value = document.getElementById("m2m_destX_name").value;
		key_and_element_string += "m2m_dest"+g_int_destination_current+"_name;m2m_dest"+(g_int_destination_current)+"_hidden_name;";

		document.getElementById("m2m_dest"+(g_int_destination_current)+"_hidden_ip_addr").value = document.getElementById("m2m_destX_ip_addr").value;
		key_and_element_string += "m2m_dest"+g_int_destination_current+"_ip_addr;m2m_dest"+(g_int_destination_current)+"_hidden_ip_addr;";
		
		document.getElementById("m2m_dest"+(g_int_destination_current)+"_hidden_port").value = document.getElementById("m2m_destX_port").value;
		key_and_element_string += "m2m_dest"+g_int_destination_current+"_port;m2m_dest"+(g_int_destination_current)+"_hidden_port;";
		
		document.getElementById("m2m_dest"+(g_int_destination_current)+"_hidden_timeout").value = document.getElementById("m2m_destX_timeout").value;
		key_and_element_string += "m2m_dest"+g_int_destination_current+"_timeout;m2m_dest"+(g_int_destination_current)+"_hidden_timeout;";
		
		// saves the current selected index
		g_int_destination_current = g_selectbox_destination.selectedIndex;
		
		// done message
		
		
		webrequest_send_from_field_multiple(server_id.param_server, key_and_element_string, webrequest_option.none, error_option.only_alert, function() {
			webrequest_send(server_id.param_server, "special_cmd_reload_params", "1", webrequest_option.none, error_option.only_alert, function() {
				webrequests_start();
				alert("Parameters saved to module");
			});	
		});
		
		
		
		// set reload parameter
		//webrequest_send(server_id.param_server, "special_cmd_reload_params", "1");
		
		// global_int_webrequest_counter = 0; // fixed
		//webrequests_start();	
	}
	else
	{
		alert("Error: Invalid ip-address");
	}
}

function disable_html_elements()
{
	document.getElementById("m2m_destX_name").disabled = true;
	document.getElementById("m2m_source_button_test_communication").disabled = true;
	document.getElementById("m2m_destX_ip_addr").disabled = true;
	document.getElementById("m2m_destX_port").disabled = true;
	document.getElementById("m2m_destX_timeout").disabled = true;
	document.getElementById("m2m_source_select_dest").disabled = true;
}

function enable_html_elements()
{
	document.getElementById("m2m_destX_name").disabled = false;
	document.getElementById("m2m_source_button_test_communication").disabled = false;
	document.getElementById("m2m_destX_ip_addr").disabled = false;
	document.getElementById("m2m_destX_port").disabled = false;
	document.getElementById("m2m_destX_timeout").disabled = false;
	document.getElementById("m2m_source_select_dest").disabled = false;
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function test_communication()
{
	if(check_ip_valid_v4(document.getElementById("m2m_destX_ip_addr").value))
	{
		key_and_element_string = "";
		key_and_element_string += "test_com_ip;m2m_destX_ip_addr;";
		key_and_element_string += "test_com_port;m2m_destX_port;";
		key_and_element_string += "test_com_timeout;m2m_destX_timeout;";
		key_and_element_string += "test_com_status;m2m_destX_ip_addr;";
		
		webrequest_send_from_field_multiple(server_id.param_server, key_and_element_string, webrequest_option.none, error_option.only_alert, function() {
			webrequest_send(server_id.param_server, "test_com_status", "0", webrequest_option.none, error_option.only_alert, test_communication_callback);
			document.getElementById("test_com_status").value = 0;
			document.getElementById("m2m_source_button_test_communication").disabled = true;
		});
	}
	else
	{
		alert("Invalid ip-address!");
	}
}

function test_communication_callback()
{
	test_com_intervall_handle = window.setInterval("test_communication_intervall()", 500);
}

function test_communication_intervall()
{
	// get communication status
	webrequest_to_field(server_id.param_server, "test_com_status", document.getElementById("test_com_status"), webrequest_option.none, error_option.only_alert);

	// got answer (1 = ok	2 = error)
	if(document.getElementById("test_com_status").value != 0)
	{	
		if(document.getElementById("test_com_status").value == 1)
		{
			alert("Communication OK!");
		}
		else if(document.getElementById("test_com_status").value == 2)
		{
			alert("Communication Error!");
		}

		// clear interval
		clearInterval(test_com_intervall_handle);
		
		// enable html button
		document.getElementById("m2m_source_button_test_communication").disabled = false;
	}
	// no answer yet..
	else	
	{
		$("#m2m_source_button_test_communication").fadeTo(250, 0.2).fadeTo(250, 1.0);
	}
}
