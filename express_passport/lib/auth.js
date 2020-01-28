module.exports = {
    isOwner: function(request, response) {
        if (request.user) {
            // 로그인 되어 있으면
            return true;
        } else {
            return false;
        }
    },
    statusUI: function(request, response) {
        var authStatusUI = `<a href="/auth/login">login</a> | <a href="/auth/google">Login with Google</a>`;
        if (this.isOwner(request, response)) {
            authStatusUI = `${request.user.nickname} | <a href="/auth/logout">logout</a>`;
        }
        return authStatusUI;
    }
};
