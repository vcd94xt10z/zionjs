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