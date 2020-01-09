!function (e, t, n, r) {
	function s() { try { var e; if ((e = "string" == typeof this.response ? JSON.parse(this.response) : this.response).url) { var n = t.getElementsByTagName("script")[0], r = t.createElement("script"); r.async = !0, r.src = e.url, n.parentNode.insertBefore(r, n) } } catch (e) { } } var o, p, a, i = [], c = []; e[n] = { init: function () { o = arguments; var e = { then: function (t) { return c.push({ type: "t", next: t }), e }, catch: function (t) { return c.push({ type: "c", next: t }), e } }; return e }, on: function () { i.push(arguments) }, render: function () { p = arguments }, destroy: function () { a = arguments } }, e.__onWebMessengerHostReady__ = function (t) { if (delete e.__onWebMessengerHostReady__, e[n] = t, o) for (var r = t.init.apply(t, o), s = 0; s < c.length; s++) { var u = c[s]; r = "t" === u.type ? r.then(u.next) : r.catch(u.next) } p && t.render.apply(t, p), a && t.destroy.apply(t, a); for (s = 0; s < i.length; s++)t.on.apply(t, i[s]) }; var u = new XMLHttpRequest; u.addEventListener("load", s), u.open("GET", r + "/loader.json", !0), u.responseType = "json", u.send()
}(window, document, "Bots", "http://flights-bot.herokuapp.com/bots-client-sdk-js");

function loadAppId() {
	var appId = window.localStorage.getItem("appId");
	if (appId) {
		document.getElementById("appId").value = appId;
	}
}

function initApp(e) {
	//e.preventDefault();
	//console.log('Init Bots SDK');
	var appId = window.localStorage.getItem("appId");
	initBots(appId)
		.then(function () {
			//console.log("init complete");
			document.getElementById("loader").style.display = "none";
		})
		.catch(function (err) {
			console.log(err);
		});
	document.getElementById("appId").value = appId;
}

function saveAppId(e) {
	e.preventDefault();
	let appId = document.getElementById("appId").value;
	// console.log('Validate appId', appId);
	// validate app id
	initBots(appId)
		.then(function () {
			// console.log('AppId is valid');
			window.localStorage.setItem("appId", appId);
			window.location.href = "home.html";
			document.getElementById("loader").style.display = "none";
		})
		.catch(function (err) {
			document.getElementById("loader").style.display = "none";
			document.getElementsByClassName("error")[0].style.display = 'block';
			// console.log('AppId validating error', err);
		});
}

function editAppId(e) {
	Bots.destroy()
	e.preventDefault();
	let appId = document.getElementById("appId").value;
	// console.log('Validate appId', appId);
	// validate app id
	initBots(appId)
		.then(function () {
			// console.log('AppId is valid');
			window.localStorage.setItem("appId", appId);
			document.getElementById("loader").style.display = "none";
			document.getElementById("saveButton").disabled = false;
		})
		.catch(function (err) {
			initApp(e)
			document.getElementById("loader").style.display = "none";
			document.getElementsByClassName("error")[0].style.display = 'block';
			// console.log('AppId validating error', err);
			document.getElementById("saveButton").disabled = false;
		});
}

function loadChat(e) {
	Bots.open()
	document.getElementById("openChatButton").setAttribute("disabled", true)
}

function clearChat(e) {
	e.preventDefault();
	var keys = Object.keys(localStorage);
	for (var i = 0; i < keys.length; i++) {
		if (keys[i] === 'appId') {
			continue;
		}
		localStorage.removeItem(keys[i]);
	}
	location.reload();
}


function initBots(appId) {
	return Bots.init({
		appId: appId,

		businessName: 'Oracle, MCE',
		businessIconUrl: '/images/oracle-o-logo.png',

		customColors: {
			brandColor: '286090',
		},

		customText: {
			headerText: 'OMCE, How can we help?',
			introductionText: 'Mobile Cloud Enterprise',
		}
	}).then(function (res) {
		Bots.updateUser(
			{
				"givenName": "John",
				"surname": "Snow",
				"email": "john.snow@winterfell.com",
				"properties": {
					"smoochCustomVariable1": "Lord",
					"smoochCustomVariable2": "Commander"
				}
			}
		).catch(function (err) {
			console.error(err);
		});
	});
}

function saveChanges(e) {
	e.preventDefault()
	var file = document.getElementById("getVal").files[0];
	var reader = new FileReader();
	reader.onloadend = function(){
			document.getElementById('body-elem')
				.style.backgroundImage = "url(" + reader.result + ")"; 
			document.getElementById('configuration-form')
				.style.display = "none";
			document.getElementById('cp-banner')
				.style.display = "none";
			document.getElementById('return')
				.style.display = "block";
	}
	if(file){
			reader.readAsDataURL(file);
	}else{
	}
}

function revertBackground(e) {
	document.getElementById('body-elem')
		.style.backgroundImage = "none"; 
	document.getElementById('configuration-form')
		.style.display = "unset";
	document.getElementById('cp-banner')
		.style.display = "block";
	document.getElementById('return')
		.style.display = "none";
}