const productImages = document.querySelectorAll(".product-images img");// seleccionamos las imagenes de product - imagenes
const productImageSlide = document.querySelector(".image-slider"); // seleccionamos image-slider

let activeImageSlide = 0; // imagen del control deslizante predeterminado

productImages.forEach((item, i) => { // recorriendo cada miniatura de imagen 
    item.addEventListener('click', () => { //agregando un evento de clic a cada miniatura de imagen
        productImages[activeImageSlide].classList.remove('active');// se remueve el active de activeImageSlide
        item.classList.add('active'); //agregar clase activa a la actual o al hacer clic
        productImageSlide.style.backgroundImage = `url('${item.src}')`;// actualizando la data y lo amacena en item.src
        activeImageSlide = i;// actualizando la variable del control deslizante de imagen para rastrear la secuencia
    })
})
 
//toggle size buttons

const sizeBtns = document.querySelectorAll('.size-radio-btn');// seleccionas el buton de tamaños
let checkedBtn = 0; //Actual botón seleccionar 
let size;

sizeBtns.forEach((item, i) => { //recorriendo cada botón
    item.addEventListener('click', () => { // agregando un evento de clic a cada
        sizeBtns[checkedBtn].classList.remove('check'); // eliminando la clase de verificación de chechedbTN
        item.classList.add('check'); //agregando clase de verificación al botón en el que se hizo clic
        checkedBtn = i; //actualizando la variable
        size = item.innerHTML;

    })
})  

const setData = (data) =>{
    let title = document.querySelector('title');

    //setup images
    productImages.forEach((img, i) =>{
        if(data.images[i]){
            img.src = data.images[i];
         } else {
            img.style.display = 'none';
         }
    })
    productImages[0].click();
    
    //setup size buttons
    sizeBtns.forEach(item =>{
        if(data.sizes.includes(item.innerHTML)){
            item.style.display = 'none';
        }
    })

    //setting up texts
    const name= document.querySelector('.product-brand');
    const shortDes = document.querySelector('.product-short-des');
    const des = document.querySelector('.des');

    title.innerHTML += name.innerHTML = data.name;
    shortDes.innerHTML = data.shortDes;
    des.innerHTML =data.des;

    //pricing
    const sellPrice= document.querySelector('.product-price');
    const actualPrice= document.querySelector('.product-actual-price');
    const discount= document.querySelector('.product-discount');

    sellPrice.innerHTML = `$${data.sellPrice}`;
    actualPrice.innerHTML = `$${data.actualPrice}`;
    discount.innerHTML = `( ${data.discount}% off )`;

    //wishlist and cart btn
    const wishListBtn = document.querySelector('.wishlist-btn');
    wishListBtn.addEventListener('click', () => {
        wishListBtn.innerHTML = add_product_to_cart_or_wishlist('wishlist', data);
    })

    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.addEventListener('click', () => {
        cartBtn.innerHTML = add_product_to_cart_or_wishlist('cart', data);
    })
}

//fetch data
const fetchProductData =() =>{
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({ 'Content-Type' : 'application/json'}),
        body: JSON.stringify({id: productId})
    })
    .then(res => res.json())
    .then(data =>{ 
        setData(data);
        getProducts(data.tags[1]).then(data => createProductSlider(data, '.container-for-card-slider', 'similar products'))
    })
    .catch(err => {
        location.replace('/404')
    })
}

let productId = null;
if(location.pathname != '/products'){
    productId = decodeURI(location.pathname.split('/').pop());
    fetchProductData();
}
