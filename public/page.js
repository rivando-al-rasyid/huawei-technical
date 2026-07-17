const form = document.querySelector(".formPendaftaran");
const nama = document.querySelector(".nama");
const email = document.querySelector(".email");
const btnMuatData = document.querySelector(".btn-fetch");
const kontainerData = document.querySelector(".kontainerData");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
        const response = await fetch(
            `http://localhost:3000/user/add?name=${encodeURIComponent(nama.value)}&email=${encodeURIComponent(email.value)}`,
            {
                method: "POST",
            }
        );

        const data = await response.json();
        alert(data.message);
        nama.value = "";
        email.value = "";
    } catch (err) {
        console.error(err);
    }
});

btnMuatData.addEventListener("click", async function () {
    try {
        const response = await fetch("http://localhost:3000/user/list");
        const users = await response.json();
        kontainerData.innerHTML = "";
        users.forEach((user) => {
            const p = document.createElement("p");
            p.textContent = `${user.name} - ${user.email}`;
            kontainerData.appendChild(p);
        });
    } catch (err) {
        console.error(err);
    }
});