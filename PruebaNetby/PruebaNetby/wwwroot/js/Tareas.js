var tareas_pendientes = [];

$(document).ready(function () {
    $('#header_tareas').attr('hidden', false)
    $('#header_tareas').show();
    consultarTareas();


    $('#btnSalir').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#modalTarea').modal('hide');
    });
    $('#btnActualizar').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (validaCampos() == false) {
            let tarea = obtenerTarea();
            let estado = $('#txtId').val() == '' || $('#txtId').val() == undefined ? true : false;
            ActualizaTareas(estado, tarea);

        }


    });
    $('#btnNuevo').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        limpiarCamposTareas();
        $('#modalTarea').modal('show');
        $('#modalTituloTarea').text('Nueva Tarea');
    });
    $('#txtFechaCreacion').on("change", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let fecha_inicio = $('#txtFechaCreacion').val();

        $('#txtFechaVencimiento').attr('min', fecha_inicio)
    });
    if (localStorage.getItem('isLoggedIn') !== "true") {
        window.location.href = + 'Index';
    }

})
function dibujarTablaTarea(tareas_array) {
    var tbl_Datos = $('#tbl_tareas');
    if ($.fn.DataTable.isDataTable('#tbl_tareas')) {
        $('#tbl_tareas').DataTable().destroy();
    }
    var config = {
        "data": tareas_array,
        'language': {
            "emptyTable": "No existen datos disponibles para mostrar",
        },
        "scrollY": '550px',
        "scrollX": '450px',
        "dom": 't',
        "columns": [
            {
                "render": function (data, type, row, meta) {
                    return '<span class="id_tarea">' + data + '</span>'
                }, "data": "id"
            },
            {
                "render": function (data, type, row, meta) {
                    return '<span class="titulo">' + data + '</span>'
                }, "data": "titulo"
            },
            {
                "render": function (data, type, row, meta) {
                    return '<span class="descripcion">' + data + '</span>'
                }, "data": "descripcion"
            },
            {
                "render": function (data, type, row, meta) {
                    let fecha = data
                    let momentDate = moment(fecha).format('DD/MM/YYYY');
                    return '<span class="fecha_creacion">' + momentDate + '</span>'
                }, "data": "fecha_creacion"
            },
            {
                "render": function (data, type, row, meta) {
                    let fecha = data
                    let momentDate = moment(fecha).format('DD/MM/YYYY');
                    return '<span class="fecha_vencimiento">' + momentDate + '</span>'
                }, "data": "fecha_vencimiento"
            },
            {
                "render": function (data, type, row, meta) {
                    return '<input disabled type="checkbox" class="checkbox completada"' + (data == 1 ? ' checked ' : ' ') + '></span>'
                }, "data": "completada"
            },
            {
                "render": function (data, type, row, meta) {
                    boton_editar = '<a class="btn-opcion-linea-tabla btn_editar"> <img style="width:24px;height:24px"  src="/imagenes/editar.png"  alt="Editar" title="Editar"></a> <a class="btn-opcion-linea-tabla btn_eliminar"> <img style="width:24px;height:24px"  src="/imagenes/eliminar.png" alt="Eliminar" title="Eliminar"></a>'

                    return '<div style="text-align:right">' + (boton_editar) + '</div>'
                }, "data": "usuario"
            },
        ],
        searching: false,
        paging: false,
        ordering: false,
        'createdRow': function (row, data, index) {
            $(row).find('.btn_editar').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                debugger

                let id_tarea = $(row).find('.id_tarea').text();
                let tarea_array = tareas_pendientes.find(function (p) {
                    return p.id == id_tarea;
                });
                $('#modalTarea').modal('show');
                $('#modalTituloTarea').text('Editar Tarea ID: ' + id_tarea);
                cargarInformacionTarea(tarea_array);
            })
            $(row).find('.btn_eliminar').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                debugger

                let id_tarea = $(row).find('.id_tarea').text();
                let tarea_array = tareas_pendientes.find(function (p) {
                    return p.id == id_tarea;
                });
                var options = {
                    title: 'Tareas pendientes',
                    text: "¿Desa eliminar la tarea con ID :" + id_tarea + "?",
                    icon: "warning",
                    buttons: {
                        no: "No",
                        si: "Si"
                    }
                }
                swal(options)
                    .then((value) => {
                        switch (value) {

                            case "si":
                                EliminarTareas(tarea_array);
                            case "no":
                                break;
                        }
                    });

            })
        },
        'footerCallback': function (row, data, start, end, display) {
        }
    }
    tbl_Datos.DataTable(config);
}
function cargarInformacionTarea(tarea_pendiente) {
    debugger
    $('#txtId').val(tarea_pendiente.id);
    $("#txtFechaCreacion").trigger("change");
    $('#txtTitulo').val(tarea_pendiente.titulo);
    $('#txtDescripcion').val(tarea_pendiente.descripcion);
    let fecha_creacion = moment(tarea_pendiente.fecha_creacion).format('YYYY-MM-DD');
    console.log('f' + fecha_creacion)
    $('#txtFechaCreacion').val(fecha_creacion);
    let fecha_vencimiento = moment(tarea_pendiente.fecha_vencimiento).format('YYYY-MM-DD');
    $('#txtFechaVencimiento').val(fecha_vencimiento);
    $('#checkCompletada').prop('checked', tarea_pendiente.completada == 1 ? true : false);

}
function validaCampos() {
    let errores = false;
    let txtTitulo = $('#txtTitulo').val();
    let txtDescripcion = $('#txtDescripcion').val();
    let txtFechaCreacion = $('#txtFechaCreacion').val();
    let txtFechaVencimiento = $('#txtFechaVencimiento').val();
    let checkCompletada = $('#checkCompletada').prop("checked");
    if (txtTitulo == "" || txtTitulo == null) {
        //foco_pantalla = '#txtValorFacturado';
        document.querySelector('#lblTitulo').innerText = 'Campo requerido';
        errores = true;
    }
    if (txtDescripcion == "" || txtDescripcion == null) {
        //foco_pantalla = '#txtValorFacturado';
        document.querySelector('#lblDescripcion').innerText = 'Campo requerido';
        errores = true;
    }
    if (txtFechaCreacion == "" || txtFechaCreacion == null) {
        //foco_pantalla = '#txtValorFacturado';
        document.querySelector('#lblFechaCreacion').innerText = 'Campo requerido';
        errores = true;
    }
    if (txtFechaVencimiento == "" || txtFechaVencimiento == null) {
        //foco_pantalla = '#txtValorFacturado';
        document.querySelector('#lblFechaCaducidad').innerText = 'Campo requerido';
        errores = true;
    }
    if (errores == true) {
        muestra_error = false;
        swal({
            title: 'Tareas pendientes',
            text: 'Verifique los datos de la pantalla',
            icon: 'warning'
        }).then((result) => {
        });
    }
    return errores;
}
function obtenerTarea() {
    let id = $('#txtId').val();
    let txtTitulo = $('#txtTitulo').val();
    let txtDescripcion = $('#txtDescripcion').val();
    let txtFechaCreacion = $('#txtFechaCreacion').val();
    let txtFechaVencimiento = $('#txtFechaVencimiento').val();
    let checkCompletada = $('#checkCompletada').prop("checked");
    let tarea = {};
    debugger
    tarea = {
        Id: id,
        Titulo: txtTitulo,
        Descripcion: txtDescripcion,
        Fecha_creacion: txtFechaCreacion,
        Fecha_vencimiento: txtFechaVencimiento,
        Completada: checkCompletada == true ? 1 : 0
    }
    return tarea;
}
function limpiarCamposTareas() {
    document.querySelector('#lblTitulo').innerText = '';
    document.querySelector('#lblDescripcion').innerText = '';
    document.querySelector('#lblFechaCreacion').innerText = '';
    document.querySelector('#lblFechaCaducidad').innerText = '';
    $('.etiqueta_Error').val('');
    $('#txtId').val('');
    $('#txtTitulo').val('');
    $('#txtDescripcion').val('');
    $('#txtFechaCreacion').val('');
    $('#txtFechaVencimiento').val('');
    $('#checkCompletada').prop('checked', false);
}
function consultarTareas() {
    url =  '/api/Tareas/GetTareas'
    $.ajax({
        method: 'GET',
        url: url,
        dataType: 'json'
    }).done(function (data) {
        debugger
        if (data != undefined) {
            tareas_pendientes = [];
            tareas_pendientes = data;
            dibujarTablaTarea(tareas_pendientes);
        }
    }).fail(function () {
        swal({
            title: 'Tareas pendientes',
            text: "Proceso Interrumpido",
            icon: 'error'
        });
    });
}
function ActualizaTareas(guardar, tareas) {
    debugger
    //let url = "";
    let operacion = "";
    if (guardar) {
        url = '/api/Tareas/AddTarea';
        operacion = 'POST';
        delete tareas['Id'];
    } else {
        url =  '/api/Tareas/UpdateTarea';
        operacion = 'PUT';
    }
    $.ajax({
        method: operacion,
        url: url,
        data: JSON.stringify({
            Id: tareas.Id,
            Titulo: tareas.Titulo,
            Descripcion: tareas.Descripcion,
            Fecha_creacion: tareas.Fecha_creacion,
            Fecha_vencimiento: tareas.Fecha_vencimiento,
            Completada: tareas.Completada == true ? 1 : 0,
            Estado: 1
        }),
        contentType: 'application/json; charset=utf-8',
    }).done(function (data) {
        if (data != undefined) {
            if (data.error == 1) {
                mostrarMensaje('success', data.mensaje);
                $('#modalTarea').modal('hide');
                consultarTareas();
            } else {
                mostrarMensaje('error', data.mensaje);
            }

        }
    }).fail(function () {
        mostrarMensaje('error', 'Proceso Interrumpido')
    });
}
function EliminarTareas(tareas) {
    $.ajax({
        method: 'PUT',
        url:'/api/Tareas/EliminarTarea',
        data: JSON.stringify({
            Id: tareas.id,
            Titulo: tareas.titulo,
            Descripcion: tareas.descripcion,
            Fecha_creacion: tareas.fecha_creacion,
            Fecha_vencimiento: tareas.fecha_vencimiento,
            Completada: tareas.completada == true ? 1 : 0,
            Estado: 0
        }),
        contentType: 'application/json; charset=utf-8',
    }).done(function (data) {
        if (data != undefined) {
            if (data.error == 1) {
                mostrarMensaje('success', data.mensaje);
                $('#modalTarea').modal('hide');
                consultarTareas();
            } else {
                mostrarMensaje('error', data.mensaje);
            }

        }
    }).fail(function () {
        mostrarMensaje('error', 'Proceso Interrumpido')
    });
}
function mostrarMensaje(tipo, mensaje) {
    var options = {
        title: 'Tareas pendientes',
        text: mensaje,
        icon: tipo,
    }
    swal(options)
        .then((value) => {
            $(this).hide();
        });
}