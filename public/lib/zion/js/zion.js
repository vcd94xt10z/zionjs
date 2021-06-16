var ajaxFormRunning = false;
var ajaxBlockUI = true;

$(document).ready(function(){
	// bloqueando UI
    jQuery.ajaxSetup({
    	beforeSend: function(){
    		startLoading();
	    },
	    complete: function(){
	    	stopLoading();
	    },
	    success: function(){
	    },
		error: function(jqXHR, textStatus, errorThrown) {
        	stopLoading();
    	}
	});
	
	loadMask();
});

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
 * Exibe uma layer bloqueando a UI e exibindo uma gif para representar
 * que algo esta processando e que é necessário esperar
 * @returns
 */
function startLoading(){
	if(!ajaxBlockUI){
		return;
	}
	
	if(!$("#zion-loading").length){
		var code = "<div id='zion-loading'></div>";
		$("body").append(code);
	}
	$("#zion-loading").css("display","block");
}

/**
* Desfaz o efeito de startLoading
* @returns
*/
function stopLoading(){
	if(!ajaxBlockUI){
		return;
	}
	
	$("#zion-loading").css("display","none");
}

function loadMask(){
	$(".type-float").keypress(function (evt) {
		var separators  = [46,44];
		var isNumber    = (evt.which >= 48 && evt.which <= 57);
		var isSeparator = separators.indexOf(evt.which) != -1;
		
		if(!isNumber && !isSeparator){
			evt.preventDefault();
		}
	});
	
	$(".type-integer").keypress(function (evt) { 
		if (evt.which < 48 || evt.which > 57){
	        evt.preventDefault();
	    }
	});
	
	$(".type-alpha").keypress(function (evt) {
		var isAlphaLower = (evt.which >= 97 && evt.which <= 122);
		var isAlphaUpper = (evt.which >= 65 && evt.which <= 90);
		
		if (!(isAlphaLower || isAlphaUpper)){
	        evt.preventDefault();
	    }
	});
	
	$('.date,.type-date').mask('00/00/0000');
    $('.time,.type-time').mask('00:00:00');
    $('.datetime,.type-datetime').mask('00/00/0000 00:00:00');
	$('.cep').mask('00000-000');
    $('.phone').mask('0000-0000');
    $('.phone_with_ddd').mask('(00) 0000-0000');
    $('.phone_us').mask('(000) 000-0000');
    $('.mixed').mask('AAA 000-S0S');
    $('.cpf').mask('000.000.000-00', {reverse: true});
    $('.cnpj').mask('00.000.000/0000-00', {reverse: true});
    $('.money').mask('000.000.000.000.000,00', {reverse: true});
    $('.money2').mask("#.##0,00", {reverse: true});
	$('.money3').mask("#.##0,000", {reverse: true});
	$('.double2').mask("##0,00", {reverse: true});
	$('.double3').mask("##0,000", {reverse: true});
    $('.ip_address').mask('0ZZ.0ZZ.0ZZ.0ZZ', {
      translation: {
        'Z': {
          pattern: /[0-9]/, optional: true
        }
      }
    });
    $('.ip_address').mask('099.099.099.099');
    $('.percent').mask('##0,00%', {reverse: true});
    $('.clear-if-not-match').mask("00/00/0000", {clearIfNotMatch: true});
    $('.placeholder').mask("00/00/0000", {placeholder: "__/__/____"});
    $('.fallback').mask("00r00r0000", {
        translation: {
          'r': {
            pattern: /[\/]/,
            fallback: '/'
          },
          placeholder: "__/__/____"
        }
      });
    $('.selectonfocus').mask("00/00/0000", {selectOnFocus: true});
    
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };
    $('.phone9').mask(SPMaskBehavior, spOptions);
    
    $('.type-datetime')
    	.attr("title","Formato d/m/a h:m:s")
    	.attr("data-placement","top")
    	.tooltip();
    
    $('.type-date').attr("title","Formato d/m/a").tooltip();
    $('.type-time').attr("title","Formato h:m:s").tooltip();

	$('.card-number').mask('0000 0000 0000 0000');
	$('.card-expiration').mask('00/0000');
}

