# Broadcast �㲥

```
# ��ӹ㲥����
Broadcast.default().addListener(this, "balanceUpdate", this.balanceUpdate);

Broadcast.default().addListener(this, "statusUpdate", this.statusUpdate);

# ���͹㲥
Broadcast.default().post("balanceUpdate", 10000);
Broadcast.default().post("statusUpdate", 2);

# ɾ���㲥
Broadcast.default().removeListener(this)
```

# javascript ��չ
```

# ���� dom �������ʽ,ע��÷����Ḳ��ԭ������ʽ(css�ļ��ڵĳ���)
Element.prototype.setStyle(); 

# ��:
  var demo = document.getElementById("demo")
  demo.setStrle({
    "background-color":"#fff",
	"color":"#000"
  })

# ���� dom �������ʽ,ע��:�������Ʊ���ʹ�� �շ���������
 Element.prototype.updateStyle();

 demo.updateStrle({
	backgroundColor:"#fff",
	color:"#000"
 })

 ...

```

# Jform ���ٻ�ȡ�������ñ�����

```

Jform.get(element: Element, selector = 'name');

Jform.set(element: Element, data: Object, selector: string = "name")

```

# Toast 

```
Toast.title(title, duration = 3000);

```

# �Զ��� ��ͼ

```

    <link href="jui.css" rel="stylesheet" />

	
    <ul class="jui-demo">

        <li>
            <x-switch checked name="switch"><span>��</span><span>��</span></x-switch>
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
                <a checked value="1">����</a>
                <a value="2">����C</a>
                <a value="3">������</a>
                <a value="4">����</a>
            </x-enum>
        </li>

        <li>
            <x-tab>
                <x-tab-button>
                    <x-i selected tabname="a1">����</x-i>
                    <x-i tabname="a2">����</x-i>
                    <x-i tabname="a3">����</x-i>
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