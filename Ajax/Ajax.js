var http = /** @class */ (function () {
    function http() {
    }
    http.upload = function (url, param, success, error, isloading) {
        var _this = this;
        if (isloading === void 0) { isloading = true; }
        isloading && window['Loading'] && Loading.start();
        this.xmlAjax_request({
            url: url,
            data: param,
            success: function (data, status, XHR) { _this.xmlResponse(data, success, XHR); },
            error: function (XHR, status, err) { _this.xmlError(XHR, error, err); }
        });
    };
    http.json = function (url, param, success, error, isloading) {
        var _this = this;
        if (isloading === void 0) { isloading = true; }
        isloading && window['Loading'] && Loading.start();
        this.xmlAjax_json({
            url: url,
            data: JSON.stringify(param),
            success: function (data, status, XHR) { _this.xmlResponse(data, success, XHR); },
            error: function (XHR, status, err) { _this.xmlError(XHR, error, err); }
        });
    };
    http.get = function (url, param, success, error, isloading) {
        var _this = this;
        if (isloading === void 0) { isloading = true; }
        isloading && window['Loading'] && Loading.start();
        this.xmlAjax_get({
            url: url,
            data: param,
            success: function (data, status, XHR) { _this.xmlResponse(data, success, XHR); },
            error: function (XHR, status, err) { _this.xmlError(XHR, error, err); }
        });
    };
    http.post = function (url, param, success, error, isloading) {
        var _this = this;
        if (isloading === void 0) { isloading = true; }
        isloading && window['Loading'] && Loading.start();
        this.xmlAjax_post({
            url: url,
            data: param,
            success: function (data, status, XHR) { _this.xmlResponse(data, success, XHR); },
            error: function (XHR, status, err) { _this.xmlError(XHR, error, err); }
        });
    };
    /**
     * 请求成功
     * @param data
     * @param callback
     * @param jqXHR
     */
    http.xmlResponse = function (data, callback, XHR) {
        window['Loading'] && Loading.stop();
        try {
            data = JSON.parse(data);
        }
        catch (e) {
        }
        typeof (callback) === "function" && callback(data);
    };
    /**
     * 请求 错误 status !=200
     * @param jqXHR
     * @param textStatus
     * @param errorThrown
     */
    http.xmlError = function (XHR, callback, errorThrown) {
        window['Loading'] && Loading.stop();
        console.log("ajax_error", XHR.status);
        console.log(JSON.stringify(XHR));
        typeof (callback) === 'function' && callback(XHR);
    };
    http.xmlAjax_json = function (setting) {
        setting.type = 'POST';
        var _s = {
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        };
        this.setData(_s, setting);
        this.xmlAjax_request(_s);
    };
    http.xmlAjax_post = function (setting) {
        setting.type = 'POST';
        var _s = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };
        this.setData(_s, setting);
        this.xmlAjax_request(_s);
    };
    http.xmlAjax_get = function (setting) {
        setting.type = 'GET';
        this.xmlAjax_request(setting);
    };
    http.xmlAjax_request = function (settings) {
        var xmlhttp = new XMLHttpRequest();
        var _s = {
            url: '',
            type: 'GET',
            dataType: 'json',
            async: true,
            data: null,
            headers: {},
            timeout: 1000,
            beforeSend: function (xhr) {
            },
            success: function (result, status, xhr) {
            },
            error: function (xhr, status, error) {
            },
            complete: function (xhr, status) {
            }
        };
        this.setData(_s, settings);
        xmlhttp.onloadstart = function (e) {
            typeof (_s.beforeSend) === 'function' && _s.beforeSend(xmlhttp);
        };
        xmlhttp.onload = function (e) {
            var status = xmlhttp.status;
            if ((status >= 200 && status < 300) || status === 304) {
                var result = void 0;
                if (xmlhttp.responseType === 'text') {
                    result = xmlhttp.responseText;
                }
                else if (xmlhttp.responseType === 'document') {
                    result = xmlhttp.responseXML;
                }
                else {
                    result = xmlhttp.response;
                }
                // 注意:状态码200表示请求发送/接受成功,不表示业务处理成功
                typeof (_s.success) === 'function' && _s.success(result, status, xmlhttp);
            }
            else {
                typeof (_s.error) === 'function' && _s.error(xmlhttp, status, e);
            }
        };
        xmlhttp.onloadend = function (e) {
            typeof (_s.complete) === 'function' && _s.complete(xmlhttp, xmlhttp.status);
        };
        xmlhttp.onerror = function (e) {
            typeof (_s.error) === 'function' && _s.error(xmlhttp, status, e);
        };
        xmlhttp.ontimeout = function (e) {
            typeof (_s.error) === 'function' && _s.error(xmlhttp, 408, e);
        };
        _s.type = _s.type.toLocaleUpperCase();
        var useUrlParam = false;
        if (_s.type === 'GET' || _s.type === 'DELETE') {
            useUrlParam = true;
            _s.url += _s.url.indexOf("?") == -1 ? "?" : "&";
            _s.url += this.urlEncode(_s.data);
        }
        xmlhttp.open(_s.type, _s.url, _s.async);
        xmlhttp.responseType = _s.dataType;
        // 设置请求头
        for (var _i = 0, _a = Object.keys(_s.headers); _i < _a.length; _i++) {
            var key = _a[_i];
            xmlhttp.setRequestHeader(key, _s.headers[key]);
        }
        // 设置超时时间
        if (_s.async && _s.timeout) {
            xmlhttp.timeout = _s.timeout;
        }
        // 发送请求.如果是简单请求,请求参数应为null.否则,请求参数类型需要和请求头Content-Type对应
        xmlhttp.send(useUrlParam ? null : this.getQueryData(_s.data));
    };
    http.urlEncode = function (param, key, encode) {
        if (param == null)
            return '';
        var paramStr = '';
        var t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
        }
        else {
            for (var i in param) {
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '[' + i + ']');
                //var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);  
                paramStr += this.urlEncode(param[i], k, encode);
            }
        }
        return paramStr;
    };
    ;
    // 获取ajax请求参数
    http.getQueryData = function (data) {
        if (!data) {
            return null;
        }
        if (typeof data === 'string') {
            return data;
        }
        if (data instanceof FormData) {
            return data;
        }
        return this.urlEncode(data);
    };
    // 把对象转为查询字符串
    http.getQueryString = function (data) {
        var _this = this;
        var paramsArr = [];
        if (data instanceof Object) {
            Object.keys(data).forEach(function (key) {
                var val = data[key];
                // todo 参数Date类型需要根据后台api酌情处理
                if (val instanceof Date) {
                    val = _this.dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
                }
                paramsArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
            });
        }
        return paramsArr.join('&');
    };
    /**
     * 更新對象
     * @param source    //被更新的對象
     * @param value     //新值
     */
    http.setData = function (source, value) {
        if (!source || !value)
            return;
        for (var x in value) {
            if (x == 'data') {
                source[x] = value[x];
            }
            var d = value[x];
            if (Array.isArray(d)) {
                source[x] = d;
            }
            if (typeof (d) === "object") {
                source[x] === void 0 && (source[x] = {});
                this.setData(source[x], d);
                continue;
            }
            source[x] = d;
        }
    };
    http.dateFormat = function (date, sFormat) {
        if (sFormat === void 0) { sFormat = 'yyyy-MM-dd'; }
        if (!(date instanceof Date)) {
            return;
        }
        var time = {
            Year: 0,
            TYear: '0',
            Month: 0,
            TMonth: '0',
            Day: 0,
            TDay: '0',
            Hour: 0,
            THour: '0',
            hour: 0,
            Thour: '0',
            Minute: 0,
            TMinute: '0',
            Second: 0,
            TSecond: '0',
            Millisecond: 0
        };
        time.Year = date.getFullYear();
        time.TYear = String(time.Year).substr(2);
        time.Month = date.getMonth() + 1;
        time.TMonth = time.Month < 10 ? '0' + time.Month : String(time.Month);
        time.Day = date.getDate();
        time.TDay = time.Day < 10 ? '0' + time.Day : String(time.Day);
        time.Hour = date.getHours();
        time.THour = time.Hour < 10 ? '0' + time.Hour : String(time.Hour);
        time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
        time.Thour = time.hour < 10 ? '0' + time.hour : String(time.hour);
        time.Minute = date.getMinutes();
        time.TMinute = time.Minute < 10 ? '0' + time.Minute : String(time.Minute);
        time.Second = date.getSeconds();
        time.TSecond = time.Second < 10 ? '0' + time.Second : String(time.Second);
        time.Millisecond = date.getMilliseconds();
        return sFormat.replace(/yyyy/ig, String(time.Year))
            .replace(/yyy/ig, String(time.Year))
            .replace(/yy/ig, time.TYear)
            .replace(/y/ig, time.TYear)
            .replace(/MM/g, time.TMonth)
            .replace(/M/g, String(time.Month))
            .replace(/dd/ig, time.TDay)
            .replace(/d/ig, String(time.Day))
            .replace(/HH/g, time.THour)
            .replace(/H/g, String(time.Hour))
            .replace(/hh/g, time.Thour)
            .replace(/h/g, String(time.hour))
            .replace(/mm/g, time.TMinute)
            .replace(/m/g, String(time.Minute))
            .replace(/ss/ig, time.TSecond)
            .replace(/s/ig, String(time.Second))
            .replace(/fff/ig, String(time.Millisecond));
    };
    return http;
}());
http.xmlAjax_get({
    url: 'http://www.a.com/demo/upload/request.php',
    data: { a: "a", b: { c: "1", d: [1, 11, 2] } },
    type: "post",
    dataType: 'json',
    success: function (d) {
        console.log(d);
    }
});
//# sourceMappingURL=Ajax.js.map