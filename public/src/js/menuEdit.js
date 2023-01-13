$(document).ready(function () {


    // Menu table
    var customerCount = $('#customer-count').text();
    var numRowArr = [];
    var numRowFirstLetterArr = [];

    $('#menu-meals-table > tbody > tr').find('td.num-row').each(function (index) {
        numRowArr.push($(this).text());
        numRowFirstLetterArr.push($(this).text()[0]);
    });

    var menuType1StartTableRowIndex = (numRowFirstLetterArr.indexOf('1') !== -1) ? numRowFirstLetterArr.indexOf('1') : null;
    var menuType2StartTableRowIndex = (numRowFirstLetterArr.indexOf('2') !== -1) ? numRowFirstLetterArr.indexOf('2') : null;
    var menuType3StartTableRowIndex = (numRowFirstLetterArr.indexOf('3') !== -1) ? numRowFirstLetterArr.indexOf('3') : null;
    var menuType4StartTableRowIndex = (numRowFirstLetterArr.indexOf('4') !== -1) ? numRowFirstLetterArr.indexOf('4') : null;
    var menuType5StartTableRowIndex = (numRowFirstLetterArr.indexOf('5') !== -1) ? numRowFirstLetterArr.indexOf('5') : null;

    var menuType1StartTableRowForMeals = $('#menu-meals-table > tbody > tr').find('td.num-row').parent().eq(menuType1StartTableRowIndex);
    var menuType2StartTableRowForMeals = $('#menu-meals-table > tbody > tr').find('td.num-row').parent().eq(menuType2StartTableRowIndex);
    var menuType3StartTableRowForMeals = $('#menu-meals-table > tbody > tr').find('td.num-row').parent().eq(menuType3StartTableRowIndex);
    var menuType4StartTableRowForMeals = $('#menu-meals-table > tbody > tr').find('td.num-row').parent().eq(menuType4StartTableRowIndex);
    var menuType5StartTableRowForMeals = $('#menu-meals-table > tbody > tr').find('td.num-row').parent().eq(menuType5StartTableRowIndex);

    if(menuType1StartTableRowIndex !== null) {
        if(menuType2StartTableRowIndex) menuType2StartTableRowIndex++
        if(menuType3StartTableRowIndex) menuType3StartTableRowIndex++
        if(menuType4StartTableRowIndex) menuType4StartTableRowIndex++
        if(menuType5StartTableRowIndex) menuType5StartTableRowIndex++
        menuType1StartTableRowForMeals.before('<tr><th style="padding-left: 5px;">Закуска</th></tr>');
        $('#menu-customers-and-quantity-table > tbody > tr').eq(menuType1StartTableRowIndex).before('<tr><td colspan="' + customerCount+1 +'" style="border-left: none; height: 23px; color: rgba(255, 255, 255, 0);">1</td></tr>');
    }
    if(menuType2StartTableRowIndex !== null) {
        if(menuType3StartTableRowIndex) menuType3StartTableRowIndex++
        if(menuType4StartTableRowIndex) menuType4StartTableRowIndex++
        if(menuType5StartTableRowIndex) menuType5StartTableRowIndex++
        menuType2StartTableRowForMeals.before('<tr><th style="padding-left: 5px;">Подкрепителна закуска</th></tr>');
        $('#menu-customers-and-quantity-table > tbody > tr').eq(menuType2StartTableRowIndex).before('<tr><td colspan="' + customerCount+1 +'" style="border-left: none; height: 23px; color: rgba(255, 255, 255, 0);">2</td></tr>');
    }
    if(menuType3StartTableRowIndex !== null) {
        if(menuType4StartTableRowIndex) menuType4StartTableRowIndex++
        if(menuType5StartTableRowIndex) menuType5StartTableRowIndex++
        menuType3StartTableRowForMeals.before('<tr><th style="padding-left: 5px;">Обяд</th></tr>');
        $('#menu-customers-and-quantity-table > tbody > tr').eq(menuType3StartTableRowIndex).before('<tr><td colspan="' + customerCount+1 +'" style="border-left: none; height: 23px; color: rgba(255, 255, 255, 0);">3</td></tr>');
    }
    if(menuType4StartTableRowIndex !== null) {
        if(menuType5StartTableRowIndex) menuType5StartTableRowIndex++
        menuType4StartTableRowForMeals.before('<tr><th style="padding-left: 5px;">Следобедна закуска</th></tr>');
        $('#menu-customers-and-quantity-table > tbody > tr').eq(menuType4StartTableRowIndex).before('<tr><td colspan="' + customerCount+1 +'" style="border-left: none; height: 23px; color: rgba(255, 255, 255, 0);">4</td></tr>');
    }
    if(menuType5StartTableRowIndex !== null) {
        menuType5StartTableRowForMeals.before('<tr><th style="padding-left: 5px;">Вечеря</th></tr>');
        $('#menu-customers-and-quantity-table > tbody > tr').eq(menuType5StartTableRowIndex).before('<tr><td colspan="' + customerCount+1 +'" style="border-left: none; height: 23px; color: rgba(255, 255, 255, 0);">5</td></tr>');
    }



    // Auto calc total meal quantity on menu show
    function autoCalcTotalRowQuantityEditMenu() {
        $('#menu-customers-and-quantity-table tr').each(function () {
            var sumMealsEditMenu = 0

            $(this).find('.quantity-for-meal > .input-quantity-for-meal').each(function () {
                var combat2 = $(this).val();
                if (!isNaN(combat2) && combat2.length !== 0) {
                    sumMealsEditMenu += parseFloat(combat2);
                }
            });
            $('.total-quantity-for-meal', this).html(sumMealsEditMenu);
        });
    }
    autoCalcTotalRowQuantityEditMenu();

    $('.input-quantity-for-meal').on('keyup', function() {
        autoCalcTotalRowQuantityEditMenu();
    });



    // num numRow validation
    var menuNumRowArr = [], menuNumRowType1Arr = [], menuNumRowType2Arr = [], menuNumRowType3Arr = [], menuNumRowType4Arr = [], menuNumRowType5Arr = [];
    $('#menu-meals-table .num-row').each(function() {
        menuNumRowArr.push($(this).html());
    });
    for(var i = 0; i < menuNumRowArr.length; i++) {
        if(menuNumRowArr[i].charAt(0) === '1') menuNumRowType1Arr.push(menuNumRowArr[i] * 1);
        if(menuNumRowArr[i].charAt(0) === '2') menuNumRowType2Arr.push(menuNumRowArr[i] * 1);
        if(menuNumRowArr[i].charAt(0) === '3') menuNumRowType3Arr.push(menuNumRowArr[i] * 1);
        if(menuNumRowArr[i].charAt(0) === '4') menuNumRowType4Arr.push(menuNumRowArr[i] * 1);
        if(menuNumRowArr[i].charAt(0) === '5') menuNumRowType5Arr.push(menuNumRowArr[i] * 1);
    }
    $('#alert-message-menu').css('display', 'none');
    function isSorted(arr) {
        for (var i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i+1]) {
                  return false;
            }
        }
    }
    if((menuNumRowType1Arr) === false || isSorted(menuNumRowType2Arr) === false || isSorted(menuNumRowType3Arr) === false || isSorted(menuNumRowType4Arr) === false || isSorted(menuNumRowType5Arr) === false) {
        $("#btn-edit-menu").prop("disabled", true);
        $('#alert-message-menu').css('display', 'block');
    }



    // Add only numbers in inputs
    $('.input-quantity-for-meal, .modal-input-quantity-for-meal').on('keyup', function () {}).numeric({ decimal: false, negative: false });



    // Menu edit table delete recipe and quantity -> row
    $('.btn-menu-edit-delete-recipe-row').on('click', function() {

        var confirmDeleteDialog = confirm("Наистина ли желаете да изтриете този запис?");
        if (confirmDeleteDialog) {
            var row = $(this).parent().parent();
            var ids = [];
            var editedMenuId = $('#menu-id').val();

            $(row).find('.menu-recipe-row-id').each(function (index) {
                ids.push($(this).val()*1);
            });

            $.ajax({
                method: "POST",
                url: "/ajax-edit-menu-delete-recipe-row",
                data: {
                    "_token": $('meta[name="csrf-token"]').attr('content'),
                    "ids": ids,
                    "editedMenuId": editedMenuId,
                    "action": "edit-menu-delete-recipe-row"
                }
            });

            setTimeout(function () {
                location.reload(true);
            }, 250);
        } else {
            return false;
        }
    });



    // ------------------- MODAL DIALOG - add new recipe - START ------------------------

    var editedRecipeDate = $('#edited-menu-date').text();
    var menuId = $('#modal-menu-id').val()*1;
    var nextNumRow = null;
    var recipeId = null;
    var customerIdArr = [];
    var customerObjectsIdArr = [];
    var quantityArr = [];

    $('#modal-select-recipe-type').on('change', function() {

        var selectedText = $(this).find('option:selected').text();
        var selectedValue = $(this).val();

        nextNumRow = selectedValue.substring(1);

        switch (selectedText) {
        	case 'Закуска':
                if(!selectedValue) {
                    nextNumRow = 11;
                } else {
                    nextNumRow = '1' + (selectedValue.substring(1)*1 + 1);
                }
        		break;
        	case 'Подкрепителна закуска':
                if(!selectedValue) {
                    nextNumRow = 21;
                } else {
                    nextNumRow = '2' + (selectedValue.substring(1)*1 + 1);
                }
        		break;
        	case 'Обяд':
                if(!selectedValue) {
                    nextNumRow = 31;
                } else {
                    nextNumRow = '3' + (selectedValue.substring(1)*1 + 1);
                }
        		break;
        	case 'Следобедна закуска':
                if(!selectedValue) {
                    nextNumRow = 41;
                } else {
                    nextNumRow = '4' + (selectedValue.substring(1)*1 + 1);
                }
        		break;
            case 'Вечеря':
                if(!selectedValue) {
                    nextNumRow = 51;
                } else {
                    nextNumRow = '5' + (selectedValue.substring(1)*1 + 1);
                }
        		break;
        	default:
        }

        $('#modal-next-numrow').val(nextNumRow);
    });

    $('#modal-select-recipe').on('change', function() {
        recipeId = $(this).val();
    });


    // Auto calc total meal quantity on menu show
    function modalAutoCalcTotalRowQuantityEditMenu() {
        $('#modal-menu-customers-and-quantity-table tr').each(function () {
            var sumModalMealsEditMenu = 0

            $(this).find('.modal-quantity-for-meal > .modal-input-quantity-for-meal').each(function () {
                var res = $(this).val();
                if (!isNaN(res) && res.length !== 0) {
                    sumModalMealsEditMenu += parseFloat(res);
                }
            });
            $('.modal-total-quantity-for-meal', this).html(sumModalMealsEditMenu);
        });
    }
    modalAutoCalcTotalRowQuantityEditMenu();

    $('.modal-input-quantity-for-meal').on('keyup', function() {
        modalAutoCalcTotalRowQuantityEditMenu();
    });


    $('#modal-btn-save-data-with-ajax').on('click', function() {
        var addNewRecipeTotalQuantity = $('.modal-total-quantity-for-meal').text();
        if (recipeId && nextNumRow) {
            $('#modal-form').find('.modal-menu-customer-id').each(function (index) {
                customerIdArr.push($(this).val());
            });

            $('#modal-menu-customers-and-quantity-table').find('.modal-menu-customer-objects-id').each(function (index) {
                customerObjectsIdArr.push($(this).val());
            });

            $('#modal-menu-customers-and-quantity-table').find('.modal-input-quantity-for-meal').each(function (index) {
                if($(this).val()) {
                    quantityArr.push($(this).val());
                } else {
                    quantityArr.push(null);
                }
            });
        }

        if (editedRecipeDate && menuId && recipeId && nextNumRow && customerObjectsIdArr.length !== 0 && quantityArr.length !== 0) {
            // save menu data to db
            $.ajax({
                method: "POST",
                url: "/ajax-edit-menu-add-new-recipe-and-confirmed-recipe",
                data: {
                    "_token": $('meta[name="csrf-token"]').attr('content'),
                    "menuId": menuId,
                    "menuData": editedRecipeDate,
                    "recipeId": recipeId,
                    "nextNumRow": nextNumRow,
                    "customerIdArr": customerIdArr,
                    "customerObjectsIdArr": customerObjectsIdArr,
                    "quantityArr": quantityArr,
                    "recipeGroupId": menuConfirmRecipeDataRecipeGroupId,
                    "productIdArr": menuConfirmRecipeDataProductIdArr,
                    "productQuantityArr": menuConfirmRecipeDataProductQuantityArr,
                    "recipes_total_quantity": addNewRecipeTotalQuantity,
                    "action": "edit-menu-add-new-recipe-row-and-confirmed-recipe"
                }
            });

            // remove data from arrays
            menuConfirmRecipeDataProductIdArr.length = 0;
            menuConfirmRecipeDataProductQuantityArr.length = 0;

            setTimeout(function () {
                location.reload(true);
            }, 500);
        }
    });

    $("#modal-form").on('submit', function(event){
        event.preventDefault();
    });


    $('#modal-btn-cancel-save-data').on('click', function() {
        $('#modal-select-recipe-type').val("");
        $('#modal-select-recipe-group').val("");
        $('#modal-select-recipe-group').attr('disabled', false);
        $('#modal-select-recipe').val("");
        $('#modal-select-recipe').attr('disabled', false);
        $('.modal-input-quantity-for-meal').val('');

        nextNumRow = null;
        recipeId = null;
        customerIdArr.length = 0;
        customerObjectsIdArr.length = 0;
        quantityArr.length = 0;
        menuConfirmRecipeDataProductIdArr.length = 0;
        menuConfirmRecipeDataProductQuantityArr.length = 0;

        modalAutoCalcTotalRowQuantityEditMenu();
    });


    // Ajax edit menu - modal windows - add new recipe from recipe-group
    $('#modal-select-recipe-group').on('change', function () {
        var recipeGroupId = $(this).val();
        $.get('/ajax-reports-get-repipes-from-group?recipeGroupId=' + recipeGroupId, function (data) {
            if (recipeGroupId) {
                $('#modal-select-recipe').empty();
            }
            $.each(data, function(index, recipesObj) {
                $('#modal-select-recipe').append('<option value="'+recipesObj.id+'">'+recipesObj.title+'</option>').sortSelect();
            });
            $('#modal-select-recipe').prepend('<option value="" disabled selected>Рецепта</option>').prop('selectedIndex', 0);
        });
    });

