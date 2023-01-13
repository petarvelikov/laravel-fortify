$(document).ready(() => {

    // DataTable - compatible products
    $('#grid-table-compatible-products')
        .on('init.dt', function () {
            $('#grid-table-compatible-products').show();
            $('.loading-table-message').hide();
        })
        .DataTable({
            initComplete: function () {
                this.api().columns(1).every( function () {
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
                    "orderable": false, targets: [1, 2, 3, 4, 5, 6, 7],
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


    // validate and save compatible product
    $('#btn-save-compatible-product').on('click', function() {
        var mainProductId = $('#compatible-product-1-id').val();
        var mainProductQuantity = $('#compatible-product-1-quantity').val();
        var compatibleProductId = $('#compatible-product-2-id').val();
        var compatibleProductQuantity = $('#compatible-product-2-quantity').val();

        if(mainProductId === null || mainProductQuantity === '' || compatibleProductId === null || compatibleProductQuantity === '') {
            $('#compatible-products-validation-message-all-required').css('display', 'block');
        } else {
            $('#compatible-products-validation-message-all-required').css('display', 'none');
            $.ajax({
                method: "GET",
                url: "/ajax-validata-and-create-compatible-product",
                data: {
                    "mainProductId": mainProductId,
                    "mainProductQuantity": mainProductQuantity,
                    "compatibleProductId": compatibleProductId,
                    "compatibleProductQuantity": compatibleProductQuantity
                },
                success: function (responseData) {
                    if(responseData.isExists === 1) {
                        $('#compatible-products-validation-message').css('display', 'block');
                    } else {
                        setTimeout(function() { location.reload(); }, 250);
                    }
                }
            });
        }
    });

});
