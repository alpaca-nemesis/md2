/*! trans - 27-12-2019 */
let converter = new showdown.Converter(),
    container_edit = document.getElementById("editor-edit"),
    container_show = document.getElementById("editor-show"),
    container_catalog = document.getElementById("catalog");


// 将输入框中的 markdown 语句 转换为html 输出到 预览容器中
let translation = (function () {
    return function () {
        let temp = converter.makeHtml(container_edit.value);
        temp = temp.replace(/<h1 id="">/, "<h1 id=\"0\">")
        container_show.innerHTML = temp;
        container_catalog.innerHTML = makeCatalogs(temp);
        // 按比例调整 预览容器 的滚动条位置
        let ratio = container_edit.scrollTop / container_edit.scrollHeight;
        container_show.scrollTop = container_show.scrollHeight * ratio;
        container_catalog.scrollTop = container_catalog.scrollHeight * ratio;
    }
})();


makeCatalogs = function (text) {
    let newText = "<dl>"
    let temp = ""
    let index = 0
    text = text.replace(/<h1 id="">/, "<h1 id=\"0\">")
    // while (true) {
    //
    // }
    // text = text.replace(/<h1 id/, "dtttt");
    // text = text.replace(/<h1*<\/h1>/, "dt");
    // text = text.replace(/h2/g, "dd");
    // text = text.replace(/id="/g, "href=\"#");

    while (true) {

        temp = text.match(/<h[12].*?<\/h[12]>/);
        index = text.search(/<h[12].*?<\/h[12]>/);
        if (temp == null) {
            break
        } else {
            if (text.search(/<h1.*?<\/h1>/) == index) {
                temp = "<dt>" + temp + "</dt>"
                temp = temp.replace(/h1 id="/, "a href=\"#")
                newText += temp
            } else {
                temp = "<dd>" + temp + "</dd>"
                temp = temp.replace(/h2 id="/, "a href=\"#")
                newText += temp
            }
            text = text.replace(/<h[12].*?<\/h[12]>/, "")
        }
    }

    // while (true) {
    //     temp = text.match(/<h1.*?<\/h1>/);
    //     text = text.replace(/<h1.*?<\/h1>/, "")
    //     if (temp == null) {
    //         temp = text.match(/<h2.*?<\/h2>/);
    //         text = text.replace(/<h2.*?<\/h2>/, "")
    //         if (temp == null) {
    //             break
    //         } else {
    //             temp = "<dd>" + temp + "</dd>"
    //             temp = temp.replace(/h2 id="/, "a href=#\"")
    //             newText += temp
    //         }
    //     } else {
    //         temp = "<dt>" + temp + "</dt>"
    //         temp = temp.replace(/h1 id="/, "a href=#\"")
    //         newText += temp
    //     }
    // }


    // text = text.match(/<\/h1>/);

    newText += "</dl>"
    return newText;
};


// 监听输入框输入，实时将输入内容同步的右侧 预览框
container_edit.onkeyup = translation;
container_edit.onended = translation;
container_edit.onclick = translation;
window.onload = translation;

//监听鼠标进入 输入框范围 设置状态
container_edit.onmouseover = function () {
    container_show.classList.remove('cur');
    container_edit.classList.add('cur');
};
//监听鼠标离开 输入框范围 设置状态
container_edit.onmouseleave = function () {
    container_edit.classList.remove('cur')
};
//监听鼠标进入 预览容器范围 设置状态
container_show.onmouseover = function () {
    container_edit.classList.remove('cur')
    container_catalog.classList.remove('cur')
    container_show.classList.add('cur');
};
//监听鼠标离开 预览容器范围 设置状态
container_show.onmouseleave = function () {
    container_show.classList.remove('cur')
};

// 监听 输入框 内容滚动
container_edit.addEventListener('scroll', function () {
    // 若鼠标在 输入框范围内 则 以输入框为主 同步 预览容器内容滚动条高度
    if (hasClass(container_edit, "cur")) {
        let ratio = container_edit.scrollTop / container_edit.scrollHeight;
        container_show.scrollTop = container_show.scrollHeight * ratio;
    }
});

// 监听 预览容器 内容滚动
container_show.addEventListener('scroll', function () {
    // 若鼠标在 预览范围内 则 以 预览容器为主 同步 输入框内容滚动条高度
    if (hasClass(container_show, "cur")) {
        let ratio = container_show.scrollTop / container_show.scrollHeight;
        container_edit.scrollTop = container_edit.scrollHeight * ratio;
    }
});

// 判断 dom对象是否含有 指定 class 属性
var hasClass = (function () {
    var div = document.createElement("div");
    if ("classList" in div && typeof div.classList.contains === "function") {
        return function (elem, className) {
            return elem.classList.contains(className);
        };
    } else {
        return function (elem, className) {
            var classes = elem.className.split(/\s+/);
            for (var i = 0; i < classes.length; i++) {
                if (classes[i] === className) return true;
            }
            return false;
        };
    }
})();