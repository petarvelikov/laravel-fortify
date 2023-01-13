$(document).ready(function () {

    $('#grid-table-recipes')
        .on('init.dt', function () {
            $('#grid-table-recipes').show();
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
                    "orderable": false, targets: [4, 5],
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


    function recipeNewRow() {
        addNewRow();
        ajaxGetProducts();
        moveFocusToNewRow();
        autoChoseProductItemUnit();

        return false;
    }

    recipeNewRow();


    $('.btn-add-row').on('click', function () {
        addNewRow();
        moveFocusToNewRow();
        ajaxGetProducts();
        autoChoseProductItemUnit();
    });

    $('#table-form-create-recipe').delegate('.btn-delete-row', 'click', function () {
        $(this).parent().parent().remove();
    });


    // ajax - create recipe - get products
    function ajaxGetProducts() {
        $.get('/ajax-get-product-items', function (data) {
            // products data
            $('.product-id:last').empty();
            $.each(data.products, function (index, products) {
                $('.product-id:last').prepend('<option value="' + products.id + '">' + products.name + '</option>');
            });
            $('.product-id:last').prepend('<option value="" disabled selected>Изберете продукт</option>');
        });

        return false;
    }


    function addNewRow() {
        var tr = '<tr>' +
            '<td>' +
                '<select class="product-id form-control form-control-sm" name="product_id[]" required>' +
                '</select>' +
            '</td>' +
            '<td>' +
                '<input class="product-quantity row-end-input form-control form-control-sm" type="text" name="product_quantity[]" autocomplete="off" required />' +
            '</td>' +
            '<td>' +
                '<span class="unit-name"></span>' +
            '</td>' +
            '<td class="text-center">' +
                '<a class="btn-delete-row btn btn-sm btn-danger" title="Изтрий продукта"><i class="fas fa-minus"></i></a>' +
            '</td>' +
        '</tr>';

        $('#table-form-create-recipe tbody').append(tr);

        $('.product-quantity').on('keydown', function (e) {
            // Change coma "," with punct "." in inputs
            if (e.keyCode === 188 || e.keyCode === 108 || e.keyCode === 110) {
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
                recipeNewRow();
                $('.product-id:last').focus();
                return false;
            }
        });

        return false;
    }


    function autoChoseProductItemUnit() {
        $('.product-id').on('change', function () {
            var selectedProductId = this.value;
            var tr = $(this).parent().parent();

            $.get('/ajax-product-items-get-units?product-id=' + selectedProductId, function (data) {
                $.each(data, function () {
                    tr.find('.unit-id').val(data.unit_id);
                    tr.find('.unit-name').text(data.unit_name);
                });
            });
        });
    }


    // Safe selectBox values on filtering $recipes
    $('#btn-filter-recipes').on('click', function() {
        var filteredRecipeGoup = $('#recipe-filter-recipe-group').val();
        var filteredRecipeObject = $('#recipe-filter-recipe-object').val();

        localStorage.setItem('filtered-recipe-group', filteredRecipeGoup);
        localStorage.setItem('filtered-recipe-object', filteredRecipeObject);
    });

    if(localStorage.getItem('filtered-recipe-group') === null) {
        $('#recipe-filter-recipe-group').val('');
    } else {
        $('#recipe-filter-recipe-group').val(localStorage.getItem('filtered-recipe-group'));
    }
    if(localStorage.getItem('filtered-recipe-object') === null) {
        $('#recipe-filter-recipe-object').val('');
    } else {
        $('#recipe-filter-recipe-object').val(localStorage.getItem('filtered-recipe-object'));
    }

    localStorage.removeItem('filtered-recipe-group');
    localStorage.removeItem('filtered-recipe-object');


// ------------------------------------ Edit recipe --------------------------------------------

    // Change unit on modal
    $('#add-new-product').on('change', function () {
        var productId = $('#add-new-product').val();

        $.get('/ajax-product-items-get-units?product-id=' + productId, function (data) {
            $('.product-unit').html(data.unit_name);
        });
    });

    // Ajax - add new row (edit recipe)
    $('#btn-add-new-product-to-edit-recipe-save').on('click', function () {
        var recipeId = location.pathname.split('/')[2];
        var productId = $('#add-new-product').val();
        var productQuantity = ($('#add-new-quantity').val()) / 10;

        decimalInputValidator();

        $.ajax({
            method: "GET",
            url: "/ajaxt-edit-recipe",
            data: {
                "recipe-id": recipeId,
                "product-id": productId,
                "product-quantity": productQuantity,
                "action": "add-new-product-to-edit-recipe"
            }
        });

        setTimeout(function () {
            location.reload(true);
        }, 250);
    });

    function decimalInputValidator () {
        $('.product-quantity-edit-recipe').on('keydown', function (e) {
            // Change coma "," with punct "." in inputs
            if (e.keyCode === 188 || e.keyCode === 108) {
                this.value += '.';
                e.preventDefault();
            }
        }).numeric({ negative: false });
    }
    decimalInputValidator();

    // Ajax - delete row (edit recipe)
    $('#table-form-edit-recipe').delegate('.btn-delete-product-to-edit-recipe', 'click', function () {
        var productIdForDelete = $(this).parent().parent().find($('.id')).val();

        $.ajax({
            method: "GET",
            url: "/ajaxt-edit-recipe",
            data: {
                "product-id": productIdForDelete,
                "action": "delete-product-to-edit-recipe"
            }
        })

        setTimeout(function () {
            location.reload(true);
        }, 250);
    });



// ------------------------------------ Show recipe --------------------------------------------

    // Calc Recipe show - Total Price
    var recipeTotalPrice = 0;
    $('.recipe-product-total-price').each(function (i, e) {
        var itemTotalPrice = $(this).html() * 1;
        recipeTotalPrice += itemTotalPrice;
    });

    $('#recipe-total-price-10').html(recipeTotalPrice.toFixed(3) + ' лв.');
    $('#recipe-total-price-1').html((recipeTotalPrice / 10).toFixed(3) + ' лв.');



    // Printing
    $('#print-btn').click(function () {
        $('#print-page').print({
            // rejectWindow: false,
            noPrintSelector: ".no-print"
        });
    });

});
