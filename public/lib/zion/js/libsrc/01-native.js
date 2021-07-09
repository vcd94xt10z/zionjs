var zion = {
	ENV: "",
	core: {},
	utils: {}
};

function trim (s, c) {
	if (c === "]") c = "\\]";
	if (c === "^") c = "\\^";
	if (c === "\\") c = "\\\\";
	return s.replace(new RegExp(
	  "^[" + c + "]+|[" + c + "]+$", "g"
	), "");
}

/**
 * Seta um cookie
 * @param name
 * @param value
 * @param days
 * @returns
 */
function setCookie(name, value, days) {
	var d       = null;    
	var expires = 0;
	
	if(days > 0){
		d = new Date();
    	d.setTime(d.getTime() + 24*60*60*1000*days);
		expires = d.toGMTString();
    }

    document.cookie = name + "=" + value + ";path=/;expires=" + expires;
}

/**
 * Retorna o valor do cookie
 * @param name
 * @returns
 */
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

/**
 * Deleta um cookie
 * @param name
 * @returns
 */
function deleteCookie(name) {
	if(getCookie(name) != null){
		setCookie(name, '', -1);
	}
}

/**
 * Copia um texto para a área de transferência
 * @param text
 * @returns
 */
function copyToClipboard(text) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val(text).select();
	document.execCommand("copy");
	$temp.remove();
}

/**
 * Gera um identificador único universal
 * @returns string
 */
 function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	)
}

/**
 * Verifica se a variável não é undefined, nula ou string vazia
 * @param data
 * @returns boolean
 */
function isEmpty(data){
	try {
		if(data == undefined || data == null || data == ""){
			return true;
		}
	}catch(e){
		return false;
	}
}

/**
 * Só colocar aqui extensões de classes javascript nativas como adicionar
 * um método estático ou de instância a uma classe, atributos etc
 * 
 * Não colocar códigos que dependam de bibliotecas de terceiros
 */

/**
 * Corta um texto caso o comprimento for maior que o estabelecido. Caso
 * o texto for cortado, os ultimos tres caracteres serao reticencias.
 */
String.prototype.cut = function (maxLength){
	if(this.length > maxLength){
		return this.substring(0,Math.max(maxLength-3))+"...";
	}else{
		return this;
	}
}

Date.addDays = function(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

/**
 * É ano bissexto
 */
Date.isLeapYear = function (year) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
}

/**
 * Diferença em dias
 */
Date.diffDays = function(date1,date2){
	var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
	return diffDays;
}

/**
 * Quantos dias tem o mês no ano
 */
Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

Date.prototype.isLeapYear = function () { 
    return Date.isLeapYear(this.getFullYear()); 
}

Date.prototype.getDaysInMonth = function () { 
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
}

/**
 * Adiciona meses em uma data
 * @see https://stackoverflow.com/questions/5645058/how-to-add-months-to-a-date-in-javascript
 */
Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
}

Date.prototype.subMonths = function (value) {
    var n = this.getDate();
    this.setMonth(this.getMonth() - value);
    return this;
}

