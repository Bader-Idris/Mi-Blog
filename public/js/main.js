const registerContainer = document.querySelector('.register');
registerContainer.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  const registerLink = e.target.childNodes[1];
  const registerUrl = registerLink.getAttribute('href');
  window.location.href = registerUrl;
});



const navOptions = document.querySelectorAll('.header .main-nav>li>a');
const copyrightSpan = document.querySelector('footer .copyright');

if (navOptions) {
  navOptions.forEach((e) => {
    // if (window.scrollY < 1000) navOptions[0].classList.add('active')
    e.addEventListener('click', function () {
      navOptions.forEach((el) => {
        el.classList.remove('active');
      });
      e.classList.add('active');
    });
    if (e.classList.contains('active')) {
      // Handle logic for elements initially marked as active
    }
  });
}

socialIcons = document.querySelectorAll('.social-contact .icons i');
if (socialIcons) {
  socialIcons.forEach(e => {
    e.addEventListener('click', (event) => {
      // console.log(socialIcons[0].src)
    });
  })
}
const curYear = new Date();// get it from server, users can change it
const fullYear = curYear.getFullYear();

copyrightSpan.innerHTML = `Copyright  &#169 ${fullYear} All Rights Reserved.`


/*
- views/
- tsconfig.json
- src/
  - routes/
    - mongodb.js
    - postgresql.js
    - redis.js
  - controllers/
    - mongodbController.js
    - postgresqlController.js
    - redisController.js
  - models/
    - mongodb/
      - userModel.js
      - ...
    - postgresql/
      - userModel.js
      - ...
    - redis/
      - cacheModel.js
      - ...
  - middleware/
    - authentication.js
    - ...
  - config/
    - database.js
    - redis.js
    - ...
  - ...
- public/
- package-lock.json
- package.json
- node_modules/
- Dockerfile
- dist/
- bin/
- b.yml
- a.yml
- README.md
- redis/
*/