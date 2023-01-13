$(document).ready(function () {

    // ============================================ Add New Product -> Start =============================================================

    // Open hiden form
    $('#btn-show-form-for-add-new-product-to-selled-products-show').on('click', function() {
        $(this).hide();
        $('#form-for-add-new-product-to-selled-products-show').show();
    });

    // Hide form - refresh page
    $('#btn-show-form-for-add-new-product-to-selled-products-hide').on('click',function() {
        location.reload(true);
    });


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
        $('#selledProductsShowAddNewProductModal').modal('show');

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

                $('#selledProductsShowAddNewProductModal .modal-title').text(productsData[0]['product_name'])

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
        $('#selledProductsShowAddNewProductModal').delegate('.modal-product-quantity', 'keyup keydown keypress', function() {
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
        if($('#btn-save-selled-products-invoice-to-db')) {
            var errorRedRows = 0;
            $('#tbody-modal-selled-products-add-product > tr').find('.check-error-product-remaining-quantity').each(function (index) {
                var checkErrorValue = $(this).text();
                if(checkErrorValue === '1') {
                    errorRedRows = 1;
                    return false;
                }
            });
            if(errorRedRows === 1) {
                $('#btn-save-selled-products-invoice-to-db').attr('disabled', true);
            } else {
                $('#btn-save-selled-products-invoice-to-db').attr('disabled', false);
            }
        }
    }
    autoCheckError();


    // Save to db
    $('#btn-save-selled-products-invoice-to-db').on('click', function() {

        var selledProductInvoiceId = $('#selled-product-invoice-id').text();
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
            url: "/ajax-selled-products-show-add-new-product",
            data: {
                "selledProductInvoiceId": selledProductInvoiceId,
                "modalDeliveryProductIdArr": modalDeliveryProductIdArr,
                "modalProductIdArr": modalProductIdArr,
                "modalProductBatchNumberArr": modalProductBatchNumberArr,
                "modalProductQuantityArr": modalProductQuantityArr
            }
        });

        setTimeout(function() { location.reload(true); }, 500);
    });

    // ============================================== Add New Product -> End ==========================================================



    // ====================================== Inline edit selled-products product -> Start ===========================================

    var selledProductsEditActiveRowCount = 0;
    var editedSelledProductsRow = null;

    $('.btn-edit-mode-show').on('click', function() {
        selledProductsEditActiveRowCount ++;
        if(selledProductsEditActiveRowCount <= 1)
        {
            var btnEditAcive = $(this).prop('active');
            editedSelledProductsRow = $(this).parent().parent();
            var editModeIsActive = editedSelledProductsRow.find('.btn-edit-mode-save').css('display');

            if (editModeIsActive === 'none') {
                editedSelledProductsRow.find('.normal-mode').css('display', 'none');
                editedSelledProductsRow.find('.edit-mode').css('display', 'inline-block');
            } else {
                editedSelledProductsRow.find('.normal-mode').css('display', 'inline-block');
                editedSelledProductsRow.find('.edit-mode').css('display', 'none');
            }
        }
    });

    $('.btn-edit-mode-cancel').on('click', function() {
        editedSelledProductsRow.find('.normal-mode').css('display', 'inline-block');
        editedSelledProductsRow.find('.edit-mode').css('display', 'none');
        selledProductsEditActiveRowCount = 0;
    });

    $('.btn-edit-mode-save').on('click', function() {
        var editedSelledProductsRow = $(this).parent().parent();
        var editedId = editedSelledProductsRow.find('.id').text();
        var editedDeliveryProductId = editedSelledProductsRow.find('.id-on-delivery-product').text();
        var editedProductId = editedSelledProductsRow.find('.id-on-product').text();
        var editedProductOldQuantity = editedSelledProductsRow.find('.old-product-quantity').text();
        var editedProductNewQuantity = editedSelledProductsRow.find('.new-product-quantity').val();

        // validation required - (do not empty)
        if(editedProductNewQuantity !== '') {
            $.ajax({
                method: "GET",
                url: "/ajax-selled-products-show-inline-edit-product",
                data: {
                    "editedId": editedId,
                    "editedDeliveryProductId": editedDeliveryProductId,
                    "editedProductId": editedProductId,
                    "editedProductOldQuantity": editedProductOldQuantity,
                    "editedProductNewQuantity": editedProductNewQuantity
                },
                success: function(resData) {
                    if(resData.message) {
                        alert (resData.message);
                    }
                }
            });

            setTimeout(function() { location.reload(true); }, 500);

            editedSelledProductsRow.find('.normal-mode').css('display', 'inline-block');
            editedSelledProductsRow.find('.edit-mode').css('display', 'none');
            selledProductsEditActiveRowCount = 0;
            editedSelledProductsRow.find('td').addClass('bg-danger');

        } else {
            alert('Не сте попълнили задължителните полетата.')
        }
    });

    // =========================================== Inline edit selled-products product -> End ========================================================



    // ============================================= Delete selled-products product  - Start =========================================================

    $('.btn-delete-selled-product-product').on('click', function() {
        var deletedSelledProductsRow = $(this).parent().parent();
        var deletedId = deletedSelledProductsRow.find('.id').text();
        var deletedDeliveryProductId = deletedSelledProductsRow.find('.id-on-delivery-product').text();
        var deletedProductId = deletedSelledProductsRow.find('.id-on-product').text();
        var deletedProductQuantity = deletedSelledProductsRow.find('.old-product-quantity').text();

        var confirmDeleteDialog = confirm("Наистина ли желаете да изтриете този запис?");
        if (confirmDeleteDialog) {
            // return true;
            $.ajax({
                method: "GET",
                url: "/ajax-selled-products-show-delete-product",
                data: {
                    "deletedId": deletedId,
                    "deletedDeliveryProductId": deletedDeliveryProductId,
                    "deletedProductId": deletedProductId,
                    "deletedProductQuantity": deletedProductQuantity
                }
            });

            setTimeout(function() { location.reload(true); }, 500);
        } else {
            return false;
        }
    });

    // ============================================== Delete selled-products product - End =======================================================



    // Inline edit header on selled Products - (date and customer)

    $('.btn-edit-mode-header-show').on('click', function() {
        // var btnEditAcive = $(this).prop('active');
        var editModeIsActive = $('.btn-edit-mode-header-save').css('display');

        if (editModeIsActive === 'none') {
            $('.normal-mode-header').css('display', 'none');
            $('.edit-mode-header').css('display', 'inline-block');
        } else {
            $('.normal-mode-header').css('display', 'inline-block');
            $('.edit-mode-header').css('display', 'none');
        }
    });

    $('.btn-edit-mode-header-cancel').on('click', function() {
        $('.normal-mode-header').css('display', 'inline-block');
        $('.edit-mode-header').css('display', 'none');
    });

    $('.btn-edit-mode-header-save').on('click', function() {
        var selledProductsInvoiceId = $('#selled-product-invoice-id').text();
        var newSelledProductsInvoiceDate = $('.selled-products-invoice-date').val();
        var newSelledProductsInvoiceCustomer = $('.selled-products-invoice-customer').val();

        // validation required - (do not empty)
        if(selledProductsInvoiceId !== '' || newSelledProductsInvoiceDate !== '' || newSelledProductsInvoiceCustomer !== '') {
            $.ajax({
                method: "GET",
                url: "/ajax-selled-products-show-inline-edit-headers",
                data: {
                    "selledProductsInvoiceId": selledProductsInvoiceId,
                    "newSelledProductsInvoiceDate": newSelledProductsInvoiceDate,
                    "newSelledProductsInvoiceCustomer": newSelledProductsInvoiceCustomer
                }
            });

            setTimeout(function() { location.reload(true); }, 500);
        }
    });

});
