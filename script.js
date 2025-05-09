// Función para validar todos los campos
function validateAllFields() {
    let valid = true;
    const fieldsToValidate = [
        { input: document.getElementById('first-name'), name: 'tu nombre' },
        { input: document.getElementById('last-name'), name: 'tu apellido' },
        { input: document.getElementById('email'), name: 'tu correo electrónico' },
        { input: document.getElementById('address'), name: 'tu dirección de envío' },
        { input: document.getElementById('city'), name: 'tu ciudad' },
        { input: document.getElementById('zip-code'), name: 'tu código postal' },
        { input: document.getElementById('country'), name: 'tu país' },
    ];

    // Validar cada campo
    fieldsToValidate.forEach(field => {
        if (!validateRequired(field.input, field.name)) {
            valid = false;
        }
    });

    // Validar email
    const emailInput = document.getElementById('email');
    if (emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        showError(emailInput, 'Por favor ingresa un correo electrónico válido.');
        valid = false;
    } else if (emailInput.value) {
        clearError(emailInput);
    }

    return valid;
}

// Validación al enviar el formulario
document.getElementById('payment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const isValid = validateAllFields(); // Verifica todos los campos

    // Mostrar el mensaje de error solo si hay errores
    if (!isValid) {
        document.getElementById('payment-error').style.display = 'block';
        document.getElementById('payment-error').textContent = 'Por favor completa todos los campos requeridos.';
    } else {
        document.getElementById('payment-error').style.display = 'none'; // Oculta el mensaje si todo es válido
        // Aquí puedes continuar con el envío del formulario
        alert('¡Formulario enviado con éxito!');
    }
});

// Validación al enviar el formulario
document.getElementById('payment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const isValid = validateAllFields(); // Verifica todos los campos

    // Solo mostrar el mensaje de error si el usuario ha interactuado
    if (!isValid && hasInteracted) {
        document.getElementById('payment-error').style.display = 'block';
        document.getElementById('payment-error').textContent = 'Por favor completa todos los campos requeridos.';
    } else if (isValid) {
        document.getElementById('payment-error').style.display = 'none'; // Oculta el mensaje si todo es válido
        // Aquí puedes continuar con el envío del formulario
        alert('¡Formulario enviado con éxito!');
    }
});
// Validación formulario contacto
const contactForm = document.getElementById('contact-form');

function showError(input, message) {
    input.classList.add('input-error');
    const errorDiv = document.getElementById(input.id + '-error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function clearError(input) {
    input.classList.remove('input-error');
    const errorDiv = document.getElementById(input.id + '-error');
    if (errorDiv) {
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}

function validateRequired(input, fieldName) {
    if (!input.value.trim()) {
        showError(input, `Por favor ingresa ${fieldName}.`);
        return false;
    } else {
        clearError(input);
        return true;
    }
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    valid = validateRequired(nameInput, 'tu nombre') && valid;
    valid = validateRequired(emailInput, 'tu correo electrónico') && valid;
    valid = validateRequired(messageInput, 'tu mensaje') && valid;

    if (emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
        showError(emailInput, 'Por favor ingresa un correo electrónico válido.');
        valid = false;
    } else if (emailInput.value) {
        clearError(emailInput);
    }

    if (!valid) {
        return; // no enviar formulario si hay error
    }

    alert('¡Mensaje enviado con éxito! Gracias por contactarnos.');
    contactForm.reset();
});
   document.getElementById('buy-now-btn').addEventListener('click', function (e) {
       e.preventDefault();
       // Oculta sección libro
       document.getElementById('book').style.display = 'none';
       // Muestra sección pago
       document.getElementById('payment').style.display = 'block';
       // Scroll a sección pago
       document.getElementById('payment').scrollIntoView({
           behavior: 'smooth'
       });
   });
   

// Validación tarjeta - algoritmo Luhn
function isValidCardNumber(cardNumber) {
    const sanitized = cardNumber.replace(/\D/g, '');
    let sum = 0;
    let shouldDouble = false;
    for (let i = sanitized.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitized.charAt(i));
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

// Detectar tipo de tarjeta
function detectCardType(number) {
    const sanitized = number.replace(/\D/g, '');
    const patterns = {
        visa: /^4/,
        mastercard: /^(5[1-5]|2[2-7])/,
        amex: /^3[47]/,
        discover: /^(6011|65|64[4-9]|622)/,
        diners: /^3(0[0-5]|[68])/,
        jcb: /^35/,
        maestro: /^(5(018|0[23])|6(39|7))/,
    };
    for (let card in patterns) {
        if (patterns[card].test(sanitized)) return card;
    }
    return 'unknown';
}

function getCardIconClass(cardType) {
    switch (cardType) {
        case 'visa': return 'fab fa-cc-visa';
        case 'mastercard': return 'fab fa-cc-mastercard';
        case 'amex': return 'fab fa-cc-amex';
        case 'discover': return 'fab fa-cc-discover';
        case 'diners': return 'fab fa-cc-diners-club';
        case 'jcb': return 'fab fa-cc-jcb';
        case 'maestro': return 'fab fa-cc-maestro';
        default: return '';
    }
}

// Mostrar icono tarjeta al escribir número
const cardNumberInput = document.getElementById('card-number');
const cardTypeIcon = document.getElementById('card-type-icon');

cardNumberInput.addEventListener('input', () => {
    const cardType = detectCardType(cardNumberInput.value);
    const iconClass = getCardIconClass(cardType);
    if (iconClass) {
        cardTypeIcon.className = iconClass;
        cardTypeIcon.style.display = 'inline-block';
    } else {
        cardTypeIcon.className = '';
        cardTypeIcon.style.display = 'none';
    }
});

// Validar fecha expiración MM/AA
function isValidExpiry(dateStr) {
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(dateStr)) return false;
    const parts = dateStr.split('/');
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10);
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    return true;
}

