module.exports = {
    isOwner: function(request, response) {
        if (request.session.is_login) {
            // 로그인 되어 있으면
            return true;
        } else {
            return false;
        }
    },
    statusUI: function(request, response) {
        var authStatusUI = '<a href="/auth/login">login</a>';
        if (this.isOwner(request, response)) {
            authStatusUI = `${request.session.nickname} | <a href="/auth/logout">logout</a>`;
        }
        return authStatusUI;
    }
};
