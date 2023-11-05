//to retrieve all the cart items
document.addEventListener('DOMContentLoaded',()=>{
    let addtocartBtn=document.querySelectorAll('.add-to-cart-btn')
    console.log(addtocartBtn)
    addtocartBtn.forEach((e)=>{
        console.log(e)
        e.addEventListener("click", (event) => {
        // console.log(e.target)
        let ProductInfo=e.parentNode.parentNode
        console.log(ProductInfo)
        let ProductName = ProductInfo.querySelector('.product-title').innerText
        let ProductPrice=ProductInfo.querySelector('.product-price').innerText
        let ProductImg=ProductInfo.querySelector('.product-img').src
        console.log(ProductImg)
        console.log(ProductName)
        console.log(ProductPrice)
        let SelectedItems={
            name:ProductName,
            price : ProductPrice,
            imgUrl:ProductImg
        }
        //passing the selected as parameter to addtocart function to push it into empty array

        AddToCart(SelectedItems)
    })
    })
})

//empty array to store the selected cart items
const CartItems=[]


console.log(CartItems)






// function to add items to cart
function AddToCart(products) {
    // console.log(products)
    let existingItems=CartItems.find(item=>item.name==products.name)
    if(existingItems){
        existingItems.quantity++
    }
    else{
        CartItems.push({...products,quantity:1})
    }
    //to update the cart page
    UpdateCartUI()
    localStorage.setItem('cartitem',JSON.stringify(CartItems))
}

// function to update the cart UI
function UpdateCartUI() {
    
    let CartItem=document.querySelector('.cart_items') // ul elements
    CartItem.innerHTML=''
    // console.log(CartItem)
    //printing added array in the cart
    CartItems.forEach((item)=>{
        // console.log(item) //object data
        //step 1
        let Cartprod=document.createElement('li')
        // this section is used to print all product details in the cart along with increase/decrease and remove functionalities
        Cartprod.innerHTML=`       
        <div class="product">
      <img src="${item.imgUrl}" class="product-img" />
      <div class="product-info">
        <h4 class="product-title">${item.name}</h4>
        <p class="product-price">${item.price}</p>
        <span>Quantity:${item.quantity}</span>
        <div class="quantitycon">
            <button class="IncreaseQuan">+</button>
            <span class="quantity-val">${item.quantity}</span>
            <button class="DecreaseQuan">-</button>
        </div>
        <button class="remove-Quantity">remove</button>

      </div>
      </div>
      `;
   
    //step2
    //accessing the increase and decrease and remove buttons along with quantity value
    const QuantityConEle=Cartprod.querySelector('.quantitycon')
    const increaseQuaEle=QuantityConEle.querySelector('.IncreaseQuan')
    const DecreaseQuaEle=QuantityConEle.querySelector('.DecreaseQuan')
    const RemoveQuantityEle=Cartprod.querySelector('.remove-Quantity')
    const QuantityValele=Cartprod.querySelector('.quantity-val')
    //step3
    //adding functionality to increase/decrease/remove buttons through addeventlisteners
    
    //adding addeventlistener for increase quantity
    increaseQuaEle.addEventListener('click',()=>{
        HandleIncQuantity(item,QuantityValele)   

    })

    //adding addeventlistener for decrease quantity
    DecreaseQuaEle.addEventListener('click',()=>{
        HandleDecreQuantity(item,QuantityValele)
    })

    //adding addeventlistener for remove quantity

    RemoveQuantityEle.addEventListener('click',()=>{
        RemoveItem(item)
    })


    //append the li child to ul list
    CartItem.appendChild(Cartprod)
})
}

//function to increase the quantity
function HandleIncQuantity(item,QuantityValele){
    item.quantity++
    QuantityValele.textContent=item.quantity
    //calling the UpdateCartUI() to update the quantities in the ui
    UpdateCartUI()
    UpdateCartTotal()
    UpdateCartIcon()

}

//function to decrease the quantity
function HandleDecreQuantity(item,QuantityValele){
    if (item.quantity > 1){
        item.quantity--
        QuantityValele.textContent=item.quantity
    }
   //calling the UpdateCartUI() to update the quantities in the ui
   UpdateCartUI()
   UpdateCartTotal()
   UpdateCartIcon()
}

//function to remove single item
function RemoveItem(item){
    const index=CartItems.findIndex((product)=>product.name === item.name)
    if (index!==-1){
        if(CartItems[index].quantity>1){
            CartItems[index].quantity--
        }
        else{
            CartItems.splice(index,1);
        }
    }
     //calling the UpdateCartUI() to update the quantities in the ui
   UpdateCartUI()
   UpdateCartTotal()
   UpdateCartIcon()
}


//function to Update cart Total
function UpdateCartTotal() {
    const cartTotalcontEle=document.querySelector('#cart-total')  
    const CartTotal=CartItems.reduce((total,item)=>total+item.price*item.quantity,0)
    cartTotalcontEle.textContent=CartTotal

        
   
}

//function to increase cart icon value
function UpdateCartIcon() {
    const CartIconTotal = document.querySelector('#cart-icon')
    const cartIconVal=CartItems.reduce((total,item)=>total+item.quantity,0)
    CartIconTotal.textContent=cartIconVal

    


}

//function to remove all items in the cart
function Removeall(){
    CartItems.splice(0)
    localStorage.clear()
    UpdateCartUI();
}
//function to load all the cartitems into the ui
function LoadCartUi(){
 const StoredItems=localStorage.getItem('cartitem')
 if(StoredItems){
    CartItems.push(...JSON.parse(StoredItems))
    UpdateCartIcon()
    UpdateCartTotal()
    UpdateCartUI() 
    


 }
}

//to load when browser is opened
LoadCartUi()
