//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//
//
//
//	deditec_delib_access.js
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

timerTodo = 0;
timer = 0;
is_init = 0;

var global_activity_counter;

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function init_di(start_ch)
{
	var i;
	var count_di = $("#productcfg_di").val();
	var field_id;
	
	digital_inputs_outputs_navigator_show_hide();
	global_activity_counter = 0;
	
	timerTodo = function () {
		DAPI.execute(DAPI.CMD.DI, start_ch, "delib_webrequest");
		swap_activity();
	};
	
	timer = window.setInterval(timerTodo, 1000);	 
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function init_di_cnt(start_ch)
{
	var i;
	var count_di_cnt = $("#productcfg_di_cnt").val();
		
	digital_inputs_outputs_navigator_show_hide();
	global_activity_counter = 0;
	
	timerTodo = function () {
		DAPI.execute(DAPI.CMD.DI_CNT, start_ch, DAPI_CNT_MODE_READ);
		swap_activity();
	};
	
	timer = window.setInterval(timerTodo, 1000);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function init_do(start_ch)
{
	var i;
	var count_do = $("#productcfg_do").val();

	digital_outputs_form_configure(start_ch, count_do);
	digital_inputs_outputs_navigator_show_hide();
    	global_activity_counter = 0;
	
	DAPI.execute(DAPI.CMD.DO_INIT, start_ch, "delib_webrequest");
	global_activity_counter = 0;
	
	timerTodo = function () {
		digital_outputs_timer_call(start_ch);
		swap_activity();
	};
	
	timer = window.setInterval(timerTodo, 1000);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function  digital_outputs_form_configure(start_ch, no_of_outputs)
{
	for (i=start_ch; i!=64; i+=8)
	{
		if (no_of_outputs > i)
		{
			$("#output" + i + "_" + (i+7)).css("display","block");
			$("#Read_back" + i + "_" + (i+7)).css("display","block");

		}
		else
		{	
			$("#output" + i + "_" + (i+7)).css("display","none");
			$("#Read_back" + i + "_" + (i+7)).css("display","none");	
		}
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function digital_outputs_timer_call(start_ch)
{
	var value = 0;
	var channel = document.getElementsByName("bit");
	
	DAPI.execute(DAPI.CMD.DO_RB, start_ch, "delib_webrequest");
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function init_ad(start_ch)
{
	var count_ad = $("#productcfg_ai").val();
	
	analog_inputs_outputs_navigator_show_hide();
	
	if (is_init == 0)
	{
	$("#adda_mode_select").empty();
	for (i=0; i!=ADDA_MODE_SELECT.text.length; i++)
	{
		$("#adda_mode_select").append(new Option(ADDA_MODE_SELECT.text[i], i));
	}
	}
	is_init = 1;
	
	global_activity_counter = 0;
	

	$("#adda_mode_select").unbind("change");
	$("#adda_mode_select").change(function() {
		window.clearInterval(timer);
		DAPI.execute(DAPI.CMD.AD_MODE, start_ch, 0);
	});
	$("#adda_mode_select").change();
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function analog_inputs_outputs_navigator_show_hide()
{

	var anzahl_ai = $("#productcfg_ai").val();//document.forms[0].productcfg_ai.value;
	var anzahl_ao = $("#productcfg_ao").val();//document.forms[0].productcfg_ao.value;

	if(anzahl_ai>0)
	{
		document.getElementById("navi_analog_input").style.display = "block";
	}
	else
	{	
		document.getElementById("navi_analog_input").style.display = "none";
	}
	if(anzahl_ao>0)
	{
		document.getElementById("navi_analog_output").style.display = "block";
	}
	else
	{	
		document.getElementById("navi_analog_output").style.display = "none";
	}
	
	$("#navi_analog_input_graphic").hide();
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function init_da(start_ch)
{
	global_activity_counter = 0;
	
	analog_inputs_outputs_navigator_show_hide();
	
	
	timerTodo = function () {
		DAPI.execute(DAPI.CMD.DA_RB, start_ch, 0);
		swap_activity();
	};
	
	timer = window.setInterval(timerTodo, 1000);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------		
		
function digital_inputs_outputs_navigator_show_hide()
{

	var anzahl_di = $("#productcfg_di").val();//document.forms[0].productcfg_di.value;
	var anzahl_do = $("#productcfg_do").val();//document.forms[0].productcfg_do.value;
	var anzahl_di_cnt = $("#productcfg_di_cnt").val();// document.forms[0].productcfg_di_cnt.value;

	if(anzahl_di>0)
	{
		document.getElementById("navi_digital_input").style.display = "block";
	}
	else
	{	
		document.getElementById("navi_digital_input").style.display = "none";
	}
	if(anzahl_do>0)
	{
		document.getElementById("navi_digital_output").style.display = "block";
	}
	else
	{	
		document.getElementById("navi_digital_output").style.display = "none";
	}
	if(anzahl_di_cnt>0)
	{
		document.getElementById("navi_digital_input_counter").style.display = "block";
	}
	else
	{	
		document.getElementById("navi_digital_input_counter").style.display = "none";
	}
	
	$("#navi_digital_input_graphic").hide();
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function CreateInput(id)
{
	return "<input type='hidden' id='" + id + "' />";
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function init_pt100(start_ch)
{
	var count_pt100 = $("#productcfg_temp").val();
	
	$("#request").empty();
	for (i=start_ch; i!=(start_ch+16); i++)
	{
		$("#request").append(CreateInput("pt100_ch"+i));
	}
	
	global_activity_counter = 0;
	
	timerTodo = function () {
		DAPI.execute(DAPI.CMD.PT100, start_ch, count_pt100);
		swap_activity();
	};
	
	timer = window.setInterval(timerTodo, 1000);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

var stepper_state = 0;

function init_stepper()
{
	var handle = 0;
	
	var func = function() {
		
		if (stepper_state == 0) 	DapiStepperCommand(handle, 0, DAPI_STEPPER_CMD_GET_POSITION, 0, 0, 0, 0, $("#position1"));
		if (stepper_state == 1) 	DapiStepperCommand(handle, 1, DAPI_STEPPER_CMD_GET_POSITION, 0, 0, 0, 0, $("#position2"));
		
		if (stepper_state == 2) 	DapiStepperCommand(handle, 0, DAPI_STEPPER_CMD_GET_CPU_TEMP, 0, 0, 0, 0, $("#cpu_temp1"));
		if (stepper_state == 3) 	DapiStepperCommand(handle, 1, DAPI_STEPPER_CMD_GET_CPU_TEMP, 0, 0, 0, 0, $("#cpu_temp2"));
		
		if (stepper_state == 4) 	DapiStepperCommand(handle, 0, DAPI_STEPPER_CMD_GET_MOTOR_SUPPLY_VOLTAGE, 0, 0, 0, 0, $("#motor_volt1"));
		if (stepper_state == 5) 	DapiStepperCommand(handle, 1, DAPI_STEPPER_CMD_GET_MOTOR_SUPPLY_VOLTAGE, 0, 0, 0, 0, $("#motor_volt2"));
		
		if (stepper_state == 6) 	DapiStepperCommand(handle, 0, DAPI_STEPPER_CMD_GET_POSITION, 0, 0, 0, 0, $("#position1"));
		if (stepper_state == 7) 	DapiStepperCommand(handle, 1, DAPI_STEPPER_CMD_GET_POSITION, 0, 0, 0, 0, $("#position2"));
		
		if (stepper_state == 8) 	DapiStepperCommand(handle, 0, DAPI_STEPPER_CMD_GET_POSITION, 0, 0, 0, 0, $("#position1"));
		if (stepper_state == 9) 	DapiStepperCommand(handle, 1, DAPI_STEPPER_CMD_GET_POSITION, 0, 0, 0, 0, $("#position2"));
		
		swap_activity();
		stepper_state++;
		
		$("#modul_status").html("OK")
		
		if (stepper_state > 9)		stepper_state = 0;
	};
	
	window.setInterval(func, 1000);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function swap_activity()
{
	if(global_activity_counter==0)
	{
		global_activity_counter=1;
		document.form0.activity.checked = true;
	}
	else
	{
		global_activity_counter=0;
		document.form0.activity.checked = false;
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function navigator_show_hide()
{
	temperature_navigator_show_hide();
	stepper_motor_navigator_show_hide();
	analog_IO_navigator_show_hide();
	digital_IO_navigator_show_hide();
	demo_navigator_show_hide();
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function digital_inputs_outputs_navigator_show_hide()
{
	var anzahl_di = $("#productcfg_di").val();//document.forms[0].productcfg_di.value;
	var anzahl_do = $("#productcfg_do").val();//document.forms[0].productcfg_do.value;
	var anzahl_di_cnt = $("#productcfg_di_cnt").val();//document.forms[0].productcfg_di_cnt.value;

	if(anzahl_di>0)
	{
		document.getElementById("navi_digital_input").style.display = "block";
	}
	else
	{	
		document.getElementById("navi_digital_input").style.display = "none";
	}
	if(anzahl_do>0)
	{
		document.getElementById("navi_digital_output").style.display = "block";
	}
	else
	{	
		document.getElementById("navi_digital_output").style.display = "none";
	}
	if(anzahl_di_cnt>0)
	{
		document.getElementById("navi_digital_input_counter").style.display = "block";
	}
	else
	{	
		document.getElementById("navi_digital_input_counter").style.display = "none";
	}
	
	
	$("#navi_digital_input_graphic").hide();
	/*
	if(anzahl_di>0)
	{
		document.getElementById("navi_digital_input_graphic").style.display = "block";
	}
	else
	{	
		document.getElementById("navi_digital_input_graphic").style.display = "none";
	}
*/
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function digital_IO_navigator_show_hide()
{

	var anzahl_di = $("#productcfg_di").val();// document.forms[0].productcfg_di.value;
	var anzahl_do = $("#productcfg_do").val();// document.forms[0].productcfg_do.value;
	var anzahl_di_cnt = $("#productcfg_di_cnt").val();// document.forms[0].productcfg_di_cnt.value;

	if((anzahl_di==0)&&(anzahl_do==0)&&(anzahl_di_cnt==0))
	{	
		document.getElementById("navi_digital_io").style.display = "none";
	}
	else
	{	
		document.getElementById("navi_digital_io").style.display = "block";
	}

}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function analog_inputs_outputs_navigator_show_hide()
{

	var anzahl_ai = $("#productcfg_ai").val();// document.forms[0].productcfg_ai.value;
	var anzahl_ao = $("#productcfg_ao").val();//document.forms[0].productcfg_ao.value;

	if(anzahl_ai>0)
	{
		document.getElementById("navi_analog_input").style.display = "block";
	}
	else
	{	
		document.getElementById("navi_analog_input").style.display = "none";
	}
	if(anzahl_ao>0)
	{
		document.getElementById("navi_analog_output").style.display = "block";
	}
	else
	{	
		document.getElementById("navi_analog_output").style.display = "none";
	}
	
	$("#navi_analog_input_graphic").hide();
	
	/*
	if(anzahl_ai>0)
	{
		document.getElementById("navi_analog_input_graphic").style.display = "block";
	}
	else
	{	
		document.getElementById("navi_analog_input_graphic").style.display = "none";
	}
	*/

}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function analog_IO_navigator_show_hide()
{

	var anzahl_ai = $("#productcfg_ai").val();//document.forms[0].productcfg_ai.value;
	var anzahl_ao = $("#productcfg_ao").val();//document.forms[0].productcfg_ao.value;

	if((anzahl_ai!=0)&&(anzahl_ao!=0))
	{
		document.getElementById("navi_analog_io").style.display = "block";
	}
	else
	if((anzahl_ai!=0)&&(anzahl_ao==0))
	{	
		document.getElementById("navi_analog_io").style.display = "block";
	}
	else
	if((anzahl_ai==0)&&(anzahl_ao!=0))
	{	
		document.getElementById("navi_analog_io").style.display = "block";
	}
	else
	{
		document.getElementById("navi_analog_io").style.display = "none";			
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function temperature_navigator_show_hide()
{

	var anzahl_temp =  $("#productcfg_temp").val();//document.forms[0].productcfg_temp.value;

	if(anzahl_temp>0)
	{
		document.getElementById("navi_temperature").style.display = "block";
	}
	else
	{	
		document.getElementById("navi_temperature").style.display = "none";
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function demo_navigator_show_hide()
{
/*
	var anzahl_di =  document.forms[0].productcfg_di.value;
	var anzahl_do =  document.forms[0].productcfg_do.value;
	var anzahl_ai = document.forms[0].productcfg_ai.value;
	var anzahl_ao = document.forms[0].productcfg_ao.value;

	if((anzahl_di!=0)&&(anzahl_do!=0))
	{	
		document.getElementById("navi_demo").style.display = "block";
	}
	else
	if((anzahl_di!=0)&&(anzahl_do==0))
	{	
		document.getElementById("navi_demo").style.display = "block";
	}
	else
	if((anzahl_di==0)&&(anzahl_do!=0))
	{	
		document.getElementById("navi_demo").style.display = "block";
	}
	else
	if((anzahl_ai!=0)&&(anzahl_ao!=0))
	{
		document.getElementById("navi_demo").style.display = "block";
	}
	else
	if((anzahl_ai!=0)&&(anzahl_ao==0))
	{	
		document.getElementById("navi_demo").style.display = "block";
	}
	else
	if((anzahl_ai==0)&&(anzahl_ao!=0))
	{	
		document.getElementById("navi_demo").style.display = "block";
	}
	else
	{
		document.getElementById("navi_demo").style.display = "none";
	}*/
}
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

function stepper_motor_navigator_show_hide()
{

	var anzahl_stepper = $("#productcfg_stepp").val();// document.forms[0].productcfg_stepp.value;


	if(anzahl_stepper !=0)
	{
		document.getElementById("navi_stepper_motor").style.display = "block";
		document.getElementById("navi_stepper_motor").style.display = "block";
	}
	else
	{
		document.getElementById("navi_stepper_motor").style.display = "none";
		document.getElementById("navi_stepper_motor").style.display = "none";
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
