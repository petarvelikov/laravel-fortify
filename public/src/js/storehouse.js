$(document).ready(function () {

    $('#grid-table-storehouse')
        .on('init.dt', function () {
            $('#grid-table-storehouse').show();
            $('.loading-table-message').hide();
        })
        .DataTable({
            initComplete: function () {
                this.api().columns(2).every(function () {
                    var column = this;
                    var select = $('<select class="form-control form-control-sm"><option value="">Всички</option></select>')
                        .appendTo($(column.footer()).empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );
                            column
                                .search(val ? '^' + val + '$' : '', true, false)
                                .draw();
                        });

                    column.data().unique().sort().each(function (d, j) {
                        select.append('<option value="' + d + '">' + d + '</option>')
                    });
                });
            },
            "createdRow": function(row) {
                if (($(row).find('.check-product-include-in-recipes').text() !== '')) {
                    $(row).css("background-color", "lightblue");
                }
            },
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Всички"]],
            "pagingType": "numbers",
            "oSearch": {
                "bSmart": false
            },
            "order": [[1, "asc"]],
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


    // validate input form -> number
    $('.storehouse-need-product-removed-quantity').on('keydown', function (e) {
        // Change coma "," with punct "." in inputs
        if (e.keyCode === 188 || e.keyCode === 108) {
            this.value += '.';
            e.preventDefault();
        }
    }).numeric({ negative: false });


    $('#btn-send-ajax-removed-quantity-products').on('click', function() {
        var productIdArr = [];
        var removedProductQuantityArr = [];
        var filterDate = $('#filter-date').text();
        var removedNeedQuantityProductsTableRow = $('#need-quantity-products-storehouse > tbody > tr');
        var removedNeedQuantityProductsArr = [];  // if product-removed-quantity > storehouse-quantity-product

        removedNeedQuantityProductsTableRow.find('.storehouse-need-product-id').each(function (index) {
            var productId = $(this).text() * 1;
            var removedProductQuantity = $(this).parent().find('.storehouse-need-product-removed-quantity').val() * 1;
            var productStorehouseQuantity = $(this).parent().find('.storehouse-need-product-availability').text() * 1;

            if (removedProductQuantity && productStorehouseQuantity >= removedProductQuantity) {
                productIdArr.push(productId);
                removedProductQuantityArr.push(removedProductQuantity);
                $(this).parent().find('.storehouse-need-product-removed-quantity').css('border', 'none');
            } else if (productStorehouseQuantity < removedProductQuantity) {
                $(this).parent().find('.storehouse-need-product-removed-quantity').css('border', '2px solid red');
                removedNeedQuantityProductsArr.push(productId);
            }
        });

        if (removedNeedQuantityProductsArr.length === 0) {
            $.ajax({
              method: "GET",
              url: "/ajax-removed-quantity-products-from-storehouse",
              data: {
                  "filterDate": filterDate,
                  "productIdArr": productIdArr,
                  "removedProductQuantityArr": removedProductQuantityArr
             }
            });
            setTimeout(function() { location.reload(); }, 500);
        } else {
            $('.storehouse-need-products-error-message').css('display', 'block');
        }
    });

});
