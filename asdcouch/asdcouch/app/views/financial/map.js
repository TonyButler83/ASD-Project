function (doc) {
	if (doc.group[1].substr(0,1) === "F"){
		emit(doc.group,{
			"category": doc.group,
			"title": doc.title,
			"login": doc.login,
			"password" : doc.pword,
			"notes": doc.notes
		});
	}	
};