document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modalImage = document.getElementById('modalImage');
    let imageModal;
    
    const modalEl = document.getElementById('imageModal');
    if(modalEl) {
        imageModal = new bootstrap.Modal(modalEl);
    }
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if(img && imageModal) {
                // Passa a URL da imagem clicada para a imagem do modal
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                imageModal.show();
            }
        });
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryCols = document.querySelectorAll('.gallery-col');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove a classe 'active' de todos os botões
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adiciona a classe 'active' apenas no botão clicado
            this.classList.add('active');

            // Pega o valor do filtro selecionado
            const filterValue = this.getAttribute('data-filter');

            // Passa por todas as fotos da galeria
            galleryCols.forEach(col => {
                // Se o filtro for 'all' (Todos) ou se a categoria da foto bater com o filtro
                if (filterValue === 'all' || col.getAttribute('data-category') === filterValue) {
                    col.style.display = 'block';
                    // Efeito suave de entrada
                    col.animate([
                        { opacity: 0, transform: 'scale(0.95)' },
                        { opacity: 1, transform: 'scale(1)' }
                    ], { duration: 400, fill: 'forwards' });
                } else {
                    // Esconde as fotos que não combinam com o filtro
                    col.style.display = 'none';
                }
            });
        });
    });


    const fileInput = document.getElementById('curriculo');
    const fileWrapper = document.querySelector('.file-upload-wrapper .text-muted');
    
    if(fileInput && fileWrapper) {
        fileInput.addEventListener('change', function(e) {
            if(e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                fileWrapper.innerHTML = `<i class="fas fa-file-check fs-4 mb-1 text-success"></i><br><span style="font-size: 0.85rem; color: var(--c-blue-dark); font-weight: 500;">${fileName}</span>`;
                document.querySelector('.file-upload-wrapper').style.borderColor = "var(--c-blue-light)";
            } else {
                fileWrapper.innerHTML = `<i class="fas fa-cloud-upload-alt fs-4 mb-1 text-blue-light"></i><br><span style="font-size: 0.85rem;">Clique aqui ou arraste o arquivo</span>`;
            }
        });
    }
});