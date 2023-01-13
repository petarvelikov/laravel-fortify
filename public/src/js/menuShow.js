$(document).ready(function () {

    // Menu table
    var customerCount = $('#customer-count').text() * 1;
    var menuTypeColspan = customerCount + 1;
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
        $('#menu-customers-and-quantity-table > tbody > tr').eq(menuType1StartTableRowIndex).before('<tr><td class="menu-type" colspan="' + menuTypeColspan +'" style="border-left: none; height: 23px; color: rgba(255, 255, 255, 0);">1</td></tr>');
    }
    if(menuType2StartTableRowIndex !== null) {
        if(menuType3StartTableRowIndex) menuType3StartTableRowIndex++
        if(menuType4StartTableRowIndex) menuType4StartTableRowIndex++
        if(menuType5StartTableRowIndex) menuType5StartTableRowIndex++
        menuType2StartTableRowForMeals.before('<tr><th style="padding-left: 5px;">Подкрепителна закуска</th></tr>');
        $('#menu-customers-and-quantity-table > tbody > tr').eq(menuType2StartTableRowIndex).before('<tr><td class="menu-type" colspan="' + menuTypeColspan +'" style="border-left: none; height: 23px; color: rgba(255, 255, 255, 0);">2</td></tr>');
    }
    if(menuType3StartTableRowIndex !== null) {
        if(menuType4StartTableRowIndex) menuType4StartTableRowIndex++
        if(menuType5StartTableRowIndex) menuType5StartTableRowIndex++
        menuType3StartTableRowForMeals.before('<tr><th style="padding-left: 5px;">Обяд</th></tr>');
        $('#menu-customers-and-quantity-table > tbody > tr').eq(menuType3StartTableRowIndex).before('<tr><td class="menu-type" colspan="' + menuTypeColspan +'" style="border-left: none; height: 23px; color: rgba(255, 255, 255, 0);">3</td></tr>');
    }
    if(menuType4StartTableRowIndex !== null) {
        if(menuType5StartTableRowIndex) menuType5StartTableRowIndex++
        menuType4StartTableRowForMeals.before('<tr><th style="padding-left: 5px;">Следобедна закуска</th></tr>');
        $('#menu-customers-and-quantity-table > tbody > tr').eq(menuType4StartTableRowIndex).before('<tr><td class="menu-type" colspan="' + menuTypeColspan +'" style="border-left: none; height: 23px; color: rgba(255, 255, 255, 0);">4</td></tr>');
    }
    if(menuType5StartTableRowIndex !== null) {
        menuType5StartTableRowForMeals.before('<tr><th style="padding-left: 5px;">Вечеря</th></tr>');
        $('#menu-customers-and-quantity-table > tbody > tr').eq(menuType5StartTableRowIndex).before('<tr><td class="menu-type" colspan="' + menuTypeColspan +'" style="border-left: none; height: 23px; color: rgba(255, 255, 255, 0);">5</td></tr>');
    }



    // Auto calc total meal quantity on menu show
    function autoCalcTotalQuantity() {
        $('#menu-customers-and-quantity-table tr').each(function () {
            var sum = 0

            $(this).find('.quantity-for-meal:visible').each(function () {
                var combat = $(this).text();
                if (!isNaN(combat) && combat.length !== 0) {
                    sum += parseFloat(combat);
                }
            });
            $('.total-quantity-for-meal', this).html(sum);
        });
    }
    autoCalcTotalQuantity();



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
        $("#print-btn").prop("disabled", true);
        $('#alert-message-menu').css('display', 'block');
    }



    // Printing
    $('#print-btn').click(function () {
        $('#print-page').print({
            // rejectWindow: false,
            noPrintSelector: ".no-print"
        });
    });



    // Auto create colspan on eq cells in create menu table - customers name
    var topMatchTd;
    var previousValue = "";
    var colSpan = 1;
    $('#menu-customers-and-quantity-table > thead > tr.customer-name > td').each(function(){
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
    $('.two-rows-height').height(rowCustomerNameHeight + rowCustomerObjectNameHeight + 1);



    // empty data from db table menu_recipe_confirmed_data_temp
    $('#btn-open-create-similar-menu-view').on('click', function() {
        $.ajax({
            method: "GET",
            url: "/ajax-db-remove-menu-recipe-confirm-temp-data",
            data: {
                "action": "db-remove-menu-recipe-confirm-temp-data"
            }
        });
    });




    // add no print table column
    $('.btn-add-no-print-column').on('change', function() {
        var thisColumn = $(this).parent();
        var colIdx = thisColumn.index();
        var oldCustomerHeaderColspan = $('.customer-header').attr('colspan') * 1;

        if($(this).is(':checked')) {
            $(".checked-to-hide").filter(":nth-child(" + (colIdx + 1) + ")").addClass('d-none');
            menuTypeColspan = menuTypeColspan - 1;
            $('.customer-header').attr('colspan', (oldCustomerHeaderColspan - 1)); // Auto create colspan on eq cells in create menu table - customers name
        } else {
            $(".checked-to-hide").filter(":nth-child(" + (colIdx + 1) + ")").removeClass('d-none');
            menuTypeColspan = menuTypeColspan + 1;
            $('.customer-header').attr('colspan', (oldCustomerHeaderColspan + 1)); // Auto create colspan on eq cells in create menu table - customers name
        }

        $('.menu-type').attr('colspan', menuTypeColspan); // Auto change colspan on menu type header - (Закуска, Обяд, Вечеря ...)

        autoCalcTotalQuantity(); // Auto calc total meal quantity on menu show
    });




    // hide table with checkbox column for hiden column of menu table if customers > 1
    if($('.customer-header').length > 1) {
        $('#table-column-check-hide-column').addClass('d-none');
    }

});
