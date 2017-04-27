//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//
//
//
//	deditec_general.js
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

var RO_ETH = "RO-ETH";
var NET_ETH_LC = "NET-ETH-LC";

function open_url(url, update, execute)
{	
	var openUrl = function() {
		document.forms[0].open_url.value = url;
		document.forms[0].update_param.value = ((update.toLowerCase() == 'y') ? "1" : "0");
		document.forms[0].$X.value = execute;
		document.forms[0].submit();
	};

	var callback = function(data, error){
		switch (data)
		{
			case RO_ETH:
				if (typeof webrequest_get != "undefined")
				{
					if ($("#user_value").html() == "")
					{
						return;
					}
				
					webrequest_get(server_id.usr_mgr, "get_rights " + $("#user_value").html(), webrequest_option.none, error_option.only_alert, function(data, error) {
						if (typeof error == "undefined")
						{	
							rights = data.split(",");
							isError = false;
							
							
							if ((rights.indexOf("IO_rd") == -1) && (url.split("/")[1].indexOf("io") > -1))
							{
								alert("Access denied!\n\"IO_rd\" permission required!");
								return;
							}
							
							
							if (url.split("/")[1].indexOf("config") > -1)
							{
								if ( (url.split("/")[2].indexOf("general") > -1) ||
									 (url.split("/")[2].indexOf("network") > -1) ||
									 (url.split("/")[2].indexOf("server") > -1) ||
									 (url.split("/")[2].indexOf("log") > -1) ||
									 (url.split("/")[2].indexOf("status") > -1) )
								{
									if (rights.indexOf("CONFIG_rd") == -1)
									{
										alert("Access denied!\n\"CONFIG_rd\" permission required!");
										return;
									}
								}
								else
								{
									if (rights.indexOf("ADMINISTRATION") == -1)
									{
										alert("Access denied!\n\"ADMINISTRATION\" permission required!");
										return;						
									}
								}
							}
							
							openUrl();
						}
					});
				}
				else
				{
					openUrl();
				}
				break;
				
			default:
				window.location.pathname = url;
				break;
		}
	};
	
	if (typeof webrequest_get != "undefined")
	{
		webrequest_get(server_id.param_server, "prodcut_name", webrequest_option.none, error_option.only_alert, callback);
	}
	else
	{
		openUrl();
	}
}


var global_session_counter;

