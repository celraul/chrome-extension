(function () {
    var selector = document.getElementsByClassName("caption-visual-line");

    if (selector) {
        var phrase = "";

        for (var i = 0; i < selector.length; i++) {
            var children = selector[i].children;
            if (children) {
                for (var j = 0; j < children.length; j++) {
                    if (children[j] && children[j].innerHTML) {
                        phrase += " " + children[j].innerHTML;
                    }
                }
            }
        }

        currentPhrase = phrase;
        return phrase;
    }

    currentPhrase = "";
    return "";
})();
