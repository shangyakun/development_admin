<template>
	<div v-loading='loading' style="height: 100%;background: #f7f7f7;padding: 12px;width:100%;box-sizing: border-box;">
		<div class="top">胜任力要求配置</div>
		<div class="line1 clear">
			<div class="clear" >
                <span style="margin-right: 10px;font-size: 14px;float: left;">职类:</span>
                <span v-if='index<3' :class='[funType==index?"active":"normal"]' v-for='item,index of job' :key='index' @click="toActiveJob(index)">{{item.jobCategoryName}}</span>   
			</div>
			<div class="clear">
				<span style="margin-right: 10px;font-size: 14px;float: left;">序列:</span>
                <span :class='[sequenceIndex==index?"active":"normal"]' v-for='item,index of indexList[funType]' :key='index' @click='skill(index,item.sequenceId)'>{{item.sequenceName}}</span>   
			</div>
		</div>
		<div class="line clear">
			<div :class='[tabIndex==0?"active1 fl":"normal1 fl"]' @click='changeTab(0)'>专业能力</div>
			<div :class='[tabIndex==1?"active1 fl":"normal1 fl"]' @click='changeTab(1)'>工作/项目经历</div>
			<!-- <div :class='[tabIndex==2?"active1 fl":"normal1 fl"]' @click='changeTab(2)'>知识与技能</div> -->
			<!-- <a href="javascript:;" class="fr link" @click='exportExcel'>选择文件导入</a> -->
			<el-upload
			 	v-if='tabIndex==0'
				class="upload-demo fr"
			  	action="http://10.1.0.86:7779/fileAdd/ability"
			  	ref='upload'
			  	:before-upload='beforeUpload'
			  	:data='uploadData'
			  	:show-file-list='false'
			  	:on-success='uploadSuccess'
				:on-error='uploadErro'
			>
			  <a href='javascript:;' class="link" type="primary">选择文件导入</a>
			</el-upload>
			<el-upload
			 	v-if='tabIndex==1'
				class="upload-demo fr"
			  	action="http://10.1.0.86:7779/fileAdd/experience"
			  	ref='upload'
			  	:before-upload='beforeUpload'
			  	:data='uploadData'
			  	:show-file-list='false'
			  	:on-success='uploadSuccess'
				:on-error='uploadErro'
			>
			  	<a href='javascript:;' class="link">选择文件导入</a>
			</el-upload>
			<el-upload
			 	v-if='tabIndex==2'
				class="upload-demo fr"
			  	action="http://10.1.0.86:7779/fileAdd/skills"
			  	ref='upload'
			  	:before-upload='beforeUpload'
			  	:data='uploadData'
			  	:show-file-list='false'
			  	:on-success='uploadSuccess'
				:on-error='uploadErro'
			>
			 	<a href='javascript:;' class="link">选择文件导入</a>
			</el-upload>	
			<a class="fr link" v-if='tabIndex==0' download='专业能力模板.xls' href="./static/excel/ability.xls">下载专业能力模板</a>
			<a class="fr link" v-if='tabIndex==1' download='工作与项目经历模板.xls' href="./static/excel/experience.xls">下载工作/项目经历模板</a>
			<a class="fr link" v-if='tabIndex==2' download='知识与技能模板.xlsx' href="./static/excel/skill.xlsx">下载知识与技能模板</a>
			<!-- <div class="fr" style="margin-right: 50px;">
				<el-button type="primary"  @click=''>导出</el-button>
			</div> -->
		</div>
		<!-- /管理类的专业能力表格 -->
		<div v-show='funType==0&&tabIndex==0' style="background:#fff;padding:20px;">
			<el-table
			    :data="currentList"
			    border
			   	@cell-click='cellClick'
			   	current-row-key='1'
			    style="width: 100%;background: #fff;"
			    >
			    <el-table-column
			      prop="proAbility"
			      label="专业能力项"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="definition"
			      label="定义"
			      >
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level1"
			    >
				    <el-table-column
				      prop="level1KeyAbility"
				      label="关键项"
			      	>
			      	</el-table-column>
				    <el-table-column
				      label="行为描述"
			      	  prop="level1Description"
				      width='220'
				    >
				    <template slot-scope='scope'>
		        		<div v-html='scope.row.level1Description'></div>
		        	</template>
				    </el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level2"
			    >
			      	<el-table-column
			      	prop="level2KeyAbility"
			      	label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      	label="行为描述"
			      	prop="level2Description"
			      	width='220'
			      	>
				      	<template slot-scope='scope'>
			        		<div v-html='scope.row.level2Description'></div>
			        	</template>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level3"
			      	>
			      	<el-table-column
			      		prop="level3KeyAbility"
			      		label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      	label="行为描述"
			      	prop="level3Description"
			      	width='220'
			      	>
			      		<template slot-scope='scope'>
			        		<div v-html='scope.row.level3Description'></div>
			        	</template>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level4"
			      	>
			      	<el-table-column
			      	prop="level4KeyAbility"
			      	label="关键项"
			      	>
			      	</el-table-column>
			    <el-table-column
			      	label="行为描述"
			      	prop="level4Description"
			      	width='220'
			      	>
			      		<template slot-scope='scope'>
			        		<div v-html='scope.row.level4Description'></div>
			        	</template>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level5"
			      	>
			      	<el-table-column
			      	prop="level5KeyAbility"
			      	label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      		label="行为描述"
			      	    prop="level5Description"
			      		width='220'
			      	>
			      		<template slot-scope='scope'>
			        		<div v-html='scope.row.level5Description'></div>
			        	</template>
			      	</el-table-column>
			    </el-table-column>
			    <!-- <el-table-column
			      	prop="typeFour"
			      	label="Level6"
			    >
			      	<el-table-column
			      		prop="level6KeyAbility"
			      		label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      		prop="level6Description"
				      	label="行为描述"
			      	>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			     	label="Level7"
			    >
			      	<el-table-column
			      		prop="level7KeyAbility"
			      		label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      		prop="level7Description"
			      		label="行为描述"
			      	>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			     	label="Level8"
			    >
			      	<el-table-column
			      		prop="level8KeyAbility"
			      		label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      		prop="level8Description"
			      		label="行为描述"
			      	>
			      	</el-table-column>
			    </el-table-column> -->
			</el-table>			
		</div>
		<!-- 专业类的专业能力表格 -->
		<div v-show='funType==1&&tabIndex==0' style="background:#fff;padding:20px;">
			<el-table
			    :data="currentList"
			    border
			   	@cell-click='cellClick'
			   	current-row-key='1'
			    style="width: 100%;background: #fff;"
			    >
			    <el-table-column
			      prop="proAbility"
			      label="专业能力项"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="definition"
			      label="定义"
			      >
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level1"
			    >
				    <el-table-column
			      	  prop="level1KeyAbility"
				      label="关键项"
			      	>
			      		
			      	</el-table-column>
				    <el-table-column
				      label="行为描述"
			      	  prop="level1Description"
				      width='220'
				    >
				   	 	<template slot-scope='scope'>
			        		<div v-html='scope.row.level1Description'></div>
			        	</template>
				    </el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level2"
			    >
			      	<el-table-column
			      	prop="level2KeyAbility"
			      	label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      	label="行为描述"
			      	prop="level2Description"
			      	width='220'
			      	>
			      		<template slot-scope='scope'>
			        		<div v-html='scope.row.level2Description'></div>
			        	</template>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level3"
			      	>
			      	<el-table-column
			      		prop="level3KeyAbility"
			      		label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      	prop="level3Description"
			      	label="行为描述"
			      	width='220'
			      	>
			      		<template slot-scope='scope'>
			        		<div v-html='scope.row.level3Description'></div>
			        	</template>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level4"
			      	>
			      	<el-table-column
			      	prop="level4KeyAbility"
			      	label="关键项"
			      	>
			      	</el-table-column>
			    <el-table-column
			      	label="行为描述"
			      	prop="level4Description"
			      	width='220'
			      	>
			      		<template slot-scope='scope'>
			        		<div v-html='scope.row.level4Description'></div>
			        	</template>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level5"
			      	>
			      	<el-table-column
			      	prop="level5KeyAbility"
			      	label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      		label="行为描述"
			      		prop="level5Description"
			      		width='220'
			      	>
			      		<template slot-scope='scope'>
			        		<div v-html='scope.row.level5Description'></div>
			        	</template>
			      	</el-table-column>
			    </el-table-column>
			    <!-- <el-table-column
			      	prop="typeFour"
			      	label="Level6"
			    >
			      	<el-table-column
			      		prop="level6KeyAbility"
			      		label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      		prop="level6Description"
				      	label="行为描述"
			      	>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			     	label="Level7"
			    >
			      	<el-table-column
			      		prop="level7KeyAbility"
			      		label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      		prop="level7Description"
			      		label="行为描述"
			      	>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			     	label="Level8"
			    >
			      	<el-table-column
			      		prop="level8KeyAbility"
			      		label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      		prop="level8Description"
			      		label="行为描述"
			      	>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			     	label="Level9"
			    >
			      	<el-table-column
			      		prop="level9KeyAbility"
			      		label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      		prop="level9Description"
			      		label="行为描述"
			      	>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			     	label="Level10"
			    >
			      	<el-table-column
			      		prop="level10KeyAbility"
			      		label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      		prop="level10Description"
			      		label="行为描述"
			      	>
			      	</el-table-column>
			    </el-table-column> -->
			</el-table>			
		</div>
		<!-- 支持类的专业能力表格 -->
		<div v-show='funType==2&&tabIndex==0' style="background: #fff;padding:20px;">
			<el-table
			    :data="currentList"
			    border
			   	@cell-click='cellClick'
			   	current-row-key='1'
			    style="width: 100%;background: #fff;"
			    >
			    <el-table-column
			      prop="proAbility"
			      label="专业能力项"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="definition"
			      label="定义"
			      >
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level1"
			    >
				    <el-table-column
				      prop="level1KeyAbility"
				      label="关键项"
			      	>
			      	</el-table-column>
				    <el-table-column
				      prop="level1Description"
				      label="行为描述"
				      width='220'
				    >
				    </el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level2"
			    >
			      	<el-table-column
			      	prop="level2KeyAbility"
			      	label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      	prop="level2Description"
			      	label="行为描述"
			      	width='220'
			      	>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level3"
			      	>
			      	<el-table-column
			      		prop="level3KeyAbility"
			      		label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      	prop="level3Description"
			      	label="行为描述"
			      	width='220'
			      	>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level4"
			      	>
			      	<el-table-column
			      	prop="level4KeyAbility"
			      	label="关键项"
			      	>
			      	</el-table-column>
			    <el-table-column
			      	prop="level4Description"
			      	label="行为描述"
			      	width='220'
			      	>
			      	</el-table-column>
			    </el-table-column>
			    <el-table-column
			      	prop="typeFour"
			      	label="Level5"
			      	>
			      	<el-table-column
			      	prop="level5KeyAbility"
			      	label="关键项"
			      	>
			      	</el-table-column>
			      	<el-table-column
			      		prop="level5Description"
			      		label="行为描述"
			      		width='220'
			      	>
			      	</el-table-column>
			    </el-table-column>
			</el-table>			
		</div>
		<!----------------- 分割线 ---------------->
		<!-- 管理类的项目经验表格 -->
		<div v-show='funType==0&&tabIndex==1' style="background:#fff;padding:20px;">
			<el-table
			    :data="experience"
			    border
			   	@cell-click='cellClick'
			    style="width: 100%;background: #fff;"
			    >
			    <el-table-column
			      prop="level1Experience"
			      label="M1"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level2Experience"
			      label="M2"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level3Experience"
			      label="M3"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level4Experience"
			      label="M4"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level5Experience"
			      label="M5"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level6Experience"
			      label="M6"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level7Experience"
			      label="M7"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level8Experience"
			      label="M8"
			      >
			    </el-table-column>
			</el-table>			
		</div>
		<!-- 专业类的项目经验表格 -->
		<div v-show='funType==1&&tabIndex==1' style="background:#fff;padding:20px;">
			<el-table
			    :data="experience"
			    border
			   	@cell-click='cellClick'
			    style="width: 100%;background: #fff;"
			    >
			    <el-table-column
			      prop="level1Experience"
			      label="p1"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level2Experience"
			      label="p2"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level3Experience"
			      label="p3"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level4Experience"
			      label="p4"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level5Experience"
			      label="p5"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level6Experience"
			      label="p6"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level7Experience"
			      label="p7"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level8Experience"
			      label="p8"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level9Experience"
			      label="p9"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level10Experience"
			      label="p10"
			      >
			    </el-table-column>
			</el-table>			
		</div>
		<!-- 支持类的项目经验表格 -->
		<div v-show='funType==2&&tabIndex==1' style="background:#fff;padding:20px;">
			<el-table
			    :data="experience"
			    border
			   	@cell-click='cellClick'
			    style="width: 100%;background: #fff;"
			    >
			    <el-table-column
			      prop="level1Experience"
			      label="S1"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level2Experience"
			      label="S2"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level3Experience"
			      label="S3"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level4Experience"
			      label="S4"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level5Experience"
			      label="S5"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level6Experience"
			      label="S6"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level7Experience"
			      label="S7"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="level8Experience"
			      label="S8"
			      >
			    </el-table-column>
			</el-table>			
		</div>

		<!----------------- 分割线 ---------------->
		<div class="line clear" v-if='tabIndex==2'>
			<div class="fl" style="margin-right: 10px;font-size: 14px">岗位类别:</div>
			<div v-for='item,index of postList' :key='index' :class='[postIndex==index?"active fl":"normal fl"]' @click='changePost(index)'>{{item.positionCategoryName}}</div>
		</div>
        <!-- 管理类的知识技能表格 -->
		<!-- <div v-show='funType==0&&tabIndex==2'>
			<el-table
			    :data="knowledgeList"
			    border
			   	@cell-click='skillClick'
			    style="width: 100%;background: #fff;"
			    >
			    <el-table-column
			      prop="positionCategory"
			      label="岗位类别"
			      width="200"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="skillDescription"
			      label="知识或技能"
			      >
			    </el-table-column>
			</el-table>
			<div style="padding-top: 20px">
				<el-table
				    :data="knowledgeList"
				    border
			   		@cell-click='skillClick'
				    style="width: 100%;background: #fff;"
				    >
			    	<el-table-column label='知识或技能' align='center'>
						<el-table-column
					      	prop="typeFour"
					      	label="Level1"
					      	>
					      	<el-table-column
					      	prop="level1Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level1Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					    <el-table-column
					      	prop="typeFour"
					      	label="Level2"
					      	>
					      	<el-table-column
					      	prop="level2Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level2Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					    <el-table-column
					      	prop="typeFour"
					      	label="Level3"
					      	>
					      	<el-table-column
					      	prop="level3Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level3Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					    <el-table-column
					      	prop="typeFour"
					      	label="Level4"
					      	>
					      	<el-table-column
					      	prop="level4Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level4Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					    <el-table-column
					      	prop="typeFour"
					      	label="Level5"
					      	>
					      	<el-table-column
					      	prop="level5Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level5Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					</el-table-column>
				</el-table>	
			</div>						
		</div> -->
		<!-- 专业类的知识技能表格 -->
		<!-- <div v-show='funType==1&&tabIndex==2'>
			<el-table
			    :data="knowledgeList"
			    border
			    @cell-click='skillClick'
			    style="width: 100%;background: #fff;"
			    >
			    <el-table-column
			      prop="positionCategory"
			      label="岗位类别"
			      width="200"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="skillDescription"
			      label="知识或技能"
			      >
			    </el-table-column>
			</el-table>
			<div style="padding-top: 20px">
				<el-table
				    :data="knowledgeList"
				    border
			   		@cell-click='skillClick'
				    style="width: 100%;background: #fff;"
				    >
			    		<el-table-column label='知识或技能' align='center'>

						<el-table-column
					      	prop="typeFour"
					      	label="Level1"
					      	>
					      	<el-table-column
					      	prop="level1Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level1Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					    <el-table-column
					      	prop="typeFour"
					      	label="Level2"
					      	>
					      	<el-table-column
					      	prop="level2Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level2Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					    <el-table-column
					      	prop="typeFour"
					      	label="Level3"
					      	>
					      	<el-table-column
					      	prop="level3Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level3Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					    <el-table-column
					      	prop="typeFour"
					      	label="Level4"
					      	>
					      	<el-table-column
					      	prop="level4Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level4Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					    <el-table-column
					      	prop="typeFour"
					      	label="Level5"
					      	>
					      	<el-table-column
					      	prop="level5Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level5Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					</el-table-column>    
				</el-table>		
			</div>						
		</div> -->
		<!-- 支持类的知识技能表格 -->
		<!-- <div v-show='funType==2&&tabIndex==2'>
			<el-table
			    :data="knowledgeList"
			    border
			   	@cell-click='skillClick'
			    style="width: 100%;background: #fff;"
			    >
			    <el-table-column
			      prop="positionCategory"
			      label="岗位类别"
			      width="200"
			      >
			    </el-table-column>
			    <el-table-column
			      prop="skillDescription"
			      label="知识或技能"
			      >
			    </el-table-column>
			</el-table>
			<div style="padding-top: 20px">
				<el-table
				    :data="knowledgeList"
				    border
			   		@cell-click='skillClick'
				    style="width: 100%;background: #fff;"
				    >
			    	<el-table-column label='知识或技能' align='center'>
						<el-table-column
					      	prop="typeFour"
					      	label="Level1"
					      	>
					      	<el-table-column
					      	prop="level1Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level1Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					    <el-table-column
					      	prop="typeFour"
					      	label="Level2"
					      	>
					      	<el-table-column
					      	prop="level2Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level2Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					    <el-table-column
					      	prop="typeFour"
					      	label="Level3"
					      	>
					      	<el-table-column
					      	prop="level3Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level3Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					    <el-table-column
					      	prop="typeFour"
					      	label="Level4"
					      	>
					      	<el-table-column
					      	prop="level4Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level4Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					    <el-table-column
					      	prop="typeFour"
					      	label="Level5"
					      	>
					      	<el-table-column
					      	prop="level5Breadth"
					      	label="广度"
					      	>
					      	</el-table-column>
					      	<el-table-column
					      		prop="level5Depth"
					      		label="深度"
					      	>
					      	</el-table-column>
					    </el-table-column>
					</el-table-column>    
				</el-table>	
			</div>						
		</div> -->
		<div class="clear" style="margin: 40px 40px 40px 0">
			<div class="fr">
				<el-button type="primary" v-if='tabIndex===0'  @click='addNewRow'>添加新项</el-button>
			</div>
		</div>
		<el-dialog
			title="内容修改"
			:visible.sync="dialogVisible"
			width="50%"
			>
			<textarea v-model='textContent' ref='area' class="dialog_text"></textarea>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="confirm">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="错误信息" 
		    :close-on-click-modal='false' 
		    :visible.sync="dialogTableVisible">
			<el-table :data="errorData" height='400'>
			    <el-table-column property="name" type='index' width="180"></el-table-column>
			    <el-table-column property="error" label="错误信息"></el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>
