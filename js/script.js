$(document).ready( () => {
    function showUsers() {
        codigoHTML = '';

        $.ajax({
            url: 'http://localhost:3000/api/mostrarUsuarios', //TODO Cambiar Ruta de la API
            type: 'GET',
            success: (users) => {
                users.forEach((user) => {
                    user.foto == null ? user.foto += ".png" : user.foto = user.foto;
                    
                    codigoHTML += `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.usr}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.password}</td>
                            <td><img src="http://localhost:3000/web/img/users/${user.photo}" width="100rem" alt=""></td> //TODO Cambiar Ruta de Fotos
                            <td>
                                <a href="#" class="modificar" id="${user.id}">Editar</a>
                                <a href="#" class="borrar" id="${user.id}">Borrar</a>
                            </td>
                        </tr>
                    `;
                });

                $('#users').html(codigoHTML);
            }
        });
    }

    showUsers();

    /* Nuevo Usuario */
    $('#formNewUser').submit((e) => {
        e.preventDefault();
        
        var data = {
            usr: $('#newUser').val(),
            name: $('#newName').val(),
            email: $('#newEmail').val(),
            password: $('#newPassword').val()
        }
        console.info(data);
        
        $.post('http://localhost:3000/api/registrarUsuario2', data, () => { //TODO Cambiar Ruta de la API
            console.info("Saved data");
            $('#modalNewUser').modal('hide');
            $('#newUser').val("");
            $('#newName').val("");
            $('#newEmail').val("");
            $('#newPassword').val("");
            showUsers();
        });
    });


    /*  MODIFICAR CONTACTO  */
    $('body').on('click','.modificar', (e) => {
        e.preventDefault();
        let idUser = $(e.target)[0].id;
        console.info(idUser);

        $.ajax({
            url: 'http://localhost:3000/api/editarUsuario/'+idUser, //TODO Cambiar Ruta de la API
            type: 'GET',
            success: (user) => {
                console.info(user);
                $('#modalEditUser').modal('show');
                $('#editId').val(user.id);
                $('#editUser').val(user.usr);
                $('#editName').val(user.name);
                $('#editEmail').val(user.email);
                $('#editPassword').val(user.password);
            }
        });
    });

    /*  MODIFICAR CONTACTO 2 */
    $('#formEditUser').submit((e) => {
        e.preventDefault();
        let data = {
            id_usr: $('#editId').val(),
            usr: $('#editUser').val(),
            name: $('#editName').val(),
            email: $('#editEmail').val(),
            password: $('#editPassword').val()
        }

        $.post('http://localhost:3000/api/modificarUsuario2/',datos, (e) => { //TODO Cambiar la Ruta de la API
            $('#editId').val('');
            $('#editUser').val('');
            $('#editName').val('');
            $('#editEmail').val('');
            $('#editPassword').val('');
            $('#modalEditUser').modal('hide');
            showUsers();
        });
    });

    /*  BORRAR CONTACTO  */
    $('body').on('click','.borrar', (e) => {
        e.preventDefault();
        let idUser = $(e.target)[0].id;
        console.info(idUser);

        $.ajax({
            url: 'http://localhost:3000/api/borrarUsuarioFisico/'+idUser, //TODO Cambiar la Ruta de la API
            type: 'GET',
            success: (response) => {
                console.info(response);
                showUsers();
            }
        });
    });
});