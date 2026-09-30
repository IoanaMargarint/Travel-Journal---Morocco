// asteptam ca tot DOM-ul sa se incarce inainte de a rula scriptul
document.addEventListener('DOMContentLoaded', () => {
    
    const salutUser = () => {
        const data = new Date();      // cerinta: clasa Date
        const ora = data.getHours();
        let mesaj = "";

        if (ora < 12) mesaj = "Bună dimineața";
        else if (ora < 18) mesaj = "Bună ziua";
        else mesaj = "Bună seara";

        // cream un element nou pentru mesaj
        const banner = document.createElement('div');       // cerinta: crearea de elemente HTML
        banner.style.backgroundColor = 'var(--culoare-accent)';
        banner.style.color = 'black';
        banner.style.textAlign = 'center';
        banner.style.padding = '10px';
        banner.style.fontWeight = 'bold';
        banner.style.position = 'fixed';
        banner.style.bottom = '0';
        banner.style.width = '100%';
        banner.style.zIndex = '999';
        
        // cerinta: metode STRING (toUpperCase)
        banner.innerText = `${mesaj.toUpperCase()}! Bine ai venit în jurnalul marocan.`;  // cerinta: modificare de proprietati
        
        document.body.appendChild(banner);

        // cerinta: folosirea setTimeout (ascunde bannerul dupa 5 secunde)
        setTimeout(() => {
            banner.style.display = 'none'; // cerinta: modificarea stilului unui element
            banner.remove();   // cerinta: stergerea de elemente HTML
        }, 5000);
    };
    salutUser();

   // incarcam datele din fisierul maroc.json
   async function incarcaOrase() {
        try {
            const response = await fetch('maroc.json');           // cerinta: cerere AJAX
            const orase = await response.json(); // parsare JSON
            
            const container = document.getElementById('container-orase'); // cerinta: manipularea DOM-ului - selectare dupa ID
        
            // cerinta: folosirea metodelor din clasa Array (forEach)
            orase.forEach(oras => {
                const divOras = document.createElement('div');
                divOras.classList.add('oras-info');              // cerinta: folosirea classList
                divOras.id = `${oras.id}-info`;

                divOras.innerHTML = `
                    <h3>${oras.nume}</h3>
                    <p>${oras.descriere}</p>
                    <p><em>${oras.detaliu}</em></p>
                    <div class="orase-figura" style="justify-content:start;">
                        <img src="${oras.imagine}" alt="${oras.nume}" style="max-width: 300px; border-radius: 6px;">
                    </div>
                `;
                
                container.appendChild(divOras);
            });
            
        } catch (error) {
            console.error("Eroare la încărcarea datelor JSON:", error);
        }
    }
    incarcaOrase();


    const titluOrase = document.getElementById('titlu-orase');
    if(titluOrase) {
        titluOrase.addEventListener('click', () => {    //cerinta: folosirea și modificarea evenimentelor generate de mouse
            // generam o culoare random
            // cerinta: folosirea Math (random, floor)
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            
            titluOrase.style.color = `rgb(${r}, ${g}, ${b})`;    // cerinta: modificare de proprietati (culoare)
        });
        titluOrase.title = "Click pentru a schimba culoarea aleatoriu!";
        titluOrase.style.cursor = "pointer";
    }


    const btnTema = document.getElementById('btn-tema');
    
    // verificam daca avem o preferinta salvata
    if(localStorage.getItem('tema') === 'dark') {       // cerinta: folosirea localStorage si sesiune
        document.body.classList.add('dark-mode');
        btnTema.innerText = "☀️ Mod Zi";
    }

    btnTema.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // salvam preferinta
        if(document.body.classList.contains('dark-mode')) {
            localStorage.setItem('tema', 'dark');             // cerinta: sesiune
            btnTema.innerText = "☀️ Mod Zi";
        } else {
            localStorage.setItem('tema', 'light');
            btnTema.innerText = "🌙 Mod Noapte";
        }
    });


    const formular = document.querySelector('#contact form'); // manipularea DOM-ului - selector CSS complex
    const inputEmail = document.getElementById('email');
    const inputNume = document.getElementById('nume');
    
    formular.addEventListener('submit', (e) => {
        // Oprim trimiterea standard a formularului
        e.preventDefault(); 
        
        const emailValue = inputEmail.value;                // cerinta: inputuri functionale
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    // cerinta: expresii regulate - Regex simplu pentru email
        
        if (!regexEmail.test(emailValue)) {
            alert("Te rugăm să introduci o adresă de email validă!");
            inputEmail.style.borderColor = "red";
            return;
        }

        if (inputNume.value.length < 3) {
            alert("Numele trebuie să aibă cel puțin 3 caractere!");
            return;
        }

        alert(`Mulțumim, ${inputNume.value}! Mesajul a fost 'trimis' cu succes.`);
        formular.reset(); // curata inputurile
        inputEmail.style.borderColor = "#ccc";
    });


    // cream modalul în HTML prin JS 
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'imageModal';
    modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <img class="modal-content" id="img01">
    `;
    document.body.appendChild(modal);

    const modalImg = document.getElementById("img01");
    const closeBtn = document.querySelector(".close-modal");

    // selectam toate imaginile din galerie
    const imaginiGalerie = document.querySelectorAll('.foto-card img');  //manipularea DOM-ului - lista de elemente

    imaginiGalerie.forEach(img => {
        img.addEventListener('click', (e) => {
            const style = window.getComputedStyle(img);        // cerinta: folosirea getComputedStyle

            modal.style.display = "flex";
            modalImg.src = e.target.src; // cerinta: folosirea proprietatii target
        });
    });

    // inchidere modal la click pe X
    closeBtn.addEventListener('click', () => {
        modal.style.display = "none";
    });

    // inchidere modal la click pe fundal (dar NU pe imagine)
    modal.addEventListener('click', (e) => {
        // daca click-ul a fost direct pe fundalul negru (modal), il inchidem
        if(e.target === modal) {
            modal.style.display = "none";
        }
    });
    
    // daca dam click pe imaginea mare, evenimentul nu se duce mai sus la modal sa-l inchida
    modalImg.addEventListener('click', (e) => {
        e.stopPropagation();                // cerinta: stopPropagation
    });

    // cerinta: evenimente tastatura (inchide cu ESC)
    document.addEventListener('keydown', (e) => {
        if(e.key === "Escape" && modal.style.display === "flex") {
            modal.style.display = "none";
        }
    });

    const linkuriOrase = document.querySelectorAll('nav ul li ul.dropdown li a[href*="-info"]');
    
    linkuriOrase.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // ID 
            const targetId = link.getAttribute('href').substring(1); 
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } 
        });
    });

});