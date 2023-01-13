$(document).ready(function () {

    var num1 = 0, num2 = 0, num3 = 0, num4 = 0, num5 = 0;
    var numStr1 = '', numStr2 = '', numStr3 = '', numStr4 = '', numStr5 = '';
    var customers = [], meals = [], recipeGroups = [];

    function addNewRowType1() {
        num1 += 1;
        numStr1 = "1" + num1;
        var tr = '<tr>'+
                    '<td style="display: none;"><input class="recipenum" type="text" value="' + numStr1 + '" name="recipenum[]" style="width: 30px;" readonly /></td>'+
                    '<td>'+
                      '<select class="menu-select-recipe-group menu-select-recipe-group-type1 form-control form-control-sm" style="width: 135px; min-width: 135px; margin-right: 2px;"><option value="" selected disabled>Рецептурник</option></select>'+
                      '<select class="menu-select-meal menu-select-meal-type1 form-control form-control-sm" style="width: 135px; min-width: 135px;" required><option value="" selected disabled>Изберете рецептурник</option></select>'+
                      '<input class="menu-select-hiden-input-meal d-none" placeholder="рецепта" name="recipe[]" />'+
                    '</td>';
        for (var i = 0; i < customers.length; i++) {
            tr += '<td><input class="menu-input-meal-quantity menu-input-meal-quantity-type1 form-control form-control-sm" type="text" style="width: 50px; min-width: 50px;" name="quantity[]" autocomplete="off" /></td>'
        }
        tr += `<td><input class="menu-total-products form-control form-control-sm" type="text" style="width: 55px; min-width: 55px; font-weight: bold;" disabled /></td>
                        <td class="text-center" style="width: 45px; min-width: 45px;"><a class="menu-btn-remove-row btn btn-sm btn-danger" title="Изтрий рада"><i class="fa fa-minus fa-lg"></i></a></td>
                    </tr>`;
        $('#menu-table > tbody.menu-table-tbody1').append(tr);

        $.each(recipeGroups, function (index, recipeGroupsObj) {
            $('.menu-select-recipe-group-type1:last').append('<option value="' + recipeGroupsObj.id + '">' + recipeGroupsObj.name + '</option>')
        });

        return false;
    }
    function addNewRowType2() {
        num2 += 1;
        numStr2 = "2" + num2;
        var tr = '<tr>'+
                    '<td style="display: none;"><input class="recipenum" type="text" value="' + numStr2 + '" name="recipenum[]" style="width: 30px;" readonly /></td>'+
                    '<td>'+
                      '<select class="menu-select-recipe-group menu-select-recipe-group-type2 form-control form-control-sm" style="width: 135px; min-width: 135px; margin-right: 2px;"><option value="" selected disabled>Рецептурник</option></select>'+
                      '<select class="menu-select-meal menu-select-meal-type2 form-control form-control-sm" style="width: 135px; min-width: 135px;" required><option value="" selected disabled>Изберете рецептурник</option></select>'+
                      '<input class="menu-select-hiden-input-meal d-none" placeholder="рецепта" name="recipe[]" />'+
                    '</td>';
        for (var i = 0; i < customers.length; i++) {
            tr += '<td><input class="menu-input-meal-quantity menu-input-meal-quantity-type2 form-control form-control-sm" type="text" style="width: 50px; min-width: 50px;" name="quantity[]" autocomplete="off" /></td>'
        }
        tr += `<td><input class="menu-total-products form-control form-control-sm" type="text" style="width: 55px; min-width: 55px; font-weight: bold;" disabled /></td>
                        <td class="text-center" style="width: 45px; min-width: 45px;"><a class="menu-btn-remove-row btn btn-sm btn-danger" title="Изтрий рада"><i class="fa fa-minus fa-lg"></i></a></td>
                    </tr>`;
        $('#menu-table > tbody.menu-table-tbody2').append(tr);

        $.each(recipeGroups, function (index, recipeGroupsObj) {
            $('.menu-select-recipe-group-type2:last').append('<option value="' + recipeGroupsObj.id + '">' + recipeGroupsObj.name + '</option>')
        });

        return false;
    }
    function addNewRowType3() {
        num3 += 1;
        numStr3 = "3" + num3;
        var tr = '<tr>'+
                    '<td style="display: none;"><input class="recipenum" type="text" value="' + numStr3 + '" name="recipenum[]" style="width: 30px;" readonly /></td>'+
                    '<td>'+
                      '<select class="menu-select-recipe-group menu-select-recipe-group-type3 form-control form-control-sm" style="width: 135px; min-width: 135px; margin-right: 2px;"><option value="" selected disabled>Рецептурник</option></select>'+
                      '<select class="menu-select-meal menu-select-meal-type3 form-control form-control-sm" style="width: 135px; min-width: 135px;" required><option value="" selected disabled>Изберете рецептурник</option></select>'+
                      '<input class="menu-select-hiden-input-meal d-none" placeholder="рецепта" name="recipe[]" />'+
                    '</td>';
        for (var i = 0; i < customers.length; i++) {
            tr += '<td><input class="menu-input-meal-quantity menu-input-meal-quantity-type3 form-control form-control-sm" type="text" style="width: 50px; min-width: 50px;" name="quantity[]" autocomplete="off" /></td>'
        }
        tr += `<td><input class="menu-total-products form-control form-control-sm" type="text" style="width: 55px; min-width: 55px; font-weight: bold;" disabled /></td>
                        <td class="text-center" style="width: 45px; min-width: 45px;"><a class="menu-btn-remove-row btn btn-sm btn-danger" title="Изтрий рада"><i class="fa fa-minus fa-lg"></i></a></td>
                    </tr>`;
        $('#menu-table > tbody.menu-table-tbody3').append(tr);

        $.each(recipeGroups, function (index, recipeGroupsObj) {
            $('.menu-select-recipe-group-type3:last').append('<option value="' + recipeGroupsObj.id + '">' + recipeGroupsObj.name + '</option>')
        });

        return false;
    }
    function addNewRowType4() {
        num4 += 1;
        numStr4 = "4" + num4;
        var tr = '<tr>'+
                    '<td style="display: none;"><input class="recipenum" type="text" value="' + numStr4 + '" name="recipenum[]" style="width: 30px;" readonly /></td>'+
                    '<td>'+
                      '<select class="menu-select-recipe-group menu-select-recipe-group-type4 form-control form-control-sm" style="width: 135px; min-width: 135px; margin-right: 2px;"><option value="" selected disabled>Рецептурник</option></select>'+
                      '<select class="menu-select-meal menu-select-meal-type4 form-control form-control-sm" style="width: 135px; min-width: 135px;" required><option value="" selected disabled>Изберете рецептурник</option></select>'+
                      '<input class="menu-select-hiden-input-meal d-none" placeholder="рецепта" name="recipe[]" />'+
                    '</td>';
        for (var i = 0; i < customers.length; i++) {
            tr += '<td><input class="menu-input-meal-quantity menu-input-meal-quantity-type4 form-control form-control-sm" type="text" style="width: 50px; min-width: 50px;" name="quantity[]" autocomplete="off" /></td>'
        }
        tr += `<td><input class="menu-total-products form-control form-control-sm" type="text" style="width: 55px; min-width: 55px; font-weight: bold;" disabled /></td>
                        <td class="text-center" style="width: 45px; min-width: 45px;"><a class="menu-btn-remove-row btn btn-sm btn-danger" title="Изтрий рада"><i class="fa fa-minus fa-lg"></i></a></td>
                    </tr>`;
        $('#menu-table > tbody.menu-table-tbody4').append(tr);

        $.each(recipeGroups, function (index, recipeGroupsObj) {
            $('.menu-select-recipe-group-type4:last').append('<option value="' + recipeGroupsObj.id + '">' + recipeGroupsObj.name + '</option>')
        });

        return false;
    }
    function addNewRowType5() {
        num5 += 1;
        numStr5 = "5" + num5;
        var tr = '<tr>'+
                    '<td style="display: none;"><input class="recipenum" type="text" value="' + numStr5 + '" name="recipenum[]" style="width: 30px;" readonly /></td>'+
                    '<td>'+
                      '<select class="menu-select-recipe-group menu-select-recipe-group-type5 form-control form-control-sm" style="width: 135px; min-width: 135px; margin-right: 2px;"><option value="" selected disabled>Рецептурник</option></select>'+
                      '<select class="menu-select-meal menu-select-meal-type5 form-control form-control-sm" style="width: 135px; min-width: 135px;" required><option value="" selected disabled>Изберете рецептурник</option></select>'+
                      '<input class="menu-select-hiden-input-meal d-none" placeholder="рецепта" name="recipe[]" />'+
                    '</td>';
        for (var i = 0; i < customers.length; i++) {
            tr += '<td><input class="menu-input-meal-quantity menu-input-meal-quantity-type5 form-control form-control-sm" type="text" style="width: 50px; min-width: 50px;" name="quantity[]" autocomplete="off" /></td>'
        }
        tr += `<td><input class="menu-total-products form-control form-control-sm" type="text" style="width: 55px; min-width: 55px; font-weight: bold;" disabled /></td>
                        <td class="text-center" style="width: 45px; min-width: 45px;"><a class="menu-btn-remove-row btn btn-sm btn-danger" title="Изтрий рада"><i class="fa fa-minus fa-lg"></i></a></td>
                    </tr>`;
        $('#menu-table > tbody.menu-table-tbody5').append(tr);

        $.each(recipeGroups, function (index, recipeGroupsObj) {
            $('.menu-select-recipe-group-type5:last').append('<option value="' + recipeGroupsObj.id + '">' + recipeGroupsObj.name + '</option>')
        });

        return false;
    }


    // Ajax create menu - get recipe from group
    function ajaxRefreshRecipesFromRecipeGrroupSelectBoxType1() {
        $('.menu-select-recipe-group-type1').on('change', function () {
            var thisRow = $(this).parent().parent();
            var recipeGroupId = thisRow.find('.menu-select-recipe-group-type1').val();
            $.get('/ajax-reports-get-repipes-from-group?recipeGroupId=' + recipeGroupId, function (data) {
                if (recipeGroupId) {
                    thisRow.find('.menu-select-meal-type1').empty();
                }
                $.each(data, function(index, recipesObj) {
                    thisRow.find('.menu-select-meal-type1').append('<option value="'+recipesObj.id+'">'+recipesObj.title+'</option>').sortSelect();
                });
                thisRow.find('.menu-select-meal-type1').prepend('<option value="" disabled selected>Рецепта</option>').prop('selectedIndex', 0);
            });
        });
        return false;
    }
    function ajaxRefreshRecipesFromRecipeGrroupSelectBoxType2() {
        $('.menu-select-recipe-group-type2').on('change', function () {
            var thisRow = $(this).parent().parent();
            var recipeGroupId = thisRow.find('.menu-select-recipe-group-type2').val();
            $.get('/ajax-reports-get-repipes-from-group?recipeGroupId=' + recipeGroupId, function (data) {
                if (recipeGroupId) {
                    thisRow.find('.menu-select-meal-type2').empty();
                }
                $.each(data, function(index, recipesObj) {
                    thisRow.find('.menu-select-meal-type2').append('<option value="'+recipesObj.id+'">'+recipesObj.title+'</option>').sortSelect();
                });
                thisRow.find('.menu-select-meal-type2').prepend('<option value="" disabled selected>Рецепта</option>').prop('selectedIndex', 0);
            });
        });
        return false;
    }
    function ajaxRefreshRecipesFromRecipeGrroupSelectBoxType3() {
        $('.menu-select-recipe-group-type3').on('change', function () {
            var thisRow = $(this).parent().parent();
            var recipeGroupId = thisRow.find('.menu-select-recipe-group-type3').val();
            $.get('/ajax-reports-get-repipes-from-group?recipeGroupId=' + recipeGroupId, function (data) {
                if (recipeGroupId) {
                    thisRow.find('.menu-select-meal-type3').empty();
                }
                $.each(data, function(index, recipesObj) {
                    thisRow.find('.menu-select-meal-type3').append('<option value="'+recipesObj.id+'">'+recipesObj.title+'</option>').sortSelect();
                });
                thisRow.find('.menu-select-meal-type3').prepend('<option value="" disabled selected>Рецепта</option>').prop('selectedIndex', 0);
            });
        });
        return false;
    }
    function ajaxRefreshRecipesFromRecipeGrroupSelectBoxType4() {
        $('.menu-select-recipe-group-type4').on('change', function () {
            var thisRow = $(this).parent().parent();
            var recipeGroupId = thisRow.find('.menu-select-recipe-group-type4').val();
            $.get('/ajax-reports-get-repipes-from-group?recipeGroupId=' + recipeGroupId, function (data) {
                if (recipeGroupId) {
                    thisRow.find('.menu-select-meal-type4').empty();
                }
                $.each(data, function(index, recipesObj) {
                    thisRow.find('.menu-select-meal-type4').append('<option value="'+recipesObj.id+'">'+recipesObj.title+'</option>').sortSelect();
                });
                thisRow.find('.menu-select-meal-type4').prepend('<option value="" disabled selected>Рецепта</option>').prop('selectedIndex', 0);
            });
        });
        return false;
    }
    function ajaxRefreshRecipesFromRecipeGrroupSelectBoxType5() {
        $('.menu-select-recipe-group-type5').on('change', function () {
            var thisRow = $(this).parent().parent();
            var recipeGroupId = thisRow.find('.menu-select-recipe-group-type5').val();
            $.get('/ajax-reports-get-repipes-from-group?recipeGroupId=' + recipeGroupId, function (data) {
                if (recipeGroupId) {
                    thisRow.find('.menu-select-meal-type5').empty();
                }
                $.each(data, function(index, recipesObj) {
                    thisRow.find('.menu-select-meal-type5').append('<option value="'+recipesObj.id+'">'+recipesObj.title+'</option>').sortSelect();
                });
                thisRow.find('.menu-select-meal-type5').prepend('<option value="" disabled selected>Рецепта</option>').prop('selectedIndex', 0);
            });
        });
        return false;
    }


    function autoCalcTotalRowQuantity() {
        $('.menu-input-meal-quantity').on('keyup', function () {
            var tr = $(this).parent().parent();
            var res = 0;
            tr.find('.menu-input-meal-quantity').each(function (index) {
                res = res + $(this).val() * 1;
            });
            tr.find('.menu-total-products').val(res.toLocaleString());
        }).numeric({ decimal: false, negative: false });
    }


    function moveFocusToNewRowType1() {
        $('.menu-input-meal-quantity-type1:last').on("keydown", function (e) {
            var code = e.keyCode || e.which;
            if (code == 9) {
                menuNewRowType1();
                $('.menu-select-meal-type1:last').focus();
                return false;
            }
        });
    }
    function moveFocusToNewRowType2() {
        $('.menu-input-meal-quantity-type2:last').on("keydown", function (e) {
            var code = e.keyCode || e.which;
            if (code == 9) {
                menuNewRowType2();
                $('.menu-select-meal-type2:last').focus();
                return false;
            }
        });
    }
    function moveFocusToNewRowType3() {
        $('.menu-input-meal-quantity-type3:last').on("keydown", function (e) {
            var code = e.keyCode || e.which;
            if (code == 9) {
                menuNewRowType3();
                $('.menu-select-meal-type3:last').focus();
                return false;
            }
        });
    }
    function moveFocusToNewRowType4() {
        $('.menu-input-meal-quantity-type4:last').on("keydown", function (e) {
            var code = e.keyCode || e.which;
            if (code == 9) {
                menuNewRowType4();
                $('.menu-select-meal-type4:last').focus();
                return false;
            }
        });
    }
    function moveFocusToNewRowType5() {
        $('.menu-input-meal-quantity-type5:last').on("keydown", function (e) {
            var code = e.keyCode || e.which;
            if (code == 9) {
                menuNewRowType5();
                $('.menu-select-meal-type5:last').focus();
                return false;
            }
        });
    }



    function menuNewRowType1() {
        addNewRowType1();
        ajaxRefreshRecipesFromRecipeGrroupSelectBoxType1()
        autoCalcTotalRowQuantity();
        moveFocusToNewRowType1();
        return false;
    }
    function menuNewRowType2() {
        addNewRowType2();
        ajaxRefreshRecipesFromRecipeGrroupSelectBoxType2()
        autoCalcTotalRowQuantity();
        moveFocusToNewRowType2();
        return false;
    }
    function menuNewRowType3() {
        addNewRowType3();
        ajaxRefreshRecipesFromRecipeGrroupSelectBoxType3()
        autoCalcTotalRowQuantity();
        moveFocusToNewRowType3();
        return false;
    }
    function menuNewRowType4() {
        addNewRowType4();
        ajaxRefreshRecipesFromRecipeGrroupSelectBoxType4()
        autoCalcTotalRowQuantity();
        moveFocusToNewRowType4();
        return false;
    }
    function menuNewRowType5() {
        addNewRowType5();
        ajaxRefreshRecipesFromRecipeGrroupSelectBoxType5()
        autoCalcTotalRowQuantity();
        moveFocusToNewRowType5();
        return false;
    }


    // Ajax create menu
    $('#create-menu-customer-group').on('change', function () {
        $('#btn-groups-menu-type').show();
        var menuObjectsGroup = $(this).val();

        $.get('/ajax-create-menu?customer_group=' + menuObjectsGroup, function (data) {
            customers = data.customersList;
            meals = data.recipesList;
            recipeGroups = data.recipeGroupsList;

            $('#menu-table > thead > tr.tr-customer').empty();
            $('#menu-table > tbody > tr.tr-customer').empty();
            $('#menu-table > thead > tr.tr-customer-object').empty();
            $('#menu-table > tbody > tr.tr-customer-object').empty();
            $('#menu-table > thead > tr.tr-customer').append('<th rowspan="2" style="width: 30px; display: none;">&numero;</th><th rowspan="2" style="width: 275px; min-width: 275px;">Ястие / Обект</th>');
            for (var i = 0; i < customers.length; i++) {
                $('#menu-table > thead > tr.tr-customer-all-no-colSpan').append('<th class="customer-cell"><input type="text" name="customer[]" value="' + customers[i].customer_id + '" /></th>');
                $('#menu-table > thead > tr.tr-customer').append('<th class="customer-cell">' + customers[i].customer_name + '</th>');
                $('#menu-table > thead > tr.tr-customer-object').append('<th class="horizontal-text rotate-create-menu" style="width: 50px; min-width: 50px; text-align: -webkit-center;"><div>' + customers[i].customer_object_name + '<input type="text" style="display: none;" name="customer_object[]" value="' + customers[i].customer_object_id + '" /></div></th>');
            }
            $('#menu-table > thead > tr.tr-customer').append('<th rowspan="2" class="horizontal-text rotate-create-menu" style="width: 55px; min-width: 55px; text-align: -webkit-center; font-weight: bold;"><div>Общо</div></th>');
            $('#menu-table > thead > tr.tr-customer').append('<th rowspan="2" style="width: 45px; min-width: 45px;"></th>');

            // Auto create colspan on eq cells in create menu table - customers name
            var topMatchTd;
            var previousValue = "";
            var colSpan = 1;
            $('#menu-table > thead > tr.tr-customer > th.customer-cell').each(function(){
                if($(this).text() == previousValue) {
                    colSpan++;
                    $(topMatchTd).attr('colspan',colSpan);
                    $(this).remove();
                }
                else {
                    topMatchTd = $(this);
                    colSpan = 1;
                }
                previousValue = $(this).text();
            });


            $('.menu-btn-add-row').on('click', function () {
                menuNewRow();
            });

            $('tbody').delegate('.menu-btn-remove-row', 'click', function () {
                var deleteRecipeNumrow = $(this).parent().parent().find('.recipenum').val();

                $.ajax({
                    method: "GET",
                    url: "/ajax-create-menu-delete-recipe",
                    data: {
                        "deleteRecipeNumrow": deleteRecipeNumrow
                    }
                });

                $(this).parent().parent().remove();
            });


            var tableTypeHeaderColspan = customers.length + 2;
            var countBtnType1 = 0, countBtnType2 = 0, countBtnType3 = 0, countBtnType4 = 0, countBtnType5 = 0

            $('#btn-menu-type1-header').on('click', function() {
                $('#menu-table > tbody.menu-table-tbody1').append('<tr><th colspan="' + tableTypeHeaderColspan + '">Закуска</th><th style="width: 45px; min-width: 45px; text-align: center;"><a class="menu-btn-add-row-type1 btn btn-sm btn-success" title="Добави нов ред"><i class="fa fa-plus fa-lg"></i></a></th></tr>');
                countBtnType1 += 1;
                if(countBtnType1 > 0) {
                    $(this).prop('disabled', true);
                }
                menuNewRowType1();

                $('.menu-btn-add-row-type1').on('click', function () {
                    menuNewRowType1();
                });
            });
            $('#btn-menu-type2-header').on('click', function() {
                $('#menu-table > tbody.menu-table-tbody2').append('<tr><th colspan="' + tableTypeHeaderColspan + '">Подкрепителна закуска</th><th style="width: 45px; min-width: 45px; text-align: center;"><a class="menu-btn-add-row-type2 btn btn-sm btn-success" title="Добави нов ред"><i class="fa fa-plus fa-lg"></i></a></th></tr>');
                countBtnType2 += 1;
                if(countBtnType2 > 0) {
                    $(this).prop('disabled', true);
                }
                menuNewRowType2();

                $('.menu-btn-add-row-type2').on('click', function () {
                    menuNewRowType2();
                });
            });
            $('#btn-menu-type3-header').on('click', function() {
                $('#menu-table > tbody.menu-table-tbody3').append('<tr><th colspan="' + tableTypeHeaderColspan + '">Обяд</th><th style="width: 45px; min-width: 45px; text-align: center;"><a class="menu-btn-add-row-type3 btn btn-sm btn-success" title="Добави нов ред"><i class="fa fa-plus fa-lg"></i></a></th></tr>');
                countBtnType3 += 1;
                if(countBtnType3 > 0) {
                    $(this).prop('disabled', true);
                }
                menuNewRowType3();

                $('.menu-btn-add-row-type3').on('click', function () {
                    menuNewRowType3();
                });
            });
            $('#btn-menu-type4-header').on('click', function() {
                $('#menu-table > tbody.menu-table-tbody4').append('<tr><th colspan="' + tableTypeHeaderColspan + '">Следобедна закуска</th><th style="width: 45px; min-width: 45px; text-align: center;"><a class="menu-btn-add-row-type4 btn btn-sm btn-success" title="Добави нов ред"><i class="fa fa-plus fa-lg"></i></a></th></tr>');
                countBtnType4 += 1;
                if(countBtnType4 > 0) {
                    $(this).prop('disabled', true);
                }
                menuNewRowType4();

                $('.menu-btn-add-row-type4').on('click', function () {
                    menuNewRowType4();
                });
            });
            $('#btn-menu-type5-header').on('click', function() {
                $('#menu-table > tbody.menu-table-tbody5').append('<tr><th colspan="' + tableTypeHeaderColspan + '">Вечеря</th><th style="width: 45px; min-width: 45px; text-align: center;"><a class="menu-btn-add-row-type5 btn btn-sm btn-success" title="Добави нов ред"><i class="fa fa-plus fa-lg"></i></a></th></tr>');
                countBtnType5 += 1;
                if(countBtnType5 > 0) {
                    $(this).prop('disabled', true);
                }
                menuNewRowType5();

                $('.menu-btn-add-row-type5').on('click', function () {
                    menuNewRowType5();
                });
            });
        });
    });


    // validate create menu meals number is not 0
    $('#btn-create-menu').on('click', function(e) {
        var mealsCount = $('#menu-table').find('.recipenum').length;

        if(mealsCount === 0) {
            alert('Трябва да добавите поне едно ястие, за да може да създадете менюто.')
            e.preventDefault();
            return false;
        }
    });



// ===================================  Create menu -> Confirm recipe -> Start  ===========================================

    var menuConfirmRecipeDataSelectedRow, menuConfirmRecipeDataRecipenum, menuConfirmRecipeDataRecipeGroupId, menuConfirmRecipeDataRecipeId;

    $('#menu-table').on('change', '.menu-select-meal', function(){
        $('#menuCreateConfirmRecipeModal').modal('show');

        menuConfirmRecipeDataSelectedRow = $(this).parent().parent();
        menuConfirmRecipeDataRecipenum = $(this).parent().parent().find('.recipenum').val()
        menuConfirmRecipeDataRecipeGroupId = $(this).parent().find('select:first').val();
        menuConfirmRecipeDataRecipeId = $(this).val();

        $.ajax({
            method: "GET",
            url: "/ajax-create-menu-confirm-recipe",
            data: {
                "recipeId": menuConfirmRecipeDataRecipeId
            },
            success: function (data) {
                var tbody = $('#modal-table-create-menu-confirm-recipe > tbody');
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
                                                        '<input class="create-menu-radio-btn-select-using-recipe-product" type="radio" name="'+i+'" checked />'+
                                                        '<span class="product-id d-none">'+data.recipeData[i].product_id+'</span>'+
                                                        '<span class="product-quantity main-product-quantity d-none">'+data.recipeData[i].product_quantity.toFixed(4)+'</span>'+
                                                    '</td>'+
                                                    '<td class="d-none">'+data.recipeData[i].product_id+'</td>'+
                                                    '<td>'+data.recipeData[i].product_name+'</td>'+
                                                    '<td><input class="input-product-quantity form-control form-control-sm" type="text" value="'+data.recipeData[i].product_quantity.toFixed(4)+'" style="width: 100px;" /></td>'+
                                                    '<td>'+productStorehouseQuantity+'</td>'+

                                                    '<td>'+
                                                        '<input class="create-menu-radio-btn-select-using-recipe-product" type="radio" name="'+i+'" />'+
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
                                                        '<input class="create-menu-radio-btn-select-using-recipe-product" type="radio" name="'+i+'" checked />'+
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
                        var lastTableRow  = $('#modal-table-create-menu-confirm-recipe > tbody tr:last');
                        var selectOption = '<option data-compatible-product-quantity="'+compatibleProductQuantity+'" data-compatible-product-storehouse-quantity="'+compatibleProductStorehouseQuantity+'" value="'+compatibleProductId+'">'+compatibleProductName+'</option>'
                        lastTableRow.find('.select-compatible-product').append(selectOption);
                    }
                }
            }
        });

        $('#menuCreateConfirmRecipeModal').delegate('.select-compatible-product', 'change', function (e) {
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


    // Create menu confirm recipe modal on change peoduct quantity and validation on inputs
    $('#menuCreateConfirmRecipeModal').delegate('.input-compatible-product-quantity', 'keydown, change, keyup', function (e) {
        var inputCompatibleProductQuantityValue = e.target.value;
        $(this).parent().parent().find('.compatible-product-quantity').text(inputCompatibleProductQuantityValue);

        // Change coma "," with punct "." in inputs
        if (e.keyCode === 188 || e.keyCode === 108) {
            this.value += '.';
            e.preventDefault();
        }
    }).numeric({ negative: false });

    $('#menuCreateConfirmRecipeModal').delegate('.input-product-quantity', 'keydown, change, keyup', function (e) {
        var inputProductQuantityValue = e.target.value;
        $(this).parent().parent().find('.main-product-quantity').text(inputProductQuantityValue);

        // Change coma "," with punct "." in inputs
        if (e.keyCode === 188 || e.keyCode === 108) {
            this.value += '.';
            e.preventDefault();
        }
    }).numeric({ negative: false });


    // save data
    var menuConfirmRecipeDataProductIdArr = [];
    var menuConfirmRecipeDataProductQuantityArr = [];

    $('#btn-save-create-menu-confirm-recipe').on('click', function() {
        $('#modal-table-create-menu-confirm-recipe > tbody > tr').each(function(index) {
            var menuConfirmRecipeTableRowCellCheckedRadioBtn = $(this).find('.create-menu-radio-btn-select-using-recipe-product:checked').parent();
            menuConfirmRecipeDataProductIdArr.push(menuConfirmRecipeTableRowCellCheckedRadioBtn.find('.product-id').text());
            menuConfirmRecipeDataProductQuantityArr.push(menuConfirmRecipeTableRowCellCheckedRadioBtn.find('.product-quantity').text());
        });

        // save to temp DB table
        $.ajax({
            method: "POST",
            url: "/ajax-create-menu-confirm-recipe-temp",
            data: {
                "_token": $('meta[name="csrf-token"]').attr('content'),
                "recipeNumrow": menuConfirmRecipeDataRecipenum,
                "recipeGroupId": menuConfirmRecipeDataRecipeGroupId,
                "recipeId": menuConfirmRecipeDataRecipeId,
                "productIdArr": menuConfirmRecipeDataProductIdArr,
                "productQuantityArr": menuConfirmRecipeDataProductQuantityArr
            }
        });

        // disable selectboxes do not change
        menuConfirmRecipeDataSelectedRow.find('.menu-select-meal').attr('disabled', true);
        menuConfirmRecipeDataSelectedRow.find('.menu-select-recipe-group').attr('disabled', true);

        // save value from disabled selectBox to hiden input -> submit
        menuConfirmRecipeDataSelectedRow.find('.menu-select-hiden-input-meal').val(menuConfirmRecipeDataRecipeId);

        // remove data from arrays
        menuConfirmRecipeDataProductIdArr.length = 0;
        menuConfirmRecipeDataProductQuantityArr.length = 0;

        $('#menuCreateConfirmRecipeModal').modal('hide');
    });

    // ===================================  Create menu -> Confirm recipe -> End  ===========================================


    // Delete all data from db table: menu_recipe_confirmed_data_temp
    $('#btn-cancel-save-new-menu').on('click', function() {
        $.ajax({
            method: "GET",
            url: "/ajax-db-remove-menu-recipe-confirm-temp-data",
            data: {
                "action": "db-remove-menu-recipe-confirm-temp-data"
            }
        });
    });


});
