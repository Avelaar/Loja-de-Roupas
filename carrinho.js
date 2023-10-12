document.addEventListener("DOMContentLoaded", function() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let cart = [];

    function getURLParams() {
        const params = new URLSearchParams(window.location.search);
        const product = params.get("product");
        const price = parseFloat(params.get("price"));
        if (product && !isNaN(price)) {
            addProductToCart(product, price);
            updateCart(); // Correção: Chamada para atualizar o carrinho quando a página é carregada
        }
    }




    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        for (let item of cart) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td><input type="number" value="${item.quantity}" min="1" data-name="${item.name}"></td>
                <td>R$ ${item.price.toFixed(2)}</td>
                <td>R$ ${(item.price * item.quantity).toFixed(2)}</td>
                <td><a class="btn red remove-from-cart" data-name="${item.name}" href="#">Remover</a></td>
            `;
            cartItems.appendChild(row);
            total += item.price * item.quantity;
        }
        cartTotal.textContent = total.toFixed(2);
    }

    function addProductToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart(); // Correção: Chamada para atualizar o carrinho após adicionar um produto
        console.log('Produto adicionado ao carrinho:', name, 'Preço:', price);
    }
    getURLParams();
    // Correção: Agora, nós vamos usar a classe ".add-to-cart" para adicionar ao carrinho
    
    document.addEventListener("change", function(e) {
        if (e.target.tagName === "INPUT" && e.target.getAttribute("data-name")) {
            const name = e.target.getAttribute("data-name");
            const quantity = parseInt(e.target.value);
            const product = cart.find(item => item.name === name);
            if (product) {
                product.quantity = quantity;
            }
            updateCart();
        }
    });
    
    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("add-to-cart")) {
            const name = e.target.getAttribute("data-name");
            const price = parseFloat(e.target.getAttribute("data-price"));
            addProductToCart(name, price);
            updateCart(); // Atualize o carrinho ao adicionar um produto
        }

        if (e.target.classList.contains("remove-from-cart")) {
            const name = e.target.getAttribute("data-name");
            const productIndex = cart.findIndex(item => item.name === name);
            if (productIndex !== -1) {
                cart.splice(productIndex, 1);
                updateCart(); // Atualize o carrinho ao remover um produto
            }
        }
    });
});



const cartItemCount = null; // Substitua por sua lógica real para obter a contagem de itens no carrinho

// Atualiza o número de itens no carrinho no elemento HTML
const cartCountElement = document.getElementById('cartItemCount');
if (cartItemCount > 0) {
    cartCountElement.textContent = cartItemCount;
} else {
    cartCountElement.style.display = 'none'; // Esconde o contador se não houver itens no carrinho
}
