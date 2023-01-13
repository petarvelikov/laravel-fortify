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


    // grand total price on report deliveries
    function total() {
        var total = 0;
        $('.report-deliveries-total-sum').each(function(i, e) {
            var getedTotalPrice = $(this).text();
            var totalPrice = getedTotalPrice.replace(/,/g, '') * 1;
            total += totalPrice;
        });
        $('#report-deliveries-grand-total-sum').text(total.toFixed(5));
    }

    total();


    // Draw graph
    function drawWeight() {
        var labelsArr = [];
        var dataArr = [];

        $('.filter-unit-price').each(function () {
            var unitPrice = parseFloat($(this).html().replace(' ', ''));
            if (!isNaN(unitPrice)) {
                dataArr.push(unitPrice);
            }
        });

        $('.filter-date').each(function () {
            var date = $(this).html();
            labelsArr.push(date);
        });

        labelsArr.reverse();
        dataArr.reverse();

        setTimeout(function(){
            var ctx = document.getElementById('myChart').getContext('2d');
            ctx.height = 360;
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labelsArr,
                    datasets: [{
                        data: dataArr,
                        fill: false,
                        borderColor: 'rgba(33,150,243,1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    scales: {
                        xAxes: [{
                            type: 'category'
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }, 150);
    }

    drawWeight();

});
