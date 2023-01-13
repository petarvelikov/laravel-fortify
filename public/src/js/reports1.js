$(document).ready(function () {

    // Keep selectBox and input values after filtering for weight report using browser local storage
    $('#btn-filter-reports').on('click', function() {

        var filteredReportsRecipeGroup = $('#reports-recipe-group').val();
        var filteredReportsRecipe = $('#reports-recipe').val();
        var filteredReportsStartDate = $('#reports-start-date').val();
        var filteredReportsEndDate = $('#reports-end-date').val();

        localStorage.setItem('filtered-reports-recipe-group', filteredReportsRecipeGroup);
        localStorage.setItem('filtered-reports-recipe', filteredReportsRecipe);
        localStorage.setItem('filtered-reports-start-date', filteredReportsStartDate);
        localStorage.setItem('filtered-reports-end-date', filteredReportsEndDate);
    });

    $('#reports-recipe-group').val(localStorage.getItem('filtered-reports-recipe-group'));
    $('#reports-start-date').val(localStorage.getItem('filtered-reports-start-date'));
    $('#reports-end-date').val(localStorage.getItem('filtered-reports-end-date'));

    // Ajax for compared selectBox on report recipe
    var recipeGroupId = $('#reports-recipe-group').val();
    $.get('/ajax-reports-get-repipes-from-group?recipeGroupId=' + recipeGroupId, function (data) {
        // recipes data
        if (recipeGroupId) {
            $('#reports-recipe').empty();
        }
        $.each(data, function(index, recipesObj) {
            $('#reports-recipe').append('<option value="'+recipesObj.id+'">'+recipesObj.title+'</option>').sortSelect();
        });
        $('#reports-recipe').prepend('<option value="" disabled selected>Изберете рецепта</option>').prop('selectedIndex', 0);
    });


    setTimeout(function () {
        $('#reports-recipe').val(localStorage.getItem('filtered-reports-recipe'));
        localStorage.removeItem('filtered-reports-recipe');
    }, 500);

    localStorage.removeItem('filtered-reports-recipe-group');
    localStorage.removeItem('filtered-reports-start-date');
    localStorage.removeItem('filtered-reports-end-date');

    // Ajax reports on recipes - get recipe from group
    $('#reports-recipe-group').on('change', function () {
        var recipeGroupId = $('#reports-recipe-group').val();
        $.get('/ajax-reports-get-repipes-from-group?recipeGroupId=' + recipeGroupId, function (data) {
            // recipes data
            if (recipeGroupId) {
                $('#reports-recipe').empty();
            }
            $.each(data, function(index, recipesObj) {
                $('#reports-recipe').append('<option value="'+recipesObj.id+'">'+recipesObj.title+'</option>').sortSelect();
            });
            $('#reports-recipe').prepend('<option value="" disabled selected>Изберете рецепта</option>').prop('selectedIndex', 0);
        });
    });


    // Draw graph
    function drawWeight() {
        var labelsArr = [];
        var dataArr = [];
        var sum = 0;

        $('.filter-quantity').each(function () {
            var quantity = parseFloat($(this).html().replace(' ', ''))
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

    $('#btn-filter-reports').on('click', function() {
        drawWeight();
    });

});
