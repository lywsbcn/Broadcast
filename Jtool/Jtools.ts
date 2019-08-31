class Jtool {

    /**
       根据a 返回日期格式
       b==nl 返回 2016-12-21 12:20:30 (默认)
       b==ns 返回 2016-10-20
       b==nm 返回 2016-10-20 12:20
       b==bl 返回 2017/05/17 21:17:00 
       b==bs 返回 2017/05/17
       b==zs 返回 2016年12月21日
       b==zl 返回 2016年12月21日 12:20:30
       b==ss 返回 20161221122030123
       b==ts 返回 12:20:30
       b==arr 返回 [Y,M,D,H,m,s,ms,week] 数组
       
       c   返回多少天后的日期,默认为0
       如果为负数 -30表示30天前
       
       a 只接受数字类型,如果 a==0 则表示今天的日期
       默认为0
       */
    public static unixToStr(a?, b?, c?): any {
        a = parseInt(a);
        a = isNaN(a) ? 0 : a;
        b = b === void 0 ? "nl" : b;
        c = c === void 0 ? 0 : c;
        var d = a == 0 ? new Date() : new Date(a * 1000);
        d.setDate(d.getDate() + c);

        var Y = d.getFullYear();
        var M = d.getMonth() + 1;
        var D = d.getDate();
        var H = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var t = d.getMilliseconds();
        var w = d.getDay();

        var Y_s = String(Y);
        var M_s = M < 10 ? ("0" + M) : M;
        var D_s = D < 10 ? ("0" + D) : D;
        var H_s = H < 10 ? ("0" + H) : H;
        var m_s = m < 10 ? ("0" + m) : m;
        var s_s = s < 10 ? ("0" + s) : s;
        var t_s = t < 10 ? ("00" + t) : t < 100 ? ("0" + t) : t;

        switch (b) {
            case "ns":
                return Y_s + "-" + M_s + "-" + D_s;
            case "nl":
                return Y_s + "-" + M_s + "-" + D_s + " " + H_s + ":" + m_s + ":" + s_s;
            case "bs":
                return Y_s + "/" + M_s + "/" + D_s;
            case "bl":
                return Y_s + "/" + M_s + "/" + D_s + " " + H_s + ":" + m_s + ":" + s_s;
            case "zs":
                return Y_s + "年" + M_s + "月" + D_s + "日";
            case "zl":
                return Y_s + "年" + M_s + "月" + D_s + "日 " + H_s + ":" + m_s + ":" + s_s;
            case "ss":
                return Y_s + M_s + D_s + H_s + m_s + s_s + t_s + "";
            case "ts":
                return H_s + ":" + m_s + ":" + s_s;
            case "arr":
                return [Y, M_s, D_s, H, m_s, s_s, t_s, w];
            case "obj":
                return { Y: Y, M: M_s, D: D_s, H: H, m: m_s, s: s_s, t: t_s, w: w };
            default:
                return Y_s + "-" + M_s + "-" + D_s + " " + H_s + ":" + m_s + ":" + s_s;
        }
    }


    /**
       根据日期 转换成unix格式
       参数t有2个值,
       t=="s" 返回从00:00:00 开始
       t=="e" 返回到23:59:59 结束
       date接受一个日期型的字符串,默认为今天
       
       如果 转换失败,返回当前时间 的 unix
       */

    public static dateToUnix(a?, b?) {

        if (a === void 0 || a == 0 || isNaN(Date.parse(a))) {
            if (!b) { a = this.unixToStr(0) }
            else a = this.unixToStr(0, "ns")
        }
        switch (b) {
            case "e":
                a += " 23:59:59";
                break;
            case "s":
                a += " 00:00:00";
                break;
        }

        var new_str = a.replace(/:/g, "-");
        new_str = new_str.replace(/ /g, "-");
        var arr = new_str.split("-");

        if (arr.length == 3) {

            let dd = new Date();
            let h = dd.getHours(),
                m = dd.getMinutes(),
                s = dd.getSeconds();

            new_str += '-' + h + "-" + m + "-" + s;
            var arr = new_str.split("-");

        }

        var datum = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
        var strtotime = datum.getTime() / 1000;

        return strtotime;
    }


    /**
    arr_to_obj
    对象数组转对象
    [
        {id:1,name:"abc"},
        {id:2,name:"cde"}
    ]-->
    {1:abc,2:"cde"}
    
    */
    public static ato(a: Array<any>, b: string, c: string) {
        var x = new Object();
        for (var y in a) {
            x[a[y][b]] = a[y][c]
        }
        return x;
    }

    public static ata(a: Array<any>, b: string, c: string): Array<Array<string>> {
        var x = [];
        for (var y in a) {
            x.push([a[y][b], a[y][c]])
        }
        return x;
    }

    /**
     * 更新對象
     * @param source    //被更新的對象
     * @param value     //新值
     */
    public static setData(source: object, value: object) {

        if (!source || !value) return;

        for (var x in value) {

            var d = value[x];

            if (Array.isArray(d)) {

                source[x] = d;
            }

            if (typeof (d) === "object") {

                this.setData(source[x], d);

                continue;
            }

            source[x] = d;
        }

    }

    public static cookie(name, value, options?: JtoolCookieOption) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };

}



function int(a: any) {
    let b = parseInt(a);
    return isNaN(b) ? 0 : b;
}

function float(a: any) {
    let b = parseFloat(a);
    return isNaN(b) ? 0 : b;
}
