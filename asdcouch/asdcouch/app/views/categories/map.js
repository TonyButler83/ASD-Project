
function(doc) {
	if (doc._id.substr(0,9) === "category:"){
		emit(doc._id.substr(9), {
			"title": doc.title,
			"description": doc.description
		});	
	}	
};