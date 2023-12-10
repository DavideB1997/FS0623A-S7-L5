if (window.location.href.endsWith("index.html")) {
	localStorage.removeItem("selectedItem");

	fetch("https://striveschool-api.herokuapp.com/api/product/", {
		headers: {
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0Mzk5YWZlMDMxZTAwMTliYTFkYTkiLCJpYXQiOjE3MDIxMTU3MzgsImV4cCI6MTcwMzMyNTMzOH0.QVaLzb_fnw8oAOitMdREe_h0_G4YpYvgiuMq5e5jj1Y",
		},
	})
		.then((resp) => resp.json())
		.then((items) => {
			displayItems(items);
		})
		.catch((err) => console.error(err.message));
}

if (window.location.href.endsWith("productPg.html")) {
	if (localStorage.getItem("selectedItem")) {
		displayProductPage();
	} else {
		window.location = "index.html";
	}
}

function displayItems(items) {
	items.forEach((item) => {
		console.log(item);

		// Create a card element
		const card = document.createElement("div");
		card.classList.add("card", "my-1");
		card.style.width = "18rem";
		card.innerHTML = `
      <img src="${item.imageUrl}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <div class="row justify-content-evenly">
          <p class="card-text">${item.description}</p>
          <p class="card-text">prezzo : ${item.price} $</p>
        </div>
        <div class="row justify-content-evenly">
          <a href="productPg.html" class="discoverBtn col-5 btn btn-primary d-inline-block">Scopri</a>
          <a href="modifica.html" class="modifyBtn col-5 btn btn-primary d-inline-block">Modifica</a>
        </div>
      </div>`;

		itemWrapper.appendChild(card);

		addOnclick(item, card.querySelector(".discoverBtn"), "productPg.html");
		addOnclick(item, card.querySelector(".modifyBtn"), "modifica.html");
	});
}

function addOnclick(item, button, page) {
	button.addEventListener("click", (event) => {
		event.preventDefault();

		localStorage.setItem("selectedItem", JSON.stringify(item));
		window.location.href = page;
	});
}

function displayProductPage() {
	let item = JSON.parse(localStorage.getItem("selectedItem"));
	let productWrapper = document.querySelector("#productWrapper");

	productWrapper.innerHTML += ` 
  <div class="card mb-3">
  <img src="${item.imageUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">"${item.name}"</h5>
    <p class="card-text">"${item.description}"</p>
    <p class="card-text">"${item.price}"</p>
    
    <a href="modifica.html" class="col-5 btn btn-primary d-inline-block">Modifica</a>
    <div class="row">
          
    </div>
  </div>
 `;
}
