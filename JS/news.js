  let currentPage = 1;

        // Filter
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                document.querySelectorAll('.card').forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Like
        function toggleLike(btn) {
            btn.classList.toggle('liked');
            btn.innerHTML = btn.classList.contains('liked') 
                ? '<i class="fas fa-heart"></i>' 
                : '<i class="far fa-heart"></i>';
        }

        // Pagination
        function goPage(page) {
            currentPage = page;
            updatePage();
        }

        function nextPage() {
            if (currentPage < 8) {
                currentPage++;
                updatePage();
            }
        }

        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                updatePage();
            }
        }

        function updatePage() {
            document.querySelectorAll('.page-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent === currentPage.toString()) {
                    btn.classList.add('active');
                }
            });
        }