// Validar formulario de pago
document.getElementById('payment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Limpia mensajes de error previos
    ['card-number', 'card-cvc', 'card-expiry', 'first-name', 'last-name', 'email', 'address', 'city', 'zip-code', 'country'].forEach(id => {
        const el = document.getElementById(id);
        if (el) clearError(el);
    });

    // Validaciones básicas de campos personales
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const zip = document.getElementById('zip-code');
    const country = document.getElementById('country');

    valid = validateRequired(firstName, 'tu nombre') && valid;
    valid = validateRequired(lastName, 'tu apellido') && valid;
    valid = validateRequired(email, 'tu correo electrónico') && valid;
    valid = validateRequired(address, 'tu dirección de envío') && valid;
    valid = validateRequired(city, 'tu ciudad') && valid;
    valid = validateRequired(zip, 'tu código postal') && valid;
    valid = validateRequired(country, 'tu país') && valid;

    if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError(email, 'Por favor ingresa un correo electrónico válido.');
        valid = false;
    }

    // Validar campos tarjeta si método correspondiente
    const cNumber = cardNumberInput.value;
    const cvcInput = document.getElementById('card-cvc');
    const expiryInput = document.getElementById('card-expiry');

    if (selectedPaymentMethod === 'credit-card' || selectedPaymentMethod === 'debit-card' || selectedPaymentMethod === 'mobile') {
        if (!isValidCardNumber(cNumber)) {
            showError(cardNumberInput, 'Número de tarjeta inválido.');
            valid = false;
        }
        if (!/^\d{3,4}$/.test(cvcInput.value)) {
            showError(cvcInput, 'Código CVC inválido.');
            valid = false;
        }
        if (!isValidExpiry(expiryInput.value)) {
            showError(expiryInput, 'Fecha de expiración inválida.');
            valid = false;
        }
    }
    if (!valid) return;

    // Continuar con envío o mostrar mensaje éxito
    const successMessage = document.getElementById('success-payment-message');
    switch (selectedPaymentMethod) {
        case 'credit-card':
        case 'debit-card':
        case 'mobile':
            successMessage.innerHTML = 'Hemos procesado tu información de pago. Estamos verificando los datos de tu tarjeta.';
            break;
        case 'paypal':
            successMessage.innerHTML = 'Por favor envía el pago a nuestra cuenta PayPal: <strong>pagos@mapachitoesquizo.com</strong> y envía el comprobante al mismo correo.';
            break;
        case 'transfer':
            successMessage.innerHTML = 'Por favor realiza la transferencia a nuestra cuenta del Banco Pichincha:<br><strong>Cuenta: 1234567890123456</strong><br><strong>Titular: Andreina Crespo</strong>';
            break;
        case 'crypto':
            successMessage.innerHTML = 'Por favor envía el pago equivalente a <strong>$19.99 USD</strong> en criptomonedas a la dirección proporcionada.';
            break;
        default:
            successMessage.innerHTML = 'Tu pedido ha sido registrado. Por favor completa el pago según las instrucciones.';
    }
    document.getElementById('checkout').style.display = 'none';
    document.getElementById('success').style.display = 'block';
    document.getElementById('success').scrollIntoView({ behavior: 'smooth' });

    // Opcional: reset form
    document.getElementById('payment-form').reset();
});

// Manejo menú móvil
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Scroll suave enlaces anclaje
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Copiar al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('¡Copiado al portapapeles!');
    }, err => {
        console.error('Error al copiar: ', err);
    });
}

