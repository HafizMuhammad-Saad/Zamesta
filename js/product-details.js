function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('id');
}

async function fetchProductDetails(id) {
    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single(); // Get a single product by ID

    if (error) {
        console.error('Error fetching product:', error);
        document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
        return;
    }
     // Display product details
     displayProductDetails(product);
    }

     // Function to display product details on the page
     function displayProductDetails(product) {
        const productDetailsContainer = document.getElementById('product-details');
        productDetailsContainer.innerHTML += `

      <div class="col-lg-2 d-flex flex-column d-none d-lg-flex gap-3 p-0">
        <div class="img_box p-3">
          <img src="${product.image_url}" alt="${product.name}">
        </div>
        <div class="img_box p-3">
          <img src="${product.image_url}" alt="">
        </div>
        <div class="img_box p-3">
          <img src="${product.image_url}" alt="">
        </div>
        <div class="img_box p-3">
          <img src="${product.image_url}" alt="">
        </div>

      </div>
      <div class="col-lg-5 col-sm-12 main_img_container">
        <img src="${product.image_url}" alt="">
      </div>
      <div class="col-lg-4 col-sm-12 d-flex gap-4 flex-column ">
        <h5>${product.name}</h5>
        <div class="ratings d-flex gap-3">
          <div class="stars d-flex gap-2 ">
            <div class="star">
              <img src="./../assets/product_details/icon/star.png" alt="">
            </div>
            <div class="star">
              <img src="./../assets/product_details/icon/star.png" alt="">
            </div>
            <div class="star">
              <img src="./../assets/product_details/icon/star.png" alt="">
            </div>
            <div class="star">
              <img src="./../assets/product_details/icon/star.png" alt="">
            </div>
            <div class="star">
              <img src="./../assets/product_details/icon/unfield star.png" alt="">
            </div>

          </div>
          <div class="reviws">
            ( 150 Reviews )
          </div>
          <div class="stock_details d-flex gap-3">
            <span>|</span>
            <span>${product.inStoke ? 'In Stock' : 'Out of Stock'}</span>
          </div>


        </div>
        <div class="price">
          <h4>$ ${product.price}</h4>
          <p class="product_details pb-3 border-bottom ">${product.description}.</p>
        </div>

        <div class="product_colours d-flex gap-4">
          <span class="colour_heading">Colours :</span>
          <div class="select_colour d-flex ">
            <div class="form-check ">
              <input class="form-check-input " type="radio" name="flexRadioDisabled" id="flexRadioDisabled" checked>

            </div>
            <div class="form-check">
              <input class="form-check-input " type="radio" name="flexRadioDisabled" id="flexRadioCheckedDisabled"
                style="background-color: #e07575;">
            </div>
          </div>

        </div>
        
        <div class="purching_options d-flex justify-content-between align-items-center">
          <div class="change_qauntity ">
            <span class="">-</span> <span>2</span> <span>+</span>
          </div>
          <div class="purchase_btn">
            <button class=" w-100 ">Buy Now</button>
          </div>
          <div class="addFavories_btn ">
            <button>🤍</button>
          </div>
        </div>
        <div class="return_delivery border ">
          <div class="delivery d-flex border-bottom p-3 gap-4">
            <div class="icon">
              <img src="../assets/product_details/icon/icon-delivery.png" alt="">
            </div>
            <div class="delivery_details ">
              <h6>Free Delivery</h6>
              <small>Enter your postal code for Delivery Availability</small>
            </div>
          </div>
          <div class="return d-flex p-3 gap-4">
            <div class="icon">
              <img src="../assets/product_details/icon/Icon-return.png" alt="">
            </div>
            <div class="return_details">
              <h6>Return Delivery</h6>
              <small>Free 30 Days Delivery Returns. Details</small>
            </div>
          </div>
        </div>
      </div>
        `;
    }

     // Main logic
     const productId = getProductIdFromUrl();
     if (productId) {
         fetchProductDetails(productId);
     } else {
         document.getElementById('product-details').innerHTML = '<p>No product selected.</p>';
     }