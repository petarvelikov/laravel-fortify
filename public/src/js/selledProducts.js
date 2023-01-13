$(document).ready(function () {

    $('#table-selled-products-invoice')
        .on('init.dt', function () {
            $('#table-selled-products-invoice').show();
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
                    "orderable": false, targets: [0, 1, 2, 3],
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


    // Save input values on filtring selled products invoice in index
    $('#btn-filter-selled-products-invoice').on('click', function () {
        var filteredSelledProductInvoiceDate = $('#selled-products-invoice-filter-date').val();
        var filteredSelledProductInvoiceCustomer = $('#selled-products-invoice-filter-customer').val();

        localStorage.setItem('filtered-selled-products-invoice-date', filteredSelledProductInvoiceDate);
        localStorage.setItem('filtered-selled-products-invoice-customer', filteredSelledProductInvoiceCustomer);
    });
    if (localStorage.getItem('filtered-selled-products-invoice-customer') === null) {
        $('#selled-products-invoice-filter-customer').val(0);
    } else {
        $('#selled-products-invoice-filter-customer').val(localStorage.getItem('filtered-selled-products-invoice-customer'));
    }
    $('#selled-products-invoice-filter-date').val(localStorage.getItem('filtered-selled-products-invoice-date'));

    localStorage.removeItem('filtered-selled-products-invoice-date');
    localStorage.removeItem('filtered-selled-products-invoice-customer');


// ----------------------------- Selled Products Create -> Start -----------------------------------------------

    // ajax - sell product invoice (manual removed products from storehouse) -> get products
    function ajaxGetStorehouseInvoicedProducts() {
        $.get('/ajax-get-selled-products-from-storehouse', function (data) {
            // products data
            $('#select-selled-product-id:last').empty();
            $.each(data.productsForSell, function (index, productsForSell) {
                $('#select-selled-product-id:last').prepend('<option data-product-unit-name="'+productsForSell.data_product_unit_name+'" data-product-storehouse-availability="'+productsForSell.data_product_storehouse_availability+'" data-product-storehouse-average-unit-price="'+productsForSell.data_product_storehouse_average_unit_price+'" value="'+productsForSell.product_id+'">'+productsForSell.product_name+'</option>');
            });
            $('#select-selled-product-id:last').prepend('<option value="" disabled selected>Изберете продукт</option>');
        });

        return false;
    }
    ajaxGetStorehouseInvoicedProducts();


    $('#select-selled-product-id').on('change', function () {
        $('#selledProductsCreateAddNewProductModal').modal('show');

        // Ajax get all the same products wint batch number from deliveries (delivery_product) - with remaining_quantity > 0
        var selectedProductId = $(this).val();

        $.ajax({
            method: "GET",
            url: "/ajax-selled-products-modal-get-products",
            data: {
                "selectedProductId": selectedProductId
            },
            success: function(resData) {
                var productsData = resData.selledProductsAllIdenticalProducts;

                $('#selledProductsCreateAddNewProductModal .modal-title').text(productsData[0]['product_name'])

                $('#tbody-modal-selled-products-add-product').empty();

                for (var i = 0; i < productsData.length; i++) {
                    var newTableRow = '<tr>'+
                        '<td class="d-none">'+
                            '<span class="modal-id">'+ productsData[i]['id'] +'</span>'+
                        '</td>'+
                        '<td class="d-none">'+
                            '<span class="modal-product_id">'+ productsData[i]['product_id'] +'</span>'+
                        '</td>'+
                        '<td>'+
                            '<span class="modal-product-batch-number">'+ productsData[i]['product_batch_number'] +'</span>'+
                        '</td>'+
                        '<td style="width: 100px;">'+
                            '<input class="modal-product-quantity form-control form-control-sm" type="text" name="product_quantity[]" autocomplete="off" required />'+
                        '</td>'+
                        '<td>'+
                            '<span class="modal-remaining_quantity">'+ productsData[i]['product_total_quantity'] +'</span>'+
                        '</td>'+
                        '<td>'+
                            '<span class="modal-unit-name">'+ productsData[i]['product_unit_name'] +'</span>'+
                        '</td>'+
                        '<td class="d-none">'+
                            '<span class="check-error-product-remaining-quantity">0</span>'+
                        '</td>'+
                    '</tr>';

                    $('#tbody-modal-selled-products-add-product').append(newTableRow);
                }
            }
        });

        // auto calc total using product quantity in footer on table
        $('#selledProductsCreateAddNewProductModal').delegate('.modal-product-quantity', 'keyup keydown keypress', function() {
            var modalTotalProductQuantity = 0;

            $('.modal-product-quantity').each(function() {
                var modalRowProductQuantity = $(this).val()*1;
                modalTotalProductQuantity +=  modalRowProductQuantity;
            });
            $('#modalSelledProductsProductTotalQuantity').text(modalTotalProductQuantity);
        });
    });


    $('#tbody-modal-selled-products-add-product').delegate('.modal-product-quantity', 'click keyup mouseup change', function() {
        var selectedProductTableRow = $(this).parent().parent();
        var selectedProductQuantity = selectedProductTableRow.find('.modal-product-quantity').val();
        var selectedProductRemainingQuantity = selectedProductTableRow.find('.modal-remaining_quantity').text() * 1;

        // auto chech product storehouse availability
        if(selectedProductQuantity > selectedProductRemainingQuantity) {
            selectedProductTableRow.css('border', '3px solid red');
            selectedProductTableRow.find('.check-error-product-remaining-quantity').text('1');
        } else {
            selectedProductTableRow.css('border', 'none');
            selectedProductTableRow.find('.check-error-product-remaining-quantity').text('0');
        }

        autoCheckError();

    }).numeric({ negative: false });


    // chech error - red row - product storehouse availability
    function autoCheckError() {
        if($('#btn-save-selled-products-invoice-temp-data-to-db')) {
            var errorRedRows = 0;
            $('#tbody-modal-selled-products-add-product > tr').find('.check-error-product-remaining-quantity').each(function (index) {
                var checkErrorValue = $(this).text();
                if(checkErrorValue === '1') {
                    errorRedRows = 1;
                    return false;
                }
            });
            if(errorRedRows === 1) {
                $('#btn-save-selled-products-invoice-temp-data-to-db').attr('disabled', true);
            } else {
                $('#btn-save-selled-products-invoice-temp-data-to-db').attr('disabled', false);
            }
        }
    }
    autoCheckError();


    // Save to temp
    $('#btn-save-selled-products-invoice-temp-data-to-db').on('click', function() {
        var modalDeliveryProductIdArr = [];
        var modalProductIdArr = [];
        var modalProductBatchNumberArr = [];
        var modalProductQuantityArr = [];

        $('#tbody-modal-selled-products-add-product > tr').find('.modal-product-quantity').each(function (index) {
            if(this.value != '' && this.value != 0) {
                modalDeliveryProductIdArr.push($(this).parent().parent().find('.modal-id').text());
                modalProductIdArr.push($(this).parent().parent().find('.modal-product_id').text());
                modalProductBatchNumberArr.push($(this).parent().parent().find('.modal-product-batch-number').text());
                modalProductQuantityArr.push($(this).parent().parent().find('.modal-product-quantity').val());
            }
        });

        $.ajax({
            method: "GET",
            url: "/ajax-selled-products-create-add-product-to-temp-data",
            data: {
                "modalDeliveryProductIdArr": modalDeliveryProductIdArr,
                "modalProductIdArr": modalProductIdArr,
                "modalProductBatchNumberArr": modalProductBatchNumberArr,
                "modalProductQuantityArr": modalProductQuantityArr
            }
        });

        setTimeout(function() { location.reload(true); }, 500);
    });


    // delete one selled-product from temp data
    $('.btn-selled-products-create-delete-one-from-temp-data').on('click', function() {
        var selledProductTempDataId = $(this).parent().parent().find('.selled-product-temp-data-id').text();

        $.ajax({
            method: "GET",
            url: "/ajax-selled-products-create-delete-one-product-from-temp-data",
            data: {
                "selledProductTempDataId": selledProductTempDataId
            }
        });
        setTimeout(function() { location.reload(true); }, 250);
    });


    // delete all selled-products from temp data
    $('#btn-selled-products-create-delete-all-from-temp-data, #btn-cancel-create-selled-invoice, #btn-open-create-selled-products-invoice').on('click', function() {
        $.ajax({
            method: "GET",
            url: "/ajax-selled-products-create-delete-all-product-from-temp-data"
        });
        setTimeout(function() { location.reload(true); }, 250);
    });


    // validate create selled product invoice if product rows number is 0
    $('#btn-save-selled-invoice-and-remove-products-from-deliveries').on('click', function(e) {
        var productRowsCount = $('#tbody-selled-products-temp-data > tr').length;

        if(productRowsCount === 0) {
            alert('Трябва да добавите поне един продукт.');
            e.preventDefault();
            return false;
        }
    });

// ----------------------------- Selled Products Create -> End -----------------------------------------------


});
