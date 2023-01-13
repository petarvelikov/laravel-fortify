$(document).ready(function () {

    $('#grid-table-customers')
        .on('init.dt', function () {
            $('#grid-table-customers').show();
            $('.loading-table-message').hide();
        })
        .DataTable({
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Всички"]],
            "pagingType": "numbers",
            "oSearch": {
                "bSmart": false
            },
            "columnDefs": [
                {
                    "orderable": false, targets: [7],
                }
            ],
            "order": [[0, "desk"]],
            "language": {
                "decimal": ".",
                "thousands": " ",
                "search": "Търси:",
                "lengthMenu": "Покажи _MENU_ записа на страница",
                "zeroRecords": "Нищо не е намерено",
                "loadingRecords": "Зареждане ...",
                "processing": "Обработване ...",
                "paginate": {
                    "first": "Първа",
                    "last": "Последна",
                    "next": "Следваща",
                    "previous": "Предишна"
                },
                "info": "Показване на страница _PAGE_ от _PAGES_ от общо: _MAX_ записа",
                "infoEmpty": "Няма налични записи",
                "infoFiltered": "(филтрирани: _TOTAL_)",
            }
        });


    $('#grid-table-customer-objects').DataTable({
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Всички"]],
        "pagingType": "numbers",
        "oSearch": {
            "bSmart": false
        },
        "columnDefs": [
            {
                "orderable": false, targets: [3],
            }
        ],
        "order": [[0, "desk"]],
        "language": {
            "decimal": ".",
            "thousands": " ",
            "search": "Търси:",
            "lengthMenu": "Покажи _MENU_ записа на страница",
            "zeroRecords": "Нищо не е намерено",
            "loadingRecords": "Зареждане ...",
            "processing": "Обработване ...",
            "paginate": {
                "first": "Първа",
                "last": "Последна",
                "next": "Следваща",
                "previous": "Предишна"
            },
            "info": "Показване на страница _PAGE_ от _PAGES_ от общо: _MAX_ записа",
            "infoEmpty": "Няма налични записи",
            "infoFiltered": "(филтрирани: _TOTAL_)",
        }
    });


    // Keep selectBox after submit for customer-objects index using browser local storage
    $('#btn-submit-customer-object').on('click', function () {
        var customer = $('.customer').val();
        localStorage.setItem('selected-customer-in-customer-objects', customer);
    });
    $('.customer').val(localStorage.getItem('selected-customer-in-customer-objects'));
    localStorage.removeItem('selected-customer-in-customer-objects');

});
