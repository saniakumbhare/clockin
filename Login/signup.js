document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const employeeId = document.getElementById('employeeId').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;

    // Example validation (you may want to add more robust validation)
    if (!email || !password || !employeeId) {
        document.getElementById('registerError').textContent = 'Please fill out all fields.';
        return;
    }

    // Example registration logic (you should implement your own backend for real applications)
    const newUser = {
        name: name,
        email: email,
        employeeId: employeeId,
        role: role,
        password: password
    };

    // Example: Store user in localStorage (for demonstration purposes)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Display success message
    document.getElementById('registerSuccess').textContent = 'Registration successful!';

    // Clear form fields after successful registration (optional)
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('employeeId').value = '';
    document.getElementById('role').value = 'employee';
    document.getElementById('password').value = '';
});

