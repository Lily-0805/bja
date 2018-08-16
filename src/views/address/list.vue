<template>
	<div class="address-list">
		<div class="title">我的地址簿</div>
		<div class="search">
			<input type="text" placeholder="请输入电话/姓名/地址" @keyup.enter="search" v-model="searchKey" />
		</div>
		<div class="noData" v-show="noData">
			暂无数据
		</div>

		<div class="addrList">
			<ul>
				<li v-for="item in addrList">
					<p @click="setAddr(item.name,item.contact,item.province,item.city,item.area,item.detailAddr)" >{{item.name}} {{item.contact}}</p>
					<p @click="setAddr(item.name,item.contact,item.province,item.city,item.area,item.detailAddr)" >{{item.province}}{{item.city}}{{item.area}}{{item.detailAddr}}</p>
					<button class="edit base-te" @click="edit(item.addressId)">编辑</button>
					<button class="edit del base-te" @click="del(item.addressId)">删除</button>
				</li>
			</ul>
		</div>
		<div class="noMore" v-show="noMore">
			没有更多了
		</div>
		<button class="add base-ba" @click="add()">新增地址</button>
	</div>
</template>
<style>
	.address-list .title{ width: 100%; height: 50px; background: #000; font-size: 18px; color: #fff; line-height: 50px; text-align: center;}
	.address-list .search{ padding: 10px; width: 100%; box-sizing: border-box; background: #f8f8f8;}
	.address-list .search input{ padding: 0 10px; width: 100%; height: 30px; border: 1px solid #ddd; background: #fff;}
	.address-list .noData{ width: 100%; height: 100px; line-height: 100px; text-align: center; color: #999; font-size: 12px;}
	.address-list .noMore{ padding-bottom: 80px; width: 100%; height: 30px; line-height: 30px; text-align: center; color: #999; font-size: 12px;}
	.address-list .addrList li{ position: relative; padding: 10px; border-bottom: 1px solid #ddd;}

	.address-list .addrList p{ padding: 5px 0; font-size: 12px;}
	.address-list .addrList li .edit{ position: absolute; right: 10px; top: 15px; width: 50px; height: 20px; background: none; border: none;}
	.address-list .addrList li .del{ top:40px;}
	.address-list .add{ position: fixed; bottom: 0; left: 0; width: 100%; height:40px; border: none; font-size: 14px; color: #fff;}
</style>
<script>
	import service from '@/services/services'
	import auth from './../../utils/auth'

	export default{
		data(){
			return {
				customerId:'',
				searchKey:'',
				addrList:[],
				page:1,
				totalPage:1,
				noData:false,
				noMore:false,
				scroll:''

			}
		},

		created () {
			let that = this;
			if(auth.getToken('customerId')){
				that.customerId=auth.getToken('customerId')
				that.getAddrList(this.customerId,1,'','');
			}
		},
		mounted(){

			window.addEventListener('scroll', this.scro)
		},
		methods:{
			scro(){
				let that = this;
				let scrollFlag=true

				if((document.body.scrollTop+document.documentElement.clientHeight)==document.body.clientHeight){
					if(that.noMore){
						return;
					}else{
						that.page=that.page+1
						that.getAddrList(that.customerId,that.page,that.searchKey,scrollFlag)
					}
				}

			},
			//获取列表
			getAddrList(customerId,page,searchKey,scrollFlag){
				let that = this;
				that.noData=false;
				that.noMore=false;
				service.addrList({customerId:customerId,page:page,searchKey:searchKey}).then(rs => {
					if(rs.data.retCode=='000100'){
						if(scrollFlag){
							that.addrList=that.addrList.concat(rs.data.list);
						}else{
							that.addrList=rs.data.list;
						}

						that.page=rs.data.page==0 ? 1 : rs.data.page;
						that.totalPage=rs.data.totalPage==0 ? 1 : rs.data.totalPage;
					}else{
						alert(rs.data.retMsg)
					}

					if(that.addrList.length==0){
						that.noData=true;
						return;
					}
					if(rs.data.page>=rs.data.totalPage){
						that.noMore=true;

					}

				})
			},

			//搜索
			search(){
				this.getAddrList(this.customerId,1,this.searchKey)
			},

			setAddr(name,contact,province,city,area,detailAddr){
				let that = this;
				if(that.$route.query.target=='from'){
					sessionStorage.setItem("fromData",JSON.stringify(
						{fromName:name,
							fromContact:contact,
							fromProvince:province,
							fromCity:city,
							fromArea:area,
							fromDetailAddr:detailAddr}
					));
					that.$router.push({
						path: '/'
					})
				}
				if(that.$route.query.target=='to'){
					sessionStorage.setItem("toData",JSON.stringify(
						{toName:name,
							toContact:contact,
							toProvince:province,
							toCity:city,
							toArea:area,
							toDetailAddr:detailAddr}
					));
					that.$router.push({
						path: '/'
					})
				}

			},

			edit(addressId){
				let that = this

				that.$router.push({
					path: '/address/add',
					query:{target: 'edit',id: addressId,for:that.$route.query.target}
				})
			},

			del(addressId){
				let that = this;
				let mymessage=confirm("确定删除？");
				if(mymessage==true){
					service.delAddr({addressId:addressId,customerId:that.customerId}).then(rs => {
						if(rs.data.retCode=='000100') {
							that.getAddrList(that.customerId,1,'','');
						}else{
							alert(rs.data.retMsg)
						}
					})
				}else{
					return
				}
			},

			add(){
				let that = this
				that.$router.push({
					path: '/address/add',
					query:{target: 'add',for:that.$route.query.target}
				})
			}
		}
	}
</script>