$(document).on("keyup",".mask-money2",function(e){
	var code = e.keyCode || e.which;
	if(code == 9){
		return false;
	}
	
	var self = $(this);
	var text = self.val();
	
	var number = 0;
	try {
		number = parseInt(text.replace(/[^0-9]/,""));
	}catch(ex){
	}
	if(isNaN(number)){
		number = 0;
	}
	
	number = number / 100;
	text = number.toFixed(2);
	text = text.replace(".",",");
	self.val(text);
});

$(document).on("keyup",".mask-double3",function(e){
	var self = $(this);
	var text = self.val();
	
	var number = 0;
	try {
		number = parseInt(text.replace(/[^0-9]/,""));
	}catch(ex){
	}
	if(isNaN(number)){
		number = 0;
	}
	
	number = number / 1000;
	text = number.toFixed(3);
	self.val(text);
});

// upload de arquivos via ajax
(function($) {
$.fn.serializefiles = function() {
    var obj = $(this);
    /* ADD FILE TO PARAM AJAX */
    var formData = new FormData();
    $.each($(obj).find("input[type='file']"), function(i, tag) {
        $.each($(tag)[0].files, function(i, file) {
            formData.append(tag.name, file);
        });
    });
    var params = $(obj).serializeArray();
    $.each(params, function (i, val) {
        formData.append(val.name, val.value);
    });
    return formData;
};
})(jQuery);

/**
 * Ao submeter um form, envia os dados usando ajax e 
 * chama uma função de callback para tratar a resposta
 * @param e
 * @returns
 */
$(document).on("submit",".ajaxform",function(e){
	e.preventDefault();
	
	if(ajaxFormRunning){
		return false;
	}
	ajaxFormRunning = true;
	
	var form = $(this);
	if(!form.length){
		ajaxFormRunning = false;
		alert("Nenhum formulário encontrado!");
		return false;
	}
	
	var callbackFunctionName = form.attr("data-callback");
	if(callbackFunctionName == "" || callbackFunctionName == undefined){
		ajaxFormRunning = false;
		alert("Função de callback 'data-callback' não definida!");
		return false;
	}
	
	var headers = [];
	var accept = form.attr("data-accept");
	
	if(accept != undefined){
		headers["Accept"] = accept;
	}
	
	// lista de callback
	var callbackList = callbackFunctionName.split(" ");
	
	// não esta passando o cabeçalho Accept pois quem usa ajaxform
	// pode receber json, html etc
	var formdata = form.serializefiles();
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      headers: headers,
      data: formdata,
      cache: false,
      processData: false,
      contentType: false
    }).done(function(data, textStatus, jqXHR) {
    	ajaxFormRunning = false;
    	
    	// callback
    	for(var i in callbackList){
    		var func = callbackList[i];

    		try {
    			eval(func+"('done',jqXHR,data,textStatus,null);");
    		}catch(e){
				console.error(e);
    		}
    	}
    }).fail(function(jqXHR, textStatus, errorThrown) {
    	ajaxFormRunning = false;
    	
    	// callback
    	for(var i in callbackList){
    		var func = callbackList[i];

    		try {
				var responseBody = jqXHR.responseText;
    			eval(func+"('fail',jqXHR,responseBody,textStatus,errorThrown);");
    		}catch(e){
				console.error(e);
    		}
    	}
    });
    
    return false;
});

/**
 * No evento click, chama uma URL usando ajax e
 * chama a função de callback para tratar a resposta
 * @returns
 */
$(document).on("click",".ajaxlink",function(){
	var self       = $(this);
	var url        = self.attr("data-url");
	var method     = self.attr("data-method");
	var callback   = self.attr("data-callback");
	var confirmMsg = self.attr("data-confirmMessage");
	
	if(method == ""){
		method = "GET";
	}
	
	if(confirmMsg != null){
		if(!window.confirm(confirmMsg)){
			return;
		}
	}
	
	$.ajax({
		url: url,
		method: method,
		cache: false
	}).done(function(data, textStatus, jqXHR){
		try {
			eval(callback+"('done',jqXHR,data,textStatus,null);");
		}catch(e){
			console.error(e);
		}
	}).fail(function(jqXHR, textStatus, errorThrown){
		try {
			var responseBody = jqXHR.responseText;
			eval(callback+"('fail',jqXHR,responseBody,textStatus,errorThrown);");
		}catch(e){
			console.error(e);
		}
	});
});