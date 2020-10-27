const UragenConsole = function () {
  this.logs = [];
}

UragenConsole.prototype.log = function (message) {
  this.logs.push(message);
}

UragenConsole.prototype.echo = function () {
  if (this.logs.length > 0) {
    var result = '';
    for (var i = 0; i < this.logs.length; i++) {
      result += String(this.logs[i]) + '\n';
    }
    return result.slice(0, -1);
  } else {
    return 'adobe script done';
  }
}

const uragen = new UragenConsole();
