 document.addEventListener('DOMContentLoaded', function() {
            const fileInput = document.getElementById('file-upload');
            const messageDiv = document.getElementById('message');
            const previewDiv = document.getElementById('preview');
            const submitBtn = document.getElementById('submitBtn');
            const form = document.getElementById('myForm');
            
            let fileValid = false;
            
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                
                // Reiniciar mensajes y vista previa
                messageDiv.className = 'message';
                previewDiv.innerHTML = '';
                
                if (!file) {
                    messageDiv.textContent = 'Por favor selecciona un archivo';
                    messageDiv.classList.add('error');
                    fileValid = false;
                    updateSubmitButton();
                    return;
                }
                
                // Validar tipo de archivo
                const validTypes = [
                    'image/jpeg', 
                    'image/jpg', 
                    'image/png', 
                    'application/pdf'
                ];
                
                if (!validTypes.includes(file.type)) {
                    messageDiv.textContent = 'Error: Formato no válido. Solo se permiten JPG, JPEG, PNG y PDF.';
                    messageDiv.classList.add('error');
                    fileValid = false;
                    updateSubmitButton();
                    return;
                }
                
                // Si es válido, mostrar mensaje de éxito y vista previa
                messageDiv.textContent = `Archivo válido: ${file.name}`;
                messageDiv.classList.add('success');
                fileValid = true;
                updateSubmitButton();
                
                // Crear vista previa según tipo de archivo
                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    previewDiv.appendChild(img);
                } else if (file.type === 'application/pdf') {
                    const iframe = document.createElement('iframe');
                    iframe.src = URL.createObjectURL(file);
                    previewDiv.appendChild(iframe);
                }
            });
            
            // Función para actualizar el estado del botón de envío
            function updateSubmitButton() {
                const nombre = document.getElementById('nombre').value.trim();
                const apellido = document.getElementById('apellido').value.trim();
                const email = document.getElementById('email').value.trim();
                
                if (nombre && apellido && email && fileValid) {
                    submitBtn.disabled = false;
                } else {
                    submitBtn.disabled = true;
                }
            }
            
            // Agregar event listeners a los campos del formulario
            document.getElementById('nombre').addEventListener('input', updateSubmitButton);
            document.getElementById('apellido').addEventListener('input', updateSubmitButton);
            document.getElementById('email').addEventListener('input', updateSubmitButton);
            // Se agrega un evento igual a los campos de texto para actualizar el boton enviar cuando se escriba algo.
            // Manejar el envío del formulario
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Obtener los datos del formulario
                const formData = {
                    nombre: document.getElementById('nombre').value,
                    apellido: document.getElementById('apellido').value,
                    email: document.getElementById('email').value,
                    archivo: fileInput.files[0].name
                };
                
                // Mostrar confirmación con los datos
                alert(`Formulario enviado con éxito:\n\nNombre: ${formData.nombre}\nApellido: ${formData.apellido}\nEmail: ${formData.email}\nArchivo: ${formData.archivo}`);
                
                // Reiniciar el formulario
                form.reset();
                messageDiv.className = 'message';
                previewDiv.innerHTML = '';
                fileValid = false;
                updateSubmitButton();
            });
        });