
var dict = {};

	$(function() {
	registerWords();
	if (!(getCookieVal("lang"))){
	setLanguage("en");
	var a = (navigator.language || navigator.browserLanguage).toLowerCase();
	if(a=="zh-cn"){
		setLanguage("zh");
	}
	if(a=="fr"){
		setLanguage("fr");
	}
	}
	else{
		var lang = getCookieVal("lang");
		setLanguage(lang);
	}
		
	
	$("#enBtn").bind("click", function() {
		setLanguage("en");
	});
	
	$("#zhBtn").bind("click", function() {
		setLanguage("zh");
	});
	$("#frBtn").bind("click", function() {
		setLanguage("fr");
	});
	
	$("#applyBtn").bind("click", function() {
		alert(__tr("a translation test!"));
	});
});

function setLanguage(lang) {
	var date=new Date();
	var expireDays=30;
	date.setTime(date.getTime()+expireDays*24*3600*1000);
	setCookie("lang=" + lang + "; path=/; expires="+date.toGMTString());
	translate();
}

function getCookieVal(name) {
	var items = document.cookie.split(";");
	for (var i in items) {
		var cookie = $.trim(items[i]);
		var eqIdx = cookie.indexOf("=");
		var key = cookie.substring(0, eqIdx);
		if (name == $.trim(key)) {
			return $.trim(cookie.substring(eqIdx+1));
		}
	}
	return null;
}

function setCookie(cookie) {
	document.cookie = cookie;
}

function translate() {
	loadDict();
	
	$("[lang]").each(function() {
		switch (this.tagName.toLowerCase()) {
			case "input":
				$(this).val( __tr($(this).attr("lang")) );
				break;
			default:
				$(this).text( __tr($(this).attr("lang")) );
		}
	});
}

function __tr(src) {
	return (dict[src] || src);
}

function loadDict() {
	var lang = (getCookieVal("lang") || "en");

	$.ajax({
		async: false,
		type: "POST",
		url: lang + ".json",
		success: function(msg) {
			dict = eval("(" + msg + ")");
		}
	});
}

function registerWords() {
	$("[lang]").each(function() {
		switch (this.tagName.toLowerCase()) {
			case "input":
				$(this).attr("lang", $(this).val());
				break;
			default:
				$(this).attr("lang", $(this).text());
		}
	});
}