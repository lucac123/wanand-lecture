$(() => {
	$('button').click(() => {
		let name = $('.small-textbox').val();
		let msg = $('.big-textbox').val();
		if (name.toLowerCase() == 'abed' && msg.toLowerCase() == 'galooeh is great')
			$('.image').attr('src', 'images/abed.png');
		
		$('.small-textbox').val('');
		$('.big-textbox').val('');
	})
})