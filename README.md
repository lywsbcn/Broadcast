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
Element.prototype.setStyle = function (style: StyleStringInterface)

# ��:
  var demo = document.getElementById("demo")
  demo.setStrle({
    "background-color":"#fff",
	"color":"#000"
  })

# ���� dom �������ʽ,ע��:�������Ʊ���ʹ�� �շ���������
Element.prototype.updateStyle = function (style: StyleInterface)

 demo.updateStrle({
	backgroundColor:"#fff",
	color:"#000"
 })

# ���� at ����
Element.prototype.at = function (action: string)

# ��� �Ӷ���
Element.prototype.addSubview = function ()

	let sub1 = documnet.createElement('span');
	let sub2 = documnet.createElement('span');

	demo.addSubview(sub1,sub2);

# ���� innerHTML
Element.prototype.html = function (string)

# ����ѡ���� ��ȡ ����dom����,û���ҵ����� null
Element.prototype.parent = function (selector?) 

#HTMLInputElement
	intVal    #��ȡ�� intֵ
	floatVal  #��ȡ�� floatֵ
	md5Val    #��ȡ�� md5ֵ
	unitVal(a: 's'|'e') #��ȡ�� unitʱ���ֵ

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
	*  select.sub({"1":"����",2:"ͣ��"})
	*
	*/

#String
 #ȥ����β�ո�
 String.prototype.trim = function ()

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