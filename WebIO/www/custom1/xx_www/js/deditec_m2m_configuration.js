//*****************************************************************
//*****************************************************************
//*****************************************************************
//*****************************************************************
// M2M

// global variables
var g_int_job_count = 10;
var g_int_job_current = 0;
var g_selectbox_type;
var g_selectbox_dest;
var g_selectbox_ad_mode;
var g_selectbox_da_mode;
var g_selectbox_destination;
var g_selectbox_start_chan_source;
var g_selectbox_end_chan_source;
var g_selectbox_start_chan_dest;
var g_int_dest_count = 5;

function onLoad()
{		
	g_selectbox_type = document.getElementById("m2m_source_select_type"); // get reference of type selectbox
	g_selectbox_dest = document.getElementById("m2m_source_select_dest"); // get reference of dest selectbox
	g_selectbox_ad_mode = document.getElementById("m2m_source_select_par4"); // get reference of ad selectbox
	g_selectbox_da_mode = document.getElementById("m2m_source_select_par5"); // get reference of da selectbox
	g_selectbox_destination = document.getElementById("m2m_source_select_dest"); // get reference of destination selextbox
	g_selectbox_start_chan_source = document.getElementById("m2m_source_select_par1"); // get reference of start chan source selectbox
	g_selectbox_end_chan_source = document.getElementById("m2m_source_select_par2"); // get reference of end chan source selectbox
	g_selectbox_start_chan_dest = document.getElementById("m2m_source_select_par3"); // get reference of start chan dest selectbox

		
	webrequests_start();
}

function webrequests_start()
{	
	// disable elements
	disable_html_elements();
	
	var key_and_element_string = "";
	
	// get job names
	for (var i = 0; i < g_int_job_count; i++)
	{
		key_and_element_string += "m2m_source"+(i)+"_name;m2m_source"+(i)+"_hidden_name;";
	}
		
	// get job values
	key_and_element_string += "m2m_source"+(g_int_job_current)+"_active;m2m_source_hidden_active;";
	key_and_element_string += "m2m_source"+(g_int_job_current)+"_type;m2m_source_hidden_type;";
	key_and_element_string += "m2m_source"+(g_int_job_current)+"_par0;m2m_source_hidden_par0;";
	key_and_element_string += "m2m_source"+(g_int_job_current)+"_par1;m2m_source_hidden_par1;";
	key_and_element_string += "m2m_source"+(g_int_job_current)+"_par2;m2m_source_hidden_par2;";
	key_and_element_string += "m2m_source"+(g_int_job_current)+"_par3;m2m_source_hidden_par3;";
	key_and_element_string += "m2m_source"+(g_int_job_current)+"_par4;m2m_source_hidden_par4;";
	key_and_element_string += "m2m_source"+(g_int_job_current)+"_par5;m2m_source_hidden_par5;";
	key_and_element_string += "m2m_source"+(g_int_job_current)+"_par6;m2m_source_hidden_par6;";
	key_and_element_string += "m2m_source"+(g_int_job_current)+"_par7;m2m_source_hidden_par7;";
	key_and_element_string += "m2m_source"+(g_int_job_current)+"_par8;m2m_source_hidden_par8;";
	key_and_element_string += "m2m_source"+(g_int_job_current)+"_par9;m2m_source_hidden_par9;";
	
	// get product config
	key_and_element_string += "product_cfg_di;m2m_source_hidden_product_cfg_di;";
	key_and_element_string += "product_cfg_ai;m2m_source_hidden_product_cfg_ai;";	
	
	// get dest config
	key_and_element_string += "m2m_dest_count;m2m_dest_hidden_count;";
	for(var i = 0; i < g_int_dest_count; i++)
	{
		key_and_element_string += "m2m_dest"+(i)+"_name;m2m_dest"+(i)+"_hidden_name;";
		key_and_element_string += "m2m_dest"+(i)+"_ip_addr;m2m_dest"+(i)+"_hidden_ip_addr;";	
	}	

	// send webrequest

	webrequest_get_and_put_to_field_multiple(server_id.param_server, key_and_element_string, webrequest_option.is_background, error_option.ignore, configure_form);

}

