const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML=`
    <div class="nav">
    <a href="/"><img src="../img/dark-logo.png" alt="" class="brand-logo" alt=""></a>
    <div class="nav-items">
             <div class="search">
                <input type="text" class="search-box" placeholder="buscar marca, producto">
                <button class="search-btn">Buscar</button>
            </div>
            <a>
                <img src="../img/user.png" id="user-img" alt="">
                <div class="login-logout-popup hide">
                    <p class="account-info">Inicio sesion como, </p>
                    <button class="btn" id="user-btn">Salir</button>
               </div>
                </a>
                <a href="/cart"><img src="../img/cart.png" alt=""></a>
         </div>
    </div>
    <ul class="links-container">
        <li class="link-item"><h2><a href="#home" class="link">home</a></h2></li>
        <li class="link-item"><h2><a href="../mujer.html" class="link">women</a></h2></li>
        <li class="link-item"><h2><a href="#" class="link">men</a></h2></li>
        <li class="link-item"><h2><a href="#" class="link">kids</a></h2></li>
        <li class="link-item"><h2><a href="#" class="link">accesorios</a></h2></li>
    </ul>   
`;
}

createNav();

// nav popup
const userImageButton =document.querySelector('#user-img');
const userPop =document.querySelector('.login-logout-popup');
const popuptext =document.querySelector('.account-info');
const actionBtn =document.querySelector('#user-btn');

userImageButton.addEventListener('click', () => {
    userPop.classList.toggle('hide');
})

window.onload = () => {
        let user = JSON.parse (sessionStorage.user || null);
        if(user != null){
            //means user is looged is
            popuptext.innerHTML = `Inicio sesion como, ${user.name}`;
            actionBtn.innerHTML = 'Salir';
            actionBtn.addEventListener('click', () => {
                sessionStorage.clear();
                location.reload();
            })
        } else {
            //user is logged out
            popuptext.innerHTML = 'inicia sesión para realizar tu pedido';
            actionBtn.innerHTML = 'Iniciar Sesion';
            actionBtn.addEventListener('click', () => {
                location.href = '/login';
            })


        }
}

const searchBtn = document.querySelector( '.search-btn');
const searchBox = document.querySelector( '.search-box');
searchBtn.addEventListener('click', () => {
    if(searchBox.value.length){
        location.href = `/search/${searchBox.value}`
    }
})
