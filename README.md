# Broadcast 广播

```
# 添加广播监听
Broadcast.default().addListener(this, "balanceUpdate", this.balanceUpdate);

Broadcast.default().addListener(this, "statusUpdate", this.statusUpdate);

# 发送广播
Broadcast.default().post("balanceUpdate", 10000);
Broadcast.default().post("statusUpdate", 2);

# 删除广播
Broadcast.default().removeListener(this)
```

# javascript 扩展
```

# 设置 dom 对象的样式,注意该方法会覆盖原来的样式(css文件内的除外)
Element.prototype.setStyle = function (style: StyleStringInterface)

# 如:
  var demo = document.getElementById("demo")
  demo.setStrle({
    "background-color":"#fff",
	"color":"#000"
  })

# 更新 dom 对象的样式,注意:属性名称必须使用 驼峰命名规则
Element.prototype.updateStyle = function (style: StyleInterface)

 demo.updateStrle({
	backgroundColor:"#fff",
	color:"#000"
 })

# 设置 at 属性
Element.prototype.at = function (action: string)

# 添加 子对象
Element.prototype.addSubview = function ()

	let sub1 = documnet.createElement('span');
	let sub2 = documnet.createElement('span');

	demo.addSubview(sub1,sub2);

# 设置 innerHTML
Element.prototype.html = function (string)

# 根据选择器 获取 父级dom对象,没有找到返回 null
Element.prototype.parent = function (selector?) 

#HTMLInputElement
	intVal    #获取表单 int值
	floatVal  #获取表单 float值
	md5Val    #获取表单 md5值
	unitVal(a: 's'|'e') #获取表单 unit时间戳值

    /**
	* <input id='input' />
	*
	*  let input = document.getElementById('input');
    *  let iv = input.intVal;
	*  let fv = input.floatVal;
	*  let md5 = input.md5Val;
	*  let unit = input.unitVal('s');
	*/

#HTMLSelectElement
HTMLSelectElement.prototype.sub = function (item, selected)

    /**
	* <select id='select' /></select>
	*
	*  let select = document.getElementById('select');
	*  select.sub({"1":"启用",2:"停用"})
	*
	*/

#String
 #去除首尾空格
 String.prototype.trim = function ()

```

# Jform 快速获取或者设置表单数据

```

Jform.get(element: Element, selector = 'name');

Jform.set(element: Element, data: Object, selector: string = "name")

```

# Toast 

```
Toast.title(title, duration = 3000);

```

# 自定义 视图

```

    <link href="jui.css" rel="stylesheet" />

	
    <ul class="jui-demo">

        <li>
            <x-switch checked name="switch"><span>是</span><span>否</span></x-switch>
        </li>
        <li>
            <x-switch-ios checked name="switch_ios"></x-switch-ios>
        </li>
        <li>
            <x-checkbox checked value="1" name="x_checkbox"></x-checkbox>
        </li>

        <li>
            <x-radio name="ratio2" value="1" checked>ratio</x-radio>
            <x-radio name="ratio2" value="2">ratio</x-radio>
        </li>
        <li>
            <x-enum name="enum">
                <a checked value="1">正常</a>
                <a value="2">待驗證</a>
                <a value="3">待審核</a>
                <a value="4">禁用</a>
            </x-enum>
        </li>

        <li>
            <x-tab>
                <x-tab-button>
                    <x-i selected tabname="a1">中文</x-i>
                    <x-i tabname="a2">中文</x-i>
                    <x-i tabname="a3">中文</x-i>
                </x-tab-button>
                <x-tab-content>
                    <textarea tabname="a1" selected>1</textarea>
                    <textarea tabname="a2">2</textarea>
                    <textarea tabname="a3">3</textarea>
                </x-tab-content>
            </x-tab>

        </li>

    </ul>

```