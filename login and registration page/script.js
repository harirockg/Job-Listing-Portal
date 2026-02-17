/**
 * Job Listing Portal - Authentication Logic
 * Vanilla JavaScript - Human Written
 */

document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');

    // 1. Password Visibility Toggle
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            togglePasswordBtn.textContent = isPassword ? 'Hide' : 'Show';
        });
    }

    // 2. Form Validation Helper
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const showError = (inputElement, errorElement, message) => {
        inputElement.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('visible');
        }
    };

    const clearError = (inputElement, errorElement) => {
        inputElement.classList.remove('error');
        if (errorElement) {
            errorElement.classList.remove('visible');
        }
    };

    // 3. Login Form Logic
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const emailErr = document.getElementById('email-error');
            const passErr = document.getElementById('password-error');

            // Reset errors
            clearError(email, emailErr);
            clearError(password, passErr);

            // Validate Email
            if (!email.value.trim()) {
                showError(email, emailErr, 'Email is required to sign in');
                isValid = false;
            } else if (!validateEmail(email.value)) {
                showError(email, emailErr, 'Please enter a valid email address');
                isValid = false;
            }

            // Validate Password
            if (!password.value.trim()) {
                showError(password, passErr, 'Password is required to sign in');
                isValid = false;
            }

            if (isValid) {
                console.log('Login Form Submitted Successfully:', {
                    email: email.value
                });
                // Pro-tip: Here you would typically send data to your backend
                alert('Login attempt successful! (Client-side check passed)');
            }
        });
    }

    // 4. Registration Form Logic
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const fullName = document.getElementById('full-name');
            const email = document.getElementById('email');
            const role = document.getElementById('role');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');

            const nameErr = document.getElementById('name-error');
            const emailErr = document.getElementById('email-error');
            const roleErr = document.getElementById('role-error');
            const passErr = document.getElementById('password-error');
            const confirmErr = document.getElementById('confirm-error');

            // Reset all errors
            [fullName, email, role, password, confirmPassword].forEach(el => clearError(el));
            [nameErr, emailErr, roleErr, passErr, confirmErr].forEach(el => {
                if (el) el.classList.remove('visible');
            });

            // Validate Full Name
            if (!fullName.value.trim()) {
                showError(fullName, nameErr, 'Please tell us your name');
                isValid = false;
            }

            // Validate Email
            if (!email.value.trim()) {
                showError(email, emailErr, 'Email is required for registration');
                isValid = false;
            } else if (!validateEmail(email.value)) {
                showError(email, emailErr, 'This email format doesn\'t look right');
                isValid = false;
            }

            // Validate Role
            if (!role.value) {
                showError(role, roleErr, 'Please select if you are a Student or Recruiter');
                isValid = false;
            }

            // Validate Password Rules
            const passValue = password.value;
            const hasUpper = /[A-Z]/.test(passValue);
            const hasNumber = /[0-9]/.test(passValue);

            if (passValue.length < 8 || !hasUpper || !hasNumber) {
                showError(password, passErr, 'Password must be 8+ chars, include an uppercase and a number');
                isValid = false;
            }

            // Validate Confirm Password
            if (confirmPassword.value !== passValue) {
                showError(confirmPassword, confirmErr, 'Passwords do not match. Please try again.');
                isValid = false;
            } else if (!confirmPassword.value) {
                showError(confirmPassword, confirmErr, 'Please confirm your password');
                isValid = false;
            }

            if (isValid) {
                console.log('Registration Form Submitted Successfully:', {
                    name: fullName.value,
                    email: email.value,
                    role: role.value
                });
                alert('Account created successfully! (Client-side check passed)');
            }
        });
    }

    // 5. Social Login Feedback
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.id.includes('google') ? 'Google' : 'GitHub';
            console.log(`Social Auth triggered for: ${provider}`);
            alert(`${provider} authentication would be triggered here in a real application.`);
        });
    });
});
