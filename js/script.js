$(document).ready( () => {
    function mostrarUsuarios() {
        codigoHTML = '';

        $.ajax({
            url: 'http://localhost:3000/api/mostrarUsuarios',
            type: 'GET',
            success: (contactos) => {
                contactos.forEach((contacto) => {
                    contacto.foto == null ? contacto.foto += ".png" : contacto.foto = contacto.foto;
                    
                    codigoHTML += `
                        <tr>
                            <td>${contacto.id}</td>
                            <td>${contacto.nombre}</td>
                            <td>${contacto.correo}</td>
                            <td>${contacto.password}</td>
                            <td><img src="http://localhost:3000/web/img/users/${contacto.foto}" width="100rem" alt=""></td>
                            <td>
                                <a href="#" class="modificar" id="${contacto.id}">Editar</a>
                                <a href="#" class="borrar" id="${contacto.id}">Borrar</a>
                            </td>
                        </tr>
                    `;
                });

                $('#usuarios').html(codigoHTML);
            }
        });
    }

    mostrarUsuarios();

    /* Nuevo Usuario */
    $('#formNuevoUsuario').submit((e) => {
        e.preventDefault();
        console.log("hola");
        
        var datos = {
            nombre: $('#nuevoNombre').val(),
            correo: $('#nuevoCorreo').val(),
            password: $('#nuevoPassword').val(),
            activo: true
        }
        console.log(datos);
        
        $.post('http://localhost:3000/api/registrarUsuario2', datos, () => {
            console.log("datos guardados");
            $('#modalInsertarUsuario').modal('hide');
            $('#nuevoNombre').val("");
            $('#nuevoCorreo').val("");
            $('#nuevoPassword').val("");
            mostrarUsuarios();
        });
    });


    /*  MODIFICAR CONTACTO  */
    $('body').on('click','.modificar', (e) => {
        e.preventDefault();
        let idRegistro = $(e.target)[0].id;
        console.info(idRegistro);

        $.ajax({
            url: 'http://localhost:3000/api/editarUsuario/'+idRegistro,
            type: 'GET',
            success: (registro) => {
                console.log(registro);
                $('#editarUsuario').modal('show');
                $('#editarId').val(registro.id);
                $('#editarNombre').val(registro.nombre);
                $('#editarCorreo').val(registro.correo);
                $('#editarPassword').val(registro.password);
            }
        });
    });

    /*  MODIFICAR CONTACTO 2 */
    $('#formEditarUsuario').submit((e) => {
        e.preventDefault();
        let datos = {
            id: $('#editarId').val(),
            nombre: $('#editarNombre').val(),
            correo: $('#editarPassword').val()
        }

        $.post('http://localhost:3000/api/modificarUsuario2/',datos, (e) => {
            $('#editarId').val('');
            $('#editarNombre').val('');
            $('#editarCorreo').val('');
            $('#editarPassword').val('');
            $('#editarUsuario').modal('hide');
            mostrarUsuarios();
        });
    });

    /*  BORRAR CONTACTO  */
    $('body').on('click','.borrar', (e) => {
        e.preventDefault();
        let idRegistro = $(e.target)[0].id;
        console.info(idRegistro);

        $.ajax({
            url: 'http://localhost:3000/api/borrarUsuarioFisico/'+idRegistro,
            type: 'GET',
            success: (respuesta) => {
                console.log(respuesta);
                mostrarUsuarios();
            }
        });
    });
});