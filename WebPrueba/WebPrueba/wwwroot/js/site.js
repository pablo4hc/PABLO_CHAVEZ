$(document).ready(function () {
    Inicializar();
})
function Inicializar() {
    $('#header_tareas').attr('hidden', true)
    $('#btnLogin').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('aoso')
        if (validaCampos() == false) {
            let usuario = $('#txtUsuario').val();
            let password = $('#txtContrasenia').val();
            loginUsuario(usuario, password);
        }
    });

}
function validaCampos() {
    let errores = false;
    let txtUsuario = $('#txtUsuario').val();
    let txtContrasenia = $('#txtContrasenia').val();
    if (txtUsuario == "" || txtUsuario == null) {
        //foco_pantalla = '#txtValorFacturado';
        document.querySelector('#lblUsuario').innerText = 'Campo requerido';
        errores = true;
    }
    if (txtContrasenia == "" || txtContrasenia == null) {
        //foco_pantalla = '#txtValorFacturado';
        document.querySelector('#lblContrasenia').innerText = 'Campo requerido';
        errores = true;
    }
    if (errores == true) {
        muestra_error = false;
        swal({
            title: 'Login',
            text: 'Verifique los datos de la pantalla',
            icon: 'warning'
        }).then((result) => {
        });
    }
    return errores;
}
function loginUsuario(usuario,password) {
    url = 'http://localhost:5218/api/Usuario/GetUsuario'
    $.ajax({
        method: 'GET',
        url: url,
        data: { user: usuario, password: password },
        dataType: 'json'
    }).done(function (data) {
        debugger
        if (data != undefined) {
            if (data.error == 1) {
                localStorage.setItem('isLoggedIn', true);
                window.location.href = 'FormularioTareas';
            } else {
                mostrarMensaje('error', data.mensaje);    
            }
           
        }
    }).fail(function () {
        mostrarMensaje('error', 'Proceso Interrumpido');      
    });
}
function mostrarMensaje(tipo, mensaje) {
    var options = {
        title: 'Login',
        text: mensaje,
        icon: tipo,
    }
    swal(options)
        .then((value) => {
            $(this).hide();
        });
}