function configure_form() // is called from the webrequest multiple function
{
	fill_m2m_source_select_job();
	fill_m2m_source_select_dest();
	fill_m2m_source_textfield_name();
	set_ad_da_mode();
	
	// set active checkbox
	if(document.getElementById("m2m_source_hidden_active").value == 1)
	{
		document.getElementById("m2m_source_checkbox_active").checked = true;
	}
	else if(document.getElementById("m2m_source_hidden_active").value == 0)
	{
		document.getElementById("m2m_source_checkbox_active").checked = false;
	}
	else
	{
		alert("Error: parameter m2m_source_active is not defined");
	}

	// set intervall active checkbox
	if(document.getElementById("m2m_source_hidden_par6").value == 1)
	{
		document.getElementById("m2m_source_checkbox_par6").checked = true;
	}
	else if(document.getElementById("m2m_source_hidden_par6").value == 0)
	{
		document.getElementById("m2m_source_checkbox_par6").checked = false;
	}
	else
	{
		alert("Error: parameter m2m_source_par6 is not defined");
	}

	// set on change active checkbox
	if(document.getElementById("m2m_source_hidden_par7").value == 1)
	{
		//document.getElementById("m2m_source_checkbox_par7").checked = true;
	}
	else if(document.getElementById("m2m_source_hidden_par7").value == 0)
	{
		//document.getElementById("m2m_source_checkbox_par7").checked = false;
	}
	else
	{
		alert("Error: parameter m2m_source_par7 is not defined");
	}
	
	// get offset of on change
	// document.getElementById("m2m_source_textfield_par8").value = (document.getElementById("m2m_source_hidden_par8").value);
	
	// ------------------------------------------------------------------------
	// fill type selectbox
	if(document.getElementById("m2m_source_hidden_product_cfg_di").value != 0)
	{
		g_selectbox_type.options[g_selectbox_type.options.length] = new Option('digital-inputs ('+document.getElementById("m2m_source_hidden_product_cfg_di").value+')', 'di');
	}
	if(document.getElementById("m2m_source_hidden_product_cfg_ai").value != 0)
	{
		g_selectbox_type.options[g_selectbox_type.options.length] = new Option('analog-inputs ('+document.getElementById("m2m_source_hidden_product_cfg_ai").value+')', 'ai');
	}
	
	// WICHTIG: abfrage ob ad kanäle vorhanden sind umgangen weil ad kanäle nicht erkannt wurden...
	g_selectbox_type.options[g_selectbox_type.options.length] = new Option('analog-inputs ('+document.getElementById("m2m_source_hidden_product_cfg_ai").value+')', 'ai');
	
	// test counter
	//g_selectbox_type.options[g_selectbox_type.options.length] = new Option('test_counter', 't');
	
	// if no inputs are found write this to selectbox type
	if(g_selectbox_type.options.length == 0)
	{
		g_selectbox_type.options[g_selectbox_type.options.length] = new Option('no inputs found!', 'noInputs');
	}
	
	// set selected index of destination select
	for(var i = 0; i < g_selectbox_dest.options.length; i++)
	{
		if(document.getElementById("m2m_source_hidden_par9").value == g_selectbox_dest.options[i].value)
		{
			g_selectbox_dest.options[i].selected = true;
		}	
	}	
	// ------------------------------------------------------------------------
	
	// set selected index of type select	
	for(var i = 0; i < g_selectbox_type.options.length; i++)
	{
		if(document.getElementById("m2m_source_hidden_type").value == g_selectbox_type.options[i].value)
		{
			g_selectbox_type.options[i].selected = true;
		}	
	}	
	
	// intervall
	if((document.getElementById("m2m_source_hidden_par0").value % 3600000) == 0)			// hour
	{
		document.getElementById("m2m_source_textfield_par0_value").value = (document.getElementById("m2m_source_hidden_par0").value / 3600000);
		document.getElementById("m2m_source_select_par0_time_unit").selectedIndex = 0;
	}
	else if((document.getElementById("m2m_source_hidden_par0").value % 60000) == 0)			// min
	{
		document.getElementById("m2m_source_textfield_par0_value").value = (document.getElementById("m2m_source_hidden_par0").value / 60000);
		document.getElementById("m2m_source_select_par0_time_unit").selectedIndex = 1;
	}
	else if((document.getElementById("m2m_source_hidden_par0").value % 1000) == 0)			// sec
	{
		document.getElementById("m2m_source_textfield_par0_value").value = (document.getElementById("m2m_source_hidden_par0").value / 1000);
		document.getElementById("m2m_source_select_par0_time_unit").selectedIndex = 2;
	}
	else																					// msec
	{
		document.getElementById("m2m_source_textfield_par0_value").value = (document.getElementById("m2m_source_hidden_par0").value);
		document.getElementById("m2m_source_select_par0_time_unit").selectedIndex = 3;
	}
	

	fill_start_and_end_channel_selectbox();
	
	/*for(var i = 1; i <= document.getElementById("m2m_source_hidden_product_cfg_di").value; i++)
	{
		g_selectbox_start_chan_source.options[g_selectbox_start_chan_source.options.length] = new Option(i, i);
		g_selectbox_end_chan_source.options[g_selectbox_end_chan_source.options.length] = new Option(i, i);
	}*/
	
	//  fill start channel selectbox for destination module
	for(var i = 1; i <= 64; i++)
	{
		g_selectbox_start_chan_dest.options[g_selectbox_start_chan_dest.options.length] = new Option(i, i);
	}

	// set selected index of start and end channel selectbox
	if(document.getElementById("m2m_source_hidden_par1").value != 0)
	{
		g_selectbox_start_chan_source.selectedIndex = document.getElementById("m2m_source_hidden_par1").value;
	}
	if(document.getElementById("m2m_source_hidden_par2").value != 0)
	{
		g_selectbox_end_chan_source.selectedIndex = document.getElementById("m2m_source_hidden_par2").value;
	}
	if(document.getElementById("m2m_source_hidden_par3").value != 0)
	{
		g_selectbox_start_chan_dest.selectedIndex = document.getElementById("m2m_source_hidden_par3").value;
	}
	//document.getElementById("m2m_source_textfield_par1").value = (document.getElementById("m2m_source_hidden_par1").value);
	//document.getElementById("m2m_source_textfield_par2").value = (document.getElementById("m2m_source_hidden_par2").value);
	//document.getElementById("m2m_source_textfield_par3").value = (document.getElementById("m2m_source_hidden_par3").value);
	fill_end_chan_destination();	
	
	// enable elements
	enable_html_elements();
}

