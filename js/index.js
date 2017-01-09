$('.btn-number').click(function(e){
	e.preventDefault();

	fieldName = $(this).attr('data-field');
	type      = $(this).attr('data-type');
	var input = $("input[name='"+fieldName+"']");
	var currentVal = parseInt(input.val());
	if (!isNaN(currentVal)) {
		if(type == 'minus') {

			if(currentVal > input.attr('min')) {
				input.val(currentVal - 1).change();
			}
			if(parseInt(input.val()) == input.attr('min')) {
				$(this).attr('disabled', true);
			}

		} else if(type == 'plus') {

			if(currentVal < input.attr('max')) {
				input.val(currentVal + 1).change();
			}
			if(parseInt(input.val()) == input.attr('max')) {
				$(this).attr('disabled', true);
			}

		}
	} else {
		input.val(0);
	}
});

$('.input-number').focusin(function(){
	 $(this).data('oldValue', $(this).val());
});

$('.input-number').change(function() {

	minValue =  parseInt($(this).attr('min'));
	maxValue =  parseInt($(this).attr('max'));
	valueCurrent = parseInt($(this).val());

	name = $(this).attr('name');

	if(valueCurrent >= minValue) {
		$(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
	} else {
		alert('Sorry, the minimum value was reached');
		$(this).val($(this).data('oldValue'));
	}
	if(valueCurrent <= maxValue) {
		$(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
	} else {
		alert('Sorry, the maximum value was reached');
		$(this).val($(this).data('oldValue'));
	}

	if ($(this).attr('name') == 'scaledTeleop' || $(this).attr('name') == 'challengedTeleop') {
		towerPoints = parseInt($("input[name='scaledTeleop']").val()) + parseInt($("input[name='challengedTeleop']").val());

		if (towerPoints > 3) {
			$(".btn-number[data-type='plus'][data-field='scaledTeleop']").attr('disabled', true)
			$(".btn-number[data-type='plus'][data-field='challengedTeleop']").attr('disabled', true)
			alert('Sorry, the maximum value was reached');
			$(this).val($(this).data('oldValue'));
		} else if (towerPoints == 3) {
			$(".btn-number[data-type='plus'][data-field='scaledTeleop']").attr('disabled', true)
			$(".btn-number[data-type='plus'][data-field='challengedTeleop']").attr('disabled', true)
		} else {
			$(".btn-number[data-type='plus'][data-field='scaledTeleop']").removeAttr('disabled', false)
			$(".btn-number[data-type='plus'][data-field='challengedTeleop']").removeAttr('disabled', false)
		}
	} else if ($(this).attr('name') == 'crossAuto' || $(this).attr('name') == 'crossTeleop') {
		crossedNum = parseInt($("input[name='crossAuto']").val()) + parseInt($("input[name='crossTeleop']").val());

		if (crossedNum > 10) {
			$(".btn-number[data-type='plus'][data-field='crossAuto']").attr('disabled', true)
			$(".btn-number[data-type='plus'][data-field='crossTeleop']").attr('disabled', true)
			alert('Sorry, the maximum value was reached');
			$(this).val($(this).data('oldValue'));
		} else if (crossedNum == 10) {
			$(".btn-number[data-type='plus'][data-field='crossAuto']").attr('disabled', true)
			$(".btn-number[data-type='plus'][data-field='crossTeleop']").attr('disabled', true)
		} else {
			$(".btn-number[data-type='plus'][data-field='crossAuto']").removeAttr('disabled', false)
			$(".btn-number[data-type='plus'][data-field='crossTeleop']").removeAttr('disabled', false)
		}
	}
});

$(".input-number").keydown(function (e) {
	// Allow: backspace, delete, tab, escape, enter and .
	if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
		 // Allow: Ctrl+A
		(e.keyCode == 65 && e.ctrlKey === true) ||
		 // Allow: home, end, left, right
		(e.keyCode >= 35 && e.keyCode <= 39)) {
			 // let it happen, don't do anything
			 return;
	}
	// Ensure that it is a number and stop the keypress
	if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		e.preventDefault();
	}
});

function recalculateSums() {
	var autoTotal = 0;

	var reachAuto = $('[name="reachAuto"]').val()*5;
	$("#reachAuto .taskTotal").text(reachAuto);
	autoTotal+=reachAuto;

    var boilerLowAuto = $('[name="boilerLowAuto"]').val()*1/3;
    $("#boilerLowAuto .taskTotal").text(Math.floor(boilerLowAuto));
    autoTotal+=boilerLowAuto;

    var boilerHighAuto = $('[name="boilerHighAuto"]').val()*1;
    $("#boilerHighAuto .taskTotal").text(Math.floor(boilerHighAuto));
    autoTotal+=boilerHighAuto;

    var rotorAuto = $('[name="rotorAuto"]').val()*60;
    $("#rotorAuto .taskTotal").text(rotorAuto);
    autoTotal+=rotorAuto;

	$("#autoSum").text(Math.floor(autoTotal));

	var teleopTotal = 0;

    var boilerLowTeleop = $('[name="boilerLowTeleop"]').val()*1/9;
    $("#boilerLowTeleop .taskTotal").text(Math.floor(boilerLowTeleop));
    teleopTotal+=boilerLowTeleop;

    var boilerHighTeleop = $('[name="boilerHighTeleop"]').val()*1/3;
    $("#boilerHighTeleop .taskTotal").text(Math.floor(boilerHighTeleop));
    teleopTotal+=boilerHighTeleop;

    var rotorTeleop = $('[name="rotorTeleop"]').val()*40;
    $("#rotorTeleop .taskTotal").text(rotorTeleop);
    teleopTotal+=rotorTeleop;

    var takeoffReady = $('[name="takeoffReady"]').val()*50;
    $("#takeoffReady .taskTotal").text(takeoffReady);
    teleopTotal+=takeoffReady;

	$("#teleopSum").text(Math.floor(teleopTotal));

	$("#totalSum").text(Math.floor(autoTotal+teleopTotal));
}

$(document).ready(function() {
	recalculateSums();
	$('.container :input').change(function(e) {
	recalculateSums();
	});
})
