<template>
	<div v-loading='loading' style="height: 100%;background: #f7f7f7;padding: 12px;width:100%;box-sizing: border-box;">
		<div class="top clear">
			<span>胜任力模型配置</span>
			<el-upload
				class="upload-demo fr"
			  	action="http://10.1.0.86:7779/fileAdd/score"
			  	ref='upload'
			  	:before-upload='beforeUpload'
			  	:data='uploadData'
			  	:show-file-list='false'
			  	:on-success='uploadSuccess'
				:on-error='uploadErro'
			>
			 	<a href='javascript:;' class="link" type="primary">选择文件导入</a>
			</el-upload>
			<a class="fr link" download='胜任力模型模板.xls' href="./static/excel/model.xlsx">下载胜任力模型配置</a>
		</div>
		<div class="line1 clear">
			<div class="clear" >
                <span style="margin-right: 10px;font-size: 14px;float: left;">职类:</span>
                <span v-if='index<3' :class='[funType==index?"active":"normal"]' v-for='item,index of job' :key='index' @click="toActiveJob(index)">{{item.jobCategoryName}}</span>   
			</div>
			<div class="clear">
				<span style="margin-right: 10px;font-size: 14px;float: left;">序列:</span>
                <span :class='[sequenceIndex==index?"active":"normal"]' v-for='item,index of indexList' :key='index' @click='skill(index,item.sequenceId)'>{{item.sequenceName}}</span>   
			</div>
		</div>
		<!----------------- 分割线 ---------------->
		<div class="line clear">
			<div class="fl" style="margin-right: 10px;font-size: 14px">岗位类别:</div>
			<div v-for='item,index of postList' :key='index' :class='[postIndex==index?"active fl":"normal fl"]' @click='changePost(index)'>{{item.positionCategoryName}}</div>
		</div>
		<div>
			<!-- <div style="font-size: 15px;text-align: center;margin-bottom: 10px">品牌设计序列能力模型</div> -->
			<el-table
				v-if='funType==0'
			    :data="allList"
			    border
			    @cell-click='cellClick'
			    :span-method="objectSpanMethod"
			    style="width: 100%;background: #fff;"
			    >
			    <el-table-column
			      prop="dimension"
			      label="维度"
			      width="100"
			      >

			    </el-table-column>
			    <el-table-column
			      prop="proAbility"
			      label="子维度"
			      width="100">
			    </el-table-column>
			    <el-table-column
			      prop="level1"
			      label="M1">
			      
			    </el-table-column>
			    <el-table-column
			      prop="level2"
			      label="M2">
			      
			    </el-table-column>
			    <el-table-column
			      prop="level3"
			      label="M3"

			      >
			      
			    </el-table-column>
			    <el-table-column
			      prop="level5"
			      label="M4"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level5"
			      label="M5"
			      >
			     
			    </el-table-column>
			    <el-table-column
			      prop="level6"
			      label="M6"
			      >
			     
			    </el-table-column>
			    <el-table-column
			      prop="level7"
			      label="M7"
			      >
			      
			    </el-table-column>
			    <el-table-column
			      prop="level8"
			      label="M8"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level9"
			      label="M9"
			      >
			    </el-table-column>
			</el-table>
			<el-table
				v-if='funType==1'
			    :data="allList"
			    border
			    @cell-click='cellClick'
			    :span-method="objectSpanMethod"
			    style="width: 100%;background: #fff;"
			    >
			    <el-table-column
			      prop="dimension"
			      label="维度"
			      width="100"
			      >

			    </el-table-column>
			    <el-table-column
			      prop="proAbility"
			      label="子维度"
			      width="100"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level1"
			      label="p1">
			      	
			    </el-table-column>
			    <el-table-column
			      prop="level2"
			      label="p2">
			      
			    </el-table-column>
			    <el-table-column
			      prop="level3"
			      label="p3">
			      	
			    </el-table-column>
			    <el-table-column
			      prop="level4"
			      label="p4">
			      	
			    </el-table-column>
			    <el-table-column
			      prop="level5"
			      label="p5"
			      >
			      	
			    </el-table-column>
			    <el-table-column
			      prop="level6"
			      label="p6"
			      >
			      	
			    </el-table-column>
			    <el-table-column
			      prop="level7"
			      label="p7"
			      >
			      	
			    </el-table-column>
			    <el-table-column
			      prop="level8"
			      label="p8"
			      >
			      	
			    </el-table-column>
			    <el-table-column
			      prop="level9"
			      label="p9"
			      >
			      	
			    </el-table-column>
			     <el-table-column
			      prop="level10"
			      label="p10"
			      >
			      	
			    </el-table-column>
			</el-table>	
			<el-table
				v-if='funType==2'
			    :data="allList"
			    border
			    @cell-click='cellClick'
			    :span-method="objectSpanMethod"
			    style="width: 100%;background: #fff;"
			    >
			    <el-table-column
			      prop="dimension"
			      label="维度"
			      width="100"
			      >

			    </el-table-column>
			    <el-table-column
			      prop="proAbility"
			      label="子维度"
			      width="100"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level1"
			      label="S1"
			      >
			      	
			    </el-table-column>
			    <el-table-column
			      prop="level2"
			      label="S2"

			      >
			      	
			    </el-table-column>
			    <el-table-column
			      prop="level3"
			      label="S3"

			      >
			      	
			    </el-table-column>
			    <el-table-column
			      prop="level4"
			      label="S4"
			      >
			      	
			    </el-table-column>
			    <el-table-column
			      prop="level5"
			      label="S5"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level6"
			      label="S6"
			      >
			      	
			    </el-table-column>
			    <el-table-column
			      prop="level7"
			      label="S7"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level8"
			      label="S8"
			      >
			    </el-table-column>
			</el-table>
		</div>
		<el-dialog title="提示" :visible.sync="dialogTableVisible">
		  	<ul style='min-height: 200px;max-height:400px;overflow-y: scroll;'>
		  		<li class="erroritem" v-for='item,index of errorData'>{{item}}</li>
		  	</ul>
		</el-dialog>
		<el-dialog
		  	title="Level级别"
		  	:visible.sync="dialogVisible"
		  	width="30%">
		  	<span><input style='width: 50%;border:1px solid #ee;outline: none;height:30px;line-height: 30px;' placeholder="请输入0-5的数字" @input='handleInput($event)' v-model='count' type="text"></span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="confirm">确 定</el-button>
			  </span>
		</el-dialog>
	</div>
