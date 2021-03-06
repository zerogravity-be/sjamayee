////////////////////////////
// Application Demo Data. //
////////////////////////////
var _types = null;
var _modelEntities = null;
var _modelRelations = null;
var _dataEntities = null;
var _dataRelations = null;

//////////////////////////////
// Keyboard event key codes //
//////////////////////////////
//Possible Event key codes:
// backspace =
// delete =
// down = 40
// enter =
// esc = 27
// left = 37
// right = 39
// space = 32
// tab =
// up = 38
//Additional Event key codes:
Event.Keys.pup = 33;
Event.Keys.pdn = 34;
Event.Keys.end = 35;
Event.Keys.home = 36;

//Class: SjamayeeFacade
var SjamayeeFacade = function() {
  this.Extends = new Class(new Facade()),
  
  this.initialize = function() {
    this.parent();
    this.application = null;
    this.environment = null;
    this.currentDataModelIndex = Header.DATA_RELATIONS_INDEX;
    this.settingName = null;
    this.setting = null;
    //this.messageText = null;
  }

  this.startup = function(app) {
    this.setApplication(app);
    this.sendNotification(SjamayeeFacade.STARTUP, app);
  }

  this.setApplication = function(app) {
    this.application = app;
  }

  this.getApplication = function() {
    return this.application;
  }

  this.isBrowser = function() {
    return (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.BROWSER)?true:false;
  }

  this.isExplorer = function() {
    return (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.EXPLORER)?true:false;
  }

  this.isComposer = function() {
    return (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER)?true:false;
  }
/*
  setMessageText = function(messageText) {
    if (this.messageText === null) {
      this.messageText = this.retrieveMediator(ToolBarMediator.ID).getViewComponent().messageText;
    }
    this.messageText.value = messageText;
  }
*/
  this.initializeController = function() {
    //Always call this.parent()
    this.parent();
    this.registerCommand(SjamayeeFacade.STARTUP, StartupCommand);
    //Objects
    this.registerCommand(SjamayeeFacade.OBJECT_DATA_ADD, AddDataObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_MODEL_ADD, AddModelObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_DATA_DELETE, DeleteDataObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_MODEL_DELETE, DeleteModelObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_DATA_EDIT, EditDataObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_MODEL_EDIT, EditModelObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_DATA_SAVE, SaveDataObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_MODEL_SAVE, SaveModelObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_DATA_CANCEL, CancelDataObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_MODEL_CANCEL, CancelModelObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_SHOW, ShowObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_DATA_UNDO, UndoDataObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_MODEL_UNDO, UndoModelObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_DATA_REDO, RedoDataObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_MODEL_REDO, RedoModelObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_DATA_BUFFER_CLEAR, ClearDataObjectBufferCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_MODEL_BUFFER_CLEAR, ClearModelObjectBufferCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_DATA_UNREFS_DELETE, DeleteUnrefDataObjectsCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_MODEL_UNREFS_DELETE, DeleteUnrefModelObjectsCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_LIST_SHOW, ResetListCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_DATA_SFDC_SHOW, ShowSFDCDataObjectCommand);
    this.registerCommand(SjamayeeFacade.OBJECT_MODEL_SFDC_SHOW, ShowSFDCModelObjectCommand);
    //Relations
    this.registerCommand(SjamayeeFacade.RELATION_DATA_ADD, AddDataRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_MODEL_ADD, AddModelRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_DATA_DELETE, DeleteDataRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_MODEL_DELETE, DeleteModelRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_DATA_EDIT, EditDataRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_MODEL_EDIT, EditModelRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_DATA_SAVE, SaveDataRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_MODEL_SAVE, SaveModelRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_DATA_CANCEL, CancelDataRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_MODEL_CANCEL, CancelModelRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_SHOW, ShowRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_DATA_EXTRACT, ExtractDataRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_MODEL_EXTRACT, ExtractModelRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_DATA_COPY, CopyDataRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_MODEL_COPY, CopyModelRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_DATA_PASTE, PasteDataRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_MODEL_PASTE, PasteModelRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_DATA_UNDO, UndoDataRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_MODEL_UNDO, UndoModelRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_DATA_REDO, RedoDataRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_MODEL_REDO, RedoModelRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_DATA_SFDC_SHOW, ShowSFDCDataRelationCommand);
    this.registerCommand(SjamayeeFacade.RELATION_MODEL_SFDC_SHOW, ShowSFDCModelRelationCommand);
    this.registerCommand(SjamayeeFacade.GRID_DATA_BUFFER_CLEAR, ClearDataRelationBufferCommand);
    this.registerCommand(SjamayeeFacade.GRID_MODEL_BUFFER_CLEAR, ClearModelRelationBufferCommand);
    this.registerCommand(SjamayeeFacade.GRID_MODEL_RESET, ResetGridCommand);
    this.registerCommand(SjamayeeFacade.GRID_DATA_RESET, ResetGridCommand);
    //Texts
    this.registerCommand(SjamayeeFacade.TEXT_EDIT, EditTextCommand);
    this.registerCommand(SjamayeeFacade.TEXT_SAVE, SaveTextCommand);
    this.registerCommand(SjamayeeFacade.TEXT_CANCEL, CancelTextCommand);
    
  /*this.registerCommand(SjamayeeFacade.SELECT_TYPE, SelectTypeCommand);
    this.registerCommand(SjamayeeFacade.SELECT_ENTITY, SelectEntityCommand);
    this.registerCommand(SjamayeeFacade.SELECT_REF_OPERATOR, SelectReferenceOperatorCommand);
    this.registerCommand(SjamayeeFacade.FILTER, FilterCommand);
    this.registerCommand(SjamayeeFacade.ROOT_UNDO, RootUndoCommand);
    this.registerCommand(SjamayeeFacade.ROOT_SELECT, RootSelectCommand);
    this.registerCommand(SjamayeeFacade.ROOT_REDO, RootRedoCommand);
    this.registerCommand(SjamayeeFacade.SELECT_SETTING, SelectSettingCommand);
    this.registerCommand(SjamayeeFacade.DISPLAY_HELP, DisplayHelpCommand);

    this.registerCommand(SjamayeeFacade.LEFT, LeftCommand);
    this.registerCommand(SjamayeeFacade.RIGHT, RightCommand);
    this.registerCommand(SjamayeeFacade.UP, UpCommand);
    this.registerCommand(SjamayeeFacade.DOWN, DownCommand);
    this.registerCommand(SjamayeeFacade.HOME, HomeCommand);
    this.registerCommand(SjamayeeFacade.END, EndCommand);
    this.registerCommand(SjamayeeFacade.PREVIOUS, PreviousCommand);
    this.registerCommand(SjamayeeFacade.NEXT, NextCommand);
    this.registerCommand(SjamayeeFacade.FIRST, FirstCommand);
    this.registerCommand(SjamayeeFacade.LAST, LastCommand);
    this.registerCommand(SjamayeeFacade.SPACE, SpaceCommand);

    this.registerCommand(SjamayeeFacade.ENTER, EnterCommand);
    this.registerCommand(SjamayeeFacade.PARENT_SHOW, ShowParentCommand);
    this.registerCommand(SjamayeeFacade.PARENTANDCHILD_SHOW, ShowParentAndChildCommand);
    this.registerCommand(SjamayeeFacade.CHILD_SHOW, ShowChildCommand);
    this.registerCommand(SjamayeeFacade.ADD_RELATION, AddRelationCommand);
    this.registerCommand(SjamayeeFacade.DELETE_RELATION, DeleteRelationCommand);*/
  }
};
//SjamayeeFacade = new Class(new SjamayeeFacade());
//Notification name constants
SjamayeeFacade.STARTUP = "startup";
SjamayeeFacade.APPLICATION_TYPE = "COMPOSER"; //"EXPLORER"; //"BROWSER";
SjamayeeFacade.BROWSER = "BROWSER";
SjamayeeFacade.EXPLORER = "EXPLORER";
SjamayeeFacade.COMPOSER = "COMPOSER";

SjamayeeFacade.COLOR_DOT = "red";
SjamayeeFacade.COLOR_DOT_ROOT = "white";
SjamayeeFacade.COLOR_DOT_ROOT_FOCUSED = "black";
SjamayeeFacade.NAVIGATION_CONTROL_ID = "navigationControl";
SjamayeeFacade.PAGE_MULTIPLIER = 3;

SjamayeeFacade.DATA = "Data";
SjamayeeFacade.MODEL = "Model";
SjamayeeFacade.TYPES = "Types";
SjamayeeFacade.RELOAD = "Reload";
SjamayeeFacade.DATA_TYPES = SjamayeeFacade.DATA+SjamayeeFacade.TYPES;
SjamayeeFacade.DATA_TYPES_RELOAD = SjamayeeFacade.DATA_TYPES+SjamayeeFacade.RELOAD;
SjamayeeFacade.MODEL_TYPES = SjamayeeFacade.MODEL+SjamayeeFacade.TYPES;
SjamayeeFacade.MODEL_TYPES_RELOAD = SjamayeeFacade.MODEL_TYPES+SjamayeeFacade.RELOAD;

SjamayeeFacade.OLIST = "oList";
SjamayeeFacade.OLIST_SHOW = SjamayeeFacade.OLIST+"Show";
SjamayeeFacade.OLIST_DATA = SjamayeeFacade.OLIST+"Data";
SjamayeeFacade.OLIST_DATA_SHOW = SjamayeeFacade.OLIST_DATA+"Show";
SjamayeeFacade.OLIST_DATA_HEADER_SHOW = SjamayeeFacade.OLIST_DATA+"HeaderShow";
SjamayeeFacade.OLIST_DATA_TOOLBAR_SHOW = SjamayeeFacade.OLIST_DATA+"ToolBarShow";
SjamayeeFacade.OLIST_DATA_REFRESH = SjamayeeFacade.OLIST_DATA+"Refresh";
SjamayeeFacade.OLIST_MODEL = SjamayeeFacade.OLIST+"Model";
SjamayeeFacade.OLIST_MODEL_SHOW = SjamayeeFacade.OLIST_MODEL+"Show";
SjamayeeFacade.OLIST_MODEL_HEADER_SHOW = SjamayeeFacade.OLIST_MODEL+"HeaderShow";
SjamayeeFacade.OLIST_MODEL_TOOLBAR_SHOW = SjamayeeFacade.OLIST_MODEL+"ToolBarShow";
SjamayeeFacade.OLIST_MODEL_TEXT_HEADER_SHOW = SjamayeeFacade.OLIST_MODEL+"TextHeaderShow";
SjamayeeFacade.OLIST_MODEL_TEXT_TOOLBAR_SHOW = SjamayeeFacade.OLIST_MODEL+"TextToolBarShow";
SjamayeeFacade.OLIST_MODEL_REFRESH = SjamayeeFacade.OLIST_MODEL+"Refresh";

SjamayeeFacade.GRID = "grid";
SjamayeeFacade.GRID_SHOW = SjamayeeFacade.GRID+"Show";
SjamayeeFacade.GRID_DATA = SjamayeeFacade.GRID+"Data";
SjamayeeFacade.GRID_DATA_SHOW = SjamayeeFacade.GRID_DATA+"Show";
SjamayeeFacade.GRID_DATA_HEADER_SHOW = SjamayeeFacade.GRID_DATA+"HeaderShow";
SjamayeeFacade.GRID_DATA_TOOLBAR_SHOW = SjamayeeFacade.GRID_DATA+"ToolBarShow";
SjamayeeFacade.GRID_DATA_REFRESH = SjamayeeFacade.GRID_DATA+"Refresh";
SjamayeeFacade.GRID_MODEL = SjamayeeFacade.GRID+"Model";
SjamayeeFacade.GRID_MODEL_SHOW = SjamayeeFacade.GRID_MODEL+"Show";
SjamayeeFacade.GRID_MODEL_HEADER_SHOW = SjamayeeFacade.GRID_MODEL+"HeaderShow";
SjamayeeFacade.GRID_MODEL_TOOLBAR_SHOW = SjamayeeFacade.GRID_MODEL+"ToolBarShow";
SjamayeeFacade.GRID_MODEL_TEXT_HEADER_SHOW = SjamayeeFacade.GRID_MODEL+"TextHeaderShow";
SjamayeeFacade.GRID_MODEL_TEXT_TOOLBAR_SHOW = SjamayeeFacade.GRID_MODEL+"TextToolBarShow";
SjamayeeFacade.GRID_MODEL_REFRESH = SjamayeeFacade.GRID_MODEL+"Refresh";
SjamayeeFacade.GRID_4X_SHOW = SjamayeeFacade.GRID+"4XShow";
SjamayeeFacade.GRID_4C_SHOW = SjamayeeFacade.GRID+"4CShow";
SjamayeeFacade.GRID_5C_SHOW = SjamayeeFacade.GRID+"5CShow";
SjamayeeFacade.GRID_6C_SHOW = SjamayeeFacade.GRID+"6CShow";
SjamayeeFacade.GRID_7C_SHOW = SjamayeeFacade.GRID+"7CShow";
SjamayeeFacade.GRID_8C_SHOW = SjamayeeFacade.GRID+"8CShow";

SjamayeeFacade.SELECT = "Select";
SjamayeeFacade.TYPE = "Type";
SjamayeeFacade.SELECT_TYPE = SjamayeeFacade.SELECT+SjamayeeFacade.TYPE;
SjamayeeFacade.ENTITY = "Entity";
SjamayeeFacade.SELECT_ENTITY = SjamayeeFacade.SELECT+SjamayeeFacade.ENTITY;
SjamayeeFacade.SELECT_REF_OPERATOR = SjamayeeFacade.SELECT+"ReferenceOperator";
SjamayeeFacade.FILTER = "filter";
SjamayeeFacade.ENTITY_FILTER_MODIFIERS = "gi";
SjamayeeFacade.ENTITY_FILTER_MODIFIERS_CASE = "g";
SjamayeeFacade.OLIST_FILTER_CLICK = SjamayeeFacade.OLIST+SjamayeeFacade.FILTER+"Click";
SjamayeeFacade.OLIST_DATA_FILTER_CLICK = SjamayeeFacade.OLIST_DATA+SjamayeeFacade.FILTER+"Click";
SjamayeeFacade.OLIST_MODEL_FILTER_CLICK = SjamayeeFacade.OLIST_MODEL+SjamayeeFacade.FILTER+"Click";
SjamayeeFacade.GRID_FILTER_CLICK = SjamayeeFacade.GRID+SjamayeeFacade.FILTER+"Click";
SjamayeeFacade.GRID_DATA_FILTER_CLICK = SjamayeeFacade.GRID_DATA+SjamayeeFacade.FILTER+"Click";
SjamayeeFacade.GRID_MODEL_FILTER_CLICK = SjamayeeFacade.GRID_MODEL+SjamayeeFacade.FILTER+"Click";
SjamayeeFacade.GRID_FILTER_KEYDOWN = SjamayeeFacade.GRID+SjamayeeFacade.FILTER+"Keydown";
SjamayeeFacade.GRID_DATA_FILTER_KEYDOWN = SjamayeeFacade.GRID_DATA+SjamayeeFacade.FILTER+"Keydown";
SjamayeeFacade.GRID_MODEL_FILTER_KEYDOWN = SjamayeeFacade.GRID_MODEL+SjamayeeFacade.FILTER+"Keydown";
SjamayeeFacade.OLIST_FILTER_CHANGE = SjamayeeFacade.OLIST+SjamayeeFacade.FILTER+"Change";
SjamayeeFacade.GRID_FILTER_CHANGE = SjamayeeFacade.GRID+SjamayeeFacade.FILTER+"Change";
SjamayeeFacade.OLIST_FILTER_CASE_CLICK = SjamayeeFacade.OLIST+SjamayeeFacade.FILTER+"CaseClick";
SjamayeeFacade.GRID_FILTER_CASE_CLICK = SjamayeeFacade.GRID+SjamayeeFacade.FILTER+"CaseClick";
SjamayeeFacade.GRID_COLUMNS_CHANGE = SjamayeeFacade.GRID_COLUMNS+"Change";                           //verify !!!
SjamayeeFacade.GRID_DATA_COLUMNS_CHANGE = SjamayeeFacade.GRID_DATA_COLUMNS+"Change";                 //verify !!!
SjamayeeFacade.GRID_MODEL_COLUMNS_CHANGE = SjamayeeFacade.GRID_MODEL_COLUMNS+"Change";               //verify !!!

SjamayeeFacade.ROOT = "root";
SjamayeeFacade.ROOT_UNDO = SjamayeeFacade.ROOT+"Undo";
SjamayeeFacade.DATA_ROOT = SjamayeeFacade.DATA+SjamayeeFacade.ROOT;
SjamayeeFacade.DATA_ROOT_UNDO = SjamayeeFacade.DATA_ROOT+"Undo";
SjamayeeFacade.MODEL_ROOT = SjamayeeFacade.MODEL+SjamayeeFacade.ROOT;
SjamayeeFacade.MODEL_ROOT_UNDO = SjamayeeFacade.MODEL_ROOT+"Undo";
SjamayeeFacade.ROOT_SELECT = SjamayeeFacade.ROOT+"Select";
SjamayeeFacade.DATA_ROOT_SELECT = SjamayeeFacade.DATA_ROOT+"Select";
SjamayeeFacade.MODEL_ROOT_SELECT = SjamayeeFacade.MODEL_ROOT+"Select";
SjamayeeFacade.ROOT_REDO = SjamayeeFacade.ROOT+"Redo";
SjamayeeFacade.DATA_ROOT_REDO = SjamayeeFacade.DATA_ROOT+"Redo";
SjamayeeFacade.MODEL_ROOT_REDO = SjamayeeFacade.MODEL_ROOT+"Redo";
SjamayeeFacade.SETTING = "setting";
SjamayeeFacade.SETTING_CLICK = SjamayeeFacade.SETTING+"Click";
SjamayeeFacade.SETTING_CHANGE = SjamayeeFacade.SETTING+"Change";
SjamayeeFacade.HELP = "help";
SjamayeeFacade.HELP_CLICK = SjamayeeFacade.HELP+"Click";
SjamayeeFacade.MESSAGE = "message";
SjamayeeFacade.MESSAGE_CLICK = SjamayeeFacade.MESSAGE+"Click";

SjamayeeFacade.DATA_MODEL = SjamayeeFacade.DATA+SjamayeeFacade.MODEL;
SjamayeeFacade.DATA_MODEL_CHANGE = SjamayeeFacade.DATA_MODEL+"Change"
//SjamayeeFacade.GRID_MOUSEOVER = SjamayeeFacade.GRID+"MouseOver";
SjamayeeFacade.GRID_ENTITY = SjamayeeFacade.GRID+"Entity"; //verify !!!
SjamayeeFacade.GRID_ENTITY_CHANGE = SjamayeeFacade.GRID_ENTITY+"Change";
SjamayeeFacade.GRID_DATA_ENTITY = SjamayeeFacade.GRID_DATA+"Entity";
SjamayeeFacade.GRID_DATA_ENTITY_CHANGE = SjamayeeFacade.GRID_DATA_ENTITY+"Change";
SjamayeeFacade.GRID_MODEL_ENTITY = SjamayeeFacade.GRID_MODEL+"Entity";
SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE = SjamayeeFacade.GRID_MODEL_ENTITY+"Change";
SjamayeeFacade.GRID_TYPE = SjamayeeFacade.GRID+"Type";
SjamayeeFacade.GRID_TYPE_CHANGE = SjamayeeFacade.GRID_TYPE+"Change";
SjamayeeFacade.GRID_DATA_TYPE = SjamayeeFacade.GRID_DATA+"Type";
SjamayeeFacade.GRID_DATA_TYPE_CHANGE = SjamayeeFacade.GRID_DATA_TYPE+"Change";
SjamayeeFacade.GRID_MODEL_TYPE = SjamayeeFacade.GRID_MODEL+"Type";
SjamayeeFacade.GRID_MODEL_TYPE_CHANGE = SjamayeeFacade.GRID_MODEL_TYPE+"Change";
SjamayeeFacade.GRID_DATA_TYPE_SET = SjamayeeFacade.GRID_DATA_TYPE+"Set";
SjamayeeFacade.GRID_MODEL_TYPE_SET = SjamayeeFacade.GRID_MODEL_TYPE+"Set";

SjamayeeFacade.OLIST_REFOP_CHANGE = SjamayeeFacade.OLIST+"RefOpChange"; //verify !!!
SjamayeeFacade.OLIST_DATA_REFOP_CHANGE = SjamayeeFacade.OLIST_DATA+"RefOpChange"; //verify !!!
SjamayeeFacade.OLIST_MODEL_REFOP_CHANGE = SjamayeeFacade.OLIST_MODEL+"RefOpChange"; //verify !!!
SjamayeeFacade.OLIST_TYPE = SjamayeeFacade.OLIST+"Type";
SjamayeeFacade.OLIST_TYPE_CHANGE = SjamayeeFacade.OLIST_TYPE+"Change";
SjamayeeFacade.OLIST_DATA_TYPE = SjamayeeFacade.OLIST_DATA+"Type";
SjamayeeFacade.OLIST_DATA_TYPE_CHANGE = SjamayeeFacade.OLIST_DATA_TYPE+"Change";
SjamayeeFacade.OLIST_MODEL_TYPE = SjamayeeFacade.OLIST_MODEL+"Type";
SjamayeeFacade.OLIST_MODEL_TYPE_CHANGE = SjamayeeFacade.OLIST_MODEL_TYPE+"Change";

SjamayeeFacade.LIST = "list";
SjamayeeFacade.LIST_CLICK = SjamayeeFacade.LIST+"Click";
SjamayeeFacade.LINE = "Line";
SjamayeeFacade.LINE_CLICK = SjamayeeFacade.LINE+"Click";
SjamayeeFacade.LINE_MOUSEOVER = SjamayeeFacade.LINE+"MouseOver";
SjamayeeFacade.LINE_MOUSEOUT = SjamayeeFacade.LINE+"MouseOut";
SjamayeeFacade.LIST_NAME = SjamayeeFacade.LIST+"Name";
SjamayeeFacade.LIST_NAME_CLICK = SjamayeeFacade.LIST_NAME+"Click";
SjamayeeFacade.LIST_VALUE = SjamayeeFacade.LIST+"Value";
SjamayeeFacade.LIST_VALUE_CLICK = SjamayeeFacade.LIST_VALUE+"Click";
SjamayeeFacade.LIST_DEACTIVATE = SjamayeeFacade.LIST+"Deactivate";
SjamayeeFacade.LIST_LEFT = SjamayeeFacade.LIST+"Left";
SjamayeeFacade.LIST_LEFT_ACTIVATE = SjamayeeFacade.LIST_LEFT+"Activate";
SjamayeeFacade.LIST_RIGHT = SjamayeeFacade.LIST+"Right";
SjamayeeFacade.LIST_RIGHT_ACTIVATE = SjamayeeFacade.LIST_RIGHT+"Activate";
SjamayeeFacade.LIST_ESCAPE = SjamayeeFacade.LIST+"Escape";
SjamayeeFacade.LIST_SPACE = SjamayeeFacade.LIST+"Space";
SjamayeeFacade.LIST_ENTER = SjamayeeFacade.LIST+"Enter";
SjamayeeFacade.LIST_HOME = SjamayeeFacade.LIST+"Home";
SjamayeeFacade.LIST_PREVIOUS = SjamayeeFacade.LIST+"Previous";
SjamayeeFacade.LIST_UP = SjamayeeFacade.LIST+"Up";
//SjamayeeFacade.LIST_LEFT = "listLeft";
//SjamayeeFacade.LIST_RIGHT = "listRight";
SjamayeeFacade.LIST_DOWN = SjamayeeFacade.LIST+"Down";
SjamayeeFacade.LIST_NEXT = SjamayeeFacade.LIST+"Next";
SjamayeeFacade.LIST_END = SjamayeeFacade.LIST+"End";
SjamayeeFacade.LIST_KEYDOWN = SjamayeeFacade.LIST+"Keydown";
SjamayeeFacade.LIST_KEYPRESS = SjamayeeFacade.LIST+"Keypress";

SjamayeeFacade.GRID_CLICK = SjamayeeFacade.GRID+"Click";
SjamayeeFacade.GRID_CELL = SjamayeeFacade.GRID+"Cell";
SjamayeeFacade.GRID_CELL_CLICK = SjamayeeFacade.GRID_CELL+"Click";
SjamayeeFacade.GRID_CELL_MOUSEOVER = SjamayeeFacade.GRID_CELL+"MouseOver";
SjamayeeFacade.GRID_CELL_MOUSEOUT = SjamayeeFacade.GRID_CELL+"MouseOut";
SjamayeeFacade.GRID_ESCAPE = SjamayeeFacade.GRID+"Escape";
SjamayeeFacade.GRID_SPACE = SjamayeeFacade.GRID+"Space";
SjamayeeFacade.GRID_ENTER = SjamayeeFacade.GRID+"Enter";
SjamayeeFacade.GRID_HOME = SjamayeeFacade.GRID+"Home";
SjamayeeFacade.GRID_PREVIOUS = SjamayeeFacade.GRID+"Previous";
SjamayeeFacade.GRID_UP = SjamayeeFacade.GRID+"Up";
SjamayeeFacade.GRID_LEFT = SjamayeeFacade.GRID+"Left";
SjamayeeFacade.GRID_RIGHT = SjamayeeFacade.GRID+"Right";
SjamayeeFacade.GRID_DOWN = SjamayeeFacade.GRID+"Down";
SjamayeeFacade.GRID_NEXT = SjamayeeFacade.GRID+"Next";
SjamayeeFacade.GRID_END = SjamayeeFacade.GRID+"End";
SjamayeeFacade.GRID_KEYDOWN = "gridKeydown";
SjamayeeFacade.GRID_KEYPRESS = SjamayeeFacade.GRID+"Keypress";
SjamayeeFacade.GRID_FOCUS = SjamayeeFacade.GRID+"Focus";

//SjamayeeFacade.GRID_DATA_CLICK = SjamayeeFacade.GRID_DATA+"Click";
SjamayeeFacade.GRID_DATA_CELL = SjamayeeFacade.GRID_DATA+"Cell";
//SjamayeeFacade.GRID_DATA_CELL_CLICK = SjamayeeFacade.GRID_DATA_CELL+"Click";
SjamayeeFacade.GRID_DATA_ESCAPE = SjamayeeFacade.GRID_DATA+"Escape";
SjamayeeFacade.GRID_DATA_SPACE = SjamayeeFacade.GRID_DATA+"Space";
SjamayeeFacade.GRID_DATA_ENTER = SjamayeeFacade.GRID_DATA+"Enter";
SjamayeeFacade.GRID_DATA_HOME = SjamayeeFacade.GRID_DATA+"Home";
SjamayeeFacade.GRID_DATA_PREVIOUS = SjamayeeFacade.GRID_DATA+"Previous";
SjamayeeFacade.GRID_DATA_UP = SjamayeeFacade.GRID_DATA+"Up";
SjamayeeFacade.GRID_DATA_LEFT = SjamayeeFacade.GRID_DATA+"Left";
SjamayeeFacade.GRID_DATA_RIGHT = SjamayeeFacade.GRID_DATA+"Right";
SjamayeeFacade.GRID_DATA_DOWN = SjamayeeFacade.GRID_DATA+"Down";
SjamayeeFacade.GRID_DATA_NEXT = SjamayeeFacade.GRID_DATA+"Next";
SjamayeeFacade.GRID_DATA_END = SjamayeeFacade.GRID_DATA+"End";

SjamayeeFacade.GRID_DATA_LEFT_CLICK = SjamayeeFacade.GRID_DATA_LEFT+"Click";
SjamayeeFacade.GRID_DATA_LEFT_KEYDOWN = SjamayeeFacade.GRID_DATA_LEFT+"Keydown";
SjamayeeFacade.GRID_DATA_LEFT_CELL = SjamayeeFacade.GRID_DATA_LEFT+"Cell";
SjamayeeFacade.GRID_DATA_LEFT_CELL_CLICK = SjamayeeFacade.GRID_DATA_LEFT_CELL+"Click";
SjamayeeFacade.GRID_DATA_LEFT_CELL_MOUSEOVER = SjamayeeFacade.GRID_DATA_LEFT_CELL+"MouseOver";
SjamayeeFacade.GRID_DATA_LEFT_CELL_MOUSEOUT = SjamayeeFacade.GRID_DATA_LEFT_CELL+"MouseOut";
SjamayeeFacade.GRID_DATA_RIGHT_CLICK = SjamayeeFacade.GRID_DATA_RIGHT+"Click";
SjamayeeFacade.GRID_DATA_RIGHT_KEYDOWN = SjamayeeFacade.GRID_DATA_RIGHT+"Keydown";
SjamayeeFacade.GRID_DATA_RIGHT_CELL = SjamayeeFacade.GRID_DATA_RIGHT+"Cell";
SjamayeeFacade.GRID_DATA_RIGHT_CELL_CLICK = SjamayeeFacade.GRID_DATA_RIGHT_CELL+"Click";
SjamayeeFacade.GRID_DATA_RIGHT_CELL_MOUSEOVER = SjamayeeFacade.GRID_DATA_RIGHT_CELL+"MouseOver";
SjamayeeFacade.GRID_DATA_RIGHT_CELL_MOUSEOUT = SjamayeeFacade.GRID_DATA_RIGHT_CELL+"MouseOut";

//SjamayeeFacade.GRID_MODEL_LEFT = SjamayeeFacade.GRID_MODEL+"Left";
SjamayeeFacade.GRID_MODEL_LEFT_CLICK = SjamayeeFacade.GRID_MODEL_LEFT+"Click";
SjamayeeFacade.GRID_MODEL_LEFT_KEYDOWN = SjamayeeFacade.GRID_MODEL_LEFT+"Keydown";
SjamayeeFacade.GRID_MODEL_LEFT_CELL = SjamayeeFacade.GRID_MODEL_LEFT+"Cell";
SjamayeeFacade.GRID_MODEL_LEFT_CELL_CLICK = SjamayeeFacade.GRID_MODEL_LEFT_CELL+"Click";
SjamayeeFacade.GRID_MODEL_LEFT_CELL_MOUSEOVER = SjamayeeFacade.GRID_MODEL_LEFT_CELL+"MouseOver";
SjamayeeFacade.GRID_MODEL_LEFT_CELL_MOUSEOUT = SjamayeeFacade.GRID_MODEL_LEFT_CELL+"MouseOut";
//SjamayeeFacade.GRID_MODEL_RIGHT = SjamayeeFacade.GRID_MODEL+"Right";
SjamayeeFacade.GRID_MODEL_RIGHT_CLICK = SjamayeeFacade.GRID_MODEL_RIGHT+"Click";
SjamayeeFacade.GRID_MODEL_RIGHT_KEYDOWN = SjamayeeFacade.GRID_MODEL_RIGHT+"Keydown";
SjamayeeFacade.GRID_MODEL_RIGHT_CELL = SjamayeeFacade.GRID_MODEL_RIGHT+"Cell";
SjamayeeFacade.GRID_MODEL_RIGHT_CELL_CLICK = SjamayeeFacade.GRID_MODEL_RIGHT_CELL+"Click";
SjamayeeFacade.GRID_MODEL_RIGHT_CELL_MOUSEOVER = SjamayeeFacade.GRID_MODEL_RIGHT_CELL+"MouseOver";
SjamayeeFacade.GRID_MODEL_RIGHT_CELL_MOUSEOUT = SjamayeeFacade.GRID_MODEL_RIGHT_CELL+"MouseOut";

SjamayeeFacade.GRID_PARENT = SjamayeeFacade.GRID+"Parent";                      //verify !!!
SjamayeeFacade.GRID_PARENT_SHOW = SjamayeeFacade.GRID_PARENT+"Show";
SjamayeeFacade.GRID_PARENTANDCHILD_SHOW = SjamayeeFacade.GRID_PARENT+"AndChildShow";
SjamayeeFacade.GRID_CHILD = SjamayeeFacade.GRID+"Child";
SjamayeeFacade.GRID_CHILD_SHOW = SjamayeeFacade.GRID_CHILD+"Show";
SjamayeeFacade.GRID_DATA_PARENT_SHOW = SjamayeeFacade.GRID_DATA+"ParentShow";
SjamayeeFacade.GRID_DATA_PARENTANDCHILD_SHOW = SjamayeeFacade.GRID_DATA+"ParentAndChildShow";
SjamayeeFacade.GRID_DATA_CHILD_SHOW = SjamayeeFacade.GRID_DATA+"ChildShow";
SjamayeeFacade.GRID_DATA_RESIZE = SjamayeeFacade.GRID_DATA+"Resize";
SjamayeeFacade.GRID_DATA_RESIZED = SjamayeeFacade.GRID_DATA+"Resized";
SjamayeeFacade.GRID_DATA_RELATION = SjamayeeFacade.GRID_DATA+SjamayeeFacade.RELATION; //verify !!!
SjamayeeFacade.GRID_DATA_RELATION_ADD = SjamayeeFacade.GRID_DATA_RELATION+"Add";
SjamayeeFacade.GRID_DATA_RELATION_DELETE = SjamayeeFacade.GRID_DATA_RELATION+"Delete";
SjamayeeFacade.GRID_DATA_RELATION_EDIT = SjamayeeFacade.GRID_DATA_RELATION+"Edit";
SjamayeeFacade.GRID_DATA_RELATION_EXTRACT = SjamayeeFacade.GRID_DATA_RELATION+"Extract";
SjamayeeFacade.GRID_DATA_RELATION_COPY = SjamayeeFacade.GRID_DATA_RELATION+"Copy";
SjamayeeFacade.GRID_DATA_RELATION_PASTE = SjamayeeFacade.GRID_DATA_RELATION+"Paste";
SjamayeeFacade.GRID_DATA_RELATION_UNDO = SjamayeeFacade.GRID_DATA_RELATION+"Undo";
SjamayeeFacade.GRID_DATA_RELATION_REDO = SjamayeeFacade.GRID_DATA_RELATION+"Redo";
SjamayeeFacade.GRID_DATA_BUFFER_CLEAR = SjamayeeFacade.GRID_DATA+"BufferClear";
SjamayeeFacade.GRID_DATA_TEXT = SjamayeeFacade.GRID_DATA+"Text";               //verify !!!
SjamayeeFacade.GRID_DATA_TEXT_EDIT = SjamayeeFacade.GRID_DATA_TEXT+"Edit";
SjamayeeFacade.GRID_DATA_RESET = SjamayeeFacade.GRID_DATA+"Reset";
SjamayeeFacade.GRID_DATA_NO_OBJECTS_FOUND = SjamayeeFacade.GRID_DATA+"NoObjectsFound";

//SjamayeeFacade.GRID_MODEL = SjamayeeFacade.GRID+"Model"; //verify !!!
//SjamayeeFacade.GRID_MODEL_CLICK = SjamayeeFacade.GRID_MODEL+"Click";
SjamayeeFacade.GRID_MODEL_CELL = SjamayeeFacade.GRID_MODEL+"Cell"; //verify !!!
//SjamayeeFacade.GRID_MODEL_CELL_CLICK = SjamayeeFacade.GRID_MODEL_CELL+"Click";
SjamayeeFacade.GRID_MODEL_ESCAPE = SjamayeeFacade.GRID_MODEL+"Escape";
SjamayeeFacade.GRID_MODEL_SPACE = SjamayeeFacade.GRID_MODEL+"Space";
SjamayeeFacade.GRID_MODEL_ENTER = SjamayeeFacade.GRID_MODEL+"Enter";
SjamayeeFacade.GRID_MODEL_HOME = SjamayeeFacade.GRID_MODEL+"Home";
SjamayeeFacade.GRID_MODEL_PREVIOUS = SjamayeeFacade.GRID_MODEL+"Previous";
SjamayeeFacade.GRID_MODEL_UP = SjamayeeFacade.GRID_MODEL+"Up";
SjamayeeFacade.GRID_MODEL_LEFT = SjamayeeFacade.GRID_MODEL+"Left";
SjamayeeFacade.GRID_MODEL_RIGHT = SjamayeeFacade.GRID_MODEL+"Right";
SjamayeeFacade.GRID_MODEL_DOWN = SjamayeeFacade.GRID_MODEL+"Down";
SjamayeeFacade.GRID_MODEL_NEXT = SjamayeeFacade.GRID_MODEL+"Next";
SjamayeeFacade.GRID_MODEL_END = SjamayeeFacade.GRID_MODEL+"End";
SjamayeeFacade.GRID_MODEL_TEXT = SjamayeeFacade.GRID_MODEL+"Text"; //verify !!!
SjamayeeFacade.GRID_MODEL_TEXT_SHOW = SjamayeeFacade.GRID_MODEL_TEXT+"Show";
SjamayeeFacade.GRID_MODEL_TEXT_EDIT = SjamayeeFacade.GRID_MODEL_TEXT+"Edit";
SjamayeeFacade.GRID_MODEL_TEXT_SAVE = SjamayeeFacade.GRID_MODEL_TEXT+"Save";
SjamayeeFacade.GRID_MODEL_TEXT_CANCEL = SjamayeeFacade.GRID_MODEL_TEXT+"Cancel";
SjamayeeFacade.GRID_MODEL_TEXT_RESIZE = SjamayeeFacade.GRID_MODEL_TEXT+"Resize";
SjamayeeFacade.GRID_MODEL_TEXT_RESIZED = SjamayeeFacade.GRID_MODEL_TEXT+"Resized";

SjamayeeFacade.GRID_MODEL_PARENT_SHOW = SjamayeeFacade.GRID_MODEL+"ParentShow";
SjamayeeFacade.GRID_MODEL_PARENTANDCHILD_SHOW = SjamayeeFacade.GRID_MODEL+"ParentAndChildShow";
SjamayeeFacade.GRID_MODEL_CHILD_SHOW = SjamayeeFacade.GRID_MODEL+"ChildShow";
SjamayeeFacade.GRID_MODEL_RESIZE = SjamayeeFacade.GRID_MODEL+"Resize";
SjamayeeFacade.GRID_MODEL_RESIZED = SjamayeeFacade.GRID_MODEL+"Resized";
SjamayeeFacade.GRID_MODEL_RELATION = SjamayeeFacade.GRID_MODEL+"Relation"; //verify !!!
SjamayeeFacade.GRID_MODEL_RELATION_ADD = SjamayeeFacade.GRID_MODEL_RELATION+"Add";
SjamayeeFacade.GRID_MODEL_RELATION_DELETE = SjamayeeFacade.GRID_MODEL_RELATION+"Delete";
SjamayeeFacade.GRID_MODEL_RELATION_EDIT = SjamayeeFacade.GRID_MODEL_RELATION+"Edit";
SjamayeeFacade.GRID_MODEL_RELATION_EXTRACT = SjamayeeFacade.GRID_MODEL_RELATION+"Extract";
SjamayeeFacade.GRID_MODEL_RELATION_COPY = SjamayeeFacade.GRID_MODEL_RELATION+"Copy";
SjamayeeFacade.GRID_MODEL_RELATION_PASTE = SjamayeeFacade.GRID_MODEL_RELATION+"Paste";
SjamayeeFacade.GRID_MODEL_RELATION_UNDO = SjamayeeFacade.GRID_MODEL_RELATION+"Undo";
SjamayeeFacade.GRID_MODEL_RELATION_REDO = SjamayeeFacade.GRID_MODEL_RELATION+"Redo";
SjamayeeFacade.GRID_MODEL_BUFFER_CLEAR = SjamayeeFacade.GRID_MODEL+"BufferClear";
SjamayeeFacade.GRID_MODEL_RESET = SjamayeeFacade.GRID_MODEL+"Reset";
SjamayeeFacade.GRID_MODEL_NO_OBJECTS_FOUND = SjamayeeFacade.GRID_MODEL+"NoObjectsFound";

SjamayeeFacade.OLIST_DATA_LINE_CLICK = SjamayeeFacade.OLIST_DATA_LINE+"Click"; //verify !!!
SjamayeeFacade.OLIST_MODEL_LINE_CLICK = SjamayeeFacade.OLIST_MODEL_LINE+"Click"; //verify !!!
SjamayeeFacade.OLIST_ACTIVATE = SjamayeeFacade.OLIST+"Activate";
SjamayeeFacade.OLIST_ESCAPE = SjamayeeFacade.OLIST+"Escape";
SjamayeeFacade.OLIST_DATA_ESCAPE = SjamayeeFacade.OLIST_DATA+"Escape";
SjamayeeFacade.OLIST_MODEL_ESCAPE = SjamayeeFacade.OLIST_MODEL+"Escape";
SjamayeeFacade.OLIST_SPACE = SjamayeeFacade.OLIST+"Space";
SjamayeeFacade.OLIST_DATA_SPACE = SjamayeeFacade.OLIST_DATA+"Space";
SjamayeeFacade.OLIST_MODEL_SPACE = SjamayeeFacade.OLIST_MODEL+"Space";
SjamayeeFacade.OLIST_ENTER = SjamayeeFacade.OLIST+"Enter";
SjamayeeFacade.OLIST_DATA_ENTER = SjamayeeFacade.OLIST_DATA+"Enter";
SjamayeeFacade.OLIST_MODEL_ENTER = SjamayeeFacade.OLIST_MODEL+"Enter";
SjamayeeFacade.OLIST_HOME = SjamayeeFacade.OLIST+"Home";
SjamayeeFacade.OLIST_DATA_HOME = SjamayeeFacade.OLIST_DATA+"Home";
SjamayeeFacade.OLIST_MODEL_HOME = SjamayeeFacade.OLIST_MODEL+"Home";
SjamayeeFacade.OLIST_PREVIOUS = SjamayeeFacade.OLIST+"Previous";
SjamayeeFacade.OLIST_DATA_PREVIOUS = SjamayeeFacade.OLIST_DATA+"Previous";
SjamayeeFacade.OLIST_MODEL_PREVIOUS = SjamayeeFacade.OLIST_MODEL+"Previous";
SjamayeeFacade.OLIST_UP = SjamayeeFacade.OLIST+"Up";
SjamayeeFacade.OLIST_DATA_UP = SjamayeeFacade.OLIST_DATA+"Up";
SjamayeeFacade.OLIST_MODEL_UP = SjamayeeFacade.OLIST_MODEL+"Up";
SjamayeeFacade.OLIST_DOWN = SjamayeeFacade.OLIST+"Down";
SjamayeeFacade.OLIST_DATA_DOWN = SjamayeeFacade.OLIST_DATA+"Down";
SjamayeeFacade.OLIST_MODEL_DOWN = SjamayeeFacade.OLIST_MODEL+"Down";
SjamayeeFacade.OLIST_NEXT = SjamayeeFacade.OLIST+"Next";
SjamayeeFacade.OLIST_DATA_NEXT = SjamayeeFacade.OLIST_DATA+"Next";
SjamayeeFacade.OLIST_MODEL_NEXT = SjamayeeFacade.OLIST_MODEL+"Next";
SjamayeeFacade.OLIST_END = SjamayeeFacade.OLIST+"End";
SjamayeeFacade.OLIST_DATA_END = SjamayeeFacade.OLIST_DATA+"End";
SjamayeeFacade.OLIST_MODEL_END = SjamayeeFacade.OLIST_MODEL+"End";
SjamayeeFacade.OLIST_DATA_RESIZE = SjamayeeFacade.OLIST_DATA+"Resize";
SjamayeeFacade.OLIST_DATA_RESIZED = SjamayeeFacade.OLIST_DATA+"Resized";
SjamayeeFacade.OLIST_MODEL_RESIZE = SjamayeeFacade.OLIST_MODEL+"Resize";
SjamayeeFacade.OLIST_MODEL_RESIZED = SjamayeeFacade.OLIST_MODEL+"Resized";
SjamayeeFacade.OLIST_DATA_TEXT = SjamayeeFacade.OLIST_DATA+"Text";       //verify !!!
SjamayeeFacade.OLIST_DATA_TEXT_EDIT = SjamayeeFacade.OLIST_DATA_TEXT+"Edit";
SjamayeeFacade.OLIST_MODEL_TEXT = SjamayeeFacade.OLIST_MODEL+"Text";       //verify !!!
SjamayeeFacade.OLIST_MODEL_TEXT_EDIT = SjamayeeFacade.OLIST_MODEL_TEXT+"Edit";
SjamayeeFacade.OLIST_MODEL_TEXT_SHOW = SjamayeeFacade.OLIST_MODEL_TEXT+"Show";
SjamayeeFacade.OLIST_MODEL_TEXT_SAVE = SjamayeeFacade.OLIST_MODEL_TEXT+"Save";
SjamayeeFacade.OLIST_MODEL_TEXT_CANCEL = SjamayeeFacade.OLIST_MODEL_TEXT+"Cancel";
SjamayeeFacade.OLIST_MODEL_TEXT_RESIZE = SjamayeeFacade.OLIST_MODEL_TEXT+"Resize";
SjamayeeFacade.OLIST_MODEL_TEXT_RESIZED = SjamayeeFacade.OLIST_MODEL_TEXT+"Resized";
SjamayeeFacade.OLIST_KEYDOWN = SjamayeeFacade.OLIST+"Keydown";
SjamayeeFacade.OLIST_KEYPRESS = SjamayeeFacade.OLIST+"Keypress";

SjamayeeFacade.CHILD_ATTRIBUTE_LINE_CLICK = SjamayeeFacade.CHILD_ATTRIBUTE_LINE+"Click"; //verify !!!
SjamayeeFacade.CHILD_ATTRIBUTE_NAME_CLICK = SjamayeeFacade.CHILD_ATTRIBUTE_NAME+"Click"; //verify !!!
SjamayeeFacade.CHILD_ATTRIBUTE_VALUE_CLICK = SjamayeeFacade.CHILD_ATTRIBUTE_VALUE+"Click"; //verify !!!
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ESCAPE = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Escape";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_SPACE = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Space";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ENTER = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Enter";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_HOME = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Home";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_END = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"End";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_PREVIOUS = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Previous";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_UP = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Up";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_DOWN = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Down";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_NEXT = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Next";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_KEYPRESS = SjamayeeFacade.CHILD_ATTRIBUTE_LIST+"Keypress";
SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ACTIVATE = "SjamayeeFacade.CHILD_ATTRIBUTE_LIST+Activate";

SjamayeeFacade.PARENT_ATTRIBUTE_LINE_CLICK = SjamayeeFacade.PARENT_ATTRIBUTE_LINE+"Click"; //verify !!!
SjamayeeFacade.PARENT_ATTRIBUTE_NAME_CLICK = SjamayeeFacade.PARENT_ATTRIBUTE_NAME+"Click"; //verify !!!
SjamayeeFacade.PARENT_ATTRIBUTE_VALUE_CLICK = SjamayeeFacade.PARENT_ATTRIBUTE_VALUE+"Click"; //verify !!!
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ESCAPE = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Escape";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_SPACE = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Space";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ENTER = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Enter";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_HOME = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Home";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_END = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"End";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_PREVIOUS = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Previous";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_UP = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Up";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_DOWN = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Down";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_NEXT = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Next";
SjamayeeFacade.PARENT_ATTRIBUTE_LIST_KEYPRESS = SjamayeeFacade.PARENT_ATTRIBUTE_LIST+"Keypress";

SjamayeeFacade.ENTITY_ATTRIBUTE_LINE_CLICK = SjamayeeFacade.ENTITY_ATTRIBUTE_LINE+"Click"; //verify !!!
SjamayeeFacade.ENTITY_ATTRIBUTE_NAME_CLICK = SjamayeeFacade.ENTITY_ATTRIBUTE_NAME+"Click"; //verify !!!
SjamayeeFacade.ENTITY_ATTRIBUTE_VALUE_CLICK = SjamayeeFacade.ENTITY_ATTRIBUTE_VALUE+"Click"; //verify !!!
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_ESCAPE = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Escape";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_SPACE = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Space";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_ENTER = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Enter";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_HOME = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Home";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_PREVIOUS = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Previous";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_UP = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Up";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_DOWN = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Down";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_NEXT = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Next";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_END = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"End";
SjamayeeFacade.ENTITY_ATTRIBUTE_LIST_KEYPRESS = SjamayeeFacade.ENTITY_ATTRIBUTE_LIST+"Keypress";
SjamayeeFacade.ENTITY_NAME_KEYPRESS = SjamayeeFacade.ENTITY_NAME+"Keypress";          //verify !!!
SjamayeeFacade.ENTITY_NAME_KEYDOWN = SjamayeeFacade.ENTITY_NAME+"Keydown";            //verify !!!

SjamayeeFacade.OBJECT = "object";                                                            //!!! 2X !!!
SjamayeeFacade.OBJECT_ATTRIBUTE = SjamayeeFacade.OBJECT+"Attribute";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST = SjamayeeFacade.OBJECT_ATTRIBUTE+"List";
SjamayeeFacade.OBJECT_ATTRIBUTE_LINE = SjamayeeFacade.OBJECT_ATTRIBUTE+"Line";
SjamayeeFacade.OBJECT_ATTRIBUTE_LINE_CLICK = SjamayeeFacade.OBJECT_ATTRIBUTE_LINE+"Click";
SjamayeeFacade.OBJECT_ATTRIBUTE_NAME = SjamayeeFacade.OBJECT_ATTRIBUTE+"Name";
SjamayeeFacade.OBJECT_ATTRIBUTE_NAME_CLICK = SjamayeeFacade.OBJECT_ATTRIBUTE_NAME+"Click";
SjamayeeFacade.OBJECT_ATTRIBUTE_VALUE = SjamayeeFacade.OBJECT_ATTRIBUTE+"Value";
SjamayeeFacade.OBJECT_ATTRIBUTE_VALUE_CLICK = SjamayeeFacade.OBJECT_ATTRIBUTE_VALUE+"Click";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ESCAPE = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Escape";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_SPACE = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Space";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ENTER = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Enter";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_HOME = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Home";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_PREVIOUS = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Previous";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_UP = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Up";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_DOWN = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Down";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_NEXT = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Next";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_END = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"End";
SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_KEYPRESS = SjamayeeFacade.OBJECT_ATTRIBUTE_LIST+"Keypress";
SjamayeeFacade.OBJECT_NAME = SjamayeeFacade.OBJECT+"Name";
SjamayeeFacade.OBJECT_NAME_KEYPRESS = SjamayeeFacade.OBJECT_NAME+"Keypress";
SjamayeeFacade.OBJECT_NAME_KEYDOWN = SjamayeeFacade.OBJECT_NAME+"Keydown";

SjamayeeFacade.ATTRIBUTE = "attribute";
SjamayeeFacade.ATTRIBUTE_LIST = SjamayeeFacade.ATTRIBUTE+"List";
SjamayeeFacade.ATTRIBUTE_NAME = SjamayeeFacade.ATTRIBUTE+"Name";
SjamayeeFacade.ATTRIBUTE_NAME_CLICK = SjamayeeFacade.ATTRIBUTE_NAME+"Click";
SjamayeeFacade.ATTRIBUTE_VALUE = SjamayeeFacade.ATTRIBUTE+"Value";
SjamayeeFacade.ATTRIBUTE_VALUE_CLICK = SjamayeeFacade.ATTRIBUTE_VALUE+"Click";
SjamayeeFacade.ATTRIBUTE_LIST_KEYPRESS = SjamayeeFacade.ATTRIBUTE_LIST+"Keypress";

SjamayeeFacade.ENTITY = "entity";
SjamayeeFacade.ENTITY_NTD = SjamayeeFacade.ENTITY+"NTD";
SjamayeeFacade.ENTITY_NTD_CLICK = SjamayeeFacade.ENTITY_NTD+"Click";
SjamayeeFacade.ENTITY_NTD_KEYPRESS = SjamayeeFacade.ENTITY_NTD+"Keypress";
SjamayeeFacade.ENTITY_NTD_KEYDOWN = SjamayeeFacade.ENTITY_NTD+"Keydown";
SjamayeeFacade.ENTITY_NAME = SjamayeeFacade.ENTITY+"Name";
SjamayeeFacade.ENTITY_NAME_CLICK = SjamayeeFacade.ENTITY_NAME+"Click";
SjamayeeFacade.ENTITY_NAME_KEYPRESS = SjamayeeFacade.ENTITY_NAME+"Keypress";
SjamayeeFacade.ENTITY_NAME_KEYDOWN = SjamayeeFacade.ENTITY_NAME+"Keydown";

SjamayeeFacade.OBJECT = "object";
SjamayeeFacade.OBJECT_NTD = SjamayeeFacade.OBJECT+"NTD";
SjamayeeFacade.OBJECT_NTD_CLICK = SjamayeeFacade.OBJECT_NTD+"Click";
SjamayeeFacade.OBJECT_NTD_KEYPRESS = SjamayeeFacade.OBJECT_NTD+"Keypress";
SjamayeeFacade.OBJECT_NTD_KEYDOWN = SjamayeeFacade.OBJECT_NTD+"Keydown";
SjamayeeFacade.OBJECT_NAME = SjamayeeFacade.OBJECT+"Name";
SjamayeeFacade.OBJECT_NAME_CLICK = SjamayeeFacade.OBJECT_NAME+"Click";
SjamayeeFacade.OBJECT_NAME_KEYPRESS = SjamayeeFacade.OBJECT_NAME+"Keypress";
SjamayeeFacade.OBJECT_NAME_KEYDOWN = SjamayeeFacade.OBJECT_NAME+"Keydown";

SjamayeeFacade.PARENT = "parent";
SjamayeeFacade.PARENT_DETAIL = SjamayeeFacade.PARENT+"Detail";
SjamayeeFacade.PARENT_NTD = SjamayeeFacade.PARENT+"NTD";
SjamayeeFacade.PARENT_NTD_CLICK = SjamayeeFacade.PARENT_NTD+"Click";
SjamayeeFacade.PARENT_NTD_KEYPRESS = SjamayeeFacade.PARENT_NTD+"Keypress";
SjamayeeFacade.PARENT_NTD_KEYDOWN = SjamayeeFacade.PARENT_NTD+"Keydown";
SjamayeeFacade.PARENT_NAME = SjamayeeFacade.PARENT+"Name";
SjamayeeFacade.PARENT_NAME_CLICK = SjamayeeFacade.PARENT_NAME+"Click";
SjamayeeFacade.PARENT_NAME_KEYPRESS = SjamayeeFacade.PARENT_NAME+"Keypress";
SjamayeeFacade.PARENT_NAME_KEYDOWN = SjamayeeFacade.PARENT_NAME+"Keydown";
SjamayeeFacade.PARENT_NAME_DBLCLICK = SjamayeeFacade.PARENT_NAME+"DblClick";

SjamayeeFacade.CHILD = "child";
SjamayeeFacade.CHILD_DETAIL = SjamayeeFacade.CHILD+"Detail";
SjamayeeFacade.CHILD_NTD = SjamayeeFacade.CHILD+"NTD";
SjamayeeFacade.CHILD_NTD_CLICK = SjamayeeFacade.CHILD_NTD+"Click";
SjamayeeFacade.CHILD_NTD_KEYPRESS = SjamayeeFacade.CHILD_NTD+"Keypress";
SjamayeeFacade.CHILD_NTD_KEYDOWN = SjamayeeFacade.CHILD_NTD+"Keydown";
SjamayeeFacade.CHILD_NAME = SjamayeeFacade.CHILD+"Name";
SjamayeeFacade.CHILD_NAME_CLICK = SjamayeeFacade.CHILD_NAME+"Click";
SjamayeeFacade.CHILD_NAME_KEYPRESS = SjamayeeFacade.CHILD_NAME+"Keypress";
SjamayeeFacade.CHILD_NAME_KEYDOWN = SjamayeeFacade.CHILD_NAME+"Keydown";

SjamayeeFacade.GO_NTD_CLICK = "goNTDClick";
SjamayeeFacade.NOGO_NTD_CLICK = "noGoNTDClick";

SjamayeeFacade.KEYUP = "keyup";
SjamayeeFacade.KEYDOWN = "keydown";
SjamayeeFacade.KEYPRESS = "keypress";
SjamayeeFacade.MOUSEOVER = "mouseover";
SjamayeeFacade.MOUSEOUT = "mouseout";
SjamayeeFacade.DBLCLICK = "dblclick";
SjamayeeFacade.BLUR = "blur";
SjamayeeFacade.FOCUS = "focus";
SjamayeeFacade.CLICK = "click";
SjamayeeFacade.CHANGE = "change";
SjamayeeFacade.LEFT = "left";
SjamayeeFacade.RIGHT = "right";
SjamayeeFacade.UP = "up";
SjamayeeFacade.DOWN = "down";
SjamayeeFacade.HOME = "home";
SjamayeeFacade.END = "end";
SjamayeeFacade.PREVIOUS = "pup";
SjamayeeFacade.NEXT = "pdn";
SjamayeeFacade.ESCAPE = "esc";
SjamayeeFacade.SPACE = "space";
SjamayeeFacade.ENTER = "enter";
SjamayeeFacade.SIZE_NORMAL = "NORMAL";
SjamayeeFacade.SIZE_FULL = "FULL";

SjamayeeFacade.RELATION = "relation";
SjamayeeFacade.RELATION_DATA = SjamayeeFacade.RELATION+"Data";
SjamayeeFacade.RELATION_MODEL = SjamayeeFacade.RELATION+"Model";
SjamayeeFacade.RELATION_ADD = SjamayeeFacade.RELATION+"Add";
SjamayeeFacade.RELATION_DATA_ADD = SjamayeeFacade.RELATION_DATA+"Add";
SjamayeeFacade.RELATION_MODEL_ADD = SjamayeeFacade.RELATION_MODEL+"Add";
SjamayeeFacade.RELATION_DELETE = SjamayeeFacade.RELATION+"Delete";
SjamayeeFacade.RELATION_DATA_DELETE = SjamayeeFacade.RELATION_DATA+"Delete";
SjamayeeFacade.RELATION_MODEL_DELETE = SjamayeeFacade.RELATION_MODEL+"Delete";
SjamayeeFacade.RELATION_EDIT = SjamayeeFacade.RELATION+"Edit";
SjamayeeFacade.RELATION_DATA_EDIT = SjamayeeFacade.RELATION_DATA+"Edit";
SjamayeeFacade.RELATION_MODEL_EDIT = SjamayeeFacade.RELATION_MODEL+"Edit";
SjamayeeFacade.RELATION_SAVE = SjamayeeFacade.RELATION+"Save";
SjamayeeFacade.RELATION_DATA_SAVE = SjamayeeFacade.RELATION_DATA+"Save";
SjamayeeFacade.RELATION_MODEL_SAVE = SjamayeeFacade.RELATION_MODEL+"Save";
SjamayeeFacade.RELATION_CANCEL = SjamayeeFacade.RELATION+"Cancel";
SjamayeeFacade.RELATION_DATA_CANCEL = SjamayeeFacade.RELATION_DATA+"Cancel";
SjamayeeFacade.RELATION_MODEL_CANCEL = SjamayeeFacade.RELATION_MODEL+"Cancel";
SjamayeeFacade.RELATION_SAVED = SjamayeeFacade.RELATION+"Saved";
SjamayeeFacade.RELATION_DELETED = SjamayeeFacade.RELATION+"Deleted";
SjamayeeFacade.RELATION_SHOW = "RelationShow";
SjamayeeFacade.RELATION_EXTRACT = SjamayeeFacade.RELATION+"Extract";
SjamayeeFacade.RELATION_DATA_EXTRACT = SjamayeeFacade.RELATION_DATA+"Extract";
SjamayeeFacade.RELATION_MODEL_EXTRACT = SjamayeeFacade.RELATION_MODEL+"Extract";
SjamayeeFacade.RELATION_COPY = SjamayeeFacade.RELATION+"Copy";
SjamayeeFacade.RELATION_DATA_COPY = SjamayeeFacade.RELATION_DATA+"Copy";
SjamayeeFacade.RELATION_MODEL_COPY = SjamayeeFacade.RELATION_MODEL+"Copy";
SjamayeeFacade.RELATION_PASTE = SjamayeeFacade.RELATION+"Paste";
SjamayeeFacade.RELATION_DATA_PASTE = SjamayeeFacade.RELATION_DATA+"Paste";
SjamayeeFacade.RELATION_MODEL_PASTE = SjamayeeFacade.RELATION_MODEL+"Paste";
SjamayeeFacade.RELATION_UNDO = SjamayeeFacade.RELATION+"Undo";
SjamayeeFacade.RELATION_DATA_UNDO = SjamayeeFacade.RELATION_DATA+"Undo";
SjamayeeFacade.RELATION_MODEL_UNDO = SjamayeeFacade.RELATION_MODEL+"Undo";
SjamayeeFacade.RELATION_REDO = SjamayeeFacade.RELATION+"Redo";
SjamayeeFacade.RELATION_DATA_REDO = SjamayeeFacade.RELATION_DATA+"Redo";
SjamayeeFacade.RELATION_MODEL_REDO = SjamayeeFacade.RELATION_MODEL+"Redo";
SjamayeeFacade.RELATION_SFDC = SjamayeeFacade.RELATION+"SFDC";
SjamayeeFacade.RELATION_SFDC_SHOW = SjamayeeFacade.RELATION_SFDC+"Show";
SjamayeeFacade.RELATION_DATA_SFDC_SHOW = SjamayeeFacade.RELATION_DATA+SjamayeeFacade.RELATION_SFDC_SHOW;
SjamayeeFacade.RELATION_MODEL_SFDC_SHOW = SjamayeeFacade.RELATION_MODEL+SjamayeeFacade.RELATION_SFDC_SHOW;
SjamayeeFacade.GRID_BUFFER_CLEAR = SjamayeeFacade.GRID+"BufferClear";
//SjamayeeFacade.GRID_DATA = SjamayeeFacade.GRID+"Data";                   //verify !!!
SjamayeeFacade.GRID_DATA_BUFFER_CLEAR = SjamayeeFacade.GRID_DATA+"BufferClear";
//SjamayeeFacade.GRID_MODEL = SjamayeeFacade.GRID+"Model";
SjamayeeFacade.GRID_MODEL_BUFFER_CLEAR = SjamayeeFacade.GRID_MODEL+"BufferClear";
SjamayeeFacade.GRID_RESET = SjamayeeFacade.GRID+"Reset";
SjamayeeFacade.GRID_DATA_RESET = SjamayeeFacade.GRID_DATA+"Reset";
SjamayeeFacade.GRID_MODEL_RESET = SjamayeeFacade.GRID_MODEL+"Reset";
SjamayeeFacade.RESIZE = "resize";

SjamayeeFacade.OLIST = "oList";                                              //verify !!!
SjamayeeFacade.OLIST_DATA = SjamayeeFacade.OLIST+"Data";
SjamayeeFacade.OLIST_DATA_OBJECT = SjamayeeFacade.OLIST_DATA+SjamayeeFacade.OBJECT;
SjamayeeFacade.OLIST_DATA_OBJECT_ADD = SjamayeeFacade.OLIST_DATA_OBJECT+"Add";
SjamayeeFacade.OLIST_DATA_OBJECT_DELETE = SjamayeeFacade.OLIST_DATA_OBJECT+"Delete";
SjamayeeFacade.OLIST_DATA_OBJECT_EDIT = SjamayeeFacade.OLIST_DATA_OBJECT+"Edit";
SjamayeeFacade.OLIST_DATA_OBJECT_UNDO = SjamayeeFacade.OLIST_DATA_OBJECT+"Undo";
SjamayeeFacade.OLIST_DATA_OBJECT_REDO = SjamayeeFacade.OLIST_DATA_OBJECT+"Redo";
SjamayeeFacade.OLIST_DATA_BUFFER_CLEAR = SjamayeeFacade.OLIST_DATA+"BufferClear";
SjamayeeFacade.OLIST_DATA_TEXT = SjamayeeFacade.OLIST_DATA+"Text";                  //verify !!!
SjamayeeFacade.OLIST_DATA_TEXT_EDIT = SjamayeeFacade.OLIST_DATA_TEXT+"Edit";
SjamayeeFacade.OLIST_DATA_OBJECT_UNREFS_DELETE = "dataOlistDeleteUnrefObjects";

SjamayeeFacade.OLIST_MODEL = "modelOlist";
SjamayeeFacade.OLIST_MODEL_OBJECT = SjamayeeFacade.OLIST_MODEL+"Object";
SjamayeeFacade.OLIST_MODEL_OBJECT_ADD = SjamayeeFacade.OLIST_MODEL_OBJECT+"Add";
SjamayeeFacade.OLIST_MODEL_OBJECT_DELETE = SjamayeeFacade.OLIST_MODEL_OBJECT+"Delete";
SjamayeeFacade.OLIST_MODEL_OBJECT_EDIT = SjamayeeFacade.OLIST_MODEL_OBJECT+"Edit";
SjamayeeFacade.OLIST_MODEL_OBJECT_UNDO = SjamayeeFacade.OLIST_MODEL_OBJECT+"Undo";
SjamayeeFacade.OLIST_MODEL_OBJECT_REDO = SjamayeeFacade.OLIST_MODEL_OBJECT+"Redo";
SjamayeeFacade.OLIST_MODEL_BUFFER_CLEAR = SjamayeeFacade.OLIST_MODEL+"BufferClear";
SjamayeeFacade.OLIST_MODEL_TEXT_EDIT = SjamayeeFacade.OLIST_MODEL+"TextEdit";
SjamayeeFacade.OLIST_MODEL_OBJECT_UNREFS_DELETE = SjamayeeFacade.OLIST_MODEL+"DeleteUnrefObjects";

SjamayeeFacade.OBJECT = "object";
SjamayeeFacade.OBJECT_DATA = SjamayeeFacade.OBJECT+"Data";
SjamayeeFacade.OBJECT_MODEL = SjamayeeFacade.OBJECT+"Model";
SjamayeeFacade.OBJECT_DETAIL = SjamayeeFacade.OBJECT+"Detail";
SjamayeeFacade.OBJECT_DATA_DETAIL = SjamayeeFacade.OBJECT_DATA+"Detail";
SjamayeeFacade.OBJECT_MODEL_DETAIL = SjamayeeFacade.OBJECT_MODEL+"Detail";
SjamayeeFacade.OBJECT_ADD = SjamayeeFacade.OBJECT+"Add";
SjamayeeFacade.OBJECT_DATA_ADD = SjamayeeFacade.OBJECT_DATA+"Add";
SjamayeeFacade.OBJECT_MODEL_ADD = SjamayeeFacade.OBJECT_MODEL+"Add";
SjamayeeFacade.OBJECT_DELETE = SjamayeeFacade.OBJECT+"Delete";
SjamayeeFacade.OBJECT_DATA_DELETE = SjamayeeFacade.OBJECT_DATA+"Delete";
SjamayeeFacade.OBJECT_MODEL_DELETE = SjamayeeFacade.OBJECT_MODEL+"Delete";
SjamayeeFacade.OBJECT_EDIT = SjamayeeFacade.OBJECT+"Edit";
SjamayeeFacade.OBJECT_DATA_EDIT = SjamayeeFacade.OBJECT_DATA+"Edit";
SjamayeeFacade.OBJECT_MODEL_EDIT = SjamayeeFacade.OBJECT_MODEL+"Edit";
SjamayeeFacade.OBJECT_SAVE = SjamayeeFacade.OBJECT+"Save";
SjamayeeFacade.OBJECT_DATA_SAVE = SjamayeeFacade.OBJECT_DATA+"Save";
SjamayeeFacade.OBJECT_MODEL_SAVE = SjamayeeFacade.OBJECT_MODEL+"Save";
SjamayeeFacade.OBJECT_CANCEL = SjamayeeFacade.OBJECT+"Cancel";
SjamayeeFacade.OBJECT_DATA_CANCEL = SjamayeeFacade.OBJECT_DATA+"Cancel";
SjamayeeFacade.OBJECT_MODEL_CANCEL = SjamayeeFacade.OBJECT_MODEL+"Cancel";
SjamayeeFacade.OBJECT_SAVED = SjamayeeFacade.OBJECT+"Saved";
SjamayeeFacade.OBJECT_DELETED = SjamayeeFacade.OBJECT+"Deleted";
SjamayeeFacade.OBJECT_SHOW = SjamayeeFacade.OBJECT+"Show";
SjamayeeFacade.OBJECT_UNDO = SjamayeeFacade.OBJECT+"Undo";
SjamayeeFacade.OBJECT_DATA_UNDO = SjamayeeFacade.OBJECT_DATA+"Undo";
SjamayeeFacade.OBJECT_MODEL_UNDO = SjamayeeFacade.OBJECT_MODEL+"Undo";
SjamayeeFacade.OBJECT_REDO = SjamayeeFacade.OBJECT+"Redo";
SjamayeeFacade.OBJECT_DATA_REDO = SjamayeeFacade.OBJECT_DATA+"Redo";
SjamayeeFacade.OBJECT_MODEL_REDO = SjamayeeFacade.OBJECT_MODEL+"Redo";
SjamayeeFacade.OBJECT_BUFFER_CLEAR = SjamayeeFacade.OBJECT+"BufferClear";
SjamayeeFacade.OBJECT_DATA_BUFFER_CLEAR = SjamayeeFacade.OBJECT_DATA+"BufferClear";
SjamayeeFacade.OBJECT_MODEL_BUFFER_CLEAR = SjamayeeFacade.OBJECT_MODEL+"BufferClear";
SjamayeeFacade.OBJECT_UNREFS_DELETE = "deleteUnrefObjects";
SjamayeeFacade.OBJECT_DATA_UNREFS_DELETE = "deleteUnrefDataObjects";
SjamayeeFacade.OBJECT_MODEL_UNREFS_DELETE = "deleteUnrefModelObjects";
SjamayeeFacade.OBJECT_SFDC_SHOW = SjamayeeFacade.OBJECT+"SFDCShow";
SjamayeeFacade.OBJECT_DATA_SFDC_SHOW = SjamayeeFacade.OBJECT_DATA+"SFDCShow";
SjamayeeFacade.OBJECT_MODEL_SFDC_SHOW = SjamayeeFacade.OBJECT_MODEL+"SFDCShow";

SjamayeeFacade.TEXT = "text";
SjamayeeFacade.TEXT_KEYUP = SjamayeeFacade.TEXT+"Keyup";
SjamayeeFacade.TEXT_EDIT = SjamayeeFacade.TEXT+"Edit";
SjamayeeFacade.TEXT_SAVE = SjamayeeFacade.TEXT+"Save";
SjamayeeFacade.TEXT_CANCEL = SjamayeeFacade.TEXT+"Cancel";
SjamayeeFacade.TEXT_RESIZE = SjamayeeFacade.TEXT+"Resize"
SjamayeeFacade.TEXT_RELATION = SjamayeeFacade.TEXT+SjamayeeFacade.RELATION;
SjamayeeFacade.TEXT_RELATION_EDIT = SjamayeeFacade.TEXT_RELATION+"Edit";
SjamayeeFacade.TEXT_PARENT = SjamayeeFacade.TEXT+SjamayeeFacade.PARENT;         //verify !!!
SjamayeeFacade.TEXT_PARENT_EDIT = SjamayeeFacade.TEXT_PARENT+"Edit";
SjamayeeFacade.TEXT_CHILD = SjamayeeFacade.TEXT+SjamayeeFacade.CHILD;           //verify !!!
SjamayeeFacade.TEXT_CHILD_EDIT = SjamayeeFacade.TEXT_CHILD+"Edit";

SjamayeeFacade.getInstance = function() {
  if (Facade.instance === undefined)  {
    //The classFactory is used as a descriptor for the ApplicatonFacade
    //when hierarchical relationships are required as in this case.);
    var classFactory = new Class(new SjamayeeFacade());
    Facade.instance = new classFactory();
  }
  return Facade.instance;
};

//Controller

//Class: PrepModelCommand
var PrepModelCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var app = note.getBody();
    this.facade.registerProxy(new SettingProxy());
    this.facade.registerProxy(new ModelEntityProxy());
    this.facade.registerProxy(new TypeProxy());
    //this.facade.registerProxy(new ModelTypeProxy());    
    this.facade.registerProxy(new ModelAttributeProxy());
    this.facade.registerProxy(new ModelRelationProxy());
    this.facade.registerProxy(new DataEntityProxy());
    this.facade.registerProxy(new DataTypeProxy());
    this.facade.registerProxy(new DataAttributeProxy());
    this.facade.registerProxy(new DataRelationProxy());
    //PROXYTEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //Type
  /*WebService static String getTypes()
    WebService static String getTypesAndFields()
    WebService static String getTypeExpanded(String id)
    WebService static String getSfdcFieldNames(String typeName)
    //WebService static String getSfdcAttributes()*/
    //var typeProxy = this.facade.retrieveProxy(ModelTypeProxy.ID);
    //var types = sforce.apex.execute('sja.TypeService','getTypes',{});
    //alert("typeProxy/types: \n"+String(types).substring(0,500)); //types.substring(0,200));
    //var dataTypes = sforce.apex.execute('sja.TypeService','getDataTypes',{});
    //alert("typeProxy/dataTypes: \n"+String(dataTypes).substring(0,800));
  /*var typesAndFields = sforce.apex.execute('sja.TypeService','getTypesAndFields',{});
    alert("typeProxy/typesAndFields: \n"+String(typesAndFields).substring(0,500)); //typesAndFields.substring(0,200));
    var typeExpanded = sforce.apex.execute('sja.TypeService','getTypeExpanded',{id:'a0J80000000ekGo'});
    alert("typeProxy/typeExpanded: \n"+String(typeExpanded).substring(0,500)); //typeExpanded.substring(0,200));
    var sfdcFieldNames = sforce.apex.execute('sja.TypeService','getSfdcFieldNames',{typeName:'ACCT'});
    alert("typeProxy/sfdcFieldNames: \n"+String(sfdcFieldNames).substring(0,500)); //sfdcFieldNames.substring(0,200));
    var sfdcFieldNames = sforce.apex.execute('sja.TypeService','getSfdcFieldNames',{typeName:'Account'});
    alert("typeProxy/sfdcFieldNames: \n"+String(sfdcFieldNames).substring(0,500)); //sfdcFieldNames.substring(0,200));*/
    //DataType
    //var dataTypeProxy = this.facade.retrieveProxy(DataTypeProxy.ID);
    //dataTypeProxy.loadTypes();    
    //var dataTypes = dataTypeProxy.getData();    
    //alert("dataTypeProxy/dataTypes: \n"+String(dataTypes).substring(0,500));
    //ModelEntity
    //WebService static String getEntities()
    //WebService static String getSfdcObject(String oid, String entityType)
    //WebService static String getSfdcAttributes()
    //var modelEntityProxy = this.facade.retrieveProxy(ModelEntityProxy.ID);
    //var modelEntities = sforce.apex.execute('sja.ModelEntityService','getEntities',{});
    //alert("modelEntityProxy/entities: \n"+String(modelEntities).substring(0,700));
    //var modelSfdcObject = sforce.apex.execute('sja.ModelEntityService','getSfdcObject',{oid:'0018000000MrOMb', entityType:'Account'}); //sForce !!!
    //alert("modelEntityProxy/modelSfdcObject: \n"+String(modelSfdcObject).substring(0,500));
    //var modelAttributes = sforce.apex.execute('sja.ModelEntityService','getSfdcAttributes',{});
    //alert("modelEntityProxy/modelAttributes: \n"+String(modelAttributes).substring(0,500));
    //DataEntity
    //WebService static String getEntities()
    //WebService static String getEntitiesByType(Integer rows)
    //WebService static String getFirst(Criteria criteria)
    //WebService static String getNext(Criteria criteria)
    //WebService static String getPrevious(Criteria criteria)
    //WebService static String getLast(Criteria criteria)
    //WebService static String getEntityExpandedById(String id, Boolean typeExpansion)
    //WebService static String getEntityExpandedByName(String name, Boolean typeExpansion)
    //WebService static String getSfdcObject(String oid, String entityType)
    //WebService static String getSfdcAttributes()
    /*var dataEntityProxy = this.facade.retrieveProxy(DataEntityProxy.ID);
    var dataEntities = sforce.apex.execute('sja.DataEntityService','getEntities',{});
    alert("dataEntityProxy/entities: \n"+String(dataEntities).substring(0,500));
    //var dataSfdcObject = sforce.apex.execute('sja.DataEntityService','getSfdcObject',{oid:'0018000000MrOMb', entityType:'Account'}); //sForce !!!
    //alert("dataEntityProxy/dataSfdcObject: \n"+String(dataSfdcObject).substring(0,500));
    var dataSfdcObject = sforce.apex.execute('sja.DataEntityService','getSfdcObject',{oid:'a0E80000001RRoZEAW', entityType:'Lead'}); //Andy Young
    alert("dataEntityProxy/dataSfdcObject: \n"+String(dataSfdcObject).substring(0,500));*/
    //DataRelation
    //WebService static String getRelations()
    //WebService static String getTypesInColumns(Integer rows)
    //var dataRelationProxy = this.facade.retrieveProxy(DataRelationProxy.ID);
    //var dataRelations = sforce.apex.execute('sja.DataRelationService','getRelations',{});
    //alert("dataRelationProxy/dataRelations: \n"+String(dataRelations).substring(0,1000));
    //var entityRelations = sforce.apex.execute('sja.DataRelationService','getParentRelations',{'entityId':'a0E80000001RRpP','size':25});
    //alert("dataRelationProxy/entityRelations: \n"+String(entityRelations).substring(0,1000));
  }
});

//Class: PrepViewCommand
var PrepViewCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var app = note.getBody();
  /*alert("PrepViewCommand - app: "+app.appName);
    alert("PrepViewCommand - app.header: "+app.header+
          "\napp.header.dataObjectsHeader: "+app.header.dataObjectsHeader+
          "\napp.header.dataRelationsHeader: "+app.header.dataRelationsHeader+
          "\napp.header.modelObjectsHeader: "+app.header.modelObjectsHeader+
          "\napp.header.modelRelationsHeader: "+app.header.modelRelationsHeader);*/
    //this.facade.registerMediator(new HeaderMediator(app.header));
    //this.facade.registerMediator(new DataDetailMediator(app.detail));
    this.facade.registerMediator(new DataObjectNTDMediator(app.detail.splitter.left.dataObjectNTD));
    this.facade.registerMediator(new DataObjectPropertiesMediator(app.detail.splitter.right.dataObjectProperties));
    this.facade.registerMediator(new DataParentDetailMediator(app.detail));
    this.facade.registerMediator(new DataChildDetailMediator(app.detail));
    //this.facade.registerMediator(new ModelDetailMediator(app.detail));    
    this.facade.registerMediator(new ModelObjectNTDMediator(app.detail.splitter.left.modelObjectNTD));
    this.facade.registerMediator(new ModelObjectPropertiesMediator(app.detail.splitter.right.modelObjectProperties));
    this.facade.registerMediator(new ModelParentDetailMediator(app.detail));    
    this.facade.registerMediator(new ModelChildDetailMediator(app.detail));   
    //this.facade.registerMediator(new ToolBarMediator(app.toolBar));
    this.facade.registerMediator(new DataGridListMediator(app.gridList));
    if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {
      this.facade.registerMediator(new ModelGridListMediator(app.gridList));
      this.facade.registerMediator(new ModelObjectsTextsEditorMediator(app.gridList));
      this.facade.registerMediator(new ModelRelationsTextsEditorMediator(app.gridList));
    }
    this.facade.registerMediator(new HeaderMediator(app.header));
    this.facade.registerMediator(new ToolBarMediator(app.toolBar));
    //Show Data Relations Grid.
    this.sendNotification(SjamayeeFacade.GRID_DATA_SHOW);
  }
});

//Class: ShowCommonCommand
var ShowCommonCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var app = note.getBody();
  //this.facade.registerMediator(new HeaderMediator(app.header));
  //this.facade.registerMediator(new CommonHeaderMediator(app.commonHeader));
  //this.facade.registerMediator(new GridListMediator(app.gridList));
  //this.facade.registerMediator(new ToolBarMediator(app.toolBar));
  //this.facade.registerMediator(new DetailMediator(app.detail));

  //this.facade.registerMediator(new ObjectsHeaderMediator(app.objectsHeader));
  //this.facade.registerMediator(new RelationsHeaderMediator(app.relationsHeader));
  }
});

//Class: StartupCommand
var StartupCommand = new Class({
  Extends: MacroCommand,
  initializeMacroCommand: function(note) {    
    this.addSubCommand(PrepModelCommand);
    this.addSubCommand(PrepViewCommand);
  //this.addSubCommand(PrepDataModelCommand);
  //this.addSubCommand(PrepDataViewCommand);
  //this.addSubCommand(PrepModelModelCommand);
  //this.addSubCommand(PrepModelViewCommand);
  }
});

////////////////////////////////////////////////////////
//Controller ///////////////////////////////////////////
//Commands /////////////////////////////////////////////
////////////////////////////////////////////////////////
/*
//Class: ShowObjectsCommand
var ShowObjectsCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    try {
      if (!_of) {
        _of = new ObjectsForm();
      }
      //Set that an event is happend!
      _of.setEventHappened(true);
      _of.build();
      _of.fill();
    //_of.resizeSplitters("width:20%;display:block;","width:80%;display:block;"); 
      _of.setFocusOnList();
    //this.sendNotification(SjamayeeFacade.OLIST_SHOWED);
    } catch(error) {
      alert("ShowObjectsCommand Error: "+error.message);
    }
  }
});

//Class: ShowRelationsCommand
var ShowRelationsCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    try {     
      if (!_rf) {
        _rf = new RelationsForm();
      }
      //Set that an event is happend!
      _rf.setEventHappened(true);       
      _rf.build();
      _rf.fill();
    //_rf.resizeSplitters("width:20%;display:block;","width:80%;display:block;");   
      _rf.setFocusOnList();
    //this.sendNotification(SjamayeeFacade.GRID_SHOWED);
    } catch(error) {
      alert("ShowRelationsCommand Error: "+error.message);
    }
  }
});
*/
/*
/////////////////////////
//NAVIGATION COMMANDS ***
/////////////////////////
//Class: LeftCommand
var LeftCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var gridView = _grid.getGridView();
    if (gridView) {
      gridView.left();
    }
  }
});

//Class: RightCommand
var RightCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var gridView = _grid.getGridView();
    if (gridView) {
      gridView.right();
    }
  }
});

//Class: UpCommand
var UpCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var gridView = _grid.getGridView();
    if (gridView) {
      gridView.up();
    }
  }
});

//Class: DownCommand
var DownCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var gridView = _grid.getGridView();
    if (gridView) {
      gridView.down();
    }
  }
});

//Class: HomeCommand
var HomeCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var gridView = _grid.getGridView();
    if (gridView) {
      gridView.home();
    }
  }
});

//Class: EndCommand
var EndCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var gridView = _grid.getGridView();
    if (gridView) {
      gridView.end();
    }
  }
});

//Class: PreviousCommand
var PreviousCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var gridView = _grid.getGridView();
    if (gridView) {
      gridView.previousPage();
    }
  }
});

//Class: NextCommand
var NextCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var gridView = _grid.getGridView();
    if (gridView) {
      gridView.nextPage();
    }
  }
});

//Class: FirstCommand
var FirstCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var gridView = _grid.getGridView();
    if (gridView) {
      gridView.firstPage();
    }
  }
});

//Class: LastCommand
var LastCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var gridView = _grid.getGridView();
    if (gridView) {
      gridView.lastPage();
    }
  }
});

//Class: SpaceCommand
var SpaceCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var gridView = _grid.getGridView();
    if (gridView) {
      gridView.root();
    }
  **if (this.getKeyCode() == SKeyboard.SPACE) {
      //Utils.alert("SPACE: GOTO ROOT");
      this.setKeyCodes(SKeyboard.SPACE_TEXT);
      if (_cf instanceof ObjectsForm) {
        if (_of.isFocusOnList() === true) {
          _of.setFocusOnObjectProperties();
        } else {
          _of.setFocusOnList();
        }
      } else {
        _cf.gotoRoot(position);  !!! param = position
      //this.sendNotification(SjamayeeFacade.ROOT_SELECTED);                
      }
    }**
  }
});

//Class: EnterCommand
var EnterCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
  }
});
*/

///////////////////////////
//COMMON (R&O) COMMANDS ***
///////////////////////////
//Abstract
//Class: UndoCommand
var UndoCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    this.mediator = note.getBody();
    try {
      //Insert logic here ... 
      //Get last Done-command from buffer.
      var commandBuffer = this.mediator.getCommandBuffer();
      var previousCommand = commandBuffer.getFirstUnDoneIfNoDone();
      //var newCommand = null;
      var sourceName = null;
      //if (previousCommand && previousCommand.isDone()) {
      if (previousCommand) {
        switch (previousCommand.getName()) {        
          case Command.ADD:
          case Command.EDT:
          case Command.CPY:
          case Command.DEL:
          case Command.EXT:
          case Command.PST:
          case Command.NAV:
          this.groupCommands = commandBuffer.getAllCommandsForGroup(previousCommand);
          if (this.groupCommands && this.groupCommands.length > 0) {
            //Reverse the order of the array, for UNDO !!!
            this.groupCommands.reverse();
            var groupName = null;
            var groupId = null;
            for (var i = 0; i < this.groupCommands.length; i++) {
              if (this.groupCommands[i]) {
                var cmd = this.groupCommands[i];
                if (cmd.getName() != Command.NAV) {
                  if (cmd.isUnDone() === true) { continue; }
                }
                if (cmd.getGroupName().substr(0,3) == Command.GRP) {
                  if (groupName === null) { groupName = cmd.getGroupName(); }
                }
                if (sourceName === null) { sourceName = cmd.getSourceName(); }
                if (cmd.getSourceName() != sourceName) { break; }
                switch (cmd.getName()) {        
                  case Command.ADD: this.undo_add(cmd); break;
                  case Command.EDT: this.undo_edit(cmd); break;
                  case Command.CPY: this.undo_copy(cmd); break;
                  case Command.DEL: this.undo_delete(cmd); break;
                  case Command.EXT: this.undo_extract(cmd); break;
                  case Command.PST: this.undo_paste(cmd); break;
                  case Command.NAV: this.undo_navigation(cmd); break;
                  default: break;
                }
              }
            }
          }
          break;
          default:
          break;
        }
      } else {
        Utils.beep(0);      
      }
      //this.mediator.setMessageText("Undone.");
    } catch(error) {
      Utils.alert("UndoCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },

//Abstract
  undo_add: function(cmd) { return undefined; },
  undo_edit: function(cmd) { return undefined; },
  undo_copy: function(cmd) { return undefined; },
  undo_delete: function(cmd) { return undefined; },
  undo_extract: function(cmd) { return undefined; },
  undo_paste: function(cmd) { return undefined; },
  undo_navigation: function(cmd) { return undefined; },
});

//Class: RedoCommand
var RedoCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    this.mediator = note.getBody();
    try {
      //Insert logic here ... 
      //Get first UnDone-command from buffer.
      this.groupCommands = null;
      var commandBuffer = this.mediator.getCommandBuffer();
      var previousCommand = commandBuffer.getLastDoneIfNoUnDone();    
      var sourceName = null;
      var groupName = null;
      var groupId = null;
      var cmd = null;
      //if (previousCommand && previousCommand.isUnDone()) {
      if (previousCommand) {
        switch (previousCommand.getName()) {        
          case Command.ADD:
          case Command.EDT:
          case Command.CPY:
          case Command.DEL:
          case Command.EXT:
          case Command.PST:
          case Command.NAV:
          this.groupCommands = commandBuffer.getAllCommandsForGroup(previousCommand);
          if (this.groupCommands && this.groupCommands.length > 0) {
            for (var i = 0; i < this.groupCommands.length; i++) {
              if (this.groupCommands[i]) {
                cmd = this.groupCommands[i];
                if (cmd.getName() != Command.NAV) {
                  if (cmd.isDone() === true) { continue; }
                }             
                if (cmd.getGroupName().substr(0,3) == Command.GRP) {
                  if (groupName === null) { groupName = cmd.getGroupName(); }
                }
                if (sourceName === null) { sourceName = cmd.getSourceName(); }                            
                if (cmd.getSourceName() != sourceName) { break; }
                switch (cmd.getName()) {        
                  case Command.ADD: this.redo_add(cmd); break;
                  case Command.EDT: this.redo_edit(cmd); break;
                  case Command.CPY: this.redo_copy(cmd); break;
                  case Command.DEL: this.redo_delete(cmd); break;
                  case Command.EXT: this.redo_extract(cmd); break;
                  case Command.PST: this.redo_paste(cmd); break;
                  case Command.NAV: this.redo_navigation(cmd); break;
                  default: break;
                }
              }
            }
          }
          break;
          default:
          break;
        }
      } else {
        Utils.beep(0);      
      }
      //this.mediator.setMessageText("Redone.");
    } catch(error) {
      Utils.alert("RedoCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  
  //Abstract
  redo_add: function(cmd) { return undefined; },
  redo_edit: function(cmd) { return undefined; },
  redo_copy: function(cmd) { return undefined; },
  redo_delete: function(cmd) { return undefined; },
  redo_extract: function(cmd) { return undefined; },
  redo_paste: function(cmd) { return undefined; },
  redo_navigation: function(cmd) { return undefined; },
});

//Abstract
//Class: ClearBufferCommand
var ClearBufferCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    this.mediator = note.getBody();
    try {
      var content = '';
      var commandBuffer = this.mediator.getCommandBuffer();
      if (commandBuffer) {
        var buffer = commandBuffer.getBuffer();
        for (var i = 0; i < buffer.length; i++) {
          if (buffer[i]) {
            var command = buffer[i];
            content += command.print()+"\n";
          }
        }
        //MUST STAY *** ALERT ***
        //alert("ClearBufferCommand - commandBuffer:\n"+commandBuffer.print());
      }
      this.mediator.setCommandBuffer(new CommandBuffer());
      this.mediator.setLastCommand(null,false);
      this.mediator.setMessageText("Relation Buffer cleared.");
    } catch(error) {
      Utils.alert("ClearBufferCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: ResetViewCommand
var ResetViewCommand = new Class({
  Extends: SimpleCommand,
  initialize: function() {
    this.parent();
    this.percent = 35;
  },  
  execute: function(note) {
    this.mediator = note.getBody();
    var gridList = this.mediator.getViewComponent();
    var gridSplitter = null;
    var listPaneLeft = null;
    try {
      if (dijit) {
        gridSplitter = dijit.byId(GridListSplitter.ID);
        listPaneLeft = dijit.byId(GridListLeft.ID);
        if (listPaneLeft) {
          listPaneLeft.attr("style","width:"+this.percent+"%;");
          listPaneLeft.attr("sizeShare",this.percent);
        }
      }
      this.mediator.setMessageText("View reset.");
    } catch(error) {
      Utils.alert("ResetViewCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      if (gridSplitter) {
        gridSplitter.resize();
      }
    }
  }
});

///////////////////////
//RELATION COMMANDS ***
///////////////////////
//Abstract
//Class: AddRelationCommand
var AddRelationCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    try {
      this.mediator = note.getBody();
      this.mediator.sourceName = null;
      this.mediator.groupId = null;
      this.mediator.currentRelation = null;
      this.mediator.previousRelation = null;
      this.mediator.nextRelation = null;
      this.mediator.childRelation = new DataRelation(null,"",null,null,null,null);
      if (this instanceof AddModelRelationCommand) {
        this.mediator.childRelation = new ModelRelation(null,"",null,null,null,null);
      }
      var grid = this.mediator.getGrid();
      var gridView = grid.getGridView();
      var currentNivo = grid.getCurrentNivo();      
      var gridColumn = grid.getColumnByNivo(currentNivo);
      var cell = gridView.getCurrentCell();
      var parentEntity = grid.getRootEntity();
      if (gridColumn) {
        var master = gridColumn.getMaster();
        if (master) {
          var masterRelation = master.getRelation();
          if (masterRelation) {
            parentEntity = masterRelation.getChildEntity();         
          }
        }
      }
      var childCell = null;
      if (cell) {
        this.mediator.currentRelation = cell.getRelation();
        if (this.mediator.currentRelation) {
          //parentEntity = this.mediator.currentRelation.getParentEntity();         
          this.mediator.previousRelation = this.mediator.currentRelation;
          this.mediator.nextRelation = null;
          if (this.mediator.currentRelation.getNext()) {
            this.mediator.nextRelation = this.mediator.currentRelation.getNext();
          }
          /* TODO: !!!!!!!
          if (_kb.getShift() === true) {                                     // TODO: _kb !!!!!!
            this.mediator.previousRelation = null;
            if (this.mediator.currentRelation.getPrevious()) {
              this.mediator.previousRelation = this.mediator.currentRelation.getPrevious();
            }
            this.mediator.nextRelation = this.mediator.currentRelation;
          }*/
        }
        childCell = new GridCell(this.mediator.childRelation);
      }
      if (childCell === null) {
        //*** EMPTY CELL ***
        //Get current cell in previous column OR Root !!!
        //Get relation
        //Parent Entity = this.getChildEntity()
        //pei = this.getCei(); 
        //Create new relation
        //this.mediator.childRelation = new Relation(null,"",pei,null,null,null);
        childCell = new GridCell(this.mediator.childRelation);
        /*if (gridColumn) {
          childCell.setGridColumn(gridColumn);
        }*/
      }
      if (this.mediator.childRelation) {
        if (parentEntity) {
          this.mediator.childRelation.setPei(parentEntity.getId());
        }
        var groupId = null;
        var sourceName = null;
        if (Utils.group() === true) {
          var lastGroupCommand = this.mediator.getLastGroupCommand();           //TODO: !!!!!
          if (lastGroupCommand) {
            sourceName = lastGroupCommand.getGroupName()+"/0";
            groupId = lastGroupCommand.getGroupId();
          }
          if (sourceName === null) {
            sourceName = Command.GRP;
          }           
        }         
        if (sourceName === null) {
          sourceName = Command.ADD;
        }           
        this.mediator.sourceName = sourceName;
        this.mediator.groupId = groupId;
        //TODO: this.mediator.setChildCell(childCell);                        //VERIFY THIS !!! >>TODO !!!
        
        //TODO: REFACTOR !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //gridColumn.setRefreshNow(false);
        //document.getElementById(Entity.CHILD_NAME_ID).focus();
      }      
      //this.sendNotification(SjamayeeFacade.RELATION_ADDED,this.mediator);
    } catch(error) {
      Utils.alert("AddRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: AddDataRelationCommand
var AddDataRelationCommand = new Class({
  Extends: AddRelationCommand,
  execute: function(note) {
    try {
      var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
      //Mode: INSERT/EDIT!
      if (mediator.setEdit() == GridListMediator.MODE_EDIT) {
        //Child display
        this.sendNotification(SjamayeeFacade.GRID_DATA_CHILD_SHOW);
        //if (this.getDetailDisplay() == "PARENT") { this.showChild(); }
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_ADDED,this.mediator);
        this.mediator.setMessageText("Add relation...");
      }                 
    } catch(error) {
      Utils.alert("AddDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: AddModelRelationCommand
var AddModelRelationCommand = new Class({
  Extends: AddRelationCommand,
  execute: function(note) {
    try {
      var mediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
      //Mode: INSERT/EDIT!
      if (mediator.setEdit() == GridListMediator.MODE_EDIT) {
        //Child display
        this.sendNotification(SjamayeeFacade.GRID_MODEL_CHILD_SHOW);
        //if (this.getDetailDisplay() == "PARENT") { this.showChild(); }
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_ADDED,this.mediator);
        this.mediator.setMessageText("Add relation...");
      }
    } catch(error) {
      Utils.alert("AddModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: DeleteRelationCommand
var DeleteRelationCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    try {
      this.mediator = note.getBody();
      this.mediator.currentRelation = null;
      this.mediator.previousRelation = null;
      this.mediator.nextRelation = null;
      var grid = this.mediator.getGrid();
      var gridView = grid.getGridView();
      var cell = gridView.getCurrentCell();
      if (cell) {
        this.mediator.currentRelation = cell.getRelation();
        if (this.mediator.currentRelation) {
          this.mediator.previousRelation = this.mediator.currentRelation.getPrevious();
          this.mediator.nextRelation = this.mediator.currentRelation.getNext();
          //this.mediator.childRelation = Relation.clone(this.mediator.currentRelation);
          this.mediator.childRelation = this.mediator.currentRelation.clone();
          if (this.mediator.childRelation) {
            var relation = this.mediator.childRelation.remove(this.mediator);
            if (relation) {
              var command = new RelationCommand(Command.DEL);
              if (command) {
                command.setRelation(relation);
                command.setNivo(gridView.getCurrentNivo());
                command.setPosition(gridView.getPosition());
                var lastGroupCommand = this.mediator.getLastGroupCommand();
                this.mediator.setLastCommand(command,true);
                var groupId = null;
                var sourceName = null;
                if (Utils.group() === true) {
                  if (lastGroupCommand) {
                    sourceName = lastGroupCommand.getSourceName();
                    groupId = lastGroupCommand.getGroupId();
                  } 
                  if (groupId === null) { groupId = command.getId(); }
                  if (sourceName === null) { sourceName = Command.GRP+"_"+groupId; }
                } else {
                  groupId = command.getId();
                  sourceName = Command.DEL+"_"+groupId;
                }
                command.setSourceName(sourceName);
                //ATT: After setting sourceName, get groupName to construct final sourceName !!!
                var seq1Id = command.getId();
                command.setSourceName(command.getGroupName()+"/"+seq1Id);
              }
            }
          }
        }
      }
      //this.sendNotification(SjamayeeFacade.RELATION_DELETED,this.mediator);
    } catch(error) {
      Utils.alert("DeleteRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: DeleteDataRelationCommand
var DeleteDataRelationCommand = new Class({
  Extends: DeleteRelationCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        //this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_DELETE_LBL,true);
        //Insert logic here ... 
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_DELETED,this.mediator);     
        this.mediator.setMessageText("Relation deleted.");
      }
    } catch(error) {
      Utils.alert("DeleteDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: DeleteModelRelationCommand
var DeleteModelRelationCommand = new Class({
  Extends: DeleteRelationCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        //if (this.getDetailDisplay() == "PARENT") { this.showChild(); }
        //this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_DELETE_LBL,true);
        //Insert logic here ... 
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_DELETED,this.mediator);     
        this.mediator.setMessageText("Relation deleted.");
      }
    } catch(error) {
      Utils.alert("DeleteModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: EditRelationCommand
var EditRelationCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    try {
      this.mediator = note.getBody();
      var grid = this.mediator.getGrid();
      var gridView = grid.getGridView();
      var cell = gridView.getCurrentCell();
      if (cell) {
        this.mediator.childRelation = cell.getRelation();
        if (this.mediator.childRelation) {    
          this.mediator.groupId = null;
          this.mediator.sourceName = null;  
          var sourceName = null;
          if (Utils.group() === true) {
            var lastGroupCommand = this.mediator.getLastGroupCommand();
            if (lastGroupCommand) {
              if (lastGroupCommand.getName() == Command.EDT) {
                sourceName = lastGroupCommand.getSourceName();
                if (lastGroupCommand.getRelation().getId() != this.mediator.childRelation.getId()) {
                  sourceName = lastGroupCommand.getGroupName()+"/0";
                }
              } else {
                sourceName = lastGroupCommand.getGroupName()+"/0";
              }
            } 
            if (sourceName === null) {
              sourceName = Command.GRP;
            }
          }
          if (sourceName === null) {
            sourceName = Command.EDT;
          }
          this.mediator.sourceName = sourceName;
        }
      }
      //this.sendNotification(SjamayeeFacade.RELATION_EDITING,this.mediator);     
      this.mediator.setMessageText("Edit relation...");
    } catch(error) {
      Utils.alert("EditRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: EditDataRelationCommand
var EditDataRelationCommand = new Class({
  Extends: EditRelationCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: EDIT!
      if (mediator.setEdit() == GridListMediator.MODE_EDIT) {
        //Child display
        this.sendNotification(SjamayeeFacade.GRID_DATA_CHILD_SHOW);
        //if (this.getDetailDisplay() == "PARENT") { this.showChild(); }
        //Insert logic here ... 
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_EDITING,this.mediator);     
        this.mediator.setMessageText("Edit relation...");
      }
    } catch(error) {
      Utils.alert("EditDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: EditModelRelationCommand
var EditModelRelationCommand = new Class({
  Extends: EditRelationCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: EDIT!
      if (mediator.setEdit() == GridListMediator.MODE_EDIT) {
        //Child display
        this.sendNotification(SjamayeeFacade.GRID_MODEL_CHILD_SHOW);
        //if (this.getDetailDisplay() == "PARENT") { this.showChild(); }
        //Insert logic here ... 
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_EDITING,this.mediator);     
        this.mediator.setMessageText("Edit relation...");
      }
    } catch(error) {
      Utils.alert("EditModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: SaveRelationCommand
var SaveRelationCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    try {
      this.mediator = note.getBody();
      var grid = this.mediator.getGrid();
      var gridView = grid.getGridView();
      var originalEntityValues = null;
      var commandName = Command.EDT;
      if (this.mediator.childRelation.getId() === null) {
        commandName = Command.ADD;
      }
      if (commandName == Command.EDT) {
        if (this.mediator.childRelation.getCei()) {
          //var entity = Entity.getById(this.mediator.childRelation.getCei());
          var entity = this.mediator.childRelation.getChildEntity();
          //originalEntityValues = Entity.clone(entity);
          originalEntityValues = (entity)?entity.clone():null;
          originalEntityValues.setTypeObject(entity.getTypeObject());
          //originalEntityValues.setAttributeList(entity.getAttributeList());
          originalEntityValues.setAttributeList(entity.getChildAttributeList());
        }
      }
      var relation = this.mediator.childRelation.save(this.mediator);
      if (relation) {
        var command = new RelationCommand(commandName);
        if (command) {
          command.setRelation(relation);
          if (gridView) { 
            command.setNivo(gridView.getCurrentNivo());
            command.setPosition(gridView.getPosition());
          }       
          this.setLastCommand(command,true);                          //TODO: this !!!!
          if ((this.mediator.sourceName == Command.EDT) ||
              (this.mediator.sourceName == Command.GRP)) {
            this.mediator.sourceName += ("_"+command.getId()+"/0");
          }
          if (this.mediator.sourceName.length == 3) {
            this.mediator.sourceName += ("_"+command.getId());
          }
          command.setSourceName(this.mediator.sourceName);
          //ATT: After setting sourceName, get groupName to construct final sourceName !!!
          var seq1Id = command.getSeq1Id();
          if (commandName != Command.EDT) {
            command.setSourceName(command.getGroupName()+"/"+seq1Id);
          } else {
            if (this.mediator.sourceName.substr(0,3) != Command.GRP) {
              command.setSourceName(command.getGroupName()+"/"+seq1Id);
            } else {
              var seq2Id = command.getSeq2Id();
              var seq2Nbr = new Number(seq2Id);
              seq2Nbr = (seq2Nbr + 1);
              seq2Id = seq2Nbr.toString();
              command.setSourceName(command.getGroupName()+"/"+seq1Id+"."+seq2Id);
            }
            if (originalEntityValues) {
              originalEntityValues.setKey(command.getSourceName());
              //_oe.push(originalEntityValues);                                      //TODO: _oe
            }
          }
        }
      }
      //this.sendNotification(SjamayeeFacade.RELATION_SAVED,this.mediator);  // + !!! relation !!!
    } catch(error) {
      Utils.alert("SaveRelationCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: SaveDataRelationCommand
var SaveDataRelationCommand = new Class({
  Extends: SaveRelationCommand,
  execute: function(note) {
    var mediator = note.getBody();
    try {
      mediator.setMessageText("Relation saving...");
      this.parent(note);
      this.mediator.setDisplay(true);      
      //this.sendNotification(SjamayeeFacade.RELATION_SAVED,this.mediator);  // + !!! relation !!!
      this.mediator.setMessageText("Relation saved.");
    } catch(error) {
      Utils.alert("SaveDataRelationCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      mediator.sourceName = null;
      mediator.groupId = null;    
    }
  }
});

//Class: SaveModelRelationCommand
var SaveModelRelationCommand = new Class({
  Extends: SaveRelationCommand,
  execute: function(note) {
    var mediator = note.getBody();
    try {
      mediator.setMessageText("Relation saving...");
      this.parent(note);
      this.mediator.setDisplay(true);
      //this.sendNotification(SjamayeeFacade.RELATION_SAVED,this.mediator);  // + !!! relation !!!
      this.mediator.setMessageText("Relation saved.");
    } catch(error) {
      Utils.alert("SaveModelRelationCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      mediator.sourceName = null;
      mediator.groupId = null;    
    }
  }
});

//Abstract
//Class: CancelRelationCommand
var CancelRelationCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    //_cf.cancelEditing();              //TODO: WHAT !!! WHAT !!! WHAT !!!
    //this.sendNotification(SjamayeeFacade.RELATION_CANCELED,mediator);
  }
});

//Class: CancelDataRelationCommand
var CancelDataRelationCommand = new Class({
  Extends: CancelRelationCommand,
  execute: function(note) {
    var mediator = note.getBody();
    if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.RELATION_CANCELED,this.mediator);
      this.mediator.setMessageText("Relation canceled.");
    }    
  }
});

//Class: CancelModelRelationCommand
var CancelModelRelationCommand = new Class({
  Extends: CancelRelationCommand,
  execute: function(note) {
    var mediator = note.getBody();
    if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.RELATION_CANCELED,this.mediator);
      this.mediator.setMessageText("Relation canceled.");
    }    
  }
});

//Class: ShowRelationCommand
var ShowRelationCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    this.mediator = note.getBody();
    //this.sendNotification(SjamayeeFacade.RELATION_SHOWED,this.mediator);
  }
});

//Abstract
//Class: ExtractRelationCommand
var ExtractRelationCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var nok = false;
    try {
      this.mediator = note.getBody();
      var grid = this.mediator.getGrid();
      var gridView = grid.getGridView();
      var cell = gridView.getCurrentCell();
      if (cell) {
        //this.mediator.childRelation = Relation.clone(cell.getRelation());
        this.mediator.childRelation = (cell.getRelation())?cell.getRelation().clone():null;
        if (this.mediator.childRelation) {
          if (this.mediator.childRelation.hasChildRelations() === false) {
            nok = true;
          } else {
            if (cell.getNivo() < Position.NIVO_ROOT()) {
              this.mediator.childRelation = new Relation(null,"",null,this.mediator.childRelation.getPei(),null,null);
            }
            var groupId = null;
            var sourceName = null;
            var command = new RelationCommand(Command.EXT);
            if (command) {
              command.setRelation(this.mediator.childRelation);
              command.setNivo(gridView.getCurrentNivo());
              command.setPosition(gridView.getPosition());
              var lastGroupCommand = this.mediator.getLastGroupCommand();
              this.mediator.setLastCommand(command,true);
              if (Utils.group() === true) {
                if (lastGroupCommand) {
                  sourceName = lastGroupCommand.getSourceName();
                  groupId = lastGroupCommand.getGroupId();
                }
                if (groupId === null) { groupId = command.getId(); }
                if (sourceName === null) { sourceName = Command.GRP+"_"+groupId; }
              } else {
                groupId = command.getId();
                sourceName = Command.EXT+"_"+groupId;               
              }
              command.setSourceName(sourceName);
              //ATT: After setting sourceName, get groupName to construct final sourceName !!!
              var seq1Id = command.getId();
              command.setSourceName(command.getGroupName()+"/"+seq1Id);
            }
          }
        }
      }
      //this.sendNotification(SjamayeeFacade.RELATION_EXTRACTED,this.mediator);
    } catch(error) {
      Utils.alert("ExtractRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return nok;
    }
  }
});

//Class: ExtractDataRelationCommand
var ExtractDataRelationCommand = new Class({
  Extends: ExtractRelationCommand,
  execute: function(note) {
    var nok = false;
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        //this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_EXTRACT_LBL,true);
        //Insert logic here ... 
        nok = this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_EXTRACTED,this.mediator);
        this.mediator.setMessageText("Relation extracted.");
      }          
    } catch(error) {
      Utils.alert("ExtractDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      if (nok) { Utils.beep(1); }
    }
  }
});

//Class: ExtractModelRelationCommand
var ExtractModelRelationCommand = new Class({
  Extends: ExtractRelationCommand,
  execute: function(note) {
    var nok = false;
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        //this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_EXTRACT_LBL,true);
        //Insert logic here ... 
        nok = this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_EXTRACTED,this.mediator);
        this.mediator.setMessageText("Relation extracted.");
      }          
    } catch(error) {
      Utils.alert("ExtractModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      if (nok) { Utils.beep(1); }
    }
  }
});

//Abstract
//Class: CopyRelationCommand
var CopyRelationCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    try {
      this.mediator = note.getBody();
      var grid = this.mediator.getGrid();
      var gridView = grid.getGridView();
      var cell = gridView.getCurrentCell();
      if (cell) {
        //this.mediator.childRelation = Relation.clone(cell.getRelation());
        this.mediator.childRelation = (cell.getRelation())?cell.getRelation().clone():null;
        if (this.mediator.childRelation) {
          if (cell.getNivo() < Position.NIVO_ROOT()) {
            this.mediator.childRelation = new Relation(null,"",null,this.mediator.childRelation.getPei(),null,null);
          }
          var groupId = null;
          var sourceName = null;
          var command = new RelationCommand(Command.CPY);
          if (command) {
            command.setRelation(this.mediator.childRelation);
            command.setNivo(gridView.getCurrentNivo());
            command.setPosition(gridView.getPosition());
            var lastGroupCommand = this.mediator.getLastGroupCommand();
            this.mediator.setLastCommand(command,true);
            if (Utils.group() === true) {
              if (lastGroupCommand) {
                sourceName = lastGroupCommand.getSourceName();
                groupId = lastGroupCommand.getGroupId();
              } 
              if (groupId === null) { groupId = command.getId(); }
              if (sourceName === null) { sourceName = Command.GRP+"_"+groupId; }
            } else {
              groupId = command.getId();
              sourceName = Command.CPY+"_"+groupId;             
            }
            command.setSourceName(sourceName);
            //ATT: After setting sourceName, get groupName to construct final sourceName !!!
            var seq1Id = command.getId();
            command.setSourceName(command.getGroupName()+"/"+seq1Id);
          }
        }
      }
      //this.sendNotification(SjamayeeFacade.RELATION_COPIED,this.mediator);
    } catch(error) {
      Utils.alert("CopyRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: CopyDataRelationCommand
var CopyDataRelationCommand = new Class({
  Extends: CopyRelationCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        //this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_COPY_LBL,true);
        //Insert logic here ... 
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_COPIED,this.mediator);
        this.mediator.setMessageText("Relation copied.");
      }                
    } catch(error) {
      Utils.alert("CopyDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: CopyModelRelationCommand
var CopyModelRelationCommand = new Class({
  Extends: CopyRelationCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        //this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_COPY_LBL,true);
        //Insert logic here ... 
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_COPIED,this.mediator);
        this.mediator.setMessageText("Relation copied.");
      }                
    } catch(error) {
      Utils.alert("CopyModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: PasteRelationCommand
var PasteRelationCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    try {
      this.mediator = note.getBody();
      this.mediator.currentRelation = null;
      this.mediator.previousRelation = null;
      this.mediator.nextRelation = null;
      var grid = this.mediator.getGrid();
      var gridView = grid.getGridView();
    //var position = Position.clone(gridView.getPosition());
      var position = (gridView.getPosition())?gridView.getPosition().clone():null;
      var currentNivo = gridView.getCurrentNivo();
      var gridColumn = grid.getColumnByNivo(currentNivo);     
      var cell = gridView.getCurrentCell();
      var parentEntity = grid.getRootEntity();      
      if (gridColumn) {
        var master = gridColumn.getMaster();
        if (master) {
          var masterRelation = master.getRelation();
          if (masterRelation) {
            parentEntity = masterRelation.getChildEntity();         
          }
        }
      }

      if (parentEntity.isEditable() === false || 
        this.mediator.getCommandBuffer().hasPastableCommands() === false) {
        Utils.beep(1);
        return this;                                                       //TODO: this !!!
      }

      if (cell) {
        this.mediator.currentRelation = cell.getRelation();
        if (this.mediator.currentRelation) {
          this.mediator.previousRelation = this.mediator.currentRelation;
          this.mediator.nextRelation = null;
          if (this.mediator.currentRelation.getNext()) {
            this.mediator.nextRelation = this.mediator.currentRelation.getNext();
          }
          /*TODO: !!!!!!!!!!!!!!!!!
          if (_kb.getShift() === true) {                                  //TODO: this !!!
            this.mediator.previousRelation = null;
            if (this.mediator.currentRelation.getPrevious()) {
              this.mediator.previousRelation = this.mediator.currentRelation.getPrevious();
            }
            this.mediator.nextRelation = this.mediator.currentRelation;
          }*/
        }
      }
      ///////////////////////////
      // OR *** EMPTY CELL *** //
      ///////////////////////////
      var commandBuffer = this.getCommandBuffer();
      if (commandBuffer && commandBuffer.hasPastableCommands() === true) {
        var commands = commandBuffer.getLastPastableGroup();
        if (commands && commands.length > 0) {
          this.setEditPasteCommand(null);
          var groupName = null;
          var groupId = null;
          for (var i = 0; i < commands.length; i++) {
            if (commands[i]) {
              var cmd = commands[i];
              if (cmd.getName() == Command.PST) { continue; }
              if (cmd.getName() == Command.NAV) { continue; }             
              if (cmd.isUnDone() === true) { continue; }
              ///////////////////////////////////////////////
              //ATT: Group can be GRP_nnnn or EXT_nnnn !!! //
              ///////////////////////////////////////////////
              if (cmd.getGroupName().substr(0,3) == Command.GRP) {
                if (groupName === null) { groupName = cmd.getGroupName(); }
              } else {
                if (groupName === null) { groupName = cmd.getSourceName(); }                  
                if (cmd.getSourceName() != groupName) { break; }
              }
              switch (cmd.getName()) {
                case Command.EDT:
                //this.mediator.childRelation = Relation.clone(cmd.getRelation());
                this.mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
                if (this.mediator.childRelation) {
                  //Clone command for making the next copy only temporary (for _writePasteCommand)
                  //and will NOT change the original command (ADD,EDT,CPY,DEL).
                  if (cmd.getGroupName().substr(0,3) != Command.GRP) {
                    var cmd1 = this.mediator._writePasteCommand(parentEntity);             //TODO: this !!! _writePasteCommand !!!
                    if (cmd1) {
                      cmd1.setSourceName(groupName);
                      if (!groupId) { groupId = cmd1.getId(); }
                      cmd1.setSourceName(cmd1.getGroupName()+"/"+groupId);
                      /*if (!_kb.getShift() === true) {
                        position.down();
                      }*/
                    }
                  } else {
                    //TODO: !!!!! groupId = this.mediator._saveEditPasteCommand(cmd,groupId,groupName,parentEntity);
                  }
                }
                break;
                case Command.ADD:
                case Command.CPY:
                case Command.DEL:                                        //TODO: this/getEditPastCommand/.../_kb.getShift
                if (this.getEditPasteCommand()) {
                  groupId = this.mediator._writeEditPasteCommand(this.mediator.getEditPasteCommand(),groupId,groupName,parentEntity);
                }
                //this.mediator.childRelation = Relation.clone(cmd.getRelation());
                this.mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
                if (this.mediator.childRelation) {
                  //Clone command for making the next copy only temporary (for _writePasteCommand)
                  //and will NOT change the original command (ADD,EDT,CPY,DEL).
                  var cmd2 = this.mediator._writePasteCommand(parentEntity);
                  if (cmd2) {
                    cmd2.setSourceName(groupName);
                    if (groupId === null) { groupId = cmd2.getId(); }
                    cmd2.setSourceName(cmd2.getGroupName()+"/"+groupId);
                    /*if (!_kb.getShift() === true) {
                      position.down();
                    }*/
                  }
                }                         
                break;
                case Command.EXT:
                if (this.getEditPasteCommand()) {
                  groupId = this.mediator._writeEditPasteCommand(this.getEditPasteCommand(),groupId,groupName,parentEntity);
                }
                //var extractedRelation = Relation.clone(cmd.getRelation());
                var extractedRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
                if (extractedRelation) {
                  var relations = extractedRelation.getChildRelations(200,Cache.SORT_ASCENDING);
                  if (relations.length > 0) {
                    var pasteCount = 0;
                    for (var r = 0; i < relations.length; r++) {
                      if (relations[r]) {
                        //this.mediator.childRelation = Relation.clone(relations[r]);
                        this.mediator.childRelation = relations[r].clone();
                        if (this.mediator.childRelation) {
                          //Clone command for making the next copy only temporary (for _writePasteCommand).
                          //and will NOT change the original command (EXT).
                          var cmd3 = this.mediator._writePasteCommand(parentEntity);
                          if (cmd3) {
                            cmd3.setSourceName(groupName);                            
                            if (groupId === null) { groupId = cmd3.getId(); }
                            cmd3.setSourceName(cmd3.getGroupName()+"/"+groupId);
                            /*if (!_kb.getShift() === true) {
                              position.down();
                            }*/
                            pasteCount = (pasteCount + 1);
                            if (pasteCount >= CommandBuffer.PASTE_LIMIT) {
                              Utils.alert("Copy/Paste limit ("+CommandBuffer.PASTE_LIMIT+") exceeded.\n"+
                                    ">Paste interrupted.\n"+
                                    ">Possibly caused by recursion.");
                              break;
                            }
                          }
                        }
                      }
                    }
                  }
                }                       
                break;
                default:
                break;
              }
            }
          }
          if (this.mediator.getEditPasteCommand()) {                                                                    //TODO: this !!! _writeP...
            groupId = this.mediator._writeEditPasteCommand(this.mediator.getEditPasteCommand(),groupId,groupName,parentEntity);
          }
          this.mediator._writeCheckPointCommand();                                                                      //TODO: this._writeC
          var p1 = gridView.getPosition();
          p1.setRow(position.getRow());
          p1.setColumn(position.getColumn());
        }
      }
      //this.sendNotification(SjamayeeFacade.RELATION_PASTED,this.mediator);
    } catch(error) {
      Utils.alert("PasteRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: PasteDataRelationCommand
var PasteDataRelationCommand = new Class({
  Extends: PasteRelationCommand,
  execute: function(note) {
    try {
      var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        //this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_PASTE_LBL,true);
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_PASTED,this.mediator);
        this.mediator.setMessageText("Relation pasted.");
      }                
    } catch(error) {
      Utils.alert("PasteDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: PasteModelRelationCommand
var PasteModelRelationCommand = new Class({
  Extends: PasteRelationCommand,
  execute: function(note) {
    try {
      var mediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        //this.setStatusMessage(SjamayeeForm.STATUS_MESSAGE_PASTE_LBL,true);
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_PASTED,this.mediator);
        this.mediator.setMessageText("Relation pasted.");
      }                
    } catch(error) {
      Utils.alert("PasteModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: UndoRelationCommand
var UndoRelationCommand = new Class({
  Extends: UndoCommand,  
  execute: function(note) {
    try {
      this.parent(note);
      this.mediator = note.getBody();
      this.mediator.currentRelation = null;
      this.mediator.previousRelation = null;
      this.mediator.nextRelation = null;
      var grid = this.mediator.getGrid();
      var gridView = grid.getGridView();
      this.currentNivo = gridView.getCurrentNivo();
      this.position = (gridView.getPosition())?gridView.getPosition().clone():null;     
      //this.parent(note);
      //RESTORE broken links for undone DELETES, some (pid,nid) are still NULL!!!
      if (this.groupCommands && this.groupCommands.length > 0) {
        for (var j = 0; j < this.groupCommands.length; j++) {
          if (this.groupCommands[j]) {
            if (this.groupCommands[j].getName() != Command.DEL) { continue; }       
            //var r1 = Relation.getById(this.groupCommands[j].getRelation().getId());
            var r1 = this.groupCommands[j].getRelation(); //TOD/ VERIFY - IS THIS OK ???
            if (r1) {
              this.mediator.previousRelation = null;
              this.mediator.nextRelation = null;
              if (this.mediator.previousRelation === null) {
                if (r1.getPid()) {
                  this.mediator.previousRelation = r1.getPreviousRelation();
                }
              }
              if (this.mediator.previousRelation) {
                //r1.setPid(this.mediator.previousRelation.getId());
                r1.setPreviousRelationid(this.mediator.previousRelation);
                //this.mediator.previousRelation.setNid(r1.getId());
                this.mediator.previousRelation.setNextRelation(r1);
              }
              if (this.mediator.nextRelation === null) {
                if (r1.getNid()) {
                  this.mediator.nextRelation = r1.getNextRelation();
                }
              }
              if (this.mediator.nextRelation) {
                //r1.setNid(this.mediator.nextRelation.getId());
                r1.setNextRelation(this.mediator.nextRelation);
                //this.mediator.nextRelation.setPid(r1.getId());
                this.mediator.nextRelation.setPreviousRelation(r1);
              }
            }
          }
        }
      }
      gridView.setCurrentNivo(this.currentNivo);
      var p_gvw = gridView.getPosition();
      p_gvw.setRow(this.position.getRow());
      p_gvw.setColumn(this.position.getColumn());
      //this.sendNotification(SjamayeeFacade.RELATION_UNDONE,this.mediator);
    } catch(error) {
      Utils.alert("UndoRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  undo_add: function(cmd) {
    //Execute new command (add->del).
    //this.mediator.childRelation = Relation.clone(cmd.getRelation());
    this.mediator.childRelation = cmd.getRelation()?cmd.getRelation().clone():null;
    if (this.mediator.childRelation) {
      this.mediator.childRelation.remove(this.mediator);
      if (cmd.getNivo() !== null) {
        this.currentNivo = cmd.getNivo();
      }
      var p_add = cmd.getPosition();
      if (this.position && p_add) {
        this.position.setRow(p_add.getRow());
        this.position.setColumn(p_add.getColumn());
      }
      cmd.setUnDone(true);
    }
    this.mediator.setLastCommand(cmd,false);
  },
  undo_edit: function(cmd) {
    //this.mediator.childRelation = Relation.getById(cmd.getRelation().getId());
    this.mediator.childRelation = cmd.getRelation(); //TODO: VERIFY - IS THIS OK ???
    if (this.mediator.childRelation) {
      //var currentEntityValues = (this.mediator.childRelation.getCei())?Entity.getById(this.mediator.childRelation.getCei()).clone():null;
      var currentEntityValues = (this.mediator.childRelation.getChildEntity())?this.mediator.childRelation.getChildEntity().clone():null;
      if (currentEntityValues) {
        //TODO: _oe !!!
        var previousEntityValues = _oe.popById(cmd.getSourceName()); //Command.EDT+"_"+this.mediator.childRelation.getCei()+"/"+cmd.getId());
        if (previousEntityValues) {
          var childEntity = this.mediator.childRelation.getChildEntity();
          if (childEntity) {
            childEntity.setName(previousEntityValues.getName());
            childEntity.setDesc(previousEntityValues.getDesc());
          }
          previousEntityValues.setName(currentEntityValues.getName());
          previousEntityValues.setDesc(currentEntityValues.getDesc());
          _oe.push(previousEntityValues);                                //TODO: this !!!
        }
      }
      this.mediator.previousRelation = null;
      this.mediator.nextRelation = null;
      //var relation = this.mediator.childRelation.save(this.mediator); //Is return needed here ???
      this.mediator.childRelation.save(this.mediator);
      if (cmd.getNivo() !== null) {
        this.currentNivo = cmd.getNivo();
      }                 
      var p_edt = cmd.getPosition();
      if (this.position && p_edt) {
        this.position.setRow(p_edt.getRow());
        this.position.setColumn(p_edt.getColumn());
      }
    }
    //////////////////////////////////////////////////////////////////////////
    //ATT: Forced UNDO, even when relation does not exist (after deletion). //
    //////////////////////////////////////////////////////////////////////////
    cmd.setUnDone(true);                
    this.mediator.setLastCommand(cmd,false);
  },
  undo_copy: function(cmd) {
    if (cmd.getNivo() !== null) {
      this.currentNivo = cmd.getNivo();
    }
    var p_cpy = cmd.getPosition();
    if (this.position && p_cpy) {
      this.position.setRow(p_cpy.getRow());
      this.position.setColumn(p_cpy.getColumn());
    }
    cmd.setUnDone(true);        
    this.mediator.setLastCommand(cmd,false);
  },
  undo_delete: function(cmd) {
    //Execute new command (del->add).
    //this.mediator.childRelation = Relation.clone(cmd.getRelation());
    this.mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
    if (this.mediator.childRelation) {
      //this.mediator.childRelation.setKey(null);
      this.mediator.previousRelation = null;
      this.mediator.nextRelation = null;
      //var relation = this.mediator.childRelation.save(mediator);   // Is return needed here ???
      this.mediator.childRelation.save(this.mediator);
      if (cmd.getNivo() !== null) {
        this.currentNivo = cmd.getNivo();
      }
      var p_del = cmd.getPosition();
      if (this.position && p_del) {
        this.position.setRow(p_del.getRow());
        this.position.setColumn(p_del.getColumn());
      }
      cmd.setUnDone(true);        
    }
    this.mediator.setLastCommand(cmd,false);
  },
  undo_extract: function(cmd) {
    if (cmd.getNivo() !== null) {
      this.currentNivo = cmd.getNivo();
    }
    var p_ext = cmd.getPosition();
    if (this.position && p_ext) {
      this.position.setRow(p_ext.getRow());
      this.position.setColumn(p_ext.getColumn());
    }
    cmd.setUnDone(true);
    this.mediator.setLastCommand(cmd,false);
  },
  undo_paste: function(cmd) {
    //Execute command (PST/ADD->DEL).
    //this.mediator.childRelation = Relation.clone(cmd.getRelation());
    this.mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
    if (this.mediator.childRelation) {
      this.mediator.childRelation.remove(this.mediator);
      if (cmd.getNivo() !== null) {
        this.currentNivo = cmd.getNivo();
      }
      var p_pst = cmd.getPosition();
      if (this.position && p_pst) {
        this.position.setRow(p_pst.getRow());
        this.position.setColumn(p_pst.getColumn());
      }
      cmd.setUnDone(true);
      this.mediator.setLastCommand(cmd,false);
    }
  },
  undo_navigation: function(cmd) {
    cmd.setUnDone(true);  
    this.mediator.setLastCommand(cmd,false);
    if (cmd.getNivo() !== null) {
      this.currentNivo = cmd.getNivo();
    }
    var p_nav = cmd.getPosition();
    if (this.position && p_nav) {
      this.position.setRow(p_nav.getRow());
      this.position.setColumn(p_nav.getColumn());
    }
  }
});

//Class: UndoDataRelationCommand
var UndoDataRelationCommand = new Class({
  Extends: UndoRelationCommand,  
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_UNDONE,this.mediator);
        this.mediator.setMessageText("Relation undone.");
      }                
    } catch(error) {
      Utils.alert("UndoDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: UndoModelRelationCommand
var UndoModelRelationCommand = new Class({
  Extends: UndoRelationCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_UNDONE,this.mediator);
        this.mediator.setMessageText("Relation undone.");
      }                
    } catch(error) {
      Utils.alert("UndoModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: RedoRelationCommand
var RedoRelationCommand = new Class({
  Extends: RedoCommand,
  execute: function(note) {
    try {
      this.parent(note);
      //var mediator = note.getBody();
      //var grid = mediator.getGrid();
      this.mediator = note.getBody();
      var grid = this.mediator.getGrid();
      var gridView = grid.getGridView();
      this.currentNivo = gridView.getCurrentNivo();
      this.position = (gridView.getPosition())?gridView.getPosition().clone():null;
      //this.parent(note);
      //RESTORE broken links for redone ADDS, some (pid,nid) are still NULL!!!
      if (this.groupCommands && this.groupCommands.length > 0) {
        for (var j = 0; j < this.groupCommands.length; j++) {
          if (this.groupCommands[j]) {
            if ((this.groupCommands[j].getName() != Command.ADD) &&
                (this.groupCommands[j].getName() != Command.PST)) { continue; }       
            //var r1 = Relation.getById(this.groupCommands[j].getRelation().getId());
            var r1 = this.groupCommands[j].getRelation(); //TODO: VERIFY - IS THIS OK ??? ***
            if (r1) {
              this.mediator.previousRelation = null;
              this.mediator.nextRelation = null;
              if (this.mediator.previousRelation === null) {
                if (r1.getPid()) {
                  this.mediator.previousRelation = r1.getPreviousRelation();
                }
              }
              if (this.mediator.previousRelation) {
                //r1.setPid(this.mediator.previousRelation.getId());
                r1.setPreviousRelation(this.mediator.previousRelation);
                //this.mediator.previousRelation.setNid(r1.getId());
                this.mediator.previousRelation.setNextRelation(r1);
              }
              if (this.mediator.nextRelation === null) {
                if (r1.getNid()) {
                  this.mediator.nextRelation = r1.getNextRelation();
                }
              }
              if (this.mediator.nextRelation) {
                //r1.setNid(this.mediator.nextRelation.getId());
                r1.setNextRelation(this.mediator.nextRelation);
                //this.mediator.nextRelation.setPid(r1.getId());
                this.mediator.nextRelation.setPreviousRelation(r1);
              }
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
  },
  redo_add: function(cmd) {
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
      if (this.position && p_add) {
        this.position.setRow(p_add.getRow());
        this.position.setColumn(p_add.getColumn());
      }               
      cmd.setUnDone(false);       
      this.mediator.setLastCommand(cmd,false);
    }
  },
  redo_edit: function(cmd) {
    //this.mediator.childRelation = Relation.getById(cmd.getRelation().getId());
    this.mediator.childRelation = cmd.getRelation(); //TODO: VERIFY - IS THIS OK ??? ***
    if (this.mediator.childRelation) {
      this.mediator.previousRelation = null;
      this.mediator.nextRelation = null;
      //var currentEntityValues = (this.mediator.childRelation.getCei())?Entity.getById(this.mediator.childRelation.getCei()).clone():null;
      var currentEntityValues = (this.mediator.childRelation.getChildEntity())?this.mediator.childRelation.getChildEntity().clone():null;
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
          _oe.push(previousEntityValues);                            //TODO: _oe !!!
        }
      }
      //var relation = this.mediator.childRelation.save();
      this.mediator.childRelation.save();
      if (cmd.getNivo() !== null) {
        this.currentNivo = cmd.getNivo();
      }
      var p_edt = cmd.getPosition();
      if (this.position && p_edt) {
        this.position.setRow(p_edt.getRow());
        this.position.setColumn(p_edt.getColumn());
      }               
    }
    //////////////////////////////////////////////////////////////////////////
    //ATT: Forced REDO, even when relation does not exist (after deletion). //
    //////////////////////////////////////////////////////////////////////////
    cmd.setUnDone(false);
    this.mediator.setLastCommand(cmd,false);
  },
  redo_copy: function(cmd) {
    if (cmd.getNivo() !== null) {
      this.currentNivo = cmd.getNivo();
    }
    var p_cpy = cmd.getPosition();
    if (this.position && p_cpy) {
      this.position.setRow(p_cpy.getRow());
      this.position.setColumn(p_cpy.getColumn());
    }               
    cmd.setUnDone(false);       
    this.mediator.setLastCommand(cmd,false);
  },
  redo_delete: function(cmd) {
    //this.mediator.childRelation = Relation.clone(cmd.getRelation());
    this.mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
    if (this.mediator.childRelation) {
      //var relation = this.mediator.childRelation.remove(this.mediator);
      this.mediator.childRelation.remove(this.mediator);
      if (cmd.getNivo() !== null) {
        this.currentNivo = cmd.getNivo();
      }
      var p_del = cmd.getPosition();
      if (this.position && p_del) {
        this.position.setRow(p_del.getRow());
        this.position.setColumn(p_del.getColumn());
      }               
      cmd.setUnDone(false);
      this.mediator.setLastCommand(cmd,false);
    }
  },
  redo_extract: function(cmd) {
    if (cmd.getNivo() !== null) {
      this.currentNivo = cmd.getNivo();
    }
    var p_ext = cmd.getPosition();
    if (this.position && p_ext) {
      this.position.setRow(p_ext.getRow());
      this.position.setColumn(p_ext.getColumn());
    }
    cmd.setUnDone(false);
    this.mediator.setLastCommand(cmd,false);
  },
  redo_paste: function(cmd) {
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
      if (this.position && p_pst) {
        this.position.setRow(p_pst.getRow());
        this.position.setColumn(p_pst.getColumn());
      }
      cmd.setUnDone(false);
      this.mediator.setLastCommand(cmd,false);
    }
  },
  redo_navigation: function(cmd) {
    cmd.setUnDone(false);
    this.mediator.setLastCommand(cmd,false);
    if (cmd.getNivo() !== null) {
      this.currentNivo = cmd.getNivo();
    }
    var p_nav = cmd.getPosition();
    if (this.position && p_nav) {
      this.position.setRow(p_nav.getRow());
      this.position.setColumn(p_nav.getColumn());
    }
  } 
});

//Class: RedoDataRelationCommand
var RedoDataRelationCommand = new Class({
  Extends: RedoRelationCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_REDONE,this.mediator);
        this.mediator.setMessageText("Relation redone.");
      }                
    } catch(error) {
      Utils.alert("RedoDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: RedoModelRelationCommand
var RedoModelRelationCommand = new Class({
  Extends: RedoRelationCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.RELATION_REDONE,this.mediator);
        this.mediator.setMessageText("Relation redone.");
      }                
    } catch(error) {
      Utils.alert("RedoModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: ClearRelationBufferCommand
var ClearRelationBufferCommand = new Class({
  Extends: ClearBufferCommand,
  execute: function(note) {
    try {
      this.parent(note);
      this.mediator.setMessageText("Relation Buffer cleared.");
    } catch(error) {
      Utils.alert("ClearRelationBufferCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: ClearDataRelationBufferCommand
var ClearDataRelationBufferCommand = new Class({
  Extends: ClearRelationBufferCommand,
  execute: function(note) {
    try {
      this.parent(note);
      this.mediator.getGrid().setRootCommand(null);
      //Reset Counter for Navigation commands.
      _cNc = 0;                                                 //TODO: global !!!      
      //this.sendNotification(SjamayeeFacade.RELATION_BUFFER_CLEARED,this.mediator);
      this.mediator.setMessageText("Relation Buffer cleared.");
    } catch(error) {
      Utils.alert("ClearDataRelationBufferCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: ClearModelRelationBufferCommand
var ClearModelRelationBufferCommand = new Class({
  Extends: ClearRelationBufferCommand,
  execute: function(note) {
    try {
      this.parent(note);
      this.mediator.getGrid().setRootCommand(null);
      //Reset Counter for Navigation commands.
      _cNc = 0;                                                 //TODO: global !!!      
      //this.sendNotification(SjamayeeFacade.RELATION_BUFFER_CLEARED,this.mediator);
      this.mediator.setMessageText("Relation Buffer cleared.");
    } catch(error) {
      Utils.alert("ClearModelRelationBufferCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: ResetGridCommand
var ResetGridCommand = new Class({
  Extends: ResetViewCommand,
  execute: function(note) {
    this.mediator = note.getBody();
    var grid = this.mediator.getGrid();
    try {
      var nivo = grid.getCurrentNivo();
      if (nivo < Position.NIVO_COLUMN_FIRST()) {
        if (nivo == -4) {
          this.percent = 52; //55;
        } else if (nivo == -5) {
          this.percent = 68; //70;
        } else if (nivo == -6) {
          this.percent = 87.5; //85;
        } else {
          this.percent = 100;
        }
      }
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.GRID_RESETED,mediator);
      this.mediator.setMessageText("Grid reset.");
    } catch(error) {
      Utils.alert("ResetGridCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

/////////////////////
//OBJECT COMMANDS ***
/////////////////////
//Abstract
//Class: AddObjectCommand
var AddObjectCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    try {
      this.mediator = note.getBody();
      //var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      //Mode: INSERT!
      //this.setMode(SjamayeeForm.MODE_INSERT);
      //var object = new ListObject(new Entity(1,"","","",1,null));
      //mediator.object = object;
      //var command = new ObjectCommand(Command.ADD);
      //command.setObject(object);
      //mediator.setLastCommand(command,true);
      //this.sendNotification(SjamayeeFacade.OBJECT_ADDED,mediator);
    } catch(error) {
      Utils.alert("AddObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }    
  }
});

//Class: AddDataObjectCommand
var AddDataObjectCommand = new Class({
  Extends: AddObjectCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody(); //SjamayeeFacade.getInstance().retrieveMediator(DataObjectsListMediator.ID);
      //var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      //Mode: EDIT!
      if (mediator.setEdit() == GridListMediator.MODE_EDIT) {
        this.parent(note);
        this.mediator.setMessageText("Add object...");
        this.sendNotification(SjamayeeFacade.OLIST_DATA_RESIZE,SjamayeeFacade.SIZE_NORMAL);
        this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
    } catch(error) {
      Utils.alert("AddDataObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }    
  }
});

//Class: AddModelObjectCommand
var AddModelObjectCommand = new Class({
  Extends: AddObjectCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody(); //SjamayeeFacade.getInstance().retrieveMediator(ModelObjectsListMediator.ID);
      //var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      //Mode: EDIT!
      if (mediator.setEdit() == GridListMediator.MODE_EDIT) {
        this.parent(note);
        this.mediator.setMessageText("Add object...");
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_RESIZE,SjamayeeFacade.SIZE_NORMAL);
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
    } catch(error) {
      Utils.alert("AddModelObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }    
  }
});

//Abstract
//Class: DeleteObjectCommand
var DeleteObjectCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    try {
      this.mediator = note.getBody();
      //var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      //Mode: DISPLAY!
      //this.setMode(SjamayeeForm.MODE_DISPLAY);
      //Insert logic here ... 
      //var object = mediator.object;
      //var command = new ObjectCommand(Command.DEL);
      //command.setObject(object);
      //mediator.setLastCommand(command,true);
      //this.sendNotification(SjamayeeFacade.OBJECT_DELETED,mediator);
    } catch(error) {
      Utils.alert("DeleteObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: DeleteDataObjectCommand
var DeleteDataObjectCommand = new Class({
  Extends: DeleteObjectCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent(note);
        this.mediator.setMessageText("Object deleted.");
        //this.sendNotification(SjamayeeFacade.OBJECT_DELETED,this.mediator);
        this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
    } catch(error) {
      Utils.alert("DeleteDataObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: DeleteModelObjectCommand
var DeleteModelObjectCommand = new Class({
  Extends: DeleteObjectCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent(note);
        this.mediator.setMessageText("Object deleted.");
        //this.sendNotification(SjamayeeFacade.OBJECT_DELETED,this.mediator);
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
    } catch(error) {
      Utils.alert("DeleteModelObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: EditObjectCommand
var EditObjectCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    try {
      this.mediator = note.getBody();
      //var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      //Mode: EDIT!
      //this.setMode(SjamayeeForm.MODE_EDIT);
      //Insert logic here ...
      //var olist = mediator.getList();
      //if (mediator.object) { }
    /*var object = mediator.object;
      var command = new ObjectCommand(Command.EDT);
      command.setObject(object);
      mediator.setLastCommand(command,false);*/
      //this.sendNotification(SjamayeeFacade.OBJECT_EDITED,mediator);
    } catch(error) {
      Utils.alert("EditObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: EditDataObjectCommand
var EditDataObjectCommand = new Class({
  Extends: EditObjectCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      //Mode: EDIT!
      if (mediator.setEdit() == GridListMediator.MODE_EDIT) {
        //Insert logic here ...
        this.parent(note);
        this.mediator.setMessageText("Edit object...");        
        this.sendNotification(SjamayeeFacade.OLIST_DATA_RESIZE,SjamayeeFacade.SIZE_NORMAL);
        this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
    } catch(error) {
      Utils.alert("EditDataObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: EditModelObjectCommand
var EditModelObjectCommand = new Class({
  Extends: EditObjectCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      //Mode: EDIT!
      if (mediator.setEdit() == GridListMediator.MODE_EDIT) {
        //Insert logic here ...
        this.parent(note);
        this.mediator.setMessageText("Edit object...");
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_RESIZE,SjamayeeFacade.SIZE_NORMAL);
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
    } catch(error) {
      Utils.alert("EditModelObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: SaveObjectCommand
var SaveObjectCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    try {
      this.mediator = note.getBody();
      //var objectList = mediator.getList();    //TODO: not viewList but dataList !!!
      /*var object = mediator.object;
      if (object !== null) {
        object = object.getObject();
        //this.setSfdcCall(SjamayeeForm.SFDC_EDIT_CHILD);
        //this.writeSnapShot();
        //TODO: BETTER !!! IN EDIT MODE !!!
        **
        if (document.getElementById(Entity.OBJECT_NAME_TEXTAREA_ID) !== null) {
          object.setName(document.getElementById(Entity.OBJECT_NAME_TEXTAREA_ID).value);
          object.setDesc(document.getElementById(Entity.OBJECT_DESC_TEXTAREA_ID).value);
          object.save(mediator);
        }**
        if (object.getId() === null) {
          var oid = Utils.nextId();
          object.setKey(oid);
          object.setVal(oid+"_value");
          //Insert new object!
          //TODO: !!!!   _oc.put(object);                      //TODO: _oc > proxy !!!
        }
        //object.save(mediator);
      }*/
      //this.sendNotification(SjamayeeFacade.OBJECT_SAVED,mediator);
    } catch(error) {
      Utils.alert("SaveObjectCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: SaveDataObjectCommand
var SaveDataObjectCommand = new Class({
  Extends: SaveObjectCommand,
  execute: function(note) {
    try {
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.OBJECT_SAVED,this.mediator);
      this.mediator.setDisplay(true);
      this.mediator.setMessageText("Object saved.");
      this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
    } catch(error) {
      Utils.alert("SaveDataObjectCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      //Reset Globals !!!
      //mediator.object = null;
      //Mode: DISPLAY
      //this.setMode(Grid.MODE_DISPLAY);
    }
  }
});

//Class: SaveModelObjectCommand
var SaveModelObjectCommand = new Class({
  Extends: SaveObjectCommand,
  execute: function(note) {
    try {
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.OBJECT_SAVED,this.mediator);
      this.mediator.setDisplay(true);
      this.mediator.setMessageText("Object saved.");
      this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
    } catch(error) {
      Utils.alert("SaveModelObjectCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      //Reset Globals !!!
      //mediator.object = null;
      //Mode: DISPLAY
      //this.setMode(Grid.MODE_DISPLAY);
    }
  }
});

//Abstract
//Class: CancelObjectCommand
var CancelObjectCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    this.parent();
    this.mediator = note.getBody();
    //this.sendNotification(SjamayeeFacade.OBJECT_CANCELED,this.mediator);
  }
});

//Class: CancelDataObjectCommand
var CancelDataObjectCommand = new Class({
  Extends: CancelObjectCommand,
  execute: function(note) {
    var mediator = note.getBody();
    //Mode: DISPLAY!
    if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.OBJECT_CANCELED,this.mediator);
      this.mediator.setMessageText("Object canceled.");
      this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
    }
  }
});

//Class: CancelModelObjectCommand
var CancelModelObjectCommand = new Class({
  Extends: CancelObjectCommand,
  execute: function(note) {
    var mediator = note.getBody();
    //Mode: DISPLAY!
    if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.OBJECT_CANCELED,this.mediator);
      this.mediator.setMessageText("Object canceled.");
      this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
    }
  }
});

//Class: ShowObjectCommand
var ShowObjectCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    //var mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID); //TODO: SPLIT >>> DATA/MODEL - OBJECT/RELATION !!!
    var mediator = SjamayeeFacade.getInstance().retrieveMediator(DataObjectsListMediator.ID);
    //this.sendNotification(SjamayeeFacade.OBJECT_SHOWED,mediator);
  }
});

//Abstract
//Class: UndoObjectCommand
var UndoObjectCommand = new Class({
  Extends: UndoCommand,  
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Insert logic here ... 
      //var grid = mediator.getGrid();
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.OBJECT_UNDONE,this.mediator);
    } catch(error) {
      Utils.alert("UndoObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
/*                                               TODO: add,edit,delete,copy?,paste? !!! OBJECT !!!
  undo_add: function(cmd) {
    //Execute new command (add->del).
    //this.mediator.childRelation = Relation.clone(cmd.getRelation());
    this.mediator.childRelation = cmd.getRelation()?cmd.getRelation().clone():null;
    if (this.mediator.childRelation) {
      this.mediator.childRelation.remove(this.mediator);
      if (cmd.getNivo() !== null) {
        this.currentNivo = cmd.getNivo();
      }
      var p_add = cmd.getPosition();
      if (this.position && p_add) {
        this.position.setRow(p_add.getRow());
        this.position.setColumn(p_add.getColumn());
      }
      cmd.setUnDone(true);
    }
    this.mediator.setLastCommand(cmd,false);                             //TODO: this !!!
  };
  
  undo_edit: function(cmd) {
    this.mediator.childRelation = Relation.getById(cmd.getRelation().getId());
    if (this.mediator.childRelation) {
      //var currentEntityValues = Entity.clone(Entity.getById(this.mediator.childRelation.getCei()));
      var currentEntityValues = (this.mediator.childRelation.getCei())?Entity.getById(this.mediator.childRelation.getCei()).clone():null;
      if (currentEntityValues) {
        //TODO: _oe !!!
        var previousEntityValues = _oe.popById(cmd.getSourceName()); //Command.EDT+"_"+this.mediator.childRelation.getCei()+"/"+cmd.getId());
        if (previousEntityValues) {
          var childEntity = this.mediator.childRelation.getChildEntity();
          if (childEntity) {
            childEntity.setName(previousEntityValues.getName());
            childEntity.setDesc(previousEntityValues.getDesc());
          }
          previousEntityValues.setName(currentEntityValues.getName());
          previousEntityValues.setDesc(currentEntityValues.getDesc());
          _oe.push(previousEntityValues);                                //TODO: this !!!
        }
      }
      this.mediator.previousRelation = null;
      this.mediator.nextRelation = null;
      //var relation = this.mediator.childRelation.save(this.mediator); //Is return needed here ???
      this.mediator.childRelation.save(this.mediator);
      if (cmd.getNivo() !== null) {
        this.currentNivo = cmd.getNivo();
      }                 
      var p_edt = cmd.getPosition();
      if (this.position && p_edt) {
        this.position.setRow(p_edt.getRow());
        this.position.setColumn(p_edt.getColumn());
      }
    }
    //////////////////////////////////////////////////////////////////////////
    //ATT: Forced UNDO, even when relation does not exist (after deletion). //
    //////////////////////////////////////////////////////////////////////////
    cmd.setUnDone(true);                
    this.mediator.setLastCommand(cmd,false);
  };
  
  undo_copy: function(cmd) {
    if (cmd.getNivo() !== null) {
      this.currentNivo = cmd.getNivo();
    }
    var p_cpy = cmd.getPosition();
    if (this.position && p_cpy) {
      this.position.setRow(p_cpy.getRow());
      this.position.setColumn(p_cpy.getColumn());
    }
    cmd.setUnDone(true);        
    this.mediator.setLastCommand(cmd,false);
  };
  
  undo_delete: function(cmd) {
    //Execute new command (del->add).
    //this.mediator.childRelation = Relation.clone(cmd.getRelation());
    this.mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
    if (this.mediator.childRelation) {
      //this.mediator.childRelation.setKey(null);
      this.mediator.previousRelation = null;
      this.mediator.nextRelation = null;
      //var relation = this.mediator.childRelation.save(mediator);   // Is return needed here ???
      this.mediator.childRelation.save(this.mediator);
      if (cmd.getNivo() !== null) {
        this.currentNivo = cmd.getNivo();
      }
      var p_del = cmd.getPosition();
      if (this.position && p_del) {
        this.position.setRow(p_del.getRow());
        this.position.setColumn(p_del.getColumn());
      }
      cmd.setUnDone(true);        
    }
    this.mediator.setLastCommand(cmd,false);
  };
  
  undo_paste: function(cmd) {
    //Execute command (PST/ADD->DEL).
    //this.mediator.childRelation = Relation.clone(cmd.getRelation());
    this.mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
    if (this.mediator.childRelation) {
      this.mediator.childRelation.remove(this.mediator);
      if (cmd.getNivo() !== null) {
        this.currentNivo = cmd.getNivo();
      }
      var p_pst = cmd.getPosition();
      if (this.position && p_pst) {
        this.position.setRow(p_pst.getRow());
        this.position.setColumn(p_pst.getColumn());
      }
      cmd.setUnDone(true);
      this.mediator.setLastCommand(cmd,false);
    }
  };
*/  
});

//Class: UndoDataObjectCommand
var UndoDataObjectCommand = new Class({
  Extends: UndoObjectCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        //Insert logic here ... 
        //var grid = mediator.getGrid();
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.OBJECT_UNDONE,this.mediator);
        this.mediator.setMessageText("Object undone.");
        this.mediator.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
    } catch(error) {
      Utils.alert("UndoDataObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: UndoModelObjectCommand
var UndoModelObjectCommand = new Class({
  Extends: UndoObjectCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        //Insert logic here ... 
        //var grid = mediator.getGrid();
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.OBJECT_UNDONE,this.mediator);
        this.mediator.setMessageText("Object undone.");
        this.mediator.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
    } catch(error) {
      Utils.alert("UndoModelObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: RedoObjectCommand
var RedoObjectCommand = new Class({
  Extends: RedoCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Insert logic here ... 
      var grid = mediator.getGrid();
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.OBJECT_REDONE,this.mediator);
    } catch(error) {
      Utils.alert("RedoObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
/*                                                        TODO: add,edit,delete,copy?,paste? !!! OBJECT !!!
  redo_add: function(cmd) {
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
      if (this.position && p_add) {
        this.position.setRow(p_add.getRow());
        this.position.setColumn(p_add.getColumn());
      }               
      cmd.setUnDone(false);       
      this.mediator.setLastCommand(cmd,false);
    }
  };
  
  redo_edit: function(cmd) {
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
          _oe.push(previousEntityValues);                            //TODO: _oe !!!
        }
      }
      //var relation = this.mediator.childRelation.save();
      this.mediator.childRelation.save();
      if (cmd.getNivo() !== null) {
        this.currentNivo = cmd.getNivo();
      }
      var p_edt = cmd.getPosition();
      if (this.position && p_edt) {
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
  
  redo_copy: function(cmd) {
    if (cmd.getNivo() !== null) {
      this.currentNivo = cmd.getNivo();
    }
    var p_cpy = cmd.getPosition();
    if (this.position && p_cpy) {
      this.position.setRow(p_cpy.getRow());
      this.position.setColumn(p_cpy.getColumn());
    }               
    cmd.setUnDone(false);       
    this.mediator.setLastCommand(cmd,false);
  };
  
  redo_delete: function(cmd) {
    //this.mediator.childRelation = Relation.clone(cmd.getRelation());
    this.mediator.childRelation = (cmd.getRelation())?cmd.getRelation().clone():null;
    if (this.mediator.childRelation) {
      //var relation = this.mediator.childRelation.remove(this.mediator);
      this.mediator.childRelation.remove(this.mediator);
      if (cmd.getNivo() !== null) {
        this.currentNivo = cmd.getNivo();
      }
      var p_del = cmd.getPosition();
      if (this.position && p_del) {
        this.position.setRow(p_del.getRow());
        this.position.setColumn(p_del.getColumn());
      }               
      cmd.setUnDone(false);
      this.mediator.setLastCommand(cmd,false);
    }
  };

  redo_paste: function(cmd) {
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
      if (this.position && p_pst) {
        this.position.setRow(p_pst.getRow());
        this.position.setColumn(p_pst.getColumn());
      }
      cmd.setUnDone(false);
      this.mediator.setLastCommand(cmd,false);
    }
  };
*/  
});

//Class: RedoDataObjectCommand
var RedoDataObjectCommand = new Class({
  Extends: RedoObjectCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        //Insert logic here ... 
        var grid = mediator.getGrid();
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.OBJECT_REDONE,this.mediator);
        this.mediator.setMessageText("Object redone.");
        this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
    } catch(error) {
      Utils.alert("RedoDataObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: RedoModelObjectCommand
var RedoModelObjectCommand = new Class({
  Extends: RedoObjectCommand,
  execute: function(note) {
    try {
      var mediator = note.getBody();
      //Mode: DISPLAY!
      if (mediator.setDisplay() == GridListMediator.MODE_DISPLAY) {
        //Insert logic here ... 
        var grid = mediator.getGrid();
        this.parent(note);
        //this.sendNotification(SjamayeeFacade.OBJECT_REDONE,this.mediator);
        this.mediator.setMessageText("Object redone.");
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
    } catch(error) {
      Utils.alert("RedoModelObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: ClearObjectBufferCommand
var ClearObjectBufferCommand = new Class({
  Extends: ClearBufferCommand,
  execute: function(note) {
    try {
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.OLIST_BUFFER_CLEARED,this.mediator);
      this.mediator.setMessageText("Object Buffer cleared.");
    } catch(error) {
      Utils.alert("ClearRelationBufferCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: ClearDataObjectBufferCommand
var ClearDataObjectBufferCommand = new Class({
  Extends: ClearObjectBufferCommand,
  execute: function(note) {
    try {
      this.parent(note);
      //this.mediator.getList().setRootCommand(null);
      
      //Reset Counter for Navigation commands.
      //TODO: !!!!!  _cNc = 0;                               //TODO: global !!!     
      //this.sendNotification(SjamayeeFacade.OLIST_BUFFER_CLEARED,this.mediator);
      this.mediator.setMessageText("Object Buffer cleared.");
      this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
    } catch(error) {
      Utils.alert("ClearDataObjectBufferCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: ClearModelObjectBufferCommand
var ClearModelObjectBufferCommand = new Class({
  Extends: ClearObjectBufferCommand,
  execute: function(note) {
    try {
      this.parent(note);
      //this.mediator.getList().setRootCommand(null);
      
      //Reset Counter for Navigation commands.
      //TODO: !!!!!  _cNc = 0;                               //TODO: global !!!     
      //this.sendNotification(SjamayeeFacade.OLIST_BUFFER_CLEARED,this.mediator);
      this.mediator.setMessageText("Object Buffer cleared.");
      this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
    } catch(error) {
      Utils.alert("ClearModelObjectBufferCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: DeleteUnrefObjectsCommand
var DeleteUnrefObjectsCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    this.parent();
    this.mediator = note.getBody();
    //_of.deleteUnreferencedObjects()   
    //this.sendNotification(SjamayeeFacade.UNREF_OBJECTS_DELETED,mediator);  //NOK NOK NOK !!!
  }
});

//Class: DeleteUnrefDataObjectsCommand
var DeleteUnrefDataObjectsCommand = new Class({
  Extends: DeleteUnrefObjectsCommand,
  execute: function(note) {
    this.parent(note);
    //this.sendNotification(SjamayeeFacade.UNREF_OBJECTS_DELETED,mediator);  //NOK NOK NOK !!!
    this.mediator.setMessageText("Unreferenced Objects deleted.");
    this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
  }
});

//Class: DeleteUnrefModelObjectsCommand
var DeleteUnrefModelObjectsCommand = new Class({
  Extends: DeleteUnrefObjectsCommand,
  execute: function(note) {
    this.parent(note);
    //this.sendNotification(SjamayeeFacade.UNREF_OBJECTS_DELETED,mediator);  //NOK NOK NOK !!!
    this.mediator.setMessageText("Unreferenced Objects deleted.");
    this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
  }
});

//Class: ResetListCommand
var ResetListCommand = new Class({
  Extends: ResetViewCommand,
  execute: function(note) {
    var mediator = note.getBody();
    var list = mediator.getList();
    try {
      this.parent(note);
      //this.sendNotification(SjamayeeFacade.LIST_RESETED,mediator);
      this.mediator = mediator;
      this.mediator.setMessageText("List reset.");
    } catch(error) {
      Utils.alert("ResetListCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: ShowSFDCObjectCommand
var ShowSFDCObjectCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    try {
      this.mediator = note.getBody();
      //this.mediator.setMessageText("SFDC Object viewed!");
    } catch(error) {
      Utils.alert("ShowSFDCObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: ShowSFDCDataObjectCommand
var ShowSFDCDataObjectCommand = new Class({
  Extends: ShowSFDCObjectCommand,
  execute: function(note) {
    try {
      this.parent(note);
      //this.mediator.setMessageText("SFDC Object viewed!");
      this.mediator.setMessageText("SFDC Object viewed! (or SAP/Oracle/Documentum/...)");
    } catch(error) {
      Utils.alert("ShowSFDCDataObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: ShowSFDCDataRelationCommand
var ShowSFDCDataRelationCommand = new Class({
  Extends: ShowSFDCDataObjectCommand,
  execute: function(note) {
    try {
      this.parent(note);
      //this.mediator.setMessageText("SFDC Relation viewed!");
      this.mediator.setMessageText("SFDC Relation viewed! (or SAP/Oracle/Documentum/...)");      
    } catch(error) {
      Utils.alert("ShowSFDCDataRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: ShowSFDCModelObjectCommand
var ShowSFDCModelObjectCommand = new Class({
  Extends: ShowSFDCObjectCommand,
  execute: function(note) {
    try {
      this.parent(note);
      //this.mediator.setMessageText("SFDC Object viewed!");
      this.mediator.setMessageText("SFDC Object viewed! (or SAP/Oracle/Documentum/...)");      
    } catch(error) {
      Utils.alert("ShowSFDCModelObjectCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: ShowSFDCModelRelationCommand
var ShowSFDCModelRelationCommand = new Class({
  Extends: ShowSFDCModelObjectCommand,
  execute: function(note) {
    try {
      this.parent(note);
      //this.mediator.setMessageText("SFDC Relation viewed!");
      this.mediator.setMessageText("SFDC Relation viewed! (or SAP/Oracle/Documentum/...)");      
    } catch(error) {
      Utils.alert("ShowSFDCModelRelationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

///////////////////
//TEXT COMMANDS ***
///////////////////
//Class: EditTextCommand
var EditTextCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
    var mediator = note.getBody();
    //this.sendNotification(SjamayeeFacade.TEXT_EDITED,mediator);
    mediator.setMessageText("Edit text...");
  }
});

//Class: SaveTextCommand
var SaveTextCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
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
  }
});

//Class: CancelTextCommand
var CancelTextCommand = new Class({
  Extends: SimpleCommand,
  execute: function(note) {
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
    //this.sendNotification(SjamayeeFacade.TEXT_CANCELED,mediator);
    var toolBarMediator = null;
    if (mediator instanceof ModelObjectsTextsEditorMediator) {
      toolBarMediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
    } else {
      toolBarMediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
    }
    toolBarMediator.setMessageText("Text canceled.");    
  }
});

//////////////////////////////////////////////////////////////////////////
//////////////////////////////// BACKING /////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//TODO: MOVE TO RIGHT PLACE!
//////////////////////////////////////////////////////////////////////////
//Class: DataGrid
var DataGrid = new Class({
  Extends: Grid,
  initialize: function() {
    try {
      this.parent(DataGrid.ID);
      var facade = SjamayeeFacade.getInstance();
      this.setTypeProxy(facade.retrieveProxy(DataTypeProxy.ID));          //TODO: Move to Grid !!!
      this.setEntityProxy(facade.retrieveProxy(DataEntityProxy.ID));
      this.setRelationProxy(facade.retrieveProxy(DataRelationProxy.ID));
      this.setAttributeProxy(facade.retrieveProxy(DataAttributeProxy.ID));
    } catch(error) {
      Utils.alert("DataGrid/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});
DataGrid.ID = "DataGrid";

//Class: ModelGrid
var ModelGrid = new Class({
  Extends: Grid,
  initialize: function() {
    try {
      this.parent(ModelGrid.ID);
      var facade = SjamayeeFacade.getInstance();
      this.setTypeProxy(facade.retrieveProxy(TypeProxy.ID));          //TODO: Move to Grid !!!
      this.setEntityProxy(facade.retrieveProxy(ModelEntityProxy.ID));
      this.setRelationProxy(facade.retrieveProxy(ModelRelationProxy.ID));
      this.setAttributeProxy(facade.retrieveProxy(ModelAttributeProxy.ID));
    } catch(error) {
      Utils.alert("ModelGrid/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});
ModelGrid.ID = "ModelGrid";

//Class: HashGenerator
var HashGenerator = new Class({

  rotate_left: function(n,s) {
    var t4 = ( n<<s ) | (n>>>(32-s));
    return t4;
  },
  lsb_hex: function(val) {
    var str = "";
    var i;
    var vh;
    var vl;
    for (i=0; i<=6; i+=2) {
      vh = (val>>>(i*4+4))&0x0f;
      vl = (val>>>(i*4))&0x0f;
      str += vh.toString(16) + vl.toString(16);
    }
    return str;
  },
  cvt_hex: function(val) {
    var str = "";
    var i;
    var v;
    for (i=7; i>=0; i--) {
      v = (val>>>(i*4))&0x0f;
      str += v.toString(16);
    }
    return str;
  },
  Utf8Encode: function(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  },
  //Secure Hash Algorithm (SHA1)
  generateSHA1: function(msg) {
    var blockstart;
    var i, j;
    var W = new Array(80);
    var H0 = 0x67452301;
    var H1 = 0xEFCDAB89;
    var H2 = 0x98BADCFE;
    var H3 = 0x10325476;
    var H4 = 0xC3D2E1F0;
    var A, B, C, D, E;
    var temp;
    msg = this.Utf8Encode(msg);
    var msg_len = msg.length;
    var word_array = new Array();
    for (i=0; i<msg_len-3; i+=4) {
      j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
      msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
      word_array.push( j );
    }
    switch (msg_len % 4) {
      case 0: i = 0x080000000;
      break;
      case 1: i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
      break;
      case 2: i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
      break;
      case 3: i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
      break;
    }
    word_array.push(i);
    while ((word_array.length % 16) != 14) { word_array.push(0); }
    word_array.push(msg_len>>>29);
    word_array.push((msg_len<<3)&0x0ffffffff);
    for (blockstart=0; blockstart<word_array.length; blockstart+=16) {
      for (i=0; i<16; i++ )   { W[i] = word_array[blockstart+i]; }
      for (i=16; i<=79; i++)  { W[i] = this.rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1); }
      A = H0;
      B = H1;
      C = H2;
      D = H3;
      E = H4;
      for (i= 0; i<=19; i++) {
        temp = (this.rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
        E = D;
        D = C;
        C = this.rotate_left(B,30);
        B = A;
        A = temp;
      }
      for (i=20; i<=39; i++) {
        temp = (this.rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
        E = D;
        D = C;
        C = this.rotate_left(B,30);
        B = A;
        A = temp;
      }
      for (i=40; i<=59; i++) {
        temp = (this.rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
        E = D;
        D = C;
        C = this.rotate_left(B,30);
        B = A;
        A = temp;
      }
      for (i=60; i<=79; i++) {
        temp = (this.rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
        E = D;
        D = C;
        C = this.rotate_left(B,30);
        B = A;
        A = temp;
      }
      H0 = (H0 + A) & 0x0ffffffff;
      H1 = (H1 + B) & 0x0ffffffff;
      H2 = (H2 + C) & 0x0ffffffff;
      H3 = (H3 + D) & 0x0ffffffff;
      H4 = (H4 + E) & 0x0ffffffff;
    }
    return (this.cvt_hex(H0) + this.cvt_hex(H1) + this.cvt_hex(H2) + this.cvt_hex(H3) + this.cvt_hex(H4)).toLowerCase();
  },
  //Secure Hash Algorithm (SHA256)
  generateSHA2: function(msg) {
    var chrsz   = 8;
    var hexcase = 0;

    function safe_add (x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }

    function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X, n) { return ( X >>> n ); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

    function core_sha256 (m, l) {
      var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
                        0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
                        0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
                        0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967,
                        0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
                        0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
                        0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
                        0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
      var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
      var W = new Array(64);
      var a, b, c, d, e, f, g, h, i, j;
      var T1, T2;

      m[l >> 5] |= 0x80 << (24 - l % 32);
      m[((l + 64 >> 9) << 4) + 15] = l;

      for ( var i = 0; i<m.length; i+=16 ) {
        a = HASH[0];
        b = HASH[1];
        c = HASH[2];
        d = HASH[3];
        e = HASH[4];
        f = HASH[5];
        g = HASH[6];
        h = HASH[7];
        for ( var j = 0; j<64; j++) {
          if (j < 16) W[j] = m[j + i];
          else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

          T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
          T2 = safe_add(Sigma0256(a), Maj(a, b, c));

          h = g;
          g = f;
          f = e;
          e = safe_add(d, T1);
          d = c;
          c = b;
          b = a;
          a = safe_add(T1, T2);
        }
        HASH[0] = safe_add(a, HASH[0]);
        HASH[1] = safe_add(b, HASH[1]);
        HASH[2] = safe_add(c, HASH[2]);
        HASH[3] = safe_add(d, HASH[3]);
        HASH[4] = safe_add(e, HASH[4]);
        HASH[5] = safe_add(f, HASH[5]);
        HASH[6] = safe_add(g, HASH[6]);
        HASH[7] = safe_add(h, HASH[7]);
      }
      return HASH;
    }
    
    function str2binb (str) {
      var bin = Array();
      var mask = (1 << chrsz) - 1;
      for(var i = 0; i < str.length * chrsz; i += chrsz) {
        bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
      }
      return bin;
    }

    function binb2hex (binarray) {
      var hex_tab = hexcase?"0123456789ABCDEF":"0123456789abcdef";
      var str = "";
      for(var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
        hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
      }
      return str;
    }
    
    var result = null;
    if (msg) {
      var s = this.Utf8Encode(msg);
      result = binb2hex(core_sha256(str2binb(s), s.length * chrsz));
    }
    return result;
  }
});
HashGenerator.getInstance = function() {
  if (HashGenerator.instance === undefined) {
    //The classFactory is used as a descriptor for the HashGenerator
    //when hierarchical relationships are required as in this case.);
    var classFactory = new Class(new HashGenerator());
    HashGenerator.instance = new classFactory();
  }
  return HashGenerator.instance;
};

//////////////////////////////////////////////////////////////////////////
///////////////////////////////// COMMON /////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////// PROXIES /////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Abstract
//Class: CachedObjectVO
var CachedObjectVO = new Class({

  initialize: function(id,ver,txi,exi,vir,vnv) {
    //this.id = null;
    //this.ver = 0;
    //this.txi = null;
    //this.exi = null;
    //this.vir = null;
    try {
    //if (id !== undefined)  { this.id = id; }
      if (id !== undefined)  { this.id = CachingProxy.getSHA2Id(id); }
      if (ver !== undefined) { this.ver = ver; }
    //if (txi !== undefined) { this.txi = txi; }
      if (txi !== undefined) { this.txi = CachingProxy.getSHA2Id(txi); }
      if (exi !== undefined) { this.exi = CachingProxy.getSHA2Id(exi); }
      if (vir !== undefined) { this.vir = vir; }
      if (vnv !== undefined) { this.vnv = vnv; }
    } catch(error) {
      Utils.alert("CachedObjectVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: CachingProxy
var CachingProxy = new Class({
  Extends: Proxy,
  initialize: function(name) {
    this.topOid = null;
    this.bottomOid = null;
    this.currentOid = null;
    this.clearVirtualItems();
    this.parent(name, new Array());
  },
  clearVirtualItems: function() {
    this.virtualItems = [];
  },
  /*getItems: function() {
    var result = this.getData();
    if (this.virtualItems) {
      result = result.concat(this.virtualItems);
    }
    return result;
  },*/
  getItems: function(nivo) {
    var _nivo = (nivo !== undefined && nivo >= -1 && nivo <= 1)?nivo:null;
    var result = this.getData();
    var virtualItems = this.virtualItems;
    if (_nivo) {
      virtualItems = [];
      if (this.virtualItems && this.virtualItems.length > 0) {
        for (var i = 0; i < this.virtualItems.length; i++) {
          var item = this.virtualItems[i];
          if (item) {
            var bo = this.newBusinessObject(item);
            if (bo) {
              if (bo.getVirtualNivo() && bo.getVirtualNivo() != _nivo) { continue; }
              virtualItems.push(item);
            }
          }
        }
      }
    }
    if (virtualItems) {
      result = result.concat(virtualItems);
    }
    return result;
  },
  newBusinessObject: function(item) {
    return null;
  },
  addItem: function(item) {
    var data = this.getData();
    /*for (var i in data) {
      if (data[i].id == item.id) {
        return;
      }
    }*/
    //Only unique items.
    data.push(item);
  },
  addVirtualItem: function(item) {
    if (this.virtualItems === undefined || this.virtualItems === null) {
      this.virtualItems = [];
    }
    this.virtualItems.push(item);
  },
  removeVirtualItem: function(item) {
    if (item) {
      if (this.virtualItems && this.virtualItems.length > 0) {
        for (var i = 0; i < this.virtualItems.length; i++) {
          var virtualItem = this.virtualItems[i];
          if (virtualItem && item.id == virtualItem.id) {
            this.virtualItems.splice(i,1);
          }
        }
      }
    }
  },
  getTopOid: function() {
    if (this.topOid === undefined) {
      this.topOid = null;
    }
    return this.topOid;
  },
  setTopOid: function(oid) {
    this.topOid = oid;
  },
  getBottomOid: function() {
    if (this.bottomOid === undefined) {
      this.bottomOid = null;
    }
    return this.bottomOid;
  },
  setBottomOid: function(oid) {
    this.bottomOid = oid;
  },
  getCurrentOid: function() {
    if (this.currentOid === undefined) {
      this.currentOid = null;
    }
    return this.currentOid;
  },
  setCurrentOid: function(oid) {
    this.currentOid = oid;
  },
  getById: function(id) {
    //Utils.alert("CachingProxy/getById - id: "+id);
    var result = null;
    try {
      if (id) {
        var items = this.getItems();
        if (items) {
          for (var i = 0; i < items.length; i++) {
            if (items[i]) {
              var item = items[i];
              if (item.id.substr(0,BusinessObject.ID_MIN_LENGTH) == id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                result = item;
                break;
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("CachingProxy/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getByName: function(name) {
    var result = null;
    try {
      if (name) {
        var items = this.getItems();
        if (items) {
          for (var i = 0; i < items.length; i++) {
            if (items[i]) {
              var item = items[i];
              if (item.name == name) {
                result = item;
                break;
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("CachingProxy/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  //Abstract
  getListObject: function(vo) { return null; },
  filterObject: function(object) { return null; },

  firstPage: function(pageSize) {
    var page = [];
    var listObject = null;
    try {
      //var objects = this.getItems(ListCache.WEBSERVICE_METHOD_FIRST);
      var objects = this.getItems();
      if (objects) {
        for (var i = 0; i < objects.length; i++) {
          if (objects[i]) {
            var object = objects[i];
            listObject = this.getListObject(object);
            if (this.filterObject(listObject)) {
              page.push(listObject);
              if (page.length == 1) { this.setTopOid(listObject.getId()); }
              this.setBottomOid(listObject.getId());
              if (pageSize) { if (page.length > pageSize) break; }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("CachingProxy/firstPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return page;
    }
  },
  previousPage: function(pageSize) {
    var page = [];
    var listObject = null;
    try {
      //var objects = this.getItems(ListCache.WEBSERVICE_METHOD_PREVIOUS);
      var objects = this.getItems();
      if (objects) {
        for (var i = 0; i < objects.length; i++) {
          if (objects[i]) {
            var object = objects[i];
            listObject = this.getListObject(object);
            if (this.filterObject(listObject)) {
              page.unshift(listObject);
              this.setTopOid(listObject.getId());
              if (page.length == 1) { this.setBottomOid(listObject.getId()); }
              if (pageSize) { if (page.length > pageSize) break; }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("CachingProxy/previousPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return page;
    }
  },
  previousLine: function(pageSize) {
    var page = [];
    var listObject = null;
    try {
      var objects = this.getItems();
      if (objects) {
        for (var i = 0; i < objects.length; i++) {
          if (objects[i]) {
            var object = objects[i];
            listObject = this.getListObject(object);
            if (this.filterObject(listObject)) {
              page.unshift(listObject);
              this.setTopOid(listObject.getId());
              if (page.length == 1) { this.setBottomOid(listObject.getId()); }
              if (pageSize) { if (page.length > pageSize) break; }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("CachingProxy/previousLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return page;
    }
  },
  nextLine: function(pageSize) {
    var page = [];
    var listObject = null;
    try {
      var objects = this.getItems();
      if (objects) {
        for (var i = 0; i < objects.length; i++) {
          if (objects[i]) {
            var object = objects[i];
            listObject = this.getListObject(object);
            if (this.filterObject(listObject)) {
              page.push(listObject);
              if (page.length == 1) { this.setTopOid(listObject.getId()); }
              this.setBottomOid(listObject.getId());
              if (pageSize) { if (page.length > pageSize) break; }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("CachingProxy/nextLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return page;
    }
  },
  nextPage: function(pageSize) {
    var page = [];
    var listObject = null;
    try {
      //var objects = this.getItems(ListCache.WEBSERVICE_METHOD_NEXT);
      var objects = this.getItems();
      if (objects) {
        for (var i = 0; i < objects.length; i++) {
          if (objects[i]) {
            var object = objects[i];
            listObject = this.getListObject(object);
            if (this.filterObject(listObject)) {
              page.push(listObject);
              if (page.length == 1) { this.setTopOid(listObject.getId()); }
              this.setBottomOid(listObject.getId());
              if (pageSize) { if (page.length > pageSize) break; }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("CachingProxy/nextPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return page;
    }
  },
  lastPage: function(pageSize) {
    var page = [];
    var listObject = null;
    try {
      //var objects = this.getItems(ListCache.WEBSERVICE_METHOD_LAST);
      var objects = this.getItems();
      if (objects) {
        for (var i = 0; i < objects.length; i++) {
          if (objects[i]) {
            var object = objects[i];
            listObject = this.getListObject(object);
            if (this.filterObject(listObject)) {
              page.unshift(listObject);
              this.setTopOid(listObject.getId());
              if (page.length == 1) { this.setBottomOid(listObject.getId()); }
              if (pageSize) { if (page.length > pageSize) break; }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("CachingProxy/lastPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return page;
    }
  }
});
//Statics
CachingProxy.VIRTUAL_ID = null;
CachingProxy.VIRTUAL_ID_FIRST = 9999900001;
CachingProxy.VIRTUAL_ID_LAST = 9999999999;
CachingProxy.ID_SHA1_STAMP = "__@@SID@@__";
CachingProxy.ID_SHA2_STAMP = "__@@SID@@__";
//CachingProxy.ID_SHA1_LENGTH = 40;
CachingProxy.ID_SHA2_LENGTH = 64;
CachingProxy.getNextVirtualId = function() {
  if (CachingProxy.VIRTUAL_ID === null || CachingProxy.VIRTUAL_ID >= CachingProxy.VIRTUAL_ID_LAST) {
    CachingProxy.VIRTUAL_ID = CachingProxy.VIRTUAL_ID_FIRST;
  } else {
    CachingProxy.VIRTUAL_ID = (CachingProxy.VIRTUAL_ID + 1);
  }
  return CachingProxy.VIRTUAL_ID;
};
CachingProxy.isSHA2Id = function(id) {
  //ADD ADDITIONAL SPECIFICATIONS (all lowerCase, ...) !!!
  return (!id || id.length == CachingProxy.ID_SHA2_LENGTH)?true:false;
};
CachingProxy.getSHA2Id = function(id) {
  var result = id;
  if (CachingProxy.isSHA2Id(id) === false) {
    result = HashGenerator.getInstance().generateSHA2(CachingProxy.ID_SHA2_STAMP+id);
  }
  return result;
};

//Abstract
//Class: AttributeVO
var AttributeVO = new Class({
  Extends: CachedObjectVO,
  initialize: function(id,name,value,txi) {
    //this.name = "";
    //this.value = "";
    try {
      this.parent(id,0,txi);
      if (name !== undefined)  { this.name = name; }
      if (value !== undefined) { this.value = value; }
    } catch(error) {
      Utils.alert("AttributeVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: AttributeProxy
var AttributeProxy = new Class({
  Extends: CachingProxy,
  initialize: function(name) {
    this.parent(name);
  }
});

//Abstract
//Class: EntityVO
var EntityVO = new Class({
  Extends: CachedObjectVO,
  initialize: function(id,ver,name,desc,txi,exi,oid,firstAttributes,references) {
    //this.name = "";
    //this.desc = "";
    //this.oid = null;
    //this.firstAttributes = [];
    //this.references = [];
    try {
      this.parent(id,ver,txi,exi);
      if (name !== undefined)            { this.name = name; }
      if (desc !== undefined)            { this.desc = desc; }
    //if (oid !== undefined)             { this.oid = oid; }
      if (oid !== undefined)             { this.oid = CachingProxy.getSHA2Id(oid); }
      if (firstAttributes !== undefined) { this.firstAttributes = firstAttributes; }
      if (references !== undefined)      { this.references = references; }
    } catch(error) {
      Utils.alert("EntityVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: EntityProxy
var EntityProxy = new Class({
  Extends: CachingProxy,
  initialize: function(name) {
    this.parent(name);
  },
  getItems: function(nivo) {
    var result = this.parent(nivo);
    //Sort DESCENDING
    result.sort(EntityProxy.sortName);
    return result;
  },    
  getEntities: function() {
    var result = this.getItems();
    //Sort DESCENDING
    result.sort(EntityProxy.sortName);
    return result;
  },
  addVirtualEntity: function(entity) {
    if (entity) {
      entity.setId(String(CachingProxy.getNextVirtualId()));
      this.addVirtualItem(entity);
    }
  },
  filterObject: function(object) {
    var result = object;
    var filterValue = this.getHeaderMediator().getEntityFilterValue();
    if (filterValue) {
      var re_modifiers = SjamayeeFacade.ENTITY_FILTER_MODIFIERS;
      if (this.getHeaderMediator().getEntityFilterCase() === true) {
        re_modifiers = SjamayeeFacade.ENTITY_FILTER_MODIFIERS_CASE;
      }
      var regexp = new RegExp(filterValue,re_modifiers);
      if ((object.getName().match(regexp) === null) &&
          (object.getDesc().match(regexp) === null)) {
        result = null;
      }
    }
    if (result) {
      var modelTypeId = null;
      var modelType = this.getHeaderMediator().getTypeSelected();
      if (modelType) { modelTypeId = modelType.getId(); }
      if (modelTypeId) {
        var typeId = null;
        if (object instanceof DataEntity) {
          typeId = object.getModelEntity().getTid();
        }
        if (object instanceof ModelEntity) {
          typeId = object.getTid();
        }
        if (typeId === null || typeId != modelTypeId) {
          result = null;
        }
      }
    }
    return result;
  },
  //Abstract
  getHeaderMediator: function() { return undefined; }
});
EntityProxy.sortName = function(a,b) {
  return (a.name < b.name)?-1:1;  
};

//Abstract
//Class: RelationVO
var RelationVO = new Class({
  Extends: CachedObjectVO,
  initialize: function(id,ver,val,pei,cei,pid,nid,txi,exi,vir,vnv) {
    try {
      this.parent(id,ver,txi,exi,vir,vnv);
      if (val !== undefined) { this.val = val; }
    //if (pei !== undefined) { this.pei = pei; }
      if (pei !== undefined) { this.pei = CachingProxy.getSHA2Id(pei); }
    //if (cei !== undefined) { this.cei = cei; }
      if (cei !== undefined) { this.cei = CachingProxy.getSHA2Id(cei); }
    //if (pid !== undefined) { this.pid = pid; }
      if (pid !== undefined) { this.pid = CachingProxy.getSHA2Id(pid); }
    //if (nid !== undefined) { this.nid = nid; }
      if (nid !== undefined) { this.nid = CachingProxy.getSHA2Id(nid); }
    } catch(error) {
      Utils.alert("RelationVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Abstract
//Class: RelationProxy
var RelationProxy = new Class({
  Extends: CachingProxy,
  initialize: function(name) {
    this.parent(name);
  },
  getItems: function(nivo) {
    var result = this.parent(nivo);
    //Sort DESCENDING
    //result.sort(RelationProxy.sortName);
    result.sort(RelationProxy.sortValue);
    return result;
  },    
  addVirtualRelation: function(relation) {
    if (relation) {
      relation.setId(String(CachingProxy.getNextVirtualId()));
      this.addVirtualItem(relation.getRelationVO());
    }
  },
  removeVirtualRelation: function(relation) {
    if (relation) {
      this.removeVirtualItem(relation.getRelationVO());
    }
  },
  getRelationsForEntity: function(entity,parentOrChild) {
    var _entity = (entity !== undefined)?entity:null;
    var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;
    var result = [];
    try {
      if (_entity) {
        var relations = this.getItems();
        for (var i = 0; i < relations.length; i++) {
          var relation = relations[i];
          if (relation) {
            if (_parentOrChild === null || _parentOrChild == RelationB.CHILD) {
              if (relation.cei && relation.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == _entity.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                result.push(relation);
              }
            }
            if (_parentOrChild === null || _parentOrChild == RelationB.PARENT) {
              if (relation.pei && relation.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == _entity.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                result.push(relation);
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("ModelRelationProxy/getRelationsForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },  
  getFirstRelationForEntity: function(entity,parentOrChild) {
    var _entity = (entity !== undefined)?entity:null;
    var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;    
    var result = null;
    try {
      if (_entity) {
        var items = this.getItems();
        if (items) {
          for (var i = 0; i < items.length; i++) {
            if (items[i]) {
              var r1 = items[i];
              if (r1) {
                //if (r1.pid !== null) { continue; }
                var selected = false;
                if (_parentOrChild === null || _parentOrChild == RelationB.CHILD) {
                  selected = (r1.cei && r1.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == _entity.id.substr(0,BusinessObject.ID_MIN_LENGTH))?true:false;
                }
                if (selected === false && (_parentOrChild === null || _parentOrChild == RelationB.PARENT)) {
                  selected = (r1.pei && r1.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == _entity.id.substr(0,BusinessObject.ID_MIN_LENGTH))?true:false;
                }
                if (selected === true) {
                  result = r1;
                  break;
                }
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("RelationProxy/getFirstRelationForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }, 
  getFirstParentForEntity: function(entity) {
    var _entity = (entity !== undefined)?entity:null;
    var result = null;
    try {
      if (_entity) {
        var r1 = null;
        var items = this.getItems();
        if (items) {
          for (var i = 0; i < items.length; i++) {
            if (items[i]) {
              r1 = items[i];
              if (r1) {
                if (r1.cei) {
                  if (r1.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == _entity.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                    result = r1;
                    break;
                  }
                }
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("RelationProxy/getFirstParentForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }, 
  getFirstChildForEntity: function(entity) {
    var _entity = (entity !== undefined)?entity:null;
    var result = null;
    try {
      if (_entity) {
        var r1 = null;
        var items = this.getItems();
        if (items) {
          for (var i = 0; i < items.length; i++) {
            if (items[i]) {
              r1 = items[i];
              if (r1) {
                if (r1.pei) {
                  //break;
                  if (r1.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == _entity.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                    //if (r1.isFirstParent()) {
                    result = r1;
                    break;
                    //}
                  }
                }
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("RelationProxy/getFirstChildForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getLastParentForEntity: function(entity) {
    var _entity = (entity !== undefined)?entity:null;
    var result = null;
    try {
      if (_entity) {
        var r1 = null;
        var items = this.getItems();
        if (items) {
          for (var i = 0; i < items.length; i++) {
            if (items[i]) {
              r1 = items[i];
              if (r1) {
                if (r1.cei) {
                  //break;
                  if (r1.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == _entity.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                    //if (r1.isLastParent()) {
                    result = r1;
                    break;
                    //}
                  }
                }
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("RelationProxy/getLastParentForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }  
});
/*RelationProxy.sortName = function(a,b) {
  return (a.name < b.name)?-1:1;  
};*/
RelationProxy.sortValue = function(a,b) {
  return (a.val < b.val)?-1:1;  
};

//Class: SettingVO
var SettingVO = new Class({
  Extends: CachedObjectVO,
  initialize: function(id,name,desc) {
    //this.name = "";
    //this.desc = "";
    try {
      this.parent(id);
      if (name !== undefined) { this.name = name; }
      if (desc !== undefined) { this.desc = desc; }
    } catch(error) {
      Utils.alert("SettingVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: SettingProxy
var SettingProxy = new Class({
  Extends: CachingProxy,
  initialize: function() {
    this.parent(SettingProxy.ID);
    this.addItem(new SettingVO("1","Setting1", "Setting1 Description"));
    this.addItem(new SettingVO("2","Setting2", "Setting2 Description"));
  }
/*
  getAll: function(sort) {
    Utils.alert('SettingCache/getAll - sort: '+sort);
    var _sort = ((sort !== undefined) && (sort !== null))?sort:Cache.SORT_ASCENDING;
    var result = [];
    try {
      var cache = this.getCache();
      if (cache) {
        for (var i = 0; i < cache.length; i++) {
          result.push(cache[i]);
        }
        //Sort DESCENDING
        if (_sort == Cache.SORT_DESCENDING) {
          result.reverse();
        }
      }
    } catch(error) {
      Utils.alert("SettingCache/getAll Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
*/
});
SettingProxy.ID = "SettingProxy";

//////////////////////////////////////////////////////////////////////////
///////////////////////////// BUSINESS CLASSES ///////////////////////////
//////////////////////////////////////////////////////////////////////////
//Abstract
//Class: BusinessObject
var BusinessObject = new Class({

  initialize: function(vo) {
  /*var type = "";
    if (this  instanceof BusinessObject) {
      type = "BusinessObject";
    } else if (this  instanceof Grid) {
      type = "Grid";
    } else if (this  instanceof EntityCache) {
      type = "EntityCache";
    } else if (this  instanceof RelationCache) {
      type = "RelationCache";
    } else if (this  instanceof TypeCache) {
      type = "TypeCache";
    } else if (this  instanceof SettingCache) {
      type = "SettingCache";
    } else if (this  instanceof Position) {
      type = "Position";
    } else if (this  instanceof Keyboard) {
      type = "Keyboard";
    } else if (this  instanceof RelationsForm) {
      type = "RelationsForm";
    }*/
    try {
      if (vo) {
        this.vo = vo;
        this.setId(vo.id);
        this.setVersion(vo.ver);
        this.setTxi(vo.txi);
        this.setExi(vo.exi);
        this.setTopSelect(vo.top);
        this.setVirtual(vo.vir);
        this.setVirtualNivo(vo.vnv);
        //BusinessObject.COUNT++;
        //this.setSid(BusinessObject.COUNT);
      }
    } catch(error) {
      Utils.alert("BusinessObject/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  getId: function() {
    if (this.vo.id === undefined) {
      this.vo.id = null;
    }
    return (this.vo.id)?this.vo.id.substr(0,BusinessObject.ID_MIN_LENGTH):this.id;
  },
  setId: function(id) {
    if (id) {
      this.vo.id = CachingProxy.getSHA2Id(id);
    }
  },
  getVersion: function() {
    if (this.vo.ver === undefined) {
      this.vo.ver = null;
    }
    return this.vo.ver;
  },
  setVersion: function(version) {
    if (version !== undefined) {
      this.vo.ver = version;
    }
  },
  getSid: function() {
    return this.sid;
  },
  setSid: function(sid) {
    if (sid) {
      this.sid = sid;
      if (sid > BusinessObject.HIGHEST_SID) {
        BusinessObject.HIGHEST_SID = sid;
      }
      this.sid = CachingProxy.getSHA2Id(this.sid);
    }
  },
  getTxi: function() {
    if (this.vo.txi === undefined) {
      this.vo.txi = null;
    }
    return (this.vo.txi)?this.vo.txi.substr(0,BusinessObject.ID_MIN_LENGTH):this.vo.txi;
  },
  setTxi: function(txi) {
    if (txi) {
      this.vo.txi = CachingProxy.getSHA2Id(txi);
    }
  },
  getExi: function() {
    if (this.vo.exi === undefined) {
      this.vo.exi = null;
    }
    return (this.vo.exi)?this.vo.exi.substr(0,BusinessObject.ID_MIN_LENGTH):this.vo.exi;
  },
  setExi: function(exi) {
    if (exi) {
      this.vo.exi = CachingProxy.getSHA2Id(exi);
    }
  },
  isA: function(mei) { return false; },
  getSuperClass: function() { return null; },
  hasSuperClass: function() {
    return (this.getSuperClass())?true:false;
  },
  getSuperClassModel: function() { return null; },
  hasSuperClassModel: function() {
    return (this.getSuperClassModel())?true:false;
  },  
  hasSubClasses: function() {
    //return (this.getSubClass())?true:false;
    return (this.getSubClasses() && this.getSubClasses().length > 0)?true:false;
  },
  hasSubClassModel: function() {
    //return (this.getSubClassModel())?true:false;
    return (this.getSubClassModels() && this.getSubClassModels().length > 0)?true:false;
  },
  isTopSelect: function() {
    if (this.topSelect === undefined) {
      this.topSelect = false;
    }
    return this.topSelect;
  },
  setTopSelect: function(topSelect) {
    if (topSelect) {
      this.vo.top = (topSelect === true)?true:false;
    }
  },    
  isVirtual: function() {
    if (this.vo.vir === undefined) {
      this.vo.vir = false;
    }
    return this.vo.vir;
  },
  setVirtual: function(virtual) {
    if (virtual !== undefined) {
      this.vo.vir = (virtual === true)?true:false;
    }
  },
  getVirtualNivo: function() {
    if (this.vo.vnv === undefined) {
      this.vo.vnv = null;
    }
    return this.vo.vnv;
  },
  setVirtualNivo: function(nivo) {
    //Possible values: -1, 0, 1
    if (nivo !== undefined && nivo !== null) {
      if (nivo >= (Position.NIVO_ROOT() - 1) && nivo <= (Position.NIVO_ROOT() + 1)) {
        this.vo.vnv = nivo;
      }
    }
  },
  getCby: function() {
    //return this.cby;
    return "Bill Gates";
  },
  setCby: function(cby) {
    if (cby !== undefined) {
      this.cby = cby;
    }
  },
  getMby: function() {
    //return this.mby;
    return "Steve Jobs";
  },
  setMby: function(mby) {
    if (mby !== undefined) {
      this.mby = mby;
    }
  },
  //Functions
  //Abstract
  clone: function() {
    Utils.alert("BusinessObject/clone - abstract.");
    return undefined;
  },
  print: function(html,keysOnly) {
    var _html = (html !== undefined && html !== null)?html:false;
    var _keysOnly = (keysOnly !== undefined && keysOnly !== null)?keysOnly:false;
    var _nl = (_html)?'<br/>':'\n';
    var result = '\nBusinessObject:'+_nl;
    try {
      var i = 0;
      var properties = Utils.eval(this,false); //true);
      if (properties) {
        for (var key = 0; key < properties.length; key++) {
          i++;
          result += (i + ' ' + key);
          if (!_keysOnly) {
            result += (': ' + properties[key]);
          }
          result += _nl;
        }
      }
    } catch(error) {
      Utils.alert("BusinessObject/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
//Statics
BusinessObject.COUNT = 0;
BusinessObject.HIGHEST_SID = 0;
BusinessObject.ID_MIN_LENGTH = 64; //40; //15;
BusinessObject.RELATIONS_UNDEFINED = "*0*";
BusinessObject.initializeRestore = function() {
  BusinessObject.HIGHEST_SID = 0;
};
BusinessObject.finalizeRestore = function() {
  BusinessObject.COUNT = BusinessObject.HIGHEST_SID;
};
BusinessObject.test = function() {
  return "BusinessObject/test";
};

//Abstract
//Class: Attribute
var AttributeB = new Class({
  Extends: BusinessObject,
  initialize: function(vo) {
    try {
      this.parent(vo);
      if (vo) {
        this.setName(vo.name);
        this.setValue(vo.value);
      }
    } catch(error) {
      Utils.alert("AttributeB/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  getAttributeVO: function() {
    //return undefined;
    return this.vo;
  },  
  getName: function() {
    if (this.vo.name === undefined) {
      this.vo.name = '';
    }
    return this.vo.name;
  },
  setName: function(name) {
    if (name !== undefined) {
      this.vo.name = name;
    }
  },
  getValue: function() {
    if (this.vo.value === undefined) {
      this.vo.value = '';
    }
    return this.vo.value;
  },
  setValue: function(value) {
    if (value !== undefined) {
      this.vo.value = value;
    }
  }
});

//Abstract
//Class: EntityB
var EntityB = new Class({
  Extends: BusinessObject,
  initialize: function(vo) {
    try {
      this.parent(vo);
      if (vo) {
        this.setName(vo.name);
        this.setDesc(vo.desc);
        this.setOid(vo.oid);
        //this.setSfdcObject(null);
        //this.setAttributeValues(null);
        this.setExpanded(false);
        this.setReferences(vo.references);
      }
    } catch(error) {
      Utils.alert("EntityB/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  getEntityVO: function() {
    //return undefined;
    return this.vo;
  },
  getName: function() {
    if (this.vo.name === undefined) {
      this.vo.name = '';
    }
    return this.vo.name;
  },
  getNameTranslated: function() {
    var result = this.getName();
    if (result) {
      result = Utils.translate(result,"es");
    }
    return result;
  },
  setName: function(name) {
    if (name !== undefined) {
      this.vo.name = name;
    }
  },
  getName50: function() {
    var result = this.getName().substr(0,50);
    //var i = result.length;
    //while (i++ < 50) { result += "&nbsp;"; }
    return result;
  },
  getDesc: function() {
    if (this.vo.desc === undefined) {
      this.vo.desc = ''; //null;
    }
    return this.vo.desc;
  },
  getDescTranslated: function() {
    var result = this.getDesc();
    if (result) {
      result = Utils.translate(result,"es");
    }
    return result;
  },
  setDesc: function(desc) {
    if (desc !== undefined) {
      this.vo.desc = desc;
    }
  },
  getOid: function() {
    if (this.vo.oid === undefined) {
      this.vo.oid = null;
    }
    return (this.vo.oid)?this.vo.oid.substr(0,BusinessObject.ID_MIN_LENGTH):this.vo.oid;
  },
  setOid: function(oid) {
    if (oid !== undefined) {
      this.vo.oid = oid;
      if (this.vo.oid) {
        this.vo.oid = CachingProxy.getSHA2Id(this.vo.oid);
      }
    }
  },
  getReferences: function() {
    if (this.vo.references === undefined) {
      this.vo.references = BusinessObject.RELATIONS_UNDEFINED;
    }
    return this.vo.references;
  },
  setReferences: function(references) {
    if (references !== undefined) {
      this.vo.references = references;
    }
  },
  getFirstAttributes: function() {
    if (this.vo.firstAttributes === undefined) {
      this.vo.firstAttributes = [];
    }
    return this.vo.firstAttributes;
  },
  setExpanded: function(expanded) {
    if (expanded !== undefined) {
      this.vo.expanded = expanded;
      this.vo.attributeList = null;
    }
  },
  isEditable: function() {
    var result = false;
    try {
      //var t1 = this.getType();
      var t1 = this.getType();
      if (t1) {
        if ((t1.getType().toUpperCase() == 'LEAD') ||
            (t1.getType().toUpperCase() == 'USER') ||
            (t1.getType().toUpperCase() == 'MAP') ||
            (t1 && t1.isSjamayee() === true)) {
          result = true;
        }
      }
    } catch(error) {
      Utils.alert("EntityB/isEditable Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return true; //result;  // !!! FOR TEST !!!
    }
  },
  isScrollable: function() {
    var result = false;
    //var typeObject = this.getType();
    var typeObject = this.getTypeObject();
    if (typeObject) {
      result = (typeObject.isSjamayee() === true)?true:this.isExpanded();
    }
    return result;
  },
  isSjamayee: function() {
    var result = null;
    try {
      var typeObject = this.getTypeObject();
      if (typeObject) {
        result = typeObject.isSjamayee();
      }
    } catch (error) {
      Utils.alert("EntityB/isSjamayee Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
//Statics
EntityB.NO_OBJECTS = "---- NO OBJECTS ----"; //"---- NO ENTITIES ----";
//States
EntityB.STATE_PARENT = "PARENT";
EntityB.STATE_CHILD = "CHILD";
EntityB.STATE_OBJECT = "OBJECT";
//Parent
EntityB.PARENT_NAME_ID = "parentName";
EntityB.PARENT_NAME_ANCHOR_ID = EntityB.PARENT_NAME_ID+"Anchor";
EntityB.PARENT_NAME_TEXTAREA_ID = EntityB.PARENT_NAME_ID+"TextArea";
EntityB.PARENT_NAME_TEXTAREA_CLASS_ID = EntityB.PARENT_NAME_ID+"TextArea";
EntityB.PARENT_TYPE_ID = "parentType";
EntityB.PARENT_TYPE_ANCHOR_ID = EntityB.PARENT_TYPE_ID+"Anchor";
EntityB.PARENT_DESC_ID = "parentDesc";
//EntityB.PARENT_DESC_ANCHOR_ID = EntityB.PARENT_DESC_ID+"Anchor";
EntityB.PARENT_DESC_DISPLAY_ID = EntityB.PARENT_DESC_ID+"Display";
EntityB.PARENT_DESC_TEXTAREA_ID = EntityB.PARENT_DESC_ID+"TextArea";
EntityB.PARENT_DESC_TEXTAREA_CLASS_ID = EntityB.PARENT_DESC_ID+"TextArea";
EntityB.PARENT_CBY_ID = "parentCby";
EntityB.PARENT_CBY_ANCHOR_ID = EntityB.PARENT_CBY_ID+"Anchor";
EntityB.PARENT_MBY_ID = "parentMby";
EntityB.PARENT_MBY_ANCHOR_ID = EntityB.PARENT_MBY_ID+"Anchor";
//Child
EntityB.CHILD_NAME_ID = "childName";
EntityB.CHILD_NAME_ANCHOR_ID = EntityB.CHILD_NAME_ID+"Anchor";
EntityB.CHILD_NAME_TEXTAREA_ID = EntityB.CHILD_NAME_ID+"TextArea";
EntityB.CHILD_NAME_TEXTAREA_CLASS_ID = EntityB.CHILD_NAME_ID+"TextArea";
EntityB.CHILD_TYPE_ID = "childType";
EntityB.CHILD_TYPE_ANCHOR_ID = EntityB.CHILD_TYPE_ID+"Anchor";
EntityB.CHILD_TYPE_SELECTION_ID = "CHILD_TYPE_SELECTION_ID";
EntityB.CHILD_DESC_ID = "childDesc";
EntityB.CHILD_DESC_ANCHOR_ID = EntityB.CHILD_DESC_ID+"Anchor";
EntityB.CHILD_DESC_EDIT_ID = EntityB.CHILD_DESC_ID+"Edit";
EntityB.CHILD_DESC_DISPLAY_ID = EntityB.CHILD_DESC_ID+"Display";
EntityB.CHILD_DESC_TEXTAREA_ID = EntityB.CHILD_DESC_ID+"TextArea";
EntityB.CHILD_DESC_TEXTAREA_CLASS_ID = EntityB.CHILD_DESC_ID+"TextArea";             //TODO: parent - name, desc classes ???
EntityB.CHILD_CBY_ID = "childCby";
EntityB.CHILD_CBY_ANCHOR_ID = EntityB.CHILD_CBY_ID+"Anchor";
EntityB.CHILD_MBY_ID = "childMby";
EntityB.CHILD_MBY_ANCHOR_ID = EntityB.CHILD_MBY_ID+"Anchor";
//Object
EntityB.OBJECT_NAME_ID = "objectName";
EntityB.OBJECT_NAME_ANCHOR_ID = EntityB.OBJECT_NAME_ID+"Anchor";
EntityB.OBJECT_NAME_TEXTAREA_ID = EntityB.OBJECT_NAME_ID+"TextArea";
EntityB.OBJECT_NAME_TEXTAREA_CLASS_ID = EntityB.OBJECT_NAME_ID+"TextArea";
EntityB.OBJECT_TYPE_ID = "objectType";
EntityB.OBJECT_TYPE_ANCHOR_ID = EntityB.OBJECT_TYPE_ID+"Anchor";
EntityB.OBJECT_TYPE_SELECTION_ID = "OBJECT_TYPE_SELECTION_ID";
EntityB.OBJECT_DESC_ID = "objectDesc";
EntityB.OBJECT_DESC_ANCHOR_ID = EntityB.OBJECT_DESC_ID+"Anchor";
EntityB.OBJECT_DESC_EDIT_ID = EntityB.OBJECT_DESC_ID+"Edit";
EntityB.OBJECT_DESC_DISPLAY_ID = EntityB.OBJECT_DESC_ID+"Display";
EntityB.OBJECT_DESC_TEXTAREA_ID = EntityB.OBJECT_DESC_ID+"TextArea";
EntityB.OBJECT_DESC_TEXTAREA_CLASS_ID = EntityB.OBJECT_DESC_ID+"TextArea";
EntityB.OBJECT_CBY_ID = "objectCby";
EntityB.OBJECT_CBY_ANCHOR_ID = EntityB.OBJECT_CBY_ID+"Anchor";
EntityB.OBJECT_MBY_ID = "objectMby";
EntityB.OBJECT_MBY_ANCHOR_ID = EntityB.OBJECT_MBY_ID+"Anchor";

EntityB.SFDC_OID = "page:sja_form:soid";
EntityB.SFDC_OID_PARENT = "page:sja_form:sfdcOidParent";
EntityB.SFDC_OID_CHILD = "page:sja_form:sfdcOidChild";
EntityB.SFDC_OID_OBJECT = "page:sja_form:sfdcOidObject";

EntityB.FILTER_ID = "entityFilter";
EntityB.SELECT_ID = "selectionEntityPanel";
EntityB.SELECTION_ID = "ENTITY_SELECTION_ID";

//Abstract
//Class: Relation
var RelationB = new Class({
  Extends: BusinessObject,
  initialize: function(vo) {
    this.parent(vo);
    if (vo) {
      this.setVal(vo.val);
      this.setPei(vo.pei);
      this.setCei(vo.cei);
      this.setPid(vo.pid);
      this.setNid(vo.nid);
      this.setSequence(0);
    }
  },
  //Getters & Setters
  getRelationVO: function() {
    //return undefined;
    return this.vo;
  },
  getName: function() {
    var result = '***';
    if (this.vo.val !== undefined && this.vo.val !== null) {
      result = this.vo.val;
    }
    return result;
  },
  getVal: function() {
    if (this.vo.val === undefined) {
      this.vo.val = null;
      //>>>TEST!!!
      this.vo.val = ((this.getId())?this.getId():'***')+'/';
      var parentEntity = this.getParentEntity();
      if (parentEntity) {
        this.vo.val += parentEntity.getName();
      } else {
        this.vo.val += '***';
      }
      var childEntity = this.getChildEntity();
      if (childEntity) {
        this.val += ' - ' + childEntity.getName();
      }//<<<TEST
    }
    return this.vo.val;
  },
  setVal: function(val) {
    if (val !== undefined) {
      this.vo.val = val;
    }
  },
  getPei: function() {
    if (this.vo.pei === undefined) {
      this.vo.pei = null;
    }
    return (this.vo.pei)?this.vo.pei.substr(0,BusinessObject.ID_MIN_LENGTH):this.vo.pei;
  },
  setPei: function(pei) {
    if (pei !== undefined) {
      this.vo.pei = pei;
      if (this.vo.pei) {
        this.vo.pei = CachingProxy.getSHA2Id(this.vo.pei);
      }
    }
  },
  getCei: function() {
    if (this.vo.cei === undefined) {
      this.vo.cei = null;
    }
    return (this.vo.cei)?this.vo.cei.substr(0,BusinessObject.ID_MIN_LENGTH):this.vo.cei;
  },
  setCei: function(cei) {
    if (cei !== undefined) {
      this.vo.cei = cei;
      if (this.vo.cei) {
        this.vo.cei = CachingProxy.getSHA2Id(this.vo.cei);
      }
    }
  },
  getPid: function() {
    if (this.vo.pid === undefined) {
      this.vo.pid = null;
    }
    return (this.vo.pid)?this.vo.pid.substr(0,BusinessObject.ID_MIN_LENGTH):this.vo.pid;
  },
  setPid: function(pid) {
    if (pid !== undefined) {
      this.vo.pid = pid;
      if (this.vo.pid) {
        this.vo.pid = CachingProxy.getSHA2Id(this.vo.pid);
      }
    }
  },
  getNid: function() {
    if (this.vo.nid === undefined) {
      this.vo.nid = null;
    }
    return (this.vo.nid)?this.vo.nid.substr(0,BusinessObject.ID_MIN_LENGTH):this.vo.nid;
  },
  setNid: function(nid) {
    if (nid !== undefined) {
      this.vo.nid = nid;
      if (this.vo.nid) {
        this.vo.nid = CachingProxy.getSHA2Id(this.vo.nid);
      }
    }
  },
  getParentEntity: function() { return undefined; },
  setParentEntity: function(entity) {
    if (entity) {
      this.parentEntity = entity;
      this.setPei(entity.getId());
    }
  },
  getChildEntity: function() {  return undefined; },
  setChildEntity: function(entity) {
    if (entity) {
      this.childEntity = entity;
      this.setCei(entity.getId());
    }
  },
  getPreviousRelation: function() { return undefined; },
  setPreviousRelation: function(relation) {
    if (relation) {
      this.previousRelation = relation;
      this.setPid(relation.getId());
    }
  },
  getNextRelation: function() { return undefined; },
  setNextRelation: function(relation) {
    if (relation) {
      this.nextRelation = relation;
      this.setNid(relation.getId());
    }
  },  
  getSequence: function() {
    if (this.vo.sequence === undefined) {
      this.vo.sequence = 0;
    }
    return this.vo.sequence;
  },
  setSequence: function(sequence) {
    if (sequence !== undefined) {
      this.vo.sequence = sequence;
    }
  },
  getSomeKey: function() {
    if (this.vo.someKey === undefined) {
      this.vo.someKey = null;
    }
    return this.vo.someKey;
  },
  setSomeKey: function(someKey) {
    if (someKey !== undefined) {
      this.vo.someKey = someKey;
    }
  },
  getGridCell: function() {
    if (this.gridCell === undefined) {
      this.gridCell = null;
    }
    return this.gridCell;
  },
  setGridCell: function(gridCell) {
    if (gridCell !== undefined) {
      this.gridCell = gridCell;
    }
  },
  isFirst: function() {
    return (this.getPid() === null);
  },
  isLast: function() {
    return (this.getNid() === null);
  },
  hasParent: function() {
    //return (this.getPei() !== null);
    return (this.getParentEntity() !== null);
  },
  hasChild: function() {
    //return (this.getCei() !== null);
    return (this.getChildEntity() !== null);
  },
  hasParentRelations: function() {
    return (this.getFirstParentRelation() !== null);
    /*var result = null;
    var relation = this.getFirstParentRelation();
    if (relation) {
      var modelRelation = relation.getModelRelation();
      if (modelRelation) {
        result = modelRelation.getPei();
      }
    }
    //return result;
    return (result !== null);*/
  },
  hasChildRelations: function() {
    return (this.getFirstChildRelation() !== null);
    /*var result = null;
    var relation = this.getFirstChildRelation();
    if (relation) {
      var modelRelation = relation.getModelRelation();
      if (modelRelation) {
        result = modelRelation.getCei();
      }
    }
    //return result;
    return (result !== null);*/
  },  
  isEditable: function() {
    var result = false;
    try {
      if (this.hasChild()) {
        var childEntity = this.getChildEntity();
        if (childEntity) {
          result = ((childEntity.getType().toUpperCase() == 'LEAD') ||
                    (childEntity.getType().toUpperCase() == 'USER') ||
                    (childEntity.getType().toUpperCase() == 'MAP'))?true:false;
          /*var modelEntity = childEntity.getModelEntity();
          if (modelEntity) {
          var modelType = modelEntity.getType();
          if (modelType) {
          result = (modelType.getTypeName() == 'T01')?true:false;
          }
          }*/
        }
      }
    } catch(error) {
      Utils.alert("RelationB/isEditable Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return true; //result; // !!! FOR TEST !!!
    }
  },
  isSjamayee: function() {
    var result = null;
    try {
      var childEntity = this.getChildEntity();
      if (childEntity) {
        result = childEntity.isSjamayee();
      }
    } catch (error) {
      Utils.alert("RelationB/isSjamayee Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  isUnique: function() {
    var result = true;
    try {
      var relationsTopAndBottom = this.getRelationsTopAndBottom();
      if (relationsTopAndBottom) {
        if (relationsTopAndBottom.length > 0) {
          for (var i = 0; i < relationsTopAndBottom.length; i++) {
            var r = relationsTopAndBottom[i];
            if (r) {
              if (this.getPid() === null) {
                if (r.getPid() === null) {
                  result = false;
                  break;
                }
              }
              if (this.getNid() === null) {
                if (r.getNid() === null) {
                  result = false;
                  break;
                }
              }
            }
          }
        }
      }
    } catch (error) {
      Utils.alert("RelationB/isUnique Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  save: function(mediator) {
    try {
      var before_pr = "\n";
      var before_nr = "\n";
      var after_pr = "\n";
      var after_nr = "\n";

      var isNew = (this.getId() === null)?true:false;

    //this.setSfdcCall(SjamayeeForm.SFDC_EDIT_CHILD);
    //this.writeSnapShot();

      mediator.previousRelation = this.getPreviousRelation();
      mediator.nextRelation = this.getNextRelation();

      if (mediator.previousRelation) { before_pr = mediator.previousRelation.print(); }
      if (mediator.nextRelation)     { before_nr = mediator.nextRelation.print(); }
      if (this.getId() === null) {
        var rid = Utils.nextId();
        this.setKey(rid);
      }
      //Update entity/relation and relations !!!
      var childEntity = this.getChildEntity();
      if (childEntity === null) {
  /*
        //Insert new entity!
        var eid = Utils.nextId();
        var type = Type.MAP;
        if (document.getElementById(Entity.CHILD_TYPE_SELECTION_ID)) {
          type = document.getElementById(Entity.CHILD_TYPE_SELECTION_ID).value;
        }
        childEntity = new Entity(eid,eid+"_name",type,eid+"_description",null,null);
        _ec.put(childEntity);
  */
        if (document) {
          if (document.getElementById(Entity.CHILD_NAME_ID)) {
            childEntity = Entity.getByName(_rf.getChildEntitySelected());
          }
        }
      }
      if (childEntity) {
        if (isNew) {
          if (document) {
            if (document.getElementById(Entity.CHILD_DESC_TEXTAREA_ID) !== null) {
              childEntity.setDesc(document.getElementById(Entity.CHILD_DESC_TEXTAREA_ID).value);
            }
          }
        }
        if (!isNew) {
          if (document) {
            if (document.getElementById(Entity.CHILD_NAME_TEXTAREA_ID) !== null) {
              childEntity.setName(document.getElementById(Entity.CHILD_NAME_TEXTAREA_ID).value);
              childEntity.setDesc(document.getElementById(Entity.CHILD_DESC_TEXTAREA_ID).value);
            }
          }
        }
        if (this.getCei() === null) {
          this.setCei(childEntity.getId());
        }
      }

      //var pid = null;
      //var nid = null;
      var previousRelation = null;
      var nextRelation = null;
      if (isNew) {
        //this.setPid(null);
        //this.setNid(null);
        this.setPreviousRelation(previousRelation);
        this.setNextRelation(nextRelation);
      }   
    /*if (!mediator.previousRelation) {
        if (this.getPid()) { mediator.previousRelation = this.getPreviousRelation();  }
      }*/
      if (mediator.previousRelation) {
        //nid = mediator.previousRelation.getNid();
        //this.setPid(mediator.previousRelation.getId());
        //mediator.previousRelation.setNid(this.getId());
        nextRelation = mediator.previousRelation.getNextRelation();
        this.setPreviousRelation(mediator.previousRelation);
        mediator.previousRelation.setNextRelation(this);
      }
    /*if (!mediator.nextRelation) {
        if (this.getNid()) { mediator.nextRelation = this.getNextRelation();  }
      }*/
      if (mediator.nextRelation) {
        //pid = mediator.nextRelation.getPid();
        //this.setNid(mediator.nextRelation.getId());
        //mediator.nextRelation.setPid(this.getId());
        previousRelation = mediator.nextRelation.getPreviousRelation();
        this.setNextRelation(mediator.nextRelation);
        mediator.nextRelation.setPreviousRelation(this);
      }
/*    if (isNew) {
        if ((this.getPid() === null) ||
            (this.getNid() === null)) {
          if (!this.isUnique()) {
            this.setPei(null);
            //this.setPid(null);
            //this.setNid(null);      
            //this = Relation.clone(null); // TODO: !!!!!!!
            //this = null;                                         // ???????????
            if (nid) {
              mediator.previousRelation.setNid(nid);
            }
            if (pid) {
              mediator.nextRelation.setPid(pid);
            }
            Utils.beep(0);
            return this;
          }
        }
      }*/
      if (isNew) {
        if ((this.getPreviousRelation() === null) ||
            (this.getNextRelation() === null)) {
          if (!this.isUnique()) {
            this.setParentEntity(null);                                         //***** VERIFY THIS / SET TO *** NULL ***
            //this.setPreviousRelation(null);
            //this.setNextRelation(null);     
            //this = Relation.clone(null); // TODO: !!!!!!!
            //this = null;                                         // ???????????
            if (nextRelation) {
              mediator.previousRelation.setNextRelation(nextRelation);
            }
            if (previousRelation) {
              mediator.nextRelation.setPreviousRelation(previousRelation);
            }
            Utils.beep(0);
            return this;
          }
        }
      }
      //Insert new relation!
      //_rc.put(this);                         _rc  !!!!!!!
      if (isNew) {
        var gridView = mediator.getGrid().getGridView();
        var position = gridView.getPosition();
        if (position) { position.down(); }
      }

      if (mediator.previousRelation) { after_pr = mediator.previousRelation.print(); }
      if (mediator.nextRelation)     { after_nr = mediator.nextRelation.print(); }
  /*
      Utils.alert("RelationB/save - this: "+this.print()+"\n"+
    //"\nParent:\n"+this.getParentEntity()?this.getParentEntity().print():"*** null ***")+
    //"\nChild:\n"+this.getChildEntity()?this.getChildEntity().print():"*** null ***")+
      "\nBEFORE:"+
      "\nPrevious:"+before_pr+
      "\nNext:"+before_nr+
      "\nAFTER:"+
      "\nPrevious:"+after_pr+
      "\nNext:"+after_nr);

      //Mode: DISPLAY
      this.setMode(Grid.MODE_DISPLAY);
      this.refresh();
  */
      //Utils.alert("RelationB/save - this: "+((this)?this.print():"null"));    
    } catch(error) {
      Utils.alert("RelationB/save Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      //Reset Globals !!!
      mediator.parentRelation = null;
      mediator.childRelation = null;
      mediator.previousRelation = null;
      mediator.currentRelation = null;
      mediator.nextRelation = null;
      return this;
    }
  },
  remove: function(mediator) {
    try {
      var before_pr = "\n";
      var before_nr = "\n";
      var after_pr = "\n";
      var after_nr = "\n";

      if (mediator.previousRelation) {
        before_pr = mediator.previousRelation.print();
      }
      if (mediator.nextRelation) {
        before_nr = mediator.nextRelation.print();
      }
      //////////////////
      //Delete relation!
      //////////////////
      mediator.previousRelation = this.getPreviousRelation();
      mediator.nextRelation = this.getNextRelation();
      if (mediator.previousRelation) {
        //mediator.previousRelation.setNid((mediator.nextRelation)?mediator.nextRelation.getId():null);
        mediator.previousRelation.setNextRelation((mediator.nextRelation)?mediator.nextRelation:null);      //VERIFY *** SET TO NULL ***
      }
      if (mediator.nextRelation) {
        //mediator.nextRelation.setPid((mediator.previousRelation)?mediator.previousRelation.getId():null);
        mediator.nextRelation.setPreviousRelation((mediator.previousRelation)?mediator.previousRelation:null);
      }
      //_rc.remove(this.getKey());  //TODO: _rc !!!!!
      _rc.remove(this.getId());  //TODO: _rc !!!!!
      //////////////////
      if (mediator.previousRelation) {
        after_pr = mediator.previousRelation.print();
      }
      if (mediator.nextRelation) {
        after_nr = mediator.nextRelation.print();
      }
      /*alert("RelationB/remove - this: "+this.print()+
      //"\nParent:\n"+(this.getParentEntity()?this.getParentEntity().print():"*** null ***")+
      //"\nChild:\n"+(this.getChildEntity()?this.getChildEntity().print():"*** null ***")+
      "\nBEFORE:"+
      "\nPrevious:"+before_pr+
      "\nNext:"+before_nr+
      "\nAFTER:"+
      "\nPrevious:"+after_pr+
      "\nNext:"+after_nr);*/
      //Utils.alert("RelationB/remove - this: "+((this)?this.print():"null"));
    } catch(error) {
      Utils.alert("RelationB/remove Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      //Reset Globals !!!
      mediator.parentRelation = null;
      mediator.childRelation = null;
      mediator.previousRelation = null;
      mediator.currentRelation = null;
      mediator.nextRelation = null;
      return this;
    }
  }
});
//Statics
RelationB.PARENT = "PARENT";
RelationB.CHILD = "CHILD";
RelationB.getFirstParentForEntity = function(entity) {
  var _entity = (entity !== undefined)?entity:null;
  var result = null;
  try {
    if (_entity) {
      var relationProxy = null;
      if (_entity instanceof ModelRelation) {
        relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
      } else {
        relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
      }
      if (relationProxy) {
        var relationVO = relationProxy.getFirstParentForEntity(_entity);
        if (relationVO) {
          if (relationVO instanceof ModelRelationVO) {          
            result = new ModelRelation(relationVO);
          } else {
            result = new DataRelation(relationVO);
          }
        }     
      }
    }
  } catch(error) {
    Utils.alert("RelationB/getFirstParentForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
RelationB.getFirstChildForEntity = function(entity) {
  var _entity = (entity !== undefined)?entity:null;
  var result = null;
  try {
    if (_entity) {
      var relationProxy = null;
      if (_entity instanceof ModelRelation) {
        relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
      } else {
        relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
      }
      if (relationProxy) {
        var relationVO = relationProxy.getFirstChildForEntity(_entity);
        if (relationVO) {
          if (relationVO instanceof ModelRelationVO) {          
            result = new ModelRelation(relationVO);
          } else {
            result = new DataRelation(relationVO);
          }
        }
      }
    }
  } catch(error) {
    Utils.alert("RelationB/getFirstChildForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};

//Class: Setting
var Setting = new Class({
  Extends: BusinessObject, //CachedObject,
  initialize: function(vo) {
    try {
      this.parent(vo);
      if (vo) {
        this.setName(vo.name);
        this.setDesc(vo.desc);
      }
    } catch(error) {
      Utils.alert("Setting/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  getSettingVO: function() {
    //return new SettingVO(this.getId(),this.getName(),this.getDesc());
    return this.vo;
  },
  getName: function() {
    if (this.vo.name === undefined) {
      this.vo.name = '';
    }
    return this.vo.name;
  },
  getNameTranslated: function() {
    var result = this.getName();
    if (result) {
      result = Utils.translate(result,"es");
    }
    return result;
  },
  setName: function(name) {
    if (name !== undefined) {
      this.vo.name = name;
    }
  },
  getDesc: function() {
    if (this.vo.desc === undefined) {
      this.vo.desc = '';
    }
    return this.vo.desc;
  },
  getDescTranslated: function() {
    var result = this.getDesc();
    if (result) {
      result = Utils.translate(result,"es");
    }
    return result;
  },
  setDesc: function(desc) {
    if (desc !== undefined) {
      this.vo.desc = desc;
    }
  },
  //Functions
  /* ADD FUNCTIONS HERE !!!
  getFirstParentRelation: function() {
  return Relation.getFirstParentForSetting(this);
  }
  getParentRelations: function(number,sort) {
  var result = [];
  try {
    result = Relation.getParentRelationsForSetting(this,number,sort);
  } catch(error) {
    alert("Setting/getParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
  }
  */
  storeJson: function() {
    var result = '';
    try {
      result = '{';
      result += '"sid":"'+this.getSid()+'"';
      result += ',"id":"'+this.getId()+'"';
      result += ',"name":"'+this.getName()+'"';
      result += ',"desc":"'+this.getDesc()+'"';
      result += '}';
      //SjamayeeForm.putBySid(this);
    } catch(error) {
      Utils.alert("Setting/storeJson Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  print: function(html,keysOnly) {
    var _html = (html !== undefined && html !== null)?html:false;
    var _keysOnly = (keysOnly !== undefined && keysOnly !== null)?keysOnly:false;
    var _nl = (_html)?'<br/>':'\n';
    var result = 'Setting:'+_nl;
    try {
      result += this.parent();
    } catch(error) {
      Utils.alert("Setting/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
//Statics
Setting.ACTIVE_ID = "settingActive";
Setting.getById = function(id) {
  var _id = (id !== undefined)?id:null;
  var result = null;
  try {
    if (_id) {
      var settingProxy = SjamayeeFacade.getInstance().retrieveProxy(SettingProxy.ID);
      var s1 = settingProxy.getById(_id);
      if (s1) { result = new Setting(s1); }
    }
  } catch(error) {
    Utils.alert("Setting/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
Setting.getByName = function(name) {
  var _name = (name !== undefined)?name:null;
  var result = null;
  try {
    if (_name) {
      var settingProxy = SjamayeeFacade.getInstance().retrieveProxy(SettingProxy.ID);
      var s1 = settingProxy.getByName(_name);
      if (s1) { result = new Setting(s1); }
    }
  } catch(error) {
    Utils.alert("Setting/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
Setting.getSettingOptions = function(settingName) {
  var _settingName = settingName?settingName:'';    
  var result = '';    
  var settingProxy = SjamayeeFacade.getInstance().retrieveProxy(SettingProxy.ID);
  var settings = settingProxy.getData();
  var settingSelected = _settingName;
  for (var i = 0; i < settings.length; i++) {
    var setting = settings[i];
    if (setting) {
      //if (setting.inUse === false) { continue; }
      var optionTag = '<option';
      optionTag += (settingSelected == setting.name)?' selected="selected"':'';
      optionTag += '>';
      result += optionTag+setting.name+'</option>';
    }
  }
  return result;
};

//////////////////////////////////////////////////////////////////////////
///////////////////////////// UICOMPONENTS ///////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Class: UIComponent
var UIComponent = new Class({
  
  initialize: function(element, properties) {
    this.initialized = false;
    this.element = null;
    this.element = $(element);
  //this.element = document.id(element);
  //this.element = document.getElementById(element);

  //alert("Element - element: "+this.element+" "+this.element.toString());
    if (!this.element)
      this.element = new Element(element, properties);
    else
      this.element.setProperties(properties);

    //Copy methods of the Element object to 'this' and bind the functions to the element itself.
    //This creates a transparent wrapper in the UIComponent for each method of the Element.
    var e = this.element;
    for (var key in e) {
      var type = null;
      try {
        //IE 7+ has a problem with this sometimes.
        type = typeof e[key];
      } catch(e){ } //alert("UIComponent/initialize - IE7 - e: "+e.message); }    //TODO: SILENT CATCH !!!
      if (type == "function" && !this[key]) {
        try {
          //Safari has trouble here with some function binding
          this[key] = e[key].bind(e);
        }
        catch(e){ } //alert("UIComponent/initialize - Safari - e: "+e.message); } //TODO: SILENT CATCH !!!
      }
    }
  },

  initializeChildren: function(){},
  childrenInitialized: function(){},
  initializationComplete: function() {
    this.initialized = true;
  },

  addChild: function(child) {
    this.grab(child.element);
    //Initialize child
    child.initializeChildren();
    child.childrenInitialized();
    child.initializationComplete();
    //Fire an added event
    child.fireEvent("added");
    return this;
  }
});

//**********************************************************************//
//************************ Sjamayee (Main View) ************************//
//**********************************************************************//
//Class: Sjamayee
var Sjamayee = new Class({
  Extends: UIComponent,
  initialize: function(element, properties) {
    this.appName = "Sjamayee!";
    this.header = null;
    this.gridList = null;
    this.toolBar = null;
    this.detail = null;
    //Reference to the SjamayeeFacade for calling 'startup'
    this.facade = null;

    this.facade = SjamayeeFacade.getInstance();
    this.parent(Sjamayee.FORM); 
  },
  initializeChildren: function() {
    //this.parent();
    this.header = new Header();
    this.addChild(this.header);
    this.gridList = new GridList();
    this.addChild(this.gridList);
    this.toolBar = new ToolBar();
    this.addChild(this.toolBar);
    this.detail = new Detail();
    this.addChild(this.detail);
  },
  initializationComplete: function() {
    this.facade.startup(this);
  }
});
Sjamayee.FORM = "sjamayeeForm";
Sjamayee.ID_PAD_SIZE = 3;

//Abstract
//Class: SjamayeeUIComponent
var SjamayeeUIComponent = new Class({
  Extends: UIComponent,
  initialize: function(name,properties) {
    this.parent(name,properties);
    this.id = name;
  },
  setElement: function(id,value) {
    if ($(id) !== null) {
      $(id).innerHTML = value;
    }
  }
});

//Class: Header
var Header = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(properties) {
    this.dataModelSelect = null;
    this.dataObjectsHeader = null;
    this.dataRelationsHeader = null;
    this.modelObjectsHeader = null;
    this.modelObjectsTextsHeader = null;
    this.modelRelationsHeader = null;
    this.modelRelationsTextsHeader = null;
    this.settingSelect = null;
    this.settingButton = null;
    this.helpLink = null;
    var dataObjectsOptionValue = Header.OBJECTS_SELECT_OPTION_VALUE;
    var dataRelationsOptionValue = Header.RELATIONS_SELECT_OPTION_VALUE;
    if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {
      dataObjectsOptionValue = Header.DATA_SELECT_OPTION_VALUE+' '+Header.OBJECTS_SELECT_OPTION_VALUE;
      dataRelationsOptionValue = Header.DATA_SELECT_OPTION_VALUE+' '+Header.RELATIONS_SELECT_OPTION_VALUE;
    }
    var html = '<div id="'+Header.DATA_MODEL_HEADER_ID+'">'+
               '<select id="'+Header.DATA_MODEL_SELECT_ID+'">'+
               '<option>'+dataObjectsOptionValue+'</option>'+
               '<option>'+dataRelationsOptionValue+'</option>';
    if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {
      html += '<option>'+Header.MODEL_SELECT_OPTION_VALUE+' '+Header.OBJECTS_SELECT_OPTION_VALUE+'</option>'+
              '<option>'+Header.MODEL_SELECT_OPTION_VALUE+' '+Header.RELATIONS_SELECT_OPTION_VALUE+'</option>';
    }
    html += '</select>'+
            '</div>'+
            '<div id="'+DataObjectsHeader.ID+'" class="'+Header.CLASS_ID+'"></div>'+
            '<div id="'+DataRelationsHeader.ID+'" class="'+Header.CLASS_ID+'"></div>';
    if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {            
      html += '<div id="'+ModelObjectsHeader.ID+'" class="'+Header.CLASS_ID+'"></div>'+
              '<div id="'+ModelObjectsTextsHeader.ID+'" class="'+Header.CLASS_ID+'"></div>'+
              '<div id="'+ModelRelationsHeader.ID+'" class="'+Header.CLASS_ID+'"></div>'+
              '<div id="'+ModelRelationsTextsHeader.ID+'" class="'+Header.CLASS_ID+'"></div>';
    }
    html += '<div id="'+Header.COMMON_HEADER_ID+'">'+
            '<label for="'+Header.SETTING_SELECT_ID+'">'+Header.SETTING_SELECT_LABEL+'</label>'+
            '<select id="'+Header.SETTING_SELECT_ID+'"><option>S1</option><option>S2</option></select>'+
            '<button id="'+Header.HELP_BUTTON_ID+'">'+Header.HELP_BUTTON_LABEL+'</button>'+
            '<button id="'+Header.SETTING_BUTTON_ID+'">'+Header.SETTING_BUTTON_LABEL+'</button>'+
            '</div>';
    this.parent(Header.ID,{html: html});
    this.dataModelSelect_changeHandler = this.dataModelSelect_changeHandler.bindWithEvent(this);
    this.settingSelect_changeHandler = this.settingSelect_changeHandler.bindWithEvent(this);
    this.settingButton_clickHandler = this.settingButton_clickHandler.bindWithEvent(this);
    this.helpLink_clickHandler = this.helpLink_clickHandler.bindWithEvent(this);
  },

  initializeChildren: function() {
    this.dataModelSelect = $(Header.DATA_MODEL_SELECT_ID);
    this.dataObjectsHeader = new DataObjectsHeader();
    this.addChild(this.dataObjectsHeader);
    this.dataRelationsHeader = new DataRelationsHeader();
    this.addChild(this.dataRelationsHeader);
    if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {   
      this.modelObjectsHeader = new ModelObjectsHeader();
      this.addChild(this.modelObjectsHeader);
      this.modelObjectsTextsHeader = new ModelObjectsTextsHeader();
      this.addChild(this.modelObjectsTextsHeader);
      this.modelRelationsHeader = new ModelRelationsHeader();
      this.addChild(this.modelRelationsHeader);
      this.modelRelationsTextsHeader = new ModelRelationsTextsHeader();
      this.addChild(this.modelRelationsTextsHeader);
    }
    this.settingSelect = $(Header.SETTING_SELECT_ID);
    this.settingButton = $(Header.SETTING_BUTTON_ID);
    this.helpLink = $(Header.HELP_BUTTON_ID);
  },

  childrenInitialized: function() {
    this.dataModelSelect.addEvent(SjamayeeFacade.CHANGE, this.dataModelSelect_changeHandler);
    this.settingSelect.addEvent(SjamayeeFacade.CHANGE, this.settingSelect_changeHandler);
    this.settingButton.addEvent(SjamayeeFacade.CLICK, this.settingButton_clickHandler);
    this.helpLink.addEvent(SjamayeeFacade.CLICK, this.helpLink_clickHandler);
  },

  dataModelSelect_changeHandler: function() { this.fireEvent(SjamayeeFacade.DATA_MODEL_CHANGE); },
  settingSelect_changeHandler: function()   { this.fireEvent(SjamayeeFacade.SETTING_CHANGE);  },
  settingButton_clickHandler: function()    { this.fireEvent(SjamayeeFacade.SETTING_CLICK); },
  helpLink_clickHandler: function()         { this.fireEvent(SjamayeeFacade.HELP_CLICK);  }
});
Header.ID = "headerPane";
Header.CLASS_ID = "header";
Header.COMMON_HEADER_ID = "commonHeader";
Header.DATA_MODEL_HEADER_ID = "dataModelHeader";
Header.DATA_MODEL_SELECT_ID = "dataModelSelect";
Header.DATA_SELECT_OPTION_VALUE = "DATA";
Header.MODEL_SELECT_OPTION_VALUE = "MODEL";
Header.OBJECTS_SELECT_OPTION_VALUE = "Objects";
Header.RELATIONS_SELECT_OPTION_VALUE = "References"; //"Relations";
Header.DATA_OBJECTS_INDEX = 0;
Header.DATA_RELATIONS_INDEX = 1;
Header.MODEL_OBJECTS_INDEX = 2;
Header.MODEL_RELATIONS_INDEX = 3;
Header.DATA_TYPE_SELECT_ALL_TYPES_INDEX = 0;
Header.MODEL_TYPE_SELECT_ALL_TYPES_INDEX = 0;
Header.SETTING_SELECT_ID = "settingSelect";            //TODO: VERIFY CommonHeader > Header > RENAME!
Header.SETTING_SELECT_LABEL = "Setting&nbsp;";
Header.SETTING_BUTTON_ID = "settingButton";
Header.SETTING_BUTTON_LABEL = "Setting...";
Header.HELP_BUTTON_ID = "helpButton";
Header.HELP_BUTTON_LABEL = "Help";

//Abstract
//Class: ObjectsHeader
var ObjectsHeader = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    this.referenceOperatorSelect = null;
    this.referenceFilter = null;
    this.typeSelect = null;
    this.filter = null;
    this.filterCaseCheckBox = null;
    this.filterHelp = null;
    this.filterButton = null;
    var html = '<div id="'+name+ObjectsHeader.SPECIAL_HEADER_ID+'">'+
               '<label for="'+name+ObjectsHeader.REFERENCE_OPERATOR_SELECT_ID+'">'+ObjectsHeader.REFERENCE_OPERATOR_SELECT_LABEL+'</label>'+
               '<select id="'+name+ObjectsHeader.REFERENCE_OPERATOR_SELECT_ID+'">'+
               '<option>'+ObjectsHeader.REFERENCE_OPERATOR_EQUAL+'</option>'+   //== : equal
               '<option>'+ObjectsHeader.REFERENCE_OPERATOR_GTEQ+'</option>'+    //>= : greater than or equal
               '<option>'+ObjectsHeader.REFERENCE_OPERATOR_GT+'</option>'+      //>  : greater than
               '<option>'+ObjectsHeader.REFERENCE_OPERATOR_LTEQ+'</option>'+    //<= : less than or equal
               '<option>'+ObjectsHeader.REFERENCE_OPERATOR_LT+'</option>'+      //<  : less than
               '</select>'+   
               '<input type="text" id="'+name+ObjectsHeader.REFERENCE_FILTER_ID+'" value=""/>'+
               '<label for="'+name+ObjectsHeader.TYPE_SELECT_ID+'">'+ObjectsHeader.TYPE_SELECT_LABEL+'</label>'+
               '<select id="'+name+ObjectsHeader.TYPE_SELECT_ID+'"></select>'+
               '<label for="'+name+ObjectsHeader.ENTITY_FILTER_ID+'">'+ObjectsHeader.ENTITY_FILTER_LABEL+'</label>'+
               '<input type="text" id="'+name+ObjectsHeader.ENTITY_FILTER_ID+'" value=""/>'+
               '<label for="'+name+ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID+'">'+ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_LABEL+'</label>'+
               '<input type="checkbox" id="'+name+ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID+'" title="'+ObjectsHeader.ENTITY_FILTER_CASE_TITLE+'"/>'+
               '<a id="'+name+ObjectsHeader.ENTITY_FILTER_HELP_ID+'" href="http://www.w3schools.com/jsref/jsref_obj_regexp.asp" title="'+ObjectsHeader.ENTITY_FILTER_FILTER_TITLE+'" style="margin:0px 3px 0px 3px;">'+ObjectsHeader.ENTITY_FILTER_HELP_TEXT+'</a>'+
               '<button id="'+name+ObjectsHeader.ENTITY_FILTER_BUTTON_ID+'" title="'+ObjectsHeader.ENTITY_FILTER_BUTTON_TITLE+'">'+ObjectsHeader.ENTITY_FILTER_BUTTON_LABEL+'</button>'+
               '</div>';
    this.parent(name,{html:html});
    this.referenceOperatorSelect_changeHandler = this.referenceOperatorSelect_changeHandler.bindWithEvent(this);
    this.typeSelect_changeHandler = this.typeSelect_changeHandler.bindWithEvent(this);
    this.filter_changeHandler = this.filter_changeHandler.bindWithEvent(this);
    this.filterCaseCheckBox_clickHandler = this.filterCaseCheckBox_clickHandler.bindWithEvent(this);
    this.filterButton_clickHandler = this.filterButton_clickHandler.bindWithEvent(this);
  },
  initializeChildren: function() {
    //this.parent();
    var name = this.id;
    this.referenceOperatorSelect = $(name+ObjectsHeader.REFERENCE_OPERATOR_SELECT_ID);
    this.referenceFilter = $(name+ObjectsHeader.REFERENCE_FILTER_ID);
    this.typeSelect = $(name+ObjectsHeader.TYPE_SELECT_ID);
    this.filter = $(name+ObjectsHeader.ENTITY_FILTER_ID);
    this.filterCaseCheckBox = $(name+ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID);
    this.filterCaseCheckBox.checked = false;
    this.filterHelp = $(name+ObjectsHeader.ENTITY_FILTER_HELP_ID);
    this.filterButton = $(name+ObjectsHeader.ENTITY_FILTER_BUTTON_ID);
  },
  childrenInitialized: function() {
    this.parent();
    this.referenceOperatorSelect.addEvent(SjamayeeFacade.CHANGE, this.referenceOperatorSelect_changeHandler);
    this.typeSelect.addEvent(SjamayeeFacade.CHANGE, this.typeSelect_changeHandler);
    this.filter.addEvent(SjamayeeFacade.CHANGE, this.filter_changeHandler);
    this.filterCaseCheckBox.addEvent(SjamayeeFacade.CLICK, this.filterCaseCheckBox_clickHandler);
    this.filterButton.addEvent(SjamayeeFacade.CLICK, this.filterButton_clickHandler);
  },
  referenceOperatorSelect_changeHandler: function() { this.fireEvent(SjamayeeFacade.OLIST_REFOP_CHANGE);  },
  typeSelect_changeHandler: function()              { this.fireEvent(SjamayeeFacade.OLIST_TYPE_CHANGE); },
  filter_changeHandler: function()                  { this.fireEvent(SjamayeeFacade.OLIST_FILTER_CHANGE); },
  filterCaseCheckBox_clickHandler: function()       { this.fireEvent(SjamayeeFacade.OLIST_FILTER_CASE_CLICK); },
  filterButton_clickHandler: function()             { this.fireEvent(SjamayeeFacade.OLIST_FILTER_CLICK); },

});
ObjectsHeader.SPECIAL_HEADER_ID = "SpecialHeader";
ObjectsHeader.SPECIAL_HEADER_CLASS_ID = "objectsSpecialHeader";
ObjectsHeader.REFERENCE_OPERATOR_SELECT_ID = "ReferenceOperatorSelect";
ObjectsHeader.REFERENCE_OPERATOR_SELECT_CLASS_ID = "objectsReferenceOperatorSelect";
ObjectsHeader.REFERENCE_OPERATOR_SELECT_LABEL = "References&nbsp;";
ObjectsHeader.REFERENCE_FILTER_ID = "ReferenceFilter";
ObjectsHeader.REFERENCE_FILTER_CLASS_ID = "objectsReferenceFilter";
ObjectsHeader.TYPE_SELECT_ID = "TypeSelect";
ObjectsHeader.TYPE_SELECT_CLASS_ID = "objectsTypeSelect";
ObjectsHeader.TYPE_SELECT_LABEL = "&nbsp;Class&nbsp;";
ObjectsHeader.ENTITY_FILTER_ID = "EntityFilter";
ObjectsHeader.ENTITY_FILTER_CLASS_ID = "objectsEntityFilter";
ObjectsHeader.ENTITY_FILTER_LABEL = "&nbsp;Filter(RE)&nbsp;";
ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID = "EntityFilterCase";
ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_CLASS_ID = "objectsEntityFilterCase";
ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_LABEL = "&nbsp;Aa&nbsp;"; //"&nbsp;Case&nbsp;"; //"&nbsp;Case sensitive&nbsp;";
ObjectsHeader.ENTITY_FILTER_CASE_CHECKBOX_TITLE = "Case sensitive filter";
ObjectsHeader.ENTITY_FILTER_HELP_ID = "EntityFilterHelp";
ObjectsHeader.ENTITY_FILTER_HELP_CLASS_ID = "objectsEntityFilterHelp";
ObjectsHeader.ENTITY_FILTER_HELP_TEXT = "?";
ObjectsHeader.ENTITY_FILTER_HELP_TITLE = "Help on Regular Expressions";
ObjectsHeader.ENTITY_FILTER_BUTTON_ID = "EntityFilterButton";
ObjectsHeader.ENTITY_FILTER_BUTTON_CLASS_ID = "objectsEntityFilterButton";
ObjectsHeader.ENTITY_FILTER_BUTTON_LABEL = "Filter!";
ObjectsHeader.ENTITY_FILTER_BUTTON_TITLE = "Filter now!";
ObjectsHeader.REFERENCE_OPERATOR_EQUAL = "&#61;&#61;";
ObjectsHeader.REFERENCE_OPERATOR_EQUAL_CHAR = "==";
ObjectsHeader.REFERENCE_OPERATOR_GTEQ = "&#62;&#61;";
ObjectsHeader.REFERENCE_OPERATOR_GTEQ_CHAR = ">=";
ObjectsHeader.REFERENCE_OPERATOR_GT = "&#62;&#32;";
ObjectsHeader.REFERENCE_OPERATOR_GT_CHAR = ">";
ObjectsHeader.REFERENCE_OPERATOR_LTEQ = "&#60;&#61;";
ObjectsHeader.REFERENCE_OPERATOR_LTEQ_CHAR = "<=";
ObjectsHeader.REFERENCE_OPERATOR_LT = "&#60;&#32;";
ObjectsHeader.REFERENCE_OPERATOR_LT_CHAR  = "<";

//Abstract
//Class: RelationsHeader
var RelationsHeader = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    this.entitySelect = null;
    this.typeSelect = null;
    this.filter = null;
    this.filterCaseCheckBox = null;
    this.filterHelp = null; 
    this.filterButton = null;
    /*  
      this.rootUndoButton = null;
      this.rootSelectButton = null;
      this.rootRedoButton = null;
      this.columnsSelect = null;
    */
    var typeSelectLabel = RelationsHeader.TYPE_SELECT_LABEL
    var entitySelectLabel = RelationsHeader.ENTITY_SELECT_LABEL
    if (properties) {
      if (properties['tlbl']) {
        typeSelectLabel = properties['tlbl'];
      }
      if (properties['elbl']) {
        entitySelectLabel = properties['elbl'];
      }
    }
    var html = '<div id="'+name+RelationsHeader.SPECIAL_HEADER_ID+'">'+
               '<label for="'+name+RelationsHeader.TYPE_SELECT_ID+'">'+typeSelectLabel+'</label>'+
               //'<select id="'+name+RelationsHeader.TYPE_SELECT_ID+'" class="'+RelationsHeader.TYPE_SELECT_CLASS_ID+'"></select>'+
               '<select id="'+name+RelationsHeader.TYPE_SELECT_ID+'"></select>'+
               '<label for="'+name+RelationsHeader.ENTITY_SELECT_ID+'">'+entitySelectLabel+'</label>'+
               //'<select id="'+name+RelationsHeader.ENTITY_SELECT_ID+'" class="'+RelationsHeader.ENTITY_SELECT_CLASS_ID+'"></select>'+
               '<select id="'+name+RelationsHeader.ENTITY_SELECT_ID+'"></select>'+
               '<label for="'+name+RelationsHeader.ENTITY_FILTER_ID+'">'+RelationsHeader.ENTITY_FILTER_LABEL+'</label>'+
               '<input type="text" id="'+name+RelationsHeader.ENTITY_FILTER_ID+'" value=""/>'+
               '<label for="'+name+RelationsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID+'">'+RelationsHeader.ENTITY_FILTER_CASE_CHECKBOX_LABEL+'</label>'+
               '<input type="checkbox" id="'+name+RelationsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID+'" title="Case sensitive filter"/>'+
               '<a id="'+name+RelationsHeader.ENTITY_FILTER_HELP_ID+'" href="http://www.w3schools.com/jsref/jsref_obj_regexp.asp" title="Help on Regular Expressions." style="margin:0px 3px 0px 3px;">'+RelationsHeader.ENTITY_FILTER_HELP_TEXT+'</a>'+
               '<button id="'+name+RelationsHeader.ENTITY_FILTER_BUTTON_ID+'" title="Filter now!">'+RelationsHeader.ENTITY_FILTER_BUTTON_LABEL+'</button>';
/*  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {
      html += '<button id="'+name+RelationsHeader.ROOT_UNDO_BUTTON_ID+'">'+RelationsHeader.ROOT_UNDO_BUTTON_LABEL+'</button>'+
              '<button id="'+name+RelationsHeader.ROOT_SELECT_BUTTON_ID+'">'+RelationsHeader.ROOT_SELECT_BUTTON_LABEL+'</button>'+
              '<button id="'+name+RelationsHeader.ROOT_REDO_BUTTON_ID+'">'+RelationsHeader.ROOT_REDO_BUTTON_LABEL+'</button>'+
              '<label for="'+name+RelationsHeader.COLUMNS_SELECT_ID+'">'+RelationsHeader.COLUMNS_SELECT_LABEL+'</label>'+
              '<select id="'+name+RelationsHeader.COLUMNS_SELECT_ID+'">'+
              '<option>2</option>'+
              '<option>3</option>'+
              '<option>4</option>'+
              '<option>5</option>'+
              '<option>6</option>'+
              '<option>7</option>'+
              '<option>8</option>'+
              '</select>';
    }*/
    html += '</div>';
    this.parent(name,{html:html});
    this.entitySelect_changeHandler = this.entitySelect_changeHandler.bindWithEvent(this);
    this.typeSelect_changeHandler = this.typeSelect_changeHandler.bindWithEvent(this);
    this.filter_changeHandler = this.filter_changeHandler.bindWithEvent(this);
    this.filter_keydownHandler = this.filter_keydownHandler.bindWithEvent(this);
    this.filterCaseCheckBox_clickHandler = this.filterCaseCheckBox_clickHandler.bindWithEvent(this);
    this.filterButton_clickHandler = this.filterButton_clickHandler.bindWithEvent(this);
    this.rootUndoButton_clickHandler = this.rootUndoButton_clickHandler.bindWithEvent(this);
    this.rootSelectButton_clickHandler = this.rootSelectButton_clickHandler.bindWithEvent(this);
    this.rootRedoButton_clickHandler = this.rootRedoButton_clickHandler.bindWithEvent(this);
    this.columnsSelect_changeHandler = this.columnsSelect_changeHandler.bindWithEvent(this);
  },
  initializeChildren: function() {
    //this.parent();
    var name = this.id;
    this.entitySelect = $(name+RelationsHeader.ENTITY_SELECT_ID);
    this.typeSelect = $(name+RelationsHeader.TYPE_SELECT_ID);
    this.filter = $(name+RelationsHeader.ENTITY_FILTER_ID);
    this.filterCaseCheckBox = $(name+RelationsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID);
    this.filterCaseCheckBox.checked = false;
    this.filterHelp = $(name+RelationsHeader.ENTITY_FILTER_HELP_ID);
    this.filterButton = $(name+RelationsHeader.ENTITY_FILTER_BUTTON_ID);
/*  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {   
      this.rootUndoButton = $(name+RelationsHeader.ROOT_UNDO_BUTTON_ID);
      this.rootSelectButton = $(name+RelationsHeader.ROOT_SELECT_BUTTON_ID);
      this.rootRedoButton = $(name+RelationsHeader.ROOT_REDO_BUTTON_ID);
      this.columnsSelect = $(name+RelationsHeader.COLUMNS_SELECT_ID);
    }*/
  },
  childrenInitialized: function() {
    //this.parent();
    this.entitySelect.addEvent(SjamayeeFacade.CHANGE, this.entitySelect_changeHandler);
    this.typeSelect.addEvent(SjamayeeFacade.CHANGE, this.typeSelect_changeHandler);
    this.filter.addEvent(SjamayeeFacade.CHANGE, this.filter_changeHandler);
    this.filterCaseCheckBox.addEvent(SjamayeeFacade.CLICK, this.filterCaseCheckBox_clickHandler);
    this.filterButton.addEvent(SjamayeeFacade.CLICK, this.filterButton_clickHandler);
    this.filter.addEvent(SjamayeeFacade.KEYDOWN, this.filter_keydownHandler);
/*  if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {   
      this.rootUndoButton.addEvent(SjamayeeFacade.CLICK, this.rootUndoButton_clickHandler);
      this.rootSelectButton.addEvent(SjamayeeFacade.CLICK, this.rootSelectButton_clickHandler);
      this.rootRedoButton.addEvent(SjamayeeFacade.CLICK, this.rootRedoButton_clickHandler);
      this.columnsSelect.addEvent(SjamayeeFacade.CHANGE, this.columnsSelect_changeHandler);
    }*/
  },
  initializationComplete: function() {
    this.setEnabled(true);
  },
  setEnabled: function(isEnabled) {
    //this.objectsButton.disabled = !isEnabled
  },
  setEntitySelectPrefixed: function(entitySelectPrefixed) {
    if (entitySelectPrefixed !== undefined) {
      this.entitySelectPrefixed = (entitySelectPrefixed === true)?true:false;
    }
  },
  isEntitySelectPrefixed: function() {
    if (this.entitySelectPrefixed === undefined) {
      this.entitySelectPrefixed = false;
    }
    return this.entitySelectPrefixed;
  },
  setTypeSelectPrefixed: function(typeSelectPrefixed) {
    if (typeSelectPrefixed !== undefined) {
      this.typeSelectPrefixed = (typeSelectPrefixed === true)?true:false;
    }
  },
  isTypeSelectPrefixed: function() {
    if (this.typeSelectPrefixed === undefined) {
      this.typeSelectPrefixed = false;
    }
    return this.typeSelectPrefixed;
  },
  getTypeSelectValue: function() {
    var result = null;
    if (this.typeSelect) {
      result = this.typeSelect.value;
      if (this.isTypeSelectPrefixed()) {
        result = this.typeSelect.value.substr(RelationsHeader.TYPE_SELECT_PREFIX_LENGTH);
      }
    }
    return result;
  },  
  entitySelect_changeHandler: function()      { this.fireEvent(SjamayeeFacade.GRID_ENTITY_CHANGE); },
  typeSelect_changeHandler: function()        { this.fireEvent(SjamayeeFacade.GRID_TYPE_CHANGE); },
  filter_changeHandler: function()            { this.fireEvent(SjamayeeFacade.GRID_FILTER_CHANGE);  },
  filterCaseCheckBox_clickHandler: function() { this.fireEvent(SjamayeeFacade.GRID_FILTER_CASE_CLICK); },
  filterButton_clickHandler: function()       { this.fireEvent(SjamayeeFacade.GRID_FILTER_CLICK); },
  rootUndoButton_clickHandler: function()     { this.fireEvent(SjamayeeFacade.ROOT_UNDO); },
  rootSelectButton_clickHandler: function()   { this.fireEvent(SjamayeeFacade.ROOT_SELECT); },
  rootRedoButton_clickHandler: function()     { this.fireEvent(SjamayeeFacade.ROOT_REDO); },
  filter_keydownHandler: function(evt)        {
    switch (evt.key) {
      case SjamayeeFacade.ENTER:
      this.fireEvent(SjamayeeFacade.GRID_FILTER_KEYDOWN, evt);
      break;
    }
  },
  columnsSelect_changeHandler: function()     { this.fireEvent(SjamayeeFacade.GRID_COLUMNS_CHANGE); }
});
RelationsHeader.SPECIAL_HEADER_ID = "SpecialHeader";
RelationsHeader.ENTITY_SELECT_CLASS_ID = "relationsEntitySelect";
RelationsHeader.ENTITY_SELECT_ID = "EntitySelect";
RelationsHeader.ENTITY_SELECT_LABEL = "Object&nbsp;";
RelationsHeader.TYPE_SELECT_CLASS_ID = "relationsTypeSelect";
RelationsHeader.TYPE_SELECT_ID = "TypeSelect";
RelationsHeader.TYPE_SELECT_LABEL = "&nbsp;Class&nbsp;";
RelationsHeader.ENTITY_FILTER_ID = "EntityFilter";
RelationsHeader.ENTITY_FILTER_LABEL = "&nbsp;Filter(RE)&nbsp;";
RelationsHeader.ENTITY_FILTER_CASE_CHECKBOX_ID = "EntityFilterCase";
RelationsHeader.ENTITY_FILTER_CASE_CHECKBOX_LABEL = "&nbsp;Aa&nbsp;"; //"&nbsp;Case&nbsp;"; //"&nbsp;Case sensitive&nbsp;";
RelationsHeader.ENTITY_FILTER_HELP_ID = "EntityFilterHelp";
RelationsHeader.ENTITY_FILTER_HELP_TEXT = "?";
RelationsHeader.ENTITY_FILTER_BUTTON_ID = "EntityFilterButton";
RelationsHeader.ENTITY_FILTER_BUTTON_LABEL = "Filter!";
RelationsHeader.ROOT_UNDO_BUTTON_ID = "RootUndoButton";
RelationsHeader.ROOT_UNDO_BUTTON_LABEL = "Left";
RelationsHeader.ROOT_SELECT_BUTTON_ID = "RootSelectButton";
RelationsHeader.ROOT_SELECT_BUTTON_LABEL = "ROOT";
RelationsHeader.ROOT_REDO_BUTTON_ID = "RootRedoButton";
RelationsHeader.ROOT_REDO_BUTTON_LABEL = "Right";
RelationsHeader.COLUMNS_SELECT_ID = "ColumnsSelect";
RelationsHeader.COLUMNS_SELECT_LABEL = "Columns&nbsp;";
RelationsHeader.ENTITY_SELECT_PREFIX = "*&nbsp;"
RelationsHeader.ENTITY_SELECT_PREFIX_LENGTH = 2;
RelationsHeader.TYPE_SELECT_PREFIX = "*&nbsp;"
RelationsHeader.TYPE_SELECT_PREFIX_LENGTH = 2;

//Abstract
//Class: TextsHeader
var TextsHeader = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    this.parent(name,properties);
  }
});

//Abstract
//Class: ObjectsTextsHeader
var ObjectsTextsHeader = new Class({
  Extends: TextsHeader,
  initialize: function(name,properties) {
    this.objectName = null;
    this.typeName = null;
    var html = '<div id="'+name+ObjectsTextsHeader.SPECIAL_HEADER_ID+'">'+
               '<h4 id="'+name+ObjectsTextsHeader.HEADER_LABEL_ID+'">'+ObjectsTextsHeader.HEADER_LABEL+'</h4>&nbsp;'+
               '<font color="white">'+
               '<h4 id="'+name+ObjectsTextsHeader.OBJECT_NAME_ID+'"></h4>&nbsp;&nbsp;&nbsp;'+
               '<h4 id="'+name+ObjectsTextsHeader.TYPE_NAME_ID+'"></h4>'+
               '</font>'+
               '</div>';
    this.parent(name,{html:html});
  },

  initializeChildren: function() {
    //this.parent();
    var name = this.id;
    this.objectName = $(name+ObjectsTextsHeader.OBJECT_NAME_ID);
    this.typeName = $(name+ObjectsTextsHeader.TYPE_NAME_ID);
  }
});
ObjectsTextsHeader.HEADER_LABEL_ID = "objectTextHeader";
ObjectsTextsHeader.HEADER_LABEL = "TEXT ON OBJECT:";
ObjectsTextsHeader.OBJECT_NAME_ID = "objectName";
ObjectsTextsHeader.OBJECT_NAME_LABEL = "&nbsp;Object&nbsp;";
ObjectsTextsHeader.TYPE_NAME_ID = "typeName";
ObjectsTextsHeader.TYPE_NAME_LABEL = "&nbsp;Type&nbsp;";

//Abstract
//Class: RelationsTextsHeader
var RelationsTextsHeader = new Class({
  Extends: TextsHeader,
  initialize: function(name,properties) {
    this.relationText = null;
    var html = '<div id="'+name+RelationsTextsHeader.SPECIAL_HEADER_ID+'">'+
               '<h4 id="'+name+RelationsTextsHeader.HEADER_LABEL_ID+'">'+RelationsTextsHeader.HEADER_LABEL+'</h4>&nbsp;'+
               '<font color="white">'+
               '<h4 id="'+name+RelationsTextsHeader.RELATION_TEXT_ID+'"></h4>'+
               '</font>'+
               '</div>';
    this.parent(name,{html:html});
  },

  initializeChildren: function() {
    //this.parent();
    var name = this.id;
    this.relationText = $(name+RelationsTextsHeader.RELATION_TEXT_ID);
  }
});
RelationsTextsHeader.HEADER_LABEL_ID = "relationTextHeader";
RelationsTextsHeader.HEADER_LABEL = "TEXT ON RELATION:";
RelationsTextsHeader.RELATION_TEXT_ID = "relationText";
RelationsTextsHeader.RELATION_TEXT_LABEL = "&nbsp;Relation&nbsp;";

//Abstract
//Class: ListUIComponent
var ListUIComponent = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    this.parent(name,properties);   
    this.cells = [];
    this.list_clickHandler = this.list_clickHandler.bindWithEvent(this);  
    this.line_clickHandler = this.line_clickHandler.bindWithEvent(this);
    this.line_mouseOverHandler = this.line_mouseOverHandler.bindWithEvent(this);
    this.line_mouseOutHandler = this.line_mouseOutHandler.bindWithEvent(this);
    this.keypressHandler = this.keypressHandler.bindWithEvent(this);  
    this.keydownHandler = this.keydownHandler.bindWithEvent(this);  
    //Create keyboard.        
    this.keyboardEventTypes = new Array();    
    this.keyboardEventTypes['defaultEventType'] = SjamayeeFacade.KEYDOWN;
    this.keyboard = new Keyboard(this.keyboardEventTypes);
    this.keyboardEvents = new Array();
    //Add List events.
    this.keyboardEvents[SjamayeeFacade.ESCAPE] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.SPACE] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.ENTER] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.HOME] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.UP] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.DOWN] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.PREVIOUS] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.NEXT] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.END] = this.keydownHandler;
    this.keyboard.addEvents(this.keyboardEvents);
  },
  childrenInitialized: function() {
    //Add handlers on cells.
    var cells = this.getCells();
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      cell.addEvent(SjamayeeFacade.CLICK, this.line_clickHandler);  
      cell.addEvent(SjamayeeFacade.MOUSEOVER, this.line_mouseOverHandler);
      cell.addEvent(SjamayeeFacade.MOUSEOUT, this.line_mouseOutHandler);
    }
    this.addEvent(SjamayeeFacade.CLICK, this.list_clickHandler);
  },
  getCells: function() {
    return this.cells;
  },
  setCells: function(cells) {
    this.cells = cells;
  },
  clear: function() {
    var cells = this.getCells();
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerHTML = '';
    }
  },
  getValues: function() {
    return null; //this.cells;
  },
  setCell: function(id,value) {
  /*$(id).innerHTML = value;*/
    this.setElement(id,value);
  },
  list_clickHandler: function()    { this.fireEvent(SjamayeeFacade.LIST_CLICK); }, // alert("ListUIComponent/list_clickHandler"); },
  line_clickHandler: function(evt) {
/*
    var cellIds = '';
    var j = 0;
    var cells = this.getCells();
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      cellIds += cell.id;
      j++;
      if (j < 10) {
        cellIds += ",";
      } else {
        cellIds += "\n";
        j = 0;
      }
    }
    this.fireEvent(SjamayeeFacade.LINE_CLICK, evt);
*/    
    //var id = evt.target.id;
    //var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
    //alert("ListUIComponent/line_clickHandler - target/id: "+id+" line: "+line);
    this.fireEvent(SjamayeeFacade.LINE_CLICK,evt);
  },
  line_mouseOverHandler: function(evt) { this.fireEvent(SjamayeeFacade.LINE_MOUSEOVER, evt); },
  line_mouseOutHandler: function(evt)  { this.fireEvent(SjamayeeFacade.LINE_MOUSEOUT, evt); },
  keypressHandler: function()          {  this.fireEvent(SjamayeeFacade.LIST_KEYPRESS); },
  keydownHandler: function(evt) {
    var subEvent = null;
    switch (evt.key) {
      case SjamayeeFacade.ESCAPE:
      subEvent = SjamayeeFacade.ESCAPE;
      break;
      case SjamayeeFacade.SPACE:
      subEvent = SjamayeeFacade.SPACE;
      break;
      case SjamayeeFacade.ENTER:
      subEvent = SjamayeeFacade.ENTER;
      break;
      case SjamayeeFacade.UP:
      subEvent = SjamayeeFacade.UP;
      break;
      case SjamayeeFacade.DOWN:
      subEvent = SjamayeeFacade.DOWN;
      break;
      case SjamayeeFacade.PREVIOUS:
      subEvent = SjamayeeFacade.PREVIOUS;
      break;
      case SjamayeeFacade.NEXT:
      subEvent = SjamayeeFacade.NEXT;
      break;
      case SjamayeeFacade.HOME:
      subEvent = SjamayeeFacade.HOME;
      break;
      case SjamayeeFacade.END:
      subEvent = SjamayeeFacade.END;
      break;
    }
    this.fireEvent(SjamayeeFacade.LIST_KEYDOWN, [evt,subEvent]);
    return subEvent;
  }
});

//Abstract
//Class: AttributeListUIComponent
var AttributeListUIComponent = new Class({
  Extends: ListUIComponent,
  initialize: function(name,properties) {
    this.attribute01Name = null;
    this.attribute01Value = null;
    this.attribute02Name = null;
    this.attribute02Value = null;
    this.attribute03Name = null;
    this.attribute03Value = null;
    this.attribute04Name = null;
    this.attribute04Value = null;
    this.attribute05Name = null;
    this.attribute05Value = null;
    this.attribute06Name = null;
    this.attribute06Value = null;
    this.attribute07Name = null;
    this.attribute07Value = null;
    this.attribute08Name = null;
    this.attribute08Value = null;
    var headerValue = AttributeListUIComponent.PROPERTIES_HEADER_VALUE;
    if (properties) {
      if (properties['header_value']) {
        headerValue = properties['header_value'];
      }
    }
    var html = '<div id="'+name+AttributeListUIComponent.HEADER_ID+'" class="'+AttributeListUIComponent.HEADER_CLASS_ID+'">'+headerValue+'</div>'+
               '<div id="'+name+AttributeListUIComponent.NAMES_ID+'" class="'+AttributeListUIComponent.NAMES_CLASS_ID+'">'+
               ' <div id="'+name+AttributeListUIComponent.NAME_HEADER_ID+'" class="'+AttributeListUIComponent.NAME_HEADER_CLASS_ID+'">'+AttributeListUIComponent.NAME_HEADER_VALUE+'</div>'+
               ' <div id="'+this.getNameCellId(1,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(1,name)+'">1111111111</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(2,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(2,name)+'">22222</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(3,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(3,name)+'">333</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(4,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(4,name)+'">n4</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(5,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(5,name)+'">&nbsp;</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(6,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(6,name)+'">n6</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(7,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(7,name)+'">&nbsp;</a>'+
               ' </div>'+
               ' <div id="'+this.getNameCellId(8,name)+'" class="'+AttributeListUIComponent.NAME_CLASS_ID+'">'+
               '   <a id="'+this.getNameAnchorId(8,name)+'">n8</a>'+
               ' </div>'+
               '</div>'+
               '<div id="'+name+AttributeListUIComponent.VALUES_ID+'" class="'+AttributeListUIComponent.VALUES_CLASS_ID+'">'+
               ' <div id="'+name+AttributeListUIComponent.VALUE_HEADER_ID+'" class="'+AttributeListUIComponent.VALUE_HEADER_CLASS_ID+'">'+AttributeListUIComponent.VALUE_HEADER_VALUE+'</div>'+
               ' <div id="'+this.getValueCellId(1,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(1,name)+'">1111111111111</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(2,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(2,name)+'">&nbsp;</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(3,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(3,name)+'">&nbsp;</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(4,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(4,name)+'">&nbsp;</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(5,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(5,name)+'">55555</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(6,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(6,name)+'">666666</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(7,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(7,name)+'">&nbsp;</a>'+
               ' </div>'+
               ' <div id="'+this.getValueCellId(8,name)+'" class="'+AttributeListUIComponent.VALUE_CLASS_ID+'">'+
               '   <a id="'+this.getValueAnchorId(8,name)+'">88888888</a>'+
               ' </div>'+
               '</div>';
    this.parent(name,{html:html});
    this.name_clickHandler = this.name_clickHandler.bindWithEvent(this);
    this.value_clickHandler = this.value_clickHandler.bindWithEvent(this);
  },
  initializeChildren: function() {
    var name = this.id;
    this.attribute01Name = $(this.getNameCellId(1));
    this.attribute01Value = $(this.getValueCellId(1));
    this.attribute02Name = $(this.getNameCellId(2));
    this.attribute02Value = $(this.getValueCellId(2));
    this.attribute03Name = $(this.getNameCellId(3));
    this.attribute03Value = $(this.getValueCellId(3));
    this.attribute04Name = $(this.getNameCellId(4));
    this.attribute04Value = $(this.getValueCellId(4));
    this.attribute05Name = $(this.getNameCellId(5));
    this.attribute05Value = $(this.getValueCellId(5));
    this.attribute06Name = $(this.getNameCellId(6));
    this.attribute06Value = $(this.getValueCellId(6));
    this.attribute07Name = $(this.getNameCellId(7));
    this.attribute07Value = $(this.getValueCellId(7));
    this.attribute08Name = $(this.getNameCellId(8));
    this.attribute08Value = $(this.getValueCellId(8));
    var cells = [];
    cells.push(this.attribute01Name);
    cells.push(this.attribute01Value);
    cells.push(this.attribute02Name);
    cells.push(this.attribute02Value);
    cells.push(this.attribute03Name);
    cells.push(this.attribute03Value);
    cells.push(this.attribute04Name);
    cells.push(this.attribute04Value);
    cells.push(this.attribute05Name);
    cells.push(this.attribute05Value);
    cells.push(this.attribute06Name);
    cells.push(this.attribute06Value);
    cells.push(this.attribute07Name);
    cells.push(this.attribute07Value);
    cells.push(this.attribute08Name);
    cells.push(this.attribute08Value);
    this.setCells(cells);
  },
  childrenInitialized: function() {
    this.attribute01Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute01Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute02Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute02Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute03Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute03Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute04Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute04Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute05Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute05Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute06Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute06Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute07Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute07Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.attribute08Name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.attribute08Value.addEvent(SjamayeeFacade.CLICK, this.value_clickHandler);
    this.parent();
  /*var cells = this.getCells();
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      cell.addEvent(SjamayeeFacade.CLICK, this.line_clickHandler);  
    }
    this.addEvent(SjamayeeFacade.CLICK, this.list_clickHandler);*/
  },
  setHeader: function(id, value) {
    $(id).innerHTML = value;
  },
  name_clickHandler: function(evt)  {
    this.fireEvent(SjamayeeFacade.ATTRIBUTE_NAME_CLICK);
  },
  value_clickHandler: function(evt) {
    this.fireEvent(SjamayeeFacade.ATTRIBUTE_VALUE_CLICK);
  },
  getNameCellId: function(index,name) {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+AttributeListUIComponent.NAME_ID+'r'+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
  getNameAnchorId: function(index,name) {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+AttributeListUIComponent.NAME_ID+'a'+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
  getValueCellId: function(index,name) {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+AttributeListUIComponent.VALUE_ID+'r'+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
  getValueAnchorId: function(index,name) {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+AttributeListUIComponent.VALUE_ID+'a'+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  }
});
AttributeListUIComponent.PAGE_SIZE = 8;
AttributeListUIComponent.OBJECTS = "OBJECTS";
AttributeListUIComponent.PROPERTIES_HEADER_VALUE = "Properties";

AttributeListUIComponent.ATTRIBUTE = "attribute";
AttributeListUIComponent.LIST = AttributeListUIComponent.ATTRIBUTE+"List";

AttributeListUIComponent.HEADER_ID = "Header";
AttributeListUIComponent.HEADER_CLASS_ID = "propertiesHeader";
AttributeListUIComponent.NAME_HEADER_VALUE = "Name";
AttributeListUIComponent.NAMES_ID = AttributeListUIComponent.NAME_HEADER_VALUE+"s";
AttributeListUIComponent.NAMES_CLASS_ID = AttributeListUIComponent.LIST+AttributeListUIComponent.NAMES_ID;
AttributeListUIComponent.NAME_HEADER_ID = AttributeListUIComponent.NAME_HEADER_VALUE+AttributeListUIComponent.HEADER_ID;
AttributeListUIComponent.NAME_HEADER_CLASS_ID = AttributeListUIComponent.ATTRIBUTE+AttributeListUIComponent.NAME_HEADER_ID;
AttributeListUIComponent.NAME_ID = AttributeListUIComponent.LIST+AttributeListUIComponent.NAME_HEADER_VALUE; //+"0";
AttributeListUIComponent.NAME_CLASS_ID = AttributeListUIComponent.ATTRIBUTE+AttributeListUIComponent.NAME_HEADER_VALUE;
AttributeListUIComponent.VALUE_HEADER_VALUE = "Value";
AttributeListUIComponent.VALUES_ID = AttributeListUIComponent.VALUE_HEADER_VALUE+"s";
AttributeListUIComponent.VALUES_CLASS_ID = AttributeListUIComponent.LIST+AttributeListUIComponent.VALUES_ID;
AttributeListUIComponent.VALUE_HEADER_ID = AttributeListUIComponent.VALUE_HEADER_VALUE+AttributeListUIComponent.HEADER_ID;
AttributeListUIComponent.VALUE_HEADER_CLASS_ID = AttributeListUIComponent.ATTRIBUTE+AttributeListUIComponent.VALUE_HEADER_ID;
AttributeListUIComponent.VALUE_ID = AttributeListUIComponent.LIST+AttributeListUIComponent.VALUE_HEADER_VALUE; //+"0";
AttributeListUIComponent.VALUE_CLASS_ID = AttributeListUIComponent.ATTRIBUTE+AttributeListUIComponent.VALUE_HEADER_VALUE;

//Abstract
//Class: TextsEditorUIComponent
var TextsEditorUIComponent = new Class({
  Extends: SjamayeeUIComponent,
  //this.relationTextButton = null;
  //this.parentTextButton = null;
  //this.childTextButton = null;

  initialize: function(name,properties) {
    this.parent(name,properties);
  }
/*
  initialize: function(name,properties) {
    var textEditorId = name+TextsEditorUIComponent.COMPONENT_ID;
    var html = '<div id="'+name+'" style="width:100%;height:100%;">'+
               '<div id="'+name+TextsEditorUIComponent.LEFT_PANE_ID+'" style="position:relative;float:left;width:35%;height:100%;background-color:#FF887A;text-align:center;">'+
               '<br/><br/><h2>MODEL TEXT EDITOR</h2><br/><br/>';
    if (name == ModelRelationsTextsEditor.ID) {
      html += '<button id="'+name+TextsEditorUIComponent.RELATION_TEXT_BUTTON_ID+'" class="'+TextsEditorUIComponent.BUTTON_CLASS_ID+'">'+TextsEditorUIComponent.RELATION_TEXT_BUTTON_VALUE+'</button>'+
              '<br/><br/>'+
              '<button id="'+name+TextsEditorUIComponent.PARENT_TEXT_BUTTON_ID+'" class="'+TextsEditorUIComponent.BUTTON_CLASS_ID+'">'+TextsEditorUIComponent.PARENT_TEXT_BUTTON_VALUE+'</button>'+
              '<br/><br/>'+
              '<button id="'+name+TextsEditorUIComponent.CHILD_TEXT_BUTTON_ID+'" class="'+TextsEditorUIComponent.BUTTON_CLASS_ID+'">'+TextsEditorUIComponent.CHILD_TEXT_BUTTON_VALUE+'</button>';
    }
    html += '</div>'+
            '<div id="'+name+TextsEditorUIComponent.RIGHT_PANE_ID+'" style="position:relative;float:left;width:65%;height:100%;'+
            //'background-image:url(\'https://na6.salesforce.com/resource/1285777333000/sja__text_bg_ruler_gif\');background-position:left top;background-repeat:no-repeat;">'+
            'background-image:url(\'https://na6.salesforce.com/resource/1285777333000/sja__text_bg_ruler91_gif\');background-position:left top;background-repeat:no-repeat;">'+
            '<textarea id="'+textEditorId+'" name="body">'+ //class="'+TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_NORMAL_ID+'">'+
            'X             : Line marker (-,#,/,SPACE)\n'+
            'LL            : Label\n'+
            'Y             : Code\n'+
            'Z             : Code\n'+
            'SSSSSSSS      : Statement\n'+
            'PPP           : Paragraph\n'+
            'TR            : TRUE-label\n'+
            'FA            : FALSE-label\n'+
            'CCCCCCCCCCCCCC: Line condition\n'+
            '-Comment\n'+
            ' 01-01: Comment marker (-)\n'+
            ' 02-80:Text\n'+
            '#Logic\n'+
            ' 01-01: Logic marker (#)\n'+
            ' 02-39: Description\n'+
            ' 41-42: Label (xx)\n'+
            ' 44-44: Code ???\n'+
            ' 46-46: Code (n:0-9)\n'+
            ' 48-55: Statement\n'+
            '        48-50: Operand1/Variable (a00-z99)\n'+
            '        51-51: Operator (*,=,#,+)\n'+
            '        52-55: Operand2/Variable/Constant\n'+
            ' 57-59: Paragraph\n'+
            ' 61-62: TRUE-label\n'+
            ' 64-65: FALSE-label\n'+
            '/Paragraph name\n'+
            ' 01-01: Paragraph marker (/)\n'+
            ' 02-04: Paragraph (000-999)\n'+
            ' Paragraph text (evt. with Line_condition/Statement)                #xxx..........\n'+
            ' 01-01: Paragraph marker (SPACE-character)\n'+
            ' 02-66: Text with variable substitution.\n'+
            ' Line condition:\n'+
            ' 67-67: Condition marker (#)\n'+
            ' 68-70: Operand1/Variable (a00-z99)\n'+
            ' 71-71: Operator (*,=,#,+)\n'+
            ' 72-80: Operand2/Variable/Constant\n'+
            '&nbsp;\n'+
            'Example:\n'+
            '--------------------------------------------------------------------\n'+
            '#                                        |  | | |a81*TAB |   |  |  |\n'+
            '#                                        |  | | |a82*-   |   |  |  |\n'+
            '--------------------------------------------------------------------\n'+
            '# Entity number                          |  | | |y75*0   |   |  |  |\n'+
            '#                                        |  | | |y76*0   |   |  |  |\n'+
            '#                                        |  | | |d01*1   |   |  |  |\n'+
            '#                                        |  | | |y04*0   |005|  |  |\n'+
            '# Loop 1                                 |ta| |1|a02=dele|   |ex|  |\n'+
            '# Generation WHERE-clause                |  | | |a02=rest|   |  |tb|\n'+
            '#                                        |  | |8|x01+rest|   |  |  |\n'+
            '#                                        |  | | |d01*2   |   |ta|ta|\n'+
            '#                                        |tb| | |a02=tab |001|  |ta|\n'+
            '#                                        |  | | |d01*2   |   |ta|ta|\n'+
            '--------------------------------------------------------------------\n'+
            '# Exit                                   |ex| | |        |006|00|00|\n'+
            '--------------------------------------------------------------------\n'+
            '/001\n'+
            '               DELETE FROM £b02 £a51                                #b04=\n'+
            '               DELETE FROM £b04.£b02 £a51                           #b04#\n'+
            '/005\n'+
            '           EXEC SQL\n'+
            '/006\n'+
            '           END-EXEC.\n'+
            '--------------------------------------------------------------------\n'+
            'Example 2: ----------------------------------------------------START\n'+
            '-\n'+
            '#                                                a81*TAB\n'+
            '#                                                a82*-\n'+
            '-\n'+
            '# Entity number                                  y75*0\n'+
            '#                                                y76*0\n'+
            '#                                                d01*1\n'+
            '#                                                y04*0    005\n'+
            '# Loop 1                                  ta   1 a02=dele     ex\n'+
            '# Generation WHERE-clause                        a02=rest        tb\n'+
            '#                                              8 x01+rest\n'+
            '#                                                d01*2        ta ta\n'+
            '#                                         tb     a02=tab  001    ta\n'+
            '#                                                d01*2        ta ta\n'+
            '-\n'+
            '# Exit                                    ex              006 00 00\n'+
            '-\n'+
            '/001\n'+
            '               DELETE FROM £b02 £a51                                #b04=\n'+
            '               DELETE FROM £b04.£b02 £a51                           #b04#\n'+
            '/005\n'+
            '           EXEC SQL\n'+
            '/006\n'+
            '           END-EXEC.\n'+
            'Example 2: ------------------------------------------------------END\n'+
            '</textarea>'+
            '</div>'+
            '</div>';               
    this.parent(name,{html:html});
    this.keyup_Handler = this.keyup_Handler.bindWithEvent(this);
    this.addEvent(SjamayeeFacade.KEYUP, this.keyup_Handler);
    if (name == ModelRelationsTextsEditor.ID) {   
      this.relationTextButton_clickHandler = this.relationTextButton_clickHandler.bindWithEvent(this);
      this.parentTextButton_clickHandler = this.parentTextButton_clickHandler.bindWithEvent(this);
      this.childTextButton_clickHandler = this.childTextButton_clickHandler.bindWithEvent(this);
    }
  }

  initializeChildren: function() {
    this.parent();
    var name = this.id;
    if (name == ModelRelationsTextsEditor.ID) {
      this.relationTextButton = $(name+TextsEditorUIComponent.RELATION_TEXT_BUTTON_ID);
      this.parentTextButton = $(name+TextsEditorUIComponent.PARENT_TEXT_BUTTON_ID);
      this.childTextButton = $(name+TextsEditorUIComponent.CHILD_TEXT_BUTTON_ID);
    }
  },
  
  childrenInitialized: function() {
    this.parent();
    var name = this.id;
    if (name == ModelRelationsTextsEditor.ID) {
      this.relationTextButton.addEvent(SjamayeeFacade.CLICK, this.relationTextButton_clickHandler);
      this.parentTextButton.addEvent(SjamayeeFacade.CLICK, this.parentTextButton_clickHandler);
      this.childTextButton.addEvent(SjamayeeFacade.CLICK, this.childTextButton_clickHandler);
    }
  }

  keyup_Handler: function() {
    this.fireEvent(SjamayeeFacade.TEXT_KEYUP);
  },
  
  relationTextButton_clickHandler: function() {
    //alert("TextsEditorUIComponent/relationTextButton_clickHandler - TEXT_RELATION_EDIT");
    this.fireEvent(SjamayeeFacade.TEXT_RELATION_EDIT);
  }

  parentTextButton_clickHandler: function() {
    this.fireEvent(SjamayeeFacade.TEXT_PARENT_EDIT);
  }

  childTextButton_clickHandler: function()  {
    this.fireEvent(SjamayeeFacade.TEXT_CHILD_EDIT);
  }
*/
});
TextsEditorUIComponent.CLASS_ID = "TextsEditorUIComponent";
TextsEditorUIComponent.CLASS_NORMAL_ID = "TextsEditorUIC_Normal";
TextsEditorUIComponent.CLASS_MAXIMUM_ID = "TextsEditorUIC_Maximum";
TextsEditorUIComponent.COMPONENT_ID = "textsEditorUICBody";
//TextsEditorUIComponent.LEFT_PANE_ID = "textsEditorUICLeft";
//TextsEditorUIComponent.RIGHT_PANE_ID = "textsEditorUICRight";
//TextsEditorUIComponent.BUTTON_CLASS_ID = "textsEditorUICButton";
//TextsEditorUIComponent.RELATION_TEXT_BUTTON_ID = "relationTextButton";
//TextsEditorUIComponent.RELATION_TEXT_BUTTON_VALUE = "Relation";
//TextsEditorUIComponent.PARENT_TEXT_BUTTON_ID = "parentTextButton";
//TextsEditorUIComponent.PARENT_TEXT_BUTTON_VALUE = "Parent";
//TextsEditorUIComponent.CHILD_TEXT_BUTTON_ID = "childTextButton";
//TextsEditorUIComponent.CHILD_TEXT_BUTTON_VALUE = "Child";

//Abstract
//Class: TextsEditor
var TextsEditor = new Class({
  Extends: TextsEditorUIComponent,
  initialize: function(name,properties) {
    this.parent(name,properties);
    this.keyup_Handler = this.keyup_Handler.bindWithEvent(this);
    this.addEvent(SjamayeeFacade.KEYUP, this.keyup_Handler);
  },
  keyup_Handler: function() { this.fireEvent(SjamayeeFacade.TEXT_KEYUP); }
});
TextsEditor.NORMAL_SIZE = "81%;";
TextsEditor.MAXIMUM_SIZE = "90.5%;";
TextsEditor.BUTTON_CLASS_ID = "textsEditorUICButton";
/*
//Class: ModelObjectsTextsEditor
var ModelObjectsTextsEditor = new Class({
  Extends: TextsEditor,

  initialize: function() {
    this.parent(ModelObjectsTextsEditor.ID);
  }
});
ModelObjectsTextsEditor.ID = "modelObjectsTextsEditor";

//Class: ModelRelationsTextsEditor
var ModelRelationsTextsEditor = new Class({
  Extends: TextsEditor,

  initialize: function() {
    this.parent(ModelRelationsTextsEditor.ID);
  }
});
ModelRelationsTextsEditor.ID = "modelRelationsTextsEditor";
*/

/*
this.modelObjectsTextsEditor = new ModelObjectsTextsEditorRight();
this.addChild(this.modelObjectsTextsEditor);
this.modelRelationsTextsEditor = new ModelRelationsTextsEditorRight();
this.addChild(this.modelRelationsTextsEditor);
*/
//Class: ModelObjectsTextsEditorLeft
var ModelObjectsTextsEditorLeft = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    var html = this.buildHtml();
    this.parent(ModelObjectsTextsEditorLeft.ID, {html: html});
  },
  buildHtml: function() {
    //var result = '<div style="position:relative;float:left;width:100%;height:100%;background-color:#FF887A;text-align:center;">'+
    //var result = '<div style="position:relative;float:left;width:100%;height:100%;background:inherit">'+
    //           '<br/><br/><h2>'+ModelObjectsTextsEditorLeft.LABEL+'</h2><br/><br/>'+
    //           '</div>';
    var result = '<br/><br/><h2>'+ModelObjectsTextsEditorLeft.LABEL+'</h2><br/><br/>';
    return result;    
  }
});
ModelObjectsTextsEditorLeft.ID = "modelObjectsTextsEditorLeft";
ModelObjectsTextsEditorLeft.LABEL = "TEXT EDITOR";

//Class: ModelRelationsTextsEditorLeft
var ModelRelationsTextsEditorLeft = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    var html = this.buildHtml();
    this.parent(ModelRelationsTextsEditorLeft.ID, {html: html});
    this.relationTextButton = null;
    this.parentTextButton = null;
    this.childTextButton = null;    
    this.relationTextButton_clickHandler = this.relationTextButton_clickHandler.bindWithEvent(this);
    this.parentTextButton_clickHandler = this.parentTextButton_clickHandler.bindWithEvent(this);
    this.childTextButton_clickHandler = this.childTextButton_clickHandler.bindWithEvent(this);
  },
  buildHtml: function() {
    var name = ModelRelationsTextsEditorLeft.ID;
    //var result = '<div style="position:relative;float:left;width:100%;height:100%;background-color:#FF887A;text-align:center;">'+
    var result = '<br/><br/><h2>'+ModelRelationsTextsEditorLeft.LABEL+'</h2><br/><br/>'+
                 '<button id="'+name+ModelRelationsTextsEditorLeft.RELATION_TEXT_BUTTON_ID+'" class="'+TextsEditor.BUTTON_CLASS_ID+'">'+ModelRelationsTextsEditorLeft.RELATION_TEXT_BUTTON_VALUE+'</button>'+
                 '<br/><br/>'+
                 '<button id="'+name+ModelRelationsTextsEditorLeft.PARENT_TEXT_BUTTON_ID+'" class="'+TextsEditor.BUTTON_CLASS_ID+'">'+ModelRelationsTextsEditorLeft.PARENT_TEXT_BUTTON_VALUE+'</button>'+
                 '<br/><br/>'+
                 '<button id="'+name+ModelRelationsTextsEditorLeft.CHILD_TEXT_BUTTON_ID+'" class="'+TextsEditor.BUTTON_CLASS_ID+'">'+ModelRelationsTextsEditorLeft.CHILD_TEXT_BUTTON_VALUE+'</button>';
    //             '</div>';
    return result;    
  },
  initializeChildren: function() {
    //this.parent();
    var name = this.id;
    this.relationTextButton = $(name+ModelRelationsTextsEditorLeft.RELATION_TEXT_BUTTON_ID);
    this.parentTextButton = $(name+ModelRelationsTextsEditorLeft.PARENT_TEXT_BUTTON_ID);
    this.childTextButton = $(name+ModelRelationsTextsEditorLeft.CHILD_TEXT_BUTTON_ID);
  },
  childrenInitialized: function() {
    //this.parent();
    this.relationTextButton.addEvent(SjamayeeFacade.CLICK, this.relationTextButton_clickHandler);
    this.parentTextButton.addEvent(SjamayeeFacade.CLICK, this.parentTextButton_clickHandler);
    this.childTextButton.addEvent(SjamayeeFacade.CLICK, this.childTextButton_clickHandler);
  },
  relationTextButton_clickHandler: function() { this.fireEvent(SjamayeeFacade.TEXT_RELATION_EDIT); },
  parentTextButton_clickHandler: function()   { this.fireEvent(SjamayeeFacade.TEXT_PARENT_EDIT); },
  childTextButton_clickHandler: function()    { this.fireEvent(SjamayeeFacade.TEXT_CHILD_EDIT); }
});
ModelRelationsTextsEditorLeft.ID = "modelRelationsTextsEditorLeft";
ModelRelationsTextsEditorLeft.LABEL = "TEXT EDITOR";
ModelRelationsTextsEditorLeft.RELATION_TEXT_BUTTON_ID = "relationTextButton";
ModelRelationsTextsEditorLeft.RELATION_TEXT_BUTTON_VALUE = "Relation";
ModelRelationsTextsEditorLeft.PARENT_TEXT_BUTTON_ID = "parentTextButton";
ModelRelationsTextsEditorLeft.PARENT_TEXT_BUTTON_VALUE = "Parent";
ModelRelationsTextsEditorLeft.CHILD_TEXT_BUTTON_ID = "childTextButton";
ModelRelationsTextsEditorLeft.CHILD_TEXT_BUTTON_VALUE = "Child";

//Class: ModelObjectsTextsEditorRight
var ModelObjectsTextsEditorRight = new Class({
  Extends: TextsEditor,
  initialize: function(name,properties) {
    var html = this.buildHtml();
    this.parent(ModelObjectsTextsEditorRight.ID, {html: html});   
    this.textarea = null;
  },  
  buildHtml: function() {
    var textEditorId = ModelObjectsTextsEditorRight.ID+TextsEditorUIComponent.COMPONENT_ID;
    //var result = '<div id="'+ModelObjectsTextsEditorRight.ID+'" style="position:relative;float:left;width:65%;height:100%;'+
    //         //'background-image:url(\'https://na6.salesforce.com/resource/1285777333000/sja__text_bg_ruler_gif\');background-position:left top;background-repeat:no-repeat;">'+
    //           'background-image:url(\'https://na6.salesforce.com/resource/1285777333000/sja__text_bg_ruler91_gif\');background-position:left top;background-repeat:no-repeat;">'+
    var result = '<textarea id="'+textEditorId+'" name="'+textEditorId+'"body" class="'+TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_NORMAL_ID+'">'+
                 'X             : Line marker (-,#,/,SPACE)\n'+
                 'LL            : Label\n'+
                 'Y             : Code\n'+
                 'Z             : Code\n'+
                 'SSSSSSSS      : Statement\n'+
                 'PPP           : Paragraph\n'+
                 'TR            : TRUE-label\n'+
                 'FA            : FALSE-label\n'+
                 'CCCCCCCCCCCCCC: Line condition\n'+
                 '-Comment\n'+
                 ' 01-01: Comment marker (-)\n'+
                 ' 02-80:Text\n'+
                 '#Logic\n'+
                 ' 01-01: Logic marker (#)\n'+
                 ' 02-39: Description\n'+
                 ' 41-42: Label (xx)\n'+
                 ' 44-44: Code ???\n'+
                 ' 46-46: Code (n:0-9)\n'+
                 ' 48-55: Statement\n'+
                 '        48-50: Operand1/Variable (a00-z99)\n'+
                 '        51-51: Operator (*,=,#,+)\n'+
                 '        52-55: Operand2/Variable/Constant\n'+
                 ' 57-59: Paragraph\n'+
                 ' 61-62: TRUE-label\n'+
                 ' 64-65: FALSE-label\n'+
                 '/Paragraph name\n'+
                 ' 01-01: Paragraph marker (/)\n'+
                 ' 02-04: Paragraph (000-999)\n'+
                 ' Paragraph text (evt. with Line_condition/Statement)                #xxx..........\n'+
                 ' 01-01: Paragraph marker (SPACE-character)\n'+
                 ' 02-66: Text with variable substitution.\n'+
                 ' Line condition:\n'+
                 ' 67-67: Condition marker (#)\n'+
                 ' 68-70: Operand1/Variable (a00-z99)\n'+
                 ' 71-71: Operator (*,=,#,+)\n'+
                 ' 72-80: Operand2/Variable/Constant\n'+
                 '&nbsp;\n'+
                 'Example:\n'+
                 '--------------------------------------------------------------------\n'+
                 '#                                        |  | | |a81*TAB |   |  |  |\n'+
                 '#                                        |  | | |a82*-   |   |  |  |\n'+
                 '--------------------------------------------------------------------\n'+
                 '# Entity number                          |  | | |y75*0   |   |  |  |\n'+
                 '#                                        |  | | |y76*0   |   |  |  |\n'+
                 '#                                        |  | | |d01*1   |   |  |  |\n'+
                 '#                                        |  | | |y04*0   |005|  |  |\n'+
                 '# Loop 1                                 |ta| |1|a02=dele|   |ex|  |\n'+
                 '# Generation WHERE-clause                |  | | |a02=rest|   |  |tb|\n'+
                 '#                                        |  | |8|x01+rest|   |  |  |\n'+
                 '#                                        |  | | |d01*2   |   |ta|ta|\n'+
                 '#                                        |tb| | |a02=tab |001|  |ta|\n'+
                 '#                                        |  | | |d01*2   |   |ta|ta|\n'+
                 '--------------------------------------------------------------------\n'+
                 '# Exit                                   |ex| | |        |006|00|00|\n'+
                 '--------------------------------------------------------------------\n'+
                 '/001\n'+
                 '               DELETE FROM £b02 £a51                                #b04=\n'+
                 '               DELETE FROM £b04.£b02 £a51                           #b04#\n'+
                 '/005\n'+
                 '           EXEC SQL\n'+
                 '/006\n'+
                 '           END-EXEC.\n'+
                 '--------------------------------------------------------------------\n'+
                 'Example 2: ----------------------------------------------------START\n'+
                 '-\n'+
                 '#                                                a81*TAB\n'+
                 '#                                                a82*-\n'+
                 '-\n'+
                 '# Entity number                                  y75*0\n'+
                 '#                                                y76*0\n'+
                 '#                                                d01*1\n'+
                 '#                                                y04*0    005\n'+
                 '# Loop 1                                  ta   1 a02=dele     ex\n'+
                 '# Generation WHERE-clause                        a02=rest        tb\n'+
                 '#                                              8 x01+rest\n'+
                 '#                                                d01*2        ta ta\n'+
                 '#                                         tb     a02=tab  001    ta\n'+
                 '#                                                d01*2        ta ta\n'+
                 '-\n'+
                 '# Exit                                    ex              006 00 00\n'+
                 '-\n'+
                 '/001\n'+
                 '               DELETE FROM £b02 £a51                                #b04=\n'+
                 '               DELETE FROM £b04.£b02 £a51                           #b04#\n'+
                 '/005\n'+
                 '           EXEC SQL\n'+
                 '/006\n'+
                 '           END-EXEC.\n'+
                 'Example 2: ------------------------------------------------------END\n'+
                 '</textarea>';
    //           '</div>';               
    return result;    
  },
  initializeChildren: function() {
    //this.parent();
    //var name = this.id;
    var textEditorId = ModelObjectsTextsEditorRight.ID+TextsEditorUIComponent.COMPONENT_ID;
    this.textarea = $(textEditorId);
  }
});
ModelObjectsTextsEditorRight.ID = "modelObjectsTextsEditorRight";

//Class: ModelRelationsTextsEditorRight
var ModelRelationsTextsEditorRight = new Class({
  Extends: TextsEditor,
  initialize: function(name,properties) {
    var html = this.buildHtml();
    this.parent(ModelRelationsTextsEditorRight.ID, {html: html});   
    this.textarea = null;
  },  
  buildHtml: function() {
    var textEditorId = ModelRelationsTextsEditorRight.ID+TextsEditorUIComponent.COMPONENT_ID;
    //var result = '<div id="'+ModelRelationsTextsEditorRight.ID+'" style="position:relative;float:left;width:65%;height:100%;'+
    //         //'background-image:url(\'https://na6.salesforce.com/resource/1285777333000/sja__text_bg_ruler_gif\');background-position:left top;background-repeat:no-repeat;">'+
    //           'background-image:url(\'https://na6.salesforce.com/resource/1285777333000/sja__text_bg_ruler91_gif\');background-position:left top;background-repeat:no-repeat;">'+
    var result = '<textarea id="'+textEditorId+'" name="'+textEditorId+'"body" class="'+TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_NORMAL_ID+'">'+
                 'Example: ----------------------------------------- RELATIONS - START\n'+
                 '-\n'+
                 '#                                                a81*TAB\n'+
                 '#                                                a82*-\n'+
                 '-\n'+
                 '# Entity number                                  y75*0\n'+
                 '#                                                y76*0\n'+
                 '#                                                d01*1\n'+
                 '#                                                y04*0    005\n'+
                 '# Loop 1                                  ta   1 a02=dele     ex\n'+
                 '# Generation WHERE-clause                        a02=rest        tb\n'+
                 '#                                              8 x01+rest\n'+
                 '#                                                d01*2        ta ta\n'+
                 '#                                         tb     a02=tab  001    ta\n'+
                 '#                                                d01*2        ta ta\n'+
                 '-\n'+
                 '# Exit                                    ex              006 00 00\n'+
                 '-\n'+
                 '/001\n'+
                 '               DELETE FROM £b02 £a51                                #b04=\n'+
                 '               DELETE FROM £b04.£b02 £a51                           #b04#\n'+
                 '/005\n'+
                 '           EXEC SQL\n'+
                 '/006\n'+
                 '           END-EXEC.\n'+
                 'Example: ------------------------------------------------------- END\n'+
                 '</textarea>';
    //           '</div>';               
    return result;    
  },
  initializeChildren: function() {
    //this.parent();
    //var name = this.id;
    var textEditorId = ModelRelationsTextsEditorRight.ID+TextsEditorUIComponent.COMPONENT_ID;
    this.textarea = $(textEditorId);
  }
});
ModelRelationsTextsEditorRight.ID = "modelRelationsTextsEditorRight";

//Class: GridList
var GridList = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    this.parent(GridList.ID);
    this.gridListSplitter = null;
  },
  initializeChildren: function() {
    this.gridListSplitter = new GridListSplitter();
    this.addChild(this.gridListSplitter);
  }
});
GridList.ID = "listPaneBorder";
GridList.NORMAL_SIZE = 220;
GridList.MAXIMUM_SIZE = 437;
//GridList.RELATIONS_GRID = "RelationsGrid";
//GridList.OBJECTS_LIST = "ObjectsList";

//Class: GridListSplitter
var GridListSplitter = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    this.parent(GridListSplitter.ID);
    this.left = null;
    this.right = null;
  },
  initializeChildren: function() {
    this.left = new GridListLeft();
    this.addChild(this.left);
    this.right = new GridListRight();   
    this.addChild(this.right);
  }
});
GridListSplitter.ID = "listSplitter";

//Class: GridListLeft
var GridListLeft = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    var html = '<div id="'+DataObjectsListLeft.ID+'" class="'+GridListLeft.CLASS_ID+'"></div>'+
               '<div id="'+DataRelationsGridLeft.ID+'" class="'+GridListLeft.CLASS_ID+'"></div>'+
               '<div id="'+ModelObjectsListLeft.ID+'" class="'+GridListLeft.CLASS_ID+'"></div>'+
               '<div id="'+ModelObjectsTextsEditorLeft.ID+'" class="'+GridListLeft.CLASS_ID+'"></div>'+
               '<div id="'+ModelRelationsGridLeft.ID+'" class="'+GridListLeft.CLASS_ID+'"></div>'+
               '<div id="'+ModelRelationsTextsEditorLeft.ID+'" class="'+GridListLeft.CLASS_ID+'"></div>';
    this.parent(GridListLeft.ID, {html: html});
    this.dataObjectsList = null;
    this.dataRelationsGrid = null;
    this.modelObjectsList = null;
    this.modelObjectsTextsEditor = null;
    this.modelRelationsGrid = null;
    this.modelRelationsTextsEditor = null;
  },
  initializeChildren: function() {
    this.dataObjectsList = new DataObjectsListLeft();
    this.addChild(this.dataObjectsList);
    this.dataRelationsGrid = new DataRelationsGridLeft();
    this.addChild(this.dataRelationsGrid);
    this.modelObjectsList = new ModelObjectsListLeft();
    this.addChild(this.modelObjectsList);
    this.modelObjectsTextsEditor = new ModelObjectsTextsEditorLeft();
    this.addChild(this.modelObjectsTextsEditor);
    this.modelRelationsGrid = new ModelRelationsGridLeft();
    this.addChild(this.modelRelationsGrid);
    this.modelRelationsTextsEditor = new ModelRelationsTextsEditorLeft();
    this.addChild(this.modelRelationsTextsEditor);
  }
});
GridListLeft.ID = "listPaneLeft";
GridListLeft.CLASS_ID = "listLeft";

//Class: GridListRight
var GridListRight = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    var html = '<div id="'+DataObjectsListRight.ID+'" class="'+GridListRight.CLASS_ID+'"></div>'+
               '<div id="'+DataRelationsGridRight.ID+'" class="'+GridListRight.CLASS_ID+'"></div>'+
               '<div id="'+ModelObjectsListRight.ID+'" class="'+GridListRight.CLASS_ID+'"></div>'+
               '<div id="'+ModelObjectsTextsEditorRight.ID+'" class="'+GridListRight.CLASS_ID+'"></div>'+
               '<div id="'+ModelRelationsGridRight.ID+'" class="'+GridListRight.CLASS_ID+'"></div>'+
               '<div id="'+ModelRelationsTextsEditorRight.ID+'" class="'+GridListRight.CLASS_ID+'"></div>';
    this.parent(GridListRight.ID, {html: html});
    this.dataObjectsList = null;
    this.dataRelationsGrid = null;
    this.modelObjectsList = null;
    this.modelObjectsTextsEditor = null;
    this.modelRelationsGrid = null;
    this.modelRelationsTextsEditor = null;
  },

  initializeChildren: function() {
    this.dataObjectsList = new DataObjectsListRight();
    this.addChild(this.dataObjectsList);
    this.dataRelationsGrid = new DataRelationsGridRight();
    this.addChild(this.dataRelationsGrid);
    this.modelObjectsList = new ModelObjectsListRight();
    this.addChild(this.modelObjectsList);
    this.modelObjectsTextsEditor = new ModelObjectsTextsEditorRight();
    this.addChild(this.modelObjectsTextsEditor);
    this.modelRelationsGrid = new ModelRelationsGridRight();
    this.addChild(this.modelRelationsGrid);
    this.modelRelationsTextsEditor = new ModelRelationsTextsEditorRight();
    this.addChild(this.modelRelationsTextsEditor);
  }
});
GridListRight.ID = "listPaneRight";
GridListRight.CLASS_ID = "listRight";

//Abstract
//Class: ObjectsListLeft
var ObjectsListLeft = new Class({
  Extends: ListUIComponent,
  initialize: function(name,properties) {
    var html = this.buildHtml(name);
    this.parent(name,{html:html});
    //Extend keyboard.
    //this.keyboardEvents[SjamayeeFacade.DOWN] = this.keydownHandler;
    //this.keyboard.removeEvents();
    //this.keyboard.addEvents(this.keyboardEvents);
  },
  initializeChildren: function() {
    this.parent();
    //List cells
    var i = 0;
    var cells = [];
    for (i = 0; i < ObjectsListMediator.PAGE_SIZE_MAX; i++) {
      var refCell = $(this.getRefCellId(i));
      if (refCell) {
        cells.push(refCell);
      }
      var nameCell = $(this.getNameCellId(i));
      if (nameCell) {
        cells.push(nameCell);
      }
      var typeCell = $(this.getTypeCellId(i));
      if (typeCell) {
        cells.push(typeCell);
      }
    }
    this.setCells(cells);
  },    
  getRefCellId: function(index,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+ObjectsListLeft.REF_COLUMN_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
    return result;
  },
  getRefAnchorId: function(index,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+ObjectsListLeft.REF_ANCHOR_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
    return result;
  },
  getNameCellId: function(index,name) {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+ObjectsListLeft.NAME_COLUMN_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
  getNameAnchorId: function(index,name) {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+ObjectsListLeft.NAME_ANCHOR_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
  getTypeCellId: function(index,name) {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+ObjectsListLeft.TYPE_COLUMN_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
  getTypeAnchorId: function(index,name) {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+ObjectsListLeft.TYPE_ANCHOR_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
/*
  childrenInitialized: function() {
    //on ALL CELL's !!!
    this.xxx.addEvent(SjamayeeFacade.MOUSEOVER, this.lineMouseOver_Handler);
  },
*/
  buildHtml: function(name) {
    var result = '';
    var i = 0;
    var referenceCells ='';
    var nameCells ='';
    var typeCells ='';
    for (i = 0; i < ObjectsListMediator.PAGE_SIZE_MAX; i++) {
      var cellClass = ObjectsListMediator.CELL_CLASS_ID;
      var cell01Class = ObjectsListMediator.CELL_01_CLASS_ID;
      if (i === 0) {
        cellClass = ObjectsListMediator.CELL_FIRST_LINE_CLASS_ID;
        cell01Class = ObjectsListMediator.CELL_01_FIRST_LINE_CLASS_ID;
      }
    //referenceCells += '<div id="'+name+ObjectsListLeft.REF_COLUMN_ID+'0'+i+'" class="'+cell01Class+'" style="padding:1px 5px 1px 1px;text-align:right;" onclick="_cf.setObjectListIndex('+i+');">&nbsp;</div>';
    //nameCells += '<div id="'+name+ObjectsListLeft.NAME_COLUMN_ID+'0'+i+'" class="'+cellClass+'" onclick="_cf.setObjectListIndex('+i+');">&nbsp;</div>';
    //typeCells += '<div id="'+name+ObjectsListLeft.TYPE_COLUMN_ID+'0'+i+'" class="'+cellClass+'" onclick="_cf.setObjectListIndex('+i+');">&nbsp;</div>';
      referenceCells += '<div id="'+this.getRefCellId(i,name)+'" class="'+cell01Class+'" style="padding:1px 5px 1px 1px;text-align:right;">&nbsp;</div>';
      nameCells += '<div id="'+this.getNameCellId(i,name)+'" class="'+cellClass+'">&nbsp;</div>';
      typeCells += '<div id="'+this.getTypeCellId(i,name)+'" class="'+cellClass+'">&nbsp;</div>';
    }
    var result = '<div id="'+name+ObjectsListLeft.REF_COLUMN_ID+'" class="'+ObjectsListMediator.COLUMN_CLASS_ID+" "+ObjectsListLeft.COLUMN_REF_CLASS_ID+'" style="width:12%;display:block;">'+
                 ' <div id="'+name+ObjectsListLeft.REF_COLUMN_ID+'h" class="'+ObjectsListMediator.COLUMN_HEADER_01_CLASS_ID+" "+ObjectsListLeft.COLUMN_HEADER_REF_CLASS_ID+'">'+
                 '  <a id="'+name+ObjectsListLeft.REF_COLUMN_ID+'ha" href="" tabindex="-1" onclick="">Ref.</a>'+
                 ' </div>'+
                 ' <div id="listColumnReferenceCells" style="background-color:white">'+referenceCells+'</div>'+
                 '</div>'+
                 '<div id="'+name+ObjectsListLeft.NAME_COLUMN_ID+'" class="'+ObjectsListMediator.COLUMN_CLASS_ID+" "+ObjectsListLeft.COLUMN_NAME_CLASS_ID+'" style="width:65%;display:block;">'+
                 ' <div id="'+name+ObjectsListLeft.NAME_COLUMN_ID+'h" class="'+ObjectsListMediator.COLUMN_HEADER_CLASS_ID+" "+ObjectsListLeft.COLUMN_HEADER_NAME_CLASS_ID+'">'+
                 '  <a id="'+name+ObjectsListLeft.NAME_COLUMN_ID+'ha" href="" tabindex="-1" onclick="">Name</a>'+
                 ' </div>'+
                 ' <div id="listColumnNameCells" style="background-color:white">'+nameCells+'</div>'+
                 '</div>'+
                 '<div id="'+name+ObjectsListLeft.TYPE_COLUMN_ID+'" class="'+ObjectsListMediator.COLUMN_CLASS_ID+" "+ObjectsListLeft.COLUMN_TYPE_CLASS_ID+'" style="width:23%;display:block;">'+
                 ' <div id="'+name+ObjectsListLeft.TYPE_COLUMN_ID+'h" class="'+ObjectsListMediator.COLUMN_HEADER_CLASS_ID+" "+ObjectsListLeft.COLUMN_HEADER_TYPE_CLASS_ID+'">'+
              //'  <a id="'+name+ObjectsListLeft.TYPE_COLUMN_ID+'ha" href="" style="padding:0px 0px 0px 19px;" tabindex="-1" onclick="">Type</a>'+
                 '  <a id="'+name+ObjectsListLeft.TYPE_COLUMN_ID+'ha" href="" tabindex="-1" onclick="">Type</a>'+
                 ' </div>'+
                 ' <div id="listColumnTypeCells" style="background-color:white">'+typeCells+'</div>'+
                 '</div>';
    return result;    
  }
});
ObjectsListLeft.REF_COLUMN_ID = "lcreference";
ObjectsListLeft.REF_ANCHOR_ID = "lcrefa";
ObjectsListLeft.NAME_COLUMN_ID = "lcname";
ObjectsListLeft.NAME_ANCHOR_ID = "lcnama";
ObjectsListLeft.TYPE_COLUMN_ID = "lctype";
ObjectsListLeft.TYPE_ANCHOR_ID = "lctypa";
ObjectsListLeft.COLUMN_REF_CLASS_ID = "listColumnReference";
ObjectsListLeft.COLUMN_NAME_CLASS_ID = "listColumnName";
ObjectsListLeft.COLUMN_TYPE_CLASS_ID = "listColumnType";
ObjectsListLeft.COLUMN_HEADER_REF_CLASS_ID = "listColumnHeaderReference";
ObjectsListLeft.COLUMN_HEADER_NAME_CLASS_ID = "listColumnHeaderName";
ObjectsListLeft.COLUMN_HEADER_TYPE_CLASS_ID = "listColumnHeaderType";
ObjectsListLeft.COLUMN_HEADER_DESC_CLASS_ID = "listColumnHeaderDescription";

//Class: DataObjectsListLeft
var DataObjectsListLeft = new Class({
  Extends: ObjectsListLeft,
  initialize: function(name,properties) {
    this.parent(DataObjectsListLeft.ID, properties);
    //Extend keyboard.
    //this.keyboardEvents[SjamayeeFacade.HOME] = this.keydownHandler;
    //this.keyboard.removeEvents();
    //this.keyboard.addEvents(this.keyboardEvents);
  }
});
DataObjectsListLeft.ID = "dataObjectsListLeft";

//Class: ModelObjectsListLeft
var ModelObjectsListLeft = new Class({
  Extends: ObjectsListLeft,
  initialize: function(name,properties) {
    this.parent(ModelObjectsListLeft.ID, properties);
    //Extend keyboard.
    //this.keyboardEvents[SjamayeeFacade.END] = this.keydownHandler;
    //this.keyboard.removeEvents();
    //this.keyboard.addEvents(this.keyboardEvents);
  }
});
ModelObjectsListLeft.ID = "modelObjectsListLeft";

//Abstract
//Class: ObjectsListRight
var ObjectsListRight = new Class({
  Extends: ListUIComponent,
  initialize: function(name,properties) {
    var html = this.buildHtml(name);
    this.parent(name,{html:html});
  },  
  initializeChildren: function() {
    this.parent();
    var i = 0;
    var cells = [];
    for (i = 0; i < ObjectsListMediator.PAGE_SIZE_MAX; i++) {
      var descCell = $(this.getDescCellId(i));
      if (descCell) {
        cells.push(descCell);
      }
    }
    this.setCells(cells);
  },
  getDescCellId: function(index,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+ObjectsListRight.DESC_COLUMN_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
  getDescAnchorId: function(index,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    return listName+ObjectsListRight.DESC_ANCHOR_ID+Utils.pad(index,Sjamayee.ID_PAD_SIZE);
  },
  buildHtml: function(name) {
    var result = '';
    var i = 0;
    var descriptionCells ='';
    for (i = 0; i < ObjectsListMediator.PAGE_SIZE_MAX; i++) {
      var cellClass = ObjectsListMediator.CELL_CLASS_ID;
      var cell01Class = ObjectsListMediator.CELL_01_CLASS_ID;
      if (i === 0) {
        cellClass = ObjectsListMediator.CELL_FIRST_LINE_CLASS_ID;
        cell01Class = ObjectsListMediator.CELL_01_FIRST_LINE_CLASS_ID;
      }
      descriptionCells += '<div id="'+this.getDescCellId(i,name)+'" class="'+cell01Class+'">&nbsp;</div>';
    }
    var result = '<div id="'+name+ObjectsListRight.DESC_COLUMN_ID+'" class="'+ObjectsListMediator.COLUMN_CLASS_ID+" "+ObjectsListMediator.COLUMN_DESC_CLASS_ID+'" style="width:100%;display:block;">'+
                 ' <div id="'+name+ObjectsListRight.DESC_COLUMN_ID+'h" class="'+ObjectsListMediator.COLUMN_HEADER_CLASS_ID+" "+ObjectsListMediator.COLUMN_HEADER_DESC_CLASS_ID+'">'+
                 '  <a id="'+name+ObjectsListRight.DESC_COLUMN_ID+'ha" href="" tabindex="-1" onclick="">Description</a>'+
                 ' </div>'+
                 ' <div id="listColumnDescriptionCells" style="background-color:white">'+descriptionCells+'</div>'+
                 '</div>';
    return result;    
  }
});
ObjectsListRight.DESC_COLUMN_ID = "lcdescription";
ObjectsListRight.DESC_ANCHOR_ID = "lcdesca";
ObjectsListRight.DESC_COLUMN_HEADER_VALUE = "Description";
ObjectsListRight.COLUMN_DESC_CLASS_ID = "listColumnDescription";

//Class: DataObjectsListRight
var DataObjectsListRight = new Class({
  Extends: ObjectsListRight,
  initialize: function(name,properties) {
    this.parent(DataObjectsListRight.ID, properties);
  }
});
DataObjectsListRight.ID = "dataObjectsListRight";

//Class: ModelObjectsListRight
var ModelObjectsListRight = new Class({
  Extends: ObjectsListRight,
  initialize: function(name,properties) {
    this.parent(ModelObjectsListRight.ID, properties);
  }
});
ModelObjectsListRight.ID = "modelObjectsListRight";

//Abstract
//Class: GridUIComponent
var GridUIComponent = new Class({
  Extends: ListUIComponent,
  initialize: function(name,properties) {
    this.parent(name,properties);
    this.grid_clickHandler = this.grid_clickHandler.bindWithEvent(this);      
    this.cell_clickHandler = this.cell_clickHandler.bindWithEvent(this);
    this.cell_mouseOverHandler = this.cell_mouseOverHandler.bindWithEvent(this);
    this.cell_mouseOutHandler = this.cell_mouseOutHandler.bindWithEvent(this);    
    //Extend keyboard with Grid events.   
    this.keyboardEvents[SjamayeeFacade.LEFT] = this.keydownHandler;
    this.keyboardEvents[SjamayeeFacade.RIGHT] = this.keydownHandler;
    this.keyboard.removeEvents();
    this.keyboard.addEvents(this.keyboardEvents);
  },
  childrenInitialized: function() {
    this.parent();    
    //Add handlers on cells.
    var cells = this.getCells();
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      cell.addEvent(SjamayeeFacade.CLICK, this.cell_clickHandler);  
      cell.addEvent(SjamayeeFacade.MOUSEOVER, this.cell_mouseOverHandler);
      cell.addEvent(SjamayeeFacade.MOUSEOUT, this.cell_mouseOutHandler);
    }
    this.addEvent(SjamayeeFacade.CLICK, this.grid_clickHandler);
  },
  clear: function() {
    var cells = this.getCells();
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      if (cell) {
        var cellAnchorId = cell.id+'a';
        //this.setCell(cellAnchorId,'&nbsp;');
        //this.setCell(cellAnchorId,'');
        this.setCell(cell.id,'&nbsp;');
      }
    }
  },
/*
  setCell: function(id, value) {
    //alert("GridUIComponent/setCell - id: "+id+" value: "+value);
    $(id).innerHTML = value;
  },
*/
  grid_clickHandler: function(evt) { this.fireEvent(SjamayeeFacade.GRID_CLICK,evt); },
  cell_clickHandler: function(evt) {
    var id = evt.target.id;
    var row = id.substr(id.length-(Sjamayee.ID_PAD_SIZE*2+1),Sjamayee.ID_PAD_SIZE);
    var column = id.substr(id.length-Sjamayee.ID_PAD_SIZE);   
    this.fireEvent(SjamayeeFacade.GRID_CELL_CLICK,evt);
  /*var cellIds = '';
    var j = 0;
    var cells = this.getCells();
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      cellIds += cell.id;
      j++;
      if (j < 10) {
        cellIds += ",";
      } else {
        cellIds += "\n";
        j = 0;
      }
    }*/
  },
  cell_mouseOverHandler: function(evt) { this.fireEvent(SjamayeeFacade.GRID_CELL_MOUSEOVER, evt); },
  cell_mouseOutHandler: function(evt)  { this.fireEvent(SjamayeeFacade.GRID_CELL_MOUSEOUT, evt); },
  list_clickHandler: function()    {}, //Disabled.
  line_clickHandler: function(evt) {}, //Disabled.
  line_mouseOverHandler: function(evt) {}, //Disabled.
  line_mouseOutHandler: function(evt)  {}, //Disabled.
  keydownHandler: function(evt) {
    var subEvent = this.parent(evt);
    switch (evt.key) {
      case SjamayeeFacade.LEFT:
      subEvent = SjamayeeFacade.LEFT;
      break;
      case SjamayeeFacade.RIGHT:
      subEvent = SjamayeeFacade.RIGHT;
      break;
    }
    this.fireEvent(SjamayeeFacade.GRID_KEYDOWN, [evt,subEvent]);    
    return subEvent;
  }
});

//Abstract
//Class: RelationsGridLeft
var RelationsGridLeft = new Class({
  Extends: GridUIComponent,
  initialize: function(name,properties) {
    var html = this.buildHtml(name);
    this.parent(name,{html:html});
    //Extend keyboard.
    //this.keyboardEvents[SjamayeeFacade.ESCAPE] = this.keydownHandler;
    //this.keyboardEvents[SjamayeeFacade.UP] = this.keydownHandler;
    //this.keyboard.removeEvents();
    //this.keyboard.addEvents(this.keyboardEvents);
  },
  initializeChildren: function() {
    this.parent();
    var cells = [];
    for (var col = Position.COLUMN_FIRST(); col < Position.COLUMNS_MAX(); col++) {
      for (var row = Position.ROW_TOP(); row < RelationsGridMediator.PAGE_SIZE_MAX; row++) {
        //var cell = $(RelationsGridLeft.COLUMN_ID+'c'+col+row);
        var cell = $(this.getCellId(row,col));
        var cellAnchorId = cell.id+'a';
        //this.setCell(cellAnchorId,('c'+col+row));
        var cellValue = ''; //'<a id="'+cellAnchorId+'" style="background-color:inherit;color:inherit;" href="#" style="width:100%;">'+('c'+col+row)+'</a>';
        this.setCell(cell.id,cellValue);            
        cells.push(cell);
      //if (row == 0) { alert("RelationsGridLeft/initializeChildren - cell: "+cell+" id: "+(RelationsGridLeft.COLUMN_ID+'c'+col+row)); }
      }
    }
    this.setCells(cells);
  },
  getColumnHeaderId: function(col,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+Utils.pad(col,Sjamayee.ID_PAD_SIZE)+'h';
    return result;
  },
  getColumnHeaderAnchorId: function(col,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+Utils.pad(col,Sjamayee.ID_PAD_SIZE)+'ha';
    return result;
  },
  getColumnId: function(col,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+Utils.pad(col,Sjamayee.ID_PAD_SIZE);
    return result;
  },
  getCellId: function(row,col,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+'r'+Utils.pad(row,Sjamayee.ID_PAD_SIZE)+'c'+Utils.pad(col,Sjamayee.ID_PAD_SIZE);
    return result;
  },
  getCellAnchorId: function(row,col,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridLeft.COLUMN_ID+'r'+Utils.pad(row,Sjamayee.ID_PAD_SIZE)+'c'+Utils.pad(col,Sjamayee.ID_PAD_SIZE)+'a';
    return result;
  },
  buildHtml: function(name) {
    var result = '';
    var nivoBase = Position.NIVO_COLUMN_FIRST();
    for (var col = Position.COLUMN_FIRST(); col < Position.COLUMNS_MAX(); col++) {
      //var columnId = RelationsGridLeft.COLUMN_ID+col;
      var columnId = this.getColumnId(col,name);
      var nivo = (nivoBase + col);
      var columnHeader = nivo;
      var columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHERE_USED_CLASS_ID+" "+GridColumn.WHERE_USED_4C_CLASS_ID;
      var columnHeaderClass = GridColumn.HEADER_CLASS_ID;
      //var cellClass = GridCell.CLASS_ID;
      var cellClass = RelationsGridLeft.CELL_CLASS_ID;
      if (col == Position.COLUMN_FIRST()) {
        columnHeaderClass = GridColumn.HEADER_CLASS_ID+" "+GridColumn.HEADER_FIRST_CLASS_ID;
        cellClass = RelationsGridLeft.CELL_CLASS_ID; //+" "+GridCell.LEFT_CLASS_ID;
      }
      if (nivo == Position.NIVO_ROOT()) {
        columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHERE_USED_CLASS_ID+" "+GridColumn.ROOT_4C_CLASS_ID;
      } else if (nivo > Position.NIVO_ROOT()) {
        columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHAT_USED_LEFT_CLASS_ID+" "+GridColumn.WHAT_USED_LEFT_4C_CLASS_ID;
      }
      var styleColor = FontStyle.COLOR_WHERE();
      if (nivo == Position.NIVO_ROOT()) {
        styleColor = FontStyle.COLOR_ROOT();
      } else if (nivo > Position.NIVO_ROOT()) { 
        styleColor = FontStyle.COLOR_WHAT();
      }
      var lineColor = "inherit";
    /*result += '<div id="'+columnId+'" style="height:100%;width:'+width+'%;display:'+display+';" class="'+columnClass+'">'+
                '<div id="'+columnId+'h" style="color:'+styleColor+';padding:'+padding+'" class="'+columnHeaderClass+'">'+
                '<div id="'+columnId+'ha" style="position:relative;left:2px;color:'+styleColor+';" tabindex="-1">'+columnHeader+'</div>'+
                '</div>';*/
      result += '<div id="'+columnId+'" class="'+columnClass+'">'+
                '<div id="'+columnId+'h" class="'+columnHeaderClass+'">'+
                '<div id="'+columnId+'ha" style="position:relative;left:2px;color:'+styleColor+';" tabindex="-1">'+columnHeader+'</div>'+
                '</div>';
      var _cellClass = cellClass;
      for (var row = Position.ROW_TOP(); row < RelationsGridMediator.PAGE_SIZE_MAX; row++) {
        //var cellId = RelationsGridLeft.COLUMN_ID+'c'+col+row;
        var cellId = this.getCellId(row,col,name);
        //var cellStyle = 'style="width:100%;height:17px;"';
        var cellAnchorId = cellId+'a';
        /*if (row == Position.ROW_TOP()) {
          cellClass = _cellClass+" "+GridCell.FIRST_CLASS_ID;
          //cellStyle = 'style="width:100%;height:17px;border-top:none;"';
        }*/
        result += '<div id="'+cellId+'" class="'+cellClass+'">'+ //+'" '+cellStyle+'>'+
                  //cell content.
                  //'<div style="clear:both;text-align:left;position:relative;width:100%;height:100%;background-color:'+lineColor+';">'+
                  //'<div style="float:left;width:16px;height:16px;padding:0px 1px 0px 0px;background-color:inherit;text-align:center;">&nbsp;</div>'+
                  //cell value.
                  //'<div id="'+cellAnchorId+'">&nbsp;</div>'+                      
                  //'<a id="'+cellAnchorId+'" style="background-color:inherit;color:inherit;" href="#" style="width:100%;"></a>'+
                  //'</div>'+
                  '</div>';
      }
      result += '</div>';
    }
    return result;
  },
  removeClass: function(id) {
    $(id).removeClass(GridColumn.WHERE_USED_CLASS_ID);
    $(id).removeClass(GridColumn.WHERE_USED_4C_CLASS_ID);
    $(id).removeClass(GridColumn.WHERE_USED_5C_CLASS_ID);
    $(id).removeClass(GridColumn.WHERE_USED_6C_CLASS_ID);
    $(id).removeClass(GridColumn.WHERE_USED_7C_CLASS_ID);
    $(id).removeClass(GridColumn.WHERE_USED_8C_CLASS_ID);
    $(id).removeClass(GridColumn.ROOT_CLASS_ID);
    $(id).removeClass(GridColumn.ROOT_4C_CLASS_ID);
    $(id).removeClass(GridColumn.ROOT_5C_CLASS_ID);
    $(id).removeClass(GridColumn.ROOT_6C_CLASS_ID);
    $(id).removeClass(GridColumn.ROOT_7C_CLASS_ID);
    $(id).removeClass(GridColumn.WHAT_USED_LEFT_CLASS_ID);
    $(id).removeClass(GridColumn.WHAT_USED_LEFT_4C_CLASS_ID);
    $(id).removeClass(GridColumn.WHAT_USED_LEFT_4X_CLASS_ID);
  }
});
RelationsGridLeft.COLUMN_ID = Grid.COLUMN_ID;
RelationsGridLeft.CELL_CLASS_ID = "relationsGridLeftCell";
/*
RelationsGridLeft.getColumnId = function(columnNumber) {
  var _columnNumber = ((columnNumber !== undefined) && (columnNumber !== null))?columnNumber:Position.COLUMN_FIRST();
  if (_columnNumber > Position.COLUMNS_MAX()) {
    _columnNumber = Position.COLUMNS_MAX();
  }
  return RelationsGridLeft.COLUMN_ID+_columnNumber;
};
*/
//Class: DataRelationsGridLeft
var DataRelationsGridLeft = new Class({
  Extends: RelationsGridLeft,
  initialize: function(name,properties) {
    this.parent(DataRelationsGridLeft.ID, properties);
    //Extend keyboard.
    //this.keyboardEvents[SjamayeeFacade.LEFT] = this.keydownHandler;
    //this.keyboard.removeEvents();
    //this.keyboard.addEvents(this.keyboardEvents);
  }
});
DataRelationsGridLeft.ID = "dataRelationsGridLeft";

//Class: ModelRelationsGridLeft
var ModelRelationsGridLeft = new Class({
  Extends: RelationsGridLeft,
  initialize: function(name,properties) {
    this.parent(ModelRelationsGridLeft.ID, properties);
    //Extend keyboard.
    //this.keyboardEvents[SjamayeeFacade.RIGHT] = this.keydownHandler;
    //this.keyboard.removeEvents();
    //this.keyboard.addEvents(this.keyboardEvents);
  }
});
ModelRelationsGridLeft.ID = "modelRelationsGridLeft";

//Abstract
//Class: RelationsGridRight
var RelationsGridRight = new Class({
  Extends: GridUIComponent,
  initialize: function(name,properties) {
    var html = this.buildHtml(name);
    this.parent(name,{html:html});
  },
  initializeChildren: function() {
    this.parent();
    var cells = [];
    for (var row = Position.ROW_TOP(); row < RelationsGridMediator.PAGE_SIZE_MAX; row++) {
      //var cell = $(RelationsGridRight.COLUMN_ID+'c0'+row);
      var cell = $(this.getCellId(row));
      var cellAnchorId = cell.id+'a';
      //this.setCell(cellAnchorId,('c0'+row));
      var cellValue = ''; //'<a id="'+cellAnchorId+'" style="background-color:inherit;color:inherit;" href="#" style="width:100%;">'+('c0'+row)+'</a>';
      this.setCell(cell.id,cellValue);
      cells.push(cell);
    //if (row == 0) { alert("RelationsGridRight/initializeChildren - cell: "+cell+" id: "+(RelationsGridRight.COLUMN_ID+'c0'+row)); }
    }
    this.setCells(cells);   
  },
/*
  cell_clickHandler: function(evt) {
    var id = evt.target.id;
    var row = id.substr(id.length-(Sjamayee.ID_PAD_SIZE*2+1),Sjamayee.ID_PAD_SIZE);
    var column = id.substr(id.length-Sjamayee.ID_PAD_SIZE);   
    this.fireEvent(SjamayeeFacade.GRID_CELL_CLICK, evt); 
  },
*/
  getColumnHeaderId: function(name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_HEADER_ID;
    return result;
  },
  getColumnHeaderAnchorId: function(name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_HEADER_ANCHOR_ID;
    return result;
  },
  getColumnId: function(name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_ID;
    return result;
  },
/*
  getCellId: function(row,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_ID+'r'+Utils.pad(row,Sjamayee.ID_PAD_SIZE);
    return result;
  },
*/
  getCellId: function(row,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_ID+'r'+Utils.pad(row,Sjamayee.ID_PAD_SIZE)+'c'+Utils.pad(RelationsGridRight.COLUMN_VALUE,Sjamayee.ID_PAD_SIZE);
    return result;
  },
  getCellAnchorId: function(row,name)  {
    var listName = this.id;
    if (name) { listName = name; } 
    var result = listName+RelationsGridRight.COLUMN_ID+'r'+Utils.pad(row,Sjamayee.ID_PAD_SIZE)+'a';
    return result;
  },
  buildHtml: function(name) {
    var result = '';
    var nivo = Position.NIVO_ROOT(); //_grid.getLastNivo(); //TODO: initial build withouth GRID !!! - LEFT/RIGHT !!!
    var columnHeader = nivo;
    var columnClass = GridColumn.CLASS_ID+" "+GridColumn.WHAT_USED_CLASS_ID;
    var columnHeaderClass = GridColumn.HEADER_CLASS_ID+" "+GridColumn.HEADER_FIRST_CLASS_ID+" "+GridColumn.HEADER_WHAT_USED_CLASS_ID;
    var lineColor = "inherit";
    result = '<div id="'+this.getColumnId(name)+'" class="'+columnClass+'">'+
             '<div id="'+this.getColumnHeaderId(name)+'" class="'+columnHeaderClass+'">'+
             '<div style="float:left;width:20px;background-color:'+FontStyle.COLOR_LIGHTGRAY+';">&nbsp;</div>'+
             '<div id="'+this.getColumnHeaderAnchorId(name)+'" style="position:relative;left:2px;color:'+FontStyle.COLOR_CHILD()+';" tabindex="-1">'+columnHeader+'</div>'+
             '</div>';
    for (var row = Position.ROW_TOP(); row < RelationsGridMediator.PAGE_SIZE_MAX; row++) {
      var cellId = this.getCellId(row,name); //RelationsGridRight.COLUMN_ID+'c0'+row;
      var cellAnchorId = cellId+'a';
      //var cellClass = GridCell.CLASS_ID;
      var cellClass = RelationsGridRight.CELL_CLASS_ID;
      result += '<div id="'+cellId+'" class="'+cellClass+'">'+
                //cell content.
                //'<div style="clear:both;text-align:left;position:relative;width:100%;height:100%;background-color:'+lineColor+';">'+
                //'<div style="float:left;width:16px;height:16px;padding:0px 1px 0px 0px;background-color:inherit;text-align:center;">&nbsp;</div>'+
                //cell value.
                //'<a id="'+cellAnchorId+'" style="background-color:inherit;;color:inherit;" href="#" style="width:100%;"></a>'+
                //'</div>'+
                '</div>'; 
    }
    result += '</div>';
    return result;
  }
});
RelationsGridRight.COLUMN_ID = Grid.COLUMN_WHAT_ID;
RelationsGridRight.COLUMN_VALUE = 999;
RelationsGridRight.COLUMN_HEADER_ID = RelationsGridRight.COLUMN_ID+'h';
RelationsGridRight.COLUMN_HEADER_ANCHOR_ID = RelationsGridRight.COLUMN_ID+'ha';
RelationsGridRight.CELL_CLASS_ID = "relationsGridRightCell";

//Class: DataRelationsGridRight
var DataRelationsGridRight = new Class({
  Extends: RelationsGridRight,
  initialize: function(name,properties) {
    this.parent(DataRelationsGridRight.ID, properties);
  }
});
DataRelationsGridRight.ID = "dataRelationsGridRight";

//Class: ModelRelationsGridRight
var ModelRelationsGridRight = new Class({
  Extends: RelationsGridRight,
  initialize: function(name,properties) {
    this.parent(ModelRelationsGridRight.ID, properties);
  }
});
ModelRelationsGridRight.ID = "modelRelationsGridRight";

//Class: ToolBar
var ToolBar = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    var html = '<div id="'+DataObjectsToolBar.ID+'" class="'+ToolBar.CLASS_ID+'"></div>'+
               '<div id="'+DataRelationsToolBar.ID+'" class="'+ToolBar.CLASS_ID+'"></div>';
    if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {               
      html += '<div id="'+ModelObjectsToolBar.ID+'" class="'+ToolBar.CLASS_ID+'"></div>'+
              '<div id="'+ModelRelationsToolBar.ID+'" class="'+ToolBar.CLASS_ID+'"></div>'+
              '<div id="'+ModelObjectsTextsToolBar.ID+'" class="'+ToolBar.CLASS_ID+'"></div>';
              '<div id="'+ModelRelationsTextsToolBar.ID+'" class="'+ToolBar.CLASS_ID+'"></div>';
    }
    this.parent(ToolBar.ID,{html: html});
    this.dataObjectsToolBar = null;
    this.dataRelationsToolBar = null;
    this.modelObjectsToolBar = null;
    this.modelRelationsToolBar = null;
    this.modelObjectsTextsToolBar = null;
    this.modelRelationsTextsToolBar = null;
  },
  initializeChildren: function() {
    this.dataObjectsToolBar = new DataObjectsToolBar();
    this.addChild(this.dataObjectsToolBar);
    this.dataRelationsToolBar = new DataRelationsToolBar();
    this.addChild(this.dataRelationsToolBar);
    if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {   
      this.modelObjectsToolBar = new ModelObjectsToolBar();
      this.addChild(this.modelObjectsToolBar);
      this.modelRelationsToolBar = new ModelRelationsToolBar();
      this.addChild(this.modelRelationsToolBar);    
      this.modelObjectsTextsToolBar = new ModelObjectsTextsToolBar();
      this.addChild(this.modelObjectsTextsToolBar);
      this.modelRelationsTextsToolBar = new ModelRelationsTextsToolBar();
      this.addChild(this.modelRelationsTextsToolBar);
    }
  }
});
ToolBar.ID = "toolBarPane";
ToolBar.CLASS_ID = "toolBar";
ToolBar.COMMON_TOOLBAR_ID = "commonToolBar";
ToolBar.COMMON_TOOLBAR_CLASS_ID = "commonToolBar";
ToolBar.MESSAGE_TEXT_ID = "messageText";
ToolBar.MESSAGE_TEXT_CLASS_ID = "messageText";
ToolBar.SPECIAL_CLASS_ID = "specialTB";
ToolBar.NAVIGATION_BUTTONS_CLASS_ID = "navigationButtonsTB";
ToolBar.UPDATE_BUTTONS_CLASS_ID = "updateButtonsTB";
ToolBar.BUTTON_CLASS_ID = "toolBarButton";

//Abstract
//Class: ObjectsToolBar
var ObjectsToolBar = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    var html = '<div id="'+name+ToolBar.COMMON_TOOLBAR_ID+'" class="'+ToolBar.COMMON_TOOLBAR_CLASS_ID+'">'+
               '<input type="text" id="'+name+ToolBar.MESSAGE_TEXT_ID+'" class="'+ToolBar.MESSAGE_TEXT_CLASS_ID+'" value=""/>'+
               '</div>'+
               '<div id="'+name+ObjectsToolBar.SPECIAL_ID+'" class="'+ToolBar.SPECIAL_CLASS_ID+'">'+
               '<div id="'+name+ObjectsToolBar.NAVIGATION_BUTTONS_ID+'" class="'+ToolBar.NAVIGATION_BUTTONS_CLASS_ID+'">'+
               '<button id="'+name+ObjectsToolBar.RESIZE_BUTTON_ID+'" class="'+ObjectsToolBar.RESIZE_BUTTON_CLASS_ID+'" style="vertical-align:middle;">'+ObjectsToolBar.RESIZE_BUTTON_NORMAL_VALUE+'</button>'+
               '<button id="'+name+ObjectsToolBar.LAST_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;margin-right:25px;">'+ObjectsToolBar.LAST_BUTTON_VALUE+'</button>'+
               '<button id="'+name+ObjectsToolBar.NEXT_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;margin-right:5px;">'+ObjectsToolBar.NEXT_BUTTON_VALUE+'</button>'+
               '<button id="'+name+ObjectsToolBar.PREVIOUS_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;margin-right:5px;">'+ObjectsToolBar.PREVIOUS_BUTTON_VALUE+'</button>'+
               '<button id="'+name+ObjectsToolBar.FIRST_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;margin-right:5px;">'+ObjectsToolBar.FIRST_BUTTON_VALUE+'</button>'+
               '</div>';
    if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
      html += '<div id="'+name+ObjectsToolBar.UPDATE_BUTTONS_ID+'" class="'+ToolBar.UPDATE_BUTTONS_CLASS_ID+'">'+
              '<button id="'+name+ObjectsToolBar.ADD_OBJECT_BUTTON_ID+'" type="button" class="'+ToolBar.BUTTON_CLASS_ID+'" style="width:25px;margin-left:40px;">'+ObjectsToolBar.ADD_OBJECT_BUTTON_VALUE+'</button>'+
              '<button id="'+name+ObjectsToolBar.DELETE_OBJECT_BUTTON_ID+'" type="button" class="'+ToolBar.BUTTON_CLASS_ID+'" style="width:25px;margin-left:10px;">'+ObjectsToolBar.DELETE_OBJECT_BUTTON_VALUE+'</button>'+
              '<button id="'+name+ObjectsToolBar.EDIT_OBJECT_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:10px;">'+ObjectsToolBar.EDIT_OBJECT_BUTTON_VALUE+'</button>'+
              '<button id="'+name+ObjectsToolBar.UNDO_OBJECT_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:10px;">'+ObjectsToolBar.UNDO_OBJECT_BUTTON_VALUE+'</button>'+
              '<button id="'+name+ObjectsToolBar.REDO_OBJECT_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:10px;">'+ObjectsToolBar.REDO_OBJECT_BUTTON_VALUE+'</button>'+
              '<button id="'+name+ObjectsToolBar.CLEAR_BUFFER_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:10px;">'+ObjectsToolBar.CLEAR_BUFFER_BUTTON_VALUE+'</button>'+
              '<button id="'+name+ObjectsToolBar.DELETE_UNREFOBS_BUTTON_ID+'" class="'+ObjectsToolBar.DELETE_UNREFOBS_BUTTON_CLASS_ID+'">'+ObjectsToolBar.DELETE_UNREFOBS_BUTTON_VALUE+'</button>';
    }
    if (this instanceof ModelObjectsToolBar) {
      html += '<button id="'+name+ObjectsToolBar.TEXT_BUTTON_ID+'" class="'+ObjectsToolBar.TEXT_BUTTON_CLASS_ID+'">'+ObjectsToolBar.TEXT_BUTTON_VALUE+'</button>';
    } else {
      if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
        html += '</div>';
      } else {
        html += '<div style="width:100px;height:100%;"/>';
      }
    }
    html += '</div>';
    this.parent(name,{html:html});
    this.messageText = null;
    this.resizeButton = null;
    this.firstButton = null;
    this.previousButton = null;
    this.nextButton = null;
    this.lastButton = null;
    this.updateButtons = null;
    this.addObjectButton = null;
    this.deleteObjectButton = null;
    this.editObjectButton = null;
    this.undoObjectButton = null;
    this.redoObjectButton = null;
    this.clearBufferButton = null;
    this.textButton = null;
    this.deleteUnrefObjectsButton = null;
    this.resizeButton_clickHandler = this.resizeButton_clickHandler.bindWithEvent(this);
    this.firstButton_clickHandler = this.firstButton_clickHandler.bindWithEvent(this);
    this.previousButton_clickHandler = this.previousButton_clickHandler.bindWithEvent(this);
    this.nextButton_clickHandler = this.nextButton_clickHandler.bindWithEvent(this);
    this.lastButton_clickHandler = this.lastButton_clickHandler.bindWithEvent(this);
    this.addObjectButton_clickHandler = this.addObjectButton_clickHandler.bindWithEvent(this);
    this.deleteObjectButton_clickHandler = this.deleteObjectButton_clickHandler.bindWithEvent(this);
    this.editObjectButton_clickHandler = this.editObjectButton_clickHandler.bindWithEvent(this);
    this.undoObjectButton_clickHandler = this.undoObjectButton_clickHandler.bindWithEvent(this);
    this.redoObjectButton_clickHandler = this.redoObjectButton_clickHandler.bindWithEvent(this);
    this.clearBufferButton_clickHandler = this.clearBufferButton_clickHandler.bindWithEvent(this);
    this.textButton_clickHandler = this.textButton_clickHandler.bindWithEvent(this);
    this.deleteUnrefObjectsButton_clickHandler = this.deleteUnrefObjectsButton_clickHandler.bindWithEvent(this);
  },
  initializeChildren: function() {
    //this.parent();
    var name = this.id;
    this.messageText = $(name+ToolBar.MESSAGE_TEXT_ID);
    this.resizeButton = $(name+ObjectsToolBar.RESIZE_BUTTON_ID);
    this.firstButton = $(name+ObjectsToolBar.FIRST_BUTTON_ID);
    this.previousButton = $(name+ObjectsToolBar.PREVIOUS_BUTTON_ID);
    this.nextButton = $(name+ObjectsToolBar.NEXT_BUTTON_ID);
    this.lastButton = $(name+ObjectsToolBar.LAST_BUTTON_ID);
    this.updateButtons = $(name+ObjectsToolBar.UPDATE_BUTTONS_ID);
    if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
      this.addObjectButton = $(name+ObjectsToolBar.ADD_OBJECT_BUTTON_ID);
      this.deleteObjectButton = $(name+ObjectsToolBar.DELETE_OBJECT_BUTTON_ID);
      this.editObjectButton = $(name+ObjectsToolBar.EDIT_OBJECT_BUTTON_ID);
      this.undoObjectButton = $(name+ObjectsToolBar.UNDO_OBJECT_BUTTON_ID);
      this.redoObjectButton = $(name+ObjectsToolBar.REDO_OBJECT_BUTTON_ID);
      this.clearBufferButton = $(name+ObjectsToolBar.CLEAR_BUFFER_BUTTON_ID);
      this.deleteUnrefObjectsButton = $(name+ObjectsToolBar.DELETE_UNREFOBS_BUTTON_ID);
    }
    if (this instanceof ModelObjectsToolBar) {
      this.textButton = $(name+ObjectsToolBar.TEXT_BUTTON_ID);
    }
  },
  childrenInitialized: function() {
    //this.parent();
    var name = this.id;
    this.resizeButton.addEvent(SjamayeeFacade.CLICK, this.resizeButton_clickHandler);
    this.firstButton.addEvent(SjamayeeFacade.CLICK, this.firstButton_clickHandler);
    this.previousButton.addEvent(SjamayeeFacade.CLICK, this.previousButton_clickHandler);
    this.nextButton.addEvent(SjamayeeFacade.CLICK, this.nextButton_clickHandler);
    this.lastButton.addEvent(SjamayeeFacade.CLICK, this.lastButton_clickHandler);
    if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
      this.addObjectButton.addEvent(SjamayeeFacade.CLICK, this.addObjectButton_clickHandler);
      this.deleteObjectButton.addEvent(SjamayeeFacade.CLICK, this.deleteObjectButton_clickHandler);
      this.editObjectButton.addEvent(SjamayeeFacade.CLICK, this.editObjectButton_clickHandler);
      this.undoObjectButton.addEvent(SjamayeeFacade.CLICK, this.undoObjectButton_clickHandler);
      this.redoObjectButton.addEvent(SjamayeeFacade.CLICK, this.redoObjectButton_clickHandler);
      this.clearBufferButton.addEvent(SjamayeeFacade.CLICK, this.clearBufferButton_clickHandler);
      this.deleteUnrefObjectsButton.addEvent(SjamayeeFacade.CLICK, this.deleteUnrefObjectsButton_clickHandler);
    }
    if (this instanceof ModelObjectsToolBar) {
      this.textButton.addEvent(SjamayeeFacade.CLICK, this.textButton_clickHandler);
    }
  },
/*
  initializationComplete: function() {
    this.setEnabled(true);
  },

  setEnabled: function(isEnabled) {
    if (this.firstButton)              { this.firstButton.disabled = !isEnabled; }
    if (this.previousButton)           { this.previousButton.disabled = !isEnabled; }
    if (this.nextButton)               { this.nextButton.disabled = !isEnabled; }
    if (this.lastButton)               { this.lastButton.disabled = !isEnabled; }
    if (this.addObjectButton)          { this.addObjectButton.disabled = !isEnabled; }
    if (this.deleteObjectButton)       { this.deleteObjectButton.disabled = !isEnabled; }
    if (this.editObjectButton)         { this.editObjectButton.disabled = !isEnabled; }
    if (this.undoObjectButton)         { this.undoObjectButton.disabled = !isEnabled; }
    if (this.redoObjectButton)         { this.redoObjectButton.disabled = !isEnabled; }
    if (this.clearBufferButton)        { this.clearBufferButton.disabled = !isEnabled; }
    if (this.textButton)               { this.textButton.disabled = !isEnabled; }
    if (this.deleteUnrefObjectsButton) { this.deleteUnrefObjectsButton.disabled = !isEnabled; }
  },
*/
  resizeButton_clickHandler: function()             { this.fireEvent(SjamayeeFacade.RESIZE); },
  firstButton_clickHandler: function()              { this.fireEvent(SjamayeeFacade.HOME);  },
  previousButton_clickHandler: function()           { this.fireEvent(SjamayeeFacade.PREVIOUS);  },
  nextButton_clickHandler: function()               { this.fireEvent(SjamayeeFacade.NEXT);  },
  lastButton_clickHandler: function()               { this.fireEvent(SjamayeeFacade.END); },
  addObjectButton_clickHandler: function()          { this.fireEvent(SjamayeeFacade.OBJECT_ADD);  },
  deleteObjectButton_clickHandler: function()       { this.fireEvent(SjamayeeFacade.OBJECT_DELETE); },
  editObjectButton_clickHandler: function()         { this.fireEvent(SjamayeeFacade.OBJECT_EDIT); },
  undoObjectButton_clickHandler: function()         { this.fireEvent(SjamayeeFacade.OBJECT_UNDO); },
  redoObjectButton_clickHandler: function()         { this.fireEvent(SjamayeeFacade.OBJECT_REDO); },
  clearBufferButton_clickHandler: function()        { this.fireEvent(SjamayeeFacade.OBJECT_BUFFER_CLEAR); },
  textButton_clickHandler: function()               { this.fireEvent(SjamayeeFacade.TEXT_EDIT); },
  deleteUnrefObjectsButton_clickHandler: function() { this.fireEvent(SjamayeeFacade.OBJECT_UNREFS_DELETE);  } 
});
ObjectsToolBar.SPECIAL_ID = "Special";
ObjectsToolBar.NAVIGATION_BUTTONS_ID = "NavigationButtons";
ObjectsToolBar.UPDATE_BUTTONS_ID = "UpdateButtons";
ObjectsToolBar.FIRST_BUTTON_ID = "firstButton";
ObjectsToolBar.FIRST_BUTTON_VALUE = "First Page";
ObjectsToolBar.PREVIOUS_BUTTON_ID = "previousButton";
ObjectsToolBar.PREVIOUS_BUTTON_VALUE = "Previous";
ObjectsToolBar.NEXT_BUTTON_ID = "nextButton";
ObjectsToolBar.NEXT_BUTTON_VALUE = "Next";
ObjectsToolBar.LAST_BUTTON_ID = "lastButton";
ObjectsToolBar.LAST_BUTTON_VALUE = "Last Page";
ObjectsToolBar.RESIZE_BUTTON_ID = "resizeButton";
ObjectsToolBar.RESIZE_BUTTON_NORMAL_VALUE = "LIST | list";
ObjectsToolBar.RESIZE_BUTTON_FULL_VALUE = "list | LIST";
ObjectsToolBar.RESIZE_BUTTON_CLASS_ID = "objectsToolBarResizeButton";
ObjectsToolBar.ADD_OBJECT_BUTTON_ID= "addObjectButton";
ObjectsToolBar.ADD_OBJECT_BUTTON_VALUE= "+";
ObjectsToolBar.DELETE_OBJECT_BUTTON_ID = "deleteObjectButton";
ObjectsToolBar.DELETE_OBJECT_BUTTON_VALUE = "-";
ObjectsToolBar.EDIT_OBJECT_BUTTON_ID = "editObjectButton";
ObjectsToolBar.EDIT_OBJECT_BUTTON_VALUE = "Edit";
ObjectsToolBar.UNDO_OBJECT_BUTTON_ID = "undoObjectButton";
ObjectsToolBar.UNDO_OBJECT_BUTTON_VALUE = "Undo";
ObjectsToolBar.REDO_OBJECT_BUTTON_ID = "redoObjectButton";
ObjectsToolBar.REDO_OBJECT_BUTTON_VALUE = "Redo";
ObjectsToolBar.CLEAR_BUFFER_BUTTON_ID = "clearObjectsBufferButton";
ObjectsToolBar.CLEAR_BUFFER_BUTTON_VALUE = "Clear Buffer...";
ObjectsToolBar.TEXT_BUTTON_ID = "textButton";
ObjectsToolBar.TEXT_BUTTON_VALUE = "Edit text...";
ObjectsToolBar.TEXT_BUTTON_CLASS_ID = "objectsToolBarTextButton";
ObjectsToolBar.DELETE_UNREFOBS_BUTTON_ID = "deleteUnreferencedObjectsButton";
ObjectsToolBar.DELETE_UNREFOBS_BUTTON_VALUE = "Delete Unreferenced Objects";
ObjectsToolBar.DELETE_UNREFOBS_BUTTON_CLASS_ID = "deleteUnreferencedObjectsButton";

//Abstract
//Class: RelationsToolBar
var RelationsToolBar = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    var html = '<div id="'+name+ToolBar.COMMON_TOOLBAR_ID+'" class="'+ToolBar.COMMON_TOOLBAR_CLASS_ID+'">'+
               '<input type="text" id="'+name+ToolBar.MESSAGE_TEXT_ID+'" class="'+ToolBar.MESSAGE_TEXT_CLASS_ID+'" value=""/>'+
               '</div>'+
               '<div id="'+name+RelationsToolBar.SPECIAL_ID+'" class="'+ToolBar.SPECIAL_CLASS_ID+'">'+
               '<div id="'+name+RelationsToolBar.NAVIGATION_BUTTONS_ID+'" class="'+ToolBar.NAVIGATION_BUTTONS_CLASS_ID+'">'+
               '<button id="'+name+RelationsToolBar.RESIZE_BUTTON_ID+'" class="'+RelationsToolBar.RESIZE_BUTTON_CLASS_ID+'">'+RelationsToolBar.RESIZE_BUTTON_NORMAL_VALUE+'</button>'+
               '<div id="'+name+RelationsToolBar.PARENTANDCHILD_BUTTONS_ID+'" class="'+RelationsToolBar.PARENTANDCHILD_BUTTONS_CLASS_ID+'">'+
               '<button id="'+name+RelationsToolBar.CHILD_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;">'+RelationsToolBar.CHILD_BUTTON_VALUE+'</button>'+
               '<button id="'+name+RelationsToolBar.PARENTANDCHILD_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;margin-right:5px;">'+RelationsToolBar.PARENTANDCHILD_BUTTON_VALUE+'</button>'+
               '<button id="'+name+RelationsToolBar.PARENT_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="position:relative;float:right;margin-right:5px;">'+RelationsToolBar.PARENT_BUTTON_VALUE+'</button>'+
               '</div>'+
               '</div>'+
               '<div id="'+name+RelationsToolBar.UPDATE_BUTTONS_ID+'" class="'+ToolBar.UPDATE_BUTTONS_CLASS_ID+'">';
    if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
      html += '<button id="'+name+RelationsToolBar.ADD_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="width:25px;margin-left:20px;">'+RelationsToolBar.ADD_RELATION_BUTTON_VALUE+'</button>'+
              '<button id="'+name+RelationsToolBar.DELETE_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="width:25px;margin-left:5px;">'+RelationsToolBar.DELETE_RELATION_BUTTON_VALUE+'</button>'+
              '<button id="'+name+RelationsToolBar.EDIT_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.EDIT_RELATION_BUTTON_VALUE+'</button>'+
              '<button id="'+name+RelationsToolBar.EXTRACT_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.EXTRACT_RELATION_BUTTON_VALUE+'</button>'+
              '<button id="'+name+RelationsToolBar.COPY_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.COPY_RELATION_BUTTON_VALUE+'</button>'+
              '<button id="'+name+RelationsToolBar.PASTE_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.PASTE_RELATION_BUTTON_VALUE+'</button>'+
              '<button id="'+name+RelationsToolBar.UNDO_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.UNDO_RELATION_BUTTON_VALUE+'</button>'+
              '<button id="'+name+RelationsToolBar.REDO_RELATION_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.REDO_RELATION_BUTTON_VALUE+'</button>'+
              '<button id="'+name+RelationsToolBar.CLEAR_BUFFER_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:5px;">'+RelationsToolBar.CLEAR_BUFFER_BUTTON_VALUE+'</button>';
    }
    html += '<button id="'+name+RelationsToolBar.RESET_GRID_BUTTON_ID+'" class="'+RelationsToolBar.RESET_GRID_BUTTON_CLASS_ID+'">'+RelationsToolBar.RESET_GRID_BUTTON_VALUE+'</button>';
    if (this instanceof ModelRelationsToolBar) {
      html += '<button id="'+name+RelationsToolBar.TEXT_BUTTON_ID+'" class="'+RelationsToolBar.TEXT_BUTTON_CLASS_ID+'">'+RelationsToolBar.TEXT_BUTTON_VALUE+'</button>';
    }
    html += '</div>'+'</div>';              
    this.parent(name,{html:html});    
    this.messageText = null;
    this.resizeButton = null;
    this.parentAndChildButtons = null;
    this.parentButton = null;
    this.parentAndChildButton = null;
    this.childButton = null;
    this.updateButtons = null;
    this.addRelationButton = null;
    this.deleteRelationButton = null;
    this.editRelationButton = null;
    this.extractRelationButton = null;
    this.copyRelationButton = null;
    this.pasteRelationButton = null;
    this.undoRelationButton = null;
    this.redoRelationButton = null;
    this.clearBufferButton = null;
    this.textButton = null;
    this.resetGridButton = null;
    this.resizeButton_clickHandler = this.resizeButton_clickHandler.bindWithEvent(this);
    this.parentButton_clickHandler = this.parentButton_clickHandler.bindWithEvent(this);
    this.parentAndChildButton_clickHandler = this.parentAndChildButton_clickHandler.bindWithEvent(this);
    this.childButton_clickHandler = this.childButton_clickHandler.bindWithEvent(this);
    this.addRelationButton_clickHandler = this.addRelationButton_clickHandler.bindWithEvent(this);
    this.deleteRelationButton_clickHandler = this.deleteRelationButton_clickHandler.bindWithEvent(this);
    this.editRelationButton_clickHandler = this.editRelationButton_clickHandler.bindWithEvent(this);
    this.extractRelationButton_clickHandler = this.extractRelationButton_clickHandler.bindWithEvent(this);
    this.copyRelationButton_clickHandler = this.copyRelationButton_clickHandler.bindWithEvent(this);
    this.pasteRelationButton_clickHandler = this.pasteRelationButton_clickHandler.bindWithEvent(this);
    this.undoRelationButton_clickHandler = this.undoRelationButton_clickHandler.bindWithEvent(this);
    this.redoRelationButton_clickHandler = this.redoRelationButton_clickHandler.bindWithEvent(this);
    this.clearBufferButton_clickHandler = this.clearBufferButton_clickHandler.bindWithEvent(this);
    this.textButton_clickHandler = this.textButton_clickHandler.bindWithEvent(this);
    this.resetGridButton_clickHandler = this.resetGridButton_clickHandler.bindWithEvent(this);
  },
  initializeChildren: function() {
    //this.parent();
    var name = this.id;
    this.messageText = $(name+ToolBar.MESSAGE_TEXT_ID);
    this.resizeButton = $(name+RelationsToolBar.RESIZE_BUTTON_ID);
    this.parentAndChildButtons = $(name+RelationsToolBar.PARENTANDCHILD_BUTTONS_ID);
    this.parentButton = $(name+RelationsToolBar.PARENT_BUTTON_ID);
    this.parentAndChildButton = $(name+RelationsToolBar.PARENTANDCHILD_BUTTON_ID);
    this.childButton = $(name+RelationsToolBar.CHILD_BUTTON_ID);
    this.updateButtons = $(name+RelationsToolBar.UPDATE_BUTTONS_ID);
    if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
      this.addRelationButton = $(name+RelationsToolBar.ADD_RELATION_BUTTON_ID);
      this.deleteRelationButton = $(name+RelationsToolBar.DELETE_RELATION_BUTTON_ID);
      this.editRelationButton = $(name+RelationsToolBar.EDIT_RELATION_BUTTON_ID);
      this.extractRelationButton = $(name+RelationsToolBar.EXTRACT_RELATION_BUTTON_ID);
      this.copyRelationButton = $(name+RelationsToolBar.COPY_RELATION_BUTTON_ID);
      this.pasteRelationButton = $(name+RelationsToolBar.PASTE_RELATION_BUTTON_ID);
      this.undoRelationButton = $(name+RelationsToolBar.UNDO_RELATION_BUTTON_ID);
      this.redoRelationButton = $(name+RelationsToolBar.REDO_RELATION_BUTTON_ID);
      this.clearBufferButton = $(name+RelationsToolBar.CLEAR_BUFFER_BUTTON_ID);
    }
    if (this instanceof ModelRelationsToolBar) {
      this.textButton = $(name+RelationsToolBar.TEXT_BUTTON_ID);
    }
    this.resetGridButton = $(name+RelationsToolBar.RESET_GRID_BUTTON_ID);
  },
  childrenInitialized: function() {
    //this.parent();
    var name = this.id;
    this.resizeButton.addEvent(SjamayeeFacade.CLICK, this.resizeButton_clickHandler);
    this.parentButton.addEvent(SjamayeeFacade.CLICK, this.parentButton_clickHandler);
    this.parentAndChildButton.addEvent(SjamayeeFacade.CLICK, this.parentAndChildButton_clickHandler);
    this.childButton.addEvent(SjamayeeFacade.CLICK, this.childButton_clickHandler);
    if (SjamayeeFacade.APPLICATION_TYPE != SjamayeeFacade.BROWSER) {
      this.addRelationButton.addEvent(SjamayeeFacade.CLICK, this.addRelationButton_clickHandler);
      this.deleteRelationButton.addEvent(SjamayeeFacade.CLICK, this.deleteRelationButton_clickHandler);
      this.editRelationButton.addEvent(SjamayeeFacade.CLICK, this.editRelationButton_clickHandler);
      this.extractRelationButton.addEvent(SjamayeeFacade.CLICK, this.extractRelationButton_clickHandler);
      this.copyRelationButton.addEvent(SjamayeeFacade.CLICK, this.copyRelationButton_clickHandler);
      this.pasteRelationButton.addEvent(SjamayeeFacade.CLICK, this.pasteRelationButton_clickHandler);
      this.undoRelationButton.addEvent(SjamayeeFacade.CLICK, this.undoRelationButton_clickHandler);
      this.redoRelationButton.addEvent(SjamayeeFacade.CLICK, this.redoRelationButton_clickHandler);
      this.clearBufferButton.addEvent(SjamayeeFacade.CLICK, this.clearBufferButton_clickHandler);
    }
    if (this instanceof ModelRelationsToolBar) {
      this.textButton.addEvent(SjamayeeFacade.CLICK, this.textButton_clickHandler);
    }
    this.resetGridButton.addEvent(SjamayeeFacade.CLICK, this.resetGridButton_clickHandler);
  },
  //Click handlers.
  resizeButton_clickHandler: function()           { this.fireEvent(SjamayeeFacade.RESIZE); },
  parentButton_clickHandler: function()           { this.fireEvent(SjamayeeFacade.GRID_PARENT_SHOW); }, 
  parentAndChildButton_clickHandler: function()   { this.fireEvent(SjamayeeFacade.GRID_PARENTANDCHILD_SHOW); }, 
  childButton_clickHandler: function()            { this.fireEvent(SjamayeeFacade.GRID_CHILD_SHOW); },
  addRelationButton_clickHandler: function()      { this.fireEvent(SjamayeeFacade.RELATION_ADD);  },
  deleteRelationButton_clickHandler: function()   { this.fireEvent(SjamayeeFacade.RELATION_DELETE); },
  editRelationButton_clickHandler: function()     { this.fireEvent(SjamayeeFacade.RELATION_EDIT); },
  extractRelationButton_clickHandler: function()  { this.fireEvent(SjamayeeFacade.RELATION_EXTRACT); },
  copyRelationButton_clickHandler: function()     { this.fireEvent(SjamayeeFacade.RELATION_COPY); },
  pasteRelationButton_clickHandler: function()    { this.fireEvent(SjamayeeFacade.RELATION_PASTE);  },
  undoRelationButton_clickHandler: function()     { this.fireEvent(SjamayeeFacade.RELATION_UNDO); },
  redoRelationButton_clickHandler: function()     { this.fireEvent(SjamayeeFacade.RELATION_REDO); },
  clearBufferButton_clickHandler: function()      { this.fireEvent(SjamayeeFacade.GRID_BUFFER_CLEAR); },
  textButton_clickHandler: function()             { this.fireEvent(SjamayeeFacade.TEXT_EDIT); },
  resetGridButton_clickHandler: function()        { this.fireEvent(SjamayeeFacade.GRID_RESET); }
});
RelationsToolBar.SPECIAL_ID = "Special";
RelationsToolBar.NAVIGATION_BUTTONS_ID = "NavigationButtons";
RelationsToolBar.UPDATE_BUTTONS_ID = "UpdateButtons";
RelationsToolBar.PARENTANDCHILD_BUTTONS_ID = "ParentAndChildButtons";
RelationsToolBar.PARENT_BUTTON_ID = "parentButton";
RelationsToolBar.PARENT_BUTTON_VALUE = "Parent";
RelationsToolBar.PARENTANDCHILD_BUTTON_ID = "parentAndChildButton";
RelationsToolBar.PARENTANDCHILD_BUTTON_VALUE = "Parent | Child";
RelationsToolBar.PARENTANDCHILD_BUTTONS_CLASS_ID = "parentAndChildButtonsTB";
RelationsToolBar.CHILD_BUTTON_ID = "childButton";
RelationsToolBar.CHILD_BUTTON_VALUE = "Child";
RelationsToolBar.RESIZE_BUTTON_ID = "resizeButton";
RelationsToolBar.RESIZE_BUTTON_NORMAL_VALUE = "GRID | grid";
RelationsToolBar.RESIZE_BUTTON_FULL_VALUE = "grid | GRID";
RelationsToolBar.RESIZE_BUTTON_CLASS_ID = "relationsToolBarResizeButton";
RelationsToolBar.ADD_RELATION_BUTTON_ID = "addRelationButton";
RelationsToolBar.ADD_RELATION_BUTTON_VALUE = "+";
RelationsToolBar.DELETE_RELATION_BUTTON_ID = "deleteRelationButton";
RelationsToolBar.DELETE_RELATION_BUTTON_VALUE = "-";
RelationsToolBar.EDIT_RELATION_BUTTON_ID = "editRelationButton";
RelationsToolBar.EDIT_RELATION_BUTTON_VALUE = "Edit";
RelationsToolBar.EXTRACT_RELATION_BUTTON_ID = "extractRelationButton";
RelationsToolBar.EXTRACT_RELATION_BUTTON_VALUE = "Extract";
RelationsToolBar.COPY_RELATION_BUTTON_ID = "copyRelationButton";
RelationsToolBar.COPY_RELATION_BUTTON_VALUE = "Copy";
RelationsToolBar.PASTE_RELATION_BUTTON_ID = "pasteRelationButton";
RelationsToolBar.PASTE_RELATION_BUTTON_VALUE = "Paste";
RelationsToolBar.UNDO_RELATION_BUTTON_ID = "undoRelationButton";
RelationsToolBar.UNDO_RELATION_BUTTON_VALUE = "Undo";
RelationsToolBar.REDO_RELATION_BUTTON_ID = "redoRelationButton";
RelationsToolBar.REDO_RELATION_BUTTON_VALUE = "Redo";
RelationsToolBar.CLEAR_BUFFER_BUTTON_ID = "clearRelationsBufferButton";
RelationsToolBar.CLEAR_BUFFER_BUTTON_VALUE = "Clear Buffer...";
RelationsToolBar.TEXT_BUTTON_ID = "textButton";
RelationsToolBar.TEXT_BUTTON_VALUE = "Edit text...";
RelationsToolBar.TEXT_BUTTON_CLASS_ID = "relationsToolBarTextButton";
RelationsToolBar.RESET_GRID_BUTTON_ID = "resetRelationsGridButton";
RelationsToolBar.RESET_GRID_BUTTON_VALUE = "Reset Grid";
RelationsToolBar.RESET_GRID_BUTTON_CLASS_ID = "relationsToolBarResetButton";

//Abstract
//Class: TextsToolBar
var TextsToolBar = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    var html = '<div id="'+name+ToolBar.COMMON_TOOLBAR_ID+'" class="'+ToolBar.COMMON_TOOLBAR_CLASS_ID+'">'+
               '<input type="text" id="'+name+ToolBar.MESSAGE_TEXT_ID+'" class="'+ToolBar.MESSAGE_TEXT_CLASS_ID+'" value=""/>'+
               '</div>'+
               '<div id="'+name+TextsToolBar.SPECIAL_ID+'" class="'+ToolBar.SPECIAL_CLASS_ID+'">'+
               '<div id="'+name+TextsToolBar.NAVIGATION_BUTTONS_ID+'" class="'+TextsToolBar.NAVIGATION_BUTTONS_CLASS_ID+'">'+
               '<label for="'+name+TextsToolBar.LINE_DISPLAY_ID+'" style="font-size:12px;">'+TextsToolBar.LINE_DISPLAY_LABEL+'</label>'+
               '<input type="text" id="'+name+TextsToolBar.LINE_DISPLAY_ID+'" value="4786" maxlength="4" size="4" readonly="readonly" style="font-size:12px;border:none;margin-top:6px;"/>'+
               '<label for="'+name+TextsToolBar.COLUMN_DISPLAY_ID+'" style="font-size:12px;">'+TextsToolBar.COLUMN_DISPLAY_LABEL+'</label>'+
               '<input type="text" id="'+name+TextsToolBar.COLUMN_DISPLAY_ID+'" value="42" maxlength="3" size="3" readonly="readonly" style="font-size:12px;border:none;margin-top:6px;"/>'+
               '</div>'+
               '<div id="'+name+TextsToolBar.UPDATE_BUTTONS_ID+'" class="'+ToolBar.UPDATE_BUTTONS_CLASS_ID+'">'+
               '<button id="'+name+TextsToolBar.SAVE_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'">'+TextsToolBar.SAVE_BUTTON_VALUE+'</button>'+
               '<button id="'+name+TextsToolBar.CANCEL_BUTTON_ID+'" class="'+ToolBar.BUTTON_CLASS_ID+'" style="margin-left:10px;">'+TextsToolBar.CANCEL_BUTTON_VALUE+'</button>'+
               '<button id="'+name+TextsToolBar.RESIZE_BUTTON_ID+'" class="'+TextsToolBar.RESIZE_BUTTON_CLASS_ID+'">'+TextsToolBar.RESIZE_BUTTON_NORMAL_VALUE+'</button>'+
               '</div>'+
               '</div>';
    this.parent(name,{html:html});
    this.messageText = null;
    this.saveButton = null;
    this.cancelButton = null;
    this.resizeButton = null;
    this.saveButton_clickHandler = this.saveButton_clickHandler.bindWithEvent(this);
    this.cancelButton_clickHandler = this.cancelButton_clickHandler.bindWithEvent(this);
    this.resizeButton_clickHandler = this.resizeButton_clickHandler.bindWithEvent(this);
  },
  initializeChildren: function() {
    var name = this.id;
    this.messageText = $(name+ToolBar.MESSAGE_TEXT_ID);
    this.saveButton = $(name+TextsToolBar.SAVE_BUTTON_ID);
    this.cancelButton = $(name+TextsToolBar.CANCEL_BUTTON_ID);
    this.resizeButton = $(name+TextsToolBar.RESIZE_BUTTON_ID);
  },
  childrenInitialized: function() {
    this.saveButton.addEvent(SjamayeeFacade.CLICK, this.saveButton_clickHandler);
    this.cancelButton.addEvent(SjamayeeFacade.CLICK, this.cancelButton_clickHandler);
    this.resizeButton.addEvent(SjamayeeFacade.CLICK, this.resizeButton_clickHandler);
  },
  saveButton_clickHandler: function()   { this.fireEvent(SjamayeeFacade.TEXT_SAVE); },
  cancelButton_clickHandler: function() { this.fireEvent(SjamayeeFacade.TEXT_CANCEL); },
  resizeButton_clickHandler: function() { this.fireEvent(SjamayeeFacade.TEXT_RESIZE); }
});
TextsToolBar.SPECIAL_ID = "Special";
TextsToolBar.NAVIGATION_BUTTONS_ID = "NavigationButtons";
TextsToolBar.NAVIGATION_BUTTONS_CLASS_ID = "textsNavigationButtonsTB";
TextsToolBar.UPDATE_BUTTONS_ID = "UpdateButtons";
TextsToolBar.RESIZE_BUTTON_ID = "resizeButton";
TextsToolBar.RESIZE_BUTTON_NORMAL_VALUE = "TEXT | text";
TextsToolBar.RESIZE_BUTTON_FULL_VALUE = "text | TEXT";
TextsToolBar.RESIZE_BUTTON_CLASS_ID = "textsToolBarResizeButton";
TextsToolBar.LINE_DISPLAY_ID = "lineDisplay";
TextsToolBar.LINE_DISPLAY_LABEL = "Line:&nbsp;";
TextsToolBar.COLUMN_DISPLAY_ID = "lineDisplay";
TextsToolBar.COLUMN_DISPLAY_LABEL = "Column:&nbsp;";
TextsToolBar.SAVE_BUTTON_ID= "saveButton";
TextsToolBar.SAVE_BUTTON_VALUE= "Save";
TextsToolBar.CANCEL_BUTTON_ID = "cancelButton";
TextsToolBar.CANCEL_BUTTON_VALUE = "Cancel";

//Class: Detail
var Detail = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function() {
    this.parent(Detail.ID);
    this.splitter = null;
    this.detail_blurHandler = this.detail_blurHandler.bindWithEvent(this);
  },
  initializeChildren: function() {
    this.splitter = new DetailSplitter();
    this.addChild(this.splitter);
  },  
  childrenInitialized: function() {
    this.addEvent(SjamayeeFacade.BLUR, this.detail_blurHandler);
  },
  detail_blurHandler: function()  {
    //this.fireEvent(SjamayeeFacade.BLUR);
  }
});
Detail.ID = "detailPane";
Detail.NORMAL_SIZE = 217;

//Class: DetailSplitter
var DetailSplitter = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function() {
    this.parent(DetailSplitter.ID);
    this.left = null;
    this.right = null;
  },
  initializeChildren: function() {
    this.left = new DetailLeft();
    this.addChild(this.left);
    this.right = new DetailRight();   
    this.addChild(this.right);
  }
});
DetailSplitter.ID = "detailSplitter";

//Class: DetailLeft
var DetailLeft = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function() {
    var html = '<div id="'+DataObjectNTD.ID+'" class="'+ObjectNTD.CLASS_ID+'"></div>'+
               '<div id="'+DataParentDetail.ID+'" class="'+ParentDetail.CLASS_ID+'"></div>'+
               '<div id="'+ModelObjectNTD.ID+'" class="'+ObjectNTD.CLASS_ID+'"></div>'+
               '<div id="'+ModelParentDetail.ID+'" class="'+ParentDetail.CLASS_ID+'"></div>'; 
    this.parent(DetailLeft.ID, {html: html});
    this.dataObjectNTD = null;
    this.dataParentDetail = null;
    this.modelObjectNTD = null;
    this.modelParentDetail = null;
  },
  initializeChildren: function() {
    //alert("DetailLeft/initializeChildren");
    this.dataObjectNTD = new DataObjectNTD();
    this.addChild(this.dataObjectNTD);
    this.dataParentDetail = new DataParentDetail();
    this.addChild(this.dataParentDetail);
    this.modelObjectNTD = new ModelObjectNTD();
    this.addChild(this.modelObjectNTD);
    this.modelParentDetail = new ModelParentDetail();
    this.addChild(this.modelParentDetail);
  }
});
DetailLeft.ID = "detailPaneLeft";

//Class: DetailRight
var DetailRight = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function() {
    var html = '<div id="'+DataObjectProperties.ID+'" class="'+ObjectProperties.CLASS_ID+'"></div>'+
               '<div id="'+DataChildDetail.ID+'" class="'+ChildDetail.CLASS_ID+'"></div>'+
               '<div id="'+ModelObjectProperties.ID+'" class="'+ObjectProperties.CLASS_ID+'"></div>'+
               '<div id="'+ModelChildDetail.ID+'" class="'+ChildDetail.CLASS_ID+'"></div>';
    this.parent(DetailRight.ID, {html: html});
    this.dataObjectProperties = null;
    this.dataChildDetail = null;
    this.modelObjectProperties = null;
    this.modelChildDetail = null;
  },
  initializeChildren: function() {
  //alert("DetailRight/initializeChildren");
    this.dataObjectProperties = new DataObjectProperties();
    this.addChild(this.dataObjectProperties);
    this.dataChildDetail = new DataChildDetail();
    this.addChild(this.dataChildDetail);
    this.modelObjectProperties = new ModelObjectProperties();
    this.addChild(this.modelObjectProperties);
    this.modelChildDetail = new ModelChildDetail();
    this.addChild(this.modelChildDetail);
  }
});
DetailRight.ID = "detailPaneRight";

//Abstract
//Class: DetailNTD
var DetailNTD = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    this.parent(name,properties);
    this.header = null;
    this.name = null;
    this.type = null;
    this.description = null;
    this.createdBy = null;
    this.modifiedBy = null;
    this.goButton = null;
    this.noGoButton = null;
    this.ntd_clickHandler = this.ntd_clickHandler.bindWithEvent(this);
    this.ntd_keypressHandler = this.ntd_keypressHandler.bindWithEvent(this);
    this.ntd_keydownHandler = this.ntd_keydownHandler.bindWithEvent(this);
    this.name_clickHandler = this.name_clickHandler.bindWithEvent(this);
    this.name_keypressHandler = this.name_keypressHandler.bindWithEvent(this);
    this.name_keydownHandler = this.name_keydownHandler.bindWithEvent(this);
    this.goButton_clickHandler = this.goButton_clickHandler.bindWithEvent(this);
    this.noGoButton_clickHandler = this.noGoButton_clickHandler.bindWithEvent(this);
  },
  childrenInitialized: function() {
    this.addEvent(SjamayeeFacade.CLICK, this.ntd_clickHandler);
    this.addEvent(SjamayeeFacade.KEYPRESS, this.ntd_keypressHandler);
    this.addEvent(SjamayeeFacade.KEYDOWN, this.ntd_keydownHandler);
    this.name.addEvent(SjamayeeFacade.CLICK, this.name_clickHandler);
    this.name.addEvent(SjamayeeFacade.KEYPRESS, this.name_keypressHandler);
    this.name.addEvent(SjamayeeFacade.KEYDOWN, this.name_keydownHandler);
  },
  getName: function() {
    return this.name.value;
  },
  setName: function(name) {
    this.name.value = name;
  },
  getType: function() {
    return this.type.value;
  },
  setType: function(type) {
    this.type.value = type;
  },
  getDescription: function() {
    return this.description.value;
  },
  setDescription: function(description) {
    this.description.value = description;
  },
  getCreatedBy: function() {
    return this.createdBy.value;
  },
  setCreatedBy: function(createdBy) {
    this.createdBy.value = createdBy;
  },
  getModifiedBy: function() {
    return this.modifiedBy.value;
  },
  setModifiedBy: function(modifiedBy) {
    this.modifiedBy.value = modifiedBy;
  },
  setHeader: function(id, value) {
    $(id).innerHTML = value;
  },
  ntd_clickHandler: function()  {
    this.fireEvent(SjamayeeFacade.ENTITY_NTD_CLICK);
  },
  ntd_keypressHandler: function() {
    this.fireEvent(SjamayeeFacade.ENTITY_NTD_KEYPRESS);
  },
  ntd_keydownHandler: function()  {
    this.fireEvent(SjamayeeFacade.ENTITY_NTD_KEYDOWN);
  },
  name_clickHandler: function() {
    this.fireEvent(SjamayeeFacade.ENTITY_NAME_CLICK);
  },
  name_keypressHandler: function()  {
    this.fireEvent(SjamayeeFacade.ENTITY_NAME_KEYPRESS);
  },
  name_keydownHandler: function() {
    this.fireEvent(SjamayeeFacade.ENTITY_NAME_KEYDOWN);
  },
  goButton_clickHandler: function() {
    this.fireEvent(SjamayeeFacade.GO_NTD_CLICK);
  },
  noGoButton_clickHandler: function() {
    this.fireEvent(SjamayeeFacade.NOGO_NTD_CLICK);
  }
});
//DetailNTD.CLASS_ID = "detailNTD";
DetailNTD.HEADER_CLASS_ID = "detailNTDHeader";
DetailNTD.FIELD_CLASS_ID = "detailNTDField";
DetailNTD.FIELD_LABEL__CLASS_ID = "detailNTDFieldLabel";
DetailNTD.NAME_FIELD_CLASS_ID = "detailNTDTextFieldName";
DetailNTD.TYPE_FIELD_CLASS_ID = "detailNTDTextFieldType";
DetailNTD.DESC_FIELD_CLASS_ID = "detailNTDTextFieldDescription";
DetailNTD.CBY_FIELD_CLASS_ID = "detailNTDTextFieldCreatedBy";
DetailNTD.MBY_FIELD_CLASS_ID = "detailNTDTextFieldModifiedBy";
DetailNTD.NAME_FIELD_LABEL = "Name";
DetailNTD.TYPE_FIELD_LABEL = "Type";
DetailNTD.DESC_FIELD_LABEL = "Description";
DetailNTD.CBY_FIELD_LABEL = "Created By";
DetailNTD.MBY_FIELD_LABEL = "Modified By";
DetailNTD.BUTTONS_CLASS_ID = "detailNTDButtons";
DetailNTD.GO_BUTTON_CLASS_ID = "detailNTDGoButton";
DetailNTD.NOGO_BUTTON_CLASS_ID = "detailNTDNoGoButton";
DetailNTD.SAVE_BUTTON_LABEL = "Save";
DetailNTD.SALESFORCE_BUTTON_LABEL = "Salesforce";
DetailNTD.CANCEL_BUTTON_LABEL = "Cancel";

//Abstract
//Class: ObjectNTD
var ObjectNTD = new Class({
  Extends: DetailNTD,
  initialize: function(name,properties) {
    var html = '<div id="'+name+ObjectNTD.HEADER_ID+'" class="'+DetailNTD.HEADER_CLASS_ID+'">'+ObjectNTD.HEADER_VALUE+'</div>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ObjectNTD.NAME_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.NAME_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ObjectNTD.NAME_ID+'" class="'+DetailNTD.NAME_FIELD_CLASS_ID+'">Sjamayee is in the house! The time is now!</div>'+
               '</div><br/>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ObjectNTD.TYPE_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.TYPE_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ObjectNTD.TYPE_ID+'" class="'+DetailNTD.TYPE_FIELD_CLASS_ID+'">Lead</div>'+
               '</div><br/>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ObjectNTD.DESC_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.DESC_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ObjectNTD.DESC_ID+'" class="'+DetailNTD.DESC_FIELD_CLASS_ID+'">Sjamayee is now *** Object *** jssjsj dldldld mfmfmfmf kekeke mdmdmdm kqkqkqk l lsslsl 123456790 14226 djdjjd jkfkfkfkf skksks lqlqlql zyzzyu hdhdhd jfff jfjjf fjfjfjf vcvc dsds 123</div>'+
               '</div>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ObjectNTD.CBY_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.CBY_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ObjectNTD.CBY_ID+'" class="'+DetailNTD.CBY_FIELD_CLASS_ID+'">Jan Creemers 2011-10-12 13:54:07</div>'+
               '</div>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ObjectNTD.MBY_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.MBY_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ObjectNTD.MBY_ID+'" class="'+DetailNTD.MBY_FIELD_CLASS_ID+'">Alma VandenBroeck 2011-10-17 23:14:12</div>'+
               '</div><br/>'+
               '<div id="'+ObjectNTD.BUTTONS_ID+'" class="'+DetailNTD.BUTTONS_CLASS_ID+'">'+
               '<button id="'+name+ObjectNTD.GO_BUTTON_ID+'" type="button" class="'+DetailNTD.GO_BUTTON_CLASS_ID+'">'+DetailNTD.SALESFORCE_BUTTON_LABEL+'</button>'+
               '<button id="'+name+ObjectNTD.NOGO_BUTTON_ID+'" type="button" class="'+DetailNTD.NOGO_BUTTON_CLASS_ID+'">'+DetailNTD.CANCEL_BUTTON_LABEL+'</button>'+
               '</div>';
    this.parent(name,{html:html});
    this.buttons = null;
  },
  initializeChildren: function() {
    var name = this.id;
    this.header = $(name+ObjectNTD.HEADER_ID);
    this.name = $(name+ObjectNTD.NAME_ID);
    this.type = $(name+ObjectNTD.TYPE_ID);
    this.description = $(name+ObjectNTD.DESC_ID);
    this.createdBy = $(name+ObjectNTD.CBY_ID);
    this.modifiedBy = $(name+ObjectNTD.MBY_ID);
    this.buttons = $(name+ObjectNTD.BUTTONS_ID);
    this.goButton = $(name+ObjectNTD.GO_BUTTON_ID);
    this.noGoButton = $(name+ObjectNTD.NOGO_BUTTON_ID);
  },
  childrenInitialized: function() {
    this.goButton.addEvent(SjamayeeFacade.CLICK, this.goButton_clickHandler);
    this.noGoButton.addEvent(SjamayeeFacade.CLICK, this.noGoButton_clickHandler);
  }
});
ObjectNTD.CLASS_ID = "objectNTD";
//ObjectNTD.HEADER_CLASS_ID = "objectNTDHeader";
ObjectNTD.HEADER_ID = "NTDHeader";
ObjectNTD.HEADER_VALUE = "Object";
ObjectNTD.NAME_ID = "NTDName";
ObjectNTD.TYPE_ID = "NTDType";
ObjectNTD.DESC_ID = "NTDDescription";
ObjectNTD.CBY_ID = "NTDCreatedBy";
ObjectNTD.MBY_ID = "NTDModifiedBy";
ObjectNTD.BUTTONS_ID = "NTDButtons";
ObjectNTD.GO_BUTTON_ID = "NTDGoButton";
ObjectNTD.NOGO_BUTTON_ID = "NTDNogoButton";

//Class: DataObjectNTD
var DataObjectNTD = new Class({
  Extends: ObjectNTD,
  initialize: function() {
    this.parent(DataObjectNTD.ID);
  }
});
DataObjectNTD.ID = "dataObjectNTD";
//DataObjectNTD.HEADER_ID = DataObjectNTD.ID+ObjectNTD.HEADER_ID;

//Class: ModelObjectNTD
var ModelObjectNTD = new Class({
  Extends: ObjectNTD,
  initialize: function() {
    this.parent(ModelObjectNTD.ID);
  }
});
ModelObjectNTD.ID = "modelObjectNTD";
//ModelObjectNTD.HEADER_ID = ModelObjectNTD.ID+ObjectNTD.HEADER_ID;

//Abstract
//Class: ObjectProperties
var ObjectProperties = new Class({
  Extends: AttributeListUIComponent,
  initialize: function(name,properties) {
    this.parent(name,{header_value: ObjectProperties.HEADER_VALUE});
  }
});
ObjectProperties.CLASS_ID = "objectProperties";
ObjectProperties.HEADER_VALUE = "Properties";

//Class: DataObjectProperties
var DataObjectProperties = new Class({
  Extends: ObjectProperties,
  initialize: function() {
    this.parent(DataObjectProperties.ID);
  }
/*,
  //list_clickHandler: function() { alert("DataObjectProperties/list_clickHandler"); },
  keydownHandler: function(evt) {
    var subEvent = this.parent(evt);
    //this.fireEvent(SjamayeeFacade.XXXXX_DATA_KEYDOWN, subEvent);
    return subEvent;  
  }*/
});
DataObjectProperties.ID = "dataObjectProperties";
//DataObjectProperties.HEADER_ID = DataObjectProperties.ID+AttributeListUIComponent.HEADER_ID;

//Class: ModelObjectProperties
var ModelObjectProperties = new Class({
  Extends: ObjectProperties,
  initialize: function() {
    this.parent(ModelObjectProperties.ID);
  }
/*,
  //list_clickHandler: function() { alert("ModelObjectProperties/list_clickHandler"); },
  keydownHandler: function(evt) {
    var subEvent = this.parent(evt);
    //this.fireEvent(SjamayeeFacade.XXXXX_MODEL_KEYDOWN, subEvent);
    return subEvent;  
  }*/
});
ModelObjectProperties.ID = "modelObjectProperties";
//ModelObjectProperties.HEADER_ID = ModelObjectProperties.ID+AttributeListUIComponent.HEADER_ID;

//Abstract
//Class: ParentDetail
var ParentDetail = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    /*var html = '<div id="'+name+ParentNTD.ID+'" class="'+ParentNTD.CLASS_ID+'"></div>'+
               '<div id="'+name+ParentProperties.ID+'" class="'+ParentProperties.CLASS_ID+'"></div>';*/
    this.parent(name,properties); //{html:html});
    this.ntd = null;
    this.properties = null;
  }
});
//ParentDetail.ID = "parentDetail";
ParentDetail.CLASS_ID = "parentDetail";

//Class: DataParentDetail
var DataParentDetail = new Class({
  Extends: ParentDetail,
/*
  initialize: function() {
    this.parent(DataParentDetail.ID);
  }
*/
  initialize: function() {
    var html = '<div id="'+DataParentNTD.ID+'" class="'+ParentNTD.CLASS_ID+'"></div>'+
               '<div id="'+DataParentProperties.ID+'" class="'+ParentProperties.CLASS_ID+'"></div>';
    this.parent(DataParentDetail.ID,{html:html});
  },  
  initializeChildren: function() {
    //alert("DataParentDetail/initializeChildren");
    this.ntd = new DataParentNTD();
    this.addChild(this.ntd);
    this.properties = new DataParentProperties();
    this.addChild(this.properties);
  }
});
DataParentDetail.ID = "dataParentDetail";

//Class: ModelParentDetail
var ModelParentDetail = new Class({
  Extends: ParentDetail,
/*
  initialize: function() {
    this.parent(ModelParentDetail.ID);
  }
*/
  initialize: function() {
    var html = '<div id="'+ModelParentNTD.ID+'" class="'+ParentNTD.CLASS_ID+'"></div>'+
               '<div id="'+ModelParentProperties.ID+'" class="'+ParentProperties.CLASS_ID+'"></div>';
    this.parent(ModelParentDetail.ID,{html:html});
  },
  initializeChildren: function() {
    //alert("ModelParentDetail/initializeChildren");
    this.ntd = new ModelParentNTD();
    this.addChild(this.ntd);
    this.properties = new ModelParentProperties();
    this.addChild(this.properties);
  }
});
ModelParentDetail.ID = "modelParentDetail";

//Abstract
//Class: ParentNTD
var ParentNTD = new Class({
  Extends: DetailNTD,
  initialize: function(name,properties) {
    var html = '<div id="'+name+ParentNTD.HEADER_ID+'" class="'+DetailNTD.HEADER_CLASS_ID+'">'+ParentNTD.HEADER_VALUE+'</div>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ParentNTD.NAME_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.NAME_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ParentNTD.NAME_ID+'" class="'+DetailNTD.NAME_FIELD_CLASS_ID+'">Parent *** Sjamayee *** Parent 1234567890 123456789012 345678901234 567890ABC DEFGHIJKLMNO</div>'+
               '</div><br/>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ParentNTD.TYPE_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.TYPE_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ParentNTD.TYPE_ID+'" class="'+DetailNTD.TYPE_FIELD_CLASS_ID+'">Opportunity</div>'+
               '</div><br/>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ParentNTD.DESC_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.DESC_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ParentNTD.DESC_ID+'" class="'+DetailNTD.DESC_FIELD_CLASS_ID+'">Sjamayee is now *** Parent ***jssjsj dldldld mfmfmfmf kek 111 22 33 44 55 hqhhshshssh slsl 123456790 14226  aez hdhd mqmmq qlqlql zyzzyu hdhdhd jfff jfjjf fjfjfjf vcvc dsds 123</div>'+
               '</div>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ParentNTD.CBY_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.CBY_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ParentNTD.CBY_ID+'" class="'+DetailNTD.CBY_FIELD_CLASS_ID+'">Jan Creemers 2011-10-12 13:54:07</div>'+
               '</div>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ParentNTD.MBY_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.MBY_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ParentNTD.CBY_ID+'" class="'+DetailNTD.CBY_FIELD_CLASS_ID+'">Bill Gates 2010-11-15 14:14:17</div>'+
               '</div><br/>'+
               '<div id="'+name+ParentNTD.BUTTONS_ID+'" class="'+DetailNTD.BUTTONS_CLASS_ID+'">'+
               '<button id="'+name+ParentNTD.GO_BUTTON_ID+'" type="button" class="'+DetailNTD.GO_BUTTON_CLASS_ID+'">'+DetailNTD.SALESFORCE_BUTTON_LABEL+'</button>'+
               '<button id="'+name+ParentNTD.NOGO_BUTTON_ID+'" type="button" class="'+DetailNTD.NOGO_BUTTON_CLASS_ID+'">'+DetailNTD.CANCEL_BUTTON_LABEL+'</button>'+
               '</div>';
    this.parent(name,{html:html});
    this.buttons = null;
  },
  initializeChildren: function() {
    var name = this.id;
    this.name = $(name+ParentNTD.NAME_ID);
    this.type = $(name+ParentNTD.TYPE_ID);
    this.description = $(name+ParentNTD.DESC_ID);
    this.createdBy = $(name+ParentNTD.CBY_ID);
    this.modifiedBy = $(name+ParentNTD.MBY_ID);
    this.buttons = $(name+ParentNTD.BUTTONS_ID);
    this.goButton = $(name+ParentNTD.GO_BUTTON_ID);
    this.noGoButton = $(name+ParentNTD.NOGO_BUTTON_ID);
  }
});
//ParentNTD.ID = "parentNTD";
ParentNTD.CLASS_ID = "parentNTD";
//ParentNTD.HEADER_CLASS_ID = "parentNTDHeader";
ParentNTD.HEADER_ID = "NTDHeader";
ParentNTD.HEADER_VALUE = "Parent";
ParentNTD.NAME_ID = "NTDName";
ParentNTD.TYPE_ID = "NTDType";
ParentNTD.DESC_ID = "NTDDescription";
ParentNTD.CBY_ID = "NTDCreatedBy";
ParentNTD.MBY_ID = "NTDModifiedBy";
ParentNTD.BUTTONS_ID = "NTDButtons";
ParentNTD.GO_BUTTON_ID = "NTDGoButton";
ParentNTD.NOGO_BUTTON_ID = "NTDNoGoButton";

//Class: DataParentNTD
var DataParentNTD = new Class({
  Extends: ParentNTD,
  initialize: function() {
    this.parent(DataParentNTD.ID);
  }
});
DataParentNTD.ID = "dataParentNTD";
//DataParentNTD.HEADER_ID = DataParentNTD.ID+ParentNTD.HEADER_ID;

//Class: ModelParentNTD
var ModelParentNTD = new Class({
  Extends: ParentNTD,
  initialize: function() {
    this.parent(ModelParentNTD.ID);
  }
});
ModelParentNTD.ID = "modelParentNTD";
//ModelParentNTD.HEADER_ID = ModelParentNTD.ID+ParentNTD.HEADER_ID;

//Abstract
//Class: ParentProperties
var ParentProperties = new Class({
  Extends: AttributeListUIComponent,
  initialize: function(name,properties) {
    this.parent(name,{header_value: ParentProperties.HEADER_VALUE});
  }
});
ParentProperties.ID = "parentProperties";
ParentProperties.CLASS_ID = "parentProperties";
ParentProperties.HEADER_VALUE = "Properties";

//Class: DataParentProperties
var DataParentProperties = new Class({
  Extends: ParentProperties,
  initialize: function() {
    this.parent(DataParentProperties.ID);
  }
/*,
  //list_clickHandler: function() { alert("DataParentProperties/list_clickHandler"); },
  keydownHandler: function(evt) {
    var subEvent = this.parent(evt);
    //this.fireEvent(SjamayeeFacade.XXXXX_DATA_KEYDOWN, subEvent);
    return subEvent;  
  }*/
});
DataParentProperties.ID = "dataParentProperties";
//DataParentProperties.HEADER_ID = DataParentProperties.ID+AttributeListUIComponent.HEADER_ID;

//Class: ModelParentProperties
var ModelParentProperties = new Class({
  Extends: ParentProperties,
  initialize: function() {
    this.parent(ModelParentProperties.ID);
  }
/*,
  //list_clickHandler: function() { alert("ModelParentProperties/list_clickHandler"); },
  keydownHandler: function(evt) {
    var subEvent = this.parent(evt);
    //this.fireEvent(SjamayeeFacade.XXXXX_MODEL_KEYDOWN, subEvent);
    return subEvent;  
  }*/
});
ModelParentProperties.ID = "modelParentProperties";
//ModelParentProperties.HEADER_ID = ModelParentProperties.ID+AttributeListUIComponent.HEADER_ID;

//Abstract
//Class: ChildDetail
var ChildDetail = new Class({
  Extends: SjamayeeUIComponent,
  initialize: function(name,properties) {
    /*var html = '<div id="'+name+ChildNTD.ID+'" class="'+ChildNTD.CLASS_ID+'"></div>'+
               '<div id="'+name+ChildProperties.ID+'" class="'+ChildProperties.CLASS_ID+'"></div>';*/
    this.parent(name,properties); //{html:html});
    this.ntd = null;
    this.properties = null;
  }
});
ChildDetail.CLASS_ID = "childDetail";

//Class: DataChildDetail
var DataChildDetail = new Class({
  Extends: ChildDetail,
  initialize: function() {
    var html = '<div id="'+DataChildNTD.ID+'" class="'+ChildNTD.CLASS_ID+'"></div>'+
               '<div id="'+DataChildProperties.ID+'" class="'+ChildProperties.CLASS_ID+'"></div>';
    this.parent(DataChildDetail.ID,{html:html});
  },
  initializeChildren: function() {
    this.ntd = new DataChildNTD();
    this.addChild(this.ntd);
    this.properties = new DataChildProperties();
    this.addChild(this.properties);
  }
});
DataChildDetail.ID = "dataChildDetail";

//Class: ModelChildDetail
var ModelChildDetail = new Class({
  Extends: ChildDetail,
/*
  initialize: function() {
    this.parent(ModelChildDetail.ID);
  }
*/
  initialize: function() {
    var html = '<div id="'+ModelChildNTD.ID+'" class="'+ChildNTD.CLASS_ID+'"></div>'+
               '<div id="'+ModelChildProperties.ID+'" class="'+ChildProperties.CLASS_ID+'"></div>';
    this.parent(ModelChildDetail.ID,{html:html});
  },
  initializeChildren: function() {
    this.ntd = new ModelChildNTD();
    this.addChild(this.ntd);
    this.properties = new ModelChildProperties();
    this.addChild(this.properties);
  }
});
ModelChildDetail.ID = "modelChildDetail";

//Abstract
//Class: ChildNTD
var ChildNTD = new Class({
  Extends: DetailNTD,
  initialize: function(name,properties) {
    var html = '<div id="'+name+ChildNTD.HEADER_ID+'" class="'+DetailNTD.HEADER_CLASS_ID+'">'+ChildNTD.HEADER_VALUE+'</div>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ChildNTD.NAME_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.NAME_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ChildNTD.NAME_ID+'" class="'+DetailNTD.NAME_FIELD_CLASS_ID+'">Child *** Sjamayee *** Sjamayee *** Child 123456 78 90123 45 6789 012345 678 90</div>'+
               '</div><br/>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ChildNTD.TYPE_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.TYPE_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ChildNTD.TYPE_ID+'" class="'+DetailNTD.TYPE_FIELD_CLASS_ID+'">Account</div>'+
               '</div><br/>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ChildNTD.DESC_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.DESC_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ChildNTD.DESC_ID+'" class="'+DetailNTD.DESC_FIELD_CLASS_ID+'">Sjamayee is now *** CHILD *** CHILD *** CHILD *** jssjsj dldldld mfmfmfmf kekeke mdmdmdm kqkqkqk l lsslsl 123456790 14226 djdjjd jkfkfk</div>'+
               '</div>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ChildNTD.CBY_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.CBY_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ChildNTD.CBY_ID+'" class="'+DetailNTD.CBY_FIELD_CLASS_ID+'">Jan Creemers 2011-10-12 13:54:07</div>'+
               '</div>'+
               '<div class="'+DetailNTD.FIELD_CLASS_ID+'">'+
               ' <label for="'+name+ChildNTD.MBY_ID+'" class="'+DetailNTD.FIELD_LABEL__CLASS_ID+'">'+DetailNTD.MBY_FIELD_LABEL+'</label>'+
               ' <div id="'+name+ChildNTD.CBY_ID+'" class="'+DetailNTD.MBY_FIELD_CLASS_ID+'">Steve Jobs 2009-02-10 03:14:27</div>'+
               '</div><br/>'+
               '<div id="'+ChildNTD.BUTTONS_ID+'" class="'+DetailNTD.BUTTONS_CLASS_ID+'">'+
               '<button id="'+name+ChildNTD.GO_BUTTON_ID+'" type="button" class="'+DetailNTD.GO_BUTTON_CLASS_ID+'">'+DetailNTD.SALESFORCE_BUTTON_LABEL+'</button>'+
               '<button id="'+name+ChildNTD.NOGO_BUTTON_ID+'" type="button" class="'+DetailNTD.NOGO_BUTTON_CLASS_ID+'">'+DetailNTD.CANCEL_BUTTON_LABEL+'</button>'+
               '</div>';
    this.parent(name,{html:html});
    this.buttons = null;
  },
  initializeChildren: function() {
    var name = this.id;
    this.name = $(name+ChildNTD.NAME_ID);
    this.type = $(name+ChildNTD.TYPE_ID);
    this.description = $(name+ChildNTD.DESC_ID);
    this.createdBy = $(name+ChildNTD.CBY_ID);
    this.modifiedBy = $(name+ChildNTD.MBY_ID);
    this.buttons = $(name+ChildNTD.BUTTONS_ID);
    this.goButton = $(name+ChildNTD.GO_BUTTON_ID);
    this.noGoButton = $(name+ChildNTD.NOGO_BUTTON_ID);
  }
});
//ChildNTD.ID = "childNTD";
ChildNTD.CLASS_ID = "childNTD";
//ChildNTD.HEADER_CLASS_ID = "childNTDHeader";
ChildNTD.HEADER_ID = "NTDHeader";
ChildNTD.HEADER_VALUE = "Child";
ChildNTD.NAME_ID = "NTDName";
ChildNTD.TYPE_ID = "NTDType";
ChildNTD.DESC_ID = "NTDDescription";
ChildNTD.CBY_ID = "NTDCreatedBy";
ChildNTD.MBY_ID = "NTDModifiedBy";
ChildNTD.BUTTONS_ID = "NTDButtons";
ChildNTD.GO_BUTTON_ID = "NTDGoButton";
ChildNTD.NOGO_BUTTON_ID = "NTDNoGoButton";

//Class: DataChildNTD
var DataChildNTD = new Class({
  Extends: ChildNTD,
  initialize: function() {
    this.parent(DataChildNTD.ID);
    this.buttons = null;
  }
});
DataChildNTD.ID = "dataChildNTD";
DataChildNTD.HEADER_ID = DataChildNTD.ID+ChildNTD.HEADER_ID;

//Class: ModelChildNTD
var ModelChildNTD = new Class({
  Extends: ChildNTD,
  initialize: function() {
    this.parent(ModelChildNTD.ID);
    this.buttons = null;
  }
});
ModelChildNTD.ID = "modelChildNTD";
ModelChildNTD.HEADER_ID = ModelChildNTD.ID+ChildNTD.HEADER_ID;

//Abstract
//Class: ChildProperties
var ChildProperties = new Class({
  Extends: AttributeListUIComponent,
  initialize: function(name,properties) {
    this.parent(name,{header_value: ChildProperties.HEADER_VALUE});
  }
});
ChildProperties.ID = "childProperties";
ChildProperties.CLASS_ID = "childProperties";
ChildProperties.HEADER_VALUE = "Properties";

//Class: DataChildProperties
var DataChildProperties = new Class({
  Extends: ChildProperties,
  initialize: function() {
    this.parent(DataChildProperties.ID);
  }
/*,
  //list_clickHandler: function() { alert("DataChildProperties/list_clickHandler"); },
  keydownHandler: function(evt) {
    var subEvent = this.parent(evt);
    //this.fireEvent(SjamayeeFacade.XXXXX_DATA_KEYDOWN, subEvent);
    return subEvent;  
  }*/
});
DataChildProperties.ID = "dataChildProperties";
DataChildProperties.HEADER_ID = DataChildProperties.ID+AttributeListUIComponent.HEADER_ID;

//Class: ModelChildProperties
var ModelChildProperties = new Class({
  Extends: ChildProperties,
  initialize: function() {
    this.parent(ModelChildProperties.ID);
  }
/*,
  //list_clickHandler: function() { alert("ModelChildProperties/list_clickHandler"); },
  keydownHandler: function(evt) {
    var subEvent = this.parent(evt);
    //this.fireEvent(SjamayeeFacade.XXXXX_MODEL_KEYDOWN, subEvent);
    return subEvent;  
  }*/
});
ModelChildProperties.ID = "modelChildProperties";
ModelChildProperties.HEADER_ID = ModelChildProperties.ID+AttributeListUIComponent.HEADER_ID;

////////////////////////////////////////////////////////
//Mediators ////////////////////////////////////////////
////////////////////////////////////////////////////////
//Abstract
//Class: SjamayeeMediator
var SjamayeeMediator = new Class({
  Extends: Mediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.state = SjamayeeMediator.STATE_LIST;
    this.id = name;
  },
  getState: function() {
    return this.state;
  },
  setState: function(state) {
    if (state) {
      this.state = state;
    }
  },
  isData: function() {
    return (this.isOlistData() || this.isGridData())?true:false;
  },
  isModel: function() {
    return (this.isOlistModel() || this.isGridModel())?true:false;
  },
  isOlistData: function() {
    var dataModelIndex = this.getCurrentDataModelIndex();
    return (dataModelIndex == Header.DATA_OBJECTS_INDEX)?true:false;
  },
  isGridData: function() {
    var dataModelIndex = this.getCurrentDataModelIndex();
    return (dataModelIndex == Header.DATA_RELATIONS_INDEX)?true:false;
  },
  isOlistModel: function() {
    var dataModelIndex = this.getCurrentDataModelIndex();
    return (dataModelIndex == Header.MODEL_OBJECTS_INDEX)?true:false;
  },
  isGridModel: function() {
    var dataModelIndex = this.getCurrentDataModelIndex();
    return (dataModelIndex == Header.MODEL_RELATIONS_INDEX)?true:false;
  },
  getCurrentDataModelIndex: function() {
    return SjamayeeFacade.getInstance().currentDataModelIndex;
  },
  setCurrentDataModelIndex: function(currentDataModelIndex) {
    SjamayeeFacade.getInstance().currentDataModelIndex = currentDataModelIndex;
  },
  getSetting: function() {
    if (SjamayeeFacade.getInstance().setting === null) {
      SjamayeeFacade.getInstance().setting = Setting.getByName(SjamayeeFacade.getInstance().settingName);
    }
    return SjamayeeFacade.getInstance().setting;
  },
  setSettingName: function(settingName) {
    if (SjamayeeFacade.getInstance().settingName) {
      if (SjamayeeFacade.getInstance().settingName != settingName) {
        SjamayeeFacade.getInstance().setting = null;
      }
    }
    SjamayeeFacade.getInstance().settingName = settingName;
  },
  //Abstract
  hide: function() { return undefined; }
});
SjamayeeMediator.STATE_LIST = "LIST";
SjamayeeMediator.STATE_TEXT = "TEXT";

//Class: HeaderMediator
var HeaderMediator = new Class({
  Extends: SjamayeeMediator,
  initialize: function(viewComponent) {
    this.parent(HeaderMediator.ID,viewComponent);
    var header = this.getViewComponent();
    this.facade.registerMediator(new DataObjectsHeaderMediator(header.dataObjectsHeader));
    this.facade.registerMediator(new DataRelationsHeaderMediator(header.dataRelationsHeader));
    if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {   
      this.facade.registerMediator(new ModelObjectsHeaderMediator(header.modelObjectsHeader));
      this.facade.registerMediator(new ModelObjectsTextsHeaderMediator(header.modelObjectsTextsHeader));
      this.facade.registerMediator(new ModelRelationsHeaderMediator(header.modelRelationsHeader));
      this.facade.registerMediator(new ModelRelationsTextsHeaderMediator(header.modelRelationsTextsHeader));
    }
    this.onDataModelChange = this.onDataModelChange.bindWithEvent(this);
    this.onSettingChange = this.onSettingChange.bindWithEvent(this);
    this.onSettingClick = this.onSettingClick.bindWithEvent(this);
    this.onHelpClick = this.onHelpClick.bindWithEvent(this);
    header.addEvent(SjamayeeFacade.DATA_MODEL_CHANGE, this.onDataModelChange);    
    header.addEvent(SjamayeeFacade.SETTING_CHANGE, this.onSettingChange);
    header.addEvent(SjamayeeFacade.SETTING_CLICK, this.onSettingClick);
    header.addEvent(SjamayeeFacade.HELP_CLICK, this.onHelpClick);
    //Initialize SelectLists.
    header.settingSelect.innerHTML = Setting.getSettingOptions();
  },
  onDataModelChange: function() {
    var header = this.getViewComponent();
    var dataModelSelection = header.dataModelSelect.value;
    var dataModelSelectedIndex = header.dataModelSelect.selectedIndex;
    var properties = { "value": dataModelSelection, "index": dataModelSelectedIndex };
    this.dataModelChange(properties);
  },
  onSettingChange: function() { this.settingChange(); },
  onSettingClick: function()  { this.sendNotification(SjamayeeFacade.SETTING_CLICK); },
  onHelpClick: function()     { this.sendNotification(SjamayeeFacade.HELP_CLICK); },

  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_DATA_SHOW,
      SjamayeeFacade.GRID_DATA_SHOW,
      SjamayeeFacade.OLIST_MODEL_HEADER_SHOW,
      SjamayeeFacade.GRID_MODEL_HEADER_SHOW,
      SjamayeeFacade.DATA_MODEL_CHANGE,
      SjamayeeFacade.SETTING_CLICK,
      SjamayeeFacade.HELP_CLICK
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var header = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_DATA_SHOW:
      //var selectedIndex = $(Header.DATA_MODEL_SELECT_ID).selectedIndex;
      //this.setEnvironment(Header.DATA_SELECT_OPTION_VALUE);
      var selectedIndex = header.dataModelSelect.selectedIndex;     
      if (selectedIndex != Header.DATA_OBJECTS_INDEX) {
        //$(Header.DATA_MODEL_SELECT_ID).selectedIndex = Header.DATA_OBJECTS_INDEX;
        header.dataModelSelect.selectedIndex = Header.DATA_OBJECTS_INDEX;
      }
      break;
      case SjamayeeFacade.GRID_DATA_SHOW:
      //var selectedIndex = $(Header.DATA_MODEL_SELECT_ID).selectedIndex;
      //this.setEnvironment(Header.DATA_SELECT_OPTION_VALUE);
      var selectedIndex = header.dataModelSelect.selectedIndex;     
      if (selectedIndex != Header.DATA_RELATIONS_INDEX) {
        //$(Header.DATA_MODEL_SELECT_ID).selectedIndex = Header.DATA_RELATIONS_INDEX;
        header.dataModelSelect.selectedIndex = Header.DATA_RELATIONS_INDEX;
      }
      break;
      case SjamayeeFacade.OLIST_MODEL_HEADER_SHOW:
      //var selectedIndex = $(Header.DATA_MODEL_SELECT_ID).selectedIndex;
      //this.setEnvironment(Header.MODEL_SELECT_OPTION_VALUE);
      var selectedIndex = header.dataModelSelect.selectedIndex;     
      if (selectedIndex != Header.MODEL_OBJECTS_INDEX) {
        //$(Header.DATA_MODEL_SELECT_ID).selectedIndex = Header.MODEL_OBJECTS_INDEX;
        header.dataModelSelect.selectedIndex = Header.MODEL_OBJECTS_INDEX;
      }
      break;
      case SjamayeeFacade.GRID_MODEL_HEADER_SHOW:
      //var selectedIndex = $(Header.DATA_MODEL_SELECT_ID).selectedIndex;
      //this.setEnvironment(Header.MODEL_SELECT_OPTION_VALUE);
      var selectedIndex = header.dataModelSelect.selectedIndex;     
      if (selectedIndex != Header.MODEL_RELATIONS_INDEX) {
        //$(Header.DATA_MODEL_SELECT_ID).selectedIndex = Header.MODEL_RELATIONS_INDEX;
        header.dataModelSelect.selectedIndex = Header.MODEL_RELATIONS_INDEX;
      }
      break;
      case SjamayeeFacade.DATA_MODEL_CHANGE:
      var properties = note.getBody();
      this.dataModelChange(properties);
      break;
      case SjamayeeFacade.SETTING_CLICK:
      break;
      case SjamayeeFacade.HELP_CLICK:
      break;
    }
  },
  dataModelChange: function(properties) {
    var state = null;
    var dataModelSelection = null;
    var dataModelSelectedIndex = null;
    if (properties) {
      if (properties.state !== undefined) { state = properties.state; }
      if (properties.value !== undefined) { dataModelSelection = properties.value; }
      if (properties.index !== undefined) { dataModelSelectedIndex = properties.index; }
    }   
    //Eventually - Save TextEditor changes?
    if (dataModelSelectedIndex !== null) {
      var currentIndex = this.getCurrentDataModelIndex();
      var newIndex = dataModelSelectedIndex;
      if (currentIndex != newIndex) {
        //var gridListMediator = null;
        var textsEditorMediator = null;
        switch (currentIndex) {
          case Header.DATA_OBJECTS_INDEX:
          //gridListMediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);          
          break;
          case Header.DATA_RELATIONS_INDEX:
          //gridListMediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
          break;
          case Header.MODEL_OBJECTS_INDEX:
          //gridListMediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
          textsEditorMediator = this.facade.retrieveMediator(ModelObjectsTextsEditorMediator.ID);
          break;
          case Header.MODEL_RELATIONS_INDEX:
          //gridListMediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
          textsEditorMediator = this.facade.retrieveMediator(ModelRelationsTextsEditorMediator.ID);
          break;
        }
        if (textsEditorMediator) {
          if (textsEditorMediator.getTextHash() != textsEditorMediator.getInitialTextHash()) {
          //alert("Save changes?"+"\ninitialHash: "+textsEditorMediator.getInitialTextHash()+"\ncurrentHash: "+textsEditorMediator.getTextHash());
          }
        }
        this.setCurrentDataModelIndex(newIndex);        
      }
    }
    //Switch to new environment!
    if (this.isData()) {
      if (this.isOlistData()) {
        this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      } else if (this.isGridData()) {
        this.sendNotification(SjamayeeFacade.GRID_DATA_SHOW);
      }
    } else if (this.isModel()) {
      var properties = { "state": state };
      if (this.isOlistModel()) {
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW,properties);
      } else if (this.isGridModel()) {
        this.sendNotification(SjamayeeFacade.GRID_MODEL_SHOW,properties);
      }
    }
    return this;
  },
  settingChange: function() {
    var header = this.getViewComponent();   
    var settingName = header.settingSelect.value;
    this.setSettingName(settingName);
    return this;
  }
});
HeaderMediator.ID = "HeaderMediator";

//Abstract
//Class: ObjectsHeaderMediator
var ObjectsHeaderMediator = new Class({
  Extends: SjamayeeMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.listMediator = null;
    this.typeNameSelected = null;
    this.typeSelected = null;
    //this.onRelationsMouseover = this.onRelationsMouseover.bindWithEvent(this);
    this.onObjectsRefOpChange = this.onObjectsRefOpChange.bindWithEvent(this);
    this.onObjectsTypeChange = this.onObjectsTypeChange.bindWithEvent(this);
    this.onObjectsFilterClick = this.onObjectsFilterClick.bindWithEvent(this);
    this.onObjectsFilterChange = this.onObjectsFilterChange.bindWithEvent(this);
    this.onObjectsFilterCaseClick = this.onObjectsFilterCaseClick.bindWithEvent(this);
    var header = this.getViewComponent();
    //header.addEvent(SjamayeeFacade.GRID_MOUSEOVER, this.onRelationsMouseover);
    header.addEvent(SjamayeeFacade.OLIST_REFOP_CHANGE, this.onObjectsRefOpChange);
    header.addEvent(SjamayeeFacade.OLIST_TYPE_CHANGE, this.onObjectsTypeChange);
    header.addEvent(SjamayeeFacade.OLIST_FILTER_CLICK, this.onObjectsFilterClick);
    header.addEvent(SjamayeeFacade.OLIST_FILTER_CHANGE, this.onObjectsFilterChange);
    header.addEvent(SjamayeeFacade.OLIST_FILTER_CASE_CLICK, this.onObjectsFilterCaseClick);
    //Initialize SelectLists.
    header.typeSelect.innerHTML = Type.getTypeOptions();
  },
  //onRelationsMouseover: function()  { alert("ObjectsHeaderMediator/onRelationsMoueOver"); },
  onObjectsRefOpChange: function()  { alert("ObjectsHeaderMediator/onObjectsRefOpChange"); },
  onObjectsTypeChange: function()   { alert("ObjectsHeaderMediator/onObjectsTypeChange"); },
  onObjectsFilterClick: function()  { alert("ObjectsHeaderMediator/onObjectsFilterClick"); },
  onObjectsFilterChange: function() { this.onObjectsFilterClick(); },
  onObjectsFilterCaseClick: function() {
    if (this.getViewComponent().filter.value.length > 0) {
      this.onObjectsFilterClick();
    }
  },
  hide: function() {
    var dataObjectsHeader = this.facade.retrieveMediator(DataObjectsHeaderMediator.ID).getViewComponent();
    dataObjectsHeader.setAttribute("style","display:none;");
    var dataRelationsHeader = this.facade.retrieveMediator(DataRelationsHeaderMediator.ID).getViewComponent();
    dataRelationsHeader.setAttribute("style","display:none;");
    if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {   
      var modelObjectsHeader = this.facade.retrieveMediator(ModelObjectsHeaderMediator.ID).getViewComponent();
      modelObjectsHeader.setAttribute("style","display:none;");
      var modelObjectsTextsHeader = this.facade.retrieveMediator(ModelObjectsTextsHeaderMediator.ID).getViewComponent();
      modelObjectsTextsHeader.setAttribute("style","display:none;");
      var modelRelationsHeader = this.facade.retrieveMediator(ModelRelationsHeaderMediator.ID).getViewComponent();
      modelRelationsHeader.setAttribute("style","display:none;");
      var modelRelationsTextsHeader = this.facade.retrieveMediator(ModelRelationsTextsHeaderMediator.ID).getViewComponent();
      modelRelationsTextsHeader.setAttribute("style","display:none;");
    }
  },  
  getTypeSelected: function() {
    if (this.typeSelected === undefined || this.typeSelected === null) {
      this.typeSelected = Type.getByName(this.typeNameSelected);
    }
    return this.typeSelected;
  },
  getTypeNameSelected: function() {
    if (this.typeNameSelected === undefined) {
      this.typeNameSelected = null;
    }
    return this.typeNameSelected;
  },
  setTypeNameSelected: function(typeName) {
    if (typeName !== undefined) {
      if (this.typeNameSelected && this.typeNameSelected != typeName) {
        this.typeSelected = null;
      }
      this.typeNameSelected = typeName;
    }
  },
  getEntityFilterValue: function() {
    return this.getViewComponent().filter.value;
  },
  getEntityFilterCase: function() {
    return this.getViewComponent().filterCaseCheckBox.checked;
  }
});

//Abstract
//Class: RelationsHeaderMediator
var RelationsHeaderMediator = new Class({
  Extends: SjamayeeMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.gridMediator = null;
    this.typeNameSelected = null;
    this.typeSelected = null;
    this.entityNameSelected = null;
    this.entitySelected = null;
    this.onRelationsEntityChange = this.onRelationsEntityChange.bindWithEvent(this);
    this.onRelationsTypeChange = this.onRelationsTypeChange.bindWithEvent(this);
    this.onRelationsFilterClick = this.onRelationsFilterClick.bindWithEvent(this);
    this.onRelationsFilterKeydown = this.onRelationsFilterKeydown.bindWithEvent(this);
    this.onRelationsFilterChange = this.onRelationsFilterChange.bindWithEvent(this);
    this.onRelationsFilterCaseClick = this.onRelationsFilterCaseClick.bindWithEvent(this);
    this.onRootUndoClick = this.onRootUndoClick.bindWithEvent(this);
    this.onRootSelectClick = this.onRootSelectClick.bindWithEvent(this);
    this.onRootRedoClick = this.onRootRedoClick.bindWithEvent(this);
    var header = this.getViewComponent();
    header.addEvent(SjamayeeFacade.GRID_ENTITY_CHANGE, this.onRelationsEntityChange);
    header.addEvent(SjamayeeFacade.GRID_TYPE_CHANGE, this.onRelationsTypeChange);
    header.addEvent(SjamayeeFacade.GRID_FILTER_CLICK, this.onRelationsFilterClick);
    header.addEvent(SjamayeeFacade.GRID_FILTER_KEYDOWN, this.onRelationsFilterKeydown);
    header.addEvent(SjamayeeFacade.GRID_FILTER_CHANGE, this.onRelationsFilterChange);
    header.addEvent(SjamayeeFacade.GRID_FILTER_CASE_CLICK, this.onRelationsFilterCaseClick);
    header.addEvent(SjamayeeFacade.ROOT_UNDO, this.onRootUndoClick);
    header.addEvent(SjamayeeFacade.ROOT_SELECT, this.onRootSelectClick);
    header.addEvent(SjamayeeFacade.ROOT_REDO, this.onRootRedoClick);
    //Initialize SelectLists.
    header.typeSelect.innerHTML = Type.getTypeOptions();
  },
  onRelationsEntityChange: function()     { alert("RelationsHeaderMediator/onRelationsEntityChange"); },
  onRelationsTypeChange: function()       { alert("RelationsHeaderMediator/onRelationsTypeChange"); },
  onRelationsFilterClick: function()      { alert("RelationsHeaderMediator/onRelationsFilterClick"); },
  onRelationsFilterKeydown: function(evt) {
    this.getViewComponent().filter.style.background = "white";    
    var nivo = evt.target.value;
    //var relationsGridMediator = this.facade.retrieveMediator(RelationsGridMediator.ID);
    //relationsGridMediator.setCurrentNivo(nivo);
  },
  onRelationsFilterChange: function() { this.onRelationsFilterClick(); },
  onRelationsFilterCaseClick: function() {
    if (this.getViewComponent().filter.value.length > 0) {
      this.onRelationsFilterClick();
    }
  },
  onRootUndoClick: function()   { alert("RelationsHeaderMediator/onRootUndoClick"); },
  onRootSelectClick: function() { alert("RelationsHeaderMediator/onRootSelectClick"); },
  onRootRedoClick: function()   { alert("RelationsHeaderMediator/onRootRedoClick"); },

  hide: function() {
    var dataObjectsHeader = this.facade.retrieveMediator(DataObjectsHeaderMediator.ID).getViewComponent();
    dataObjectsHeader.setAttribute("style","display:none;");
    var dataRelationsHeader = this.facade.retrieveMediator(DataRelationsHeaderMediator.ID).getViewComponent();
    dataRelationsHeader.setAttribute("style","display:none;");
    if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {   
      var modelObjectsHeader = this.facade.retrieveMediator(ModelObjectsHeaderMediator.ID).getViewComponent();
      modelObjectsHeader.setAttribute("style","display:none;");
      var modelObjectsTextsHeader = this.facade.retrieveMediator(ModelObjectsTextsHeaderMediator.ID).getViewComponent();
      modelObjectsTextsHeader.setAttribute("style","display:none;");
      var modelRelationsHeader = this.facade.retrieveMediator(ModelRelationsHeaderMediator.ID).getViewComponent();
      modelRelationsHeader.setAttribute("style","display:none;");
      var modelRelationsTextsHeader = this.facade.retrieveMediator(ModelRelationsTextsHeaderMediator.ID).getViewComponent();
      modelRelationsTextsHeader.setAttribute("style","display:none;");
    }
  },
  getTypeSelected: function() {
    if (this.typeSelected === undefined || this.typeSelected === null) {
      this.typeSelected = Type.getByName(this.typeNameSelected);
    }
    return this.typeSelected;
  },
  getTypeNameSelected: function() {
    if (this.typeNameSelected === undefined) {
      this.typeNameSelected = null;
    }
    return this.typeNameSelected;   
  },
  setTypeNameSelected: function(typeName) {
    if (typeName !== undefined) {
      if (this.typeNameSelected && this.typeNameSelected != typeName) {
        this.typeSelected = null;
      }
      this.typeNameSelected = typeName;
    }
  },
  getEntityNameSelected: function() {
    if (this.entityNameSelected === undefined) {
      this.entityNameSelected = null;
    }
    return this.entityNameSelected;
  },
  setEntityNameSelected: function(entityName) {
    if (entityName !== undefined) {
      if (this.entityNameSelected && this.entityNameSelected != entityName) {
        this.setEntitySelected(null);
      }
      this.entityNameSelected = entityName;
    }
  },
  getEntitySelected: function() {
    return this.entitySelected;
  },
  setEntitySelected: function(entity) {
    this.entitySelected = entity;
  },
  getEntityFilterValue: function() {
    return this.getViewComponent().filter.value;
  },
  getEntityFilterCase: function() {
    return this.getViewComponent().filterCaseCheckBox.checked;
  }
});

//Abstract
//Class: TextsHeaderMediator
var TextsHeaderMediator = new Class({
  Extends: SjamayeeMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
  },
  hide: function() {
    var dataObjectsHeader = this.facade.retrieveMediator(DataObjectsHeaderMediator.ID).getViewComponent();
    dataObjectsHeader.setAttribute("style","display:none;");
    var dataRelationsHeader = this.facade.retrieveMediator(DataRelationsHeaderMediator.ID).getViewComponent();
    dataRelationsHeader.setAttribute("style","display:none;");
    var modelObjectsHeader = this.facade.retrieveMediator(ModelObjectsHeaderMediator.ID).getViewComponent();
    modelObjectsHeader.setAttribute("style","display:none;");
    var modelObjectsTextsHeader = this.facade.retrieveMediator(ModelObjectsTextsHeaderMediator.ID).getViewComponent();
    modelObjectsTextsHeader.setAttribute("style","display:none;");
    var modelRelationsHeader = this.facade.retrieveMediator(ModelRelationsHeaderMediator.ID).getViewComponent();
    modelRelationsHeader.setAttribute("style","display:none;");
    var modelRelationsTextsHeader = this.facade.retrieveMediator(ModelRelationsTextsHeaderMediator.ID).getViewComponent();
    modelRelationsTextsHeader.setAttribute("style","display:none;");
  }   
});

//Abstract
//Class: PagingMediator
var PagingMediator = new Class({
  Extends: SjamayeeMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.paging = null;
    this.bol = 0;
    this.eol = 0;
    this.line = 0;
    this.objectLine = 0;
    this.parentLine = 0;
    this.childLine = 0;
    this.objectLine = this.getBeginOfList();
    this.parentLine = this.getBeginOfList();
    this.childLine = this.getBeginOfList();
    this.onKeydown = this.onKeydown.bindWithEvent(this);
    this.onKeypress = this.onKeypress.bindWithEvent(this);
    /*this.onEscape = this.onEscape.bindWithEvent(this);
    this.onSpace = this.onSpace.bindWithEvent(this);
    this.onEnter = this.onEnter.bindWithEvent(this);
    this.onHome = this.onHome.bindWithEvent(this);
    this.onPrevious = this.onPrevious.bindWithEvent(this);
    this.onUp = this.onUp.bindWithEvent(this);
    this.onDown = this.onDown.bindWithEvent(this);
    this.onNext = this.onNext.bindWithEvent(this);
    this.onEnd = this.onEnd.bindWithEvent(this);*/
  },
  onKeydown: function(evt,subEvent)  {},
  onKeypress: function()             { this.sendNotification(SjamayeeFacade.LIST_KEYPRESS); },
  /*onEscape: function()               { this.sendNotification(SjamayeeFacade.LIST_ESCAPE); },
  onSpace: function()                { this.sendNotification(SjamayeeFacade.LIST_SPACE); },
  onEnter: function()                { this.sendNotification(SjamayeeFacade.LIST_ENTER); },
  onHome: function()                 { this.sendNotification(SjamayeeFacade.LIST_HOME); },
  onPrevious: function()             { this.sendNotification(SjamayeeFacade.LIST_PREVIOUS); },
  onUp: function()                   { this.sendNotification(SjamayeeFacade.LIST_UP); },
  onDown: function()                 { this.sendNotification(SjamayeeFacade.LIST_DOWN); },
  onNext: function()                 { this.sendNotification(SjamayeeFacade.LIST_NEXT); },
  onEnd: function()                  { this.sendNotification(SjamayeeFacade.LIST_END); },*/
  
  getPaging: function() {
    return this.paging;
  },
  setPaging: function(paging) {
    this.paging = paging;
  },
  getType: function() {
    return null;
  },
  getObjectLine: function() {
    return this.objectLine;
  },
  setObjectLine: function(line) {
    this.objectLine = line;
  },
  getParentLine: function() {
    return this.parentLine;
  },
  setParentLine: function(line) {
    this.parentLine = line;
  },
  getChildLine: function() {
    return this.childLine;
  },
  setChildLine: function(line) {
    this.childLine = line;
  },
  getLine: function() {
    var result = this.line;
    if (result < this.getBeginOfList()) {
      result = this.getBeginOfList();
    } else if (result > this.getEndOfList()) {
      result = this.getEndOfList();
    } 
    return result;
  },
  setLine: function(line) {
    this.line = line;
    //set focus!
    this.highlite(line,null,this.getBackgroundHighliteColor());   
  },
  setCurrentLine: function(evt) {
    var line = 0;
    var elementId = evt.target.id;
    if (elementId.length > 0) {
      var lastPosition = (elementId.length - 1);
      if (elementId.charAt(lastPosition) == "D") {
        lastPosition = (lastPosition - 1);
      }
      line = new Number(elementId.charAt(lastPosition));
      this.setLine(line);
      //TODO >>>>>>>>>>>>>>>>>>> this.highlite(null,cellId,this.getBackgroundHighliteColor());      
    }
  },  
  lineEmpty: function(line) {
    return false;
  },
  //Abstract
  firstPage: function()    { this.setPaging(PagingMediator.PAGE_FIRST); },
  previousPage: function() { this.setPaging(PagingMediator.PAGE_PREVIOUS); },
  previousLine: function() { this.setPaging(PagingMediator.LINE_PREVIOUS); },
  nextLine: function()     { this.setPaging(PagingMediator.LINE_NEXT); },
  nextPage: function()     { this.setPaging(PagingMediator.PAGE_NEXT); },
  lastPage: function()     { this.setPaging(PagingMediator.PAGE_LAST); },
  home: function() {
    try {
      this.setLine(this.getBeginOfList());
      this.firstPage(this.getEndOfList());
      //this.nextPage(this.getEndOfList());
    } catch(error) {
      Utils.alert("PagingMediator/home Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this.getLine();
    }
  },
  previous: function() {
    try {
      //this.setLine(this.getBeginOfList());
      this.previousPage(this.getEndOfList());
    } catch(error) {
      Utils.alert("PagingMediator/previous Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this.getLine();
    }
  },
  lineUp: function() {
    try {
      var line = this.getLine();
      if (line > this.getBeginOfList()) {
        var previousLine = (line - 1);
        if (!this.lineEmpty()) {
          this.setLine(previousLine);
        }
      } else {
        this.previousLine();
      }
    } catch(error) {
      Utils.alert("PagingMediator/lineUp Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this.getLine();
    }
  },
  lineDown: function() {
    try {
      var line = this.getLine();
      if (line < this.getEndOfList()) {
        var nextLine = (line + 1);
        if (!this.lineEmpty()) {
          this.setLine(nextLine);
        }
      } else {
        this.nextLine();
      }
    } catch(error) {
      Utils.alert("PagingMediator/lineDown Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this.getLine();
    }
  },
  next: function() {
    try {
      //this.setLine(this.getBeginOfList());
      this.nextPage(this.getEndOfList());
    } catch(error) {
      Utils.alert("PagingMediator/next Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this.getLine();
    }
  },
  end: function() {
    try {
      this.setLine(this.getEndOfList());
      this.lastPage(this.getEndOfList());
    } catch(error) {
      Utils.alert("PagingMediator/end Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this.getLine();
    }
  },
  getLastLine: function() {
    for (var result = this.getEndOfList(); result >= this.getBeginOfList(); result--) {
      var cellValue = this.getCellValue(result);
      if (cellValue) {
        if (cellValue.length > 0) {
          break;
        }
      }
    }
    return result;
  },
  getBeginOfList: function()    { return this.bol; },
  setBeginOfList: function(bol) { this.bol = bol; },
  getEndOfList: function()      { return this.eol; },
  setEndOfList: function(eol)   { this.eol = eol; },
  getMaxOfList: function()      { return undefined; },
});
PagingMediator.PAGE_FIRST = "PAGE_FIRST";
PagingMediator.PAGE_PREVIOUS = "PAGE_PREVIOUS";
PagingMediator.LINE_PREVIOUS = "LINE_PREVIOUS";
PagingMediator.LINE_NEXT = "LINE_NEXT";
PagingMediator.PAGE_NEXT = "PAGE_NEXT";
PagingMediator.PAGE_LAST = "PAGE_LAST";

//Abstract
//Class: ListMediator
var ListMediator = new Class({
  Extends: PagingMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.setPointerEvent(null);
    this.listUIC = null;
    this.listObject = null;
    this.onListClick = this.onListClick.bindWithEvent(this);
    this.onLineClick = this.onLineClick.bindWithEvent(this);
    this.onLineMouseOver = this.onLineMouseOver.bindWithEvent(this);
    this.onLineMouseOut = this.onLineMouseOut.bindWithEvent(this);    
  },
  onListClick: function() {
    //this.listUIC.keyboard.activate();
  },
  onLineClick: function(evt) {
    var id = evt.target.id;
    this.setLine(id.substr(id.length-Sjamayee.ID_PAD_SIZE));
  },    
  onLineMouseOver: function(evt) {}, //OK alert("ListMediator/onLineMouseOver"); },
  onLineMouseOut: function(evt)  {}, //OK alert("ListMediator/onLineMouseOut"); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      //SjamayeeFacade.LIST_HOME,
      //SjamayeeFacade.LIST_END
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var list = this.getViewComponent();
    switch (note.getName()) { }
  },
  getList: function() {
    return this.list;
  },
  setList: function(list) {
    this.list = list;
  },
  getListObject: function() {
    if (this.listObject === undefined) {
      this.listObject = null;
    }
    return this.listObject;
  },
  setListObject: function(listObject) {
    this.listObject = listObject;
  },
  getPointerEvent: function() {
    if (this.pointerEvent === undefined || this.pointerEvent === null) {
      this.pointerEvent = null;
    }
    return this.pointerEvent;
  },
  setPointerEvent: function(evt) {
    if (this.pointerEvent) {
      var id = this.pointerEvent.target.id;
      //this.highlite(null,id);
    }
    this.pointerEvent = evt;
  },
  highlite: function(line,id,bgColor) {
    var _line = line?line:null;
    var _id = id?id:null;
    var _bgColor = bgColor?bgColor:"inherit";
    if (_line === null) {
      if (id) {
        line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
      }
    }
    var color = "inherit";
    var fontWeight = ";";
    if (_bgColor) {
      if (this.getLine() == line) {      
        fontWeight = ";font-weight:bold;";
        color = "black";
      }
    }
  /*var attributeList = this.getViewComponent();    
    $(attributeList.getNameCellId(line)).removeAttribute("style");
    $(attributeList.getValueCellId(line)).removeAttribute("style");
    $(attributeList.getNameCellId(line)).setAttribute("style","background-color:"+_bgColor+"color:"+color+fontWeight);
    $(attributeList.getValueCellId(line)).setAttribute("style","background-color:"+_bgColor+"color:"+color+fontWeight);*/
  }  
});

//Abstract
//Class: AttributeListMediator
var AttributeListMediator = new Class({
  Extends: ListMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.onNameClick = this.onNameClick.bindWithEvent(this);
    this.onValueClick = this.onValueClick.bindWithEvent(this);
    this.listUIC = this.getViewComponent();
    this.listUIC.addEvent(SjamayeeFacade.LIST_CLICK, this.onListClick);
    this.listUIC.addEvent(SjamayeeFacade.LINE_CLICK, this.onLineClick);
    this.listUIC.addEvent(SjamayeeFacade.ATTRIBUTE_NAME_CLICK, this.onNameClick);
    this.listUIC.addEvent(SjamayeeFacade.ATTRIBUTE_VALUE_CLICK, this.onValueClick);
    this.listUIC.addEvent(SjamayeeFacade.LINE_MOUSEOVER, this.onLineMouseOver);
    this.listUIC.addEvent(SjamayeeFacade.LINE_MOUSEOUT, this.onLineMouseOut);
    this.listUIC.addEvent(SjamayeeFacade.LIST_KEYDOWN, this.onKeydown);
    //Initialize list.
    this.setBeginOfList(1);
    this.setEndOfList(AttributeListUIComponent.PAGE_SIZE);
    this.home();
  },
  onListClick: function()  { this.listUIC.keyboard.activate(); },
  onNameClick: function()  { this.sendNotification(SjamayeeFacade.ATTRIBUTE_NAME_CLICK); },
  onValueClick: function() { this.sendNotification(SjamayeeFacade.ATTRIBUTE_VALUE_CLICK); },
  onLineMouseOver: function(evt,color) {
    this.setPointerEvent(evt);
    var id = evt.target.id;
    var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
    //this.highlite(id,color);
    //var attributeList = this.getViewComponent();    
    //$(attributeList.getNameCellId(line)).setAttribute("style","background-color:"+color);
    //$(attributeList.getValueCellId(line)).setAttribute("style","background-color:"+color);
    this.highlite(null,id,color);
  },
  onLineMouseOut: function(evt) {
    var id = evt.target.id;
    var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
    //this.highlite(id);
    //var attributeList = this.getViewComponent();
    //$(attributeList.getNameCellId(line)).setAttribute("style","background-color:inherit;");
    //$(attributeList.getValueCellId(line)).setAttribute("style","background-color:inherit;");
    this.highlite(null,id);
  },
  onKeydown: function(evt,subEvent) {
    this.parent(evt,subEvent);
    switch (subEvent) {
      case SjamayeeFacade.ESCAPE:
      break;
      case SjamayeeFacade.SPACE:
      this.onLineClick(this.getPointerEvent());
      break;
      case SjamayeeFacade.ENTER:
      this.onLineClick(this.getPointerEvent());
      break;
      case SjamayeeFacade.UP:
      if (this.getLine() > this.getBeginOfList()) {
        //this.setPointerEvent(evt);
        this.setLine(this.getLine() - 1);
      }
      break;
      case SjamayeeFacade.DOWN:
      if (this.getLine() < this.getEndOfList()) {
        //this.setPointerEvent(evt);
        this.setLine(this.getLine() + 1);
      }
      break;      
    }
  },
  getBackgroundHighliteColor: function() {
    return ModelRelationsGridMediator.BACKGROUND_HIGHLITE_COLOR;
  }
});
AttributeListMediator.BACKGROUND_HIGHLITE_COLOR = "yellow;";
AttributeListMediator.TYPE_OBJECT = "OBJECT";
AttributeListMediator.TYPE_PARENT = "PARENT";
AttributeListMediator.TYPE_CHILD = "CHILD";
/*
case SjamayeeFacade.UP:
var row = this.getRowFromCellId(this.getCurrentCellId());
var column = this.getColumnFromCellId(this.getCurrentCellId());
if (row > this.getBeginOfList(true)) {
  row--;
  //this.setLine(row);
  var cellId = null;
  if (column == RelationsGridRight.COLUMN_VALUE) {
    cellId = this.gridUICRight.getCellId(row);
  } else {
    cellId = this.gridUICLeft.getCellId(row,column);
  }
  this.setCurrentCellId(cellId);
}
break;
case SjamayeeFacade.DOWN:
var row = this.getRowFromCellId(this.getCurrentCellId());
var column = this.getColumnFromCellId(this.getCurrentCellId());
var lastCell = this.getLastCellId(column);
if (row < this.getEndOfList(lastCell.id,true)) {
  row++;
  //this.setLine(row);
  var cellId = null;
  if (column == RelationsGridRight.COLUMN_VALUE) {
    cellId = this.gridUICRight.getCellId(row);
  } else {
    cellId = this.gridUICLeft.getCellId(row,column);
  }
  this.setCurrentCellId(cellId);
}
break;      
*/
//Abstract
//Class: GridListMediator
var GridListMediator = new Class({
  Extends: ListMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
  },
  hide: function() {
    this.listSize = null;
    //this.objectsListLeftWidth = 300; //null;
    //this.relationsGridLeftWidth = 400; //null;
    this.splitterStyle = null;
    //Command Buffers
    this.commandBuffer = null;
    this.rootCommandBuffer = null;  
    this.lastRootCommand = null;  
    //For command naming ?!
    this.sourceName = null;
    this.groupId = null;
    //MODE: Edit/Display
    this.mode = null;
    var gridList = this.getViewComponent();
    gridList.gridListSplitter.left.dataObjectsList.setAttribute("style","display:none;");
    gridList.gridListSplitter.left.dataRelationsGrid.setAttribute("style","display:none;");
    gridList.gridListSplitter.left.modelObjectsList.setAttribute("style","display:none;");
    gridList.gridListSplitter.left.modelObjectsTextsEditor.setAttribute("style","display:none;");
    gridList.gridListSplitter.left.modelRelationsGrid.setAttribute("style","display:none;");
    gridList.gridListSplitter.left.modelRelationsTextsEditor.setAttribute("style","display:none;");
    gridList.gridListSplitter.right.dataObjectsList.setAttribute("style","display:none;");
    gridList.gridListSplitter.right.dataRelationsGrid.setAttribute("style","display:none;");
    gridList.gridListSplitter.right.modelObjectsList.setAttribute("style","display:none;");
    gridList.gridListSplitter.right.modelObjectsTextsEditor.setAttribute("style","display:none;");
    gridList.gridListSplitter.right.modelRelationsGrid.setAttribute("style","display:none;");
    gridList.gridListSplitter.right.modelRelationsTextsEditor.setAttribute("style","display:none;");
    //this.setSplitterStyle(null); //gridList.gridListSplitter.getAttribute("style"));
  },
  getListSize: function() {
    if (this.listSize === undefined || this.listSize === null) {
      this.setListSize(SjamayeeFacade.SIZE_NORMAL);
    }
    return this.listSize;
  },
  setListSize: function(listSize) {
    this.listSize = listSize;
  },
  getSplitterStyle: function() {
    if (this.splitterStyle === null) {
      //splitterStyle = "background-color:white;width:100%;height:100%;display:block;";
      this.splitterStyle = "display:block;";
    }
    return this.splitterStyle;
  },
  setSplitterStyle: function(splitterStyle) {
    this.splitterStyle = splitterStyle;
  },
  getMode: function() {
    if ((this.mode === undefined) || (this.mode === null)) {
      this.mode = GridListMediator.MODE_DISPLAY;
    }
    return this.mode;
  },
  setMode: function(mode,forced) {
    var _forced = (forced !== undefined && forced !== null)?forced:false;
    var response = null;
    if (_forced === false) {
      var currentMode = this.getMode();
      if (currentMode) {
        if (currentMode == GridListMediator.MODE_EDIT) {
          response = confirm("Updates will be lost!\n\nAre you sure?");
        }
      }
    }
    if (response === null || response === true) {
      this.mode = mode;
    }
    return this.getMode();
  },
  setEdit: function(forced) {
    return this.setMode(GridListMediator.MODE_EDIT,forced);
  },
  setDisplay: function(forced) {
    return this.setMode(GridListMediator.MODE_DISPLAY,forced);
  },
  isEdit: function()    { return (this.getMode() == GridListMediator.MODE_EDIT); },
  isDisplay: function() { return (this.getMode() == GridListMediator.MODE_DISPLAY); },
  getCommandBuffer: function() {
    if (this.commandBuffer === undefined) {
      this.commandBuffer = null;
    }
    return this.commandBuffer;
  },
  setCommandBuffer: function(commandBuffer) {
    if (commandBuffer) {
      this.commandBuffer = commandBuffer;
    }
  },
  getRootCommandBuffer: function() {
    if (this.rootCommandBuffer === undefined) {
      this.rootCommandBuffer = null;
    }
    return this.rootCommandBuffer;
  },
  setRootCommandBuffer: function(rootCommandBuffer) {
    if (rootCommandBuffer) {
      this.rootCommandBuffer = rootCommandBuffer;
    }
  },
  getLastRootCommand: function() {
    var result = null;
    if (this.lastRootCommand !== undefined) {
      result = this.lastRootCommand;
    }
    return result;
  },
  setLastRootCommand: function(lastRootCommand,append) {
    var _append = (append !== undefined && append !== null)?append:false;
    var _lastRootCommand = (lastRootCommand !== undefined && lastRootCommand !== null)?lastRootCommand:false;
    this.lastRootCommand = _lastRootCommand;
    if (this.lastRootCommand) {
      if (_append === true) {
        //Push into rootcommand buffer.
        var rootCommandBuffer = this.getRootCommandBuffer();
        if (this.lastRootCommand.getId() === null) {
          rootCommandBuffer.push(this.lastRootCommand);
        } else {
          rootCommandBuffer.update(this.lastRootCommand);
        }
      }
    }
  },
  getLastRealCommand: function() {
    /////////////////////////////////////////////
    //      Real Commands: ADD,DEL,EDT,EXT,CPY //
    //    Unreal Commands: PST                 //
    //   Virtual Commands: GRP,UND,RDO         //
    //CheckPoint Commands: CKP                 //
    //      Root Commands: ROOT                //
    /////////////////////////////////////////////
    var result = null;
    var commandBuffer = this.getCommandBuffer();
    if (commandBuffer) {
      result = commandBuffer.getLastReal();
    }
    return result;
  },
  getLastRealCommandDone: function() {
    var result = null;
    var commandBuffer = this.getCommandBuffer();
    if (commandBuffer) {
      result = commandBuffer.getLastRealDone();
    }
    return result;
  },
  getLastCommandDone: function() {
    var result = null;
    var commandBuffer = this.getCommandBuffer();
    if (commandBuffer) {
      result = commandBuffer.getLastDone();
    }
    return result;
  },
  getLastCommand: function() {
    if (this.lastCommand === undefined) {
      this.lastCommand = null;
    }
    return this.lastCommand;
  },
  getLastGroupCommand: function(command) {
    var _command = (command !== undefined)?command:null;
    var result = null;
    var commandBuffer = this.getCommandBuffer();
    if (commandBuffer) {
      result = commandBuffer.getLastGroupCommand(_command);
    }
    return result;
  },
  setLastCommand: function(lastCommand,append) {
    var _lastCommand = (lastCommand !== undefined)?lastCommand:null;
    var _append = (append !== undefined && append !== null)?append:false;
    try {
      if (_lastCommand === null) {
        this.lastCommand = _lastCommand;
        this.checkPoint = _lastCommand;
      } else {
        //Set lastCommand/checkPoint
        if (_lastCommand.getName() == Command.CKP) {
          this.checkPoint = _lastCommand;
        } else {
          this.lastCommand = _lastCommand;
        }
        var commandBuffer = this.getCommandBuffer();
        if (commandBuffer) {
          //Push into command buffer.
          if (_append === true) {
            //Wipe-out ALL navigation commands!
            if (_lastCommand.getName() in Utils.arrayHash([Command.ADD,Command.CPY,Command.DEL,Command.EDT,Command.EXT,Command.PST])) {
              commandBuffer.removeNavigationCommands();
            }
            if (_lastCommand.getId() === null) {
              if (_lastCommand.getName() == Command.CKP) {
                commandBuffer.push(this.checkPoint);
              } else if (_lastCommand.getName() == Command.DEL) {  // !!!!!!!!!!!!!!!! UPDATE DELETE (undone) !!!!!!!!!!!!!!!!!!!!!!!!
                //Try to update or append!!!
                commandBuffer.update(this.lastCommand);
              } else if (_lastCommand.getName() == Command.CPY) {
                //Try to update or append!!!
                commandBuffer.update(this.lastCommand);               
              } else if (_lastCommand.getName() == Command.EXT) {
                //Try to update or append!!!
                commandBuffer.update(this.lastCommand);
              } else {
                if (_lastCommand.getName() != Command.NAV) {
                  commandBuffer.push(this.lastCommand);                 
                } else {
                  /////////////////////////////////////////////////////////////////////////////////////////////////
                  //   3 Situations                                                                                //
                  //1. First navigation - append                                                                 //
                  //2. Second navigation - append (ex. 11,17 / 16,12)                                            //
                  //3. Third navigation - append/insert depending on previous sequence                           //
                  //                      11,17: ASC - 13 => 11,13,17 / 19 => 11,13,17,19 / 10 => 10,11,13,17,19 //
                  //                      16,12: DSC - 13 => 16,13,12 / 19 => 19,16,13,12 / 10 => 19,16,13,12,10 //
                  /////////////////////////////////////////////////////////////////////////////////////////////////
                  //Calculate location of lastCommand.
                  var lastCommandLocation = ((_lastCommand.getNivo() * 1000) +
                                             (_lastCommand.getPosition().getColumn() * 100) +
                                              _lastCommand.getPosition().getRow());
                  //Insert navigation command in correct sequence/position!
                  var j = null;
                  var iLow = null;
                  var iHigh = null;
                  var commandLocation = null;
                  var insertMode = null; //NavigationCommand.INSERT_ASC;
                  var buffer = commandBuffer.getBuffer();
                  for (var i = 0; i < buffer.length; i++) {                   
                    if (buffer[i]) {
                      var command = buffer[i];
                      if (command.getName() != Command.NAV) { continue; }
                      //Calculate location of command.
                      commandLocation = ((command.getNivo() * 1000) +
                                         (command.getPosition().getColumn() * 100) +
                                          command.getPosition().getRow());
                      if (commandLocation < lastCommandLocation) {
                        if (iLow === null)  { iLow = i; }
                      } else {
                        if (iHigh === null) { iHigh = i; }
                      }
                      if (j !== null) {
                        //Determine insertMode (ASC/DSC)
                        var prevNavCmd = buffer[(j)];
                        var prevNavCmdLocation = ((prevNavCmd.getNivo() * 1000) +
                                                  (prevNavCmd.getPosition().getColumn() * 100) +
                                                   prevNavCmd.getPosition().getRow());
                        if (prevNavCmdLocation < commandLocation) {
                          insertMode = NavigationCommand.INSERT_ASC;
                        } else {
                          insertMode = NavigationCommand.INSERT_DSC;
                        }
                      }
                      //Save previous index.
                      j = i;
                    }
                  }
                  //Determine insert/append depending on insertMode!
                  var insert = false;
                  if (commandLocation) {
                    if (insertMode !== null) {
                      if (insertMode == NavigationCommand.INSERT_ASC) {
                        if (lastCommandLocation < commandLocation) {
                          insert = true;
                        }
                      } else {
                        if (lastCommandLocation > commandLocation) {
                          insert = true;
                        }
                      }
                    }
                  }
                  var removeOnTop = true;
                  if (insert === true) {
                    if (insertMode == NavigationCommand.INSERT_ASC) {
                      commandBuffer.insert(iHigh,this.lastCommand);                     
                      removeOnTop = (iHigh > (buffer.length/2))?true:false;                     
                    } else {
                      commandBuffer.insert(iLow,this.lastCommand);                      
                      removeOnTop = (iLow > (buffer.length/2))?false:true;                                            
                    }
                    /*alert("SjamayeeForm/setLastCommand - append: "+append+" lastCommand: "+lastCommand+
                          "\ni: "+i+
                          "\nbuffer.length/2: "+(buffer.length/2)+
                          "\nremoveOnTop: "+removeOnTop);*/
                  } else {
                    commandBuffer.push(this.lastCommand);                   
                  }
                  _cNc = (_cNc + 1);                                                       //TODO: _cNc - global !!!
                  //Remove some earlier(#oldest) navigation command!
                  commandBuffer.removeNavigationOnTopOrBottom(removeOnTop);
                }
              }
            } else {
              commandBuffer.update(this.lastCommand);
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("GridListMediator/setLastCommand Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  navigationOnRelationExists: function(relation,nivo) {
    var _relation = (relation !== undefined)?relation:null;
    var _nivo = (nivo !== undefined)?nivo:null;
    var result = false;
    try {
      if (_relation) {
        var commandBuffer = this.getCommandBuffer();
        if (commandBuffer) {
          if (commandBuffer.isEmpty() === false) {      
            var buffer = commandBuffer.getBuffer();
            for (var i = 0; i < buffer.length; i++) {
              if (buffer[i]) {
                var command = buffer[i];
                if (command.getName() != Command.NAV) { continue; }
                if (command.getNivo() != _nivo) { continue; }
                var r1 = command.getRelation();
                if (r1) {
                  if (r1.getId() == _relation.getId()) {
                    result = true;
                    break;
                  }
                }
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("GridListMediator/navigationOnRelationExists Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  _writeCheckPointCommand: function() {
    var result = null;
    try {
      var writeCheckPoint = false;
      var commandBuffer = this.getCommandBuffer();
      if (commandBuffer) {
        var checkPoints = 0;
        var checkPointRecords = 0;
        var checkPointSize = (CommandBuffer.SIZE_LIMIT * (CommandBuffer.CKP_NEXT_PERCENT/100));
        var checkPointStatus = commandBuffer.getCheckPointStatus();
        if (checkPointStatus && checkPointStatus > 0) {
          checkPointRecords = (checkPointStatus % CommandBuffer.CKP_SIZE_DIVIDER);
          checkPoints = Math.floor((checkPointStatus - checkPointRecords) / CommandBuffer.CKP_SIZE_DIVIDER);
          writeCheckPoint = (checkPoints === 0)?(checkPointRecords > (CommandBuffer.SIZE_LIMIT * (CommandBuffer.CKP_FIRST_PERCENT/100))):(checkPointRecords > checkPointSize);
          if (writeCheckPoint) {
            var command = new CheckPointCommand();
            //command.setSize(checkPointRecords);
            this.setLastCommand(command,true);
            result = command;
          }
        }
      }
      //Utils.alert("GridListMediator/_writeCheckPointCommand - result: "+((result)?result.print():"null"));
    } catch(error) {
      Utils.alert("GridListMediator/_writeCheckPointCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  writeNavigationCommand: function(list,navigation,rto,rfrom) {
    var result = null;
    var _list = (list !== undefined)?list:null;
    var _navigation = (navigation !== undefined)?navigation:null;
    var _rto = (rto !== undefined)?rto:null;
    var _rfrom = (rfrom !== undefined)?rfrom:null;
    try {
      var command = new NavigationCommand(Command.NAV);
      if (command) {
        var lastNivo = _grid.getWhatUsedNivo();                            //TODO: _grid ??? mediator.grid ???
        var currentNivo = null;
        var position = null;
        command.setNavigation(_navigation);
        command.setRelationFrom(_rfrom);
        if (_list) {
          command.setList(_list);
          if (_list instanceof GridView) {                                //TODO: _list - GridView - grid/list ???
            command.setRelation(_rto);
            currentNivo = _list.getCurrentNivo();
            command.setNivo(currentNivo);
            position = _list.getPosition();
            if (position) {
              command.setPosition(position);
            }
          }
        }
        var buffer = null;
        var commandBuffer = this.getCommandBuffer();
        if (commandBuffer) {
          //Delete navigation commands on ENTER (switchRoot).
          if (command.getNavigation() == NavigationCommand.NAV_ENTER) {
            commandBuffer.removeNavigationCommands();
          }
          buffer = commandBuffer.getBuffer();
          if (this.navigationOnRelationExists(_rto,currentNivo)) {
            //Update existing navigation command.
            for (var i = 0; i < buffer.length; i++) {
              if (buffer[i1]) {
                var cmd1 = buffer[i1];
                if (cmd1.getName() != Command.NAV) { continue; }
                if (cmd1.getNivo() != currentNivo) { continue; }
                var r1 = cmd1.getRelation();
                if (r1) {
                  if (r1.getId() == _rto.getId()) {
                    cmd1.setUnDone(false);
                    cmd1.setNavigation(command.getNavigation());
                    cmd1.setList(command.getList());
                    cmd1.setPosition(command.getPosition());
                    break;
                  }
                }
              }
            }
          } else {
            //Create new navigation command.
            this.setLastCommand(command,true);
            command.setSourceName(command.getName()+"_"+command.getId()+"/"+command.getId());
          }
          if (command.getNavigation() in Utils.arrayHash([NavigationCommand.NAV_ENTER,NavigationCommand.NAV_SPACE,
                                                          NavigationCommand.NAV_CLICK,
                                                          NavigationCommand.NAV_RIGHT,NavigationCommand.NAV_LEFT,
                                                          NavigationCommand.NAV_HOME,NavigationCommand.NAV_END])) {
            //Clean-up navigation commands - on left/right navigation !!!
            // 1. Leave only nav's for saved cells with nivo < lastNivo (whatUsedNivo)
            if (commandBuffer.isEmpty() === false) {
              var cmd = null;
              var cell = null;
              var column = null;
              var relation = null;
              // 1. Leave only nav's for saved cells with nivo < lastNivo (whatUsedNivo)
              var commandDeleted = true;
              while (commandDeleted) {
                commandDeleted = false;
                for (var i2 = 0; i2 < buffer.length; i2++) {
                  if (buffer[i2]) {
                    cmd = buffer[i2];
                    if (cmd.getName() != Command.NAV) { continue; }
                    if (cmd.getNivo() <= Position.NIVO_ROOT()) { continue; }
                    column = _grid.getColumnByNivo(cmd.getNivo());
                    if (column) {
                      var masterRelation = column.getMaster().getRelation();
                      if (masterRelation && masterRelation.getId() == cmd.getRelationFrom().getId()) { continue; } //Keep ALL if same branch.
                    }
                    if (command.getNavigation() == NavigationCommand.NAV_RIGHT) {
                      if (cmd.getId() == command.getId()) { continue; }                                  //Keep only the new command !!!
                    }
                    relation = null;
                    cell = null;
                    column = _grid.getColumnByNivo(cmd.getNivo());
                    if (column) {
                      cell = (column.isSelected)?column.getSavedCell():column.getCell(Position.ROW_TOP());
                      if (cell) {
                        relation = cell.getRelation();
                      }
                    }
                    var r2 = cmd.getRelation();
                    if (relation && r2 && r2.getId() == relation.getId()) { continue; }
                    buffer.splice(i2,1);
                    commandDeleted = true;
                    if (_cNc > 0) { _cNc = (_cNc - 1); }                                                 //TODO: _cNc
                    break;
                  }
                }
              }
            }
          }
        }
        result = command;
      }
      //Utils.alert("GridListMediator/writeNavigationCommand - result: "+((result)?result.print():"null"));   
    } catch(error) {
      Utils.alert("GridListMediator/writeNavigationCommand - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
GridListMediator.MODE_DISPLAY = "DISPLAY";
GridListMediator.MODE_EDIT = "EDIT";

//Abstract
//Class: ObjectsListMediator
var ObjectsListMediator = new Class({
  Extends: GridListMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.pageSize = null;
    this.entityProxy = null;
    this.lastNavigation = null;
    this.messageText = null;
    
    this.list = null;
    //List left.
    this.listUICLeft = null;
    //List right.
    this.listUICRight = null;
    
    //Initialize list.
    this.setBeginOfList(0);
    this.setPageSize(ObjectsListMediator.PAGE_SIZE_MIN);
    this.setEndOfList(this.getPageSize() - 1);
  },
  setMessageText: function(messageText) {
    if (this.messageText === null) {
      var toolBar = null;
      if (this instanceof ModelObjectsListMediator) {
        toolBar = this.facade.retrieveMediator(ModelObjectsToolBarMediator.ID).getViewComponent();
      } else {
        toolBar = this.facade.retrieveMediator(DataObjectsToolBarMediator.ID).getViewComponent();
      }
      this.messageText = toolBar.messageText;
    }
    this.messageText.value = messageText;
  },
  lineEmpty: function(line) {
    var value = this.getCellValue(line);
    return (value === undefined || value === null || value.length == 0)?true:false;
  },
  //Abstract TODO ////////////////////////////////////////////////////////////////////////////////
  getNameCell: function(line) {
    var id = this.listUICLeft.getNameCellId(line);
    return $(id);
  },
  getCellValue: function(line) {
    var result = '';
    var name = this.getNameCell(line);
    if (name) {
      result = name.innerHTML;
    }
    return result;
  },
  
  getList: function()                         { return this.list; },
  setList: function(list)                     { this.list = list; },
  getTypeProxy: function()                    { return this.typeProxy; },
  setTypeProxy: function(typeProxy)           { this.typeProxy = typeProxy; },
  getEntityProxy: function()                  { return this.entityProxy; },
  setEntityProxy: function(entityProxy)       { this.entityProxy = entityProxy; },
  getRelationProxy: function()                { return this.relationProxy; },
  setRelationProxy: function(relationProxy)   { this.relationProxy = relationProxy; },
  getAttributeProxy: function()               { return this.attributeProxy; },
  setAttributeProxy: function(attributeProxy) { this.attributeProxy = attributeProxy; },
  
  getPageSize: function()         { return this.pageSize; },
  setPageSize: function(pageSize) { this.pageSize = pageSize; },
  listResize: function(listSize) {
    if (listSize !== undefined) {
      this.setListSize(listSize);
    } else {
      if (this.isListNormal() === true) {
        this.setListSize(SjamayeeFacade.SIZE_FULL);
      } else {
        this.setListSize(SjamayeeFacade.SIZE_NORMAL);
      }
    }
  },
  isListNormal: function() {
    return (this.getListSize() == SjamayeeFacade.SIZE_NORMAL)?true:false;
  },
  isListFull: function() {
    return (this.getListSize() == SjamayeeFacade.SIZE_FULL)?true:false;
  },
  getMaxOfList: function() {
    return (ObjectsListMediator.PAGE_SIZE_MAX - 1);
  },
  getLastNavigation: function() {
    return this.lastNavigation;
  },
  setLastNavigation: function(lastNavigation) {
    this.lastNavigation = lastNavigation;
  },
  //Abstract
  setResizeButtonText: function(text) {},
  //TODO: Abstract
  switchType: function(typeName) {
    return undefined;
  },
  //Abstract
  getType: function(object) { return null; },
  //filterObject: function(object) { return null; },
  fillList: function(page) {
    var j = 0;
    try {
      //var listObjects = this.getList().getListObjects();
      var listObjects = page;
      if (listObjects) {
        for (var i = 0; i < listObjects.length; i++) {
          var object = listObjects[i];
          this.fillOneLine(j++,this.getLine(),object);
          if (j > this.getEndOfList()) { break; }
        }
      }
    } catch(error) {
      Utils.alert("ObjectsListMediator/fillList Error: "+error.message);
    } finally {
      //Clear remaining lines.
      while (j <= this.getMaxOfList()) {
        this.clearOneLine(j++);
      }
      return this;
    }
  },
  fillOneLine: function(index,currentIndex,object) {
    try {
      //Clear line.
      this.clearOneLine(index);
      if (object) {
        //Fill line.
        var cellClass = ObjectsListMediator.CELL_CLASS_ID;
        var cell01Class = ObjectsListMediator.CELL_01_CLASS_ID;
        if (index === 0) {
          cellClass = ObjectsListMediator.CELL_FIRST_LINE_CLASS_ID;
          cell01Class = ObjectsListMediator.CELL_01_FIRST_LINE_CLASS_ID;
        }
        //Normal line.
        var objectLineStyle = "background-color:inherit;font-weight:normal;";
        if (index == currentIndex) {
          //Current line - focused.
          //objectLineStyle = "background-color:lightgray;font-weight:bold;";
          objectLineStyle = "background-color:"+FontStyle.COLOR_LIGHTGRAY+";font-weight:bold;";
        }
        //var reference = '<a id="'+this.listUICLeft.getRefAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getReferences()+'</a>';
        var reference = object.getReferences();
        //var name = '<a id="'+this.listUICLeft.getNameAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getNameTranslated()+'</a>';
        var name = object.getNameTranslated();
        //var name = '<a id="'+this.listUICLeft.getNameAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getName()+' ('+object.getId()+')'+'</a>';
        //var type = object.getImageHtml(SjamayeeForm.IMAGE_SMALL,"position:relative;float:left;padding:0px 1px 0px 0px;")+ //0px 3px 0px 3px;")+
        //           '<a id="'+this.listUICLeft.getTypeAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getTypeObject().getNameTranslated()+'</a>'; //getType()  // TEST NULL!!!
        //var type = '<a id="'+this.listUICLeft.getTypeAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getTypeObject().getNameTranslated()+'</a>'; //getType()  // TEST NULL!!!
        var dataType = this.getType(object);
        var type = dataType;
        //var type = '<a id="'+listLeft.getTypeAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+dataType+'</a>'; //getType()  // TEST NULL!!!
        //var type = '<a id="'+listLeft+ObjectsListLeft.TYPE_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getTypeObject().getNameTranslated()+'</a>'; //getType()  // TEST NULL!!!          
        //var description = '<a id="'+listRight.getDescAnchorId(index)+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getDescTranslated()+'</a>';
        var description = object.getDescTranslated();
        this.listUICLeft.setCell((listLeft.getRefCellId(index)),reference);
        this.listUICLeft.setCell((listLeft.getNameCellId(index)),name);
        this.listUICLeft.setCell((listLeft.getTypeCellId(index)),type);
        this.listUICRight.setCell((listRight.getDescCellId(index)),description);
/*
        document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).setAttribute("class",cell01Class);
        document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).setAttribute("style",objectLineStyle+"padding:1px 5px 1px 1px;text-align:right;");
        document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).innerHTML = reference;
        document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).setAttribute("class",cellClass);
        document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).setAttribute("style",objectLineStyle);
        document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).innerHTML = name;
        document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).setAttribute("class",cellClass);
        document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).setAttribute("style",objectLineStyle);
        document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).innerHTML = type;
        document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).setAttribute("class",cellClass);
        document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).setAttribute("style",objectLineStyle);
        document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).innerHTML = description;
*/
      }
    } catch(error) {
      Utils.alert("ObjectsListMediator/fillOneLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  clearOneLine: function(index) {
    try {
      var objectLineClass = ObjectsListMediator.NORMAL_LINE_CLASS_ID;
      var cellClass = ObjectsListMediator.CELL_CLASS_ID;
      var cell01Class = ObjectsListMediator.CELL_01_CLASS_ID;
      if (index === 0) {
        cellClass = ObjectsListMediator.CELL_FIRST_LINE_CLASS_ID;
        cell01Class = ObjectsListMediator.CELL_01_FIRST_LINE_CLASS_ID;
      }
      this.listUICLeft.setCell((this.listUICLeft.getRefCellId(index)),"&nbsp;");
      this.listUICLeft.setCell((this.listUICLeft.getNameCellId(index)),"&nbsp;");
      this.listUICLeft.setCell((this.listUICLeft.getTypeCellId(index)),"&nbsp;");
      this.listUICRight.setCell((this.listUICRight.getDescCellId(index)),"&nbsp;");
/*
      document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).setAttribute("class",objectLineClass+" "+cell01Class);
      document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).innerHTML = '&nbsp;';
      document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).setAttribute("class",objectLineClass+" "+cellClass);
      document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).innerHTML = '&nbsp;';
      document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).setAttribute("class",objectLineClass+" "+cellClass);
      document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).innerHTML = '&nbsp;';
      document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).setAttribute("class",objectLineClass+" "+cellClass);
      document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).innerHTML = '&nbsp;';
*/
    } catch(error) {
      Utils.alert("ObjectsListMediator/clearOneLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  onListClick: function()   { this.listUICLeft.keyboard.activate(); },
  onLineMouseOver: function(evt,color) {
    var id = evt.target.id;
    var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
    //this.highlite(id,color);
    //if (!this.lineEmpty(line)) {
      this.setPointerEvent(evt);
      this.highlite(line,id,color);
      /*$(this.listUICLeft.getRefCellId(line)).setAttribute("style","background-color:"+color);
      $(this.listUICLeft.getNameCellId(line)).setAttribute("style","background-color:"+color);
      $(this.listUICLeft.getTypeCellId(line)).setAttribute("style","background-color:"+color);
      $(this.listUICRight.getDescCellId(line)).setAttribute("style","background-color:"+color);*/
    //}
  },
  onLineMouseOut: function(evt) {
    var id = evt.target.id;
    var line = id.substr(id.length-Sjamayee.ID_PAD_SIZE);
    this.highlite(null,id);
    /*
    if (!this.lineEmpty(line)) {
      $(this.listUICLeft.getRefCellId(line)).setAttribute("style","background-color:inherit;");
      $(this.listUICLeft.getNameCellId(line)).setAttribute("style","background-color:inherit;");
      $(this.listUICLeft.getTypeCellId(line)).setAttribute("style","background-color:inherit;");
      $(this.listUICRight.getDescCellId(line)).setAttribute("style","background-color:inherit;");
    }*/
  },
  onKeydown: function(evt,subEvent) {
    this.parent(evt,subEvent);    
    switch (subEvent) {
      case SjamayeeFacade.ESCAPE:
      break;
      case SjamayeeFacade.SPACE:
      this.onLineClick(this.getPointerEvent());
      break;
      case SjamayeeFacade.ENTER:
      this.onLineClick(this.getPointerEvent());
      break;
      case SjamayeeFacade.UP:
      if (this.getLine() > this.getBeginOfList()) {
        //this.setPointerEvent(evt);
        this.setLine(this.getLine() - 1);
      }
      break;
      case SjamayeeFacade.DOWN:
      if (this.getLine() < this.getEndOfList()) {
        //this.setPointerEvent(evt);
        this.setLine(this.getLine() + 1);
      }
      break;      
    }   
  }
});
ObjectsListMediator.PAGE_SIZE_MIN = 10;
ObjectsListMediator.PAGE_SIZE_MAX = 22;
ObjectsListMediator.NORMAL_LINE_CLASS_ID = "normalListLine";
ObjectsListMediator.FOCUSED_LINE_CLASS_ID = "focusedListLine";
ObjectsListMediator.CELL_CLASS_ID = "listCell";
ObjectsListMediator.CELL_01_CLASS_ID = "listCell01";
ObjectsListMediator.CELL_FIRST_LINE_CLASS_ID = "listCellFirstLine";
ObjectsListMediator.CELL_01_FIRST_LINE_CLASS_ID = "listCell01FirstLine";
ObjectsListMediator.CELL_CONTENT_CLASS_ID = "listCellContent";
ObjectsListMediator.COLUMN_CLASS_ID = "listColumn";
ObjectsListMediator.COLUMN_HEADER_CLASS_ID = "listColumnHeader";
ObjectsListMediator.COLUMN_HEADER_01_CLASS_ID = "listColumnHeader01";
ObjectsListMediator.HOME_MESSAGE_TEXT = "First page.";
ObjectsListMediator.PREVIOUS_MESSAGE_TEXT = "Previous page.";
ObjectsListMediator.UP_MESSAGE_TEXT = "Previous line.";
ObjectsListMediator.DOWN_MESSAGE_TEXT = "Next line.";
ObjectsListMediator.NEXT_MESSAGE_TEXT = "Next page.";
ObjectsListMediator.END_MESSAGE_TEXT = "Last page.";

//Abstract
//Class: RelationsGridMediator
var RelationsGridMediator = new Class({
  Extends: GridListMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.firstTime = true;
    this.grid = null;
    this.gridUICLeft = null;
    this.gridUICRight = null;
    this.pageSize = null;
    this.messageText = null;
    this.typeProxy = null;
    this.entityProxy = null;
    this.relationProxy = null;
    this.attributeProxy = null;
    //For relational linking!
    this.parentRelation = null;
    this.childRelation = null;
    this.previousRelation = null;
    this.currentRelation = null;
    this.nextRelation = null;
    //For navigation!
    this.currentCellId = null;
        
    this.onGridClick = this.onGridClick.bindWithEvent(this);
    this.onCellClick = this.onCellClick.bindWithEvent(this);
    this.onCellMouseOver = this.onCellMouseOver.bindWithEvent(this);
    this.onCellMouseOut = this.onCellMouseOut.bindWithEvent(this);
    //Initialize list.
    this.setBeginOfList(Position.ROW_TOP());
    //this.setEndOfList(GridView.DEFAULT_ROWS - 1); //RelationsGridMediator.PAGE_SIZE_MAX
    this.setPageSize(RelationsGridMediator.PAGE_SIZE_MIN);
    this.setEndOfList(this.getPageSize() - 1);
    this.setCurrentNivo(Position.NIVO_ROOT());
    //Current cellId
    this.currentCellId = this.getRootCellId();
  },
  setMessageText: function(messageText) {
    if (this.messageText === null) {
      var toolBar = null;
      if (this instanceof ModelRelationsGridMediator) {
        toolBar = this.facade.retrieveMediator(ModelRelationsToolBarMediator.ID).getViewComponent();
      } else {
        toolBar = this.facade.retrieveMediator(DataRelationsToolBarMediator.ID).getViewComponent();
      }
      this.messageText = toolBar.messageText;
    }
    this.messageText.value = messageText;
  },
  setDisplay: function(forced) {
    var mode = this.parent(forced);
    if (mode == GridListMediator.MODE_DISPLAY) {
      this.sendNotification(SjamayeeFacade.PARENT_DETAIL);
      this.sendNotification(SjamayeeFacade.CHILD_DETAIL);
    }
    return mode;
  },
  getLastCellId: function(column) {
    var result = null;
    var row = this.getPageSize() - 1;                   //TODO: REDUNDANT !!!
    if (column == RelationsGridRight.COLUMN_VALUE) {
      result = $(this.gridUICRight.getCellId(row));
    } else {
      result = $(this.gridUICLeft.getCellId(row,column));
    }
    return result;
  },  
  getCurrentCellId: function() {
    return this.currentCellId;
  },
  setCurrentCellId: function(cellId) {
    var oldCurrentCellId = null;
    if (cellId != this.getCurrentCellId()) {
      oldCurrentCellId = this.getCurrentCellId();
    }
    //Set new current cell.
    this.currentCellId = cellId;
    $(cellId).focus();
    var evt = this.getPointerEvent();
    //Reset old current cell.
    /*if (evt) {
      if (cellId != evt.target.id) {
        evt.target.id = cellId;
        //this.setPointerEvent(evt);
      }
    }*/
    if (oldCurrentCellId) {
      this.highlite(null,oldCurrentCellId);
    }
    this.highlite(null,cellId,this.getBackgroundHighliteColor());
    //Set Current Nivo.
    var gridColumn = this.getGrid().getColumnByIndex(this.getColumnFromCellId(cellId));
    this.setCurrentNivo(gridColumn.getNivo());
  }, 
  onCurrentCellId: function(cellId) { return (this.getCurrentCellId() == cellId); },
  isCurrentCellIdOnColumn: function(column) {
    var result = false;
    var cellId = this.getCurrentCellId();
    if (cellId) {
      result = (column !== null && column == this.getColumnFromCellId(cellId))?true:false;
    }
    return result;
  },
  isCurrentCellIdOnRoot: function() {
    var result = false;
    var cellId = this.getCurrentCellId();
    var leftColumnId = this.gridUICLeft.id+RelationsGridLeft.COLUMN_ID;
    if (cellId.substr(0,leftColumnId.length) == leftColumnId) {
      var col = this.getColumnFromCellId(cellId);
      var nivo = (this.getGrid().getNivoBase() + Number(col)); //TODO: ATT!!! IS CORRECTION OKE ???
      result = (nivo == Position.NIVO_ROOT())?true:false;
    }
    return result;
  },
  getRootRow: function() {
    var eol = this.getEndOfList();
    if (this.isGridFull()) { eol = eol - 1; }
    return Math.floor(eol / 2);
  },
  getRootCellId: function() {
    var result = null;
    if (this.gridUICLeft) {
      result = this.gridUICLeft.getCellId(this.getRootRow(),Position.COLUMN_ROOT()); //TODO: NOK !!! COLUMN_ROOT !!!
    }
    return result;
  },
  getRowFromCellId: function(cellId) {
    var result = 0;
    if (cellId) {
      result = cellId.substr(cellId.length-(Sjamayee.ID_PAD_SIZE*2+1),Sjamayee.ID_PAD_SIZE);
    }
    return Number(result);
  },
  getColumnFromCellId: function(cellId) {
    var result = RelationsGridRight.COLUMN_VALUE;
    var leftColumnId = this.gridUICLeft.id+RelationsGridLeft.COLUMN_ID;
    if (cellId.substr(0,leftColumnId.length) == leftColumnId) {
      result = cellId.substr(cellId.length-Sjamayee.ID_PAD_SIZE);
    }
    return Number(result);
  },
  isCellEmpty: function(cell) {
    var value = cell.innerHTML;
    return (value === undefined || value === null || value == '&nbsp;' || value.length === 0)?true:false;
  }, 
  getLastNotEmptyCell: function(cellId,onColumn) {
    var _onColumn = onColumn?onColumn:false;
    var result = null;
    var nivo = 0; //null;
    if (cellId) {
      var column = this.getColumnFromCellId(cellId);
      if (column !== null) {
        nivo = Number(this.getGrid().getNivoBase() + column); //TODO: ATT!!! IS CORRECTION OKE ???
        if (nivo == Position.NIVO_ROOT()) {
          result = $(this.getRootCellId());
        }
      }
      if (result === null) {
        //var selectedRow = this.getRowFromCellId(cellId);
        do {
          var _row = this.getRowFromCellId(cellId);
          //var lastCellId = this.getLastCellId(this.getColumnFromCellId(cellId));
          //var _row = this.getRowFromCellId(lastCellId);
          /*if (this.isCurrentCellIdOnColumn(this.getColumnFromCellId(cellId))) {
            if (selectedRow >= _row) {
              cell = $(this.getCurrentCellId());
              break;
            } else {
              _row = selectedRow;
            }
          }*/
          for (var row = _row; row >= Position.ROW_TOP(); row--) {
            var cell = null;
            //column = this.getColumnFromCellId(cellId);
            if (column) {
              if (column == RelationsGridRight.COLUMN_VALUE) {
                cell = $(this.gridUICRight.getCellId(row));
              } else {
                cell = $(this.gridUICLeft.getCellId(row,column));
              }
            }
            if (cell) {
              if (!this.isCellEmpty(cell)) {
                result = cell;
                break;
              }
            }
          }
          if (result) { break; }
          if (_onColumn === true) { break; }
          if (column == RelationsGridRight.COLUMN_VALUE) {
            result = $(this.getRootCellId());
            break;
          }
          if (nivo < Position.NIVO_ROOT()) {
            column++;
          } else {
            column--;
          }
          nivo = Number(this.getGrid().getNivoBase() + column);
          if (nivo == Position.NIVO_ROOT()) {
            result = $(this.getRootCellId());
            break;
          }
          cellId = this.gridUICLeft.getCellId(_row,column);
        } while (nivo != Position.NIVO_ROOT());
      }
    }
    return result;
  },
  getBeginOfList: function(onColumn) {
    var _onColumn = (onColumn !== undefined && onColumn !== null)?onColumn:false;
    var result = this.parent();
    if (_onColumn === true) {
      if (this.getCurrentNivo() == Position.NIVO_ROOT()) {
        result = this.getRootRow();
      }
    }
    return result;
  },
  getEndOfList: function(cellId,onColumn) {
    var _onColumn = (onColumn !== undefined && onColumn !== null)?onColumn:false;
    var result = this.parent();
    if (_onColumn === true) {
      if (this.getCurrentNivo() == Position.NIVO_ROOT()) {
        result = this.getRootRow();
      } else {
        var cell = this.getLastNotEmptyCell(cellId,true);
        if (cell) {
          result = this.getRowFromCellId(cell.id);
        }
      }
    }
    //alert("RelationsGridMediator/getEndOfList - result: "+result);  //TODO: X * X !!!
    return result;
  },
  onGridClick: function() {
    //alert("RelationsGridMediator/onGridClick");
    this.gridUICLeft.keyboard.activate();
  },
  onLineClick: function() {},  
  onCellClick: function(evt) {
    var id = evt.target.id;
    var cell = $(id);
    if (cell) {
      if (this.isCellEmpty(cell)) {
        if (this.isCurrentCellIdOnColumn(this.getColumnFromCellId(id))) {
          cell = $(this.getCurrentCellId());
        } else {
          cell = this.getLastNotEmptyCell(id);
        }
      }
      if (cell) {
        this.setCurrentCellId(cell.id);
      }
    }
  },
  onCellMouseOver: function(evt,color) {
    this.setPointerEvent(evt);
    var id = evt.target.id;
    var cell = $(id);
    if (cell) { this.highlite(null,cell.id,color); }
  },
  onCellMouseOut: function(evt) {
    var id = evt.target.id;
    var cell = $(id);
    if (cell) { this.highlite(null,cell.id); }
  },
  onKeydown: function(evt,subEvent) {
    this.parent(evt,subEvent);
    switch (subEvent) {
      case SjamayeeFacade.ESCAPE:
      var row = this.getRowFromCellId(this.getCurrentCellId());
      var column = this.getColumnFromCellId(this.getCurrentCellId());
      break;
      case SjamayeeFacade.SPACE:
      this.setCurrentCellId(this.getRootCellId());
      break;
      case SjamayeeFacade.ENTER:
      if (!this.getCurrentCellId()) {
        this.onCellClick(this.getPointerEvent());
      }
      var row = this.getRowFromCellId(this.getCurrentCellId());
      var column = this.getColumnFromCellId(this.getCurrentCellId());
      break;
      case SjamayeeFacade.UP:
      var row = this.getRowFromCellId(this.getCurrentCellId());
      var column = this.getColumnFromCellId(this.getCurrentCellId());
      if (row > this.getBeginOfList(true)) {
        row--;
        var cellId = null;
        if (column == RelationsGridRight.COLUMN_VALUE) {
          cellId = this.gridUICRight.getCellId(row);
        } else {
          cellId = this.gridUICLeft.getCellId(row,column);
        }
        this.setCurrentCellId(cellId);
      }
      break;
      case SjamayeeFacade.DOWN:
      var row = this.getRowFromCellId(this.getCurrentCellId());
      var column = this.getColumnFromCellId(this.getCurrentCellId());
      var lastCell = this.getLastCellId(column);
      if (row < this.getEndOfList(lastCell.id,true)) {
        row++;
        var cellId = null;
        if (column == RelationsGridRight.COLUMN_VALUE) {
          cellId = this.gridUICRight.getCellId(row);
        } else {
          cellId = this.gridUICLeft.getCellId(row,column);
        }
        this.setCurrentCellId(cellId);
      }
      break;      
      case SjamayeeFacade.LEFT:
      var row = this.getRowFromCellId(this.getCurrentCellId());
      var column = this.getColumnFromCellId(this.getCurrentCellId());
      this.goLeft();
      break;
      case SjamayeeFacade.RIGHT:
      var row = this.getRowFromCellId(this.getCurrentCellId());
      var column = this.getColumnFromCellId(this.getCurrentCellId());
      this.goRight();
      break;
    }   
  },
  //onLeft: function()  { alert("RelationsGridMediator/onLeft"); },
  //onRight: function() { alert("RelationsGridMediator/onRight"); },
  
  goLeft: function() {
    var ok = false;
    var homeView = false;
      var relation = null;
    var nextColumn = null;
    var savedCell = null;
    var selectedCell = null;
    var relation = null;      
    //var position = this.getPosition();
    
    var currentCellId = this.getCurrentCellId();
    var column = this.getColumnFromCellId(currentCellId);
    var row = this.getRowFromCellId(currentCellId);
    
    //if (position) {
      //var column = this.getGrid().getColumnByIndex(position.getColumn());
      var gridColumn = this.getGrid().getColumnByIndex(column);
      if (gridColumn) {
        this.setCurrentNivo(gridColumn.getNivo());
        //var cell = column.getCell(position.getRow());
        var cell = gridColumn.getCell(row);
        if (!cell) {
          if (this.getCurrentNivo() > Position.NIVO_ROOT()) {
            //TO RETURN FROM EMPTY COLUMN!
            ok = true;
          }
        } else {
          if (cell.navigationLeft()) {
            relation = cell.getRelation();
            ok = true;
          }
        }
        if (ok) {
          var cn = this.getCurrentNivo();
          if (cn > Position.WHERE_MAX()) {
            cn = (cn - 1);                           // TEST LIMIT !!!
            if (cn < (Position.NIVO_ROOT() - 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
              gridColumn.setSavedCell(cell);             // TODO: # cells -> clear column !!!
            } else if (cn >= Position.NIVO_ROOT()) {
              selectedCell = gridColumn.getSavedCell();
              if (gridColumn.getNivo() >= this.getGrid().getWhatUsedNivo() || gridColumn.isSelected() === false) {
                gridColumn.setSavedCell(cell);
              }
            }
            nextColumn = this.getGrid().getColumnByNivo(cn);
            if (nextColumn) {
              //result = true;
              this.setCurrentNivo(cn);
              if (cn <= Position.NIVO_ROOT()) {
                //homeView = this.isHomeView();
              }
              if (cn < this.getGrid().getWhereUsedNivo()) {
                this.getGrid().setWhereUsedNivo(cn);
              }
              savedCell = nextColumn.getSavedCell();
              //if (position) { position.left(savedCell); }
              
              var position = this.getPosition();
              if (position) {
                position.setRow(row);
                position.setColumn(column);
                position.left(savedCell);
              }
              
              if (homeView === true) {
                if (nextColumn.isMasterChanged() === false) {
                  if (selectedCell) {
                  //selectedCell.touch(((selectedCell.isSelected())?true:false));
                    selectedCell.touch(selectedCell.isSelected());
                  }
                //cell.touch(((gridCell.isSelected())?true:false));
                  cell.touch(gridCell.isSelected());
                  savedCell.touch(true);
                  //this.setParentAndChild(savedCell);
                //result = false;
                }
              }
            }
          }
        }
      }  
    //}
/*      
    var nivo = this.getCurrentNivo();
    if (nivo <= (Position.NIVO_ROOT()+1)) {
      var position = this.getPosition();
      var column = position.getColumn();
      if (column > Position.COLUMN_FIRST()) {
        column = (column - 1);
        position.setColumn(column);
      }
    }
    if (nivo > Position.WHERE_MAX()) {
      nivo = (nivo - 1);
      this.setCurrentNivo(nivo);        
    }
*/
    //var col = this.getPosition().getColumn();
    //var row = this.getPosition().getRow();
    //Fill grid.
    this.fillGrid();
  },
  goRight: function() {
    var ok = false;
    var homeView = false;
    var relation = null;
    var nextColumn = null;
    var savedCell = null;
    var selectedCell = null;
    var relation = null;
    //var position = this.getPosition();

    var currentCellId = this.getCurrentCellId();
    var column = this.getColumnFromCellId(currentCellId);
    var row = this.getRowFromCellId(currentCellId);

    //if (position) {
      //var column = this.getGrid().getColumnByIndex(position.getColumn());
      var gridColumn = this.getGrid().getColumnByIndex(column);
      if (gridColumn) {
        this.setCurrentNivo(gridColumn.getNivo());
        //var cell = column.getCell(position.getRow());
        var cell = gridColumn.getCell(row);
        relation = cell.getRelation();
        if (cell.navigationRight()) {
          var cn = this.getCurrentNivo();

          if (cn < Position.WHAT_MAX()) {
            cn = (cn + 1);                           // TEST LIMIT !!!
            if (cn > (Position.NIVO_ROOT() + 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
              gridColumn.setSavedCell(cell);             // TODO: # cells -> clear column !!!
            } else if (cn <= Position.NIVO_ROOT()) {
              selectedCell = gridColumn.getSavedCell();
              if (gridColumn.getNivo() <= this.getGrid().getWhereUsedNivo() || gridColumn.isSelected() === false) {
                gridColumn.setSavedCell(cell);
              }
            }
            nextColumn = this.getGrid().getColumnByNivo(cn);
            if (nextColumn) {
              //result = true;
              this.setCurrentNivo(cn);
              if (cn > Position.NIVO_COLUMN_FIRST()) {
                //homeView = this.isHomeView();       
              }
              if (cn > this.getGrid().getWhatUsedNivo()) {
                this.getGrid().setWhatUsedNivo(cn);
              }
              savedCell = nextColumn.getSavedCell();
              //if (position) { position.right(savedCell); }
              
              var position = this.getPosition();
              if (position) {
                position.setRow(row);
                position.setColumn(column);
                position.right(savedCell);
              }
              
              ok = true;
              if (homeView === true) {
                if (!nextColumn.isMasterChanged() === true) {
                  if (selectedCell) {
                  //selectedCell.touch(((selectedCell.isSelected())?true:false));
                    selectedCell.touch(selectedCell.isSelected());
                  }
                //gridCell.touch(((gridCell.isSelected())?true:false));
                  cell.touch(cell.isSelected());
                  savedCell.touch(true);
                  this.setParentAndChild(savedCell);
                //result = false;
                }
              }
            }
          }
        }         
      }  
    //}
/*
    var nivo = this.getCurrentNivo();
    if (nivo >= Position.NIVO_COLUMN_FIRST()) {     
      var position = this.getPosition();
      var column = position.getColumn();
      if (column < 4) {                   //TODO: MAX COLS ??? DEFINITION
        column = (column + 1);
        position.setColumn(column);
      }
    }
    if (nivo < Position.WHAT_MAX()) {
      nivo = (nivo + 1);
      this.setCurrentNivo(nivo);        
    }
*/
    //var col = this.getPosition().getColumn();
    //var row = this.getPosition().getRow();
    //Fill grid.
    this.fillGrid();
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.GRID_CELL_CLICK,
    /*SjamayeeFacade.GRID_ESCAPE,
      SjamayeeFacade.GRID_SPACE,
      SjamayeeFacade.GRID_ENTER,
      SjamayeeFacade.GRID_HOME,
      SjamayeeFacade.GRID_PREVIOUS,
      SjamayeeFacade.GRID_UP,
      SjamayeeFacade.GRID_LEFT,
      SjamayeeFacade.GRID_RIGHT,
      SjamayeeFacade.GRID_DOWN,
      SjamayeeFacade.GRID_NEXT,
      SjamayeeFacade.GRID_END,
      SjamayeeFacade.GRID_FOCUS,*/
      SjamayeeFacade.GRID_4X_SHOW,
      SjamayeeFacade.GRID_4C_SHOW,
      SjamayeeFacade.GRID_5C_SHOW,
      SjamayeeFacade.GRID_6C_SHOW,
      SjamayeeFacade.GRID_7C_SHOW,
      SjamayeeFacade.GRID_8C_SHOW
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var gridList = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.GRID_CELL_CLICK:
      var evt = note.getBody();
      //this.setCurrentPosition(evt);
      var position = this.getPosition();
      var column = this.getGrid().getColumnByIndex(position.getColumn());
      this.setCurrentNivo(column.getNivo());
      var cell = this.getCell();
      var cellValue = this.getCellValue(position.getRow());
      //if (cellValue.length == 0) {
      //if (cellValue == '&nbsp;') {
      if (cellValue === null) {
        if (this.getCurrentNivo() == Position.NIVO_ROOT()) {
          //cell = this.getCell(this.getRootRow());
          this.setPosition(new Position(this.getRootRow(),position.getColumn()));
          //this.setPosition(new Position(Position.ROW_ROOT(),position.getColumn()));
        } else if (column.isSelected() === true){
          var savedCell = column.getSavedCell();
          this.setPosition(new Position(savedCell.getPosition().getRow(),position.getColumn()));
        } else {
          //this.setPosition(new Position(Position.ROW_TOP(),position.getColumn()));        
          var lastRow = this.getLastLine(); //Row();
          this.setPosition(new Position(lastRow,position.getColumn()));       
        }
      }
      this.sendNotification(SjamayeeFacade.GRID_FOCUS, cell);     
      break;
      case SjamayeeFacade.GRID_KEYPRESS:
      break;
    /*case SjamayeeFacade.GRID_ESCAPE:
      break;
      case SjamayeeFacade.GRID_SPACE:
      var position = this.getPosition();
      position.setRow(this.getRootRow());                                 //TODO: Refactor !!!
      position.setColumn(Position.COLUMN_ROOT());
      this.setCurrentNivo(Position.NIVO_ROOT());            
      break;
      case SjamayeeFacade.GRID_ENTER:
      var position = this.getPosition();
      //this.sendNotification(SjamayeeFacade.FOCUS, RelationsGridRight.COLUMN_ID+'c00');
      this.sendNotification(SjamayeeFacade.FOCUS, CommonToolBar.MESSAGE_TEXT_ID);
      break;
      case SjamayeeFacade.GRID_HOME:
      var position = this.getPosition();
      position.setRow(this.getBeginOfList());
      this.home();
      break;
      case SjamayeeFacade.GRID_PREVIOUS:
      break;
      case SjamayeeFacade.GRID_UP:
      //var position = this.getPosition();
      //position.setRow(position.getRow()-1);
      this.lineUp();
      //Fill grid.
      this.fillGrid();      
      break;
      case SjamayeeFacade.GRID_LEFT:
      var ok = false;
      var homeView = false;
      var relation = null;
      var nextColumn = null;
      var savedCell = null;
      var selectedCell = null;
      var relation = null;      
      var position = this.getPosition();      
      if (position) {
        var column = this.getGrid().getColumnByIndex(position.getColumn());
        if (column) {
          this.setCurrentNivo(column.getNivo());
          var cell = column.getCell(position.getRow());
          if (!cell) {
            if (this.getCurrentNivo() > Position.NIVO_ROOT()) {
              //TO RETURN FROM EMPTY COLUMN!
              ok = true;
            }
          } else {
            if (cell.navigationLeft()) {
              relation = cell.getRelation();
              ok = true;
            }
          }
          if (ok) {
            var cn = this.getCurrentNivo();
            if (cn > Position.WHERE_MAX()) {
              cn = (cn - 1);                           // TEST LIMIT !!!
              if (cn < (Position.NIVO_ROOT() - 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
                column.setSavedCell(cell);             // TODO: # cells -> clear column !!!
              } else if (cn >= Position.NIVO_ROOT()) {
                selectedCell = column.getSavedCell();
                if (column.getNivo() >= this.getGrid().getWhatUsedNivo()) || column.isSelected() === false) {
                  column.setSavedCell(cell);
                }
              }
              nextColumn = this.getGrid().getColumnByNivo(cn);
              if (nextColumn) {
                //result = true;
                this.setCurrentNivo(cn);
                if (cn <= Position.NIVO_ROOT()) {
                  //homeView = this.isHomeView();
                }
                if (cn < this.getGrid().getWhereUsedNivo()) {
                  this.getGrid().setWhereUsedNivo(cn);
                }
                savedCell = nextColumn.getSavedCell();
                if (position) { position.left(savedCell); }
                if (homeView === true) {
                  if (nextColumn.isMasterChanged() === false) {
                    if (selectedCell) {
                    //selectedCell.touch(((selectedCell.isSelected())?true:false));
                      selectedCell.touch(selectedCell.isSelected());
                    }
                  //cell.touch(((gridCell.isSelected())?true:false));
                    cell.touch(gridCell.isSelected());
                    savedCell.touch(true);
                    //this.setParentAndChild(savedCell);
                  //result = false;
                  }
                }
              }
            }
          }
        }  
      }
**      
      var nivo = this.getCurrentNivo();
      if (nivo <= (Position.NIVO_ROOT()+1)) {
        var position = this.getPosition();
        var column = position.getColumn();
        if (column > Position.COLUMN_FIRST()) {
          column = (column - 1);
          position.setColumn(column);
        }
      }
      if (nivo > Position.WHERE_MAX()) {
        nivo = (nivo - 1);
        this.setCurrentNivo(nivo);        
      }
**
      //var col = this.getPosition().getColumn();
      //var row = this.getPosition().getRow();
      //Fill grid.
      this.fillGrid();
      break;
      case SjamayeeFacade.GRID_RIGHT:
      var ok = false;
      var homeView = false;
      var relation = null;
      var nextColumn = null;
      var savedCell = null;
      var selectedCell = null;
      var relation = null;
      var position = this.getPosition();
      if (position) {
        var column = this.getGrid().getColumnByIndex(position.getColumn());
        if (column) {
          this.setCurrentNivo(column.getNivo());
          var cell = column.getCell(position.getRow());
          relation = cell.getRelation();
          if (cell.navigationRight()) {
            var cn = this.getCurrentNivo();
            
            if (cn < Position.WHAT_MAX()) {
              cn = (cn + 1);                           // TEST LIMIT !!!
              if (cn > (Position.NIVO_ROOT() + 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
                column.setSavedCell(cell);             // TODO: # cells -> clear column !!!
              } else if (cn <= Position.NIVO_ROOT()) {
                selectedCell = column.getSavedCell();
                if (column.getNivo() <= this.getGrid().getWhereUsedNivo() || column.isSelected() === false) {                 
                  column.setSavedCell(cell);
                }
              }
              nextColumn = this.getGrid().getColumnByNivo(cn);
              if (nextColumn) {
                //result = true;
                this.setCurrentNivo(cn);
                if (cn > Position.NIVO_COLUMN_FIRST()) {
                  //homeView = this.isHomeView();       
                }
                if (cn > this.getGrid().getWhatUsedNivo()) {
                  this.getGrid().setWhatUsedNivo(cn);
                }
                savedCell = nextColumn.getSavedCell();               
                if (position) { position.right(savedCell); }
                ok = true;
                if (homeView === true) {
                  if (!nextColumn.isMasterChanged() === true) {
                    if (selectedCell) {
                    //selectedCell.touch(((selectedCell.isSelected())?true:false));
                      selectedCell.touch(selectedCell.isSelected());
                    }
                  //gridCell.touch(((gridCell.isSelected())?true:false));
                    cell.touch(cell.isSelected());
                    savedCell.touch(true);
                    this.setParentAndChild(savedCell);
                  //result = false;
                  }
                }
              }
            }
          }         
        }  
      }
**
      var nivo = this.getCurrentNivo();
      if (nivo >= Position.NIVO_COLUMN_FIRST()) {     
        var position = this.getPosition();
        var column = position.getColumn();
        if (column < 4) {                   //TODO: MAX COLS ??? DEFINITION
          column = (column + 1);
          position.setColumn(column);
        }
      }
      if (nivo < Position.WHAT_MAX()) {
        nivo = (nivo + 1);
        this.setCurrentNivo(nivo);        
      }
**
      //var col = this.getPosition().getColumn();
      //var row = this.getPosition().getRow();
      //Fill grid.
      this.fillGrid();
      break;
      case SjamayeeFacade.GRID_DOWN:
      //var position = this.getPosition();
      //position.setRow(position.getRow()+1);
      this.lineDown();
      //Fill grid.
      this.fillGrid();
      break;
      case SjamayeeFacade.GRID_NEXT:
      break;
      case SjamayeeFacade.GRID_END:
      var position = this.getPosition();
      position.setRow(this.getEndOfList());
      this.end();
      break;*/
      case SjamayeeFacade.GRID_FOCUS:
      //var element = note.getBody();
      //element.focus();
      //Fill grid.
      this.fillGrid();
      break;
      case SjamayeeFacade.GRID_4X_SHOW:
      //Set Column Classes: 4(What/25)
      var columnId = this.gridUICLeft.getColumnId(0); //RelationsGridLeft.getColumnId(0);
      this.gridUICLeft.removeClass(columnId);
      $(columnId).addClass(GridColumn.WHAT_USED_LEFT_CLASS_ID);
      $(columnId).addClass(GridColumn.WHAT_USED_LEFT_4X_CLASS_ID);
      columnId = this.gridUICLeft.getColumnId(1); //RelationsGridLeft.getColumnId(1);
      this.gridUICLeft.removeClass(columnId);
      $(columnId).addClass(GridColumn.WHAT_USED_LEFT_CLASS_ID);
      $(columnId).addClass(GridColumn.WHAT_USED_LEFT_4X_CLASS_ID);
      if (Position.COLUMNS_MAX() > 2) {
        columnId = this.gridUICLeft.getColumnId(2); //RelationsGridLeft.getColumnId(2);
        this.gridUICLeft.removeClass(columnId);
        $(columnId).addClass(GridColumn.WHAT_USED_LEFT_CLASS_ID);
        $(columnId).addClass(GridColumn.WHAT_USED_LEFT_4X_CLASS_ID);
      }
      if (Position.COLUMNS_MAX() > 3) {
        columnId = this.gridUICLeft.getColumnId(3); //RelationsGridLeft.getColumnId(3);
        this.gridUICLeft.removeClass(columnId);
        $(columnId).addClass(GridColumn.WHAT_USED_LEFT_CLASS_ID);
        $(columnId).addClass(GridColumn.WHAT_USED_LEFT_4X_CLASS_ID);
      }
      //Set show/hide
      $(this.gridUICLeft.getColumnId(0)).setAttribute("style","display:block;");
      $(this.gridUICLeft.getColumnId(1)).setAttribute("style","display:block;");
      if (Position.COLUMNS_MAX() > 2) {
        $(this.gridUICLeft.getColumnId(2)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 3) {
        $(this.gridUICLeft.getColumnId(3)).setAttribute("style","display:block;");
      }
      for (var i = Position.COLUMN_WHAT_FIRST(); i < Position.COLUMNS_MAX(); i++) {
        $(this.gridUICLeft.getColumnId(i)).setAttribute("style","display:none;");
      }
      gridList.gridListSplitter.left.setAttribute("style","width:35%;height:100%;display:block;");
      gridList.gridListSplitter.right.setAttribute("style","width:100%;height:100%;display:block;");
      this.resizeSplitter();
      break;      
      case SjamayeeFacade.GRID_4C_SHOW:
      var root = note.getBody();
      if (root === undefined || root === null) { root = this.gridUICLeft.getColumnId(3); }
      //Set Column Classes: 3(Where/23)+1(Root/31)
      for (var i = Position.COLUMN_FIRST(); i < Position.COLUMN_WHAT_FIRST(); i++) {
        var columnId = this.gridUICLeft.getColumnId(i);
        this.gridUICLeft.removeClass(columnId);
        if (columnId == root) {
          $(columnId).addClass(GridColumn.WHERE_USED_CLASS_ID);
          $(columnId).addClass(GridColumn.ROOT_4C_CLASS_ID);        
        } else if (columnId < root) {
          $(columnId).addClass(GridColumn.WHERE_USED_CLASS_ID);
          $(columnId).addClass(GridColumn.WHERE_USED_4C_CLASS_ID);
        } else {
          $(columnId).addClass(GridColumn.WHAT_USED_LEFT_CLASS_ID);
          $(columnId).addClass(GridColumn.WHAT_USED_LEFT_4C_CLASS_ID);         
        }
      }      
      //Set show/hide
      $(this.gridUICLeft.getColumnId(0)).setAttribute("style","display:block;");
      $(this.gridUICLeft.getColumnId(1)).setAttribute("style","display:block;");
      if (Position.COLUMNS_MAX() > 2) {
        $(this.gridUICLeft.getColumnId(2)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 3) {
        $(this.gridUICLeft.getColumnId(3)).setAttribute("style","display:block;");
      }
      for (var i = Position.COLUMN_WHAT_FIRST(); i < Position.COLUMNS_MAX(); i++) {
        $(this.gridUICLeft.getColumnId(i)).setAttribute("style","display:none;");
      }
      gridList.gridListSplitter.left.setAttribute("style","width:35%;height:100%;display:block;");
      gridList.gridListSplitter.right.setAttribute("style","width:100%;height:100%;display:block;");
      this.resizeSplitter();
      break;
      case SjamayeeFacade.GRID_5C_SHOW:
      //Set Column Classes: 4(Where/18.5)+1(Root/26)
      for (var i = Position.COLUMN_FIRST(); i < (Position.COLUMNS_MAX() - 4); i++) {
        var columnId = this.gridUICLeft.getColumnId(i);
        this.gridUICLeft.removeClass(columnId);
        $(columnId).addClass(GridColumn.WHERE_USED_CLASS_ID);
        $(columnId).addClass(GridColumn.WHERE_USED_5C_CLASS_ID);
      }
      this.gridUICLeft.removeClass(this.gridUICLeft.getColumnId(Position.COLUMNS_MAX()-4));
      $(this.gridUICLeft.getColumnId(Position.COLUMNS_MAX()-4)).addClass(GridColumn.WHERE_USED_CLASS_ID);
      $(this.gridUICLeft.getColumnId(Position.COLUMNS_MAX()-4)).addClass(GridColumn.ROOT_5C_CLASS_ID);
      //Set show/hide
      $(this.gridUICLeft.getColumnId(0)).setAttribute("style","display:block;");
      $(this.gridUICLeft.getColumnId(1)).setAttribute("style","display:block;");
      if (Position.COLUMNS_MAX() > 2) {
        $(this.gridUICLeft.getColumnId(2)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 3) {
        $(this.gridUICLeft.getColumnId(3)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 4) {
        $(this.gridUICLeft.getColumnId(4)).setAttribute("style","display:block;");
      }
      for (var i = (Position.COLUMN_WHAT_FIRST() + 1); i < Position.COLUMNS_MAX(); i++) {
        $(this.gridUICLeft.getColumnId(i)).setAttribute("style","display:none;");
      }
      gridList.gridListSplitter.left.setAttribute("style","width:52%;height:100%;display:block;");
      gridList.gridListSplitter.right.setAttribute("style","width:100%;height:100%;display:block;");
      this.resizeSplitter();
      break;
      case SjamayeeFacade.GRID_6C_SHOW:
      //Set Column Classes: 5(Where/16)+1(Root/20)
      for (var i = Position.COLUMN_FIRST(); i < (Position.COLUMNS_MAX() - 3); i++) {
        var columnId = this.gridUICLeft.getColumnId(i);
        this.gridUICLeft.removeClass(columnId);
        $(columnId).addClass(GridColumn.WHERE_USED_CLASS_ID);
        $(columnId).addClass(GridColumn.WHERE_USED_6C_CLASS_ID);
      }
      this.gridUICLeft.removeClass(this.gridUICLeft.getColumnId(Position.COLUMNS_MAX()-3));
      $(this.gridUICLeft.getColumnId(Position.COLUMNS_MAX()-3)).addClass(GridColumn.WHERE_USED_CLASS_ID);
      $(this.gridUICLeft.getColumnId(Position.COLUMNS_MAX()-3)).addClass(GridColumn.ROOT_6C_CLASS_ID);      
      //Set show/hide
      $(this.gridUICLeft.getColumnId(0)).setAttribute("style","display:block;");
      $(this.gridUICLeft.getColumnId(1)).setAttribute("style","display:block;");
      if (Position.COLUMNS_MAX() > 2) {
        $(this.gridUICLeft.getColumnId(2)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 3) {
        $(this.gridUICLeft.getColumnId(3)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 4) {
        $(this.gridUICLeft.getColumnId(4)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 5) {
        $(this.gridUICLeft.getColumnId(5)).setAttribute("style","display:block;");
      }
      for (var i = (Position.COLUMN_WHAT_FIRST() + 2); i < Position.COLUMNS_MAX(); i++) {
        $(this.gridUICLeft.getColumnId(i)).setAttribute("style","display:none;");
      }
      gridList.gridListSplitter.left.setAttribute("style","width:68%;height:100%;display:block;");
      gridList.gridListSplitter.right.setAttribute("style","width:100%;height:100%;display:block;");
      this.resizeSplitter();
      break;
      case SjamayeeFacade.GRID_7C_SHOW:
      //Set Column Classes: 6(Where/14)+1(Root/16)
      for (var i = Position.COLUMN_FIRST(); i < (Position.COLUMNS_MAX() - 2); i++) {
        var columnId = this.gridUICLeft.getColumnId(i);
        this.gridUICLeft.removeClass(columnId);
        $(columnId).addClass(GridColumn.WHERE_USED_CLASS_ID);
        $(columnId).addClass(GridColumn.WHERE_USED_7C_CLASS_ID);
      }
      this.gridUICLeft.removeClass(this.gridUICLeft.getColumnId(Position.COLUMNS_MAX()-2));
      $(this.gridUICLeft.getColumnId(Position.COLUMNS_MAX()-2)).addClass(GridColumn.WHERE_USED_CLASS_ID);
      $(this.gridUICLeft.getColumnId(Position.COLUMNS_MAX()-2)).addClass(GridColumn.ROOT_7C_CLASS_ID);
      //Set show/hide
      $(this.gridUICLeft.getColumnId(0)).setAttribute("style","display:block;");
      $(this.gridUICLeft.getColumnId(1)).setAttribute("style","display:block;");
      if (Position.COLUMNS_MAX() > 2) {
        $(this.gridUICLeft.getColumnId(2)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 3) {
        $(this.gridUICLeft.getColumnId(3)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 4) {
        $(this.gridUICLeft.getColumnId(4)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 5) {
        $(this.gridUICLeft.getColumnId(5)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 6) {
        $(this.gridUICLeft.getColumnId(6)).setAttribute("style","display:block;");
      }
      for (var i = (Position.COLUMN_WHAT_FIRST() + 3); i < Position.COLUMNS_MAX(); i++) {
        $(this.gridUICLeft.getColumnId(i)).setAttribute("style","display:none;");
      }
      gridList.gridListSplitter.left.setAttribute("style","width:87.5%;height:100%;display:block;");
      gridList.gridListSplitter.right.setAttribute("style","width:100%;height:100%;display:block;");
      this.resizeSplitter();
      break;
      case SjamayeeFacade.GRID_8C_SHOW:
      //Set Column Classes: 8(Where/12.5)
      for (var i = Position.COLUMN_FIRST(); i < Position.COLUMNS_MAX(); i++) {
        var columnId = this.gridUICLeft.getColumnId(i);
        this.gridUICLeft.removeClass(columnId);
        $(columnId).addClass(GridColumn.WHERE_USED_CLASS_ID);
        $(columnId).addClass(GridColumn.WHERE_USED_8C_CLASS_ID);
      }           
      //Set show/hide
      $(this.gridUICLeft.getColumnId(0)).setAttribute("style","display:block;");
      $(this.gridUICLeft.getColumnId(1)).setAttribute("style","display:block;");
      if (Position.COLUMNS_MAX() > 2) {
        $(this.gridUICLeft.getColumnId(2)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 3) {
        $(this.gridUICLeft.getColumnId(3)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 4) {
        $(this.gridUICLeft.getColumnId(4)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 5) {
        $(this.gridUICLeft.getColumnId(5)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 6) {
        $(this.gridUICLeft.getColumnId(6)).setAttribute("style","display:block;");
      }
      if (Position.COLUMNS_MAX() > 7) {
        $(this.gridUICLeft.getColumnId(7)).setAttribute("style","display:block;");
      }
      gridList.gridListSplitter.left.setAttribute("style","width:100%;height:100%;display:block;");
      gridList.gridListSplitter.right.setAttribute("style","display:none;");
      this.resizeSplitter();
      break;
    }
  },
  getGrid: function()                         { return this.grid; },
  setGrid: function(grid)                     { this.grid = grid; },
  getTypeProxy: function()                    { return this.typeProxy; },
  setTypeProxy: function(typeProxy)           { this.typeProxy = typeProxy; },
  getEntityProxy: function()                  { return this.entityProxy; },
  setEntityProxy: function(entityProxy)       { this.entityProxy = entityProxy; },
  getRelationProxy: function()                { return this.relationProxy; },
  setRelationProxy: function(relationProxy)   { this.relationProxy = relationProxy; },
  getAttributeProxy: function()               { return this.attributeProxy; },
  setAttributeProxy: function(attributeProxy) { this.attributeProxy = attributeProxy; },
  
  resizeSplitter: function() {
    if (dijit) {
      var splitter = dijit.byId(GridListSplitter.ID);
      if (splitter) { splitter.resize(); }
    }
  },
  getGridSize: function() {
    return this.getListSize();
  },
  getPageSize: function() {
    return this.pageSize;
  },
  setPageSize: function(pageSize) {
    this.pageSize = pageSize;
  },
  gridResize: function(gridSize) {
    if (gridSize !== undefined) {
      this.setGridSize(gridSize);
    } else {
      if (this.isGridNormal() === true) {
        this.setGridSize(SjamayeeFacade.SIZE_FULL);
      } else {
        this.setGridSize(SjamayeeFacade.SIZE_NORMAL);
      }
    }
  },
  isGridNormal: function() {
    return (this.getGridSize() == SjamayeeFacade.SIZE_NORMAL)?true:false;
  },
  isGridFull: function() {
    return (this.getGridSize() == SjamayeeFacade.SIZE_FULL)?true:false;
  },
  getMaxOfList: function() {
    return (RelationsGridMediator.PAGE_SIZE_MAX - 1);
  },
  //Abstract
  setResizeButtonText: function(text) {},
  setPosition: function(position) {
    this.getGrid().getPosition().setRow(position.getRow());
    this.getGrid().getPosition().setColumn(position.getColumn());
  },
  getPosition: function() {
    return this.getGrid().getPosition();
  },
/*TODO: STILL NEEDED / CONFLICTS !!!
  setCurrentPosition: function(evt) {
    var elementId = evt.target.id; //evt.currentTarget.id; //evt.target.id;
    **var elementId = null;
    if (evt.target) {
      elementId = evt.target.id;
    }**
    if (elementId) {
      if (elementId.length > 0) {
        var lastPosition = (elementId.length - 1);
        if ((elementId.charAt(lastPosition) == "D") ||
            (elementId.charAt(lastPosition) == "a")) {
          lastPosition = (lastPosition - 1);
        }
        var row = elementId.charAt(lastPosition);
        var column = elementId.charAt(lastPosition-1);
        this.setPosition(new Position(row,column));
      }
    }
  },
*/
  getCell: function(line) {
    var position = this.getPosition();
    var _line = line?line:position.getRow();
    //ATT: WHAT-column is equal to last WHERE-column !!!
    var id = RelationsGridLeft.COLUMN_ID+"c"+position.getColumn()+_line; //+"a";
    return $(id);
  },
  getCellValue: function(line) {
    var result = null; //'';
    var cell = this.getCell(line);
    if (cell) {
      /*if (cell.innerHTML.length > 0) {
        result = cell.innerHTML;
      }*/
      var cellAnchor = $(cell.id+'a');
      if (cellAnchor) {
        if (cellAnchor.innerHTML.length > 0) {
          result = cellAnchor.innerHTML;
        }
      }
    }
    return result;
  },
  highlite: function(cell,cellId,bgColor) {
    var _cell = cell?cell:null;
    var _cellId = cellId?cellId:null;
    var _bgColor = bgColor?bgColor:"inherit";    
  /*if (cell) {
      //Highlite selected cell.
      if (cell.isSelected()) {
        if (cell.getNivo() < Position.NIVO_ROOT()) {
          $(cellId).addClass(GridCell.WHERE_USED_SELECTED_CLASS_ID);
        } else if (cell.getNivo() > Position.NIVO_ROOT()) {
          $(cellId).addClass(GridCell.WHAT_USED_SELECTED_CLASS_ID);
        }
      }
      //Highlite focused cell.
      if (cell.getPosition().getRow() == this.getPosition().getRow()) {
        if (cell.getNivo() == this.getCurrentNivo()) {            
          if (cell.getNivo() == Position.NIVO_ROOT()) {
            $(cellId).addClass(GridCell.ROOT_FOCUSED_CLASS_ID);        
          } else if (cell.getNivo() < Position.NIVO_ROOT()) {
            $(cellId).addClass(GridCell.WHERE_USED_FOCUSED_CLASS_ID);
          } else if (cell.getNivo() > Position.NIVO_ROOT()) {
            $(cellId).addClass(GridCell.WHAT_USED_FOCUSED_CLASS_ID);
          }
        }
      }
    }*/
    //Current position - focus (NEW)
    if ($(_cellId)) {
      $(_cellId).removeAttribute("style");
      //$(_cellId).setAttribute("style","font-weight:normal;");
      var color = "inherit";
      var fontWeight = ";";
      if (_cellId == this.getRootCellId()) {
        if (!this.isCellEmpty($(_cellId))) {
          _bgColor = FontStyle.COLOR_ROOT();
          color = "white"; //"black";
          if (!this.onCurrentCellId(_cellId)) {
            color = "black"; //"white";

          }
          fontWeight = ";font-weight:bold;";
        }
      }
      if (this.onCurrentCellId(_cellId)) {      
        fontWeight = ";font-weight:bold;";
      }
      $(_cellId).setAttribute("style","background-color:"+_bgColor+";color:"+color+fontWeight);
    }
  },
  getLine: function() {
    var result = this.getPosition().getRow();
    if (result < this.getBeginOfList()) {
      result = this.getBeginOfList();
    } else if (result > this.getEndOfList()) {
      result = this.getEndOfList();
    } 
    return result;
  },
  setLine: function(line) {
    this.getPosition().setRow(line);
  },
  lineEmpty: function(line) {
    var value = this.getCellValue(line);
    return (value === undefined || value === null || value.length === 0)?true:false;
  },
  lineUp: function() {
    try {
      var line = this.getLine();
      if (line > this.getBeginOfList()) {
        var previousLine = (line - 1);
        if (!this.lineEmpty(previousLine)) {
          this.setLine(previousLine);
        }
      }
    } catch(error) {
      Utils.alert("RelationsGridMediator/lineUp Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this.getLine();
    }
  },
  lineDown: function() {
    try {
      var line = this.getLine();
      if (line < this.getEndOfList()) {
        var nextLine = (line + 1);
        if (!this.lineEmpty(nextLine)) {
          this.setLine(nextLine);
        }
      }
    } catch(error) {
      Utils.alert("RelationsGridMediator/lineDown Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this.getLine();
    }
  },
  getCurrentNivo: function() {
    //return this.getGrid().getCurrentNivo();
    var result = Position.NIVO_ROOT();
    if (this.getGrid()) {
      result = this.getGrid().getCurrentNivo();
    }
    return result;
  },
  setCurrentNivo: function(nivo) {
    var _nivo = nivo;
    if (_nivo < Position.WHERE_MAX()) {
      _nivo = Position.WHERE_MAX();
    }
    if (_nivo > Position.WHAT_MAX()) {
      _nivo = Position.WHAT_MAX();
    }
    var currentNivo = this.getCurrentNivo();
    if (_nivo != currentNivo) {
      //this.currentNivo = _nivo;
      this.getGrid().setCurrentNivo(_nivo);
      if (_nivo > 4) {
        this.sendNotification(SjamayeeFacade.GRID_4X_SHOW);
      } else if (_nivo >= -3) {
        var root = this.gridUICLeft.getColumnId(3);
        if (_nivo == 2) { root = this.gridUICLeft.getColumnId(2); }
        if (_nivo == 3) { root = this.gridUICLeft.getColumnId(1); }
        if (_nivo == 4) { root = this.gridUICLeft.getColumnId(0); }
        this.sendNotification(SjamayeeFacade.GRID_4C_SHOW,root);
      } else if (_nivo >= -4) {
        this.sendNotification(SjamayeeFacade.GRID_5C_SHOW);
      } else if (_nivo >= -5) {
        this.sendNotification(SjamayeeFacade.GRID_6C_SHOW);
      } else if (_nivo >= -6) {
        this.sendNotification(SjamayeeFacade.GRID_7C_SHOW);
      } else if (_nivo < -6) {
        this.sendNotification(SjamayeeFacade.GRID_8C_SHOW);       
      }
    }
  },
//Abstract
  createRelationVO: function(entity) { return undefined; },
  createRelation: function(vo)       { return undefined; },
  
  switchEntity: function(entityName) {
    var _entityName = (entityName !== undefined)?entityName:null;
    var entitySwitched = false;
    try {
      if (_entityName && _entityName != EntityB.NO_OBJECTS) {
        var entity = this.entityProxy.getByName(_entityName);
        if (entity) {
          var dataEntity = null;
          var root = null;
          var instantModelEntity = null;
          var gridView = this.getGrid().getGridView();
          if (gridView) {
            if (gridView.isRootSelectionValid(entity)) {
              if (entity instanceof ModelEntityVO) {
                root = ModelRelation.getFirstRelationForEntity(entity);
              } else {
                dataEntity = new DataEntity(entity);
                var headerMediator = SjamayeeFacade.getInstance().retrieveMediator(DataRelationsHeaderMediator.ID);
                if (headerMediator) {
                  var typeSelected = headerMediator.getTypeSelected();
                  if (typeSelected) {
                    var modelEntity = ModelEntity.getById(typeSelected.getMei());
                    if (modelEntity) {
                      instantModelEntity = modelEntity;
                    }
                  }
                }
                if (instantModelEntity === null) {
                  //SingleType / SpecialType / ALL,BaseType(ex. CDAT,PROJ): null
                  if (dataEntity && dataEntity.isSingleType()) {
                    instantModelEntity = dataEntity.getInstantModelEntity();
                    if (instantModelEntity === null) {
                      instantModelEntity = dataEntity.getModelEntity();
                    }
                  }
                }
                //Clear Virtual Relations !!!
                ModelRelation.clearVirtualRelations();
                DataRelation.clearVirtualRelations();
                //Find new ROOT.
                root = DataRelation.getFirstRelationForEntity(dataEntity.getEntityVO(),instantModelEntity,RelationB.CHILD);
                if (root === null) {
                  root = DataRelation.getFirstRelationForEntity(dataEntity.getEntityVO(),instantModelEntity,RelationB.PARENT);
                  if (root) {
                    //Create virtual root !!!
                    //Model Relation.
                    var mr0 = root.getModelRelation();
                    mr0.setVal("*** VMROOT/1 ***");
                    mr0.setParentEntity(null);
                    //mr0.setParentEntity(instantModelEntity); //!!!!!!!!!!!!!!!!
                    mr0.setChildEntity(instantModelEntity);
                    mr0.setVirtualNivo(Position.NIVO_ROOT());
                    ModelRelation.addVirtualRelation(mr0);
                    //Data Relation.
                    root.setModelRelation(mr0);
                    root.setVal("*** VDROOT/1 ***");
                    root.setParentEntity(null);
                    //root.setParentEntity(dataEntity); //!!!!!!!!!!!!!!!!!!!!
                    root.setChildEntity(dataEntity);
                    root.setVirtualNivo(Position.NIVO_ROOT());
                    DataRelation.addVirtualRelation(root);
                  }
                }
                if (root === null) {
                  //Create virtual root !!!
                  //Model Relation.
                  var mr0 = new ModelRelation(new ModelRelationVO(null,0,'*** VMROOT/2 ***'));
                  mr0.setChildEntity(instantModelEntity);
                  mr0.setVirtualNivo(Position.NIVO_ROOT());
                  ModelRelation.addVirtualRelation(mr0);
                  //Data Relation.
                  var dr0 = new DataRelation(new DataRelationVO(null,0,"*** VDROOT/2 ***"));
                  dr0.setModelRelation(mr0);
                  //dr0.setParentEntity(dataEntity);
                  dr0.setChildEntity(dataEntity);
                  dr0.setVirtualNivo(Position.NIVO_ROOT());
                  DataRelation.addVirtualRelation(dr0);
                  root = dr0;
                }
              }
              if (root) {
                var rootEntity = root.getChildEntity();
                //SubClass/-1 & SuperClass/+1
                if (instantModelEntity) {
                  //Subclass/-1
                  if (instantModelEntity.hasSubClasses()) {
                    var subModelEntities = instantModelEntity.getSubClasses();
                    while (subModelEntities && subModelEntities.length > 0) {
                      var modelEntity = rootEntity.inClass(instantModelEntity,subModelEntities,RelationB.CHILD);
                      if (modelEntity === null) {
                        modelEntity = rootEntity.inClass(instantModelEntity,subModelEntities,RelationB.PARENT);                        
                      }
                      if (modelEntity === null) { break; }
                      modelEntity = modelEntity.clone();
                      var mr0 = new ModelRelation(new ModelRelationVO(null,0,'*** VMR-SUBCLASS ***'));
                      mr0.setParentEntity(modelEntity);
                      mr0.setChildEntity(instantModelEntity);
                      mr0.setVirtualNivo(Position.NIVO_ROOT() - 1);
                      ModelRelation.addVirtualRelation(mr0);
                      var dr0 = new DataRelation(new DataRelationVO(null,0,'*** VDR-SUBCLASS ***'));
                      dr0.setModelRelation(mr0);
                      dr0.setParentEntity(rootEntity);
                      dr0.setChildEntity(rootEntity);
                      dr0.setVirtualNivo(Position.NIVO_ROOT() - 1);
                      dr0.setSomeKey(dr0.getPei()+mr0.getPei()); //Unique ID!
                      DataRelation.addVirtualRelation(dr0);
                      //Prepare for next!!!
                      for (var i = 0; i < subModelEntities.length; i++) {
                        var subModelEntity = subModelEntities[i];
                        if (subModelEntity && subModelEntity.getId() == modelEntity.getId()) {
                          subModelEntities.splice(i,1);
                          break;
                        }
                      }
                    }
                  }
                  //SuperClass/+1
                  if (instantModelEntity.hasSuperClass()) {
                    var superModelEntity = instantModelEntity.getSuperClass();
                    var mr0 = new ModelRelation(new ModelRelationVO(null,0,'*** VMR-SUPERCLASS ***'));
                    mr0.setParentEntity(instantModelEntity);
                    mr0.setChildEntity(superModelEntity);
                    mr0.setVirtualNivo(Position.NIVO_ROOT() + 1);
                    ModelRelation.addVirtualRelation(mr0);
                    var dr0 = new DataRelation(new DataRelationVO(null,0,'*** VDR-SUPERCLASS ***'));
                    dr0.setModelRelation(mr0);
                    dr0.setParentEntity(rootEntity);
                    dr0.setChildEntity(rootEntity);
                    dr0.setVirtualNivo(Position.NIVO_ROOT() + 1);
                    DataRelation.addVirtualRelation(dr0);
                  }
                }
                this.getGrid().setRootCommand(null);
                entitySwitched = this.setRoot(new GridCell(root));
                if (entitySwitched) {
                  this.setCurrentCellId(this.getRootCellId());
                }
              }
            }
          }
        }
      } else {
        //Clear Grid!
        this.getGrid().clear();
      }
    } catch(error) {
      Utils.alert("RelationsGridMediator/switchEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      if (entitySwitched === false) { Utils.beep(1); }
      return entitySwitched;
    }
  },
  setRoot: function(root) {
    var result = false;
    try {
      if (root) {
        var currentRoot = this.getGrid().getRoot();
        //TODO: ROW_ROOT = EndOfList/2 = 4 of 9 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //currentRoot.setPosition(new Position(this.getRootRow(),Position.COLUMN_ROOT()));
        //currentRoot.setPosition(new Position(Position.ROW_ROOT(),Position.COLUMN_ROOT()));
        var currentGridSnapShot = null; //this.getGrid().getSnapShot();  //TODO; SNAPSHOTS !!!
        //result = this.getGrid().setRoot(root);
        result = this.setRootNow(root);
        if (result === true) {
          //this.setEntitySelected(this.getGrid().getRootEntity().getName());
          var append = false;
          var command = null;
          if (command === null) {
            append = true;
            command = new RootCommand();
          }
          if (currentRoot) {
            command.setRelation(root.getRelation());
            if (currentGridSnapShot) {
              command.setSnapShot(currentGridSnapShot);
              //this.setLastRootCommand(command,append);                     //TODO: *** !!! ***
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("RelationsGridMediator/setRoot - error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  setRootNow: function(root) {
    var result = false;
    try {
      if (root) {
        var rootRelation = root.getRelation();
        if (rootRelation) {
          //var rootEntity = this.entityProxy.getById(rootRelation.getCei());
          var entity = rootRelation.getChildEntity();
          if (entity) {
            var rootEntity = entity.getEntityVO();
            var gridView = this.getGrid().getGridView();
            if (gridView) {
              if (gridView.isRootSelectionValid(rootEntity)) {
                this.setCurrentNivo(Position.NIVO_ROOT()); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ***
                this.getGrid().clear();
                this.getGrid().setRoot(root);
                //this.getGrid().init();
                result = true;
              } else {
                Utils.beep(1);
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("RelationsGridMediator/setRoot Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  clear: function() {
    this.gridUICLeft.clear();
    this.gridUICRight.clear();
  },
  fillGrid: function() {
    var grid = this.getGrid();
    //Clear Grid.
    this.clear();
    //RESET GRIDVIEW !!!
    grid.setGridView(null);
    grid.getGridView();
    //Fill cells.
    var columns = grid.getColumns();

    var columnCellCount = "";
    for (var i = Position.COLUMN_FIRST(); i < columns.length; i++) {
      if (columns[i]) {
        columnCellCount += i+": "+columns[i].getSize()+"\n";
      }
    }
    //TODO: several times fillgrid (data/model - left/right) ??????
    
    //Fill cells in relationsGridLeft.
    for (var col = Position.COLUMN_FIRST(); col < (columns.length-1); col++) {
      var column = columns[col];
      if (column) {
        var nivo = column.getNivo();
        //column.setRefreshNow();
        //column.refresh();
        //***************************************************
        //TODO: REFACTOR *** DEFAULT_ROWS / ROOT_COLUMN / ***
        //***************************************************
        //Set Column Class & Column Header Class.
        var columnHeaderId = this.gridUICLeft.getColumnHeaderId(col); //RelationsGridLeft.COLUMN_ID+col+'h';
        $(columnHeaderId).removeClass(GridColumn.HEADER_FIRST_CLASS_ID);
        if (col == Position.COLUMN_FIRST()) {
          $(columnHeaderId).addClass(GridColumn.HEADER_FIRST_CLASS_ID);
        }
        //Fill header.
        var columnHeader = nivo;
        var columnHeaderAnchorId = this.gridUICLeft.getColumnHeaderAnchorId(col); //RelationsGridLeft.COLUMN_ID+col+'ha';
        var styleColor = FontStyle.COLOR_WHERE();
        if (nivo == Position.NIVO_ROOT()) {
          styleColor = FontStyle.COLOR_ROOT();
        } else if (nivo > Position.NIVO_ROOT()) { 
          styleColor = FontStyle.COLOR_WHAT();
        }
        var columnHeaderStyles = new Array();
        columnHeaderStyles["position"] = "relative";
        columnHeaderStyles["left"] = "2px";
        columnHeaderStyles["color"] = styleColor;
        //$(columnHeaderAnchorId).set('styles', {position:'relative',left:'2px',color:'black'});
        $(columnHeaderAnchorId).set('styles', columnHeaderStyles);
        $(columnHeaderAnchorId).innerHTML = columnHeader;
        //Fill cells.
        var rootCellId = null;
        var rootCellValue = null;
        //for (var row = this.getBeginOfList(); row <= this.getEndOfList(); row++) {
        for (var row = this.getBeginOfList(); row <= RelationsGridMediator.PAGE_SIZE_MAX; row++) {
          var cellId = this.gridUICLeft.getCellId(row,col); //RelationsGridLeft.COLUMN_ID+'c'+col+row;
          if (nivo > Position.NIVO_ROOT()) {
            cellId = this.gridUICRight.getCellId(row);
          }
          if ($(cellId)) {
            $(cellId).removeAttribute("style");            
            //Remove Cell Classes.                    
            $(cellId).removeClass(GridCell.LEFT_CLASS_ID);          
            $(cellId).removeClass(GridCell.FIRST_CLASS_ID);          
            $(cellId).removeClass(GridCell.WHERE_USED_FOCUSED_CLASS_ID);
            $(cellId).removeClass(GridCell.WHERE_USED_SELECTED_CLASS_ID);
            //$(cellId).removeClass(GridCell.ROOT_CLASS_ID);
            //$(cellId).removeClass(GridCell.ROOT_FOCUSED_CLASS_ID);
            $(cellId).removeClass(GridCell.WHAT_USED_FOCUSED_CLASS_ID);
            $(cellId).removeClass(GridCell.WHAT_USED_SELECTED_CLASS_ID);
            //Set cell classes.
            if (nivo > Position.NIVO_ROOT() || col == Position.COLUMN_FIRST()) {
              $(cellId).addClass(GridCell.LEFT_CLASS_ID);
            }
            if (row !== null && row == this.getBeginOfList()) {
              $(cellId).addClass(GridCell.FIRST_CLASS_ID);
            }
          }
          if (row <= this.getEndOfList()) {
            var cell = column.getCell(row);
            if (cell) {
              //Set focus/selected classes.
              if (nivo == Position.NIVO_ROOT()) {
                if (rootCellId === null) {
                  if (!cell.isEmpty()) {
                    //rootCellId = this.getRootCellId(); //TODO: IS NOT VARIABLE YET !!!
                    rootCellId = this.gridUICLeft.getCellId(this.getRootRow(),col);
                    rootCellValue = cell.getValue(); //innerHTML; //getValue();
                  }
                }
              }
              //Highlite cell.
              this.highlite(cell,cellId);
              //Set value.
              var cellAnchorId = this.gridUICLeft.getCellAnchorId(row,col); //RelationsGridLeft.COLUMN_ID+'c'+col+row+'a';
              if (nivo > Position.NIVO_ROOT()) {
                cellAnchorId = this.gridUICLeft.getCellAnchorId(row,col);
              }
              //this.gridUICLeft.setCell(cellAnchorId,cell.getValueHtml());
              //var cellValue = '&nbsp;';
              var cellValue = '';
              if (cell.getValue() !== '') {
                //cellValue = '<a id="'+cellAnchorId+'" style="background-color:inherit;color:inherit;" href="#" style="width:100%;">'+cell.getValueHtml()+'</a>';
                //NO LINKS !!!
                cellValue = cell.getValue();
              }
              if (nivo > Position.NIVO_ROOT()) {
                this.gridUICRight.setCell(cellId,cellValue);
              //} else {
              } else if (nivo < Position.NIVO_ROOT()) {
                this.gridUICLeft.setCell(cellId,cellValue);
              }
            }
          }
        }
        //Fill root cell!!!
        //Doit here, because of variable place (RESIZE/MIN/MAX)!
        if (rootCellId) {
          //Remove Cell Classes.                    
          $(rootCellId).removeClass(GridCell.LEFT_CLASS_ID);          
          $(rootCellId).removeClass(GridCell.FIRST_CLASS_ID);          
          $(rootCellId).removeClass(GridCell.WHERE_USED_FOCUSED_CLASS_ID);
          $(rootCellId).removeClass(GridCell.WHERE_USED_SELECTED_CLASS_ID);
          //$(rootCellId).removeClass(GridCell.ROOT_CLASS_ID);
          //$(rootCellId).removeClass(GridCell.ROOT_FOCUSED_CLASS_ID);
          $(rootCellId).removeClass(GridCell.WHAT_USED_FOCUSED_CLASS_ID);
          $(rootCellId).removeClass(GridCell.WHAT_USED_SELECTED_CLASS_ID);
          //Reset ROOT class.
          //$(rootCellId).addClass(GridCell.ROOT_CLASS_ID);          
          this.gridUICLeft.setCell(rootCellId,rootCellValue);
          if (this.isCurrentCellIdOnRoot()) {
            this.setCurrentCellId(rootCellId);
          } else {
            this.highlite(null,rootCellId);                   //TODO: Integrate in setCell ??? ON MEDIATORS !!!
          }
        }
      }
    }
    //Fill cells in relationsGridRight.
    var lastNivo = grid.getLastNivo();    
    var column = grid.getColumnByNivo(lastNivo);
    if (column) {
      //column.setRefreshNow();
      //column.refresh();
      //***************************************************
      //TODO: REFACTOR *** DEFAULT_ROWS / ROOT_COLUMN / ***
      //***************************************************
      //Fill header.
      var columnHeader = lastNivo;
      //$(RelationsGridRight.COLUMN_HEADER_ANCHOR_ID).innerHTML = columnHeader;
      $(this.gridUICRight.getColumnHeaderAnchorId()).innerHTML = columnHeader;
      //Fill cells.
      //for (var row = this.getBeginOfList(); row < this.getEndOfList(); row++) {
      for (var row = this.getBeginOfList(); row <= RelationsGridMediator.PAGE_SIZE_MAX; row++) {        
        var cellId = this.gridUICRight.getCellId(row);
        if ($(cellId)) {
          //Remove Cell Classes.
          $(cellId).removeClass(GridCell.WHAT_USED_FOCUSED_CLASS_ID);
          $(cellId).removeClass(GridCell.WHAT_USED_SELECTED_CLASS_ID);
        }
        if (row <= this.getEndOfList()) {        
          var cell = column.getCell(row);
          if (cell) {
          /*if (cell.isSelected()) {
              $(cellId).addClass(GridCell.WHAT_USED_SELECTED_CLASS_ID);
            }
            if (row !== null && row == this.getPosition().getRow()) {
              if (cell.getNivo() == this.getCurrentNivo()) {            
                $(cellId).addClass(GridCell.WHAT_USED_FOCUSED_CLASS_ID);
              }
            }*/
            //Highlite cell.
            this.highlite(cell,cellId);
            //Set value.
            var cellAnchorId = this.gridUICRight.getCellAnchorId(row); //RelationsGridRight.COLUMN_ID+'c0'+row+'a';
            //this.gridUICRight.setCell(cellAnchorId,cell.getValueHtml());
            //var cellValue = '&nbsp;';
            var cellValue = '';
            if (cell.getValue() !== '') {
              //cellValue = '<a id="'+cellAnchorId+'" style="background-color:inherit;color:inherit;" href="#" style="width:100%;">'+cell.getValueHtml()+'</a>';            
              //NO LINKS !!!
              cellValue = cell.getValue();
            }
            this.gridUICRight.setCell(cellId,cellValue);
          }
        }
      }
    }
  }
});
RelationsGridMediator.PAGE_SIZE_MIN = 10;
RelationsGridMediator.PAGE_SIZE_MAX = 21;

//Class: ToolBarMediator
var ToolBarMediator = new Class({
  Extends: SjamayeeMediator,
  initialize: function(viewComponent) {
    this.parent(ToolBarMediator.ID,viewComponent);
    var toolBar = this.getViewComponent();
    this.facade.registerMediator(new DataObjectsToolBarMediator(toolBar.dataObjectsToolBar));
    this.facade.registerMediator(new DataRelationsToolBarMediator(toolBar.dataRelationsToolBar));
    if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {   
      this.facade.registerMediator(new ModelObjectsToolBarMediator(toolBar.modelObjectsToolBar));
      this.facade.registerMediator(new ModelRelationsToolBarMediator(toolBar.modelRelationsToolBar));
      this.facade.registerMediator(new ModelObjectsTextsToolBarMediator(toolBar.modelObjectsTextsToolBar));
      this.facade.registerMediator(new ModelRelationsTextsToolBarMediator(toolBar.modelRelationsTextsToolBar));
    }
    this.onMessageClick = this.onMessageClick.bindWithEvent(this);
    toolBar.addEvent(SjamayeeFacade.MESSAGE_CLICK, this.onMessageClick);
  },
  onMessageClick: function()  { this.sendNotification(SjamayeeFacade.MESSAGE_CLICK);  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.MESSAGE_CLICK
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var toolBar = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.MESSAGE_CLICK:
      break;
    }
  }
});
ToolBarMediator.ID = "ToolBarMediator";

//Abstract
//Class: ObjectsToolBarMediator
var ObjectsToolBarMediator = new Class({
  Extends: SjamayeeMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.listMediator = null;
    this.onResizeList = this.onResizeList.bindWithEvent(this);
    this.onFirst = this.onFirst.bindWithEvent(this);
    this.onPrevious = this.onPrevious.bindWithEvent(this);
    this.onNext = this.onNext.bindWithEvent(this);
    this.onLast = this.onLast.bindWithEvent(this);
    this.onAddObject = this.onAddObject.bindWithEvent(this);
    this.onDeleteObject = this.onDeleteObject.bindWithEvent(this);
    this.onEditObject = this.onEditObject.bindWithEvent(this);
    this.onUndoObject = this.onUndoObject.bindWithEvent(this);
    this.onRedoObject = this.onRedoObject.bindWithEvent(this);
    this.onClearBuffer = this.onClearBuffer.bindWithEvent(this);
    this.onEditText = this.onEditText.bindWithEvent(this);
    this.onDeleteUnrefObjects = this.onDeleteUnrefObjects.bindWithEvent(this);
    var toolBar = this.getViewComponent();
    toolBar.addEvent(SjamayeeFacade.RESIZE, this.onResizeList);
    toolBar.addEvent(SjamayeeFacade.HOME, this.onFirst);
    toolBar.addEvent(SjamayeeFacade.PREVIOUS, this.onPrevious);
    toolBar.addEvent(SjamayeeFacade.NEXT, this.onNext);
    toolBar.addEvent(SjamayeeFacade.END, this.onLast);
    toolBar.addEvent(SjamayeeFacade.OBJECT_ADD, this.onAddObject);
    toolBar.addEvent(SjamayeeFacade.OBJECT_DELETE, this.onDeleteObject);
    toolBar.addEvent(SjamayeeFacade.OBJECT_EDIT, this.onEditObject);
    toolBar.addEvent(SjamayeeFacade.OBJECT_UNDO, this.onUndoObject);
    toolBar.addEvent(SjamayeeFacade.OBJECT_REDO, this.onRedoObject);
    toolBar.addEvent(SjamayeeFacade.OBJECT_BUFFER_CLEAR, this.onClearBuffer);
    toolBar.addEvent(SjamayeeFacade.TEXT_EDIT, this.onEditText);
    toolBar.addEvent(SjamayeeFacade.OBJECT_UNREFS_DELETE, this.onDeleteUnrefObjects);
  },

  onResizeList: function()          { alert("ObjectsToolBarMediator/onResizeList"); },
  onFirst: function()               { alert("ObjectsToolBarMediator/onFirst"); },
  onPrevious: function()            { alert("ObjectsToolBarMediator/onPrevious"); },
  onNext: function()                { alert("ObjectsToolBarMediator/onNext"); },
  onLast: function()                { alert("ObjectsToolBarMediator/onLast"); },
  onAddObject: function()           { alert("ObjectsToolBarMediator/onAddObject"); },
  onDeleteObject: function()        { alert("ObjectsToolBarMediator/onDeleteObject"); },
  onEditObject: function()          { alert("ObjectsToolBarMediator/onEditObject"); },
  onUndoObject: function()          { alert("ObjectsToolBarMediator/onUndoObject"); },
  onRedoObject: function()          { alert("ObjectsToolBarMediator/onRedoObject"); },
  onClearBuffer: function()         { alert("ObjectsToolBarMediator/onClearBuffer"); },
  onEditText: function()            { alert("ObjectsToolBarMediator/onEditText"); },
  onDeleteUnrefObjects: function()  { alert("ObjectsToolBarMediator/onDeleteUnrefObjects"); },

  hide: function() {
    var dataObjectsToolBar = this.facade.retrieveMediator(DataObjectsToolBarMediator.ID).getViewComponent();
    dataObjectsToolBar.setAttribute("style","display:none;");
    var dataRelationsToolBar = this.facade.retrieveMediator(DataRelationsToolBarMediator.ID).getViewComponent();
    dataRelationsToolBar.setAttribute("style","display:none;");
    if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {
      var modelObjectsToolBar = this.facade.retrieveMediator(ModelObjectsToolBarMediator.ID).getViewComponent();
      modelObjectsToolBar.setAttribute("style","display:none;");
      var modelRelationsToolBar = this.facade.retrieveMediator(ModelRelationsToolBarMediator.ID).getViewComponent();
      modelRelationsToolBar.setAttribute("style","display:none;");
      var modelObjectsTextsToolBar = this.facade.retrieveMediator(ModelObjectsTextsToolBarMediator.ID).getViewComponent();
      modelObjectsTextsToolBar.setAttribute("style","display:none;");
      var modelRelationsTextsToolBar = this.facade.retrieveMediator(ModelRelationsTextsToolBarMediator.ID).getViewComponent();
      modelRelationsTextsToolBar.setAttribute("style","display:none;");
    }
  },

  enableButtons: function() {
    var toolBar = this.getViewComponent();
    if (toolBar.firstButton)              { toolBar.firstButton.disabled = false; }
    if (toolBar.previousButton)           { toolBar.previousButton.disabled = false; }
    if (toolBar.nextButton)               { toolBar.nextButton.disabled = false; }
    if (toolBar.lastButton)               { toolBar.lastButton.disabled = false; }
    if (toolBar.addObjectButton)          { toolBar.addObjectButton.disabled = false; }
    if (toolBar.deleteObjectButton)       { toolBar.deleteObjectButton.disabled = false; }
    if (toolBar.editObjectButton)         { toolBar.editObjectButton.disabled = false; }
    if (toolBar.undoObjectButton)         { toolBar.undoObjectButton.disabled = false; }
    if (toolBar.redoObjectButton)         { toolBar.redoObjectButton.disabled = false; }
    if (toolBar.clearBufferButton)        { toolBar.clearBufferButton.disabled = false; }
    if (toolBar.textButton)               { toolBar.textButton.disabled = false; }
    if (toolBar.deleteUnrefObjectsButton) { toolBar.deleteUnrefObjectsButton.disabled = false; }
    var display = true;
    var paging = null;
    if (this instanceof ModelObjectsToolBarMediator) {
      display = this.facade.retrieveMediator(ModelObjectsListMediator.ID).isDisplay();
      paging = this.facade.retrieveMediator(ModelObjectsListMediator.ID).getPaging();
    } else {
      display = this.facade.retrieveMediator(DataObjectsListMediator.ID).isDisplay();
      paging = this.facade.retrieveMediator(DataObjectsListMediator.ID).getPaging();
    }
    if (paging) {
      if (toolBar.firstButton)        { toolBar.firstButton.disabled = (paging == PagingMediator.PAGE_FIRST)?true:false; }
      if (toolBar.previousButton)     { toolBar.previousButton.disabled = (paging == PagingMediator.PAGE_FIRST)?true:false; }
      if (toolBar.nextButton)         { toolBar.nextButton.disabled = (paging == PagingMediator.PAGE_LAST)?true:false; }
      if (toolBar.lastButton)         { toolBar.lastButton.disabled = (paging == PagingMediator.PAGE_LAST)?true:false; }
    }
    if (!display) {     
      if (toolBar.addObjectButton)    { toolBar.addObjectButton.disabled = true; }
      if (toolBar.deleteObjectButton) { toolBar.deleteObjectButton.disabled = true; }
      if (toolBar.editObjectButton)   { toolBar.editObjectButton.disabled = true; }
      if (toolBar.textButton)         { toolBar.textButton.disabled = true; }
    }
  }
});

//Abstract
//Class: RelationsToolBarMediator
var RelationsToolBarMediator = new Class({
  Extends: SjamayeeMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.gridMediator = null;
    this.onResizeGrid = this.onResizeGrid.bindWithEvent(this);
    this.onShowParent = this.onShowParent.bindWithEvent(this);
    this.onShowParentAndChild = this.onShowParentAndChild.bindWithEvent(this);
    this.onShowChild = this.onShowChild.bindWithEvent(this);
    this.onAddRelation = this.onAddRelation.bindWithEvent(this);
    this.onDeleteRelation = this.onDeleteRelation.bindWithEvent(this);
    this.onEditRelation = this.onEditRelation.bindWithEvent(this);
    this.onExtractRelation = this.onExtractRelation.bindWithEvent(this);
    this.onCopyRelation = this.onCopyRelation.bindWithEvent(this);
    this.onPasteRelation = this.onPasteRelation.bindWithEvent(this);
    this.onUndoRelation = this.onUndoRelation.bindWithEvent(this);
    this.onRedoRelation = this.onRedoRelation.bindWithEvent(this);
    this.onClearBuffer = this.onClearBuffer.bindWithEvent(this);
    this.onEditText = this.onEditText.bindWithEvent(this);
    this.onResetGrid = this.onResetGrid.bindWithEvent(this);
    var toolBar = this.getViewComponent();
    toolBar.addEvent(SjamayeeFacade.RESIZE, this.onResizeGrid);
    toolBar.addEvent(SjamayeeFacade.GRID_PARENT_SHOW, this.onShowParent);
    toolBar.addEvent(SjamayeeFacade.GRID_PARENTANDCHILD_SHOW, this.onShowParentAndChild);
    toolBar.addEvent(SjamayeeFacade.GRID_CHILD_SHOW, this.onShowChild);
    toolBar.addEvent(SjamayeeFacade.RELATION_ADD, this.onAddRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_DELETE, this.onDeleteRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_EDIT, this.onEditRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_EXTRACT, this.onExtractRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_COPY, this.onCopyRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_PASTE, this.onPasteRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_UNDO, this.onUndoRelation);
    toolBar.addEvent(SjamayeeFacade.RELATION_REDO, this.onRedoRelation);
    toolBar.addEvent(SjamayeeFacade.GRID_BUFFER_CLEAR, this.onClearBuffer);
    toolBar.addEvent(SjamayeeFacade.TEXT_EDIT, this.onEditText);
    toolBar.addEvent(SjamayeeFacade.GRID_RESET, this.onResetGrid);
  },

  onResizeGrid: function()          { alert("RelationsToolBarMediator/onResizeGrid"); },
  onShowParent: function()          { alert("RelationsToolBarMediator/onShowParent"); },
  onShowParentAndChild: function()  { alert("RelationsToolBarMediator/onShowParentAndChild"); },
  onShowChild: function()           { alert("RelationsToolBarMediator/onShowChild"); },
  onAddRelation: function()         { alert("RelationsToolBarMediator/onAddRelation"); },
  onDeleteRelation: function()      { alert("RelationsToolBarMediator/onDeleteRelation"); },
  onEditRelation: function()        { alert("RelationsToolBarMediator/onEditRelation"); },
  onExtractRelation: function()     { alert("RelationsToolBarMediator/onExtractRelation"); },
  onCopyRelation: function()        { alert("RelationsToolBarMediator/onCopyRelation"); },
  onPasteRelation: function()       { alert("RelationsToolBarMediator/onPasteRelation"); },
  onUndoRelation: function()        { alert("RelationsToolBarMediator/onUndoRelation"); },
  onRedoRelation: function()        { alert("RelationsToolBarMediator/onRedoRelation"); },
  onClearBuffer: function()         { alert("RelationsToolBarMediator/onClearBuffer"); },
  onEditText: function()            { alert("RelationsToolBarMediator/onEditText"); },
  onResetGrid: function()           { alert("RelationsToolBarMediator/onResetGrid"); },

  hide: function() {
    var dataObjectsToolBar = this.facade.retrieveMediator(DataObjectsToolBarMediator.ID).getViewComponent();
    dataObjectsToolBar.setAttribute("style","display:none;");
    var dataRelationsToolBar = this.facade.retrieveMediator(DataRelationsToolBarMediator.ID).getViewComponent();
    dataRelationsToolBar.setAttribute("style","display:none;");
    if (SjamayeeFacade.APPLICATION_TYPE == SjamayeeFacade.COMPOSER) {
      var modelObjectsToolBar = this.facade.retrieveMediator(ModelObjectsToolBarMediator.ID).getViewComponent();
      modelObjectsToolBar.setAttribute("style","display:none;");
      var modelRelationsToolBar = this.facade.retrieveMediator(ModelRelationsToolBarMediator.ID).getViewComponent();
      modelRelationsToolBar.setAttribute("style","display:none;");
      var modelObjectsTextsToolBar = this.facade.retrieveMediator(ModelObjectsTextsToolBarMediator.ID).getViewComponent();
      modelObjectsTextsToolBar.setAttribute("style","display:none;");
      var modelRelationsTextsToolBar = this.facade.retrieveMediator(ModelRelationsTextsToolBarMediator.ID).getViewComponent();
      modelRelationsTextsToolBar.setAttribute("style","display:none;");
    }
  },
  enableButtons: function() {
    var toolBar = this.getViewComponent();
    if (toolBar.parentButton)          { toolBar.parentButton.disabled = false; }
    if (toolBar.parentAndChildButton)  { toolBar.parentAndChildButton.disabled = false; }
    if (toolBar.childButton)           { toolBar.childButton.disabled = false; }
    if (toolBar.addRelationButton)     { toolBar.addRelationButton.disabled = false; }
    if (toolBar.deleteRelationButton)  { toolBar.deleteRelationButton.disabled = false; }
    if (toolBar.editRelationButton)    { toolBar.editRelationButton.disabled = false; }
    if (toolBar.extractRelationButton) { toolBar.extractRelationButton.disabled = false; }
    if (toolBar.copyRelationButton)    { toolBar.copyRelationButton.disabled = false; }
    if (toolBar.pasteRelationButton)   { toolBar.pasteRelationButton.disabled = false; }
    if (toolBar.undoRelationButton)    { toolBar.undoRelationButton.disabled = false; }
    if (toolBar.redoRelationButton)    { toolBar.redoRelationButton.disabled = false; }
    if (toolBar.clearBufferButton)     { toolBar.clearBufferButton.disabled = false; }
    if (toolBar.textButton)            { toolBar.textButton.disabled = false; }
    if (toolBar.resetGridButton)       { toolBar.resetGridButton.disabled = false; }
    var display = true;
    if (this instanceof ModelRelationsToolBarMediator) {
      display = this.facade.retrieveMediator(ModelRelationsGridMediator.ID).isDisplay();
    } else {
      display = this.facade.retrieveMediator(DataRelationsGridMediator.ID).isDisplay();
    }
    if (!display) {     
      if (toolBar.addRelationButton)     { toolBar.addRelationButton.disabled = true; }
      if (toolBar.deleteRelationButton)  { toolBar.deleteRelationButton.disabled = true; }
      if (toolBar.editRelationButton)    { toolBar.editRelationButton.disabled = true; }
      if (toolBar.extractRelationButton) { toolBar.extractRelationButton.disabled = true; }
      if (toolBar.copyRelationButton)    { toolBar.copyRelationButton.disabled = true; }
      if (toolBar.pasteRelationButton)   { toolBar.pasteRelationButton.disabled = true; }
      if (toolBar.textButton)            { toolBar.textButton.disabled = true; }
    }
  /*if (toolBar.parentButton)          { toolBar.parentButton.disabled = false; }
    if (toolBar.parentAndChildButton)  { toolBar.parentAndChildButton.disabled = false; }
    if (toolBar.childButton)           { toolBar.childButton.disabled = false; }*/
  } 
});
RelationsToolBarMediator.ID = "RelationsToolBarMediator";

//Abstract
//Class: TextsToolBarMediator
var TextsToolBarMediator = new Class({
  Extends: SjamayeeMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.onSave = this.onSave.bindWithEvent(this);
    this.onCancel = this.onCancel.bindWithEvent(this);
    this.onResize = this.onResize.bindWithEvent(this);
    var toolBar = this.getViewComponent();
    toolBar.addEvent(SjamayeeFacade.TEXT_SAVE, this.onSave);
    toolBar.addEvent(SjamayeeFacade.TEXT_CANCEL, this.onCancel);
    toolBar.addEvent(SjamayeeFacade.TEXT_RESIZE, this.onResize);
  },
  onSave: function()   { alert("TextsToolBarMediator/onSave"); },
  onCancel: function() { alert("TextsToolBarMediator/onCancel"); },
  onResize: function() { alert("TextsToolBarMediator/onResize"); },
  hide: function() {
    var dataObjectsToolBar = this.facade.retrieveMediator(DataObjectsToolBarMediator.ID).getViewComponent();
    dataObjectsToolBar.setAttribute("style","display:none;");
    var dataRelationsToolBar = this.facade.retrieveMediator(DataRelationsToolBarMediator.ID).getViewComponent();
    dataRelationsToolBar.setAttribute("style","display:none;");
    var modelObjectsToolBar = this.facade.retrieveMediator(ModelObjectsToolBarMediator.ID).getViewComponent();
    modelObjectsToolBar.setAttribute("style","display:none;");
    var modelRelationsToolBar = this.facade.retrieveMediator(ModelRelationsToolBarMediator.ID).getViewComponent();
    modelRelationsToolBar.setAttribute("style","display:none;");
    var modelObjectsTextsToolBar = this.facade.retrieveMediator(ModelObjectsTextsToolBarMediator.ID).getViewComponent();
    modelObjectsTextsToolBar.setAttribute("style","display:none;");
    var modelRelationsTextsToolBar = this.facade.retrieveMediator(ModelRelationsTextsToolBarMediator.ID).getViewComponent();
    modelRelationsTextsToolBar.setAttribute("style","display:none;");
  }  
});

//Abstract
//Class: DetailMediator
var DetailMediator = new Class({
  Extends: SjamayeeMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.state = null;
    var detail = this.getViewComponent();
    //this.onDetailBlur = this.onDetailBlur.bindWithEvent(this);
    //detail.addEvent(SjamayeeFacade.BLUR, this.onDetailBlur);
  },
  getState: function() {
    return this.state;
  },
  setState: function(state) {
    this.state = state;
    var relationsMediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID); //TODO: SPLIT >>> DATA/MODEL - OBJECT/RELATION !!!
    switch (this.state) {
      case DetailMediator.STATE_PARENT:
      relationsMediator.setDisplay();
      break;
      case DetailMediator.STATE_PARENT_CHILD:
      relationsMediator.setDisplay();
      break;
    }   
  },
  onDetailBlur: function() { alert("DetailMediator/onDetailBlur"); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_SHOW,
      SjamayeeFacade.GRID_SHOW,
      SjamayeeFacade.GRID_PARENT_SHOW,
      SjamayeeFacade.GRID_PARENTANDCHILD_SHOW,      
      SjamayeeFacade.GRID_CHILD_SHOW
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var detail = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_SHOW:
      //this.hide();      
      //detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block");      
      /*detail.splitter.left.dataObjectNTD.setHeader(ObjectNTD.HEADER_ID, ObjectNTD.HEADER_VALUE);      
      detail.splitter.left.modelObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
      detail.splitter.right.dataObjectProperties.setHeader(ObjectProperties.HEADER_ID, ObjectProperties.HEADER_VALUE);
      detail.splitter.right.modelObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
      var objectPropertiesMediator = this.facade.retrieveMediator(ObjectPropertiesMediator.ID);
      objectPropertiesMediator.setType(AttributeListMediator.TYPE_OBJECT);*/
      break;
      case SjamayeeFacade.GRID_SHOW:
      /*this.hide();
      //detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block");
      switch (this.getState()) {
        case DetailMediator.STATE_PARENT:
        this.sendNotification(SjamayeeFacade.GRID_PARENT_SHOW);
        break;
        case DetailMediator.STATE_CHILD:
        this.sendNotification(SjamayeeFacade.GRID_CHILD_SHOW);
        break;
        default:
        this.sendNotification(SjamayeeFacade.GRID_PARENTANDCHILD_SHOW);
        break;
      }*/
      break;
      case SjamayeeFacade.GRID_PARENT_SHOW:
      //this.setState(DetailMediator.STATE_PARENT);
      /*this.hide();
      detail.splitter.left.objectNTD.setHeader(ObjectNTD.HEADER_ID, ParentNTD.HEADER_VALUE);
      detail.splitter.left.objectNTD.setAttribute("style","width:100%;height:100%;display:block;");
      detail.splitter.right.objectProperties.setHeader(ObjectProperties.HEADER_ID, ParentProperties.HEADER_VALUE);
      detail.splitter.right.objectProperties.setAttribute("style","width:100%;height:100%;display:block;");*/
      /*var objectPropertiesMediator = this.facade.retrieveMediator(DataObjectPropertiesMediator.ID);
      objectPropertiesMediator.setType(AttributeListMediator.TYPE_PARENT);
      this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ACTIVATE);
      this.sendNotification(SjamayeeFacade.PARENT_DETAIL);*/
      //this.facade.setMessageText("Parent detail.");
      break;
      case SjamayeeFacade.GRID_PARENTANDCHILD_SHOW:
      /*this.setState(DetailMediator.STATE_PARENT_CHILD);
      //this.hide();
      detail.splitter.left.parentDetail.setAttribute("style","width:100%;height:100%;display:block;");
      detail.splitter.right.childDetail.setAttribute("style","width:100%;height:100%;display:block;");
      this.sendNotification(SjamayeeFacade.PARENT_DETAIL);
      this.sendNotification(SjamayeeFacade.CHILD_DETAIL);
      //this.facade.setMessageText("Parent & Child detail.");*/
      break;
      case SjamayeeFacade.GRID_CHILD_SHOW:
      //this.setState(DetailMediator.STATE_CHILD);
      /*this.hide();
      detail.splitter.left.objectNTD.setHeader(ObjectNTD.HEADER_ID, ChildNTD.HEADER_VALUE);
      detail.splitter.left.objectNTD.setAttribute("style","width:100%;height:100%;display:block;");
      detail.splitter.right.objectProperties.setHeader(ObjectProperties.HEADER_ID, ChildProperties.HEADER_VALUE);
      detail.splitter.right.objectProperties.setAttribute("style","width:100%;height:100%;display:block;");*/
      /*var objectPropertiesMediator = this.facade.retrieveMediator(DataObjectPropertiesMediator.ID);
      objectPropertiesMediator.setType(AttributeListMediator.TYPE_CHILD);
      this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ACTIVATE);
      this.sendNotification(SjamayeeFacade.CHILD_DETAIL);*/
      //this.facade.setMessageText("Child detail.");
      break;
    }
  },
  hide: function() {
    var detail = this.getViewComponent();
    detail.splitter.left.dataObjectNTD.setAttribute("style","display:none;");
    detail.splitter.left.dataParentDetail.setAttribute("style","display:none;");
    detail.splitter.left.modelObjectNTD.setAttribute("style","display:none;");
    detail.splitter.left.modelParentDetail.setAttribute("style","display:none;");
    detail.splitter.right.dataChildDetail.setAttribute("style","display:none;");
    detail.splitter.right.dataObjectProperties.setAttribute("style","display:none;");
    detail.splitter.right.modelChildDetail.setAttribute("style","display:none;");
    detail.splitter.right.modelObjectProperties.setAttribute("style","display:none;");
  } 
});
DetailMediator.STATE_PARENT = "PARENT";
DetailMediator.STATE_CHILD = "CHILD";
DetailMediator.STATE_PARENT_CHILD = "PARENT_CHILD";

//Abstract
//Class: DataDetailMediator
var DataDetailMediator = new Class({
  Extends: DetailMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    var detail = this.getViewComponent();
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_DATA_SHOW,
      SjamayeeFacade.GRID_DATA_SHOW,
      SjamayeeFacade.GRID_DATA_PARENT_SHOW,
      SjamayeeFacade.GRID_DATA_PARENTANDCHILD_SHOW,
      SjamayeeFacade.GRID_DATA_CHILD_SHOW
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var detail = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_DATA_SHOW:
      this.hide();      
      //detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block");      
      //detail.splitter.left.dataObjectNTD.setHeader(DataObjectNTD.HEADER_ID, ObjectNTD.HEADER_VALUE);
      detail.splitter.left.dataObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
      detail.splitter.left.dataObjectNTD.header.innerHTML = ObjectNTD.HEADER_VALUE;
      //detail.splitter.right.dataObjectProperties.setHeader(DataObjectProperties.HEADER_ID, ObjectProperties.HEADER_VALUE);
      detail.splitter.right.dataObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
      var objectPropertiesMediator = this.facade.retrieveMediator(DataObjectPropertiesMediator.ID);
      objectPropertiesMediator.setType(AttributeListMediator.TYPE_OBJECT);
      break;
      case SjamayeeFacade.GRID_DATA_SHOW:
      this.hide();
      detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block");
      switch (this.getState()) {
        case DetailMediator.STATE_PARENT:
        this.sendNotification(SjamayeeFacade.GRID_DATA_PARENT_SHOW);
        break;
        case DetailMediator.STATE_CHILD:
        this.sendNotification(SjamayeeFacade.GRID_DATA_CHILD_SHOW);
        break;
        default:
        this.sendNotification(SjamayeeFacade.GRID_DATA_PARENTANDCHILD_SHOW);
        break;
      }
      break;
      case SjamayeeFacade.GRID_DATA_PARENT_SHOW:
      this.hide();
      //detail.splitter.left.dataObjectNTD.setHeader(DataParentNTD.HEADER_ID, ParentNTD.HEADER_VALUE);
      detail.splitter.left.dataObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
      detail.splitter.left.dataObjectNTD.header.innerHTML = ParentNTD.HEADER_VALUE;
      //detail.splitter.right.dataObjectProperties.setHeader(DataParentProperties.HEADER_ID, DataParentProperties.HEADER_VALUE);
      detail.splitter.right.dataObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
      this.sendNotification(SjamayeeFacade.GRID_DATA_RESIZE,SjamayeeFacade.SIZE_NORMAL);
      //this.sendNotification(SjamayeeFacade.GRID_PARENT_SHOW); //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIND REPLACEMENT !!!
      break;
      case SjamayeeFacade.GRID_DATA_PARENTANDCHILD_SHOW:
      this.hide();
      detail.splitter.left.dataParentDetail.setAttribute("style","width:100%;height:100%;display:block;");
      detail.splitter.right.dataChildDetail.setAttribute("style","width:100%;height:100%;display:block;");      
      this.setState(DetailMediator.STATE_PARENT_CHILD);
      this.sendNotification(SjamayeeFacade.PARENT_DETAIL);
      this.sendNotification(SjamayeeFacade.CHILD_DETAIL);     
      this.sendNotification(SjamayeeFacade.GRID_DATA_RESIZE,SjamayeeFacade.SIZE_NORMAL);
      //this.sendNotification(SjamayeeFacade.GRID_PARENTANDCHILD_SHOW); //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIND REPLACEMENT !!!
      break;
      case SjamayeeFacade.GRID_DATA_CHILD_SHOW:
      this.hide();
      //detail.splitter.left.dataObjectNTD.setHeader(DataChildNTD.HEADER_ID, ChildNTD.HEADER_VALUE);
      detail.splitter.left.dataObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
      detail.splitter.left.dataObjectNTD.header.innerHTML = ChildNTD.HEADER_VALUE;
      //detail.splitter.right.dataObjectProperties.setHeader(DataChildProperties.HEADER_ID, DataChildProperties.HEADER_VALUE);
      detail.splitter.right.dataObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
      this.sendNotification(SjamayeeFacade.GRID_DATA_RESIZE,SjamayeeFacade.SIZE_NORMAL);
      //this.sendNotification(SjamayeeFacade.GRID_CHILD_SHOW); //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIND REPLACEMENT !!!
      break;
    }
  }
});
//DataDetailMediator.ID = "DataDetailMediator";

//Abstract
//Class: ModelDetailMediator
var ModelDetailMediator = new Class({
  Extends: DetailMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    var detail = this.getViewComponent();
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_MODEL_SHOW,      
      SjamayeeFacade.GRID_MODEL_SHOW,
      SjamayeeFacade.GRID_MODEL_PARENT_SHOW,
      SjamayeeFacade.GRID_MODEL_PARENTANDCHILD_SHOW,
      SjamayeeFacade.GRID_MODEL_CHILD_SHOW
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var detail = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_MODEL_SHOW:
      this.hide();
      //detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block");      
      //detail.splitter.left.modelObjectNTD.setHeader(ModelObjectNTD.HEADER_ID, ObjectNTD.HEADER_VALUE);      
      detail.splitter.left.modelObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
      detail.splitter.left.modelObjectNTD.header.innerHTML = ObjectNTD.HEADER_VALUE;
      //detail.splitter.right.modelObjectProperties.setHeader(ModelObjectProperties.HEADER_ID, ObjectProperties.HEADER_VALUE);
      detail.splitter.right.modelObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
      var objectPropertiesMediator = this.facade.retrieveMediator(ModelObjectPropertiesMediator.ID);
      objectPropertiesMediator.setType(AttributeListMediator.TYPE_OBJECT);
      break;
      case SjamayeeFacade.GRID_MODEL_SHOW:
      this.hide();
      detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block");
      switch (this.getState()) {
        case DetailMediator.STATE_PARENT:
        this.sendNotification(SjamayeeFacade.GRID_MODEL_PARENT_SHOW);
        break;
        case DetailMediator.STATE_CHILD:
        this.sendNotification(SjamayeeFacade.GRID_MODEL_CHILD_SHOW);
        break;
        default:
        this.sendNotification(SjamayeeFacade.GRID_MODEL_PARENTANDCHILD_SHOW);
        break;
      }
      break;
      case SjamayeeFacade.GRID_MODEL_PARENT_SHOW:
      this.hide();
      //detail.splitter.left.modelObjectNTD.setHeader(ModelParentNTD.HEADER_ID, ParentNTD.HEADER_VALUE);
      detail.splitter.left.modelObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
      detail.splitter.left.modelObjectNTD.header.innerHTML = ParentNTD.HEADER_VALUE;
      //detail.splitter.right.modelObjectProperties.setHeader(ModelParentProperties.HEADER_ID, ModelParentProperties.HEADER_VALUE);
      detail.splitter.right.modelObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
      this.sendNotification(SjamayeeFacade.GRID_MODEL_RESIZE,SjamayeeFacade.SIZE_NORMAL);
      //this.sendNotification(SjamayeeFacade.GRID_PARENT_SHOW); //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIND REPLACEMENT !!!
      break;
      case SjamayeeFacade.GRID_MODEL_PARENTANDCHILD_SHOW:
      this.hide();
      detail.splitter.left.modelParentDetail.setAttribute("style","width:100%;height:100%;display:block;");
      detail.splitter.right.modelChildDetail.setAttribute("style","width:100%;height:100%;display:block;");
      this.sendNotification(SjamayeeFacade.GRID_MODEL_RESIZE,SjamayeeFacade.SIZE_NORMAL);
      //this.sendNotification(SjamayeeFacade.GRID_PARENTANDCHILD_SHOW); //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIND REPLACEMENT !!!
      break;
      case SjamayeeFacade.GRID_MODEL_CHILD_SHOW:
      this.hide();
      //detail.splitter.left.modelObjectNTD.setHeader(ModelChildNTD.HEADER_ID, ChildNTD.HEADER_VALUE);
      detail.splitter.left.modelObjectNTD.setAttribute("style","width:100%;height:100%;display:block;");
      detail.splitter.left.modelObjectNTD.header.innerHTML = ChildNTD.HEADER_VALUE;
      //detail.splitter.right.modelObjectProperties.setHeader(ModelChildProperties.HEADER_ID, ModelChildProperties.HEADER_VALUE);
      detail.splitter.right.modelObjectProperties.setAttribute("style","width:100%;height:100%;display:block;");
      this.sendNotification(SjamayeeFacade.GRID_MODEL_RESIZE,SjamayeeFacade.SIZE_NORMAL);
      //this.sendNotification(SjamayeeFacade.GRID_CHILD_SHOW); //TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! FIND REPLACEMENT !!!
      break;
    }
  }
});
//ModelDetailMediator.ID = "ModelDetailMediator";

//Abstract
//Class: DetailNTDMediator
var DetailNTDMediator = new Class({
  Extends: SjamayeeMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.onNTDClick = this.onNTDClick.bindWithEvent(this);
    this.onNTDKeypress = this.onNTDKeypress.bindWithEvent(this);
    this.onNTDKeydown = this.onNTDKeydown.bindWithEvent(this);
    this.onNameClick = this.onNameClick.bindWithEvent(this);
    this.onNameKeypress = this.onNameKeypress.bindWithEvent(this);
    this.onNameKeydown = this.onNameKeydown.bindWithEvent(this);
    this.onGoClick = this.onGoClick.bindWithEvent(this);
    this.onNoGoClick = this.onNoGoClick.bindWithEvent(this);    
    var ntd = this.getViewComponent();
    ntd.addEvent(SjamayeeFacade.ENTITY_NTD_CLICK, this.onNTDClick);
    ntd.addEvent(SjamayeeFacade.ENTITY_NTD_KEYPRESS, this.onNTDKeypress);
    ntd.addEvent(SjamayeeFacade.ENTITY_NTD_KEYDOWN, this.onNTDKeydown);
    ntd.addEvent(SjamayeeFacade.ENTITY_NAME_CLICK, this.onNameClick);
    ntd.addEvent(SjamayeeFacade.ENTITY_NAME_KEYPRESS, this.onNameKeypress);
    ntd.addEvent(SjamayeeFacade.ENTITY_NAME_KEYDOWN, this.onNameKeydown);
    ntd.addEvent(SjamayeeFacade.GO_NTD_CLICK, this.onGoClick);
    ntd.addEvent(SjamayeeFacade.NOGO_NTD_CLICK, this.onNoGoClick);
  },
  onNTDClick: function()    { this.sendNotification(SjamayeeFacade.ENTITY_NTD_CLICK); },
  onNTDKeypress: function() { this.sendNotification(SjamayeeFacade.ENTITY_NTD_KEYPRESS); },
  onNTDKeydown: function()  {
    var e = new Event(e);
    this.sendNotification(SjamayeeFacade.ENTITY_NTD_KEYDOWN);
  },
  onNameClick: function()    { this.sendNotification(SjamayeeFacade.ENTITY_NAME_CLICK); },
  onNameKeypress: function() { this.sendNotification(SjamayeeFacade.ENTITY_NAME_KEYPRESS); },
  onNameKeydown: function()  { this.sendNotification(SjamayeeFacade.ENTITY_NAME_KEYDOWN); },
  onGoClick: function()      { alert("DetailNTDMediator/onGoClick"); },
  onNoGoClick: function()    { alert("DetailNTDMediator/onNoGoClick"); },
});

//Abstract
//Class: ObjectNTDMediator
var ObjectNTDMediator = new Class({
  Extends: DetailNTDMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
  },
  onNTDClick: function()    { this.sendNotification(SjamayeeFacade.OBJECT_NTD_CLICK); },
  onNTDKeypress: function() { this.sendNotification(SjamayeeFacade.OBJECT_NTD_KEYPRESS); },
  onNTDKeydown: function()  {
    var e = new Event(e);
    this.sendNotification(SjamayeeFacade.OBJECT_NTD_KEYDOWN);
  },
  onNameClick: function()     { this.sendNotification(SjamayeeFacade.OBJECT_NAME_CLICK); },
  onNameKeypress: function()  { this.sendNotification(SjamayeeFacade.OBJECT_NAME_KEYPRESS); },
  onNameKeydown: function()   { this.sendNotification(SjamayeeFacade.OBJECT_NAME_KEYDOWN); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OBJECT_NTD_CLICK,
      SjamayeeFacade.OBJECT_NTD_KEYPRESS,
      SjamayeeFacade.OBJECT_NTD_KEYDOWN,
      SjamayeeFacade.OBJECT_NAME_CLICK,
      SjamayeeFacade.OBJECT_NAME_KEYPRESS,
      SjamayeeFacade.OBJECT_NAME_KEYDOWN
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var ntd = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OBJECT_NTD_CLICK:
      break;
      case SjamayeeFacade.OBJECT_NTD_KEYPRESS:
      break;
      case SjamayeeFacade.OBJECT_NTD_KEYDOWN:
      break;
      case SjamayeeFacade.OBJECT_NAME_CLICK:
      break;
      case SjamayeeFacade.OBJECT_NAME_KEYPRESS:
      break;
      case SjamayeeFacade.OBJECT_NAME_KEYDOWN:
      break;
    }
  }
});

//Class: DataObjectNTDMediator
var DataObjectNTDMediator = new Class({
  Extends: ObjectNTDMediator,
  initialize: function(viewComponent) {
    this.parent(DataObjectNTDMediator.ID,viewComponent);
  },
  onGoClick: function() {
    var mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
    if (mediator.isEdit()) {
      //mediator.saveObject();
      this.sendNotification(SjamayeeFacade.OBJECT_DATA_SAVE, mediator);
    } else {
      //mediator.showSFDCObject();
      this.sendNotification(SjamayeeFacade.OBJECT_DATA_SFDC_SHOW, mediator);
    }
    //objectsMediator.setDisplay();
  },
  onNoGoClick: function() {
    var mediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
    //mediator.cancelObject();
    this.sendNotification(SjamayeeFacade.OBJECT_DATA_CANCEL, mediator);
    //mediator.setDisplay();
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OBJECT_DATA_DETAIL
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var ntd = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OBJECT_DATA_DETAIL:
      /*var listObject = note.getBody();
      var object = listObject.getObject();
      ntd.setName(object.getNameTranslated());
      ntd.setType(object.getType());
      ntd.setDescription(object.getDescTranslated());
      ntd.setCreatedBy(object.getCby());
      ntd.setModifiedBy(object.getMby());*/
      //Display buttons.
      var objectsMediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
      var goButtonLabel = DetailNTD.SALESFORCE_BUTTON_LABEL;
      if (objectsMediator.isEdit()) {
        goButtonLabel = DetailNTD.SAVE_BUTTON_LABEL;
      }
      ntd.goButton.innerHTML = goButtonLabel;
      var noGoStyle = "display:none;"
      if (objectsMediator.isEdit()) { noGoStyle = "display:block;background-color:lightblue;"; }
      ntd.noGoButton.setAttribute("style",noGoStyle);
      break;
    }
  }
});
DataObjectNTDMediator.ID = "DataObjectNTDMediator";

//Class: ModelObjectNTDMediator
var ModelObjectNTDMediator = new Class({
  Extends: ObjectNTDMediator,
  initialize: function(viewComponent) {
    this.parent(ModelObjectNTDMediator.ID,viewComponent);
  },
  onGoClick: function() {
    var mediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
    if (mediator.isEdit()) {
      //mediator.saveObject();
      this.sendNotification(SjamayeeFacade.OBJECT_MODEL_SAVE, mediator);
    } else {
      //mediator.showSFDCObject();
      this.sendNotification(SjamayeeFacade.OBJECT_MODEL_SFDC_SHOW, mediator);
    }
    //objectsMediator.setDisplay();
  },
  onNoGoClick: function() {
    var mediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
    //mediator.cancelObject();
    this.sendNotification(SjamayeeFacade.OBJECT_MODEL_CANCEL, mediator);
    //mediator.setDisplay();
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OBJECT_MODEL_DETAIL
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var ntd = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OBJECT_MODEL_DETAIL:
      /*var listObject = note.getBody();
      var object = listObject.getObject();
      ntd.setName(object.getNameTranslated());
      ntd.setType(object.getType());
      ntd.setDescription(object.getDescTranslated());
      ntd.setCreatedBy(object.getCby());
      ntd.setModifiedBy(object.getMby());*/
      //Display buttons.
      var objectsMediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
      var goButtonLabel = DetailNTD.SALESFORCE_BUTTON_LABEL;
      if (objectsMediator.isEdit()) {
        goButtonLabel = DetailNTD.SAVE_BUTTON_LABEL;
      }
      ntd.goButton.innerHTML = goButtonLabel;
      var noGoStyle = "display:none;"
      if (objectsMediator.isEdit()) { noGoStyle = "display:block;background-color:"+this.getBackgroundHighliteColor(); }
      ntd.noGoButton.setAttribute("style",noGoStyle);
      break;
    }
  }
});
ModelObjectNTDMediator.ID = "ModelObjectNTDMediator";
ModelObjectNTDMediator.BACKGROUND_HIGHLITE_COLOR = "#FAE4DB;";

//Abstract
//Class: ObjectPropertiesMediator
var ObjectPropertiesMediator = new Class({
  Extends: AttributeListMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.type = null;
    this.topOid = null;
    this.bottomOid = null;
    this.currentOid = null;
  },
  onNameClick: function()  {
    this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_NAME_CLICK);
  },
  onValueClick: function() {
    this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_VALUE_CLICK);
  },
  onLineMouseOver: function(evt) {
    //this.setPointerEvent(evt);
    this.parent(evt,this.getBackgroundHighliteColor());
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      //SjamayeeFacade.OBJECT_DETAIL,
      SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_KEYPRESS,
      //SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_CLICK,
      SjamayeeFacade.OBJECT_ATTRIBUTE_LINE_CLICK,
      SjamayeeFacade.OBJECT_ATTRIBUTE_NAME_CLICK,
      SjamayeeFacade.OBJECT_ATTRIBUTE_VALUE_CLICK,
      SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ESCAPE,
      SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_SPACE,
      SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ENTER,
      SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_HOME,
      SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_PREVIOUS,
      SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_UP,
      SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_DOWN,
      SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_NEXT,
      SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_END
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var attributeList = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OBJECT_DETAIL:
      //Initialize list.
      //this.setList(new AttributeList(object));
      //this.setList(object.getSfdcAttributes());
      this.setBeginOfList(1);
      this.setEndOfList(AttributeListUIComponent.PAGE_SIZE);
      this.home();
      break;
      case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_KEYPRESS:
      break;
      //case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_CLICK:
      //this.sendNotification(SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ACTIVATE);
      //break;
      case SjamayeeFacade.OBJECT_ATTRIBUTE_LINE_CLICK:
      var evt = note.getBody();
      this.setCurrentLine(evt);
      break;
      case SjamayeeFacade.OBJECT_ATTRIBUTE_NAME_CLICK:
      break;      
      case SjamayeeFacade.OBJECT_ATTRIBUTE_VALUE_CLICK:
      break;      
      case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ESCAPE:
      break;
      case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_SPACE:
      break;
      case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_ENTER:
      break;
      case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_HOME:
      //this.home();
      this.firstPage();
      break;
      case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_PREVIOUS:
      this.previousPage();
      break;
      case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_UP:
      //this.lineUp();
      this.previousLine();
      break;
      case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_DOWN:
      //this.lineDown();
      this.nextLine();
      break;
      case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_NEXT:
      this.nextPage();
      break;
      case SjamayeeFacade.OBJECT_ATTRIBUTE_LIST_END:
      //this.end();
      this.lastPage();
      break;
    }
  },
  setType: function(type) {
    this.type = type;
    switch (this.type) {
      case AttributeListMediator.TYPE_OBJECT:
      this.setLine(this.getObjectLine());
      break;
      case AttributeListMediator.TYPE_PARENT:
      this.setLine(this.getParentLine());
      break;
      case AttributeListMediator.TYPE_CHILD:
      this.setLine(this.getChildLine());
      break;
    }
  },
  getType: function() {
    return this.type;
  },
/*
  setLine: function(line) {
    try {
      this.line = line;
      var type = this.getType();
      if (type) {
        switch (type) {
          case AttributeListMediator.TYPE_OBJECT:
          this.setObjectLine(this.getLine());
          break;
          case AttributeListMediator.TYPE_PARENT:
          this.setParentLine(this.getLine());
          //var parentPropertiesMediator = this.facade.retrieveMediator(ParentPropertiesMediator.ID);
          //parentPropertiesMediator.setLine(this.getLine());
          break;
          case AttributeListMediator.TYPE_CHILD:
          this.setChildLine(this.getLine());
          //var childPropertiesMediator = this.facade.retrieveMediator(ChildPropertiesMediator.ID);
          //childPropertiesMediator.setLine(this.getLine());
          break;
        }
      }
    } finally {
      $(this.getViewComponent().getNameCellId(2)).focus();
    //$(ObjectProperties.ID+AttributeListUIComponent.NAME_ID+"2D").focus();
    //$(ObjectProperties.ID+AttributeListUIComponent.VALUE_ID+"2D").focus();
    }
  },
*/
  firstPage: function() {
    try {
      var attributeList = this.getList(); //.getCache();
      if (attributeList) {
        //attributeList.firstPage();
        //Fill list.
        this.fillList(List.METHOD_FIRST,null);
      }
    } catch(error) {
      Utils.alert("ObjectPropertiesMediator/firstPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  previousPage: function() {
    try {
      var attributeList = this.getList(); //.getCache();
      if (attributeList) {
        //attributeList.previousPage();
        //Fill list.
        this.fillList(List.METHOD_PREVIOUS,this.getTopOid());
      }
    } catch(error) {
      Utils.alert("ObjectPropertiesMediator/previousPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  previousLine: function() {
    try {
      var attributeList = this.getList(); //.getCache();
      if (attributeList) {
        //attributeList.previousLine();
        //Fill list.
        this.fillList(List.METHOD_PREVIOUS,this.getBottomOid());
      }
    } catch(error) {
      Utils.alert("ObjectPropertiesMediator/previousLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  nextLine: function() {
    try {
      var attributeList = this.getList(); //.getCache();
      if (attributeList) {
        //attributeList.nextLine();
        //Fill list.
        this.fillList(List.METHOD_NEXT,this.getTopOid());
      }
    } catch(error) {
      Utils.alert("ObjectPropertiesMediator/nextLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  nextPage: function() {
    try {
      var attributeList = this.getList(); //.getCache();
      if (attributeList) {
        //attributeList.nextPage();
        //Fill list.
        this.fillList(List.METHOD_NEXT,this.getBottomOid());
      }
    } catch(error) {
      Utils.alert("ObjectPropertiesMediator/nextPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  lastPage: function() {
    try {
      var attributeList = this.getList(); //.getCache();
      if (attributeList) {
        //attributeList.lastPage();
        //Fill list.
        this.fillList(List.METHOD_LAST,null);
      }
    } catch(error) {
      Utils.alert("ObjectPropertiesMediator/lastPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  fillList: function(method,oid) {
    var result = false;
    var initial = true;
    var oidOk = false;
    var beginValue = 0;
    var endValue = 0;
    var step = 1;
    var i = 0;
    var i1 = 0;
    var iMax = this.getEndOfList();
    var j = 0;
    var oids = null;
    try {
      var attributes = this.getList(); //.getCache().getCache();
      if (attributes) {
        if ((method == List.METHOD_FIRST) ||
            (method == List.METHOD_NEXT) ||
            (method == List.METHOD_DOWN)) {
          //DOWN!
          endValue = (attributes.length - 1);
          if (method == List.METHOD_DOWN) {
            iMax = 0;
          }
        } else if ((method == List.METHOD_UP) ||
                   (method == List.METHOD_PREVIOUS) ||
                   (method == List.METHOD_LAST)) {
          //UP!
          beginValue = (attributes.length - 1);
          step = -1;
          i = this.getEndOfList();
          if (method == List.METHOD_UP) {
            i = 0;
          }
          iMax = 0;
        }
        for (j = beginValue; j != (endValue + step); j = (j + step)) {
          //var listObject = attributes[j];
          var attribute = attributes[j];
          //var attribute = listObject.getObject();
          if (oidOk === false) {
            if (oid === null) {
              oidOk = true;
            } else {
              oidOk = (attribute.getId() == oid)?true:false;
              continue;
            }
          }
          if (oidOk === false) { continue; }

        if (method == List.METHOD_FIRST) {
            if (initial === true) {
              this.setTopOid(attribute.getId());
            }
            this.setBottomOid(attribute.getId());
          } else if (method == List.METHOD_NEXT || method == List.METHOD_DOWN) {
            if (initial === true) {
              this.setTopOid(attribute.getId());
            }
            this.setBottomOid(attribute.getId());
          } else if (method == List.METHOD_PREVIOUS || method == List.METHOD_UP){
            if (initial === true) {
              this.setBottomOid(attribute.getId());
            }
            this.setTopOid(attribute.getId());
          } else if (method == List.METHOD_LAST) {
            if (initial === true) {
              this.setBottomOid(attribute.getId());
            }
            this.setTopOid(attribute.getId());
          }
          //Set current line.
          if (i == this.getLine()) {
            this.setCurrentOid(attribute.getId());
          }
          this.fillOneLine(i,this.getLine(),attribute);
          initial = false;
          if (i == iMax) {
            result = true;    //Page OK.
            initial = result;
            break;
          }
          i = (i + step);
        }
        //Clear the remaining lines!!!
        if (initial === false) {
          if (i != (iMax + step)) {
            var j1 = 0;
            for (i; i != (iMax + step); i = (i + step)) {
              this.clearOneLine(i);
              j1++;
              if (j1 > this.getEndOfList()) { break; }
            }
          } else {
            /////////////////////////////////////////////////////////////////////////////////
            //TODO: First/Last page WITHOUT initialisation (keeps fast paging UP/DOWN !!!) //
            /////////////////////////////////////////////////////////////////////////////////
            //Align display on top of list (when Page NOK) !!!
            //if (this.getCache().getEndOfData()) {
            if (this.getList().getEndOfData()) {
              if ((method == List.METHOD_UP) ||
                  (method == List.METHOD_PREVIOUS) ||
                  (method == List.METHOD_LAST)) {
                this.firstPage();
                oids = "";
                i1 = 0;
                for (i1 in attributes) {
                  if (attributes[i1]) {
                    oids += "\n"+i1+": "+attributes[i1].getId();
                  }
                }
                Utils.alert("6ObjectPropertiesMediator/fillList - align/firstPage !!!"+
                            "\nmethod: "+method+
                            "\noid: "+oid+
                            "\nbeginValue: "+beginValue+" - endValue: "+endValue+
                            "\n\nattributes: length("+attributes.length+")"+oids);
                return result;
              } else if ((method == List.METHOD_NEXT) ||
                         (method == List.METHOD_DOWN)) {
                this.lastPage();
                oids = "";
                i1 = 0;
                for (i1 in attributes) {
                  if (attributes[i1]) {
                    oids += "\n"+i1+": "+attributes[i1].getId();
                  }
                }
                Utils.alert("7ObjectPropertiesMediator/fillList - align/lastPage !!!"+
                            "\nmethod: "+method+
                            "\noid: "+oid+
                            "\nbeginValue: "+beginValue+" - endValue: "+endValue+
                            "\n\nattributes: length("+attributes.length+")"+oids);
                return result;
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("8ObjectPropertiesMediator/fillList Error: "+error.message+
                  "\nmethod: "+method+"\noid: "+oid+"\niMax="+iMax+"\ni="+i);
    } finally {
      return result;
    }
  },
  fillOneLine: function(index,currentIndex,attribute) {
    try {
      if (attribute) {
/*
        var cellClass = ObjectsListMediator.CELL_CLASS_ID;
        var cell01Class = ObjectsListMediator.CELL_01_CLASS_ID;
        if (index === 0) {
          cellClass = ObjectsListMediator.CELL_FIRST_LINE_CLASS_ID;
          cell01Class = ObjectsListMediator.CELL_01_FIRST_LINE_CLASS_ID;
        }
        //Normal line.
        var objectLineStyle = "background-color:inherit;font-weight:normal;";
        if (index == currentIndex) {
          //Current line - focused.
          //objectLineStyle = "background-color:lightgray;font-weight:bold;";
          objectLineStyle = "background-color:"+FontStyle.COLOR_LIGHTGRAY+";font-weight:bold;";
        }
        var reference = '<a id="'+ObjectsListLeft.REF_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+listObject.getReferences()+'</a>';
        var name = '<a id="'+ObjectsListLeft.NAME_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getNameTranslated()+'</a>';
      //var name = '<a id="'+ObjectsListLeft.NAME_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getName()+' ('+object.getId()+')'+'</a>';
      //var type = object.getImageHtml(SjamayeeForm.IMAGE_SMALL,"position:relative;float:left;padding:0px 1px 0px 0px;")+ //0px 3px 0px 3px;")+
      //           '<a id="'+ObjectsListLeft.TYPE_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getTypeObject().getNameTranslated()+'</a>'; //getType()  // TEST NULL!!!
      //var type = '<a id="'+ObjectsListLeft.TYPE_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getTypeObject().getNameTranslated()+'</a>'; //getType()  // TEST NULL!!!
        var type = '<a id="'+ObjectsListLeft.TYPE_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getType()+'</a>'; //getType()  // TEST NULL!!!
        var description = '<a id="'+ObjectsListRight.DESC_ANCHOR_ID+index+'" class="'+ObjectsListMediator.CELL_CONTENT_CLASS_ID+'" href="#" tabindex="-1">'+object.getDescTranslated()+'</a>';

        this.listUICLeft.setCell((ObjectsListLeft.REF_COLUMN_ID+"0"+index),reference);
        this.listUICLeft.setCell((ObjectsListLeft.NAME_COLUMN_ID+"0"+index),name);
        this.listUICLeft.setCell((ObjectsListLeft.TYPE_COLUMN_ID+"0"+index),type);
        this.listUICRight.setCell((ObjectsListRight.DESC_COLUMN_ID+"0"+index),description);
*/
/*
        document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).setAttribute("class",cell01Class);
        document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).setAttribute("style",objectLineStyle+"padding:1px 5px 1px 1px;text-align:right;");
        document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).innerHTML = reference;
        document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).setAttribute("class",cellClass);
        document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).setAttribute("style",objectLineStyle);
        document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).innerHTML = name;
        document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).setAttribute("class",cellClass);
        document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).setAttribute("style",objectLineStyle);
        document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).innerHTML = type;
        document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).setAttribute("class",cellClass);
        document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).setAttribute("style",objectLineStyle);
        document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).innerHTML = description;
*/
      }
    } catch(error) {
      Utils.alert("ObjectPropertiesMediator/fillOneLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  clearOneLine: function(index) {
    try {
/*      
      var objectLineClass = ObjectsListMediator.NORMAL_LINE_CLASS_ID;
      var cellClass = ObjectsListMediator.CELL_CLASS_ID;
      var cell01Class = ObjectsListMediator.CELL_01_CLASS_ID;
      if (index === 0) {
        cellClass = ObjectsListMediator.CELL_FIRST_LINE_CLASS_ID;
        cell01Class = ObjectsListMediator.CELL_01_FIRST_LINE_CLASS_ID;
      }
      this.listUICLeft.setCell((ObjectsListLeft.REF_COLUMN_ID+"0"+index),"&nbsp;");
      this.listUICLeft.setCell((ObjectsListLeft.NAME_COLUMN_ID+"0"+index),"&nbsp;");
      this.listUICLeft.setCell((ObjectsListLeft.TYPE_COLUMN_ID+"0"+index),"&nbsp;");
      this.listUICRight.setCell((ObjectsListRight.DESC_COLUMN_ID+"0"+index),"&nbsp;");
*/
/*
      document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).setAttribute("class",objectLineClass+" "+cell01Class);
      document.getElementById(ObjectsListLeft.REF_COLUMN_ID+"0"+index).innerHTML = '&nbsp;';
      document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).setAttribute("class",objectLineClass+" "+cellClass);
      document.getElementById(ObjectsListLeft.NAME_COLUMN_ID+"0"+index).innerHTML = '&nbsp;';
      document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).setAttribute("class",objectLineClass+" "+cellClass);
      document.getElementById(ObjectsListLeft.TYPE_COLUMN_ID+"0"+index).innerHTML = '&nbsp;';
      document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).setAttribute("class",objectLineClass+" "+cellClass);
      document.getElementById(ObjectsListRight.DESC_COLUMN_ID+"0"+index).innerHTML = '&nbsp;';
*/
    } catch(error) {
      Utils.alert("ObjectPropertiesMediator/clearOneLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  getTopOid: function() {
    if (this.topOid === undefined) {
      this.topOid = null;
    }
    return this.topOid;
  },
  setTopOid: function(oid) {
    this.topOid = oid;
  },
  getBottomOid: function() {
    if (this.bottomOid === undefined) {
      this.bottomOid = null;
    }
    return this.bottomOid;
  },
  setBottomOid: function(oid) {
    this.bottomOid = oid;
  },
  getCurrentOid: function() {
    if (this.currentOid === undefined) {
      this.currentOid = null;
    }
    return this.currentOid;
  },
  setCurrentOid: function(oid) {
    this.currentOid = oid;
  },
  getBackgroundHighliteColor: function() {
    return ObjectPropertiesMediator.BACKGROUND_HIGHLITE_COLOR;
  } 
});
ObjectPropertiesMediator.BACKGROUND_HIGHLITE_COLOR = "lightgray;";

//Class: DataObjectPropertiesMediator
var DataObjectPropertiesMediator = new Class({
  Extends: ObjectPropertiesMediator,
  initialize: function(viewComponent) {
    this.parent(DataObjectPropertiesMediator.ID,viewComponent);
  },
  //OK - NEEDED !!!
  setLine: function(line) {
    try {
      //this.line = line;
      this.parent(line);
      var type = this.getType();
      if (type) {
        switch (type) {
          case AttributeListMediator.TYPE_OBJECT:
          this.setObjectLine(this.getLine());
          break;
          case AttributeListMediator.TYPE_PARENT:
          this.setParentLine(this.getLine());
          var parentPropertiesMediator = this.facade.retrieveMediator(DataParentPropertiesMediator.ID);
          parentPropertiesMediator.setLine(this.getLine());
          break;
          case AttributeListMediator.TYPE_CHILD:
          this.setChildLine(this.getLine());
          var childPropertiesMediator = this.facade.retrieveMediator(DataChildPropertiesMediator.ID);
          childPropertiesMediator.setLine(this.getLine());
          break;
        }
      }
    } finally {
      //$(this.getViewComponent().getNameCellId(2)).focus();
    //$(ObjectProperties.ID+AttributeListUIComponent.NAME_ID+"2D").focus();
    //$(ObjectProperties.ID+AttributeListUIComponent.VALUE_ID+"2D").focus();
    }
  }
});
DataObjectPropertiesMediator.ID = "DataObjectPropertiesMediator";

//Class: ModelObjectPropertiesMediator
var ModelObjectPropertiesMediator = new Class({
  Extends: ObjectPropertiesMediator,
  initialize: function(viewComponent) {
    this.parent(ModelObjectPropertiesMediator.ID,viewComponent);
  },
  //OK - NEEDED !!!
  setLine: function(line) {
    try {
      //this.line = line;
      this.parent(line);
      var type = this.getType();
      if (type) {
        switch (type) {
          case AttributeListMediator.TYPE_OBJECT:
          this.setObjectLine(this.getLine());
          break;
          case AttributeListMediator.TYPE_PARENT:
          this.setParentLine(this.getLine());
          var parentPropertiesMediator = this.facade.retrieveMediator(ModelParentPropertiesMediator.ID);
          parentPropertiesMediator.setLine(this.getLine());
          break;
          case AttributeListMediator.TYPE_CHILD:
          this.setChildLine(this.getLine());
          var childPropertiesMediator = this.facade.retrieveMediator(ModelChildPropertiesMediator.ID);
          childPropertiesMediator.setLine(this.getLine());
          break;
        }
      }
    } finally {
      //$(this.getViewComponent().getNameCellId(2)).focus();
    //$(ObjectProperties.ID+AttributeListUIComponent.NAME_ID+"2D").focus();
    //$(ObjectProperties.ID+AttributeListUIComponent.VALUE_ID+"2D").focus();
    }
  }
});
ModelObjectPropertiesMediator.ID = "ModelObjectPropertiesMediator";
/*
//Abstract
//Class: EntityDetailMediator
var EntityDetailMediator = new Class({
  Extends: SjamayeeMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
  },
  getNTD: function() {
    return this.getViewComponent().ntd;
  },
  getProperties: function() {
    return this.getViewComponent().properties;
  }
});

//Abstract
//Class: ParentDetailMediator
var ParentDetailMediator = new Class({
  Extends: EntityDetailMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
  }
});
*/

/*                                                                        TODO: OBJECT/DETAIL/NTD !!! !!!!!!!!!!!!!!!!!
//Class: DataObjectDetailMediator
var DataObjectDetailMediator = new Class({
  Extends: DataDetailMediator,
  initialize: function(viewComponent) {
    this.parent(DataObjectDetailMediator.ID,viewComponent);
    var detail = this.getViewComponent();
    this.facade.registerMediator(new DataObjectNTDMediator(detail.splitter.left.dataObjectDetail.ntd));
    this.facade.registerMediator(new DataObjectPropertiesMediator(detail.splitter.left.dataObjectDetail.properties));
  }
});
DataObjectDetailMediator.ID = "DataObjectDetailMediator";

//Class: ModelObjectDetailMediator
var ModelObjectDetailMediator = new Class({
  Extends: ModelDetailMediator,
  initialize: function(viewComponent) {
    this.parent(ModelObjectDetailMediator.ID,viewComponent);
    var detail = this.getViewComponent();
    this.facade.registerMediator(new ModelObjectNTDMediator(detail.splitter.left.modelObjectDetail.ntd));
    this.facade.registerMediator(new ModelObjectPropertiesMediator(detail.splitter.left.modelObjectDetail.properties));
  }
});
ModelObjectDetailMediator.ID = "ModelObjectDetailMediator";
*/

//Class: DataParentDetailMediator
var DataParentDetailMediator = new Class({
  Extends: DataDetailMediator,
  initialize: function(viewComponent) {
    this.parent(DataParentDetailMediator.ID,viewComponent);
    var detail = this.getViewComponent();
    this.facade.registerMediator(new DataParentNTDMediator(detail.splitter.left.dataParentDetail.ntd));
    this.facade.registerMediator(new DataParentPropertiesMediator(detail.splitter.left.dataParentDetail.properties));
  }
});
DataParentDetailMediator.ID = "DataParentDetailMediator";

//Class: ModelParentDetailMediator
var ModelParentDetailMediator = new Class({
  Extends: ModelDetailMediator,
  initialize: function(viewComponent) {
    this.parent(ModelParentDetailMediator.ID,viewComponent);
    var detail = this.getViewComponent();
    this.facade.registerMediator(new ModelParentNTDMediator(detail.splitter.left.modelParentDetail.ntd));
    this.facade.registerMediator(new ModelParentPropertiesMediator(detail.splitter.left.modelParentDetail.properties));
  }
});
ModelParentDetailMediator.ID = "ModelParentDetailMediator";

//Abstract
//Class: ParentNTDMediator
var ParentNTDMediator = new Class({
  Extends: DetailNTDMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
  },
  onNTDClick: function()    { this.sendNotification(SjamayeeFacade.PARENT_NTD_CLICK); },
  onNTDKeypress: function() { this.sendNotification(SjamayeeFacade.PARENT_NTD_KEYPRESS); },
  onNTDKeydown: function()  {
    var e = new Event(e);
    this.sendNotification(SjamayeeFacade.PARENT_NTD_KEYDOWN);
  },
  onNameClick: function()     { this.sendNotification(SjamayeeFacade.PARENT_NAME_CLICK); },
  onNameKeypress: function()  { this.sendNotification(SjamayeeFacade.PARENT_NAME_KEYPRESS); },
  onNameKeydown: function()   { this.sendNotification(SjamayeeFacade.PARENT_NAME_KEYDOWN); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.PARENT_DETAIL,
      SjamayeeFacade.PARENT_NTD_CLICK,
      SjamayeeFacade.PARENT_NTD_KEYPRESS,
      SjamayeeFacade.PARENT_NTD_KEYDOWN,
      SjamayeeFacade.PARENT_NAME_CLICK,
      SjamayeeFacade.PARENT_NAME_KEYPRESS,
      SjamayeeFacade.PARENT_NAME_KEYDOWN
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var ntd = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.PARENT_DETAIL:
      //Display buttons.
      var relationsMediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID); //TODO: SPLIT >>> DATA/MODEL - OBJECT/RELATION !!!
      var goButtonLabel = DetailNTD.SALESFORCE_BUTTON_LABEL;
      //var goButtonScript = "_rf.showSFDCParentObject();";
      if (relationsMediator.isEdit()) {
        goButtonLabel = DetailNTD.SAVE_BUTTON_LABEL;
        //goButtonScript = "_rf.saveParentObject();";
      }
      ntd.goButton.innerHTML = goButtonLabel;
      //ntd.goButton.setAttribute("onclick",goButtonScript);      
      var noGoStyle = "display:none;"
      if (relationsMediator.isEdit()) { noGoStyle = "display:block;background-color:lightblue;"; }
      ntd.noGoButton.setAttribute("style",noGoStyle);
      break;
      case SjamayeeFacade.PARENT_NTD_CLICK:
      break;
      case SjamayeeFacade.PARENT_NTD_KEYPRESS:
      break;
      case SjamayeeFacade.PARENT_NTD_KEYDOWN:
      break;
      case SjamayeeFacade.PARENT_NAME_CLICK:
      break;
      case SjamayeeFacade.PARENT_NAME_KEYPRESS:
      break;
      case SjamayeeFacade.PARENT_NAME_KEYDOWN:
      break;
    }
  }
});

//Class: DataParentNTDMediator
var DataParentNTDMediator = new Class({
  Extends: ParentNTDMediator,
  initialize: function(viewComponent) {
    this.parent(DataParentNTDMediator.ID,viewComponent);
  },
  onGoClick: function() {
    var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
    //mediator.showSFDCObject();
    mediator.setDisplay(true); //FORCED!!! OK !!!
    this.sendNotification(SjamayeeFacade.RELATION_DATA_SFDC_SHOW, mediator);
  }
});
DataParentNTDMediator.ID = "DataParentNTDMediator";

//Class: ModelParentNTDMediator
var ModelParentNTDMediator = new Class({
  Extends: ParentNTDMediator,
  initialize: function(viewComponent) {
    this.parent(ModelParentNTDMediator.ID,viewComponent);
  },
  onGoClick: function() {
    var mediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
    //mediator.showSFDCObject();
    mediator.setDisplay(true); //FORCED !!! OK !!!
    this.sendNotification(SjamayeeFacade.RELATION_MODEL_SFDC_SHOW, mediator);
  }
});
ModelParentNTDMediator.ID = "ModelParentNTDMediator";

//Abstract
//Class: ParentPropertiesMediator
var ParentPropertiesMediator = new Class({
  Extends: AttributeListMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
  },
  setLine: function(line) {
    try {
      //this.line = line;
      this.parent(line);
      this.setParentLine(this.getLine());
    } finally {
      //$(ParentProperties.ID+AttributeListUIComponent.VALUE_ID+"4D").focus();
      //$(this.getViewComponent().getValueCellId(4)).focus();
    }
  },
  onNameClick: function()        { this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_NAME_CLICK); },
  onValueClick: function()       { this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_VALUE_CLICK); },
  onLineMouseOver: function(evt) {
    //this.setPointerEvent(evt);
    this.parent(evt,this.getBackgroundHighliteColor());
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.PARENT_ATTRIBUTE_LIST_KEYPRESS,
      //SjamayeeFacade.PARENT_ATTRIBUTE_LIST_CLICK,
      SjamayeeFacade.PARENT_ATTRIBUTE_LINE_CLICK,
      SjamayeeFacade.PARENT_ATTRIBUTE_NAME_CLICK,
      SjamayeeFacade.PARENT_ATTRIBUTE_VALUE_CLICK,
      SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ESCAPE,
      SjamayeeFacade.PARENT_ATTRIBUTE_LIST_SPACE,
      SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ENTER,
      SjamayeeFacade.PARENT_ATTRIBUTE_LIST_HOME,
      SjamayeeFacade.PARENT_ATTRIBUTE_LIST_PREVIOUS,
      SjamayeeFacade.PARENT_ATTRIBUTE_LIST_UP,
      SjamayeeFacade.PARENT_ATTRIBUTE_LIST_DOWN,
      SjamayeeFacade.PARENT_ATTRIBUTE_LIST_NEXT,
      SjamayeeFacade.PARENT_ATTRIBUTE_LIST_END
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var attributeList = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_KEYPRESS:
      break;
      //case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_CLICK:
      //this.sendNotification(SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ACTIVATE);
      //break;
      case SjamayeeFacade.PARENT_ATTRIBUTE_LINE_CLICK:
      var evt = note.getBody();
      this.setCurrentLine(evt);
      break;
      case SjamayeeFacade.PARENT_ATTRIBUTE_NAME_CLICK:
      break;      
      case SjamayeeFacade.PARENT_ATTRIBUTE_VALUE_CLICK:
      break;      
      case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ESCAPE:
      break;
      case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_SPACE:
      break;
      case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_ENTER:
      break;
      case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_HOME:
      this.home();
      break;
      case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_PREVIOUS:
      break;
      case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_UP:
      this.lineUp();
      break;
      case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_DOWN:
      this.lineDown();
      break;
      case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_NEXT:
      break;
      case SjamayeeFacade.PARENT_ATTRIBUTE_LIST_END:
      this.end();
      break;
    }
  },
  getBackgroundHighliteColor: function() {
    return ParentPropertiesMediator.BACKGROUND_HIGHLITE_COLOR;
  } 
});
ParentPropertiesMediator.BACKGROUND_HIGHLITE_COLOR = "lightgray;";

//Class: DataParentPropertiesMediator
var DataParentPropertiesMediator = new Class({
  Extends: ParentPropertiesMediator,
  initialize: function(viewComponent) {
    this.parent(DataParentPropertiesMediator.ID,viewComponent);
  }
});
DataParentPropertiesMediator.ID = "DataParentPropertiesMediator";

//Class: ModelParentPropertiesMediator
var ModelParentPropertiesMediator = new Class({
  Extends: ParentPropertiesMediator,
  initialize: function(viewComponent) {
    this.parent(ModelParentPropertiesMediator.ID,viewComponent);
  }
});
ModelParentPropertiesMediator.ID = "ModelParentPropertiesMediator";
/*
//Abstract
//Class: ChildDetailMediator
var ChildDetailMediator = new Class({
  Extends: EntityDetailMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
  }
});
*/
//Class: DataChildDetailMediator
var DataChildDetailMediator = new Class({
  Extends: DataDetailMediator,
  initialize: function(viewComponent) {
    this.parent(DataChildDetailMediator.ID,viewComponent);
    var detail = this.getViewComponent();
    this.facade.registerMediator(new DataChildNTDMediator(detail.splitter.right.dataChildDetail.ntd));
    this.facade.registerMediator(new DataChildPropertiesMediator(detail.splitter.right.dataChildDetail.properties));
  }
});
DataChildDetailMediator.ID = "DataChildDetailMediator";

//Class: ModelChildDetailMediator
var ModelChildDetailMediator = new Class({
  Extends: ModelDetailMediator,
  initialize: function(viewComponent) {
    this.parent(ModelChildDetailMediator.ID,viewComponent);
    var detail = this.getViewComponent();
    this.facade.registerMediator(new ModelChildNTDMediator(detail.splitter.right.modelChildDetail.ntd));
    this.facade.registerMediator(new ModelChildPropertiesMediator(detail.splitter.right.modelChildDetail.properties));
  }
});
ModelChildDetailMediator.ID = "ModelChildDetailMediator";

//Abstract
//Class: ChildNTDMediator
var ChildNTDMediator = new Class({
  Extends: DetailNTDMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
  },
  onNTDClick: function()    { this.sendNotification(SjamayeeFacade.CHILD_NTD_CLICK); },
  onNTDKeypress: function() { this.sendNotification(SjamayeeFacade.CHILD_NTD_KEYPRESS); },
  onNTDKeydown: function()  {
    var e = new Event(e);
    this.sendNotification(SjamayeeFacade.CHILD_NTD_KEYDOWN);
  },
  onNameClick: function()     { this.sendNotification(SjamayeeFacade.CHILD_NAME_CLICK); },
  onNameKeypress: function()  { this.sendNotification(SjamayeeFacade.CHILD_NAME_KEYPRESS); },
  onNameKeydown: function()   { this.sendNotification(SjamayeeFacade.CHILD_NAME_KEYDOWN); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.CHILD_DETAIL,
      SjamayeeFacade.CHILD_NTD_CLICK,
      SjamayeeFacade.CHILD_NTD_KEYPRESS,
      SjamayeeFacade.CHILD_NTD_KEYDOWN,
      SjamayeeFacade.CHILD_NAME_CLICK,
      SjamayeeFacade.CHILD_NAME_KEYPRESS,
      SjamayeeFacade.CHILD_NAME_KEYDOWN
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var ntd = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.CHILD_DETAIL:
      //Display buttons.
      var relationsMediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID); //TODO: SPLIT >>> DATA/MODEL - OBJECT/RELATION !!!
      var goButtonLabel = DetailNTD.SALESFORCE_BUTTON_LABEL;
      //var goButtonScript = "_rf.showSFDCChildObject();";
      if (relationsMediator.isEdit()) {
        goButtonLabel = DetailNTD.SAVE_BUTTON_LABEL;
        //goButtonScript = "_rf.saveChildObject();";
      }
      ntd.goButton.innerHTML = goButtonLabel;
      //ntd.goButton.setAttribute("onclick",goButtonScript);
      var noGoStyle = "display:none;"
      if (relationsMediator.isEdit()) { noGoStyle = "display:block;background-color:lightgreen;"; }
      ntd.noGoButton.setAttribute("style",noGoStyle);
      break;
      case SjamayeeFacade.CHILD_NTD_CLICK:
      break;
      case SjamayeeFacade.CHILD_NTD_KEYPRESS:
      break;
      case SjamayeeFacade.CHILD_NTD_KEYDOWN:
      break;
      case SjamayeeFacade.CHILD_NAME_CLICK:
      break;
      case SjamayeeFacade.CHILD_NAME_KEYPRESS:
      break;
      case SjamayeeFacade.CHILD_NAME_KEYDOWN:
      break;
    }
  }
});

//Class: DataChildNTDMediator
var DataChildNTDMediator = new Class({
  Extends: ChildNTDMediator,
  initialize: function(viewComponent) {
    this.parent(DataChildNTDMediator.ID,viewComponent);
  },
  onGoClick: function() {
    var mediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
    //mediator.showSFDCObject();
    mediator.setDisplay(true); //Forced !!! OK !!!
    this.sendNotification(SjamayeeFacade.RELATION_DATA_SFDC_SHOW, mediator);
  }
});
DataChildNTDMediator.ID = "DataChildNTDMediator";

//Class: ModelChildNTDMediator
var ModelChildNTDMediator = new Class({
  Extends: ChildNTDMediator,
  initialize: function(viewComponent) {
    this.parent(ModelChildNTDMediator.ID,viewComponent);
  },
  onGoClick: function() {
    var mediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
    //mediator.showSFDCObject();
    mediator.setDisplay(true); //FORCED !!! OK !!!
    this.sendNotification(SjamayeeFacade.RELATION_MODEL_SFDC_SHOW, mediator);
  }
});
ModelChildNTDMediator.ID = "ModelChildNTDMediator";

//Abstract
//Class: ChildPropertiesMediator
var ChildPropertiesMediator = new Class({
  Extends: AttributeListMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
  },
  setLine: function(line) {
    try {
      //this.line = line;
      this.parent(line);
      this.setChildLine(this.getLine());
    } finally {
      //$(ChildProperties.ID+AttributeListUIComponent.VALUE_ID+"6D").focus();
      //$(this.getViewComponent().getValueCellId(6)).focus();
    }
  },
  onNameClick: function() {
    this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_NAME_CLICK);
  },
  onValueClick: function() {
    this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_VALUE_CLICK);
  },
  onLineMouseOver: function(evt) {
    //this.setPointerEvent(evt);
    this.parent(evt,this.getBackgroundHighliteColor());
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.CHILD_ATTRIBUTE_LIST_KEYPRESS,
      //SjamayeeFacade.CHILD_ATTRIBUTE_LIST_CLICK,
      SjamayeeFacade.CHILD_ATTRIBUTE_LINE_CLICK,
      SjamayeeFacade.CHILD_ATTRIBUTE_NAME_CLICK,
      SjamayeeFacade.CHILD_ATTRIBUTE_VALUE_CLICK,
      SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ESCAPE,
      SjamayeeFacade.CHILD_ATTRIBUTE_LIST_SPACE,
      SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ENTER,
      SjamayeeFacade.CHILD_ATTRIBUTE_LIST_HOME,
      SjamayeeFacade.CHILD_ATTRIBUTE_LIST_PREVIOUS,
      SjamayeeFacade.CHILD_ATTRIBUTE_LIST_UP,
      SjamayeeFacade.CHILD_ATTRIBUTE_LIST_DOWN,
      SjamayeeFacade.CHILD_ATTRIBUTE_LIST_NEXT,
      SjamayeeFacade.CHILD_ATTRIBUTE_LIST_END
    ]);
  },

  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var attributeList = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_KEYPRESS:
      break;
      //case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_CLICK:
      //this.sendNotification(SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ACTIVATE);
      //break;
      case SjamayeeFacade.CHILD_ATTRIBUTE_LINE_CLICK:
      var evt = note.getBody();
      this.setCurrentLine(evt);
      break;
      case SjamayeeFacade.CHILD_ATTRIBUTE_NAME_CLICK:
      break;      
      case SjamayeeFacade.CHILD_ATTRIBUTE_VALUE_CLICK:
      break;      
      case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ESCAPE:
      break;
      case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_SPACE:
      break;
      case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_ENTER:
      break;
      case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_HOME:
      this.home();
      break;
      case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_PREVIOUS:
      break;
      case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_UP:
      this.lineUp();
      break;
      case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_DOWN:
      this.lineDown();
      break;
      case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_NEXT:
      break;
      case SjamayeeFacade.CHILD_ATTRIBUTE_LIST_END:
      this.end();
      break;
    }
  },
  getBackgroundHighliteColor: function() {
    return ChildPropertiesMediator.BACKGROUND_HIGHLITE_COLOR;
  } 
});
ChildPropertiesMediator.BACKGROUND_HIGHLITE_COLOR = "lightgray;";

//Class: DataChildPropertiesMediator
var DataChildPropertiesMediator = new Class({
  Extends: ChildPropertiesMediator,
  initialize: function(viewComponent) {
    this.parent(DataChildPropertiesMediator.ID,viewComponent);
  }
});
DataChildPropertiesMediator.ID = "DataChildPropertiesMediator";

//Class: ModelChildPropertiesMediator
var ModelChildPropertiesMediator = new Class({
  Extends: ChildPropertiesMediator,
  initialize: function(viewComponent) {
    this.parent(ModelChildPropertiesMediator.ID,viewComponent);
  }
});
ModelChildPropertiesMediator.ID = "ModelChildPropertiesMediator";

//////////////////////////////////////////////////////////////////////////
/////////////////////////// MODEL ENVIRONMENT ////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////// PROXIES /////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Class: TypeVO
var TypeVO = new Class({
  Extends: CachedObjectVO,
  initialize: function(id,type,code,name,desc,objekt,inUse,txi,top) {
    //this.type = "";
    //this.code = "";
    //this.name = "";
    //this.desc = "";
    //this.objekt = "";
    //this.inUse = false;
    //this.top = false;
    //this.sjamayee = false;
    //this.mei = null;
    try {
      this.parent(id,0,txi);
      if (type !== undefined)   { this.type = type; }
      if (code !== undefined)   { this.code = code; }
      if (name !== undefined)   { this.name = name; }
      if (desc !== undefined)   { this.desc = desc; }
      if (objekt !== undefined) { this.objekt = objekt; }
      if (inUse !== undefined)  { this.inUse = inUse; }
      if (top !== undefined)    { this.top = top; }
    } catch(error) {
      Utils.alert("TypeVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: TypeProxy
var TypeProxy = new Class({
  Extends: CachingProxy,
  initialize: function(name) {
    var _name = (name !== undefined)?name:TypeProxy.ID;
    this.parent(_name);
    //this.addItem(new TypeVO("1","type1","code1","name1","desc1","objekt1","inUse1"));
    //Initialize data.
    //this.setData(new Array());
    //this.loadTypes();   
    this.loadTypesDemo();
  },
  loadTypesDemo: function() {
    var types = _types.types;
    if (types.length > 0) {
      var modelEntityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);     
      var modelEntities = modelEntityProxy.getItems();
      if (modelEntities.length > 0) {
        var tids = [];
        for (var i = 0; i < modelEntities.length; i++) {
          tids.push(modelEntities[i].tid);
        }
        if (tids.length > 0) {
          tids = this._uniqueTids(tids);
          //TODO: read type by ID ***
          for (var i = 0; i < tids.length; i++) {
            for (var j = 0; j < types.length; j++) {
              //TODO: REFACTOR - As early as possible for ALL loads !!!
              var tid = CachingProxy.getSHA2Id(types[j].id);
              if (tid == tids[i]) {
                var jso = types[j];
                this.addItem(new TypeVO(jso.id,jso.type,jso.code,jso.name,jso.desc,jso.objekt,jso.inUse));
                break;
              }
            }
          }
        }
      } else {
        for (var i = 0; i < types.length; i++) {
          if (types[i]) {
            var jso = types[i];
            this.addItem(new TypeVO(jso.id,jso.type,jso.code,jso.name,jso.desc,jso.objekt,jso.inUse));
          }
        }
      }
    }
  },
  getTypes: function() {
    var result = [];
    var types = this.getData();
    if (types.length > 0) {
    /*var modelEntityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);     
      var modelEntities = modelEntityProxy.getItems();
      for (var i = 0; i < types.length; i++) {
        if (types[i]) {
          var type = (types[i]);
          if (modelEntities.length > 0) {
            for (var j = 0; j < modelEntities.length; j++) {
              var modelEntity = modelEntities[j];
              if (modelEntity.tid != type.id) { continue; }
              //type.name = modelEntity.name;
              type.mei = modelEntity.id;
              result.push(type);
              break;
            }
          }
        }
      }*/
      for (var i = 0; i < types.length; i++) {
        if (types[i]) {
          var type = types[i];
          type.mei = null;
          result.push(type);
        }
      }
    }
    //Sort DESCENDING
    //result.sort(TypeProxy.sortName);
    return result;
  },
  getListTypes: function() {
    return this.getTypes();
  },
/*TODO: Load types from ModelEntities OR Types !!!
  loadTypes: function() {
    var typesText = sforce.apex.execute('sja.TypeService','getTypes',{});
    var types = Utils.eval(typesText,true);    
    var i = 0;
    while (types.types[i]) {
      var jso = types.types[i];
      this.addItem(new TypeVO(jso.id,jso.type,jso.code,jso.name,jso.desc,jso.objekt,jso.inUse));
      i++;
    }
  },
  loadTypes: function() {
    this.setData(new Array());
    var typesText = sforce.apex.execute('sja.ModelEntityService','getTypes',{});
    var types = Utils.eval(typesText,true);    
    var i = 0;
    while (types.types[i]) {
      var jso = types.types[i];
      this.addItem(new TypeVO(jso.id,jso.type,jso.code,jso.name,jso.description,jso.objekt,jso.in_use));
      i++;
    }
  },  
*/
/*
  loadTypesDemo: function() {
    var types = _types.types;
    if (types.length > 0) {
      for (var i = 0; i < types.length; i++) {
        if (types[i]) {
          var jso = types[i];
          this.addItem(new TypeVO(jso.id,jso.type,jso.code,jso.name,jso.desc,jso.objekt,jso.inUse));
        }
      }
    }
    //Sort ASCENDING
    var data = this.getData();
    if (data && data.length > 0) {
      data.sort(TypeProxy.sortName);
    }
  },
*/
  loadJson: function(obj) {
    var types = obj.types;
    var data = this.getData();
    var i = 0;
    if (types) {
      while (types[i]) {
        var jso = types[i];
        //result.push(new TypeVO(jso.id,jso.type,jso.code,jso.name,jso.desc,jso.objekt,jso.inUse));
        //data.push(new TypeVO(jso.id,jso.type,jso.code,jso.name,jso.desc,jso.objekt,jso.inUse));
        data.push(new TypeVO(jso.id,jso.type,jso.code,jso.name,jso.description,jso.object,jso.in_use));
        i++;
      }
    }
    //Sort ASCENDING
    //result.sort(TypeProxy.sortName);
    //return result;
  },
  getByType: function(type) {
    var result = null;
    try {
      if (type) {
        var items = this.getData();
        if (items) {
          for (var i = 0; i < items.length; i++) {
            if (items[i]) {
              var item = items[i];
              if (item.type == type) {
                result = item;
                break;
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("TypeProxy/getByType Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getByCode: function(code) {
    var result = null;
    try {
      if (code) {
        var items = this.getData();
        if (items) {
          for (var i = 0; i < items.length; i++) {
            if (items[i]) {
              var item = items[i];
              if (item.code == code) {
                result = item;
                break;
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("TypeProxy/getByCode Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  _uniqueTids: function(tids) {
    var result = [];
    try {
      if (tids) {
        for (var i = 0; i < tids.length; i++) {
          var tidExists = false;
          for (var j = 0; j < result.length; j++) {
            if (tids[i] == result[j]) {
              tidExists = true;
              break;
            }
          }
          if (tidExists === false) { result.push(tids[i]); }
        }
      }
    } catch(error) {
      Utils.alert("TypeProxy/_uniqueTids Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }    
});
TypeProxy.ID = "TypeProxy";
TypeProxy.sortName = function(a,b) {
  return (a.name < b.name)?-1:1;  
};

//Class: ModelAttributeVO
var ModelAttributeVO = new Class({
  Extends: AttributeVO,
  initialize: function(id,name,value,txi) {
    try {
      this.parent(id,name,value,txi);
    } catch(error) {
      Utils.alert("ModelAttributeVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: ModelAttributeProxy
var ModelAttributeProxy = new Class({
  Extends: AttributeProxy,
  initialize: function() {
    this.parent(ModelAttributeProxy.ID);
    this.addItem(new ModelAttributeVO("1","name1", "value1"));
  },
  getListObject: function(modelAttributeVO) {
    return new ModelAttribute(modelAttributeVO);
  },
  newBusinessObject: function(item) {
    return new ModelAttribute(item);
  }
});
ModelAttributeProxy.ID = "ModelAttributeProxy";

//Class: ModelEntityVO
var ModelEntityVO = new Class({
  Extends: EntityVO,
  initialize: function(id,ver,name,code,desc,tid,txi,exi,oid,firstAttributes,references) {
    //this.tid = null;
    try {
      this.parent(id,ver,name,desc,txi,exi,oid,firstAttributes,references);
    //if (tid !== undefined)  { this.tid = tid; }
      if (tid !== undefined)  { this.tid = CachingProxy.getSHA2Id(tid); }
      if (code !== undefined) { this.code = code; }
    } catch(error) {
      Utils.alert("ModelEntityVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: ModelEntityProxy
var ModelEntityProxy = new Class({
  Extends: EntityProxy,
  initialize: function() {
    this.parent(ModelEntityProxy.ID);
    this.headerMediator = null;  
    //this.addItem(new ModelEntityVO("1","name1","desc1","tid1","oid1","firstAttributes1","references1"));
    //this.loadEntities();
    this.loadEntitiesDemo();
  },
  newBusinessObject: function(item) {
    return new ModelEntity(item);
  },
  loadEntities: function() {
    var entitiesText = sforce.apex.execute('sja.ModelEntityService','getEntities',{});
    //entitiesText = String(entitiesText).replace("},.*{","},\\n{");
    //Utils.writeFile("c:\\modelEntities.txt",entitiesText);    
    var entities = Utils.eval(entitiesText,true);
    //var entities = Utils.eval(modelEntities,true);
    var i = 0;
    while (entities.entities[i]) {
      var jso = entities.entities[i];
    /*switch (jso.type) {
        case "ACCT": typeType = "Account";
        break;
        case "CASE": typeType = "Case";
        break;
        case "CONT": typeType = "Contact";
        break;
        case "CNTR": typeType = "Contract";
        break;
        case "LEAD": typeType = "Lead";
        break;
        case "OPPO": typeType = "Opportunity";
        break;
        case "SOLU": typeType = "Solution";
        break;
        case "USER": typeType = "User";
        break;
        default:
        break;
      }*/
      this.addItem(new ModelEntityVO(jso.id,jso.ver,jso.name,jso.code,jso.description,jso.tid,jso.txi,jso.exi)); //,jso.oid,jso.firstAttributes,jso.references));
      i++;
    }
    //Sort ASCENDING
    var data = this.getItems();
    data.sort(ModelEntityProxy.sortName);
  },
  loadEntitiesDemo: function() {
    this.setData(new Array());
    var entities = _modelEntities.entities;
    //var entities = null;
    /*var entitiesRequest = new Request({
      url: 'http://localhost/sjamayee/sjamayee_service/model-entities.json',
      headers: {'Access-Control-Allow-Origin': '*'},
      async: false,
      onSuccess: function(text, xml) { entities = text; }
    });
    entitiesRequest.get();*/
    /*var entitiesRequest = new Request.JSON({
      url: 'http://localhost/sjamayee/sjamayee_service/model-entities.json',
      headers: {'Access-Control-Allow-Origin': '*'},
      async: false,
      onSuccess: function(entities){
        alert("ModelEntityProxy/loadEntitiesDemo - entities: "+entities);
      }
    }).get();*/
    
    /*var entitiesRequest = new Request.JSONP({
        url: 'http://localhost/sjamayee/sjamayee_service/model-entities.json?callback=loadJson',
        async: false,
        //callbackKey: 'loadJson',
    }).send();*/
    
    var i = 0;
    while (entities[i]) {
      var jso = entities[i];
      this.addItem(new ModelEntityVO(jso.id,jso.ver,jso.name,jso.code,jso.description,jso.tid,jso.txi,jso.exi)); //,jso.oid,jso.firstAttributes,jso.references));
      i++;
    }
    this.setData(this._uniqueEntities(this.getData()));
    //Sort ASCENDING
    var data = this.getData();
    data.sort(ModelEntityProxy.sortName);
    //alert("ModelEntityProxy/loadEntitiesDemo - entities: "+entities+" i: "+i);
    return i;
  },
  _uniqueEntities: function(entities) {
    var result = [];
    try {
      if (entities) {
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          var entityExists = false;
          for (var j = 0; j < result.length; j++) {
            if (entity.id == result[j].id) {
              entityExists = true;
              break;
            }
          }
          if (entityExists === false) { result.push(entity); }
        }
      }
    } catch(error) {
      Utils.alert("ModelEntityProxy/_uniqueEntities Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },  
  loadJson: function(obj) {
    var entities = obj.entities;
    var i = 0;
    while (entities[i]) {
      var jso = entities[i];
      this.addItem(new ModelEntityVO(jso.id,jso.ver,jso.name,jso.code,jso.description,jso.tid,jso.txi,jso.exi)); //,jso.oid,jso.firstAttributes,jso.references));
      i++;
    }
    //Sort ASCENDING
    var data = this.getData();
    data.sort(ModelEntityProxy.sortName);
    //return i;
  },
  getListObject: function(modelEntityVO) {
    return new ModelEntity(modelEntityVO);
  },
  getHeaderMediator: function() {
    if (this.headerMediator === null) {
      this.headerMediator = SjamayeeFacade.getInstance().retrieveMediator(ModelObjectsHeaderMediator.ID);
    }
    return this.headerMediator;
  },
  getAllByTid: function(tid) {
    var result = [];
    try {
      if (tid) {
        var items = this.getItems();
        if (items) {
          for (var i = 0; i < items.length; i++) {
            if (items[i]) {
              var item = items[i];
              if (item.tid == tid) {
                result.push(item);
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("ModelEntityProxy/getAllByTid Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
ModelEntityProxy.ID = "ModelEntityProxy";
ModelEntityProxy.sortName = function(a,b) {
  return (a.name < b.name)?-1:1;
};

//Class: ModelRelationVO
var ModelRelationVO = new Class({
  Extends: RelationVO,
  initialize: function(id,ver,val,pei,cei,pid,nid,txi,exi,vir,vnv) {
    try {
      this.parent(id,ver,val,pei,cei,pid,nid,txi,exi,vir,vnv);
    } catch(error) {
      Utils.alert("ModelRelationVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: ModelRelationProxy
var ModelRelationProxy = new Class({
  Extends: RelationProxy,
  initialize: function() {
    this.parent(ModelRelationProxy.ID);
    //this.addItem(new ModelRelationVO("1","val1", "pei1", "cei1", "pid1", "nid1"));
    //this.loadRelations();
    this.loadRelationsDemo();
  },
  newBusinessObject: function(item) {
    return new ModelRelation(item);
  },
  loadRelations: function() {
    var relationsText = sforce.apex.execute('sja.ModelRelationService','getRelations',{});
    //relationsText = String(relationsText).replace("},.*{","},\n{");
    //Utils.writeFile("c:\\modelRelations.txt",relationsText);
    var relations = Utils.eval(relationsText,true);    
    //var relations = Utils.eval(modelRelations,true);
    var i = 0;
    while (relations.relations[i]) {
      var jso = relations.relations[i];
      this.addItem(new ModelRelationVO(jso.id,jso.ver,jso.name,jso.pei,jso.cei,jso.pid,jso.nid));
      i++;
    }
  },
  loadRelationsDemo: function() {
    this.setData(new Array());
    var relations = _modelRelations.relations;
    //var relations = null;
    /*var relationsRequest = new Request({
      url: 'http://localhost/sjamayee/sjamayee_service/model-relations.json',
      headers: {'Access-Control-Allow-Origin': '*'},
      async: false,
      onSuccess: function(text, xml) { relations = text; }
    });
    relationsRequest.get();*/
    /*var relationsRequest = new Request.JSON({
      url: 'http://localhost/sjamayee/sjamayee_service/model-relations.json',
      headers: {'Access-Control-Allow-Origin': '*'},
      async: false,
      onSuccess: function(relations){
        alert("ModelRelationProxy/loadRelationsDemo - relations: "+relations);
      }
    }).get();*/
    /*var relationsRequest = new Request.JSONP({
        url: 'http://localhost/sjamayee/sjamayee_service/model-relations.json?callback=loadJson',
        async: false,
        //callbackKey: 'loadJson',
    }).send();*/
/*
    var relationsRequest = new Request({
        url: 'http://localhost/sjamayee/sjamayee_service/model-relations',
        headers: {
          //'Access-Control-Allow-Origin': '*',
          //'Content-Type': 'application/json'
          'Origin': 'www.sjamayee.be'
        },
        async: false //, callbackKey: 'loadJson'
    }).post(); //.send();
*/    
    var i = 0;
    while (relations[i]) {
      var jso = relations[i];
      this.addItem(new ModelRelationVO(jso.id,jso.ver,jso.name,jso.pei,jso.cei,jso.pid,jso.nid));
      i++;
    }
    return i;
    //return this.getData().length;
  },
  loadJson: function(obj) {
    var relations = obj.relations;
    var i = 0;
    while (relations[i]) {
      var jso = relations[i];
      this.addItem(new ModelRelationVO(jso.id,jso.ver,jso.name,jso.pei,jso.cei,jso.pid,jso.nid));
      i++;
    }
  },
  getParentRelations: function(eid,number,sort) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:GridView.DEFAULT_ROWS; //(xxx*SjamayeeFacade.PAGE_MULTIPLIER);
      var _number = (number !== undefined && number !== null)?number:RelationsGridMediator.PAGE_SIZE_MAX; //(xxx*SjamayeeFacade.PAGE_MULTIPLIER);
      var _sort = (sort !== undefined && sort !== null)?sort:Cache.SORT_ASCENDING;
      var relations = new UniqueQueue();
      var cache = this.getItems();
      if (cache) {
        for (var i = 0; i < cache.length; i++) {
          if (_number <= 0) { break; }
          var r = cache[i];
          if (r) {
            if (r.cei) {
              if (r.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == eid.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                var mr1 = new ModelRelation(r);
                var pei = mr1.getPei();
                if (pei === null) {
                  pei = CachingProxy.getNextVirtualId();
                }
                relations.put(pei,mr1);
                _number--;
              }
            }
          }
        }
      }
/*      
      //Call WebService 
      //if (relations.getSize() < _number) {
      if (relations.getSize() == 0) {
        relations.clear();
        var entityRelationsText = sforce.apex.execute('sja.ModelRelationService','getParentRelations',{'entityId':eid,'size':_number});
        var entityRelations = Utils.eval(entityRelationsText,true);       
        var rs = entityRelations.relations;
        var i = 0;
        while (rs[i]) {
          var jso = rs[i];
          var rvo = new ModelRelationVO(jso.id,jso.ver,jso.name,jso.pei,jso.cei,jso.pid,jso.nid);
          //this.addItem(rvo);          
          var mr1 = new ModelRelation(rvo);
          relations.put(mr1.getPei(),mr1);
          i++;
        }       
      }
*/
      result = relations.getAll();
      /*var namesSorted = this.parentNamesSorted(relations.getAll(),_sort);
      if (namesSorted) {
        result = this.sort("PARENT",relations.getAll(),namesSorted);
      }*/
    } catch(error) {
      Utils.alert("ModelRelationProxy/getParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getChildRelations: function(eid,number,sort) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:GridView.DEFAULT_ROWS; //(xxx*SjamayeeFacade.PAGE_MULTIPLIER);
      var _number = (number !== undefined && number !== null)?number:RelationsGridMediator.PAGE_SIZE_MAX; //(xxx*SjamayeeFacade.PAGE_MULTIPLIER);
      var _sort = (sort !== undefined && sort !== null)?sort:Cache.SORT_ASCENDING;
      var relations = new UniqueQueue();
      var cache = this.getItems();
      if (cache) {
        for (var i = 0; i < cache.length; i++) {
          if (_number <= 0) { break; }
          var r = cache[i];
          if (r) {
            if (r.pei) {
              if (r.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == eid.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                var r1 = new ModelRelation(r);
                var cei = r1.getCei();
                if (cei === null) {
                  cei = CachingProxy.getNextVirtualId();
                }
                relations.put(cei,r1);
                _number--;
              }
            }
          }
        }
      }
/*
      //Call WebService 
      //if (relations.getSize() < _number) {
      if (relations.getSize() == 0) {
        relations.clear();
        var entityRelationsText = sforce.apex.execute('sja.ModelRelationService','getChildRelations',{'entityId':eid,'size':_number});
        var entityRelations = Utils.eval(entityRelationsText,true);       
        var rs = entityRelations.relations;
        var i = 0;
        while (rs[i]) {
          var jso = rs[i];
          var rvo = new ModelRelationVO(jso.id,jso.ver,jso.name,jso.pei,jso.cei,jso.pid,jso.nid);
          this.addItem(rvo);          
          var r1 = new ModelRelation(rvo);
          relations.put(r1.getPei(),r1);
          i++;
        }       
      }
*/
      result = relations.getAll();
    /*var namesSorted = this.childNamesSorted(relations.getAll(),_sort);
      if (namesSorted) {
        result = this.sort("CHILD",relations.getAll(),namesSorted);
      }*/
    } catch(error) {
      Utils.alert("ModelRelationProxy/getChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
ModelRelationProxy.ID = "ModelRelationProxy";
/*
//Class: ModelListObjectProxy
var ModelListObjectProxy = new Class({
  Extends: CachingProxy,
  initialize: function() {
    this.parent(ModelListObjectProxy.ID, new Array());
    this.addItem(new ModelListObjectVO("object1"));
  }
});
ModelListObjectProxy.ID = "ModelListObjectProxy";

//Class: ModelListObjectVO
var ModelListObjectVO = new Class({
  Extends: CachedObjectVO,

  this.object = null,

  initialize: function(object) {
    try {
      this.parent(object.getId()); //TODO: garantie object !== null !!!
      if(object !== null)
        this.object = object;
    } catch(error) {
      Utils.alert("ModelListObjectVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});
*/

//////////////////////////////////////////////////////////////////////////
//////////////////////////// BUSINESS CLASSES ////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Class: Type
var Type = new Class({
  Extends: BusinessObject,
  initialize: function(vo) {
    this.parent(vo);
    this.proxy = SjamayeeFacade.getInstance().retrieveProxy(TypeProxy.ID);    
    if (vo) {
      this.setType(vo.type);
      this.setCode(vo.code);
      this.setName(vo.name);
      this.setDesc(vo.desc);
      this.setInUse(vo.inUse);
      this.setSjamayee(vo.sjamayee);
      this.setObjekt(vo.objekt);
      this.setMei(vo.mei);
      this.setFieldNames(null);
    }
  },
//Getters & Setters
  getTypeVO: function() {
    //return new TypeVO(this.getId(),this.getType(),this.getCode(),this.getName(),this.getDesc(),this.getObjekt(),this.inUse(),this.getTxi(),this.isTopSelect());
    return this.vo;
  },
  getType: function() {
    if (this.vo.type === undefined) {
      this.vo.type = '';
    }
    return this.vo.type; //.toUpperCase(); //IF NOT NULL !!!
  },
  setType: function(type) {
    if (type) {
      this.vo.type = type;
    }
  },
  getCode: function() {
    if (this.vo.code === undefined) {
      this.vo.code = null;
    }
    return this.vo.code; //.toUpperCase() // IF NOT NULL !!!
  },
  setCode: function(code) {
    if (code !== undefined) {
      this.vo.code = code;
    }
  },
  getName: function() {
    if (this.vo.name === undefined) {
      this.vo.name = '';
    }
    return this.vo.name;
  },
  getNameTranslated: function() {
    var result = this.getName();
    if (result) {
      result = Utils.translate(result,"es");
    }
    return result;
  },
  setName: function(name) {
    if (name) {
      this.vo.name = name;
    }
  },
  getDesc: function() {
    if (this.vo.desc === undefined) {
      this.vo.desc = '';
    }
    return this.vo.desc;
  },
  getDescTranslated: function() {
    var result = this.getDesc();
    if (result) {
      result = Utils.translate(result,"es");
    }
    return result;
  },
  setDesc: function(desc) {
    if (desc) {
      this.vo.desc = desc;
    }
  },  
  inUse: function() {
    if (this._inUse === undefined) {
      this._inUse === false;
    }
    return this._inUse;
  },
  setInUse: function(inUse) {
    if (inUse !== undefined) {
      this._inUse = (inUse === true)?true:false;
    }
  },
  isBaseType: function() {
    if (this.baseType === undefined) {
      this.baseType = false;
      var modelEntityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);      
      var modelEntities = modelEntityProxy.getAllByTid(this.getId());
      this.baseType = (modelEntities && modelEntities.length > 1)?true:false;
    }
    return this.baseType;
  },
  isSingleType: function() {
    if (this.singleType === undefined) {
      this.singleType = true;
      var modelEntityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);      
      var modelEntities = modelEntityProxy.getAllByTid(this.getId());
      var modelEntity = this.getModelEntity();
      //this.singleType = (modelEntity && modelEntity.getCode() === null && modelEntities && modelEntities.length > 1)?false:true;
      this.singleType = (modelEntity && modelEntity.getSuperClass() === null && modelEntities && modelEntities.length > 1)?false:true;
    }
    return this.singleType;
  },
  isSjamayee: function() {
    if (this.vo.sjamayee === undefined) {
      this.vo.sjamayee = false;
    }
    return this.vo.sjamayee;
  },
  setSjamayee: function(sjamayee) {
    if (sjamayee !== undefined) {
      this.vo.sjamayee = sjamayee;
    }
  },
  getObjekt: function() {
    if (this.vo.objekt === undefined) {
      this.vo.objekt = '';
    }
    return this.vo.objekt;
  },
  setObjekt: function(objekt) {
    if (objekt) {
      this.vo.objekt = objekt;
    }
  },
  getMei: function() {
    if (this.vo.mei === undefined) {
      this.vo.mei = null;
    }
    return this.vo.mei;
  },
  setMei: function(mei) {
    if (mei !== undefined) {
      this.vo.mei = mei;
      if (this.vo.mei) {
        this.vo.mei = CachingProxy.getSHA2Id(this.vo.mei);
      }     
    }
  },
  getModelEntity: function() {
    if (this.modelEntity === undefined) {
      this.modelEntity = ModelEntity.getById(this.getMei());
    }
    return this.modelEntity;
  },
  setModelEntity: function(entity) {
    if (entity) {
      this.modelEntity = entity;
      this.setMei(entity.getId());
    }
  },
  getFieldNames: function() {
    try {
      if (this.vo.fieldNames === undefined || this.vo.fieldNames === null) {
        //AsyncQueue.connect(); // impliciet by creation of _aq
        var fieldNamesJson = sforce.apex.execute('sja.TypeService','getSfdcFieldNames',{type:this.getName()});
        //var fieldNames = JSON.parse(fieldNamesJson);
        //var fieldNames = eval('(' + fieldNamesJson + ')');  
        var fieldNames = Utils.eval(fieldNamesJson,true); 
        /*i = 0;
        while (fieldNamesText[i]) {
        var fieldName = fieldNamesText[i];
        fieldNames.push(fieldName);
        i++;
        }*/
        this.setFieldNames(fieldNames); //.sort());
        /*var type = this.getTypeExpanded();
        if (type) {
          this.setFieldNames(type.getFieldNames());
        }*/
      }
    } catch(error) {
      Utils.alert("Type/getFieldNames Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this.vo.fieldNames;
    }
  },
  setFieldNames: function(fieldNames) {
    if (fieldNames) {
      this.vo.fieldNames = fieldNames;
    }
  },
  print: function(html,keysOnly) {
    var _html = (html !== undefined && html !== null)?html:false;
    var _keysOnly = (keysOnly !== undefined && keysOnly !== null)?keysOnly:false;
    var _nl = (_html)?'<br/>':'\n';
    var result = '\nType:'+_nl;
    try {
      result += this.parent();
    } catch(error) {
      Utils.alert("Type/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
//Statics
Type.SELECT_ID = "selectionTypePanel";
Type.SELECTION_ID = "TYPE_SELECTION_ID";
Type.ALL_TYPES = "---- ALL TYPES ----";
Type.DOC = "DOC";
Type.DOC_NAME = "DOCUMENT";
Type.DOC_DESC = "Word Document";
Type.MAP = "MAP";
Type.MAP_NAME = "MAP/FOLDER";
Type.MAP_DESC = "Map/Folder";
Type.NOTE = "NOTE";
Type.NOTE_NAME = "NOTE";
Type.NOTE_DESC = "Note";
Type.PDF = "PDF";
Type.PDF_NAME = "PDF";
Type.PDF_DESC = "Portable Document Format";
Type.HTML = "HTML";
Type.HTML_NAME = "HTML";
Type.HTML_DESC = "Html Web Page";
Type.ACCT = "Account"; //"ACCT";
Type.ASET = "Asset"; //"ASET";
Type.LEAD = "Lead"; //"LEAD";
Type.CAMP = "Campaign"; //"CAMP";
Type.CASE = "Case"; //"CASE";
Type.CONT = "Contact"; //"CONT";
Type.CNTR = "Contract"; //"CNTR";
Type.OPPO = "Opportunity"; //"OPPO";
Type.SOLU = "Solution"; //"SOLU";
Type.USER = "User"; //"USER";
Type.getById = function(id) {
  var _id = (id !== undefined)?id:null;
  var result = null;
  try {
    if (_id) {
      var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(TypeProxy.ID);
      var t1 = typeProxy.getById(_id);
      if (t1) { result = new Type(t1); }
    }
  } catch(error) {
    Utils.alert("Type/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
Type.getByName = function(name) {
  var _name = (name !== undefined && name != Type.ALL_TYPES)?name:null;
  var result = null;
  try {
    if (_name) {
      var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(TypeProxy.ID);
      var t1 = typeProxy.getByName(_name);
      if (t1) { result = new Type(t1); }
    }
  } catch(error) {
    Utils.alert("Type/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
Type.getByType = function(type) {
  var _type = (type !== undefined)?type:null;
  var result = null;
  try {
    if (_type) {
      var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(TypeProxy.ID);
      var t1 = typeProxy.getByType(_type);
      if (t1) { result = new Type(t1); }
    }
  } catch(error) {
    Utils.alert("Type/getByType Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
Type.getByCode = function(code) {
  var _code = (code !== undefined)?code:null;
  var result = null;
  try {
    if (_code) {
      var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(TypeProxy.ID);
      var t1 = typeProxy.getByCode(_code);
      if (t1) { result = new Type(t1); }
    }
  } catch(error) {
    Utils.alert("Type/getByCode Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
Type.getTypes = function() {
  var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(TypeProxy.ID);
  return typeProxy.getTypes();
};
Type.getTypeOptions = function(type_code_name) {
  var _type_code_name = type_code_name?type_code_name:'';   
  var result = '<option>'+Type.ALL_TYPES+'</option>';
  var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(TypeProxy.ID);
  var types = typeProxy.getListTypes();
  var typeSelected = _type_code_name;
  var typeSelectPrefixed = false;
  //First pass-through for determining typeSelectPrefix!
  for (var i = 0; i < types.length; i++) {
    var t1 = types[i];
    if (t1) {
      var type = new Type(t1);
      if (type) {
        //if (type.inUse() === false) { continue; }
        if (type.isBaseType()) {
          typeSelectPrefixed = true;
          break;
        }
      }
    }
  }
  //Second pass-through for building the type options!
  for (var i = 0; i < types.length; i++) {
    var t1 = types[i];
    if (t1) {
      var type = new Type(t1);
      //if (type.inUse() === false) { continue; }
      var optionTag = '<option';
      //optionTag += (typeSelected == type.getName())?' selected="selected"':'';
      optionTag += (typeSelected == type.getCode())?' selected="selected"':'';
      optionTag += '>';
      var baseTypeFlag = '';
      if (typeSelectPrefixed === true) {
        for (var j = 0; j < RelationsHeader.TYPE_SELECT_PREFIX_LENGTH; j++) {
          baseTypeFlag += '&nbsp;';
        }
      }
      if (type.isBaseType()) {
        baseTypeFlag = RelationsHeader.TYPE_SELECT_PREFIX;
      }
      //result += optionTag+type.getName()+'</option>';
      result += optionTag+baseTypeFlag+type.getCode()+'</option>';
    }
  }
  var relationsHeaderMediator = SjamayeeFacade.getInstance().retrieveMediator(ModelRelationsHeaderMediator.ID);
  if (relationsHeaderMediator) {
    relationsHeaderMediator.getViewComponent().setTypeSelectPrefixed(typeSelectPrefixed);
  }
  return result;
};
Type.getSjamayeeOptions = function(sort) {
  var result = "";
  try {
    var _sort = (sort !== undefined && sort !== null)?sort:Cache.SORT_ASCENDING;    
    var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(TypeProxy.ID);
    var types = typeProxy.getData(); //_sort !!!
    for (var i = 0; i < types.length; i++) {
      var type = types[i];
      if (type.isSjamayee() === false) { continue; }
      if (type) {
        var option = '<option';
        option += (type.inUse === false)?' disabled="disabled"':'';
        option += (type.type == Type.MAP)?' selected="selected"':'';
        option += '>';
        option += type.name; //getType();
        option += '</option>';
        result += option;
      }
    }
  } catch(error) {
    Utils.alert("Type/getSjamayeeOptions Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};

//Class: ModelAttribute
var ModelAttribute = new Class({
  Extends: AttributeB,
  initialize: function(vo) {
    try {
      if (vo === undefined) { vo = new ModelAttributeVO(); }
      this.parent(vo);
      this.proxy = SjamayeeFacade.getInstance().retrieveProxy(ModelAttributeProxy.ID);
    } catch(error) {
      Utils.alert("ModelAttribute/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  getAttributeVO: function() {
    //return new ModelAttributeVO(this.getId(),this.getName(),this.getValue());
    return this.vo;
  },  
  //Functions
  clone: function() {
    var result = null;
    try {
      result = new ModelAttribute(this.getAttributeVO());
      if (result) {
        var properties = Utils.eval(this,false); //true);
        if (properties) {
           for (var key = 0; key < properties.length; key++) {
             result[key] = properties[key];
          }
        }
      }
    } catch(error) {
      Utils.alert("ModelAttribute/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }, 
  print: function() {
    var result = null;
    try {
      result = "\nModelAttribute:"; // - sid: "+this.getSid()+"\n";
      result += "\nid="+this.getId()+"\nname="+this.getName()+"\nvalue="+this.getValue();
    } catch(error) {
      Utils.alert("ModelAttribute/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});

//Class: ModelEntity
var ModelEntity = new Class({
  Extends: EntityB,
  initialize: function(vo) {
    try {
      if (vo === undefined) { vo = new ModelEntityVO(); }
      this.parent(vo);
      this.proxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);     
      if (vo) {
        this.setTid(vo.tid);
        this.setCode(vo.code);
      }
    } catch(error) {
      Utils.alert("ModelEntity/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  getEntityVO: function() {
    //return new ModelEntityVO(this.getId(),this.getVersion(),this.getName(),this.getCode(),this.getDesc(),this.getTid(),this.getTxi(),this.getExi(),this.getOid(),this.getFirstAttributes(),this.getReferences());
    return this.vo;
  },
  getMei: function() {
    return this.getId();
  },
  getModelEntity: function() {
    return this;
  },
  isBaseModelEntity: function() {
    if (this._isBaseModelEntity === undefined) {
      this._isBaseModelEntity = (this.getBaseModelEntity().getId() == this.getId());
    }
    return this._isBaseModelEntity;
  },  
  getBaseModelEntity: function() {
    if (this.baseModelEntity === undefined) {
      this.baseModelEntity = null;
      var entities = ModelEntity.getAllByTid(this.getTid());
      for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        /*if (entity && entity.code === null) {
          this.baseModelEntity = new ModelEntity(entity);
          break;
        }*/
        if (entity && (entity.exi === undefined || entity.exi === null)) {
          this.baseModelEntity = new ModelEntity(entity);
          break;
        }
      }
    }
    return this.baseModelEntity;
  },
  isBaseModelForMultiType: function() {
    if (this.baseModelForMultiType === undefined) {
      this.baseModelForMultiType = false;
      var baseModelEntity = this.getBaseModelEntity();
      if (baseModelEntity) {
        if (this.getId() == baseModelEntity.getId()) {
          var entities = ModelEntity.getAllByTid(this.getTid());
          for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            if (entity) {
              if (entity.id.substr(0,BusinessObject.ID_MIN_LENGTH) == this.getId()) { continue; }
              this.baseModelForMultiType = true;
              break;
            }
          }
        }
      }
    }
    return this.baseModelForMultiType;
  },
  isInstantModelEntity: function() {
    return this.hasRelations();
    /*if (this.instantModelEntity === undefined) {
      this.instantModelEntity = this.getCode()?true:false;
    }
    return this.instantModelEntity;*/
  },
  isA: function(mei,x) {
    var result = false;
    if (mei) {
      result = (this.getId() == mei.substr(0,BusinessObject.ID_MIN_LENGTH))?true:false;
      if (result === false) {
        if (x === undefined) { x = []; }
        x.push(this.getId());
        var modelEntity = this;
        while (modelEntity.getExi()) {
          modelEntity = ModelEntity.getById(modelEntity.getExi());
          result = (modelEntity.getId() == mei.substr(0,BusinessObject.ID_MIN_LENGTH))?true:false;
          if (result === true) { break; }
          if (Utils.exists(x,modelEntity.getExi(),true) === true) {
            alert("ModelEntity/isA\nError: Recursive definition.\nid: "+modelEntity.getId()+" name: "+modelEntity.getName());
            return result;
          }
        }
      }
    }
    return result;
  },  
  hasSuperClass: function() {
    return (this.getSuperClass())?true:false;
  },
  getSuperClass: function() {
    if (this.superClass === undefined) {
      this.superClass = ModelEntity.getById(this.getExi());
    }
    return this.superClass;
  },
/************************************************************/
/*isA > isSuperClass

  isSubClass(mei)
  - this.getExi() == mei > true
  - x += this.getId()/?OR?/this.Exi()
  - read next where exi = this.getId() and not in x !!!
  - e.getExi() == mei > true
  
  *** NOK *** 
  
  c.isA(a) // a.isA(c) >> c.isA(a) !!!  
*/
/************************************************************/
  hasSubClasses: function() {
    //return (this.getSubClass())?true:false;
    return (this.getSubClasses() && this.getSubClasses().length > 0)?true:false;
  },
  getSubClasses: function() {
    if (this.subClasses === undefined) {
      this.subClasses = [];
      var entities = ModelEntity.getAllByTid(this.getTid());
      if (entities && entities.length > 0) {
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          if (entity) {
            if (entity.exi && entity.exi.substr(0,BusinessObject.ID_MIN_LENGTH) == this.getId()) {
              this.subClasses.push(new ModelEntity(entity));
            }
          }
        }
      }
    }
    return this.subClasses;
  },
  getTid: function() {
    if (this.vo.tid === undefined) {
      this.vo.tid = null;
    }
    return (this.vo.tid)?this.vo.tid.substr(0,BusinessObject.ID_MIN_LENGTH):this.vo.tid;
  },
  setTid: function(tid) {
    if (tid !== undefined) {
      this.vo.tid = tid;
    }
  },
  getModelType: function() {
    return this.getType();
  },
  getType: function() {
    if (this.type === undefined) {
      this.type = Type.getById(this.getTid());
    }
    return this.type;
  },
  setType: function(type) {
    if (type) {
      this.type = type;
      this.setTid(type.getId());
    }
  },
  getCode: function() {
    if (this.vo.code === undefined) {
      this.vo.code = null;
    }
    return this.vo.code;
  },
  setCode: function(code) {
    if (code !== undefined) {
      this.vo.code = code;
    }
  },
  isSingleType: function() {
    if (this.singleType === undefined) {
      this.singleType = true;
      var modelEntities = this.proxy.getAllByTid(this.getTid());
      //this.singleType = (this.getCode() === null && modelEntities && modelEntities.length > 1)?false:true;
      this.singleType = (this.getSuperClass() === null && modelEntities && modelEntities.length > 1)?false:true;
    }
    return this.singleType;
  },    
  //Functions
  hasRelations: function() {
  /*var relation = ModelRelation.getFirstChildForEntity(this);
    if (!relation) {
      relation = ModelRelation.getFirstParentForEntity(this);
    }*/
    //var relation = ModelRelation.getFirstRelationForEntity(this);
    //return (relation)?true:false; 
    if (this._hasRelations === undefined) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
      modelRelationVO = relationProxy.getFirstRelationForEntity(this.getEntityVO());
      this._hasRelations = (modelRelationVO)?true:false;
    }
    return this._hasRelations;
  },
  clone: function() {
    var result = null;
    try {
      result = new ModelEntity(this.getEntityVO());
      if (result) {
        var properties = Utils.eval(this,false); //true);
        if (properties) {
           for (var key = 0; key < properties.length; key++) {
             result[key] = properties[key];
          }
        }
      }
    } catch(error) {
      Utils.alert("ModelEntity/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  print: function() {
    var result = null;
    try {
      //var attributeList = this.getAttributeList();
      result = "\nModelEntity:"; // - sid: "+this.getSid()+"\n";
      result += "\nid="+this.getId()+"\nname="+this.getName()+"\ndesc="+this.getDesc()+"\ntid="+this.getTid();
    /*var t1 = this.getType();
      if (t1) {
        result += "\nsjamayee: "+t1.isSjamayee();
      }
      result += "\nexpanded: "+this.isExpanded();
      result += "\nscrollable: "+this.isScrollable();
      result += "\nreferences: "+this.getReferences();
      result += "\nreads: "+this.getReads();
      result += "\nattributes:\n";*/
    } catch(error) {
      Utils.alert("ModelEntity/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
//TODO: NOK !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!);
ModelEntity.getById = function(id) {
  var _id = (id !== undefined)?id:null;
  var result = null;
  try {
    if (_id) {
      var entityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);
      var e1 = entityProxy.getById(_id);
      if (e1) { result = new ModelEntity(e1); }
    }
  } catch(error) {
    Utils.alert("ModelEntity/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
ModelEntity.getByName = function(name) {
  var _name = (name !== undefined)?name:null;
  var result = null;
  try {
    if (_name) {
      var entityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);
      var e1 = entityProxy.getByName(_name);
      if (e1) { result = new ModelEntity(e1); }
    }
  } catch(error) {
    Utils.alert("ModelEntity/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
ModelEntity.getAllByTid = function(tid) {
  var _tid = (tid !== undefined)?tid:null;
  var result = [];
  try {
    if (_tid) {
      var entityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);
      result = entityProxy.getAllByTid(_tid);
    }
  } catch(error) {
    Utils.alert("ModelEntity/getAllByTid Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
ModelEntity.getEntities = function() {
  var entityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);
  return entityProxy.getItems();
};
ModelEntity.getEntityOptions = function(type_code_name,currentEntityName,filterValue,filterCase) {
  var _type_code_name = (type_code_name !== undefined && type_code_name != Type.ALL_TYPES)?type_code_name:null;
  var _filterValue = filterValue?filterValue:"";
  var _filterCase = (filterCase !== undefined && filterCase !== null)?filterCase:false;
  var result = '';
  try {
    var entities = ModelEntity.getEntities(); 
    var selectedTypeId = null;
    if (_type_code_name) {
      var type = Type.getByCode(_type_code_name);
      if (type) {
        selectedTypeId = type.getId();
      }
    }
    var allTypes = Type.getTypes();
    var selectedType = Type.ALL_TYPES;
    if (selectedTypeId) {
      selectedType = selectedTypeId;
    }
    var nbrOfOptions = 0;
    var re_modifiers = SjamayeeFacade.ENTITY_FILTER_MODIFIERS;
    if (_filterCase === true) {
      re_modifiers = SjamayeeFacade.ENTITY_FILTER_MODIFIERS_CASE;
    }
    var filterExpression = new RegExp(_filterValue,re_modifiers);
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      if (entity) {
        if (filterValue) {
          if ((entity.name.match(filterExpression) === null) &&
              (entity.desc.match(filterExpression) === null)) {              
            continue;
          }
        }  
        if (selectedType != Type.ALL_TYPES) {
          if (entity.tid.substr(0,BusinessObject.ID_MIN_LENGTH) != selectedType.substr(0,BusinessObject.ID_MIN_LENGTH)) { continue; }
        } else {
          //Select on all Types used!
          for (var j = 0; j < allTypes.length; j++) {
            var type = allTypes[j];
            if (entity.tid.substr(0,BusinessObject.ID_MIN_LENGTH) == type.id.substr(0,BusinessObject.ID_MIN_LENGTH)) { break; }
          }
        }
        //Used - has Relations?
        //if (modelEntity.hasRelations() !== true) { continue; }
        var entityName = entity.name.substr(0,50);
        var selected = (currentEntityName && entityName == currentEntityName)?true:false;
        var optionTag = '<option';
        optionTag += (selected)?' selected="selected"':'';
        optionTag += '>';
        result += optionTag+entityName+'</option>';
        nbrOfOptions++;
      }
    }
    if (nbrOfOptions === 0) {
      //NO ENTITIES FOUND!
      result = '<option>'+EntityB.NO_OBJECTS+'</option>';
      if (filterValue) {
        SjamayeeFacade.getInstance().sendNotification(SjamayeeFacade.GRID_MODEL_NO_OBJECTS_FOUND);
      }
    }
  } catch(error) {
    Utils.alert("ModelEntity/getEntityOptions Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};

//Class: ModelRelation
var ModelRelation = new Class({
  Extends: RelationB,
  initialize: function(vo) {
    try {
      if (vo === undefined) { vo = new ModelRelationVO(); }
      this.parent(vo);
      this.proxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
    } catch(error) {
      Utils.alert("ModelRelation/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  getRelationVO: function() {
    //return new ModelRelationVO(this.getId(),this.getVersion(),this.getVal(),this.getPei(),this.getCei(),this.getPid(),this.getNid(),this.getTxi(),this.getExi(),this.isVirtual(),this.getVirtualNivo());
    return this.vo;
  },
  getMri: function() {
    return this.getId();
  },  
  getModelRelation: function() {
    return this;
  },
  isBaseModelForMultiType: function(parentOrChild) {
    var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;
    result = false;
    var modelEntity = null;
    var baseModelEntity = null;
    if (_parentOrChild === null || _parentOrChild == RelationB.CHILD) {
      var modelEntity = this.getChildEntity();
      if (modelEntity) {
        result = modelEntity.isBaseModelForMultiType();
      }
    }
    if (baseModelEntity === null) {
      if (_parentOrChild === null || _parentOrChild == RelationB.PARENT) {
        var modelEntity = this.getParentEntity();
        if (modelEntity) {
          result = modelEntity.isBaseModelForMultiType();
        }
      }
    }
    return result;
  },
  isParentA: function(mei) {
    var result = false;
    if (mei) {
      if (this.getParentEntity()) {
        result = ModelEntity.getById(mei).isA(this.getParentEntity().getId()); //FOR TEST !!!
        result = this.getParentEntity().isA(mei);
      }
    }
    return result;
  },
  isChildA: function(mei) {
    var result = false;
    if (mei) {
      if (this.getChildEntity()) {
        result = ModelEntity.getById(mei).isA(this.getChildEntity().getId()); //FOR TEST !!!
        result = this.getChildEntity().isA(mei);
      }
    }
    return result;
  },
//Functions
  clone: function() {
    var result = null;
    try {
      result = new ModelRelation(this.getRelationVO());
      if (result) {
        var properties = Utils.eval(this,false); //true);
        if (properties) {
           for (var key = 0; key < properties.length; key++) {
             result[key] = properties[key];
          }
        }
      }
    } catch(error) {
      Utils.alert("ModelRelation/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getPrevious: function() {
    return this.getPreviousRelation();
  },
  getNext: function() {
    return this.getNextRelation();
  },
  getParentEntity: function() {
    if (this.parentEntity === undefined) {
      this.parentEntity = ModelEntity.getById(this.getPei());
    }
    return this.parentEntity;
  },
  getChildEntity: function() {
    if (this.childEntity === undefined) {
      this.childEntity = ModelEntity.getById(this.getCei());
    }
    return this.childEntity;
  },
  getPreviousRelation: function() {
    if (this.previousRelation === undefined) {
      this.previousRelation = ModelRelation.getById(this.getPid());
    }
    return this.previousRelation;
  },
  getNextRelation: function() {
    if (this.nextRelation === undefined) {
      this.nextRelation = ModelRelation.getById(this.getNid());
    }
    return this.nextRelation;
  },
  print: function(html,keysOnly) {
    var _html = (html !== undefined && html !== null)?html:false;
    var _keysOnly = (keysOnly !== undefined && keysOnly !== null)?keysOnly:false;
    var _nl = (_html)?'<br/>':'\n';
    var result = '\nModelRelation:'+_nl;
    try {
      result += this.parent();
    } catch(error) {
      Utils.alert("ModelRelation/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },    
  getFirstParentRelation: function() {
    var result = null;
    try {
      if (this.hasParent() === true) {
        var modelEntity = this.getParentEntity();
        result = RelationB.getFirstParentForEntity(modelEntity.getEntityVO());
      }
    } catch(error) {
      Utils.alert("ModelRelation/getFirstParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getLastParentRelation: function() {
    var result = null;
    try {
      if (this.hasParent() === true) {
        var modelEntity = this.getParentEntity();
        result = ModelRelation.getLastParentForEntity(modelEntity.getEntityVO());
      }
    } catch(error) {
      Utils.alert("ModelRelation/getLastParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getParentRelations: function(number,sort) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
      var _number = (number !== undefined && number !== null)?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
      var _sort = (sort !== undefined && sort !== null)?sort:Cache.SORT_ASCENDING;
      //result = this.proxy.getParentRelations(this,_number,_sort);       
      if (this.hasParent() === true) {
        var entityRelationsText = sforce.apex.execute('sja.ModelRelationService','getParentRelations',{'entityId':this.getPei(),'size':25});
        var entityRelations = Utils.eval(entityRelationsText,true);       
        var relations = entityRelations.relations;
        var i = 0;
        while (relations[i]) {
          var jso = relations[i];
          result.push(new ModelRelation(new ModelRelationVO(jso.id,jso.ver,jso.name,jso.pei,jso.cei,jso.pid,jso.nid,jso.txi,jso.exi)));
          i++;
        }
      }     
    } catch(error) {
      Utils.alert("ModelRelation/getParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getPreviousParentRelation: function() {
    var result = null;
    try {
      result = null;
      result = this.proxy.getPreviousParentRelation(this);
    } catch(error) {
      Utils.alert("ModelRelation/getPreviousParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getPreviousParentRelations: function(number) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
      var _number = (number !== undefined && number !== null)?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
      result = this.proxy.getPreviousParentRelations(this,_number);
    } catch(error) {
      Utils.alert("ModelRelation/getPreviousParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getNextParentRelation: function() {
    var result = null;
    try {
      result = null;
      //result = this.proxy.getNextParentRelation(this);
    } catch(error) {
      Utils.alert("ModelRelation/getNextParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getNextParentRelations: function(number) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
      var _number = (number !== undefined && number !== null)?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
      //result = this.proxy.getNextParentRelations(this,_number);
    } catch(error) {
      Utils.alert("ModelRelation/getNextParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getFirstChildRelation: function() {
    var result = null;
    try {
      result = null;
    /*if (this.hasChild() === true) {
        result = this.proxy.getFirstChildRelation(this);
      }*/
    } catch(error) {
      Utils.alert("ModelRelation/getFirstChildRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getLastChildRelation: function() {
    var result = null;
    try {
      result = null;
    /*if (this.hasChild() === true) {
        result = this.proxy.getLastChildRelation(this);
      }*/
    } catch(error) {
      Utils.alert("ModelRelation/getLastChildRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getChildRelations: function(number,sort) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
      var _number = (number !== undefined && number !== null)?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);      
      var _sort = (sort !== undefined && sort !== null)?sort:Cache.SORT_ASCENDING;
      //result = this.proxy.getChildRelations(this,_number,_sort);
      var entityRelationsText = sforce.apex.execute('sja.ModelRelationService','getChildRelations',{'entityId':this.getCei(),'size':25});
      var entityRelations = Utils.eval(entityRelationsText,true);       
      var relations = entityRelations.relations;
      var i = 0;
      while (relations[i]) {
        var jso = relations[i];
        result.push(new ModelRelation(new ModelRelationVO(jso.id,jso.ver,jso.name,jso.pei,jso.cei,jso.pid,jso.nid,jso.txi,jso.exi)));
        i++;
      }     
    } catch(error) {
      Utils.alert("ModelRelation/getChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getPreviousChildRelations: function(number) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
      var _number = (number !== undefined && number !== null)?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
      var relation = this;
    /*while (relation) {
        if (_number <= 0) { break; }
        if (relation.getPid() === null) { break; }
        var previousRelation = relation.getPreviousRelation();
        if (!previousRelation) { break; }
        result.splice(0,0,previousRelation);
        relation = previousRelation;
        _number--;
      }*/
    } catch(error) {
      Utils.alert("ModelRelation/getPreviousChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getNextChildRelations: function(number) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
      var _number = (number !== undefined && number !== null)?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
      var relation = this;
    /*while (relation) {
        if (_number <= 0) { break; }
        if (relation.getNid() === null) { break; }
        var nextRelation = relation.getNextRelation();
        if (nextRelation === null) { break; }
        result.push(nextRelation);
        relation = nextRelation;
        _number--;
      }*/
    } catch(error) {
      Utils.alert("ModelRelation/getNextChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getRelationsTopAndBottom: function() {
    var result = [];
    try {
      result = null;
      result = this.proxy.getRelationsTopAndBottom(this);
    } catch(error) {
      Utils.alert("ModelRelation/getRelationsTopAndBottom Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
ModelRelation.getById = function(id) {
  var _id = (id !== undefined)?id:null;
  var result = null;
  try {
    if (_id) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
      var r1 = relationProxy.getById(_id);
      if (r1) { result = new ModelRelation(r1); }
    }
  } catch(error) {
    Utils.alert("ModelRelation/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
ModelRelation.getRelations = function() {
  var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
  return relationProxy.getItems();
};
ModelRelation.clearVirtualRelations = function() {
  var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
  return relationProxy.clearVirtualItems();
};
ModelRelation.addVirtualRelation = function(relation) {
  var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
  relation.setVirtual(true);
  relationProxy.addVirtualRelation(relation);
};
ModelRelation.removeVirtualRelation = function(relation) {
  var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
  if (relation.isVirtual()) {
    relationProxy.removeVirtualRelation(relation);
  }
};
ModelRelation.getRelationsForEntity = function(entity,parentOrChild) {
  var _entity = (entity !== undefined)?entity:null;
  var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;
  var result = [];
  try {
    if (_entity) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
      var relations = relationProxy.getRelationsForEntity(_entity,_parentOrChild);
      if (relations && relations.length > 0) {
        for (var i = 0; i < relations.length; i++) {
          var modelRelationVO = relations[i];
          if (modelRelationVO) {
            result.push(new ModelRelation(modelRelationVO));
          }
        }
      }
    }
  } catch(error) {
    Utils.alert("ModelRelation/getRelationsForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
//TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
ModelRelation.getFirstRelationForEntity = function(entity,parentOrChild) {
  var _entity = (entity !== undefined)?entity:null;
  var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;  
  var result = null;
  try {
    if (_entity) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
      var modelRelationVO = relationProxy.getFirstRelationForEntity(_entity,_parentOrChild);
      if (modelRelationVO) {
        var modelRelation = new ModelRelation(modelRelationVO);
        if (modelRelation) {
          var modelEntity = new ModelEntity(_entity);
          if (modelEntity) {
            if (_parentOrChild === null || _parentOrChild == RelationB.CHILD) {
              if (modelRelation.getCei() == modelEntity.getId()) {
                result = modelRelation;
              }
            }
            if (result === null) {            
              if (_parentOrChild === null || _parentOrChild == RelationB.PARENT) {
                if (modelRelation.getPei() == modelEntity.getId()) {
                  result = modelRelation;
                }
              }
            }
          }
        }
      }
    }
  } catch(error) {
    Utils.alert("ModelRelation/getFirstRelationForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
/*
ModelRelation.getFirstParentForEntity = function(entity) {
  var _entity = (entity !== undefined)?entity:null;
  var result = null;
  try {
    if (_entity) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
      var modelRelationVO = relationProxy.getFirstParentForEntity(_entity);
      if (modelRelationVO) {
        result = new ModelRelation(modelRelationVO);
      }     
    }
  } catch(error) {
    Utils.alert("ModelRelation/getFirstParentForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
*/
ModelRelation.getLastParentForEntity = function(entity) {
  var _entity = (entity !== undefined)?entity:null;
  var result = null;
  try {
    if (_entity) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
      result = relationProxy.getLastParentForEntity(_entity);
    }
  } catch(error) {
    Utils.alert("ModelRelation/getLastParentForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
/*
ModelRelation.getFirstChildForEntity = function(entity) {
  var _entity = (entity !== undefined)?entity:null;
  var result = null;
  try {
    if (_entity) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
      modelRelationVO = relationProxy.getFirstChildForEntity(_entity);
      if (modelRelationVO) {
        result = new ModelRelation(modelRelationVO);
      }     
    }
  } catch(error) {
    Utils.alert("ModelRelation/getFirstChildForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
*/
ModelRelation.getParentRelationsForEntity = function(entity,number,sort) {
  var _entity = (entity !== undefined)?entity:null;
  //var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
  var _number = (number !== undefined && number !== null)?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
  var _sort = (sort !== undefined && sort !== null)?sort:Cache.SORT_ASCENDING;
  var result = [];
  try {
    if (_entity) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
      //result = relationProxy.getParentRelationsForEntity(_entity,_number,_sort);
      result = relationProxy.getParentRelations(_entity.getId(),_number,_sort);
    }
  } catch(error) {
    Utils.alert("ModelRelation/getParentRelationsForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};

//////////////////////////////////////////////////////////////////////////
///////////////////////////// UICOMPONENTS ///////////////////////////////
//////////////////////////////////////////////////////////////////////////
/////////////////////////////// HEADERS //////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Class: ModelObjectsHeader
var ModelObjectsHeader = new Class({
  Extends: ObjectsHeader,
  initialize: function() {
    this.parent(ModelObjectsHeader.ID);
  }
});
ModelObjectsHeader.ID = "modelObjectsHeader";

//Class: ModelObjectsTextsHeader
var ModelObjectsTextsHeader = new Class({
  Extends: ObjectsTextsHeader,
  initialize: function() {
    this.parent(ModelObjectsTextsHeader.ID);
  }
});
ModelObjectsTextsHeader.ID = "modelObjectsTextsHeader";

//Class: ModelRelationsHeader
var ModelRelationsHeader = new Class({
  Extends: RelationsHeader,
  initialize: function() {
    this.parent(ModelRelationsHeader.ID,{tlbl:ModelRelationsHeader.TYPE_SELECT_LABEL,elbl:ModelRelationsHeader.ENTITY_SELECT_LABEL});
  },
  getEntitySelectValue: function() {
    var result = null;
    if (this.entitySelect) {
      result = this.entitySelect.value;
    }
    return result;
  }
});
ModelRelationsHeader.ID = "modelRelationsHeader";
ModelRelationsHeader.TYPE_SELECT_LABEL = "&nbsp;Type&nbsp;";
ModelRelationsHeader.ENTITY_SELECT_LABEL = "Class&nbsp;";

//Class: ModelRelationsTextsHeader
var ModelRelationsTextsHeader = new Class({
  Extends: RelationsTextsHeader,
  initialize: function() {
    this.parent(ModelRelationsTextsHeader.ID);
  }
});
ModelRelationsTextsHeader.ID = "modelRelationsTextsHeader";

//////////////////////////////////////////////////////////////////////////
/////////////////////////////// TOOLBARS /////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Class: ModelObjectsToolBar
var ModelObjectsToolBar = new Class({
  Extends: ObjectsToolBar,
  initialize: function() {
    this.parent(ModelObjectsToolBar.ID);
  }
});
ModelObjectsToolBar.ID = "modelObjectsToolBar";

//Class: ModelRelationsToolBar
var ModelRelationsToolBar = new Class({
  Extends: RelationsToolBar,
  initialize: function() {
    this.parent(ModelRelationsToolBar.ID);
  }
});
ModelRelationsToolBar.ID = "modelRelationsToolBar";

//Abstract
//Class: ModelTextsToolBar
var ModelTextsToolBar = new Class({
  Extends: TextsToolBar,
  initialize: function(name,properties) {
    this.parent(name);
  }
});
ModelTextsToolBar.ID = "modelTextsToolBar";

//Class: ModelObjectsTextsToolBar
var ModelObjectsTextsToolBar = new Class({
  Extends: ModelTextsToolBar,
  initialize: function() {
    this.parent(ModelObjectsTextsToolBar.ID);
  }
});
ModelObjectsTextsToolBar.ID = "modelObjectsTextsToolBar";

//Class: ModelRelationsTextsToolBar
var ModelRelationsTextsToolBar = new Class({
  Extends: ModelTextsToolBar,
  initialize: function() {
    this.parent(ModelRelationsTextsToolBar.ID);
  }
});
ModelRelationsTextsToolBar.ID = "modelRelationsTextsToolBar";

//////////////////////////////////////////////////////////////////////////
/////////////////////////////// MEDIATORS ////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Class: ModelObjectsHeaderMediator
var ModelObjectsHeaderMediator = new Class({
  Extends: ObjectsHeaderMediator,
  initialize: function(viewComponent) {
    this.parent(ModelObjectsHeaderMediator.ID,viewComponent);
    this.listMediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);    
    var header = this.getViewComponent();
  },
  onObjectsRefOpChange: function()  {
    this.sendNotification(SjamayeeFacade.OLIST_REFOP_CHANGE);
    this.sendNotification(SjamayeeFacade.OLIST_MODEL_REFOP_CHANGE);
  },
  onObjectsTypeChange: function()   {
    var type_code_name = this.getViewComponent().getTypeSelectValue();
    this.sendNotification(SjamayeeFacade.OLIST_MODEL_TYPE_CHANGE,type_code_name);
  },
  onObjectsFilterClick: function() {
    this.onObjectsTypeChange();
    this.sendNotification(SjamayeeFacade.OLIST_MODEL_FILTER_CLICK);
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_MODEL_HEADER_SHOW,
      SjamayeeFacade.OLIST_MODEL_TYPE_CHANGE
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var header = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_MODEL_HEADER_SHOW:
      this.hide();
      header.setAttribute("style","display:block;");
      break;
      case SjamayeeFacade.OLIST_MODEL_TYPE_CHANGE:
      var type_code_name = note.getBody();
      this.setTypeNameSelected(type_code_name);
      break;
    }
  }
});
ModelObjectsHeaderMediator.ID = "ModelObjectsHeaderMediator";

//Class: ModelObjectsTextsHeaderMediator
var ModelObjectsTextsHeaderMediator = new Class({
  Extends: TextsHeaderMediator,
  initialize: function(viewComponent) {
    this.parent(ModelObjectsTextsHeaderMediator.ID,viewComponent);
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_MODEL_TEXT_HEADER_SHOW
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var header = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_MODEL_TEXT_HEADER_SHOW:
      this.hide();
      header.objectName.innerHTML = "ModelObjectName";
      header.typeName.innerHTML = "ModelTypeName";      
      header.setAttribute("style","display:block;");
      break;
    }
  } 
});
ModelObjectsTextsHeaderMediator.ID = "ModelObjectsTextsHeaderMediator";

//Class: ModelRelationsHeaderMediator
var ModelRelationsHeaderMediator = new Class({
  Extends: RelationsHeaderMediator,
  initialize: function(viewComponent) {
    this.parent(ModelRelationsHeaderMediator.ID,viewComponent);
    this.gridMediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);    
    var header = this.getViewComponent();
  /*alert("ModelRelationsHeaderMediator - initialize:"+
          "\n"+header.dataModelSelect.id+
          "\n"+header.entitySelect.id+
          "\n"+header.typeSelect.id+
          "\n"+header.filter.id+
          "\n"+header.filterButton.id+
          "\n"+header.rootUndoButton.id+
          "\n"+header.rootSelectButton.id+
          "\n"+header.rootRedoButton.id+
          "\n"+header.columnsSelect.id+
          "\n"+header.settingSelect.id+
          "\n"+header.settingButton.id+
          "\n"+header.helpLink.id);*/
    //Initialize Select Lists.
    header.entitySelect.innerHTML = ModelEntity.getEntityOptions();
  },
  onRelationsEntityChange: function() {
    this.getViewComponent().filter.style.background = "white";
    //var entityName = this.getViewComponent().entitySelect.value;
    var entityName = this.getViewComponent().getEntitySelectValue();
    //var entityName = entityName.split('&nbsp;',1)[0];
    this.sendNotification(SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE,entityName);
  },
  onRelationsTypeChange: function() {
    this.getViewComponent().filter.style.background = "white";    
    //var type = Type.getByCode(this.getViewComponent().getTypeSelectValue());
    //var type = Type.getByType(this.getViewComponent().getTypeSelectValue());
    //var type = Type.getByName(this.getViewComponent().getTypeSelectValue());
    //this.sendNotification(SjamayeeFacade.GRID_MODEL_TYPE_CHANGE,typeName);
    //this.sendNotification(SjamayeeFacade.GRID_MODEL_TYPE_CHANGE,type.getName());
    this.sendNotification(SjamayeeFacade.GRID_MODEL_TYPE_CHANGE,this.getViewComponent().getTypeSelectValue());
  },
  onRelationsFilterClick: function() {
    this.getViewComponent().filter.style.background = "white";    
    this.onRelationsTypeChange();
    this.sendNotification(SjamayeeFacade.GRID_MODEL_FILTER_CLICK);
  },
  onRootUndoClick: function()   { this.sendNotification(SjamayeeFacade.MODEL_ROOT_UNDO); },        //>> Command !!!
  onRootSelectClick: function() { this.sendNotification(SjamayeeFacade.MODEL_ROOT_SELECT); },
  onRootRedoClick: function()   { this.sendNotification(SjamayeeFacade.MODEL_ROOT_REDO);  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.GRID_MODEL_HEADER_SHOW,
      SjamayeeFacade.GRID_MODEL_TYPE_SET,
      SjamayeeFacade.GRID_MODEL_TYPE_CHANGE,
      SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE,
      SjamayeeFacade.GRID_MODEL_NO_OBJECTS_FOUND
    ]);
  },

  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var header = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.GRID_MODEL_HEADER_SHOW:
      this.hide();
      header.setAttribute("style","display:block;");
      break;
      case SjamayeeFacade.GRID_MODEL_TYPE_SET:
      var type_code_name = note.getBody();
      header.typeSelect.selectedIndex = Header.MODEL_TYPE_SELECT_ALL_TYPES_INDEX;
      break;
      case SjamayeeFacade.GRID_MODEL_TYPE_CHANGE:
      var type_code_name = note.getBody();
      this.setTypeNameSelected(type_code_name);
      //var oldEntityName = header.entitySelect.value;
      var oldEntityName = header.getEntitySelectValue();
      //var oldEntityName = oldEntityName.split('&nbsp;',1)[0];
      header.entitySelect.innerHTML = ModelEntity.getEntityOptions(type_code_name,oldEntityName,this.getEntityFilterValue(),this.getEntityFilterCase());
      //var newEntityName = header.entitySelect.value;
      var newEntityName = header.getEntitySelectValue();
      //var newEntityName = newEntityName.split('&nbsp;',1)[0];
      if (newEntityName != oldEntityName) {
        this.sendNotification(SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE,newEntityName);
      }
      break;
      case SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE:
      var entityName = note.getBody();
      header.entitySelect.innerHTML = ModelEntity.getEntityOptions(this.getTypeNameSelected(),entityName,this.getEntityFilterValue(),this.getEntityFilterCase());
      this.setEntityNameSelected(entityName);
      break;
      case SjamayeeFacade.GRID_MODEL_NO_OBJECTS_FOUND:
      header.entitySelect.bgColor = red;
      break;
    }
  },
  
  getEntitySelected: function() {
    var entitySelected = this.parent();
    if (entitySelected === null) {
      entitySelected = ModelEntity.getByName(this.getEntityNameSelected());
      this.setEntitySelected(entitySelected);
    }
    return entitySelected;
  }
});
ModelRelationsHeaderMediator.ID = "ModelRelationsHeaderMediator";

//Class: ModelRelationsTextsHeaderMediator
var ModelRelationsTextsHeaderMediator = new Class({
  Extends: TextsHeaderMediator,
  initialize: function(viewComponent) {
    this.parent(ModelRelationsTextsHeaderMediator.ID,viewComponent);
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.GRID_MODEL_TEXT_HEADER_SHOW
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var header = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.GRID_MODEL_TEXT_HEADER_SHOW:
      this.hide();
      header.relationText.innerHTML = "ParentModelObjectName.TYPE  >  ChildModelObjectName.TYPE";
      header.setAttribute("style","display:block;");
      break;
    }
  } 
});
ModelRelationsTextsHeaderMediator.ID = "ModelRelationsTextsHeaderMediator";

//Class: ModelGridListMediator
var ModelGridListMediator = new Class({
  Extends: GridListMediator,
  initialize: function(viewComponent) {
    this.parent(ModelGridListMediator.ID,viewComponent);
    var gridList = this.getViewComponent();
    this.facade.registerMediator(new ModelObjectsListMediator(gridList));
    this.facade.registerMediator(new ModelRelationsGridMediator(gridList));   
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.FOCUS
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var gridList = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.FOCUS:
      var element = note.getBody();
      //$(element).focus();
      break;
    }
  }
});
ModelGridListMediator.ID = "ModelGridListMediator";

//Abstract
//Class: ModelTextsEditorMediator
var ModelTextsEditorMediator = new Class({
  Extends: GridListMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
    this.initialTextHash = null;
    //this.messageText = null;
  },
  getInitialTextHash: function() {
    return this.initialTextHash;
  },
  setInitialTextHash: function(textHash) {
    this.initialTextHash = textHash;
  },
/*
  setMessageText: function(messageText) {
    if (this.messageText === null) {
      var toolBar = null;
      if (this instanceof ModelObjectsTextsEditorMediator) {
        toolBar = this.facade.retrieveMediator(ModelObjectsTextsToolBarMediator.ID).getViewComponent();
      } else {
        toolBar = this.facade.retrieveMediator(ModelRelationsTextsToolBarMediator.ID).getViewComponent();
      }
      this.messageText = toolBar.messageText;
    }
    this.messageText.value = messageText;
  },
*/
  //Abstract
  getText: function() {},
  getTextSize: function() {},
  setTextSize: function(textSize) {},

  textResize: function() {
    if (this.isTextNormal() === true) {
      this.setTextSize(SjamayeeFacade.SIZE_FULL);
    } else {
      this.setTextSize(SjamayeeFacade.SIZE_NORMAL);
    }
  },
  isTextNormal: function() {
    return (this.getTextSize() == SjamayeeFacade.SIZE_NORMAL)?true:false;
  },
  isTextFull: function() {
    return (this.getTextSize() == SjamayeeFacade.SIZE_FULL)?true:false;
  },
  getTextHash: function() {
    var result = null;
    var text = this.getText();
    if (text.length > 0) {
      result = HashGenerator.getInstance().generateSHA2(text);
    }
    return result;
  } 
});

//Class: ModelObjectsTextsEditorMediator
var ModelObjectsTextsEditorMediator = new Class({
  Extends: ModelTextsEditorMediator,
  initialize: function(viewComponent) {
    this.parent(ModelObjectsTextsEditorMediator.ID,viewComponent);
    var textEditorLeft = this.getViewComponent().gridListSplitter.left.modelObjectsTextsEditor;
    var textEditorRight = this.getViewComponent().gridListSplitter.right.modelObjectsTextsEditor;
    textEditorRight.addEvent(SjamayeeFacade.TEXT_KEYUP, this.onTextKeyup);    
  },
  onTextKeyup: function() { alert("ModelObjectsTextsEditorMediator/handleNotification - TEXT_KEYUP"); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_MODEL_TEXT_SHOW,
      SjamayeeFacade.OLIST_MODEL_TEXT_RESIZE,
      SjamayeeFacade.OLIST_MODEL_TEXT_SAVE,
      SjamayeeFacade.OLIST_MODEL_TEXT_CANCEL      
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var gridList = this.getViewComponent();   
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_MODEL_TEXT_SHOW:
      this.setTextSize(this.getTextSize());
      this.hide();
      this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_HEADER_SHOW);
      this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_TOOLBAR_SHOW);
      //gridList.modelObjectsTextsEditor.setAttribute("style","width:100%;height:100%;display:block;");
      gridList.gridListSplitter.left.modelObjectsTextsEditor.setAttribute("style","width:100%;height:100%;display:block;");
      gridList.gridListSplitter.right.modelObjectsTextsEditor.setAttribute("style","width:100%;height:100%;display:block;");
      this.setInitialTextHash(HashGenerator.getInstance().generateSHA2(this.getText()));
      break;
      case SjamayeeFacade.OLIST_MODEL_TEXT_RESIZE:
      this.textResize();
      this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_RESIZED, this.isTextNormal());
      var detail = this.facade.retrieveMediator(ModelObjectDetailMediator.ID).getViewComponent();     
      if (this.isTextFull() === true) {
        detail.setAttribute("style","display:none;");
        gridList.setAttribute("style","width:100%;height:"+GridList.MAXIMUM_SIZE+"px;display:block;");
      } else {
        detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
        gridList.setAttribute("style","width:100%;height:"+GridList.NORMAL_SIZE+"px;display:block;");
      }
      break;
      case SjamayeeFacade.OLIST_MODEL_TEXT_SAVE:
      var textEditor = this.getViewComponent().gridListSplitter.right.modelObjectsTextsEditor;
      this.sendNotification(SjamayeeFacade.TEXT_SAVE,this);
      break;
      case SjamayeeFacade.OLIST_MODEL_TEXT_CANCEL:
      var textEditor = this.getViewComponent().gridListSplitter.right.modelObjectsTextsEditor;
      this.sendNotification(SjamayeeFacade.TEXT_CANCEL,this);
      break;
    }
  },
  getTextSize: function() {
    var textSize = this.facade.retrieveMediator(ModelObjectsListMediator.ID).getListSize();
    if (textSize === undefined || textSize === null) {
      textSize = SjamayeeFacade.SIZE_NORMAL;
      this.setTextSize(textSize);
    }
    return textSize;
  },
  setTextSize: function(textSize) {
    this.facade.retrieveMediator(ModelObjectsListMediator.ID).setListSize(textSize);
    var textEditorRight = this.getViewComponent().gridListSplitter.right.modelObjectsTextsEditor;
    //var gridList = this.getViewComponent();   
    var resizeButtonText = TextsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
    if (this.isTextFull() === true) {
      resizeButtonText = TextsToolBar.RESIZE_BUTTON_FULL_VALUE;
      textEditorRight.textarea.setAttribute("class",TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_MAXIMUM_ID);
    } else {
      resizeButtonText = TextsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
      textEditorRight.textarea.setAttribute("class",TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_NORMAL_ID);
    }
    this.facade.retrieveMediator(ModelObjectsTextsToolBarMediator.ID).getViewComponent().resizeButton.innerHTML = resizeButtonText;
  },
  getText: function() {
    var result = null;
    var textEditorRight = this.getViewComponent().gridListSplitter.right.modelObjectsTextsEditor;
    var text = textEditorRight.textarea.value;
    if (text.length > 0) {
      result = text;
    }
    return result;
  } 
});
ModelObjectsTextsEditorMediator.ID = "ModelObjectsTextsEditorMediator";

//Class: ModelRelationsTextsEditorMediator
var ModelRelationsTextsEditorMediator = new Class({
  Extends: ModelTextsEditorMediator,
  initialize: function(viewComponent) {
    this.parent(ModelRelationsTextsEditorMediator.ID,viewComponent);
    this.onRelationEdit = this.onRelationEdit.bindWithEvent(this);
    this.onParentEdit = this.onParentEdit.bindWithEvent(this);
    this.onChildEdit = this.onChildEdit.bindWithEvent(this);
    var textEditorLeft = this.getViewComponent().gridListSplitter.left.modelRelationsTextsEditor;
    textEditorLeft.addEvent(SjamayeeFacade.TEXT_RELATION_EDIT, this.onRelationEdit);
    textEditorLeft.addEvent(SjamayeeFacade.TEXT_PARENT_EDIT, this.onParentEdit);
    textEditorLeft.addEvent(SjamayeeFacade.TEXT_CHILD_EDIT, this.onChildEdit);
    var textEditorRight = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;
    textEditorRight.addEvent(SjamayeeFacade.TEXT_KEYUP, this.onTextKeyup);    
  },
  onTextKeyup: function() { alert("ModelRelationsTextsEditorMediator/handleNotification - TEXT_KEYUP"); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.GRID_MODEL_TEXT_SHOW,
      SjamayeeFacade.GRID_MODEL_TEXT_RESIZE,
      SjamayeeFacade.GRID_MODEL_TEXT_SAVE,
      SjamayeeFacade.GRID_MODEL_TEXT_CANCEL
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var gridList = this.getViewComponent();   
    switch (note.getName()) {
      case SjamayeeFacade.GRID_MODEL_TEXT_SHOW:
      this.setTextSize(this.getTextSize());
      this.hide();
      this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_HEADER_SHOW);
      this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_TOOLBAR_SHOW);
      //gridList.modelRelationsTextsEditor.setAttribute("style","width:100%;height:100%;display:block;");
      gridList.gridListSplitter.left.modelRelationsTextsEditor.setAttribute("style","width:100%;height:100%;display:block;");
      gridList.gridListSplitter.right.modelRelationsTextsEditor.setAttribute("style","width:100%;height:100%;display:block;");
      this.setInitialTextHash(HashGenerator.getInstance().generateSHA2(this.getText()));
      break;
      case SjamayeeFacade.GRID_MODEL_TEXT_RESIZE:
      this.textResize();
      this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_RESIZED, this.isTextNormal());
      //var detail = this.facade.retrieveMediator(ModelDetailMediator.ID).getViewComponent(); //TODO: ??????????????????????????
      var detail = this.facade.retrieveMediator(ModelObjectDetailMediator.ID).getViewComponent();     
      if (this.isTextFull() === true) {
        detail.setAttribute("style","display:none;");
        gridList.setAttribute("style","width:100%;height:"+GridList.MAXIMUM_SIZE+"px;display:block;");
      } else {
        detail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
        gridList.setAttribute("style","width:100%;height:"+GridList.NORMAL_SIZE+"px;display:block;");
      }
      break;
      /*
      var textEditor = this.getViewComponent().gridListSplitter.right.modelObjectsTextsEditor;
      var properties = {
        "state": SjamayeeMediator.STATE_LIST
        "textEditor": textEditor
      },
      this.sendNotification(SjamayeeFacade.DATA_MODEL_CHANGE, properties);

      //this.sendNotification(SjamayeeFacade.TEXT_SAVED,gridList);
      this.facade.setMessageText("Text saved.");
      */
      case SjamayeeFacade.GRID_MODEL_TEXT_SAVE:
      var textEditor = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;
      this.sendNotification(SjamayeeFacade.TEXT_SAVE,this);
      break;
      case SjamayeeFacade.GRID_MODEL_TEXT_CANCEL:
      var textEditor = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;
      this.sendNotification(SjamayeeFacade.TEXT_CANCEL,this);
      break;
    }
  },
  getTextSize: function() {
    var textSize = this.facade.retrieveMediator(ModelRelationsGridMediator.ID).getGridSize();
    if (textSize === undefined || textSize === null) {
      textSize = SjamayeeFacade.SIZE_NORMAL;
      this.setTextSize(textSize);
    }
    return textSize;
  },
  setTextSize: function(textSize) {
    this.facade.retrieveMediator(ModelRelationsGridMediator.ID).setGridSize(textSize);    
    var textEditorRight = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;
    var gridList = this.getViewComponent();   
    var resizeButtonText = TextsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
    if (this.isTextFull() === true) {
      resizeButtonText = TextsToolBar.RESIZE_BUTTON_FULL_VALUE;
      textEditorRight.textarea.setAttribute("class",TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_MAXIMUM_ID);
    } else {
      resizeButtonText = TextsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
      textEditorRight.textarea.setAttribute("class",TextsEditorUIComponent.CLASS_ID+" "+TextsEditorUIComponent.CLASS_NORMAL_ID);
    }
    this.facade.retrieveMediator(ModelRelationsTextsToolBarMediator.ID).getViewComponent().resizeButton.innerHTML = resizeButtonText;
  },
  getText: function() {
    var result = null;
    var textEditorRight = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;
    var text = textEditorRight.textarea.value;
    if (text.length > 0) {
      result = text;
    }
    return result;
  },  
  onRelationEdit: function() {
    var text = '#                                                a81*TAB\n'+
               '#                                                a82*-\n'+
               '-\n'+
               '# Entity number                                  y75*0\n'+
               '#                                                y76*0\n'+
               '#                                                d01*1\n'+
               '#                                                y04*0    005\n'+
               '# Loop 1                                  ta   1 a02=dele     ex\n'+
               '# Generation WHERE-clause                        a02=rest        tb\n'+
               '#                                              8 x01+rest\n'+
               '#                                                d01*2        ta ta\n'+
               '#                                         tb     a02=tab  001    ta\n'+
               '#                                                d01*2        ta ta\n'+
               '-\n'+
               '# Exit                                    ex              006 00 00\n'+
               '-\n'+
               '/001\n'+
               '               DELETE FROM £b02 £a51                                #b04=\n'+
               '               DELETE FROM £b04.£b02 £a51                           #b04#\n'+
               '/005\n'+
               '           EXEC SQL\n'+
               '/006\n'+
               '           END-EXEC.\n'+
               '------------------------------------------------------------ Text on relation\n'+
               '1111111111111\n'+
               '222222222222222222222\n'+
               '33333333333333333333333333333333333\n'+
               '4444444444444444444444444444444444444444444444\n'+
               '55555555555555555555555555555555555555555555555555555555555555\n';
    //var textEditorId = ModelRelationsTextsEditor.ID+TextsEditorUIComponent.COMPONENT_ID;
    //$(textEditorId).innerHTML = text;
    var textEditorRight = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;   
    textEditorRight.textarea.innerHTML = text;
  },
  onParentEdit: function() {
    var text = '#                                                a81*TAB\n'+
               '#                                                a82*-\n'+
               '-\n'+
               '# Entity number                                  y75*0\n'+
               '#                                                y76*0\n'+
               '#                                                d01*1\n'+
               '#                                                y04*0    005\n'+
               '# Loop 1                                  ta   1 a02=dele     ex\n'+
               '# Generation WHERE-clause                        a02=rest        tb\n'+
               '#                                              8 x01+rest\n'+
               '#                                                d01*2        ta ta\n'+
               '#                                         tb     a02=tab  001    ta\n'+
               '#                                                d01*2        ta ta\n'+
               '-\n'+
               '# Exit                                    ex              006 00 00\n'+
               '-\n'+
               '/001\n'+
               '               DELETE FROM £b02 £a51                                #b04=\n'+
               '               DELETE FROM £b04.£b02 £a51                           #b04#\n'+
               '/005\n'+
               '           EXEC SQL\n'+
               '/006\n'+
               '           END-EXEC.\n'+
               '-------------------------------------------------------------- Text on parent\n';
    //var textEditorId = ModelRelationsTextsEditor.ID+TextsEditorUIComponent.COMPONENT_ID;
    //$(textEditorId).innerHTML = text;
    var textEditorRight = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;   
    textEditorRight.textarea.innerHTML = text;
  },
  onChildEdit: function() {
    var text = '#                                                a81*TAB\n'+
               '#                                                a82*-\n'+
               '-\n'+
             /*'# Entity number                                  y75*0\n'+
               '#                                                y76*0\n'+
               '#                                                d01*1\n'+
               '#                                                y04*0    005\n'+
               '# Loop 1                                  ta   1 a02=dele     ex\n'+
               '# Generation WHERE-clause                        a02=rest        tb\n'+
               '#                                              8 x01+rest\n'+
               '#                                                d01*2        ta ta\n'+
               '#                                         tb     a02=tab  001    ta\n'+
               '#                                                d01*2        ta ta\n'+*/
               '-\n'+
               '# Exit                                    ex              006 00 00\n'+
               '-\n'+
               '/001\n'+
               '               DELETE FROM £b02 £a51                                #b04=\n'+
               '               DELETE FROM £b04.£b02 £a51                           #b04#\n'+
               '/005\n'+
               '           EXEC SQL\n'+
               '/006\n'+
               '           END-EXEC.\n'+
               '--------------------------------------------------------------- Text on child\n';
    //var textEditorId = ModelRelationsTextsEditor.ID+TextsEditorUIComponent.COMPONENT_ID;
    //$(textEditorId).innerHTML = text;
    var textEditorRight = this.getViewComponent().gridListSplitter.right.modelRelationsTextsEditor;   
    textEditorRight.textarea.innerHTML = text;
  }
});
ModelRelationsTextsEditorMediator.ID = "ModelRelationsTextsEditorMediator";

//Class: ModelRelationsGridMediator
var ModelRelationsGridMediator = new Class({
  Extends: RelationsGridMediator,
  initialize: function(viewComponent) {
    this.parent(ModelRelationsGridMediator.ID,viewComponent);
    var gridList = this.getViewComponent();
    //Grid left.
    this.gridUICLeft = gridList.gridListSplitter.left.modelRelationsGrid;
    this.gridUICLeft.addEvent(SjamayeeFacade.GRID_CLICK, this.onGridClick);
    this.gridUICLeft.addEvent(SjamayeeFacade.GRID_CELL_CLICK, this.onCellClick);
    this.gridUICLeft.addEvent(SjamayeeFacade.GRID_CELL_MOUSEOVER, this.onCellMouseOver);
    this.gridUICLeft.addEvent(SjamayeeFacade.GRID_CELL_MOUSEOUT, this.onCellMouseOut);    
    this.gridUICLeft.addEvent(SjamayeeFacade.GRID_KEYDOWN, this.onKeydown);
    //Grid right.
    this.gridUICRight = gridList.gridListSplitter.right.modelRelationsGrid;
    this.gridUICRight.addEvent(SjamayeeFacade.GRID_CLICK, this.onGridClick);
    this.gridUICRight.addEvent(SjamayeeFacade.GRID_CELL_CLICK, this.onCellClick);
    this.gridUICRight.addEvent(SjamayeeFacade.GRID_CELL_MOUSEOVER, this.onCellMouseOver);
    this.gridUICRight.addEvent(SjamayeeFacade.GRID_CELL_MOUSEOUT, this.onCellMouseOut);
    this.gridUICRight.addEvent(SjamayeeFacade.GRID_KEYDOWN, this.onKeydown);
    //Initialize grid.
    this.setGrid(new ModelGrid());
    this.setTypeProxy(SjamayeeFacade.getInstance().retrieveProxy(TypeProxy.ID));
    this.setEntityProxy(SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID));
    this.setRelationProxy(SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID));
    this.setAttributeProxy(SjamayeeFacade.getInstance().retrieveProxy(ModelAttributeProxy.ID));
    //Initialize CommandBuffer.
    this.sendNotification(SjamayeeFacade.GRID_MODEL_BUFFER_CLEAR,this);
  },
  onGridClick: function(evt)     { this.parent(evt); },  
  onCellClick: function(evt)     { this.parent(evt); },  
  onCellMouseOver: function(evt) { this.parent(evt,this.getBackgroundHighliteColor()); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.MODEL_TYPES_RELOAD,
      SjamayeeFacade.GRID_MODEL_SHOW,
      SjamayeeFacade.GRID_MODEL_REFRESH,
      SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE,
      SjamayeeFacade.GRID_MODEL_TYPE_CHANGE,
      SjamayeeFacade.GRID_MODEL_FILTER_CLICK,
      SjamayeeFacade.FOCUS,
      SjamayeeFacade.GRID_MODEL_RESIZE
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var gridList = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.GRID_MODEL_SHOW:
      //this.sendNotification(SjamayeeFacade.MODEL_SHOW);
      //this.sendNotification(SjamayeeFacade.GRID_SHOW);      
      var state = null;
      var entityName = null;
      var properties = note.getBody();
      if (properties) {
        if (properties.state !== undefined) { state = properties.state; }
        if (properties.entityName !== undefined) { entityName = properties.entityName; }
      }
      if (state) { this.setState(state); }
      if (this.getState() == SjamayeeMediator.STATE_TEXT) {
        this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_EDIT);       
        break;
      }     
      this.hide();
    /*this.objectsListLeftWidth = gridList.gridListSplitter.left.getStyle("width").toInt();
      if (this.relationsGridLeftWidth !== null) {
        gridList.gridListSplitter.left.setStyle("width", this.relationsGridLeftWidth);
        if (dijit) {
          var splitter = dijit.byId(GridListSplitter.ID);
          if (splitter) { splitter.resize(); }
        }       
      }
      var splitterStyle = this.getSplitterStyle();
      if (splitterStyle === null) {
        //splitterStyle = "background-color:white;width:100%;height:100%;display:block;";
        splitterStyle = "display:block;";
      }
      gridList.gridListSplitter.setAttribute("style",splitterStyle); */
      this.sendNotification(SjamayeeFacade.GRID_MODEL_HEADER_SHOW);
      this.sendNotification(SjamayeeFacade.GRID_MODEL_TOOLBAR_SHOW);      
      this.gridUICLeft.setAttribute("style","width:100%;height:100%;display:block;");
      this.gridUICRight.setAttribute("style","width:100%;height:100%;display:block;");
      this.gridUICLeft.keyboard.activate();
      this.gridUICLeft.focus();     
      this.setGridSize(this.getGridSize());
      if (this.firstTime) {
        this.firstTime = false;
        if (entityName === null) { entityName = "Account"; }        
        if (entityName) {
          this.sendNotification(SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE,entityName);
        } else {
          this.sendNotification(SjamayeeFacade.GRID_MODEL_REFRESH);
        }
      }
      break;      
      case SjamayeeFacade.GRID_MODEL_REFRESH:
      this.fillGrid();
      /*                                IS SOMETHING LIKE THIS NEEDED ???
      switch (this.getLastNavigation()) {
        case SjamayeeFacade.OLIST_DATA_HOME:      this.sendNotification(SjamayeeFacade.OLIST_DATA_HOME); break;
        case SjamayeeFacade.OLIST_DATA_PREVIOUS:  this.sendNotification(SjamayeeFacade.OLIST_DATA_PREVIOUS); break;
        case SjamayeeFacade.OLIST_DATA_UP:        this.sendNotification(SjamayeeFacade.OLIST_DATA_UP); break;
        case SjamayeeFacade.OLIST_DATA_DOWN:      this.sendNotification(SjamayeeFacade.OLIST_DATA_DOWN); break;
        case SjamayeeFacade.OLIST_DATA_NEXT:      this.sendNotification(SjamayeeFacade.OLIST_DATA_NEXT); break;
        case SjamayeeFacade.OLIST_DATA_END:     this.sendNotification(SjamayeeFacade.OLIST_DATA_END); break;
      }
      */      
      break;
      case SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE:
      var entityName = note.getBody();
      var entitySwitched = this.switchEntity(entityName);
      //if (entitySwitched === true) {
        this.sendNotification(SjamayeeFacade.GRID_MODEL_REFRESH);
      //}
      //this.sendNotification(SjamayeeFacade.FOCUS, RelationsGridRight.ID);
      break;
      case SjamayeeFacade.GRID_MODEL_TYPE_CHANGE:
      //var type_code_name = note.getBody();
      //this.sendNotification(SjamayeeFacade.FOCUS, RelationsGridRight.ID);
      break;    
      case SjamayeeFacade.GRID_MODEL_FILTER_CLICK:
      break;
      case SjamayeeFacade.GRID_MODEL_HOME:
      var position = this.getPosition();
      position.setRow(this.getBeginOfList());
      this.home();
      break;
      case SjamayeeFacade.GRID_MODEL_PREVIOUS:
      break;
      case SjamayeeFacade.GRID_MODEL_UP:
      //var position = this.getPosition();
      //position.setRow(position.getRow()-1);
      this.lineUp();
      //Fill grid.
      this.fillGrid();      
      break;
      case SjamayeeFacade.GRID_MODEL_LEFT:
      var ok = false;
      var homeView = false;
      var relation = null;
      var nextColumn = null;
      var savedCell = null;
      var selectedCell = null;
      var relation = null;      
      var position = this.getPosition();      
      if (position) {
        var column = this.getGrid().getColumnByIndex(position.getColumn());
        if (column) {
          this.setCurrentNivo(column.getNivo());
          var cell = column.getCell(position.getRow());
          if (!cell) {
            if (this.getCurrentNivo() > Position.NIVO_ROOT()) {
              //TO RETURN FROM EMPTY COLUMN!
              ok = true;
            }
          } else {
            if (cell.navigationLeft()) {
              relation = cell.getRelation();
              ok = true;
            }
          }
          if (ok) {
            var cn = this.getCurrentNivo();
            if (cn > Position.WHERE_MAX()) {
              cn = (cn - 1);                           // TEST LIMIT !!!
              if (cn < (Position.NIVO_ROOT() - 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
                column.setSavedCell(cell);             // TODO: # cells -> clear column !!!
              } else if (cn >= Position.NIVO_ROOT()) {
                selectedCell = column.getSavedCell();
                if (column.getNivo() >= this.getGrid().getWhatUsedNivo() || column.isSelected() === false) {
                  column.setSavedCell(cell);
                }
              }
              nextColumn = this.getGrid().getColumnByNivo(cn);
              if (nextColumn) {
                //result = true;
                this.setCurrentNivo(cn);
                if (cn <= Position.NIVO_ROOT()) {
                  //homeView = this.isHomeView();
                }
                if (cn < this.getGrid().getWhereUsedNivo()) {
                  this.getGrid().setWhereUsedNivo(cn);
                }
                savedCell = nextColumn.getSavedCell();
                if (position) { position.left(savedCell); }
                if (homeView === true) {
                  if (nextColumn.isMasterChanged() === false) {
                    if (selectedCell) {
                    //selectedCell.touch(((selectedCell.isSelected())?true:false));
                      selectedCell.touch(selectedCell.isSelected());
                    }
                  //cell.touch(((gridCell.isSelected())?true:false));
                    cell.touch(gridCell.isSelected());
                    savedCell.touch(true);
                    //this.setParentAndChild(savedCell);
                  //result = false;
                  }
                }
              }
            }
          }
        }  
      }
/*      
      var nivo = this.getCurrentNivo();
      if (nivo <= (Position.NIVO_ROOT()+1)) {
        var position = this.getPosition();
        var column = position.getColumn();
        if (column > Position.COLUMN_FIRST()) {
          column = (column - 1);
          position.setColumn(column);
        }
      }
      if (nivo > Position.WHERE_MAX()) {
        nivo = (nivo - 1);
        this.setCurrentNivo(nivo);        
      }
*/
      //var col = this.getPosition().getColumn();
      //var row = this.getPosition().getRow();
      //Fill grid.
      this.fillGrid();
      break;
      case SjamayeeFacade.GRID_MODEL_RIGHT:
      var ok = false;
      var homeView = false;
      var relation = null;
      var nextColumn = null;
      var savedCell = null;
      var selectedCell = null;
      var relation = null;
      var position = this.getPosition();
      if (position) {
        var column = this.getGrid().getColumnByIndex(position.getColumn());
        if (column) {
          this.setCurrentNivo(column.getNivo());
          var cell = column.getCell(position.getRow());
          relation = cell.getRelation();
          if (cell.navigationRight()) {
            var cn = this.getCurrentNivo();

            if (cn < Position.WHAT_MAX()) {
              cn = (cn + 1);                           // TEST LIMIT !!!
              if (cn > (Position.NIVO_ROOT() + 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
                column.setSavedCell(cell);             // TODO: # cells -> clear column !!!
              } else if (cn <= Position.NIVO_ROOT()) {
                selectedCell = column.getSavedCell();
                if (column.getNivo() <= this.getGrid().getWhereUsedNivo() || column.isSelected() === false) {                 
                  column.setSavedCell(cell);
                }
              }
              nextColumn = this.getGrid().getColumnByNivo(cn);
              if (nextColumn) {
                //result = true;
                this.setCurrentNivo(cn);
                if (cn > Position.NIVO_COLUMN_FIRST()) {
                  //homeView = this.isHomeView();       
                }
                if (cn > this.getGrid().getWhatUsedNivo()) {
                  this.getGrid().setWhatUsedNivo(cn);
                }
                savedCell = nextColumn.getSavedCell();               
                if (position) { position.right(savedCell); }
                ok = true;
                if (homeView === true) {
                  if (!nextColumn.isMasterChanged() === true) {
                    if (selectedCell) {
                    //selectedCell.touch(((selectedCell.isSelected())?true:false));
                      selectedCell.touch(selectedCell.isSelected());
                    }
                  //gridCell.touch(((gridCell.isSelected())?true:false));
                    cell.touch(cell.isSelected());
                    savedCell.touch(true);
                    this.setParentAndChild(savedCell);
                  //result = false;
                  }
                }
              }
            }
          }         
        }  
      }
/*
      var nivo = this.getCurrentNivo();
      if (nivo >= Position.NIVO_COLUMN_FIRST()) {     
        var position = this.getPosition();
        var column = position.getColumn();
        if (column < 4) {                   //TODO: MAX COLS ??? DEFINITION
          column = (column + 1);
          position.setColumn(column);
        }
      }
      if (nivo < Position.WHAT_MAX()) {
        nivo = (nivo + 1);
        this.setCurrentNivo(nivo);        
      }
*/
      //var col = this.getPosition().getColumn();
      //var row = this.getPosition().getRow();
      //Fill grid.
      this.fillGrid();
      break;
      case SjamayeeFacade.GRID_MODEL_DOWN:
      //var position = this.getPosition();
      //position.setRow(position.getRow()+1);
      this.lineDown();
      //Fill grid.
      this.fillGrid();
      break;
      case SjamayeeFacade.GRID_MODEL_NEXT:
      break;
      case SjamayeeFacade.GRID_MODEL_END:
      var position = this.getPosition();
      position.setRow(this.getEndOfList());
      this.end();
      break;
      case SjamayeeFacade.GRID_MODEL_RESIZE:
      var gridSize = note.getBody();
      this.gridResize(gridSize);
      //this.home(); //TODO !!!
      this.sendNotification(SjamayeeFacade.MODEL_TYPES_RELOAD);                 //FOR TEST ONLY !!! REMOVE LATER !!!
      this.sendNotification(SjamayeeFacade.GRID_MODEL_REFRESH);
      break;
      case SjamayeeFacade.MODEL_TYPES_RELOAD:
      var typeOptions = Type.getTypeOptions();
      var objectsHeaderMediator = this.facade.retrieveMediator(ModelObjectsHeaderMediator.ID);
      objectsHeaderMediator.getViewComponent().typeSelect.innerHTML = typeOptions;
      var relationsHeaderMediator = this.facade.retrieveMediator(ModelRelationsHeaderMediator.ID);
      relationsHeaderMediator.getViewComponent().typeSelect.innerHTML = typeOptions;
      var relationsEntityName = relationsHeaderMediator.getViewComponent().entitySelect.value;
      this.sendNotification(SjamayeeFacade.GRID_MODEL_ENTITY_CHANGE,relationsEntityName);
      break;      
    }
    this.parent(note);
  },
  setResizeButtonText: function(text) {
    this.facade.retrieveMediator(ModelRelationsToolBarMediator.ID).getViewComponent().resizeButton.innerHTML = text;    
  },
  setGridSize: function(gridSize) {
    this.setListSize(gridSize); //OKEEE  !!! kept in listSize !!!
    var parentDetail = this.facade.retrieveMediator(ModelParentDetailMediator.ID).getViewComponent();
    var childDetail = this.facade.retrieveMediator(ModelChildDetailMediator.ID).getViewComponent();
    var gridList = this.getViewComponent();
    if (this.isGridFull() === true) {
      this.setPageSize(RelationsGridMediator.PAGE_SIZE_MAX);
      this.setEndOfList(this.getPageSize() - 1);      
      parentDetail.setAttribute("style","display:none;");
      childDetail.setAttribute("style","display:none;");
      gridList.setAttribute("style","width:100%;height:"+GridList.MAXIMUM_SIZE+"px;");
    } else {
      this.setPageSize(RelationsGridMediator.PAGE_SIZE_MIN);
      this.setEndOfList(this.getPageSize() - 1);
      parentDetail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
      childDetail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
      gridList.setAttribute("style","width:100%;height:"+GridList.NORMAL_SIZE+"px;");     
    }
    var resizeButtonText = (this.isGridFull() === true)?RelationsToolBar.RESIZE_BUTTON_FULL_VALUE:RelationsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
    this.setResizeButtonText(resizeButtonText);
  },
  createRelationVO: function(entity) {
    return new ModelRelationVO(null,0,"",null,entity.id);
  },
  createRelation: function(vo) {
    return new ModelRelation(vo);
  },
  getBackgroundHighliteColor: function() {
    return ModelRelationsGridMediator.BACKGROUND_HIGHLITE_COLOR;
  }
});
ModelRelationsGridMediator.ID = "ModelRelationsGridMediator";
ModelRelationsGridMediator.BACKGROUND_HIGHLITE_COLOR = "#FAE4DB;";

//Class: ModelObjectsListMediator
var ModelObjectsListMediator = new Class({
  Extends: ObjectsListMediator,
  initialize: function(viewComponent) {
    this.parent(ModelObjectsListMediator.ID,viewComponent);
    var gridList = this.getViewComponent();
    //List left.
    this.listUICLeft = gridList.gridListSplitter.left.modelObjectsList;
    this.listUICLeft.addEvent(SjamayeeFacade.LIST_CLICK, this.onListClick);
    this.listUICLeft.addEvent(SjamayeeFacade.LINE_CLICK, this.onLineClick);
    this.listUICLeft.addEvent(SjamayeeFacade.LINE_MOUSEOVER, this.onLineMouseOver);
    this.listUICLeft.addEvent(SjamayeeFacade.LINE_MOUSEOUT, this.onLineMouseOut);
    this.listUICLeft.addEvent(SjamayeeFacade.LIST_KEYDOWN, this.onKeydown);
    //List right.
    this.listUICRight = gridList.gridListSplitter.right.modelObjectsList;
    this.listUICRight.addEvent(SjamayeeFacade.LIST_CLICK, this.onListClick);
    this.listUICRight.addEvent(SjamayeeFacade.LINE_CLICK, this.onLineClick);
    this.listUICRight.addEvent(SjamayeeFacade.LINE_MOUSEOVER, this.onLineMouseOver);
    this.listUICRight.addEvent(SjamayeeFacade.LINE_MOUSEOUT, this.onLineMouseOut);
    this.listUICRight.addEvent(SjamayeeFacade.LIST_KEYDOWN, this.onKeydown);
    //Initialize list.
    this.entityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);
    //Initialize CommandBuffer.
    this.sendNotification(SjamayeeFacade.OBJECT_MODEL_BUFFER_CLEAR,this);
  },
  onLineMouseOver: function(evt) { this.parent(evt,this.getBackgroundHighliteColor()); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_MODEL_SHOW,
      SjamayeeFacade.OLIST_MODEL_REFRESH,
      SjamayeeFacade.OLIST_MODEL_RESIZE,
      SjamayeeFacade.OLIST_MODEL_REFOP_CHANGE,
      SjamayeeFacade.OLIST_MODEL_TYPE_CHANGE,
      SjamayeeFacade.OLIST_MODEL_FILTER_CLICK
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var gridList = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_MODEL_SHOW:
      //this.sendNotification(SjamayeeFacade.MODEL_SHOW);
      this.sendNotification(SjamayeeFacade.OLIST_SHOW);
      var state = null;
      var properties = note.getBody();
      if (properties) { if (properties.state !== undefined) { state = properties.state; } }
      if (state) { this.setState(state); }
      if (this.getState() == SjamayeeMediator.STATE_TEXT) {
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_EDIT);
        break;
      }     
      this.hide();
    /*this.relationsGridLeftWidth = gridList.gridListSplitter.left.getStyle("width").toInt();
      if (this.objectsListLeftWidth !== null) {
        gridList.gridListSplitter.left.setStyle("width", this.objectsListLeftWidth);
        if (dijit) {
          var splitter = dijit.byId(GridListSplitter.ID);
          if (splitter) { splitter.resize(); }
        }       
      }
      var splitterStyle = this.getSplitterStyle();
      if (splitterStyle === null) {
        //splitterStyle = "background-color:white;width:100%;height:100%;display:block;";
        splitterStyle = "display:block;";
      }
      gridList.gridListSplitter.setAttribute("style",splitterStyle); */
      this.sendNotification(SjamayeeFacade.OLIST_MODEL_HEADER_SHOW);
      this.sendNotification(SjamayeeFacade.OLIST_MODEL_TOOLBAR_SHOW);
      this.listUICLeft.setAttribute("style","width:100%;height:100%;display:block;");
      this.listUICRight.setAttribute("style","width:100%;height:100%;display:block;");
      this.listUICLeft.keyboard.activate();
      this.listUICLeft.focus();     
      this.setListSize(this.getListSize());
      //this.home();
      //this.sendNotification(SjamayeeFacade.OLIST_MODEL_REFRESH);
      break;
      case SjamayeeFacade.OLIST_MODEL_REFRESH:
      this.fillList();
      /*                                IS SOMETHING LIKE THIS NEEDED ???
      switch (this.getLastNavigation()) {
        case SjamayeeFacade.OLIST_MODEL_HOME:     this.sendNotification(SjamayeeFacade.OLIST_MODEL_HOME); break;
        case SjamayeeFacade.OLIST_MODEL_PREVIOUS: this.sendNotification(SjamayeeFacade.OLIST_MODEL_PREVIOUS); break;
        case SjamayeeFacade.OLIST_MODEL_UP:       this.sendNotification(SjamayeeFacade.OLIST_MODEL_UP); break;
        case SjamayeeFacade.OLIST_MODEL_DOWN:     this.sendNotification(SjamayeeFacade.OLIST_MODEL_DOWN); break;
        case SjamayeeFacade.OLIST_MODEL_NEXT:     this.sendNotification(SjamayeeFacade.OLIST_MODEL_NEXT); break;
        case SjamayeeFacade.OLIST_MODEL_END:      this.sendNotification(SjamayeeFacade.OLIST_MODEL_END); break;
      }
      */
      break;    
/*                                                                            MOVE THIS PAGING >>> onKeyDown !!!      
      case SjamayeeFacade.OLIST_MODEL_CLICK:
      break;      
      case SjamayeeFacade.OLIST_MODEL_LINE_CLICK:
      var evt = note.getBody();
      this.setCurrentLine(evt);
      break;
      case SjamayeeFacade.OLIST_KEYPRESS:
      break;
      case SjamayeeFacade.OLIST_MODEL_ESCAPE:
      break;
      case SjamayeeFacade.OLIST_MODEL_SPACE:
      break;
      case SjamayeeFacade.OLIST_MODEL_ENTER:
      break;
      case SjamayeeFacade.OLIST_MODEL_HOME:
      this.setLastNavigation(SjamayeeFacade.OLIST_MODEL_HOME);
      this.home();
      var messageText = note.getBody();
      if (messageText !== undefined) { this.setMessageText(messageText); }
      break;
      case SjamayeeFacade.OLIST_MODEL_PREVIOUS:
      this.setLastNavigation(SjamayeeFacade.OLIST_MODEL_PREVIOUS);
      this.previous();
      var messageText = note.getBody();
      if (messageText !== undefined) { this.setMessageText(messageText); }
      break;
      case SjamayeeFacade.OLIST_MODEL_UP:
      this.setLastNavigation(SjamayeeFacade.OLIST_MODEL_UP);
      this.lineUp();
      var messageText = note.getBody();
      if (messageText !== undefined) { this.setMessageText(messageText); }
      break;
      case SjamayeeFacade.OLIST_MODEL_DOWN:
      this.setLastNavigation(SjamayeeFacade.OLIST_MODEL_DOWN);
      this.lineDown();
      var messageText = note.getBody();
      if (messageText !== undefined) { this.setMessageText(messageText); }
      break;
      case SjamayeeFacade.OLIST_MODEL_NEXT:
      this.setLastNavigation(SjamayeeFacade.OLIST_MODEL_NEXT);
      this.next();
      var messageText = note.getBody();
      if (messageText !== undefined) { this.setMessageText(messageText); }
      break;
      case SjamayeeFacade.OLIST_MODEL_END:
      this.setLastNavigation(SjamayeeFacade.OLIST_MODEL_END);
      this.end();
      var messageText = note.getBody();
      if (messageText !== undefined) { this.setMessageText(messageText); }
      break;
*/
      case SjamayeeFacade.OLIST_MODEL_RESIZE:
      var listSize = note.getBody();
      this.listResize(listSize);
      //this.home(); //TODO !!!
      this.sendNotification(SjamayeeFacade.OLIST_MODEL_REFRESH);
      break;
      case SjamayeeFacade.OLIST_MODEL_REFOP_CHANGE:
      this.sendNotification(SjamayeeFacade.FOCUS, ObjectsListRight.ID);
      break;
      case SjamayeeFacade.OLIST_MODEL_TYPE_CHANGE:
      var type_code_name = note.getBody();
      //this.sendNotification(SjamayeeFacade.FOCUS, ObjectsListRight.ID);
      this.switchType(type_code_name);
      this.home();
      break;
      case SjamayeeFacade.OLIST_MODEL_FILTER_CLICK:
      break;
    }
    this.parent(note);    
  },
  setEdit: function(forced) {
    var mode = this.parent(forced);
    if (mode == GridListMediator.MODE_EDIT) {
      this.sendNotification(SjamayeeFacade.OBJECT_MODEL_DETAIL);
    }
    return mode;
  },
  setDisplay: function(forced) {
    var mode = this.parent(forced);
    if (mode == GridListMediator.MODE_DISPLAY) {
      this.sendNotification(SjamayeeFacade.OBJECT_MODEL_DETAIL);
    }
    return mode;
  },
  switchType: function(type_code_name) {
    return this;
  },
  getType: function(object) {
    var result = object.getType().getType();
    //alert("ModelObjectsListMediator/getType - type: "+result);
    return result;
  },
  getLastNavigation: function() {
    return (this.parent())?this.parent():SjamayeeFacade.OLIST_MODEL_HOME;
  },
  firstPage: function() {
    try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {     
        this.parent();
        this.fillList(this.entityProxy.firstPage(this.getEndOfList()));
        this.setMessageText(ObjectsListMediator.HOME_MESSAGE_TEXT);       
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
    } catch(error) {
      Utils.alert("ModelObjectsListMediator/firstPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  previousPage: function() {
    try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent();
        this.fillList(this.entityProxy.previousPage(this.getEndOfList()));
        this.setMessageText(ObjectsListMediator.PREVIOUS_MESSAGE_TEXT);
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
    } catch(error) {
      Utils.alert("ModelObjectsListMediator/previousPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  previousLine: function() {
    try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent();
        this.fillList(this.entityProxy.previousLine(this.getEndOfList()));
        this.setMessageText(ObjectsListMediator.UP_MESSAGE_TEXT);
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
    } catch(error) {
      Utils.alert("ModelObjectsListMediator/previousLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  nextLine: function() {
    try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent();
        this.fillList(this.entityProxy.nextLine(this.getEndOfList()));
        this.setMessageText(ObjectsListMediator.DOWN_MESSAGE_TEXT);
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
    } catch(error) {
      Utils.alert("ModelObjectsListMediator/nextLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  nextPage: function() {
    try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent();
        this.fillList(this.entityProxy.nextPage(this.getEndOfList()));
        this.setMessageText(ObjectsListMediator.NEXT_MESSAGE_TEXT);       
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
    } catch(error) {
      Utils.alert("ModelObjectsListMediator/nextPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  lastPage: function() {
    try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent();
        this.fillList(this.entityProxy.lastPage(this.getEndOfList()));
        this.setMessageText(ObjectsListMediator.END_MESSAGE_TEXT);
        this.sendNotification(SjamayeeFacade.OLIST_MODEL_SHOW);
      }
    } catch(error) {
      Utils.alert("ModelObjectsListMediator/lastPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  setResizeButtonText: function(text) {
    this.facade.retrieveMediator(ModelObjectsToolBarMediator.ID).getViewComponent().resizeButton.innerHTML = text;    
  },
  setListSize: function(listSize) {
    this.parent(listSize);
    var parentDetail = this.facade.retrieveMediator(ModelParentDetailMediator.ID).getViewComponent();
    var childDetail = this.facade.retrieveMediator(ModelChildDetailMediator.ID).getViewComponent();
    var gridList = this.getViewComponent();   
    if (this.isListFull() === true) {
      this.setPageSize(ObjectsListMediator.PAGE_SIZE_MAX);
      this.setEndOfList(this.getPageSize() - 1);      
      parentDetail.setAttribute("style","display:none;");
      childDetail.setAttribute("style","display:none;");
      gridList.setAttribute("style","width:100%;height:"+GridList.MAXIMUM_SIZE+"px;");
    } else {
      this.setPageSize(ObjectsListMediator.PAGE_SIZE_MIN);
      this.setEndOfList(this.getPageSize() - 1);      
      parentDetail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
      childDetail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
      gridList.setAttribute("style","width:100%;height:"+GridList.NORMAL_SIZE+"px;");     
    }
    var resizeButtonText = (this.isListFull() === true)?ObjectsToolBar.RESIZE_BUTTON_FULL_VALUE:ObjectsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
    this.setResizeButtonText(resizeButtonText);
  },
  getBackgroundHighliteColor: function() {
    return ModelObjectsListMediator.BACKGROUND_HIGHLITE_COLOR;
  } 
});
ModelObjectsListMediator.ID = "ModelObjectsListMediator";
ModelObjectsListMediator.BACKGROUND_HIGHLITE_COLOR = "#FAE4DB;";

//Class: ModelObjectsToolBarMediator
var ModelObjectsToolBarMediator = new Class({
  Extends: ObjectsToolBarMediator,
  initialize: function(viewComponent) {
    this.parent(ModelObjectsToolBarMediator.ID,viewComponent);
    this.listMediator = this.facade.retrieveMediator(ModelObjectsListMediator.ID);
    var toolBar = this.getViewComponent();
  },
  onFirst: function()        { this.sendNotification(SjamayeeFacade.OLIST_MODEL_HOME,ObjectsListMediator.HOME_MESSAGE_TEXT); },
  onPrevious: function()     { this.sendNotification(SjamayeeFacade.OLIST_MODEL_PREVIOUS,ObjectsListMediator.PREVIOUS_MESSAGE_TEXT); },
  onNext: function()         { this.sendNotification(SjamayeeFacade.OLIST_MODEL_NEXT,ObjectsListMediator.NEXT_MESSAGE_TEXT); },
  onLast: function()         { this.sendNotification(SjamayeeFacade.OLIST_MODEL_END,ObjectsListMediator.END_MESSAGE_TEXT); },
  onResizeList: function()   { this.sendNotification(SjamayeeFacade.OLIST_MODEL_RESIZE); },
  onAddObject: function()    { this.sendNotification(SjamayeeFacade.OBJECT_MODEL_ADD,this.listMediator); },
  onDeleteObject: function() { this.sendNotification(SjamayeeFacade.OBJECT_MODEL_DELETE,this.listMediator); },
  onEditObject: function()   { this.sendNotification(SjamayeeFacade.OBJECT_MODEL_EDIT,this.listMediator); },
  onUndoObject: function()   { this.sendNotification(SjamayeeFacade.OBJECT_MODEL_UNDO,this.listMediator); },
  onRedoObject: function()   { this.sendNotification(SjamayeeFacade.OBJECT_MODEL_REDO,this.listMediator); },
  onClearBuffer: function()  { this.sendNotification(SjamayeeFacade.OBJECT_MODEL_BUFFER_CLEAR,this.listMediator); },
  onEditText: function() {
    this.listMediator.setState(SjamayeeMediator.STATE_TEXT);
    this.listMediator.sendNotification(SjamayeeFacade.TEXT_EDIT,this.listMediator);
    this.listMediator.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_SHOW); //OLIST_MODEL_TEXT_EDIT);
  },
  onDeleteUnrefObjects: function() { this.sendNotification(SjamayeeFacade.OBJECT_MODEL_UNREFS_DELETE,this.listMediator); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_MODEL_TOOLBAR_SHOW
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var toolBar = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_MODEL_TOOLBAR_SHOW:
      this.hide();
      this.enableButtons();
      toolBar.setAttribute("style","display:block;");
      break;
    }
  }
/*
  enableButtons: function() {
    this.parent();
    var toolBar = this.getViewComponent();
    toolBar.setEnabled(true);
    var display = this.facade.retrieveMediator(ModelObjectsListMediator.ID).isDisplay();
    if (!display) {     
      if (toolBar.textButton) { toolBar.textButton.disabled = true; }
    }
  }
*/
});
ModelObjectsToolBarMediator.ID = "ModelObjectsToolBarMediator";

//Class: ModelRelationsToolBarMediator
var ModelRelationsToolBarMediator = new Class({
  Extends: RelationsToolBarMediator,
  initialize: function(viewComponent) {
    this.parent(ModelRelationsToolBarMediator.ID,viewComponent);
    this.gridMediator = this.facade.retrieveMediator(ModelRelationsGridMediator.ID);
    var toolBar = this.getViewComponent();
  },
  onShowParent: function()         { this.sendNotification(SjamayeeFacade.GRID_MODEL_PARENT_SHOW); },
  onShowParentAndChild: function() { this.sendNotification(SjamayeeFacade.GRID_MODEL_PARENTANDCHILD_SHOW); },
  onShowChild: function()          { this.sendNotification(SjamayeeFacade.GRID_MODEL_CHILD_SHOW); },
  onResizeGrid: function()         { this.sendNotification(SjamayeeFacade.GRID_MODEL_RESIZE); },
  onAddRelation: function() {
    this.sendNotification(SjamayeeFacade.RELATION_MODEL_ADD,this.gridMediator);
    this.sendNotification(SjamayeeFacade.GRID_SHOW);      
  },
  onDeleteRelation: function()  { this.sendNotification(SjamayeeFacade.RELATION_MODEL_DELETE,this.gridMediator); },
  onEditRelation: function() {
    this.sendNotification(SjamayeeFacade.RELATION_MODEL_EDIT,this.gridMediator);
    this.sendNotification(SjamayeeFacade.GRID_SHOW);      
  },
  onExtractRelation: function() { this.sendNotification(SjamayeeFacade.RELATION_MODEL_EXTRACT,this.gridMediator); },
  onCopyRelation: function()    { this.sendNotification(SjamayeeFacade.RELATION_MODEL_COPY,this.gridMediator); },
  onPasteRelation: function()   { this.sendNotification(SjamayeeFacade.RELATION_MODEL_PASTE,this.gridMediator); },
  onUndoRelation: function()    { this.sendNotification(SjamayeeFacade.RELATION_MODEL_UNDO,this.gridMediator); },
  onRedoRelation: function()    { this.sendNotification(SjamayeeFacade.RELATION_MODEL_REDO,this.gridMediator); },
  onClearBuffer: function()     { this.sendNotification(SjamayeeFacade.GRID_MODEL_BUFFER_CLEAR,this.gridMediator); },
  onEditText: function()        {
    this.gridMediator.setState(SjamayeeMediator.STATE_TEXT);
    this.sendNotification(SjamayeeFacade.TEXT_EDIT,this.gridMediator);
    this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_SHOW); //GRID_MODEL_TEXT_EDIT);
  },
  onResetGrid: function()       { this.sendNotification(SjamayeeFacade.GRID_MODEL_RESET,this.gridMediator); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.GRID_MODEL_TOOLBAR_SHOW,
      SjamayeeFacade.GRID_MODEL_RESIZED
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var toolBar = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.GRID_MODEL_TOOLBAR_SHOW:
      this.hide();
      this.enableButtons();
      toolBar.setAttribute("style","display:block;");
      break;
      case SjamayeeFacade.GRID_MODEL_RESIZED:
      var sizeNormal = note.getBody();
      var style = "display:"+(sizeNormal?"block":"none");
      //toolBar.childButton.setAttribute("style",style);
      //toolBar.parentAndChildButton.setAttribute("style",style);
      //toolBar.parentButton.setAttribute("style",style);
      toolBar.parentAndChildButtons.setAttribute("style",style);
      break;
    }
  }
});
ModelRelationsToolBarMediator.ID = "ModelRelationsToolBarMediator";

//Abstract
//Class: ModelTextsToolBarMediator
var ModelTextsToolBarMediator = new Class({
  Extends: TextsToolBarMediator,
  initialize: function(name,viewComponent)  {
    this.parent(name,viewComponent);
  }
});

//Class: ModelObjectsTextsToolBarMediator
var ModelObjectsTextsToolBarMediator = new Class({
  Extends: ModelTextsToolBarMediator,
  initialize: function(viewComponent) {
    this.parent(ModelObjectsTextsToolBarMediator.ID,viewComponent);
  },
  onSave: function()      { this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_SAVE); },
  onCancel: function()    { this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_CANCEL);  },
  onResize: function()    { this.sendNotification(SjamayeeFacade.OLIST_MODEL_TEXT_RESIZE);  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_MODEL_TEXT_TOOLBAR_SHOW
    ]);
  },
  handleNotification: function(note) {
    this.parent(note);
    var app = this.facade.getApplication();
    var toolBar = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_MODEL_TEXT_TOOLBAR_SHOW:
      this.hide();
      toolBar.setAttribute("style","display:block;");
      break;
    }
  }
});
ModelObjectsTextsToolBarMediator.ID = "ModelObjectsTextsToolBarMediator";

//Class: ModelRelationsTextsToolBarMediator
var ModelRelationsTextsToolBarMediator = new Class({
  Extends: ModelTextsToolBarMediator,
  initialize: function(viewComponent) {
    this.parent(ModelRelationsTextsToolBarMediator.ID,viewComponent);
  },
  onSave: function()      { this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_SAVE); },
  onCancel: function()    { this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_CANCEL); },
  onResize: function()    { this.sendNotification(SjamayeeFacade.GRID_MODEL_TEXT_RESIZE); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.GRID_MODEL_TEXT_TOOLBAR_SHOW
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var toolBar = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.GRID_MODEL_TEXT_TOOLBAR_SHOW:
      this.hide();
      toolBar.setAttribute("style","display:block;");
      break;
    }
  }
});
ModelRelationsTextsToolBarMediator.ID = "ModelRelationsTextsToolBarMediator";

//////////////////////////////////////////////////////////////////////////
//////////////////////////// DATA ENVIRONMENT ////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////// PROXIES /////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/*
//Class: DataTypeVO
var DataTypeVO = new Class({
  Extends: ModelTypeVO,
  initialize: function(id,type,name,desc,objekt,inUse) {
    try {
      this.parent(id,type,name,desc,objekt,inUse);
    } catch(error) {
      Utils.alert("DataTypeVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});
*/
//Class: DataTypeProxy
var DataTypeProxy = new Class({
  Extends: TypeProxy,
  initialize: function() {
    this.parent(DataTypeProxy.ID);
    //this.addItem(new DataTypeVO("1","type1","name1","desc1","objekt1","inUse1"));
    //Initialize data.
    //this.loadTypes();
    this.loadTypesDemo();
  },
  newBusinessObject: function(item) {
    return new DataType(item);
  },  
  getByName: function(name) {
    var result = null;
    try {
      if (name) {
        //var types = this.getTypes();
        var types = this.getListTypes();
        if (types) {
          for (var i = 0; i < types.length; i++) {
            if (types[i]) {
              var type = types[i];
              if (type.name == name) {
                result = type;
                break;
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("DataTypeProxy/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getListTypes: function() {
    var result = [];
    var types = this.parent();
    if (types.length > 0) {
      var modelEntityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);     
      //var modelEntities = modelEntityProxy.getItems();
      for (var i = 0; i < types.length; i++) {
        var type = (types[i]);
        if (type) {
          type.top = false;
          var modelEntities = modelEntityProxy.getAllByTid(type.id);
          if (modelEntities.length > 0) {
            for (var j = 0; j < modelEntities.length; j++) {
              var modelEntity = modelEntities[j];
              if (modelEntity) {
                if (modelEntity.exi === undefined || modelEntity.exi === null) {
                  type.name = modelEntity.name;
                  type.mei = modelEntity.id;
                  type.topSelect = true;
                  result.push(type);
                } else {
                  //if (modelEntity.top === true) {
                    var t2 = new TypeVO(type.id,type.type,type.code,type.name,type.desc,type.objekt,type.inUse,type.txi);
                    t2.name = modelEntity.name;
                    t2.mei = modelEntity.id;
                    t2.topSelect = true; //false; //modelEntity.top;
                    result.push(t2);
                  //}
                }
                /*if (!type.mei && type.type == modelEntity.name) {
                  type.name = modelEntity.name;
                  type.mei = modelEntity.id;
                  type.top = true;
                  type.exi = null;
                  result.push(type);
                } else {
                  //if (modelEntity.top === true) {
                    var t2 = new TypeVO(type.id,type.type,type.code,type.name,type.desc,type.objekt,type.inUse,type.txi);
                    t2.name = modelEntity.name;
                    t2.mei = modelEntity.id;
                    t2.top = modelEntity.top;
                    t2.exi = modelEntity.id;
                    result.push(t2);
                  //}
                }*/
              }
            }
          }
        }
      }
    }
    //Unique Types!
    result = this._uniqueTypes(result);
    //Sort DESCENDING
    result.sort(TypeProxy.sortName);
    return result;
  },  
  _uniqueTypes: function(types) {
    var result = [];
    try {
      if (types) {
        for (var i = 0; i < types.length; i++) {
          var typeExists = false;
          for (var j = 0; j < result.length; j++) {
            if (types[i].name == result[j].name) {
              typeExists = true;
              break;
            }
          }
          if (typeExists === false) { result.push(types[i]); }
        }
      }
    } catch(error) {
      Utils.alert("DataTypeProxy/_uniqueTypes Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }  
});
DataTypeProxy.ID = "DataTypeProxy";

//Class: DataAttributeVO
var DataAttributeVO = new Class({
  Extends: AttributeVO,
  initialize: function(id,name,value,txi) {
    //ADD (model attribute id) !!!
    //this.mai = null;
    try {
      this.parent(id,name,value,txi);
    } catch(error) {
      Utils.alert("DataAttributeVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: DataAttributeProxy
var DataAttributeProxy = new Class({
  Extends: AttributeProxy,
  initialize: function() {
    this.parent(DataAttributeProxy.ID);
    this.addItem(new DataAttributeVO("1","name1","value1"));
  },
  newBusinessObject: function(item) {
    return new DataAttribute(item);
  },
  getListObject: function(dataAttributeVO) {
    return new DataAttribute(dataAttributeVO);
  } 
});
DataAttributeProxy.ID = "DataAttributeProxy";

//Class: DataEntityVO
var DataEntityVO = new Class({
  Extends: EntityVO,
  initialize: function(id,ver,name,desc,mei,txi,oid,firstAttributes,references) {
    //this.mei = null;
    try {
      this.parent(id,ver,name,desc,txi,null,oid,firstAttributes,references);
    //if (mei !== undefined) { this.mei = mei; }
      if (mei !== undefined) { this.mei = CachingProxy.getSHA2Id(mei); }
    } catch(error) {
      Utils.alert("DataEntityVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: DataEntityProxy
var DataEntityProxy = new Class({
  Extends: EntityProxy,
  initialize: function() {
    this.parent(DataEntityProxy.ID);
    this.headerMediator = null;
    //this.addItem(new DataEntityVO("1","name1","desc1","mei1","oid1","firstAttributes1","references1"));
    //this.loadEntities();
    this.loadEntitiesDemo();
  },
  newBusinessObject: function(item) {
    return new DataEntity(item);
  },  
  loadEntities: function() {
    var entitiesText = sforce.apex.execute('sja.DataEntityService','getEntities',{});
    //entitiesText = String(entitiesText).replace("},.*{","},\n{");
    //Utils.writeFile("c:\\dataEntities.txt",entitiesText);    
    var entities = Utils.eval(entitiesText,true);
    //var entities = Utils.eval(dataEntities,true);
    var i = 0;
    while (entities.entities[i]) {
      var jso = entities.entities[i];
      /*if (i < 3) {
        var vo = new DataEntityVO(jso.id,jso.name,jso.desc,jso.mei,jso.oid,jso.firstAttributes,jso.references);
        var dataEntity = new DataEntity(vo);
      }*/
    /*switch (jso.type) {
        case "ACCT": typeType = "Account";
        break;
        case "CASE": typeType = "Case";
        break;
        case "CONT": typeType = "Contact";
        break;
        case "CNTR": typeType = "Contract";
        break;
        case "LEAD": typeType = "Lead";
        break;
        case "OPPO": typeType = "Opportunity";
        break;
        case "SOLU": typeType = "Solution";
        break;
        case "USER": typeType = "User";
        break;
        default:
        break;
      }*/
      this.addItem(new DataEntityVO(jso.id,jso.ver,jso.name,jso.desc,jso.mei,jso.txi,jso.oid,jso.firstAttributes,jso.references));
      i++;
    }
    //Sort ASCENDING
    var data = this.getData();
    data.sort(DataEntityProxy.sortName);
  },
  loadEntitiesDemo: function() {
    this.setData(new Array());
    var entities = _dataEntities.entities;
    //var entities = null;
    /*var entitiesRequest = new Request({
      url: 'http://localhost/sjamayee/sjamayee_service/data-entities.json',
      headers: {'Access-Control-Allow-Origin': '*'},
      async: false,
      onSuccess: function(text, xml) { entities = text; }
    });
    entitiesRequest.get();*/
    /*var entitiesRequest = new Request.JSON({
      url: 'http://localhost/sjamayee/sjamayee_service/data-entities.json',
      headers: {'Access-Control-Allow-Origin': '*'},
      async: false,
      onSuccess: function(entities){
        alert("DataEntityProxy/loadEntitiesDemo - entities: "+entities);
      }
    }).get();*/
    
    /*var entitiesRequest = new Request.JSONP({
        url: 'http://localhost/sjamayee/sjamayee_service/data-entities.json?callback=loadJson',
        async: false,
        //callbackKey: 'loadJson',
    }).send();*/
    
    var i = 0;
    while (entities[i]) {
      var jso = entities[i];
      this.addItem(new DataEntityVO(jso.id,jso.ver,jso.name,jso.description,jso.mei,jso.txi,jso.oid,jso.firstAttributes,jso.references));
      i++;
    }
    this.setData(this._uniqueEntities(this.getData()));
    //Sort ASCENDING
    var data = this.getData();
    data.sort(DataEntityProxy.sortName);
    return i;
    //return this.getData().length;
    
  },
  _uniqueEntities: function(entities) {
    var result = [];
    try {
      if (entities) {
        for (var i = 0; i < entities.length; i++) {
          var entity = entities[i];
          var entityExists = false;
          for (var j = 0; j < result.length; j++) {
            if (entity.id == result[j].id) {
              entityExists = true;
              break;
            }
          }
          if (entityExists === false) { result.push(entity); }
        }
      }
    } catch(error) {
      Utils.alert("DataEntityProxy/_uniqueEntities Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },    
  loadJson: function(obj) {
    var entities = obj.entities;
    var i = 0;
    while (entities[i]) {
      var jso = entities[i];
      this.addItem(new DataEntityVO(jso.id,jso.name,jso.ver,jso.desc,jso.mei,jso.txi,jso.oid,jso.firstAttributes,jso.references));
      i++;
    }
  },
  getEntities: function(typeId) {
    var result = [];
    var modelEntityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);   
    var entities = this.getItems();
    if (typeId) {
      if (entities && entities.length > 0) {
        for (var i = 0; i < entities.length; i++) {
          if (entities[i]) {
            var entity = entities[i];
            if (entity) {
              var modelEntity = modelEntityProxy.getById(entity.mei);
              if (modelEntity) {
                if (modelEntity.tid.substr(0,BusinessObject.ID_MIN_LENGTH) == typeId.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                  result.push(entity);
                }
              }
            }
          }
        }
      }
    } else {
      result = entities;
    }
    //Sort DESCENDING
    result.sort(EntityProxy.sortName);
    return result;
  },  
  getListObject: function(dataEntityVO) {
    return new DataEntity(dataEntityVO);
  },
  getHeaderMediator: function() {
    if (this.headerMediator === null) {
      this.headerMediator = SjamayeeFacade.getInstance().retrieveMediator(DataObjectsHeaderMediator.ID);
    }
    return this.headerMediator;
  },
  getAllByTid: function(tid) {
    var result = [];
    try {
      if (tid) {
        var items = this.getItems();
        if (items) {
          var modelEntityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);
          for (var i = 0; i < items.length; i++) {
            if (items[i]) {
              var item = items[i];
              var modelEntity = modelEntityProxy.getById(item.mei);
              if (modelEntity) {
                if (modelEntity.tid == tid) {
                  result.push(item);
                }
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("DataEntityProxy/getAllByTid Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
DataEntityProxy.ID = "DataEntityProxy";
DataEntityProxy.sortName = function(a,b) {
  return (a.name < b.name)?-1:1;
};

//Class: DataRelationVO
var DataRelationVO = new Class({
  Extends: RelationVO,
  initialize: function(id,ver,val,mri,pei,cei,pid,nid,txi,vir,vnv) {
    try {
      this.parent(id,ver,val,pei,cei,pid,nid,txi,null,vir,vnv);
      if (mri !== undefined) { this.mri = CachingProxy.getSHA2Id(mri); }
    } catch(error) {
      Utils.alert("DataRelationVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});

//Class: DataRelationProxy
var DataRelationProxy = new Class({
  Extends: RelationProxy,
  initialize: function() {
    this.parent(DataRelationProxy.ID);
    //this.addItem(new DataRelationVO("1","mri1","val1","pei1","cei1","pid1","nid1"));
    //this.loadRelations();
    this.loadRelationsDemo();
  },
  newBusinessObject: function(item) {
    return new DataRelation(item);
  },
  loadRelations: function() {
    var relationsText = sforce.apex.execute('sja.DataRelationService','getRelations',{});
    //relationsText = String(relationsText).replace("},.*{","},\n{");
    //Utils.writeFile("c:\\dataRelations.txt",relationsText);
    var relations = Utils.eval(relationsText,true); 
    //var relations = Utils.eval(dataRelations,true);
    var i = 0;
    while (relations.relations[i]) {
      var jso = relations.relations[i];
      this.addItem(new DataRelationVO(jso.id,jso.ver,jso.name,jso.mri,jso.pei,jso.cei,jso.pid,jso.nid));
      i++;
    }
  },
  loadRelationsDemo: function() {
    this.setData(new Array());
    var relations = _dataRelations.relations;
    //var relations = null;
    /*var relationsRequest = new Request({
      url: 'http://localhost/sjamayee/sjamayee_service/data-relations.json',
      headers: {'Access-Control-Allow-Origin': '*'},
      async: false,
      onSuccess: function(text, xml) { relations = text; }
    });
    relationsRequest.get();*/
    /*var relationsRequest = new Request.JSON({
      url: 'http://localhost/sjamayee/sjamayee_service/data-relations.json',
      headers: {'Access-Control-Allow-Origin': '*'},
      async: false,
      onSuccess: function(relations){
        alert("DataRelationProxy/loadRelationsDemo - relations: "+relations);
      }
    }).get();*/
    
    /*var relationsRequest = new Request.JSONP({
        url: 'http://localhost/sjamayee/sjamayee_service/data-relations.json?callback=loadJson',
        async: false,
        //callbackKey: 'loadJson',
    }).send();*/
    
    var i = 0;
    while (relations[i]) {
      var jso = relations[i];
      this.addItem(new DataRelationVO(jso.id,jso.ver,jso.name,jso.mri,jso.pei,jso.cei,jso.pid,jso.nid));
      i++;
    }
    return i;
    //return this.getData().length;
  },
  loadJson: function(obj) {
    var relations = obj.relations;
    var i = 0;
    while (relations[i]) {
      var jso = relations[i];
      this.addItem(new DataRelationVO(jso.id,jso.ver,jso.name,jso.mri,jso.pei,jso.cei,jso.pid,jso.nid));
      i++;
    }
  },
  getParentRelations: function(eid,number,sort,instantModelEntity,nivo) {
    var result = [];
    try {
      var _eid = (eid !== undefined)?eid:null;
      var _number = (number !== undefined && number !== null)?number:RelationsGridMediator.PAGE_SIZE_MAX; //(xxx*SjamayeeFacade.PAGE_MULTIPLIER);
      var _sort = (sort !== undefined && sort !== null)?sort:Cache.SORT_ASCENDING;
      var _instantModelEntity = (instantModelEntity !== undefined)?instantModelEntity:null;                   
      var _nivo = (nivo !== undefined)?nivo:null;
      var relations = new UniqueQueue();
      if (_eid) {
        var dataEntity = DataEntity.getById(_eid);
        if (dataEntity) {
          /*ONLY FOR TEST !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //if (nivo && nivo < (Position.NIVO_ROOT() - 1)) {
            if (_instantModelEntity) {
              if (dataEntity) {
                if (_instantModelEntity.getMei() != dataEntity.getMei()) {
                  var r0 = new DataRelation(new DataRelationVO(null,0,'',_instantModelEntity.getMei(),dataEntity.getId(),dataEntity.getId())); //,null,null));
                  //For real relations ids are OK - for virtual set objects !!!
                  //r0.setModelRelation(ModelRelation.getById(_instantModelEntity.getMei()));
                  //r0.setParentEntity(dataEntity);
                  //r0.setChildEntity(dataEntity);
                  r0.setSomeKey(r0.getPei()+_instantModelEntity.getMei()); //Unique ID!
                  //relations.put(r0.getPei(),r0);
                  relations.put(r0.getSomeKey(),r0);
                }
              }
            }
          //} //ONLY FOR TEST !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //TODO: Read VIRTUAL relations AND REAL relations for CMS.PROJ (if type is instantModelType/has reference in Model Relations)        
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //var cache = this.getItems();
          var cache = this.getItems(_nivo); //Nivo (-1/0/1) for selecting the virtualItems.
          if (cache) {
            for (var i = 0; i < cache.length; i++) {
              if (_number <= 0) { break; }
              var r = cache[i];
              if (r) {
                if (r.cei) {
                  if (r.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == dataEntity.getId()) {
                    if (_instantModelEntity) {
                      var dr1 = new DataRelation(r);
                      if (dr1) {
                        var mr1 = dr1.getModelRelation();
                        if (mr1) {
                          var childModelEntity = mr1.getChildEntity();
                          if (childModelEntity === null) { continue; }
                          if (childModelEntity.getId() != _instantModelEntity.getId()) { continue; }
                        }
                        //Set a (unique) key for the list!
                        var someKey = dr1.getSomeKey();
                        if (someKey === null) { someKey = dr1.getPei(); }
                        if (someKey === null) { someKey = CachingProxy.getNextVirtualId(); }
                        relations.put(someKey,dr1);
                        _number--;                      
                      }
                    }
                  }
                }
              }
            }
          }
/*
          //Call WebService 
          //if (relations.getSize() < _number) {
          if (relations.getSize() == 0) {
            relations.clear();
            var entityRelationsText = sforce.apex.execute('sja.DataRelationService','getParentRelations',{'entityId':dataEntity.getId(),'size':_number});
            var entityRelations = Utils.eval(entityRelationsText,true);       
            var rs = entityRelations.relations;
            var i = 0;
            while (rs[i]) {
              var jso = rs[i];
              var rvo = new DataRelationVO(jso.id,jso.ver,jso.name,jso.mri,jso.pei,jso.cei,jso.pid,jso.nid);
              //this.addItem(rvo);          
              var dr1 = new DataRelation(rvo);
              dr1.setSomeKey(dr1.getPei()+dataEntity.getModelEntity().getId()); //Unique ID!
              relations.put(dr1.getSomeKey(),dr1);
              i++;
            }       
          }
*/
        }
        result = relations.getAll();
        /*var namesSorted = this.parentNamesSorted(relations.getAll(),_sort);
        if (namesSorted) {
          result = this.sort("PARENT",relations.getAll(),namesSorted);
        }*/
      }
    } catch(error) {
      Utils.alert("DataRelationProxy/getParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getChildRelations: function(eid,number,sort,instantModelEntity,nivo) {
    var result = [];
    try {
      var _eid = (eid !== undefined)?eid:null;
      var _number = (number !== undefined && number !== null)?number:RelationsGridMediator.PAGE_SIZE_MAX; //(xxx*SjamayeeFacade.PAGE_MULTIPLIER);
      var _sort = (sort !== undefined && sort !== null)?sort:Cache.SORT_ASCENDING;
      var _instantModelEntity = (instantModelEntity !== undefined)?instantModelEntity:null;     
      var _nivo = (nivo !== undefined)?nivo:null;
      var dataEntityProxy = SjamayeeFacade.getInstance().retrieveProxy(DataEntityProxy.ID);
      var modelEntityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);
      var modelRelationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
      var relations = new UniqueQueue();
      if (_eid) {
        var dataEntity = DataEntity.getById(_eid);
        if (dataEntity) {
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //TODO: Read VIRTUAL relations AND REAL relations for CMS.PROJ (if type is instantModelType/has reference in Model Relations)        
          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //var cache = this.getItems();
            var cache = this.getItems(_nivo); //Nivo (-1/0/1) for selecting the virtualItems.
            if (cache) {
              for (var i = 0; i < cache.length; i++) {
                if (_number <= 0) { break; }
                var r = cache[i];
                if (r) {
                  if (r.pei) {
                    if (r.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == dataEntity.getId()) {
                      if (_instantModelEntity) {
                        var dr1 = new DataRelation(r);
                        if (dr1) {
                          var mr1 = dr1.getModelRelation();
                          if (mr1) {
                            var parentModelEntity = mr1.getParentEntity();
                            if (parentModelEntity === null) { continue; }
                            if (parentModelEntity.getId() != _instantModelEntity.getId()) { continue; }
                          }
                        }
                        //Set a (unique) key for the list!
                        var someKey = dr1.getCei();
                        if (someKey === null) {
                          someKey = CachingProxy.getNextVirtualId();
                        }
                        relations.put(someKey,dr1);
                        _number--;                        
                      }
                    }
                  }
                }
              }
            }
/*
            //Call WebService 
            //if (relations.getSize() < _number) {
            if (relations.getSize() == 0) {
              relations.clear();
              var entityRelationsText = sforce.apex.execute('sja.DataRelationService','getChildRelations',{'entityId':dataEntity.getId(),'size':_number});
              var entityRelations = Utils.eval(entityRelationsText,true);
              var rs = entityRelations.relations;
              var i = 0;
              while (rs[i]) {
                var jso = rs[i];
                var rvo = new DataRelationVO(jso.id,jso.ver,jso.name,jso.mri,jso.pei,jso.cei,jso.pid,jso.nid);
                var r1 = new DataRelation(rvo);
                relations.put(r1.getCei(),r1);
                i++;
              }       
            }
          //}
*/
        }
        result = relations.getAll();
        /*var namesSorted = this.childNamesSorted(relations.getAll(),_sort);
        if (namesSorted) {
          result = this.sort("CHILD",relations.getAll(),namesSorted);
        }*/
      }
    } catch(error) {
      Utils.alert("DataRelationProxy/getChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getFirstRelationForEntity: function(entity,instantModelEntity,parentOrChild) {
    var _entity = (entity !== undefined)?entity:null;
    var _instantModelEntity = (instantModelEntity !== undefined)?instantModelEntity:null;
    var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;    
    var modelEntityProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelEntityProxy.ID);
    var modelRelationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
    var result = null;
    try {
      if (_entity) {
        var relations = this.getItems();
        if (relations) {
          var dataEntity = new DataEntity(_entity);
          for (var i = 0; i < relations.length; i++) {
            if (relations[i]) {
              var r1 = relations[i];
              if (r1) {
                var modelRelationVO = null;
                var selected = false;                
                if (_parentOrChild === null || _parentOrChild == RelationB.CHILD) {
                  if (r1.cei && r1.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == dataEntity.getId()) {
                    if (_instantModelEntity) {
                      modelRelationVO = modelRelationProxy.getById(r1.mri);
                      if (modelRelationVO) {
                        selected = (modelRelationVO.cei && modelRelationVO.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == _instantModelEntity.getId())?true:false;
                      }
                    } else {
                      selected = true;
                    }
                  }
                }                
                if (selected === false && (_parentOrChild === null || _parentOrChild == RelationB.PARENT)) {
                  if (r1.pei && r1.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == dataEntity.getId()) {
                    if (_instantModelEntity) {
                      modelRelationVO = modelRelationProxy.getById(r1.mri);
                      if (modelRelationVO) {
                        selected = (modelRelationVO.pei && modelRelationVO.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == _instantModelEntity.getId())?true:false;
                      }
                    } else {
                      selected = true;
                    }
                  }
                  }
                if (selected === true) {
                  result = r1;
                  break;
                }
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("DataRelationProxy/getFirstRelationForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },  
  getRelationsForEntity: function(entity,modelEntityId,parentOrChild) {
    var _entity = (entity !== undefined)?entity:null;
    var _modelEntityId = (modelEntityId !== undefined)?modelEntityId:null;
    var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;
    var modelRelationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
    var result = [];
    try {
      if (_entity) {
        var relations = this.getItems();
        for (var i = 0; i < relations.length; i++) {
          var relation = relations[i];
          if (relation) {
            var selected = false;
            var modelRelationVO = null;
            if (_parentOrChild === null || _parentOrChild == RelationB.CHILD) {
              if (relation.cei && relation.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == _entity.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                if (_modelEntityId) {
                  modelRelationVO = modelRelationProxy.getById(relation.mri);
                  if (modelRelationVO) {
                    selected = (modelRelationVO.cei && modelRelationVO.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == _modelEntityId)?true:false;
                    /*if (selected === false) { //ONLY TEST - NOT NEEDED!
                      var modelChildEntity = ModelEntity.getById(modelRelationVO.cei);
                      if (modelChildEntity) {
                        alert("DataRelationProxy/getRelationsForEntity - child/NOK!");
                      }
                    }*/
                  }
                } else {
                  selected = true;
                }
              }
            }
            if (selected === false && (_parentOrChild === null || _parentOrChild == RelationB.PARENT)) {
              if (relation.pei && relation.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == _entity.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                if (_modelEntityId) {
                  modelRelationVO = modelRelationProxy.getById(relation.mri);
                  if (modelRelationVO) {
                    selected = (modelRelationVO.pei && modelRelationVO.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == _modelEntityId)?true:false;
                    /*if (selected === false) { //ONLY TEST - NOT NEEDED!
                      var modelParentEntity = ModelEntity.getById(modelRelationVO.pei);
                      if (modelParentEntity) {
                        alert("DataRelationProxy/getRelationsForEntity - parent/NOK!");
                      }
                    }*/
                  }
                } else {
                  selected = true;
                }
              }
            }
            if (selected === true) {
              result.push(relation);
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("DataRelationProxy/getRelationsForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getFirstRelationForModelRelation: function(modelRelation,dataEntity,modelEntity,parentOrChild) {
    var _modelRelation = (modelRelation !== undefined)?modelRelation:null;
    var _dataEntity = (dataEntity !== undefined)?dataEntity:null;
    var _modelEntity = (modelEntity !== undefined)?modelEntity:null;
    var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;    
    var result = null;
    try {
      if (_modelRelation) {
        var relations = this.getItems();
        for (var i = 0; i < relations.length; i++) {
          var r1 = relations[i];
          if (r1) {
            if (r1.mri.substr(0,BusinessObject.ID_MIN_LENGTH) == _modelRelation.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
              if (_parentOrChild === null || _parentOrChild == RelationB.CHILD) {
                if (_modelEntity && _modelRelation.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == _modelEntity.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                  if (_dataEntity && _dataEntity.id.substr(0,BusinessObject.ID_MIN_LENGTH) == r1.cei.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                    result = r1;
                    break;
                  }
                }
              }
              if (_parentOrChild === null || _parentOrChild == RelationB.PARENT) {
                if (_modelEntity && _modelRelation.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == _modelEntity.id.substr(0,BusinessObject.ID_MIN_LENGTH))  {
                  if (_dataEntity && _dataEntity.id.substr(0,BusinessObject.ID_MIN_LENGTH) == r1.pei.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                    result = r1;
                    break;
                  }
                }
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("DataRelationProxy/getFirstRelationForModelRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getRelationsForModelRelation: function(modelRelation,dataEntity,modelEntity,parentOrChild) {
    var _modelRelation = (modelRelation !== undefined)?modelRelation:null;
    var _dataEntity = (dataEntity !== undefined)?dataEntity:null;
    var _modelEntity = (modelEntity !== undefined)?modelEntity:null;
    var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;    
    var result = [];
    try {
      if (_modelRelation) {
        var relations = this.getItems();
        for (var i = 0; i < relations.length; i++) {
          var r1 = relations[i];
          if (r1) {
            if (r1.mri.substr(0,BusinessObject.ID_MIN_LENGTH) == _modelRelation.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
              if (_parentOrChild === null || _parentOrChild == RelationB.CHILD) {
                if (_modelEntity && _modelRelation.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == _modelEntity.id.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                  if (_dataEntity && _dataEntity.id.substr(0,BusinessObject.ID_MIN_LENGTH) == r1.cei.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                    result.push(r1);
                  }
                }
              }
              if (_parentOrChild === null || _parentOrChild == RelationB.PARENT) {
                if (_modelEntity && _modelRelation.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == _modelEntity.id.substr(0,BusinessObject.ID_MIN_LENGTH))  {
                  if (_dataEntity && _dataEntity.id.substr(0,BusinessObject.ID_MIN_LENGTH) == r1.pei.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                    result.push(r1);
                  }
                }
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("DataRelationProxy/getRelationsForModelRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  parentNamesSorted: function(relations,sort) {
    var result = [];
    try {
      var _sort = (sort !== undefined && sort !== null)?sort:Cache.SORT_ASCENDING;
      for (var i = 0; i < relations.length; i++) {
        var relation = relations[i];
        if (relation) {
          if (relation.hasParent()) {
            var entity = relation.getParentEntity();
            if (entity) {
              var name = '';
              if (entity.getName()) {
                if (entity.getName().length > 0) {
                  name = entity.getName()+"/"+relation.getId();
                  if (name) {
                    result.push(name);
                  }
                }
              }
            }  
          }    
        }
      }
      //Sort DESCENDING
      //result.sort(Utils.sortAscending);
      result.sort(DataRelationProxy.sortValue);
      if (_sort == Cache.SORT_DESCENDING) {
        result.reverse();
      }
    } catch(error) {
      Utils.alert("DataRelationProxy/parentNamesSorted Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  sort: function(poc,relations,namesSorted) {
    var result = [];
    try {
      if (relations) {
        if (namesSorted) {
          while (namesSorted.length > 0) {
            var name = namesSorted.shift();
            for (var i = 0; i < relations.length; i++) {
              var r = relations[i];
              if (r) {
                if (poc == 'CHILD') {
                  if (r.getId() == name) {
                    result.push(r);
                    break;
                  }
                } else {
                  if (r.getPei()) {
                    var pe = DataEntity.getById(r.getPei());
                    if (pe) {
                      var r_name = pe.getName()+"/"+r.getId();
                      if (r_name == name) {
                        result.push(r);
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } catch(error) {
      Utils.alert("DataRelationProxy/sort Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }  
});
DataRelationProxy.ID = "DataRelationProxy";
DataRelationProxy.sortValue = function(a,b) {
  return (a.val < b.val)?-1:1;  
};

/*
//Class: DataListObjectProxy
var DataListObjectProxy = new Class({
  Extends: CachingProxy,
  initialize: function() {
    this.parent(DataListObjectProxy.ID, new Array());
    this.addItem(new DataListObjectVO("object1"));
  },
  initialize: function() {
    this.parent(DataEntityProxy.ID, new Array());
    //this.addItem(new DataEntityVO("1","name1","desc1","mei1","oid1","firstAttributes1","references1"));
    this.loadListObjects();
  },
  loadListObjects: function() {
    var objectsText = sforce.apex.execute('sja.DataEntityService','getEntities',{});
    var objects = Utils.eval(objectsText,true);
    var i = 0;
    while (objects.entities[i]) {
      var jso = objects.entities[i];
      **if (i < 3) {
        var vo = new DataEntityVO(jso.id,jso.name,jso.desc,jso.mei,jso.oid,jso.firstAttributes,jso.references);
        var dataEntity = new DataEntity(vo);
      }**
    **switch (jso.type) {
        case "ACCT": typeType = "Account";
        break;
        case "CASE": typeType = "Case";
        break;
        case "CONT": typeType = "Contact";
        break;
        case "CNTR": typeType = "Contract";
        break;
        case "LEAD": typeType = "Lead";
        break;
        case "OPPO": typeType = "Opportunity";
        break;
        case "SOLU": typeType = "Solution";
        break;
        case "USER": typeType = "User";
        break;
        default:
        break;
      }**
      this.addItem(new DataEntityVO(jso.id,jso.name,jso.desc,jso.mei,jso.oid,jso.firstAttributes,jso.references));
      i++;
    }
  }
});
DataListObjectProxy.ID = "DataListObjectProxy";

//Class: DataListObjectVO
var DataListObjectVO = new Class({
  Extends: CachedObjectVO,
  
  this.object = null,
  
  initialize: function(object) {
    try {
      this.parent(object.getId()); //TODO: garantie object !== null !!!
      if (object)
        this.object = object;
    } catch(error) {
      Utils.alert("DataListObjectVO/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  }
});
*/

//////////////////////////////////////////////////////////////////////////
//////////////////////////// BUSINESS CLASSES ////////////////////////////
//////////////////////////////////////////////////////////////////////////

//Class: DataType
var DataType = new Class({
  Extends: Type, //ModelType,
  initialize: function(vo) {
    this.parent(vo);
    //this.proxy = SjamayeeFacade.getInstance().retrieveProxy(DataTypeProxy.ID);    
  }
/*,
  //Getters & Setters
  getDataTypeVO: function() {
    return new DataTypeVO(this.getId(),this.getType(),this.getName(),this.getDesc(),this.getObjekt(),this.getInUse());
  },
  print: function(html,keysOnly) {
    var _html = (html !== undefined && html !== null)?html:false;
    var _keysOnly = (keysOnly !== undefined && keysOnly !== null)?keysOnly:false;
    var _nl = (_html)?'<br/>':'\n';
    var result = '\nDataType:'+_nl;
    try {
      result += this.parent();
    } catch(error) {
      Utils.alert("DataType/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }*/
});
//Statics
DataType.ALL_TYPES = "---- ALL CLASSES ----";
DataType.getById = function(id) {
  var _id = (id !== undefined)?id:null;
  var result = null;
  try {
    if (_id) {
      var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(DataTypeProxy.ID);
      var t1 = typeProxy.getById(_id);
      if (t1) { result = new DataType(t1); }
    }
  } catch(error) {
    Utils.alert("DataType/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
DataType.getByName = function(name) {
  var _name = (name !== undefined)?name:null;
  var result = null;
  try {
    if (_name) {
      var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(DataTypeProxy.ID);
      var t1 = typeProxy.getByName(_name);
      if (t1) { result = new DataType(t1); }
    }
  } catch(error) {
    Utils.alert("DataType/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
DataType.getByType = function(type) {
  var _type = (type !== undefined)?type:null;
  var result = null;
  try {
    if (_type) {
      var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(DataTypeProxy.ID);
      var t1 = typeProxy.getByType(_type);
      if (t1) { result = new DataType(t1); }
    }
  } catch(error) {
    Utils.alert("DataType/getByType Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
DataType.getByCode = function(code) {
  var _code = (code !== undefined)?code:null;
  var result = null;
  try {
    if (_code) {
      var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(DataTypeProxy.ID);
      var t1 = typeProxy.getByCode(_code);
      if (t1) { result = new DataType(t1); }
    }
  } catch(error) {
    Utils.alert("DataType/getByCode Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
DataType.getTypes = function() {
  var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(DataTypeProxy.ID);
  return typeProxy.getTypes();
};
//TODO: Select only referenced types *** USED !!! ***
DataType.getTypeOptions = function(type_code_name) {
  var _type_code_name = type_code_name?type_code_name:'';   
  var result = '<option selected="selected">'+DataType.ALL_TYPES+'</option>';   
  var typeProxy = SjamayeeFacade.getInstance().retrieveProxy(DataTypeProxy.ID);
  var types = typeProxy.getListTypes();
  var typeSelected = _type_code_name;
  var typeSelectPrefixed = false;
  //First pass-through for determining typeSelectPrefix!
  for (var i = 0; i < types.length; i++) {
    var t1 = types[i];
    if (t1) {
      var type = new Type(t1);
      if (type) {
        //if (type.inUse() === false) { continue; }
        var modelEntity = type.getModelEntity();
        if (modelEntity) {
          if (modelEntity.isBaseModelForMultiType()) {
            typeSelectPrefixed = true;
            break;
          }
        }
      }
    }
  }
  //Second pass-through for building the type options!
  for (var i = 0; i < types.length; i++) {
    var t1 = types[i];
    if (t1) {
      var type = new Type(t1);
      if (type) {
        //if (type.inUse() === false) { continue; }
        var modelEntity = type.getModelEntity();
        if (modelEntity) {
          var optionTag = '<option';
          optionTag += (typeSelected == type.getName())?' selected="selected"':'';
          optionTag += '>';
          var baseTypeFlag = '';
          if (typeSelectPrefixed === true) {
            for (var j = 0; j < RelationsHeader.TYPE_SELECT_PREFIX_LENGTH; j++) {
              baseTypeFlag += '&nbsp;';
            }
          }
          if (modelEntity.isBaseModelForMultiType()) {
            baseTypeFlag = RelationsHeader.TYPE_SELECT_PREFIX;
          }
          //var baseTypeCode = (modelEntity.getCode() === null)?' <'+modelEntity.getType().getCode()+'>':'';
          var baseTypeCode = (modelEntity.getSuperClass() === null)?' <'+modelEntity.getType().getCode()+'>':'';
          result += optionTag+baseTypeFlag+type.getName()+baseTypeCode+'</option>';
        }
      }
    }
  }  
  var relationsHeaderMediator = SjamayeeFacade.getInstance().retrieveMediator(DataRelationsHeaderMediator.ID);
  if (relationsHeaderMediator) {
    relationsHeaderMediator.getViewComponent().setTypeSelectPrefixed(typeSelectPrefixed);
  }
  return result;
};

//Class: DataAttribute
var DataAttribute = new Class({
  Extends: AttributeB,
  initialize: function(vo) {
    try {
      if (vo === undefined) { vo = new DataAttributeVO(); }
      this.parent(vo);
      this.proxy = SjamayeeFacade.getInstance().retrieveProxy(DataAttributeProxy.ID);
    } catch(error) {
      Utils.alert("DataAttribute/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  getAttributeVO: function() {
    //return new DataAttributeVO(this.getId(),this.getName(),this.getValue());
    return this.vo;
  },
  //Functions
  clone: function() {
    var result = null;
    try {
      result = new DataAttribute(this.getAttributeVO());
      if (result) {
        var properties = Utils.eval(this,false); //true);
        if (properties) {
           for (var key = 0; key < properties.length; key++) {
             result[key] = properties[key];
          }
        }
      }
    } catch(error) {
      Utils.alert("DataAttribute/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }, 
  print: function() {
    var result = null;
    try {
      result = "\nDataAttribute:"; // - sid: "+this.getSid()+"\n";
      result += "\nid="+this.getId()+"\nname="+this.getName()+"\nvalue="+this.getValue();
    } catch(error) {
      Utils.alert("DataAttribute/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});

//Class: DataEntity
var DataEntity = new Class({
  Extends: EntityB,
  initialize: function(vo) {
    try {
      if (vo === undefined) { vo = new DataEntityVO(); }
      this.parent(vo);
      this.proxy = SjamayeeFacade.getInstance().retrieveProxy(DataEntityProxy.ID);
      if (vo) {
        this.setMei(vo.mei);
      }
    } catch(error) {
      Utils.alert("DataEntity/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  getEntityVO: function() {
    //return new DataEntityVO(this.getId(),this.getVersion(),this.getName(),this.getDesc(),this.getMei(),this.getTxi(),this.getOid(),this.getFirstAttributes(),this.getReferences());
    return this.vo;
  },
  getMei: function() {
    if (this.vo.mei === undefined) {
      this.vo.mei = null;
    }
    return (this.vo.mei)?this.vo.mei.substr(0,BusinessObject.ID_MIN_LENGTH):this.vo.mei;
  },
  setMei: function(mei) {
    if (mei !== undefined) {
      this.vo.mei = mei;
      if (this.vo.mei) {
        this.vo.mei = CachingProxy.getSHA2Id(this.vo.mei);
      }
    }
  },
  getModelEntity: function() {
    if (this.modelEntity === undefined) {
      this.modelEntity = ModelEntity.getById(this.getMei());
    }
    return this.modelEntity;
  },
  getBaseModelEntity: function() {
    return this.getModelEntity().getBaseModelEntity();
  },
  isA: function(mei) {
    return (mei)?this.getModelEntity().isA(mei):false;
  },
  getSuperClassModel: function() {
    return this.getModelEntity().getSuperClass();
  },
  /*getSubClassModel: function() {
    return this.getModelEntity().getSubClass();
  },*/
  getSubClassModels: function() {
    return this.getModelEntity().getSubClasses();
  },
  inClass: function(modelEntity,subModelEntities,parentOrChild) {
    var _modelEntity = (modelEntity !== undefined)?modelEntity:null;
    var _subModelEntities = (subModelEntities !== undefined)?subModelEntities:null;
    var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;
    var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
    var subModelEntity = null;
    var relations = null;
    if (_modelEntity) {
      if (_subModelEntities === null) { _subModelEntities = _modelEntity.getSubClasses(); }
      if (_subModelEntities && _subModelEntities.length > 0) {
        for (var i = 0; i < _subModelEntities.length; i++) {
          subModelEntity = _subModelEntities[i];
          if (subModelEntity) {
            relations = relationProxy.getRelationsForEntity(this.getEntityVO(),subModelEntity.getId(),_parentOrChild);
            if (relations && relations.length > 0) { break; }
            var subModelEntity1 = this.inClass(subModelEntity,null,_parentOrChild);
            subModelEntity = (subModelEntity1 === null)?null:subModelEntity;
          }
          if (subModelEntity) { break; }
        }
      }
    }
    return subModelEntity;
  },
  getModelType: function() {
    if (this.modelType === undefined) {
      var modelEntity = this.getModelEntity();
      if (modelEntity) {
        this.modelType = modelEntity.getType();
      } else {
        //!!! *** DO NOT MODIFY THIS *** - VERIFY IF STILL NEEDED !!!
        this.modelType = Type.getById(this.getMei());
      }
    }
    return this.modelType;
  },
  isSingleType: function() {
    if (this.singleType === undefined) {
      this.singleType = true;
      var modelEntityId = null;
      if (this.getInstantModelEntity()) {
        modelEntityId = this.getInstantModelEntity().getId();
      }
      var modelRelationProxy = SjamayeeFacade.getInstance().retrieveProxy(ModelRelationProxy.ID);
      var dataRelationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
      var dataRelations = dataRelationProxy.getRelationsForEntity(this.getEntityVO()); //,null,RelationB.PARENT);
      if (dataRelations) {
        for (var j = 0; j < dataRelations.length; j++) {
          var dr1 = dataRelations[j];
          if (dr1) {
            var mr1 = modelRelationProxy.getById(dr1.mri);
            if (mr1) {
              if (mr1.pei && dr1.pei && dr1.pei.substr(0,BusinessObject.ID_MIN_LENGTH) == this.getId()) {
                if (modelEntityId === null) {
                  modelEntityId = mr1.pei;
                } else if (modelEntityId.substr(0,BusinessObject.ID_MIN_LENGTH) != mr1.pei.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                  this.singleType = false;
                  break;
                }
              }
              if (mr1.cei && dr1.cei && dr1.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == this.getId()) {
                if (modelEntityId === null) {
                  modelEntityId = mr1.cei;
                } else if (modelEntityId.substr(0,BusinessObject.ID_MIN_LENGTH) != mr1.cei.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                  this.singleType = false;
                  break;
                }
              }
            }
          }
        }
      }
      /*if (this.singleType === true) {
        //dataRelations = dataRelationProxy.getRelationsForEntity(this,null,RelationB.CHILD);
        if (dataRelations) {
          for (var j = 0; j < dataRelations.length; j++) {
            var dr1 = dataRelations[j];
            if (dr1) {
              var mr1 = modelRelationProxy.getById(dr1.mri);
              if (mr1) {
                if (dr1.cei && dr1.cei.substr(0,BusinessObject.ID_MIN_LENGTH) == this.getId()) {
                  if (modelEntityId === null) {
                    modelEntityId = mr1.cei;
                  } else if (modelEntityId.substr(0,BusinessObject.ID_MIN_LENGTH) != mr1.cei.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                    this.singleType = false;
                    break;
                  }
                }
              }
            }
          }
        }
      }*/
    }
    return this.singleType;
  },
  getInstantModelEntity: function(relation,parentOrChild) {
    var _relation = (relation !== undefined)?relation:null;   
    var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;
    var result = null;
    var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);      
    if (_relation === null) {
      //_relation = relationProxy.getFirstRelationForEntity(this.getEntityVO());
      var relations = relationProxy.getRelationsForEntity(this.getEntityVO());
      if (relations && relations.length > 0) {
        var modelRelationId = null;
        for (var i = 0; i < relations.length; i++) {
          var r1 = relations[i];
          if (r1) {
            if (r1.mri) {
              if (modelRelationId === null) { modelRelationId = r1.mri; }
              if (modelRelationId.substr(0,BusinessObject.ID_MIN_LENGTH) != r1.mri.substr(0,BusinessObject.ID_MIN_LENGTH)) {
                _relation = null;
                break;
              }
              _relation = r1;
            }
          }
        }
      }
    }
    if (_relation) {
      var dataRelation = new DataRelation(_relation);
      var modelRelation = dataRelation.getModelRelation();
      if (modelRelation) {
        if (_parentOrChild === null || _parentOrChild == RelationB.CHILD) {
          if (dataRelation.getCei() && dataRelation.getCei() == this.getId()) {
            result = modelRelation.getChildEntity();
          }
        }
        if (result === null) { 
          if (_parentOrChild === null || _parentOrChild == RelationB.PARENT) {
            if (dataRelation.getPei() && dataRelation.getPei() == this.getId()) {
              result = modelRelation.getParentEntity();
            }
          }
        }
      }
    }
    return result;
  },
  //Functions
  hasRelations: function(modelEntityId) {
  //var relations = DataRelation.getRelationsForEntity(this,modelEntityId);    
  //return (relations && relations.length > 0)?true:false;
    var modelEntity = ModelEntity.getById(modelEntityId);
    var relation = DataRelation.getFirstRelationForEntity(this.getEntityVO(),modelEntity);
    return (relations)?true:false; 
  },  
  clone: function() {
    var result = null;
    try {
      result = new DataEntity(this.getEntityVO());
      if (result) {
        var properties = Utils.eval(this,false); //true);
        if (properties) {
           for (var key = 0; key < properties.length; key++) {
             result[key] = properties[key];
          }
        }
      }
    } catch(error) {
      Utils.alert("DataEntity/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },  
  print: function() {
    var result = null;
    try {
      //var attributeList = this.getAttributeList();
      result = "\nDataEntity:"; // - sid: "+this.getSid()+"\n";
      result += "\nid="+this.getId()+"\nname="+this.getName()+"\ndesc="+this.getDesc()+"\nmei="+this.getMei()+"\noid="+this.getOid();
    /*var t1 = this.getType();
      if (t1) {
        result += "\nsjamayee: "+t1.isSjamayee();
      }
      result += "\nexpanded: "+this.isExpanded();
      result += "\nscrollable: "+this.isScrollable();
      result += "\nreferences: "+this.getReferences();
      result += "\nreads: "+this.getReads();
      result += "\nattributes:\n";
      var attributeNames = this.getAttributeNames();
      if (attributeNames) {
        var attributeValues = this.attributeValues; //ATTENTION: RECURSION !!! DON'T USE method: getAttributeValues()
        if (attributeValues) {
          for (var i in attributeValues) {
            if (attributeValues[i]) {
              var attribute = attributeValues[i];
              result += "\n"+attribute.n+": "+attribute.v;
            }
          }
        }
      }
      **            "\nAttributeList:"+
      "\nsize: "+attributeList.getMaximumSize()+
      "\neod: "+attributeList.getEndOfData();**   */
    } catch(error) {
      Utils.alert("DataEntity/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
DataEntity.getById = function(id) {
  var _id = (id !== undefined)?id:null;
  var result = null;
  try {
    if (_id) {
      var entityProxy = SjamayeeFacade.getInstance().retrieveProxy(DataEntityProxy.ID);
      var e1 = entityProxy.getById(_id);
      if (e1) { result = new DataEntity(e1); }
    }
  } catch(error) {
    Utils.alert("DataEntity/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    //alert("DataEntity/getById - result: "+result.print());
    return result;
  }
};
DataEntity.getByName = function(name) {
  var _name = (name !== undefined)?name:null;
  var result = null;
  try {
    if (_name) {
      var entityProxy = SjamayeeFacade.getInstance().retrieveProxy(DataEntityProxy.ID);
      var e1 = entityProxy.getByName(_name);
      if (e1) { result = new DataEntity(e1); }
    }
  } catch(error) {
    Utils.alert("DataEntity/getByName Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
DataEntity.getEntities = function() {
  var entityProxy = SjamayeeFacade.getInstance().retrieveProxy(DataEntityProxy.ID);
  return entityProxy.getItems();
};
DataEntity.getEntityOptions = function(type_code_name,currentEntityName,filterValue,filterCase) {
  var _type_code_name = (type_code_name !== undefined && type_code_name !== DataType.ALL_TYPES)?type_code_name:null;
  var _filterValue = filterValue?filterValue:"";
  var _filterCase = (filterCase !== undefined && filterCase !== null)?filterCase:false;
  var entityProxy = SjamayeeFacade.getInstance().retrieveProxy(DataEntityProxy.ID);
  var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
  var result = '';
  var entitySelectPrefixed = false; 
  try {
    var type = _type_code_name?DataType.getByName(_type_code_name):null;
    //var typeId = modelEntity.getBaseModelEntity().getType().getId()
    var modelEntity = (type)?type.getModelEntity():null;
    //MultiType - Only for multitypes (ex. CDAT,PROJ,RSRC and ALL)!!!
    var multiType = (modelEntity && modelEntity.isBaseModelForMultiType())?true:false;
    var re_modifiers = SjamayeeFacade.ENTITY_FILTER_MODIFIERS;
    if (_filterCase === true) {
      re_modifiers = SjamayeeFacade.ENTITY_FILTER_MODIFIERS_CASE;
    }
    var filterExpression = new RegExp(_filterValue,re_modifiers);
    //First pass-through for determining entitySelectPrefix!
    var entities = [];
    //if (type === null || multiType === true) {
      entities = (modelEntity === null)?entityProxy.getEntities():entityProxy.getEntities(type.getId());
    //}
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      if (entity) {
        if (filterValue) {
          if ((entity.name.match(filterExpression) === null) &&
              (entity.desc.match(filterExpression) === null)) {              
            continue;
          }
        }
        var isExactModel = false;
        if (modelEntity) {
          var isA = false;
          var relations = relationProxy.getRelationsForEntity(entity);
          if (relations && relations.length > 0) {
            for (var j = 0; j < relations.length; j++) {
              var r1 = relations[j];
              if (r1) {
                var relation = new DataRelation(r1);
                if (relation) {
                  if (isExactModel === false) {
                    isA = (relation.getPei() && relation.getPei() == entity.id.substr(0,BusinessObject.ID_MIN_LENGTH))?relation.isParentA(modelEntity.getId()):false;
                    if (isA === false) {
                      isA = (relation.getCei() && relation.getCei() == entity.id.substr(0,BusinessObject.ID_MIN_LENGTH))?relation.isChildA(modelEntity.getId()):false;
                    }
                    isExactModel = isA;
                  }
                }
              }
            }
          }
          if (multiType === false && isExactModel === false) { continue; }
        }
        if (type === null || multiType === true) {
          var dataEntity = new DataEntity(entity);
          if (dataEntity && !dataEntity.isSingleType()) {
            entitySelectPrefixed = true;
            break;
          }
        }
      }
    }
    //Second pass-through for building the type options!
    var nbrOfOptions = 0;
    entities = (modelEntity === null)?entityProxy.getEntities():entityProxy.getEntities(type.getId());
    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      if (entity) {
        if (filterValue) {
          if ((entity.name.match(filterExpression) === null) &&
              (entity.desc.match(filterExpression) === null)) {              
            continue;
          }
        }
        var isExactModel = false;
        if (modelEntity) {
          var isA = false;
          var relations = relationProxy.getRelationsForEntity(entity);
          if (relations && relations.length > 0) {
            for (var j = 0; j < relations.length; j++) {
              var r1 = relations[j];
              if (r1) {
                var relation = new DataRelation(r1);
                if (relation) {
                  if (isExactModel === false) {
                    isA = (relation.getPei() && relation.getPei() == entity.id.substr(0,BusinessObject.ID_MIN_LENGTH))?relation.isParentA(modelEntity.getId()):false;
                    if (isA === false) {
                      isA = (relation.getCei() && relation.getCei() == entity.id.substr(0,BusinessObject.ID_MIN_LENGTH))?relation.isChildA(modelEntity.getId()):false;
                    }
                    isExactModel = isA;
                  }
                }
              }
            }
          }
          if (multiType === false && isExactModel === false) { continue; }
        }
        var selected = (currentEntityName && entity.name == currentEntityName)?true:false;
        var optionTag = '<option';
        optionTag += (selected)?' selected="selected"':'';
        optionTag += '>';
        var entityName = entity.name.substr(0,50);
        var multiTypeFlag = '';
        if (entitySelectPrefixed === true) {
          for (var j = 0; j < RelationsHeader.ENTITY_SELECT_PREFIX_LENGTH; j++) {
            multiTypeFlag += '&nbsp;';
          }
        }
        if (type === null || multiType === true) {
          var dataEntity = new DataEntity(entity);
          if (dataEntity && !dataEntity.isSingleType()) {
            multiTypeFlag = RelationsHeader.ENTITY_SELECT_PREFIX;
          }
        }
        result += optionTag+multiTypeFlag+entityName+'</option>';
        nbrOfOptions++;
      }
      //Only OK when exact model match!
      if (modelEntity && multiType === false && isExactModel === false) {
        nbrOfOptions = 0;
        result = '';
      }
    }
    if (nbrOfOptions === 0) {
      //NO ENTITIES FOUND!
      result = '<option>'+EntityB.NO_OBJECTS+'</option>';
      if (filterValue) {
        SjamayeeFacade.getInstance().sendNotification(SjamayeeFacade.GRID_DATA_NO_OBJECTS_FOUND);
      }
    }
  } catch(error) {
    Utils.alert("DataEntity/getEntityOptions Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    var relationsHeaderMediator = SjamayeeFacade.getInstance().retrieveMediator(DataRelationsHeaderMediator.ID);
    if (relationsHeaderMediator) {
      relationsHeaderMediator.getViewComponent().setEntitySelectPrefixed(entitySelectPrefixed);
    }
    return result;
  }
};

//Class: DataRelation
var DataRelation = new Class({
  Extends: RelationB,
  initialize: function(vo) {
    try {
      if (vo === undefined) { vo = new DataRelationVO(); }
      this.parent(vo);
      this.proxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
      if (vo) {
        this.setMri(vo.mri);
      }
    } catch(error) {
      Utils.alert("DataRelation/constructor Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  //Getters & Setters
  getRelationVO: function() {
    //return new DataRelationVO(this.getId(),this.getVersion(),this.getVal(),this.getMri(),this.getPei(),this.getCei(),this.getPid(),this.getNid(),this.getTxi(),this.isVirtual(),this.getVirtualNivo());
    return this.vo;
  },
  getMri: function() {
    if (this.vo.mri === undefined) {
      this.vo.mri = null;
    }
    return (this.vo.mri)?this.vo.mri.substr(0,BusinessObject.ID_MIN_LENGTH):this.vo.mri;
  },
  setMri: function(mri) {
    if (mri !== undefined) {
      this.vo.mri = mri;
    }
  },
  getModelRelation: function() {
    if (this.modelRelation === undefined) {
      this.modelRelation = ModelRelation.getById(this.getMri());
    }
    return this.modelRelation;
  },
  setModelRelation: function(relation) {
    if (relation) {
      this.modelRelation = relation;
      this.setMri(relation.getId());
    }
  },
  isParentA: function(mei) {
    /*var result = false;
    if (mei) {
      var modelRelation = this.getModelRelation();
      if (modelRelation) {
        if (modelRelation.getParentEntity()) {
          //result = ModelEntity.getById(mei).isA(modelRelation.getParentEntity().getId()); //FOR TEST !!!
          result = modelRelation.getParentEntity().isA(mei);
        }
      }
    }
    return result;*/
    return (mei && this.getParentModelEntity() && this.getParentModelEntity().isA(mei))?true:false;
  },
  isChildA: function(mei) {
    /*var result = false;
    if (mei) {
      var modelRelation = this.getModelRelation();
      if (modelRelation) {
        if (modelRelation.getChildEntity()) {
          //result = ModelEntity.getById(mei).isA(modelRelation.getChildEntity().getId()); //FOR TEST !!!
          result = modelRelation.getChildEntity().isA(mei);
        }
      }
    }
    return result;*/
    return (mei && this.getChildModelEntity() && this.getChildModelEntity().isA(mei))?true:false;
  },  
  getParentModelEntity: function() {
    if (this.parentModelEntity === undefined) {
      this.parentModelEntity = null;
      var parentEntity = this.getParentEntity();
      if (parentEntity) {
        var modelRelation = this.getModelRelation();
        if (modelRelation) {
          this.parentModelEntity = modelRelation.getParentEntity();
        }
      }
    }
    return this.parentModelEntity;
  },  
  getChildModelEntity: function() {
    if (this.childModelEntity === undefined) {
      this.childModelEntity = null;
      var childEntity = this.getChildEntity();
      if (childEntity) {
        var modelRelation = this.getModelRelation();
        if (modelRelation) {
          this.childModelEntity = modelRelation.getChildEntity();
        }
      }
    }
    return this.childModelEntity;
  },  
  //Functions
  clone: function() {
    var result = null;
    try {
      result = new DataRelation(this.getRelationVO());
      if (result) {
        var properties = Utils.eval(this,false); //true);
        if (properties) {
           for (var key = 0; key < properties.length; key++) {
             result[key] = properties[key];
          }
        }
      }
    } catch(error) {
      Utils.alert("DataRelation/clone Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getNivo: function() {
    var result = Position.NIVO_ROOT();
    try {
      /*if (this.getGridColumn()) {
        result = this.getGridColumn().getNivo();
      }*/
      if (this.getGridCell()) {
        result = this.getGridCell().getNivo();
      }
    } catch(error) {
      Utils.alert("DataRelation/getNivo Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  deleteRelation: function() {
    try {
      //Dereference entities!
      if (this.hasParent()) {
        this.getParentEntity().dereference(); 
      }  
      if (this.hasChild()) {
        this.getChildEntity().dereference();
      }  
      //Dereference THIS.
      this.dereference();
    } catch(error) {
      Utils.alert("DataRelation/deleteRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    }
  },
  getPrevious: function() {
    return this.getPreviousRelation();
  },
  getNext: function() {
    return this.getNextRelation();
  },
  getParentEntity: function() {
    if (this.parentEntity === undefined) {
      this.parentEntity = DataEntity.getById(this.getPei());
    }
    return this.parentEntity;
  },
  getChildEntity: function() {
    if (this.childEntity === undefined) {
      this.childEntity = DataEntity.getById(this.getCei());
    }
    return this.childEntity;
  },
  getPreviousRelation: function() {
    if (this.previousRelation === undefined) {
      this.previousRelation = DataRelation.getById(this.getPid());
    }
    return this.previousRelation;
  },
  getNextRelation: function() {
    if (this.nextRelation === undefined) {
      this.nextRelation = DataRelation.getById(this.getNid());
    }
    return this.nextRelation;
  },  
  storeJson: function() {
    var result = '';
    try {
      result = '{';
      result += '"sid":"'+this.getSid()+'"';
      result += ',"id":"'+this.getId()+'"';
      result += ',"val":"'+this.getVal()+'"';
      result += ',"pei":"'+this.getPei()+'"';
      result += ',"cei":"'+this.getCei()+'"';
      result += ',"pid":"'+this.getPid()+'"';
      result += ',"nid":"'+this.getNid()+'"';
      result += '}';
      //SjamayeeForm.putBySid(this);
    } catch(error) {
      Utils.alert("DataRelation/storeJson Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  print: function(html,keysOnly) {
    var _html = (html !== undefined && html !== null)?html:false;
    var _keysOnly = (keysOnly !== undefined && keysOnly !== null)?keysOnly:false;
    var _nl = (_html)?'<br/>':'\n';
    var result = '\nDataRelation:'+_nl;
    try {
      result += this.parent();
    } catch(error) {
      Utils.alert("DataRelation/print Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getFirstParentRelation: function() {
    var result = null;
    try {
      if (this.hasParent() === true) {
        var dataEntity = this.getParentEntity();
        result = RelationB.getFirstParentForEntity(dataEntity.getEntityVO());
      }
    } catch(error) {
      Utils.alert("DataRelation/getFirstParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getLastParentRelation: function() {
    var result = null;
    try {
      if (this.hasParent() === true) {
        var dataEntity = this.getParentEntity();
        result = DataRelation.getLastParentForEntity(dataEntity.getEntityVO());
      }
    } catch(error) {
      Utils.alert("DataRelation/getLastParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getParentRelations: function(number,sort) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
      var _number = (number !== undefined && number !== null)?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);      
      var _sort = (sort !== undefined && sort !== null)?sort:Cache.SORT_ASCENDING;
      //result = this.proxy.getParentRelations(this,_number,_sort);       
      if (this.hasParent() === true) {
        //result = this.getParentEntity();
        var entityRelationsText = sforce.apex.execute('sja.DataRelationService','getParentRelations',{'entityId':this.getPei(),'size':25});
        var entityRelations = Utils.eval(entityRelationsText,true);       
        var relations = entityRelations.relations;
        var i = 0;
        while (relations[i]) {
          var jso = relations[i];
          result.push(new DataRelation(new DataRelationVO(jso.id,jso.ver,jso.name,jso.mri,jso.pei,jso.cei,jso.pid,jso.nid)));
          i++;
        }
      }     
    } catch(error) {
      Utils.alert("DataRelation/getParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getPreviousParentRelation: function() {
    var result = null;
    try {
      result = this.proxy.getPreviousParentRelation(this);
    } catch(error) {
      Utils.alert("DataRelation/getPreviousParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getPreviousParentRelations: function(number) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
      var _number = (number !== undefined && number !== null)?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
      result = this.proxy.getPreviousParentRelations(this,_number);
    } catch(error) {
      Utils.alert("DataRelation/getPreviousParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getNextParentRelation: function() {
    var result = null;
    try {
      result = this.proxy.getNextParentRelation(this);
    } catch(error) {
      Utils.alert("DataRelation/getNextParentRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getNextParentRelations: function(number) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
      var _number = (number !== undefined && number !== null)?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
      result = this.proxy.getNextParentRelations(this,_number);
    } catch(error) {
      Utils.alert("DataRelation/getNextParentRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getFirstChildRelation: function() {
    var result = null;
    try {
      if (this.hasChild() === true) {
        //result = this.proxy.getFirstChildRelation(this);
        //var dataEntity = DataEntity.getById(this.getCei());
        var dataEntity = this.getChildEntity();
        //result = DataRelation.getFirstChildForEntity(dataEntity.getEntityVO());
        result = RelationB.getFirstChildForEntity(dataEntity.getEntityVO());
      }
    } catch(error) {
      Utils.alert("DataRelation/getFirstChildRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getLastChildRelation: function() {
    var result = null;
    try {
      if (this.hasChild() === true) {
        result = this.proxy.getLastChildRelation(this);
      }
    } catch(error) {
      Utils.alert("DataRelation/getLastChildRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getChildRelations: function(number,sort) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
      var _number = (number !== undefined && number !== null)?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);      
      var _sort = (sort !== undefined && sort !== null)?sort:Cache.SORT_ASCENDING;
      //result = this.proxy.getChildRelations(this,_number,_sort);
      var entityRelationsText = sforce.apex.execute('sja.DataRelationService','getChildRelations',{'entityId':this.getCei(),'size':25});
      var entityRelations = Utils.eval(entityRelationsText,true);       
      var relations = entityRelations.relations;
      var i = 0;
      while (relations[i]) {
        var jso = relations[i];
        result.push(new DataRelation(new DataRelationVO(jso.id,jso.ver,jso.name,jso.mri,jso.pei,jso.cei,jso.pid,jso.nid)));
        i++;
      }     
    } catch(error) {
      Utils.alert("DataRelation/getChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getPreviousChildRelations: function(number) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
      var _number = (number !== undefined && number !== null)?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
      var relation = this;
      while (relation) {
        if (_number <= 0) { break; }
        if (relation.getPid() === null) { break; }
        var previousRelation = relation.getPreviousRelation();
        if (!previousRelation) { break; }
        result.splice(0,0,previousRelation);
        relation = previousRelation;
        _number--;
      }
    } catch(error) {
      Utils.alert("DataRelation/getPreviousChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getNextChildRelations: function(number) {
    var result = [];
    try {
      //var _number = ((number !== undefined) && (number !== null))?number:(GridView.DEFAULT_ROWS*SjamayeeFacade.PAGE_MULTIPLIER); //RelationsGridMediator.PAGE_SIZE_MAX
      var _number = (number !== undefined && number !== null)?number:(RelationsGridMediator.PAGE_SIZE_MAX*SjamayeeFacade.PAGE_MULTIPLIER);
      var relation = this;
      while (relation) {
        if (_number <= 0) { break; }
        if (relation.getNid() === null) { break; }
        var nextRelation = relation.getNextRelation();
        if (nextRelation === null) { break; }
        result.push(nextRelation);
        relation = nextRelation;
        _number--;
      }
    } catch(error) {
      Utils.alert("DataRelation/getNextChildRelations Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  },
  getRelationsTopAndBottom: function() {
    var result = [];
    try {
      result = this.proxy.getRelationsTopAndBottom(this);
    } catch(error) {
      Utils.alert("DataRelation/getRelationsTopAndBottom Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return result;
    }
  }
});
DataRelation.getById = function(id) {
  var _id = (id !== undefined)?id:null;
  var result = null;
  try {
    if (_id) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
      var r1 = relationProxy.getById(_id);
      if (r1) { result = new DataRelation(r1); }
    }
  } catch(error) {
    Utils.alert("DataRelation/getById Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
DataRelation.getRelations = function() {
  var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
  return relationProxy.getItems();
};
DataRelation.clearVirtualRelations = function() {
  var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
  return relationProxy.clearVirtualItems();
};
DataRelation.addVirtualRelation = function(relation) {
  var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
  relation.setVirtual(true);
  relationProxy.addVirtualRelation(relation);
};
DataRelation.removeVirtualRelation = function(relation) {
  var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
  if (relation.isVirtual()) {
    relationProxy.removeVirtualRelation(relation);
  }
};
//TODO: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*
DataRelation.getRelationsForType = function(type,modelEntityId) {
  var _type = (type !== undefined)?type:null;
  var _modelEntityId = (modelEntityId !== undefined)?modelEntityId:null;
  var result = null;
  try {
    if (_type) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
      result = relationProxy.getRelationsForType(_type,_modelEntityId);
    }
  } catch(error) {
    Utils.alert("DataRelation/getRelationsForType Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
*/
DataRelation.getFirstRelationForModelRelation = function(relation,entity,modelEntity,parentOrChild) {
  var _relation = (relation !== undefined)?relation:null;
  var _entity = (entity !== undefined)?entity:null;
  var _modelEntity = (modelEntity !== undefined)?modelEntity:null;
  var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;
  var result = null;
  try {
    if (_relation) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
      dataRelationVO = relationProxy.getFirstRelationForModelRelation(_relation,_entity,_modelEntity,_parentOrChild);
      if (dataRelationVO) {
        result = new DataRelation(dataRelationVO);
      }     
    }
  } catch(error) {
    Utils.alert("DataRelation/getFirstRelationForModelRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
DataRelation.getRelationsForModelRelation = function(relation,entity,modelEntity,parentOrChild) {
  var _relation = (relation !== undefined)?relation:null;
  var _entity = (entity !== undefined)?entity:null;
  var _modelEntity = (modelEntity !== undefined)?modelEntity:null;
  var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;
  var result = [];
  try {
    if (_relation) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
      var relations = relationProxy.getRelationsForModelRelation(_relation,_entity,_modelEntity,_parentOrChild);
      if (relations && relations.length > 0) {
        for (var i = 0; i < relations.length; i++) {
          var dataRelationVO = relations[i];
          if (dataRelationVO) {
            result.push(new DataRelation(dataRelationVO));
          }
        }
      }
    }
  } catch(error) {
    Utils.alert("DataRelation/getFirstRelationForModelRelation Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
DataRelation.getRelationsForEntity = function(entity,modelEntityId,parentOrChild) {
  var _entity = (entity !== undefined)?entity:null;
  var _modelEntityId = (modelEntityId !== undefined)?modelEntityId:null;
  var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;
  var result = [];
  try {
    if (_entity) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
      var relations = relationProxy.getRelationsForEntity(_entity,_modelEntityId,_parentOrChild);
      if (relations && relations.length > 0) {
        for (var i = 0; i < relations.length; i++) {
          var dataRelationVO = relations[i];
          if (dataRelationVO) {
            result.push(new DataRelation(dataRelationVO));
          }
        }
      }
    }
  } catch(error) {
    Utils.alert("DataRelation/getRelationsForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
DataRelation.getFirstRelationForEntity = function(entity,instantModelEntity,parentOrChild) {
  var _entity = (entity !== undefined)?entity:null;
  var _instantModelEntity = (instantModelEntity !== undefined)?instantModelEntity:null;
  var _parentOrChild = (parentOrChild !== undefined)?parentOrChild:null;    
  var result = null;
  try {
    if (_entity) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
      var dataRelationVO = relationProxy.getFirstRelationForEntity(_entity,_instantModelEntity,_parentOrChild);
      if (dataRelationVO) {
        var dataRelation = new DataRelation(dataRelationVO);
        if (dataRelation) {
          var dataEntity = new DataEntity(_entity);
          if (dataEntity) {
            if (_parentOrChild === null || _parentOrChild == RelationB.CHILD) {
              if (dataRelation.getCei() == dataEntity.getId()) {
                result = dataRelation;
              }
            }
            if (result === null) {
              if (_parentOrChild === null || _parentOrChild == RelationB.PARENT) {
                if (dataRelation.getPei() == dataEntity.getId()) {
                  result = dataRelation;
                }
              }
            }
          }
        }
      }
    }
  } catch(error) {
    Utils.alert("DataRelation/getFirstRelationForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
/*
DataRelation.getFirstParentForEntity = function(entity) {
  var _entity = (entity !== undefined)?entity:null;
  var result = null;
  try {
    if (_entity) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
      var dataRelationVO = relationProxy.getFirstParentForEntity(_entity);
      if (dataRelationVO) {
        result = new DataRelation(dataRelationVO);
      }     
    }
  } catch(error) {
    Utils.alert("DataRelation/getFirstParentForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
*/
/*
DataRelation.getFirstChildForEntity = function(entity) {
  var _entity = (entity !== undefined)?entity:null;
  var result = null;
  try {
    if (_entity) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
      var dataRelationVO = relationProxy.getFirstChildForEntity(_entity);
      if (dataRelationVO) {
        result = new DataRelation(dataRelationVO);
      }
    }
  } catch(error) {
    Utils.alert("DataRelation/getFirstChildForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};
*/
DataRelation.getLastParentForEntity = function(entity) {
  var _entity = (entity !== undefined)?entity:null;
  var result = null;
  try {
    if (_entity) {
      var relationProxy = SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID);
      result = relationProxy.getLastParentForEntity(_entity);
    }
  } catch(error) {
    Utils.alert("DataRelation/getLastParentForEntity Error: "+error.message,Utils.LOG_LEVEL_ERROR);
  } finally {
    return result;
  }
};

//////////////////////////////////////////////////////////////////////////
///////////////////////////// UICOMPONENTS ///////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////// HEADERS /////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Class: DataObjectsHeader
var DataObjectsHeader = new Class({
  Extends: ObjectsHeader,
  initialize: function() {
    this.parent(DataObjectsHeader.ID);
  }
});
DataObjectsHeader.ID = "dataObjectsHeader";

//Class: DataRelationsHeader
var DataRelationsHeader = new Class({
  Extends: RelationsHeader,
  initialize: function() {
    this.parent(DataRelationsHeader.ID,{tlbl:DataRelationsHeader.TYPE_SELECT_LABEL,elbl:DataRelationsHeader.ENTITY_SELECT_LABEL});    
  },
  getEntitySelectValue: function() {
    var result = null;
    if (this.entitySelect) {
      result = this.entitySelect.value;
      if (this.isEntitySelectPrefixed()) {
        result = this.entitySelect.value.substr(RelationsHeader.ENTITY_SELECT_PREFIX_LENGTH);
      }
    }
    return result;
  }
});
DataRelationsHeader.ID = "dataRelationsHeader";
DataRelationsHeader.TYPE_SELECT_LABEL = "&nbsp;Class&nbsp;";
DataRelationsHeader.ENTITY_SELECT_LABEL = "Object&nbsp;";

//////////////////////////////////////////////////////////////////////////
/////////////////////////////// TOOLBARS /////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Class: DataObjectsToolBar
var DataObjectsToolBar = new Class({
  Extends: ObjectsToolBar,
  initialize: function() {
    this.parent(DataObjectsToolBar.ID);
  }
});
DataObjectsToolBar.ID = "dataObjectsToolBar";

//Class: DataRelationsToolBar
var DataRelationsToolBar = new Class({
  Extends: RelationsToolBar,
  initialize: function() {
    this.parent(DataRelationsToolBar.ID);
  }
});
DataRelationsToolBar.ID = "dataRelationsToolBar";

//////////////////////////////////////////////////////////////////////////
/////////////////////////////// MEDIATORS ////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//Class: DataObjectsHeaderMediator
var DataObjectsHeaderMediator = new Class({
  Extends: ObjectsHeaderMediator,
  initialize: function(viewComponent) {
    this.parent(DataObjectsHeaderMediator.ID,viewComponent);
    this.listMediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
    var header = this.getViewComponent();
  /*alert("DataObjectsHeaderMediator - initialize:"+
          "\n"+header.dataModelSelect.id+
          "\n"+header.referenceOperatorSelect.id+
          "\n"+header.referenceFilter.id+
          "\n"+header.typeSelect.id+
          "\n"+header.filter.id+
          "\n"+header.filterButton.id+
          "\n"+header.settingSelect.id+
          "\n"+header.settingButton.id+
          "\n"+header.helpLink.id);*/
    header.typeSelect.innerHTML = DataType.getTypeOptions();
  },
  getTypeSelected: function() {
    if (this.typeSelected === undefined || this.typeSelected === null) {
      this.typeSelected = DataType.getByName(this.typeNameSelected);
    }
    return this.typeSelected;
  },  
  onObjectsRefOpChange: function()  {
    this.sendNotification(SjamayeeFacade.OLIST_REFOP_CHANGE);
    this.sendNotification(SjamayeeFacade.OLIST_DATA_REFOP_CHANGE);
  },
  onObjectsTypeChange: function()   {
    var type_code_name = this.getViewComponent().getTypeSelectValue();
    this.sendNotification(SjamayeeFacade.OLIST_DATA_TYPE_CHANGE,type_code_name);
  },
  onObjectsFilterClick: function() {
    this.onObjectsTypeChange();
    this.sendNotification(SjamayeeFacade.OLIST_DATA_FILTER_CLICK);
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_DATA_HEADER_SHOW,
      SjamayeeFacade.OLIST_DATA_TYPE_CHANGE
    ]);
  },
  handleNotification: function(note) {
    this.parent(note);
    var app = this.facade.getApplication();
    var header = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_DATA_HEADER_SHOW:
      this.hide();
      header.setAttribute("style","display:block;");
      break;
      case SjamayeeFacade.OLIST_DATA_TYPE_CHANGE:
      var type_code_name = note.getBody();
      this.setTypeNameSelected(type_code_name);
      break;
    }
  }
});
DataObjectsHeaderMediator.ID = "DataObjectsHeaderMediator";

//Class: DataRelationsHeaderMediator
var DataRelationsHeaderMediator = new Class({
  Extends: RelationsHeaderMediator,
  initialize: function(viewComponent) {
    this.parent(DataRelationsHeaderMediator.ID,viewComponent);
    this.gridMediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);
    var header = this.getViewComponent();
    //Initialize Select Lists.
    header.typeSelect.innerHTML = DataType.getTypeOptions();    
    header.entitySelect.innerHTML = DataEntity.getEntityOptions();
  },
  getTypeSelected: function() {
    if (this.typeSelected === undefined || this.typeSelected === null) {
      this.typeSelected = DataType.getByName(this.typeNameSelected);
    }
    return this.typeSelected;
  },  
  onRelationsEntityChange: function() {
    this.getViewComponent().filter.style.background = "white";    
    //var entityName = this.getViewComponent().entitySelect.value;
    var entityName = this.getViewComponent().getEntitySelectValue();
    //var entityName = entityName.split('&nbsp;',1)[0];
    this.sendNotification(SjamayeeFacade.GRID_DATA_ENTITY_CHANGE,entityName);
  },
  onRelationsTypeChange: function() {
    this.getViewComponent().filter.style.background = "white";    
    var type_code_name = this.getViewComponent().getTypeSelectValue();
    this.sendNotification(SjamayeeFacade.GRID_DATA_TYPE_CHANGE,type_code_name);
  },
  onRelationsFilterClick: function() {
    this.getViewComponent().filter.style.background = "white";    
    this.onRelationsTypeChange();
    this.sendNotification(SjamayeeFacade.GRID_DATA_FILTER_CLICK);
  },
  onRootUndoClick: function()   { this.sendNotification(SjamayeeFacade.DATA_ROOT_UNDO); },    //>> Command !!!
  onRootSelectClick: function() { this.sendNotification(SjamayeeFacade.DATA_ROOT_SELECT); },
  onRootRedoClick: function()   { this.sendNotification(SjamayeeFacade.DATA_ROOT_REDO); },

  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.GRID_DATA_HEADER_SHOW,
      SjamayeeFacade.GRID_DATA_TYPE_SET,
      SjamayeeFacade.GRID_DATA_TYPE_CHANGE,
      SjamayeeFacade.GRID_DATA_ENTITY_CHANGE,
      SjamayeeFacade.GRID_DATA_NO_OBJECTS_FOUND
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var header = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.GRID_DATA_HEADER_SHOW:
      this.hide();
      header.setAttribute("style","display:block;");
      break;
      case SjamayeeFacade.GRID_DATA_TYPE_SET:
      var type_code_name = note.getBody();
      header.typeSelect.selectedIndex = Header.DATA_TYPE_SELECT_ALL_TYPES_INDEX;
      break;
      case SjamayeeFacade.GRID_DATA_TYPE_CHANGE:
      var type_code_name = note.getBody();
      this.setTypeNameSelected(type_code_name);
      var oldEntityName = header.getEntitySelectValue();      
      header.entitySelect.innerHTML = DataEntity.getEntityOptions(type_code_name,oldEntityName,this.getEntityFilterValue(),this.getEntityFilterCase());
      var newEntityName = header.getEntitySelectValue();
      //this.setEntityNameSelected(newEntityName);
      this.sendNotification(SjamayeeFacade.GRID_DATA_ENTITY_CHANGE,newEntityName);
      break;
      case SjamayeeFacade.GRID_DATA_ENTITY_CHANGE:
      var entityName = note.getBody();
      header.entitySelect.innerHTML = DataEntity.getEntityOptions(this.getTypeNameSelected(),entityName,this.getEntityFilterValue(),this.getEntityFilterCase());          
      this.setEntityNameSelected(entityName);
      break;
      case SjamayeeFacade.GRID_DATA_NO_OBJECTS_FOUND:
      //header.entitySelect.style.background = "red";
      header.filter.style.background = "red";
      break;
    }
  },
  getEntitySelected: function() {
    var entitySelected = this.parent();
    if (entitySelected === null) {
      entitySelected = DataEntity.getByName(this.getEntityNameSelected());
      this.setEntitySelected(entitySelected);
    }
    return entitySelected;
  }
});
DataRelationsHeaderMediator.ID = "DataRelationsHeaderMediator";

//Class: DataObjectsToolBarMediator
var DataObjectsToolBarMediator = new Class({
  Extends: ObjectsToolBarMediator,
  initialize: function(viewComponent) {
    this.parent(DataObjectsToolBarMediator.ID,viewComponent);
    this.listMediator = this.facade.retrieveMediator(DataObjectsListMediator.ID);
    var toolBar = this.getViewComponent();
  },
  onFirst: function()        { this.sendNotification(SjamayeeFacade.OLIST_DATA_HOME,ObjectsListMediator.HOME_MESSAGE_TEXT); },
  onPrevious: function()     { this.sendNotification(SjamayeeFacade.OLIST_DATA_PREVIOUS,ObjectsListMediator.PREVIOUS_MESSAGE_TEXT); },
  onNext: function()         { this.sendNotification(SjamayeeFacade.OLIST_DATA_NEXT,ObjectsListMediator.NEXT_MESSAGE_TEXT); },
  onLast: function()         { this.sendNotification(SjamayeeFacade.OLIST_DATA_END,ObjectsListMediator.END_MESSAGE_TEXT); },
  onResizeList: function()   { this.sendNotification(SjamayeeFacade.OLIST_DATA_RESIZE); },
  onAddObject: function()    { this.sendNotification(SjamayeeFacade.OBJECT_DATA_ADD,this.listMediator); },
  onDeleteObject: function() { this.sendNotification(SjamayeeFacade.OBJECT_DATA_DELETE,this.listMediator); },
  onEditObject: function()   { this.sendNotification(SjamayeeFacade.OBJECT_DATA_EDIT,this.listMediator); },
  onUndoObject: function()   { this.sendNotification(SjamayeeFacade.OBJECT_DATA_UNDO,this.listMediator); },
  onRedoObject: function()   { this.sendNotification(SjamayeeFacade.OBJECT_DATA_REDO,this.listMediator); },
  onClearBuffer: function()  { this.sendNotification(SjamayeeFacade.OBJECT_DATA_BUFFER_CLEAR,this.listMediator); },
  /*onEditText: function() {
    this.listMediator.setState(SjamayeeMediator.STATE_TEXT);
    this.sendNotification(SjamayeeFacade.TEXT_EDIT,this.listMediator);
    this.sendNotification(SjamayeeFacade.OLIST_DATA_TEXT_SHOW); //OLIST_DATA_TEXT_EDIT);
  },*/
  onDeleteUnrefObjects: function() { this.sendNotification(SjamayeeFacade.OBJECT_DATA_UNREFS_DELETE,this.listMediator); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_DATA_TOOLBAR_SHOW
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var toolBar = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_DATA_TOOLBAR_SHOW:
      this.hide();
      this.enableButtons();
      toolBar.setAttribute("style","display:block;");
      break;
    }
  }
});
DataObjectsToolBarMediator.ID = "DataObjectsToolBarMediator";

//Class: DataRelationsToolBarMediator
var DataRelationsToolBarMediator = new Class({
  Extends: RelationsToolBarMediator,
  initialize: function(viewComponent) {
    this.parent(DataRelationsToolBarMediator.ID,viewComponent);
    this.gridMediator = this.facade.retrieveMediator(DataRelationsGridMediator.ID);   
    var toolBar = this.getViewComponent();
  },
  onShowParent: function()         { this.sendNotification(SjamayeeFacade.GRID_DATA_PARENT_SHOW); },
  onShowParentAndChild: function() { this.sendNotification(SjamayeeFacade.GRID_DATA_PARENTANDCHILD_SHOW); },
  onShowChild: function()          { this.sendNotification(SjamayeeFacade.GRID_DATA_CHILD_SHOW); },
  onResizeGrid: function()         { this.sendNotification(SjamayeeFacade.GRID_DATA_RESIZE); },
  onAddRelation: function() {
    this.sendNotification(SjamayeeFacade.RELATION_DATA_ADD,this.gridMediator);
    this.sendNotification(SjamayeeFacade.GRID_SHOW);
  },
  onDeleteRelation: function() {
    this.sendNotification(SjamayeeFacade.RELATION_DATA_DELETE,this.gridMediator);
    this.sendNotification(SjamayeeFacade.GRID_SHOW);
  },
  onEditRelation: function() {
    this.sendNotification(SjamayeeFacade.RELATION_DATA_EDIT,this.gridMediator);
    this.sendNotification(SjamayeeFacade.GRID_SHOW);
  },
  onExtractRelation: function() { this.sendNotification(SjamayeeFacade.RELATION_DATA_EXTRACT,this.gridMediator); },
  onCopyRelation: function()    { this.sendNotification(SjamayeeFacade.RELATION_DATA_COPY,this.gridMediator); },
  onPasteRelation: function()   { this.sendNotification(SjamayeeFacade.RELATION_DATA_PASTE,this.gridMediator); },
  onUndoRelation: function()    { this.sendNotification(SjamayeeFacade.RELATION_DATA_UNDO,this.gridMediator); },
  onRedoRelation: function()    { this.sendNotification(SjamayeeFacade.RELATION_DATA_REDO,this.gridMediator); },
  onClearBuffer: function()     { this.sendNotification(SjamayeeFacade.GRID_DATA_BUFFER_CLEAR,this.gridMediator); },
  /*onEditText: function() {
    this.gridMediator.setState(SjamayeeMediator.STATE_TEXT);
    this.sendNotification(SjamayeeFacade.TEXT_EDIT,this.gridMediator);
    this.sendNotification(SjamayeeFacade.GRID_DATA_TEXT_SHOW); //GRID_DATA_TEXT_EDIT);
  },*/
  onResetGrid: function()       { this.sendNotification(SjamayeeFacade.GRID_DATA_RESET,this.gridMediator); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.GRID_DATA_TOOLBAR_SHOW,
      SjamayeeFacade.GRID_DATA_RESIZED
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var toolBar = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.GRID_DATA_TOOLBAR_SHOW:
      this.hide();
      this.enableButtons();
      toolBar.setAttribute("style","display:block;");
      break;
      case SjamayeeFacade.GRID_DATA_RESIZED:
      var sizeNormal = note.getBody();
      var style = "display:"+(sizeNormal?"block":"none");
      //toolBar.childButton.setAttribute("style",style);
      //toolBar.parentAndChildButton.setAttribute("style",style);
      //toolBar.parentButton.setAttribute("style",style);
      toolBar.parentAndChildButtons.setAttribute("style",style);
      break;
    }
  }
});
DataRelationsToolBarMediator.ID = "DataRelationsToolBarMediator";

//Class: DataGridListMediator
var DataGridListMediator = new Class({
  Extends: GridListMediator,
  initialize: function(viewComponent) {
    this.parent(DataGridListMediator.ID,viewComponent);
    var gridList = this.getViewComponent();
    this.facade.registerMediator(new DataObjectsListMediator(gridList));
    this.facade.registerMediator(new DataRelationsGridMediator(gridList));
  },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_DATA_SHOW,
      SjamayeeFacade.GRID_DATA_SHOW,
      SjamayeeFacade.FOCUS
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var gridList = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_DATA_SHOW:
      //this.sendNotification(SjamayeeFacade.DATA_SHOW);
      //this.sendNotification(SjamayeeFacade.OLIST_SHOW);
      this.hide();
    /*this.relationsGridLeftWidth = gridList.gridListSplitter.left.getStyle("width").toInt();
      if (this.objectsListLeftWidth !== null) {
        gridList.gridListSplitter.left.setStyle("width", this.objectsListLeftWidth);
        if (dijit) {
          var splitter = dijit.byId(GridListSplitter.ID);
          if (splitter) { splitter.resize(); }
        }       
      }
      gridList.gridListSplitter.setAttribute("style",this.getSplitterStyle());*/
      this.sendNotification(SjamayeeFacade.OLIST_DATA_HEADER_SHOW);
      this.sendNotification(SjamayeeFacade.OLIST_DATA_TOOLBAR_SHOW);
      gridList.gridListSplitter.left.dataObjectsList.setAttribute("style","width:100%;height:100%;display:block;");
      gridList.gridListSplitter.right.dataObjectsList.setAttribute("style","width:100%;height:100%;display:block;");
      gridList.gridListSplitter.left.dataObjectsList.keyboard.activate();
      gridList.gridListSplitter.left.dataObjectsList.focus();     
      this.setListSize(this.getListSize());
      //this.home();
      break;
      case SjamayeeFacade.GRID_DATA_SHOW:
      //this.sendNotification(SjamayeeFacade.DATA_SHOW);
      //this.sendNotification(SjamayeeFacade.GRID_SHOW);
      this.hide();
    /*this.objectsListLeftWidth = gridList.gridListSplitter.left.getStyle("width").toInt();
      if (this.relationsGridLeftWidth !== null) {
        gridList.gridListSplitter.left.setStyle("width", this.relationsGridLeftWidth);
        if (dijit) {
          var splitter = dijit.byId(GridListSplitter.ID);
          if (splitter) { splitter.resize(); }
        }       
      }
      gridList.gridListSplitter.setAttribute("style",this.getSplitterStyle());*/
      this.sendNotification(SjamayeeFacade.GRID_DATA_HEADER_SHOW);
      this.sendNotification(SjamayeeFacade.GRID_DATA_TOOLBAR_SHOW);     
      gridList.gridListSplitter.left.dataRelationsGrid.setAttribute("style","width:100%;height:100%;display:block;");
      gridList.gridListSplitter.right.dataRelationsGrid.setAttribute("style","width:100%;height:100%;display:block;");
      gridList.gridListSplitter.left.dataRelationsGrid.keyboard.activate();
      gridList.gridListSplitter.left.dataRelationsGrid.focus();     
      break;
      case SjamayeeFacade.FOCUS:
      var element = note.getBody();
      $(element).focus();
      break;
    }
  }
});
DataGridListMediator.ID = "DataGridListMediator";

//Class: DataRelationsGridMediator
var DataRelationsGridMediator = new Class({
  Extends: RelationsGridMediator,
  initialize: function(viewComponent) {
    this.parent(DataRelationsGridMediator.ID,viewComponent);
    var gridList = this.getViewComponent();   
    //Grid left.
    this.gridUICLeft = gridList.gridListSplitter.left.dataRelationsGrid;
    this.gridUICLeft.addEvent(SjamayeeFacade.GRID_CLICK, this.onGridClick);
    this.gridUICLeft.addEvent(SjamayeeFacade.GRID_CELL_CLICK, this.onCellClick);
    this.gridUICLeft.addEvent(SjamayeeFacade.GRID_CELL_MOUSEOVER, this.onCellMouseOver);
    this.gridUICLeft.addEvent(SjamayeeFacade.GRID_CELL_MOUSEOUT, this.onCellMouseOut);
    this.gridUICLeft.addEvent(SjamayeeFacade.GRID_KEYDOWN, this.onKeydown);
    //Grid right.
    this.gridUICRight = gridList.gridListSplitter.right.dataRelationsGrid;
    this.gridUICRight.addEvent(SjamayeeFacade.GRID_CLICK, this.onGridClick);
    this.gridUICRight.addEvent(SjamayeeFacade.GRID_CELL_CLICK, this.onCellClick);
    this.gridUICRight.addEvent(SjamayeeFacade.GRID_CELL_MOUSEOVER, this.onCellMouseOver);
    this.gridUICRight.addEvent(SjamayeeFacade.GRID_CELL_MOUSEOUT, this.onCellMouseOut);
    this.gridUICRight.addEvent(SjamayeeFacade.GRID_KEYDOWN, this.onKeydown);
    //Initialize grid.
    this.setGrid(new DataGrid());
    this.setTypeProxy(SjamayeeFacade.getInstance().retrieveProxy(DataTypeProxy.ID));
    this.setEntityProxy(SjamayeeFacade.getInstance().retrieveProxy(DataEntityProxy.ID));
    this.setRelationProxy(SjamayeeFacade.getInstance().retrieveProxy(DataRelationProxy.ID));
    this.setAttributeProxy(SjamayeeFacade.getInstance().retrieveProxy(DataAttributeProxy.ID));
    //Initialize CommandBuffer.
    this.sendNotification(SjamayeeFacade.GRID_DATA_BUFFER_CLEAR,this);
  },
  onGridClick: function(evt)     { this.parent(evt); },
  onCellClick: function(evt)     { this.parent(evt); },
  onCellMouseOver: function(evt) { this.parent(evt,this.getBackgroundHighliteColor()); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.DATA_TYPES_RELOAD,
      SjamayeeFacade.GRID_DATA_SHOW,
      SjamayeeFacade.GRID_DATA_REFRESH,
      SjamayeeFacade.GRID_DATA_ENTITY_CHANGE,
      SjamayeeFacade.GRID_DATA_TYPE_CHANGE,
      SjamayeeFacade.GRID_DATA_FILTER_CLICK,
      SjamayeeFacade.FOCUS,
      SjamayeeFacade.GRID_DATA_RESIZE
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var gridList = this.getViewComponent();
    switch (note.getName()) {
      case SjamayeeFacade.GRID_DATA_SHOW:
      this.setGridSize(this.getGridSize());
      if (this.firstTime) {
        this.firstTime = false;
        var entityName = note.getBody();
        if (entityName === undefined || entityName === null) { entityName = "O1"; }
        if (entityName) {
          this.sendNotification(SjamayeeFacade.GRID_DATA_ENTITY_CHANGE,entityName);
        } else {
          this.sendNotification(SjamayeeFacade.GRID_DATA_REFRESH);
        }
      }
      break;
      case SjamayeeFacade.GRID_DATA_REFRESH:
      this.fillGrid();
      /*                                IS SOMETHING LIKE THIS NEEDED ???
      switch (this.getLastNavigation()) {
        case SjamayeeFacade.OLIST_DATA_HOME:      this.sendNotification(SjamayeeFacade.OLIST_DATA_HOME); break;
        case SjamayeeFacade.OLIST_DATA_PREVIOUS:  this.sendNotification(SjamayeeFacade.OLIST_DATA_PREVIOUS); break;
        case SjamayeeFacade.OLIST_DATA_UP:        this.sendNotification(SjamayeeFacade.OLIST_DATA_UP); break;
        case SjamayeeFacade.OLIST_DATA_DOWN:      this.sendNotification(SjamayeeFacade.OLIST_DATA_DOWN); break;
        case SjamayeeFacade.OLIST_DATA_NEXT:      this.sendNotification(SjamayeeFacade.OLIST_DATA_NEXT); break;
        case SjamayeeFacade.OLIST_DATA_END:     this.sendNotification(SjamayeeFacade.OLIST_DATA_END); break;
      }
      */      
      break;
      case SjamayeeFacade.GRID_DATA_ENTITY_CHANGE:
      var entityName = note.getBody();
      var entitySwitched = this.switchEntity(entityName);
      //if (entitySwitched === true) {
        this.sendNotification(SjamayeeFacade.GRID_DATA_REFRESH);        
      //}
      //this.sendNotification(SjamayeeFacade.FOCUS, RelationsGridRight.ID);
      break;
      case SjamayeeFacade.GRID_DATA_TYPE_CHANGE:
      //var type_code_name = note.getBody();
      //this.sendNotification(SjamayeeFacade.FOCUS, RelationsGridRight.ID);
      break;
      case SjamayeeFacade.GRID_DATA_FILTER_CLICK:
      break;
      case SjamayeeFacade.GRID_DATA_HOME:
      var position = this.getPosition();
      position.setRow(this.getBeginOfList());
      this.home();
      break;
      case SjamayeeFacade.GRID_DATA_PREVIOUS:
      break;
      case SjamayeeFacade.GRID_DATA_UP:
      //var position = this.getPosition();
      //position.setRow(position.getRow()-1);
      this.lineUp();
      //Fill grid.
      this.fillGrid();      
      break;
      case SjamayeeFacade.GRID_DATA_LEFT:
      var ok = false;
      var homeView = false;
      var relation = null;
      var nextColumn = null;
      var savedCell = null;
      var selectedCell = null;
      var relation = null;      
      var position = this.getPosition();      
      if (position) {
        var column = this.getGrid().getColumnByIndex(position.getColumn());
        if (column) {
          this.setCurrentNivo(column.getNivo());
          var cell = column.getCell(position.getRow());
          if (!cell) {
            if (this.getCurrentNivo() > Position.NIVO_ROOT()) {
              //TO RETURN FROM EMPTY COLUMN!
              ok = true;
            }
          } else {
            if (cell.navigationLeft()) {
              relation = cell.getRelation();
              ok = true;
            }
          }
          if (ok) {
            var cn = this.getCurrentNivo();
            if (cn > Position.WHERE_MAX()) {
              cn = (cn - 1);                           // TEST LIMIT !!!
              if (cn < (Position.NIVO_ROOT() - 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
                column.setSavedCell(cell);             // TODO: # cells -> clear column !!!
              } else if (cn >= Position.NIVO_ROOT()) {
                selectedCell = column.getSavedCell();
                if (column.getNivo() >= this.getGrid().getWhatUsedNivo() || column.isSelected() === false) {
                  column.setSavedCell(cell);
                }
              }
              nextColumn = this.getGrid().getColumnByNivo(cn);
              if (nextColumn) {
                //result = true;
                this.setCurrentNivo(cn);
                if (cn <= Position.NIVO_ROOT()) {
                  //homeView = this.isHomeView();
                }
                if (cn < this.getGrid().getWhereUsedNivo()) {
                  this.getGrid().setWhereUsedNivo(cn);
                }
                savedCell = nextColumn.getSavedCell();
                if (position) { position.left(savedCell); }
                if (homeView === true) {
                  if (nextColumn.isMasterChanged() === false) {
                    if (selectedCell) {
                    //selectedCell.touch(((selectedCell.isSelected())?true:false));
                      selectedCell.touch(selectedCell.isSelected());
                    }
                  //cell.touch(((gridCell.isSelected())?true:false));
                    cell.touch(gridCell.isSelected());
                    savedCell.touch(true);
                    //this.setParentAndChild(savedCell);
                  //result = false;
                  }
                }
              }
            }
          }
        }  
      }
/*      
      var nivo = this.getCurrentNivo();
      if (nivo <= (Position.NIVO_ROOT()+1)) {
        var position = this.getPosition();
        var column = position.getColumn();
        if (column > Position.COLUMN_FIRST()) {
          column = (column - 1);
          position.setColumn(column);
        }
      }
      if (nivo > Position.WHERE_MAX()) {
        nivo = (nivo - 1);
        this.setCurrentNivo(nivo);        
      }
*/
      //var col = this.getPosition().getColumn();
      //var row = this.getPosition().getRow();
      //Fill grid.
      this.fillGrid();
      break;
      case SjamayeeFacade.GRID_DATA_RIGHT:
      var ok = false;
      var homeView = false;
      var relation = null;
      var nextColumn = null;
      var savedCell = null;
      var selectedCell = null;
      var relation = null;
      var position = this.getPosition();
      if (position) {
        var column = this.getGrid().getColumnByIndex(position.getColumn());
        if (column) {
          this.setCurrentNivo(column.getNivo());
          var cell = column.getCell(position.getRow());
          relation = cell.getRelation();
          if (cell.navigationRight()) {
            var cn = this.getCurrentNivo();

            if (cn < Position.WHAT_MAX()) {
              cn = (cn + 1);                           // TEST LIMIT !!!
              if (cn > (Position.NIVO_ROOT() + 1)) {   // REFACTOR !!! BETTER - ONLY IF OTHER PATH !!!
                column.setSavedCell(cell);             // TODO: # cells -> clear column !!!
              } else if (cn <= Position.NIVO_ROOT()) {
                selectedCell = column.getSavedCell();
                if (column.getNivo() <= this.getGrid().getWhereUsedNivo() || column.isSelected() === false) {
                  column.setSavedCell(cell);
                }
              }
              nextColumn = this.getGrid().getColumnByNivo(cn);
              if (nextColumn) {
                //result = true;
                this.setCurrentNivo(cn);
                if (cn > Position.NIVO_COLUMN_FIRST()) {
                  //homeView = this.isHomeView();       
                }
                if (cn > this.getGrid().getWhatUsedNivo()) {
                  this.getGrid().setWhatUsedNivo(cn);
                }
                savedCell = nextColumn.getSavedCell();               
                if (position) { position.right(savedCell); }
                ok = true;
                if (homeView === true) {
                  if (!nextColumn.isMasterChanged() === true) {
                    if (selectedCell) {
                    //selectedCell.touch(((selectedCell.isSelected())?true:false));
                      selectedCell.touch(selectedCell.isSelected());
                    }
                  //gridCell.touch(((gridCell.isSelected())?true:false));
                    cell.touch(cell.isSelected());
                    savedCell.touch(true);
                    this.setParentAndChild(savedCell);
                  //result = false;
                  }
                }
              }
            }
          }         
        }  
      }
/*
      var nivo = this.getCurrentNivo();
      if (nivo >= Position.NIVO_COLUMN_FIRST()) {     
        var position = this.getPosition();
        var column = position.getColumn();
        if (column < 4) {                   //TODO: MAX COLS ??? DEFINITION
          column = (column + 1);
          position.setColumn(column);
        }
      }
      if (nivo < Position.WHAT_MAX()) {
        nivo = (nivo + 1);
        this.setCurrentNivo(nivo);        
      }
*/
      //var col = this.getPosition().getColumn();
      //var row = this.getPosition().getRow();
      //Fill grid.
      this.fillGrid();
      break;
      case SjamayeeFacade.GRID_DATA_DOWN:
      //var position = this.getPosition();
      //position.setRow(position.getRow()+1);
      this.lineDown();
      //Fill grid.
      this.fillGrid();
      break;
      case SjamayeeFacade.GRID_DATA_NEXT:
      break;
      case SjamayeeFacade.GRID_DATA_END:
      var position = this.getPosition();
      position.setRow(this.getEndOfList());
      this.end();
      break;
      case SjamayeeFacade.GRID_DATA_RESIZE:
      var gridSize = note.getBody();
      this.gridResize(gridSize);
      this.sendNotification(SjamayeeFacade.DATA_TYPES_RELOAD);                 //FOR TEST ONLY !!! REMOVE LATER !!!     
      this.sendNotification(SjamayeeFacade.GRID_DATA_REFRESH);
      break;
      case SjamayeeFacade.DATA_TYPES_RELOAD:
      var typeOptions = DataType.getTypeOptions();
      var objectsHeaderMediator = this.facade.retrieveMediator(DataObjectsHeaderMediator.ID);
      objectsHeaderMediator.getViewComponent().typeSelect.innerHTML = typeOptions;
      var relationsHeaderMediator = this.facade.retrieveMediator(DataRelationsHeaderMediator.ID);
      relationsHeaderMediator.getViewComponent().typeSelect.innerHTML = typeOptions;      
      //var relationsEntityName = relationsHeaderMediator.getViewComponent().entitySelect.value;
      var relationsEntityName = relationsHeaderMediator.getViewComponent().getEntitySelectValue();
      this.sendNotification(SjamayeeFacade.GRID_DATA_ENTITY_CHANGE,relationsEntityName);
      break;
    }
    this.parent(note);
  },
  setResizeButtonText: function(text) {
    this.facade.retrieveMediator(DataRelationsToolBarMediator.ID).getViewComponent().resizeButton.innerHTML = text;   
  },
  setGridSize: function(gridSize) {
    this.setListSize(gridSize); //OKEEE  !!! kept in listSize !!!
    var parentDetail = this.facade.retrieveMediator(DataParentDetailMediator.ID).getViewComponent();
    var childDetail = this.facade.retrieveMediator(DataChildDetailMediator.ID).getViewComponent();
    var gridList = this.getViewComponent();
    if (this.isGridFull() === true) {
      this.setPageSize(RelationsGridMediator.PAGE_SIZE_MAX);
      this.setEndOfList(this.getPageSize() - 1);      
      parentDetail.setAttribute("style","display:none;");
      childDetail.setAttribute("style","display:none;");
      gridList.setAttribute("style","width:100%;height:"+GridList.MAXIMUM_SIZE+"px;");
    } else {
      this.setPageSize(RelationsGridMediator.PAGE_SIZE_MIN);
      this.setEndOfList(this.getPageSize() - 1);
      parentDetail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
      childDetail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
      gridList.setAttribute("style","width:100%;height:"+GridList.NORMAL_SIZE+"px;");     
    }
    var resizeButtonText = (this.isGridFull() === true)?RelationsToolBar.RESIZE_BUTTON_FULL_VALUE:RelationsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
    this.setResizeButtonText(resizeButtonText);
  },
  createRelationVO: function(entity) {
    return new DataRelationVO(null,null,"",null,null,entity.id,null,null);
  },
  createRelation: function(vo) {
    return new DataRelation(vo);
  },
  getBackgroundHighliteColor: function() {
    return DataRelationsGridMediator.BACKGROUND_HIGHLITE_COLOR;
  }
});
DataRelationsGridMediator.ID = "DataRelationsGridMediator";
DataRelationsGridMediator.BACKGROUND_HIGHLITE_COLOR = "#D7E5FE;";

//Class: DataObjectsListMediator
var DataObjectsListMediator = new Class({
  Extends: ObjectsListMediator,
  initialize: function(viewComponent) {
    this.parent(DataObjectsListMediator.ID,viewComponent);
    var gridList = this.getViewComponent();
    //List left.
    this.listUICLeft = gridList.gridListSplitter.left.dataObjectsList;
    this.listUICLeft.addEvent(SjamayeeFacade.LIST_CLICK, this.onListClick);
    this.listUICLeft.addEvent(SjamayeeFacade.LINE_CLICK, this.onLineClick);
    this.listUICLeft.addEvent(SjamayeeFacade.LINE_MOUSEOVER, this.onLineMouseOver);
    this.listUICLeft.addEvent(SjamayeeFacade.LINE_MOUSEOUT, this.onLineMouseOut);
    this.listUICLeft.addEvent(SjamayeeFacade.LIST_KEYDOWN, this.onKeydown);
    //List right.
    this.listUICRight = gridList.gridListSplitter.right.dataObjectsList;
    this.listUICRight.addEvent(SjamayeeFacade.LIST_CLICK, this.onListClick);
    this.listUICRight.addEvent(SjamayeeFacade.LINE_CLICK, this.onLineClick);
    this.listUICRight.addEvent(SjamayeeFacade.LINE_MOUSEOVER, this.onLineMouseOver);
    this.listUICRight.addEvent(SjamayeeFacade.LINE_MOUSEOUT, this.onLineMouseOut);
    this.listUICRight.addEvent(SjamayeeFacade.LIST_KEYDOWN, this.onKeydown);
    //Initialize list.
    this.entityProxy = SjamayeeFacade.getInstance().retrieveProxy(DataEntityProxy.ID);
    //Initialize CommandBuffer.
    this.sendNotification(SjamayeeFacade.OBJECT_DATA_BUFFER_CLEAR,this);
  },
  onLineMouseOver: function(evt)        { this.parent(evt,this.getBackgroundHighliteColor()); },
  listNotificationInterests: function() {
    var result = this.parent();
    return result.concat([
      SjamayeeFacade.OLIST_DATA_SHOW,
      SjamayeeFacade.OLIST_DATA_REFRESH,
      SjamayeeFacade.OLIST_DATA_RESIZE,
      SjamayeeFacade.OLIST_DATA_TYPE_CHANGE,
      SjamayeeFacade.OLIST_DATA_REFOP_CHANGE,
      SjamayeeFacade.OLIST_DATA_FILTER_CLICK
    ]);
  },
  handleNotification: function(note)  {
    this.parent(note);
    var app = this.facade.getApplication();
    var gridList = this.getViewComponent();    
    switch (note.getName()) {
      case SjamayeeFacade.OLIST_DATA_SHOW:
      this.setListSize(this.getListSize());     
      //this.home();
      //this.sendNotification(SjamayeeFacade.OLIST_DATA_REFRESH);
      break;
      case SjamayeeFacade.OLIST_DATA_REFRESH:
      this.fillList();
      /*                                IS SOMETHING LIKE THIS NEEDED ???
      switch (this.getLastNavigation()) {
        case SjamayeeFacade.OLIST_DATA_HOME:      this.sendNotification(SjamayeeFacade.OLIST_DATA_HOME); break;
        case SjamayeeFacade.OLIST_DATA_PREVIOUS:  this.sendNotification(SjamayeeFacade.OLIST_DATA_PREVIOUS); break;
        case SjamayeeFacade.OLIST_DATA_UP:        this.sendNotification(SjamayeeFacade.OLIST_DATA_UP); break;
        case SjamayeeFacade.OLIST_DATA_DOWN:      this.sendNotification(SjamayeeFacade.OLIST_DATA_DOWN); break;
        case SjamayeeFacade.OLIST_DATA_NEXT:      this.sendNotification(SjamayeeFacade.OLIST_DATA_NEXT); break;
        case SjamayeeFacade.OLIST_DATA_END:       this.sendNotification(SjamayeeFacade.OLIST_DATA_END); break;
      }
      */
      break;
      case SjamayeeFacade.OLIST_DATA_RESIZE:
      var listSize = note.getBody();
      this.listResize(listSize);
      //this.home(); //TODO !!!
      this.sendNotification(SjamayeeFacade.OLIST_DATA_REFRESH);
      break;
      case SjamayeeFacade.OLIST_DATA_REFOP_CHANGE:
      this.sendNotification(SjamayeeFacade.FOCUS, ObjectsListRight.ID);
      break;
      case SjamayeeFacade.OLIST_DATA_TYPE_CHANGE:
      var type_code_name = note.getBody();
      //this.sendNotification(SjamayeeFacade.FOCUS, ObjectsListRight.ID);
      this.switchType(type_code_name);
      this.home();
      break;
      case SjamayeeFacade.OLIST_DATA_FILTER_CLICK:
      break;
    }
    this.parent(note);
  },
  setEdit: function(forced) {
    var mode = this.parent(forced);
    if (mode == GridListMediator.MODE_EDIT) {
      this.sendNotification(SjamayeeFacade.OBJECT_DATA_DETAIL);
    }
    return mode;
  },
  setDisplay: function(forced) {
    var mode = this.parent(forced);
    if (mode == GridListMediator.MODE_DISPLAY) {
      this.sendNotification(SjamayeeFacade.OBJECT_DATA_DETAIL);
    }
    return mode;
  },
  switchType: function(type_code_name) {
    return this;
  },
  getType: function(object) {
    var result = object.getModelType().getName();
    return result;
  },
  getLastNavigation: function() {
    return (this.parent())?this.parent():SjamayeeFacade.OLIST_DATA_HOME;
  },
  firstPage: function() {
    try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {
        this.parent();
        this.fillList(this.entityProxy.firstPage(this.getEndOfList()));
        this.setMessageText(ObjectsListMediator.HOME_MESSAGE_TEXT);       
        this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
    } catch(error) {
      Utils.alert("DataObjectsListMediator/firstPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  previousPage: function() {
    try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {     
        this.parent();
        this.fillList(this.entityProxy.previousPage(this.getEndOfList()));
        this.setMessageText(ObjectsListMediator.PREVIOUS_MESSAGE_TEXT);
        this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
    } catch(error) {
      Utils.alert("DataObjectsListMediator/previousPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  previousLine: function() {
    try {
      this.parent();
      this.fillList(this.entityProxy.previousLine(this.getEndOfList()));
      this.setMessageText(ObjectsListMediator.UP_MESSAGE_TEXT);
      this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
    } catch(error) {
      Utils.alert("DataObjectsListMediator/previousLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  nextLine: function() {
    try {
      this.parent();
      this.fillList(this.entityProxy.nextLine(this.getEndOfList()));
      this.setMessageText(ObjectsListMediator.DOWN_MESSAGE_TEXT);
      this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
    } catch(error) {
      Utils.alert("DataObjectsListMediator/nextLine Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  nextPage: function() {
    try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {     
        this.parent();
        this.fillList(this.entityProxy.nextPage(this.getEndOfList()));
        this.setMessageText(ObjectsListMediator.NEXT_MESSAGE_TEXT);
        this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
    } catch(error) {
      Utils.alert("DataObjectsListMediator/nextPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  lastPage: function() {
    try {
      if (this.setDisplay() == GridListMediator.MODE_DISPLAY) {     
        this.parent();
        this.fillList(this.entityProxy.lastPage(this.getEndOfList()));
        this.setMessageText(ObjectsListMediator.END_MESSAGE_TEXT);
        this.sendNotification(SjamayeeFacade.OLIST_DATA_SHOW);
      }
    } catch(error) {
      Utils.alert("DataObjectsListMediator/lastPage Error: "+error.message,Utils.LOG_LEVEL_ERROR);
    } finally {
      return this;
    }
  },
  setResizeButtonText: function(text) {
    this.facade.retrieveMediator(DataObjectsToolBarMediator.ID).getViewComponent().resizeButton.innerHTML = text;    
  },
  setListSize: function(listSize) {
    this.parent(listSize);
    var parentDetail = this.facade.retrieveMediator(DataParentDetailMediator.ID).getViewComponent();
    var childDetail = this.facade.retrieveMediator(DataChildDetailMediator.ID).getViewComponent();
    var gridList = this.getViewComponent();   
    if (this.isListFull() === true) {
      this.setPageSize(ObjectsListMediator.PAGE_SIZE_MAX);
      this.setEndOfList(this.getPageSize() - 1);      
      parentDetail.setAttribute("style","display:none;");
      childDetail.setAttribute("style","display:none;");
      gridList.setAttribute("style","width:100%;height:"+GridList.MAXIMUM_SIZE+"px;");
    } else {
      this.setPageSize(ObjectsListMediator.PAGE_SIZE_MIN);
      this.setEndOfList(this.getPageSize() - 1);      
      parentDetail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
      childDetail.setAttribute("style","width:100%;height:"+Detail.NORMAL_SIZE+"px;display:block;");
      gridList.setAttribute("style","width:100%;height:"+GridList.NORMAL_SIZE+"px;");     
    }
    var resizeButtonText = (this.isListFull() === true)?ObjectsToolBar.RESIZE_BUTTON_FULL_VALUE:ObjectsToolBar.RESIZE_BUTTON_NORMAL_VALUE;
    this.setResizeButtonText(resizeButtonText);
  },
  getBackgroundHighliteColor: function() {
    return DataObjectsListMediator.BACKGROUND_HIGHLITE_COLOR;
  } 
});
DataObjectsListMediator.ID = "DataObjectsListMediator";
DataObjectsListMediator.BACKGROUND_HIGHLITE_COLOR = "#D7E5FE;";