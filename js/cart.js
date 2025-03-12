const tableContainer = document.querySelector("#table_container");
const totalAmount = document.querySelector("#totalAmount");

console.log(supabase);
// fetch user data
const activeUser = JSON.parse(localStorage.getItem("activeUser"));

console.log(activeUser);
let sum = 0;
// fetch cart items user

const getCartItems = async () => {
  try {
    const { data: cartItemsData, error: cartItemError } = await supabase
      .from("cart")
      .select()
      .eq("userId", activeUser.userId);
    if (cartItemError) throw cartItemError;
    if (cartItemsData) {
      tableContainer.innerHTML = "";
      cartItemsData.map((cartItem) => {
        sum = sum + cartItem.quantity * cartItem.product_price;
        return (tableContainer.innerHTML += `
        <tr class="border-b hover:bg-gray-50 transition duration-200">
                      <td class="py-4 px-4 text-center">
                        <a href="#" class="text-gray-500 hover:text-red-500 transition duration-200">
                          <i class="fas fa-times-circle"></i>
                        </a>
                      </td>
                      <td class="py-4 px-4 text-center">
                        <img alt="Product image" class="w-16 h-16 object-cover rounded-lg" src='${
                          cartItem.product_url
                        }'/>
                      </td>
                      <td class="py-4 px-4 text-center text-gray-700">${
                        cartItem.product_name
                      }</td>
                      <td class="py-4 px-4 text-center text-gray-700">$${
                        cartItem.product_price
                      }</td>
                      <td class="py-4 px-4 text-center">
                        <input class="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" value="${
                          cartItem.quantity
                        }"/>
                      </td>
                      <td class="py-4 px-4 text-center text-gray-700">$${(
                        cartItem.quantity * cartItem.product_price
                      ).toFixed(2)}</td>
                    </tr>
      `);
      });
      totalAmount.textContent = sum;
    }
  } catch (cartItemError) {
    console.log(cartItemError);
  }
};

window.onload = getCartItems();
