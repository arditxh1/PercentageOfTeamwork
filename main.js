var userList = [];
var key;
var userListN = { };
var num = -1;
var all = 0;
var turn = 0;
var colors = ['#fc6a42','#b2c1ed','#4fc465','#956efa','#fcd63d']
var started = false; //Stop the input coming down

// $('#add').click(function wow(){
// 	var tempUser = $('#add').val();
// 	var tempUserVal = $('#input1').val();
// 	userListN[tempI] = tempUser;
// })

$('#add').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		
	}
});

function createHTML(){
	num++
	$("#clone").clone(true).appendTo( "#main" ).attr("id", num).find("#name").text(userList[num])
	if (num != 0) {
		var random_color = colors[Math.floor(Math.random() * colors.length)];
		colors.splice( colors.indexOf(random_color), 1 );
		$("#" + num).css('background-color', random_color);
	}
	$("#" + num).find("#input").attr("id","input" + num);
	$("#" + num).hide()
	$("#" + num).fadeIn(1000)
	all+=100
}


$('#nice').click(function nice() {
	if (check()) {
		for (var i = 0; i < userList.length; i++) {
			if (i != turn) {
				var temp1 = parseInt($('#input' + i).val())
				userListN[userList[i]] = temp1 + parseInt(userListN[userList[i]]);
				$('#input'+i).val('')
				started = true;
			}
		}
		$(this).text('Done')
		turn++;
		$('#turn').text(userList[turn] + "'s"+ ' turn:')
		$("#input"+turn).parent().hide();
		$("#input"+(turn-1)).parent().show();
		if (turn != userList.length) {
				$('#alertInfo').text('Its ' + userList[turn] +"'s turn: ")
				$('#ex1').modal({fadeDuration: 300});	
		}
		if (turn == userList.length) {
			calculateEnd();
		}
	} else{
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
				temp3 = parseInt($('#input' + i).val());
				temp2 = temp2 + temp3
				temp1++;
			}else{
				$('#alertInfo').text('Please fill in all the inputs')
				$('#ex1').modal({fadeDuration: 300});
			}
		}
	}
	if (temp1 == userList.length-1) {
		if (temp2 === 100) {
			return true
		}else{
			$('#alertInfo').text('You have '+ (100 - temp2) + ' points left.')
			$('#ex1').modal({fadeDuration: 300});
		}
	} else{
		return false
	}
}


var sw = 0;
var f = 0;

$('#start').click(function(){
	hideEntry();
	f = 1
	$("#add").focus();
	$('#Div_Input').css('transform', 'translate(0px, 110px)');
	setTimeout(show, 1000)
})


//INPUT--------------------------------------------------------
$('body').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13' && f == 0 && started == false) {
		if (sw == 0) {
			hideEntry();
			f = 1
			$("#add").focus();
			$('#Div_Input').css('transform', 'translate(0px, 110px)');
			setTimeout(show, 1000)
		} else if (sw == 1){
			$("#add").blur();
			f = 1
			$('#Div_Input').css('transform', 'translate(0px, -20px)');
			setTimeout(hide, 500)
		}
	}
});

$('#add').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == '13' && f == 0 && $('#add').val()!= "") {
		var tempUser = capitalizeFirstLetter($('#add').val());
		userList.push(tempUser)
		userListN[tempUser] = 0;
		createHTML()
		if (userList.length == 1) {
			$('#turn').text(userList[num] + "'s"+ ' turn:')
			$("#input"+turn).parent().hide();
		}
		if(userList.length <= 2){

		}else{
			$("#nice").fadeIn(1000)
		}
	}
});


function show(){
	sw = 1
	f = 0
}

function hide(){
	sw = 0
	f = 0
	$('#add').val('')
}

var tempC1;
var tempC2;
var tempC3;
var numEnd = 0;
var modalSearch = false;
function calculateEnd(){
	hideBG();
	for (var i = userList.length - 1; i >= 0; i--) {
		tempC1 = userListN[userList[i]];
		tempC2 = userList.length*100;
		tempC3 = Math.floor((tempC1/tempC2)*100).toString();
		$("#cloneEnd").clone(true).appendTo( "#ex1" ).attr("id", numEnd+"end").find("#name").text(userList[i] + ':')
		$("#" + numEnd+"end").find("#value").text(tempC3 + '%')
		numEnd++;
		modalSearch = true;
	}
	createChart();
	$('#alertInfo').remove()
	$('#myChart').show()
	$('#ex1').modal({fadeDuration: 300});
}

$('#ex1').on('fadeOut', function(){
	if (numEnd != 0) {
		location.reload();
	}
});

(function ($) {
	  $.each(['show', 'hide','fadeOut'], function (i, ev) {
	    var el = $.fn[ev];
	    $.fn[ev] = function () {
	      this.trigger(ev);
	      return el.apply(this, arguments);
	    };
	  });
	})(jQuery);


function hideEntry(){
	setTimeout(function (){
		$("#main").show();
		$("#turnDiv").show();
	}, 2000);
	$('#entry').fadeOut(2000);
	$('#mainImg').css('transform', 'translate(-730px, 0px)');
	$('#textEntry').css('transform', 'translate(920px, 0px)');
}

function hideBG(){
	for (var i = userList.length; i >= 0; i--) {
		$('#' + i).fadeOut(500)
	}
	$('#turn').fadeOut(500)
}

//--------------------------CHART)-------------------------------

var myChart = document.getElementById('myChart').getContext('2d');
Chart.defaults.global.defaultFontFamily ='Ubuntu';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777';

function createChart(){
	var doughnutChart = new Chart(myChart, {
	type: 'doughnut',
    data: {
    	labels: userList,
    	datasets:[{
    		label:'Percentage',
    		data: Object.values(userListN),
    		backgroundColor:colors,
    	}]
    },
    options: {}
})
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
