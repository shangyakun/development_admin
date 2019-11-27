<template>
	<div v-loading='loading' style="height: 100%;background: #f7f7f7;padding: 12px;width:100%;box-sizing: border-box;">
		<div class="top">员工胜任力模型>胜任力模型详情</div>
		<div class="line clear">
			<span class="normal fl" style="margin-left: 0">职级:</span>
			<div class="fl" v-if='row.employmentCategory=="管理类"'>
				<span :class='[active==1?"active":"normal"]' @click='job(1)'>m1</span>
				<span :class='[active==2?"active":"normal"]' @click='job(2)'>m2</span>
				<span :class='[active==3?"active":"normal"]' @click='job(3)'>m3</span>
				<span :class='[active==4?"active":"normal"]' @click='job(4)'>m4</span>
				<span :class='[active==5?"active":"normal"]' @click='job(5)'>m5</span>
				<span :class='[active==6?"active":"normal"]' @click='job(6)'>m6</span>
				<span :class='[active==7?"active":"normal"]' @click='job(7)'>m7</span>
				<span :class='[active==8?"active":"normal"]' @click='job(8)'>m8</span>
			</div>
			<div class="fl" v-if='row.employmentCategory=="专业类"'>
				<span :class='[active==1?"active":"normal"]' @click='job(1)'>p1</span>
				<span :class='[active==2?"active":"normal"]' @click='job(2)'>p2</span>
				<span :class='[active==3?"active":"normal"]' @click='job(3)'>p3</span>
				<span :class='[active==4?"active":"normal"]' @click='job(4)'>p4</span>
				<span :class='[active==5?"active":"normal"]' @click='job(5)'>p5</span>
				<span :class='[active==6?"active":"normal"]' @click='job(6)'>p6</span>
				<span :class='[active==7?"active":"normal"]' @click='job(7)'>p7</span>
				<span :class='[active==8?"active":"normal"]' @click='job(8)'>p8</span>
				<span :class='[active==9?"active":"normal"]' @click='job(9)'>p9</span>
				<span :class='[active==10?"active":"normal"]' @click='job(10)'>p10</span>
			</div>
			<div class="fl" v-if='row.employmentCategory=="支持类"'>
				<span :class='[active==1?"active":"normal"]' @click='job(1)'>s1</span>
				<span :class='[active==2?"active":"normal"]' @click='job(2)'>s2</span>
				<span :class='[active==3?"active":"normal"]' @click='job(3)'>s3</span>
				<span :class='[active==4?"active":"normal"]' @click='job(4)'>s4</span>
				<span :class='[active==5?"active":"normal"]' @click='job(5)'>s5</span>
			</div>
		</div>
		<div class="line clear">
			<div class="second fl">
				<span>职位:</span>
				<span class="blank">{{row.jobname}}</span>
			</div>
			<div class="second fl">
				<span>职类:</span>
				<span class="blank">{{row.employmentCategory}}</span>
			</div>
			<div class="second fl">
				<span>序列:</span>
				<span class="blank">{{row.employmentSequence}}</span>
			</div>
			<div class="second fl">
				<span>岗位类别:</span>
				<span class="blank">{{row.positionCategoryName}}</span>	
			</div>
		</div>
		<div class="line1" >
			<span class="title">专业能力</span>
		</div> 
		<el-table
		    :data="ablityList"
		    border
		    style="width: 100%;background: #fff;"
		    >
		    <el-table-column
		      prop="proAbility"
		      label="子维度"
		      width="150"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="definition"
		      label="定义"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="typeFour"
		      label="关键项"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="typeThree"
		      label="行为描述"
		      >
		    </el-table-column>
		</el-table>
		<div class="line1" >
			<span class="title">知识与技能</span>
		</div>
			<el-table
		    :data="skillList"
		    border
		    style="width: 100%;background: #fff;"
		    >
		    <el-table-column
		      prop="skillDescription"
		      label="该职位需掌握的知识与技能点"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="depth"
		      label="深度"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="breadth"
		      label="广度"
		      >
		    </el-table-column>
		</el-table> 
		<div class="line1" >
			<span class="title">工作经历/项目</span>
		</div>
		<div>
			<el-table
			    :data="experience"
			    border
			    style="width: 100%;background: #fff;"
			    >
			    <el-table-column
			      prop="experience"
			      label="在本序列晋升需经历的工作经验或者项目"
			      >
			    </el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	import { Loading } from 'element-ui';
    export default {
	    data() {
		    return {
		    	loading:false,
		    	active:'1',
		        ablityList:[],//技能
		        oWidth:'',
		        skillList:[],
		        experience:[],//经验
		        row:{},
      		}
        },
        methods:{
        	job(i){
        		this.loading = true;
        		switch(i){
        			case 1:
        			this.active = 1;
        			break;
        			case 2:
        			this.active = 2;
        			break;
        			case 3:
        			this.active = 3;
        			break;
        			case 4:
        			this.active = 4;
        			break;
        			case 5:
        			this.active = 5;
        			break;
        			case 6:
        			this.active = 6;
        			break;
        			case 7:
        			this.active = 7;
        			break;
        			case 8:
        			this.active = 8;
        			break;
        			case 9:
        			this.active = 9;
        			break;
        			case 10:
        			this.active = 10;
        			break;
        		}
        		this.skill();
        	},
        	skill(){//专业能力
        		let type = ''
        		if(this.row.employmentCategory=="管理类"){
        			type = 'M'+this.active;
        		}else if(this.row.employmentCategory=="专业类"){
        			type = 'P'+this.active;
        		}else{
        			type = 'S'+this.active;
        		}		
	            this.axios({
	                url:'/myRecord',
	                method:'POST',
	                params:{
	                  tempresidentnumber:type,//职级
	                  sequence:this.row.sequenceId,
	                  positionCategory:this.row.positionCategory
	                }
	            })
	            .then(res=>{
	                if(res.data.success){
	                	setTimeout(()=>{
        					this.loading = false;
	                	},300);
	                    this.ablityList = res.data.ability;
	                    this.skillList = res.data.skills;
	                    this.experience = res.data.workExperience;
	                }else{
	                 	setTimeout(()=>{
        					this.loading = false;
	                	},300);
	                }
	            })
	          .catch(res=>{

	            })
	        },
	       
        },
        mounted(){
        	this.row = JSON.parse(sessionStorage.getItem('row'));
        	this.skill();
        	this.oWidth=window.screen.width-168;
        }
    };
</script>
<style type="text/css" scoped>
    .active{
    	cursor: pointer;
    	color: #409EFF;
    	margin-left: 20px;
		font-size: 14px;
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
		height: 40px;
		margin: 12px 0;
	}
	.normal{
		margin-left: 20px;
		font-size: 14px;
		cursor: pointer;
	}
	.second{
		font-size: 14px;
		margin-right: 12%;
	}
	.title{
		display: inline-block;
		width: 140px;
		background: #eee;
		font-size: 14px;
		text-align: center;
		height: 100%;
	}
	.selectbtn{
		margin-left: 30px;
		width: 40px;
		height: 35px;
		background-color: #409EFF;
		color: #fff;
	}
	.importbtn{
		margin-left: 30px;
		width: 40px;
		height: 35px;
		background-color: #409EFF;
		color: #fff;
	}
	.bottom{
		font-size: 14px;
		margin-left: 10px;
	}
</style>