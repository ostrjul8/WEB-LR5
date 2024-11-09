//1
const block3 = document.querySelector('.block-3');
const block6 = document.querySelector('.block-6');

const contentBlock3 = block3.innerHTML;
const contentBlock6 = block6.innerHTML;

block3.innerHTML = contentBlock6;
block6.innerHTML = contentBlock3;

//2
const base1 = 10; 
const base2 = 15;
const height = 8; 

function calculateTrapezoidArea() {
    const area = ((base1 + base2) * height) / 2;

    const block5 = document.querySelector('.block-5');

    const resultElement = document.createElement('p');
    resultElement.textContent = `Площа трапеції: ${area}`;

    block5.appendChild(resultElement);
}

calculateTrapezoidArea();

//3
function findDivisors() {
    const number = parseInt(document.getElementById("numberInput").value);
    if (isNaN(number) || number < 1) {
        alert("Введіть коректне натуральне число.");
        return;
    }

    const divisors = [];
    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            divisors.push(i);
        }
    }

    const result = "Дільники числа " + number + ": " + divisors.join(", ");
    alert(result);
    setCookie("divisors", result, 1);
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split(";");
    for (let i = 0; i < cookiesArray.length; i++) {
        let c = cookiesArray[i];
        while (c.charAt(0) === " ") c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

window.onload = function() {
    const savedDivisors = getCookie("divisors");
    const divisorForm = document.getElementById("divisorForm");

    if (savedDivisors) {
        const userResponse = confirm("У вас є збережені дані: " + savedDivisors + ". Зберегти дані з cookies?");
        
        if (userResponse) {
            setCookie("cookiesSaved", "true", 365);
            alert("Дані з cookies збережено. Перезавантажте сторінку для початкового стану.");
            divisorForm.style.display = "none";
        } else {
            deleteCookie("divisors");
            deleteCookie("cookiesSaved");
            alert("Cookies видалено.");
            location.reload();
        }
    } else {
        divisorForm.style.display = "block";
    }
};

//4
document.addEventListener("DOMContentLoaded", function() {
    const capitalizeRadios = document.querySelectorAll('input[name="capitalize"]');
    const block4 = document.querySelector(".block-4");

    function setCapitalization(enable) {
        if (enable) {
            block4.style.textTransform = "capitalize";
        } else {
            block4.style.textTransform = "none";
        }
    }

    const savedSetting = localStorage.getItem("capitalizeWords");
    if (savedSetting) {
        setCapitalization(savedSetting === "on");
        document.querySelector(`input[value="${savedSetting}"]`).checked = true;
    }

    capitalizeRadios.forEach((radio) => {
        radio.addEventListener("change", function() {
            const selectedValue = this.value;
            setCapitalization(selectedValue === "on");

            localStorage.setItem("capitalizeWords", selectedValue);
        });
    });
});

//5
document.addEventListener("DOMContentLoaded", () => {
    const blockX = document.getElementById("blockX");
    const block5 = document.getElementById("block5");
    const block4 = document.getElementById("block4");
    const imageFormContainer = document.getElementById("imageFormContainer");
    const numberInputURL = document.getElementById("numberInputURL");

    blockX.addEventListener("click", () => {
        imageFormContainer.style.display = "block";
    });

    loadImages();

    window.insertImage = () => {
        const url = numberInputURL.value;
        if (url) {
            addImageToBlock(url);
            saveImageToLocalStorage(url);
            numberInputURL.value = ""; 
        }
    };

    function saveImageToLocalStorage(url) {
        let images = JSON.parse(localStorage.getItem("images")) || [];
        images.push(url);
        localStorage.setItem("images", JSON.stringify(images));
    }

    function loadImages() {
        const images = JSON.parse(localStorage.getItem("images")) || [];
        images.forEach(url => addImageToBlock(url));
    }

    function addImageToBlock(url) {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("image-container");

        const img = document.createElement("img");
        img.src = url;
        img.alt = "Image";
        img.style.width = "100px";
        img.style.height = "auto";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Видалити";
        deleteButton.addEventListener("click", () => {
            removeImageFromLocalStorage(url);
            block4.removeChild(imgContainer);
        });

        imgContainer.appendChild(img);
        imgContainer.appendChild(deleteButton);
        block4.appendChild(imgContainer);
    }

    function removeImageFromLocalStorage(url) {
        let images = JSON.parse(localStorage.getItem("images")) || [];
        images = images.filter(imageUrl => imageUrl !== url);
        localStorage.setItem("images", JSON.stringify(images));
    }
});


