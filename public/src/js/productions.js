$(document).ready(function () {

    $('#productions-execution-menus').DataTable({
        'paging': false,
        'info': false,
        "columnDefs": [
            {
                "orderable": false, targets: [0, 1, 2, 3, 4, 5, 6, 7],
            }
        ],
        "order": [[1, "asc"]],
        initComplete: function () {
            this.api().columns(0).every( function () {
                var column = this;
                var select = $('<select class="form-control form-control-sm" style="display: inline-block; max-width: 250px;"><option value="" selected>Всички обекти</option></select>')
                    .appendTo($('#filter-select-recipr-object'))
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    });
                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                });
            });
        }
    });


    $('#btn-send-ajax-need-quantity-products').on('click', function() {
        var productIdArr = [];
        var productQuantityArr = [];
        var filterDate = $('#filterDate').text();

        var tr = $('#need-quantity-products > tbody > tr');

        tr.find('.productions_product_quantity').each(function (index) {
            var productQuantity = $(this).val();

            if (productQuantity > 0) {
                var productId = $(this).parent().find('.productions_product_id').val();
                productQuantityArr.push(productQuantity);
                productIdArr.push(productId);
            }
        });

        $.ajax({
          method: "GET",
          url: "/ajax-need-quantity-products-for-delivery",
          data: {
                  "productIdArr": productIdArr,
                  "productQuantityArr": productQuantityArr,
                  "filterDate": filterDate
                }
        });
        setTimeout(function() { location.reload(); }, 500);
    });


    // check erroe if product-need-quantity > storehouse-quantity-product
    function checkAvailabilityQuantityInStorehouse() {
        $('#need-quantity-products > tbody > tr').find('.productions_product_quantity').each(function (index) {
            var thisRow = $(this).parent().parent();
            var productStorehouseAvailability = thisRow.find('.product-storehouse-availability').text() * 1;
            var productNeedQuantity = thisRow.find('.productions_product_quantity').val() * 1;
            if (productStorehouseAvailability < productNeedQuantity) {
                thisRow.css('border', '3px solid red');
                $('#btn-send-ajax-need-quantity-products').attr('disabled', true);
                thisRow.find('.check-error-product-storehouse-availability').text('1');
            } else {
                thisRow.css('border', 'none');
                $('#btn-send-ajax-need-quantity-products').attr('disabled', false);
                thisRow.find('.check-error-product-storehouse-availability').text('0');
            }
        });
    }
    checkAvailabilityQuantityInStorehouse();

    // disable button if error
    function disableButtonSendNeedQuantityProduct () {
        $('#need-quantity-products > tbody > tr').find('.productions_product_quantity').each(function (index) {
            if ($(this).parent().parent().find('.check-error-product-storehouse-availability').text() === '1') {
                $('#btn-send-ajax-need-quantity-products').attr('disabled', true);
            }
        });
    }
    disableButtonSendNeedQuantityProduct ()

    $('.productions_product_quantity').on('change click keyup mouseup', function() {
        checkAvailabilityQuantityInStorehouse();
        disableButtonSendNeedQuantityProduct ();
    })


    // validate input form -> number
    $('.productions_product_quantity, #additional-need-product-quantity').on('keydown', function (e) {
        // Change coma "," with punct "." in inputs
        if (e.keyCode === 188 || e.keyCode === 108) {
            this.value += '.';
            e.preventDefault();
        }
    }).numeric({ negative: false });


    // Add new additional product to need quantity products in storehouse
    // on change replace unit name
    var additionalNeedProductStorehouseAvailability = null;
    $('#additional-need-product').on('change', function() {
        var additionalNeedProductUnit = $(this).find('option:selected').attr('data-product-item-unit-name');
        $('#additional-need-product-unit').text(additionalNeedProductUnit);

        additionalNeedProductStorehouseAvailability = $(this).find('option:selected').attr('data-product-storehouse-availability');
        $('#additional-need-product-storehouse-availability').text(additionalNeedProductStorehouseAvailability);

        checkAvailabilityQuantityInStorehouseModalWindow();
    });

    // check erroe if product-need-quantity > storehouse-quantity-product - Modal window
    function checkAvailabilityQuantityInStorehouseModalWindow() {
        $('#modalAddNewAdditionalNeedProduct').delegate('#additional-need-product, #additional-need-product-quantity', 'change click keyup mouseup', function() {
            var additionalNeedProductQuantity = $('#additional-need-product-quantity').val() * 1;
            if (additionalNeedProductStorehouseAvailability < additionalNeedProductQuantity) {
                $('#additional-need-product-storehouse-availability').css('border', '3px solid red');
                $('#modalBtnAddNewAdditionalproductToNeedQuantityProductsInStorehouse').attr('disabled', true);
            } else {
                $('#additional-need-product-storehouse-availability').css('border', 'none');
                $('#modalBtnAddNewAdditionalproductToNeedQuantityProductsInStorehouse').attr('disabled', false);
            }
        });
    }
    checkAvailabilityQuantityInStorehouseModalWindow();

    // add data with ajax
    $('#modalBtnAddNewAdditionalproductToNeedQuantityProductsInStorehouse').on('click', function() {
        var additionalNeedProductId = $('#additional-need-product option:selected').val();
        var additionalNeedProductQuantity = $('#additional-need-product-quantity').val();
        var date = $('#filterDate').text();

        // validate modal dialog - form
        if (date && additionalNeedProductId && additionalNeedProductQuantity) {
            $.ajax({
                method: "GET",
                url: "/ajax-need-quantity-products-add-additional-product",
                data: {
                      "additionalNeedProductId": additionalNeedProductId,
                      "additionalNeedProductQuantity": additionalNeedProductQuantity,
                      "date": date
                    }
            });
            setTimeout(function() { location.reload(); }, 500);
        }
    });


    // Delete additional product to need quantity products in storehouse
    $('.btnDeleteAdditionalproductToNeedQuantityProductsInStorehouse').on('click', function() {
        var additionalProductId = $(this).parent().parent().find('.idNeedQuantityProductsInStorehouse').text();

        $.ajax({
            method: "GET",
            url: "/ajax-need-quantity-products-delete-additional-product",
            data: {
                  "additionalProductId": additionalProductId
                }
        });
        setTimeout(function() { location.reload(); }, 500);
    });


    // Printing recipes (quantity)
    $('#print-btn').click(function () {
        $('#print-page').print({
            // rejectWindow: false,
            noPrintSelector: ".no-print"
        });
    });

});
