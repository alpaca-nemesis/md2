function ShowLogin() {
    document.getElementById('shade').classList.remove('hide');
    document.getElementById('loginmodal').classList.remove('hide');
}

function ShowReg() {
    document.getElementById('shade').classList.remove('hide');
    document.getElementById('regmodal').classList.remove('hide');
}

function Hide() {
    document.getElementById('shade').classList.add('hide');
    document.getElementById('loginmodal').classList.add('hide');
    document.getElementById('regmodal').classList.add('hide');
}