// Selección de método de pago
const paymentMethods = document.querySelectorAll('.payment-method');
let selectedPaymentMethod = '';
paymentMethods.forEach(method => {
    method.addEventListener('click', () => {
        selectedPaymentMethod = method.getAttribute('data-payment');

        // Ocultar todos los formularios
        ['credit-card-form', 'paypal-form', 'transfer-form', 'crypto-form'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        // Mostrar el correcto y actualizar título
        const checkoutTitle = document.getElementById('checkout-title');
        switch (selectedPaymentMethod) {
            case 'credit-card':
                document.getElementById('credit-card-form').style.display = 'block';
                checkoutTitle.innerHTML = '<i class="fas fa-credit-card"></i> Información de Tarjeta de Crédito';
                break;
            case 'debit-card':
                document.getElementById('credit-card-form').style.display = 'block';
                checkoutTitle.innerHTML = '<i class="fas fa-credit-card"></i> Información de Tarjeta de Débito';
                break;
            case 'paypal':
                document.getElementById('paypal-form').style.display = 'block';
                checkoutTitle.innerHTML = '<i class="fab fa-paypal"></i> Pago con PayPal';
                break;
            case 'transfer':
                document.getElementById('transfer-form').style.display = 'block';
                checkoutTitle.innerHTML = '<i class="fas fa-university"></i> Transferencia Bancaria';
                break;
            case 'mobile':
                document.getElementById('credit-card-form').style.display = 'block';
                checkoutTitle.innerHTML = '<i class="fas fa-mobile-alt"></i> Información de Pago Móvil';
                break;
            case 'crypto':
                document.getElementById('crypto-form').style.display = 'block';
                checkoutTitle.innerHTML = '<i class="fab fa-bitcoin"></i> Pago con Criptomonedas';
                break;
        }

        document.getElementById('payment').style.display = 'none';
        document.getElementById('checkout').style.display = 'block';
        document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
    });
});

// Botones volver
document.querySelector('.back-to-payment').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('checkout').style.display = 'none';
    document.getElementById('payment').style.display = 'block';
    document.getElementById('payment').scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('.back-to-book').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('payment').style.display = 'none';
    document.getElementById('book').style.display = 'block';
    document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
});

// Poem modal
const modal = document.getElementById('poem-modal');
const modalTitle = document.getElementById('modal-title');
const modalAuthor = document.getElementById('modal-author');
const modalContent = document.getElementById('modal-content');
const closeModal = document.querySelector('.close-modal');
const readMoreButtons = document.querySelectorAll('.read-more');