// ---------------------------------------------------------------------------------

    // Generate modal table for confirm recipe
    var menuConfirmRecipeDataRecipenum, menuConfirmRecipeDataRecipeGroupId, menuConfirmRecipeDataRecipeId;

    $('#modal-select-recipe').on('change', function() {
        $('#menuEditConfirmRecipeModal').modal('show');

        menuConfirmRecipeDataRecipenum = $('#modal-next-numrow').val();
        menuConfirmRecipeDataRecipeGroupId = $(this).parent().parent().find('#modal-select-recipe-group').val();
        menuConfirmRecipeDataRecipeId = $(this).val();


        $.ajax({
            method: "GET",
            url: "/ajax-edit-menu-confirm-recipe",
            data: {
                "recipeId": menuConfirmRecipeDataRecipeId
            },
            success: function (data) {
                var tbody = $('#modal-table-edit-menu-confirm-recipe > tbody');
                tbody.empty()

                $('.modal-title').text(data.recipeData[0].recipe_title);

                var productStorehouseQuantity, compatibleProductId, compatibleProductName, compatibleProductQuantity, compatibleProductStorehouseQuantity, confirmRecipeTableRowCompatibleProductTableCell;

                for (var i = 0; i < data.recipeData.length; i++) {
                    productStorehouseQuantity = data.recipeData[i].product_storehouse_quantity ? data.recipeData[i].product_storehouse_quantity : '';
                    compatibleProductId = data.recipeData[i].compatible_product_id ? data.recipeData[i].compatible_product_id : '';
                    compatibleProductName = data.recipeData[i].compatible_product_name ? data.recipeData[i].compatible_product_name : '';
                    compatibleProductQuantity = data.recipeData[i].compatible_product_quantity ? data.recipeData[i].compatible_product_quantity.toFixed(4) : '';
                    compatibleProductStorehouseQuantity = data.compatibleProductStorehouseQuantity[i] ? data.compatibleProductStorehouseQuantity[i] : '';

                    var confirmRecipeTableRow = '';

                    if(compatibleProductId) {
                        confirmRecipeTableRow = '<tr>'+
                                                    '<td>'+
                                                        '<input class="edit-menu-radio-btn-select-using-recipe-product" type="radio" name="'+i+'" checked />'+
                                                        '<span class="product-id d-none">'+data.recipeData[i].product_id+'</span>'+
                                                        '<span class="product-quantity main-product-quantity d-none">'+data.recipeData[i].product_quantity.toFixed(4)+'</span>'+
                                                    '</td>'+
                                                    '<td class="d-none">'+data.recipeData[i].product_id+'</td>'+
                                                    '<td>'+data.recipeData[i].product_name+'</td>'+
                                                    '<td><input class="input-product-quantity form-control form-control-sm" type="text" value="'+data.recipeData[i].product_quantity.toFixed(4)+'" style="width: 100px;" /></td>'+
                                                    '<td>'+productStorehouseQuantity+'</td>'+

                                                    '<td>'+
                                                        '<input class="edit-menu-radio-btn-select-using-recipe-product" type="radio" name="'+i+'" />'+
                                                        '<span class="product-id compatible-product-id d-none">'+compatibleProductId+'</span>'+
                                                        '<span class="product-quantity compatible-product-quantity d-none">'+compatibleProductQuantity+'</span>'+
                                                    '</td>'+
                                                    '<td class="d-none compatible-product-id">'+compatibleProductId+'</td>'+
                                                    '<td>'+
                                                        '<select class="select-compatible-product form-control form-control-sm">'+
                                                            '<option data-compatible-product-quantity="'+compatibleProductQuantity+'" data-compatible-product-storehouse-quantity="'+compatibleProductStorehouseQuantity+'" value="'+compatibleProductId+'">'+compatibleProductName+'</option>'+
                                                        '</select>'+
                                                    '</td>'+
                                                    '<td>'+
                                                        '<input class="input-compatible-product-quantity form-control form-control-sm" type="text" style="width: 100px;" value="'+compatibleProductQuantity+'" />'+
                                                    '</td>'+
                                                    '<td class="compatible-product-storehouse-quantity">'+compatibleProductStorehouseQuantity+'</td>'+

                                                    '<td>'+data.recipeData[i].product_unit+'</td>'+
                                                '</tr>'
                    } else {
                        confirmRecipeTableRow = '<tr>'+
                                                    '<td>'+
                                                        '<input class="edit-menu-radio-btn-select-using-recipe-product" type="radio" name="'+i+'" checked />'+
                                                        '<span class="product-id d-none">'+data.recipeData[i].product_id+'</span>'+
                                                        '<span class="product-quantity main-product-quantity d-none">'+data.recipeData[i].product_quantity.toFixed(4)+'</span>'+
                                                    '</td>'+
                                                    '<td class="d-none">'+data.recipeData[i].product_id+'</td>'+
                                                    '<td>'+data.recipeData[i].product_name+'</td>'+
                                                    '<td><input class="input-product-quantity form-control form-control-sm" type="text" value="'+data.recipeData[i].product_quantity.toFixed(4)+'" style="width: 100px;" /></td>'+
                                                    '<td>'+productStorehouseQuantity+'</td>'+

                                                    '<td></td>'+
                                                    '<td class="d-none"></td>'+
                                                    '<td></td>'+
                                                    '<td></td>'+
                                                    '<td></td>'+

                                                    '<td>'+data.recipeData[i].product_unit+'</td>'+
                                                '</tr>'
                    }

                    var newProductId = data.recipeData[i].product_id;
                    var oldProductId = i>0 ? data.recipeData[i-1].product_id : '';

                    if(newProductId !== oldProductId) {
                        tbody.append(confirmRecipeTableRow);
                    } else {
                        var lastTableRow  = $('#modal-table-edit-menu-confirm-recipe > tbody tr:last');
                        var selectOption = '<option data-compatible-product-quantity="'+compatibleProductQuantity+'" data-compatible-product-storehouse-quantity="'+compatibleProductStorehouseQuantity+'" value="'+compatibleProductId+'">'+compatibleProductName+'</option>'
                        lastTableRow.find('.select-compatible-product').append(selectOption);
                    }
                }
            }
        });

        $('#menuEditConfirmRecipeModal').delegate('.select-compatible-product', 'change', function (e) {
            var selectCompatibleProductTableRow = $(this).parent().parent();
            var selectedCompatibleProductId = $(this).val();
            var selectedCompatibleProductQuantity = $(this).find(':selected').attr('data-compatible-product-quantity');
            var selectedCompatibleProductStorehouseQuantity = $(this).find(':selected').attr('data-compatible-product-storehouse-quantity');
            selectCompatibleProductTableRow.find('.compatible-product-id').text(selectedCompatibleProductId);
            selectCompatibleProductTableRow.find('.compatible-product-quantity').text(selectedCompatibleProductQuantity);
            selectCompatibleProductTableRow.find('.input-compatible-product-quantity').val(selectedCompatibleProductQuantity);
            selectCompatibleProductTableRow.find('.compatible-product-storehouse-quantity').text(selectedCompatibleProductStorehouseQuantity);
        });

    });


    // Edit menu confirm recipe modal on change product quantity and validation on inputs
    $('#menuEditConfirmRecipeModal').delegate('.input-compatible-product-quantity', 'keydown, change, keyup', function (e) {
        var inputCompatibleProductQuantityValue = e.target.value;
        $(this).parent().parent().find('.compatible-product-quantity').text(inputCompatibleProductQuantityValue);

        // Change coma "," with punct "." in inputs
        if (e.keyCode === 188 || e.keyCode === 108) {
            this.value += '.';
            e.preventDefault();
        }
    }).numeric({ negative: false });

    $('#menuEditConfirmRecipeModal').delegate('.input-product-quantity', 'keydown, change, keyup', function (e) {
        var inputProductQuantityValue = e.target.value;
        $(this).parent().parent().find('.main-product-quantity').text(inputProductQuantityValue);

        // Change coma "," with punct "." in inputs
        if (e.keyCode === 188 || e.keyCode === 108) {
            this.value += '.';
            e.preventDefault();
        }
    }).numeric({ negative: false });


    // Save confirmed recipe data to variables (only)
    var menuConfirmRecipeDataProductIdArr = [];
    var menuConfirmRecipeDataProductQuantityArr = [];

    $('#btn-save-edit-menu-confirm-recipe').on('click', function() {
        $('#modal-table-edit-menu-confirm-recipe > tbody > tr').each(function(index) {
            var menuConfirmRecipeTableRowCellCheckedRadioBtn = $(this).find('.edit-menu-radio-btn-select-using-recipe-product:checked').parent();
            menuConfirmRecipeDataProductIdArr.push(menuConfirmRecipeTableRowCellCheckedRadioBtn.find('.product-id').text());
            menuConfirmRecipeDataProductQuantityArr.push(menuConfirmRecipeTableRowCellCheckedRadioBtn.find('.product-quantity').text());
        });

        // disable selectboxes do not change
        $('#modal-select-recipe').attr('disabled', true);
        $('#modal-select-recipe-group').attr('disabled', true);

        $('#menuEditConfirmRecipeModal').modal('hide');
    });


    // ------------------- MODAL DIALOG - add new recipe - END ------------------------



    // Auto create colspan on eq cells in create menu table - customers name
    var topMatchTd;
    var previousValue = "";
    var colSpan = 1;
    $('#menu-customers-and-quantity-table > thead > tr.customer-name > td, #modal-menu-customers-and-quantity-table > thead > tr.customer-name > td').each(function(){
        if($(this).text() == previousValue) {
            colSpan++;
            $(topMatchTd).attr('colspan', colSpan);
            $(this).remove();
        }
        else {
            topMatchTd = $(this);
            colSpan = 1;
        }
        previousValue = $(this).text();
    });


    // Auto calc height on table column
    var rowCustomerNameHeight = $('.customer-name')[0].offsetHeight;
    var rowCustomerObjectNameHeight = $('.customer-object-name')[0].offsetHeight;
    $('.two-rows-height').height(rowCustomerNameHeight + rowCustomerObjectNameHeight - 3);



    // Update db table menu_recipe_confirmed_data column: recipes_quantity with total quantity for recipe (meal)
    $("#btn-edit-menu").on('click', function(e) {
        var editMenuId = $('#menu-id').val();
        var totalQuantityForMealArr = [];
        var numrowForMealArr = [];

        $('#menu-customers-and-quantity-table > tbody > tr').find('td > strong.total-quantity-for-meal').each(function (index) {
            totalQuantityForMealArr.push($(this).text());
        });
        $('#menu-meals-table > tbody > tr').find('td.num-row').each(function (index) {
            numrowForMealArr.push($(this).text());
        });

        $.ajax({
            method: "GET",
            url: "/ajax-edit-menu-update-recipe-row-total-quantity",
            data: {
                "menuId": editMenuId,
                "totalQuantityForMealArr": totalQuantityForMealArr,
                "numrowForMealArr": numrowForMealArr,
                "action": "edit-menu-update-recipe-row-total-quantity"
            }
        });
    });

});
