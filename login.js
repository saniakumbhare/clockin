document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const employeeId = document.getElementById('employeeId').value;
    const password = document.getElementById('password').value;

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Validate login credentials
    const user = users.find(user => user.employeeId === employeeId && user.password === password);

    if (user) {
        // Redirect based on user role
        if (user.role === 'manager') {
            window.location.href = '../Manager/manager.html';
        } if(user.role === 'employee') {
            window.location.href = '../Employee/employee.html';
        }
    } else {
        document.getElementById('loginError').textContent = 'Invalid Employee ID or Password';
    }
});
