<template>
	<div class="order-list">
		<div class="title">我的订单</div>
		<div class="search">
			<a href="./../express/detail">请输入要完整的运单号</a>
		</div>

		<div class="noData" v-show="noData">
			暂无数据
		</div>
		<div class="list">
			<ul>
				<li v-for="item in list">
					<p class="p1">订单号：{{item.orderNo}}</p>
					<p class="p1">运单号：{{item.expressNo ? item.expressNo : '未生成'}}</p>
					<p class="p1">上门时间：{{item.collectStartTime}}</p>
					<span class="status base-te">
						订单状态：{{item.orderStatusValue}}

					</span>
					<div class="info">
						<div class="from b">
							<span class="s">寄</span>
							<p>{{item.fromCity}}</p>
							<p>{{item.fromName}}</p>
						</div>
						<img src="/static/image/to.png" class="icon" />
						<div class="to b">
							<span class="s base-ba">收</span>
							<p>{{item.fromCity}}</p>
							<p>{{item.fromName}}</p>
						</div>
					</div>
					<button class="cancel base-ba" @click="cancel(item.orderNo)" v-if="item.orderStatus==0">取消</button>
					<span class="text" v-else>如需帮助请联系客服：<a :href="'tel://'+item.toContact">{{item.toContact}}</a></span>
				</li>
			</ul>
		</div>
		<div class="noMore" v-show="noMore">
			没有更多了
		</div>
	</div>
</template>
<style>
	.order-list .title{ width: 100%; height: 50px; background: #000; font-size: 18px; color: #fff; line-height: 50px; text-align: center;}
	.order-list .search{ padding: 10px; width: 100%; box-sizing: border-box; background: #f8f8f8; border-bottom: 1px solid #ddd;}
	.order-list .search a{ display: inline-block; padding: 0 10px; width: 100%; height: 30px; border: 1px solid #ddd; background: #fff; color: #999; line-height: 30px; text-align: center; font-size: 12px;}

	.order-list .list li{ position: relative; padding: 10px; border-bottom: 1px solid #ddd;}
	.order-list .list li .p1{ line-height: 24px; color: #999;}
	.order-list .list li .status{ position: absolute; right: 10px; top: 34px; height: 24px; line-height: 24px; }
	.order-list .list li .info{ margin-top: 10px; height: 60px;}
	.order-list .list li .info .b{ float: left; padding: 10px 0; width: 120px; height: 60px; border: 1px solid #ddd; border-radius: 10px;}
	.order-list .list li .info .to{ float: right;}

	.order-list .list li .info .s{ margin:5px 5px 0 10px; float: left; width: 30px; height: 30px; background: #000; border-radius: 50%; color: #fff; text-align: center; line-height: 30px;}
	.order-list .list li .info p{ overflow: hidden; color: #666; line-height: 20px; white-space: nowrap; text-overflow: ellipsis;}


	.order-list .list li .text{ color: #666; font-size: 12px; line-height: 30px;}
	.order-list .list li .text a{ color: blue; text-decoration: underline}
	.order-list .list li .cancel{ margin-top: 10px; width: 100%; height: 30px; border: none; border-radius: 3px; color: #fff;}

	.order-list .noData{ width: 100%; height: 100px; line-height: 100px; text-align: center; color: #999; font-size: 12px;}
	.order-list .noMore{ padding-bottom: 80px; width: 100%; height: 30px; line-height: 30px; text-align: center; color: #999; font-size: 12px;}

</style>
<script>
	import service from '@/services/services'
	import auth from './../../utils/auth'
	export default {
		data() {
			return {
				customerId:'',
				list:[],
				page:1,
				totalPage:1,
				noData:false,
				noMore:false,
			}
		},
		created () {
			var that = this;
			if(auth.getToken('customerId')){
				that.customerId=auth.getToken('customerId')
				that.getList(1);
			}


		},
		mounted(){

			window.addEventListener('scroll', this.scro)
		},
		methods:{
			scro(){
				var that = this;
				var scrollFlag=true

				if((document.body.scrollTop+document.documentElement.clientHeight)==document.body.clientHeight){
					if(that.noMore){
						return;
					}else{
						that.page=that.page+1
						that.getList(that.page,scrollFlag)
					}
				}

			},
			getList(page,scrollFlag) {
				var that = this;
				service.orderList({customerId:this.customerId,page:page}).then(rs => {
					if(rs.data.retCode=='000100'){
						if(scrollFlag){
							that.list=that.list.concat(rs.data.list);
						}else{
							that.list=rs.data.list;
						}

						that.page=rs.data.page==0 ? 1 : rs.data.page;
						that.totalPage=rs.data.totalPage==0 ? 1 : rs.data.totalPage;
					}else{
						alert("请重试")
					}

					if(that.list.length==0){
						that.noData=true;
						return;
					}
					if(rs.data.page>=rs.data.totalPage){
						that.noMore=true;

					}


				})
			},

			//取消订单
			cancel(orderNo){
				var that = this;
				service.cancelOrder({customerId:this.customerId,orderNo:orderNo}).then(rs => {
					that.getList(1);
				})
			}
		}
	}
</script>