const allProducts = [{
    name: 'New Product',
    price: 99.99,
    image_url: 'https://images.unsplash.com/photo-1629738601425-494c3d6ba3e2?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'This is a new product.',
    rating: 4,
    category: 'dates',
    inStoke: true
},
{
    name: 'Saffron',
    price: 93.00,
    image_url: 'https://cdn.pixabay.com/photo/2013/11/22/19/43/saffron-215932_1280.jpg',
    description: 'Example description.',
    rating: 3,
    category: 'saffron',
    inStoke: false
},
{
    name: 'Dates',
    price: 100.0,
    image_url: 'https://images.pexels.com/photos/3993529/pexels-photo-3993529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'This is a new product.',
    rating: 4,
    category: 'dates',
    inStoke: true
},
{
    name: 'Honey',
    price: 999.99,
    image_url: 'https://images.pexels.com/photos/302163/pexels-photo-302163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'This is a new product.',
    rating: 2.5,
    category: 'honey',
    inStoke: true
},
{
    name: 'Saffron',
    price: 93.00,
    image_url: 'https://cdn.pixabay.com/photo/2013/11/22/19/43/saffron-215932_1280.jpg',
    description: 'Example description.',
    rating: 4.5,
    category: 'saffron',
    inStoke: false
},
{
    name: 'Dates',
    price: 100.0,
    image_url: 'https://images.pexels.com/photos/3993529/pexels-photo-3993529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'This is a new product.',
    rating: 3.5,
    category: 'dates',
    inStoke: true
},
{
    name: 'Honey',
    price: 999.99,
    image_url: 'https://images.pexels.com/photos/302163/pexels-photo-302163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'This is a new product.',
    rating: 1.5,
    category: 'honey',
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
// insertProducts()

async function fetchFilterProducts(category, maxPrice, minPrice, minRating) {
    let query = supabase.from('products').select('*')

    if (category) {
        query = query.eq('category', category)
    }
    else if ( minPrice && maxPrice ) {
        query = query.gte('price', minPrice).lte('price', maxPrice)
    }
    else if (minPrice) {
        query = query.gte('price', minPrice);
    } else if (maxPrice) {
        query = query.lte('price', maxPrice);
    }
    if ( minRating ) {
        query = query.gte('rating', minRating);
    }
    const {data: products, error} = await query;

    if (error) {
        console.error("Error fetching filtered products:", error);
        return [];
    }

    return products;
}


async function displayProducts(products) {

    const productList = document.getElementById('product-list');

    productList.innerHTML = '';

    // const products = await fetchProducts(); // Fetch the products from Supabase
   if (!products || products.length === 0) {
        productList.innerHTML = '<p>No products found.</p>';
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
                    <p>Rating: ${product.rating} ⭐</p>
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


document.getElementById('applyFilters').addEventListener('click', async () => {
    const category = document.getElementById('categoryFilter').value
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const minRating = document.getElementById('ratingFilter').value;
    const filteredProducts = await fetchFilterProducts(
        category,
        parseFloat(minPrice),
        parseFloat(maxPrice),
        parseFloat(minRating)
    );
    displayProducts(filteredProducts)

})

/// Fetch All Products on Page Load
async function fetchAllProducts() {
    const { data: products, error } = await supabase.from('products').select('*');
    
    if (error) {
        console.error("Error fetching all products:", error);
        return [];
    }

    return products;
}


// Initial Load
(async () => {
    const allProducts = await fetchAllProducts();
    displayProducts(allProducts); // Display all products initially
})();

// document.getElementById('btn').addEventListener('click', insertProducts)
