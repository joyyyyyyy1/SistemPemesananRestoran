// Data pesanan awal
let orders = [];

// Fungsi untuk menampilkan data pesanan ke tabel
function displayOrders() {
    const orderTable = document.getElementById('orderTable');
    orderTable.innerHTML = ""; // Hapus data lama

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.menu}</td>
            <td>${order.jumlah}</td>
        `;
        orderTable.appendChild(row);
    });
}

// Fungsi untuk menambahkan pesanan
function addOrder() {
    const menuName = document.getElementById('menuName').value;
    const menuJumlah = parseInt(document.getElementById('menuJumlah').value);

    if (menuName && menuJumlah) {
        orders.push({ menu: menuName, jumlah: menuJumlah });
        displayOrders(); // Memperbarui tabel dengan data terbaru
        document.getElementById('menuName').value = ""; // Kosongkan input
        document.getElementById('menuJumlah').value = ""; // Kosongkan input
    } else {
        alert("Mohon isi semua field!"); // Menampilkan peringatan jika ada input yang kosong
    }
}

// Fungsi untuk mengurutkan pesanan berdasarkan jumlah menggunakan Quick Sort
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    let pivot = arr[arr.length - 1];
    let left = [];
    let right = [];
    
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].jumlah > pivot.jumlah) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Fungsi untuk mengurutkan pesanan
function sortOrders() {
    orders = quickSort(orders);
    displayOrders(); // Memperbarui tabel dengan data yang sudah diurutkan
}

// Fungsi untuk melakukan Binary Search pada array yang sudah diurutkan
function binarySearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid].menu.toLowerCase() === target.toLowerCase()) {
            return mid;
        } else if (arr[mid].menu.toLowerCase() < target.toLowerCase()) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1; // Jika menu tidak ditemukan
}

// Fungsi untuk mencari pesanan berdasarkan nama menu
function searchOrder() {
    const searchInput = document.getElementById('searchInput').value;
    const sortedOrders = quickSort(orders); // Urutkan terlebih dahulu
    const index = binarySearch(sortedOrders, searchInput);

    const orderTable = document.getElementById('orderTable');
    orderTable.innerHTML = ""; // Hapus data lama

    if (index !== -1) {
        const order = sortedOrders[index];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.menu}</td>
            <td>${order.jumlah}</td>
        `;
        orderTable.appendChild(row);
    } else {
        alert("Menu tidak ditemukan!");
    }
}
