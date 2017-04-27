//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
//
//
//
//	deditec_usr_mgr_gui.js
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
var init_usr_mgr_linux = function(){
//$(function(){
	var arrayIndex = function (array, needle) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] == needle) return i;
		}
		return -1;
	}

	var initrightmgr = function(allrights){
		var userlist = $("#userlist");
		var modul_status = $("#modul_status");
		if (userlist.length == 0 || modul_status.length == 0) {
			alert("user manager failed to initialize because the web template appears to be broken or uncompletely loaded.");
			return;
		}
		userlist = userlist[0];

		var userdata = {};

		var list = document.createElement("div");
		var ctrl = document.createElement("div");
		
		var rightmgr = document.createElement("div");
		rightmgr.show = false;
		rightmgr.scope = {
			buttons: [],
			left: document.createElement("ul"),
			right: document.createElement("ul"),
			leftscroll: document.createElement("div"),
			rightscroll: document.createElement("div"),
			update: document.createElement("button"),
			current: ""
		};
		rightmgr.className = "rightmgr";
		rightmgr.scope.left.className = "left";
		rightmgr.scope.right.className = "right";
		rightmgr.scope.update.className = "update";
		rightmgr.scope.update.appendChild(document.createTextNode("update"));
		
		var leftbox = document.createElement("div");
		leftbox.className = "leftbox";
		var lefttitlebox = document.createElement("div");
		lefttitlebox.appendChild(document.createTextNode("available rights:"));
		lefttitlebox.className = "title";
		leftbox.appendChild(lefttitlebox);
		leftbox.appendChild(rightmgr.scope.leftscroll);
		
		var rightbox = document.createElement("div");
		rightbox.className = "rightbox";
		var righttitlebox = document.createElement("div");
		righttitlebox.appendChild(document.createTextNode("set rights:"));
		righttitlebox.className = "title";
		rightbox.appendChild(righttitlebox);
		rightbox.appendChild(rightmgr.scope.rightscroll);
		
		rightmgr.appendChild(leftbox);
		rightmgr.appendChild(rightbox);
		rightmgr.appendChild(rightmgr.scope.update);
		rightmgr.scope.leftscroll.appendChild(rightmgr.scope.left);
		rightmgr.scope.leftscroll.className = "leftscroll";
		rightmgr.scope.rightscroll.appendChild(rightmgr.scope.right);
		rightmgr.scope.rightscroll.className = "rightscroll";
		
		var rightmgrliclick = function () {
			var rights;
			var cur = rightmgr.scope.current;
			if (cur.value == "none") {
				cur.value = "";
			}
			rights = cur.value.length > 0 ? cur.value.split(",") : [];
			
			if (this.parentNode == rightmgr.scope.left) {
				rights = rights.concat([this.rightname]);
				rightmgr.scope.right.appendChild(this);
			} else {
				rights.splice(arrayIndex(rights, this.rightname),1);
				if (rights.length == 0) rights = ["none"];
				rightmgr.scope.left.appendChild(this);
			}
			this.style.backgroundColor = "transparent";
			cur.value = rights.join(",");
		}
		
		for (var i = 0; i < allrights.length; i++) {
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(allrights[i]));
			li.rightname = allrights[i];
			rightmgr.scope.buttons.push(li);
			$(li).click(rightmgrliclick);
			$(li).mouseover(function() {
				this.style.backgroundColor = "#cccccc";
			});
			$(li).mouseout(function() {
				this.style.backgroundColor = "transparent";
			});
		}
		
		$(rightmgr.scope.update).click(function() {
			var cur = rightmgr.scope.current;
			if (cur.value === userdata[cur.username]) {
				alert(tpl.text.rights_equal);
				return;
			}
			if (!confirm(tpl.text.confirm.rights(cur.username, userdata[cur.username], cur.value))) return;
			tpl.status("telling server to change rights...");
			dt.usrmgr.set_rights(cur.username, cur.value, function(data, error) {
				if (error) {
					tpl.status("right change failed");
					return;
				}
				tpl.status("right change succeeded");
				userdata[cur.username] = cur.value;
			});
		});
		
		var rightmgrdraw = function (optionnode, rightnode) {
			rightmgr.scope.current = rightnode;
			var rights = rightnode.value.split(",");
			for (var i = 0; i < rightmgr.scope.buttons.length; i++) {
				// has right -> left
				if (arrayIndex(rights, rightmgr.scope.buttons[i].rightname) != -1) {
					rightmgr.scope.right.appendChild(rightmgr.scope.buttons[i]);
				} else {
					rightmgr.scope.left.appendChild(rightmgr.scope.buttons[i]);
				}
			}
			
			rightmgr.show = true;
			optionnode.insertBefore(rightmgr, rightnode.nextSibling.nextSibling);
			
		}

		userlist.appendChild(list);
		userlist.appendChild(ctrl);
		list.className = "list";
		ctrl.className = "ctrl";

		// ------------------------------

		var oopts = [];

		var tpl = {};

		tpl.text = {
			rights: "Rights:",
			pwd: "Password:",
			del: "Remove",
			add: "Add User",
			user_exists: "the user you wanted to add already exists within the database.",
			rights_equal: "rights equal to already stored rights.",
			empty: "you cannot save empty values.",
			emptypwd: "you cannot save empty passwords.",
			prompt: {
				usr: "Please write down the name of the user you want to add.",
				rights: "Please write down wich rights that user has to have.",
				pwd: "Please write down the password for that new user."
			},
			confirm: {
				rights: function(username, oldr, newr){return"do you really want to update the rights of "+username+"?\n\nold rights: "+oldr+"\nnew rights: "+newr},
				pwd: function(username){return"do you really want to change the password of "+username+"?"},
				user: function(username){return"do you really want to delete the user "+username+"?"}
			}
		};

		tpl.status = function (message) {
			modul_status.html(message);
		}

		tpl.adduser = function (username, rights, list) {
			// --------------------------------------------------------
			var container = document.createElement("div");
			container.className = "container";
			var usr = document.createElement("div");
			container.appendChild(usr);
			usr.className = "user";

			var user = document.createElement("div");
			user.className = "username";
			user.appendChild(document.createTextNode(username));
			usr.appendChild(user);

			var terminator = document.createElement("button");
			terminator.appendChild(document.createTextNode(tpl.text.del));
			terminator.className = "terminator";
			usr.appendChild(terminator);

			var options = document.createElement("div");
			options.className = "options";
			options.open = false;

			terminator.trm = container;

			options.appendChild(document.createTextNode(tpl.text.rights));

			var right = document.createElement("input");
			right.value = rights;
			right.disabled = true;
			right.className = "disabled";
			right.username = username;
			options.appendChild(right);

			var rightupdate = document.createElement("button");
			rightupdate.appendChild(document.createTextNode("edit"));
			options.appendChild(rightupdate);

			options.appendChild(document.createElement("br"));
			var spacer = document.createElement("div");
			spacer.className = "spacer";
			options.appendChild(spacer);

			options.appendChild(document.createTextNode(tpl.text.pwd));

			var pwd = document.createElement("input");
			pwd.type = "password";
			options.appendChild(pwd);

			var pwdupdate = document.createElement("button");
			pwdupdate.appendChild(document.createTextNode("set"));
			options.appendChild(pwdupdate);

			user.option = oopts.length;
			options.usr = usr;
			oopts.push(options);
			
			// --------------------------------------------------------

			$(terminator).click(function(){
				if (!confirm(tpl.text.confirm.user(username))) return;
				// this.opt, this.usr
				var that = this;
				tpl.status("telling server to delete user...");
				dt.usrmgr.del(username, function(data, error) {
					if (error) {
						tpl.status("request to delete user failed");
						return;
					}
					tpl.status("user deleted successfully");
					delete userdata[username];
					list.removeChild(that.trm);
				});
			});

			// --------------------------------------------------------

			$(user).click(function(){
				if (rightmgr.show) {
					rightmgr.show = false;
					rightmgr.parentNode.removeChild(rightmgr);
				}
				
				for (var i = 0; i < oopts.length; i++) {
					if (i != this.option && oopts[i].open) {
						$(oopts[i]).hide();
						oopts[i].open = false;
						oopts[i].usr.className = "user";
					}
				}
				var option = oopts[this.option];
				if (option.open) {
					$(option).hide();
					option.open = false;
					option.usr.className = "user";
				} else {
					$(option).show();
					option.open = true;
					option.usr.className = "user open";
				}
			});

			// --------------------------------------------------------

			$(rightupdate).click(function() {
				if (rightmgr.show) {
					rightmgr.show = false;
					rightmgr.parentNode.removeChild(rightmgr);
				} else {
					rightmgrdraw(options, right);
				}
			});

			// --------------------------------------------------------

			$(pwdupdate).click(function() {
				if (pwd.value.length == 0) {
					alert(tpl.text.empty);
					return;
				}
				if (!confirm(tpl.text.confirm.pwd(username))) return;
				tpl.status("telling server to change password...");
				dt.usrmgr.set_password(username, pwd.value, function(data, error) {
					if (error) {
						tpl.status("password change failed");
						tpl.status(data);
						return;
					}
					tpl.status("password change succeeded");
					pwd.value = "";
				});
			});

			// --------------------------------------------------------

			container.appendChild(usr);
			container.appendChild(options);
			list.appendChild(container);
		};

		// ------------------------------

		var addusr = document.createElement("button");
		addusr.appendChild(document.createTextNode(tpl.text.add));

		$(addusr).click(function(){
			var username = prompt(tpl.text.prompt.usr, "");
			if (username === null || username.length == 0) return false;
			for (var i in userdata) {
				if (i.toLowerCase() == username.toLowerCase()) {
					alert(tpl.text.user_exists);
					return false;
				}
			}
			// var rights = prompt(tpl.text.prompt.rights, "");
			// if (rights === null || rights.length == 0) return false;
			var password = prompt(tpl.text.prompt.pwd, "");
			if (password === null || password.length == 0) {
				alert(tpl.text.emptypwd);
				return false;
			}
			var /*password = false, */rights = "none";

			tpl.status("telling server to add user...");

			dt.usrmgr.add(username, password, rights, function(data, error) {
				if (error) {
					tpl.status("failed to add new user ("+username+")");
					return;
				}
				tpl.status("new user added successfully");
				userdata[username] = rights;
				tpl.adduser(username, rights, list);
			});
		});

		ctrl.appendChild(addusr);

		// ------------------------------

		tpl.status("requesting userlist... received ");
		var count = document.createTextNode(0);
		modul_status.append(count);
		modul_status.append(document.createTextNode(" users..."));
		
		dt.usrmgr.list(function(data, error) {
			if (error) {
				tpl.status("requesting userlist failed with error: " + data);
				return;
			}
			tpl.status("requesting userlist succeeded");

			userdata = data;

			$.each(data, function (username, rights) {
				tpl.adduser(username, rights, list);
			});
		}, function(){
			count.nodeValue = 1 + parseInt(count.nodeValue, 10);
		});

		// ------------------------------

	};


	webrequest_get(server_id.param_server, "config-usr-mgr-rights-list", webrequest_option.none, error_option.only_alert, function(data, error) {
		if (typeof error != "undefined") {
			$("#modul_status").html("failed to get rights list from database");
			return;
		} else {
			initrightmgr(data.replace(/[\r\n]/gi, "").split(","));
			// var allrights = ["mon", "io", "conf", "user", "admin", "custom"];
		}
	});

//});
};