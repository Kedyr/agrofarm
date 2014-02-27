<?php
namespace controller;
use  model\mysql as MysqlWrapper;

require_once('../model/mysql/wrapper.class.php');
require_once('constants.php');

class UserProfile
{
	var $db_connection;

	function __construct()
	{
		$this->db_connection = new MysqlWrapper\Wrapper(Constants::MYSQL_HOST,Constants::MYSQL_USERNAME,Constants::MYSQL_PASSWORD,Constants::MYSQL_DATABASENAME);
	}

	function insertProfile($phoneNumber)
	{
		$sql_string = "insert into profile (phoneNumber) values ( ? ) ";
		$parameter = array($phoneNumber);

		$records =  $this->db_connection->insert($sql_string,$parameter);
	}

	/**
	*checks if a profile exists
	*returns true if it exists
	*/
	function profileExists($phoneNumber)
	{
		$sql_string = "select phoneNumber from profile where phoneNumber = ? "
		$parameter = array($phoneNumber );
		$records =  $this->db_connection->select($sql_string,$parameter);
		$rows_affected = $records->rowCount();

		if($rows_affected > 0)
			return true;
		else
			return false;
	}
}

	$profile = new UserProfile();
	$phoneNumber = "44";
	if(!$profile->profileExists($phoneNumber))
	{
		$profile->insertProfile("2");
		print array('success'=>0);
	}
	else
		print array('success'=>1);

?>