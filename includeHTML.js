function includeHTML() {
	var z, i, elmnt, file, xhttp;
	/*loop through a collection of all HTML elements:*/
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("w3-include-html");
		if (file) {
			/*make an HTTP request using the attribute value as the file name:*/
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4) {
					if (this.status == 200) {
						elmnt.innerHTML = this.responseText;
					}
					if (this.status == 404) {
						elmnt.innerHTML = "Page not found.";
					}
					/*remove the attribute, and call this function once more:*/
					elmnt.removeAttribute("w3-include-html");
					includeHTML();
				}
			};
			xhttp.open("GET", file, true);
			xhttp.send();
			/*exit the function:*/
			return;
		}
	}
}

document.querySelectorAll(".f1-table tbody tr").forEach((row) => {
	const teamCell = row.querySelector("td:nth-child(3)"); // Teamname
	const colorCell = row.querySelector("td:nth-child(2)"); // Car Placeholder

	if (teamCell && colorCell) {
		const teamName = teamCell.textContent.trim();
		const colors = teamColors[teamName];

		if (colors) {
			colorCell.innerHTML = `<div class="car-placeholder" style="--color-left: ${colors[0]}; --color-right: ${colors[1]}"></div>`;
		}
	}
});
