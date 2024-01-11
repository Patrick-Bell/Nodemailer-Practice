const sendBtn = document.querySelector('.send-btn');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const numInput = document.getElementById('phone');
const subjectInput = document.getElementById('subject');

const nameIcon = document.querySelector('.name-icon');
const numIcon = document.querySelector("#num-icon")

const nameError = document.querySelector('.name-error');
const emailError = document.querySelector('.email-error');
const numError = document.querySelector('.num-error');
const subjectError = document.querySelector('.subject-error');

numInput.addEventListener("input", () => {
    let phone = numInput.value;
    phoneTemplate = /^0\d{10}$/;
    includesPhoneTemplate = phoneTemplate.test(phone);
    let letters = /[a-zA-Z]/;

    if (phone.length === 0) {
        numError.style.display = "none";
        numIcon.style.display = "none";
    } else if (includesPhoneTemplate) {
        numError.style.display = "none";
        numError.innerHTML = "";
        numIcon.style.display = "block";
        numIcon.classList.remove('bx-x-circle');  // Remove the 'bx-x-circle' class
        numIcon.classList.add('bx-check-circle');
        numIcon.style.color = "green";
    } else if (phone.match(letters)){
        numError.style.display = "block";
        numError.innerHTML = "Phone number should not contain letters";
        numIcon.style.display = "block";
        numIcon.classList.remove('bx-check-circle');  // Remove the 'bx-check-circle' class
        numIcon.classList.add('bx-x-circle');
        numIcon.style.color = "red";
    } else {
        numError.style.display = "block";
        numError.innerHTML = "Phone number must have 11 digits";
        numIcon.style.display = "block";
        numIcon.classList.remove('bx-check-circle');  // Remove the 'bx-check-circle' class
        numIcon.classList.add('bx-x-circle');
        numIcon.style.color = "red";
    }
});


sendBtn.addEventListener("click", () => {
    console.log("HI")
})
