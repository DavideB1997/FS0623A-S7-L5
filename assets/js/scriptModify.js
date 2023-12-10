function getInfo() {
	let nome = document.getElementById("nameField").value;
	let descrizione = document.getElementById("descriptionField").value;
	let brand = document.getElementById("brandField").value;
	let imageUrl = document.getElementById("imageUrlField").value;
	let prezzo = document.getElementById("priceField").value;

	let prodotto = {
		name: nome,
		description: descrizione,
		brand: brand,
		imageUrl: imageUrl,
		price: prezzo,
	};

	return JSON.stringify(prodotto);
}

let createBtn = document.querySelector("#createBtn");
createBtn.addEventListener("click", () => {
	event.preventDefault();
	posting();
	alert("oggetto creato!");
});

let modifyBtn = document.querySelector("#modifyBtn");
modifyBtn.addEventListener("click", (event) => {
	event.preventDefault();
	apiManipulation("PUT");
	alert("oggetto modificato!");
});

let deleteBtn = document.querySelector("#deleteBtn");
deleteBtn.addEventListener("click", (event) => {
	event.preventDefault();
	deleteItem();
});

let resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", (event) => {
	event.preventDefault();
	resetForm();
});

if (!localStorage.getItem("selectedItem")) {
	hideBtn("modifyBtn");
	hideBtn("deleteBtn");
} else {
	hideBtn("createBtn");
}

function hideBtn(val1) {
	let button = document.querySelector(`#${val1}`);
	button.style = "display:none";
}

function deleteItem() {
	let conferma = window.confirm("vuoi eliminare il prodotto?");
	if (conferma) {
		apiManipulation("DELETE");
		alert("oggetto eliminato!");
	}
}

function resetForm() {
	let conferma = window.confirm("Vuoi resettare il form?");
	if (conferma) {
		let form = document.getElementsByTagName("form")[0];
		form.reset();
		alert("Form resettato!");
	}
}

async function posting() {
	let response = await fetch(
		"https://striveschool-api.herokuapp.com/api/product/",
		{
			method: "POST",
			body: getInfo(),
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0Mzk5YWZlMDMxZTAwMTliYTFkYTkiLCJpYXQiOjE3MDIxMTU3MzgsImV4cCI6MTcwMzMyNTMzOH0.QVaLzb_fnw8oAOitMdREe_h0_G4YpYvgiuMq5e5jj1Y",
			},
		}
	);
}

async function apiManipulation(variable) {
	let parsedId = JSON.parse(localStorage.getItem("selectedItem"))._id;
	let url = "https://striveschool-api.herokuapp.com/api/product/";

	let response = await fetch(url + parsedId, {
		method: variable,
		body: getInfo(),
		headers: {
			"Content-Type": "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0Mzk5YWZlMDMxZTAwMTliYTFkYTkiLCJpYXQiOjE3MDIxMTU3MzgsImV4cCI6MTcwMzMyNTMzOH0.QVaLzb_fnw8oAOitMdREe_h0_G4YpYvgiuMq5e5jj1Y",
		},
	});
}
