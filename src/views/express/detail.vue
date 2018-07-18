<template>
	<div class="express">
		<!--<div class="title">查件</div>-->
		<div class="search">
			<div class="b">
				<img src="/static/image/icon-search.png" class="icon" />
				<input type="text" placeholder="请输入要查询的单号" maxlength="30" v-model="expressNo" @keyup.enter="getDetail(expressNo)" />
				<button class="clear" @click="clear()"></button>
			</div>

		</div>

		<div class="list">
			<button class="s-b base-ba" @click="getDetail(expressNo)">查 询</button>
			<ul>
				<li v-for="item in detail">
					<div class="time">
						{{item.createTime}}
						<span class="icon">︽</span>
					</div>
					<div class="text">{{item.description}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<style>
	.express .title{ width: 100%; height: 50px; background: #000; font-size: 18px; color: #fff; line-height: 50px; text-align: center;}
	.express .search{ padding: 20px 10px; width: 100%; background: #08d;}
	.express .search .b{ position: relative; width: 100%; height: 30px; border: 1px solid #ddd; background: #fff; border-radius: 4px;}
	.express .search .b .icon{ position: absolute; top: 8px; left: 10px;  }
	.express .search .b input{ padding: 0 30px; width: 100%; height: 30px; border: none; background: none;}
	.express .search .b .clear{ position: absolute; top: 0; right: 0; width: 30px; height: 28px; background:  url(/static/image/icon-search-close.png) 7px 7px no-repeat; background-size: 14px 14px; border: none;}
	.express .s-b{ margin: 10px 0 20px 0; width: 100%; height: 30px; border: none; border-radius: 4px; color: #fff;}
	.express .list{ padding: 0px 10px 10px; width: 100%;}
	.express .list li{ display: flex; overflow: hidden;}
	.express .list li .time{ position: relative; float: left; width: 100px; height: 30px; text-align: center; color: #666; line-height: 20px;}
	.express .list li .time .icon{ position: absolute; top: 0; right: -10px; width: 20px; height: 20px; background: #ddd; border-radius: 50%; color: #fff; text-align: center; line-height: 14px;}
	.express .list li .text{flex: 1; float: left; padding: 0 0 30px 15px; border-left: 1px solid #ddd;  line-height: 20px; color: #666; }
	.express .list li:first-child .time{ color: #08d;}
	.express .list li:first-child .time .icon{ background: #08d;}
	.express .list li:first-child .text{ color: #08d;}
</style>
<script>
	import service from '@/services/services'

	export default {
		data() {
			return {
				expressNo:'lily666',
				detail:{}
			}
		},
		created(){

		},
		methods:{
			getDetail(expressNo){
				service.expressno({expressNo:expressNo}).then(rs => {
					if(rs.data.retCode=='000100') {
						this.detail = rs.data.orderDescriptions;
					}else{
						alert(rs.data.retMsg)
					}
				})
			},

			clear(){
				this.expressNo=''
			}
		}
	}
</script>