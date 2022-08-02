const createNav = () => {
    let nav = document.querySelector('.navbar');

    
    nav.innerHTML = `
    <div class="nav">
    <a href="/"><img src="../img/dark-logo.png" alt="" class="brand-logo" alt=""></a>
    <div class="nav-items">
             <div class="search">
                <input type="text" class="search-box" placeholder="¿Qué Buscas?">
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
    <div class="respmenu">
    <input type="checkbox">
    <i class="fas fa-bars"></i>
    <i class="fas fa-times"></i>
    <nav>
    <ul class="links-container">
        <li class="link-item"><a href="/" class="link">Inicio</a></li>
        <li class="link-item"><a href="../mujer.html" class="link">Mujer</a></li>
        <li class="link-item"><a href="../hombres.html" class="link">Hombres</a></li>
        <li class="link-item"><a href="../ninos.html" class="link">Niños</a></li>
        <li class="link-item"><a href="../accesorios.html" class="link">Accesorios</a></li>
    </ul> 
    </nav>
    </div>
    </div>
`;
};



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