module.exports = function (dayString) {
  return `<?php
require_once __DIR__.'/Alphasector.php';
require_once __DIR__.'/Jandi.php';

class MysqlSessionHandler extends Alphasector implements SessionHandlerInterface {
    private $database = NULL;

    public function __construct() {
      $this->database = new mysqli($this->dbarr["dbhost"], $this->dbarr["dbid"], $this->dbarr["dbpw"], $this->dbarr["dbname"]);
      if ($this->database->connect_errno) {
        $_SESSION = array("error" => "occur");
      } else {
        $this->database->set_charset("utf8");
        if (session_set_save_handler(
            array($this, "open"),
            array($this, "close"),
            array($this, "read"),
            array($this, "write"),
            array($this, "destroy"),
            array($this, "gc")
        )) {
          register_shutdown_function('session_write_close');
          if (session_start()) {
            //success
          } else {
            $_SESSION = array("error" => "occur");
          }
        } else {
          $_SESSION = array("error" => "occur");
        }
      }
    }

    public function open($savepath, $id) {
      if ($this->database !== NULL) {
        return true;
      } else {
        return false;
      }
    }

    public function read($id) {
      $row = $this->database->query("SELECT data FROM sessions WHERE id = '".$id."'");
      $info = [];
      $count = $row->num_rows;
      if ($count !== 0) {
        for ($i = 0; $i < $count; $i++) { array_push($info, $row->fetch_array(MYSQLI_NUM)); }
        return $info[0][0];
      } else {
        return "";
      }
    }

    public function write($id, $data) {
      $access = time();
      if ($this->database->query("REPLACE INTO sessions(id,access,data) VALUES ('".$id."', '".$access."', '".$data."')")) {
        return true;
      } else {
        return false;
      }
    }

    public function destroy($id) {
      if ($this->database->query("DELETE FROM sessions WHERE id = '".$id."' LIMIT 1")) {
        return true;
      } else {
        return false;
      }
    }

    public function close() {
      if ($this->database->close()) {
        return true;
      } else {
        return false;
      }
    }

    public function gc($max) {
      $old = time() - $max;
      if ($this->database->query("DELETE FROM sessions WHERE access < '".$old."'")) {
        return true;
      } else {
        return false;
      }
    }

}

class SessionExec {
  private $sessionH;

  function __construct() {
    $this->sessionH = new MysqlSessionHandler();
  }

  public function intoSession($arr) {
    foreach ($arr as $key => $value) {
       $_SESSION[$key] = $value;
    }
  }

  public function pushSession($target, $value) {
    array_push($_SESSION[$target], $value);
  }

  public function errorHandler() {
    if (isset($_SESSION["error"])) {
      echo "error occur";
    } else {
      //sucess
    }
  }

  public function closeSession() {
    session_write_close();
    $this->errorHandler();
  }
}
?>`;
}