function fill_start_and_end_channel_selectbox()
{
	// fill start and end channel selectbox for source module
	if (g_selectbox_type.options[g_selectbox_type.selectedIndex].value == "di")
	{
		for(var i = 1; i <= document.getElementById("m2m_source_hidden_product_cfg_di").value; i++)
		{
			if(i <= 64)
			{
				g_selectbox_start_chan_source.options[g_selectbox_start_chan_source.options.length] = new Option(i, i);
				g_selectbox_end_chan_source.options[g_selectbox_end_chan_source.options.length] = new Option(i, i);
			}
		}
	}
	else if(g_selectbox_type.options[g_selectbox_type.selectedIndex].value == "ai")
	{
		for(var i = 1; i <= document.getElementById("m2m_source_hidden_product_cfg_ai").value; i++)
		{
			if(i <= 64)
			{
				g_selectbox_start_chan_source.options[g_selectbox_start_chan_source.options.length] = new Option(i, i);
				g_selectbox_end_chan_source.options[g_selectbox_end_chan_source.options.length] = new Option(i, i);
			}

		}
	}
}

function enable_html_elements()
{	
	document.getElementById("m2m_source_checkbox_active").disabled = false;
	document.getElementById("m2m_source_select_job").disabled = false;
	
	if(document.getElementById("m2m_source_checkbox_active").checked == true)
	{
		document.getElementById("m2m_source_textfield_name").disabled = false;
		document.getElementById("m2m_source_button_name").disabled = false;
		document.getElementById("m2m_source_select_type").disabled = false;
		document.getElementById("m2m_source_select_dest").disabled = false;
		//document.getElementById("m2m_source_button_test_communication").disabled = false;
		document.getElementById("m2m_source_checkbox_par6").disabled = false;
		document.getElementById("m2m_source_textfield_par0_value").disabled = false;
		document.getElementById("m2m_source_select_par0_time_unit").disabled = false;
		//document.getElementById("m2m_source_checkbox_par7").disabled = false;
		
		// document.getElementById("m2m_source_textfield_par8").disabled = false;
		//document.getElementById("m2m_source_textfield_par1").disabled = false;
		
		if (g_selectbox_type.options[g_selectbox_type.selectedIndex].value == "ai")
		{
			document.getElementById("m2m_source_select_par4").disabled = false;
			document.getElementById("m2m_source_select_par5").disabled = false;
		}

		//document.getElementById("m2m_source_textfield_par2").disabled = false;
		//document.getElementById("m2m_source_textfield_par3").disabled = false;
		g_selectbox_start_chan_source.disabled = false;
		g_selectbox_end_chan_source.disabled = false;
		g_selectbox_start_chan_dest.disabled = false;
	}
}

