/// ===== CARRINHO =====
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// ===== TOAST =====
function mostrarToast() {
    let toast = document.getElementById("toast");

    if (!toast) return;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// ===== CONTADOR =====
function atualizarContador() {
    let contador = document.getElementById("contador-carrinho");

    if (contador) {
        contador.textContent = carrinho.length;
    }
}

// ===== ADICIONAR PRODUTO =====
function adicionarCarrinho(nome, preco) {
    carrinho.push({ nome, preco });

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarContador();
    mostrarToast();
}

// ===== ATUALIZAR CARRINHO =====
function atualizarCarrinho() {
    let lista = document.getElementById("lista-carrinho");
    let totalElemento = document.getElementById("total-carrinho");

    if (!lista) return;

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {
        let item = document.createElement("li");

        item.textContent =
            produto.nome + " - R$ " +
            produto.preco.toLocaleString("pt-BR", {
                minimumFractionDigits: 2
            });

        let botao = document.createElement("button");
        botao.textContent = "Remover";

        botao.onclick = function () {
            carrinho.splice(index, 1);

            localStorage.setItem("carrinho", JSON.stringify(carrinho));

            atualizarCarrinho();
            atualizarContador();
        };

        item.appendChild(botao);
        lista.appendChild(item);

        total += produto.preco;
    });

    if (totalElemento) {
        totalElemento.textContent =
            "Total: R$ " +
            total.toLocaleString("pt-BR", {
                minimumFractionDigits: 2
            });
    }
}

// ===== INICIALIZAÇÃO =====
atualizarCarrinho();

let pagamento = localStorage.getItem("pagamento") || "Cartão";

document.getElementById("pagamento").textContent = pagamento;

if (pagamento === "PIX") {
    let pix = document.createElement("p");
    pix.textContent = "🔑 Chave PIX: techstore@pix.com";
    document.querySelector(".comprovante").appendChild(pix);
}

if (pagamento === "Boleto") {
    let boleto = document.createElement("p");
    boleto.textContent = "📄 Boleto gerado - vencimento em 3 dias úteis.";
    document.querySelector(".comprovante").appendChild(boleto);
}