<script>
	import { Loading } from 'element-ui';
    export default {
	    data() {
		    return {
		    	dialogTableVisible:false,
		    	errorData:[],
		    	uploadData:{
		    	},
		    	loading:false,
		    	postIndex:0,
		    	dialogVisible:false,
		        funType:0,//职类
		    	tabIndex:0,//专业能力
		        sequenceIndex:0,//序列
		    	active3:1,//岗位类别
		        currentList:[],
		        ablityList:[],//技能
				skillList:[],
		        experience:[],//经验，
		        job:[],//职类列表
		        indexList:[],//序列列表
		        knowledgeList:[],//知识与技能
		        sequenceId:'',//序列id
		        key:'',//给每一行加一个key值，用来在点击的时候知道是哪一行被点击，ele上没找到方法，
		        textContent:'',//对话框中文本框的内容
		        postList:[],//岗位列表
		        positionCategoryName:''//岗位
      		}
        },
        methods:{
        	beforeUpload(file){//上传之前做判断
        		this.errorData = [];
				let reg = /\.(xlsx|xls)$/;
				if(!reg.test(file.name)){
					this.$message({
			          	message: '请上传excel文件',
			          	type: 'warning'
			        });
			    	this.$refs.upload.clearFiles();
			    	return false;
				};
				if(this.tabIndex==2&&!!!this.postId){
					this.$message({
			          	message: '请添加岗位类别',
			          	type: 'warning'
			        });
			        this.$refs.upload.clearFiles();
			    	return false;
				};
				if(this.tabIndex!=2){
					this.uploadData.sequence = this.sequenceId;
				}else{
					this.uploadData.positionCategory = this.postId;
				};
				this.uploadData.file = file;
        	},
        	uploadSuccess(res){//上传成功之后
        		if(res.success){
        			if(res.data.error&&res.data.error.length){
        				for(let i=0;i<res.data.error.length;i++){
        					this.errorData.push({
        						error:res.data.error[i]
        					});
        				};
        				this.dialogTableVisible = true;
        				return;
        			};
        			let url = '';
        			if(this.tabIndex==0){
        				url = '/abilityList';
			        	this.getList(url);
						this.$message({
				          	message: '上传成功',
				          	type: 'success'
				        });
        			}else if(this.tabIndex==1){
        				url = '/experiencesList';
			        	this.getList(url);
						this.$message({
				          	message: '上传成功',
				          	type: 'success'
				        });
        			}else{
        				this.getSkillsList();
        			}
        		}else{
        			this.$message({
			          	message: '上传失败，'+res.errorMsg,
			          	type: 'warning'
			        });
        		}
			    this.$refs.upload.clearFiles();
        	},
        	uploadErro(){//上传失败
				this.$message({
		          	message: '上传失败，'+res.errorMsg,
		          	type: 'warning'
		        });
        	},
        	changePost(index){//切换岗位类别
        		this.loading = true;
        		this.postIndex = index;
        		this.postId = this.postList[index].positionCategoryUuid;
        		this.positionCategoryName = this.postList[index].positionCategoryName;
        		this.getSkillsList();
        	},
        	addSkill(data){
        		this.axios({
        			url:'/addSkills',
        			method:"POST",
        			params:data
        		})
        		.then(res=>{
        			if(res.data.success){
		        		this.dialogVisible = false;
		        		this.$message({
		        			type:'success',
		        			message:'修改成功'
		        		});
        				this.getSkillsList();
        			}
        		})
        	},
        	getSkillsList(){//获取技能列表
        		this.axios({
        			url:'/skillsList',
        			params:{
        				positionCategory:this.postId
        			},
        			method:"POST",
        		})
        		.then(res=>{
        			setTimeout(()=>{
    					this.loading = false;
    				},300);
        			let data = res.data.skills;
        			if(res.data.success){
        				let data = res.data.skills;
        				if(res.data.skills.length>0){
        					data.positionCategory = data.positionCategory||'';
        					data.skillDescription = data.skillDescription||'';
        					this.knowledgeList = res.data.skills;
        				}else{
        					if(this.funType===0){
        						this.knowledgeList = [{
        							level1Breadth: "",
									level1Depth: "",
									level2Breadth: "",
									level2Depth: "",
									level3Breadth: "",
									level3Depth: "",
									level4Breadth: "",
									level4Depth: "",
									level5Breadth: "",
									level5Depth: "",
									// level6Breadth: "",
									// level6Depth: "",
									// level6Breadth: "",
									// level6Depth: "",
									// level7Breadth: "",
									// level7Depth: "",
									// level8Breadth: "",
									// level8Depth: "",
									positionCategory: this.positionCategoryName,
									skillDescription: "",
									uuid: "",
									key:0,
        						}]
        					}else if(this.funType===1){
    							this.knowledgeList = [{
        							level1Breadth: "",
									level1Depth: "",
									level2Breadth: "",
									level2Depth: "",
									level3Breadth: "",
									level3Depth: "",
									level4Breadth: "",
									level4Depth: "",
									level5Breadth: "",
									level5Depth: "",
									// level6Breadth: "",
									// level6Depth: "",
									// level7Breadth: "",
									// level7Depth: "",
									// level8Breadth: "",
									// level8Depth: "",
									// level9Breadth: "",
									// level9Depth: "",
									// level10Breadth: "",
									// level10Depth: "",
									positionCategory: this.positionCategoryName,
									skillDescription: "",
									uuid: "",
									key:0,
								}]
        					}else{
								this.knowledgeList = [{
        							level1Breadth: "",
									level1Depth: "",
									level2Breadth: "",
									level2Depth: "",
									level3Breadth: "",
									level3Depth: "",
									level4Breadth: "",
									level4Depth: "",
									level5Breadth: "",
									level5Depth: "",
									positionCategory: this.positionCategoryName,
									skillDescription: "",
									uuid: "",
									key:0,
								}]
        					}
        				}
        			}
        		})
        	},
        	addNewRow(){//添加一行
        		switch (this.tabIndex) {
        			case 0:
        				this.currentList.push({
        					key:this.currentList.length
        				});
        				break;
        			default:
        				break;
        		};
        	},
        	addNew(data){
        		let url = '';
        		switch (this.tabIndex) {
        			case 0:
        				url = '/addProAbility';
        				break;
        			default:
        				break;
        		}
        		this.axios({
        			url:url,
        			params:data,
        			method:"POST"
        		})
        		.then(res=>{
        			if(res.data.success){
		        		switch(this.tabIndex){
		        			case 0:
		        			url = '/abilityList';
		        			break;
		        		};
		        		this.getList(url);
		        		this.$message({
		        			type:'success',
		        			message:'修改成功'
		        		});
		        		this.dialogVisible = false;
        			}
        		})
        	},
        	addExperience(data){
        		this.axios({
        			url:'/addExperience',
        			params:data,
        			method:"POST"
        		})
        		.then(res=>{
        			if(res.data.success){
        				let url = '/experiencesList';
        				this.dialogVisible = false;
		        		this.getList(url);
		        		this.$message({
		        			type:'success',
		        			message:'修改成功'
		        		});
        			};
        		})
        	},
        	updateExperience(data){
        		this.axios({
        			url:'/updateExperience',
        			method:"POST",
        			params:data
        		})
        		.then(res=>{
        			if(res.data.success){
        				let url = '/experiencesList';
        				this.dialogVisible = false;
		        		this.getList(url);
		        		this.$message({
		        			type:'success',
		        			message:'修改成功'
		        		});
        			}
        		})
        	},
        	confirm(){//提交修改，判断uuid，有则更新，否则新增
        		let data = {};
        		data[this.property] = this.textContent;
        		if(this.tabIndex==0){
        			data.sequence = this.sequenceId;
        			if(!this.currentList[this.key].uuid){
        				this.addNew(data);
        			}else{
						data.uuid = this.currentList[this.key].uuid;
	        			this.updateAbility(data);
        			}
        		};
        		if(this.tabIndex==1){
        			data.sequence = this.sequenceId;
        			if(!this.experience[this.key].uuid){
        				this.addExperience(data);
        			}else{
        				data.uuid = this.experience[this.key].uuid;
        				this.updateExperience(data);
        			}
        		};
     			if(this.tabIndex==2){
     				if(!this.knowledgeList[this.key].uuid){
						data.positionCategory = this.postId;
        				this.addSkill(data);
     				}else{
						data.uuid = this.knowledgeList[0].uuid;
						data.positionCategory = this.postId;
	        			this.updateSkill(data);
     				}
     			};
        	},
        	updateSkill(data){
        		this.axios({
        			url:'/updateSkills',
        			params:data,
        			method:"POST"
        		})
        		.then(res=>{
        			if(res.data.success){
		        		this.dialogVisible = false;
		        		this.$message({
		        			type:'success',
		        			message:'修改成功'
		        		});
        				this.getSkillsList();
        			}
        		})
        	},
        	updateAbility(data){//修改专业能力
        		let url = '';
        		this.axios({
        			url:'/updateProAbility',
        			params:data,
        			method:'POST'
        		})
        		.then(res=>{
        			if(res.data.success){
        				this.dialogVisible = false;
		        		url = '/abilityList';
		        		this.$message({
		        			type:'success',
		        			message:'修改成功'
		        		});
		        		this.getList(url);
        			}
        		});
        	},
        	cellClick(row, column){//获取点击这一行的数据，设置初始值接下来就是修改的问题了，so easy
        		if(this.tabIndex===0){
	        		if(column.property!="definition"&&column.property!="proAbility"){
	        			if(!!!row.definition||!!!row.proAbility){
	        				this.$message('请先填写专业能力和定义');
	        				return;
	        			};
	        		};
        		};
        		this.dialogVisible = true;
        		this.key = row.key;
        		this.property = column.property;
        		if(row[column.property]){
        			this.textContent = row[column.property].replace(/<br>/g,'');
        		}else{
        			this.textContent = '';
        		}
        	},
        	skillClick(row, column){
        		if(column.property==="positionCategory") return;
        		this.dialogVisible = true;
        		this.key = row.key||0;
        		this.property = column.property;
        		this.textContent = row[column.property];
        	},
        	toActiveJob(index){//职类事件
        		this.postId = '';
        		this.knowledgeList = [];
        		this.funType = index;
        		this.tabIndex = 0;
        		this.sequenceIndex = 0;
        		this.sequenceId = this.indexList[index][0].sequenceId;
        		this.axios({
        			url:'/abilityList',
        			params:{
						sequence:this.sequenceId
        			},
        			method:"POST",
        		})
        		.then(res=>{
        			if(res.data.success){
        				if(res.data.ability.length>0){
        					for(let i=0;i<res.data.ability.length;i++){
		                		res.data.ability[i].key = i;
		                	};
        					this.currentList = res.data.ability;
        				}else{
							this.currentList = [];
        				}
        			}
        		})
        	},
        	getList(url){
        		this.axios({
        			url:url,
        			params:{
						sequence:this.sequenceId
						// sequence:5
        			},
        			method:"POST",
        		})
        		.then(res=>{
        			if(res.data.success){
        				if(this.tabIndex==0){
							for(let i=0;i<res.data.ability.length;i++){
		                		res.data.ability[i].key = i;
		                		for(let item in res.data.ability[i]){
		                			if(item.indexOf('Description')>-1){
		                				res.data.ability[i][item] = res.data.ability[i][item].replace(/(\d+)/g,'<br>'+'$1')
		                			}
		                		}
		                	};
        					this.currentList = res.data.ability;
        				}else if(this.tabIndex==1){
        					if(res.data.workExperience.length){
        						for(let i=0;i<res.data.workExperience.length;i++){
		                		res.data.workExperience[i].key = i;
		                	};
        						this.experience = res.data.workExperience;
        					}else{
        						//level10Experience
        						if(this.funType===0){
        							this.experience = [{
        								definition:'',
        								proAbility:'',
        								level1Experience:'',
        								level2Experience:'',
        								level3Experience:'',
        								level4Experience:'',
        								level5Experience:'',
        								level6Experience:'',
        								level7Experience:'',
        								level8Experience:'',
        								key:0,
        								uuid:'',
        							}];
        						}else if(this.funType===1){
        							this.experience = [{
										definition:'',
        								proAbility:'',
        								level1Experience:'',
        								level2Experience:'',
        								level3Experience:'',
        								level4Experience:'',
        								level5Experience:'',
        								level6Experience:'',
        								level7Experience:'',
        								level8Experience:'',
        								level9Experience:'',
        								level10Experience:'',
        								key:0,
        								uuid:'',
        							}];
        						}else{
        							this.experience = [{
        								definition:'',
        								proAbility:'',
        								level1Experience:'',
        								level2Experience:'',
        								level3Experience:'',
        								level4Experience:'',
        								level5Experience:'',
        								level6Experience:'',
        								level7Experience:'',
        								level8Experience:'',
        								key:0,
        								uuid:'',
        							}];
        						}
        					}
        				}else{
        					this.postList = res.data.data;
	        				if(this.postIndex==0&&res.data.data.length){
	        					this.postId = this.postList[0].positionCategoryUuid;
	        					this.getSkillsList();
	        				};
        				}	
        				
        			}
        		})
        	},
        	changeTab(i){
        		let url = ''
        		switch(i){
        			case 0:
        			this.tabIndex=0;
        			url = '/abilityList';
        			// this.getList(url);
        			break;
        			case 1:
        			this.tabIndex=1;
        			url = '/experiencesList';
        			break;
        			case 2:
        			this.tabIndex=2;
        			this.postIndex = 0;
        			// this.sequenceId = 2;//测试用的，要删掉
        			url = '/positionCategory/list';
        			// this.getPositionCategory();
        			break;
        		};
        		this.getList(url);
        	},
        	getPositionCategory(){//获取岗位
        		this.axios({
        			url:"/positionCategory/list",
        			method:"POST",
        			params:{
						// sequence:this.sequenceId
						sequence:2
        			}
        		})
        		.then(res=>{
        			if(res.data.success){
        				this.postList = res.data.data;
        				if(this.postIndex==0){
        					this.postId = this.postList[0].positionCategoryUuid;
        				}
        			}
        		})
        	},
        	jobList(){//获取职类和序列
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
	                	this.job = res.data.data;
	                	for(let i=0;i<this.job.length;i++){
	                		this.indexList[i] = this.job[i].sequences;
	                	};
	                	this.sequenceId = this.indexList[0][0].sequenceId;
	                	let url = '/abilityList';
	                	this.getList(url)
	                }else{
	                 
	                }
	            })
	          	.catch(res=>{

	            })
	        },
        	skill(index,id){//专业能力
        		this.sequenceIndex = index;
        		this.sequenceId = id;
    			let url = ''
        		switch(this.tabIndex){
        			case 0:
        			url = '/abilityList';
        			break;
        			case 1:
        			url = '/experiencesList';
        			break;
        			case 2:
        			url = '/positionCategory/list';
        			break;
        		};
        		this.getList(url)
	        },
        },
        mounted(){
        	this.jobList();
        	this.oWidth=window.screen.width-168;
        }
    };
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
    	font-size: 15px;
    	line-height: 40px;
    	text-align: center;
    	margin: 10px 10px 10px 0;
    	cursor: pointer;
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
    	cursor: pointer;
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
	.dialog_text{
		width: 100%;
		height: 100px;
		resize: none;
		border: 1px solid #eee;
		border-radius: 5px;

	}
	.link{
		color: #409EFF;
		text-decoration: underline;
		margin:0 20px 0 10px;
	}
</style>
