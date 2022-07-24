let user = JSON.parse(sessionStorage.user || null);
let loader = document.querySelector('.loader');

//verificar que el usuario haya iniciado sesión o no
window.onload = () => {
    if(user){
        if(!compareToken(user.authToken, user.email)){
            location.replace('/login');
        }
    } else{
        location.replace('/login');
    }

}

//entrada de precios

const actualPrice = document.querySelector('#actual-price');
const discountPercentage = document.querySelector('#discount');
const sellingPrice = document.querySelector('#sell-price');

discountPercentage.addEventListener('input', () => {
    if(discountPercentage.value >100){
        discountPercentage.value = 90;
    }else {
        let discount = actualPrice.value * discountPercentage.value / 100;
        sellingPrice.value = actualPrice.value - discount;
    }
})

sellingPrice.addEventListener ('input', () => {
    let discount = (sellingPrice.value / actualPrice.value)*100;
    discountPercentage.value = discount;
})

//cargar el identificador de imagen
let uploadImages = document.querySelectorAll('.fileupload');
let imagePaths = []; //Almacenará todas las rutas de imágenes cargadas

uploadImages.forEach((fileupload, index) => {
    fileupload.addEventListener('change', () => {
        const file = fileupload.files[0];
        let imageUrl;

        if(file.type.includes('image')){
            //significaque el usuario subió una imagen
            fetch('/s3url').then(res => res.json())
            .then(url => {
                fetch(url, {
                    method: 'PUT',
                    headers: new Headers({'Content-Type': 'multipart/form-data'}),
                    body:file
                }).then(res => {
                    imageUrl = url.split("?")[0];
                    imagePaths[index] =imageUrl;
                    let label = document.querySelector(`label[for=${fileupload.id}]`);
                    label.style.backgroundImage = `url(${imageUrl})`;
                    let productImage =document.querySelector('.product-image');
                    productImage.style.backgroundImage = `url(${imageUrl})`;
                })
            })
        }else{
            showAlert('SUBIR IMAGEN SOLAMENTE ');
        }
    })
})

//envio de formula 
const productName = document.querySelector('#product-name');
const shortLine = document.querySelector('#short-des');
const des = document.querySelector('#des');

let sizes = []; //almacenará todos los tamaños

const stock = document.querySelector('#stock');
const tags = document.querySelector('#tags');
const tac = document.querySelector('#tac');

// buttons
const addProductBtn = document.querySelector('#add-btn');
const saveDraft = document.querySelector('#save-btn');

// función de tamaño de tienda
const storeSizes = () => {
    sizes = [];
    let sizeCheckBox = document.querySelectorAll('.size-checkbox');
    sizeCheckBox.forEach(item => {
            if(item.checked){
                sizes.push(item.value);
            }
    })
}

const validateForm = () => {
    if(!productName.value.length){
        return showAlert('introducir nombre del producto');
    } else if(shortLine.value.length > 100 || shortLine.value.length<10){
        return showAlert('breve descripción debe tener entre 10 y 100 letras');
    }else if(!des.value.length){
        return showAlert('ingrese una descripción detallada sobre el producto');
    }else if(!imagePaths.length){// matriz de enlaces de imagen
        return showAlert('sube al menos una imagen de producto');
    } else if (!sizes.length){// matriz de tamaño
        return showAlert('seleccione al menos un tamaño');
    } else if (!actualPrice.value.length || !discount.value.length || !sellingPrice.value.length){
        return showAlert('debes agregar precios');
    } else if (stock.value < 20){
        return showAlert('debe tener al menos 20 artículos en stock');
    } else if (!tags.value.length){
        return showAlert('ingrese algunas etiquetas para ayudar a clasificar su producto en la búsqueda');
    } else if(!tac.checked){
        return showAlert('debes aceptar nuestros términos y condiciones');
    }
    return true;
}

const productData = () => {
    let tagArr = tags.value.split(',');
    tagArr.forEach((item, i) => tagArr[i] = tagArr[i].trim());
    return data = {
        name: productName.value,
        shortDes: shortLine.value,
        des: des.value,
        images: imagePaths,
        sizes: sizes,
        actualPrice: actualPrice.value,
        discount: discountPercentage.value,
        sellPrice: sellingPrice.value,
        stock: stock.value,
        tags: tagArr,
        tac: tac.checked,
        email: user.email
    }
}

addProductBtn.addEventListener('click', () => {
    storeSizes();
    //validando formulario
    if(validateForm()){ // validateForm devuelve verdadero o falso mientras se realiza la validación 
     loader.style.display = 'block';
     let data = productData();
     if (productId){
        data.id = productId;
     }
     sendData('/add-product', data);
    }
})

//guardar en borrador
saveDraft.addEventListener('click', ()=> {
    //store sizes
    storeSizes();
    //check for product name
    if(!productName.value.length){
    showAlert('Ingrese el nombre del producto');
    } else {
    let data = productData();
    data.draft = true;
    if(productId){
        data.id = productId;
    }
    sendData('/add-product', data);
}
})

// identificador de detalles del producto existente

const setFormsData = (data) => {
    productName.value = data.name;
    shortLine.value = data.shortDes;
    des.value= data.des;
    actualPrice.value = data.actualPrice;
    discountPercentage.value = data.discountPercentage;
    sellingPrice.value = data.sellPrice;
    stock.value = data.stock;
    tags.value = data.tags;

    //set up images
imagePaths = data.images;
imagePaths.forEach((url, i) =>{
    let label = document.querySelector(`label[for=${uploadImages[i].id}]`);
    label.style.backgroundImage = `url(${url})`;
    let productImage = document.querySelector('.product-image');
    productImage.style.backgroundImage= `url(${url})`;
})

//setup sizes;
sizes = data.sizes;

let sizeCheckBox = document.querySelectorAll('.size-checkbox');
  sizeCheckBox.forEach(item => {
    if(sizes.includes(item.value)){
        item.setAttribute('checked',' ');
    }
})
}

const fetchProductData = () =>{
    //eliminar el producto temporal de la sesión
    fetch('/get-products', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({email: user.email, id: productId})
    })
    .then((res) => res.json())
    .then(data => {
        setFormsData(data);
           })
    .catch(err => {
      //location.replace('/seller');
        console.log(err);
    })
}

let productId = null;
if(location.pathname != '/add-product'){
    productId =decodeURI(location.pathname.split('/').pop());

        fetchProductData();

}