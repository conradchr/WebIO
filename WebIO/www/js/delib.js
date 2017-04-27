//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//
//
//
//	delib.js
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

// ----------------------------------------------------------------------------
// NET-Serie
var DEV_A31_24_GROUP_DI										= 0x01000000;
var DEV_A23_16_GROUP_DI_SUB_CNT_READ_16						= 0x00010000;
var DEV_A23_16_GROUP_DI_SUB_CNT_READ_WITH_CLR_16			= 0x00020000;
var DEV_A23_16_GROUP_DI_SUB_CNT_READ_LATCH_16				= 0x00030000;

var DEV_A31_24_GROUP_DO										= 0x02000000;

// ----------------------------------------------------------------------------
// General
var DEDITEC_TCP_START_ID_FOR_MULTIPLE_BYTE_DATA = 35;
var DAPI_PREVENT_DAPI_RESPONSE_HANDLER 			= 0xffff;


// ----------------------------------------------------------------------------
// DI - Counter Mode

var DAPI_CNT_MODE_READ            			= 0x00;
var DAPI_CNT_MODE_READ_WITH_RESET			= 0x01;
var DAPI_CNT_MODE_READ_LATCHED				= 0x02;

// ----------------------------------------------------------------------------
// A/D and D/A Modes

var DAPI_ADDA_MODE_UNIPOL_10V				= 0x00;
var DAPI_ADDA_MODE_UNIPOL_5V				= 0x01;
var DAPI_ADDA_MODE_UNIPOL_2V5				= 0x02;

var DAPI_ADDA_MODE_BIPOL_10V				= 0x40;
var DAPI_ADDA_MODE_BIPOL_5V					= 0x41;
var DAPI_ADDA_MODE_BIPOL_2V5				= 0x42;

var DAPI_ADDA_MODE_0_20mA					= 0x80;
var DAPI_ADDA_MODE_4_20mA					= 0x81;
var DAPI_ADDA_MODE_0_24mA					= 0x82;
var DAPI_ADDA_MODE_0_25mA					= 0x83;
var DAPI_ADDA_MODE_0_50mA					= 0x84;


var DAPI_ADDA_MODE_DA_DISABLE				= 0x100;
var DAPI_ADDA_MODE_DA_ENABLE				= 0x200;

var DAPI_ADDA_MODE_PREVENT_DAPI_MODE_ERROR	= 0x8000;


// ----------------------------------------------------------------------------
// Stepper Commands

var DAPI_STEPPER_RETURN_0_BYTES 								=0x00000000;						// Kommando schickt 0 Byte als Antwort
var DAPI_STEPPER_RETURN_1_BYTES 								=0x40000000;						// Kommando schickt 1 Byte als Antwort
var DAPI_STEPPER_RETURN_2_BYTES 								=0x80000000;						// Kommando schickt 2 Byte als Antwort
var DAPI_STEPPER_RETURN_4_BYTES 								=0xc0000000;						// Kommando schickt 4 Byte als Antwort


var DAPI_STEPPER_CMD_SET_MOTORCHARACTERISTIC                	= ( 0x00000001 + DAPI_STEPPER_RETURN_0_BYTES );
var DAPI_STEPPER_CMD_GET_MOTORCHARACTERISTIC                	= ( 0x00000002 + DAPI_STEPPER_RETURN_4_BYTES ); 
var DAPI_STEPPER_CMD_SET_POSITION                           	= ( 0x00000003 + DAPI_STEPPER_RETURN_0_BYTES );  
var DAPI_STEPPER_CMD_GO_POSITION                            	= ( 0x00000004 + DAPI_STEPPER_RETURN_0_BYTES );  
var DAPI_STEPPER_CMD_GET_POSITION                           	= ( 0x00000005 + DAPI_STEPPER_RETURN_4_BYTES );  
var DAPI_STEPPER_CMD_SET_FREQUENCY                          	= ( 0x00000006 + DAPI_STEPPER_RETURN_0_BYTES );  
var DAPI_STEPPER_CMD_SET_FREQUENCY_DIRECTLY                 	= ( 0x00000007 + DAPI_STEPPER_RETURN_0_BYTES );  
var DAPI_STEPPER_CMD_GET_FREQUENCY                          	= ( 0x00000008 + DAPI_STEPPER_RETURN_2_BYTES );  
var DAPI_STEPPER_CMD_FULLSTOP                               	= ( 0x00000009 + DAPI_STEPPER_RETURN_0_BYTES );  
var DAPI_STEPPER_CMD_STOP                                  	 	= ( 0x00000010 + DAPI_STEPPER_RETURN_0_BYTES );  
var DAPI_STEPPER_CMD_GO_REFSWITCH                           	= ( 0x00000011 + DAPI_STEPPER_RETURN_0_BYTES );  
var DAPI_STEPPER_CMD_DISABLE                               		= ( 0x00000014 + DAPI_STEPPER_RETURN_0_BYTES );  
var DAPI_STEPPER_CMD_MOTORCHARACTERISTIC_LOAD_DEFAULT		  	= ( 0x00000015 + DAPI_STEPPER_RETURN_0_BYTES );
var DAPI_STEPPER_CMD_MOTORCHARACTERISTIC_EEPROM_SAVE		 	= ( 0x00000016 + DAPI_STEPPER_RETURN_0_BYTES );
var DAPI_STEPPER_CMD_MOTORCHARACTERISTIC_EEPROM_LOAD			= ( 0x00000017 + DAPI_STEPPER_RETURN_0_BYTES );
var DAPI_STEPPER_CMD_GET_CPU_TEMP							  	= ( 0x00000018 + DAPI_STEPPER_RETURN_1_BYTES );
var DAPI_STEPPER_CMD_GET_MOTOR_SUPPLY_VOLTAGE				  	= ( 0x00000019 + DAPI_STEPPER_RETURN_2_BYTES );
var DAPI_STEPPER_CMD_GO_POSITION_RELATIVE				      	= ( 0x00000020 + DAPI_STEPPER_RETURN_0_BYTES );
var DAPI_STEPPER_CMD_EEPROM_ERASE							  	= ( 0x00000021 + DAPI_STEPPER_RETURN_0_BYTES );
var DAPI_STEPPER_CMD_SET_VECTORMODE                         	= ( 0x00000040 + DAPI_STEPPER_RETURN_0_BYTES );  



