//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//
//
//
//	deditec_config_scripts.js
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

var TEXT_PARAMETER_CHANGED = "Parameter(s) have been changed.";
var TEXT_PARAMETER_NOT_CHANGED = "You have not changed any parameter(s).";
var TEXT_PARAMETER_NOT_VALID = "At least one entry is not valid!";

var TEXT_STM_DIP_DHCP = "DIP-Switch (DIP1) is ON - using DHCP";

var TIME_RESTART_ETH_STM2_SEC = 10;
var TIME_RESTART_RO_ETH_SEC = 30;
var TIME_RESTORE_DEFAULT_ETH_STM2_SEC = 30;
var TIME_ANIMATION_MS = 10;

var MSG_REBOOT_HEADER = 'Restarting module';
var MSG_REBOOT_TEXT = 'Waiting for module reboot ';
var MSG_REBOOT_CONFIRM = 'Do you really want to reboot?';

var MSG_NET_CONF_HEADER = 'Changing network configuration';
var MSG_NET_CONF_TEXT = 'You will be forwarded to ip {0} in ';

var MSG_DEF_EE_NO_IP_CONFIRM = 'Do you really want to restore default settings (without network configuration)?';
var MSG_DEF_EE_CONFIG_CONFIRM = 'Do you really want to restore default settings (including network configuration)?';
var MSG_DEF_EE_CONFIG_HEADER = "Restoring default settings";
var MSG_DEF_EE_CONFIG_TEXT = 'Do not turn off the device while restoring the default settings!<br>You will be forwarded to ip {0} in ';

var MSG_PW_NOT_MATCH = "The password doesn't match the confirm password";

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

