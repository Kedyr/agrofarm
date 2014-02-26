<?php
namespace model\mysql;
use model\mysql as MysqlWrapper;

class Wrapper
{
	var $_host;
	var $_errorMessage;
	var $DBH;

	function __construct($host,$username,$password,$dbname)
	{
		try
		{
			$this->DBH = new \PDO("mysql:host=$host;dbname=$dbname", $username, $password);
			$this->DBH->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION );
		}
		catch(PDOException $e) {
		    $this->_errorMessageecho = $e->getMessage();
		}
	}

	function select($sql_string,$parameters)
	{
		$db = $this->DBH->prepare($sql_string);
		$db->execute($parameters);
		$db->setFetchMode(\PDO::FETCH_ASSOC);
		return $db;
	}

	function insert($sql_string,$parameters)
	{
		$db = $this->DBH->prepare($sql_string);
		$db->execute($parameters);
		$db->setFetchMode(\PDO::FETCH_ASSOC);
		return $db;
	}


}
?>