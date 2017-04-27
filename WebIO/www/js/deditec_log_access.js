//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//
//
//
//	deditec_log_access.js
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

if (typeof dt == "undefined") {
	this.dt = {};
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

if (typeof dt.log == "undefined") {
	dt.log = {};
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

(function () {
	var that = this;
	this.nodes = {};
	this.buttons = {
		"ALL": true,
		"Scheduler"		: "Scheduler",
		"ETH FW"		: "RO-ETH-FW",
		"Exec Srv"		: "Exec-Srv",
		"Mon"			: "RO-ETH-Mon",
		"DB Srv"		: "Param-Srv",
		"webreq"		: "webrequest",
		"NTP"			: "NTP-Client",
		"BC Srv"		: "BC-Srv",
		"Mail"			: "Sendmail",
		"Usr Srv"		: "User-Mgr-Srv",
		"Custom"		: /^CUST-.+$/i,
		"other"			: false
	};
	// "Firmware Update": "WEBFUPLOAD",
	// "IP Set": "ip_adress_set",
	// "web log": "web-log-access",
	// "Key Handler": "Key_Handler",
	this.tpl = {};
	this.tpl.log_head = "<tr><th class=\"time\">Time</th><th class=\"app\">Application</th><th class=\"info\">Information</th></tr>";
	this.tpl.log_body = function (data) {
		return "<tr><td class=\"time\">" + data[0] + "</td><td class=\"app\">" + data[1] + "</td><td class=\"info\">" + data[2] + "</td></tr>";
	};
	this.info = function (type) {
		// $(dt.log.nodes.log_table).html("<tr><td class=\"status\">" + dt.log.tpl.info[type] + "</td></tr>");
		$(that.nodes.status).html(that.tpl.info[type.toLowerCase()]);
	};
	// loading: "<img src=\"../images/black-anim.gif\" alt=\"Loading...\" />",
	this.tpl.info = {
		ok: "OK",
		loading: "Querying new Log Data...",
		unavilable: "Module unavilable. please try again.",
		invalid: "Error. Module response appears to be invalid. Please try it again.",
		cleared: "Log has been successfully cleared."
	};
	this.tpl.odd_color = "#eeeeee";

	this.todo = {
		RET_ACTION_READ_LOG: "RL",
		RET_ACTION_CLEAR_LOG: "CL"
	}

	this.parser = function () {
		var filtered = [];
		var cmd = dt.log.cmd;
		var all = cmd === true;
		var hidden = cmd === false;
		
		if (typeof cmd == "string") {
			cmd = cmd.toLowerCase();
		}
		
		if (hidden) {
			var apps = [];
			var regexapps = [];
			
			$.each(that.buttons, function (i, cmd) {
				if (typeof cmd == "string") {
					apps.push(cmd);
				} else if (typeof cmd == "object") {
					regexapps.push(cmd);
				}
			});
			
			apps = apps.join("|").toLowerCase();
		}
		for (var i = 0; i < that.data.length; i++) {
			var time = that.data[i].substring(0, 19);
			var line = that.data[i].substring(20, that.data[i].length);
			var ind = line.indexOf("|");
			
			if (ind == -1) {
				continue;
			}
			
			if (!hidden) {
				var app = line.substr(0, ind);
				if (!all && (typeof cmd == "object" ? !(cmd.test(app)) : (cmd != app.toLowerCase()))) {
					continue;
				}
				var info = line.substring(ind + 1, line.length);
				filtered.push([time, app, info]);
				continue;
			}
			
			var app = line.substr(0, ind);
			
			if (apps.indexOf(app.toLowerCase()) == -1) {
				var rxfiltered = false;
				for (var i2 = 0; i2 < regexapps.length; i2++) {
					if (regexapps[i2].test(app)) {
						rxfiltered = true;
						break;
					}
				}
				if (!rxfiltered) {
					var info = line.substring(ind + 1, line.length);
					filtered.push([time, app, info]);
				}
			}
		}
		
		var html = "";
		
		for (var i = 0; i < filtered.length; i++) {
			html += that.tpl.log_body(filtered[i]);
		}
		
		if (html.length == 0) {
			$(that.nodes.log_table).html("<tr><td class=\"status\">the Log does not contain any Data for this Tab</td></tr>");
		} else {
			$(that.nodes.log_table).html(that.tpl.log_head + html);
		}
		
		$("tr:nth-child(even)", that.nodes.log_table).css("background-color", that.tpl.odd_color);
	}
}).call(dt.log);

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

// runs as soon as the DOM is ready (equal to <body onload=""> but way faster because it does not wait for images to get loaded)
$((function () {
	var that = this;
	return function () {
		that.nodes.log_table = $("#log_tbody")[0];
		that.nodes.status = $("#modul_status")[0];

		var log_nav_click = function () {
			that.nodes.log_active.className = "";
			this.className = "act";
			that.nodes.log_active = this;
			that.cmd = this.log_cmd;
			that.parser();
		}

		that.nodes.log_nav = $("#log_navi")[0];

		$.each(that.buttons, function (i, cmd) {
			var li = document.createElement("li");
			if (cmd === true) {
				li.className = "act";
				that.nodes.log_active = li;
				that.cmd = cmd;
			}
			li.log_cmd = cmd;

			li.appendChild(document.createTextNode(i));
			$(li).click(log_nav_click);
			that.nodes.log_nav.appendChild(li);
		});

		that.read_1000();
	};
}).call(dt.log));

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

dt.log.query = function (Name, par1, par2, par3, par4, todo) {
	dt.log.info("loading");
	$.ajax ({
		url: "/cgi-bin/web-log-access",
		type: "GET",
		mimeType: "text/plain",
		timeout: "5000",
		data: {
			cmd: Name,
			par1: par1,
			par2: par2,
			par3: par3,
			par4: par4,
			job: (new Date()).getTime()
		},
		success: function (todo) {
			return function (data) {
				dt.log.ajax_request_response_handler(todo, data);
			};
		}(todo),
		error: function () {
			// LOG_status("module unavilable. please try again.");
			dt.log.info("unavilable");
		}
	})
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

dt.log.ajax_request_response_handler = (function () {
	var that = this;
	return function (todo, data) {
		if (data.substr(0, 2).toUpperCase() != "OK") {
			that.info("invalid");
			return;
		}
		switch (todo) {
			case that.todo["RET_ACTION_CLEAR_LOG"]:
				that.data = [];
				that.parser();
				that.info("cleared");
				break;
			case that.todo["RET_ACTION_READ_LOG"]:
				that.data = data.substring(3, data.length).replace(/\r/g, "").split("\n").reverse();
				that.parser();
				that.info("OK");
				break;
			default:
				break;
		}
	}
}).call(dt.log);

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

dt.log.read_1000 = function () {
	dt.log.query('LOGRead1000',0,0,0,1,dt.log.todo["RET_ACTION_READ_LOG"]);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

dt.log.read = function () {
	dt.log.query('LOGRead',0,0,0,1,dt.log.todo["RET_ACTION_READ_LOG"]);
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

dt.log.clear = function () {
	var hinweis = confirm("Do you really want to clear the Logbook?");

	if(hinweis==false) {
		top.close;
	} else {
		dt.log.query('LOGClear',0,0,0,1,dt.log.todo["RET_ACTION_CLEAR_LOG"]);
	}
}

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
