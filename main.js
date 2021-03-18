let carts = document.querySelectorAll('.add-cart');

let product =[
{
	name: 'Gold Rose Necklace',
	tag: 'GoldRose',
	price: 20,
	inCart:0
},

{
	name: 'Gold Wasp Necklace',
	tag: 'wasp',
	price: 15,
	inCart:0
},
{
	name: 'Sliver Butterfly Necklace',
	tag: 'butterflySliver',
	price: 17,
	inCart:0
},
{
	name: 'Sliver Cross Bracelet',
	tag: 'Cross',
	price: 12,
	inCart:0
},
{
	name: 'Sliver Wasp Bracelet',
	tag: 'waspbraclet',
	price: 12,
	inCart:0
},
{
	name: 'Sliver Heart Bracelet',
	tag: 'heart',
	price: 15,
	inCart:0
}


];



for (let i=0; i< carts.length; i++){
	
	carts[i].addEventListener('click',() => {
		cartNumbers(product[i]);
		totalcost(product[i]);
		//console.log("Added To Cart");
		
	})

}
function onloadCartNumbers(){
	
	let productNumbers = localStorage.getItem('cartNumbers');
	
	if(productNumbers){
		
		document.querySelector('.basket span').textContent = productNumbers;
		
	}
	
	
}


function cartNumbers(product){
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);
	//console.log(productNumbers);
	
	
	if(productNumbers){
	localStorage.setItem('cartNumbers', productNumbers + 1);
	document.querySelector('.basket span').textContent = productNumbers + 1;
} else{
	
	localStorage.setItem('cartNumbers', 1);
	document.querySelector('.basket span').textContent = 1;
	
	
}
setItems(product);
		
} 
function setItems(product){
	
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	
	if(cartItems != null){
		
		if(cartItems[product.tag] == undefined){
			
			cartItems = {
				
				...cartItems,
				[product.tag]: product
			}
		}
		
		
		cartItems[product.tag].inCart += 1;
		
		
	} else{
		
	product.inCart = 1;
	cartItems = {
		
	[product.tag]: product
	}
		
	}
	
	localStorage.setItem("productsInCart", JSON.stringify (cartItems));
	
	
}

function totalcost(product){
	let cartCost = localStorage.getItem('totalcost');
	
	//console.log("my cart cost is", cartCost);
	if(cartCost != null){
		cartCost = parseInt(cartCost);
		
		localStorage.setItem("totalcost", cartCost +
		product.price);
	} else{
	localStorage.setItem("totalcost", product.price);
	}
	
}


function displayCart(){
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems)
	let productContainer = document.querySelector
	(".products");
	let cartCost = localStorage.getItem('totalcost');
	if(cartItems && productContainer){
		//console.log("running");
		productContainer.innerHTML = "";
		Object.values(cartItems).map(item =>{
			productContainer.innerHTML += `
		<div class="product">
		<ion-icon name="close-circle" onclick="DeleteItem(${item.inCart});"></ion-icon>
		<span> ${item.name}</span>
		<img src="./images/${item.tag}.jpg">
		<div class = "quantity">
		<ion-icon name="caret-back"></ion-icon>
		<span> ${item.inCart} </span>
		<ion-icon name="caret-forward"></ion-icon>
		
		</div>
		
		<div class="total">  &#163 ${item.inCart * item.price}.00
		</div>
		</div>
		
		

			`;
			
				
		});
		productContainer.innerHTML += `
		
		<div class="basketTotalContainer">
		<h4 class="basketTotalTitle">
		Total:
		</h4>
		<h4 class="basketTotal">
		&#163 ${cartCost}.00
		</h4>
		`;
		
		
		
		
	}
	//console.log(cartItems)<div class = "price"> ${item.price}</div> <img src="./images/${item.tag}.jpg">;		
}

function DeleteItem(){
	var existingItems = localStorage.getItem('cartItems');
	//existingItems = $.parseJSON(existingItems);
	var itemIndex = product.indexOf(1);
	
	existingItems.removeItem(itemIndex, 1);
	localStorage.setItem('existingItems', JSON.stringify(existingItems));
	
	
	
}

onloadCartNumbers();
displayCart();
//DeleteItem();





