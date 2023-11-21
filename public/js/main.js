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

// copyrightSpan.innerHTML = `Copyright  &#169 ${fullYear} All Rights Reserved.`

// ----------------------------------------------------------------------

/*
let queryButton = document.getElementById('queryButton');
queryButton.parentElement.addEventListener('click', async function (e) {
  e.preventDefault();
  try {
    const response = await fetch('/api/v1/query');
    if (response.ok) {
      const data = await response.text();
      prompt('Query Data', data);
      console.log(data);
    } else {
      throw new Error('Error: ' + response.status);
    }
  } catch (error) {
    console.log('Error:', error);
  }
});

*/
function fetchData() {
  fetch('http://localhost:3000/api/v1/query', {
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
      // Create a new <div> element
      const newDiv = document.createElement('div');

      // Convert the data object to a string
      const dataString = JSON.stringify(data);

      // Set the content of the new <div> to the stringified data
      newDiv.textContent = dataString;

      // Append the new <div> to the document body
      document.body.appendChild(newDiv);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

document.getElementById('queryButton').parentElement.addEventListener('click', function (e) {
  e.preventDefault();
  fetchData();
});