var ADDA_MODE_SELECT = {

    value : new Array (
	DAPI_ADDA_MODE_UNIPOL_10V,
	DAPI_ADDA_MODE_UNIPOL_5V,
	DAPI_ADDA_MODE_BIPOL_10V,
	DAPI_ADDA_MODE_BIPOL_5V,
	DAPI_ADDA_MODE_0_20mA,
	DAPI_ADDA_MODE_4_20mA,
	DAPI_ADDA_MODE_0_24mA,
	DAPI_ADDA_MODE_0_50mA
    ),
	
	text : new Array ( 
	"0..10 V",
	"0..5 V",
	"+/-10 V",
	"+/-5 V",
	"0-20 mA",
	"4-20 mA",
	"0-24 mA",
	"0-50 mA"
    )
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

var DAPI = {

	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------

	CMD : {
		DI:			1,
		DI_CNT:		2,
		DO:			3,
		DO_RB:		4,
		DO_INIT:	5,
		AD:			6,
		AD_MODE:	7,
		DA:			8,
		DA_MODE:	9,
		DA_RB:		10,
		PT100:		11,
		STEPPER:	12
	},

	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	
	execute : function (cmd, ch, id_ret_value_OR_value) {
		handle = 0;
		
		switch (cmd)
		{
			// ------------------------------------
			// ------------------------------------
			// ------------------------------------
			case this.CMD.DI:
				DapiDIGet32(handle, ch, id_ret_value_OR_value, cmd)
				break;
				
			// ------------------------------------
			// ------------------------------------
			// ------------------------------------
			case this.CMD.DI_CNT:	
				key_and_element_string = "";
				
				count_ch = $("#productcfg_di_cnt").val();
				ch_end = 0;
				((ch + 16) <= count_ch) ? ch_end = (ch+16) : ch_end = (ch + (count_ch & 15));
				
				for (i=ch; i!=ch_end; i++)
				{
					if ($("#is_NET").val() == 1)
					{
						// 32 Bit Adressen
						addr = DEV_A31_24_GROUP_DI;
						addr |= (i & 0x7fff) * 2;
						
						if(id_ret_value_OR_value == DAPI_CNT_MODE_READ_WITH_RESET)
						{
							addr|=DEV_A23_16_GROUP_DI_SUB_CNT_READ_WITH_CLR_16;
						}
						else if(id_ret_value_OR_value == DAPI_CNT_MODE_READ_LATCHED)
						{
							addr|=DEV_A23_16_GROUP_DI_SUB_CNT_READ_LATCH_16;
						}
						else
						{
							addr|=DEV_A23_16_GROUP_DI_SUB_CNT_READ_16;
						}
						
						// 1) Key
						str_cmd = 'AXRW'; // ASCII + eXtended + READ + WORD
						str_cmd += String.fromCharCode(hex2asc((addr >> 28) & 15));
						str_cmd += String.fromCharCode(hex2asc((addr >> 24) & 15));
						str_cmd += String.fromCharCode(hex2asc((addr >> 20) & 15));
						str_cmd += String.fromCharCode(hex2asc((addr >> 16) & 15));
						str_cmd += String.fromCharCode(hex2asc((addr >> 12) & 15));
						str_cmd += String.fromCharCode(hex2asc((addr >> 8 ) & 15));
						str_cmd += String.fromCharCode(hex2asc((addr >> 4 ) & 15));
						str_cmd += String.fromCharCode(hex2asc((addr      ) & 15));
						key_and_element_string += str_cmd + ";";
					}
					else
					{	
						// 16 Bit Adressen
						addr = 0x100 + (i & 0x7f) * 2;
						
						if(id_ret_value_OR_value == DAPI_CNT_MODE_READ_WITH_RESET)
						{
							addr+=0x100;
						}
						else if(id_ret_value_OR_value == DAPI_CNT_MODE_READ_LATCHED)
						{
							addr+=0x200;
						}
					
						// 1) Key
						str_cmd = 'ARW'; // ASCII + READ + WORD
						str_cmd += String.fromCharCode(hex2asc((addr >> 12) & 15));
						str_cmd += String.fromCharCode(hex2asc((addr >> 8 ) & 15));
						str_cmd += String.fromCharCode(hex2asc((addr >> 4 ) & 15));
						str_cmd += String.fromCharCode(hex2asc((addr      ) & 15));
						key_and_element_string += str_cmd + ";";
					}
					
					// 2) FieldID
					key_and_element_string += "counter" + ((i&15)+1) + ";";
				}
				
				callback = function() {
					$("#modul_status").html("OK");
				};
				
				webrequest_get_and_put_to_field_multiple(server_id.ro_eth_fw, key_and_element_string, webrequest_option.is_background, error_option.stop_interval, callback, true);
				
				break;
				
			// ------------------------------------			
			// ------------------------------------
			// ------------------------------------
			case this.CMD.DO:
				DapiDOSet32(handle, ch, id_ret_value_OR_value)
				break;
				
			// ------------------------------------			
			// ------------------------------------
			// ------------------------------------
			case this.CMD.DO_RB:
				DapiDOReadback32(handle, ch, id_ret_value_OR_value, cmd)
				break;
				
			// ------------------------------------			
			// ------------------------------------
			// ------------------------------------
			case this.CMD.DO_INIT:
				DapiDOReadback32(handle, ch, id_ret_value_OR_value, cmd)
				break;
				
			// ------------------------------------	
			// ------------------------------------
			// ------------------------------------
			case this.CMD.AD:
				key_and_element_string = "";
				
				for (i=ch; i!=(ch+16); i++)
				{
					addr = 0x1000 + i*4;
				
					// 1) Key
					str_cmd = 'ARL'; // ASCII + READ + LONG
					str_cmd += String.fromCharCode(hex2asc((addr >> 12) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr >> 8 ) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr >> 4 ) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr      ) & 15));
					key_and_element_string += str_cmd + ";";
					
					// 2) FieldID
					key_and_element_string += "AD" + ((i&15)+1) + ";" ;
				}
				
				ad_callback = function() {
					//alert("halt");
					for (i=ch; i!=(ch+16); i++)
					{
						//data = $("#ad_ch_" + (i&15)).val();
						data = $("#AD" + ((i&15)+1)).html();
						mode = (data >> 24) & 0xff;
						value = 0;
						
						//alert(mode);
						switch (mode)
						{
							case DAPI_ADDA_MODE_UNIPOL_5V:
								// 0-5V
								value = (data & 0xffff) * 5.0 / 65536.0;
								break;
								
							case DAPI_ADDA_MODE_UNIPOL_10V:
								// 0-10V
								value = (data&0xffff) * 10.0 / 65536.0;
								break;

							case DAPI_ADDA_MODE_BIPOL_5V:
								// +-5V
								value = ((data&0xffff) * 10.0 / 65536.0) - 5.0;
								break;
								
							case DAPI_ADDA_MODE_BIPOL_10V:
								// +-10V
								value = ((data&0xffff) * 20.0 / 65536.0) - 10.0;
								break;
								
							case DAPI_ADDA_MODE_0_24mA:
							case DAPI_ADDA_MODE_0_20mA:
							case DAPI_ADDA_MODE_4_20mA:
								// 0-5V entspricht 0-25mA (100 Ohm) und Spannungsverdopplung !
								value = (data&0xffff) * 25.0 / 65536.0;
								break;
								
							case DAPI_ADDA_MODE_0_50mA:
								// 0-5V entspricht 0-50mA (100 Ohm)
								value = (data&0xffff) * 50.0 / 65536.0;
								break;
						}
						
						if ((mode & 0x80) != 0)
						{
							// mA
							$("#AD" + ((i&15)+1)).html(value.toFixed(3) + " mA");
						}
						else
						{
							// V
							$("#AD" + ((i&15)+1)).html(value.toFixed(3) + " V");
						}
					}
				};
				
				webrequest_get_and_put_to_field_multiple(server_id.ro_eth_fw, key_and_element_string, webrequest_option.is_background, error_option.stop_interval, ad_callback, true);
				break;
				
				
			// ------------------------------------
			// ------------------------------------
			// ------------------------------------
			case this.CMD.AD_MODE:
				
				$("#modul_status").html("Switching A/D-Mode");
				//alert("drin");
			
				index = $("#adda_mode_select").index();
				mode = ADDA_MODE_SELECT.value[index];
				
				window.clearInterval(timer);
				
				
				// 2
				ad_mode_callback = function() {
				
					addr = 0x1000 + ch*4 + 3;
					
					str_cmd = 'ARB'; // ASCII + READ + BYTE
					str_cmd += String.fromCharCode(hex2asc((addr >> 12) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr >> 8 ) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr >> 4 ) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr      ) & 15));
					
					// 3
					ad_mode_readback_callback = function() {
					
						isIlligalMode = false;
						
						ref_mode = $("#mode_rb_ad").val();
						ref_mode = ref_mode.split("").reverse().join("");	// string umdrehen
						ref_mode = parseInt(ref_mode, 16);					// hex 2 int
						
						if (ref_mode != mode)
						{
							//alert(ref_mode + " != " + mode);
						
							//alert("illegal");
							$("#modul_status").html("Error - Illegal A/D-Mode detected!");
							$("#adda_mode_readback").html("Illegal Mode!");
							for (i=0; i!=16; i++)
							{
								$("#AD" + (i+1)).html("ERROR!");
							}
						}
						else
						{
							//alert("nicht illegal");
							$("#modul_status").html("OK");
							$("#adda_mode_readback").html(ADDA_MODE_SELECT.text[index]);
						
							timerTodo = function () {
								DAPI.execute(DAPI.CMD.AD, ch, 0);
								swap_activity();
							};
						
							timer = window.setInterval(timerTodo, 1000);
						}
					};
					
					webrequest_to_field(server_id.ro_eth_fw, str_cmd, "mode_rb_ad", webrequest_option.is_background, error_option.stop_interval, ad_mode_readback_callback);
				};

				// 1
				webrequest_cmd = "";
				
				for (i=ch; i!=(ch+16); i++)
				{
					addr = 0x1000 + i*4 + 3;
				
					str_cmd =  'AWB'; // ASCII + WRITE + BYTE
					str_cmd += String.fromCharCode(hex2asc((addr >> 12) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr >> 8 ) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr >> 4 ) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr      ) & 15));
					webrequest_cmd += str_cmd + ";";
					
					str_data =  String.fromCharCode(hex2asc((mode >> 4 ) & 15));
					str_data += String.fromCharCode(hex2asc((mode      ) & 15));
					webrequest_cmd += str_data + ";";
				}
				// // remove last semicolon
				webrequest_cmd = webrequest_cmd.substring(0, webrequest_cmd.length - 1)
				webrequest_send_multiple(server_id.ro_eth_fw, webrequest_cmd, webrequest_option.none, error_option.stop_interval, ad_mode_callback);
				
				break;
				
			// ------------------------------------
			// ------------------------------------
			// ------------------------------------
			
			case this.CMD.DA:
				// DA SET
				index = $("#adda_mode_select").index();
				mode = ADDA_MODE_SELECT.value[index];
			
				switch(mode)
				{
					case DAPI_ADDA_MODE_UNIPOL_10V:
						value = 3276.8 * 2.0 * id_ret_value_OR_value;
						break;

					case DAPI_ADDA_MODE_UNIPOL_5V:
						value = 3276.8 * 4.0 * id_ret_value_OR_value;
						break;
					
					case DAPI_ADDA_MODE_UNIPOL_2V5:
						value = 3276.8 * 8.0 * id_ret_value_OR_value;
						break;
					
					case DAPI_ADDA_MODE_BIPOL_10V:
						value = 32768.0 + 3276.8 * id_ret_value_OR_value;
						break;
					
					case DAPI_ADDA_MODE_BIPOL_5V:
						value = 32768.0 + 3276.8 * 2.0 * id_ret_value_OR_value;
						break;

					case DAPI_ADDA_MODE_BIPOL_2V5:
						value = 32768.0 + 3276.8 * 4.0 * id_ret_value_OR_value;
						break;
						
					case DAPI_ADDA_MODE_0_20mA:
						value = 3276.8 * id_ret_value_OR_value;
						break;

					case DAPI_ADDA_MODE_4_20mA:
						value = 4096 * (id_ret_value_OR_value-4.0);
						break;
					
					case DAPI_ADDA_MODE_0_24mA:
						value = 65536/24 * id_ret_value_OR_value;
						break;
				}
		
				if (value > 0xffff) value = 0xffff;
			
				addr = 0x2000 + ch*8;
			
				// 1) Key
				str_cmd = 'AWW'; // ASCII + WRITE + WORD
				str_cmd += String.fromCharCode(hex2asc((addr >> 12) & 15));
				str_cmd += String.fromCharCode(hex2asc((addr >> 8 ) & 15));
				str_cmd += String.fromCharCode(hex2asc((addr >> 4 ) & 15));
				str_cmd += String.fromCharCode(hex2asc((addr      ) & 15));
				
				str_data =  String.fromCharCode(hex2asc((value >> 12) & 15));
				str_data += String.fromCharCode(hex2asc((value >> 8 ) & 15));
				str_data += String.fromCharCode(hex2asc((value >> 4 ) & 15));
				str_data += String.fromCharCode(hex2asc((value      ) & 15));
		
				webrequest_send(server_id.ro_eth_fw, str_cmd, str_data, webrequest_option.none, error_option.only_alert);
				break;
			
			// ------------------------------------
			// ------------------------------------
			// ------------------------------------
			case this.CMD.DA_RB:

				da_readback_callback = function () {
		
					index = $("#adda_mode_select").index();
					mode = ADDA_MODE_SELECT.value[index];
				
					for (i=ch; i!=(ch+16); i++)				
					{
						data = $("#ao_channel" + i + "_readback").html();
						
			
						switch (mode)
						{
							case DAPI_ADDA_MODE_UNIPOL_5V:
								// 0-5V
								value = (data & 0xffff) * 5.0 / 65536.0;
								break;
								
							case DAPI_ADDA_MODE_UNIPOL_10V:
								// 0-10V
								value = (data&0xffff) * 10.0 / 65536.0;
								break;

							case DAPI_ADDA_MODE_BIPOL_5V:
								// +-5V
								value = ((data&0xffff) * 10.0 / 65536.0) - 5.0;
								break;
								
							case DAPI_ADDA_MODE_BIPOL_10V:
								// +-10V
								value = ((data&0xffff) * 20.0 / 65536.0) - 10.0;
								break;
								
							case DAPI_ADDA_MODE_0_24mA:
							case DAPI_ADDA_MODE_0_20mA:
							case DAPI_ADDA_MODE_4_20mA:
								// 0-5V entspricht 0-25mA (100 Ohm) und Spannungsverdopplung !
								value = (data&0xffff) * 25.0 / 65536.0;
								break;
								
							case DAPI_ADDA_MODE_0_50mA:
								// 0-5V entspricht 0-50mA (100 Ohm)
								value = (data&0xffff) * 50.0 / 65536.0;
								break;
						}
						
						if ((mode & 0x80) != 0)
						{
							// mA
							$("#ao_channel" + i + "_readback").html(value.toFixed(3) + " mA");
						}
						else
						{
							// V
							$("#ao_channel" + i + "_readback").html(value.toFixed(3) + " V");
						}
					}
					
					$("#modul_status").html("OK");
				};
			
			
				key_and_element_string = "";
			
				for (i=ch; i!=(ch+16); i++)
				{
					addr = 0x2000 + i*8;
				
					// 1) Key
					str_cmd = 'ARL'; // ASCII + READ + LONG
					str_cmd += String.fromCharCode(hex2asc((addr >> 12) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr >> 8 ) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr >> 4 ) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr      ) & 15));
					key_and_element_string += str_cmd + ";";
					
					// 2) FieldID
					key_and_element_string += "ao_channel" + i + "_readback;";
				}
				
				webrequest_get_and_put_to_field_multiple(server_id.ro_eth_fw, key_and_element_string, webrequest_option.is_background, error_option.stop_interval, da_readback_callback, true);
				break;
				
			// ------------------------------------
			// ------------------------------------
			// ------------------------------------
			case this.CMD.DA_MODE:
				
				$("#modul_status").html("Switching D/A-Mode");
				
				da_mode_callback = function() {
					$("#modul_status").html("OK");
					$("#adda_mode_readback").html(ADDA_MODE_SELECT.text[index]);
				};
				
				index = $("#adda_mode_select").index();
				mode = ADDA_MODE_SELECT.value[index];
				
				key_and_element_string = "";
				
				for (i=0; i!=8; i++)
				{
					addr = 0x2000 + i*8 + 2;
				
					str_cmd =  'AWB'; // ASCII + READ + WORD
					str_cmd += String.fromCharCode(hex2asc((addr >> 12) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr >> 8 ) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr >> 4 ) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr      ) & 15));
					key_and_element_string += str_cmd + ";";
					
					str_data =  String.fromCharCode(hex2asc((mode >> 4 ) & 15));
					str_data += String.fromCharCode(hex2asc((mode      ) & 15));
					key_and_element_string += str_data + ";";
				}
				
				webrequest_send_multiple(server_id.ro_eth_fw, key_and_element_string, webrequest_option.none, error_option.stop_interval, da_mode_callback)
				
				break;
				
			// ------------------------------------
			// ------------------------------------
			// ------------------------------------

			case this.CMD.PT100:
			
				key_and_element_string = "";
				
				callback_pt100 = function() {
					
					for (i=ch; i!=(ch+16); i++)
					{
						value = parseInt($("#Temp" + i).html());
					
						switch((value>>16) & 0xff)
						{
							case 1:	temp = (value&0x7fff) / 10;break;				// Faktor 10
							case 2:	temp = (value&0x7fff) / 100;break;				// Faktor 100
							case 0:	temp = -9999;break;								// Faktor Sensor disconnected
							default: temp=0;
						}

						if(((value>>15)&1) != 0) 
						{
							temp = -temp;			// Negative Temp
						}
						
						$("#Temp" + i).html( (temp!=-9999) ? temp.toFixed(2) + " &ordmC" : "disconnected");
						
						$("#modul_status").html("OK");
					}
				
				};
				
				
				for (i=ch; i!=(ch+16); i++)
				{
					addr = 0x4000 + i*8;
				
					// 1) Key
					str_cmd = 'ARL'; // ASCII + READ + LONG
					str_cmd += String.fromCharCode(hex2asc((addr >> 12) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr >> 8 ) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr >> 4 ) & 15));
					str_cmd += String.fromCharCode(hex2asc((addr      ) & 15));
					key_and_element_string += str_cmd + ";";
					
					// 2) FieldID
					key_and_element_string += "Temp" + i +  ";";
				}
				
				webrequest_get_and_put_to_field_multiple(server_id.ro_eth_fw, key_and_element_string, webrequest_option.is_background, error_option.stop_interval, callback_pt100, true);
				break;

			// ------------------------------------
			// ------------------------------------
			// ------------------------------------
			default:
				break;
			// ------------------------------------
			// ------------------------------------
			// ------------------------------------
		}
	},

	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	
	response_handler : function (id_ret_value, cmd) {
	
		
		
		switch (cmd)
		{
			// ------------------------------------
			case this.CMD.DI:
				value = $("#"+ id_ret_value).val();
				value = value.split("").reverse().join("");	// string umdrehen
				value = parseInt(value, 16);	// hex to int
				
				for(i=0 ;i!=16 ;i++)
				{	
					if (((value >> i) & 1) == 1)
					{
						btn_rb_toggle(i, true);
					}
					else
					{
						btn_rb_toggle(i, false);
					}
				}
				break;
			// ------------------------------------				
			case this.CMD.DO_RB:
				
				value = $("#"+ id_ret_value).val();
				value = value.split("").reverse().join("");	// string umdrehen
				value = parseInt(value, 16);	// hex to int
				
				for(i=0 ;i!=16 ;i++)
				{	
					if (((value >> i) & 1) == 1)
					{
						btn_rb_toggle(i, true);
					}
					else
					{
						btn_rb_toggle(i, false);
					}
				}
				break;
			// ------------------------------------				
			case this.CMD.DO_INIT:
				
				value = $("#"+ id_ret_value).val();
				value = value.split("").reverse().join("");	// string umdrehen
				value = parseInt(value, 16);	// hex to int
				
				ch = document.getElementsByName("bit");
				rb = document.getElementsByName("inputbit");
				
				for(i=0; i!=32; i++)
				{	
					if ((rb[i] != null) && (ch[i] != null))
					{
						if (((value >> i) & 1) == 1)
						{
							rb[i].checked = true;
							ch[i].checked = true;
						}
						else
						{
							rb[i].checked = false;
							ch[i].checked = false;
						}
					}
				}
				break;
			// ------------------------------------
			default:
				$("#modul_status").html("Error");
				break;
			// ------------------------------------
		}
	},
	
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	
	webrequest: function (server_int, key_string, id_ret_value, cmd) {
	
		callback = function (data, error)  {
			iserror = false;
			if (typeof error != "undefined") 
			{
				var message = error == "ajax" ? "ajax" : data;
				iserror = true;
				return;
			}
			
			if (iserror != true)
			{
				$("#"+id_ret_value).val(data);
			}
			
			DAPI.response_handler(id_ret_value, cmd);
		}
	
	webrequest_get(server_int, key_string, webrequest_option.is_background, error_option.stop_interval, callback);
	}
	
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	// ----------------------------------------------------------------------------
	
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// DIGITAL OUTPUT

