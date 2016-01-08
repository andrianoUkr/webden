<?php
class IndexController implements IController {
	protected $data;
	protected $model;
	protected $viewForAjax;
	protected $params;
	protected $format;
	
	/* start IndexController */
	public function __construct() {
		$fc=Router::getInstance();
		$this->params=$fc->getParams();	
		$this->format=$fc->getFormat();
		$this->makeObj();
	}
	
	/* Creation model and view objects */
	protected function makeObj() {
		$this->data=new ClearData();
		$this->model=new IndexModel();
		$this->viewForAjax=new ViewForAjax();	
	}
	
	/* Page by default */
	public function getIndexAction () {	
		echo "index page!";
	}
	
	/* get list all book */
	public function getListMenuAction() {	
		if($this->params['status']){
			$result=$this->model->getListMenu($this->params['status']);
			if($result){
				$arr_list = $result;
				foreach($result as $key=>$value){
					if($value['parent_id']> 0 ){
						$id_par = $value['parent_id'];
						foreach($arr_list as $ind=>$val){
							if($val['id'] == $id_par){
								$arr_list[$ind]['sub'][] = $value;
								unset($arr_list[$key]);
								break;
							}
						}			
					}
					else{
						$arr_list[$key]['sub'] = '';
					}
				}
				$result=array_values($arr_list);
			} else {
					$result = array();
					$result['success']= 0;
					$result['msg']= 'not fields';
			}
		} else {
			$result = array();
			$result['success']= 0;
			$result['msg']= 'not params';		
		}
		return $this->viewForAjax->switchFormat($result	, $this->format);			
	}	
	
	/* get list page  by ID*/
	public function getPageAction() {
		if (!empty($this->params['alias'])) {
			$page=$this->params['alias'];
		} elseif (!empty($this->params['id'])){ 
			$page=$this->params['id'];
		}
		if($page){
			$result = $this->model->getPageById($page);	
			if(!$result){
				$result = array();
				$result['success']= 0;
				$result['msg']= 'not fields';
			}
			return $this->viewForAjax->switchFormat($result, $this->format);				
		}
	}		
}
