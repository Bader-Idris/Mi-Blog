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

// ----------------------------------------------------------------------

function fetchData() {
  fetch('/api/v1/query', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .then((data) => {
      const newDiv = document.createElement('div');
      newDiv.className = 'query-yo'
      // Convert the data object to a string
      const dataString = JSON.stringify(data);
      newDiv.textContent = JSON.parse(dataString)[0];
      document.getElementById('queryButton').parentElement.append(newDiv)
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

document.getElementById('queryButton').parentElement.addEventListener('click', function (e) {
  e.preventDefault();
  fetchData();
});


// theme
// document.querySelector(".toggleWrapper").childNodes[1].checked true

// const themeCheck = document.querySelector(".toggleWrapper").childNodes[1];
// themeCheck.addEventListener("click", () => {
//   const colorScheme = themeCheck.checked ? 'dark' : 'light';

//   fetch('api/v1/updateColorScheme', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ colorScheme })
//   })
//     .then(response => response.json())
//     .then(data => {
//       // Update the UI based on the received data
//       updateColorScheme(data.colorScheme);
//     })
//     .catch(error => {
//       // Handle any errors that occur during the request
//       console.error(error);
//     });
// });
