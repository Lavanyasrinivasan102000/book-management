async function addCustomer(event) {
    event.preventDefault();

    const username = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Form validation
    if (username === '' || email === '' || password === '' ) {
        alert('Please fill in all fields correctly.');
        return;
    }

    const formData = {
      username: username,
      email: email,
      password: password,
      role: role
    };

    console.log('User entered:', role);

    try {
      const response = await fetch('http://localhost:9000/addCustomer', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify(formData),
      });

      code = response.status;
      const responseData = await response.json();

      console.log(code);
      if (code === 201) {
        alert('Customer Added Successfully');
        window.location.href = 'home.html';
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Frontend JavaScript
async function loginUser(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const formData = {
      username: username,
      password: password
    };
  
    try {
      const response = await fetch('http://localhost:9000/customerLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      if (response.ok) {
        // If login is successful (status 200), do something (e.g., redirect)
        window.location.href = 'home.html';
      } else {
        // If login fails, show an error message
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  }

  // Admin Login
async function adminloginUser(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const formData = {
      username: username,
      password: password
    };
  
    try {
      const response = await fetch('http://localhost:9000/adminLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
      if (response.ok) {
        // If login is successful (status 200), do something (e.g., redirect)
        window.location.href = 'home.html';
      } else {
        // If login fails, show an error message
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  }
  
  // Frontend JavaScript
async function logoutUser() {
    try {
      const response = await fetch('http://your_backend_api/logout', {
        method: 'GET'
      });
  
      const data = await response.json();
      if (response.ok) {
        // If logout is successful (status 200), do something (e.g., redirect)
        window.location.href = 'login.html';
      } else {
        // If logout fails, show an error message
        alert(data.message || 'Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while logging out. Please try again.');
    }
  }
  