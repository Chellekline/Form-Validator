const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show error message
function showError(input, message){
    const formField = input.parentElement;
    formField.className = "form-field error";
    const small = formField.querySelector('small');
    small.innerText = message;
}

// form success - show outline
function showSuccess(input){
    const formField = input.parentElement;
    formField.className = "form-field success"
}

// confirm email is valid
function emailValidation(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else{
        showError(input, "Email is not valid");
    }
} 

// check all fields required
function requirementCheck(inputArgument){
    inputArgument.forEach(function(input) {
        if (input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        }   else{
            showSuccess(input);
        }
    });
}

// check length requirements
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    }   else if (input.value.length > max){
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    }
        else{
        showSuccess(input);
    }
}

// check password requirements
function passwordValidation(input) {
    const reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;
    if (reg.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input,'Password must be at least 6 characters, and include at least one uppercase letter, lowercase letter, number and symbol (!@#$%^&*)');
    }
  }

//confirm passwords match
function confirmPassword(input1,input2){
    if(input1.value !== input2.value){
        showError(input2, "Passwords must match")
    }
}

//get field name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listeners
form.addEventListener('submit', function(e){
    e.preventDefault();

    requirementCheck([username, email, password, password2]);
    checkLength(username, 5, 15);
    emailValidation(email);
    confirmPassword(password, password2);
    passwordValidation(password);
});