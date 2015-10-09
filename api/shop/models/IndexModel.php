<?php
class IndexModel{
	protected $db;
	protected $data;
	protected $ORM;	
	protected $resdata;
	protected $msg="";

	public function __construct(){
		$this->data=new ClearData();
		$this->ORM=new ORMModel();		
	}
	
	public function getListMenu($status = ''){
		// $sql="SELECT id, link, parent_id, id_content, public_menu, alias  
		// FROM menu ORDER BY id ASC";
		// $row = $this->ORM->getQueryDB($sql);
		$where_val = '';
		if($status == 'public'){
			$where_val = array('public_menu','=','1');	
		}
		
		$row=ORMModel::for_table('menu')
			->id()
			->link()
			->parent_id()
			->id_content()
			->public_menu()
			->alias()
			->where($where_val[0], $where_val[1], $where_val[2])
			->arbitrary("ORDER BY id ASC")
			->selectDB();
		return $row;
	}

	
	public function getPageById($id){
		$id = $this->data->clearArray($id);
		if(!empty($id)){
			$_val='menu.alias';
			if($this->data->clearInt($id) > 0){
				$_val='content.id';
			}	

			$id=$this->ORM->quote($id);
			$sql ="SELECT content.id, name,alias_content,tizer,description,price,
				img, parent_content,date_content, public_content, alias, link, public_menu 
				FROM content LEFT OUTER JOIN menu 
				ON content.id = menu.id_content WHERE $_val=$id AND content.public_content='1' limit 1";
			$row = $this->ORM->getQueryDB($sql);
			if(!empty($row)){
				$row_sub=ORMModel::for_table('content')
					->id()
					->name()
					->alias_content()
					->tizer()
					->description()
					->price()
					->img()
					->parent_content()
					->date_content()
					->public_content()
					->where('parent_content','=', $row['id'])
					->and_where('public_content','=', '1')				
					->arbitrary("ORDER BY id ASC")
					->selectDB();

					$row['blog']='';
			}
			if(!empty($row_sub)){	
				$row['blog']=$row_sub;
			}
			return $row;
		} else {
				return false;
		}
	}
}

