const form = document.getElementById("formNilai");
const listNilai = document.getElementById("listNilai");

async function loadData(){

    const res = await fetch("/nilai");
    const data = await res.json();

    listNilai.innerHTML = "";

    data.forEach(item => {

        let statusClass = "pending";

        if(item.status === "Dikonfirmasi"){
            statusClass = "acc";
        }

        if(item.status === "Ditolak"){
            statusClass = "reject";
        }

        listNilai.innerHTML += `
            <div class="card">

                <h3>${item.nama}</h3>

                <p>Mata Kuliah: ${item.matkul}</p>

                <p>Nilai: ${item.nilai}</p>

                <p class="${statusClass}">
                    ${item.status}
                </p>

                <p>Komentar Dosen: ${item.komentar || "-"}</p>

            </div>
        `;
    });
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const matkul = document.getElementById("matkul").value;
    const nilai = document.getElementById("nilai").value;

    await fetch("/nilai", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            nama,
            matkul,
            nilai
        })
    });

    form.reset();

    loadData();
});

loadData();