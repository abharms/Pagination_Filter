
$(document).ready(function() {
	var $studentListItem = $('.student-item');
	var $listContainer = $('.student-list');
	//number of items we want to show on each page
	var $itemsPerPage = 10;

	view.hideItems($studentListItem, $itemsPerPage);
	view.appendItemsToPage($listContainer, $studentListItem, $itemsPerPage);
	view.addPaginationButtons($studentListItem, $itemsPerPage);
	view.addSearchBar($studentListItem);
});


var view = {
	hideItems: function($studentListItem, $itemsPerPage) {
		//hide all items except first 10
		$studentListItem.filter(':gt('+($itemsPerPage -1) +')').hide();
	},

	appendItemsToPage: function($listContainer, $studentListItem, $itemsPerPage) {

		var $paginationDiv = '<div class="pagination"></div>';
		var $ul = '<ul></ul>';
		//append pagination div to .page and new ul to $paginationDiv
		$($paginationDiv).appendTo('.page').append($ul);


		//calculate number of pages needed
		var $numberOfPages = Math.ceil($studentListItem.length / $itemsPerPage);

		//append li's to $listContainer
		for (var i = 0; i < $numberOfPages; i++) {
			$('.pagination').find('ul').append('<li class="paginationBtns">'+ '<a href="#">'+ (i + 1) + '</a>' + '</li>');
		}

		
	},

	addPaginationButtons: function($studentListItem, $itemsPerPage) {
		//add click listener to each li
		$('.pagination').find('ul li a').on('click', function(e) {
			//prevent default behavior of going back to top of page on click
			e.preventDefault();
			//grab which link user clicks
			var $linkNumber = $(this).text();
			

			//select items that correspond to li that is 1 less than button clicked
			var $itemsToHide = $studentListItem.filter(':lt('+(($linkNumber-1) * $itemsPerPage) +')');

			//merge items that are less than and greater than button clicked to $itemsToHide
			$.merge($itemsToHide, $studentListItem.filter(':gt('+(($linkNumber * $itemsPerPage) -1) +')'));
			//hide items
			$itemsToHide.hide();

			//select items that should show
			var $itemsToShow = $($studentListItem).not($itemsToHide);
			//show items
			$itemsToShow.show();

			//toggle active class NOT WORKING
			$('li a').addClass('active');
			$('li a').removeClass('active');

		});
	},

	addSearchBar: function($studentListItem) {
	$('.page-header').append(
		'<div class="student-search">' +
		'<input id="searchBar" placeholder="Search for students...">' +
		'<button>Search</button'
		);
		//filter search results in real time
		var $studentName = $('.student-item div h3');	
		var $searchBar = $('#searchBar');
		var $studentEmail = $('.email');

		$($searchBar).keyup(function() {
			$($studentListItem).each(function() {
				if($(this).text().indexOf($searchBar.val().toLowerCase()) > -1) {
					$(this).show();
				} else {
					$(this).hide();
				}
			
			});
		});
    }	
}


















