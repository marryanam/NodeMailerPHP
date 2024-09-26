window.onload = function() {
    // Перевіряємо, чи вже була прийнята згода на кукі
    if (!getCookie("cookiesAccepted")) {
        document.getElementById("cookieConsent").style.display = "block";
    } else {
        // Заповнюємо поле email з кукі, якщо воно існує
        const savedEmail = getCookie("userEmail");
        if (savedEmail) {
            document.getElementById("email").value = savedEmail;
        }
    }

    // Обробляємо натискання кнопки "Прийняти"
    document.getElementById("acceptCookies").onclick = function() {
        setCookie("cookiesAccepted", "true", 5);
        document.getElementById("cookieConsent").style.display = "none";
    }

    // Обробляємо відправку форми
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());

        // Зберігаємо email в кукі на 5 днів
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

// Функція для створення кукі
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Функція для отримання кукі за назвою
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