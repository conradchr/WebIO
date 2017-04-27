var dt = dt || {}

if (!String.format) {
    String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) { 
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

dt.gui = {

    enum: {
        viewType: {
            TEXTBOX: 0,
            SWITCH: 1,
            SELECT: 2,
            SPINNER: 3,

            WARNING: 10
        }
    },

    navi: {
        top : 0,
        left : 0
    },

    navigation: [
        config = {
            name: "Configuration",
            items: [
                "General",
                "Network Configuration",
                "Network time (NTP)",
                "HTTP-Server",
                "Mail-Server",
                "User-Manager",
                "FW-Update",
                "Log's",
                "Status / Reboot",
                "Security"
            ],
        },

        io = {
            name: "In-/Outputs",
            items: []
        }
    ],

    

    // --------------------------------
    // --------------------------------
    setPage: function (navi) {
        if (typeof (navi) != "undefined")
        {
            this.navi = navi;
        }
        
        this.setNavi();
        this.setContent();
    },

    // --------------------------------
    // --------------------------------
    createNavi: function (top, left, isTop) {
        return {
            top: top,
            left: left,
            isTop: isTop
        };
    },

    // --------------------------------
    // --------------------------------
    setNavi: function () {
        var getNavi = function (name, nav) {
            //alert(String.format("{0}\nname: {1}\nnav: ( {2}, {3} )", (nav.isTop ? "TOP" : "LEFT"), name, nav.top, nav.left));
            var content = "<li>";
            if ((nav.isTop && (nav.top == dt.gui.navi.top)) || (!nav.isTop && (nav.left == dt.gui.navi.left))) {
                content = "<li class='active'>";
            }
            content += "<a href='javascript: dt.gui.setPage(dt.gui.createNavi("+ nav.top +", "+ nav.left+"));' >" + name + "</a>";
            content += "</li>";
            return content;
        }
        
        // top
        $("#topnav").empty();
        var topnav = $("<ul/>");
        $.each(this.navigation, function (index, value) {
            //alert(index + ": " + value);
            topnav.append(getNavi(dt.gui.navigation[index].name, dt.gui.createNavi(index, 0, true)));
            $("#topnav").append(topnav);
        });
        
        
        // left
        $("#left").empty();
        var leftnav = $("<ul class='level1' />");
        $.each(this.navigation[this.navi.top].items, function (index, value) {
            leftnav.append(getNavi(value, dt.gui.createNavi(dt.gui.navi.top, index, false)));
            $("#left").append(leftnav);
        });
    },
    

    // --------------------------------
    // --------------------------------
    setContent: function () {
        // setzt den content bereich auf die höhe von der linken navi
        $("#right").css('min-height', parseInt($("#left").css("height")) + 60);

        $("#content").empty();
        $("#content").append("<h1>" + this.navigation[this.navi.top].items[this.navi.left] + "</h1>");
        $("#content").append("<div class='general'></div>");
        $(".general").append("<div id='content-height'></div>");

        switch (this.navi.top)
        {
            // --------------------------------
            // Configuration
            case 0:

                switch (this.navi.left)
                {
                    // --------------------------------
                    // General
                    case 0:
                        $("#content-height").append(this.createView("a", "cfg_ip", this.enum.viewType.TEXTBOX));
                        $("#content-height").append(this.createView("b", "cfg_ip", this.enum.viewType.SWITCH));
                        break;

                    // --------------------------------
                    // Network Configuration
                    case 1:
                        $("#content-height").append(this.createView("MAC", "cfg_mac",  this.enum.viewType.TEXTBOX));
                        $("#content-height").append(this.createView("Obtain IP address automatically (DHCP)", "cfg_dhcp", this.enum.viewType.SWITCH));
                        $("#content-height").append(this.createView("IP adress", "cfg_ip", this.enum.viewType.TEXTBOX));
                        $("#content-height").append(this.createView("Port", "cfg_port", this.enum.viewType.TEXTBOX));
                        $("#content-height").append(this.createView("Netmask", "cfg_netmask", this.enum.viewType.TEXTBOX));
                        $("#content-height").append(this.createView("Gateway", "cfg_gateway", this.enum.viewType.TEXTBOX));
                        $("#content-height").append(this.createView("aa", "cfg_ip", this.enum.viewType.WARNING));


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

                    // --------------------------------
                    // Network time (NTP)
                    case 2:
                        $("#content-height").append(this.createView("NTP active", "cfg_ntp_active", this.enum.viewType.SWITCH));
                        $("#content-height").append(this.createView("NTP server", "cfg_ntp_server", this.enum.viewType.TEXTBOX));
                        $("#content-height").append(this.createView("NTP port", "cfg_ntp_port", this.enum.viewType.TEXTBOX));


                } // switch (this.navi.left)
                break;

        }


    },

    // --------------------------------
    // --------------------------------
    createView: function (label, id,  type) {
        var content = String.format("<div class'{0}'>", id);

        if (type != this.enum.viewType.WARNING)
        {
            content += String.format("<div id='content-left'>{0}:</div>", label);
        }

        switch (type) {

            case this.enum.viewType.TEXTBOX:
                content += String.format("<input type='text' size='40' id='{0}' text='{1}' />", id, id);
                break;

            case this.enum.viewType.SWITCH:
                content += "<label class='dt_switch'>";
                content += String.format("<input type='checkbox' id='{0}' />", id);
                content += "<span></span></label>";
                break;

            case this.enum.viewType.WARNING:
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