document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined') {
        animacoesPagina();
    } else {
        document.body.style.opacity = '1';
        document.querySelectorAll('.form-card, .table-card, .dashboard-card, .page-title, .login-container').forEach(function(el) {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
});

function animacoesPagina() {
    gsap.to('body', { opacity: 1, duration: 0.4, ease: 'power2.out' });

    var titulo = document.querySelector('.page-title');
    if (titulo) {
        gsap.fromTo(titulo, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.1 }
        );
    }

    var subtitle = document.querySelector('.page-subtitle');
    if (subtitle) {
        gsap.fromTo(subtitle, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.2 }
        );
    }

    var formCards = document.querySelectorAll('.form-card');
    formCards.forEach(function(card, index) {
        gsap.fromTo(card, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.15 + (index * 0.1) }
        );
    });

    var tableCards = document.querySelectorAll('.table-card');
    tableCards.forEach(function(card, index) {
        gsap.fromTo(card, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.2 + (index * 0.1) }
        );
    });

    var dashboardCards = document.querySelectorAll('.dashboard-card');
    if (dashboardCards.length > 0) {
        gsap.fromTo(dashboardCards, 
            { opacity: 0, y: 30, scale: 0.95 }, 
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.6, 
                ease: 'back.out(1.2)', 
                stagger: 0.12,
                delay: 0.15
            }
        );
    }

    var loginContainer = document.querySelector('.login-container');
    if (loginContainer) {
        gsap.fromTo(loginContainer, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1 }
        );
    }

    var alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert, index) {
        gsap.fromTo(alert, 
            { opacity: 0, x: -10 }, 
            { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', delay: 0.3 + (index * 0.05) }
        );
    });

    var tableRows = document.querySelectorAll('table tbody tr');
    if (tableRows.length > 0) {
        gsap.fromTo(tableRows, 
            { opacity: 0, y: 10 }, 
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.3, 
                ease: 'power2.out', 
                stagger: 0.05,
                delay: 0.4
            }
        );
    }

    var formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(function(group, index) {
        gsap.fromTo(group, 
            { opacity: 0, y: 10 }, 
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', delay: 0.2 + (index * 0.05) }
        );
    });
}

function criarModal() {
    if (document.getElementById('customModal')) return;

    var overlay = document.createElement('div');
    overlay.id = 'customModal';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-box">
            <div class="modal-title" id="modalTitle">Aviso</div>
            <div class="modal-message" id="modalMessage">Mensagem</div>
            <div class="modal-actions" id="modalActions"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            fecharModal();
        }
    });
}

function showModal(tipo, titulo, mensagem, botoes, callback) {
    criarModal();
    var overlay = document.getElementById('customModal');
    var box = overlay.querySelector('.modal-box');
    var titleEl = document.getElementById('modalTitle');
    var messageEl = document.getElementById('modalMessage');
    var actionsEl = document.getElementById('modalActions');

    box.className = 'modal-box modal-' + tipo;
    titleEl.textContent = titulo;
    messageEl.textContent = mensagem;

    actionsEl.innerHTML = '';
    botoes.forEach(function(btn) {
        var btnEl = document.createElement('button');
        btnEl.className = 'btn ' + (btn.primary ? 'btn-primary' : 'btn-secondary');
        btnEl.textContent = btn.texto;
        btnEl.onclick = function() {
            if (callback) callback(btn.valor);
            fecharModal();
        };
        actionsEl.appendChild(btnEl);
    });

    overlay.classList.add('active');
}

function fecharModal() {
    var overlay = document.getElementById('customModal');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

function modalAlert(mensagem) {
    showModal('warning', 'Aviso', mensagem, [{ texto: 'OK', primary: true, valor: true }]);
}

function modalConfirm(mensagem, callback) {
    showModal('info', 'Confirmar', mensagem, [
        { texto: 'Cancelar', primary: false, valor: false },
        { texto: 'Confirmar', primary: true, valor: true }
    ], callback);
}

function modalSuccess(mensagem) {
    showModal('success', 'Sucesso', mensagem, [{ texto: 'OK', primary: true, valor: true }]);
}

function modalError(mensagem) {
    showModal('error', 'Erro', mensagem, [{ texto: 'OK', primary: true, valor: true }]);
}