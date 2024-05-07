// por ser client-side, não precisa dar o modules.export
// ela será mapeada apenas com /javascript/scripts.js, pois estará no diretório raiz da aplicação,
// conforme definido no arquivo app.js: app.use(express.static(path.join(__dirname, 'public')));

async function deleteCustomer(id) {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
        alert("Cliente excluído com sucesso!");

        try {
            // a api fetch permite requisições para backend. Retonra uma promise, o que permite usar async/await
            await fetch(`/customers/${id}`, { method: "DELETE" });
            window.location.href="/customers/";
        } catch (err) {
            alert(err.message);
        }
    }
}