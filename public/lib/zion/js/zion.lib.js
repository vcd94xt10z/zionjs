var zion = {
	ENV: "",
	core: {},
	utils: {}
};

/**
 * Classe para formatação, interpretação e conversão de textos
 * @author Vinicius Cesar Dias
 */
zion.utils.TextFormatter = function(){};

/**
 * Interpreta uma string timezone no formato -03:00
 */
zion.utils.TextFormatter.parseTimezone = function(timezone){
	try {
		if(typeof(timezone) == "undefined" || timezone == null || timezone.length != 6){
			return null;
		}
		var signal = timezone.substr(0,1);
		var hour = parseInt(timezone.substr(1,2));
		var minute = parseInt(timezone.substr(4,2));
		var output = {
			'signal': signal,
			'hour': hour,
			'minute': minute
		}
		return output;
	}catch(e){
		return null;
	}
};

/**
 * Interpeta uma data string em um objeto Date
 */
zion.utils.TextFormatter.parseDate = function(date,format){
	if(format == undefined){
		format = "d/m/Y";
	}
	
	let dateArray = date.split("/");
	let formatArray = format.split("/");
	
	let day = 0;
	let month = 0;
	let year = 0;
	
	for(var i in formatArray){
		let letter = formatArray[i];
		
		switch(letter){
		case 'd':
			day = parseInt(dateArray[i]);
			break;
		case 'm':
			month = parseInt(dateArray[i]);
			break;
		case 'Y':
			year = parseInt(dateArray[i]);
			break;
		}
	}
	
	// no javascript, o meses começam do zero
	month--;
	
	let obj = new Date(year,month,day);
	return obj;
}

/**
 * Converte um objeto Date para string
 */
zion.utils.TextFormatter.formatDate = function(date,format,timezone){
	if(date == null || date == undefined){
		console.log("TextFormatter.formatDate(): date é obrigatório");
		return "";
	}
	
	if(format == null || format == undefined){
		console.log("TextFormatter.formatDate(): format é obrigatório");
		return "";
	}
	
	// formato: +00:00
	if(typeof(timezone) == "undefined" || timezone == null || timezone.length != 6){
		timezone = "-03:00"; // brazil
	}
	
	// convertendo para o timezone atual
	var tz = zion.utils.TextFormatter.parseTimezone(timezone);
	
	// comentando esse trecho pois o sistema estava bagunçando as valores
	/*
	if(tz != null){
		if(tz.signal == "+"){
			date.setUTCHours(date.getUTCHours() + tz.hour);
			date.setUTCMinutes(date.getUTCMinutes() + tz.minute);
		}else{
			date.setUTCHours(date.getUTCHours() - tz.hour);
			date.setUTCMinutes(date.getUTCMinutes() - tz.minute);
		}
	}
	*/
		
	// separando valores
	var day = date.getUTCDate(); 
	var month = date.getUTCMonth()+1 
	var year = date.getUTCFullYear(); 
	var hour = date.getUTCHours();
	var minute = date.getUTCMinutes();
	var second = date.getUTCSeconds();
	
	// padding
	if(day < 10){
		day = "0"+day;
	}
	if(month < 10){
		month = "0"+month;
	}
	if(hour < 10){
		hour = "0"+hour;
	}
	if(minute < 10){
		minute = "0"+minute;
	}
	if(second < 10){
		second = "0"+second;
	}
	
	format = format.replace(/d/gi,day);
	format = format.replace(/m/gi,month);
	format = format.replace(/Y/gi,year);
	format = format.replace(/H/gi,hour);
	format = format.replace(/i/gi,minute);
	format = format.replace(/s/gi,second);
	
	return format;
};

/**
 * Formata um CEP
 */
zion.utils.TextFormatter.formatCEP = function(value){
	var value = value.toString();
	return value.substr(0,5)+"-"+value.substr(5,3);
};

/**
 * Converte um valor double em valor monetário string
 */
zion.utils.TextFormatter.formatCurrency = function(price,c,d,t){
	if(c == undefined){
		c = 2;
	}
	if(d == undefined){
		d = ",";
	}
	if(t == undefined){
		t = ".";
	}
	var n = price, c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

/**
 * Converte um valor string em double
 */
zion.utils.TextFormatter.parseCurrency = function(value){
	if(typeof(value) == 'number'){
		return value + 0.00;
	}
	
	if(value == undefined || typeof(value) != 'string' || value == ""){		
		return 0.00;
	}
	
	value = value.replace(/[^0-9\,\.]/g,"");
	
	if(value.indexOf(",") != -1){
		value = value.replace(/[\.]/,"");
		value = value.replace(/[\,]/,".");
	}
	
	try {
		return parseFloat(value);
	}catch(e){
		return 0;
	}
};

/**
 * Validações
 * @author Vinicius Cesar Dias
 */
zion.utils.Validation = function(){}

zion.utils.Validation.isCPF = function(strCPF){
	strCPF = strCPF.replace(/[^\d]+/g,'');
	
	var Soma;
    var Resto;
    Soma = 0;
	if (strCPF == "00000000000") return false;
    
	for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
	Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
	
	Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
	
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

zion.utils.Validation.isCNPJ = function(cnpj){
	cnpj = cnpj.replace(/[^\d]+/g,'');
	 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
}

zion.utils.Validation.isEmail = function(email){
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

zion.utils.Validation.isCEP = function(cep){
	var re = /^[0-9]{8}/;
	cep = cep.replace("-","").replace(".","");
	return re.test(cep);
}