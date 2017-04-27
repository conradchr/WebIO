var webrequest_busy = false;

function Statistic_timer_start()
{
	setInterval(GetJobStatus,1000);
}

function GetJobStatus() // TODO FEHLER JS zwei multiple webrequests statt einem werden benötigt
{
	if(webrequest_busy == false)
	{
		webrequest_busy = true;
	
		var key_and_element_string = '';
	
		// =======================================================================
		// active
		for(var i = 0; i < 10; i++)
		{
			key_and_element_string += "SJR0000"+(i)+";job"+(i)+"_activ;";
			key_and_element_string += "SJR0010"+(i)+";job"+(i)+"_timer;";
			key_and_element_string += "SJR0020"+(i)+";job"+(i)+"_min;";
			key_and_element_string += "SJR0030"+(i)+";job"+(i)+"_max;";
			key_and_element_string += "SJR0040"+(i)+";job"+(i)+"_count_open;";
			key_and_element_string += "SJR0050"+(i)+";job"+(i)+"_count_ok;";
			key_and_element_string += "SJR0060"+(i)+";job"+(i)+"_count_error;";
			key_and_element_string += "SJR0070"+(i)+";job"+(i)+"_count_delib_error;";
			key_and_element_string += "SJR0080"+(i)+";job"+(i)+"_count_readback;";
		}
		
		// =======================================================================
		// dest open
		for(var i = 0; i < 5; i++)
		{
			key_and_element_string += "SDR0000"+(i)+";dest"+(i)+"_open;";
			key_and_element_string += "SDR0010"+(i)+";dest"+(i)+"_min;";
			key_and_element_string += "SDR0020"+(i)+";dest"+(i)+"_max;";
			key_and_element_string += "SDR0030"+(i)+";dest"+(i)+"_count_open;";
			key_and_element_string += "SDR0040"+(i)+";dest"+(i)+"_count_ok;";
			key_and_element_string += "SDR0050"+(i)+";dest"+(i)+"_count_error;";
			key_and_element_string += "SDR0060"+(i)+";dest"+(i)+"_count_delib_error;";
			key_and_element_string += "SDR0070"+(i)+";dest"+(i)+"_count_readback;";
		}
		
		//alert(key_and_element_string.length);
		webrequest_get_and_put_to_field_multiple(server_id.ro_eth_m2m, key_and_element_string, webrequest_option.none, error_option.only_alert, function() {
			webrequest_busy = false;
		});
	}
}




