var grid = document.getElementById('sortbydate');
var tbody = grid.getElementsByTagName('tbody')[0];
var results_t = document.getElementById('results_t');
var results_b = results_t.getElementsByTagName('tbody')[0];
var my_switch = false;

grid.onclick = function(e) {
	if (e.target.tagName != 'TH') return;
	sortGrid(e.target.cellIndex, e.target.getAttribute('data-type'));
};

function viewcounter(){
	var viewed = 0;
	var num_of_rows = tbody.childElementCount;
	var rowsArray = [].slice.call(tbody.rows);
	for(var i = 0; i < num_of_rows; i++){
		if (rowsArray[i].cells[2].innerHTML == 'Переглянуто') {
			viewed++;
		}
	}
	grid.parentElement.previousElementSibling.innerHTML += ': ' + viewed + '/' + num_of_rows;

	var search_word;
	var add;
	find_bound = function(element, index, array){
		if(element.cells[1].innerHTML == search_word){
			element.cells[2].innerHTML += '<br>' + add;
			element.cells[2].style.color = 'green';
			return true;
		}
		return false;
	}

	var num_of_rows = results_b.childElementCount;
	var resultsArray = [].slice.call(results_b.rows);
	for(var i = 0; i < num_of_rows; i++){
		search_word = resultsArray[i].cells[2].innerHTML;
		add = resultsArray[i].cells[1].innerHTML;
		rowsArray.find(find_bound);
	}
}

function sortGrid(colNum, type) {
	var rowsArray = [].slice.call(tbody.rows);
	var compare;
	my_switch = !my_switch;
	switch (type) {
		case 'number':
			compare = function(rowA, rowB) {
				return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
			};
		break;
		case 'string':
			compare = function(rowA, rowB) {
				if(rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML){
					return (my_switch) ? 1 : -1;
				}
				if(rowA.cells[colNum].innerHTML < rowB.cells[colNum].innerHTML){
					return (my_switch) ? -1 : 1;
				}
				return 0;
			};
		break;
	}
	rowsArray.sort(compare);
	grid.removeChild(tbody);
	for (var i = 0; i < rowsArray.length; i++) {
		tbody.appendChild(rowsArray[i]);
	}
	grid.appendChild(tbody);
}

viewcounter();