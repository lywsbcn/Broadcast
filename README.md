# Broadcast

```
Broadcast.default().addListener(this, "balanceUpdate", this.balanceUpdate);

Broadcast.default().addListener(this, "statusUpdate", this.statusUpdate);


Broadcast.default().post("balanceUpdate", 10000);
Broadcast.default().post("statusUpdate", 2);

Broadcast.default().removeListener(this)
```
