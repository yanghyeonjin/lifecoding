$(document).ready(function () {
    $('.control ul li a').on('click', function (e) {
        e.preventDefault();

        // 실제 페이지 이동 없이 url만 변경
        history.pushState(null, null, e.target.href);

        // e.target.href에 해당하는 웹페이지에서 article 직계자손 중 .content를 가져온다. (태그를 포함)
        // article 아래 내용이 .content 태그로 바뀜.
        $('article').load(e.target.href + ' article>.content');
    })

    // back
    $(window).on('popstate', function (e) {
        $('article').load(location.href + ' article>.content');
    })
})