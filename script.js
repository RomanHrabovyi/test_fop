    document.addEventListener('DOMContentLoaded', function () {
        const statusCells = document.querySelectorAll('.customers__status');
        statusCells.forEach(cell => {
            cell.classList.add('fade-in');
        });
    });

    const customers = [
        { name: "Jane Cooper", company: "Microsoft", phone: "(225) 555-0118", email: "jane@microsoft.com", country: "United States", status: "Active" },
        { name: "Floyd Miles", company: "Yahoo", phone: "(205) 555-0100", email: "floyd@yahoo.com", country: "Kiribati", status: "Inactive" },
        { name: "Ronald Richards", company: "Adobe", phone: "(302) 555-0107", email: "ronald@adobe.com", country: "Israel", status: "Inactive" },
        { name: "Marvin McKinney", company: "Tesla", phone: "(252) 555-0126", email: "marvin@tesla.com", country: "Iran", status: "Active" },
        { name: "Jerome Bell", company: "Google", phone: "(629) 555-0129", email: "jerome@google.com", country: "Réunion", status: "Active" },
        { name: "Kathryn Murphy", company: "Microsoft", phone: "(406) 555-0120", email: "kathryn@microsoft.com", country: "Curaçao", status: "Active" },
        { name: "Jacob Jones", company: "Yahoo", phone: "(208) 555-0112", email: "jacob@yahoo.com", country: "Brazil", status: "Active" },
        { name: "Kristin Watson", company: "Facebook", phone: "(704) 555-0127", email: "kristin@facebook.com", country: "Åland Islands", status: "Inactive" }
    ];

    const tbody = document.querySelector('.customers__table tbody');
    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.classList.add('customers__row');
        row.innerHTML = `
            <td class="customers__cell">${customer.name}</td>
            <td class="customers__cell">${customer.company}</td>
            <td class="customers__cell">${customer.phone}</td>
            <td class="customers__cell">${customer.email}</td>
            <td class="customers__cell">${customer.country}</td>
            <td class="customers__cell">
                <span class="customers__status customers__status--${customer.status.toLowerCase()}">${customer.status}</span>
            </td>
        `;
        tbody.appendChild(row);
    });


    const contentDiv = document.querySelector('.customers__entries');
    const paginationUl = document.querySelector('.customers__pages');
    
    const totalPages = 40;
    let currentPage = 1;
    const visiblePages = 4;

    
    function generatePagination() {
        paginationUl.innerHTML = '';

        
        // кнопка "попередня строінка"
        if (currentPage > 1) {
            createPaginationLink('<', currentPage - 1);
        }

        // перша сторінка
        createPaginationLink(1, currentPage);

        // крапки перед поточною сторінкою
        if (currentPage > visiblePages) {
            createPaginationDots();
        }

        // видимі сторінки
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages); i++) {
            createPaginationLink(i, i);
        }

        // крапки після після поточної сторінки
        if (currentPage < totalPages - visiblePages + 1) {
            createPaginationDots();
        }

        // остання сторінка
        if (totalPages > 1) {
            createPaginationLink(totalPages, totalPages);
        }

        // кнопка "наступна строінка"
        if (currentPage < totalPages) {
            createPaginationLink('>', currentPage + 1);
        }
        
    }

    function createPaginationLink(text, page) {
        const li = document.createElement('li');
        const a = document.createElement('a');

        a.textContent = text;
        a.href = '#';


        if(currentPage == page) {
            a.classList.add('active')
        }

        a.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = page;
            loadContent();
            generatePagination();

            const currentItem = document.querySelector('.customers__pages li a.active');
            currentItem.classList.remove('active');
        });
        li.appendChild(a);
        paginationUl.appendChild(li);
    }


    function createPaginationDots() {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = '...';
        li.appendChild(span);
        paginationUl.appendChild(li);
        
    }

    function loadContent() {
        // Отримання контенту для поточної сторінки та відображення його
        contentDiv.textContent = `Showing data 1 to 8 of 256K entries ${currentPage}`;
        
    }

    generatePagination();
    loadContent();
    

    // sidebarMenu
    

    const sidebarItem = document.querySelectorAll('.sidebar__item');
    const contentItems = document.querySelectorAll('.content__item');

    sidebarItem.forEach(item => {
        item.addEventListener('click', () => {
            let currentBtn = item;
            let contentId = currentBtn.getAttribute('data-active');
            let currentContent = document.querySelector(contentId);

            sidebarItem.forEach(item => {
                item.classList.remove('sidebar__item--active', 'sidebar__link--active')
            });

            contentItems.forEach(item => {
                item.classList.remove('content__item--active')
            });
            
            currentBtn.classList.add('sidebar__item--active', 'sidebar__link--active');
            currentContent.classList.add('content__item--active');
        })
        
    })
