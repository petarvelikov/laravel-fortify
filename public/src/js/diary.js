$(document).ready(function () {

    // Save input values on filtring
    $('#btn-filter-reports').on('click', function () {
        var filteredReportsProvider = $('#reports-provider').val();
        var filteredReportsProduct = $('#reports-product').val();
        var filteredReportsStartDate = $('#reports-start-date').val();
        var filteredReportsEndDate = $('#reports-end-date').val();
        var filterReportsDocumentNumber = $('#reports-ducument-number').val();

        localStorage.setItem('filtered-reports-provider', filteredReportsProvider);
        localStorage.setItem('filtered-reports-product', filteredReportsProduct);
        localStorage.setItem('filtered-reports-start-date', filteredReportsStartDate);
        localStorage.setItem('filtered-reports-end-date', filteredReportsEndDate);
        localStorage.setItem('filtered-reports-document-number', filterReportsDocumentNumber);
    });

    $('#reports-provider').val(localStorage.getItem('filtered-reports-provider'));
    $('#reports-product').val(localStorage.getItem('filtered-reports-product'));
    $('#reports-start-date').val(localStorage.getItem('filtered-reports-start-date'));
    $('#reports-end-date').val(localStorage.getItem('filtered-reports-end-date'));
    $('#reports-ducument-number').val(localStorage.getItem('filtered-reports-document-number'));

    localStorage.removeItem('filtered-reports-provider');
    localStorage.removeItem('filtered-reports-product')
    localStorage.removeItem('filtered-reports-start-date');
    localStorage.removeItem('filtered-reports-end-date');
    localStorage.removeItem('filtered-reports-document-number');

});
