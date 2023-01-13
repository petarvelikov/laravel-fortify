$(document).ready(() => {

    // DataTable - product-items
    $('#grid-table-product-items')
        .on('init.dt', function () {
            $('#grid-table-product-items').show();
            $('.loading-table-message').hide();
        })
        .DataTable({
            initComplete: function () {
                this.api().columns(2).every( function () {
                    var column = this;
                    var select = $('<select class="form-control form-control-sm"><option value="">Всички</option></select>')
                        .appendTo( $(column.footer()).empty() )
                        .on( 'change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
                            column
                                .search( val ? '^'+val+'$' : '', true, false )
                                .draw();
                        } );

                    column.data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    } );
                } );
                this.api().columns(3).every( function () {
                    var column = this;
                    var select = $('<select class="form-control form-control-sm"><option value="">Всички</option></select>')
                        .appendTo( $(column.footer()).empty() )
                        .on( 'change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
                            column
                                .search( val ? '^'+val+'$' : '', true, false )
                                .draw();
                        } );

                    column.data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    } );
                } );
            },
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Всички"]],
            "pagingType": "numbers",
            "oSearch": {
                "bSmart": false
            },
            "columnDefs": [
                {
                    "orderable": false, targets: [5],
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


    // Update subgroup selectBox list on change group selectBox on productItems with ajax
    $('#select-group-id').on('change', function () {
        var selectedGroupId = this.value;

        $.get('/ajax-product-items-create?group_id=' + selectedGroupId, function (data) {
            $('#select-subgroup-id').empty();

            $.each(data, function (index, subgroupsObj) {
                $('#select-subgroup-id').append('<option value="' + subgroupsObj.id + '">' + subgroupsObj.name + '</option>').sortSelect();
            });
            $('#select-subgroup-id').prepend('<option value="" disabled selected>Изберете подгрупа</option>');
        });
    });


    // Keep selectBox after submit for productItems index using browser local storage
    $('#btn-submit-product-items').on('click', function () {
        var productItemGroup = $('#select-group-id').val();
        var productItemSubGroup = $('#select-subgroup-id').val();
        var productItemUnit = $('#select-unit-id').val();

        localStorage.setItem('selected-group-id', productItemGroup);
        localStorage.setItem('selected-subgroup-id', productItemSubGroup);
        localStorage.setItem('selected-unit-id', productItemUnit);
    });

    $('#select-group-id').val(localStorage.getItem('selected-group-id'));
    $('#select-unit-id').val(localStorage.getItem('selected-unit-id'));

    // Ajax for compared selectBox
    var selectedGroupIdFromLocalstorage = $('#select-group-id').val();
    $.get('/ajax-product-items-create?group_id=' + selectedGroupIdFromLocalstorage, function (data) {
        if (selectedGroupIdFromLocalstorage) {
            $('#select-subgroup-id').empty();
        }

        $.each(data, function (index, subgroupsObj) {
            $('#select-subgroup-id').append('<option value="' + subgroupsObj.id + '">' + subgroupsObj.name + '</option>').sortSelect();
        });
    });

    setTimeout(function () {
        $('#select-subgroup-id').val(localStorage.getItem('selected-subgroup-id'));
        localStorage.removeItem('selected-subgroup-id');
    }, 500);

    localStorage.removeItem('selected-group-id');
    localStorage.removeItem('selected-unit-id');


    // Edit product-item update subgroup selectBox list on change group selectBox on productItems with ajax
    $('#group-id').on('change', function () {
        var editProductItemSelectedGroupId = this.value;

        $.get('/ajax-product-items-create?group_id=' + editProductItemSelectedGroupId, function (data) {
            $('#subgroup-id').empty();

            $.each(data, function (index, subgroupsObj) {
                $('#subgroup-id').append('<option value="' + subgroupsObj.id + '">' + subgroupsObj.name + '</option>').sortSelect();
            });
            $('#subgroup-id').prepend('<option value="" disabled selected>Изберете подгрупа</option>');
        });
    });


// ------------------------------------- SUB GROUPS ------------------------------------------------


    // Keep selectBox after submit for productItemSubGroups index using browser local storage
    $('#btn-submit-product-item-subgroup').on('click', function () {
        var productItemGroup = $('#product-item-group-id').val();

        localStorage.setItem('product-item-group-id', productItemGroup);
    });

    $('#product-item-group-id').val(localStorage.getItem('product-item-group-id'));

    localStorage.removeItem('product-item-group-id');

});
