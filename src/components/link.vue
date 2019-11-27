<style type="text/css" scoped>
	.top{
		padding-left: 12px;
		height: 50px;
		background-color: #fff;
		line-height: 50px;
		font-size: 15px;
	}
	.title{
		font-size: 14px;
	}
	.table{
		margin: 20px;
		width: 200px;
		padding: 10px;
		height: 350px;
		border: solid 0.5px #ddd;
		overflow-y: scroll;
	}
	.content{
		margin: 0 auto;
		/* margin: 20px 0; */
	}
	.nullbtn,.activebtn{
		width: 60px;
		height: 25px;
		background: #eee;
		line-height: 25px;
		text-align: center;
		border-radius: 4px;
		margin: 20px 10px 0;
		color: #888F96;
		cursor: pointer;
	}
	.activebtn{
		background-color: #409EFF;
		color: #fff;
	}
	.listitem{
		padding-left: 20px;
	}
</style>
<template>
	<div style="height: 100%;background: #f7f7f7;padding: 12px;width:100%;box-sizing: border-box;">
		<div style="background: #fff;height: 100%;width: 100%">
			<div class="top">岗位类别关联</div>
			<div style="height: 12px;background-color: #f7f7f7"></div>
			<div class="content clear">
				<div class="fl">
					<div class="title">
						选择序列
					</div>
					<el-aside width="220px" style="background-color:#fff;border: 1px solid #eee;height: 370px;margin:20px;">
					    <el-menu>
					      	<el-submenu :index="item.jobCategoryName" v-for='item,index of list' :key='index'>
					        	<template slot="title">{{item.jobCategoryName}}</template>
					        	<el-menu-item-group>
					          		<el-menu-item @click='menuClick(sub.sequenceName,sub.sequenceId)' :index='sub.sequenceName' v-for='sub,i of item.sequences' :key='i'>{{sub.sequenceName}}</el-menu-item>
					        	</el-menu-item-group>
					      	</el-submenu>
					    </el-menu>
					</el-aside>
				</div>
				<div class="fl" style="margin-left: 80px">
					<div class="title">
						待关联岗位
					</div>
					<div class="table">
						<div class="" v-for='item,index of postList' :key='index'>
						 	<el-checkbox :disabled='cancleJobids.length>0' v-model="item.checked">{{item.jobname}}</el-checkbox>
						</div>
					</div>
				</div>
				
				<div class="fl" style="width:120px;margin-top: 120px">
					<div>
						<el-button style='width:120px;' type="primary" :disabled='isOk' @click='confirm'>关联</el-button>
					</div>
					<div>
						<el-button style='width:120px;margin-top: 20px;' type="primary" :disabled='cancleJobids.length<1' @click='cancle'>取消关联</el-button>
					</div>
				</div>
				<div class="fl">
					<div class="title">
						已关联岗位类别
						<a href="javascript:;" class="fr" @click='dialogVisible=true'>添加类别</a>
					</div>
					<div class="table">
						<div class="" v-for='item,index of categoryList' :key='index'>
							<!-- <el-radio v-model="positionCategory" :label="item.positionCategory">{{item.positionCategoryName}}</el-radio> -->
							<div @click='checkedCate(index)' style="cursor: pointer;">
								<!-- <img src="../assets/checked.png" style='vertical-align: middle;' v-if='item.checked' width="18" alt="">
								<img src="../assets/checked_default.png" style='vertical-align: middle;' v-if='!item.checked' width="18" alt="">
								<span style="font-size: 14px;display: inline-block;line-height: 18px;vertical-align: middle;">{{item.positionCategoryName}}</span> -->
								<el-checkbox :disabled='!item.checked&&isDis' v-model="item.checked">{{item.positionCategoryName}}</el-checkbox>
							</div>
							<div class="listitem" @click='chooseCancle(index,i)' v-for='sub,i of item.jobs' :key='i'>
								<img src="../assets/checked.png" style='vertical-align: middle;' v-if='sub.checked' width="16" alt="">
								<img src="../assets/checked_default.png" style='vertical-align: middle;' v-if='!sub.checked' width="16" alt="">
								<span style="font-size: 14px;display: inline-block;line-height: 18px;vertical-align: middle;">{{sub.jobname}}</span>
						 		<!-- <el-checkbox v-model="sub.checked">{{sub.jobname}}</el-checkbox> -->
							</div>
							<!-- {{sub.jobname}} -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog
		  	title="添加岗位类别"
		  	:visible.sync="dialogVisible"
		  	width="30%"
		>
		  	<el-input v-model="newType" placeholder="请输入岗位类别名称"></el-input>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addNewType">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				isDis:false,
				newType:'',
				dialogVisible:false,
				active:1,
				list:[],
				postList:[],
				categoryList:[],
				jobIds:[],
				positionCategory:[],
				name:'',
				isCancle:true,
				isAdd:false,
				sequenceId:'',
				cancleJobids:[],//取消关联的ids
			}
		},
		watch:{
			postList:{
				deep:true,
				handler:function(val){
					let arr = [];
					for(let i=0;i<val.length;i++){
						if(val[i].checked){
							arr.push(val[i].jobtitle);
						}
					};
					this.jobIds = arr;
				}
			},
		},
		computed:{
			isOk(){
				if(this.jobIds.length&&this.positionCategory.length){
					return false;//取消禁止
				}else{
					return true;//禁止点击
				}
			},
		},
		methods:{
			addNewType(){
				let str = this.newType.replace(/\s+/g,"");
				console.log(str)
				for(let i=0;i<this.categoryList.length;i++){
					if(this.categoryList[i].positionCategoryName===str){
						this.$message('已存在该类别');
						return;
					};
				};
				if(this.sequenceId){
					this.axios({
						url:'/positionCategory/add',
						params:{
							sequence:this.sequenceId,
							positionCategoryName:this.newType
						},
						method:"POST"
					})
					.then(res=>{
						if(res.data.success){
							this.newType = '';
							this.dialogVisible = false;
							this.getPositionCategory();
							this.$message({
								type:'success',
								message:'添加类别成功'
							});
						}
					})
				}else{
					this.$message('请选择序列后再添加')
				}
				
			},
			chooseCancle(index,sub){//选择取消关联项
				if(this.categoryList[index].checked||this.jobIds.length) return;
				// let data = this.categoryList[index].jobs;
				this.positionCategory.push(this.categoryList[index].positionCategoryUuid);
				this.categoryList[index].jobs[sub].checked = !this.categoryList[index].jobs[sub].checked;
				let arr = [];
				for(let i=0;i<this.categoryList.length;i++){
					let data = this.categoryList[i].jobs;
					if(data.length>0){
						console.log(data)
						for(let j=0;j<data.length;j++){
							if(data[j].checked){
								arr.push(data[j].jobId);
							};
						}
					}
				};
				this.cancleJobids = arr;
				if(this.cancleJobids.length){
					this.isDis = true;
				}else{
					this.isDis = false;
					this.positionCategory = [];
				}
			},
			cancle(){//取消关联
				this.axios({
					url:'/removePositionCategory',
					params:{
						jobIds:this.cancleJobids.join(','),
						positionCategory:this.positionCategory.join(',')
					},
					method:"POST"
				})
				.then(res=>{
					if(res.data.success){
						this.positionCategory = [];
						this.cancleJobids = [];
						this.isDis = false;
						this.getList();
						this.getPositionCategory();
						this.$message({
							type:'success',
							message:'取消关联成功'
						});
					};
				})
			},
			checkedCate(index){
				var arr = [];
				// this.positionCategory = !this.categoryList[index].checked?this.categoryList[index].positionCategoryUuid:'';
				if(!this.categoryList[index].checked){
					arr.push(this.categoryList[index].positionCategoryUuid);
				};
				this.positionCategory = arr;
				this.isDis = !this.categoryList[index].checked?true:false;
			},
			confirm(){//确认关联
				this.axios({
					url:'/toPositionCategory',
					params:{
						jobIds:this.jobIds.join(','),
						positionCategory:this.positionCategory.join(',')
					},
					method:"POST"
				})
				.then(res=>{
					if(res.data.success){
						this.jobIds = [];
						this.positionCategory = [];
						this.isDis = false;
						this.getList();
						this.getPositionCategory();
						this.$message({
							type:'success',
							message:'关联成功'
						});
					}
				})
			},
			menuClick(name='',id=''){//菜单点击选择序列
				this.categoryList = [];
				this.positionCategory = [];
				this.cancleJobids = [];
				this.isDis = false;
				this.sequenceId = id;
				this.jobIds = [];
				this.name = name;
				this.getList();
				this.getPositionCategory();
			},
			getList(){//获取未关联的岗位列表
				this.axios({
	                url:'/selectJob',
	                method:'POST',
	                params:{
	                	employmentSequence:this.name,//序列
	                	pageNum:'',
	                	pageSize:'0',
	                }
	            })
	            .then(res=>{
	            	if(res.data.success){
	            		let data = res.data.data.filter(function (item) {
						 	return !item.positionCategory;
						});
	            		for(let i=0;i<data.length;i++){
	            			data[i].checked = false;
	            		};
	            		this.postList = data;
	            	}
	            })
			},
			getPositionCategory(){//获取序列下的关联岗位类别列表
        		this.axios({
        			url:"/positionCategory/list",
        			method:"POST",
        			params:{
						sequence:this.sequenceId
        			}
        		})
        		.then(res=>{
        			if(res.data.success){
        				let data = res.data.data;
        				for(let i=0;i<data.length;i++){
        					data[i].checked = false;
        					if(data[i].jobs.length){
        						for(let j=0;j<data[i].jobs.length;j++){
        							data[i].jobs[j].checked = false;
        						}
        					}
        				};
        				this.categoryList = data;
        			}
        		})
        	},
			jobList(){//获取职类和序列
	            this.axios({
	                url:'/getCategoryAndSequence',
	                method:'POST',
	                params:{

	                }
	            })
	            .then(res=>{
	                if(res.data.success){
	                	let data = res.data.data;
	                	this.list = data;
	                	for(let i=0;i<data.length;i++){
	                		this.indexList = this.indexList.concat(data[i].sequences)
	                	};
	                }else{
	                 	
	                }
	            })
	          	.catch(res=>{

	            })
	        },
		},
		mounted(){
			this.jobList();
		}
	}
</script>