Date.getAgeFromBirth = function(birthday,now) {
	if(now == undefined){
		now = new Date();
	}
	
    var ageDifMs = now.getTime() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * @source https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/trim
 */
if (!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')}}

/**
 * @source https://www.somacon.com/p355.php
 */
if (!String.prototype.ltrim){String.prototype.ltrim=function(){return this.replace(/^\s+/,"")}}

/**
 * @source https://www.somacon.com/p355.php
 */
if (!String.prototype.rtrim){String.prototype.rtrim=function(){return this.replace(/\s+$/,"")}}

/** @license
 * String.prototype.startsWith <https://github.com/mathiasbynens/String.prototype.startsWith>
 * MIT License
 * @author Mathias Bynens
 * @version v0.2.0
 */
if(!String.prototype.startsWith){(function(){'use strict';var t={}.toString;var s=function(a){if(this==null){throw TypeError();}var b=String(this);if(a&&t.call(a)=='[object RegExp]'){throw TypeError();}var c=b.length;var d=String(a);var e=d.length;var p=arguments.length>1?arguments[1]:undefined;var f=p?Number(p):0;if(f!=f){f=0;}var g=Math.min(Math.max(f,0),c);if(e+g>c){return false;}var i=-1;while(++i<e){if(b.charCodeAt(g+i)!=d.charCodeAt(i)){return false;}}return true;};Object.defineProperty(String.prototype,'startsWith',{'value':s,'configurable':true,'writable':true});}());}

/** @license
 * String.prototype.endsWith <https://github.com/mathiasbynens/String.prototype.endsWith>
 * MIT License
 * @author Mathias Bynens
 * @version v0.2.0
 */
if(!String.prototype.endsWith){(function(){'use strict';var t={}.toString;var e=function(s){if(this==null){throw TypeError();}var a=String(this);if(s&&t.call(s)=='[object RegExp]'){throw TypeError();}var b=a.length;var c=String(s);var d=c.length;var p=b;if(arguments.length>1){var f=arguments[1];if(f!==undefined){p=f?Number(f):0;if(p!=p){p=0;}}}var g=Math.min(Math.max(p,0),b);var h=g-d;if(h<0){return false;}var i=-1;while(++i<d){if(a.charCodeAt(h+i)!=c.charCodeAt(i)){return false;}}return true;};Object.defineProperty(String.prototype,'endsWith',{'value':e,'configurable':true,'writable':true});}());}

/** @license
 * String.prototype.includes <https://github.com/mathiasbynens/String.prototype.includes>
 * MIT License
 * @author Mathias Bynens
 * @version v1.0.0
 */
if(!String.prototype.includes){(function(){'use strict';var t={}.toString;var i=''.indexOf;var a=function(s){if(this==null){throw TypeError();}var b=String(this);if(s&&t.call(s)=='[object RegExp]'){throw TypeError();}var c=b.length;var d=String(s);var e=d.length;var p=arguments.length>1?arguments[1]:undefined;var f=p?Number(p):0;if(f!=f){f=0;}var g=Math.min(Math.max(f,0),c);if(e+g>c){return false;}return i.call(b,d,f)!=-1;};Object.defineProperty(String.prototype,'includes',{'value':a,'configurable':true,'writable':true});}());}

/** @license
 * String.prototype.repeat <https://github.com/mathiasbynens/String.prototype.repeat>
 * MIT License
 * @author Mathias Bynens
 * @version v0.2.0
 */
if(!String.prototype.repeat){(function(){'use strict';var r=function(c){if(this==null){throw TypeError();}var s=String(this);var n=c?Number(c):0;if(n!=n){n=0;}if(n<0||n==Infinity){throw RangeError();}var a='';while(n){if(n%2==1){a+=s;}if(n>1){s+=s;}n>>=1;}return a;};Object.defineProperty(String.prototype,'repeat',{'value':r,'configurable':true,'writable':true});}());}

/** @license
 * String.prototype.padStart <https://github.com/uxitten/polyfill>
 * MIT License
 * @author Behnam Mohammadi
 * @version v1.0.1
 */
if(!String.prototype.padStart){String.prototype.padStart=function padStart(t,p){t=t>>0;p=String((typeof p!=='undefined'?p:' '));if(this.length>t){return String(this);}else{t=t-this.length;if(t>p.length){p+=p.repeat(t/p.length);}return p.slice(0,t)+String(this);}};}

/** @license
 * String.prototype.padEnd <https://github.com/uxitten/polyfill>
 * MIT License
 * @author Behnam Mohammadi
 * @version v1.0.1
 */
if(!String.prototype.padEnd){String.prototype.padEnd=function padEnd(t,p){t=t>>0;p=String((typeof p!=='undefined'?p:' '));if(this.length>t){return String(this);}else{t=t-this.length;if(t>p.length){p+=p.repeat(t/p.length);}return String(this)+p.slice(0,t);}};}