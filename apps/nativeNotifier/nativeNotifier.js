const NativeNotifier = function () {
  const os = require('os').type().trim();
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/nativeNotifier";
  this.moduleDir = `${this.dir}/module`;
  this.notifier = null;
  this.os = os;
  this.icon = {
    main: {
      png: this.moduleDir + "/vendor/icon.png",
      icns: this.moduleDir + "/vendor/icon.icns"
    },
    prompt: {
      png: this.moduleDir + "/vendor/prompt.png",
      icns: this.moduleDir + "/vendor/prompt.icns"
    },
    alert: {
      png: this.moduleDir + "/vendor/alert.png",
      icns: this.moduleDir + "/vendor/alert.icns"
    },
  };
  if (/Linux/gi.test(os)) {
    const NotifySend = require(`${this.moduleDir}/notifysend`);
    this.notifier = new NotifySend({ withFallback: true });
  } else if (/Darwin/gi.test(os)) {
    const NotificationCenter = require(`${this.moduleDir}/notificationcenter`);
    this.notifier = new NotificationCenter({ withFallback: true });
  } else if (/Windows/gi.test(os)) {
    const WindowsToaster = require(`${this.moduleDir}/toaster`);
    this.notifier = new WindowsToaster({ withFallback: true });
  } else {
    throw new Error("unknown os");
  }
}

