<?php
namespace controller;
use  model\mysql as MysqlWrapper;
use  model\product as Product;

require_once('../model/mysql/wrapper.class.php');
require_once('../model/products/product.class.php');
require_once('constants.php');

class Products
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
		$sql_string = "select products.* from products where  name like ? ";
		$parameter = array('%'.$searchItem.'%');

		$records =  $this->db_connection->select($sql_string,$parameter);
		$rows_affected = $records->rowCount();  

		if($rows_affected > 0)
		{
			$count = 0;
		 	while($row = $records->fetch()) {
		 		$product = new Product\Product();

			    $product->setName( $row['name']);
			    $product->setDescription( $row['description']);
			    $product->setPrice( $row['price']);
			    $product->setPhoneContact( $row['phoneContact']);
			    $product->setQuantity( $row['quantity']);
			    $product->setLocation( $row['location']);
			    $product->setContactName( $row['contactName'] );
			    $product->setUploadedTime( $row['dateUploaded'] );

			    $products[$count] = $product;
			    $count ++;
			}
			return array('success'=>0,'data'=>$products);
		}
		else
			return array('success'=>1);
	}

	function saveProduct($product)
	{
		$prodts = array();
		$prodts[0] = $product['name'];
		$prodts[1] = $product['price'];
		$prodts[2] = $product['description'];
		$prodts[3] = $product['quantity'];
		$prodts[4] = $product['phoneContact'];
		$prodts[5] = $product['location'];
		$prodts[6] = $product['contactName'];

		$sql_string = "insert into products (name,price,description,quantity,phoneContact,location,contactName) values (?,?,?,?,?,?,?)";
		$records =  $this->db_connection->select($sql_string,$prodts);
		$rows_affected = $records->rowCount();
		if($rows_affected > 0)
			return array('success'=>0);
		else
			return array('success'=>1);

	}
}



	$product = new Products();
	$search_item = isset($_POST['itemName'])?$_POST['itemName']:'';
	$function = isset($_POST['function'])?$_POST['function']:'';
	$limit = isset($_POST['limit'])?$_POST['function']:'';
	$prdct = isset($_POST['product'])?$_POST['product']:'';

	if($function == 'search')
	{
		$search_item = trim($search_item);
	    $results =  $product->searchProducts($search_item);
	    print json_encode($results);
	}
	if($function == 'save')
	{
		$results =  $product->saveProduct($prdct);
	    print json_encode($results);
	}


?>