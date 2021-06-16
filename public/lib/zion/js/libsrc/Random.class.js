/**
 * Geração de valores randomicos
 * @author Vinicius Cesar Dias
 */
zion.utils.Random = function(){}

/**
 * @see https://gist.github.com/willianns/3246637
 */
zion.utils.Random.getNumber = function(n) {
	var ranNum = Math.round(Math.random()*n);
	return ranNum;
}

/**
 * @see https://gist.github.com/willianns/3246637
 */
zion.utils.Random.mod = function(dividendo,divisor) {
	return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
}

/**
 * Gera um CNPJ aleatório
 * @see https://gist.github.com/willianns/3246637
 */
zion.utils.Random.CNPJ = function(mascara){
	let rd = zion.utils.Random;
	
	if(mascara == undefined){
		mascara = true;
	}
	
	var n = 9;
	var n1  = rd.getNumber(n);
 	var n2  = rd.getNumber(n);
 	var n3  = rd.getNumber(n);
 	var n4  = rd.getNumber(n);
 	var n5  = rd.getNumber(n);
 	var n6  = rd.getNumber(n);
 	var n7  = rd.getNumber(n);
 	var n8  = rd.getNumber(n);
 	var n9  = 0;//rd.getNumber(n);
 	var n10 = 0;//rd.getNumber(n);
 	var n11 = 0;//rd.getNumber(n);
 	var n12 = 1;//rd.getNumber(n);
	var d1 = n12*2+n11*3+n10*4+n9*5+n8*6+n7*7+n6*8+n5*9+n4*2+n3*3+n2*4+n1*5;
 	d1 = 11 - ( rd.mod(d1,11) );
 	if (d1>=10) d1 = 0;
 	var d2 = d1*2+n12*3+n11*4+n10*5+n9*6+n8*7+n7*8+n6*9+n5*2+n4*3+n3*4+n2*5+n1*6;
 	d2 = 11 - ( rd.mod(d2,11) );
 	if (d2>=10) d2 = 0;

	if (mascara)
		return ''+n1+n2+'.'+n3+n4+n5+'.'+n6+n7+n8+'/'+n9+n10+n11+n12+'-'+d1+d2;
	else
		return ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12+d1+d2;
}

/**
 * Inscrição Estadual
 */
zion.utils.Random.IE = function(mascara){
}

/**
 * Gera um CEP aleatório
 */
zion.utils.Random.CEP = function(mascara){
}

/**
 * Gera um CPF aleatório
 */
zion.utils.Random.CPF = function(mascara) {
	let rd = zion.utils.Random;
	
	if(mascara == undefined){
		mascara = true;
	}
	
	var n = 9;
	var n1 = rd.getNumber(n);
	var n2 = rd.getNumber(n);
	var n3 = rd.getNumber(n);
	var n4 = rd.getNumber(n);
	var n5 = rd.getNumber(n);
	var n6 = rd.getNumber(n);
	var n7 = rd.getNumber(n);
	var n8 = rd.getNumber(n);
	var n9 = rd.getNumber(n);
	var d1 = n9*2+n8*3+n7*4+n6*5+n5*6+n4*7+n3*8+n2*9+n1*10;
	d1 = 11 - ( rd.mod(d1,11) );
	if (d1>=10) d1 = 0;
	var d2 = d1*2+n9*3+n8*4+n7*5+n6*6+n5*7+n4*8+n3*9+n2*10+n1*11;
	d2 = 11 - ( rd.mod(d2,11) );
	if (d2>=10) d2 = 0;
	
	if (mascara){ 
		cpf = ''+n1+n2+n3+'.'+n4+n5+n6+'.'+n7+n8+n9+'-'+d1+d2;
	}else{ 
		cpf = ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+d1+d2;
	}
	
	return cpf;
}

/**
 * Número de Identificação do Trabalhador
 * @see https://gist.github.com/willianns/3246637
 */
