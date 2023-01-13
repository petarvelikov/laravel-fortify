$(document).ready(function () {

    $('#grid-table-menus')
        .on('init.dt', function () {
            $('#grid-table-menus').show();
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


    // Save input values on filtring menus in index
    $('#btn-filter-menus').on('click', function () {
        var filteredMenuCustomerGroup = $('#menu-customer-group').val();
        var filteredMenuDate = $('#menu-date').val();

        localStorage.setItem('filtered-menu-customer-group', filteredMenuCustomerGroup);
        localStorage.setItem('filtered-menu-date', filteredMenuDate);
    });
    if (localStorage.getItem('filtered-menu-customer-group') === null) {
        $('#menu-customer-group').val(0);
    } else {
        $('#menu-customer-group').val(localStorage.getItem('filtered-menu-customer-group'));
    }
    $('#menu-date').val(localStorage.getItem('filtered-menu-date'));

    localStorage.removeItem('filtered-menu-customer-group');
    localStorage.removeItem('filtered-menu-date');

});
