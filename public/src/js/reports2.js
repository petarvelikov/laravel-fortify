$(document).ready(function () {

    // Save input values on filtring
    $('#btn-filter-reports').on('click', function () {
        var filteredReportsCustomer = $('#reports-customer').val();
        var filteredReportsStartDate = $('#reports-start-date').val();
        var filteredReportsEndDate = $('#reports-end-date').val();

        localStorage.setItem('filtered-reports-customer', filteredReportsCustomer);
        localStorage.setItem('filtered-reports-start-date', filteredReportsStartDate);
        localStorage.setItem('filtered-reports-end-date', filteredReportsEndDate);
    });

    $('#reports-customer').val(localStorage.getItem('filtered-reports-customer'));
    $('#reports-start-date').val(localStorage.getItem('filtered-reports-start-date'));
    $('#reports-end-date').val(localStorage.getItem('filtered-reports-end-date'));


    localStorage.removeItem('filtered-reports-customer');
    localStorage.removeItem('filtered-reports-start-date');
    localStorage.removeItem('filtered-reports-end-date');

});
