document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.section');
    const searchInput = document.getElementById('formulaSearch');
    const formulaCards = document.querySelectorAll('.formula-card');
    const formulaItems = document.querySelectorAll('.item');

    // Navigation Logic
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const target = link.getAttribute('data-target');

            // Update Active Link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show Target Section
            sections.forEach(sec => {
                if (sec.id === target) {
                    sec.classList.add('active');
                } else {
                    sec.classList.remove('active');
                }
            });

            // Re-render MathJax
            if (window.MathJax) {
                window.MathJax.typesetPromise();
            }
        });
    });

    // Search Logic (Global)
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();

        if (term.length < 2) {
            // Restore visibility if search is cleared
            formulaCards.forEach(card => card.style.display = 'block');
            formulaItems.forEach(item => item.style.display = 'block');
            return;
        }

        formulaItems.forEach(item => {
            const text = item.innerText.toLowerCase();
            if (text.includes(term)) {
                item.style.display = 'block';
                // Highlight found items? (Optional)
            } else {
                item.style.display = 'none';
            }
        });

        // Hide empty cards
        formulaCards.forEach(card => {
            const visibleItems = card.querySelectorAll('.item[style="display: block;"]');
            const items = card.querySelectorAll('.item');

            // If all items are display: none, then hide card
            let hasVisible = false;
            items.forEach(it => {
                if (it.style.display !== 'none') hasVisible = true;
            });

            card.style.display = hasVisible ? 'block' : 'none';
        });
    });

    // Flashcard Toggle Logic
    const flashcardToggle = document.getElementById('flashcardToggle');
    flashcardToggle.addEventListener('change', () => {
        if (flashcardToggle.checked) {
            document.body.classList.add('flashcard-mode');
        } else {
            document.body.classList.remove('flashcard-mode');
        }
    });

    // Initial MathJax trigger
    if (window.MathJax) {
        window.MathJax.typesetPromise();
    }
});
