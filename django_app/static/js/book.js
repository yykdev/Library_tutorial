$(function () {

    var loadForm = function() {
        // 현재 함수를 호출하는 객체 자체를 btn 변수에 담는다.
        var btn = $(this);
        $.ajax({
            url: btn.attr('data-url'),
            type: 'get',
            dataType: 'json',
            beforeSend: function(){
                $("#modal-book").modal("show");
            },
            success: function( data ) {
                $('#modal-book .modal-content').html(data.html_form);
            }
        });
    };

    var saveForm = function() {
        var form = $(this);

        $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            type: form.attr('method'),
            dataType: 'json',
            success: function( data ) {
                if ( data.form_is_valid ) {
                    $("#book-table tbody").html(data.html_book_list);
                    $("#modal-book").modal("hide");
                } else {
                    $("#modal-book .modal-content").html(data.html_form);
                }
            }
        });
        return false;
    };


    $(".js-create-book").click(loadForm);
    $("#modal-book").on("submit", ".js-book-create-form", saveForm);

    $("#book-table").on("click", ".js-update-book", loadForm);
    $("#modal-book").on("submit", ".js-book-update-form", saveForm);

    $("#book-table").on("click", ".js-delete-book", loadForm);
    $("#modal-book").on("submit", ".js-book-delete-form", saveForm);

// form 렌더링과 form 데이터 전송시 실행 되는 ajax 로직을 각각 함수로 리팩토링 하면,
// 폼 렌더링이나 데이터 전송이 이루어질 때 버튼의 액션에 form 함수를 실행 시킴으로써 반복 되는 로직을
// 재사용 하는 형태로 소스 간소화가 이루어 진다.
//
//    $(".js-create-book").click( function() {
//        $.ajax({
//            url: '/book/create/',
//            type: 'get',
//            dataType: 'json',
//            beforeSend: function () {
//                $("#modal-book").modal("show");
//            },
//            success: function (data) {
//                $('#modal-book .modal-content').html(data.html_form);
//            }
//        })
//    });
//
//    $("#modal-book").on("submit", ".js-book-create-form", function() {
//        var form = $(this);
//        $.ajax({
//            url: form.attr("action"),
//            data: form.serialize(),
//            type: form.attr("method"),
//            dataType: 'json',
//            success: function (data) {
//                if (data.form_is_valid) {
//                    $("#book-table tbody").html(data.html_book_list);
//                    $("#modal-book").modal("hide");
//                } else {
//                    $("#modal-book .modal-content").html(data.html_form);
//                }
//            }
//        });
//        return false;
//    });

});