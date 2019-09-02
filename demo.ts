let test = 10000;


window.addEventListener('load', function () {

    let file = <HTMLInputElement> document.getElementById('file');
    file.addEventListener('change', function () {

        let fd = new FormData();
        fd.append('file', this.files.item(0));

        http.xmlAjax_request({
            url: "http://www.a.com/demo/upload/upload.php",
            type: "post",
            data: fd,
            success: function () {

            }
        })

        this.value = ''
    })

})