const allProducts = [{
    name: 'New Product',
    price: 99.99,
    image_url: 'https://images.unsplash.com/photo-1629738601425-494c3d6ba3e2?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'This is a new product.',
    inStoke: true
},
{
    name: 'Saffron',
    price: 93.00,
    image_url: 'https://cdn.pixabay.com/photo/2013/11/22/19/43/saffron-215932_1280.jpg',
    description: 'Example description.',
    inStoke: false
},
{
    name: 'Dates',
    price: 100.0,
    image_url: 'https://images.pexels.com/photos/3993529/pexels-photo-3993529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'This is a new product.',
    inStoke: true
},
{
    name: 'Honey',
    price: 999.99,
    image_url: 'https://images.pexels.com/photos/302163/pexels-photo-302163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'This is a new product.',
    inStoke: true
},
{
    name: 'Saffron',
    price: 93.00,
    image_url: 'https://cdn.pixabay.com/photo/2013/11/22/19/43/saffron-215932_1280.jpg',
    description: 'Example description.',
    inStoke: false
},
{
    name: 'Dates',
    price: 100.0,
    image_url: 'https://images.pexels.com/photos/3993529/pexels-photo-3993529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'This is a new product.',
    inStoke: true
},
{
    name: 'Honey',
    price: 999.99,
    image_url: 'https://images.pexels.com/photos/302163/pexels-photo-302163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'This is a new product.',
    inStoke: true
},
];

async function insertProducts() {
    const { data, error } = await supabase
    .from('products')
    .insert(allProducts)
    if (error) {
        console.error("Error inserting products:", error);
    } else {
        console.log("Products inserted successfully:", data);
    }
}

// Only run this once to seed the database
// insertProducts();
async function fetchProducts() {
    const { data: products, error } = await supabase
    .from('products')
    .select('*');
    if (error) {
        console.error("Error fetching products:", error);
        return []; // Return an empty array so the app doesn't crash
    }

    return products;
}


async function displayProducts() {

        const productList = document.getElementById('product-list');
        const products = await fetchProducts(); // Fetch the products from Supabase
        if (!products) {
            productList.innerHTML = '<p>Failed to load products.</p>';
            return;
        }
        productList.innerHTML += products.map(product => 
            `  <div class="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
            <a href="/pages/product-details.html?id=${product.id}"> 
            <img src="${product.image_url}" alt="${product.name}" class="w-full h-64 object-cover">
            </a>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">${product.name}</h3>
                    <div class="flex items-center justify-center gap-2 mb-4">
                        <span class="text-gray-500 line-through">$99.99</span>
                        <span class="text-red-600 text-xl font-bold">$${product.price}</span>
                    </div>
                    <div class="flex justify-center space-x-3">
                        <button class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                        </button>
                        <button class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            `
        ).join(' ')
}

displayProducts()


// document.getElementById('btn').addEventListener('click', insertProducts)