readMoreButtons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        const poemIndex = parseInt(button.getAttribute('data-poem'));
        const poem = poems[poemIndex];
        modalTitle.textContent = poem.title;
        modalAuthor.textContent = poem.author;
        modalContent.innerHTML = poem.content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Particles.js configuración (puedes adaptar si fuera necesario)
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00f0ff" },
        shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 } },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#50a8cb", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
        }
    },
    retina_detect: true
});
// Poem data
const poems = [
    {
        title: "Confesiones de una Inestabilidad Emocional",
        author: "Mapachito Esquizo (Andreina Crespo)",
        content: `Tengo muchos problemas en sí.<br>
                Uno de ellos siempre me fastidia.<br>
                Siempre aparece a las 3 de la madrugada,<br>
                Y es la constante pregunta de:<br>
                ¿Por qué tengo miedo de volver a amar?<br><br>
                
                Me lo pregunto seriamente y luego pienso y digo...<br>
                Será por cosas de mi pasado que me aturden,<br>
                Y hacen que aleje esa persona que me está amando,<br>
                Y todo por no saber expresar mis sentimientos,<br>
                Mis absurdos pensamientos, y mis constantes miedos.<br><br>
                
                Tengo actitudes muy cambiantes,<br>
                Personalidades muy desiguales.<br>
                Soy esa persona muy inestable,<br>
                Que todo lo sobrepiensa,<br>
                Que todo le aterra.<br><br>
                
                Paso de ser una persona amorosa<br>
                A una persona muy odiosa,<br>
                y todo porque de un momento a otro,<br>
                pienso que tú me cambiarías por otra,<br>
                otra persona mucho mejor que yo,<br>
                en todos los sentidos y en todos los aspectos,<br>
                sentidos y aspectos que serían similares a los tuyos.<br><br>
                
                Todo eso lo pienso y desvarío totalmente,<br>
                No sé cuál es la verdad y cuál es la falsedad<br>
                De esta terrible y bochornosa situación,<br>
                Si me estarás mintiendo acerca de tus sentimientos,<br>
                O puede que estés con alguien más,<br>
                O todo eso me lo estoy imaginando en realidad.<br><br>
                
                Puede que solamente todo lo que haya dicho<br>
                Tan sólo sea producto de mi alocada imaginación,<br>
                O tan sólo esté teniendo una verdadera predicción.<br>
                No lo sé, pero, si en algún caso me estás mintiendo,<br>
                Tan sólo te pido de favor que yo no me entere de eso.<br>
                Mi corazón no podría aguantar otra maldita desilusión.`
    },
    {
        title: "Delirios de un Corazón Enamorado",
        author: "Mapachito Esquizo (Andreina Crespo)",
        content: `Cada vez que la veo no puedo ni respirar,<br>
                No sé como esos ojos me puedan así hechizar,<br>
                Ni siquiera puedo gesticular bien las palabras,<br>
                Tartamudeo sin razón alguna,<br>
                No sé como me puede generar muchos nervios,<br>
                Nervios que me dan por quererla besar.<br><br>
                
                Y esa mirada tan inocente que me hace,<br>
                Haciendo que me pierda entre sus labios,<br>
                Labios de un lindo color muy rosáceo,<br>
                Y esos cachetes de un color rosa pálido.<br>
                Mi corazón late a mil,<br>
                Y pienso que en cualquier momento<br>
                Se me podría realmente salir,<br>
                Eso es lo que me provoca al verla.<br><br>
                
                Si me toma de la mano<br>
                Es como que me pierdo,<br>
                Me pierdo en un mundo paralelo,<br>
                Donde puedo ser muy feliz.<br>
                Si me dice: "Me gustas, te amo",<br>
                Se los juro que ahí es donde me pierden,<br>
                Ahí es donde empieza a salir una nueva poeta,<br>
                Una poeta muy romántica y ensoñadora.<br><br>
                
                Y si me abraza, es como si mi alma y la suya<br>
                Se unieran plenamente en un baile sin fin,<br>
                Donde se impregnan varias fragancias,<br>
                Más la suya que se queda en mi camisa.<br><br>
                
                Y si se quedara a mi lado reposando su cabeza en mi hombro,<br>
                Es ahí donde empiezo a delirar y a suspirar,<br>
                Y empiezo a sentir escalofríos en mi cuerpo,<br>
                Es como que si en ese momento mi alma<br>
                Se quedó fuera de mi cuerpo y navegó entre las costas de mi imaginación,<br>
                Pensando en como poder hacerla sentir feliz.`
    },
    {
        title: "Desafíos De Un Corazón Tímido",
        author: "Mapachito Esquizo (Andreina Crespo)",
        content: `Sé que en el romance no soy muy diestra;<br>
                no beso con pasión, ni toco con destreza.<br>
                Abrazarte con fuerza, mi falta de certeza<br>
                demuestra que mi amor a veces se tuerza.<br><br>
                
                Mis emociones son un laberinto oscuro;<br>
                decir un "Te amo" se vuelve un apuro.<br>
                Besar, abrazar, amar, un desafío duro,<br>
                que a menudo en mi pecho se enjuro.<br><br>
                
                Lo siento si mis expresiones son escasas;<br>
                sé que necesitas más para sentirte en casa.<br>
                Quiero ser aquella que te llene de alegría,<br>
                con gestos de amor que duren cada día.<br><br>
                
                Aunque temo que mi timidez te aleje,<br>
                que busques a otr@ que con más fuerza te caleje.<br>
                Sabes que mi amor por ti es auténtico y sincero,<br>
                aunque a veces me falte ser más clara y ligera.<br><br>
                
                Quiero ser quien te brinde seguridad y calor,<br>
                quien te haga sentir amada, sin temor,<br>
                aunque mis gestos no siempre sean evidentes,<br>
                sé que en cada uno de ellos hay amor latente.`
    },
    {
        title: "Mi Gran Amor: --. ..-.. -. . ... .. ...",
        author: "Mapachito Esquizo (Andreina Crespo)",
        content: `En la distancia, mi corazón te llama,<br>
                anhelando tus abrazos, tu dulce mirada.<br>
                Desearía correr hacia ti sin demora,<br>
                tomar tu mano y fundirme en tu aura.<br><br>
                
                Pero la vida, con sus caprichos, nos separa,<br>
                y el tiempo se vuelve una eterna espera.<br>
                Anoche, en mis sueños, estabas tú,<br>
                y en tus labios encontré la paz y la virtud.<br><br>
                
                Pero al despertar, la realidad me duele,<br>
                la ausencia se hace más profunda y cruel.<br>
                ¡Cuánto te extraño, mi amor, cada día!,<br>
                en cada suspiro, en cada melodía.<br><br>
                
                No hay un solo instante sin tu recuerdo,<br>
                en cada pensamiento, en cada encuentro.<br>
                Eres el faro que guía mi existir,<br>
                la razón por la cual aún sueño y suspiro.<br><br>
                
                Aunque lejos estés, en mi alma habitas,<br>
                y en cada latido, tu nombre palpita.<br>
                Te extraño tanto, más de lo que puedo decir,<br>
                pero en mi corazón, siempre estarás aquí.<br><br>
                
                Además, en cada melodía, encuentro tu eco,<br>
                como si las canciones hablaran del aquel anhelo.<br>
                Anhelo de tenerte aquí nuevamente en mis brazos.<br>
                Esas canciones conocen nuestros secretos,<br>
                nuestras adorables risas y nuestras más profundas penas,<br>
                en cada acorde, se revelan nuestras escenas.<br><br>
                
                Nos encontrábamos en cualquier rincón,<br>
                sin importar el lujo o la condición.<br>
                nuestra felicidad era la única verdad,<br>
                reíamos de tonterías, en cualquier lugar de nuestra ciudad.<br><br>
                
                Mirábamos a extraños, creando historias,<br>
                inventábamos locuras, nuestras memorias.<br>
                Nuestra complicidad nos hacía únicas,<br>
                como dos almas libres, sin límites, sin trucos.<br><br>
                
                Cada palabra absurda, cada risa compartida,<br>
                creaban un mundo donde la realidad se olvida.<br>
                Podrán pensar que somos dos personas muy locas, sin medida,<br>
                pero en nuestra locura, encontramos el sentido de la vida,<br>
                Y del gran amor que nosotras nos teníamos.`
    },
    {
        title: "Noches de Insomnio y Melancolía",
        author: "Mapachito Esquizo (Andreina Crespo)",
        content: `No he dormido en absoluto,<br>
                Mi cuerpo se siente exhausto,<br>
                Una pesadez me abruma,<br>
                Hundiéndome en la cama.<br><br>
                
                Mis ojos están nublados,<br>
                pasan frente a mí,<br>
                De repente, varias voces resuenan,<br>
                Voces que habitan en mi interior.<br><br>
                
                Algunas de esas sombras son amigas,<br>
                Siempre aconsejándome,<br>
                De repente, conversan y preguntan,<br>
                Cómo estoy y por qué lloro.<br><br>
                
                Si supieran que lloro por alguien ausente,<br>
                Alguien cuyo paradero desconozco desde hace meses,<br>
                Alguien cuya dulce voz no escucho desde entonces,<br>
                Alguien cuyo sentimientos y acciones desconozco.<br><br>
                
                Ignoro sus preguntas,<br>
                Cambiando el tema rápidamente,<br>
                Al parecer, notaron mi evasión,<br>
                Decidiendo salir,<br>
                Abandonando mi habitación.<br><br>
                
                Me sorprende que se vayan<br>
                Cuando las ignoro,<br>
                Pero, según mi psicoterapeuta,<br>
                Se van cuando tomo mis medicamentos.`
    },
    {
        title: "Sinfonía de Dependencia",
        author: "Mapachito Esquizo (Andreina Crespo)",
        content: `Desde que te conocí, mi mundo se tiñó de colores vibrantes;<br>
                cambiaste mi perspectiva, hiciste que la vida fuera fascinante.<br>
                Sin embargo, me di cuenta de una muy grande complicación:<br>
                me acostumbré tanto a ti que ahora la dependencia es mi situación.<br><br>
                
                Contigo, mis problemas se desvanecen en el aire,<br>
                pero al caminar completamente sola, tu ausencia me hace sufrir.<br>
                Tu perfume se cuela en calles desoladas,<br>
                un recordatorio constante de que te he perdido<br>
                y de que yo todavía te anhelo bastante.<br><br>
                
                Tu risa resuena en cada esquina que yo paso,<br>
                y tu voz danzando junto en el viento.<br>
                Busco tu presencia, pero simplemente te pierdo en el intento.<br><br>
                
                A veces, siento tus caricias, como si estuvieras cerca,<br>
                una lucha interna entre la realidad y mi mente que tiene una guerra,<br>
                una guerra interna de pensamientos confusos.<br>
                La paranoia acecha en mis pensamientos,<br>
                confundiéndome entre lo real y los sueños rotos.<br><br>
                
                Esta conexión imaginaria, esta dulce ilusión,<br>
                es un dilema que enfrento, una batalla en mi razón.`
    }
];
// End of JavaScript code.