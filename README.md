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
Element.prototype.setStyle(); 

# 如:
  var demo = document.getElementById("demo")
  demo.setStrle({
    "background-color":"#fff",
	"color":"#000"
  })

# 更新 dom 对象的样式,注意:属性名称必须使用 驼峰命名规则
 Element.prototype.updateStyle();

 demo.updateStrle({
	backgroundColor:"#fff",
	color:"#000"
 })

 ...

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