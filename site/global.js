document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('header nav a');
    const path = window.location.pathname.split("/").pop();

    links.forEach(link => {
        const href = link.getAttribute("href");
        if (path === href || (path === "" && href === "index.html")) {
            link.classList.add("active");
        }

        link.addEventListener('mouseenter', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            
            if (x < rect.width / 2) {
                link.style.setProperty('--origin', 'left');
            } else {
                link.style.setProperty('--origin', 'right');
            }
        });
    });
});document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('header nav a');
    const path = window.location.pathname.split("/").pop();

    links.forEach(link => {
        const href = link.getAttribute("href");
        if (path === href || (path === "" && href === "index.html")) {
            link.classList.add("active");
        }

        link.addEventListener('mouseenter', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            
            if (x < rect.width / 2) {
                link.style.setProperty('--origin', 'left');
            } else {
                link.style.setProperty('--origin', 'right');
            }
        });
    });
});