if (!String.format) {
	String.format = function(format) {
		var args = Array.prototype.slice.call(arguments, 1);
		return format.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}


function is_STM2xx()
{
	return ($("#is_STM2xx").val() == 1);
}

function is_NET()
{
	return ($("#is_NET").val() == 1);
}

function ShowOverlay(header, text, url)
{
	content = "<div id='container'>";
	content += "<center><h3 id='header'></h3></center><br>";
	content += "<div id='floatingCirclesG'><div class='f_circleG' id='frotateG_01'></div><div class='f_circleG' id='frotateG_02'></div><div class='f_circleG' id='frotateG_03'></div>";
	content += "<div class='f_circleG' id='frotateG_04'></div><div class='f_circleG' id='frotateG_05'></div><div class='f_circleG' id='frotateG_06'></div>";
	content += "<div class='f_circleG' id='frotateG_07'></div><div class='f_circleG' id='frotateG_08'></div></div>";
	content += "<br><center><b><p id='text'></p></b></div></center>";
	content += "<div id='overlay'></div>";
	
	$(".home").append(content);
	
	$('#overlay').show(TIME_ANIMATION_MS, function() {
		$('#container').fadeIn(TIME_ANIMATION_MS);
		$('#header').html(header);
	});
	
	if (header == MSG_DEF_EE_CONFIG_HEADER)
	{
		cnt_max = TIME_RESTORE_DEFAULT_ETH_STM2_SEC;
		$('#container').css('height', '220px');
	}
	else
	{
		cnt_max = (is_STM2xx() ? TIME_RESTART_ETH_STM2_SEC : TIME_RESTART_RO_ETH_SEC);	
	}
	
	$('#text').html(text + cnt_max + " second(s)");
	user_info_stop();
	
	timerElapsed = function(){
		clearInterval(counter);	// cleart sich selbst
		
		$('#container').hide(TIME_ANIMATION_MS, function() {
			$('#overlay').fadeOut();
		});
		
		if (url != null)
		{
			window.location = url;
		}
		else
		{
			document.location.pathname = "";
		}
	};
	
	cnt = 1;
	counter = setInterval(function() {
		if (cnt == cnt_max)
		{
			timerElapsed();
		}
		else
		{
			$('#text').html(text + (cnt_max - (cnt++)) + " second(s)");
		}
	}, 1000);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

var page_type = {
	config_general: 1,
	config_network_configuration: 2,
	config_network_time: 3,
	config_http_server: 4,
	config_mail_server: 5,
	config_usr_mgr: 6,
	config_status: 7,
	config_security: 8,
	m2m_status: 100,
	special: 9999
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function load_config_params(config_page_type)
{
	config_param_handler('R', config_page_type);
}

function save_config_params(config_page_type)
{
	config_param_handler('W', config_page_type);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function config_param_handler(rw_type, config_page_type)
{
	var webrequest_string = "";
	var callback;
	var val_changed = false;

	switch(config_page_type)
	{
		// ------------------------------------
		// ------------------------------------
		// ------------------------------------
		
		case page_type.config_general:
			webrequest_string += "board_name;board_name_textfield;";
			webrequest_string += "config-ip-protection;cb_deny_network_config;";
			
			callback = function () {
				create_temp_values_from_webrequest_string(webrequest_string);
				if (rw_type == 'W')	alert(TEXT_PARAMETER_CHANGED);
			};
			
			if (rw_type == 'R')
			{
				webrequest_get_and_put_to_field_multiple(server_id.param_server, webrequest_string, webrequest_option.none, error_option.only_alert, callback);
			}
			else if (rw_type == 'W')
			{
				if (check_values_changed_from_webrequest_string(webrequest_string) == true)
				{
					webrequest_send_from_field_multiple(server_id.param_server, webrequest_string, webrequest_option.none, error_option.only_alert, callback);
				}
				else
				{
					alert(TEXT_PARAMETER_NOT_CHANGED);
				}
			}
			break;
			
		// ------------------------------------
		// ------------------------------------
		// ------------------------------------
		
		case page_type.config_network_configuration:
			webrequest_string += "config-ip-ip;field_config-ip-ip;";
			webrequest_string += "config-ip-netmask;field_config-ip-netmask;";
			webrequest_string += "config-ip-stdgateway;field_config-ip-stdgateway;";
			//webrequest_string += "config-ip-dns1;field_config-ip-dns1;";
			var ip_check = webrequest_string;
			webrequest_string += "config-ip-port;field_config-ip-port;";
			
			if (rw_type == 'R')
			{
				webrequest_string += "mac_addr;field_config-ip-mac;";
			}
			
			if (is_STM2xx())
			{
				// NICHT LINUX
				webrequest_string += "config-ip-dhcp;field_config-ip-dhcp;";
				if (rw_type == 'R')
				{
					webrequest_string += "config-ip-dhcp-hw;field_config_ip_dhcp_hw;";
				}
			}
			
			callback = function () {
				create_temp_values_from_webrequest_string(webrequest_string);
				
				if ((rw_type == 'R') && is_STM2xx())
				{
					// --- STM2xx ---
					window.setTimeout(function() { 
						$("#field_config-ip-dhcp").change()
					}, 100);
					if ($("#field_config_ip_dhcp_hw").val() != 0)
					{	
						// DHCP DIP-Schalter ist an
						$("#field_config-ip-dhcp").attr("temp", 1);
						$("#field_config-ip-dhcp").prop("checked", true).attr("disabled", true);
						$("#hint_dhcp").append(TEXT_STM_DIP_DHCP);
					}	
					
					// MAC formatierung
					temp = "";
					for (i=0; i<$("#field_config-ip-mac").val().length; i+=2)
					{
						temp += $("#field_config-ip-mac").val().substring(i, i+2);
						temp += ":";
					}
					$("#field_config-ip-mac").val(temp.substring(0, temp.length-1));
					$("#field_config-ip-mac").attr('temp', $("#field_config-ip-mac").val());
					// --- STM2xx ---
				}
				
				if (rw_type == 'W')
				{
					if (!$("#field_config-ip-dhcp").is(":checked"))
					{
						if (is_STM2xx())
						{
							ShowOverlay(MSG_NET_CONF_HEADER, String.format(MSG_NET_CONF_TEXT, $('#field_config-ip-ip').val()), 'http://' + $('#field_config-ip-ip').val());	
						}
						else
						{
							alert("Network settings have been changed.\n\nNotice: You will be forwared to ip: " + $('#field_config-ip-ip').val())	
						}
						
						webrequest_send(server_id.exec_srv, "ip_update", "no_key", webrequest_option.none, error_option.only_alert, new function () {
							if (!is_STM2xx())
							{
								// --- Linux ---
								window.setTimeout(function() {
									window.location = "http://" + $("#field_config-ip-ip").val();
									}, 500
								);
								// --- Linux ---
							}
						}); 
					}
					else
					{
						msg  = "Network settings have been changed.\n\n";
						
						msg += "Notice: : DHCP is enabled!\n"
						msg += "The module's hostname is " + $('#board_name').html() + "\n";
						msg += "The module is reachable under hostname (e.g. http://" + $('#board_name').html() + ") or \n";
						msg += "hostname + DNS namespace (e.g. http://" + $('#board_name').html() + ".fritz.box)";
						
						alert(msg);
						
						webrequest_send(server_id.exec_srv, "ip_update", "no_key", webrequest_option.none, error_option.only_alert);
					}
				}
			};
			
			if (rw_type == 'R')
			{
				webrequest_get_and_put_to_field_multiple(server_id.param_server, webrequest_string, webrequest_option.none, error_option.only_alert, callback);
			}
			else if (rw_type == 'W')
			{	
				if (check_values_changed_from_webrequest_string(webrequest_string) == true)
				{
					if (check_values_valid_from_webrequest_string(ip_check) == true)
					{	
						if ((parseInt($("#field_config-ip-port").val()) < 1024) || (parseInt($("#field_config-ip-port").val()) > 65535))
						{
							$("#field_config-ip-port").css('color', 'red');
							alert(TEXT_PARAMETER_NOT_VALID);
							break;
						}
					
						$("#field_config-ip-port").css('color', 'black');
						webrequest_send_from_field_multiple(server_id.param_server, webrequest_string, webrequest_option.none, error_option.only_alert, callback);
					}
					else
					{
						alert(TEXT_PARAMETER_NOT_VALID);
					}
				}
				else
				{
					alert(TEXT_PARAMETER_NOT_CHANGED);
				}
			}
			break;
			
		// ------------------------------------
		// ------------------------------------
		// ------------------------------------
		
		case page_type.config_network_time:
			webrequest_string += "config-ntp-ip;C_config-ntp-ip;";
			webrequest_string += "config-ntp-port;C_config-ntp-port;";
			webrequest_string += "config-ntp-timezone-hour;C_config-ntp-timezone-hour;";
			webrequest_string += "config-ntp-active;C_config-ntp-active;";
			webrequest_string += "config-ntp-timezone-active;C_config-ntp-timezone-active;";
			
			if (is_STM2xx())
			{
				// NICHT LINUX
				webrequest_string += "config-ntp-server-active;ntp-server-active;";
				webrequest_string += "config-ntp-server-time-validation;ntp-server-validation;";	
			}
			
			callback = function () {
				if (rw_type == 'W')	alert(TEXT_PARAMETER_CHANGED);
				create_temp_values_from_webrequest_string(webrequest_string);
				ntp_start();
			};
			
			if (rw_type == 'R')
			{
				webrequest_get_and_put_to_field_multiple(server_id.param_server, webrequest_string, webrequest_option.none, error_option.only_alert, callback);
			}
			else if (rw_type == 'W')
			{
				if (check_values_changed_from_webrequest_string(webrequest_string) == true)
				{
					webrequest_send_from_field_multiple(server_id.param_server, webrequest_string, webrequest_option.none, error_option.only_alert, callback);
				}
				else
				{
					alert(TEXT_PARAMETER_NOT_CHANGED);
				}
			}
			break;
			
		// ------------------------------------
		// ------------------------------------
		// ------------------------------------
		
		case page_type.config_http_server:
			callback = function () {
				$("#board_index_path").attr("temp", $("#board_index_path").val());
				if (rw_type == 'W')	alert(TEXT_PARAMETER_CHANGED);
			};
			
		
			if (rw_type == 'R')
			{
				webrequest_to_field(server_id.param_server, "config-http-index", "board_index_path", webrequest_option.none, error_option.only_alert, callback);
			}
			else if (rw_type == 'W')
			{	
				if ($("#board_index_path").attr("temp") != $("#board_index_path").val())
				{
					webrequest_from_field(server_id.param_server, "config-http-index", "board_index_path", webrequest_option.none, error_option.only_alert, callback);
				}
				else
				{
					alert(TEXT_PARAMETER_NOT_CHANGED);
				}
			}
			break;
			
		// ------------------------------------
		// ------------------------------------
		// ------------------------------------
		
		case page_type.config_mail_server:
			break;
			webrequest_string += "mail-smtp-server-hostname;C_mail-smtp-server-hostname;";
			webrequest_string += "mail-smtp-server-authentificate;mail-smtp-server-authentificate;";
			webrequest_string += "mail-smtp-server-authentificate-user;C_mail-smtp-server-authentificate-user;";
			webrequest_string += "mail-smtp-server-authentificate-pwd;C_mail-smtp-server-authentificate-pwd;";
			
			callback = function () {
				create_temp_values_from_webrequest_string(webrequest_string);
				mail_check_authentificate_active();
				if (rw_type == 'W')	alert(TEXT_PARAMETER_CHANGED);
			};
			
			if (rw_type == 'R')
			{
				webrequest_get_and_put_to_field_multiple(server_id.param_server, webrequest_string, webrequest_option.none, error_option.only_alert, callback);
			}
			else if (rw_type == 'W')
			{
				if (check_values_changed_from_webrequest_string(webrequest_string) == true)
				{
					webrequest_send_from_field_multiple(server_id.param_server, webrequest_string, webrequest_option.none, error_option.only_alert, callback);
				}
				else
				{
					alert(TEXT_PARAMETER_NOT_CHANGED);
				}
			}
			break;
			
		// ------------------------------------
		// ------------------------------------
		// ------------------------------------
		
		case page_type.config_usr_mgr:
			if (is_STM2xx())
			{
				// --- STM2xx ---
				webrequest_string += "config-usr-mgr-session-valid-time;config-usr-mgr-session-valid-time;";	
				webrequest_string += "usr_mgr_enabled;field_usr_mgr_enabled;";
				webrequest_string += "usr_mgr_username;field_usr_mgr_username;";
				
				callback = function () {
					
				if ((rw_type == 'R') && is_STM2xx())
				{
					// --- STM2xx ---
					window.setTimeout(function() { 
						$("#field_usr_mgr_enabled").change();
					}, 100);
				}
					
					create_temp_values_from_webrequest_string(webrequest_string);
					if (rw_type == 'W')	alert(TEXT_PARAMETER_CHANGED);
				};
				
				if (rw_type == 'R')
				{
					webrequest_get_and_put_to_field_multiple(server_id.usr_mgr, webrequest_string, webrequest_option.none, error_option.only_alert, callback);
				}
				else if (rw_type == 'W')
				{
					if ($("#btn_set_pw").is(":hidden"))
					{
						if (($("#field_usr_mgr_pw").val() != "") && ($("#field_usr_mgr_pw").val() == $("#field_usr_mgr_pw_confirm").val()))
						{
							val_changed = true;
							webrequest_send(server_id.usr_mgr, "usr_mgr_password", $("#field_usr_mgr_pw").val(), webrequest_option.none, error_option.only_alert);	
						}
						else
						{
							alert(MSG_PW_NOT_MATCH);
							break;
						}
					}
					
					if ((check_values_changed_from_webrequest_string(webrequest_string) == true) || (val_changed == true))
					{
						webrequest_send_from_field_multiple(server_id.usr_mgr, webrequest_string, webrequest_option.none, error_option.only_alert, callback);
					}
					else
					{
						alert(TEXT_PARAMETER_NOT_CHANGED);
					}
				}
				// --- STM2xx ---
			}
			else
			{
				//alert("linux");
				// --- Linux ---
				callback = function () {
					$("#config-usr-mgr-session-valid-time").attr("temp", $("#config-usr-mgr-session-valid-time").val());
					if (rw_type == 'W')	alert(TEXT_PARAMETER_CHANGED);
				};
			
				if (rw_type == 'R')
				{
					webrequest_to_field(server_id.param_server, "config-usr-mgr-session-valid-time", "config-usr-mgr-session-valid-time", webrequest_option.none, error_option.only_alert, callback);
				}
				else if (rw_type == 'W')
				{
					if ($("#config-usr-mgr-session-valid-time").attr("temp") != $("#config-usr-mgr-session-valid-time").val())
					{
						webrequest_from_field(server_id.param_server, "config-usr-mgr-session-valid-time", "config-usr-mgr-session-valid-time", webrequest_option.none, error_option.only_alert, callback);
					}
					else
					{
						alert(TEXT_PARAMETER_NOT_CHANGED);
					}
				}
				// --- Linux ---
			}

			break;
			
		// ------------------------------------
		// ------------------------------------
		// ------------------------------------
		
		case page_type.config_status:

			//webrequest_string += "fw_rev_scheduler;rev_scheduler;";
			webrequest_string += "fw_rev_ro_eth_fw;rev_ro_eth_fw;";
			//webrequest_string += "fw_rev_ro_eth_mon;rev_ro_eth_mon;";
			if (!is_STM2xx())
			{
				//alert("linux!");
				
				// --- Linux ---
				webrequest_string += "fw_rev_exec_srv;rev_ro_exec_srv;";
				webrequest_string += "fw_rev_key_handler;rev_key_handler;";
				webrequest_string += "fw_rev_bc_server;rev_bc_server;";
				webrequest_string += "fw_rev_weblogaccess;rev_weblogaccess;";
				webrequest_string += "fw_rev_ntp_server;rev_ntp_server;";
				webrequest_string += "fw_rev_parameter_server;rev_parameter_server;";
				webrequest_string += "fw_rev_user_manager;rev_user_manager;";
				webrequest_string += "fw_rev_parameter_webrequest;rev_parameter_webrequest;";
				// --- Linux ---
			}
			
			if (rw_type == 'R')
			{
				webrequest_get_and_put_to_field_multiple(server_id.param_server, webrequest_string, webrequest_option.none, error_option.only_alert);
			}
			break;
			
		// ------------------------------------
		// ------------------------------------
		// ------------------------------------
		
		case page_type.config_security:
			webrequest_string += "enc-allow-protocol-unencrypted;enc_allow_protocol_unencrypted;";
			webrequest_string += "enc-allow-protocol-encrypted-normal;enc_allow_protocol_encrypted_normal;";
			webrequest_string += "enc-allow-protocol-encrypted-admin;enc_allow_protocol_encrypted_admin;";
			webrequest_string += "enc-allow-html-io-access;enc_allow_html_io_access;";
		
			callback = function () {
				$("#enc_allow_protocol_encrypted_normal").change();
				$("#enc_allow_protocol_encrypted_admin").change();
				create_temp_values_from_webrequest_string(webrequest_string);
				$("#cb_encrypt_protocol_enabled").change();
				if ((rw_type == 'W') && (!is_STM2xx()))
				{
					// nur ro-eth
					webrequest_send(server_id.param_server, "enc-cmd-reload", 1, webrequest_option.none, error_option.only_alert);
					alert(TEXT_PARAMETER_CHANGED);
				}
			};
			
			if (rw_type == 'R')
			{
				webrequest_get_and_put_to_field_multiple(server_id.param_server, webrequest_string, webrequest_option.none, error_option.only_alert, callback);
			}
			else if (rw_type == 'W')
			{
				if ($("#set_admin_pw").is(":hidden"))
				{
					if (($("#enc_pw_admin").val() != "") && ($("#enc_pw_admin").val() == $("#enc_pw_admin_b").val()))
					{
						val_changed = true;
						webrequest_send(server_id.param_server, "enc-pw-admin", $("#enc_pw_admin").val(), webrequest_option.none, error_option.only_alert);	
					}
					else
					{
						alert("Invalid password for admin-encryption");
						break;
					}
				}

				if ($("#set_user_pw").is(":hidden"))
				{
					if (($("#enc_pw_normal").val() != "") && ($("#enc_pw_normal").val() == $("#enc_pw_normal_b").val()))
					{
						val_changed = true;
						webrequest_send(server_id.param_server, "enc-pw-normal", $("#enc_pw_normal").val(), webrequest_option.none, error_option.only_alert);	
					}
					else
					{
						alert("Invalid password for user-encryption");
						break;
					}
				}
			
				if ((check_values_changed_from_webrequest_string(webrequest_string) == true) || (val_changed == true))
				{
					webrequest_send_from_field_multiple(server_id.param_server, webrequest_string, webrequest_option.none, error_option.only_alert, callback);
				}
				else
				{
					//if (($("#set_admin_pw").is(":visible")) || ($("#set_user_pw").is(":visible")))
					alert(TEXT_PARAMETER_NOT_CHANGED);
				}
			}
			break;
			
		// ------------------------------------
		// ------------------------------------
		// ------------------------------------
		
		case page_type.m2m_status:
		
			callback = function() {
				Statistic_timer_start();
			};
		
			for (var i = 0; i < 10; i++)
			{
				webrequest_string += "m2m_source"+(i)+"_name;job"+(i)+"_name;";
			}

			// dest name and ip		
			for(var i = 0; i < 5; i++)
			{
				webrequest_string += "m2m_dest"+(i)+"_name;dest"+(i)+"_name;";
				webrequest_string += "m2m_dest"+(i)+"_ip_addr;dest"+(i)+"_ip;";		
			}
			
			webrequest_get_and_put_to_field_multiple(server_id.param_server, webrequest_string, webrequest_option.none, error_option.only_alert, callback);
			break;
			
		// ------------------------------------
		// ------------------------------------
		// ------------------------------------

		/*
		default:
			alert("load_config_params: type= " + type + " -> default");
			break;
		*/
			
		// ------------------------------------
		// ------------------------------------
		// ------------------------------------
	}
	
	get_board_info();
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// NTP

function ntp_start()
{
	if (document.getElementById("C_config-ntp-active").value == 1) 
	{
		document.getElementById("ntp-active").checked = true;
	}
	else
	{
		document.getElementById("ntp-active").checked = false;
	}
	if (document.getElementById("C_config-ntp-timezone-active").value == 1) 
	{
		document.getElementById("ntp-timezone-active").checked = true;
	}
	else
	{
		document.getElementById("ntp-timezone-active").checked = false;
	}
	
	ntp_ntp_init();
	ntp_check_ntp_active();
}

function ntp_ntp_init() 
{
	var val_index = parseInt($("#C_config-ntp-timezone-hour").val()) + 12;
	$("#ntp-timezone-hour").index(val_index);
}

function ntp_write_to_value_attribut()
{
	var val_index = $("#ntp-timezone-hour").index();
	$("#C_config-ntp-timezone-hour").val(val_index - 12);
}

function ntp_check_ntp_active() 
{
	if (document.getElementById("ntp-active").checked == true) 
	{
		document.getElementById("C_config-ntp-ip").disabled = false;
		document.getElementById("C_config-ntp-port").disabled = false;
		document.getElementById("ntp-timezone-active").disabled = false;
		document.getElementById("C_config-ntp-active").value = 1;
		ntp_check_ntp_timezone_active();
	} 
	else 
	{
		document.getElementById("C_config-ntp-ip").disabled = true;
		document.getElementById("C_config-ntp-port").disabled = true;
		document.getElementById("ntp-timezone-hour").disabled = true;
		document.getElementById("ntp-timezone-active").disabled = true;
		document.getElementById("C_config-ntp-active").value = 0;
	}
}

function ntp_check_ntp_timezone_active() 
{
	if (document.getElementById("ntp-timezone-active").checked == true) 
	{
		document.getElementById("ntp-timezone-hour").disabled = false;
		document.getElementById("C_config-ntp-timezone-active").value = 1;	
	} 
	else 
	{
		document.getElementById("ntp-timezone-hour").disabled = true;
		document.getElementById("C_config-ntp-timezone-active").value = 0;
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Mail

function mail_checkbox()
{
	if (document.getElementById("C_mail-smtp-server-authentificate").value == 1)
	{
		document.getElementById("mail-smtp-server-authentificate").checked = true;
	}
	else
	{
		document.getElementById("mail-smtp-server-authentificate").checked = false;	
	}
	mail_check_authentificate_active();
}

function mail_check_authentificate_active()
{
	if (document.getElementById("mail-smtp-server-authentificate").checked == true)
	{
		document.getElementById("C_mail-smtp-server-authentificate").value = 1;
		document.getElementById("C_mail-smtp-server-authentificate-user").disabled = false;
		document.getElementById("C_mail-smtp-server-authentificate-pwd").disabled = false;
	}
	else
	{
		document.getElementById("C_mail-smtp-server-authentificate").value = 0;
		document.getElementById("C_mail-smtp-server-authentificate-user").disabled = true;
		document.getElementById("C_mail-smtp-server-authentificate-pwd").disabled = true;
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// Status/Reboot

function set_default_with_ip()
{
	if (confirm(MSG_DEF_EE_CONFIG_CONFIRM))
	{	
		if (is_STM2xx())
		{
			ShowOverlay(MSG_DEF_EE_CONFIG_HEADER, String.format(MSG_DEF_EE_CONFIG_TEXT, '192.168.1.1'), 'http://192.168.1.1');
		}
		else
		{
			alert("Network settings have been changed.\n\nNotice: You will be forwarded to ip: 192.168.1.1");
		}
		
		webrequest_send(server_id.exec_srv, "set_default_value_with_ip", "no_key", webrequest_option.none, error_option.ignore, function () {
			if (!is_STM2xx())
			{
				// --- Linux ---
				setTimeout (function () {
					window.location = "http://192.168.1.1";
				}, 500);
				// --- Linux ---
			}
		});
	}
}

function set_default_without_ip()
{
	if (confirm(MSG_DEF_EE_NO_IP_CONFIRM))
	{
		if (is_STM2xx())
		{
			ShowOverlay(MSG_DEF_EE_CONFIG_HEADER, String.format(MSG_DEF_EE_CONFIG_TEXT, window.location.hostname), null);
		}
		
		webrequest_send(server_id.exec_srv, "set_default_value_without_ip", "no_key", webrequest_option.none, error_option.ignore, function () {
			if (!is_STM2xx())
			{
				// --- Linux ---
				setTimeout (function () {
					document.location.pathname = "";
				}, 500);
				// --- Linux ---
			}
		});
	}
}

function reboot()
{	
	if (confirm(MSG_REBOOT_CONFIRM))
	{
		ShowOverlay(MSG_REBOOT_HEADER, MSG_REBOOT_TEXT, null);
		webrequest_from_field(server_id.exec_srv, "reboot", "reboot", webrequest_option.none, error_option.ignore);
	}
}


