<?php
namespace model\product;

class Product
{
	var $name;
	var $description;
	var $price;
	var $ownerPhone;
	var $quantity;
	var $location;

	function setName($name){
		$this->name = $name;
	}
	function getName($name){
		$this->name = $name;
	}

	function setQuantity($quantity){
		$this->quantity = $quantity;
	}
	function getQuantity($quantity){
		$this->quantity = $quantity;
	}

	function setDescription($desc){
		$this->description = $desc;
	}
	function getDescription(){
		return $this->description;
	}

	function setPrice($price){
		$this->price = $price;
	}
	function getPrice(){
		return $this->price;
	}

	function setLocation($loc){
		$this->location = $loc;
	}
	function getLocation(){
		return $this->location;
	}

	function setOwnerPhone($ownerPhone){
		$this->ownerPhone = $ownerPhone;
	}
	function getOwnerPhone(){
		return $this->ownerPhone;
	}

}
?>