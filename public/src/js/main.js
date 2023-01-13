$(document).ready(() => {

    // Sorting function for selectBox after ajax - MY
    $.fn.sortSelect = function () {
        var op = this.children("option");
        op.sort(function (a, b) {
            return a.text > b.text ? 1 : -1;
        })
        return this.empty().append(op);
    }


    // DatePichker
    $('.datepicker-input-dafault, .datepicker-input-dafault-today').datepicker({
        language: 'bg',
        format: 'yyyy-mm-dd',
        calendarWeeks: true,
        autoclose: true,
        todayBtn: 'linked',
        todayHighlight: true,
        weekStart: 1
    });

    $(".datepicker-input-dafault-today").datepicker().datepicker("setDate", new Date());


    // Focusable input
    $('.focusable-input').focus();


    // validate input form -> number
    $('.input-number-validation').on('keydown', function (e) {
        // Change coma "," with punct "." in inputs
        if (e.keyCode === 188 || e.keyCode === 108) {
            this.value += '.';
            e.preventDefault();
        }
    }).numeric({ negative: false });


    // Confirm dialog on delete
    $('.delete-item-form').on('click', function () {
        var confirmDeleteDialog = confirm("Наистина ли желаете да изтриете този запис?");
        if (confirmDeleteDialog) {
            return true;
        } else {
            return false;
        }
    });

});
