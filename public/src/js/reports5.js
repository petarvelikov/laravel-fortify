$(document).ready(function () {

    // Save input values on filtring
    $('#btn-filter-reports').on('click', function () {
        var filteredReportsType = $('#reports-type').val();
        var filteredReportsStartDate = $('#reports-start-date').val();
        var filteredReportsEndDate = $('#reports-end-date').val();

        localStorage.setItem('filtered-reports-type', filteredReportsType);
        localStorage.setItem('filtered-reports-start-date', filteredReportsStartDate);
        localStorage.setItem('filtered-reports-end-date', filteredReportsEndDate);
    });

    $('#reports-type').val(localStorage.getItem('filtered-reports-type'));
    $('#reports-start-date').val(localStorage.getItem('filtered-reports-start-date'));
    $('#reports-end-date').val(localStorage.getItem('filtered-reports-end-date'));

    localStorage.removeItem('filtered-reports-type');
    localStorage.removeItem('filtered-reports-start-date');
    localStorage.removeItem('filtered-reports-end-date');


    // Draw graph
    function drawWeight() {
        var labelsArr = [];
        var dataArr = [];
        var sum = 0;

        $('.filter-quantity').each(function () {
            var quantity = parseFloat($(this).html().replace(' ', ''));
            if (!isNaN(quantity)) {
                sum += quantity;
                dataArr.push(quantity);
            }
        });

        $('.filter-date').each(function () {
            var date = $(this).html();
            labelsArr.push(date);
        });

        setTimeout(function(){
            $('.total-quantity').html('Общо: ' + sum);
            var ctx = document.getElementById('myChart').getContext('2d');
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
