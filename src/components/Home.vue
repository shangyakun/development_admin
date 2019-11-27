<template>
	<div style="height: 100%;background: #f7f7f7;padding: 12px;width:100%;box-sizing: border-box;">
		<div class="top">员工胜任力模型</div>
		<div class="line clear">
			<div class="fl" >
                <span style="margin-right: 10px">职类</span>   
                <el-select v-model="jobId1" @change='selectChange' filterable placeholder="请选择">
                    <el-option
                        v-for="item,index in job"
                        :key="index"
                        :label="item.jobCategoryName"
                        :value="item.jobCategoryName">
                    </el-option>
                </el-select>
			</div>
			<div class="fl" style="padding-left: 30px">
                <span style="margin-right: 10px">序列</span>
                <el-select v-model="sequenceId" placeholder="请选择序列">
                    <el-option
                        v-for="item,index in indexList"
                        :key="index"
                        :label="item.sequenceName"
                        :value="item.sequenceName">
                    </el-option>
                </el-select>
			</div>
			<div class="fl" style="padding-left: 30px">
				<!-- <input type="text" placeholder="按工号或姓名查找" v-model='content'  style="width:210px;height:36px;border:solid 1.5px #dcdfe6;font-size: 14px;border-radius: 6px"> -->
				<span class="fl">岗位</span>
				<div class="fl" style="margin-left: 10px">
					<el-input
					  placeholder=""
					  v-model="content"
					  @keyup.enter.native='modelTable'
					  clearable>
					</el-input>					
				</div>	
			</div>
			<el-button type="primary" style='margin-left: 10px' @click='modelTable'>查询</el-button>
		</div>
		<el-table
		 	v-loading="loading2"
		    :data="currentList"
		    border
		    style="width: 100%;background: #fff;"
		    :row-class-name="tableRowClassName"
		    @cell-mouse-enter="enter"
		    @cell-mouse-leave="leave"
		    >
		    <el-table-column
		      label="序号"
		      type="index"
		      style="font-size: 19px"
		     >
		    </el-table-column>
<!-- 		    <el-table-column
		      label="姓名"
		    >
		    <template scope="scope">
            	<span v-bind:class="{active: (name === scope.row.name)}">{{scope.row.name}}</span>
      		</template>
		    </el-table-column> -->
		    <el-table-column
		      prop="employmentCategory"
		      label="职类"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="employmentSequence"
		      label="序列"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="jobname"
		      label="岗位"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="positionCategoryName"
		      label="岗位类别"
		      >
		    </el-table-column>
		    </el-table-column>
		    <el-table-column
		      label="操作"
		      >
		      <template slot-scope="scope">
		        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<div style="text-align:center;background: #fff">
			<el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :page-sizes="[10, 20, 30, 40]"
		      :page-size="10"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
		</div>
	</div>
</template>
<script>
	import { Loading } from 'element-ui';
    export default {
	    data() {
		    return {
		    	job:[],//职类
		    	jobName:[],//职类名称
		    	jobId1:'',
		    	jobId:[],
		    	indexList:[],
		    	indexId:[],
		    	indexName:[],
		    	sequenceId:'',
		        loading2: true,
		        content:'',
		        currentList:[],
		        total:0,
		        pageSize:10,
		        pageNum:1,
      		}
        },
        methods:{
        	selectChange(val){
        		this.indexList = [];
        		this.sequenceId = '';
        		if(val=='管理类'){
        			this.indexList = this.job[1].sequences;
        			this.indexList.unshift({sequenceId: '', sequenceName: "全部"});
        		}else if(val==='专业类'){
        			this.indexList = this.job[2].sequences;
        			this.indexList.unshift({sequenceId: '', sequenceName: "全部"});
        		}else if(val==='支持类'){
        			this.indexList = this.job[3].sequences;
        			this.indexList.unshift({sequenceId: '', sequenceName: "全部"});
        		}else if(val==='管培生'){
        			this.indexList = this.job[4].sequences;
        			this.indexList.unshift({sequenceId: '', sequenceName: "全部"});
        		}else if(val==='实习生'){
        			this.indexList = this.job[5].sequences;
        			this.indexList.unshift({sequenceId: '', sequenceName: "全部"});
        		}else if(val==='全部'){
        			this.indexList.unshift({sequenceId: '', sequenceName: "全部"});
        			this.sequenceId = '全部'
        		}
        	},
        	handleClick(row){//查看
        		let str=JSON.stringify(row);
        		sessionStorage.setItem('row',str)
        		this.$router.push({
        			path:'/detail',
        			
        		})
        	},
    		tableRowClassName({row, rowIndex}) {
		        if (rowIndex === 1) {
		          return 'warning-row';
		        } else if (rowIndex === 3) {
		          return 'success-row';
		        }
		        return '';
		    },
        	enter(row, column, cell, event){
        		this.name = row.name;
        	},
        	leave(row, column, cell, event){
        		this.name='';
        	},
        	jobList(){//获取职类和序列
        		this.loading2 = true;
	            this.axios({
	                url:'getCategoryAndSequence',
	                transformResponse: [function (data) {
	                  // 对 data 进行任意转换处理
	                  data  = JSON.parse(data);
	                  return data;
	                }],
	                method:'POST',
	                params:{
	                }
	            })
	            .then(res=>{
	                if(res.data.success){
	                	this.loading2 = false;
	                	this.job = res.data.data;
	                   this.job.unshift({
	                        jobCategoryId:'',
	                        jobCategoryName:'全部'
	                    });
	                }else{
	                 
	                }
	            })
	          .catch(res=>{

	            })
	        },
	        modelTable(){//搜索岗位默认显示全部
	        	if(this.jobId1=='全部'){
		        		this.jobId1 = '';
	        	};
	        	if(this.sequenceId==''||this.sequenceId==='全部'){
	        		this.sequenceId = '';
	        	};
	            this.axios({
	                url:'/selectJob',
	                method:'POST',
	                params:{
	                	employmentCategory:this.jobId1||'',//职类
	                	employmentSequence:this.sequenceId||'',//序列
	                	jobname:this.content||'',
	                	pageNum:this.pageNum,
	                	pageSize:this.pageSize,
	                }
	            })
	            .then(res=>{
	            	if(this.jobId1==''){
		        		this.jobId1 = '全部';
		        	}if(this.sequenceId==''){
		        		this.sequenceId = '全部';
		        	}
	                if(res.data.success){
	                	this.currentList = res.data.data;
	                	this.total = res.data.totalCount;
	                }else{
	                 
	                }
	            })
	          .catch(res=>{

	            })
	        },
	        handleSizeChange(val){//改变页面数据数量
	         	this.pageSize = val;
	         	this.modelTable();
	        },
	        handleCurrentChange(val){//改变页码
	        	this.pageNum = val;
	        	this.modelTable();
	        },
	        togaindetail(row,event,column){
	        	this.$router.push({
	        		path:'/gaindetail',
	        		query:{
	        			workCode:row.workCode,
	        			month:this.value4,
	        		}
	        	})
	        },
        },
        mounted(){
        	this.jobList();
        	this.modelTable();
        	// this.organization();
        	this.oWidth=window.screen.width-168;
        }
    };
</script>
<style type="text/css" scoped>
    .active{
    	cursor: pointer;
    	color: #409EFF;
    	text-decoration: underline;
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
</style>