</template>
<script>
	import { Loading } from 'element-ui';
    export default {
	    data() {
		    return {
		    	errorData:[],
		    	dialogTableVisible:false,
		    	uploadData:{},
		    	loading:false,
		    	dialogVisible:false,
		    	postIndex:0,
		        funType:0,//职类
		        sequenceIndex:0,//序列
		    	active1:0,//专业能力
		        currentList:[],//专业能力
		        job:[],//职类列表
		        indexList:[],//序列列表
		        experience:[],//工作项目经历
		        knowledgeList:[],//知识与技术
		        sequenceId:'',
		        allList:[],
		        postList:[],//岗位列表
		        postId:'',
		        count:0,
		        uuid:'',
		        spanArr:[],
		        key:'',
		        rank:'',//职级
      		}
        },
        methods:{
        	beforeUpload(file){//上传之前做判断
				let reg = /\.(xlsx|xls)$/;
				if(!reg.test(file.name)){
					this.$message({
			          	message: '请上传excel文件',
			          	type: 'warning'
			        });
			    	this.$refs.upload.clearFiles();
			    	return false;
				};
				this.uploadData.positionCategory = this.postId;
				this.uploadData.sequence = this.sequenceId;
				// this.uploadData.file = file;
        	},
        	uploadSuccess(res){//上传成功之后
        		console.log(!res.data.error)
        		if(res.success&&!res.data.error){
					this.getExperience();
					this.$message({
			          	message: '上传成功',
			          	type: 'success'
			        });
        		}else{
        			this.$message({
			          	message: '上传失败，'+res.errorMsg,
			          	type: 'warning'
			        });
			        if(res.data.error.length>0){
			        	this.dialogTableVisible = true;
			        	this.errorData = res.data.error;
			        }
        		}
			    this.$refs.upload.clearFiles();
        	},
        	uploadErro(){//上传失败

        	},
        	changePost(index){//切换岗位类别
        		this.postIndex = index;
        		this.loading = true;
        		this.postId = this.postList[index].positionCategoryUuid;
        		this.getExperience();
        	},
        	handleInput(e){
        		this.count = e.target.value.replace(/[^0-5]/g,'');
        		let num = parseInt(e.target.value)
        		if(num>5){
        			this.count = null;
        		}
        	},
        	confirm(){
        		let data = {};
        		data.score = this.count;
        		data.uuid = this.uuid;
        		data.tempresidentnumber = this.rank;
        		if(this.key=='kn'){
        			data.positionCategory = this.postId;
        			this.updateSkill(data);
        		}else{
        			data.sequence = this.sequenceId;
        			this.updateAbility(data);
        		}
        	},
        	updateSkill(data){
        		this.axios({
        			url:'/updateskillScore',
        			params:data,
        			method:"POST"
        		})
        		.then(res=>{
        			if(res.data.success){
		        		this.dialogVisible = false;
						this.getExperience();
        			}
        		});
        	},
        	updateAbility(data){//修改专业能力
        		let url = '';
        		this.axios({
        			url:'/updateAbilityScore',
        			params:data,
        			method:'POST'
        		})
        		.then(res=>{
        			if(res.data.success){
        				this.dialogVisible = false;
						this.getExperience();
        			}
        		});
        	},
        	cellClick(row, column){//获取点击这一行的数据，设置初始值接下来就是修改的问题了，so easy
        		if(row.key=='ab'||row.key=='kn'){
        			if(column.property.indexOf('level')>-1){
        				this.dialogVisible = true;
		        		this.key = row.key;
		        		// this.property = column.property;
		        	//因为后台只截取数字，所以我传参数只保证数字正确，第一个字母无所谓，故我代替level为l，可以忽略。
		        		this.rank = column.property.replace('level','l');
		        		this.count = row[column.property];
		        		this.uuid = row.uuid;
        			}
        		}
        	},
        	objectSpanMethod({ row, column, rowIndex, columnIndex }) {
		        if (columnIndex === 0) {
		        	if(rowIndex<this.currentList.length){
		        		const _row = this.spanArr[rowIndex];
			    		const _col = _row>0 ? 1 : 0;
			    		return {
			    			rowspan: _row,
			    			colspan: _col
			    		}
		        	}else{
		        		return {
		        			rowspan:1,
		        			colspan:1
		        		}
		        	}
		    		
		    	}
		    }, 
		    getPositionCategory(){//获取岗位
        		this.axios({
        			url:"/positionCategory/list",
        			method:"GET",
        			params:{
						sequence:this.sequenceId
        			}
        		})
        		.then(res=>{
        			if(res.data.success){
        				if(res.data.data.length>0){
        					this.postList = res.data.data;
	        				if(this.postIndex===0){
	        					this.postId = this.postList[0].positionCategoryUuid;
	        				};
        				}else{
        					this.postList = [];
        				}
        				this.getExperience();
        			};
        		})
        	},
        	toActiveJob(index){//职类事件
	        	this.postIndex = 0;
	        	this.sequenceIndex = 0;
        		this.funType = index;
        		this.indexList = this.job[index].sequences;
        		this.sequenceId = this.indexList[0].sequenceId;
				this.getAbilityList();
        	},
        	jobList(){//获取职类和序列
	            this.axios({
	                url:'/getCategoryAndSequence',
	                method:'GET',
	            })
	            .then(res=>{
	                if(res.data.success){
	                	this.job = res.data.data;
	                	this.indexList = this.job[0].sequences;
	                	this.sequenceId = this.indexList[0].sequenceId;
	                	this.getPositionCategory();
	                }else{
	                 
	                }
	            })
	            .catch(res=>{

	            })
	        },
	        getExperience(){//项目经历
	        	this.axios({
	        		url:'/experiencesList',
	        		method:"GET",
	        		params:{
	        			sequence :this.sequenceId
	        		}
	        	})
	        	.then(res=>{
	        		setTimeout(()=>{
        				this.loading = false;
        			},300)
	        		if(res.data.success){
	        			let data = res.data.workExperience||[];
	        			if(data.length){
	        				if(this.funType==0){
	        					data[0].dimension = '工作/项目经历';
		        				data[0].level1 = data[0].level1Experience||'';
		        				data[0].level2 = data[0].level2Experience||'';
		        				data[0].level3 = data[0].level3Experience||'';
		        				data[0].level4 = data[0].level4Experience||'';
		        				data[0].level5 = data[0].level5Experience||'';
		        				data[0].level6 = data[0].level6Experience||'';
		        				data[0].level7 = data[0].level7Experience||'';
		        				data[0].level8 = data[0].level8Experience||'';
		        				data[0].uuid = data[0].uuid;
		        				data[0].key = 'ex';
	        				}else if(this.funType==1){
								data[0].dimension = '工作/项目经历';
		        				data[0].level1 = data[0].level1Experience||'';
		        				data[0].level2 = data[0].level2Experience||'';
		        				data[0].level3 = data[0].level3Experience||'';
		        				data[0].level4 = data[0].level4Experience||'';
		        				data[0].level5 = data[0].level5Experience||'';
		        				data[0].level6 = data[0].level6Experience||'';
		        				data[0].level7 = data[0].level7Experience||'';
		        				data[0].level8 = data[0].level8Experience||'';
		        				data[0].level9 = data[0].level9Experience||'';
		        				data[0].level10 = data[0].level10Experience||'';
		        				data[0].uuid = data[0].uuid;
		        				data[0].key = 'ex';
	        				}else{
	        					data[0].dimension = '工作/项目经历';
		        				data[0].level1 = data[0].level1Experience||'';
		        				data[0].level2 = data[0].level2Experience||'';
		        				data[0].level3 = data[0].level3Experience||'';
		        				data[0].level4 = data[0].level4Experience||'';
		        				data[0].level5 = data[0].level5Experience||'';
		        				data[0].level6 = data[0].level6Experience||'';
		        				data[0].level7 = data[0].level7Experience||'';
		        				data[0].level8 = data[0].level8Experience||'';
		        				data[0].uuid = data[0].uuid;
		        				data[0].key = 'ex';
	        				};
	        			};
	        			this.getAbilityList();
	        			this.experience = data;
	        		}
	        	})
	        },
	        getAbilityList(){//专业能力分值
	        	this.axios({
	        		url:'/abilityScoreList',
	        		method:"GET",
	        		params:{
	        			sequence:this.sequenceId
	        		}
	        	})
	        	.then(res=>{
	        		if(res.data.success){
	        			let data = res.data.data||[];
	        			if(data.length>0){
	        				for(let i=0;i<data.length;i++){
		        				data[i].dimension = '专业能力';
		        				data[i].key = 'ab';
		        			};
		        			for(let i=0;i<data.length;i++){
					        	this.spanArr.push(0);
					        };
	        			}else{
	        				data = [];
	        			}
	        			this.currentList = data;
				        this.spanArr[0] = data.length;
	                    this.allList =this.currentList.concat(this.experience);
	        			// this.getSkill();
	        		}
	        	})
	        },
	        getSkill(){//知识技能分值
	        	this.axios({
	                url:'/skillScoreList',
	                method:'GET',
	                params:{
	                	positionCategory :this.postId
	                }
	            })
	            .then(res=>{
	            	if(res.data.success){
		            	let data = res.data.data||[];
		            	if(data.length>0){
		            		if(this.funType==0){
	        					data[0].dimension = '知识与技能';//level4Experience
		        				data[0].level1 = data[0].level1;
		        				data[0].level2 = data[0].level2;
		        				data[0].level3 = data[0].level3;
		        				data[0].level4 = data[0].level4;
		        				data[0].level5 = data[0].level5;
		        				data[0].level6 = data[0].level6;
		        				data[0].level7 = data[0].level7;
		        				data[0].level8 = data[0].level8;
		        				data[0].uuid = data[0].uuid;
		        				data[0].key = 'kn';
	        				}else if(this.funType==1){
								data[0].dimension = '知识与技能';//level4Experience
		        				data[0].level1 = data[0].level1;
		        				data[0].level2 = data[0].level2;
		        				data[0].level3 = data[0].level3;
		        				data[0].level4 = data[0].level4;
		        				data[0].level5 = data[0].level5;
		        				data[0].level6 = data[0].level6;
		        				data[0].level7 = data[0].level7;
		        				data[0].level8 = data[0].level8;
		        				data[0].level9 = data[0].level9;
		        				data[0].level10 = data[0].level10;
		        				data[0].uuid = data[0].uuid;
		        				data[0].key = 'kn';
	        				}else{
	        					data[0].dimension = '知识与技能';//level4Experience
		        				data[0].level1 = data[0].level1;
		        				data[0].level2 = data[0].level2;
		        				data[0].level3 = data[0].level3;
		        				data[0].level4 = data[0].level4;
		        				data[0].level5 = data[0].level5;
		        				data[0].level6 = data[0].level6;
		        				data[0].level7 = data[0].level7;
		        				data[0].uuid = data[0].uuid;
		        				data[0].key = 'kn';
	        				};
		            	}
	                    this.knowledgeList = data;
	                    this.allList =this.currentList.concat(data).concat(this.experience);
	                    // console.log(this.allList)
	            	}
	            })
	        },
	        skill(index,id){//专业能力
	        	this.postIndex = 0;
        		this.sequenceIndex = index;
        		this.sequenceId = this.indexList[index].sequenceId;
				this.getPositionCategory();
	        },
	        // knowledge(index,id){//知识与技能
	        //     this.axios({
	        //         url:'skillsList',
	        //         transformResponse: [function (data) {
	        //           // 对 data 进行任意转换处理
	        //           data  = JSON.parse(data);
	        //           return data;
	        //         }],
	        //         method:'GET',
	        //         params:{
	        //         	positionCategory:id
	        //         }
	        //     })
	        //     .then(res=>{
	        //         if(res.data.success){
	        //             this.knowledgeList = res.data.skills;
	        //             // this.knowledgeList = this.knowledgeList.concat(this.currentList);
	        //             this.experience = this.experience.concat(this.knowledgeList).concat(this.currentList);
	        //         }else{
	                 
	        //         }
	        //     })
	        //   .catch(res=>{

	        //     })
	        // },  
        },
        mounted(){
        	this.jobList();
        	this.oWidth=window.screen.width-168;
        }
    }