function disable_html_elements()
{
	document.getElementById("m2m_source_textfield_name").disabled = true;
	document.getElementById("m2m_source_button_name").disabled = true;
	document.getElementById("m2m_source_select_type").disabled = true;
	document.getElementById("m2m_source_select_dest").disabled = true;
	//document.getElementById("m2m_source_button_test_communication").disabled = true;
	document.getElementById("m2m_source_checkbox_par6").disabled = true;
	document.getElementById("m2m_source_textfield_par0_value").disabled = true;
	document.getElementById("m2m_source_select_par0_time_unit").disabled = true;
	//document.getElementById("m2m_source_checkbox_par7").disabled = true;
	// document.getElementById("m2m_source_textfield_par8").disabled = true;
	//document.getElementById("m2m_source_textfield_par1").disabled = true;
	document.getElementById("m2m_source_select_par4").disabled = true;
	document.getElementById("m2m_source_select_par5").disabled = true;
	//document.getElementById("m2m_source_textfield_par2").disabled = true;
	//document.getElementById("m2m_source_textfield_par3").disabled = true;
	g_selectbox_start_chan_source.disabled = true;
	g_selectbox_end_chan_source.disabled = true;
	g_selectbox_start_chan_dest.disabled = true;
}
function toggle_html_elements()
{
	if(document.getElementById("m2m_source_checkbox_active").checked == true)
	{
		enable_html_elements();
	}
	else
	{
		disable_html_elements();
	}
}

function toogle_ad_da_mode()
{
	g_selectbox_start_chan_source.options.length = 0;	// empty selectbox destination
	g_selectbox_end_chan_source.options.length = 0;	// empty selectbox type
	
	fill_start_and_end_channel_selectbox();
	
	// enable/disable ad da range combo boxen
	if (g_selectbox_type.options[g_selectbox_type.selectedIndex].value == "ai")
	{
		document.getElementById("m2m_source_select_par4").disabled = false;
		document.getElementById("m2m_source_select_par5").disabled = false;
	}
	else
	{
		document.getElementById("m2m_source_select_par4").disabled = true;
		document.getElementById("m2m_source_select_par5").disabled = true;
	}
	
	// set selected index of start and end channel selectbox
	if(document.getElementById("m2m_source_hidden_par1").value != 0)
	{
		g_selectbox_start_chan_source.selectedIndex = document.getElementById("m2m_source_hidden_par1").value;
	}
	if(document.getElementById("m2m_source_hidden_par2").value != 0)
	{
		g_selectbox_end_chan_source.selectedIndex = document.getElementById("m2m_source_hidden_par2").value;
	}
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
	
	// set selected index
	g_selectbox_destination.selectedIndex = document.getElementById("m2m_source_hidden_par9");
}

function fill_m2m_source_select_job()
{
	var select = document.getElementById("m2m_source_select_job"); // get select reference
	
	// remove all options
	select.options.length = 0;
	
	// add options
	for (var i = 0; i < g_int_job_count; i++)
	{
		select.options[select.options.length] = new Option('Job'+(i)+' ('+document.getElementById("m2m_source"+(i)+"_hidden_name").value+')', '');
	}
	
	// set selected index
	select.selectedIndex = g_int_job_current;
}


// called from button "m2m_source_button_name" to set name
function set_job_name()
{	
	if(document.getElementById("m2m_source_textfield_name".value) != '')
	{
		webrequest_from_field(server_id.param_server, "m2m_source"+g_int_job_current+"_name", "m2m_source_textfield_name", webrequest_option.none, error_option.only_alert);
		document.getElementById("m2m_source"+g_int_job_current+"_hidden_name").value = document.getElementById("m2m_source_textfield_name").value;
	}
	
	fill_m2m_source_select_job();
}

