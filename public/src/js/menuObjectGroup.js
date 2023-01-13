$(document).ready(function () {

    // menuObjectGroup show - add new customerObject - connected selectBox: customers and customerObjects
    function getConnectedCustomerObjectsFromCustomers() {
        var selectedCustomerId = $('#selectbox-customer').val();

        $.ajax({
            method: "GET",
            url: '/ajax-menu-objects-group-show-get-customer-objects-from-customers',
            data: {
                'selectedCustomerId': selectedCustomerId
            },
            success: function (responseData) {
                $('#selectbox-customer-object').empty();
                $('#selectbox-customer-object').append('<option selected disabled value="">Изберете обект</option>');
                $.each(responseData.connectedCustomerObjects, function(index, customerObjects) {
                    $('#selectbox-customer-object').append('<option value="'+customerObjects.id+'">'+customerObjects.name+'</option>');
                });
            }
        });
    }

    setTimeout(function() {
        getConnectedCustomerObjectsFromCustomers();
    }, 250);

    $('#selectbox-customer').on('change', function() {
        getConnectedCustomerObjectsFromCustomers();
    });


    $('#btn-add-new-object-to-menu-objects-group-show').on('click', function() {
        var menuObjectGroupId = $('.menu-object-group-id').val();
        var customer = $('.customer').val();
        var customerObject = $('.customer-object').val();

        $.ajax({
            method: "GET",
            url: "/ajax-menu-objects-group-show-add-new-object",
            data: {
                "menuObjectGroupId": menuObjectGroupId,
                "customerObject": customerObject,
                "action": "add-new-object-to-show-menu-objects-group"
            }
        });

        // Save input values on save data in show
        localStorage.setItem('menu-object-group-show-customer', customer);

        setTimeout(function() { location.reload(true); }, 500);
    });


    // Get and delete input values on save data in show
    $('.customer').val(localStorage.getItem('menu-object-group-show-customer'));
    localStorage.removeItem('menu-object-group-show-customer');


    $('.btn-delete-object-from-menu-objects-group-show').on('click', function() {
        var thisRow = $(this).parent().parent();
        var rowIdForDelete = thisRow.find('.row-id').text();
        var confirmDeleteDialog = confirm("Наистина ли желаете да изтриете този запис?");

        if (confirmDeleteDialog) {
            $.ajax({
                method: "GET",
                url: "/ajax-menu-objects-group-show-delete-object",
                data: {
                    "rowIdForDelete": rowIdForDelete,
                    "action": "delete-object-to-show-menu-objects-group"
                }
            });

            setTimeout(function() { location.reload(true); }, 500);
        } else {
            return false;
        }
    });

});
