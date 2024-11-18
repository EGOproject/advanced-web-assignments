
const container = document.getElementById('containerls');
const registerBtn = document.getElementById('register');
const registerTxt = document.getElementById('altsignup');
const loginBtn = document.getElementById('login');
const loginTxt = document.getElementById('altlogin');

registerBtn.addEventListener('click', () =>{
    container.classList.add('active');
});
registerTxt.addEventListener('click', () =>{
    container.classList.add('active');
});

loginBtn.addEventListener('click', () =>{
    container.classList.remove('active');
});
loginTxt.addEventListener('click', () =>{
    container.classList.remove('active');
});