function DapiDOSet32(handle, ch, data)
{
	DapiWriteLong(handle, 0x0 | ((ch>>3) & 0x1f), data);
}

function DapiDOReadback32(handle, ch, id_ret_value, cmd)
{
	DapiReadLong(handle, 0x0 | ((ch>>3) & 0x1f), id_ret_value, cmd);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// DIGITAL INPUT

function DapiDIGet32(handle, ch, id_ret_value, cmd)
{
	DapiReadLong(handle, 0x20 | ((ch>>3) & 0x1f), id_ret_value, cmd);
}

function DapiDIGetFF32(handle, ch, id_ret_value, cmd)
{
	DapiReadLong(handle, 0x40 | ((ch>>3) & 0x1f) , id_ret_value, cmd);
}

function DapiDIGetCounter(handle, ch, mode, id_ret_value, cmd)
{
	var addr = 0x100 + (ch&0x7f)*2;
	
	if(mode == DAPI_CNT_MODE_READ_WITH_RESET)
	{
		addr+=0x100;
	}
	else if(mode == DAPI_CNT_MODE_READ_LATCHED)
	{
		addr+=0x200;
	}

	DapiReadWord(handle, addr, id_ret_value, cmd)
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ANALOG INPUT

function DapiADSetMode(handle, ch, mode)
{
	DapiWriteByte(handle, 0x1000 + ch*4 + 3, mode);
}

function DapiADGetMode(handle, ch, id_ret_value, cmd)
{
	DapiReadByte(handle, 0x1000 + ch*4 + 3, id_ret_value, cmd);
}

function DapiADGet(handle, ch, id_ret_value, cmd)
{
	if ((ch & 0x8000) == 0)
	{
		DapiReadWord(handle, 0x1000 + ch*4, id_ret_value, cmd);
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ANALOG OUTPUT

function DapiDASetMode(handle, ch, mode)
{
	DapiWriteByte(handle, 0x2000 + ch*8 + 2, mode&255);

	if((mode & DAPI_ADDA_MODE_DA_DISABLE) == DAPI_ADDA_MODE_DA_DISABLE)
	{
		DapiWriteByte(handle, 0x2000 + ch*8 + 3, 1);	// Disable D/A Channel
	}
	
	if((mode & DAPI_ADDA_MODE_DA_ENABLE) == DAPI_ADDA_MODE_DA_ENABLE)
	{
		DapiWriteByte(handle, 0x2000 + ch*8 + 3, 0);	// Enable D/A Channel
	}
}

function DapiDAGetMode(handle, ch, id_ret_value, cmd)
{
	DapiReadByte(handle, 0x2000 + ch*8 + 2, id_ret_value, cmd)
}

function DapiDASet(handle, ch, id_ret_value, cmd)
{
	DapiWriteWord(handle, 0x2000 + ch*8, data);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// STEPPER

function DapiStepperCommand(handle, motor, cmd, par1, par2, par3, par4, id_ret_value)
{
	var str_cmd = '';
	var str_data = '';
	var register_read_callback;
	var callback_callback;
	var addr_base = (0x3000 | motor*0x40);

	str_cmd += 'A';		// ASCII mode
	str_cmd += 'W'; 	// Write command
	str_cmd += 'M'; 	// multiple length
	
	var addr_long = addr_base + 0x10;
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 12) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 8 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 4 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long      ) & 15));
	
	var addr_depth = 16;
	str_cmd += String.fromCharCode(hex2asc((addr_depth >> 12) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_depth >> 8 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_depth >> 4 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_depth      ) & 15));
	
	var increment = 1;
	str_cmd += String.fromCharCode(hex2asc((increment >> 12) & 15));
	str_cmd += String.fromCharCode(hex2asc((increment >> 8 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((increment >> 4 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((increment      ) & 15));
	
	str_data += String.fromCharCode(hex2asc((DEDITEC_TCP_START_ID_FOR_MULTIPLE_BYTE_DATA >> 4 ) & 15));
	str_data += String.fromCharCode(hex2asc((DEDITEC_TCP_START_ID_FOR_MULTIPLE_BYTE_DATA      ) & 15));
	
	var data_id = 0;
	str_data += String.fromCharCode(hex2asc((data_id >> 12) & 15));
	str_data += String.fromCharCode(hex2asc((data_id >> 8 ) & 15));
	str_data += String.fromCharCode(hex2asc((data_id >> 4 ) & 15));
	str_data += String.fromCharCode(hex2asc((data_id      ) & 15));	
	
	str_data += String.fromCharCode(hex2asc((par3 >> 4 ) & 15));
	str_data += String.fromCharCode(hex2asc((par3      ) & 15));
	str_data += String.fromCharCode(hex2asc((par3 >> 12) & 15));
	str_data += String.fromCharCode(hex2asc((par3 >> 8 ) & 15));
	str_data += String.fromCharCode(hex2asc((par3 >> 20) & 15));
	str_data += String.fromCharCode(hex2asc((par3 >> 16) & 15));
	str_data += String.fromCharCode(hex2asc((par3 >> 28) & 15));
	str_data += String.fromCharCode(hex2asc((par3 >> 24) & 15));
	
	str_data += String.fromCharCode(hex2asc((par2 >> 4 ) & 15));
	str_data += String.fromCharCode(hex2asc((par2      ) & 15));
	str_data += String.fromCharCode(hex2asc((par2 >> 12) & 15));
	str_data += String.fromCharCode(hex2asc((par2 >> 8 ) & 15));
	str_data += String.fromCharCode(hex2asc((par2 >> 20) & 15));
	str_data += String.fromCharCode(hex2asc((par2 >> 16) & 15));
	str_data += String.fromCharCode(hex2asc((par2 >> 28) & 15));
	str_data += String.fromCharCode(hex2asc((par2 >> 24) & 15));
	
	str_data += String.fromCharCode(hex2asc((par1 >> 4 ) & 15));
	str_data += String.fromCharCode(hex2asc((par1      ) & 15));
	str_data += String.fromCharCode(hex2asc((par1 >> 12) & 15));
	str_data += String.fromCharCode(hex2asc((par1 >> 8 ) & 15));
	str_data += String.fromCharCode(hex2asc((par1 >> 20) & 15));
	str_data += String.fromCharCode(hex2asc((par1 >> 16) & 15));
	str_data += String.fromCharCode(hex2asc((par1 >> 28) & 15));
	str_data += String.fromCharCode(hex2asc((par1 >> 24) & 15));
	
	str_data += String.fromCharCode(hex2asc((cmd >> 4 ) & 15));
	str_data += String.fromCharCode(hex2asc((cmd      ) & 15));
	str_data += String.fromCharCode(hex2asc((cmd >> 12) & 15));
	str_data += String.fromCharCode(hex2asc((cmd >> 8 ) & 15));
	str_data += String.fromCharCode(hex2asc((cmd >> 20) & 15));
	str_data += String.fromCharCode(hex2asc((cmd >> 16) & 15));
	str_data += String.fromCharCode(hex2asc((cmd >> 28) & 15));
	str_data += String.fromCharCode(hex2asc((cmd >> 24) & 15));
	
	// >>> damits ein ulong bleibt...
	if (((cmd & 0xf0000000) >>> 0) != 0)
	{
		register_read_callback = function() {
			
			callback_callback = function() {
			
				value = id_ret_value.html();
				
				if (cmd == DAPI_STEPPER_CMD_GET_CPU_TEMP)
				{
					id_ret_value.html(value + " &ordmC");
				}
				
				if (cmd == DAPI_STEPPER_CMD_GET_MOTOR_SUPPLY_VOLTAGE)
				{	
					id_ret_value.html((value/1000).toFixed(2) + " V");
				}
			};
			
			switch (((cmd & 0xf0000000) >>> 0))
			{
				// ------------------------------------
				case DAPI_STEPPER_RETURN_1_BYTES:
					DapiReadByte(handle, (addr_base | 0x20), id_ret_value, DAPI_PREVENT_DAPI_RESPONSE_HANDLER, callback_callback);
					break;
				// ------------------------------------
				case DAPI_STEPPER_RETURN_2_BYTES:
					DapiReadWord(handle, (addr_base | 0x20), id_ret_value, DAPI_PREVENT_DAPI_RESPONSE_HANDLER, callback_callback);
					break;
				// ------------------------------------
				case DAPI_STEPPER_RETURN_4_BYTES:
					DapiReadLong(handle, (addr_base | 0x20), id_ret_value, DAPI_PREVENT_DAPI_RESPONSE_HANDLER, callback_callback);
					break;
				// ------------------------------------
			}
		};	
		
		webrequest_send(server_id.ro_eth_fw, str_cmd, str_data, webrequest_option.is_background, error_option.only_alert, register_read_callback);
	}
	else
	{
		webrequest_send(server_id.ro_eth_fw, str_cmd, str_data, webrequest_option.none, error_option.only_alert);
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function DapiWriteByte(handle, addr_long, value_long)
{
	var str_cmd = '';
	var str_data = '';

	str_cmd += 'A';		// ASCII mode
	str_cmd += 'W'; 	// Write command
	str_cmd += 'B'; 	// Byte length

	str_cmd += String.fromCharCode(hex2asc((addr_long >> 12) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 8 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 4 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long      ) & 15));

	str_data += String.fromCharCode(hex2asc((value_long >> 4 ) & 15));
	str_data += String.fromCharCode(hex2asc((value_long      ) & 15));

	webrequest_send(server_id.ro_eth_fw, str_cmd, str_data, webrequest_option.none, error_option.only_alert);
}

function DapiWriteWord(handle, addr_long, value_long)
{
	var str_cmd = '';
	var str_data = '';

	str_cmd += 'A';		// ASCII mode
	str_cmd += 'W'; 	// Write command
	str_cmd += 'W'; 	// Word length

	str_cmd += String.fromCharCode(hex2asc((addr_long >> 12) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 8 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 4 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long      ) & 15));

	str_data += String.fromCharCode(hex2asc((value_long >> 12) & 15));
	str_data += String.fromCharCode(hex2asc((value_long >> 8 ) & 15));
	str_data += String.fromCharCode(hex2asc((value_long >> 4 ) & 15));
	str_data += String.fromCharCode(hex2asc((value_long      ) & 15));

	webrequest_send(server_id.ro_eth_fw, str_cmd, str_data, webrequest_option.none, error_option.only_alert);
}

function DapiWriteLong(handle, addr_long, value_long)
{
	var str_cmd = '';
	var str_data = '';

	str_cmd += 'A';		// ASCII mode
	str_cmd += 'W'; 	// Write command
	str_cmd += 'L'; 	// LONG length

	str_cmd += String.fromCharCode(hex2asc((addr_long >> 12) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 8 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 4 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long      ) & 15));

	str_data += String.fromCharCode(hex2asc((value_long >> 28) & 15));
	str_data += String.fromCharCode(hex2asc((value_long >> 24) & 15));
	str_data += String.fromCharCode(hex2asc((value_long >> 20) & 15));
	str_data += String.fromCharCode(hex2asc((value_long >> 16) & 15));
	str_data += String.fromCharCode(hex2asc((value_long >> 12) & 15));
	str_data += String.fromCharCode(hex2asc((value_long >> 8 ) & 15));
	str_data += String.fromCharCode(hex2asc((value_long >> 4 ) & 15));
	str_data += String.fromCharCode(hex2asc((value_long      ) & 15));

	webrequest_send(server_id.ro_eth_fw, str_cmd, str_data, webrequest_option.none, error_option.only_alert);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function DapiReadByte(handle, addr_long, id_ret_value, cmd, cb)
{
	var str_cmd = '';

	str_cmd += 'A';		// ASCII mode
	str_cmd += 'R'; 	// Read command
	str_cmd += 'B'; 	// Byte length

	str_cmd += String.fromCharCode(hex2asc((addr_long >> 12) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 8 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 4 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long      ) & 15));
	
	if (cmd != DAPI_PREVENT_DAPI_RESPONSE_HANDLER)
	{
		DAPI.webrequest(server_id.ro_eth_fw, str_cmd, id_ret_value, cmd);
	}
	else
	{
		webrequest_to_field(server_id.ro_eth_fw, str_cmd, id_ret_value, webrequest_option.is_background, error_option.only_alert, cb, true);
	}
}

function DapiReadWord(handle, addr_long, id_ret_value, cmd, cb)
{
	var str_cmd = '';

	str_cmd += 'A';		// ASCII mode
	str_cmd += 'R'; 	// Read command
	str_cmd += 'W'; 	// Word length

	str_cmd += String.fromCharCode(hex2asc((addr_long >> 12) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 8 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 4 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long      ) & 15));
	
	if (cmd != DAPI_PREVENT_DAPI_RESPONSE_HANDLER)
	{
		DAPI.webrequest(server_id.ro_eth_fw, str_cmd, id_ret_value, cmd);
	}
	else
	{
		webrequest_to_field(server_id.ro_eth_fw, str_cmd, id_ret_value, webrequest_option.is_background, error_option.only_alert, cb, true);
	}
}

function DapiReadLong(handle, addr_long, id_ret_value, cmd, cb)
{
	var str_cmd = '';

	str_cmd += 'A';		// ASCII mode
	str_cmd += 'R'; 	// Read command
	str_cmd += 'L'; 	// BYTE length

	str_cmd += String.fromCharCode(hex2asc((addr_long >> 12) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 8 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long >> 4 ) & 15));
	str_cmd += String.fromCharCode(hex2asc((addr_long      ) & 15));
	
	if (cmd != DAPI_PREVENT_DAPI_RESPONSE_HANDLER)
	{
		DAPI.webrequest(server_id.ro_eth_fw, str_cmd, id_ret_value, cmd);
	}
	else
	{
		//alert("DapiReadWord");
		webrequest_to_field(server_id.ro_eth_fw, str_cmd, id_ret_value, webrequest_option.is_background, error_option.only_alert, cb, true);
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function DapiDOSet1(handle, ch, data)
{
	// check set or clear bit
	if ((data&1) != 0)
	{
		DapiDOSetBit32(handle, (ch & (~31)), (1 << (ch & 0x1f)));
	}
	else
	{
		DapiDOClrBit32(handle, (ch & (~31)), (1 << (ch & 0x1f)));
	}
}

function DapiDOSetBit32(handle, ch, data)
{
	var addr = 0x80 | ((ch>>3) & 0x1f);
	DapiWriteLong(handle, addr, data);
}

function DapiDOClrBit32(handle, ch, data)
{
	var addr = 0xa0 | ((ch>>3) & 0x1f);
	DapiWriteLong(handle, addr, data);
}
