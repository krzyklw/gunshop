const products = [
    {
        id: 1,
        name: "Glock 19 Gen5",
        category: "handguns",
        price: 29999.99,
        image: "https://th.bing.com/th/id/OIP.ujMTnfM9hGWgkAfJ9MTGFQHaG1?rs=1&pid=ImgDetMain"
    },
    {
        id: 2,
        name: "Smith & Wesson M&P Shield",
        category: "handguns",
        price: 22499.99,
        image: "https://th.bing.com/th/id/OIP.f0H4lfUFeSli8QtMKSvKvAHaHa?rs=1&pid=ImgDetMain"
    },
    {
        id: 3,
        name: "AR-15 Rifle",
        category: "rifles",
        price: 44999.99,
        image: "https://shopdunns.com/wp-content/uploads/sites/32/2020/10/STV916556B-RA.jpg"
    },
    {
        id: 4,
        name: "Remington 700",
        category: "rifles",
        price: 39999.99,
        image: "https://th.bing.com/th/id/OIP.LpfFnaQNGBYHB6qzXy8IVgHaFY?rs=1&pid=ImgDetMain"
    },
    {
        id: 5,
        name: "9mm Ammunition (50 rounds)",
        category: "ammunition",
        price: 1249.99,
        image: "https://th.bing.com/th/id/OIP.pWxgBxDDeFBOYgMtLrktYAHaHa?rs=1&pid=ImgDetMain"
    },
    {
        id: 6,
        name: ".223 Ammunition (20 rounds)",
        category: "ammunition",
        price: 999.99,
        image: "https://th.bing.com/th/id/OSK.HEROcO6hLBrZ55EsfocPOe8gmfUUffdymH12ZQH8uPhxJJI?rs=1&pid=ImgDetMain"
    }
];

const productsGrid = document.querySelector('.products-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.querySelector('.contact-form');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksA = document.querySelectorAll('.nav-links a');

function displayProducts(category = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    filteredProducts.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">₱${product.price.toLocaleString()}</p>
                    <button class="cta-button" onclick="alert('Product added to cart!')">Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        displayProducts(category);
    });
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinksA.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

navLinksA.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });

        navLinksA.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);
    
    console.log('Form submitted:', formObject);
    alert('Thank you for your message! We will get back to you soon.');
    
    contactForm.reset();
});

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const correspondingLink = document.querySelector(`a[href="#${section.id}"]`);
                navLinksA.forEach(link => link.classList.remove('active'));
                correspondingLink.classList.add('active');
            }
        });
    });
});