// onChange event from "m2m_source_select_job" to change job id
function change_job_id()
{
	g_int_job_current = document.getElementById("m2m_source_select_job").selectedIndex;
	fill_m2m_source_textfield_name();
	fill_job_header();
	//alert("current_job"+g_int_job_current);
	
	// disable job selectbox and active checkbox
	document.getElementById("m2m_source_select_job").disabled = true;
	document.getElementById("m2m_source_checkbox_active").disabled = true;
}

function fill_m2m_source_textfield_name()
{
	document.getElementById("m2m_source_textfield_name").value = document.getElementById("m2m_source"+g_int_job_current+"_hidden_name").value;
}

function fill_job_header()
{
	global_int_webrequest_counter = 0;
	
	// clear page on change
	g_selectbox_dest.options.length = 0;	// empty selectbox destination
	g_selectbox_type.options.length = 0;	// empty selectbox type
	//g_selectbox_ad_mode.options[0].selected = true;	// empty selectbox destination
	//g_selectbox_da_mode.options[0].selected = true;	// empty selectbox type
	document.getElementById("m2m_source_select_par0_time_unit").selectedIndex = 0;
	document.getElementById("m2m_source_checkbox_active").checked = false;
	document.getElementById("m2m_source_textfield_par0_value").value = "";	
	//document.getElementById("m2m_source_textfield_par1").value = "";
	//document.getElementById("m2m_source_textfield_par2").value = "";
	//document.getElementById("m2m_source_textfield_par3").value = "";
	g_selectbox_start_chan_source.options.length = 0;	// empty selectbox destination
	g_selectbox_end_chan_source.options.length = 0;	// empty selectbox type
	g_selectbox_start_chan_dest.options.length = 0;	// empty selectbox destination
	document.getElementById("m2m_source_textfield_par3_end").value = "";
	document.getElementById("m2m_source_checkbox_par6").checked = false;
	//document.getElementById("m2m_source_checkbox_par7").checked = false;
	//document.getElementById("m2m_source_textfield_par8").value = "";
	
	webrequests_start();
}

function fill_end_chan_destination()
{	// end ch dest = start ch dest + (end ch source - start ch source)
	document.getElementById("m2m_source_textfield_par3_end").value = 
	parseInt(g_selectbox_start_chan_dest.options[g_selectbox_start_chan_dest.selectedIndex].text) +
	(parseInt(g_selectbox_end_chan_source.options[g_selectbox_end_chan_source.selectedIndex].text) -
	parseInt(g_selectbox_start_chan_source.options[g_selectbox_start_chan_source.selectedIndex].text));
}

function set_ad_da_mode()
{
	// selectbox ad
	for(var i = 0; i < g_selectbox_ad_mode.options.length; i++)
	{
		if(document.getElementById("m2m_source_hidden_par4").value == g_selectbox_ad_mode.options[i].value)
		{
			g_selectbox_ad_mode.options[i].selected = true;
		}	
	}	
	// ------------------------------------------------------------------------
	// selectbox da
	for(var i = 0; i < g_selectbox_da_mode.options.length; i++)
	{
		if(document.getElementById("m2m_source_hidden_par5").value == g_selectbox_da_mode.options[i].value)
		{
			g_selectbox_da_mode.options[i].selected = true;
		}	
	}	
	// ------------------------------------------------------------------------
}

