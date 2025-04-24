const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function register(){
	var name = document.getElementById("signupname").value;
	var password = document.getElementById("signuppassword").value;
	var email = document.getElementById("signupemail").value;
	fetch('php/register.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: `name=${name}&password=${password}&email=${email}`
	})
	.then(response => response.text())
	.then(data => {
		if (data === 'success') {
			window.location.href = 'dashboard.html';
		} else {
			alert('Registration failed. Please try again.');
		}
	});
}
function login(){
	var email = document.getElementById("loginemail").value;
	var password = document.getElementById("loginpassword").value;
	fetch('php/login.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: `email=${email}&password=${password}`
	})
	.then(response => response.text())
	.then(data => {
		if (data === 'success') {
			window.location.href = 'dashboard.html';
		} else {
			alert('Login failed. Please try again.');
		}
	});
}