</script>
<style type="text/css" scoped>
    .active{
    	cursor: pointer;
    	color: #409EFF;
    	margin-right: 20px;
    	font-size: 14px;
    	float: left;
    }
    .normal{
    	font-size: 14px;
    	margin-right: 20px;
    	cursor: pointer;
    	float: left;
    }
    .normal1{
    	width: 140px;
    	height: 40px;
    	/* background-color: #eee; */
    	font-size: 15px;
    	line-height: 40px;
    	text-align: center;
    	margin: 10px 10px 10px 0;
    }
    .active1{
    	width: 140px;
    	height: 40px;
    	background-color: #409EFF;
    	font-size: 15px;
    	line-height: 40px;
    	text-align: center;
    	margin: 10px 10px 10px 0;
    	color: #fff;
    }
	.top{
		padding-left: 12px;
		height: 50px;
		background-color: #fff;
		line-height: 50px;
		font-size: 15px;
		margin-bottom: 12px ;
	}
	.line{
		background-color: #fff;
		line-height: 60px;
		padding-left: 12px;
		margin-bottom: 12px;
	}
	.line1{
		background-color: #fff;
		line-height: 40px;
		padding-left: 12px;
		margin-bottom: 12px;
	}
	.link{
		color: #409EFF;
		font-size: 14px;
		font-weight: 400;
		text-decoration: underline;
		margin:0 20px 0 10px;
	}
	.erroritem{
		padding: 5px 0;
	}
</style>