const svgCopy = '<i class="CBox_icn"></i>'
const svgCheck = '<i class="CBox_icn copied"></i>'
const addCopyButtons = (clipboard) => {
    document.querySelectorAll("pre > code").forEach((codeBlock) => {
        // Create button DOM element
        const button = document.createElement("button");
        button.className = "C_box_main";
        button.type = "button";
        button.innerHTML = svgCopy;
        button.addEventListener("click", () => {
            clipboard.writeText(codeBlock.innerText).then(() => {
                button.classList.add("copied");
                document.getElementById("LefttNotif").innerHTML = "<span>Copied to Clipboard!</span>";
                setTimeout(() => {
                    button.classList.remove("copied")
                }, 3e3);
                console.log('Text Copy');
            }, (error) => (button.innerHTML = "Error"));
        });
        // Attach button to DOM (.highlight > button > pre > code)
        const pre = codeBlock.parentNode;
        pre.parentNode.insertBefore(button, pre);
    });
};

if (navigator && navigator.clipboard) {
    addCopyButtons(navigator.clipboard);
} else {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/clipboard-polyfill/2.7.0/clipboard-polyfill.promise.js";
    script.integrity = "sha256-waClS2re9NUbXRsryKoof+F9qc1gjjIhc2eT7ZbIv94=";
    script.crossOrigin = "anonymous";
    script.onload = () => addCopyButtons(clipboard);
    document.body.appendChild(script);
}



(function() {
    var pre = document.getElementsByTagName('pre'),
        pl = pre.length;
    for (var i = 0; i < pl; i++) {
        pre[i].innerHTML = '<span class="line-number"></span>' + pre[i].innerHTML + '<span class="cl"></span>';
        var num = pre[i].innerHTML.split(/\n/).length;
        for (var j = 0; j < num; j++) {
            var line_num = pre[i].getElementsByTagName('span')[0];
            line_num.innerHTML += '<span>' + (j + 1) + '</span>';
        }
    }
})();
