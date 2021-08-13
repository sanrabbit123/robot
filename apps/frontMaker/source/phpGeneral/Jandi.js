module.exports = function (dayString) {
  return `<?php
class Jandi {
	var $WEBHOOK_URL = "";
	function __construct($url)
	{
		$this->WEBHOOK_URL = $url;
	}
	function send( $body, $connectInfo = array(), $connectColor = "#FAC11B" )
	{
		$data = array();
		$data["body"] = $body;
		$data["connectColor"] = $connectColor;
		$data["connectInfo"] = $connectInfo;
		$data_json = json_encode($data);

		$headers = array();
		$headers[] = 'Content-Type: application/json';
		$headers[] = 'Accept: application/vnd.tosslab.jandi-v2+json';
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $this->WEBHOOK_URL);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS,$data_json);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$response = curl_exec($ch);
		curl_close($ch);
		return $response;
	}
}
?>`;
}
