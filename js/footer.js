const createFooter = () =>{
    let footer= document.querySelector('.footer');
    
    footer.innerHTML=  `
    <script src="https://kit.fontawesome.com/41bcea2ae3.js" crossorigin="anonymous"></script>

    <div class="container__footer">
            <div class="box__footer">
                <div class="logo">
                    <img src="img/pollitos.png" alt="">
                </div>
                <div class="terms">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas impedit cum cumque velit libero officiis quam doloremque reprehenderit quae corporis! Delectus architecto officia praesentium atque laudantium, nam deleniti sapiente deserunt.</p>
                </div>
            </div>
            <div class="box__footer">
                <h2>Soluciones</h2>
                <a href="https://www.google.com">App Desarrollo</a>
                <a href="#">App Marketing</a>
                <a href="#">IOS Desarrollo</a>
                <a href="#">Android Desarrollo</a>
            </div>

            
            <div class="box__footer">
                <h2>Integrantes</h2>
                <a href="https://github.com/DiegoRod24"><i class="fa-brands fa-github"></i>  Diego Rodriguez</a>
                <a href="https://github.com/RaulAraujoB"><i class="fa-brands fa-github"></i>   Raúl Araujo</a>
                <a href="https://github.com/YessicaManrique"><i class="fa-brands fa-github"></i>  Yessica Manrique</a>
                <a href="https://github.com/RaulAraujoB"><i class="fa-brands fa-github"></i>  Fernando Cangana</a>              
            </div>

            <div class="box__footer">
                <h2>Redes Sociales</h2>
                <a href="https://www.facebook.com/"><i class="fa-brands fa-facebook"></i>    Facebook</a>
                <a href="https://twitter.com"><i class="fa-brands fa-twitter"></i>  Twitter</a>
                <a href="https://www.instagram.com/"><i class="fa-brands fa-instagram"></i>  Instagram</a>
                <a href="https://www.instagram.com/"><i class="fa-brands fa-instagram"></i>  hi</a>
            </div>

            
        </div>

        <div class="box__copyright">
            <hr>
            <p>Todos los derechos reservados © 2022 <b>Pollitos en Fuga</p>
        </div>
        `



}


createFooter();