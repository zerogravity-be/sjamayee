//Abstract
var RedoRelationCommand = function() {
  this.Extends = RedoCommand;
  this.currentNivo = null;
  this.position = null;
  
	this.execute = function(note) {
		//alert("RedoRelationCommand");
		try {
			var mediator = null; //parameter !!!
  		var grid = this.mediator.grid;
  		var gridView = grid.getGridView();
			this.currentNivo = gridView.getCurrentNivo();
			this.position = (gridView.getPosition())?gridView.getPosition().clone():null;
  		this.parent(note);
			//RESTORE broken links for redone ADDS, some (pid,nid) are still NULL!!!
			for (var j in groupCommands) {
				if (groupCommands[j]) {
					if ((groupCommands[j].getName() != Command.ADD) &&
					    (groupCommands[j].getName() != Command.PST)) { continue; }				
			  	var r1 = Relation.getById(groupCommands[j].getRelation().getId());
					if (r1) {
						this.mediator.previousRelation = null;
						this.mediator.nextRelation = null;
						if (this.mediator.previousRelation === null) {
							if (r1.getPid()) {
								this.mediator.previousRelation = Relation.getById(r1.getPid());
							}
						}
						if (this.mediator.previousRelation) {
							r1.setPid(this.mediator.previousRelation.getId());
							this.mediator.previousRelation.setNid(r1.getId());
						}
						if (this.mediator.nextRelation === null) {
							if (r1.getNid()) {
								this.mediator.nextRelation = Relation.getById(r1.getNid());
							}
						}
						if (this.mediator.nextRelation) {
							r1.setNid(this.mediator.nextRelation.getId());
							this.mediator.nextRelation.setPid(r1.getId());
						}
					}
				}
			}
			gridView.setCurrentNivo(this.currentNivo);
			var p_gvw = gridView.getPosition();
			p_gvw.setRow(this.position.getRow());
			p_gvw.setColumn(this.position.getColumn());
      //this.sendNotification(SjamayeeFacade.RELATION_REDONE,this.mediator);
		} catch(error) {
			Utils.alert("RedoRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
		}
	};

	this.redo_add = function(cmd) {
	  //this.mediator.childRelation = Relation.clone(cmd.getRelation());
	  this.mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
		if (this.mediator.childRelation) {
			//this.mediator.childRelation.setKey(null);
			this.mediator.previousRelation = null;
			this.mediator.nextRelation = null;
			//var relation = this.mediator.childRelation.save();
			this.mediator.childRelation.save();
			if (cmd.getNivo() !== null) {
				currentNivo = cmd.getNivo();
			}
			var p_add = cmd.getPosition();
			if ((this.position) && (p_add)) {
				this.position.setRow(p_add.getRow());
				this.position.setColumn(p_add.getColumn());
			}								
			cmd.setUnDone(false);				
			this.mediator.setLastCommand(cmd,false);
		}
	};
	
  this.redo_edit = function(cmd) {
	  this.mediator.childRelation = Relation.getById(cmd.getRelation().getId());
		if (this.mediator.childRelation) {
			this.mediator.previousRelation = null;
			this.mediator.nextRelation = null;
		  //var currentEntityValues = Entity.clone(Entity.getById(this.mediator.childRelation.getCei()));
			var currentEntityValues = (this.mediator.childRelation.getCei())?Entity.getById(this.mediator.childRelation.getCei()).clone():null;
			if (currentEntityValues) {
				var previousEntityValues = _oe.popById(cmd.getSourceName());  //TODO: _oe !!!
				if (previousEntityValues) {
					var childEntity = this.mediator.childRelation.getChildEntity();
					if (childEntity) {
						childEntity.setName(previousEntityValues.getName());
						childEntity.setDesc(previousEntityValues.getDesc());
					}
					previousEntityValues.setName(currentEntityValues.getName());
					previousEntityValues.setDesc(currentEntityValues.getDesc());
					_oe.push(previousEntityValues);												     //TODO: _oe !!!
				}
			}
			//var relation = this.mediator.childRelation.save();
			this.mediator.childRelation.save();
			if (cmd.getNivo() !== null) {
				this.currentNivo = cmd.getNivo();
			}
			var p_edt = cmd.getPosition();
			if ((this.position) && (p_edt)) {
				this.position.setRow(p_edt.getRow());
				this.position.setColumn(p_edt.getColumn());
			}								
		}
		//////////////////////////////////////////////////////////////////////////
		//ATT: Forced REDO, even when relation does not exist (after deletion). //
		//////////////////////////////////////////////////////////////////////////
		cmd.setUnDone(false);
		this.mediator.setLastCommand(cmd,false);
	};
	
  this.redo_copy = function(cmd) {
		if (cmd.getNivo() !== null) {
			this.currentNivo = cmd.getNivo();
		}
		var p_cpy = cmd.getPosition();
		if ((this.position) && (p_cpy)) {
			this.position.setRow(p_cpy.getRow());
			this.position.setColumn(p_cpy.getColumn());
		}								
		cmd.setUnDone(false);				
		this.mediator.setLastCommand(cmd,false);
	};
	
  this.redo_delete = function(cmd) {
	  //this.mediator.childRelation = Relation.clone(cmd.getRelation());
	  this.mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
		if (this.mediator.childRelation) {
			//Utils.alert("RedoRelationCommand/redo_delete - relation:\n"+this.mediator.childRelation.print());
			//var relation = this.mediator.childRelation.remove(this.mediator);
			this.mediator.childRelation.remove(this.mediator);
			if (cmd.getNivo() !== null) {
				this.currentNivo = cmd.getNivo();
			}
			var p_del = cmd.getPosition();
			if ((this.position) && (p_del)) {
				this.position.setRow(p_del.getRow());
				this.position.setColumn(p_del.getColumn());
			}								
			cmd.setUnDone(false);
			this.mediator.setLastCommand(cmd,false);
		}
	};
	
  this.redo_extract = function(cmd) {
		if (cmd.getNivo() !== null) {
			this.currentNivo = cmd.getNivo();
		}
		var p_ext = cmd.getPosition();
		if ((this.position) && (p_ext)) {
			this.position.setRow(p_ext.getRow());
			this.position.setColumn(p_ext.getColumn());
		}
		cmd.setUnDone(false);
		this.mediator.setLastCommand(cmd,false);
	};
	
  this.redo_paste = function(cmd) {
		//Execute command (like ADD).
    //this.mediator.childRelation = Relation.clone(cmd.getRelation());
  	this.mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
		if (this.mediator.childRelation) {
			//this.mediator.childRelation.setKey(null);
			this.mediator.previousRelation = null;
			this.mediator.nextRelation = null;
			//var relation = this.mediator.childRelation.save(this.mediator);
			this.mediator.childRelation.save(this.mediator);
			if (cmd.getNivo() !== null) {
				this.currentNivo = cmd.getNivo();
			}
			var p_pst = cmd.getPosition();
			if ((this.position) && (p_pst)) {
				this.position.setRow(p_pst.getRow());
				this.position.setColumn(p_pst.getColumn());
			}
			cmd.setUnDone(false);
			this.mediator.setLastCommand(cmd,false);
		}
	};
	
  this.redo_navigation = function(cmd) {
		//alert("RedoRelationCommand/redo_navigation - cmd: "+cmd.print());								
		cmd.setUnDone(false);
		this.mediator.setLastCommand(cmd,false);
		if (cmd.getNivo() !== null) {
			this.currentNivo = cmd.getNivo();
		}
		var p_nav = cmd.getPosition();
		if ((this.position) && (p_nav)) {
			this.position.setRow(p_nav.getRow());
			this.position.setColumn(p_nav.getColumn());
		}
	};	
};
RedoRelationCommand = new Class(new RedoRelationCommand());
