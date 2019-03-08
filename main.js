var nice = ['Ardit',"Olti","Elta","Adniti","Yllka",'Magrib','Altina']

$('#nice').click(function nice() {
	if (check()) {
		alert('nice')
	} else{
		alert('complete all')
	}
})

var temp1;
function check(){
	var temp1 = 0;
	for (var i = nice.length; i >= 1; i--) {
		if ($('#input' + i).val() != '') {
			if (parseInt($('#input' + i).val()) == NaN) {
				
			}
		}
	}
	if (temp1 == nice.length) {
		return true
	} else{
		return false
	}
}
