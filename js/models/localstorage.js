define(function()
{
	return {
		setSessionId:function(session_id) //used to create unique records
		{
			this.sessionID = session_id;
		},
		supportsStorage:function()
		{
	  		try 
	  		{
	    		return 'localStorage' in window && window['localStorage'] !== null;
	  		}
	  		catch (e)
	  		{
	    		return false;
	    	}
	  	},
	  	store:function(name,value)
	  	{
	  		name = this.resolveRequestKey(name);

	  		localStorage.setItem(name,JSON.stringify(value)); //html5 stores everything as a string so we convert to string to retain our format
	  	},
	  	retrieve:function(name)
	  	{
	  		name = this.resolveRequestKey(name);

	  		if ( localStorage.getItem(name)) 
   			  return JSON.parse(localStorage.getItem(name));
   			else
   				return false;
	  	},
	  	checkExists:function(name) //checks to see if an item has been stored in local storgae before
	  	{
	  		name = this.resolveRequestKey(name);

	  		if(localStorage.getItem(name))
	  			return true;
	  		else
	  			return false;
	  	},
	  	clearAll:function()
	  	{
	  		clear: localStorage.clear();     
  			return false;
	  	},
	  	clearTestData:function() // TODO this is so manual find a way to make it dynamically delete all
	  	{
	  		this.clearOne("topic_qn_ids");
	  		this.clearOne("topics");
	  		this.clearOne("questions");
	  		this.clearOne("answers");
	  		this.clearOne("questions_done");
	  	},
	  	resolveRequestKey:function(name)
	  	{
	  		if(typeof this.sessionID == "undefined")
	  			this.sessionID = "querty";
	  		name = name + this.sessionID;
	  		return name;
	  	},
	  	clearOne:function(name)
	  	{
	  		name = this.resolveRequestKey(name);
	  		localStorage.removeItem(name);
	  	}
	}	
});