function save_settings_to_cfg()
{
	// check if end channel source < start channel source
	if(g_selectbox_end_chan_source.selectedIndex < g_selectbox_start_chan_source.selectedIndex)
	{
		alert("Error: End channel of sender must be greater or equal than start channel of sender");
		return;
	}
	
	// check if end channel dest < 64
	if(document.getElementById("m2m_source_textfield_par3_end").value > 64)
	{
		alert("Error: End channel of reciever must be smaller or equal 64");
		return;
	}
	
	// check if time is valid int and greater > 0
	var tempValue = parseInt(document.getElementById("m2m_source_textfield_par0_value").value);
	if (Math.floor(tempValue) != tempValue) 
	{
		alert("Error: Intervall value must be a number");
		return;
	}
	else if(tempValue == 0)
	{
		alert("Error: Intervall value must be a greater than 0");
		return;
	}
	
	
	// active
	if(document.getElementById("m2m_source_checkbox_active").checked == true)
	{
		document.getElementById("m2m_source_hidden_active").value = 1;
	}
	else
	{
		document.getElementById("m2m_source_hidden_active").value = 0;
	}

	var webrequest_string = "";
	webrequest_string += "m2m_source"+g_int_job_current+"_active;m2m_source_hidden_active;";

	// type
	document.getElementById("m2m_source_hidden_type").value = g_selectbox_type.options[g_selectbox_type.selectedIndex].value;
	webrequest_string += "m2m_source"+g_int_job_current+"_type;m2m_source_hidden_type;";
	
	// intervall in ms
	document.getElementById("m2m_source_hidden_par0").value = parseInt(document.getElementById("m2m_source_textfield_par0_value").value) * parseInt(document.getElementById("m2m_source_select_par0_time_unit").value);
	webrequest_string += "m2m_source"+g_int_job_current+"_par0;m2m_source_hidden_par0;";

	// start ch source
	document.getElementById("m2m_source_hidden_par1").value = g_selectbox_start_chan_source.options[g_selectbox_start_chan_source.selectedIndex].text - 1;
	webrequest_string += "m2m_source"+g_int_job_current+"_par1;m2m_source_hidden_par1;";
	
	// end ch source
	document.getElementById("m2m_source_hidden_par2").value = g_selectbox_end_chan_source.options[g_selectbox_end_chan_source.selectedIndex].text - 1;
	webrequest_string += "m2m_source"+g_int_job_current+"_par2;m2m_source_hidden_par2;";
	
	// start ch destination
	document.getElementById("m2m_source_hidden_par3").value = g_selectbox_start_chan_dest.options[g_selectbox_start_chan_dest.selectedIndex].text - 1;
	webrequest_string += "m2m_source"+g_int_job_current+"_par3;m2m_source_hidden_par3;";

	// ad mode source
	document.getElementById("m2m_source_hidden_par4").value = g_selectbox_ad_mode.options[g_selectbox_ad_mode.selectedIndex].value;
	webrequest_string += "m2m_source"+g_int_job_current+"_par4;m2m_source_hidden_par4;";
	
	// da mode destination
	document.getElementById("m2m_source_hidden_par5").value = g_selectbox_da_mode.options[g_selectbox_da_mode.selectedIndex].value;
	webrequest_string += "m2m_source"+g_int_job_current+"_par5;m2m_source_hidden_par5;";
	
	// intervall active
	if(document.getElementById("m2m_source_checkbox_par6").checked == true)
	{
		document.getElementById("m2m_source_hidden_par6").value = 1;
	}
	else
	{
		document.getElementById("m2m_source_hidden_par6").value = 0;
	}
	
	//webrequest_send_from_field(server_id.param_server, "m2m_source"+g_int_job_current+"_par6", document.getElementById("m2m_source_hidden_par6"));
	webrequest_string += "m2m_source"+g_int_job_current+"_par6;m2m_source_hidden_par6;";
	
	// on change active
	/*if(document.getElementById("m2m_source_checkbox_par7").checked == true)
	{
		document.getElementById("m2m_source_hidden_par7").value = 1;
	}
	else
	{
		document.getElementById("m2m_source_hidden_par7").value = 0;
	}
	webrequest_send_from_field(server_id.param_server, "m2m_source"+g_int_job_current+"_par7", document.getElementById("m2m_source_hidden_par7"), g_int_value);*/
	
	// on change offset
	// document.getElementById("m2m_source_hidden_par8").value = document.getElementById("m2m_source_textfield_par8").value;
	// webrequest_send_from_field(server_id.param_server, "m2m_source"+g_int_job_current+"_par8", document.getElementById("m2m_source_hidden_par8"), g_int_value);
	
	// destination id
	document.getElementById("m2m_source_hidden_par9").value = g_selectbox_destination.options[g_selectbox_destination.selectedIndex].value;
	webrequest_string += "m2m_source"+g_int_job_current+"_par9;m2m_source_hidden_par9;";
	
	
	webrequest_send_from_field_multiple(server_id.param_server, webrequest_string, webrequest_option.none, error_option.only_alert, function() {
		webrequest_send(server_id.param_server, "special_cmd_reload_params", "1", webrequest_option.none, error_option.only_alert, function() {
			alert("Parameters saved to module");		
		});	
	});
}

