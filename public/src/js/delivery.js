$(document).ready(function () {

    $('#grid-table-deliveries')
        .on('init.dt', function () {
            $('#grid-table-deliveries').show();
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
                    "orderable": false, targets: [6],
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


    function datepicker() {
        $('.datepicker-input-dafault').datepicker({
            language: 'bg',
            format: 'yyyy-mm-dd',
            calendarWeeks: true,
            autoclose: true,
            todayBtn: 'linked',
            todayHighlight: true,
            weekStart: 1
        })
    }

    datepicker();


    function deliveryNewRow() {
        addNewRow();
        ajaxGetProducts();
        moveFocusToNewRow();
        datepicker();
        autoChoseProductItemUnit();

        return false;
    }

    deliveryNewRow();


    $('.btn-add-row').on('click', function () {
        addNewRow();
        moveFocusToNewRow();
        ajaxGetProducts();
        datepicker();
        autoChoseProductItemUnit();
    });

    $('#table-form-create-devivery').delegate('.btn-delete-row', 'click', function () {
        $(this).parent().parent().remove();
        total();
    });



    // ajax - create delivery - get products
    function ajaxGetProducts() {
        $.get('/ajax-get-product-items', function (data) {
            // products data
            $('.product-id:last, #show-delivery-add-new-product-id:last').empty();
            $.each(data.products, function (index, products) {
                $('.product-id:last, #show-delivery-add-new-product-id:last').prepend('<option value="' + products.id + '">' + products.name + '</option>');
            });
            $('.product-id:last, #show-delivery-add-new-product-id:last').prepend('<option value="" disabled selected>Изберете продукт</option>');
        });

        return false;
    }



//  ------------------------------------------------- Show delivery - Start ------------------------------------------------------------------


    // total delivery price
    function total() {
        var total = 0;
        $('.product-total-price').each(function(i, e) {
            var productTotalPrice =  $(this).val() ? $(this).val()-0 : $(this).text()-0;
            total += productTotalPrice;
        });
        $('#total-delivery-price-no-dds').text(total.toFixed(5));
        $('#total-delivery-price-with-dds').text((total * 1.2).toFixed(5));
    }

    total();

    // total one product price - for create
    $('.tbody-create-delivery').delegate('.product-quantity, .product-unit-price', 'click keyup mouseup', function() {
        var tr = $(this).parent().parent();
        var productQuantity = tr.find('.product-quantity').val()*1;
        var productUnitPrice = tr.find('.product-unit-price').val()*1;
        var productTotalPrice = productQuantity * productUnitPrice;
        tr.find('.product-total-price').val(productTotalPrice.toFixed(5));
        total();
    });

    // total one product price - for show - add new product
    $('.tbody-show-delivery-add-new-product').delegate('#show-delivery-add-new-product-quantity, #show-delivery-add-new-product-unit-price', 'click keyup mouseup', function() {
        var tr = $(this).parent().parent();
        var productQuantity = tr.find('#show-delivery-add-new-product-quantity').val()*1;
        var productUnitPrice = tr.find('#show-delivery-add-new-product-unit-price').val()*1;
        var productTotalPrice = productQuantity * productUnitPrice;
        tr.find('#show-delivery-add-new-product-total-price').val(productTotalPrice.toFixed(5));
        total();
    });

    // total one product price - for show - inline edit product
    $('.tbody-show-delivery-inline-edit-product').delegate('.new-product-quantity, .new-product-unit-price', 'click keyup mouseup', function() {
        var tr = $(this).parent().parent().parent();
        var newProductQuantity = tr.find('.new-product-quantity').val()*1;
        var newProductUnitPrice = tr.find('.new-product-unit-price').val()*1;
        var newProductTotalPrice = newProductQuantity * newProductUnitPrice;
        tr.find('.new-product-total-price').val(newProductTotalPrice.toFixed(5));
    });


    // show delivery - add new product
    var deliveryId, productId, productUnitId, productQuantity, productUnitPrice, productExpiryDate, productBatchNumber, productStorageConditions, productNote = '';
    $('#btn-show-form-for-add-new-product-to-delivery-show').on('click', function() {
        $(this).hide();
        $('#form-for-add-new-product-to-delivery-show').show();
    })

    $('#btn-cancel-add-new-product-to-this-delivery-show').on('click', function() {
        location.reload();
    });

    // ajqx - add new product to this delivery - show
    $('#btn-add-new-product-to-this-delivery-show').on('click', function() {
        deliveryId = $('#delivery-id').val();
        productId = $('#show-delivery-add-new-product-id').val();
        productUnitId = $('#show-delivery-add-new-product-unit-id').val();
        productQuantity = $('#show-delivery-add-new-product-quantity').val();
        productUnitPrice = $('#show-delivery-add-new-product-unit-price').val();
        productExpiryDate = $('#show-delivery-add-new-product-expiry-date').val();
        productBatchNumber = $('#show-delivery-add-new-product-batch-number').val();
        productStorageConditions = $('#show-delivery-add-new-product-storage-conditions').val();
        productNote = $('#show-delivery-add-new-product-note').val();

        if (deliveryId !== '' && productId !== '' && productUnitId !== '' && productQuantity !== '' && productUnitPrice !== '' && productBatchNumber) {
            $.ajax({
                method: "GET",
                url: "/ajax-delivery-show-add-new-product",
                data: {
                    "delivery-id": deliveryId,
                    "product-id": productId,
                    "product-unit-id": productUnitId,
                    "product-quantity": productQuantity,
                    "product-unit-price": productUnitPrice,
                    "product-expiry-date": productExpiryDate,
                    "product-batch-number": productBatchNumber,
                    "product-storage-conditions": productStorageConditions,
                    "product-note": productNote,
                    "action": "add-new-product-to-show-delivery"
                }
            });

            setTimeout(function () {
                location.reload(true);
            }, 250);
        } else {
            alert('Не сте попълнили задължителните полетата.')
        }
    });


    // delivery show -add new product - get last used product_unit_price and product_storage_conditions in deliveries
    $('#show-delivery-add-new-product-id').on('change', function(){
        var productId = $(this).val();

        $.ajax({
            method: 'GET',
            url: '/ajax-delivery-create-get-product-price',
            data: {
                'productId': productId
            },
            success: function(resData) {
                $('#show-delivery-add-new-product-unit-price').val('');
                $('#show-delivery-add-new-product-storage-conditions').val('');
                $('#show-delivery-add-new-product-unit-price').val(resData.lastDeliveryProductData.product_unit_price);
                $('#show-delivery-add-new-product-storage-conditions').val(resData.lastDeliveryProductData.product_storage_conditions);
            }
        });
    });


    // ====================================== Inline edit delivery product in Show - Start ===========================================

    var deliveryEditActiveRowCount = 0;
    var editedDeliveryRow = null;

    $('.btn-edit-mode-show').on('click', function() {
        deliveryEditActiveRowCount ++;
        if(deliveryEditActiveRowCount <= 1)
        {
            var btnEditAcive = $(this).prop('active');
            editedDeliveryRow = $(this).parent().parent();
            var editModeIsActive = editedDeliveryRow.find('.btn-edit-mode-save').css('display');

            if (editModeIsActive === 'none') {
                editedDeliveryRow.find('.normal-mode').css('display', 'none');
                editedDeliveryRow.find('.edit-mode').css('display', 'inline-block');
            } else {
                editedDeliveryRow.find('.normal-mode').css('display', 'inline-block');
                editedDeliveryRow.find('.edit-mode').css('display', 'none');
            }
        }
    });

    $('.btn-edit-mode-cancel').on('click', function() {
        editedDeliveryRow.find('.normal-mode').css('display', 'inline-block');
        editedDeliveryRow.find('.edit-mode').css('display', 'none');
        deliveryEditActiveRowCount = 0;
    });

    $('.btn-edit-mode-save').on('click', function() {
        var editedDeliveryRow = $(this).parent().parent();
        var editedId = editedDeliveryRow.find('.id').text();
        var editedProductId = editedDeliveryRow.find('.id-on-product').text();
        var editedProductOldQuantity = editedDeliveryRow.find('.old-product-quantity').text();
        var editedProductNewQuantity = editedDeliveryRow.find('.new-product-quantity').val();
        var editedProductOldUnitPrice = editedDeliveryRow.find('.old-product-unit-price').text();
        var editedProductNewUnitPrice = editedDeliveryRow.find('.new-product-unit-price').val();
        var editedProductExpiryDate = editedDeliveryRow.find('.product-expiry-date').val();
        var editedProductBatchNumber = editedDeliveryRow.find('.product-batch-number').val();
        var editedProductStorageConditions = editedDeliveryRow.find('.product-storage-conditions').val();
        var editedProductNote = editedDeliveryRow.find('.product-note').val();

        // validation required - (do not empty)
        if(editedProductNewQuantity !== '' && editedProductNewUnitPrice !== '' && editedProductBatchNumber !== '') {
            $.ajax({
                method: "GET",
                url: "/ajax-delivery-show-inline-edit-product",
                data: {
                    "editedId": editedId,
                    "editedProductId": editedProductId,
                    "editedProductOldQuantity": editedProductOldQuantity,
                    "editedProductNewQuantity": editedProductNewQuantity,
                    "editedProductOldUnitPrice": editedProductOldUnitPrice,
                    "editedProductNewUnitPrice": editedProductNewUnitPrice,
                    "editedProductExpiryDate": editedProductExpiryDate,
                    "editedProductBatchNumber": editedProductBatchNumber,
                    "editedProductStorageConditions": editedProductStorageConditions,
                    "editedProductNote": editedProductNote,
                    "action": "edit-product-in-show-delivery"
                }
            });

            setTimeout(function() { location.reload(true); }, 500);

            editedDeliveryRow.find('.normal-mode').css('display', 'inline-block');
            editedDeliveryRow.find('.edit-mode').css('display', 'none');
            deliveryEditActiveRowCount = 0;
            editedDeliveryRow.find('td').addClass('bg-danger');

        } else {
            alert('Не сте попълнили задължителните полетата.')
        }
    });

    // ======================================= Inline edit delivery product in Show - End ==========================================


    // ========================================= Delete delivery product in Show - Start ============================================

    $('.btn-delete-delivery-product').on('click', function() {
        var id = $(this).find('.delivery-product-id').text();

        var confirmDeleteDialog = confirm("Наистина ли желаете да изтриете този запис?");
        if (confirmDeleteDialog) {
            // return true;
            $.ajax({
                method: "GET",
                url: "/ajax-delivery-show-delete-product",
                data: {
                    "id": id,
                    "action": "delete-product-in-show-delivery"
                }
            });

            setTimeout(function() { location.reload(true); }, 500);
        } else {
            return false;
        }
    });

    // ========================================== Delete delivery product in Show - End =============================================


//  -------------------------------------------------- Show delivery - End ------------------------------------------------------------



    function addNewRow() {
        var tr = '<tr>' +
            '<td>' +
                '<select class="product-id form-control form-control-sm" name="product_id[]" required>' +
                '</select>' +
            '</td>' +
            '<td>' +
                '<input class="unit-id" type="hidden" name="product_unit_id[]" />' +
                '<span class="unit-name"></span>' +
            '</td>' +
            '<td>' +
                '<input class="product-quantity form-control form-control-sm" type="text" name="product_quantity[]" autocomplete="off" required />' +
            '</td>' +
            '<td>' +
                '<input class="product-unit-price form-control form-control-sm" type="text" name="product_unit_price[]" autocomplete="off" required />' +
            '</td>' +
            '<td>' +
                '<input class="product-total-price form-control form-control-sm" type="text" disabled />' +
            '</td>' +
            '<td>' +
                '<div class="input-group">' +
                    '<div class="datepicker-input-dafault input-group input-group-sm date" id="datepicker">' +
                        '<input class="form-control form-control-sm" type="text" name="product_expiry_date[]" autocomplete="off" />' +
                        '<div class="input-group-append">' +
                            '<span class="input-group-text">' +
                                '<i class="fas fa-calendar-alt"></i>' +
                            '</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</td>' +
            '<td>' +
                '<input class="form-control form-control-sm" type="text" name="product_batch_number[]" autocomplete="off" required />' +
            '</td>' +
            '<td>' +
                '<input class="product_storage_conditions form-control form-control-sm" type="text" name="product_storage_conditions[]" autocomplete="off" />' +
            '</td>' +
            '<td>' +
                '<input class="row-end-input form-control form-control-sm" type="text" name="product_note[]" autocomplete="off" />' +
            '</td>' +
            '<td class="text-center">' +
                '<a class="btn-delete-row btn btn-sm btn-danger" title="Изтрий продукта"><i class="fas fa-minus"></i></a>' +
            '</td>' +
        '</tr>';

        $('#table-form-create-devivery tbody').append(tr);

        // input number validation
        $('.new-product-quantity, .new-product-unit-price, .product-unit-price, .product-quantity, #show-delivery-add-new-product-unit-price, #show-delivery-add-new-product-quantity').on('keydown', function (e) {
            // Change coma "," with punct "." in inputs
            if (e.keyCode === 188 || e.keyCode === 108) {
                this.value += '.';
                e.preventDefault();
            }
        }).numeric({ negative: false });

        return false;
    }


    function moveFocusToNewRow() {
        $(".row-end-input:last").on("keydown", function (e) {
            var code = e.keyCode || e.which;

            if (code == 9) {
                deliveryNewRow();
                $('.product-id:last').focus();
                return false;
            }
        });

        return false;
    }


    function autoChoseProductItemUnit() {
        $('.product-id, #show-delivery-add-new-product-id').on('change', function () {
            var selectedProductId = this.value;
            var tr = $(this).parent().parent();

            $.get('/ajax-product-items-get-units?product-id=' + selectedProductId, function (data) {
                $.each(data, function () {
                    tr.find('.unit-id, #show-delivery-add-new-product-unit-id').val(data.unit_id);
                    tr.find('.unit-name').text(data.unit_name);
                });
            });
        });
    }


    // create delivery - is exist delivery
    $('#delivery-is-exist').on('click', function() {
        var deliveryProviderId = $('#delivery-provider-id').val();
        var deliveryDocumentNumber = $('#delivery-document-number').val();

        $.ajax({
            method: "GET",
            url: "/ajax-delivery-create-is-exist-delivery",
            data: {
                "deliveryProviderId": deliveryProviderId,
                "deliveryDocumentNumber": deliveryDocumentNumber
            },
            success: function (status) {
                // get message from php
                if (status === 0) {
                    $('#error-delivery-is-exists').css('display', 'block');
                    $('#no-error-delivery-is-exists').css('display', 'none');
                } else {
                    $('#error-delivery-is-exists').css('display', 'none');
                    $('#no-error-delivery-is-exists').css('display', 'block');
                }
            }
        });
    });


    // create delivery - get last used car number for provider
    $('#delivery-provider-id, .delivery-provider').on('change', function() {
        var providerId = $(this).val();

        $.ajax({
            method: 'GET',
            url: '/ajax-delivery-create-get-provider-car-number',
            data: {
                'providerId': providerId
            },
            success: function(resData) {
                $('#delivery-vehicle-registration-number, .delivery-vehicle-registration-number').val(resData.vehicleRegistrationNumber);
            }
        });
    });


    // create delivery - get last used product_unit_price and product_storage_conditions in deliveries
    $('#table-form-create-devivery').on('change', '.product-id', function(){
        var productId = $(this).val();
        var thisRow = $(this).parent().parent();

        $.ajax({
            method: 'GET',
            url: '/ajax-delivery-create-get-product-price',
            data: {
                'productId': productId
            },
            success: function(resData) {
                thisRow.find('.product-unit-price').val('');
                thisRow.find('.product_storage_conditions').val('');
                thisRow.find('.product-unit-price').val(resData.lastDeliveryProductData.product_unit_price);
                thisRow.find('.product_storage_conditions').val(resData.lastDeliveryProductData.product_storage_conditions);
            }
        });
    });



    // Inline edit header on delivery - (date, provider and vehicle-registration-number)
    $('.btn-edit-mode-header-show').on('click', function() {
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
        var deliveryId = $('#delivery-id').val();
        var newDeliveryDate = $('.delivery-date').val();
        var newDeliveryProvider = $('.delivery-provider').val();
        var newDeliveryVehicleRegistrationNumber = $('.delivery-vehicle-registration-number').val();

        // validation required - (do not empty)
        if(deliveryId !== '' && newDeliveryDate !== '' && newDeliveryProvider !== '' && newDeliveryVehicleRegistrationNumber !== '') {
            $.ajax({
                method: "GET",
                url: "/ajax-delivery-show-inline-edit-headers",
                data: {
                    "deliveryId": deliveryId,
                    "newDeliveryDate": newDeliveryDate,
                    "newDeliveryProvider": newDeliveryProvider,
                    "newDeliveryVehicleRegistrationNumber": newDeliveryVehicleRegistrationNumber
                }
            });

            setTimeout(function() { location.reload(true); }, 500);
        }
    });

});
