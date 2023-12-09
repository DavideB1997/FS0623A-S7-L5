if (window.location.href.endsWith("index.html")) {
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

function displayItems(items) {
	items.forEach((item) => {
		console.log(item);
		itemWrapper.innerHTML += `
					<div class="card my-1" style="width: 18rem">
						<img src="${item.imageUrl}" class="card-img-top" alt="..." />
						<div class="card-body">
							<h5 class="card-title">"${item.name}"</h5>
              <div class="row justify-content-evenly">
                <p class="card-text">
					  			"${item.description}"
						    </p>
                <p class="card-text">
							  	prezzo : "${item.price}" $
							  </p>
              </div>
							
							<div class="row justify-content-evenly ">
								<a href="#" id="discoverBtn" class="col-5 btn btn-primary d-inline-block">Scopri</a>
								<a href="#" class="col-5 btn btn-primary d-inline-block">Modifica</a>
							</div>
						</div>
				</div> `;
	});
	buttons();
}

function buttons(item) {
	let discoverBtn = document.querySelector("#discoverBtn");

	discoverBtn.addEventListener("click", () => {
		window.location = "productPg.html";
		displayProductPage(item);
	});
}

let productWrapper = document.querySelector("#productWrapper");

function displayProductPage(item) {
	productWrapper.innerHTML += ` 
  <div class="card mb-3">
  <img src="${item.imageUrl}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">"${item.name}"</h5>
    <p class="card-text">"${item.description}"</p>
    <p class="card-text">"${item.price}"</p>
  </div>
</div>`;
}
