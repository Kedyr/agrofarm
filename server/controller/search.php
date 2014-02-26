<?php
namespace controller;
use  model\mysql as MysqlWrapper;
use  model\products as Products;

require_once('../model/mysql/wrapper.class.php');
require_once('../model/products/product.class.php');
require_once('constants.php');

class Search
{
	var $db_connection;
	function __construct()
	{
		$this->db_connection = new MysqlWrapper\Wrapper(Constants::MYSQL_HOST,Constants::MYSQL_USERNAME,Constants::MYSQL_PASSWORD,Constants::MYSQL_DATABASENAME);
	}

	/*
	*returns an array of products
	*/
	function searchProducts($searchItem)
	{
		$products = array();
		$sql_string = "select products.*,profile.* from products join profile on products.productOwner = profile.id where  name like ? ";
		$parameter = array('%'.$searchItem.'%');

		$records =  $this->db_connection->select($sql_string,$parameter);
		$rows_affected = $records->rowCount();  

		if($rows_affected > 0)
		{
			$count = 0;
		 	while($row = $records->fetch()) {
		 		$product = new Products\Products();

			    $product->setName( $row['name']);
			    $product->setDescription( $row['description']);
			    $product->setPrice( $row['price']);
			    $product->setOwnerPhone( $row['phoneNumber']);
			    $product->setQuantity( $row['quantity']);

			    $products[$count] = $product;
			    $count ++;
			}
			return array('success'=>0,'data'=>$products);
		}
		else
			return array('success'=>1);
	}
}



	$search = new Search();
	$search_item = $_POST['itemName'];
	$function = $_POST['function'];

	if($function == 'search')
	{
	    $results =  $search->searchProducts($search_item);
	    print json_encode($results);
	}


?>