zion.utils.Random.NIT = function(mascara){
	let rd = zion.utils.Random;
	
	if(mascara == undefined){
		mascara = true;
	}
	
	var n = 9;
	var n1  = 1;//rd.getNumber(n);
 	var n2  = rd.getNumber(n);
 	var n3  = rd.getNumber(n);
 	var n4  = rd.getNumber(n);
 	var n5  = rd.getNumber(n);
 	var n6  = rd.getNumber(n);
 	var n7  = rd.getNumber(n);
 	var n8  = rd.getNumber(n);
 	var n9  = rd.getNumber(n);
 	var n10 = rd.getNumber(n);

	var d1 =  n1*3 + n2*2 + n3*9 + n4*8 + n5*7 + n6*6 + n7*5 + n8*4 + n9*3 + n10*2;
 	d1 = 11 - ( rd.mod(d1,11) );
 	if (d1>=10) d1 = 0;

	if (mascara)
		return ''+n1+n2+n3+'.'+n4+n5+n6+n7+n8+'.'+n9+n10+'-'+d1;
	else
		return ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+d1;
}

/**
 * @see https://gist.github.com/willianns/3246637
 */
zion.utils.Random.CEI = function(mascara){
	let rd = zion.utils.Random;
	
	if(mascara == undefined){
		mascara = true;
	}
	
	var n = 9;
	var n1  = 2; // deve ser diferente de 0
 	var n2  = rd.getNumber(n);
 	var n3  = rd.getNumber(n);
 	var n4  = rd.getNumber(n);
 	var n5  = rd.getNumber(n);
 	var n6  = rd.getNumber(n);
 	var n7  = rd.getNumber(n);
 	var n8  = rd.getNumber(n);
 	var n9  = rd.getNumber(n);
 	var n10 = rd.getNumber(n);
	var n11 = 8; // atividade 

	var aux1 =  n1*7 + n2*4 + n3*1 + n4*8 + n5*5 + n6*2 + n7*1 + n8*6 + n9*3 + n10*7 + n11 * 4;
	var aux2 = aux1 + '';

	var aux3 = parseInt(aux2[aux2.length - 1]) + parseInt(aux2[aux2.length - 2]);
	var Soma = parseInt(aux1);	
	var d1 = parseInt((10 - (Soma % 10 + parseInt(Soma / 10)) % 10) % 10);
	d1 = Math.abs(d1);
	if (mascara)
 	  return ''+n1+n2+'.'+n3+n4+n5+'.'+n6+n7+n8+n9+n10+'/'+n11+d1;
	else
	  return ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+d1;
}

zion.utils.Random.RG = function(mascara){
}

zion.utils.Random.PISPASEP = function(mascara){
}

zion.utils.Random.name = function(){
}

/**
 * Gera uma data randomica entre duas datas
 * Atenção! Função precisa ser testada e corrigida ainda
 */
zion.utils.Random.date = function(date1,date2){
	let rd   = zion.utils.Random;
	let days = Date.diffDays(date1,date2);
	let num  = rd.getNumber(days);
	let newDate = Date.addDays(date1,num);
	return newDate;
}

zion.utils.Random.street = function(){
}

zion.utils.Random.city = function(){
}

zion.utils.Random.UF = function(){
	let list = [
		{"label":"Acre","value":"AC"},
		{"label":"Alagoas","value":"AL"},
		{"label":"Amap\u00e1","value":"AP"},
		{"label":"Amazonas","value":"AM"},
		{"label":"Bahia","value":"BA"},
		{"label":"Cear\u00e1","value":"CE"},
		{"label":"Distrito Federal","value":"DF"},
		{"label":"Esp\u00edrito Santo","value":"ES"},
		{"label":"Goi\u00e1s","value":"GO"},
		{"label":"Maranh\u00e3o","value":"MA"},
		{"label":"Mato Grosso","value":"MT"},
		{"label":"Mato Grosso do Sul","value":"MS"},
		{"label":"Minas Gerais","value":"MG"},
		{"label":"Paran\u00e1","value":"PR"},
		{"label":"Para\u00edba","value":"PB"},
		{"label":"Par\u00e1","value":"PA"},
		{"label":"Pernambuco","value":"PE"},
		{"label":"Piau\u00ed","value":"PI"},
		{"label":"Rio Grande do Norte","value":"RN"},
		{"label":"Rio Grande do Sul","value":"RS"},
		{"label":"Rio de Janeiro","value":"RJ"},
		{"label":"Rond\u00f4nia","value":"RO"},
		{"label":"Roraima","value":"RR"},
		{"label":"Santa Catarina","value":"SC"},
		{"label":"Sergipe","value":"SE"},
		{"label":"S\u00e3o Paulo","value":"SP"},
		{"label":"Tocantins","value":"TO"}
	];
	
	var index = zion.utils.Random.getNumber(list.length);
	var obj = list[index];
	
	return obj;
}