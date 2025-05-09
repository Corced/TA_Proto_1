// Sample data to populate the table
const dataTamu = [
    {
        id: "1234",
        nama: "Natalia Sarah",
        instansi: "SMKN 2 SINGOSARI",
        keperluan: "Rapat Kepala Sekolah",
        tanggalKunjungan: "25 April 2025",
        jamMasuk: "10:10",
        jamKeluar: "12:30",
        petugasPenerima: "Raisa Leza"
    },
    // Add more rows if needed
];

// Function to populate the table
function populateTable() {
    const tbody = document.getElementById("data-tamu-body");
    dataTamu.forEach((tamu) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${tamu.id}</td>
            <td>${tamu.nama}</td>
            <td>${tamu.instansi}</td>
            <td>${tamu.keperluan}</td>
            <td>${tamu.tanggalKunjungan}</td>
            <td>${tamu.jamMasuk}</td>
            <td>${tamu.jamKeluar}</td>
            <td>${tamu.petugasPenerima}</td>
        `;
        tbody.appendChild(row);
    });
}

// Export button functionality
document.getElementById("export-button").addEventListener("click", () => {
    alert("Export functionality is not implemented yet.");
});

// Populate the table on page load
populateTable();