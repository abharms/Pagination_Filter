
$(document).ready(function() {
	var $studentListItem = $('.student-item');
	var $listContainer = $('.student-list');
	//number of items we want to show on each page
	var $itemsPerPage = 10;
	
	view.hideItems($studentListItem, $itemsPerPage);
	view.appendItemsToPage($studentListItem, $itemsPerPage);
	view.paginationFunctionality($studentListItem, $itemsPerPage);
	view.addSearchBar($studentListItem);
	view.realTimeSearchResults($studentListItem, $itemsPerPage);
});


var view = {
	hideItems: function($studentListItem, $itemsPerPage) {
		//hide all items except first 10
		$studentListItem.filter(':gt('+($itemsPerPage -1) +')').hide();
	},

	appendItemsToPage: function($studentListItem, $itemsPerPage) {

		var $paginationDiv = '<div class="pagination"></div>';
		var $ul = '<ul></ul>';
		
		//append pagination div to .page and new ul to $paginationDiv
		$($paginationDiv).appendTo('.page').append($ul);


		//calculate number of pages needed
		var $numberOfPages = Math.ceil($studentListItem.length / $itemsPerPage);

		//append li's to .pagination div
		for (var i = 0; i < $numberOfPages; i++) {
			$('.pagination').find('ul').append('<li class="paginationBtns">'+ '<a href="#">'+ (i + 1) + '</a>' + '</li>');
		}

		//add active class to first pagination button on load
		$("li a:eq(0)").addClass('active');	
	},

	paginationFunctionality: function($studentListItem, $itemsPerPage) {
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

			//toggle active		
			$('li a').removeClass('active');
			$(this).addClass('active');

		});
	},

	addSearchBar: function() {
	$('.page-header').append(
		'<div class="student-search">' +
		'<input id="searchBar" placeholder="Search for students...">'
		);
    },

    realTimeSearchResults: function($studentListItem, $itemsPerPage) {

    	var $studentName = $('.student-item div h3');	
		var $searchBar = $('#searchBar');
		var $studentEmail = $('.email');

    	//filter search results in real time
		$($searchBar).keyup(function() {
			$($studentListItem).each(function() {
				if($(this).text().indexOf($searchBar.val().toLowerCase()) > -1) {
					$(this).show();

					//find how many items are being displayed after search performs filter
					var $howManyItemsDisplayed = $studentListItem.filter(function() {
						return $(this).css('display') !== 'none';
						console.log($howManyItemsDisplayed.length);
					});

					//remove all pagination buttons from page
					$('.paginationBtns').remove();

					//calculated number of pages to show based on how many search results are displayed
					var $numberOfPages = Math.ceil($howManyItemsDisplayed.length / $itemsPerPage);

					//append newly generated li's to .pagination div
					for (var i = 0; i < $numberOfPages; i++) {
						$('.pagination').find('ul').append('<li class="paginationBtns">'+ '<a href="#">'+ (i + 1) + '</a>' + '</li>');
					}

				} else {
					$(this).hide();
				}
			});
			view.paginationFunctionality($studentListItem, $itemsPerPage);
			view.hideItems($studentListItem, $itemsPerPage);	
		});
    }	
}


















