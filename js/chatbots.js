
    document.addEventListener('DOMContentLoaded', () => {
        // --- REFERENCIAS DOM ---
        const els = {
            root: document.getElementById('chat-interface'),
            toggleBtn: document.getElementById('btn-toggle-chat'),
            minBtn: document.getElementById('btn-minimize'),
            input: document.getElementById('user-input'),
            sendBtn: document.getElementById('btn-send'),
            feed: document.getElementById('chat-feed'),
            timestamp: document.getElementById('chat-timestamp')
        };

        // Configuración
        let isOpen = false;
        
        // Establecer hora actual
        const now = new Date();
        if(els.timestamp) els.timestamp.textContent = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

        // --- FUNCIONES CORE ---

        // 1. Alternar Visibilidad
        const toggleChat = () => {
            isOpen = !isOpen;
            if (isOpen) {
                // Abrir
                els.root.classList.remove('hidden');
                // Timeout para permitir que el navegador procese el 'display: flex' antes de la opacidad
                requestAnimationFrame(() => {
                    els.root.classList.remove('scale-95', 'opacity-0');
                    els.root.classList.add('scale-100', 'opacity-100');
                });
                els.input.focus();
            } else {
                // Cerrar
                els.root.classList.remove('scale-100', 'opacity-100');
                els.root.classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                    els.root.classList.add('hidden');
                }, 300); // Esperar duración de transición CSS
            }
        };

        // 2. Agregar Mensaje al DOM
        const appendMessage = (text, sender = 'user') => {
            const div = document.createElement('div');
            div.className = `flex gap-3 message-enter ${sender === 'user' ? 'flex-row-reverse' : ''}`;
            
            // Icono o Avatar
            const avatar = sender === 'bot' 
                ? `<div class="w-8 h-8 rounded-full bg-[#002651] flex-shrink-0 flex items-center justify-center text-white text-xs mt-1">AI</div>`
                : `<div class="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-500 text-xs mt-1"><i class="fa-solid fa-user"></i></div>`;

            // Estilo de burbuja
            const bubbleStyle = sender === 'user'
                ? 'bg-gradient-to-r from-[#8A2BE2] to-[#00CED1] text-white rounded-tr-none shadow-md'
                : 'bg-white text-slate-600 border border-slate-100 rounded-tl-none shadow-sm';

            div.innerHTML = `
                ${avatar}
                <div class="p-3.5 rounded-2xl text-sm leading-relaxed max-w-[85%] ${bubbleStyle}">
                    ${text}
                </div>
            `;
            
            els.feed.appendChild(div);
            scrollToBottom();
        };

        // 3. Simular "Escribiendo..." y Respuesta
        const simulateResponse = () => {
            // Crear indicador de typing
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'flex gap-3 message-enter';
            typingIndicator.id = 'typing-indicator';
            typingIndicator.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-[#002651] flex-shrink-0 flex items-center justify-center text-white text-xs mt-1">AI</div>
                <div class="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-1">
                    <div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>
                </div>
            `;
            els.feed.appendChild(typingIndicator);
            scrollToBottom();

            // Retraso aleatorio para realismo (1.5s - 2.5s)
            setTimeout(() => {
                if(document.getElementById('typing-indicator')) typingIndicator.remove();
                
                appendMessage("Entendido. He registrado su solicitud. Un consultor senior de Alinea analizará su caso y le contactará vía correo con una propuesta técnica preliminar.", "bot");
                
            }, 2000);
        };

        // 4. Utilidades
        const scrollToBottom = () => {
            els.feed.scrollTop = els.feed.scrollHeight;
        };

        const handleSend = () => {
            const text = els.input.value.trim();
            if (!text) return;

            appendMessage(text, 'user');
            els.input.value = '';
            
            simulateResponse();
        };

        // --- EVENT LISTENERS ---
        els.toggleBtn.addEventListener('click', toggleChat);
        els.minBtn.addEventListener('click', toggleChat);
        
        els.sendBtn.addEventListener('click', handleSend);
        
        els.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    });
