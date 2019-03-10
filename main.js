var userList = []
var key;
var userListN = { };
var num = -1;
var all = 0;
var turn = 0;

// $('#add').click(function wow(){
// 	var tempUser = $('#add').val();
// 	var tempUserVal = $('#input1').val();
// 	userListN[tempI] = tempUser;
// })

$('#add').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		var tempUser = $('#add').val();
		userList.push($('#add').val())
		userListN[tempUser] = 0;
		createHTML()
		if (userList.length == 1) {
			$('#turn').text(userList[num])
			$("#input"+turn).parent().hide();
		}
	}
});

function createHTML(){
	num++
	$("#clone").clone(true).appendTo( "#main" ).attr("id", num).find("#name").text(userList[num])
	$("#" + num).find("#input").attr("id","input" + num);
	all+=100
}


$('#nice').click(function nice() {
	if (check()) {
		for (var i = 0; i < userList.length; i++) {
			var temp1 = parseInt($('#input' + i).val())
			userListN[userList[i]] = temp1 + parseInt(userListN[userList[i]]);
		}
		turn++;
		$('#turn').text(userList[turn])
		$("#input"+turn).parent().hide();
		$("#input"+(turn-1)).parent().show();
		alert('nice')
	} else{
		alert('complete all')
	}
})

var temp1;
var temp2;
var temp3;
function check(){
	temp1 = 0;
	temp2 = 0;
	temp3 = 0;
	for (var i = 0; i < userList.length; i++) {
		if (i != turn) {
			if ($('#input' + i).val() != '') {
				if(parseInt($('#input' + i).val()) != NaN) {
					temp3 = parseInt($('#input' + i).val());
					temp2 = temp2 + temp3
					temp1++;
					console.log(temp1+'temp1')
					console.log(i)
				}
			}
		}
	}
	if (temp1 == userList.length-1) {
		alert(temp2)
		if (temp2 === 100) {
			return true
		}
	} else{
		return false
	}
}