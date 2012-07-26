function(doc) {
  if (doc._id.substr(0,8) === "entries:") {
    emit(doc._id, {
    	"id": doc._id,
    	"group": doc.group,
    	"title": doc.title,
    	"login": doc.login,
    	"pword": doc.pword,
    	"sort": doc.sort,
    	"usage": doc.usage,
    	"date": doc.date,
    	"notes": doc.notes
    });
  }
};