NativeNotifier.prototype.sendAlarm = function (message, callback = function () {}) {
  if (typeof message !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { notifier, icon } = this;
  return new Promise((resolve, reject) => {
    notifier.notify({
        title: '',
        message,
        icon: icon.main.png,
        sound: true,
        wait: true
      }, (err, response, metadata) => {
      if (err) {
        reject(err);
      } else {
        metadata.type = metadata.activationType;
        delete metadata.activationType;
        metadata.activationAt = new Date(metadata.activationAt.split(' ').slice(0, 2).join(' '));
        metadata.deliveredAt = new Date(metadata.deliveredAt.split(' ').slice(0, 2).join(' '));
        if (/click/gi.test(metadata.type)) {
          callback.call(instance, metadata);
        }
        resolve(metadata);
      }
    });
  });
}

NativeNotifier.prototype.sendAlert = async function (message) {
  if (typeof message !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { icon: { main, prompt, alert } } = this;
  const { shellExec, fileSystem, uniqueValue } = this.mother;
  if (/Darwin/gi.test(this.os)) {
    const tempDir = process.cwd() + "/temp";
    const functionName = "alertScript";
    const scriptName = "nativeNotifierSendAlertScript_" + uniqueValue("string") + ".applescript";
    try {
      let alertScript;

      alertScript = `display dialog "${message.replace(/\"/gi, "'")}" with icon POSIX file "${alert.icns}"`;

      await fileSystem(`write`, [ `${tempDir}/${scriptName}`, alertScript ]);
      try {
        await shellExec(`osascript`, [ `${tempDir}/${scriptName}` ]);
      } catch {}
      await shellExec(`rm`, [ `-rf`, `${tempDir}/${scriptName}` ]);

    } catch (e) {
      console.log(e);
    }
  } else if (/Windows/gi.test(this.os)) {
    try {
      await shellExec(`powershell.exe`, [ this.returnWindowScript("alert", message) ]);
    } catch (e) {
      console.log(e);
    }
  }
}

NativeNotifier.prototype.sendPrompt = async function (message) {
  if (typeof message !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { icon: { main, prompt, alert } } = this;
  const { shellExec, shellLink, fileSystem, uniqueValue } = this.mother;
  if (/Darwin/gi.test(this.os)) {
    const tempDir = process.cwd() + "/temp";
    const functionName = "alertScript";
    const scriptName = "nativeNotifierSendAlertScript_" + uniqueValue("string") + ".applescript";
    try {
      let alertScript, result;

      alertScript = `set theResponse to display dialog "${message.replace(/\"/gi, "'")}" default answer "" with icon POSIX file "${prompt.icns}" buttons {"Cancel", "Continue"} default button "Continue"\n`;
      alertScript += `text returned of theResponse`;

      await fileSystem(`write`, [ `${tempDir}/${scriptName}`, alertScript ]);
      result = await shellExec(`osascript ${shellLink(tempDir)}/${scriptName}`);
      await shellExec(`rm`, [ `-rf`, `${tempDir}/${scriptName}` ]);

      return result.trim();

    } catch (e) {
      console.log(e);
    }
  } else if (/Windows/gi.test(this.os)) {
    try {
      let result;
      result = await shellExec(`powershell.exe`, [ this.returnWindowScript("prompt", message) ]);
      return result.trim();
    } catch (e) {
      console.log(e);
    }
  }
}

NativeNotifier.prototype.returnWindowScript = function (method, message) {
  const instance = this;
  if (typeof message !== "string") {
    throw new Error("invaild input");
  }
  let scriptArr;
  if (method === "alert") {
    scriptArr = [
      `Add-Type -AssemblyName PresentationCore,PresentationFramework`,
      `[System.Windows.MessageBox]::Show("${message.replace(/\"/gi, '')}", "HomeLiaison", "YesNo", "Warning")`,
    ];
  } else if (method === "prompt") {
    scriptArr = [
      `Add-Type -AssemblyName System.Windows.Forms`,
      `Add-Type -AssemblyName System.Drawing`,
      `$form = New-Object System.Windows.Forms.Form`,
      `$form.Text = 'HomeLiaison'`,
      `$form.Size = New-Object System.Drawing.Size(300,175)`,
      `$form.StartPosition = 'CenterScreen'`,
      `$okButton = New-Object System.Windows.Forms.Button`,
      `$okButton.Location = New-Object System.Drawing.Point(75,90)`,
      `$okButton.Size = New-Object System.Drawing.Size(75,23)`,
      `$okButton.Text = 'OK'`,
      `$okButton.DialogResult = [System.Windows.Forms.DialogResult]::OK`,
      `$form.AcceptButton = $okButton`,
      `$form.Controls.Add($okButton)`,
      `$cancelButton = New-Object System.Windows.Forms.Button`,
      `$cancelButton.Location = New-Object System.Drawing.Point(150,90)`,
      `$cancelButton.Size = New-Object System.Drawing.Size(75,23)`,
      `$cancelButton.Text = 'Cancel'`,
      `$cancelButton.DialogResult = [System.Windows.Forms.DialogResult]::Cancel`,
      `$form.CancelButton = $cancelButton`,
      `$form.Controls.Add($cancelButton)`,
      `$label = New-Object System.Windows.Forms.Label`,
      `$label.Location = New-Object System.Drawing.Point(10,20)`,
      `$label.Size = New-Object System.Drawing.Size(280,20)`,
      `$label.Text = '${message.replace(/\'/gi, '')}'`,
      `$form.Controls.Add($label)`,
      `$textBox = New-Object System.Windows.Forms.TextBox`,
      `$textBox.Location = New-Object System.Drawing.Point(10,50)`,
      `$textBox.Size = New-Object System.Drawing.Size(260,20)`,
      `$form.Controls.Add($textBox)`,
      `$form.Topmost = $true`,
      `$form.Add_Shown({$textBox.Select()})`,
      `$result = $form.ShowDialog()`,
      `if ($result -eq [System.Windows.Forms.DialogResult]::OK){$x = $textBox.Text;$x;}`,
    ];
  } else {
    throw new Error("invaild method");
  }
  return scriptArr.map((str) => { return str + ";"; }).join("");
}

NativeNotifier.prototype.alertAlarm = async function (message) {
  if (typeof message !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  try {
    this.sendAlarm(message).catch((err) => { throw new Error(err); });
    await this.sendAlert(message);
  } catch (e) {
    console.log(e);
  }
}

module.exports = NativeNotifier;
