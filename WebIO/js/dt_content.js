
var dbg = {
    log_enable: true,
    alert_enabled: true,

    log: function (text) {
        if (dbg.log_enable) {
            console.log(text);
        }
    },

    alert: function (text) {
        if (dbg.alert_enabled) {
            alert(text);
        }
    },
};



// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

//var dt = dt || {}
//dt.gui = {

var content = content || {
    groups: [
        config = {
            text: "Configuration",
            pages: [
                general = {
                    text: "General"
                    
                },
                general = { text: "Network Configuration" },
                general = { text: "Network time (NTP)" },
                general = { text: "HTTP-Server" },
                general = { text: "Mail-Server" },
                general = { text: "User-Manager" },
                general = { text: "FW-Update" },
                general = { text: "Log's" },
                general = { text: "Status / Reboot" },
                general = { text: "Security" },
            ], // items
        }, // config
    ], // page
};
    


var gui = gui || {

    navi: {
        group: 0,
        page: 0,
        set : function(grp, pg){
            this.group = grp;
            this.page = pg;
        },
    },

/*
    Navi: function (top, left) {
        return {
            group: top,
            page left,
        };
    },
    navi: {},
*/

    View: {
        TEXTBOX: 0,
        SWITCH: 1,
        SELECT: 2,
        SPINNER: 3,

        WARNING: 10
    },







    

    

    // ----------------------------------------------------------------------------
    // ----------------------------------------------------------------------------

    init: function () {

        return;
        gui.setPage(gui.Navi(0, 0, true));
    },
    

    // ----------------------------------------------------------------------------
    // ----------------------------------------------------------------------------



    // ------------------------------------
    // ------------------------------------
    setPage: function (navi) {
        gui.navi = navi;
        gui.setNavi();
        //gui.setContent();
    },


    // ------------------------------------
    // ------------------------------------
    setNavi: function () {
        /*
                var getItem2 = function (name, nav) {
                    //alert(String.format("{0}\nname: {1}\nnav: ( {2}, {3} )", (nav.isTop ? "TOP" : "LEFT"), name, nav.top, nav.left));
                    var item = "<li>";
                    if ((nav.isTop && (nav.top == gui.navi.top)) || (!nav.isTop && (nav.left == gui.navi.left))) {
                        item = "<li class='active'>";
                    }
                    item += "<a href='javascript: gui.setPage(gui.Navi(" + nav.top + ", " + nav.left + "));' >" + name + "</a>";
                    item += "</li>";
                    return item;
                }
        
                // top navi
                $("#topnav").empty();
                var topnav = $("<ul/>");
                $.each(gui.Content, function (index, value) {
                    //alert(index + ": " + value);
                    topnav.append(getItem2(gui.Content[index].name, gui.Navi(index, 0, true)));
                    $("#topnav").append(topnav);
                });
        
        
                // left navi
                $("#left").empty();
                var leftnav = $("<ul class='level1' />");
                $.each(gui.Content[gui.navi.top].items, function (index, value) {
                    leftnav.append(getItem2(value, gui.Navi(gui.navi.top, index, false)));
                    $("#left").append(leftnav);
                });
            */
	
        // top navi












        
        var show = function () {
            var item = "<li>";
            if ((nav.isTop && (nav.top == gui.navi.top)) || (!nav.isTop && (nav.left == gui.navi.left))) {
                item = "<li class='active'>";
            }
            item += "<a href='javascript: gui.setPage(gui.Navi(" + nav.top + ", " + nav.left + "));' >" + name + "</a>";
            item += "</li>";
            return item;
        };
	
        $("#topnav").empty();
        $.each(content.groups, function (groupIndex, group) {
            // groups
            dbg.log(String.format("{0}: text={1}", groupIndex, group.text));
            $.each(group.pages, function (pageIndex, page) {
                // pages
                dbg.log(String.format("{0}: text={1} -> {2}: text={3}", groupIndex, group.text, pageIndex, page.text));
            });
        });
    },


	


    // ------------------------------------
    // ------------------------------------
    setContent: function () {
        // setzt den content bereich auf die höhe von der linken navi
        $("#right").css('min-height', parseInt($("#left").css("height")) + 60);

        $("#content").empty();
        $("#content").append("<h1>" + gui.Content[gui.navi.top].items[gui.navi.left] + "</h1>");
        $("#content").append("<div class='general'></div>");
        $(".general").append("<div id='content-height'></div>");

        switch (gui.navi.top) {
            // ------------------------------------
            // Configuration
            case 0:

                switch (gui.navi.left) {
                    // ------------------------------------
                    // General
                    case 0:
                        $("#content-height").append(gui.createView("a", "cfg_ip", gui.View.TEXTBOX));
                        $("#content-height").append(gui.createView("b", "cfg_ip", gui.View.SWITCH));
                        break;

                        // ------------------------------------
                        // Network Configuration
                    case 1:
                        $("#content-height").append(gui.createView("MAC", "cfg_mac", gui.View.TEXTBOX));
                        $("#content-height").append(gui.createView("Obtain IP address automatically (DHCP)", "cfg_dhcp", gui.View.SWITCH));
                        $("#content-height").append(gui.createView("IP adress", "cfg_ip", gui.View.TEXTBOX));
                        $("#content-height").append(gui.createView("Port", "cfg_port", gui.View.TEXTBOX));
                        $("#content-height").append(gui.createView("Netmask", "cfg_netmask", gui.View.TEXTBOX));
                        $("#content-height").append(gui.createView("Gateway", "cfg_gateway", gui.View.TEXTBOX));
                        $("#content-height").append(gui.createView("aa", "cfg_ip", gui.View.WARNING));


                        $("#cfg_mac").attr("disabled", true);
                        $("#cfg_dhcp").change(function () {
                            if ($(this).is(':checked')) {
                                $("#cfg_ip").attr("disabled", true);
                                $("#cfg_netmask").attr("disabled", true);
                                $("#cfg_gateway").attr("disabled", true);
                            }
                            else {
                                $("#cfg_ip").removeAttr("disabled");
                                $("#cfg_netmask").removeAttr("disabled");
                                $("#cfg_gateway").removeAttr("disabled");
                            }
                        });
                        break;

                        // ------------------------------------
                        // Network time (NTP)
                    case 2:
                        $("#content-height").append(gui.createView("NTP active", "cfg_ntp_active", gui.View.SWITCH));
                        $("#content-height").append(gui.createView("NTP server", "cfg_ntp_server", gui.View.TEXTBOX));
                        $("#content-height").append(gui.createView("NTP port", "cfg_ntp_port", gui.View.TEXTBOX));


                } // switch (gui.navi.left)
                break;

        }


    },

    // ------------------------------------
    // ------------------------------------
    createView: function (label, id, type) {
        var content = String.format("<div class'{0}'>", id);

        if (type != gui.View.WARNING) {
            content += String.format("<div id='content-left'>{0}:</div>", label);
        }

        switch (type) {

            case gui.View.TEXTBOX:
                content += String.format("<input type='text' size='40' id='{0}' text='{1}' />", id, id);
                break;

            case gui.View.SWITCH:
                content += "<label class='dt_switch'>";
                content += String.format("<input type='checkbox' id='{0}' />", id);
                content += "<span></span></label>";
                break;

            case gui.View.WARNING:
                content = "<div class='ui-widget'>";
                content += "<div class='ui-state-highlight ui-corner-all' style='margin-top: 20px; padding: 0 .7em;'>";
                content += "<p><span class='ui-icon ui-icon-info' style='float: left; margin-right: .3em;'></span>";
                content += "<strong>Warning</strong> Test</p>";
                content += "</div></div>";
                break;
        }

        content += "<br></div>";
        return content;
    },
};



/*
$("#accordion").accordion();

<div id="accordion">
    <h3>First</h3>
    <div>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>
    <h3>Second</h3>
    <div>Phasellus mattis tincidunt nibh.</div>
    <h3>Third</h3>
    <div>Nam dui erat, auctor a, dignissim quis.</div>
</div>
*/