function user_info_init()
{
	var callback = function() {
		$("#user_label").html("User:");
		$("#session_label").html(" / Session ends in:");
		user_info_calc_session();
		//get_user_rights($("#user_value").html());
	}

	var webrequest_multiple = "";
	webrequest_multiple += "session_user_name;" + "user_value;" ;
	webrequest_multiple += "session_valid_time;" + "session;" ;
	webrequest_get_and_put_to_field_multiple(server_id.usr_mgr, webrequest_multiple, webrequest_option.is_background, error_option.only_alert, callback);
	
	global_session_counter = 0;
	window.setTimeout("user_info_start_interval()", 1000);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function user_info_stop()
{
	window.clearInterval(session_timer)
}

function user_info_start_interval()
{
	session_timer = window.setInterval("user_info_calc_session()", 1000);	
}

function user_info_calc_session()
{
	if ($("#session").val() > 0)
	{
		$("#session").val($("#session").val()-1);
		$("#session_value").html($("#session").val());
		//document.getElementById("session_value").innerHTML = document.getElementById("session").value;
		
		global_session_counter++;

		if (global_session_counter > 10)
		{
			global_session_counter = 0;
			webrequest_to_field(server_id.usr_mgr, "session_valid_time", "session", webrequest_option.is_background, error_option.only_alert);
		}
	}

	if ($("#session").val() == 0)
	{
		
		alert("The current session has expired!\nPlease relogin");
		document.location.pathname = "";
		
		window.clearInterval(session_timer);
	}

}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function user_logout()
{
	//alert("Logged out. You will be forwared to the start site.");
	webrequest_get(server_id.usr_mgr, "session_logout", webrequest_option.none, error_option.only_alert, function() {
		window.location = "/index.html";
	});
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function get_board_info()
{
	var request = "";
	request += "prodcut_name;" + "prodcut_name;";
	request += "board_name;" + "board_name;";
	
	webrequest_get_and_put_to_field_multiple(server_id.param_server, request, webrequest_option.is_background, error_option.only_alert);
}



// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function check_ip_valid_v4(ip)
{
	var valid = true;
	var ip_gesplittet;
	ip_gesplittet = ip.split(".");
	
	if (ip_gesplittet.length != 4)
		valid = false;
	
	for (i=0; i<=ip_gesplittet.length - 1; i++)
	{
		ip_als_zahl = parseInt(ip_gesplittet[i]);
		if (ip_als_zahl >= 0 && ip_als_zahl <= 255)
		{	
		}
		else 
		{
			valid = false;
		}
	
	}
	
	return valid;
}

function get_element_ids_from_webrequest_string(webrequest_string)
{
	//alert(webrequest_string);
	
	var array = new Array();
	var element_ids = new Array();
	var i;
	var j = 0;
	
	array = CutTextToArray(webrequest_string, ";");
	
	//alert(array.length);
	
	for (i=0; i!=array.length; i+=2)
	{
		element_ids[j++] = array[i+1];
	}
	
	

	return element_ids;
}

function create_temp_values_from_webrequest_string(webrequest_string)
{
	//alert(webrequest_string);

	var elements = get_element_ids_from_webrequest_string(webrequest_string);
	var element;
	var data;
	var i;
	
	for (i=0; i!=elements.length; i++)
	{
		element = get_element(elements[i]);
		data = get_data_from_element(element);
		
		element.attr("temp", data);
		
		//alert("data = " + get_data_from_element(element) + " temp= " + element.attr("temp"));
	}
}

function check_values_changed_from_webrequest_string(webrequest_string)
{
	var elements = get_element_ids_from_webrequest_string(webrequest_string);
	var data;
	var i;
	var element;
	
	for (i=0; i!=elements.length; i++)
	{
		element = get_element(elements[i]);
		data = get_data_from_element(element);
		
		//if ((data != null) && (element.attr("temp") != null))
		{
			if (data != element.attr("temp"))
			{
				return true;
			}
		}
		//alert('data:'+data+' temp:'+element.attr("temp"));
	}
	
	return false;
}

function check_values_valid_from_webrequest_string(webrequest_string)
{
	var elements = get_element_ids_from_webrequest_string(webrequest_string);
	var data;
	var i;
	var element;
	
	for (i=0; i!=elements.length; i++)
	{
		element = get_element(elements[i]);
		data = get_data_from_element( element );
		
		if (check_ip_valid_v4(data) != true)
		{
			element.css('color', 'red');
			return false;
		}
		
		element.css('color', 'black');
	}
	
	return true;
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------



var topNav = {
	config: 1,
	io: 2,
	custom: 3,
	special: 4
};

var leftNav = {
	config: {
		general: 1,
		http: 2,
		log: 3,
		mail: 4,
		network: 5,
		ntp: 6,
		security: 7,
		user: 8,
		status: 9,
		fw: 10
	},
	
	io: {
		general: 1,
		a_general: 2,
		a_in: 3,
		a_in_gr: 4,
		a_out: 5,
		d_general: 6,
		d_in: 7,
		d_in_gr: 8,
		d_in_cnt: 9,
		d_out: 10,
		stepper: 11,
		temp: 12,
		config: 13
	},
	
	custom: {
		general: 1
	},
	
	m2m: {
		status: 1,
		config: 2,
		dest: 3,
		log: 4
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function loadGUI(navTop, leftNav, callback)
{
	if(!$("#is_STM2xx").length)
	{
		$('#content').append("<input type='hidden' id='is_STM2xx' />");
	}
	
	if(!$("#is_NET").length)
	{
		$('#content').append("<input type='hidden' id='is_NET' />");
	}	
	
	if(!$("#custom_sw_name").length)
	{
		$('#content').append("<input type='hidden' id='custom_sw_name' />");
	}	
	
	if (navTop == topNav.io)
	{
		createIOArea();
		loadIOConfig(function(){
			loadNav(navTop, leftNav);
			if (typeof(callback) == "function")
			{
				callback();
			}			
		});	
	}
	else
	{
		loadNav(navTop, leftNav, callback);;	
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

//function CreateIOArea(navTop)
function createIOArea()
{
	//alert("createIOArea");
	
	/*
	if (navTop != topNav.io)
	{
		//alert("ret");
		return;
	}
	*/
	
	var getInput, content;
	
	getInput = function(id){
		return "<input type=\"hidden\" id=\"" +id+ "\" name=\"" +id+ "\" />";
	};
	
	content = "";
	content += getInput("open_url");
	content += getInput("update_param");
	content += getInput("product_cfgxx");
	content += getInput("productcfg_di");
	content += getInput("productcfg_do");
	content += getInput("productcfg_di_cnt");
	content += getInput("productcfg_ai");
	content += getInput("productcfg_ao");
	content += getInput("productcfg_temp");
	content += getInput("productcfg_stepp");
	content += getInput("productcfg_cnt48");
	content += getInput("productcfg_pulsegen");
	content += getInput("productcfg_pwm");
	content += getInput("session");
	content += getInput("delib_webrequest");
	
	$("#cfg").append(content);
	//alert("fertig");
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------



function loadNav(navTop, navLeft, cb_func)
{
	//alert("loadNav");
	
	var getNav, content, callback, getIONav, inner_callback;
	
	callback = function(data, error)
	{	
		$("#is_STM2xx").val(((data != RO_ETH) ? 1 : 0));		
		$("#is_NET").val(((data == NET_ETH_LC) ? 1 : 0));

		inner_callback = function()
		{
			// --------------------------------
			// Top Nav
			
			getNav = function(a, b){
				if (a == b) 
				{
					return "<li class='active'>"
				}
				
				return "<li>";
			};
		
			content = "";
			content += "<ul>";
			content += getNav(navTop, topNav.config);
			content += "<a href=\"javascript:open_url('/config/config_general.html','','');\">Configuration</a></li>";
			content += getNav(navTop, topNav.io);
			content += "<a href=\"javascript:open_url('/io/io_general.html','','');\">In-/Outputs</a></li>";
			
			if (data == RO_ETH)
			{
				if ($("#custom_sw_name").val() == "Custom")
				{
					// normale custom seite
					content += "<div id='topnav-custom-right'>"
					content += getNav(navTop, topNav.custom);					
					content += "<a href=\"javascript:open_url('/custom1/www/index.html','','');\">Custom</a></li></div>";	
				}
				else
				{
					// special custom seite
					content += "<div id='topnav-custom-right'>"
					content += getNav(navTop, topNav.special);
					content += "<a href=\"javascript:open_url('/custom1/www/index.html','','');\">" + $("#custom_sw_name").val() + "</a></li></div>";
				}
				
				content += "<div id='topnav-logout-right'><li><input type='hidden' id='logout'><a href=\"javascript:user_logout();\">Logout</a></input></li></div>";
			}
			
			content += "</ul>";
			$("#topnav").append(content);
			
			// --------------------------------
			// Left Nav
			
			content = "";
			
			switch (navTop)
			{
				// --------------------------------
				// --------------------------------
				// --------------------------------
				
				case topNav.config:
					content += "<ul class=\"level1\">";
					content += getNav(navLeft, leftNav.config.general);
					content += "<a href=\"javascript:open_url('/config/config_general.html','','');\">General</a></li>";
					content += getNav(navLeft, leftNav.config.network);
					content += "<a href=\"javascript:open_url('/config/config_network_configuration.html','','');\">Network configuration</a></li>";
					if (data == RO_ETH)
					{
						content += getNav(navLeft, leftNav.config.ntp);
						content += "<a href=\"javascript:open_url('/config/config_network_time.html','','');\">Network time (NTP)</a></li>";
						content += getNav(navLeft, leftNav.config.http);
						content += "<a href=\"javascript:open_url('/config/config_http_server.html','','');\">HTTP-Server</a></li>";
						content += getNav(navLeft, leftNav.config.mail);
						content += "<a href=\"javascript:open_url('/config/config_mail_server.html','','');\">Mail-Server</a></li>";
					}
					content += getNav(navLeft, leftNav.config.user);
					content += "<a href=\"javascript:open_url('/config/config_usr_mgr.html','','');\">User-Manager</a></li>";				
					if (data == RO_ETH)
					{
						content += getNav(navLeft, leftNav.config.fw);
						content += "<a href=\"javascript:open_url('/config/config_fw_update.html','','');\">FW-Update</a></li>";
						content += getNav(navLeft, leftNav.config.log);
						content += "<a href=\"javascript:open_url('/config/config_log.html','','');\">Log's</a></li>";
					}
					content += getNav(navLeft, leftNav.config.status);
					content += "<a href=\"javascript:open_url('/config/config_status.html','','');\">Status / Reboot</a></li>";
					content += getNav(navLeft, leftNav.config.security);
					content += "<a href=\"javascript:open_url('/config/config_security.html','','');\">Security</a></li>";
					content += "</ul>";
					$("#left").append(content);
					break;
					
				// --------------------------------
				// --------------------------------
				// --------------------------------
					
				case topNav.io:
				
					content += "<ul class=\"level1\">";
					content += getNav(navLeft, leftNav.io.general);
					content += "<a href=\"javascript:open_url('/io/io_general.html','','');\">General</a></li>";
					
					if (($("#productcfg_di").val() > 0) || ($("#productcfg_do").val() > 0) || ($("#productcfg_di_cnt").val() > 0))
					{
						content += getNav(navLeft, leftNav.io.d_general);
						content += "<a href=\"javascript:open_url('/io/io_digital_io.html','','');\">Digital I/O</a></li>";
						
						if ((navLeft == leftNav.io.d_general) || (navLeft == leftNav.io.d_in) || (navLeft == leftNav.io.d_in_gr) || (navLeft == leftNav.io.d_in_cnt) || (navLeft == leftNav.io.d_out))
						{
							content += "<ul class=\"level2\">";
							if ($("#productcfg_di").val() > 0)
							{
								content += getNav(navLeft, leftNav.io.d_in);
								content += "<a href=\"javascript:open_url('/io/io_digital_inputs.html','','');\">Digital Inputs</a></li>";
								/*
								content += getNav(navLeft, leftNav.io.d_in_gr);
								content += "<a href=\"javascript:open_url('/io/io_digital_inputs_graphic.html','','');\">Digital Inputs Graphic</a></li>";
								*/
							}
							
							if ($("#productcfg_di_cnt").val() > 0)
							{
								content += getNav(navLeft, leftNav.io.d_in_cnt);
								content += "<a href=\"javascript:open_url('/io/io_digital_inputs_counter.html','','');\">Digital Inputs Counter</a></li>";
							}
							
							if ($("#productcfg_do").val() > 0)
							{
								content += getNav(navLeft, leftNav.io.d_out);
								content += "<a href=\"javascript:open_url('/io/io_digital_outputs.html','','');\">Digital Outputs</a></li>";
							}
							content += "</ul>";
						}
					}
					
					if (($("#productcfg_ai").val() > 0) || ($("#productcfg_ao").val() > 0))
					{
						content += getNav(navLeft, leftNav.io.a_general);
						content += "<a href=\"javascript:open_url('/io/io_analog_io.html','','');\">Analog I/O</a></li>";
						
						if ((navLeft == leftNav.io.a_general) || (navLeft == leftNav.io.a_in) || (navLeft == leftNav.io.a_in_gr) || (navLeft == leftNav.io.a_out))
						{
							content += "<ul class=\"level2\">";						
							if ($("#productcfg_ai").val() > 0)
							{
								content += getNav(navLeft, leftNav.io.a_in);
								content += "<a href=\"javascript:open_url('/io/io_analog_inputs.html','','');\">Analog Inputs</a></li>";
								/*
								content += getNav(navLeft, leftNav.io.a_in_gr);
								content += "<a href=\"javascript:open_url('/io/io_analog_inputs_graphic.html','','');\">Analog Inputs Graphic</a></li>";
								*/
							}
							
							if ($("#productcfg_ao").val() > 0)
							{
								content += getNav(navLeft, leftNav.io.a_out);
								content += "<a href=\"javascript:open_url('/io/io_analog_outputs.html','','');\">Analog Outputs</a></li>";
							}
							content += "</ul>";
						}
					}
					
					if ($("#productcfg_temp").val() > 0)
					{
						content += getNav(navLeft, leftNav.io.temp);
						content += "<a href=\"javascript:open_url('/io/io_temperature.html','','');\">Temperature</a></li>";
					}
					
					if ($("#productcfg_stepp").val() > 0)
					{
						content += getNav(navLeft, leftNav.io.stepper);
						content += "<a href=\"javascript:open_url('/io/io_stepper_motor.html','','');\">Stepper Motor</a></li>";					
					}
					
					
					if ((($("#productcfg_di").val() > 0) || ($("#productcfg_do").val() > 0) || ($("#productcfg_di_cnt").val() > 0)) ||
						(($("#productcfg_ai").val() > 0) || ($("#productcfg_ao").val() > 0)) ||
						($("#productcfg_temp").val() > 0) ||
						($("#productcfg_stepp").val() > 0))
					{
						content += getNav(navLeft, leftNav.io.config);
						content += "<a href=\"javascript:open_url('/io/io_config.html','','');\">Configuration</a></li>";					
					}

					content += "</ul>";
					$("#left").append(content);
					break;
					
				// --------------------------------
				// --------------------------------
				// --------------------------------
					
				case topNav.special:
					content += "<ul class=\"level1\">";
				
					if ($("#custom_sw_name").val() == "M2M")
					{
						content += getNav(navLeft, leftNav.m2m.status);
						content += "<a href=\"javascript:open_url('/custom1/www/index.html','','');\">Status</a></li>";
						content += getNav(navLeft, leftNav.m2m.config);
						content += "<a href=\"javascript:open_url('/custom1/www/configuration.html','','');\">Configuration</a></li>";
						content += getNav(navLeft, leftNav.m2m.dest);
						content += "<a href=\"javascript:open_url('/custom1/www/destination.html','','');\">Destination</a></li>";
						content += getNav(navLeft, leftNav.m2m.log);
						content += "<a href=\"javascript:open_url('/custom1/www/log.html','','');\">Log</a></li>";
					}
					
					content += "</ul>";
					$("#left").append(content);
					break;
					
				// --------------------------------
				// --------------------------------
				// --------------------------------
					
			}
		
		}; // inner_callback
		
		
		if (data != RO_ETH)
		{
			inner_callback();
		}
		else
		{
			webrequest_to_field(server_id.param_server, "ro_eth_custom_tab_name", "custom_sw_name", webrequest_option.is_background, error_option.ignore, inner_callback);	
		}
		
		
		if (typeof(cb_func) == "function")
		{
			cb_func();
		}
		
	}; // callback
	
	if (typeof webrequest_get != "undefined")
	{
		webrequest_get(server_id.param_server, "prodcut_name", webrequest_option.none, error_option.only_alert, callback);
	}
	else
	{
		alert("ohoh");
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function loadHeader()
{
	
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function loadIOConfig(callback)
{
	//alert("loadIOConfig");
	
	var webrequest_multiple = "";
	webrequest_multiple += "product_cfg_di;" + "productcfg_di;" ;
	webrequest_multiple += "product_cfg_do;" + "productcfg_do;" ;
	webrequest_multiple += "product_cfg_di_cnt;" + "productcfg_di_cnt;" ;
	webrequest_multiple += "product_cfg_ai;" + "productcfg_ai;" ;
	webrequest_multiple += "product_cfg_ao;" + "productcfg_ao;" ;
	webrequest_multiple += "product_cfg_temp;" + "productcfg_temp;" ;
	webrequest_multiple += "product_cfg_stepp;" + "productcfg_stepp;" ;
	webrequest_multiple += "product_cfg_cnt48;" + "productcfg_cnt48;" ;
	webrequest_multiple += "product_cfg_pulsegen;" + "productcfg_pulsegen;" ;
	webrequest_multiple += "product_cfg_pwm;" + "productcfg_pwm;" ;
	
	webrequest_get_and_put_to_field_multiple(server_id.param_server, webrequest_multiple, webrequest_option.is_background, error_option.only_alert, function(){
	
		$("#product_cfg_di").text($("#productcfg_di").val());
		$("#product_cfg_do").text($("#productcfg_do").val());
		$("#product_cfg_di_cnt").text($("#productcfg_di_cnt").val());
		$("#product_cfg_ai").text($("#productcfg_ai").val());
		$("#product_cfg_ao").text($("#productcfg_ao").val());
		$("#product_cfg_temp").text($("#productcfg_temp").val());
		$("#product_cfg_stepp").text($("#productcfg_stepp").val());
		$("#product_cfg_cnt48").text($("#productcfg_cnt48").val());
		$("#product_cfg_pulsegen").text($("#productcfg_pulsegen").val());
		$("#product_cfg_pwm").text($("#productcfg_pwm").val());
		
		if (typeof(callback) == "function")
		{
			callback();
		}
	});
}
