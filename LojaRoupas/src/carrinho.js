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
        }
    }
    function atualizarContadorCarrinho() {
        var contador = document.getElementById('cartItemCount');
        var cart = localStorage.getItem('cart');
        if (cart) {
            cart = JSON.parse(cart);
            contador.innerText = cart.reduce((total, item) => total + item.quantity, 0);
        } else {
            contador.innerText = 0;
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
            atualizarContadorCarrinho();
        }
        cartTotal.textContent = total.toFixed(2);

        localStorage.setItem('cart', JSON.stringify(cart));
    }

        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        };

        if (window.location.pathname.endsWith("carrinho.html")) {
            updateCart();
        }

    
    
    function addProductToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
        atualizarContadorCarrinho();
    }

    getURLParams();

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
    
    
     // Crie um novo evento
     var event = new Event('cartUpdated');

     // Ouça o evento e atualize o contador do carrinho
     window.addEventListener('cartUpdated', function (e) {
         atualizarContadorCarrinho();
     }, false);
 
     document.addEventListener("click", function(e) {
        if (e.target.classList.contains("add-to-cart")) {
            const name = e.target.getAttribute("data-name");
            const price = parseFloat(e.target.getAttribute("data-price"));
            addProductToCart(name, price);
            // Atualize o contador do carrinho após adicionar um item
            atualizarContadorCarrinho();
        }
    
        if (e.target.classList.contains("remove-from-cart")) {
            const name = e.target.getAttribute("data-name");
            const productIndex = cart.findIndex(item => item.name === name);
            if (productIndex !== -1) {
                cart.splice(productIndex, 1);
                updateCart();
                // Atualize o contador do carrinho após remover um item
                atualizarContadorCarrinho();
            }
        }
    
    
        if (e.target.classList.contains("finalizar-compra")) {
            // Adicione a lógica para finalizar a compra aqui
            // Por exemplo, redirecione para uma página de pagamento
        }
    });
    atualizarContadorCarrinho();
});
