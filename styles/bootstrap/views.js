var grid = document.getElementById('sortbydate');
var my_switch = false;
grid.onclick = function(e) {
	if (e.target.tagName != 'TH') return;
	sortGrid(e.target.cellIndex, e.target.getAttribute('data-type'));
};

function viewcounter(){
	var viewed = 0;
	var tbody = grid.getElementsByTagName('tbody')[0];
	var num_of_rows = tbody.childElementCount;
	var rowsArray = [].slice.call(tbody.rows);
	for(var i = 0; i < num_of_rows; i++){
		if (rowsArray[i].cells[2].innerHTML == 'Переглянуто') {
			viewed++;
		}
	}
	grid.parentElement.previousElementSibling.innerHTML += ': ' + viewed + '/' + num_of_rows;
}

function sortGrid(colNum, type) {
	var tbody = grid.getElementsByTagName('tbody')[0];
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