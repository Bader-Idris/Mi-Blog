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

  // Serialize form data manually
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

  // Send request via fetch
  fetch('/api/v1/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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
  tell me more and in details about these options you provided:
Security Considerations
Resource Allocation

Certainly! Here are more details about security considerations and resource allocation when working with Docker containers:

1. Security Considerations:
   - Secure Passwords: Ensure that you use strong, unique passwords for services inside your Docker containers, including databases like MongoDB and PostgreSQL. Weak passwords can make your containers vulnerable to unauthorized access.
   - Network Security: Limit access to your containers by configuring network security rules. Utilize firewalls, network policies, or security groups to restrict access to specific ports and IP addresses.
   - Container Isolation: Isolate your containers from each other to minimize the impact of potential security breaches. Use separate networks or network segments for different services to prevent lateral movement within your infrastructure.
   - Image Security: Use trusted base images from official sources or reputable repositories. Regularly update your images to ensure you have the latest security patches and bug fixes.
   - Secrets Management: Avoid hard-coding sensitive information like passwords or API keys in your Docker Compose files. Instead, use secrets management tools like Docker Swarm secrets, HashiCorp Vault, or cloud provider-specific secret management services to securely manage and distribute secrets to your containers.

2. Resource Allocation:
   - CPU and Memory Limits: Set appropriate CPU and memory limits for your containers based on the resource requirements of your applications. This prevents containers from monopolizing system resources and ensures fair resource allocation across all services.
   - Monitoring and Scaling: Monitor resource usage of your containers using tools like Docker stats, Prometheus, or cloud provider monitoring services. Scale your containers horizontally by increasing the number of replicas or vertically by allocating more resources to meet the demands of your application.
   - Container Sizing: Right-size your containers by analyzing the resource utilization patterns of your applications. Avoid over-provisioning or under-provisioning resources, as it can impact performance and efficiency.
   - Container Placement: Consider the placement of your containers across different hosts or nodes. Distribute containers based on resource availability and workload characteristics to optimize resource utilization and avoid bottlenecks.

Both security considerations and resource allocation are crucial aspects of running Docker containers in production environments. By implementing appropriate security measures and optimizing resource allocation, you can enhance the stability, performance, and security of your containerized applications. It's important to continuously review and update these aspects as your infrastructure and application requirements evolve.


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