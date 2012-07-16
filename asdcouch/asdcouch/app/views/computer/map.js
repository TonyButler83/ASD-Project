
function (doc) {
	if (doc._id === "Computer"){
		emit(doc.group,{
			"category": doc.group,
			"title": doc.title,
			"login": doc.login,
			"password" : doc.pword,
			"notes": doc.notes
		});
	}	
};