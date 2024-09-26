window.onload = function() {

    if (!getCookie("cookiesAccepted")) {
        document.getElementById("cookieConsent").style.display = "block";
    } else {
        const savedEmail = getCookie("userEmail");
        if (savedEmail) {
            document.getElementById("email").value = savedEmail;
        }
    }

    document.getElementById("acceptCookies").onclick = function() {
        setCookie("cookiesAccepted", "true", 5);
        document.getElementById("cookieConsent").style.display = "none";
    }

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());

        // save cookie 5 days
        setCookie("userEmail", formObject.email, 5);

        fetch('send_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
            // document.getElementById('response').innerText = 'Повідомлення успішно відправлено!';
        })
        .catch(error => {
            console.error('Error:', error);
            // document.getElementById('response').innerText = 'Виникла помилка при відправленні повідомлення.';
        });
    });
};

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
