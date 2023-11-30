// brought with the form from codepen.io
// Get all form elements
let formElements = document.querySelectorAll('.form input, .form textarea');

// Attach event listeners to form elements
formElements.forEach(function (element) {
  element.addEventListener('keyup', handleEvent);
  element.addEventListener('blur', handleEvent);
  element.addEventListener('focus', handleEvent);
});

function handleEvent(e) {
  let thisElement = e.target;
  let label = thisElement.previousElementSibling;

  if (e.type === 'keyup') {
    if (thisElement.value === '') {
      label.classList.remove('active', 'highlight');
    } else {
      label.classList.add('active', 'highlight');
    }
  } else if (e.type === 'blur') {
    if (thisElement.value === '') {
      label.classList.remove('active', 'highlight');
    } else {
      label.classList.remove('highlight');
    }
  } else if (e.type === 'focus') {
    if (thisElement.value === '') {
      label.classList.remove('highlight');
    } else if (thisElement.value !== '') {
      label.classList.add('highlight');
    }
  }
}

// Get all tab links
let tabLinks = document.querySelectorAll('.tab a');

// Attach event listener to tab links
tabLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    let parent = this.parentNode;
    parent.classList.add('active');
    let siblings = parent.parentNode.children;
    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i] !== parent) {
        siblings[i].classList.remove('active');
      }
    }
    let target = this.getAttribute('href');
    let tabContents = document.querySelectorAll('.tab-content > div');
    tabContents.forEach(function (content) {
      if (content !== document.querySelector(target)) {
        content.style.display = 'none';
      }
    });
    document.querySelector(target).style.display = 'block';
  });
});
// -------------------------------------


// mine 🔽
document.querySelector('#signup form').addEventListener('submit', function (e) {
  e.preventDefault();
  const firstName = document.querySelector('input[name="fName"]').value;
  const lastName = document.querySelector('input[name="lName"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const data = {
    fName: firstName,
    lName: lastName,
    email: email,
    password: password
  };
  // const token = `Bearer ${something._id}`;//process.env.JWT_SECRET
  fetch('/api/v1/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // ,'Authorization': `Bearer ${token}`
      /*
      follow a server-side approach where the front-end sends a request to your server, and the server handles the authentication and authorization process. The server can then include the `Authorization` header with the appropriate token when making requests to external APIs or performing any authorized actions.
      Here's a general outline of the process:
      1. When the user logs in or authenticates on the front-end, send the credentials securely to the server.
      2. On the server-side, validate the credentials and generate an access token or session token.
      3. Store the access token or session token securely on the server, associating it with the authenticated user.
      4. When the front-end needs to make authorized requests, send the request to your server.
      5. On the server-side, retrieve the access token or session token associated with the user making the request.
      6. Include the `Authorization` header with the token when making requests to external APIs or performing authorized actions.
      By handling the token securely on the server-side, you can prevent clients from directly accessing sensitive information like the token.
      Remember to implement secure authentication and authorization mechanisms on the server-side, such as using secure protocols (HTTPS), hashing and salting passwords, and validating user credentials properly.
      */
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server
      console.log(data);
    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
});

// login form
document.querySelector('#login form').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.querySelector('#login input[name="email"]').value;
  const password = document.querySelector('#login input[name="password"]').value;
  const remember_me = document.querySelector('#login input[name="remember_me"]').checked;
  const data = {
    email: email,
    password: password,
    remember_me: remember_me
  };
  fetch('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      // Handle response
      console.log(response);
      return response.json(); // Parse the response as JSON
    })
    .then(data => {
      // Handle JSON data
      console.log(data);
    })
    .catch(error => {
      // Handle error
      console.log(error);
    });
});
// login form





/* 

<!--
Resource Allocation

2. Resource Allocation:
  - CPU and Memory Limits: Set appropriate CPU and memory limits for your containers based on the resource requirements of your applications.
  - Monitoring and Scaling: Monitor resource usage of your containers using tools like Docker stats, Prometheus, or cloud provider monitoring services.
  - Container Placement: Consider the placement of your containers across different hosts or nodes. Distribute containers based on resource availability and workload characteristics to optimize resource utilization and avoid bottlenecks.

and learn more about Healthchecks logging in docker-compose files

To reduce the cost of downloading static resources like styles.css and main.js every time a client moves through your pages, you can leverage browser caching.
Browser caching allows you to specify how long a browser should keep a copy of a resource (such as a CSS file) before requesting it again from the server. This can significantly reduce the number of requests made to your server and improve the performance of your website.
To enable browser caching for your static resources, you can set the `Cache-Control` header in your server's response to requests for these resources. For example, you can set the header to `public, max-age=31536000` to tell the browser to cache the resource for a year.
Here's an example of how you can set the `Cache-Control` header for static resources in an Express route:

```javascript
app.get('/styles.css', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.sendFile('/path/to/styles.css');
});

app.get('/main.js', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.sendFile('/path/to/main.js');
});
```

You can also configure your Nginx server to set the `Cache-Control` header for static resources. Here's an example of how you can set the header in an Nginx configuration file:

```
location /static/ {
  expires 1y;
  add_header Cache-Control "public, max-age=31536000";
}
```

By setting the `expires` directive to `1y`, you're telling the browser to cache the resource for a year. The `add_header` directive is used to add the `Cache-Control` header to the server's response.

With browser caching enabled, your clients' browsers will cache your static resources and only request them from the server when their cache expires. This can significantly reduce the number of requests made to your server and improve the performance of your website.

-->

<!-- 
  html req.body

  signup http://localhost:3000/api/v1/signup
  fName lName email password

  login http://localhost:3000/api/v1/login
  email
  password


  

  POST to http://localhost:3000/api/v1/login
  req.body:
  {
    "email":"www.bader.com9@gmail.com",
    "fName":"bader",
    "lName":"idris",
    "password":"iLoveHanady",
  }



  POST to http://localhost:3000/api/v1/login
  req.body:
  {
    "email":"www.bader.com9@gmail.com",
    "password":"iLoveHanady",
    "remember_me": true
  }






 so, if I send this request body as a post verb via postman:

  POST to http://localhost:3000/api/v1/login
  req.body:
  {
    "email":"www.bader.com9@gmail.com",
    "fName":"bader",
    "lName":"idris",
    "password":"iLoveHanady",
  }

into this path:
http://localhost:3000/api/v1/signup


will it get sent to my server without any front-end issue??
-->
*/