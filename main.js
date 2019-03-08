var nice = ['Ardit',"Olti","Elta","Adniti","Yllka",'Magrib','Altina']

$('#nice').click(function nice() {
	if ($('#input1').val() != '' &&
		$('#input2').val() != '' &&
		$('#input3').val() != '' &&
		$('#input4').val() != '' &&
		$('#input5').val() != '' &&
		$('#input6').val() != '' &&
		$('#input7').val() != ''
	) {
		alert('nice')
	} else{
		alert('complete all')
	}
}) 