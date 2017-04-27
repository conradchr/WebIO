//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//
//
//
//	deditec_gui.js
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

var ad_is_init = 0;

function GetCountOfChannel(type)
{
	switch(type)
	{
		case IO_TYPE.TYPE.DI:
		case IO_TYPE.TYPE.DI_CNT:
			return $("#productcfg_di").val();
			break;
			
		case IO_TYPE.TYPE.DO:
			return $("#productcfg_do").val();
			break;
			
		case IO_TYPE.TYPE.AD:
			return $("#productcfg_ai").val();
			break;
			
		case IO_TYPE.TYPE.DA:
			return $("#productcfg_ao").val();
			break;
			
		case IO_TYPE.TYPE.PT100:
			return $("#productcfg_temp").val();
			break;
			
		case IO_TYPE.TYPE.STEPPER:
			return $("#productcfg_stepp").val();
			break;
			
		case IO_TYPE.TYPE.CNT8_IN:
			return $("#productcfg_cnt48").val();
			break;
			
		case IO_TYPE.TYPE.CNT8_OUT:
			return $("#productcfg_pulsegen").val();
			break;
			
		case IO_TYPE.TYPE.PWM:
			return $("#productcfg_pwm").val();
			break;
			
		default:
			return 0;
			break;
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

var IO_TYPE = {
	
	TYPE : {
		DI: 		0,
		DO: 		1,
		AD: 		2,
		DA: 		3,
		PT100: 		4,
		STEPPER:	5,
		CNT8_IN:	6,
		CNT8_OUT:	7,
		PWM:		8,
		
		DI_CNT:		9,
		CFG:		99
	},
	
	TEXT : new Array ( 
		"Digital Input",
		"Digital Output",
		"Analog Input",
		"Analog Output",
		"Temperature Input",
		"Stepper",
		"Counter48 Input",
		"Counter32 Output",
		"PWM Output"
    ),
	
	KEY : new Array (
		"io_di#",
		"io_do#", 
		"io_ai#",
		"io_ao#",
		"io_temp#",
		"io_stepper#",
		"io_counterin48#",
		"io_counterout32#",
		"io_pwm#",
		"io_di#"
	)
};

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function FormInit(type)
{	
	var count_ch = GetCountOfChannel(type);

	// --------------------------------
	// fill channel area select
	$("#ch_area_select").empty();
	select_index = 0;
	
	// fill options (ch 0..15)
	if (count_ch >= 16)
	{
		$("#ch_area_select").append(new Option("CH 0..15", select_index++));
	}
	else
	{
		$("#ch_area_select").append(new Option("CH 0.." + ((count_ch&15)-1), select_index++));
	}

	// --------------------------------
	// fill options (ch 16..127)
	for (i=16; i!=128; i+=16)
	{
		if (count_ch >= (i+16))
		{
			$("#ch_area_select").append(new Option("CH " + i + ".." + (i+15), select_index++));
		}
		else if (count_ch > i)
		{
			$("#ch_area_select").append(new Option("CH " + i + ".." + (i+(count_ch&15)), select_index++));
		}
	}
	
	if ($("#ch_area_select").children("option").length == 1)
	{
		$("#ch_area_select").attr("disabled", true);
	}
	else
	{
		$("#ch_area_select").removeAttr("disabled");
	}
	
	// --------------------------------
	// onChange handler 
	$("#ch_area_select").change( function () {
	
		
	
		$("#modul_status").html("Switching channel area");
		ch_index = $("#ch_area_select").index();
	
		ch_start = ch_index*16;
		((ch_start + 16) <= count_ch) ? ch_end = (ch_start+16) : ch_end = (ch_start + (count_ch & 15));
	
		$("#tab").empty();
		
		//alert("ch= " + ch_start);
		
		//alert(timer);
		window.clearInterval(timer);
		
		CreateTable(type, ch_start, ch_end);
		
		switch (type)
		{
			case IO_TYPE.TYPE.DI:
				init_di(ch_start);
				break;
				
			case IO_TYPE.TYPE.DO:
				init_do(ch_start);
				break;
				
			case IO_TYPE.TYPE.DI_CNT:
				init_di_cnt(ch_start);
				break;
				
			case IO_TYPE.TYPE.AD:
				init_ad(ch_start);
				break;
				
			case IO_TYPE.TYPE.DA:
				init_da(ch_start);
				break;
				
			case IO_TYPE.TYPE.PT100:
				init_pt100(ch_start);
				break;
		}
		
	});
	
	$("#ch_area_select").change();
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function InsertHeaderInTable(table, column_count, column_widths, column_names)
{
	var table_style;
	var table_header;

	table_style = "<colgroup>";
	table_header = "<tr id='table_header' bgcolor='#f5f5f5'>";
	
	for (i=0; i!=column_count; i++)
	{
		table_style += "<col width='" + column_widths[i] + "'>";
		table_header += "<th>" + column_names[i] + "</th>";
	}
	
	table_style += "</colgroup>";
	table_header += "</tr>";
	
	table.append(table_style);
	table.append(table_header);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function InsertRowInTable(type, table, index, ch)
{
	var color;
	var row;

	(ch % 2 != 0) ? color = "#f5f5f5" : color = "#FFFFFF";
	
	row =  "<tr bgcolor='" + color + "' height='32px'>";
	row += "<td align='center'>" + ch + "</td>)";
	
	if (type != IO_TYPE.TYPE.CFG)
	{
		row += "<td align='center'><label id='ch_name_" + index + "'></label></td>";
	}
	
	switch (type)
	{
		case IO_TYPE.TYPE.DI:
			row += "<td align='center'><div class='btn_rb'><div class='btn_rb_on' id='btn_rb_on_" + index + "'></div><div class='btn_rb_off' id='btn_rb_off_" + index + "'></div></div></td></tr>";	
			break;

		case IO_TYPE.TYPE.DO:
			row += "<td align='center'><div class='btn'><div class='btn_on' id='btn_on_" + ch + "'></div><div class='btn_off' id='btn_off_" + ch + "'></div></div></td>";
			row += "<td align='center'><div class='btn_rb'><div class='btn_rb_on' id='btn_rb_on_" + index + "'></div><div class='btn_rb_off' id='btn_rb_off_" + index + "'></div></div></td></tr>";	
			break;
			
		case IO_TYPE.TYPE.DI_CNT:
			row += "<td align='center'><label id='counter" + (index+1) + "' /></td></tr>";
			break;
			
		case IO_TYPE.TYPE.AD:
			row += "<td align='center'><label id='AD" + (index+1) + "' /></td></tr>";
			break;
			
		case IO_TYPE.TYPE.DA:
			row += "<td align='center'><input type='text' style='width:80px;' id='da_channel" + ch + "' /><label>&nbspV</label></td>";
			row += "<td align='center'><input type='button' class='button editbutton small' id='btn_set_da" + ch +"' value='SET' /></td>";
			row += "<td align='center'><label id='ao_channel" + ch + "_readback' /></td></tr>";
			break;
			
		case IO_TYPE.TYPE.PT100:
			row += "<td align='center'><label id='Temp" + ch + "' /></td></tr>";
			break;
			
		case IO_TYPE.TYPE.CFG:
			row += "<td align='center'><input type='text' style='width:150px;' id='ch_name" + index + "' maxlength='16' /></td></tr>";
			break;
	}
	
	
	table.append(row);
}


function InsertFooterInTable(type, table)
{
	var row;
	
	row  = "<tr height='30' />";
	row += "<tr> + <td />";
	if (type != IO_TYPE.TYPE.CFG)
	{
		row += "<td align='center'><input type='button' class='button editbutton' id='btn_edit' value='EDIT CH NAMES' /></td>";
	}

	switch (type)
	{
		case IO_TYPE.TYPE.DO:
			row += "<td align='center'><div class='btn'><div class='btn_on btn_on_all' id='btn_on_all'></div><div class='btn_off btn_off_all' id='btn_off_all'></div></div></td>";
			break;
			
		case IO_TYPE.TYPE.DI_CNT:
			row += "<td align='center'><input type='button' class='button editbutton' id='btn_cnt_reset' value='RESET' /></td>";
			break;
			
		case IO_TYPE.TYPE.CFG:
			row += "<td align='center'><input type='button' class='button editbutton' id='btn_save' value='SAVE' /></td>";
			break;
	}
	
	row += "</tr>";
	
	table.append(row);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function CreateTable(type, ch_start, ch_end)
{
	var key_and_element_string = "";
	var data = 0;
	
	$("#tab").attr("cellspacing", 0);
	
	// header
	switch (type)
	{
		case IO_TYPE.TYPE.DI:
			width = new Array ( 50, 200, 200);
			names = new Array ( "CH", "Name", "State");
			break;
	
		case IO_TYPE.TYPE.DO:
			width = new Array ( 50, 200, 200, 100 );
			names = new Array ( "CH", "Name", "State", "Readback");
			break;
			
		case IO_TYPE.TYPE.DI_CNT:
			width = new Array ( 50, 200, 200);
			names = new Array ( "CH", "Name", "Counter value");
			break;
			
		case IO_TYPE.TYPE.AD:
			width = new Array ( 50, 200, 200);
			names = new Array ( "CH", "Name", "Value");
			break;
			
		case IO_TYPE.TYPE.DA:
			width = new Array ( 50, 200, 100, 100, 100);
			names = new Array ( "CH", "Name", "Value", "Set value", "Readback");
			break;
			
		case IO_TYPE.TYPE.PT100:
			width = new Array ( 50, 200, 200);
			names = new Array ( "CH", "Name", "Value");
			break;

	}

	InsertHeaderInTable($("#tab"), width.length, width, names);
	
	
	// rows
	for (i=ch_start; i!=ch_end; i++)
	{
		key_and_element_string += IO_TYPE.KEY[type] + i + ";" ;
		key_and_element_string += "ch_name_" + (i&15) + ";";
		
		InsertRowInTable(type, $("#tab"), (i&15), i);
		
		// --------------------------------
		// eventhandler row controls
		
		switch (type)
		{
			case IO_TYPE.TYPE.DO:
				$("#btn_on_" + i).click(
					createOnClickButtonSingle(i, 1)
				);
				
				$("#btn_off_" + i).click(
					createOnClickButtonSingle(i, 0)
				);
				
				data |= (1 << (i&15));
				break;
				
			case IO_TYPE.TYPE.DA:
				$("#btn_set_da" + i).click(
					analog_outputs_value_set(i)
				);
				break;
		}
		
	}
	
	// footer
	InsertFooterInTable(type, $("#tab"));
	
	// --------------------------------
	// eventhandler footer
	switch (type)
	{
		case IO_TYPE.TYPE.DO:
			$("#btn_on_all").click( function() {
				handle = 0;
				DapiDOSetBit32(handle, ch_start, data)
			});

			$("#btn_off_all").click( function() {
				handle = 0;
				DapiDOClrBit32(handle, ch_start, data)
			});	
			break;
	
		case IO_TYPE.TYPE.DI_CNT:
			$("#btn_cnt_reset").click( function() {
				DAPI.execute(DAPI.CMD.DI_CNT, ch_start, DAPI_CNT_MODE_READ_WITH_RESET);
			});
			break;
	 }
	
	$("#btn_edit").click( function() {
		open_url('/io/io_config.html','','');
	});
	// --------------------------------
	
	webrequest_get_and_put_to_field_multiple(server_id.param_server, key_and_element_string, webrequest_option.none, error_option.only_alert);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function createOnClickButtonSingle(i, data)
{
	return function () {
		handle = 0;
		DapiDOSet1(handle, i, data);
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function analog_outputs_value_set(ch)
{	
	return function () {

		data = $("#da_channel" + ch).val();
		data = data.replace(",",".");
		
		for (i=0; i!=data.length; i++)
		{
			check = data.substring(i, (i+1));
			
			if ((isNaN(parseInt(check)) == true) && (check != "."))
			{
				alert("Value contains illegal character: " + check);
				return;
			}
		}
		
		data = parseFloat(data);
		if ((data < -10) || (data > 10))
		{
			alert("Value should be in range of -10.0V .. +10.0V");
			return
		}
		
		DAPI.execute(DAPI.CMD.DA, ch, data);
	};
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function CreateCheckbox(color_int, name_string, id_string, enabled_bool)
{
	var enabled_text = "";
	
	if (enabled_bool == false)
	{
		enabled_text = "disabled";
	}
	
	var checkbox = (
	"<div class='onoffswitch'>" +
	"<input type='checkbox' name='inputbit' class='onoffswitch-checkbox' id='" + id_string + "' " + enabled_text + ">" +
	
	"<label class='onoffswitch-label' for='" + id_string + "'>" +
    "<span class='onoffswitch-inner'>" +  
    "<span class='onoffswitch-active'><span class='onoffswitch-switch'>ON</span></span>" + 
    "<span class='onoffswitch-inactive'><span class='onoffswitch-switch'>OFF</span></span>" + 
    "</span>" + 
	"</label>" +
	"</div>"
	);
	
	return checkbox;
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function btn_rb_toggle(id, state)
{
	if(state == true)
	{
		$("#btn_rb_off_"+id).fadeOut(500);
		$("#btn_rb_on_"+id).fadeIn(500);
	}
	else
	{
		$("#btn_rb_off_"+id).fadeIn(500);
		$("#btn_rb_on_"+id).fadeOut(500);
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function btn_rb_toggle_all(state)
{		
	$('.btn_rb_on').each(function() 
	{
		if(state == true)
		{
			$(this).fadeIn(500);
		}
		else
		{
			$(this).fadeOut(500);
		}
    });
	
	$('.btn_rb_off').each(function() 
	{
		if(state == true)
		{
			$(this).fadeOut(500);
		}
		else
		{
			$(this).fadeIn(500);
		}
    });
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
