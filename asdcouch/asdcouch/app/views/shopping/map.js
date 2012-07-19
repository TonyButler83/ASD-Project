function (doc) {
	if (doc.group[1].substr(0,1) === "S"){
		emit(doc.group,{
			"category": doc.group,
			"title": doc.title,
			"login": doc.login,
			"password" : doc.pword,
			"notes": doc.notes
		});
	}	
};