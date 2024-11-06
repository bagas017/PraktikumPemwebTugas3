//Array kosong untuk menampung produk yang di tambahkan ke dalam keranjang (cart)
let cart = [];

//Array daftar produk dengan nama dan harga
const product = [
  { name: "GOLDEA", price: 1000000 },
  { name: "SAUVAGE", price: 1500000 },
  { name: "COCO CHANEL", price: 3000000 },
  { name: "VILLORESI", price: 2000000 },
  { name: "Maison des Senteurs", price: 500000 },
  { name: "PRADA", price: 750000 }
];

//Fungsi untuk menambahkan produk ke keranjang
function addProductToCart(productIndex, inputID) {
  // mengambil nilai dari inputan user dengan id = inputID
  const inputElement = document.getElementById(inputID);
  // deklarasi variabel jumlah input produk dari value input element
  let jumlahInputProduct = parseInt(inputElement.value);

  // jika input tidak valid, diubah menjadi 0
  if (isNaN(jumlahInputProduct) || jumlahInputProduct <= 0) {
    jumlahInputProduct = 0;
  }

  // jika input tidak sama dengan 0
  if (jumlahInputProduct > 0) {
    // menegecek apakah produk yang ditambahkan sudah ada di keranjang
    const existingProductIndex = cart.findIndex((item) => item.name === product[productIndex].name);

    // jika produk sudah ada
    if (existingProductIndex !== -1) {
      // Jika produk sudah ada, tambahkan jumlah dan perbarui total harga
      cart[existingProductIndex].quantity += jumlahInputProduct;
      cart[existingProductIndex].totalPrice = cart[existingProductIndex].price * cart[existingProductIndex].quantity;
    } else {
      // jika produk belum ada, tambahkan ke keranjang
      const totalPrice = product[productIndex].price * jumlahInputProduct;
      cart.push({ name: product[productIndex].name, price: product[productIndex].price, quantity: jumlahInputProduct, totalPrice: totalPrice });
    }
  }

  // mengosongkan value input setelah menambahkan produk ke keranjang
  inputElement.value = '';

  // memperbarui keranjang
  updateCart();
}

//Fungsi untuk memperbarui keranjang
function updateCart() {
  // mengambil nilai dari element dengan id = cartItems
  const cartItems = document.getElementById("cartItems");
  // mengosongkan keranjang
  cartItems.innerHTML = "";

  // menambahkan setiap produk ke keranjang
  cart.forEach((product, index) => {
    // membuat row pada table untuk setiap produk
    const row = document.createElement("tr");

    // Kolom Nama Barang
    // membuat cell untuk nama barang
    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;
    row.appendChild(nameCell);

    // Kolom Jumlah
    // membuat cell untuk jumlah
    const quantityCell = document.createElement("td");
    quantityCell.textContent = product.quantity;
    row.appendChild(quantityCell);

    // Kolom Harga Satuan
    // membuat cell untuk harga satuan
    const unitPriceCell = document.createElement("td");
    unitPriceCell.textContent = `Rp ${product.price.toFixed(2)}`;
    row.appendChild(unitPriceCell);

    // Kolom Harga Total
    // membuat cell untuk harga total
    const totalPriceCell = document.createElement("td");
    totalPriceCell.textContent = `Rp ${product.totalPrice.toFixed(2)}`;
    row.appendChild(totalPriceCell);

    // Kolom Tombol Hapus
    // membuat cell untuk tombol hapus
    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";
    deleteButton.onclick = () => removeItem(index);
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    // menambahkan row ke keranjang
    cartItems.appendChild(row);
  });

  // memperbarui subtotal, diskon, dan total
  const { subtotal, discount, total } = calculateTotal();
  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("discount").textContent = discount + "%";
  document.getElementById("total").textContent = total.toFixed(2);
}

// Fungsi untuk menghapus produk dari keranjang berdasarkan index
function removeItem(index) {
  // menghapus produk dari keranjang
  cart.splice(index, 1);
  // memperbarui keranjang
  updateCart();
}

// Fungsi untuk menghitung subtotal, diskon, dan total
function calculateTotal() {
  // Menghitung subtotal dengan menjumlahkan harga total dari setiap produk di keranjang
  let subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // Menghitung diskon
  let discount = 0;

  // Pembagian diskon berdasarkan subtotal
  if (subtotal > 2000000) {
    // 15% diskon jika lebih dari Rp 2.000.000
    discount = 15;
  } else if (subtotal > 1000000) {
    // 10% diskon jika lebih dari Rp 1.000.000
    discount = 10;
  }

  // Diskon tambahan jika ada lebih dari 5 produk
  if (cart.length > 5) {
    // 5% diskon
    discount += 5;
  }

  // Menghitung total
  const total = subtotal * (1 - discount / 100);

  // Mengembalikan subtotal, diskon, dan total
  return { subtotal, discount, total };
}
