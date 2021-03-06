var SaveTextCommand = function() {
  this.Extends = SimpleCommand;
	this.execute = function(note) {
		//alert("SaveTextCommand");
		var mediator = note.getBody();
		var textEditor = null;
		if (mediator instanceof ModelObjectsTextsEditorMediator) {
		  textEditor = mediator.getViewComponent().gridListSplitter.right.modelObjectsTextsEditor;
		} else {
		  textEditor = mediator.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;
		}
	  var properties = {
	    "state": SjamayeeMediator.STATE_LIST,
	    "textEditor": textEditor
	  };
	  this.sendNotification(SjamayeeFacade.DATA_MODEL_CHANGE, properties);    
    //this.sendNotification(SjamayeeFacade.TEXT_SAVED,mediator);
    var toolBarMediator = null;
		if (mediator instanceof ModelObjectsTextsEditorMediator) {
      toolBarMediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
    } else {
      toolBarMediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
    }
    toolBarMediator.setMessageText("Text saved.");
	};
};
SaveTextCommand = new Class(new SaveTextCommand());
