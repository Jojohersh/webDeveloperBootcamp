$("input[type='text']").fadeToggle(0);
// click off todos by clicking
$("ul").on("click", "li", function() {
	$(this).toggleClass("completed");
});

// click on x to delete todo
$("ul").on("click", "span", function(e){
	$(this).parent().fadeOut(500,function() {
		$(this).remove();
	});
	e.stopPropagation();
});

$("input[type='text']").keypress(function(e){
	if(e.which === 13) {
		//grab text from input upon enter key
		var todoText = $(this).val();
		$(this).val("");
		//create new li and add it to ul
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
	}
});

$(".fa-pencil-square").click(function() {
	$("input[type='text']").fadeToggle(200);
});
