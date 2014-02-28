<?php
namespace model\product;

class Product
{
	var $name;
	var $description;
	var $price;
	var $phoneContact;
	var $quantity;
	var $location;
	var $contactName;
	var $uploadedTime;

	function setName($name){
		$this->name = $name;
	}
	function getName($name){
		$this->name = $name;
	}

	function setUploadedTime($uploadedTime){
		$this->uploadedTime = $uploadedTime;
	}
	function getUploadedTime(){
		return $this->uploadedTime;
	}

	function setContactName($contactName){
		$this->contactName = $contactName;
	}
	function getContactName(){
		return $this->contactName;
	}

	function setQuantity($quantity){
		$this->quantity = $quantity;
	}
	function getQuantity(){
		return $this->quantity;
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

	function setPhoneContact($phoneContact){
		$this->phoneContact = $phoneContact;
	}
	function getPhoneContact(){
		return $this->phoneContact;
	}

}
?>