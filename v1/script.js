
var dict = {};

	$(function() {
		$('.goto').click(function() {
		   window.location = "http://kewei.me/v2";
		});
	$(".alert").alert();
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
});

function setLanguage(lang) {
	var date=new Date();
	var expireDays=15;
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
				$(this).text( __tr($(this).attr("lang")) );	
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
			console.log(msg);
			dict = eval( msg );
			console.log(dict);
		}
	});
}

function registerWords() {
	$("[lang]").each(function() {
				$(this).attr("lang", $(this).text());
	});
}