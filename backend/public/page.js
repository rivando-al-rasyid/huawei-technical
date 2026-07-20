const form = document.querySelector(".formPendaftaran");
const nama = document.querySelector(".nama");
const email = document.querySelector(".email");
const btnMuatData = document.querySelector(".btn-fetch");
const kontainerData = document.querySelector(".kontainerData");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const namaValue = nama.value.trim();
  const emailValue = email.value.trim();

  if (namaValue === "") {
    alert("Nama tidak boleh kosong!");
    return;
  }

  if (emailValue === "") {
    alert("Email tidak boleh kosong!");
    return;
  }

  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailValue)) {
    alert("Format email tidak valid!");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: namaValue,
        email: emailValue,
      }),
    });

    const data = await response.json();
    alert(data.message);

    nama.value = "";
    email.value = "";
  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan saat mengirim data.");
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